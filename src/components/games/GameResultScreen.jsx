import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, Coins, RotateCcw, ChevronRight, BookOpen, LayoutDashboard, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GAME_METADATA } from '../../data/gamification';

export default function GameResultScreen({ 
  gameId, 
  results, // { score, accuracy, time, mistakes, xpEarned, coinsEarned, badgeUnlocked, rank }
  onReplay, 
  onNext 
}) {
  const metadata = GAME_METADATA[gameId] || {};
  
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 'Gold': return 'text-amber-400';
      case 'Silver': return 'text-slate-300';
      case 'Bronze': return 'text-orange-400';
      default: return 'text-indigo-400';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-indigo-500/20"
      >
        {/* Left Side: Stats & Rewards */}
        <div className="flex-1 p-8 md:p-12 bg-gradient-to-br from-indigo-600 to-purple-700 text-white relative overflow-hidden">
          <div className="relative z-10">
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest">
                {metadata.name} Finished
              </span>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black mb-8 leading-tight">
              Mission <br /> Accomplished!
            </motion.h2>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10">
                <div className="flex items-center gap-2 text-indigo-200 text-xs font-bold uppercase mb-1">
                  <Zap size={14} /> Score
                </div>
                <div className="text-2xl font-black">{results.score}</div>
              </motion.div>
              <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10">
                <div className="flex items-center gap-2 text-indigo-200 text-xs font-bold uppercase mb-1">
                  <Star size={14} /> Accuracy
                </div>
                <div className="text-2xl font-black">{results.accuracy}%</div>
              </motion.div>
              <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10">
                <div className="flex items-center gap-2 text-indigo-200 text-xs font-bold uppercase mb-1">
                  <Coins size={14} /> Coins
                </div>
                <div className="text-2xl font-black">+{results.coinsEarned}</div>
              </motion.div>
              <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10">
                <div className="flex items-center gap-2 text-indigo-200 text-xs font-bold uppercase mb-1">
                   Rank
                </div>
                <div className={`text-2xl font-black ${getRankColor(results.rank)}`}>
                  {results.rank}
                </div>
              </motion.div>
            </div>

            {results.badgeUnlocked && (
              <motion.div 
                variants={itemVariants}
                className="bg-amber-400/20 backdrop-blur-md border-2 border-amber-400/50 p-6 rounded-[2rem] flex items-center gap-4 animate-pulse mb-8"
              >
                <div className="text-4xl">{results.badgeUnlocked.icon}</div>
                <div>
                  <div className="text-xs font-black uppercase text-amber-200">New Badge Unlocked!</div>
                  <div className="text-lg font-black text-white">{results.badgeUnlocked.name}</div>
                </div>
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="flex gap-4">
              <button 
                onClick={onReplay}
                className="flex-1 py-4 bg-white text-indigo-600 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
              >
                <RotateCcw size={20} /> Replay
              </button>
              <button 
                onClick={onNext}
                className="flex-1 py-4 bg-indigo-500 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-indigo-400 transition-colors border border-white/20"
              >
                Next <ChevronRight size={20} />
              </button>
            </motion.div>
          </div>

          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <Trophy className="absolute -top-10 -left-10 text-white/5 w-64 h-64 -rotate-12" />
        </div>

        {/* Right Side: Educational Summary */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-between bg-white dark:bg-slate-900">
          <div>
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600">
                <Brain size={28} />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Concept Learned</h3>
                <p className="text-lg font-black text-slate-800 dark:text-slate-100">{metadata.concept}</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-black uppercase text-indigo-500 mb-2 tracking-widest">Key Takeaway</h4>
                <p className="text-slate-600 dark:text-slate-400 font-bold leading-relaxed italic">
                  "{metadata.summary}"
                </p>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/20 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-900/30">
                <h4 className="text-xs font-black uppercase text-emerald-500 mb-2 tracking-widest">Real-World Application</h4>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  {metadata.application}
                </p>
              </div>
              
              <div className="p-6 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-black uppercase text-slate-400 mb-2 tracking-widest">Performance Feedback</h4>
                <p className="text-slate-800 dark:text-slate-200 font-bold">
                  {results.accuracy >= 90 ? "Excellent! You mastered this concept." : 
                   results.accuracy >= 70 ? "Great job! Practice more for mastery." :
                   results.accuracy >= 50 ? "Good attempt. Retry for improvement." :
                   "Try Learn Mode first, then replay."}
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4">
            <Link to="/modules" className="text-slate-400 hover:text-indigo-600 font-black text-sm flex items-center gap-2 transition-colors">
              <BookOpen size={18} /> Learn Theory
            </Link>
            <Link to="/dashboard" className="text-slate-400 hover:text-indigo-600 font-black text-sm flex items-center gap-2 transition-colors">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
