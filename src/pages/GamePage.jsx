import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Brain, Zap, Target, Trophy, Play, RotateCcw, AlertTriangle, Sparkles, Star } from 'lucide-react';
import { getUser, updateUser } from '../utils/auth';
import Navbar from '../components/Navbar';

const LEVELS = [
  { id: 1, title: "Input Flow", description: "Arrange the layers in the correct forward-pass order.", items: ["Input Layer", "Hidden Layer 1", "Activation", "Output Layer"], goal: ["Input Layer", "Hidden Layer 1", "Activation", "Output Layer"], reward: 50 },
  { id: 2, title: "Weight Tuning", description: "Place the activation functions where they belong to maximize signal.", items: ["ReLU", "Raw Data", "Softmax", "Weights"], goal: ["Raw Data", "Weights", "ReLU", "Softmax"], reward: 100 },
];

export default function GamePage() {
  const [level, setLevel] = useState(0);
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    // Ensure the shuffled array is not already in the goal order
    return JSON.stringify(shuffled) === JSON.stringify(LEVELS[level]?.goal) 
      ? shuffleArray(array) 
      : shuffled;
  };

  const [items, setItems] = useState(() => shuffleArray(LEVELS[0].items));
  const [isWon, setIsWon] = useState(false);
  const [score, setScore] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  
  const user = getUser();

  useEffect(() => {
    // Only check for win if items are NOT in the initial setup state or after a move
    if (!isWon && JSON.stringify(items) === JSON.stringify(LEVELS[level].goal)) {
      handleWin();
    }
  }, [items, level]);

  const handleWin = () => {
    setIsWon(true);
    setScore(s => s + LEVELS[level].reward);
    
    // Update user XP
    const currentUser = getUser();
    updateUser({ score: (currentUser.score || 0) + LEVELS[level].reward });
  };

  const nextLevel = () => {
    if (level < LEVELS.length - 1) {
      const nextLvl = level + 1;
      setLevel(nextLvl);
      setItems(shuffleArray(LEVELS[nextLvl].items));
      setIsWon(false);
    } else {
      setShowIntro(true); // Show completion state
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-theme pb-20">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {showIntro ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="bg-indigo-600 dark:bg-indigo-900 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-8"
                >
                  <Brain size={48} />
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Neural Arena</h1>
                <p className="text-xl text-indigo-100/80 mb-12 max-w-2xl mx-auto font-medium">
                  Challenge your intuition! Build the most efficient neural paths by arranging architectural components in the correct logic flow.
                </p>
                <button
                  onClick={() => setShowIntro(false)}
                  className="px-12 py-5 bg-white text-indigo-600 rounded-[2rem] font-black text-xl shadow-xl hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 mx-auto"
                >
                  <Play size={24} fill="currentColor" /> Enter Arena
                </button>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
            </motion.div>
          ) : (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                 <div>
                    <span className="text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-widest">Level {level + 1} of {LEVELS.length}</span>
                    <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">{LEVELS[level].title}</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">{LEVELS[level].description}</p>
                 </div>
                 <div className="flex gap-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm transition-theme">
                       <Zap className="text-amber-500" fill="currentColor" size={20} />
                       <span className="font-black text-slate-800 dark:text-slate-200">{score} XP</span>
                    </div>
                 </div>
              </div>

              {/* Game Board */}
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-inner border border-gray-100 dark:border-slate-800">
                <div className="flex flex-col items-center gap-4">
                   <div className="w-full max-w-md">
                      <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-4">
                        {items.map((item) => (
                          <Reorder.Item 
                            key={item} 
                            value={item}
                            className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-700 cursor-grab active:cursor-grabbing hover:border-indigo-500 transition-colors shadow-sm flex items-center justify-between group"
                          >
                            <span className="font-bold text-slate-700 dark:text-slate-200">{item}</span>
                            <div className="flex gap-1 group-active:scale-110 transition-transform">
                               {[1,2,3].map(i => <div key={i} className="w-1 h-4 bg-slate-300 dark:bg-slate-600 rounded-full" />)}
                            </div>
                          </Reorder.Item>
                        ))}
                      </Reorder.Group>
                   </div>
                </div>

                <div className="mt-12 flex flex-col items-center gap-4">
                   <div className="flex items-center gap-2 text-amber-500 font-bold uppercase text-xs tracking-widest">
                      <Target size={16} /> Drag items to reorder
                   </div>
                   
                   <AnimatePresence>
                     {isWon && (
                       <motion.div
                         initial={{ opacity: 0, scale: 0.5, y: 20 }}
                         animate={{ opacity: 1, scale: 1, y: 0 }}
                         className="flex flex-col items-center"
                       >
                         <div className="flex items-center gap-2 mb-6 text-emerald-500 font-black text-xl animate-bounce">
                           <Sparkles /> PATH OPTIMIZED! <Sparkles />
                         </div>
                         <button
                           onClick={nextLevel}
                           className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all flex items-center gap-3"
                         >
                           Continue to Next Circuit <Star size={20} fill="currentColor" />
                         </button>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                 {[
                   { title: "Architectural Logic", desc: "Understanding the sequence of data flow is key to model performance.", icon: Brain },
                   { title: "Activation Synergy", desc: "Placing activations correctly prevents gradient vanishing issues.", icon: Zap },
                   { title: "Reward Engine", desc: "Higher difficulty tiers unlock exclusive badges and path multipliers.", icon: Trophy }
                 ].map((tip, i) => (
                    <div key={i} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-6 rounded-3xl border border-white dark:border-slate-800">
                       <tip.icon className="text-indigo-500 mb-4" size={24} />
                       <h4 className="font-black text-slate-800 dark:text-slate-200 text-sm mb-2 uppercase tracking-tight">{tip.title}</h4>
                       <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{tip.desc}</p>
                    </div>
                 ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
