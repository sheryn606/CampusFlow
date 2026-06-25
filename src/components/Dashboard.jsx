import { useMemo, useState } from "react";
import { Search, ListTodo, Clock4, CheckCircle2, Flame, ChevronDown } from "lucide-react";
import DashboardLayout from "./DashboardLayout";
import TaskCard from "./TaskCard";
import { deadlines } from "../data/mockData";

const statSpec = [
  { key: "total", label: "Total Deadlines", icon: ListTodo, accent: "text-violet-600", bg: "bg-violet-50" },
  { key: "upcoming", label: "Upcoming", icon: Clock4, accent: "text-amber-600", bg: "bg-amber-50" },
  { key: "completed", label: "Completed", icon: CheckCircle2, accent: "text-emerald-600", bg: "bg-emerald-50" },
  { key: "highPriority", label: "High Priority", icon: Flame, accent: "text-rose-600", bg: "bg-rose-50" },
];

const statusOptions = ["All Status", "Not Started", "In Progress", "Completed"];

export default function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [filterOpen, setFilterOpen] = useState(false);

  const stats = useMemo(
    () => ({
      total: deadlines.length,
      upcoming: deadlines.filter((d) => d.status !== "Completed").length,
      completed: deadlines.filter((d) => d.status === "Completed").length,
      highPriority: deadlines.filter((d) => d.priority === "High").length,
    }),
    []
  );

  const filtered = useMemo(() => {
    return deadlines.filter((d) => {
      const matchesQuery =
        d.title.toLowerCase().includes(query.toLowerCase()) ||
        d.subject.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "All Status" || d.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <DashboardLayout activePage={activePage} onNavigate={setActivePage}>
      <div className="flex flex-col gap-1 mb-7">
        <h1 className="text-[22px] sm:text-[26px] font-bold text-slate-900 tracking-tight">
          Welcome back, Sher 👋
        </h1>
        <p className="text-[13.5px] text-slate-500">
          Here's what's due across your courses this week.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-7">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search deadlines or subjects..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-[13.5px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 transition-all"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setFilterOpen((o) => !o)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-[13.5px] font-medium text-slate-600 hover:bg-slate-50 transition-colors min-w-[150px] justify-between"
          >
            {statusFilter}
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
          {filterOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl border border-slate-200 shadow-lg shadow-slate-200/60 py-1.5 z-20">
              {statusOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setStatusFilter(opt);
                    setFilterOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-[13px] hover:bg-slate-50 ${
                    statusFilter === opt ? "text-violet-600 font-medium" : "text-slate-600"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statSpec.map(({ key, label, icon: Icon, accent, bg }) => (
          <div
            key={key}
            className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 hover:shadow-md hover:shadow-slate-200/50 transition-all duration-300"
          >
            <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon className={`w-[18px] h-[18px] ${accent}`} strokeWidth={2.1} />
            </div>
            <p className="text-[22px] font-bold text-slate-900 leading-none">{stats[key]}</p>
            <p className="text-[12.5px] text-slate-500 mt-1.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-semibold text-slate-800">Active Deadlines</h2>
        <span className="text-[12.5px] text-slate-400">{filtered.length} results</span>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-400 text-[13.5px] bg-white rounded-2xl border border-slate-200/80">
          No deadlines match your search.
        </div>
      )}
    </DashboardLayout>
  );
}
