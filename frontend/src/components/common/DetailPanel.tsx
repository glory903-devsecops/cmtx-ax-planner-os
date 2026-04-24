"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, FileText, Globe, Bookmark, Share2 } from "lucide-react";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

interface DetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  category?: string;
  status?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function DetailPanel({
  isOpen,
  onClose,
  title,
  subtitle,
  category,
  status,
  children,
  footer
}: DetailPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-full max-w-xl bg-white/90 backdrop-blur-xl shadow-2xl z-[101] border-l border-white/20 flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-slate-100 relative">
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {category && <Badge variant="outline">{category}</Badge>}
                  {status && <Badge variant="success">{status}</Badge>}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-cmtx-navy tracking-tight leading-tight mb-2">
                    {title}
                  </h2>
                  {subtitle && (
                    <p className="text-slate-500 font-medium">{subtitle}</p>
                  )}
                </div>
                
                <div className="flex gap-2 pt-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-bold text-slate-600 transition-all">
                    <Bookmark className="w-3.5 h-3.5" /> 전략 노트 저장
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-bold text-slate-600 transition-all">
                    <Share2 className="w-3.5 h-3.5" /> 인사이트 공유
                  </button>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="space-y-8 pb-12">
                {children}
              </div>
            </div>

            {/* Footer */}
            {footer && (
              <div className="p-8 border-t border-slate-100 bg-slate-50/50">
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function DetailSection({ title, children, icon: Icon }: { title: string, children: React.ReactNode, icon?: any }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-50">
        {Icon && <Icon className="w-4 h-4 text-cmtx-blue" />}
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">{title}</h3>
      </div>
      <div className="text-sm text-slate-700 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export function RelatedLinkItem({ title, url, type }: { title: string, url: string, type: string }) {
  const getIcon = () => {
    switch (type) {
      case "document": return <FileText className="w-3.5 h-3.5" />;
      case "policy": return <Bookmark className="w-3.5 h-3.5" />;
      case "news": return <Globe className="w-3.5 h-3.5" />;
      default: return <ExternalLink className="w-3.5 h-3.5" />;
    }
  };

  return (
    <a 
      href={url}
      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-transparent hover:border-cmtx-blue/30 hover:bg-white hover:shadow-sm transition-all group"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 group-hover:text-cmtx-blue transition-colors">
          {getIcon()}
        </div>
        <span className="text-xs font-bold text-slate-600 group-hover:text-cmtx-navy transition-colors">{title}</span>
      </div>
      <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-cmtx-blue transition-all" />
    </a>
  );
}
