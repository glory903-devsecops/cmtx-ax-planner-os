"use client";

import React from "react";
import { Badge } from "@/components/common/Badge";
import { AXOpportunity } from "@/lib/mock-data";
import { Map, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";

export function OpportunityCard({ opp }: { opp: AXOpportunity }) {
  return (
    <div className="p-5 border border-cmtx-border rounded-xl transition-all hover:shadow-xl hover:border-cmtx-blue/20 hover:-translate-y-1 group relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 w-1 h-full bg-cmtx-blue opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="mb-4 flex justify-between items-start">
        <Badge variant="outline">{opp.domain}</Badge>
        <div className={cn(
          "w-2 h-2 rounded-full",
          opp.priority === "High" ? "bg-rose-500" : "bg-emerald-500"
        )} />
      </div>
      <h4 className="text-sm font-bold text-cmtx-navy mb-3 line-clamp-1 leading-snug group-hover:text-cmtx-blue transition-colors">
        {opp.title}
      </h4>
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Impact Score</p>
          <div className="flex gap-0.5">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={cn(
                "w-1 h-2 rounded-full",
                i < opp.intensity ? "bg-cmtx-blue" : "bg-gray-100"
              )} />
            ))}
          </div>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Savings</p>
          <p className="text-[10px] font-black text-cmtx-navy">{opp.savings}</p>
        </div>
      </div>
    </div>
  );
}

export function FrictionMap() {
  const bars = [
    { h: "h-[80%]", label: "Report", color: "bg-cmtx-navy" },
    { h: "h-[45%]", label: "Approval", color: "bg-cmtx-blue" },
    { h: "h-[65%]", label: "Data Entry", color: "bg-cmtx-blue-light" },
    { h: "h-[30%]", label: "Archive", color: "bg-slate-300" },
    { h: "h-[55%]", label: "Meeting", color: "bg-slate-400" },
  ];

  return (
    <div className="relative h-[300px] bg-slate-50 rounded-2xl border border-cmtx-border overflow-hidden flex flex-col items-center justify-center group">
      <div className="flex items-end gap-12 h-48">
        {bars.map((bar, i) => (
          <div key={i} className="flex flex-col items-center gap-4 group/bar">
            <div className={cn("w-12 rounded-t-lg transition-all duration-500 group-hover:opacity-80 relative", bar.h, bar.color)}>
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
  );
}
