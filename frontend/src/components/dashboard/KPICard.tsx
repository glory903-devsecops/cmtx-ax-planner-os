import React from "react";
import { LucideIcon } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendType?: "positive" | "negative" | "neutral";
  color?: "blue" | "navy" | "green" | "red";
}

export function KPICard({ title, value, icon: Icon, trend, trendType, color = "blue" }: KPICardProps) {
  const colorMap = {
    blue: "bg-blue-50 text-cmtx-blue",
    navy: "bg-slate-100 text-cmtx-navy",
    green: "bg-emerald-50 text-emerald-600",
    red: "bg-rose-50 text-rose-600",
  };

  return (
    <div className="card hover:border-cmtx-blue/30 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-cmtx-secondary uppercase tracking-tight mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-cmtx-navy">{value}</h3>
          {trend && (
            <p className={cn(
              "text-[10px] font-bold mt-2 flex items-center gap-1",
              trendType === "positive" ? "text-emerald-600" : trendType === "negative" ? "text-rose-600" : "text-gray-500"
            )}>
              {trend}
              <span className="font-normal text-gray-400 font-sans">vs last month</span>
            </p>
          )}
        </div>
        <div className={cn("p-2.5 rounded-lg", colorMap[color])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
