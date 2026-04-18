"use client";

import React from "react";
import { 
  FileSearch, 
  AlertCircle, 
  Activity, 
  Truck, 
  Users, 
  Zap,
  ArrowUpRight,
  Clock,
  ExternalLink
} from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { clsx } from "clsx";

const mockGRData = [
  { id: 1, title: "2024년 스마트공조 시스템 고도화 사업", agency: "중소벤처기업부", deadline: "D-5", budget: "4.5억" },
  { id: 2, title: "에너지 효율화 탄소중립 기술 개발", agency: "산업통상자원부", deadline: "D-12", budget: "12억" },
  { id: 3, title: "글로벌 강소기업 육성 프로젝트", agency: "중기청", deadline: "D-3", budget: "2억" },
];

const mockSignals = [
  { id: 1, category: "Supply Chain", title: "동남아 지역 냉매 소재 수급 지연 경보", severity: "High" },
  { id: 2, category: "Regulatory", title: "EU F-Gas 규제 3차 개정안 초안 발표", severity: "Medium" },
  { id: 3, category: "Competitor", title: "Daikin 신규 저전력 컴프레서 특허 출원", severity: "Normal" },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-cmtx-navy">Dashboard Overview</h2>
          <p className="text-cmtx-secondary mt-1">Real-time strategic monitoring across GR, Industry, and AX Planning.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-cmtx-border rounded-lg text-sm font-semibold hover:bg-white transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 bg-cmtx-blue text-white rounded-lg text-sm font-semibold hover:bg-cmtx-blue/90 shadow-lg shadow-cmtx-blue/20 transition-all">
            Update Intelligence
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard title="신규 정부 공고" value="12" icon={FileSearch} trend="+24%" trendType="positive" color="blue" />
        <KPICard title="마감 임박 과제" value="3" icon={Clock} trend="Critical" trendType="negative" color="red" />
        <KPICard title="산업 이슈 수" value="156" icon={Activity} trend="+12" trendType="neutral" color="navy" />
        <KPICard title="공급망 리스크" value="2" icon={Truck} trend="Warning" trendType="negative" color="red" />
        <KPICard title="설문 응답 수" value="428" icon={Users} trend="+89%" trendType="positive" color="blue" />
        <KPICard title="자동화 후보" value="45" icon={Zap} trend="+5" trendType="positive" color="green" />
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* GR Opportunity Inbox Preview */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-cmtx-navy flex items-center gap-2">
              <FileSearch className="w-5 h-5 text-cmtx-blue" />
              GR Opportunity Inbox
            </h3>
            <button className="text-xs font-bold text-cmtx-blue hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-4">
            {mockGRData.map((item) => (
              <div key={item.id} className="group p-4 rounded-xl border border-transparent hover:border-cmtx-border hover:bg-gray-50 flex items-center justify-between transition-all">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-cmtx-blue uppercase">{item.agency}</span>
                  <p className="text-sm font-bold text-cmtx-navy group-hover:text-cmtx-blue transition-colors">{item.title}</p>
                  <p className="text-xs text-cmtx-secondary font-medium">Budget: {item.budget}</p>
                </div>
                <div className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[10px] font-bold border border-rose-100 uppercase">
                  {item.deadline}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Signal Priority */}
        <div className="card overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-cmtx-navy flex items-center gap-2">
              <Activity className="w-5 h-5 text-cmtx-blue" />
              Industry Intelligence Radar
            </h3>
            <button className="text-xs font-bold text-cmtx-blue hover:underline flex items-center gap-1">
              Analyze Trends <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-cmtx-border">
                <th className="pb-3 text-[10px] font-bold text-cmtx-secondary uppercase tracking-wider">Category</th>
                <th className="pb-3 text-[10px] font-bold text-cmtx-secondary uppercase tracking-wider">Signal Title</th>
                <th className="pb-3 text-[10px] font-bold text-cmtx-secondary uppercase tracking-wider text-right">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cmtx-border">
              {mockSignals.map((signal) => (
                <tr key={signal.id} className="group cursor-pointer hover:bg-slate-50">
                  <td className="py-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-cmtx-navy rounded border border-slate-200">
                      {signal.category}
                    </span>
                  </td>
                  <td className="py-4">
                    <p className="text-xs font-bold text-cmtx-navy group-hover:text-cmtx-blue transition-colors line-clamp-1">
                      {signal.title}
                    </p>
                  </td>
                  <td className="py-4 text-right">
                    <span className={clsx(
                      "text-[10px] font-bold",
                      signal.severity === "High" ? "text-rose-600" : signal.severity === "Medium" ? "text-orange-500" : "text-emerald-600"
                    )}>
                      {signal.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 pt-6 border-t border-cmtx-border flex justify-center">
             <button className="text-xs font-bold text-cmtx-secondary hover:text-cmtx-navy transition-colors flex items-center gap-2">
               Intelligence sourced by OpenAI GPT-4o <ExternalLink className="w-3 h-3" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
