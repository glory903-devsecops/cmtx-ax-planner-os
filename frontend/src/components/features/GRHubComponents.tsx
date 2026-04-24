"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/common/Badge";
import { Grant } from "@/lib/mock-data";
import { Gavel, Clock, ChevronRight } from "lucide-react";

export function GrantItem({ grant, onClick }: { grant: Grant; onClick?: () => void }) {
  const statusMap: Record<Grant["status"], any> = {
    Approved: "success",
    Submitted: "medium",
    Radar: "strategic",
    Draft: "outline",
  };

  const statusLabelMap: Record<Grant["status"], string> = {
    Approved: "승인됨",
    Submitted: "제출 완료",
    Radar: "전략 레이더",
    Draft: "임시 저장",
  };

  return (
    <motion.div 
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01, backgroundColor: "rgba(248, 250, 252, 1)" }}
      className="flex items-center justify-between p-4 bg-white border border-cmtx-border rounded-xl hover:shadow-lg transition-all group overflow-hidden relative cursor-pointer"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-cmtx-blue opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-cmtx-blue/5 transition-colors">
          <Gavel className="w-5 h-5 text-cmtx-navy group-hover:text-cmtx-blue transition-colors" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[9px] px-1.5 py-0">{grant.agency}</Badge>
            <Badge variant={statusMap[grant.status]} className="text-[9px] px-1.5 py-0">{statusLabelMap[grant.status]}</Badge>
          </div>
          <p className="text-sm font-bold text-cmtx-navy group-hover:text-cmtx-blue transition-colors">
            {grant.title}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right hidden md:block">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">예산 규모 (Budget)</p>
          <p className="text-xs font-black text-cmtx-navy">{grant.budget}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1.5 justify-end">
            <Clock className="w-3 h-3 text-rose-500" />
            <p className="text-xs font-black text-rose-500 tracking-tighter">{grant.deadline}</p>
          </div>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest hidden sm:block">마감 기한 (Deadline)</p>
        </div>
        <motion.div whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400 }}>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-cmtx-blue transition-colors" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function GrantStatusBrief() {
  return (
    <div className="grid grid-cols-2 gap-4">
        {[
            { label: "실행 중인 과제", val: "12", color: "text-cmtx-blue" },
            { label: "사업비 총합", val: "24.8억", color: "text-cmtx-navy" },
        ].map((stat, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-transparent">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">{stat.label}</p>
                <p className={`text-xl font-bold ${stat.color}`}>{stat.val}</p>
            </div>
        ))}
    </div>
  );
}
