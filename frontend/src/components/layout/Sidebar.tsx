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
  ChevronRight
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Survey Site", href: "/survey", icon: ClipboardList },
  { name: "GR Hub", href: "/gr-hub", icon: Gavel },
  { name: "Industry Intelligence", href: "/intelligence", icon: BarChart3 },
  { name: "AX Planning", href: "/ax-planning", icon: Compass },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-cmtx-navy text-white flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-cmtx-blue rounded-lg flex items-center justify-center font-bold text-lg">
            C
          </div>
          <span className="font-bold text-lg tracking-tight">
            CMTX <span className="text-cmtx-blue-light">AX</span>
          </span>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group text-sm font-medium",
                  isActive 
                    ? "bg-cmtx-blue text-white shadow-lg shadow-cmtx-blue/20" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-400 group-hover:text-white")} />
                  {item.name}
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-white/10">
        <button className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm w-full font-medium">
          <Settings className="w-5 h-5" />
          Settings
        </button>
        <div className="mt-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs">
            GL
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">Glory Lee</p>
            <p className="text-xs text-gray-500 truncate">Strategy Lead</p>
          </div>
        </div>
      </div>
    </div>
  );
}
