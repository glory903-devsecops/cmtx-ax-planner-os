"use client";

import React from "react";
import { Handshake } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { GovtCoopItem } from "@/components/features/GRHubComponents";
import { PageTransition } from "@/components/layout/PageTransition";
import { GOVT_ACTIVITIES } from "@/lib/mock-data";

export default function CooperationPage() {
  return (
    <PageTransition>
      <PageHeader
        title="정부/기관 협력"
        subtitle="부처·기관 커뮤니케이션 이력 및 후속 조치 관리"
        icon={<Handshake className="w-6 h-6" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SectionCard title="부처·기관 협력 활동 타임라인">
            <div className="mt-2">
              {GOVT_ACTIVITIES.map((item) => (
                <GovtCoopItem key={item.id} item={item} />
              ))}
            </div>
          </SectionCard>
        </div>
        <div className="space-y-6">
          <SectionCard title="협력 현황 요약">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "후속조치 필요", val: GOVT_ACTIVITIES.filter(a => a.status === "후속조치 필요").length, color: "text-rose-500" },
                { label: "예정된 일정", val: GOVT_ACTIVITIES.filter(a => a.status === "예정").length, color: "text-blue-500" },
                { label: "완료", val: GOVT_ACTIVITIES.filter(a => a.status === "완료").length, color: "text-emerald-500" },
                { label: "총 활동", val: GOVT_ACTIVITIES.length, color: "text-cmtx-navy" },
              ].map((stat, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">{stat.label}</p>
                  <p className={`text-2xl font-black ${stat.color}`}>{stat.val}</p>
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard title="즉시 조치 필요 항목" variant="glass">
            <div className="space-y-3">
              {GOVT_ACTIVITIES.filter(a => a.status === "후속조치 필요").map(item => (
                <div key={item.id} className="p-3 bg-rose-50 border border-rose-100 rounded-xl">
                  <p className="text-[11px] font-black text-rose-700 leading-snug">{item.title}</p>
                  <p className="text-[10px] text-rose-500 font-bold mt-1">{item.followUp}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </PageTransition>
  );
}
