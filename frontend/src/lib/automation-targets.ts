export interface AutomationTarget {
  id: string;
  name: string;
  url: string;
  category: "정부 과제" | "정책 모니터링" | "AX/스마트공장" | "산업 리서치" | "기업 분석" | "뉴스";
  priority: "High" | "Medium" | "Low";
  frequency: "매일" | "매주" | "매월";
  purpose: string;
}

export const AUTOMATION_TARGETS: AutomationTarget[] = [
  /* 1. 정부 과제 */
  { id: "iris", name: "IRIS (범부처통합연구지원)", url: "https://www.iris.go.kr", category: "정부 과제", priority: "High", frequency: "매일", purpose: "국가 R&D 과제 공고 탐색" },
  { id: "ntis", name: "NTIS (국가과학기술지식)", url: "https://www.ntis.go.kr", category: "정부 과제", priority: "High", frequency: "매일", purpose: "국가 연구개발 사업 정보 수집" },
  { id: "iitp", name: "IITP (정보통신기획평가원)", url: "https://www.iitp.kr", category: "정부 과제", priority: "High", frequency: "매일", purpose: "ICT 및 AI 관련 과제 공고" },
  { id: "keit", name: "KEIT (한국산업기술평가관리원)", url: "https://www.keit.re.kr", category: "정부 과제", priority: "High", frequency: "매일", purpose: "산업기술 R&D 과제 수집" },
  { id: "tipa", name: "TIPA (중소기업기술정보진흥원)", url: "https://www.smtech.go.kr", category: "정부 과제", priority: "High", frequency: "매주", purpose: "중소기업 기술 지원사업" },
  
  /* 2. 정책 모니터링 */
  { id: "motie", name: "산업통상자원부", url: "https://www.motie.go.kr", category: "정책 모니터링", priority: "High", frequency: "매일", purpose: "산업 정책 변화 및 보도자료" },
  { id: "mss", name: "중소벤처기업부", url: "https://www.mss.go.kr", category: "정책 모니터링", priority: "High", frequency: "매일", purpose: "중기 정책 및 규제 변화" },
  { id: "msit", name: "과학기술정보통신부", url: "https://www.msit.go.kr", category: "정책 모니터링", priority: "High", frequency: "매일", purpose: "AI 및 디지털 정책 탐지" },
  
  /* 3. AX / 스마트공장 */
  { id: "smartfactory", name: "스마트제조혁신추진단", url: "https://www.smart-factory.kr", category: "AX/스마트공장", priority: "High", frequency: "매주", purpose: "제조 디지털 전환 정책" },
  { id: "kiat", name: "KIAT (한국산업기술진흥원)", url: "https://www.kiat.or.kr", category: "AX/스마트공장", priority: "High", frequency: "매주", purpose: "산업 기술 지원사업" },
  
  /* 4. 산업 리서치 */
  { id: "kotra", name: "KOTRA (대한무역투자진흥공사)", url: "https://www.kotra.or.kr", category: "산업 리서치", priority: "High", frequency: "매주", purpose: "글로벌 산업 동향 리서치" },
  { id: "kiet", name: "KIET (한국산업연구원)", url: "https://www.kiet.re.kr", category: "산업 리서치", priority: "High", frequency: "매주", purpose: "산업 전망 및 보고서 분석" },
  
  /* 6. 뉴스 */
  { id: "etnews", name: "전자신문", url: "https://www.etnews.com", category: "뉴스", priority: "High", frequency: "매일", purpose: "산업 기술 변화 탐색" },
  { id: "zdnet", name: "ZDNet Korea", url: "https://zdnet.co.kr", category: "뉴스", priority: "High", frequency: "매일", purpose: "AI 기술 트렌드 수집" },
];
