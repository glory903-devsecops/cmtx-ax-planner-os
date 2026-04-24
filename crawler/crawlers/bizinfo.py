"""
기업마당 (bizinfo.go.kr) 지원사업 크롤러
대상: https://www.bizinfo.go.kr 지원사업 공고 목록
수집: 사업명, 주관기관, 지원금액, 접수기간, 공고 링크
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


def make_source_id(url: str) -> str:
    """URL에서 고유 ID 생성 (중복 삽입 방지용)"""
    return hashlib.md5(url.encode()).hexdigest()[:16]


def parse_date(text: str) -> Optional[str]:
    """'2026-05-31' 또는 '2026.05.31' 형식을 ISO 날짜로 변환"""
    if not text:
        return None
    text = text.strip().replace(".", "-").replace("/", "-")
    # 날짜 범위에서 마지막 날짜 추출 (예: "2026-04-01 ~ 2026-05-15")
    if "~" in text:
        text = text.split("~")[-1].strip()
    try:
        datetime.strptime(text, "%Y-%m-%d")
        return text
    except ValueError:
        return None


def is_relevant(title: str) -> bool:
    """CMTX 관련 키워드 포함 여부 확인"""
    return any(kw in title for kw in TARGET_KEYWORDS)


def crawl_list_page(page: int) -> list[dict]:
    """한 페이지의 공고 목록을 파싱"""
    url = LIST_URL.format(page=page)
    print(f"  📄 페이지 {page} 크롤링 중... ({url})")

    try:
        res = requests.get(url, headers=HEADERS, timeout=REQUEST_TIMEOUT)
        res.raise_for_status()
    except requests.RequestException as e:
        print(f"  ❌ 요청 실패: {e}")
        return []

    soup = BeautifulSoup(res.text, "lxml")
    items = []

    # 기업마당 공고 목록 테이블 파싱
    rows = soup.select("table.tbl-list tbody tr")
    if not rows:
        # 대안 셀렉터 시도
        rows = soup.select(".bbs-list tbody tr")

    for row in rows:
        cols = row.select("td")
        if len(cols) < 3:
            continue

        try:
            # 제목 링크
            title_el = row.select_one("td.title a, td a.subject")
            if not title_el:
                continue
            title = title_el.get_text(strip=True)
            href = title_el.get("href", "")
            detail_url = href if href.startswith("http") else BASE_URL + href

            # 키워드 필터 (관련 없는 공고 제외)
            if not is_relevant(title):
                continue

            # 기관명, 기간, 상태 추출 (컬럼 위치는 사이트 구조에 따라 조정)
            agency = cols[1].get_text(strip=True) if len(cols) > 1 else ""
            period_text = cols[2].get_text(strip=True) if len(cols) > 2 else ""

            # 기간 파싱 (예: "2026-04-01 ~ 2026-05-15")
            app_start, app_end = None, None
            if "~" in period_text:
                parts = period_text.split("~")
                app_start = parse_date(parts[0])
                app_end = parse_date(parts[1])

            source_id = make_source_id(detail_url)

            items.append({
                "source_id": source_id,
                "title": title,
                "agency": agency,
                "application_start": app_start,
                "application_end": app_end,
                "deadline": app_end,
                "source": "bizinfo",
                "source_url": detail_url,
                "status": "active",
                "crawled_at": datetime.utcnow().isoformat(),
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
        res = client.table("grants").upsert(
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
    print("=" * 60)

    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        print("❌ Supabase 환경변수 미설정. 크롤링 결과를 출력만 합니다.")
        supabase_client = None
    else:
        supabase_client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
        print(f"✅ Supabase 연결: {SUPABASE_URL}")

    total_collected = 0
    total_saved = 0

    for page in range(1, MAX_PAGES + 1):
        grants = crawl_list_page(page)

        if not grants:
            print(f"  📭 페이지 {page}: 관련 공고 없음 또는 마지막 페이지. 중단.")
            break

        total_collected += len(grants)
        print(f"  ✅ 페이지 {page}: {len(grants)}건 파싱 완료")

        if supabase_client:
            saved = upsert_to_supabase(supabase_client, grants)
            total_saved += saved
            print(f"  💾 Supabase 저장: {saved}건")
        else:
            # 환경변수 없을 때 콘솔 출력으로 대체
            for g in grants:
                print(f"     - {g['title'][:60]}...")

        time.sleep(REQUEST_DELAY)

    print("=" * 60)
    print(f"🎉 크롤링 완료!")
    print(f"   수집: {total_collected}건 | 저장: {total_saved}건")
    print(f"   종료 시각: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)

    return total_saved


if __name__ == "__main__":
    run()
