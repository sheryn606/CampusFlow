import { useState } from "react";
import { X, CalendarDays, Tag, FileText, Sparkles, ChevronDown } from "lucide-react";

const vibeOptions = [
  { value: "Encouraging",       emoji: "🌟", desc: "Warm and supportive nudges" },
  { value: "Passive-Aggressive", emoji: "😤", desc: "Guilt-trip energy, no chill" },
  { value: "Drill Sergeant",    emoji: "🪖", desc: "Get it done, soldier" },
];

export default function AddDeadlineModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    vibe: "Encouraging",
  });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.title.trim())       e.title = "Title is required";
    if (!formData.description.trim()) e.description = "Description is required";
    if (!formData.dueDate)            e.dueDate = "Due date is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    console.log("Submitting:", formData);
    setFormData({ title: "", description: "", dueDate: "", vibe: "Encouraging" });
    onClose();
  };

  const inputBase =
    "w-full px-3.5 py-2.5 text-[13.5px] bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all placeholder:text-slate-400 text-slate-800";
  const inputOk  = "border-slate-200 focus:ring-violet-500/20 focus:border-violet-300";
  const inputErr = "border-rose-300 focus:ring-rose-500/20 focus:border-rose-400 bg-rose-50/40";

  return (
    // Overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl shadow-slate-900/20 overflow-hidden animate-in">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-[16px] font-bold text-slate-900">Add New Deadline</h2>
            <p className="text-[12px] text-slate-400 mt-0.5">Track a new task or submission</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 space-y-4">

          {/* Title */}
          <div>
            <label className="flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              <Tag className="w-3 h-3" /> Task Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Data Structures Assignment"
              value={formData.title}
              onChange={handleChange}
              className={`${inputBase} ${errors.title ? inputErr : inputOk}`}
            />
            {errors.title && <p className="text-[11px] text-rose-500 mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              <FileText className="w-3 h-3" /> Description
            </label>
            <textarea
              name="description"
              placeholder="What does this task involve?"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`${inputBase} resize-none ${errors.description ? inputErr : inputOk}`}
            />
            {errors.description && <p className="text-[11px] text-rose-500 mt-1">{errors.description}</p>}
          </div>

          {/* Due date */}
          <div>
            <label className="flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              <CalendarDays className="w-3 h-3" /> Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={`${inputBase} ${errors.dueDate ? inputErr : inputOk}`}
            />
            {errors.dueDate && <p className="text-[11px] text-rose-500 mt-1">{errors.dueDate}</p>}
          </div>

          {/* Vibe selector */}
          <div>
            <label className="flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-600 uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-violet-500" /> AI Reminder Vibe
            </label>
            <div className="grid grid-cols-3 gap-2">
              {vibeOptions.map(({ value, emoji, desc }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, vibe: value }))}
                  className={`flex flex-col items-center gap-1 px-2 py-3 rounded-xl border text-center transition-all duration-150 ${
                    formData.vibe === value
                      ? "border-violet-300 bg-violet-50 shadow-sm shadow-violet-100"
                      : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <span className="text-lg">{emoji}</span>
                  <span className={`text-[10.5px] font-semibold leading-tight ${formData.vibe === value ? "text-violet-700" : "text-slate-600"}`}>
                    {value}
                  </span>
                  <span className="text-[9.5px] text-slate-400 leading-tight">{desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/60">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-[13.5px] font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 text-[13.5px] font-semibold text-white bg-violet-600 hover:bg-violet-700 active:scale-95 rounded-xl shadow-md shadow-violet-200 transition-all duration-150"
          >
            Add Deadline
          </button>
        </div>
      </div>
    </div>
  );
}
