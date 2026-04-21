import { motion } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp, Search, User, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import { getUser } from '../utils/auth';

export default function Leaderboard() {
  const user = getUser();
  
  // Mock leaderboard data
  const players = [
    { name: 'Alex neural', score: 2450, rank: 1, level: 15, avatar: '🧠' },
    { name: 'Bias Buster', score: 2100, rank: 2, level: 12, avatar: '🛡️' },
    { name: 'Gradient King', score: 1850, rank: 3, level: 10, avatar: '👑' },
    { name: 'Epoch Queen', score: 1200, rank: 4, level: 8, avatar: '👸' },
    { name: user?.name || 'You', score: user?.score || 0, rank: 5, level: 2, avatar: '👤', isUser: true },
    { name: 'Turing Test', score: 950, rank: 6, level: 5, avatar: '🤖' },
    { name: 'Overfit Sam', score: 800, rank: 7, level: 4, avatar: '📉' },
  ].sort((a, b) => b.score - a.score).map((p, i) => ({...p, rank: i+1}));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
           <motion.div 
             initial={{ scale: 0 }} animate={{ scale: 1 }}
             className="w-20 h-20 bg-amber-100 dark:bg-amber-500/10 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/10"
           >
              <Trophy size={40} />
           </motion.div>
           <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tight">World Rankings</h1>
           <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">The top neural architects competing for global dominance.</p>
        </header>

        {/* Top 3 Podiums */}
        <div className="grid grid-cols-3 gap-4 mb-12 items-end max-w-2xl mx-auto">
           {/* 2nd place */}
           <motion.div 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
            className="flex flex-col items-center"
           >
              <div className="text-3xl mb-2">{players[1].avatar}</div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-24 rounded-t-3xl flex flex-col items-center justify-center p-4 border-b-0 border border-slate-300 dark:border-slate-700">
                 <Medal className="text-slate-400 mb-1" />
                 <span className="font-black text-slate-600 dark:text-slate-300 text-xs truncate w-full text-center">{players[1].name}</span>
              </div>
           </motion.div>
           {/* 1st place */}
           <motion.div 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center"
           >
              <div className="text-5xl mb-3">{players[0].avatar}</div>
              <div className="w-full bg-amber-400 dark:bg-amber-500 h-36 rounded-t-3xl flex flex-col items-center justify-center p-4 shadow-2xl shadow-amber-500/20">
                 <Trophy className="text-white mb-2" size={28} />
                 <span className="font-black text-white text-sm truncate w-full text-center">{players[0].name}</span>
              </div>
           </motion.div>
           {/* 3rd place */}
           <motion.div 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
           >
              <div className="text-3xl mb-2">{players[2].avatar}</div>
              <div className="w-full bg-orange-200 dark:bg-orange-900/40 h-20 rounded-t-3xl flex flex-col items-center justify-center p-4 border-b-0 border border-orange-300 dark:border-orange-800/40">
                 <Award className="text-orange-500 mb-1" />
                 <span className="font-black text-orange-700 dark:text-orange-400 text-xs truncate w-full text-center">{players[2].name}</span>
              </div>
           </motion.div>
        </div>

        {/* All Players List */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden">
           <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">
                 <TrendingUp size={18} className="text-indigo-600" /> Live Standings
              </div>
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                 <input 
                  placeholder="Find colleague..."
                  className="bg-slate-100 dark:bg-slate-800 border-none rounded-full py-1.5 pl-9 pr-4 text-xs font-bold outline-none ring-indigo-500/20 focus:ring-4 transition-all"
                 />
              </div>
           </div>

           <div className="divide-y divide-gray-50 dark:divide-slate-800">
              {players.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center justify-between p-6 transition-colors ${p.isUser ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
                >
                   <div className="flex items-center gap-6">
                      <span className={`w-8 font-black text-xl ${
                        p.rank === 1 ? 'text-amber-500' : 
                        p.rank === 2 ? 'text-slate-400' : 
                        p.rank === 3 ? 'text-orange-500' : 'text-slate-300 dark:text-slate-600'
                      }`}>
                        #{p.rank}
                      </span>
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                            {p.avatar}
                         </div>
                         <div>
                            <p className="font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
                              {p.name}
                              {p.isUser && <span className="text-[10px] font-black uppercase bg-indigo-600 text-white px-2 py-0.5 rounded-md">You</span>}
                            </p>
                            <p className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">Architect Lvl {p.level}</p>
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-2xl">
                      <Zap size={16} className="text-amber-500" fill="currentColor" />
                      <span className="font-black text-slate-800 dark:text-slate-200">{p.score}</span>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </main>
    </div>
  );
}
