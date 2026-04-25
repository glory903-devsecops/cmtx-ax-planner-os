"""
기업마당 (bizinfo.go.kr) 지원사업 크롤러
대상: https://www.bizinfo.go.kr 지원사업 공고 목록
컬럼: [번호, 지원분야, 지원사업명, 신청기간, 소관부처, 사업수행기관, 등록일, 조회수]
"""
import time
import hashlib
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from typing import Optional
from supabase import create_client, Client
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from config import (
    SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
    REQUEST_DELAY, REQUEST_TIMEOUT, MAX_PAGES, TARGET_KEYWORDS
)

BASE_URL = "https://www.bizinfo.go.kr"
LIST_URL = (
    "https://www.bizinfo.go.kr/web/lay1/bbs/S1T122C128/AS/74/list.do"
    "?rows=20&cpage={page}"
)

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/122.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8",
    "Referer": "https://www.bizinfo.go.kr",
}

# 실제 기업마당 컬럼 인덱스 (HTML 분석 결과)
COL_CATEGORY = 1    # 지원분야
COL_TITLE    = 2    # 지원사업명
COL_PERIOD   = 3    # 신청기간 (예: 2026-04-01 ~ 2026-05-15)
COL_MINISTRY = 4    # 소관부처·지자체
COL_AGENCY   = 5    # 사업수행기관


def make_source_id(href: str) -> str:
    """URL에서 고유 ID 생성 (중복 삽입 방지용)"""
    return hashlib.md5(href.encode()).hexdigest()[:16]


def parse_date(text: str) -> Optional[str]:
    """'2026-05-31' 또는 '2026.05.31' 형식을 ISO 날짜로 변환"""
    if not text:
        return None
    text = text.strip().replace(".", "-").replace("/", "-")
    try:
        datetime.strptime(text, "%Y-%m-%d")
        return text
    except ValueError:
        return None


def parse_period(period_text: str):
    """'2026-04-01 ~ 2026-05-15' → (start_date, end_date)"""
    app_start, app_end = None, None
    if "~" in period_text:
        parts = period_text.split("~")
        app_start = parse_date(parts[0].strip())
        app_end = parse_date(parts[1].strip())
    return app_start, app_end


def is_relevant(title: str, category: str) -> bool:
    """CMTX 관련 키워드 포함 여부 확인 (키워드 없으면 전체 수집)"""
    combined = title + " " + category
    return any(kw in combined for kw in TARGET_KEYWORDS)


def crawl_list_page(page: int) -> list[dict]:
    """한 페이지의 공고 목록을 파싱"""
    url = LIST_URL.format(page=page)
    print(f"  📄 페이지 {page} 크롤링 중...")

    try:
        res = requests.get(url, headers=HEADERS, timeout=REQUEST_TIMEOUT)
        res.raise_for_status()
    except requests.RequestException as e:
        print(f"  ❌ 요청 실패: {e}")
        return []

    soup = BeautifulSoup(res.text, "lxml")

    # 첫 번째 테이블의 tbody 행 파싱
    table = soup.find("table")
    if not table:
        print("  ⚠️  테이블을 찾을 수 없습니다.")
        return []

    tbody = table.find("tbody")
    rows = tbody.find_all("tr") if tbody else table.find_all("tr")[1:]

    items = []
    for row in rows:
        cols = row.find_all("td")
        if len(cols) < 6:
            continue

        try:
            title    = cols[COL_TITLE].get_text(strip=True)
            category = cols[COL_CATEGORY].get_text(strip=True)
            period   = cols[COL_PERIOD].get_text(strip=True)
            ministry = cols[COL_MINISTRY].get_text(strip=True)
            agency   = cols[COL_AGENCY].get_text(strip=True)

            # 링크 추출
            link_el = cols[COL_TITLE].find("a")
            if not link_el:
                continue
            href = link_el.get("href", "")
            detail_url = BASE_URL + href if href.startswith("/") else href

            # 키워드 필터 (관련 없는 공고 제외)
            if not is_relevant(title, category):
                continue

            app_start, app_end = parse_period(period)
            source_id = make_source_id(href)

            items.append({
                "source_id":        source_id,
                "title":            title,
                "agency":           ministry,           # 소관부처를 agency로 저장
                "category":         category,
                "application_start": app_start,
                "application_end":  app_end,
                "deadline":         app_end,
                "source":           "bizinfo",
                "source_url":       detail_url,
                "status":           "active",
                "crawled_at":       datetime.utcnow().isoformat(),
            })

        except Exception as e:
            print(f"  ⚠️  행 파싱 오류: {e}")
            continue

    return items


def upsert_to_supabase(client: Client, grants: list[dict]) -> int:
    """Supabase에 데이터 upsert (중복 시 업데이트)"""
    if not grants:
        return 0
    try:
        client.table("grants").upsert(
            grants,
            on_conflict="source_id"
        ).execute()
        return len(grants)
    except Exception as e:
        print(f"  ❌ Supabase upsert 오류: {e}")
        return 0


def run():
    """기업마당 크롤러 메인 실행"""
    print("=" * 60)
    print("🏢 기업마당 지원사업 크롤러 시작")
    print(f"   시작 시각: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"   키워드 필터: {', '.join(TARGET_KEYWORDS)}")
    print("=" * 60)

    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        print("⚠️  Supabase 미연결 → 콘솔 출력 모드\n")
        supabase_client = None
    else:
        supabase_client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
        print(f"✅ Supabase 연결: {SUPABASE_URL}\n")

    total_collected = 0
    total_saved = 0

    for page in range(1, MAX_PAGES + 1):
        grants = crawl_list_page(page)

        if not grants and page == 1:
            print(f"\n  📭 첫 페이지에서 관련 공고를 찾지 못했습니다.")
            print(f"     (키워드: {', '.join(TARGET_KEYWORDS)})")
            break
        elif not grants:
            print(f"  📭 페이지 {page}: 마지막 페이지 또는 관련 공고 없음. 종료.")
            break

        total_collected += len(grants)
        print(f"  ✅ 페이지 {page}: {len(grants)}건 수집")

        if supabase_client:
            saved = upsert_to_supabase(supabase_client, grants)
            total_saved += saved
            print(f"  💾 Supabase 저장: {saved}건")
        else:
            # 콘솔 출력 모드
            for g in grants:
                deadline_str = f"마감: {g['deadline']}" if g['deadline'] else "마감일 미정"
                print(f"    ✔ [{g['category']}] {g['title'][:55]}")
                print(f"       {g['agency']} | {deadline_str}")

        time.sleep(REQUEST_DELAY)

    print("\n" + "=" * 60)
    print(f"🎉 크롤링 완료!")
    print(f"   수집: {total_collected}건 | 저장: {total_saved}건")
    print(f"   종료 시각: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)
    return total_saved


if __name__ == "__main__":
    run()
