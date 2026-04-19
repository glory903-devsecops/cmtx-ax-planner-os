"use client";

import React from "react";
import { 
  FileSearch, 
  AlertCircle, 
  Activity, 
  ArrowUpRight,
  Clock,
  ExternalLink,
  AreaChart
} from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { SectionCard } from "@/components/common/SectionCard";
import { PageTransition } from "@/components/layout/PageTransition";
import { Badge } from "@/components/common/Badge";
import { SIGNALS, GRANTS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-cmtx-navy tracking-tight">Dashboard Overview</h2>
            <p className="text-cmtx-secondary mt-1 font-medium">Real-time strategic monitoring across GR, Industry, and AX Planning.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-cmtx-border rounded-lg text-sm font-bold hover:bg-white transition-all">
                System Log
            </button>
            <button className="px-4 py-2 bg-cmtx-blue text-white rounded-lg text-sm font-bold shadow-lg shadow-cmtx-blue/20 hover:bg-cmtx-blue/90 transition-all flex items-center gap-2">
                <AreaChart className="w-4 h-4" /> Export Report
            </button>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard title="Strategic Signals" value={SIGNALS.length.toString()} icon={AlertCircle} trend="+2 new" color="red" />
          <KPICard title="Grant Radar" value={GRANTS.length.toString()} icon={FileSearch} trend="3 pending" color="green" />
          <KPICard title="AX Opportunities" value="12" icon={Activity} trend="4 priority" color="blue" />
          <KPICard title="System Pulse" value="99.9%" icon={Zap} trend="Operational" color="green" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Signals */}
          <SectionCard 
            title="Industry Signals" 
            icon={<AlertCircle className="w-4 h-4" />}
            headerAction={<Badge variant="outline">Critical Alerts</Badge>}
          >
            <div className="space-y-4">
              {SIGNALS.slice(0, 3).map((signal) => (
                <div key={signal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-transparent hover:border-cmtx-border transition-all">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      signal.status === "Critical" ? "bg-rose-500" : "bg-emerald-500"
                    )} />
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{signal.category}</p>
                      <p className="text-xs font-bold text-cmtx-navy">{signal.title}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-300" />
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-xs font-bold text-cmtx-secondary hover:text-cmtx-navy transition-colors flex items-center justify-center gap-2">
                View All Signals <ExternalLink className="w-3 h-3" />
            </button>
          </SectionCard>

          {/* Quick Grants */}
          <SectionCard 
            title="Upcoming Deadlines" 
            icon={<Clock className="w-4 h-4" />}
            headerAction={<Badge variant="success">Active</Badge>}
          >
            <div className="space-y-4">
              {GRANTS.slice(0, 3).map((grant) => (
                <div key={grant.id} className="p-4 bg-white border border-cmtx-border rounded-xl flex justify-between items-center group cursor-pointer hover:shadow-md transition-all">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-cmtx-blue uppercase tracking-widest">{grant.agency}</p>
                    <p className="text-xs font-bold text-cmtx-navy group-hover:text-cmtx-blue transition-colors">{grant.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-rose-500">{grant.deadline}</p>
                    <p className="text-[9px] font-bold text-gray-400">{grant.budget}</p>
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

function Zap(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    )
  }
