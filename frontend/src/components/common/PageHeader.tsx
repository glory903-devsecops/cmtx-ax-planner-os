import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  icon,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex justify-between items-center mb-8", className)}>
      <div className="flex items-center gap-4">
        <div className="p-3 bg-cmtx-blue text-white rounded-2xl shadow-lg shadow-cmtx-blue/20">
          {icon}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-cmtx-navy tracking-tight">{title}</h2>
          {subtitle && (
            <p className="text-cmtx-secondary font-medium mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
