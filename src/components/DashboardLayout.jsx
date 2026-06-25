import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children, activePage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50/70">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Offset for sidebar */}
      <div className="lg:pl-64">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 h-[68px] bg-white/90 backdrop-blur-md border-b border-slate-100 flex items-center px-4 lg:hidden shadow-sm shadow-slate-100/60">
          <button
            onClick={() => setMobileOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 ml-3">
            <span className="font-bold text-slate-900 text-[15px]">Campus</span>
            <span className="font-bold text-violet-600 text-[15px] -ml-1.5">Flow</span>
          </div>
        </header>

        {/* Page content */}
        <main className="px-4 sm:px-6 lg:px-10 py-8 max-w-[1280px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
