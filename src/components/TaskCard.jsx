import { CalendarDays, Sparkles, CheckCircle2, Circle } from "lucide-react";

const priorityStyles = {
  High: "bg-rose-50 text-rose-600 ring-1 ring-rose-100",
  Medium: "bg-amber-50 text-amber-600 ring-1 ring-amber-100",
  Low: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100",
};

const statusStyles = {
  "In Progress": "bg-violet-50 text-violet-600 ring-1 ring-violet-100",
  "Not Started": "bg-slate-100 text-slate-500 ring-1 ring-slate-200",
  Completed: "bg-sky-50 text-sky-600 ring-1 ring-sky-100",
};

const progressColor = (p) =>
  p >= 80 ? "bg-emerald-500" : p >= 40 ? "bg-violet-500" : "bg-amber-500";

export default function TaskCard({ task }) {
  const { title, subject, dueDate, priority, status, subtasks = [], progress } = task;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 p-5 hover:shadow-lg hover:shadow-slate-200/60 hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900 leading-snug">{title}</h3>
          <p className="text-[12.5px] text-slate-400 mt-0.5">{subject}</p>
        </div>
        <span className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full ${priorityStyles[priority]}`}>
          {priority}
        </span>
      </div>

      <div className="flex items-center gap-4 mt-3 text-[12.5px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
          {dueDate}
        </span>
        <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyles[status]}`}>
          {status}
        </span>
      </div>

      <div className="mt-4 bg-slate-50 rounded-xl p-3">
        <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-slate-500 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-violet-500" />
          AI-generated subtasks
        </p>
        <ul className="space-y-1.5">
          {subtasks.map((t, i) => (
            <li key={i} className="flex items-center gap-2 text-[13px] text-slate-600">
              {i / subtasks.length < progress / 100 ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              )}
              <span className={i / subtasks.length < progress / 100 ? "line-through text-slate-400" : ""}>
                {t}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11.5px] font-medium text-slate-400">Progress</span>
          <span className="text-[12px] font-semibold text-slate-700">{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${progressColor(progress)}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
