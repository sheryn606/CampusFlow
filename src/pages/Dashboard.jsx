import { useMemo, useState } from "react";
import {
  Search,
  ListTodo,
  Clock4,
  CheckCircle2,
  Flame,
} from "lucide-react";

import DashboardLayout from "../components/DashboardLayout";
import TaskCard from "../components/TaskCard";
import AddDeadlineModal from "../components/AddDeadlineModal";
import { deadlines } from "../data/mockData";

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // ✅ modal (Jerusha feature)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = useMemo(() => ({
    total: deadlines.length,
    upcoming: deadlines.filter(d => d.status !== "Completed").length,
    completed: deadlines.filter(d => d.status === "Completed").length,
    highPriority: deadlines.filter(d => d.priority === "High").length,
  }), []);

  const filtered = useMemo(() => {
    return deadlines.filter(d => {
      const matchesQuery =
        d.title.toLowerCase().includes(query.toLowerCase()) ||
        d.subject.toLowerCase().includes(query.toLowerCase());

      const matchesStatus =
        statusFilter === "All Status" || d.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl font-bold">CampusFlow Dashboard</h1>
        <p className="text-slate-500 text-sm">
          Manage your deadlines efficiently
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex gap-3 mb-5">
        <input
          className="border px-3 py-2 rounded-lg w-full"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* ✅ ADD BUTTON */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-violet-600 text-white px-4 rounded-lg"
        >
          Add
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div>Total: {stats.total}</div>
        <div>Upcoming: {stats.upcoming}</div>
        <div>Completed: {stats.completed}</div>
        <div>High: {stats.highPriority}</div>
      </div>

      {/* TASKS */}
      <div className="grid gap-3">
        {filtered.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {/* MODAL (HER FEATURE) */}
      <AddDeadlineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </DashboardLayout>
  );
}