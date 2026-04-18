"use client";

import React from "react";
import { Compass, MessageSquare, Zap, Activity, Filter, Map, ChevronRight, PieChart } from "lucide-react";
import { clsx } from "clsx";

const opportunities = [
  { id: 1, title: "생산 관리 공정 보고서 자동 생성 AI", domain: "Smart Factory", intensity: 8, priority: "High", savings: "120h/mo" },
  { id: 2, title: "전략 기획 정부 과제 매칭 추천 시스템", domain: "Strategy", intensity: 6, priority: "Medium", savings: "40h/mo" },
  { id: 3, title: "물류 창고 안전 관리 Vision AI", domain: "Logistics", intensity: 9, priority: "High", savings: "80h/mo" },
  { id: 4, title: "HR 사내 규정 챗봇 (글로벌 대응)", domain: "Support", intensity: 4, priority: "Low", savings: "20h/mo" },
];

export default function AXPlanningPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cmtx-blue text-white rounded-2xl shadow-lg shadow-cmtx-blue/20">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-cmtx-navy">AX Planning</h2>
            <p className="text-cmtx-secondary font-medium">AI Transformation 로드맵 및 기획 보드</p>
          </div>
        </div>
        <div className="flex gap-2">
            <button className="px-4 py-2 bg-cmtx-navy text-white rounded-lg text-xs font-bold hover:bg-cmtx-navy/90 transition-all flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Generate Strategic Roadmap
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Friction Map Visualization Placeholder */}
          <div className="lg:col-span-2 card">
            <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-cmtx-navy text-sm uppercase tracking-wider flex items-center gap-2">
                    <Map className="w-4 h-4 text-cmtx-blue" />
                    AX Friction Map
                </h3>
                <div className="flex gap-4">
                    <span className="text-[10px] font-bold text-cmtx-secondary border-r pr-4 border-cmtx-border">Sector: ALL</span>
                    <span className="text-[10px] font-bold text-cmtx-blue">Top Pain Point: Manual Reporting</span>
                </div>
            </div>
            
            <div className="relative h-[300px] bg-slate-50 rounded-2xl border border-cmtx-border overflow-hidden flex flex-col items-center justify-center group">
                <div className="flex items-end gap-12 h-48">
                    {[
                        { h: "h-[80%]", label: "Report", color: "bg-cmtx-navy" },
                        { h: "h-[45%]", label: "Approval", color: "bg-cmtx-blue" },
                        { h: "h-[65%]", label: "Data Entry", color: "bg-cmtx-blue-light" },
                        { h: "h-[30%]", label: "Archive", color: "bg-slate-300" },
                        { h: "h-[55%]", label: "Meeting", color: "bg-slate-400" },
                    ].map((bar, i) => (
                        <div key={i} className="flex flex-col items-center gap-4 group/bar">
                            <div className={`w-12 ${bar.h} ${bar.color} rounded-t-lg transition-all duration-500 group-hover:opacity-80 relative`}>
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-cmtx-navy text-white px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                                    {bar.h.replace('h-[', '').replace('%]', '')} Index
                                </div>
                            </div>
                            <span className="text-[10px] font-bold text-cmtx-secondary uppercase tracking-tighter">{bar.label}</span>
                        </div>
                    ))}
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-gray-400" />
                    <span className="text-[10px] font-bold text-gray-400">Heatmap Overlaid</span>
                </div>
            </div>
            
            <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
                {["Finance", "HR", "Sales", "Production", "Logistics"].map((dept) => (
                    <button key={dept} className="px-4 py-1 rounded-full border border-cmtx-border text-[10px] font-bold text-cmtx-secondary hover:border-cmtx-blue hover:text-cmtx-blue transition-all whitespace-nowrap">
                        {dept} Sector
                    </button>
                ))}
            </div>
          </div>

          <div className="card space-y-6">
              <h3 className="font-bold text-cmtx-navy text-sm flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cmtx-blue" />
                Recent Survey Feedback
              </h3>
              <div className="space-y-4">
                  {[
                      { user: "IT 202404", content: "일일 생산 보고서 작성 시 엑셀 5개를 수기로 취합하는 과정이 비효율적입니다.", time: "1h ago" },
                      { user: "HR 202201", content: "해외 법인 동료들과 규정 확인 시 시차로 인해 소통 지연이 큽니다.", time: "3h ago" },
                  ].map((fb, i) => (
                      <div key={i} className="p-4 bg-gray-50 rounded-xl space-y-2 border border-transparent hover:border-cmtx-border transition-all">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-cmtx-blue uppercase tracking-tight">{fb.user}</span>
                            <span className="text-[9px] text-gray-400 font-medium">{fb.time}</span>
                        </div>
                        <p className="text-xs text-cmtx-navy leading-relaxed font-medium">"{fb.content}"</p>
                      </div>
                  ))}
              </div>
              <button className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-cmtx-secondary hover:text-cmtx-navy transition-colors">
                View All Feedback <ChevronRight className="w-3 h-3" />
              </button>
          </div>
      </div>

      {/* AX Opportunity Board */}
      <div className="card">
        <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-cmtx-navy text-sm uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-cmtx-blue" />
                AX Opportunity Board
            </h3>
            <div className="flex gap-2">
                <button className="px-3 py-1.5 border border-cmtx-border rounded-lg text-[10px] font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">
                    <Filter className="w-3.3 h-3.3" /> Filter Priorities
                </button>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {opportunities.map((opp) => (
                <div key={opp.id} className="p-5 border border-cmtx-border rounded-xl transition-all hover:shadow-xl hover:border-cmtx-blue/20 hover:-translate-y-1 group relative overflow-hidden bg-white">
                    <div className="absolute top-0 left-0 w-1 h-full bg-cmtx-blue opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="mb-4 flex justify-between items-start">
                        <span className="text-[9px] font-black text-cmtx-blue uppercase tracking-widest bg-cmtx-blue/5 px-2 py-0.5 rounded border border-cmtx-blue/10">
                            {opp.domain}
                        </span>
                        <div className={clsx(
                            "w-2 h-2 rounded-full",
                            opp.priority === "High" ? "bg-rose-500" : "bg-emerald-500"
                        )} />
                    </div>
                    <h4 className="text-sm font-bold text-cmtx-navy mb-3 line-clamp-2 leading-snug group-hover:text-cmtx-blue transition-colors">
                        {opp.title}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Impact Score</p>
                            <div className="flex gap-1">
                                {[...Array(10)].map((_, i) => (
                                    <div key={i} className={`w-1 h-3 rounded-full ${i < opp.intensity ? 'bg-cmtx-blue' : 'bg-gray-100'}`} />
                                ))}
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Time Savings</p>
                            <p className="text-xs font-bold text-cmtx-navy">{opp.savings}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
