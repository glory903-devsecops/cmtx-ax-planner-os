"use client";

import React, { useState } from "react";
import { Search, Filter, ClipboardCheck, ScrollText, Link2, Globe, ArrowUpRight, X, Gavel } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { GrantItem, GrantStatusBrief } from "@/components/features/GRHubComponents";
import { PageTransition } from "@/components/layout/PageTransition";
import { DetailPanel, DetailSection, RelatedLinkItem } from "@/components/common/DetailPanel";
import { GRANTS, Grant, CRAWLING_TARGETS } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";

export default function GRHubPage() {
  const [selectedGrant, setSelectedGrant] = useState<Grant | null>(null);
  const [isTargetsOpen, setIsTargetsOpen] = useState(false);

  return (
    <PageTransition>
      <PageHeader 
        title="정부 과제 본부 (GR Hub)"
        subtitle="반도체 국산화 과제 및 대외정책 오퍼레이션 센터"
        icon={<Gavel className="w-6 h-6" />}
        actions={
          <>
            <div className="flex-1 flex justify-center px-8">
              <button 
                onClick={() => setIsTargetsOpen(true)}
                className="group flex items-center gap-3 px-6 py-2.5 bg-cmtx-blue/5 border border-cmtx-blue/20 rounded-full hover:bg-cmtx-blue hover:text-white transition-all shadow-lg hover:shadow-cmtx-blue/30"
              >
                <div className="relative">
                  <Globe className="w-4 h-4 animate-spin-slow group-hover:text-white" />
                  <div className="absolute inset-0 bg-cmtx-blue/30 blur-sm rounded-full animate-pulse" />
                </div>
                <span className="text-xs font-black tracking-tight uppercase">전략적 크롤링 탐색 대상</span>
                <div className="flex items-center justify-center w-5 h-5 bg-cmtx-blue text-white group-hover:bg-white group-hover:text-cmtx-blue rounded-full text-[10px] font-black transition-colors">
                  {CRAWLING_TARGETS.length}
                </div>
              </button>
            </div>
            
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="지원 사업 검색..."
                className="pl-10 pr-4 py-2 bg-white border border-cmtx-border rounded-lg text-sm focus:ring-2 focus:ring-cmtx-blue/20 outline-none w-64 font-medium"
              />
            </div>
            <button className="p-2 border border-cmtx-border bg-white rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4 text-cmtx-secondary" />
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="진행 중인 정부 지원 및 전략 사업">
            <div className="space-y-4">
              {GRANTS.map((grant) => (
                <GrantItem 
                  key={grant.id} 
                  grant={grant} 
                  onClick={() => setSelectedGrant(grant)}
                />
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-8">
          <SectionCard title="운영 현황 요약 (Overview)">
            <GrantStatusBrief />
          </SectionCard>

          <SectionCard title="실시간 운영 활동 (Live)" variant="glass">
             <div className="space-y-5">
               {[
                 { action: "정책 데이터 수집", target: "산업부 High-NA EUV 과제", time: "10분 전" },
                 { action: "재귀적 링크 발견", target: "IRIS 공고 세부 조항", time: "2시간 전" },
                 { action: "과제 승인 완료", target: "CMTX 고순도 세라믹 과제", time: "1일 전" },
               ].map((act, i) => (
                 <div key={i} className="flex gap-4 text-xs group cursor-pointer">
                    <div className="w-1.5 h-1.5 rounded-full bg-cmtx-blue mt-1.5 shadow-[0_0_8px_rgba(37,99,235,0.5)]" />
                    <div className="space-y-0.5">
                      <p className="font-black text-cmtx-navy group-hover:text-cmtx-blue transition-colors">{act.action}</p>
                      <p className="text-slate-500 font-medium">{act.target}</p>
                      <p className="text-[10px] text-slate-400 mt-1 font-bold">{act.time}</p>
                    </div>
                 </div>
               ))}
             </div>
          </SectionCard>
        </div>
      </div>

      {/* Detail View Panel */}
      <DetailPanel
        isOpen={!!selectedGrant}
        onClose={() => setSelectedGrant(null)}
        title={selectedGrant?.title || ""}
        category={selectedGrant?.agency}
        status={selectedGrant?.status}
        subtitle={`${selectedGrant?.type} | 예산: ${selectedGrant?.budget}`}
      >
        <DetailSection title="사업 상세 설명" icon={ScrollText}>
          <p className="font-medium text-slate-700 leading-relaxed">
            {selectedGrant?.description || "설명 정보를 불러오는 중입니다."}
          </p>
        </DetailSection>

        <DetailSection title="지원 요건 및 자격" icon={ClipboardCheck}>
          <ul className="space-y-2 list-disc pl-5 text-slate-600 font-medium">
            {selectedGrant?.requirements?.map((req, i) => (
              <li key={i}>{req}</li>
            )) || <li>요건 분석 중...</li>}
          </ul>
        </DetailSection>

        <DetailSection title="핵심 정책 조항 (재귀 분석 결과)" icon={Gavel}>
          <div className="space-y-4">
            <div className="p-4 bg-cmtx-blue/5 border border-cmtx-blue/10 rounded-2xl">
              <p className="text-[10px] font-black text-cmtx-blue uppercase mb-2">AI Recursive Summary</p>
              <p className="text-xs font-bold text-slate-700 leading-relaxed">
                본 과제는 단순 공고 외에 [부칙 L-24] 문서에 명시된 '국내 생산 시설 가점' 조항이 핵심입니다. 
                CMTX의 평택 제2공장 설비 인증서 제출 시 선정 확률이 25% 상승할 것으로 분석됩니다.
              </p>
            </div>
            {selectedGrant?.clauses?.map((clause, i) => (
              <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <p className="text-[11px] font-black text-cmtx-navy mb-1">{clause.title}</p>
                <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{clause.content}</p>
              </div>
            ))}
          </div>
        </DetailSection>

        {selectedGrant?.sourceUrl && (
          <DetailSection title="원본 소스 링크" icon={Link2}>
            <RelatedLinkItem 
              title="공식 공고 페이지 (IRIS)"
              url={selectedGrant.sourceUrl}
              type="policy"
            />
          </DetailSection>
        )}
      </DetailPanel>

      {/* Crawling Targets Modal */}
      <AnimatePresence>
        {isTargetsOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTargetsOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl border border-white/20 overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-cmtx-navy to-slate-800 text-white">
                <div>
                  <h3 className="text-xl font-black tracking-tight">전략적 크롤링 탐색 지능</h3>
                  <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest mt-1">AX-Powered Policy Monitoring Network</p>
                </div>
                <button 
                  onClick={() => setIsTargetsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar bg-slate-50/50">
                <div className="grid gap-4">
                  {CRAWLING_TARGETS.map((target, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group p-5 bg-white border border-slate-100 rounded-2xl hover:border-cmtx-blue hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-cmtx-blue bg-cmtx-blue/5 px-2 py-0.5 rounded uppercase">{target.org}</span>
                        </div>
                        <h4 className="text-sm font-bold text-cmtx-navy group-hover:text-cmtx-blue transition-colors">{target.name}</h4>
                      </div>
                      <a 
                        href={target.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 bg-slate-50 text-slate-400 group-hover:bg-cmtx-blue group-hover:text-white rounded-xl transition-all"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-slate-100/50 border-t border-slate-100 flex justify-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase text-center max-w-md leading-relaxed">
                  본 시스템은 상기된 10개 핵심 범부처 및 산하기관 포털을 24시간 재귀적으로 탐색하여 
                  CMTX 특허 기반의 최적화된 지원 사업을 자동 추천합니다.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
