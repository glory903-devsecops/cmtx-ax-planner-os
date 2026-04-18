import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen transition-all duration-300">
        <header className="h-16 border-b border-cmtx-border bg-white/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
          <h1 className="text-sm font-semibold text-cmtx-navy uppercase tracking-wider">
            Strategic Intelligence & AX Operation
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-cmtx-secondary font-medium">System Status</p>
              <div className="flex items-center gap-1.5 justify-end">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-green-600">OPERATIONAL</span>
              </div>
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
