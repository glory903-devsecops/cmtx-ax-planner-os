"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ClipboardList, 
  Gavel, 
  BarChart3, 
  Compass, 
  Settings,
  ChevronRight,
  User,
  Cpu,
  Database,
  ShieldAlert,
  Handshake,
  TrendingUp,
  FileSearch,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const grSubItems = [
  { name: "지원사업 확보", href: "/gr-hub/grants", icon: FileSearch },
  { name: "정책/규제 대응", href: "/gr-hub/policy", icon: ShieldAlert },
  { name: "정부/기관 협력", href: "/gr-hub/cooperation", icon: Handshake },
  { name: "산업 동향 대응", href: "/gr-hub/trends", icon: TrendingUp },
];

const coreItems = [
  { name: "GR Hub (대관/정부지원사업)", href: "/gr-hub", icon: Gavel, subItems: grSubItems },
  { name: "Industry Intelligence (산업 조사)", href: "/intelligence", icon: BarChart3 },
  { name: "AX Planning AI (의사결정)", href: "/ax-planning", icon: Compass },
];

const supportItems = [
  { name: "대시보드", href: "/", icon: LayoutDashboard },
  { name: "자동화 센터", href: "/automation", icon: Cpu },
  { name: "지식 정보고", href: "/knowledge", icon: Database },
];

export function Sidebar() {
  const pathname = usePathname();
  const isGRActive = pathname.startsWith("/gr-hub");

  return (
    <div className="w-64 h-screen bg-cmtx-navy text-white flex flex-col fixed left-0 top-0 z-50 border-r border-white/5">
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="flex items-center gap-2 mb-10 pl-2">
          <div className="w-9 h-9 bg-cmtx-blue rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-cmtx-blue/20">
            C
          </div>
          <span className="font-bold text-xl tracking-tight">
            CMTX <span className="text-cmtx-blue-light">AX</span>
          </span>
        </div>
        
        <nav className="space-y-6">
          <div>
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">핵심 플랫폼</p>
            <div className="space-y-1">
              {coreItems.map((item) => {
                const isActive = item.href === "/gr-hub" ? isGRActive : pathname === item.href;
                const isExactActive = pathname === item.href;
                return (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group text-sm font-semibold relative overflow-hidden",
                        isActive
                          ? "bg-gradient-to-r from-cmtx-blue to-cmtx-blue/80 text-white shadow-lg shadow-cmtx-blue/20"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-0 w-1 h-full bg-white rounded-r-full" />
                      )}
                      <div className="flex items-center gap-3">
                        <item.icon className={cn("w-5 h-5 transition-transform duration-300", isActive ? "scale-110" : "group-hover:scale-110")} />
                        <span className="leading-tight">{item.name}</span>
                      </div>
                      {item.subItems && (
                        <ChevronDown className={cn("w-3.5 h-3.5 opacity-50 transition-transform", isActive ? "rotate-180" : "")} />
                      )}
                      {!item.subItems && isExactActive && <ChevronRight className="w-4 h-4 opacity-50" />}
                    </Link>

                    {/* GR Hub 서브 메뉴 */}
                    {item.subItems && isGRActive && (
                      <div className="ml-4 mt-1 space-y-0.5 border-l border-white/10 pl-3">
                        {item.subItems.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className={cn(
                                "flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-200 text-xs font-semibold group",
                                isSubActive
                                  ? "bg-white/15 text-white"
                                  : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
                              )}
                            >
                              <sub.icon className={cn("w-3.5 h-3.5 shrink-0", isSubActive ? "text-cmtx-blue-light" : "group-hover:text-slate-300")} />
                              <span className="leading-tight">{sub.name}</span>
                              {isSubActive && <div className="ml-auto w-1 h-1 rounded-full bg-cmtx-blue-light" />}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          <div>
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">운영 지원</p>
            <div className="space-y-1.5">
              {supportItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group text-sm font-semibold relative overflow-hidden",
                      isActive
                        ? "bg-slate-700 text-white shadow-sm"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={cn("w-5 h-5 transition-transform duration-300", isActive ? "scale-110" : "group-hover:scale-110")} />
                      {item.name}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">대외 오퍼레이션</p>
            <Link
              href="/survey/"
              target="_blank"
              className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all text-sm font-semibold group"
            >
              <div className="flex items-center gap-3">
                <ClipboardList className="w-5 h-5 group-hover:scale-110 transition-transform" />
                임직원 설문조사
              </div>
              <BadgeSmall>외부링크</BadgeSmall>
            </Link>
          </div>
        </nav>
      </div>

      <div className="p-6 border-t border-white/5 space-y-4">
        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-xs font-bold ring-2 ring-white/5">
              <User className="w-5 h-5 text-slate-400" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">관리자 모드</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">엔터프라이즈 등급</p>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors text-sm w-full font-bold px-4">
          <Settings className="w-5 h-5" />
          시스템 설정
        </button>
      </div>
    </div>
  );
}

function BadgeSmall({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[8px] font-black bg-white/10 text-slate-400 px-1.5 py-0.5 rounded border border-white/5 uppercase tracking-tighter">
      {children}
    </span>
  );
}
