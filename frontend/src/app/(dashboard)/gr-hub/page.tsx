"use client";

import React from "react";
import Link from "next/link";
import { Gavel, ShieldAlert, Handshake, TrendingUp, ArrowRight, Globe, Clock, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { PageTransition } from "@/components/layout/PageTransition";
import { GRANTS, POLICY_ITEMS, GOVT_ACTIVITIES, GR_TREND_SIGNALS } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PILLARS = [
  {
    id: "grants",
    href: "/gr-hub/grants",
    label: "지원사업 확보",
    subLabel: "공모·R&D·보조금",
    icon: Gavel,
    color: "from-blue-600 to-blue-700",
    lightBg: "bg-blue-50",
    lightText: "text-blue-600",
    borderHover: "hover:border-blue-300",
    stats: [
      { label: "진행 중인 과제", value: GRANTS.length },
      { label: "총 확보 사업비", value: "24.8억" },
      { label: "D-3 마감 임박", value: GRANTS.filter(g => g.deadline.startsWith("D-")).length },
    ],
    preview: GRANTS.slice(0, 2).map(g => ({ text: g.title, sub: `${g.agency} · ${g.budget}`, urgent: g.deadline.startsWith("D-") })),
  },
  {
    id: "policy",
    href: "/gr-hub/policy",
    label: "정책/규제 대응",
    subLabel: "규제·법률 대응",
    icon: ShieldAlert,
    color: "from-rose-500 to-rose-600",
    lightBg: "bg-rose-50",
    lightText: "text-rose-600",
    borderHover: "hover:border-rose-300",
    stats: [
      { label: "추적 중인 규제", value: POLICY_ITEMS.length },
      { label: "긴급 대응 필요", value: POLICY_ITEMS.filter(p => p.status === "대응 필요").length },
      { label: "이번 달 시행", value: 2 },
    ],
    preview: POLICY_ITEMS.slice(0, 2).map(p => ({ text: p.title, sub: `${p.ministry} · ${p.effectiveDate} 시행`, urgent: p.status === "대응 필요" })),
  },
  {
    id: "cooperation",
    href: "/gr-hub/cooperation",
    label: "정부/기관 협력",
    subLabel: "부처·기관 커뮤니케이션",
    icon: Handshake,
    color: "from-violet-500 to-violet-600",
    lightBg: "bg-violet-50",
    lightText: "text-violet-600",
    borderHover: "hover:border-violet-300",
    stats: [
      { label: "총 협력 활동", value: GOVT_ACTIVITIES.length },
      { label: "후속조치 필요", value: GOVT_ACTIVITIES.filter(a => a.status === "후속조치 필요").length },
      { label: "예정된 일정", value: GOVT_ACTIVITIES.filter(a => a.status === "예정").length },
    ],
    preview: GOVT_ACTIVITIES.slice(0, 2).map(a => ({ text: a.title, sub: `${a.ministry} · ${a.date}`, urgent: a.status === "후속조치 필요" })),
  },
  {
    id: "trends",
    href: "/gr-hub/trends",
    label: "산업 동향 대응",
    subLabel: "뉴스·정책 변화 모니터링",
    icon: TrendingUp,
    color: "from-amber-500 to-amber-600",
    lightBg: "bg-amber-50",
    lightText: "text-amber-600",
    borderHover: "hover:border-amber-300",
    stats: [
      { label: "감지된 시그널", value: GR_TREND_SIGNALS.length },
      { label: "High 영향도", value: GR_TREND_SIGNALS.filter(s => s.impact === "High").length },
      { label: "24시간 자동 수집", value: "ON" },
    ],
    preview: GR_TREND_SIGNALS.slice(0, 2).map(s => ({ text: s.title, sub: `${s.source} · ${s.time}`, urgent: s.impact === "High" })),
  },
];

export default function GRHubOverviewPage() {
  return (
    <PageTransition>
      <PageHeader
        title="GR Hub (대관/정부지원사업)"
        subtitle="정책 대응·정부 협력·지원사업 확보·산업 동향 통합 운영 센터"
        icon={<Gavel className="w-6 h-6" />}
        actions={
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-black text-emerald-700 uppercase tracking-wider">24시간 자동 수집 중</span>
          </div>
        }
      />

      {/* KPI 요약 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "진행 중인 과제", value: GRANTS.length, icon: Gavel, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "긴급 규제 대응", value: POLICY_ITEMS.filter(p => p.status === "대응 필요").length, icon: AlertTriangle, color: "text-rose-600", bg: "bg-rose-50" },
          { label: "후속조치 필요", value: GOVT_ACTIVITIES.filter(a => a.status === "후속조치 필요").length, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "High 동향 시그널", value: GR_TREND_SIGNALS.filter(s => s.impact === "High").length, icon: TrendingUp, color: "text-violet-600", bg: "bg-violet-50" },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="p-4 bg-white border border-cmtx-border rounded-2xl shadow-sm">
              <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center mb-2", kpi.bg)}>
                <Icon className={cn("w-4 h-4", kpi.color)} />
              </div>
              <p className="text-2xl font-black text-cmtx-navy">{kpi.value}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{kpi.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* 4대 기둥 카드 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn("bg-white border border-cmtx-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group", pillar.borderHover)}
            >
              {/* Card Header — clickable */}
              <Link href={pillar.href}>
                <div className={cn("p-5 bg-gradient-to-r text-white flex items-center justify-between cursor-pointer", pillar.color)}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-black text-lg leading-tight">{pillar.label}</p>
                      <p className="text-[11px] text-white/70 font-bold">{pillar.subLabel}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 opacity-60 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Stats */}
              <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
                {pillar.stats.map((stat, i) => (
                  <div key={i} className="p-3 text-center">
                    <p className={cn("text-lg font-black", pillar.lightText)}>{stat.value}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-tight mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Preview items */}
              <div className="p-4 space-y-3">
                {pillar.preview.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0",
                      item.urgent ? "bg-rose-400 shadow-[0_0_6px_rgba(244,63,94,0.5)]" : "bg-slate-300"
                    )} />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-cmtx-navy leading-snug line-clamp-1">{item.text}</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
                <Link href={pillar.href}
                  className={cn("flex items-center justify-center gap-1.5 mt-2 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all", pillar.lightBg, pillar.lightText, "hover:opacity-80")}
                >
                  전체 보기 <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 실시간 Live 피드 */}
      <div className="mt-8 p-6 bg-cmtx-navy rounded-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cmtx-blue/20 blur-3xl rounded-full" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-cmtx-blue-light" />
            <p className="text-sm font-black uppercase tracking-widest">실시간 운영 활동 (Live Feed)</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { action: "정책 데이터 자동 수집", target: "산업부 High-NA EUV 과제", time: "10분 전", dot: "bg-emerald-400" },
              { action: "규제 알림 감지", target: "RoHS EU 행정예고 등록", time: "1시간 전", dot: "bg-rose-400" },
              { action: "KEIT 후속 자료 제출 D-1", target: "기술 역량 보고서 마감 임박", time: "오늘", dot: "bg-amber-400" },
            ].map((act, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0 shadow-lg", act.dot)} />
                <div>
                  <p className="text-xs font-black">{act.action}</p>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">{act.target}</p>
                  <p className="text-[10px] text-slate-500 font-bold mt-0.5">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
