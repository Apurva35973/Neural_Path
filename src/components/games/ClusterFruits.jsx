import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Target, RefreshCw } from 'lucide-react';

export default function ClusterFruits({ onGameOver }) {
  const [fruits, setFruits] = useState([]);
  const [centroids, setCentroids] = useState([
    { id: 1, x: 100, y: 100, color: 'bg-red-500', type: 'Apple' },
    { id: 2, x: 250, y: 100, color: 'bg-yellow-400', type: 'Banana' },
    { id: 3, x: 400, y: 100, color: 'bg-purple-500', type: 'Grape' },
  ]);
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Generate 3 clusters of fruits
    const clusters = [
      { cx: 100, cy: 300, color: 'text-red-500', icon: '🍎' },
      { cx: 250, cy: 250, color: 'text-yellow-400', icon: '🍌' },
      { cx: 400, cy: 300, color: 'text-purple-500', icon: '🍇' },
    ];
    
    const newFruits = [];
    clusters.forEach(c => {
      for (let i = 0; i < 5; i++) {
        newFruits.push({
          id: `${c.icon}-${i}`,
          x: c.cx + (Math.random() * 80 - 40),
          y: c.cy + (Math.random() * 80 - 40),
          color: c.color,
          icon: c.icon,
          correctCentroid: clusters.indexOf(c) + 1
        });
      }
    });
    setFruits(newFruits);
  }, []);

  const handleDrag = (e, id) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCentroids(prev => prev.map(c => c.id === id ? { ...c, x, y } : c));
  };

  const handleFinish = () => {
    setIsDone(true);
    let totalDist = 0;
    fruits.forEach(f => {
      const c = centroids[f.correctCentroid - 1];
      const dist = Math.sqrt(Math.pow(f.x - c.x, 2) + Math.pow(f.y - c.y, 2));
      totalDist += dist;
    });

    const avgDist = totalDist / fruits.length;
    const accuracy = Math.max(0, Math.min(100, 100 - (avgDist - 20) * 2));
    
    onGameOver({
      score: accuracy > 80 ? 800 : 400,
      accuracy: Math.round(accuracy),
      time: 0,
      mistakes: Math.round(avgDist),
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-[3rem] shadow-inner border border-slate-100 dark:border-slate-800">
      <div className="w-full max-w-2xl text-center flex flex-col h-full">
        <div className="mb-6">
          <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">Cluster Fruits</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Drag the labeled baskets to the center of their matching fruit groups!</p>
        </div>

        <div 
          ref={containerRef}
          className="flex-1 relative bg-slate-50 dark:bg-slate-950 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-4 overflow-hidden"
        >
          {/* Fruits */}
          {fruits.map(f => (
            <motion.div
              key={f.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{ left: f.x, top: f.y }}
              className="absolute text-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"
            >
              {f.icon}
            </motion.div>
          ))}

          {/* Centroid Baskets */}
          {centroids.map(c => (
            <motion.div
              key={c.id}
              style={{ left: c.x, top: c.y }}
              className={`absolute w-16 h-16 ${c.color} rounded-2xl flex items-center justify-center text-white font-black shadow-xl cursor-move -translate-x-1/2 -translate-y-1/2 border-2 border-white/50 active:scale-110 transition-transform`}
              onMouseDown={(e) => {
                const move = (me) => handleDrag(me, c.id);
                const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
                window.addEventListener('mousemove', move);
                window.addEventListener('mouseup', up);
              }}
            >
              <LayoutGrid size={24} />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
           <div className="flex bg-indigo-50 dark:bg-indigo-900/30 px-6 py-4 rounded-2xl items-center gap-3">
              <RefreshCw className="text-indigo-600 animate-spin-slow" size={20} />
              <span className="text-sm font-bold text-indigo-600">Centroids should be in the exact geometric center!</span>
           </div>
           <button 
             onClick={handleFinish}
             className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl hover:bg-indigo-500 transition-all active:scale-95 flex items-center gap-2"
           >
             Finalize Clusters <Target size={20} />
           </button>
        </div>
      </div>
    </div>
  );
}
