import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Mail, Clock, Zap } from 'lucide-react';

const EMAILS = [
  { text: "Claim your $1,000,000 prize now! Click here.", isSpam: true },
  { text: "Meeting scheduled for tomorrow at 10 AM.", isSpam: false },
  { text: "Your bank account has been compromised. Verify now.", isSpam: true },
  { text: "URGENT: Discount on luxury watches just for you!", isSpam: true },
  { text: "Hey! Are we still on for lunch today?", isSpam: false },
  { text: "Invoice #4502 for your recent purchase is attached.", isSpam: false },
  { text: "New login attempt detected from Russia. Click to block.", isSpam: true },
  { text: "Weekly Newsletter: AI Trends in 2024.", isSpam: false },
  { text: "Congratulations! You've been selected for a free gift.", isSpam: true },
  { text: "Project update: Q1 goals have been achieved.", isSpam: false },
];

export default function SpamCatcher({ onGameOver }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isDone) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isDone) {
      finishGame();
    }
  }, [timeLeft, isDone]);

  const handleDecision = (decision) => {
    const current = EMAILS[currentIndex % EMAILS.length];
    if (decision === current.isSpam) {
      setScore(s => s + 100);
    } else {
      setMistakes(m => m + 1);
    }

    if (currentIndex >= 15) { // 15 rounds
      finishGame();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const finishGame = () => {
    setIsDone(true);
    const accuracy = Math.round(((currentIndex - mistakes) / Math.max(1, currentIndex)) * 100);
    onGameOver({
      score: score,
      accuracy: accuracy,
      time: 30 - timeLeft,
      mistakes: mistakes,
    });
  };

  const currentEmail = EMAILS[currentIndex % EMAILS.length];

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-[3rem] shadow-inner border border-slate-100 dark:border-slate-800">
      <div className="w-full max-w-lg text-center flex flex-col h-full">
        <div className="flex justify-between items-center mb-8">
           <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-2xl text-indigo-600 dark:text-indigo-400 font-black">
              <Clock size={18} /> {timeLeft}s
           </div>
           <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/30 px-4 py-2 rounded-2xl text-amber-600 font-black">
              <Zap size={18} fill="currentColor" /> {score}
           </div>
        </div>

        <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">Spam Catcher</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium mb-12">Identify Spam vs Safe emails as fast as possible!</p>

        <div className="flex-1 relative flex items-center justify-center">
           <AnimatePresence mode="wait">
             <motion.div
               key={currentIndex}
               initial={{ scale: 0.8, opacity: 0, x: 50 }}
               animate={{ scale: 1, opacity: 1, x: 0 }}
               exit={{ scale: 1.2, opacity: 0, x: -50 }}
               className="w-full bg-slate-50 dark:bg-slate-800 p-8 rounded-[2rem] border-2 border-slate-100 dark:border-slate-700 shadow-xl relative"
             >
                <Mail className="text-indigo-400 mb-6 mx-auto" size={48} />
                <p className="text-xl font-bold text-slate-700 dark:text-slate-200 leading-relaxed italic">
                  "{currentEmail.text}"
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                   <button 
                     onClick={() => handleDecision(false)}
                     className="py-4 bg-emerald-500 text-white rounded-2xl font-black shadow-lg hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
                   >
                     <ShieldCheck size={20} /> SAFE
                   </button>
                   <button 
                     onClick={() => handleDecision(true)}
                     className="py-4 bg-rose-500 text-white rounded-2xl font-black shadow-lg hover:bg-rose-400 transition-all flex items-center justify-center gap-2"
                   >
                     <ShieldAlert size={20} /> SPAM
                   </button>
                </div>
             </motion.div>
           </AnimatePresence>
        </div>

        <div className="mt-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
           Email {currentIndex + 1} of 15
        </div>
      </div>
    </div>
  );
}
