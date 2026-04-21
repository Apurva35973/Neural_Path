import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Trophy, Skull, Play, RotateCcw, Zap } from 'lucide-react';

const GRID_SIZE = 5;

export default function TrainTheRobot({ onGameOver }) {
  const [robotPos, setRobotPos] = useState({ x: 0, y: 0 });
  const [rewards, setRewards] = useState([]); // User placed rewards
  const [traps] = useState([
    { x: 1, y: 1 }, { x: 3, y: 0 }, { x: 2, y: 3 }, { x: 4, y: 1 }
  ]);
  const [goal] = useState({ x: 4, y: 4 });
  const [isMoving, setIsMoving] = useState(false);
  const [history, setHistory] = useState([]);
  const [steps, setSteps] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const toggleReward = (x, y) => {
    if (isMoving || isFinished) return;
    if (x === 0 && y === 0) return;
    if (x === goal.x && y === goal.y) return;
    
    if (rewards.some(r => r.x === x && r.y === y)) {
      setRewards(rewards.filter(r => r.x !== x || r.y !== y));
    } else if (rewards.length < 5) {
      setRewards([...rewards, { x, y }]);
    }
  };

  const startSimulation = async () => {
    setIsMoving(true);
    let current = { x: 0, y: 0 };
    let tempSteps = 0;
    
    while (tempSteps < 20) {
      await new Promise(r => setTimeout(r, 400));
      tempSteps++;
      setSteps(tempSteps);

      // Simple RL logic: check neighbors for rewards/goal
      const neighbors = [
        { x: current.x + 1, y: current.y },
        { x: current.x - 1, y: current.y },
        { x: current.x, y: current.y + 1 },
        { x: current.x, y: current.y - 1 },
      ].filter(n => n.x >= 0 && n.x < GRID_SIZE && n.y >= 0 && n.y < GRID_SIZE);

      // Prioritize Goal, then Rewards, then Random (avoiding traps if possible)
      let next;
      const goalNeighbor = neighbors.find(n => n.x === goal.x && n.y === goal.y);
      const rewardNeighbor = neighbors.find(n => rewards.some(r => r.x === n.x && r.y === n.y));
      
      if (goalNeighbor) next = goalNeighbor;
      else if (rewardNeighbor) next = rewardNeighbor;
      else {
        const safeNeighbors = neighbors.filter(n => !traps.some(t => t.x === n.x && t.y === n.y));
        next = safeNeighbors.length > 0 
          ? safeNeighbors[Math.floor(Math.random() * safeNeighbors.length)]
          : neighbors[Math.floor(Math.random() * neighbors.length)];
      }

      current = next;
      setRobotPos(current);

      if (current.x === goal.x && current.y === goal.y) {
        finishGame(true, tempSteps);
        return;
      }

      if (traps.some(t => t.x === current.x && t.y === current.y)) {
        finishGame(false, tempSteps);
        return;
      }
    }
    finishGame(false, 20);
  };

  const finishGame = (success, totalSteps) => {
    setIsFinished(true);
    setIsMoving(false);
    const accuracy = success ? Math.max(100 - (totalSteps - 8) * 10, 50) : 0;
    
    setTimeout(() => {
      onGameOver({
        score: success ? 1200 : 200,
        accuracy: accuracy,
        time: totalSteps,
        mistakes: success ? 0 : 1,
      });
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-[3rem] shadow-inner border border-slate-100 dark:border-slate-800">
      <div className="w-full max-w-2xl text-center flex flex-col h-full">
        <div className="mb-6">
          <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">Train The Robot</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Place up to 5 ⚡ Rewards to guide the robot to the exit while avoiding 💀 Traps!</p>
        </div>

        <div className="flex-1 flex items-center justify-center">
           <div className="grid grid-cols-5 gap-2 p-4 bg-slate-100 dark:bg-slate-800 rounded-[2rem]">
              {Array.from({ length: 25 }).map((_, i) => {
                const x = i % GRID_SIZE;
                const y = Math.floor(i / GRID_SIZE);
                const isRobot = robotPos.x === x && robotPos.y === y;
                const isGoal = goal.x === x && goal.y === y;
                const isTrap = traps.some(t => t.x === x && t.y === y);
                const isReward = rewards.some(r => r.x === x && r.y === y);

                return (
                  <motion.div
                    key={i}
                    whileHover={!isMoving ? { scale: 0.95 } : {}}
                    onClick={() => toggleReward(x, y)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center cursor-pointer transition-colors relative
                      ${isRobot ? 'bg-indigo-600 shadow-lg z-10' : 
                        isGoal ? 'bg-emerald-500 shadow-lg' : 
                        isTrap ? 'bg-rose-100 dark:bg-rose-900/20' : 
                        isReward ? 'bg-amber-100 dark:bg-amber-900/40 border-2 border-amber-400' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700'}
                    `}
                  >
                    {isRobot && <Bot className="text-white animate-bounce" size={32} />}
                    {isGoal && !isRobot && <Trophy className="text-white" size={32} />}
                    {isTrap && !isRobot && <Skull className="text-rose-500 opacity-40" size={24} />}
                    {isReward && !isRobot && <Zap className="text-amber-500" fill="currentColor" size={24} />}
                    
                    {/* Position Label for debugging/logic */}
                    <span className="absolute bottom-1 right-2 text-[8px] opacity-20">{x},{y}</span>
                  </motion.div>
                );
              })}
           </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
           <div className="flex bg-amber-50 dark:bg-amber-900/30 px-6 py-4 rounded-2xl items-center gap-3">
              <span className="text-sm font-bold text-amber-600">Rewards placed: {rewards.length} / 5</span>
           </div>
           {!isMoving && !isFinished && (
             <button 
               onClick={startSimulation}
               className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl hover:bg-indigo-500 transition-all active:scale-95 flex items-center gap-2"
             >
               Begin Training <Play size={20} fill="currentColor" />
             </button>
           )}
           {isFinished && (
             <div className="text-xl font-black text-indigo-600 animate-pulse">
                SIMULATION COMPLETE
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
