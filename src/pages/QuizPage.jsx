import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowRight, Home, RefreshCcw, Timer, Zap, CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react';
import { quizzes } from '../data/quizzes';
import { getUser, updateUser } from '../utils/auth';
import Navbar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';

export default function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const quizSet = quizzes[id] || [];
  
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);
  const [shake, setShake] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [streak, setStreak] = useState(0);

  const timerRef = useRef();
  const user = getUser();

  useEffect(() => {
    if (!showResult && !selected) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            handleAnswer(null);
            return 30;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [showResult, selected, currentQ]);

  const handleAnswer = (optionIdx) => {
    clearInterval(timerRef.current);
    setSelected(optionIdx);
    
    if (optionIdx === quizSet[currentQ].answer) {
      const bonus = streak > 2 ? 5 : 0;
      setScore(s => s + 10 + bonus);
      setStreak(s => s + 1);
    } else {
      setShake(true);
      setStreak(0);
      setTimeout(() => setShake(false), 500);
    }

    setTimeout(() => {
      if (currentQ < quizSet.length - 1) {
        setCurrentQ(c => c + 1);
        setSelected(null);
        setTimeLeft(30);
      } else {
        setShowResult(true);
        if (score + 10 >= quizSet.length * 7) {
            updateUser({ score: (user.score || 0) + score + (streak * 2) });
        }
      }
    }, 1500);
  };

  if (!quizSet.length) return <div className="p-10 text-center dark:text-white">Quiz not found.</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-slate-800"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                   <span className="text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-widest">
                      Question {currentQ + 1} of {quizSet.length}
                   </span>
                   <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1 uppercase tracking-tight">Level Check</h2>
                </div>
                <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl font-mono font-black ${timeLeft < 10 ? 'bg-red-50 text-red-500 animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                   <Timer size={20} />
                   {timeLeft.toString().padStart(2, '0')}s
                </div>
              </div>

              <ProgressBar value={((currentQ) / quizSet.length) * 100} color="bg-indigo-600" />

              {/* Question */}
              <motion.div 
                animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                className="my-10"
              >
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
                  {quizSet[currentQ].q}
                </h3>
              </motion.div>

              {/* Options */}
              <div className="space-y-4">
                {quizSet[currentQ].options.map((opt, i) => {
                  let statusClass = "bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border-transparent";
                  if (selected !== null) {
                    if (i === quizSet[currentQ].answer) statusClass = "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-400 shadow-lg shadow-emerald-500/10";
                    else if (i === selected) statusClass = "bg-red-50 dark:bg-red-500/10 border-red-500 text-red-700 dark:text-red-400";
                    else statusClass = "opacity-40 grayscale";
                  }

                  return (
                    <motion.button
                      key={i}
                      whileHover={selected === null ? { scale: 1.01, x: 5 } : {}}
                      whileTap={selected === null ? { scale: 0.99 } : {}}
                      onClick={() => selected === null && handleAnswer(i)}
                      className={`w-full text-left p-6 rounded-2xl border-2 transition-all font-bold flex items-center justify-between group ${statusClass}`}
                    >
                      <span className="flex items-center gap-4">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                          selected === null ? 'bg-white dark:bg-slate-700 shadow-sm' : ''
                        }`}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </span>
                      {selected !== null && i === quizSet[currentQ].answer && <CheckCircle2 className="text-emerald-500" />}
                      {selected === i && i !== quizSet[currentQ].answer && <XCircle className="text-red-500" />}
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation (Footer) */}
              <AnimatePresence>
                {selected !== null && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-500/10"
                  >
                    <div className="flex items-start gap-3">
                       <Info className="text-indigo-600 shrink-0 mt-1" size={18} />
                       <div>
                          <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-1">Expert Explanation</p>
                          <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed">
                            {quizSet[currentQ].explanation}
                          </p>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Streak Counter */}
              <div className="mt-8 flex justify-center">
                 <div className={`flex items-center gap-2 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest ${streak > 2 ? 'bg-amber-100 text-amber-600 animate-bounce' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                    <Zap size={16} fill={streak > 2 ? "currentColor" : "none" } />
                    {streak} Question Streak
                 </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-white dark:bg-slate-900 rounded-[3rem] p-12 md:p-20 shadow-2xl border border-gray-100 dark:border-slate-800 relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
              
              <div className="relative z-10">
                <motion.div 
                  initial={{ rotate: -20, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-8 text-6xl shadow-xl shadow-amber-500/20"
                >
                  🏆
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                  Module Conquered!
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-4 text-lg font-medium">
                  You scored <span className="text-indigo-600 font-black">{score}</span> points.
                </p>

                <div className="grid grid-cols-2 gap-4 my-10 max-w-sm mx-auto">
                   <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl">
                      <div className="text-3xl font-black text-indigo-600">+{score}</div>
                      <div className="text-[10px] font-black uppercase text-slate-400 mt-1">XP Earned</div>
                   </div>
                   <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl">
                      <div className="text-3xl font-black text-emerald-500">100%</div>
                      <div className="text-[10px] font-black uppercase text-slate-400 mt-1">Accuracy</div>
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                  >
                    <Home size={20} /> Back to Hub
                  </button>
                  <button
                    onClick={() => { setShowResult(false); setCurrentQ(0); setScore(0); setTimeLeft(30); }}
                    className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20"
                  >
                    <RefreshCcw size={20} /> Try Again
                  </button>
                </div>
              </div>
              
              {/* Background celebration shapes */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl" />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
