import React from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
  variant?: "default" | "glass" | "dark";
}

export function SectionCard({
  children,
  title,
  subtitle,
  icon,
  className,
  headerAction,
  variant = "default",
}: SectionCardProps) {
  const variants = {
    default: "bg-white border-cmtx-border",
    glass: "glass",
    dark: "bg-slate-900 border-none",
  };

  return (
    <div
      className={cn(
        "rounded-2xl border p-6 shadow-subtle transition-all",
        variants[variant],
        className
      )}
    >
      {(title || icon) && (
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-0.5">
            <h3 className={cn(
              "font-bold text-sm uppercase tracking-wider flex items-center gap-2",
              variant === "dark" ? "text-white" : "text-cmtx-navy"
            )}>
              {icon && <span className="text-cmtx-blue">{icon}</span>}
              {title}
            </h3>
            {subtitle && (
              <p className={cn(
                "text-[10px] font-medium",
                variant === "dark" ? "text-slate-400" : "text-cmtx-secondary"
              )}>
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
