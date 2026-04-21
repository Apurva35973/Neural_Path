import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle2, XCircle, ChevronRight, HelpCircle } from 'lucide-react';

const OBJECTS = [
  { id: 1, name: 'Apple', color: 'Red', size: 'Medium', taste: 'Sweet', seeds: 'Yes' },
  { id: 2, name: 'Banana', color: 'Yellow', size: 'Large', taste: 'Sweet', seeds: 'No' },
  { id: 3, name: 'Lemon', color: 'Yellow', size: 'Small', taste: 'Sour', seeds: 'Yes' },
  { id: 4, name: 'Grape', color: 'Purple', size: 'Small', taste: 'Sweet', seeds: 'Yes' },
  { id: 5, name: 'Watermelon', color: 'Green', size: 'Large', taste: 'Sweet', seeds: 'Yes' },
  { id: 6, name: 'Lime', color: 'Green', size: 'Small', taste: 'Sour', seeds: 'Yes' },
];

const QUESTIONS = [
  { id: 'color', text: 'What is the color?', options: ['Red', 'Yellow', 'Purple', 'Green'], attr: 'color' },
  { id: 'size', text: 'What is the size?', options: ['Small', 'Medium', 'Large'], attr: 'size' },
  { id: 'taste', text: 'What is the taste?', options: ['Sweet', 'Sour'], attr: 'taste' },
  { id: 'seeds', text: 'Does it have seeds?', options: ['Yes', 'No'], attr: 'seeds' },
];

export default function DecisionTreeDetective({ onGameOver }) {
  const [targetObject, setTargetObject] = useState(null);
  const [currentPool, setCurrentPool] = useState(OBJECTS);
  const [history, setHistory] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    setTargetObject(OBJECTS[Math.floor(Math.random() * OBJECTS.length)]);
  }, []);

  const handleAnswer = (question, answer) => {
    const newPool = currentPool.filter(obj => obj[question.attr] === answer);
    const newHistory = [...history, { question: question.text, answer }];
    
    setHistory(newHistory);
    setCurrentPool(newPool);

    if (newPool.length === 1 && newPool[0].id === targetObject.id) {
       finishGame(true, newHistory.length);
    } else if (newPool.length === 0 || (newPool.length === 1 && newPool[0].id !== targetObject.id)) {
       finishGame(false, newHistory.length);
    }
  };

  const finishGame = (success, steps) => {
    setIsFinished(true);
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const accuracy = success ? Math.max(100 - (steps - 2) * 10, 50) : 0;
    
    setTimeout(() => {
      onGameOver({
        score: success ? 500 : 100,
        accuracy,
        time: timeTaken,
        mistakes: success ? steps - 2 : steps,
      });
    }, 1500);
  };

  if (!targetObject) return null;

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-[3rem] shadow-inner border border-slate-100 dark:border-slate-800">
      <div className="w-full max-w-2xl text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2 mt-4">Decision Tree Detective</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Classify the secret object using the most efficient questions!</p>
        </motion.div>

        {/* The Secret Card */}
        <div className="relative mb-12 flex justify-center">
          <motion.div 
            animate={{ rotateY: isFinished ? 0 : 180 }}
            className="w-48 h-64 bg-indigo-600 rounded-[2rem] shadow-2xl flex items-center justify-center text-white"
            style={{ transformStyle: 'preserve-3d', transition: 'transform 0.8s' }}
          >
            <div className="absolute inset-0 flex items-center justify-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <HelpCircle size={64} className="opacity-20" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
              <div className="text-6xl mb-4">🍎</div>
              <div className="text-xl font-black uppercase tracking-widest">{targetObject.name}</div>
            </div>
          </motion.div>
        </div>

        {/* Current Pool Status */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {OBJECTS.map(obj => {
            const isExcluded = !currentPool.find(o => o.id === obj.id);
            return (
              <div 
                key={obj.id} 
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isExcluded ? 'bg-slate-100 text-slate-300 line-through dark:bg-slate-800 dark:text-slate-700' : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                }`}
              >
                {obj.name}
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div 
              key="questions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-4"
            >
              {QUESTIONS.map(q => (
                <div key={q.id} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3 text-left">{q.text}</p>
                  <div className="flex flex-wrap gap-2">
                    {q.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => handleAnswer(q, opt)}
                        className="px-6 py-2 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 hover:border-indigo-500 rounded-xl font-bold text-slate-700 dark:text-slate-200 transition-all"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="flex flex-col items-center"
            >
              <div className={`text-4xl font-black mb-4 ${currentPool.length === 1 ? 'text-emerald-500' : 'text-rose-500'}`}>
                {currentPool.length === 1 ? 'PATH OPTIMIZED!' : 'LOGIC ERROR!'}
              </div>
              <div className="flex items-center gap-1 text-slate-400 font-bold">
                 Finalizing results...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
