import { useState, useRef, useEffect, useMemo, lazy, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, ChevronRight, Share2, Info } from 'lucide-react';

// --- Lazy Load Visuals ---
const DecisionTree3D = lazy(() => import('./visuals/DecisionTree3D'));
const LinearRegression3D = lazy(() => import('./visuals/LinearRegression3D'));
const LogisticRegression3D = lazy(() => import('./visuals/LogisticRegression3D'));
const KNN3D = lazy(() => import('./visuals/KNN3D'));
const SVM3D = lazy(() => import('./visuals/SVM3D'));
const RandomForest3D = lazy(() => import('./visuals/RandomForest3D'));
const NeuralNetwork3D = lazy(() => import('./visuals/NeuralNetwork3D'));
const GradientDescent3D = lazy(() => import('./visuals/GradientDescent3D'));
const PCA3D = lazy(() => import('./visuals/PCA3D'));
const Clustering3D = lazy(() => import('./visuals/Clustering3D'));
const ReinforcementLearning3D = lazy(() => import('./visuals/ReinforcementLearning3D'));

// --- Main Wrapper Component ---

export default function AlgorithmVisualizer({ type = 'decision-trees' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef();

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setStep(s => s + 1);
      }, 1000 / speed);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, speed]);

  const reset = () => {
    setIsPlaying(false);
    setStep(0);
  };

  const renderVisualizer = () => {
    const props = { step, active: isPlaying };
    switch(type) {
      case 'decision-trees': return <DecisionTree3D {...props} />;
      case 'linear-regression': return <LinearRegression3D {...props} />;
      case 'logistic-regression': return <LogisticRegression3D {...props} />;
      case 'knn': return <KNN3D {...props} />;
      case 'svm': return <SVM3D {...props} />;
      case 'random-forest': return <RandomForest3D {...props} />;
      case 'neural-networks': return <NeuralNetwork3D {...props} />;
      case 'gradient-descent': return <GradientDescent3D {...props} />;
      case 'pca': return <PCA3D {...props} />;
      case 'clustering': return <Clustering3D {...props} />;
      case 'reinforcement-learning': return <ReinforcementLearning3D {...props} />;
      default: return <DecisionTree3D {...props} />;
    }
  };

  return (
    <div className="relative w-full h-[500px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-inner group">
      {/* 3D Canvas */}
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={40} />
        <OrbitControls enablePan={false} maxDistance={25} minDistance={5} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

        <Suspense fallback={null}>
          {renderVisualizer()}
        </Suspense>

        <gridHelper args={[20, 20, 0x333333, 0x111111]} position={[0, -5, 0]} />
      </Canvas>

      {/* Overlays */}
      <div className="absolute top-6 left-6 flex flex-col gap-1 pointer-events-none">
        <h3 className="text-white font-bold text-xl drop-shadow-lg tracking-tight">3D Visualizer</h3>
        <p className="text-slate-400 text-xs font-mono uppercase tracking-widest">{type.replace('-', ' ')} Simulation</p>
      </div>

      {/* Controls Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 px-8 py-4 bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
        <button onClick={reset} className="p-2 text-slate-400 hover:text-white transition-colors" title="Reset">
          <RotateCcw size={20} />
        </button>
        
        <div className="h-6 w-[1px] bg-white/10" />

        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-lg transition-all active:scale-95"
        >
          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
        </button>

        <button onClick={() => setStep(s => s + 1)} className="p-2 text-slate-400 hover:text-white transition-colors" title="Step Forward">
          <ChevronRight size={24} />
        </button>

        <div className="h-6 w-[1px] bg-white/10" />

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Speed</span>
          <input 
            type="range" 
            min="0.5" 
            max="5" 
            step="0.5" 
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-24 accent-indigo-500 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs font-mono text-indigo-400 w-8">{speed}x</span>
        </div>
      </div>
      
      {/* Step Indicator */}
      <div className="absolute bottom-6 right-8 text-slate-500 font-mono text-xs tabular-nums">
        STEP: {step.toString().padStart(4, '0')}
      </div>
    </div>
  );
}
