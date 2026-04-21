import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, CheckCircle2, AlertCircle } from 'lucide-react';

const LAYERS = [
  { id: 'in', count: 3, label: 'Input' },
  { id: 'h1', count: 4, label: 'Hidden' },
  { id: 'out', count: 2, label: 'Output' }
];

export default function NeuralConnect({ onGameOver }) {
  const [connections, setConnections] = useState([]);
  const [activePath, setActivePath] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check if there is a path from ANY input to ANY output
    const checkPath = () => {
       // Simple BFS or DFS to check connectivity
       // In this game, we just want to see if we have enough connections per layer
       const inputToHidden = connections.some(c => c.from.startsWith('in') && c.to.startsWith('h1'));
       const hiddenToOutput = connections.some(c => c.from.startsWith('h1') && c.to.startsWith('out'));
       return inputToHidden && hiddenToOutput;
    };
    setActivePath(checkPath());
  }, [connections]);

  const toggleConnection = (from, to) => {
    if (isDone) return;
    const exists = connections.find(c => c.from === from && c.to === to);
    if (exists) {
      setConnections(connections.filter(c => c.from !== from || c.to !== to));
    } else {
      setConnections([...connections, { from, to }]);
    }
  };

  const handleFinish = () => {
    setIsDone(true);
    const accuracy = activePath ? Math.min(100, Math.round((connections.length / 8) * 100)) : 0;
    onGameOver({
      score: activePath ? 900 : 100,
      accuracy: accuracy,
      time: 0,
      mistakes: activePath ? 0 : 1,
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-[3rem] shadow-inner border border-slate-100 dark:border-slate-800">
      <div className="w-full max-w-2xl text-center flex flex-col h-full">
        <div className="mb-6">
          <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">Neural Connect</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Click on nodes to toggle connections and create a signal path!</p>
        </div>

        <div className="flex-1 relative bg-slate-950 rounded-[2rem] p-12 overflow-hidden flex items-center justify-between">
            {/* SVG Background for Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
               {connections.map((conn, i) => {
                  const fromEl = document.getElementById(conn.from);
                  const toEl = document.getElementById(conn.to);
                  if (!fromEl || !toEl) return null;
                  const fromRect = fromEl.getBoundingClientRect();
                  const toRect = toEl.getBoundingClientRect();
                  const parentRect = fromEl.offsetParent.getBoundingClientRect();
                  
                  return (
                    <motion.line 
                      key={i}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      x1={fromEl.offsetLeft + 20} y1={fromEl.offsetTop + 20}
                      x2={toEl.offsetLeft + 20} y2={toEl.offsetTop + 20}
                      stroke="#6366f1"
                      strokeWidth="3"
                      strokeDasharray="5,5"
                      className={activePath ? "animate-pulse" : ""}
                    />
                  );
               })}
            </svg>

            {/* Render Nodes */}
            {LAYERS.map((layer, lIdx) => (
              <div key={layer.id} className="flex flex-col gap-8 relative z-10">
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase text-indigo-400 tracking-widest">{layer.label}</span>
                {Array.from({ length: layer.count }).map((_, nIdx) => {
                  const id = `${layer.id}-${nIdx}`;
                  const isConnected = connections.some(c => c.from === id || c.to === id);
                  
                  return (
                    <motion.button
                      id={id}
                      key={id}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        // Logic to connect to next layer nodes
                        if (lIdx < LAYERS.length - 1) {
                           const nextLayer = LAYERS[lIdx + 1];
                           for (let i = 0; i < nextLayer.count; i++) {
                              toggleConnection(id, `${nextLayer.id}-${i}`);
                           }
                        }
                      }}
                      className={`w-10 h-10 rounded-full border-4 transition-all ${
                        isConnected ? 'bg-indigo-500 border-indigo-400 shadow-xl shadow-indigo-500/50' : 'bg-slate-800 border-slate-700'
                      }`}
                    />
                  );
                })}
              </div>
            ))}

            {/* Signal Animation */}
            {activePath && (
              <motion.div 
                animate={{ x: [0, 500], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute top-1/2 left-0 w-8 h-1 bg-yellow-400 blur-sm z-20"
              />
            )}
        </div>

        <div className="mt-8 flex items-center justify-between">
           <div className="flex bg-indigo-900/40 px-6 py-4 rounded-2xl items-center gap-3">
              <Activity className={activePath ? "text-emerald-400 animate-pulse" : "text-slate-500"} size={20} />
              <span className={`text-sm font-bold ${activePath ? 'text-emerald-400' : 'text-slate-400'}`}>
                {activePath ? 'SIGNAL FLOWING!' : 'MODEL DISCONNECTED'}
              </span>
           </div>
           <button 
             onClick={handleFinish}
             className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl hover:bg-indigo-500 transition-all active:scale-95 flex items-center gap-2"
           >
             Compile Model <Zap size={20} fill="currentColor" />
           </button>
        </div>
      </div>
    </div>
  );
}
