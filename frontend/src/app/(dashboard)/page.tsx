"use client";

import React from "react";
import { 
  FileSearch, 
  AlertCircle, 
  Activity, 
  ArrowUpRight,
  Clock,
  ExternalLink,
  AreaChart,
  Target,
  Zap
} from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { SectionCard } from "@/components/common/SectionCard";
import { PageTransition } from "@/components/layout/PageTransition";
import { Badge } from "@/components/common/Badge";
import { SIGNALS, GRANTS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <PageTransition>
      <div className="space-y-8 pb-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 bg-cmtx-blue text-white text-[10px] font-black rounded uppercase tracking-widest shadow-lg shadow-cmtx-blue/20">
                전문가 모드
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                반도체 공정 지능화 서비스
              </span>
            </div>
            <h2 className="text-4xl font-black text-cmtx-navy tracking-tighter">CMTX 전략 운영 본부</h2>
            <p className="text-cmtx-secondary mt-1 font-medium italic">정부 과제, 산업 인텔리전스 및 AX 전략 통합 관리 플랫폼</p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 border border-cmtx-border bg-white rounded-xl text-xs font-bold hover:bg-gray-50 hover:shadow-md transition-all">
                시스템 정밀 진단
            </button>
            <button className="px-5 py-2.5 bg-cmtx-navy text-white rounded-xl text-xs font-bold shadow-xl hover:bg-slate-800 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                <AreaChart className="w-4 h-4" /> 인텔리전스 보고서 다운로드
            </button>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard title="전략적 시그널" value={SIGNALS.length.toString()} icon={AlertCircle} trend="+1 크리티컬" trendType="negative" color="red" />
          <KPICard title="정부 과제 레이더 (소부장)" value={GRANTS.length.toString()} icon={FileSearch} trend="D-3 승인 완료" trendType="positive" color="blue" />
          <KPICard title="AX 개선 지수" value="높음" icon={Activity} trend="PROD-QC-01 경보" trendType="negative" color="violet" />
          <KPICard title="에이전트 상태" value="가동 중" icon={Zap} trend="12개 스크래퍼 활성" trendType="positive" color="green" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Signals */}
          <SectionCard 
            title="산업 인텔리전스" 
            icon={<Target className="w-4 h-4" />}
            headerAction={<Badge variant="outline">2026년 4월 라이브</Badge>}
          >
            <div className="space-y-4">
              {SIGNALS.slice(0, 4).map((signal, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={signal.id} 
                  className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-transparent hover:border-cmtx-border group cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-1.5 h-6 rounded-full",
                      signal.status === "Critical" ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" : "bg-cmtx-blue"
                    )} />
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{signal.category}</p>
                      <p className="text-xs font-bold text-cmtx-navy group-hover:text-cmtx-blue transition-colors line-clamp-1">{signal.title}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-cmtx-blue transition-all" />
                </motion.div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-slate-50 text-[11px] font-black text-cmtx-secondary hover:text-cmtx-navy hover:bg-slate-100 rounded-xl transition-all flex items-center justify-center gap-2">
                인텔리전스 탐색기 전체 보기 <ExternalLink className="w-3 h-3" />
            </button>
          </SectionCard>

          {/* Quick Grants */}
          <SectionCard 
            title="정부 지원 과제 레이더" 
            icon={<Clock className="w-4 h-4" />}
            headerAction={<Badge variant="success">진행 중인 과제</Badge>}
          >
            <div className="space-y-4">
              {GRANTS.slice(0, 3).map((grant, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={grant.id} 
                  className="p-4 bg-white border border-cmtx-border rounded-xl flex justify-between items-center group cursor-pointer hover:shadow-lg transition-all"
                >
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-cmtx-blue uppercase tracking-widest">{grant.agency}</p>
                    <p className="text-xs font-bold text-cmtx-navy group-hover:text-cmtx-blue transition-colors">{grant.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-rose-500 tracking-tighter">{grant.deadline}</p>
                    <p className="text-[9px] font-bold text-gray-400">{grant.budget}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 p-4 gradient-strategic rounded-2xl text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-cmtx-blue/30 blur-3xl" />
               <div className="relative z-10 flex justify-between items-center">
                  <div>
                    <h5 className="text-xs font-bold mb-1">AX 전략적 기회 포착</h5>
                    <p className="text-[10px] text-slate-300">CMTX R&D와 매칭되는 신규 국책 과제가 발견되었습니다.</p>
                  </div>
                  <Target className="w-6 h-6 text-cmtx-blue-light" />
               </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </PageTransition>
  );
}

