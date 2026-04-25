"""
기업마당 (bizinfo.go.kr) 지원사업 크롤러 - Playwright 버전
대상: https://www.bizinfo.go.kr 지원사업 공고 목록
방식: Headless Chromium (봇 탐지 우회 + JavaScript 렌더링)
"""
import time
import random
import hashlib
import sys
import os
from datetime import datetime
from typing import Optional

from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout
from supabase import create_client, Client

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from config import (
    SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
    REQUEST_DELAY, MAX_PAGES, TARGET_KEYWORDS
)

BASE_URL = "https://www.bizinfo.go.kr"
LIST_URL = (
    "https://www.bizinfo.go.kr/web/lay1/bbs/S1T122C128/AS/74/list.do"
    "?rows=20&cpage={page}"
)

# 컬럼 인덱스
COL_CATEGORY = 1
COL_TITLE    = 2
COL_PERIOD   = 3
COL_MINISTRY = 4
COL_AGENCY   = 5


def make_source_id(href: str) -> str:
    return hashlib.md5(href.encode()).hexdigest()[:16]


def parse_date(text: str) -> Optional[str]:
    if not text:
        return None
    text = text.strip().replace(".", "-").replace("/", "-")
    try:
        datetime.strptime(text, "%Y-%m-%d")
        return text
    except ValueError:
        return None


def parse_period(period_text: str):
    app_start, app_end = None, None
    if "~" in period_text:
        parts = period_text.split("~")
        app_start = parse_date(parts[0].strip())
        app_end   = parse_date(parts[1].strip())
    return app_start, app_end


def is_relevant(title: str, category: str) -> bool:
    """키워드 필터 — TARGET_KEYWORDS가 비어있으면 전체 수집"""
    if not TARGET_KEYWORDS:
        return True
    combined = title + " " + category
    return any(kw in combined for kw in TARGET_KEYWORDS)


def crawl_list_page(page_obj, page_num: int) -> list[dict]:
    url = LIST_URL.format(page=page_num)
    print(f"  📄 페이지 {page_num} 크롤링 중... ({url})")

    try:
        page_obj.goto(url, wait_until="networkidle", timeout=30000)
    except PlaywrightTimeout:
        # networkidle 타임아웃 시 domcontentloaded로 재시도
        try:
            page_obj.goto(url, wait_until="domcontentloaded", timeout=20000)
            page_obj.wait_for_timeout(3000)
        except Exception as e:
            print(f"  ❌ 페이지 로드 실패: {e}")
            return []

    # tbody tr 파싱
    rows = page_obj.query_selector_all("table tbody tr")
    if not rows:
        print("  ⚠️  테이블 행을 찾을 수 없습니다.")
        return []

    items = []
    for row in rows:
        cols = row.query_selector_all("td")
        if len(cols) < 6:
            continue

        try:
            title    = cols[COL_TITLE].inner_text().strip()
            category = cols[COL_CATEGORY].inner_text().strip()
            period   = cols[COL_PERIOD].inner_text().strip()
            ministry = cols[COL_MINISTRY].inner_text().strip()

            # 링크 추출
            link_el = cols[COL_TITLE].query_selector("a")
            if not link_el:
                continue
            href = link_el.get_attribute("href") or ""
            detail_url = BASE_URL + href if href.startswith("/") else href

            # 키워드 필터
            if not is_relevant(title, category):
                continue

            app_start, app_end = parse_period(period)
            source_id = make_source_id(href)

            items.append({
                "source_id":         source_id,
                "title":             title,
                "agency":            ministry,
                "category":          category,
                "application_start": app_start,
                "application_end":   app_end,
                "deadline":          app_end,
                "source":            "bizinfo",
                "source_url":        detail_url,
                "status":            "active",
                "crawled_at":        datetime.utcnow().isoformat(),
            })

        except Exception as e:
            print(f"  ⚠️  행 파싱 오류: {e}")
            continue

    return items


def upsert_to_supabase(client: Client, grants: list[dict]) -> int:
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
    print("=" * 60)
    print("🏢 기업마당 지원사업 크롤러 시작 (Playwright)")
    print(f"   시작 시각: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    if TARGET_KEYWORDS:
        print(f"   키워드 필터: {', '.join(TARGET_KEYWORDS)}")
    else:
        print("   키워드 필터: 없음 (전체 수집)")
    print("=" * 60)

    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        print("⚠️  Supabase 미연결 → 콘솔 출력 모드\n")
        supabase_client = None
    else:
        supabase_client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
        print(f"✅ Supabase 연결: {SUPABASE_URL}\n")

    total_collected = 0
    total_saved = 0

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            args=[
                # 봇 탐지 우회: webdriver 신호 제거
                "--disable-blink-features=AutomationControlled",
                "--disable-dev-shm-usage",
                "--no-sandbox",                  # GitHub Actions 필수
                "--disable-setuid-sandbox",
                "--disable-gpu",
                "--window-size=1920,1080",
            ]
        )
        context = browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/122.0.0.0 Safari/537.36"
            ),
            viewport={"width": 1920, "height": 1080},
            locale="ko-KR",
            timezone_id="Asia/Seoul",
            # navigator.webdriver = false 로 설정
            java_script_enabled=True,
        )
        # navigator.webdriver 속성 숨기기 (핵심 봇 탐지 우회)
        context.add_init_script("""
            Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
            Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3] });
            Object.defineProperty(navigator, 'languages', { get: () => ['ko-KR', 'ko', 'en-US'] });
        """)
        page_obj = context.new_page()

        for page_num in range(1, MAX_PAGES + 1):
            grants = crawl_list_page(page_obj, page_num)

            if not grants and page_num == 1:
                print(f"\n  📭 첫 페이지에서 관련 공고를 찾지 못했습니다.")
                break
            elif not grants:
                print(f"  📭 페이지 {page_num}: 마지막 페이지. 종료.")
                break

            total_collected += len(grants)
            print(f"  ✅ 페이지 {page_num}: {len(grants)}건 수집")

            if supabase_client:
                saved = upsert_to_supabase(supabase_client, grants)
                total_saved += saved
                print(f"  💾 Supabase 저장: {saved}건")
            else:
                for g in grants:
                    deadline_str = f"마감: {g['deadline']}" if g['deadline'] else "마감일 미정"
                    print(f"    ✔ [{g['category']}] {g['title'][:55]}")
                    print(f"       {g['agency']} | {deadline_str}")

            # 사람처럼 랜덤 딜레이 (1.0~2.5초)
            time.sleep(REQUEST_DELAY + random.uniform(0, 1.0))

        context.close()
        browser.close()

    print("\n" + "=" * 60)
    print(f"🎉 크롤링 완료!")
    print(f"   수집: {total_collected}건 | 저장: {total_saved}건")
    print(f"   종료 시각: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)
    return total_saved


if __name__ == "__main__":
    run()
