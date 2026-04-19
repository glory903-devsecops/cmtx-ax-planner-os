export interface Signal {
  id: number;
  category: string;
  title: string;
  status: "Critical" | "Monitor" | "Review" | "Strategic";
  time: string;
  impact: "High" | "Medium" | "Low";
}

export interface Grant {
  id: number;
  title: string;
  agency: string;
  type: string;
  budget: string;
  status: "Draft" | "Radar" | "Submitted" | "Approved";
  deadline: string;
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

/* --- INDUSTRY INTELLIGENCE DATA --- */
export const SIGNALS: Signal[] = [
  { id: 1, category: "Supply Chain", title: "동남아 지역 냉매 소재 수급 지연 경보", status: "Critical", time: "2h ago", impact: "High" },
  { id: 2, category: "Regulatory", title: "EU F-Gas 규제 3차 개정안 초안 발표", status: "Monitor", time: "5h ago", impact: "Medium" },
  { id: 3, category: "Competitor", title: "Daikin 신규 저전력 컴프레서 특허 출원", status: "Review", time: "1d ago", impact: "Medium" },
  { id: 4, category: "Market", title: "중동 지역 건설 경기 회복 및 공조 수요 급증", status: "Strategic", time: "2d ago", impact: "High" },
];

/* --- GR HUB DATA --- */
export const GRANTS: Grant[] = [
  { id: 1, title: "2024년 스마트공조 시스템 고도화 사업", agency: "중기부", type: "Grant", budget: "4.5억", status: "Approved", deadline: "D-5" },
  { id: 2, title: "에너지 탄소중립 기술 혁신 과제", agency: "환경부", type: "R&D", budget: "1.2억", status: "Draft", deadline: "2024-06-01" },
  { id: 3, title: "수출 유망 중소기업 글로벌 마케팅 지원", agency: "KOTRA", type: "Voucher", budget: "0.5억", status: "Submitted", deadline: "2024-04-30" },
  { id: 4, title: "제조업 AI 융합 생산성 향상 과제", agency: "기재부", type: "Incentive", budget: "미정", status: "Radar", deadline: "2024-07-20" },
];

/* --- AX PLANNING DATA --- */
export const OPPORTUNITIES: AXOpportunity[] = [
  { id: 1, title: "생산 관리 공정 보고서 자동 생성 AI", domain: "Smart Factory", intensity: 8, priority: "High", savings: "120h/mo" },
  { id: 2, title: "전략 기획 정부 과제 매칭 추천 시스템", domain: "Strategy", intensity: 6, priority: "Medium", savings: "40h/mo" },
  { id: 3, title: "물류 창고 안전 관리 Vision AI", domain: "Logistics", intensity: 9, priority: "High", savings: "80h/mo" },
  { id: 4, title: "HR 사내 규정 챗봇 (글로벌 대응)", domain: "Support", intensity: 4, priority: "Low", savings: "20h/mo" },
];

export const FEEDBACKS: Feedback[] = [
  { user: "IT 202404", content: "일일 생산 보고서 작성 시 엑셀 5개를 수기로 취합하는 과정이 비효율적입니다.", time: "1h ago" },
  { user: "HR 202201", content: "해외 법인 동료들과 규정 확인 시 시차로 인해 소통 지연이 큽니다.", time: "3h ago" },
];
