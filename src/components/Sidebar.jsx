import { LayoutDashboard, ListChecks, CalendarCheck2, CalendarDays, Settings, GraduationCap } from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
  { label: "Deadlines", icon: ListChecks, key: "deadlines" },
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
        className={`fixed z-50 inset-y-0 left-0 w-64 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2.5 px-6 h-[72px] border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center shadow-md shadow-violet-200">
            <GraduationCap className="w-5 h-5 text-white" strokeWidth={2.25} />
          </div>
          <div>
            <p className="text-[15px] font-semibold text-slate-900 tracking-tight leading-none">CampusFlow</p>
            <p className="text-[11px] text-slate-400 leading-none mt-0.5">Student workspace</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          {navItems.map(({ label, icon: Icon, key }) => {
            const active = activePage === key;
            return (
              <button
                key={key}
                onClick={() => {
                  onNavigate(key);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-200 group relative ${
                  active
                    ? "bg-violet-50 text-violet-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full bg-violet-600" />
                )}
                <Icon
                  className={`w-[18px] h-[18px] transition-colors ${
                    active ? "text-violet-600" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                  strokeWidth={2}
                />
                {label}
              </button>
            );
          })}
        </nav>

        <div className="p-3 mx-3 mb-5 rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100/80">
          <p className="text-[12px] font-semibold text-slate-700">3 deadlines this week</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Stay ahead of your submissions.</p>
        </div>
      </aside>
    </>
  );
}
