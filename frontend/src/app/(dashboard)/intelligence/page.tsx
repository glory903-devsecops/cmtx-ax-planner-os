"use client";

import React from "react";
import { BarChart3, AlertCircle, TrendingUp, Globe, Layers, ArrowUpRight, Zap } from "lucide-react";
import { clsx } from "clsx";

const signals = [
  { id: 1, category: "Supply Chain", title: "동남아 지역 냉매 소재 수급 지연 경보", status: "Critical", time: "2h ago", impact: "High" },
  { id: 2, category: "Regulatory", title: "EU F-Gas 규제 3차 개정안 초안 발표", status: "Monitor", time: "5h ago", impact: "Medium" },
  { id: 3, category: "Competitor", title: "Daikin 신규 저전력 컴프레서 특허 출원", status: "Review", time: "1d ago", impact: "Medium" },
  { id: 4, category: "Market", title: "중동 지역 건설 경기 회복 및 공조 수요 급증", status: "Strategic", time: "2d ago", impact: "High" },
];

export default function IntelligencePage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cmtx-blue text-white rounded-2xl shadow-lg shadow-cmtx-blue/20">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-cmtx-navy">Industry Intelligence</h2>
            <p className="text-cmtx-secondary font-medium">글로벌 산업 동향 및 리스크 관제 플랫폼</p>
          </div>
        </div>
        <div className="flex gap-2">
            <button className="px-4 py-2 border border-cmtx-border bg-white rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors">
                AI Insight Report (v2.0)
            </button>
        </div>
      </div>

      {/* Hero Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card bg-gradient-to-br from-cmtx-navy to-slate-800 border-none text-white overflow-hidden relative group">
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cmtx-blue/30 rounded-full border border-white/10 text-[10px] font-bold">
                    <Zap className="w-3 h-3 text-cmtx-blue-light" />
                    AI-POWERED TREND ANALYSIS
                </div>
                <h3 className="text-2xl font-bold tracking-tight">지능형 공급망 및 규제 리스크 통합 관제</h3>
                <p className="text-sm text-gray-400 max-w-lg leading-relaxed">
                    OpenAI GPT-4o 엔진이 3,200개의 글로벌 매체에서 수집한 정보를 분석하여 시급한 리스크와 기회를 자동 추출합니다.
                </p>
                <div className="pt-4 flex items-center gap-6">
                    <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Weekly Signal Score</p>
                        <p className="text-2xl font-bold">84 / 100</p>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Active Risks</p>
                        <p className="text-2xl font-bold text-orange-400">12</p>
                    </div>
                </div>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:opacity-20 transition-opacity">
                <Globe className="w-64 h-64" />
              </div>
          </div>

          <div className="card space-y-4 border-l-4 border-l-orange-500">
               <h3 className="font-bold text-cmtx-navy text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    Risk Radar Priority
               </h3>
               {[
                   { name: "RE100 이행 의무화", type: "Regulation", risk: "8.5" },
                   { name: "구리 원자재 가격 폭등", type: "Market", risk: "7.2" },
                   { name: "물류 대란 (홍해 리스크)", type: "Supply Chain", risk: "6.8" },
               ].map((risk, i) => (
                   <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                        <div>
                            <p className="text-xs font-bold text-cmtx-navy">{risk.name}</p>
                            <p className="text-[10px] text-cmtx-secondary font-medium tracking-tight uppercase">{risk.type}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-orange-600">{risk.risk}</p>
                            <p className="text-[9px] text-gray-400 font-bold">CRITICAL</p>
                        </div>
                   </div>
               ))}
          </div>
      </div>

      {/* Signal Inbox */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 card">
            <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-cmtx-navy text-sm uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cmtx-blue" />
                    Signal Inbox (Real-time)
                </h3>
                <div className="flex gap-4">
                    <span className="text-[10px] font-bold text-cmtx-secondary border-r pr-4 border-cmtx-border">Total 1,248</span>
                    <span className="text-[10px] font-bold text-cmtx-blue">Processed 92%</span>
                </div>
            </div>

            <div className="space-y-2">
                {signals.map((signal) => (
                    <div key={signal.id} className="group p-4 flex items-center justify-between hover:bg-slate-50 border-b border-cmtx-border last:border-0 cursor-pointer transition-all">
                        <div className="flex items-center gap-6 flex-1">
                            <div className="w-2.5 h-2.5 rounded-full bg-cmtx-blue-light group-hover:scale-125 transition-transform shrink-0" />
                            <div className="flex flex-col gap-1 min-w-[120px]">
                                <span className="text-[10px] font-bold text-cmtx-secondary uppercase tracking-tight">{signal.category}</span>
                                <span className="text-xs text-cmtx-secondary font-medium">{signal.time}</span>
                            </div>
                            <p className="text-sm font-bold text-cmtx-navy group-hover:text-cmtx-blue transition-colors flex-1">{signal.title}</p>
                        </div>
                        <div className="flex items-center gap-8 min-w-[200px] justify-end">
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-cmtx-secondary uppercase">Impact</p>
                                <p className={clsx(
                                    "text-xs font-bold",
                                    signal.impact === "High" ? "text-rose-600" : "text-emerald-600"
                                )}>{signal.impact}</p>
                            </div>
                            <button className="px-3 py-1 bg-white border border-cmtx-border rounded flex items-center gap-2 group-hover:border-cmtx-blue transition-all">
                                <span className="text-[10px] font-bold text-cmtx-navy group-hover:text-cmtx-blue uppercase">{signal.status}</span>
                                <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-cmtx-blue" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
          </div>

          <div className="space-y-6">
              <div className="card">
                <h3 className="font-bold text-cmtx-navy text-sm mb-6 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cmtx-blue" />
                    Trend Map
                </h3>
                <div className="space-y-6">
                    {[
                        { name: "Heat Pump Innovation", score: 92, trend: "Rising" },
                        { name: "Global Carbon Tax", score: 85, trend: "Stable" },
                        { name: "Hydrogen Cooling", score: 42, trend: "Emerging" },
                    ].map((trend, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between items-center text-xs font-bold">
                                <span className="text-cmtx-navy">{trend.name}</span>
                                <span className="text-cmtx-blue">{trend.score}%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div 
                                    className="bg-cmtx-blue h-full rounded-full transition-all duration-1000" 
                                    style={{ width: `${trend.score}%` }}
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{trend.trend}</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            </div>
                        </div>
                    ))}
                </div>
              </div>

              <div className="card bg-slate-50 border-dashed">
                  <p className="text-[10px] font-medium text-cmtx-secondary text-center italic">
                    Weekly strategic insights are generated<br/>every Monday at 09:00 KST.
                  </p>
              </div>
          </div>
      </div>
    </div>
  );
}
