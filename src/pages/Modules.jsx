import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, BookOpen, ChevronRight, Zap, Target, Star, Layers, Code, Sparkles } from 'lucide-react';
import { modules } from '../data/modules';
import { getUser } from '../utils/auth';
import Navbar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';

export default function Modules() {
  const user = getUser();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const levelColor = {
    Beginner: 'text-green-500 bg-green-50 dark:bg-green-500/10',
    Intermediate: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10',
    Advanced: 'text-rose-500 bg-rose-50 dark:bg-rose-500/10',
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
             <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Explore</span>
             <h4 className="text-slate-400 font-bold uppercase tracking-widest text-xs">Curriculum Path</h4>
          </div>
          <h1 className="text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Master the <span className="text-indigo-600">NeuralPath</span>
          </h1>
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg max-w-2xl font-medium leading-relaxed">
            From foundational logic to advanced reinforcement learning. Complete modules to earn XP and unlock the specialized Neural Arena.
          </p>
        </header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {modules.map((m, idx) => {
            const isDone = user.completedModules?.includes(m.id);
            const isNext = !isDone && (idx === 0 || user.completedModules?.includes(modules[idx-1].id));

            return (
              <motion.div
                key={m.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className={`relative group bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all ${
                  isNext ? 'ring-2 ring-indigo-600 ring-offset-4 dark:ring-offset-slate-950' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                    isDone ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600' : 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600'
                  }`}>
                    {isDone ? <Star size={28} fill="currentColor" /> : <Brain size={28} />}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${levelColor[m.level]}`}>
                    {m.level}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-3 tracking-tight group-hover:text-indigo-600 transition-colors uppercase">
                  {m.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed line-clamp-2 mb-8">
                  {m.description}
                </p>

                <div className="flex items-center justify-between gap-4 mt-auto">
                   <div className="flex-1">
                      <ProgressBar value={isDone ? 100 : 0} color={isDone ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'} />
                   </div>
                   <Link 
                    to={`/module/${m.id}`}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isDone 
                        ? 'bg-emerald-500 text-white' 
                        : isNext 
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                    }`}
                   >
                     <ChevronRight size={24} strokeWidth={3} />
                   </Link>
                </div>

                {isNext && (
                  <div className="absolute -top-3 -right-3 bg-amber-500 text-white p-2 rounded-xl shadow-lg animate-bounce">
                    <Zap size={16} fill="currentColor" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </main>
    </div>
  );
}
