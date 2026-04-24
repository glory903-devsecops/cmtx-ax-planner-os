export interface RelatedLink {
  title: string;
  url: string;
  type: "document" | "news" | "policy" | "external";
}

export interface Signal {
  id: number;
  category: string;
  title: string;
  status: "Critical" | "Monitor" | "Review" | "Strategic";
  time: string;
  impact: "High" | "Medium" | "Low";
  source?: string;
  summary?: string;
  deepAnalysis?: string;
  relatedLinks?: RelatedLink[];
}

export interface Grant {
  id: number;
  title: string;
  agency: string;
  type: string;
  budget: string;
  status: "Draft" | "Radar" | "Submitted" | "Approved";
  deadline: string;
  description?: string;
  requirements?: string[];
  clauses?: { title: string; content: string }[];
  sourceUrl?: string;
}

export interface AXOpportunity {
  id: number;
  title: string;
  domain: string;
  intensity: number;
  priority: "High" | "Medium" | "Low";
  savings: string;
}

export interface Feedback {
  user: string;
  content: string;
  time: string;
}

/* --- 산업 인텔리전스 데이터 (2026년 4월) --- */
export const SIGNALS: Signal[] = [
  { 
    id: 1, 
    category: "공급망", 
    title: "글로벌 쿼츠/세라믹 원자재 재고 경보 발령", 
    status: "Critical", 
    time: "1시간 전", 
    impact: "High",
    source: "블룸버그 테크놀로지 / 로이터",
    summary: "전 세계 반도체용 쿼츠 및 세라믹 원자재의 재고량이 위험 수준(2주 미만)으로 하락했습니다. 주요 산지인 호주와 브라질의 광산 파업 및 운송 지연이 겹친 결과입니다.",
    deepAnalysis: "CMTX의 주력 부품인 챔버용 쿼츠 웨이퍼의 원가 상승 압박이 향후 3개월 내 15~20% 발생할 것으로 예측됩니다. 대체 수급처인 베트남 시장의 퀄리티 테스트를 재귀적으로 진행할 필요가 있습니다.",
    relatedLinks: [
      { title: "원자재 가격 지수 리포트 (2026 Q2)", url: "#", type: "document" },
      { title: "호주 광산 파업 일일 동향 보고서", url: "#", type: "news" },
      { title: "2차 공급망 분석 (베트남 거점)", url: "#", type: "external" }
    ]
  },
  { id: 2, category: "규제/정책", title: "미-아시아 반도체 수출 통제 업데이트 v4.0", status: "Monitor", time: "3시간 전", impact: "High" },
  { id: 3, category: "시장 동향", title: "TSMC 2nm 공정 확장 - 챔버 부품 조달 물량 급증 대응", status: "Strategic", time: "5시간 전", impact: "High" },
  { id: 4, category: "경쟁사", title: "일본 경쟁사 'S-Corp' 신규 내플라즈마 코팅 기술 발표", status: "Review", time: "1일 전", impact: "Medium" },
  { id: 5, category: "기술 트렌드", title: "High-NA EUV 호환 소모성 부품 신규 규격 업데이트", status: "Monitor", time: "2일 전", impact: "Medium" },
];

/* --- GR HUB 데이터 (2026년 4월) --- */
export const GRANTS: Grant[] = [
  { 
    id: 1, 
    title: "2026년 차세대 반도체 공정용 고성능 세라믹 부품 국산화 과제", 
    agency: "산업부", 
    type: "R&D", 
    budget: "15.5억", 
    status: "Approved", 
    deadline: "D-3",
    description: "차세대 High-NA EUV 공정에서 발생하는 초고온 plasma 환경을 견딜 수 있는 고순도 세라믹 소재 및 부품 생산 원천 기술 확보를 목표로 합니다.",
    requirements: [
      "국내 소부장 기업 단독 또는 컨소시엄",
      "반도체 챔버용 부품 양산 실적 보유 필수",
      "연구 인력 중 박사급 비중 15% 이상"
    ],
    clauses: [
      { title: "지원 조항 제 4조 (기술료)", content: "사업 종료 후 매출 발생 시 정부 출연금의 10%를 5년 분할 납부함. (주요 핵심 조항)" },
      { title: "부칙 12-B (매칭 펀드)", content: "민간 부담금은 전체 사업비의 25% 이상으로 하며, 이 중 10% 이상을 현금 부담할 것." },
      { title: "숨겨진 조항 분석 (재귀)", content: "High-NA EUV용 쿼츠 챔버 부품의 경우, 국내 생산 시설 증빙 시 가점 5점 부여 (별도 고문 문서 L-24에서 발견)" }
    ],
    sourceUrl: "https://www.iris.go.kr"
  },
  { 
    id: 2, 
    title: "반도체 소부장(소재·부품·장비) 디지털 전환(DX) 선도 사업", 
    agency: "중기부", 
    type: "지원금", 
    budget: "8.0억", 
    status: "Radar", 
    deadline: "2026-05-15",
    sourceUrl: "https://www.bizinfo.go.kr"
  },
  { 
    id: 3, 
    title: "글로벌 상생협력 반도체 클러스터 인프라 지원", 
    agency: "경기도", 
    type: "인센티브", 
    budget: "3.2억", 
    status: "Draft", 
    deadline: "2026-06-10",
    sourceUrl: "https://www.korcham.net"
  },
  { 
    id: 4, 
    title: "친환경 탄소저감형 반도체 세정/에칭 부품 제조 공정 개발", 
    agency: "환경부", 
    type: "R&D", 
    budget: "5.5억", 
    status: "Submitted", 
    deadline: "2026-04-30",
    sourceUrl: "https://www.iitp.kr"
  },
  { 
    id: 5, 
    title: "K-Startup AI 소부장 혁신 챌린지", 
    agency: "중기부", 
    type: "공모전", 
    budget: "1.2억", 
    status: "Radar", 
    deadline: "2026-05-01",
    sourceUrl: "https://www.k-startup.go.kr"
  },
];

export const CRAWLING_TARGETS = [
  { name: "범부처통합연구지원시스템(IRIS)", org: "과학기술정보통신부", url: "https://www.iris.go.kr" },
  { name: "국가과학기술지식정보서비스(NTIS)", org: "한국과학기술정보연구원(KISTI)", url: "https://www.ntis.go.kr" },
  { name: "기업마당 지원사업 공고", org: "중소벤처기업부", url: "https://www.bizinfo.go.kr" },
  { name: "K-Startup 지원사업 공고", org: "중소벤처기업부", url: "https://www.k-startup.go.kr" },
  { name: "정보통신산업진흥원(NIPA) 사업공고", org: "과학기술정보통신부", url: "https://www.nipa.kr" },
  { name: "정보통신기획평가원(IITP) 사업공고", org: "과학기술정보통신부", url: "https://www.iitp.kr" },
  { name: "한국산업기술평가관리원(KEIT) 사업공고", org: "산업통상자원부", url: "https://www.keit.re.kr" },
  { name: "중소기업기술정보진흥원(TIPA) 사업공고", org: "중소벤처기업부", url: "https://www.smtech.go.kr" },
  { name: "한국산업기술진흥원(KIAT) 사업공고", org: "산업통상자원부", url: "https://www.kiat.or.kr" },
  { name: "대한상공회의소 정책/사업 공지", org: "대한상공회의소", url: "https://www.korcham.net" },
];

/* --- AX 기획 데이터 --- */
export const OPPORTUNITIES: AXOpportunity[] = [
  { id: 1, title: "반도체 부품 표면 결함 Vision AI 자동 검수 시스템", domain: "스마트 팩토리", intensity: 9, priority: "High", savings: "200시간/월" },
  { id: 2, title: "원자재(Quartz/Al2O3) 가격 변동 대응 AI 구매 예측", domain: "공급망 관리", intensity: 7, priority: "High", savings: "80시간/월" },
  { id: 3, title: "공정 레시피 기반 부품 교체 주기 최적화 (디지털 트윈)", domain: "설비 유지보수", intensity: 8, priority: "Medium", savings: "120시간/월" },
  { id: 4, title: "글로벌 테크니컬 스펙 변동 대응 문서 자동 분석 에이전트", domain: "연구개발 지원", intensity: 6, priority: "Medium", savings: "50시간/월" },
];

export const FEEDBACKS: Feedback[] = [
  { user: "생산지원-QC-01", content: "반도체 챔버용 쿼츠 부품의 미세 스크래치 수기 검수가 너무 오래 걸립니다. AI 도입이 필요해요.", time: "2시간 전" },
  { user: "대외협력팀", content: "산업부 소부장 과제 공고가 IRIS에 올라왔는데, 우리 회사 특허와 매칭되는지 분석이 필요합니다.", time: "4시간 전" },
];



