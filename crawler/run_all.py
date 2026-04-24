"""
전체 크롤러 실행 진입점
실행: python run_all.py
"""
from crawlers.bizinfo import run as run_bizinfo

if __name__ == "__main__":
    print("\n🚀 GR Hub 크롤러 파이프라인 시작\n")

    results = {}

    # Phase 1: 기업마당
    results["bizinfo"] = run_bizinfo()

    # Phase 2 이후 추가 예정:
    # results["iris"]  = run_iris()
    # results["keit"]  = run_keit()
    # results["motie"] = run_motie()

    print("\n📊 전체 수집 결과:")
    for source, count in results.items():
        print(f"   {source}: {count}건")
