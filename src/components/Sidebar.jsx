import {
  LayoutDashboard,
  ListChecks,
  CalendarCheck2,
  CalendarDays,
  Settings,
  GraduationCap,
  Bell,
  Zap,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
  { label: "Deadlines", icon: ListChecks, key: "deadlines", badge: 5 },
  { label: "Attendance", icon: CalendarCheck2, key: "attendance" },
  { label: "Calendar", icon: CalendarDays, key: "calendar" },
  { label: "Settings", icon: Settings, key: "settings" },
];

export default function Sidebar({ activePage = "dashboard", onNavigate = () => {}, mobileOpen, setMobileOpen }) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed z-50 inset-y-0 left-0 w-64 bg-white border-r border-slate-100 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-[68px] border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-200/60 shrink-0">
            <GraduationCap className="w-[18px] h-[18px] text-white" strokeWidth={2.25} />
          </div>
          <div>
            <p className="text-[15px] font-bold text-slate-900 tracking-tight leading-none">
              Campus<span className="text-violet-600">Flow</span>
            </p>
            <p className="text-[10.5px] text-slate-400 leading-none mt-1">Student workspace</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest px-3.5 mb-2.5">Menu</p>
          {navItems.map(({ label, icon: Icon, key, badge }) => {
            const active = activePage === key;
            return (
              <button
                key={key}
                onClick={() => { onNavigate(key); setMobileOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 group ${
                  active
                    ? "bg-violet-600 text-white shadow-md shadow-violet-200/60"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <Icon
                  className={`w-[17px] h-[17px] shrink-0 ${active ? "text-white" : "text-slate-400 group-hover:text-slate-600"}`}
                  strokeWidth={active ? 2.5 : 2}
                />
                <span>{label}</span>
                {badge && (
                  <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full ${active ? "bg-white/20 text-white" : "bg-violet-50 text-violet-600"}`}>
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Weekly pill */}
        <div className="mx-3 mb-3 px-4 py-3 rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100">
          <div className="flex items-center gap-1.5 mb-0.5">
            <Zap className="w-3 h-3 text-violet-500" fill="currentColor" />
            <p className="text-[11px] font-bold text-violet-700">3 deadlines this week</p>
          </div>
          <p className="text-[10.5px] text-slate-500 leading-relaxed">Stay ahead of your submissions.</p>
        </div>

        {/* Profile */}
        <div className="px-3 pb-4 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white text-[11px] font-bold shrink-0">AR</div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-slate-800 truncate">User</p>
              <p className="text-[10.5px] text-slate-400 truncate">3rd Year · CSE</p>
            </div>
            <Bell className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}
