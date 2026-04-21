import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Info, Zap } from 'lucide-react';

export default function HyperplaneHero({ onGameOver }) {
  const [points, setPoints] = useState([]);
  const [p1, setP1] = useState({ x: 100, y: 100 });
  const [p2, setP2] = useState({ x: 400, y: 300 });
  const [margin, setMargin] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Generate two separable clusters
    const newPoints = [];
    // Blue Cluster (top-left ish)
    for (let i = 0; i < 8; i++) {
       newPoints.push({ x: 50 + Math.random() * 150, y: 50 + Math.random() * 150, type: 'blue' });
    }
    // Red Cluster (bottom-right ish)
    for (let i = 0; i < 8; i++) {
       newPoints.push({ x: 250 + Math.random() * 150, y: 250 + Math.random() * 150, type: 'red' });
    }
    setPoints(newPoints);
  }, []);

  useEffect(() => {
    // Calculate Margin: distance to the nearest point on either side
    // Line: (y2-y1)x - (x2-x1)y + (x2y1 - y2x1) = 0
    const A = p2.y - p1.y;
    const B = -(p2.x - p1.x);
    const C = p2.x * p1.y - p2.y * p1.x;
    
    let minBlueDist = Infinity;
    let minRedDist = Infinity;
    let hasMisclassified = false;

    points.forEach(pt => {
       const dist = (A * pt.x + B * pt.y + C) / Math.sqrt(A * A + B * B);
       if (pt.type === 'blue') {
          if (dist > 0) hasMisclassified = true;
          minBlueDist = Math.min(minBlueDist, Math.abs(dist));
       } else {
          if (dist < 0) hasMisclassified = true;
          minRedDist = Math.min(minRedDist, Math.abs(dist));
       }
    });

    setMargin(hasMisclassified ? 0 : Math.min(minBlueDist, minRedDist));
  }, [p1, p2, points]);

  const handleDrag = (e, id) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (id === 1) setP1({ x, y });
    else setP2({ x, y });
  };

  const handleFinish = () => {
    setIsDone(true);
    const accuracy = Math.min(100, Math.round((margin / 40) * 100)); // 40px is a "perfect" margin
    onGameOver({
      score: accuracy > 80 ? 1000 : 300,
      accuracy: accuracy,
      time: 0,
      mistakes: margin === 0 ? 1 : 0,
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-[3rem] shadow-inner border border-slate-100 dark:border-slate-800">
      <div className="w-full max-w-2xl text-center flex flex-col h-full">
        <div className="mb-6">
          <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">Hyperplane Hero</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Drag the line to separate the clusters with the MAXIMUM margin!</p>
        </div>

        <div 
          ref={containerRef}
          className="flex-1 relative bg-slate-50 dark:bg-slate-950 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-4 overflow-hidden"
        >
          <svg className="w-full h-full" viewBox="0 0 500 400">
            {/* Draw Margin Gutter */}
            {margin > 0 && (
              <line 
                x1={p1.x - (p2.y - p1.y) * 2} y1={p1.y + (p2.x - p1.x) * 2}
                x2={p2.x + (p2.y - p1.y) * 2} y2={p2.y - (p2.x - p1.x) * 2}
                stroke="#6366f1"
                strokeWidth={margin * 2}
                strokeOpacity="0.1"
              />
            )}

            {/* Decision Boundary */}
            <line 
               x1={p1.x - (p2.x - p1.x) * 10} y1={p1.y - (p2.y - p1.y) * 10}
               x2={p2.x + (p2.x - p1.x) * 10} y2={p2.y + (p2.y - p1.y) * 10}
               stroke="#6366f1"
               strokeWidth="3"
            />

            {/* Support Vectors (nearest points highlighting) */}
            {points.map((pt, i) => (
              <circle 
                key={i} 
                cx={pt.x} cy={pt.y} r="8" 
                fill={pt.type === 'blue' ? '#3b82f6' : '#ef4444'} 
                className="shadow-lg"
              />
            ))}

            {/* Drag Handles */}
            <circle 
              cx={p1.x} cy={p1.y} r="12" fill="#6366f1" className="cursor-move border-2 border-white"
              onMouseDown={(e) => {
                const move = (me) => handleDrag(me, 1);
                const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
                window.addEventListener('mousemove', move); window.addEventListener('mouseup', up);
              }}
            />
            <circle 
              cx={p2.x} cy={p2.y} r="12" fill="#6366f1" className="cursor-move border-2 border-white"
              onMouseDown={(e) => {
                const move = (me) => handleDrag(me, 2);
                const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
                window.addEventListener('mousemove', move); window.addEventListener('mouseup', up);
              }}
            />
          </svg>

          {/* Margin Meter */}
          <div className="absolute top-6 left-6">
             <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl">
                <div className="text-[10px] font-black uppercase text-slate-400">Optimal Margin</div>
                <div className="flex items-center gap-2 mt-1">
                   <div className="h-2 w-32 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (margin / 40) * 100)}%` }}
                        className="h-full bg-indigo-500"
                      />
                   </div>
                   <span className="text-xs font-black text-indigo-600">{Math.round(margin)}px</span>
                </div>
             </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
           <div className="flex bg-indigo-50 dark:bg-indigo-900/30 px-6 py-4 rounded-2xl items-center gap-3">
              <Shield className="text-indigo-600" size={20} />
              <span className="text-sm font-bold text-indigo-600">The thicker the "gutter", the better your model generalizes!</span>
           </div>
           <button 
             onClick={handleFinish}
             className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl hover:bg-indigo-500 transition-all active:scale-95 flex items-center gap-2"
           >
             Define Boundary <Target size={20} />
           </button>
        </div>
      </div>
    </div>
  );
}
