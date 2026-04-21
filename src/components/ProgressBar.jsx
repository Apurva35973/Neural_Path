export default function ProgressBar({ value = 0, max = 100, color = 'bg-indigo-600' }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden shadow-inner border border-black/5 dark:border-white/5">
      <div
        className={`${color} h-3 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_-3px_rgba(0,0,0,0.1)]`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
