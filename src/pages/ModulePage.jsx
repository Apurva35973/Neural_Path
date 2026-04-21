import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Code, Eye, HelpCircle, ChevronRight, Zap, Target, BookOpen, Layers, Sparkles, Terminal, Trophy } from 'lucide-react';
import { modules } from '../data/modules';
import { getUser, updateUser } from '../utils/auth';
import Navbar from '../components/Navbar';
import AlgorithmVisualizer from '../visualizations/AlgorithmVisualizer';
import CodeEditor from '../components/CodeEditor';
import AITutor from '../components/AITutor';
import WhatIfSimulator from '../components/WhatIfSimulator';

export default function ModulePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('explanation'); // explanation, visualization, practice
  const [isELI5, setIsELI5] = useState(false);
  
  const mod = useMemo(() => modules.find(m => m.id === id), [id]);
  const user = getUser();

  if (!mod) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center">
        <Navbar />
        <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100">Module Not Found</h1>
      </div>
    );
  }

  const handleComplete = () => {
    if (!user.completedModules?.includes(id)) {
      const updated = [...(user.completedModules || []), id];
      updateUser({ completedModules: updated, score: (user.score || 0) + 10 });
    }
    navigate(`/quiz/${id}`);
  };

  const levelColor = {
    Beginner: 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400',
    Intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400',
    Advanced: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <AITutor moduleName={mod.title} />

      {/* Module Header Area */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                 <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${levelColor[mod.level]}`}>
                    {mod.level}
                 </span>
                 <span className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-tighter flex items-center gap-1">
                   <BookOpen size={14} /> Module Path
                 </span>
              </div>
              <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mt-4 tracking-tight">
                {mod.title}
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
                {mod.description}
              </p>
            </div>
            
            {/* ELI5 Toggle */}
            <div className="flex items-center gap-3 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-3xl border border-indigo-100 dark:border-indigo-500/10">
               <div>
                  <p className="text-sm font-black text-indigo-600 dark:text-indigo-400 leading-none">ELI5 Mode</p>
                  <p className="text-[10px] text-indigo-400 mt-1 uppercase font-bold tracking-tight">Simple Explanations</p>
               </div>
               <button 
                onClick={() => setIsELI5(!isELI5)}
                className={`w-12 h-6 rounded-full transition-all relative ${isELI5 ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'}`}
               >
                 <motion.div 
                    animate={{ x: isELI5 ? 26 : 4 }}
                    className="w-4 h-4 bg-white rounded-full absolute top-1"
                 />
               </button>
            </div>
          </div>
        </div>
        
        {/* Module Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 -mb-[1px]">
            {[
              { id: 'explanation', label: 'Theory', icon: Layers },
              { id: 'visualization', label: '3D Simulation', icon: Eye },
              { id: 'practice', label: 'Code Lab', icon: Code },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest border-b-2 transition-all ${
                  activeTab === tab.id 
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' 
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          
          {/* Theory Tab */}
          {activeTab === 'explanation' && (
            <motion.div
              key="explanation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-8"
            >
              {isELI5 ? (
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 md:p-12 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                        <Sparkles size={24} />
                      </div>
                      <h2 className="text-2xl font-black">Plain English Version</h2>
                   </div>
                   <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-4xl text-indigo-50">
                     "{mod.layman}"
                   </p>
                   <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mod.sections.map((sec, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
                    >
                      <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Zap size={24} />
                      </div>
                      <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-4 tracking-tight uppercase leading-tight">{sec.heading}</h3>
                      <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{sec.body}</p>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* Common section for all explanatory modules */}
              <div className="bg-slate-100 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 text-center">
                 <h4 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">Pro Tip</h4>
                 <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 font-medium italic">
                   "Mastery comes from understanding the math first, then the code. Check the 3D visualizer to see how the logic shapes the data."
                 </p>
              </div>
            </motion.div>
          )}

          {/* Visualization Tab */}
          {activeTab === 'visualization' && (
            <motion.div
              key="viz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              <AlgorithmVisualizer type={mod.id} />
              
              {/* Dynamic What-If Section */}
              <WhatIfSimulator type={mod.id} />
            </motion.div>
          )}

          {/* Practice Tab */}
          {activeTab === 'practice' && (
            <motion.div
              key="practice"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                <div>
                   <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-3">
                      <Terminal className="text-indigo-600" /> Interactive Lab
                   </h2>
                   <p className="text-slate-500 font-medium">Write, run and analyze algorithm performance</p>
                </div>
              </div>
              
              <CodeEditor initialLanguage="javascript" />
            </motion.div>
          )}

        </AnimatePresence>

        {/* Footer Navigation */}
        <div className="mt-16 pt-12 border-t border-gray-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center">
                 <Trophy size={28} />
              </div>
              <div>
                 <p className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none">Ready for the Quiz?</p>
                 <p className="text-slate-500 text-sm font-medium mt-1">Pass to unlock the next module and earn <span className="text-indigo-600 font-bold">50 XP</span></p>
              </div>
           </div>
           
           <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleComplete}
            className="w-full md:w-auto px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[2rem] font-bold text-lg shadow-2xl shadow-indigo-600/20 flex items-center justify-center gap-3 transition-all"
           >
             Start Knowledge Check <ChevronRight size={20} strokeWidth={3} />
           </motion.button>
        </div>
      </main>
    </div>
  );
}
