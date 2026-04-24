"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import React, { useState, useEffect } from "react";
import { Menu, X, LayoutDashboard, Database, Cpu, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Top Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-b border-cmtx-border z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-cmtx-blue rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-cmtx-blue/20">
            C
          </div>
          <span className="font-bold text-lg tracking-tight text-cmtx-navy">
             CMTX <span className="text-cmtx-blue">AX</span>
          </span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Overlay Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white pt-24 px-6">
           <nav className="space-y-4">
              {[
                { name: "종합 대시보드", href: "/", icon: LayoutDashboard },
                { name: "전략 자동화 센터", href: "/automation", icon: Cpu },
                { name: "지식 정보고", href: "/knowledge", icon: Database },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl font-bold transition-all",
                    pathname === item.href ? "bg-cmtx-blue text-white" : "bg-slate-50 text-slate-600"
                  )}
                >
                  <item.icon className="w-6 h-6" />
                  {item.name}
                </Link>
              ))}
           </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className={cn(
        "flex-1 min-h-screen transition-all duration-300",
        "lg:ml-64 pt-16 lg:pt-0" // Account for fixed mobile header
      )}>
        {/* Desktop Header */}
        <header className="hidden lg:flex h-16 border-b border-cmtx-border bg-white/70 backdrop-blur-xl items-center justify-between px-10 sticky top-0 z-40">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-6 bg-cmtx-blue rounded-full" />
             <h1 className="text-sm font-bold text-cmtx-navy uppercase tracking-widest bg-gradient-to-r from-cmtx-navy to-slate-500 bg-clip-text text-transparent">
               전략 인텔리전스 및 AX 운영 시스템
             </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="h-8 w-px bg-cmtx-border" />
            <div className="text-right">
              <span className="text-[10px] text-cmtx-secondary font-black uppercase tracking-tighter block mb-0.5">시스템 운영 상태</span>
              <div className="flex items-center gap-1.5 justify-end">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">정상 작동 중 (Active)</span>
              </div>
            </div>
          </div>
        </header>
        
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {children}
        </div>

        {/* Mobile Quick Insight FAB */}
        <button className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-cmtx-blue text-white rounded-full shadow-2xl shadow-cmtx-blue/40 flex items-center justify-center z-50 active:scale-90 transition-transform">
          <Plus className="w-8 h-8" />
        </button>
      </main>
    </div>
  );
}
