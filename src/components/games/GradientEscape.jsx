import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Zap, Target, RefreshCcw } from 'lucide-react';

export default function GradientEscape({ onGameOver }) {
  const [ballPos, setBallPos] = useState({ x: 50, y: 50 });
  const [history, setHistory] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [learningRate, setLearningRate] = useState(0.1);

  // Curve definition: f(x) = sin(x/20) * 50 + cos(x/50) * 80 + 200
  const f = (x) => Math.sin(x / 40) * 50 + Math.cos(x / 60) * 80 + 200;
  
  // Numerical derivative
  const df = (x) => (f(x + 1) - f(x - 1)) / 2;

  useEffect(() => {
    // Initial random position at a peak
    setBallPos({ x: 50, y: f(50) });
  }, []);

  const takeStep = () => {
     if (isFinished) return;
     
     const gradient = df(ballPos.x);
     const newX = ballPos.x - gradient * (learningRate * 100);
     const newY = f(newX);
     
     const newPos = { x: Math.max(0, Math.min(500, newX)), y: newY };
     setBallPos(newPos);
     setHistory([...history, newPos]);

     // Check if reached minimum (approximated)
     if (Math.abs(gradient) < 0.1 && newPos.x > 300) {
        finishGame(true);
     } else if (newPos.x >= 495 || newPos.x <= 5) {
        finishGame(false);
     }
  };

  const finishGame = (success) => {
    setIsFinished(true);
    onGameOver({
      score: success ? 1100 : 300,
      accuracy: success ? 100 : 50,
      time: history.length,
      mistakes: success ? 0 : 1,
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-[3rem] shadow-inner border border-slate-100 dark:border-slate-800">
      <div className="w-full max-w-2xl text-center flex flex-col h-full">
        <div className="mb-6">
          <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">Gradient Escape</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Nudge the weight (ball) down the slope to find the global minimum!</p>
        </div>

        <div className="flex-1 relative bg-slate-50 dark:bg-slate-950 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 overflow-hidden">
           <svg className="w-full h-full" viewBox="0 0 500 400">
              {/* Draw the Curve */}
              <path 
                d={`M 0 ${f(0)} ` + Array.from({ length: 500 }).map((_, i) => `L ${i} ${f(i)}`).join(' ')}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="4"
                className="dark:stroke-slate-800"
              />
              
              {/* Draw Path History */}
              {history.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="2" fill="#6366f1" opacity="0.3" />
              ))}

              {/* The Ball (Weight) */}
              <motion.circle 
                animate={{ cx: ballPos.x, cy: ballPos.y }}
                transition={{ type: "spring", stiffness: 100 }}
                r="12"
                fill="#6366f1"
                className="shadow-xl"
              />
           </svg>

           {/* Learning Rate Slider */}
           <div className="absolute top-6 right-6 w-48 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="text-[10px] font-black uppercase text-slate-400 mb-2">Learning Rate (Alpha)</div>
              <input 
                type="range" min="0.01" max="0.5" step="0.01" 
                value={learningRate} 
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <div className="text-right text-xs font-black text-indigo-600 mt-1">{learningRate}</div>
           </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
           <div className="flex bg-indigo-50 dark:bg-indigo-900/30 px-6 py-4 rounded-2xl items-center gap-3">
              <TrendingDown className="text-indigo-600" size={20} />
              <span className="text-sm font-bold text-indigo-600">Steps taken: {history.length}</span>
           </div>
           {!isFinished && (
             <button 
               onClick={takeStep}
               className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl hover:bg-indigo-500 transition-all active:scale-95 flex items-center gap-3"
             >
               Apply Gradient Descent <Zap size={20} fill="currentColor" />
             </button>
           )}
           {isFinished && (
              <button 
                onClick={() => window.location.reload()}
                className="px-10 py-4 bg-slate-800 text-white rounded-2xl font-black flex items-center gap-2"
              >
                <RefreshCcw size={20} /> Reset
              </button>
           )}
        </div>
      </div>
    </div>
  );
}
