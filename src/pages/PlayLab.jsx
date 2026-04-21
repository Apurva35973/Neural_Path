import { motion } from 'framer-motion';
import { Play, Star, Trophy, Brain, Zap, Target, Bot, Shield, Activity, TrendingDown, LineChart, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useGamification } from '../hooks/useGamification';
import { GAME_METADATA } from '../data/gamification';

const ICON_MAP = {
  Brain: Brain,
  LineChart: LineChart,
  Shield: Shield,
  LayoutGrid: LayoutGrid,
  Bot: Bot,
  Divide: Target, // Fallback
  Activity: Activity,
  TrendingDown: TrendingDown
};

export default function PlayLab() {
  const { user } = useGamification();

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <Zap size={14} fill="currentColor" /> NeuralPlay Arena
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 dark:text-slate-100 mb-6 tracking-tight">
            PlayLab <span className="text-indigo-600">Games Zone</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Master complex AI/ML concepts through interactive simulations. Win games, earn XP, and unlock exclusive badges.
          </p>
        </motion.div>

        {/* User Stats Mini-Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 mb-12 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-center gap-8"
        >
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-amber-600">
                <Star size={20} fill="currentColor" />
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase">Level</div>
                <div className="text-lg font-black text-slate-800 dark:text-slate-100">{user?.level || 1}</div>
              </div>
           </div>
           <div className="w-px h-8 bg-slate-100 dark:bg-slate-800 hidden sm:block" />
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600">
                <Zap size={20} fill="currentColor" />
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase">Total XP</div>
                <div className="text-lg font-black text-slate-800 dark:text-slate-100">{user?.xp || 0}</div>
              </div>
           </div>
           <div className="w-px h-8 bg-slate-100 dark:bg-slate-800 hidden sm:block" />
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600">
                <Trophy size={20} />
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase">Badges</div>
                <div className="text-lg font-black text-slate-800 dark:text-slate-100">{user?.badges?.length || 0} / 8</div>
              </div>
           </div>
        </motion.div>

        {/* Games Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {Object.entries(GAME_METADATA).map(([id, meta]) => {
            const isPlayed = user?.gameHistory?.some(h => h.gameId === id);
            const Icon = ICON_MAP[id === 'decision-tree' ? 'Brain' : 
                          id === 'fit-the-line' ? 'LineChart' :
                          id === 'spam-catcher' ? 'Shield' :
                          id === 'cluster-fruits' ? 'LayoutGrid' :
                          id === 'train-robot' ? 'Bot' :
                          id === 'hyperplane-hero' ? 'Divide' :
                          id === 'neural-connect' ? 'Activity' : 'TrendingDown'] || Brain;

            return (
              <motion.div key={id} variants={itemVariants}>
                <Link 
                  to={`/game/${id}`}
                  className="group block relative bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all hover:-translate-y-2 h-full overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                        <Icon size={28} />
                      </div>
                      {isPlayed && (
                        <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 p-1.5 rounded-full">
                          <Star size={14} fill="currentColor" />
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2 tracking-tight group-hover:text-indigo-600 transition-colors">
                      {meta.name}
                    </h3>
                    <p className="text-sm text-slate-400 font-medium line-clamp-2 mb-6">
                      {meta.concept}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Difficulty: {['Basic', 'Intermediate', 'Advanced'][meta.difficulty - 1]}
                      </span>
                      <div className="flex items-center gap-1 text-indigo-600 font-bold text-sm">
                        Play <Play size={14} fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative element */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </main>
    </div>
  );
}
