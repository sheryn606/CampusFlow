import { useState } from "react";
import { CalendarDays, Sparkles, CheckCircle2, Circle, ChevronDown, ChevronUp, BookOpen } from "lucide-react";

const priorityStyles = {
  Critical: "bg-red-50 text-red-600 ring-1 ring-red-100",
  High:     "bg-rose-50 text-rose-600 ring-1 ring-rose-100",
  Medium:   "bg-amber-50 text-amber-600 ring-1 ring-amber-100",
  Low:      "bg-slate-100 text-slate-500 ring-1 ring-slate-200",
};

const statusStyles = {
  "In Progress": "bg-violet-50 text-violet-700 ring-1 ring-violet-100",
  "Not Started": "bg-slate-100 text-slate-500 ring-1 ring-slate-200",
  Completed:     "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
};

const statusDot = {
  "In Progress": "bg-violet-500",
  "Not Started": "bg-slate-400",
  Completed:     "bg-emerald-500",
};

const typeStyles = {
  Assignment: "bg-indigo-50 text-indigo-600",
  Lab:        "bg-purple-50 text-purple-600",
  Exam:       "bg-rose-50 text-rose-600",
  Project:    "bg-teal-50 text-teal-600",
};

const accentBar = {
  indigo:  "from-indigo-400 to-violet-500",
  rose:    "from-rose-400 to-pink-500",
  amber:   "from-amber-400 to-orange-500",
  emerald: "from-emerald-400 to-teal-500",
  violet:  "from-violet-400 to-purple-500",
  sky:     "from-sky-400 to-blue-500",
};

const progressBarColor = (p) =>
  p >= 80 ? "bg-emerald-500" : p >= 40 ? "bg-violet-500" : "bg-amber-400";

export default function TaskCard({ task }) {
  const [expanded, setExpanded] = useState(false);
  const { title, subject, subjectCode, dueDate, dueDateRaw, priority, status, type, subtasks = [], progress, color = "violet" } = task;

  const completedCount = subtasks.filter(s => s.done).length;

  // Days left calculation (relative to today)
  const today = new Date("2026-06-25");
  const due = dueDateRaw ? new Date(dueDateRaw) : null;
  const daysLeft = due ? Math.ceil((due - today) / 86400000) : null;
  const isOverdue = daysLeft !== null && daysLeft < 0 && status !== "Completed";
  const isDueSoon = daysLeft !== null && daysLeft <= 2 && daysLeft >= 0 && status !== "Completed";

  const dueLabelColor = isOverdue ? "text-red-500" : isDueSoon ? "text-amber-600" : "text-slate-400";
  const dueLabel = status === "Completed"
    ? `Submitted ${dueDate}`
    : isOverdue
    ? `Overdue by ${Math.abs(daysLeft)}d`
    : daysLeft === 0 ? "Due today"
    : daysLeft === 1 ? "Due tomorrow"
    : `${dueDate}${daysLeft ? ` · ${daysLeft}d left` : ""}`;

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5 transition-all duration-250 overflow-hidden">
      {/* Color accent bar */}
      <div className={`h-[3px] bg-gradient-to-r ${accentBar[color] || accentBar.violet}`} />

      <div className="p-5">
        {/* Top badges row */}
        <div className="flex items-center gap-1.5 flex-wrap mb-3">
          {type && (
            <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${typeStyles[type] || "bg-slate-100 text-slate-500"}`}>
              {type}
            </span>
          )}
          <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${priorityStyles[priority] || priorityStyles.Low}`}>
            {priority}
          </span>
          <span className={`ml-auto flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${statusStyles[status] || statusStyles["Not Started"]}`}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusDot[status] || "bg-slate-400"}`} />
            {status}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-semibold text-slate-900 leading-snug mb-1.5">{title}</h3>

        {/* Subject */}
        <div className="flex items-center gap-1.5 mb-1">
          <BookOpen className="w-3 h-3 text-slate-400 shrink-0" />
          <p className="text-[11.5px] text-slate-500">
            {subjectCode ? `${subjectCode} · ` : ""}{subject}
          </p>
        </div>

        {/* Due date */}
        <div className={`flex items-center gap-1.5 mb-4 ${dueLabelColor}`}>
          <CalendarDays className="w-3 h-3 shrink-0" />
          <span className="text-[11.5px] font-medium">{dueLabel}</span>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10.5px] font-medium text-slate-400 uppercase tracking-wider">Progress</span>
            <span className="text-[12px] font-bold text-slate-700">{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${progressBarColor(progress)}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Subtask toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between text-[11px] font-semibold text-slate-500 hover:text-slate-700 transition-colors pt-2 mt-0.5 border-t border-slate-50"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-violet-400" />
            AI Subtasks · {completedCount}/{subtasks.length} done
          </span>
          {expanded
            ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
            : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          }
        </button>

        {/* Subtask list */}
        {expanded && (
          <ul className="mt-3 space-y-2">
            {subtasks.map((sub, i) => {
              const done = typeof sub === "object" ? sub.done : i / subtasks.length < progress / 100;
              const text = typeof sub === "object" ? sub.text : sub;
              return (
                <li key={i} className="flex items-start gap-2">
                  {done
                    ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    : <Circle className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" />
                  }
                  <span className={`text-[12.5px] leading-relaxed ${done ? "line-through text-slate-400" : "text-slate-600"}`}>
                    {text}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
