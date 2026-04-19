"use client";

import React from "react";
import { Badge } from "@/components/common/Badge";
import { Grant } from "@/lib/mock-data";
import { Gavel, Clock, ChevronRight } from "lucide-react";

export function GrantItem({ grant }: { grant: Grant }) {
  const statusMap: Record<Grant["status"], any> = {
    Approved: "success",
    Submitted: "medium",
    Radar: "strategic",
    Draft: "outline",
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-cmtx-border rounded-xl hover:shadow-md transition-all group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
          <Gavel className="w-5 h-5 text-cmtx-navy" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{grant.agency}</Badge>
            <Badge variant={statusMap[grant.status]}>{grant.status}</Badge>
          </div>
          <p className="text-sm font-bold text-cmtx-navy group-hover:text-cmtx-blue transition-colors">
            {grant.title}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] font-bold text-gray-400 uppercase">Budget</p>
          <p className="text-xs font-bold text-cmtx-navy">{grant.budget}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1.5 justify-end">
            <Clock className="w-3 h-3 text-cmtx-secondary" />
            <p className="text-xs font-bold text-cmtx-secondary">{grant.deadline}</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-cmtx-blue transition-colors" />
      </div>
    </div>
  );
}

export function GrantStatusBrief() {
  return (
    <div className="grid grid-cols-2 gap-4">
        {[
            { label: "Active Grants", val: "12", color: "text-cmtx-blue" },
            { label: "Total Fund", val: "24.8억", color: "text-cmtx-navy" },
        ].map((stat, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-transparent">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">{stat.label}</p>
                <p className={`text-xl font-bold ${stat.color}`}>{stat.val}</p>
            </div>
        ))}
    </div>
  );
}
