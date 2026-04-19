import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen">
        <header className="h-16 border-b border-cmtx-border bg-white/70 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-40">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-6 bg-cmtx-blue rounded-full" />
             <h1 className="text-sm font-bold text-cmtx-navy uppercase tracking-widest bg-gradient-to-r from-cmtx-navy to-slate-500 bg-clip-text text-transparent">
               Strategic Intelligence & AX Operation
             </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="h-8 w-px bg-cmtx-border" />
            <div className="text-right">
              <span className="text-[10px] text-cmtx-secondary font-black uppercase tracking-tighter block mb-0.5">System Status</span>
              <div className="flex items-center gap-1.5 justify-end">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active</span>
              </div>
            </div>
          </div>
        </header>
        
        <div className="p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
