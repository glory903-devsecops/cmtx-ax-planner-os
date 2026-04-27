export interface AutomationTarget {
  id: string;
  name: string;
  url: string;
  category: "정부 과제" | "정책 모니터링" | "AX/스마트공장" | "산업 리서치" | "기업 분석" | "뉴스";
  priority: "High" | "Medium" | "Low";
  frequency: "매일" | "매주" | "매월";
  purpose: string;
  enabled: boolean;
}

export const AUTOMATION_TARGETS: AutomationTarget[] = [
  /* 1. 정부 과제 */
  { id: "bizinfo", name: "기업마당 (Bizinfo)", url: "https://www.bizinfo.go.kr", category: "정부 과제", priority: "High", frequency: "매일", purpose: "범정부 중소기업 지원사업 통합 공고", enabled: true },
  { id: "iris", name: "IRIS (범부처통합연구지원)", url: "https://www.iris.go.kr", category: "정부 과제", priority: "High", frequency: "매일", purpose: "범부처 국가 R&D 과제 통합 관제", enabled: true },
  { id: "iitp", name: "IITP (정보통신기획평가원)", url: "https://www.iitp.kr", category: "정부 과제", priority: "High", frequency: "매일", purpose: "ICT 및 AI 원천기술 개발 과제 탐지", enabled: true },
  { id: "keit", name: "KEIT (한국산업기술기획평가원)", url: "https://www.keit.re.kr", category: "정부 과제", priority: "High", frequency: "매일", purpose: "제조 및 산업기술 혁신 R&D 수집", enabled: true },
  { id: "tipa", name: "TIPA (중소기업기술정보진흥원)", url: "https://www.smtech.go.kr", category: "정부 과제", priority: "High", frequency: "매일", purpose: "중소기업 특화 기술개발 지원사업", enabled: true },
  { id: "ntis", name: "NTIS (국가과학기술지식)", url: "https://www.ntis.go.kr", category: "정부 과제", priority: "High", frequency: "매일", purpose: "국가 연구개발 사업 정보 통합 모니터링", enabled: true },
  { id: "kstartup", name: "K-Startup (창업지원포털)", url: "https://www.k-startup.go.kr", category: "정부 과제", priority: "High", frequency: "매일", purpose: "창업 지원 및 벤처 투자 공고 수집", enabled: true },
  { id: "krit", name: "KRIT (국방기술진흥연구소)", url: "https://www.krit.re.kr", category: "정부 과제", priority: "Medium", frequency: "매일", purpose: "국방 핵심기술 및 벤처 R&D 탐색", enabled: true },
  
  /* 2. 정책 모니터링 */
  { id: "mss", name: "중소벤처기업부", url: "https://www.mss.go.kr", category: "정책 모니터링", priority: "Medium", frequency: "매일", purpose: "중기 정책 변화 및 주요 보도자료 분석", enabled: true },
  { id: "motie", name: "산업통상자원부", url: "https://www.motie.go.kr", category: "정책 모니터링", priority: "High", frequency: "매일", purpose: "에너지/반도체 산업 정책 동향 (준비중)", enabled: false },
  { id: "msit", name: "과학기술정보통신부", url: "https://www.msit.go.kr", category: "정책 모니터링", priority: "High", frequency: "매일", purpose: "국가 AI 전략 및 디지털 정책 (준비중)", enabled: false },
  
  /* 3. AX / 스마트공장 */
  { id: "kiat", name: "KIAT (한국산업기술진흥원)", url: "https://www.k-pass.kr", category: "AX/스마트공장", priority: "High", frequency: "매일", purpose: "산업 기술 진흥 및 DX 전환 지원사업", enabled: true },
  { id: "smartfactory", name: "스마트제조혁신추진단", url: "https://www.smart-factory.kr", category: "AX/스마트공장", priority: "High", frequency: "매주", purpose: "스마트공장 보급 및 확산 사업 (준비중)", enabled: false },
  
  /* 4. 산업 리서치 */
  { id: "spri", name: "SPRi (소프트웨어정책연구소)", url: "https://spri.kr", category: "산업 리서치", priority: "High", frequency: "매주", purpose: "국내 AI 및 SW 산업 정밀 통계 보고서", enabled: true },
  { id: "keti", name: "KETI (한국전자기술연구원)", url: "https://www.keti.re.kr", category: "산업 리서치", priority: "Medium", frequency: "매일", purpose: "전자/IT 융합 기술 연구 협력 공고", enabled: true },
  { id: "kiet", name: "KIET (한국산업연구원)", url: "https://www.kiet.re.kr", category: "산업 리서치", priority: "High", frequency: "매주", purpose: "산업 경제 전망 및 실물 지표 분석 (준비중)", enabled: false },
];
