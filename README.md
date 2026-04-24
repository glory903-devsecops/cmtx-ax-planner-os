# CMTX AX Planner OS 💎

> **Data-Driven Strategic Operation Platform for GR, Industry Research, and AX Planning**

CMTX AX Planner OS는 대외협력(GR), 산업 리서치, 그리고 사내 AI Transformation(AX) 기획 업무를 통합적으로 관리하는 엔터프라이즈 운영 플랫폼입니다. 일일 90여 개의 전략적 과제를 관제하고, 비정형 데이터를 정형화하여 중장기 의사결정을 지원합니다.

---

## 📂 프로젝트 핵심 모듈

### 1. GR (대관) - Government Relations
- **Opportunity Inbox**: 신규 정부과제 공고 자동 수집 및 분류.
- **Deadline Radar**: 사업 마감 일정 및 D-Day 실시간 모니터링.
- **Stakeholder CRM**: 유관 기관 및 이해관계자 소통 이력 관리.

### 2. 산업 (조사) - Industry Intelligence
- **Signal Inbox**: 글로벌 산업 뉴스 및 트렌드 실시간 센싱 (OpenAI GPT-4o 연동).
- **Risk Radar**: 공급망 리스크 및 규제 변화 조기 경보 시스템.
- **Trend Map**: 산업별 핵심 키워드 부상 및 쇠퇴 분석.

### 3. AX (기획) - AI Transformation Planning
- **AX Friction Survey**: 사내 업무 병목 지점 발굴용 임직원 설문 시스템.
- **Friction Map**: 부서별/업무별 페인포인트 시각화 및 정량 분석.
- **AX Opportunity Board**: 자동화/AI 도입 우선순위 선정 및 기대가치 산출.

---

## 🎨 UI/UX 디자인 가이드

본 플랫폼은 **CMTX 브랜드 아이덴티티**를 반영하여 'B2B 제조기업 전략 플랫폼' 스타일로 제작되었습니다.
- **딥 네이비 (#0F172A)**: 기술적 신뢰감과 안정감을 강조하는 베이스 컬러.
- **프라이머리 블루 (#1D4ED8)**: 핵심 지능 및 액션을 강조하는 포인트 컬러.
- **보고서 친화적 레이아웃**: 대시보드와 리포트의 중간 성격을 갖춘 가독성 중심의 그리드 시스템.

---

## 📸 권장 화면 캡처 포인트 (README용)

README의 가시성을 높이기 위해 아래 화면들을 캡처하여 배치하는 것을 권장합니다:

1.  **Main Dashboard**: 3대 도메인의 핵심 KPI(공고 수, 리스크 수 등)가 한눈에 보이는 콕핏 화면.
2.  **Survey Flow**: 직원코드 입력부터 개인정보 동의, 랜덤 질문으로 이어지는 설문 프로세스.
3.  **GR Opportunity Inbox**: 정제된 테이블 형태의 정부 사업 목록 및 마감 임박 알림.
4.  **Industry Risk Radar**: 글로벌 리스크와 공급망 시그널이 시각화된 정보 지형도.
5.  **AX Friction Map**: 부서별 업무 지체 현황을 보여주는 전략 바 차트.

---

## 🛠️ 기술 스택 및 구조

- **Frontend**: Next.js 14 (App Router), Tailwind CSS v4, Lucide Icons, Framer Motion.
- **Backend (Proposed)**: FastAPI, PostgreSQL, OpenAI API (GPT-4o).
- **Structure**:
  - `frontend/`: React 기반 고충실도(High-fidelity) UI.
  - `backend/`: API 모델 및 비즈니스 로직 스켈레톤.
  - `docs/`: 기능 명세 및 정보 구조 정의서.
  - `sql/`: 향후 DB 구축을 위한 테이블 스키마 정의.

---

## 🚀 시작하기

### Frontend 실행
```bash
cd frontend
npm install
npm run dev
```

### Backend 실행 (개발용 스켈레톤)
```bash
cd backend
pip install -r requirements.txt
python3 -m uvicorn app.main:app --reload
```
