import { useParams, useNavigate } from 'react-router-dom';
import { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import GameResultScreen from '../components/games/GameResultScreen';
import { useGamification } from '../hooks/useGamification';

// Lazy load games
const DecisionTreeDetective = lazy(() => import('../components/games/DecisionTreeDetective'));
const FitTheLine = lazy(() => import('../components/games/FitTheLine'));
const SpamCatcher = lazy(() => import('../components/games/SpamCatcher'));
const ClusterFruits = lazy(() => import('../components/games/ClusterFruits'));
const TrainTheRobot = lazy(() => import('../components/games/TrainTheRobot'));
const HyperplaneHero = lazy(() => import('../components/games/HyperplaneHero'));
const NeuralConnect = lazy(() => import('../components/games/NeuralConnect'));
const GradientEscape = lazy(() => import('../components/games/GradientEscape'));

const GAME_COMPONENTS = {
  'decision-tree': DecisionTreeDetective,
  'fit-the-line': FitTheLine,
  'spam-catcher': SpamCatcher,
  'cluster-fruits': ClusterFruits,
  'train-robot': TrainTheRobot,
  'hyperplane-hero': HyperplaneHero,
  'neural-connect': NeuralConnect,
  'gradient-escape': GradientEscape
};

export default function GameContainer() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { addGameResult } = useGamification();
  const [results, setResults] = useState(null);

  const GameComponent = GAME_COMPONENTS[gameId];

  if (!GameComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
          <button onClick={() => navigate('/playlab')} className="text-indigo-600 hover:underline">Back to PlayLab</button>
        </div>
      </div>
    );
  }

  const handleGameEnd = (gameResult) => {
    const calculatedResults = addGameResult(gameId, gameResult);
    setResults({ ...gameResult, ...calculatedResults });
  };

  const handleReplay = () => {
    setResults(null);
  };

  const handleNext = () => {
    // Logic for next game could be sequential
    const gameIds = Object.keys(GAME_COMPONENTS);
    const currentIndex = gameIds.indexOf(gameId);
    if (currentIndex < gameIds.length - 1) {
      navigate(`/game/${gameIds[currentIndex + 1]}`);
      setResults(null);
    } else {
      navigate('/playlab');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-12 h-[calc(100vh-80px)] overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {!results ? (
            <motion.div
              key="game"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 relative"
            >
              <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>}>
                <GameComponent onGameOver={handleGameEnd} />
              </Suspense>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GameResultScreen 
                gameId={gameId} 
                results={results} 
                onReplay={handleReplay} 
                onNext={handleNext} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
