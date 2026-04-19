"use client";

import React from "react";
import { Compass, Zap, MessageSquare, Map, Activity, Users, ExternalLink, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { OpportunityCard, FrictionMap } from "@/components/features/AXPlanningComponents";
import { PageTransition } from "@/components/layout/PageTransition";
import { OPPORTUNITIES, FEEDBACKS } from "@/lib/mock-data";
import Link from "next/link";
import { Badge } from "@/components/common/Badge";

export default function AXPlanningPage() {
  return (
    <PageTransition>
      <PageHeader 
        title="AX Planning"
        subtitle="AI Transformation 로드맵 및 기획 보드"
        icon={<Compass className="w-6 h-6" />}
        actions={
          <button className="px-4 py-2 bg-cmtx-navy text-white rounded-lg text-xs font-bold hover:bg-cmtx-navy/90 transition-all flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Generate Strategic Roadmap
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <SectionCard 
          title="AX Friction Map" 
          icon={<Map className="w-4 h-4" />}
          className="lg:col-span-2"
          headerAction={
            <div className="flex gap-4">
              <span className="text-[10px] font-bold text-cmtx-secondary border-r pr-4 border-cmtx-border">Sector: ALL</span>
              <span className="text-[10px] font-bold text-cmtx-blue uppercase">Manual Reporting Friction</span>
            </div>
          }
        >
          <FrictionMap />
          <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
            {["Finance", "HR", "Sales", "Production", "Logistics"].map((dept) => (
              <button key={dept} className="px-4 py-1 rounded-full border border-cmtx-border text-[10px] font-bold text-cmtx-secondary hover:border-cmtx-blue hover:text-cmtx-blue transition-all whitespace-nowrap">
                {dept} Sector
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard 
          title="Recent Feedback" 
          icon={<MessageSquare className="w-4 h-4" />}
        >
          <div className="space-y-4">
            {FEEDBACKS.map((fb, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-xl space-y-2 border border-transparent hover:border-cmtx-border transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-cmtx-blue uppercase tracking-tight">{fb.user}</span>
                  <span className="text-[9px] text-gray-400 font-medium">{fb.time}</span>
                </div>
                <p className="text-xs text-cmtx-navy leading-relaxed font-medium">"{fb.content}"</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 flex items-center justify-center gap-2 text-xs font-bold text-cmtx-secondary hover:text-cmtx-navy transition-colors">
            View All Feedback <ChevronRight className="w-3 h-3" />
          </button>
        </SectionCard>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <SectionCard 
          title="AX Opportunity Board" 
          icon={<Activity className="w-4 h-4" />}
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OPPORTUNITIES.map((opp) => (
              <OpportunityCard key={opp.id} opp={opp} />
            ))}
          </div>
        </SectionCard>

        {/* Survey Engagement Hub */}
        <SectionCard 
          variant="dark" 
          className="relative overflow-hidden"
          title="Survey Hub"
          icon={<Users className="w-5 h-5" />}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-cmtx-blue/20 blur-3xl -mr-16 -mt-16" />
          
          <div className="relative space-y-6">
            <div className="space-y-2 text-white">
              <h4 className="text-lg font-bold leading-tight">직원 AX 혁신 설문 참여</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                전 사원 대상의 보틀넥 수집 설문입니다. <br/>
                모바일 최적화 페이지를 통해 참여를 독려하세요.
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-lg p-1.5 flex items-center justify-center shrink-0">
                <div className="grid grid-cols-4 gap-0.5 w-full h-full opacity-80">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className={`rounded-sm ${(i % 3 === 0 || i % 7 === 0) ? "bg-slate-900" : "bg-slate-200"}`} />
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <p className="text-[10px] font-bold text-white uppercase">Live Now</p>
                </div>
                <p className="text-[11px] text-slate-400">Scan for mobile access</p>
              </div>
            </div>

            <Link 
              href="/survey/" 
              className="w-full bg-white text-cmtx-navy py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
            >
              Launch Survey Portal
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </SectionCard>
      </div>
    </PageTransition>
  );
}
