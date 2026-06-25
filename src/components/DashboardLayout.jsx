import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children, activePage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 h-[72px] bg-white/80 backdrop-blur-md border-b border-slate-200/80 flex items-center px-4 lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="ml-3 font-semibold text-slate-800 text-[15px]">CampusFlow</span>
        </header>

        <main className="px-4 sm:px-6 lg:px-10 py-8 max-w-[1400px] mx-auto">{children}</main>
      </div>
    </div>
  );
}
