import { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function ActivityHeatmap() {
  // Generate last 365 days of data
  const days = useMemo(() => {
    const data = [];
    const today = new Date();
    // Start with last 52 weeks (364 days)
    for (let i = 363; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      // Simulate some random intensity
      const intensity = Math.random() > 0.8 ? Math.floor(Math.random() * 4) + 1 : 0;
      data.push({ date, intensity });
    }
    return data;
  }, []);

  const getColor = (level) => {
    switch(level) {
      case 1: return 'bg-indigo-200 dark:bg-indigo-900/40';
      case 2: return 'bg-indigo-400 dark:bg-indigo-700/60';
      case 3: return 'bg-indigo-600 dark:bg-indigo-500/80';
      case 4: return 'bg-indigo-800 dark:bg-indigo-400';
      default: return 'bg-gray-100 dark:bg-slate-800';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Daily Activity</h3>
        <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map(l => (
            <div key={l} className={`w-3 h-3 rounded-[2px] ${getColor(l)}`} />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="flex gap-[3px] overflow-x-auto pb-2 scrollbar-hide">
        {/* Render columns of 7 days */}
        {Array.from({ length: 52 }).map((_, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-[3px]">
            {days.slice(colIdx * 7, (colIdx + 1) * 7).map((day, dayIdx) => (
              <motion.div
                key={dayIdx}
                title={`${day.date.toDateString()}: ${day.intensity} activities`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: (colIdx * 0.01) + (dayIdx * 0.005) }}
                className={`w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] rounded-[2px] ${getColor(day.intensity)} transition-colors cursor-pointer hover:ring-1 hover:ring-indigo-500`}
              />
            ))}
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
        <span>Jan</span>
        <span>Apr</span>
        <span>Jul</span>
        <span>Oct</span>
        <span>Dec</span>
      </div>
    </div>
  );
}
