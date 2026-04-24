"use client";

import React, { useState } from "react";
import { Cpu, Activity, Play, RefreshCcw, Globe, Clock, AlertTriangle, Settings2, Zap, Search, Filter, ChevronRight, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { Badge } from "@/components/common/Badge";
import { PageTransition } from "@/components/layout/PageTransition";
import { AUTOMATION_TARGETS, AutomationTarget } from "@/lib/automation-targets";
import { cn } from "@/lib/utils";
import { useSimulation } from "@/lib/useSimulation";
import { motion, AnimatePresence } from "framer-motion";

export default function AutomationPage() {
  const [activeTab, setActiveTab] = useState<AutomationTarget["frequency"] | "All">("All");
  const [manualInput, setManualInput] = useState("");
  const [showResultCard, setShowResultCard] = useState(false);
  const { isSimulating, progress, status, logs, startSimulation, resetSimulation } = useSimulation();

  const filteredTargets = activeTab === "All" 
    ? AUTOMATION_TARGETS 
    : AUTOMATION_TARGETS.filter(t => t.frequency === activeTab);

  const handleStartAll = () => {
    startSimulation([
      { message: "CMTX 멀티 에이전트 스크래퍼 초기화 중...", duration: 600 },
      { message: "IRIS 접속 중 (소부장 과제 탐색중)...", duration: 1000 },
      { message: "정부 1차 공고문 데이터 수집 중...", duration: 800 },
      { message: "재귀적 분석: 관련 정책 링크 식별 중...", duration: 1200 },
      { message: "재귀적 분석: 소스 PDF 데이터 딥 클로징 중...", duration: 1500 },
      { message: "삼성/TSMC 공급망 인텔리전스 스캐닝 중...", duration: 1000 },
      { message: "쿼츠/세라믹 원자재 시장 티어 분석 중...", duration: 1200 },
      { message: "AX 전략적 딥다이브 보고서 컴파일 중...", duration: 800 },
    ]);
  };

  const handleManualScrape = () => {
    if (!manualInput) return;
    setShowResultCard(false);
    
    startSimulation([
      { message: `"${manualInput}" 전용 RPA 에이전트 초기화 중...`, duration: 1000 },
      { message: `대상 환경으로 이동 중...`, duration: 800 },
      { message: `"${manualInput}" 관련 재귀적 패턴 검색 중...`, duration: 1500 },
      { message: `CAPTCHA 우회 및 구조화된 데이터 추출 중...`, duration: 2000 },
      { message: `AI 처리 중: "${manualInput}"에 대한 딥 컨텍스트 요약 중`, duration: 1200 },
      { message: `CMTX 지식 정보고로 데이터 이관 중...`, duration: 800 },
    ], () => {
      setShowResultCard(true);
    });
  };

  return (
    <PageTransition>
      <PageHeader 
        title="자동화 센터"
        subtitle="반도체 부품 공정 최적화 및 GR 자동 관제 본부"
        icon={<Cpu className="w-6 h-6" />}
        actions={
          <div className="flex gap-2">
            <button 
              onClick={() => { resetSimulation(); setShowResultCard(false); }}
              className="px-4 py-2 border border-cmtx-border bg-white rounded-lg text-xs font-bold hover:bg-gray-50 flex items-center gap-2 transition-all"
            >
              <RefreshCcw className={cn("w-3.5 h-3.5", isSimulating && "animate-spin")} /> 초기화
            </button>
            <button 
              onClick={handleStartAll}
              disabled={isSimulating}
              className={cn(
                "px-6 py-2 rounded-lg text-xs font-bold shadow-lg transition-all flex items-center gap-2",
                isSimulating 
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                  : "bg-cmtx-blue text-white shadow-cmtx-blue/20 hover:bg-cmtx-blue/90 hover:-translate-y-0.5 active:translate-y-0"
              )}
            >
              {isSimulating ? <Activity className="w-3.5 h-3.5 animate-pulse" /> : <Play className="w-3.5 h-3.5" />}
              {isSimulating ? "가동 중..." : "글로벌 크롤링 시작"}
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        <div className="lg:col-span-3 space-y-6">
          {/* RPA Command Center */}
          <SectionCard title="RPA 전략 커맨드 센터" icon={<Zap className="w-4 h-4 text-amber-500" />} variant="glass">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="대상 URL 또는 키워드 입력 (예: https://iris.go.kr 또는 'HBM 공급망')"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-xs font-medium focus:ring-2 focus:ring-cmtx-blue/20 outline-none transition-all placeholder:text-slate-400"
                />
              </div>
              <button 
                onClick={handleManualScrape}
                disabled={isSimulating || !manualInput}
                className="px-6 py-3 bg-cmtx-navy text-white rounded-xl text-xs font-black shadow-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                전략적 RPA 에이전트 가동 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </SectionCard>

          {/* Progress Bar (Visible when simulating) */}
          <AnimatePresence>
            {isSimulating && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-cmtx-navy text-white p-6 rounded-2xl shadow-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cmtx-blue/20 to-transparent " />
                <div className="relative z-10 space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-bold text-cmtx-blue-light uppercase tracking-widest mb-1">RPA 전략적 펄스</p>
                      <h4 className="text-lg font-bold">전략적 인텔리전스 수집 중</h4>
                    </div>
                    <span className="text-2xl font-black">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-cmtx-blue shadow-[0_0_15px_rgba(37,99,235,0.8)]" 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex gap-2 overflow-hidden h-4">
                     {logs.map((log, i) => (
                       <motion.p 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         key={i} 
                         className="text-[9px] font-mono text-slate-400 whitespace-nowrap"
                       >
                         {log}
                       </motion.p>
                     ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Result Card */}
          <AnimatePresence>
            {showResultCard && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl shadow-lg relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <CheckCircle2 className="w-24 h-24 text-emerald-600" />
                </div>
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Zap className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h5 className="font-black text-emerald-900 tracking-tight">신규 추출 인사이트 자산</h5>
                  </div>
                  <p className="text-xs text-emerald-700 font-medium">
                    "{manualInput}"에 대한 12건의 신규 데이터가 수집되어 지능화 레이어에 동기화되었습니다.
                  </p>
                  <div className="flex gap-2 pt-2">
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-[10px] font-black shadow-md hover:bg-emerald-700 transition-all">
                      결과 확인하기
                    </button>
                    <button className="px-4 py-2 bg-white text-emerald-600 border border-emerald-200 rounded-lg text-[10px] font-black hover:bg-emerald-50 transition-all">
                      지식 정보고에 저장
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <SectionCard variant="glass">
            <div className="flex items-center justify-between mb-8">
              <div className="flex bg-slate-100 p-1 rounded-xl">
                {["전체", "매일", "매주", "매월"].map((tab) => {
                  const filterMap: Record<string, string> = { "전체": "All", "매일": "매일", "매주": "매주", "매월": "매월" };
                  const actualTab = filterMap[tab] || tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(actualTab as any)}
                      className={cn(
                        "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                        activeTab === actualTab ? "bg-white text-cmtx-navy shadow-sm" : "text-slate-500 hover:text-cmtx-navy"
                      )}
                    >
                      {tab}
                    </button>
                  )
                })}
              </div>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2">
                   <span className={cn("w-2 h-2 rounded-full", isSimulating ? "bg-emerald-500 animate-pulse" : "bg-slate-300")} />
                   <span className="text-[10px] font-bold text-slate-500 uppercase">{isSimulating ? "시뮬레이션 가동 중" : "초기 대기 상태"}</span>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTargets.map((target) => (
                <TargetItem key={target.id} target={target} isRunning={isSimulating} />
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-8">
           <SectionCard title="실시간 작업 현황" icon={<Activity className="w-4 h-4" />}>
             <div className="space-y-5">
                {[
                  { name: "IRIS 스크래퍼", status: isSimulating ? "가동 중" : "대기", progress: isSimulating ? progress : 0 },
                  { name: "소부장 공급망 모니터", status: isSimulating ? "가동 중" : "대기", progress: isSimulating ? Math.max(0, progress - 20) : 0 },
                  { name: "경쟁사 기술 레이더", status: isSimulating ? "가동 중" : "대기", progress: isSimulating ? Math.max(0, progress - 40) : 0 },
                  { name: "문서 분석 (AX)", status: isSimulating ? "가동 중" : "대기", progress: isSimulating ? Math.max(0, progress - 60) : 0 },
                ].map((task, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-cmtx-navy tracking-tight">{task.name}</span>
                      <span className={cn(
                        task.status === "가동 중" ? "text-cmtx-blue" : "text-slate-400"
                      )}>{task.status}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-cmtx-blue" 
                        animate={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
             </div>
           </SectionCard>

           <SectionCard title="지능화 크롤링 통계" variant="dark">
              <div className="space-y-6">
                 <div className="flex items-center gap-3">
                   <AlertTriangle className="w-5 h-5 text-amber-400" />
                   <div>
                     <p className="text-[10px] font-bold text-amber-400 uppercase">시스템 상태</p>
                     <p className="text-xs text-slate-400">12개 에이전트 가동 가능</p>
                   </div>
                 </div>
                 <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">누적 인텔리전스 기록</p>
                    <p className="text-2xl font-bold text-white italic">4,812 <span className="text-xs font-normal text-slate-500">건 처리 완료</span></p>
                 </div>
              </div>
           </SectionCard>
        </div>
      </div>
    </PageTransition>
  );
}

function TargetItem({ target, isRunning }: { target: AutomationTarget, isRunning: boolean }) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="p-4 bg-white border border-cmtx-border rounded-xl hover:shadow-md transition-all group flex flex-col justify-between relative overflow-hidden"
    >
      {isRunning && (
        <motion.div 
          className="absolute bottom-0 left-0 h-0.5 bg-cmtx-blue/40"
          animate={{ width: ["0%", "100%", "0%"] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="text-[9px]">{target.category}</Badge>
          <div className="flex gap-1.5">
            <Badge variant={target.priority === "High" ? "critical" : "medium"} className="px-1">{target.priority}</Badge>
            <Badge variant="default" className="px-1">{target.frequency}</Badge>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold text-cmtx-navy flex items-center gap-1.5 group-hover:text-cmtx-blue transition-colors">
            <Globe className="w-3.5 h-3.5" />
            {target.name}
          </h4>
          <p className="text-[10px] text-slate-500 line-clamp-1 mt-1">{target.purpose}</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
          <Clock className="w-3 h-3" /> {isRunning ? "수집 중..." : "2시간 전"}
        </div>
        <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-cmtx-navy transition-all">
          <Settings2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

