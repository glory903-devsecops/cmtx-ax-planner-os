"use client";

import React from "react";
import { SectionCard } from "@/components/common/SectionCard";
import { Badge } from "@/components/common/Badge";
import { Signal } from "@/lib/mock-data";
import { AlertCircle, TrendingUp, Globe, ArrowUpRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function SignalItem({ signal }: { signal: Signal }) {
  const statusMap: Record<Signal["status"], any> = {
    Critical: "critical",
    Monitor: "warning",
    Review: "medium",
    Strategic: "strategic",
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-transparent hover:border-cmtx-border transition-all group cursor-pointer">
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
          signal.status === "Critical" ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-400"
        )}>
          <AlertCircle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{signal.category}</Badge>
            <Badge variant={statusMap[signal.status]}>{signal.status}</Badge>
          </div>
          <p className="text-sm font-bold text-cmtx-navy group-hover:text-cmtx-blue transition-colors">
            {signal.title}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-bold text-gray-400 uppercase">{signal.impact} IMPACT</p>
        <p className="text-[10px] text-gray-500">{signal.time}</p>
      </div>
    </div>
  );
}

export function TrendHero() {
  return (
    <div className="lg:col-span-2 relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-cmtx-navy to-slate-800 p-8 text-white group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cmtx-blue/20 blur-3xl -mr-32 -mt-32 transition-all group-hover:bg-cmtx-blue/30" />
      
      <div className="relative z-10 space-y-6 h-full flex flex-col justify-between">
        <div className="space-y-4">
          <Badge variant="strategic" className="bg-cmtx-blue/30 border-white/10 text-white">
            <Zap className="w-3 h-3 mr-1" /> AI-POWERED TREND ANALYSIS
          </Badge>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold leading-tight">
              Global H/P Market <br/>
              <span className="text-cmtx-blue-light italic">Sustainability Shift</span>
            </h3>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              유럽 시장의 F-Gas 규제 강화로 인해 친환경 냉매 전환 수요가 전년 대비 142% 급증하고 있습니다. 
              기술 우위 선점이 중요한 시점입니다.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 pt-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Growth</p>
              <p className="text-lg font-bold">+24.5%</p>
            </div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-cmtx-blue-light" />
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Sentiment</p>
              <p className="text-lg font-bold">Positive</p>
            </div>
          </div>
          <button className="ml-auto w-12 h-12 bg-white text-cmtx-navy rounded-full flex items-center justify-center hover:bg-cmtx-blue-light hover:text-white transition-all">
            <ArrowUpRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
