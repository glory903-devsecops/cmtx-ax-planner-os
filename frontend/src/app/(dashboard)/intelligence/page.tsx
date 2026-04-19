"use client";

import React from "react";
import { BarChart3, Zap } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { SignalItem, TrendHero } from "@/components/features/IntelligenceComponents";
import { PageTransition } from "@/components/layout/PageTransition";
import { SIGNALS } from "@/lib/mock-data";

export default function IntelligencePage() {
  return (
    <PageTransition>
      <PageHeader 
        title="Industry Intelligence"
        subtitle="글로벌 산업 동향 및 리스크 관제 플랫폼"
        icon={<BarChart3 className="w-6 h-6" />}
        actions={
          <button className="px-4 py-2 border border-cmtx-border bg-white rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors">
            AI Insight Report (v2.0)
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <TrendHero />

        <SectionCard 
          title="Market Signals" 
          icon={<Zap className="w-4 h-4" />}
          headerAction={
            <span className="text-[10px] font-bold text-cmtx-blue">Live Analysis</span>
          }
        >
          <div className="space-y-4">
            {SIGNALS.map((signal) => (
              <SignalItem key={signal.id} signal={signal} />
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SectionCard title="Sector Analysis" subtitle="부서별 시그널 분포">
           <div className="h-48 flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs font-medium">
             Analysis visualization loading...
           </div>
        </SectionCard>
        <SectionCard title="Competitor Radar" subtitle="주요 경쟁사 기술 동향">
           <div className="h-48 flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs font-medium">
             Radar map loading...
           </div>
        </SectionCard>
      </div>
    </PageTransition>
  );
}
