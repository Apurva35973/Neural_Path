import { motion } from 'framer-motion';

export default function BadgeCard({ emoji, name, description }) {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl shadow-indigo-500/5 border border-gray-100 dark:border-slate-800 p-6 transition-all group"
    >
      <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform">
        {emoji}
      </div>
      <div>
        <p className="font-black text-slate-800 dark:text-slate-100 tracking-tight uppercase text-sm leading-tight">{name}</p>
        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-1">{description}</p>
      </div>
    </motion.div>
  );
}
