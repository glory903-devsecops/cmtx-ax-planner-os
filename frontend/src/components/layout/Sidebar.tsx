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
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "GR Hub", href: "/gr-hub", icon: Gavel },
  { name: "Industry Intelligence", href: "/intelligence", icon: BarChart3 },
  { name: "AX Planning", href: "/ax-planning", icon: Compass },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-cmtx-navy text-white flex flex-col fixed left-0 top-0 z-50 border-r border-white/5">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-10 pl-2">
          <div className="w-9 h-9 bg-cmtx-blue rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-cmtx-blue/20">
            C
          </div>
          <span className="font-bold text-xl tracking-tight">
            CMTX <span className="text-cmtx-blue-light">AX</span>
          </span>
        </div>
        
        <nav className="space-y-1.5">
          <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Core Platform</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
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
                  {item.name}
                </div>
                {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
              </Link>
            );
          })}
          
          <div className="pt-6">
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">External Ops</p>
            <Link
              href="/survey/"
              target="_blank"
              className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all text-sm font-semibold group"
            >
              <div className="flex items-center gap-3">
                <ClipboardList className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Emp. Survey
              </div>
              <BadgeSmall>External</BadgeSmall>
            </Link>
          </div>
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-6">
        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-xs font-bold ring-2 ring-white/5">
              <User className="w-5 h-5 text-slate-400" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">Admin Manager</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Enterprise Tier</p>
            </div>
          </div>
        </div>

        <button className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors text-sm w-full font-bold px-4">
          <Settings className="w-5 h-5" />
          System Settings
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
