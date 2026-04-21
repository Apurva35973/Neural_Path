import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sliders, RefreshCw, Info } from 'lucide-react';

export default function WhatIfSimulator({ type }) {
  const [params, setParams] = useState({
    learningRate: 0.1,
    complexity: 5,
    noise: 0.2
  });

  const data = useMemo(() => {
    // Generate simulated data based on parameters
    const points = [];
    for (let x = 0; x <= 10; x += 0.5) {
      let y;
      if (type === 'regression') {
        y = 2 * x + (Math.random() - 0.5) * params.noise * 10;
      } else if (type === 'neural-networks') {
        y = Math.sin(x / params.complexity) * 5 + 5 + (Math.random() - 0.5) * params.noise;
      } else {
        y = Math.sqrt(x * params.complexity) + (Math.random() - 0.5) * params.noise;
      }
      points.push({ x, y });
    }
    return points;
  }, [params, type]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 shadow-xl mt-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <Sliders className="text-indigo-600" size={20} />
            "What If" Simulator
          </h3>
          <p className="text-sm text-slate-400 font-medium">Experiment with parameters live</p>
        </div>
        <button 
          onClick={() => setParams({ learningRate: 0.1, complexity: 5, noise: 0.2 })}
          className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
          title="Reset Parameters"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Sliders Area */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <label className="font-bold text-slate-700 dark:text-slate-300">Learning Rate (α)</label>
              <span className="font-mono text-indigo-500 font-bold">{params.learningRate}</span>
            </div>
            <input 
              type="range" min="0.01" max="1" step="0.01" value={params.learningRate}
              onChange={(e) => setParams({...params, learningRate: parseFloat(e.target.value)})}
              className="w-full h-2 bg-gray-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Controls how fast the model adapts</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <label className="font-bold text-slate-700 dark:text-slate-300">Model Complexity</label>
              <span className="font-mono text-indigo-500 font-bold">{params.complexity}</span>
            </div>
            <input 
              type="range" min="1" max="10" step="1" value={params.complexity}
              onChange={(e) => setParams({...params, complexity: parseInt(e.target.value)})}
              className="w-full h-2 bg-gray-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Higher values mean more flexible boundaries</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <label className="font-bold text-slate-700 dark:text-slate-300">Data Noise</label>
              <span className="font-mono text-indigo-500 font-bold">{params.noise}</span>
            </div>
            <input 
              type="range" min="0" max="1" step="0.05" value={params.noise}
              onChange={(e) => setParams({...params, noise: parseFloat(e.target.value)})}
              className="w-full h-2 bg-gray-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Randomness in the training data</p>
          </div>
        </div>

        {/* Dynamic Chart Area */}
        <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">
            <Info size={12} /> Live convergence preview
          </div>
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '10px' }}
                />
                <Line
                  type="monotone"
                  dataKey="y"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={false}
                  animationDuration={300}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-xl mt-4">
             <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold leading-tight">
               💡 OBSERVATION: {params.noise > 0.6 ? "High noise is causing the model to struggle with clear patterns." : 
               params.complexity > 7 ? "High complexity might be starting to overfit the specific samples." : 
               "Smooth convergence detected."}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
