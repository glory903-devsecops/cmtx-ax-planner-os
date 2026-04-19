"use client";

import React from "react";
import { Gavel, Search, Filter } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { GrantItem, GrantStatusBrief } from "@/components/features/GRHubComponents";
import { PageTransition } from "@/components/layout/PageTransition";
import { GRANTS } from "@/lib/mock-data";

export default function GRHubPage() {
  return (
    <PageTransition>
      <PageHeader 
        title="GR Hub"
        subtitle="대외협력 및 정부과제 오퍼레이션 센터"
        icon={<Gavel className="w-6 h-6" />}
        actions={
          <>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search programs..."
                className="pl-10 pr-4 py-2 bg-white border border-cmtx-border rounded-lg text-sm focus:ring-2 focus:ring-cmtx-blue/20 outline-none w-64"
              />
            </div>
            <button className="p-2 border border-cmtx-border bg-white rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4 text-cmtx-secondary" />
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="Active Grants & Programs">
            <div className="space-y-4">
              {GRANTS.map((grant) => (
                <GrantItem key={grant.id} grant={grant} />
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-8">
          <SectionCard title="Operation Overview">
            <GrantStatusBrief />
          </SectionCard>

          <SectionCard title="Recent Activity" variant="glass">
             <div className="space-y-4">
               {[
                 { action: "Document Updated", target: "스마트공조 고도화 과제", time: "10m ago" },
                 { action: "New Submission", target: "수출 유망 중기 바우처", time: "2h ago" },
                 { action: "Approved", target: "24년 생산성 향상 과제", time: "1d ago" },
               ].map((act, i) => (
                 <div key={i} className="flex gap-3 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-cmtx-blue mt-1.5" />
                    <div>
                      <p className="font-bold text-cmtx-navy">{act.action}</p>
                      <p className="text-slate-500">{act.target}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{act.time}</p>
                    </div>
                 </div>
               ))}
             </div>
          </SectionCard>
        </div>
      </div>
    </PageTransition>
  );
}
