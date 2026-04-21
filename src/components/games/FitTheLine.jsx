import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, TrendingUp, Info } from 'lucide-react';

export default function FitTheLine({ onGameOver }) {
  const [points, setPoints] = useState([]);
  const [p1, setP1] = useState({ x: 50, y: 300 });
  const [p2, setP2] = useState({ x: 450, y: 100 });
  const [error, setError] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const svgRef = useRef(null);

  useEffect(() => {
    // Generate random points around a hidden line: y = 0.5x + 50
    const newPoints = Array.from({ length: 15 }, () => {
      const x = Math.random() * 400 + 50;
      const y = (0.5 * x + 50) + (Math.random() * 60 - 30);
      return { x, y };
    });
    setPoints(newPoints);
  }, []);

  useEffect(() => {
    // Calculate Mean Squared Error (visualized)
    let totalError = 0;
    points.forEach(pt => {
      // Line equation from p1 and p2
      const m = (p2.y - p1.y) / (p2.x - p1.x);
      const b = p1.y - m * p1.x;
      const expectedY = m * pt.x + b;
      totalError += Math.pow(pt.y - expectedY, 2);
    });
    setError(Math.sqrt(totalError / points.length));
  }, [p1, p2, points]);

  const handleDrag = (e, pointId) => {
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (pointId === 1) setP1({ x, y });
    else setP2({ x, y });
  };

  const handleFinish = () => {
    setIsDone(true);
    const accuracy = Math.max(0, Math.min(100, 100 - (error - 15) * 2));
    onGameOver({
      score: accuracy > 85 ? 1000 : 500,
      accuracy: Math.round(accuracy),
      time: 0,
      mistakes: Math.round(error),
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-[3rem] shadow-inner border border-slate-100 dark:border-slate-800">
      <div className="w-full max-w-2xl text-center flex flex-col h-full">
        <div className="mb-6">
          <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">Fit The Line</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Drag the endpoints to minimize the "Total Error" (Residuals)!</p>
        </div>

        <div className="flex-1 relative bg-slate-50 dark:bg-slate-950 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-4 overflow-hidden">
          <svg 
            ref={svgRef}
            className="w-full h-full cursor-crosshair" 
            viewBox="0 0 500 400"
          >
            {/* Draw Residuals (Error Lines) */}
            {points.map((pt, i) => {
              const m = (p2.y - p1.y) / (p2.x - p1.x);
              const b = p1.y - m * p1.x;
              const expectedY = m * pt.x + b;
              return (
                <line 
                  key={i}
                  x1={pt.x} y1={pt.y}
                  x2={pt.x} y2={expectedY}
                  stroke={Math.abs(pt.y - expectedY) > 20 ? "#f43f5e" : "#10b981"}
                  strokeWidth="1"
                  strokeDasharray="4"
                  className="opacity-50"
                />
              );
            })}

            {/* Draw Regression Line */}
            <line 
              x1={p1.x} y1={p1.y}
              x2={p2.x} y2={p2.y}
              stroke="#6366f1"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Draw Data Points */}
            {points.map((pt, i) => (
              <circle key={i} cx={pt.x} cy={pt.y} r="6" fill="#475569" className="dark:fill-slate-400" />
            ))}

            {/* Interactive Handles */}
            <circle 
              cx={p1.x} cy={p1.y} r="12" 
              fill="#6366f1" 
              className="cursor-move hover:scale-125 transition-transform"
              onMouseDown={(e) => {
                const move = (me) => handleDrag(me, 1);
                const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
                window.addEventListener('mousemove', move);
                window.addEventListener('mouseup', up);
              }}
            />
            <circle 
              cx={p2.x} cy={p2.y} r="12" 
              fill="#6366f1" 
              className="cursor-move hover:scale-125 transition-transform"
              onMouseDown={(e) => {
                const move = (me) => handleDrag(me, 2);
                const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
                window.addEventListener('mousemove', move);
                window.addEventListener('mouseup', up);
              }}
            />
          </svg>

          {/* HUD Override */}
          <div className="absolute top-6 right-6 flex flex-col gap-2">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl">
               <div className="text-[10px] font-black uppercase text-slate-400">Current Cost (Error)</div>
               <div className={`text-2xl font-black ${error < 20 ? 'text-emerald-500' : 'text-rose-500'}`}>
                 {Math.round(error)}
               </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
           <div className="flex items-center gap-2 text-indigo-600 font-bold">
              <Info size={18} />
              <span className="text-sm">The shorter the dashed lines, the better the fit!</span>
           </div>
           <button 
             onClick={handleFinish}
             className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl hover:bg-indigo-500 transition-all active:scale-95 flex items-center gap-2"
           >
             Calculate Regression <Target size={20} />
           </button>
        </div>
      </div>
    </div>
  );
}
