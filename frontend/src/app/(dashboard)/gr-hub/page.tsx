"use client";

import React from "react";
import Link from "next/link";
import { Gavel, ShieldAlert, Handshake, TrendingUp, ArrowRight, AlertTriangle, Clock, Building2, CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { PageTransition } from "@/components/layout/PageTransition";
import { GRANTS, POLICY_ITEMS, GOVT_ACTIVITIES, GR_TREND_SIGNALS } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function GRHubOverviewPage() {
  return (
    <PageTransition>
      <PageHeader
        title="GR Hub (대관/정부지원)"
        subtitle="정책 대응·정부 협력·지원사업 확보·산업 동향 통합 운영 센터"
        icon={<Gavel className="w-6 h-6" />}
        actions={
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-black text-emerald-700 uppercase tracking-wider">24시간 자동 수집 중</span>
          </div>
        }
      />

      {/* KPI 요약 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "진행 중인 과제", value: GRANTS.length, icon: Gavel, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "긴급 규제 대응", value: POLICY_ITEMS.filter(p => p.status === "대응 필요").length, icon: AlertTriangle, color: "text-rose-600", bg: "bg-rose-50" },
          { label: "후속조치 필요", value: GOVT_ACTIVITIES.filter(a => a.status === "후속조치 필요").length, icon: Clock, color: "text-violet-600", bg: "bg-violet-50" },
          { label: "High 동향 시그널", value: GR_TREND_SIGNALS.filter(s => s.impact === "High").length, icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="p-4 bg-white border border-cmtx-border rounded-2xl shadow-sm">
              <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center mb-2", kpi.bg)}>
                <Icon className={cn("w-4 h-4", kpi.color)} />
              </div>
              <p className="text-2xl font-black text-cmtx-navy">{kpi.value}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5 leading-tight">{kpi.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* ─── 메인 그리드: 정부/기관 협력(좌) + 나머지 3개(우) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ─── 좌측: 정부/기관 협력 (크게) ─── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-cmtx-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-violet-300 transition-all duration-300 group flex flex-col"
        >
          {/* 카드 헤더 — 클릭하면 상세 이동 */}
          <Link href="/gr-hub/cooperation" className="block">
            <div className="p-5 bg-gradient-to-r from-violet-500 to-violet-600 text-white flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Handshake className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-black text-lg leading-tight">정부/기관 협력</p>
                  <p className="text-xs text-white/70 font-bold">부처·기관 커뮤니케이션</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 opacity-60 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* 통계 */}
          <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
            {[
              { label: "총 활동", value: GOVT_ACTIVITIES.length, color: "text-violet-600" },
              { label: "후속조치 필요", value: GOVT_ACTIVITIES.filter(a => a.status === "후속조치 필요").length, color: "text-rose-500" },
              { label: "예정된 일정", value: GOVT_ACTIVITIES.filter(a => a.status === "예정").length, color: "text-blue-500" },
            ].map((s, i) => (
              <div key={i} className="p-3 text-center">
                <p className={cn("text-xl font-black", s.color)}>{s.value}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider leading-tight mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* 타임라인 미리보기 — 전체 활동 표시 */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[480px]">
            {GOVT_ACTIVITIES.map((item, i) => {
              const typeColor: Record<string, string> = {
                "회의": "text-blue-600 bg-blue-50",
                "방문": "text-violet-600 bg-violet-50",
                "공문": "text-slate-600 bg-slate-100",
                "협약": "text-emerald-600 bg-emerald-50",
                "전화": "text-amber-600 bg-amber-50",
              };
              const statusColor: Record<string, string> = {
                "완료": "text-emerald-600 bg-emerald-50 border-emerald-100",
                "예정": "text-blue-600 bg-blue-50 border-blue-100",
                "후속조치 필요": "text-rose-600 bg-rose-50 border-rose-100",
              };
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex gap-3 group/item"
                >
                  {/* 타임라인 도트 + 선 */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0", typeColor[item.type] || "text-slate-600 bg-slate-100")}>
                      {item.type}
                    </div>
                    {i < GOVT_ACTIVITIES.length - 1 && <div className="w-px flex-1 bg-slate-100 mt-1.5" />}
                  </div>
                  {/* 내용 */}
                  <div className={cn("flex-1 pb-3", i < GOVT_ACTIVITIES.length - 1 ? "" : "")}>
                    <div className="p-3 bg-slate-50 border border-transparent rounded-xl hover:border-violet-200 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <span className={cn("inline-block text-[10px] font-black px-2 py-0.5 rounded border mb-1", statusColor[item.status] || "")}>
                            {item.status}
                          </span>
                          <p className="text-sm font-bold text-cmtx-navy leading-snug group-hover/item:text-violet-600 transition-colors line-clamp-2">{item.title}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-slate-400 font-bold">
                            <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{item.ministry}</span>
                            <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" />{item.date}</span>
                          </div>
                        </div>
                      </div>
                      {item.followUp && (
                        <div className="mt-2 px-2.5 py-1.5 bg-violet-50 border border-violet-100 rounded-lg">
                          <p className="text-[10px] font-black text-violet-600 mb-0.5">후속 조치</p>
                          <p className="text-[11px] font-bold text-slate-600 leading-snug line-clamp-1">{item.followUp}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* 더 보기 링크 */}
            <Link href="/gr-hub/cooperation"
              className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-black text-violet-600 bg-violet-50 hover:bg-violet-100 transition-colors uppercase tracking-wider">
              전체 관리 및 신규 등록 <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>

        {/* ─── 우측: 나머지 3개 세로 배치 ─── */}
        <div className="flex flex-col gap-6">
          {[
            {
              id: "grants", href: "/gr-hub/grants", label: "지원사업 확보", subLabel: "공모·R&D·보조금",
              icon: Gavel, color: "from-blue-600 to-blue-700", lightText: "text-blue-600", lightBg: "bg-blue-50",
              stats: [
                { label: "진행 과제", value: GRANTS.length },
                { label: "확보 사업비", value: "24.8억" },
                { label: "마감 임박", value: GRANTS.filter(g => g.deadline.startsWith("D-")).length },
              ],
              preview: GRANTS.slice(0, 3).map(g => ({ text: g.title, sub: `${g.agency} · ${g.budget}`, urgent: g.deadline.startsWith("D-") })),
            },
            {
              id: "policy", href: "/gr-hub/policy", label: "정책/규제 대응", subLabel: "규제·법률 대응",
              icon: ShieldAlert, color: "from-rose-500 to-rose-600", lightText: "text-rose-600", lightBg: "bg-rose-50",
              stats: [
                { label: "추적 규제", value: POLICY_ITEMS.length },
                { label: "긴급 대응", value: POLICY_ITEMS.filter(p => p.status === "대응 필요").length },
                { label: "이번 달 시행", value: 2 },
              ],
              preview: POLICY_ITEMS.slice(0, 3).map(p => ({ text: p.title, sub: `${p.ministry} · ${p.effectiveDate}`, urgent: p.status === "대응 필요" })),
            },
            {
              id: "trends", href: "/gr-hub/trends", label: "산업 동향 대응", subLabel: "뉴스·정책 변화 모니터링",
              icon: TrendingUp, color: "from-amber-500 to-amber-600", lightText: "text-amber-600", lightBg: "bg-amber-50",
              stats: [
                { label: "감지 시그널", value: GR_TREND_SIGNALS.length },
                { label: "High 영향도", value: GR_TREND_SIGNALS.filter(s => s.impact === "High").length },
                { label: "자동 수집", value: "24/7" },
              ],
              preview: GR_TREND_SIGNALS.slice(0, 3).map(s => ({ text: s.title, sub: `${s.source} · ${s.time}`, urgent: s.impact === "High" })),
            },
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.1 }}
                className="bg-white border border-cmtx-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                {/* 헤더 */}
                <Link href={pillar.href} className="block">
                  <div className={cn("px-4 py-3 bg-gradient-to-r text-white flex items-center justify-between cursor-pointer", pillar.color)}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-black text-sm leading-tight">{pillar.label}</p>
                        <p className="text-[10px] text-white/70 font-bold">{pillar.subLabel}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                {/* 통계 */}
                <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
                  {pillar.stats.map((s, i) => (
                    <div key={i} className="p-2.5 text-center">
                      <p className={cn("text-lg font-black", pillar.lightText)}>{s.value}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-tight mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* 미리보기 아이템 */}
                <div className="p-3 space-y-2">
                  {pillar.preview.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0",
                        item.urgent ? "bg-rose-400 shadow-[0_0_6px_rgba(244,63,94,0.5)]" : "bg-slate-300"
                      )} />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-cmtx-navy leading-snug line-clamp-1">{item.text}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                  <Link href={pillar.href}
                    className={cn("flex items-center justify-center gap-1 pt-1 pb-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all", pillar.lightBg, pillar.lightText, "hover:opacity-80")}>
                    전체 보기 <ArrowRight className="w-2.5 h-2.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Live Feed */}
      <div className="mt-8 p-6 bg-cmtx-navy rounded-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cmtx-blue/20 blur-3xl rounded-full" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" /></span>
            <p className="text-sm font-black uppercase tracking-widest">실시간 운영 활동 (Live Feed)</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { action: "KEIT 후속 자료 제출 D-1", target: "기술 역량 보고서 마감 임박", time: "오늘", dot: "bg-rose-400" },
              { action: "정책 데이터 자동 수집", target: "산업부 High-NA EUV 과제", time: "10분 전", dot: "bg-emerald-400" },
              { action: "규제 알림 감지", target: "RoHS EU 행정예고 등록", time: "1시간 전", dot: "bg-amber-400" },
            ].map((act, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0 shadow-lg", act.dot)} />
                <div>
                  <p className="text-sm font-black">{act.action}</p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">{act.target}</p>
                  <p className="text-xs text-slate-500 font-bold mt-0.5">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
