import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ModulePage from './pages/ModulePage';
import QuizPage from './pages/QuizPage';
import GamePage from './pages/GamePage';
import Leaderboard from './pages/Leaderboard';
import Modules from './pages/Modules';
import PlayLab from './pages/PlayLab';
import GameContainer from './pages/GameContainer';
import ProtectedRoute from './components/ProtectedRoute';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
        <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
        <Route path="/module/:id" element={<ProtectedRoute><PageWrapper><ModulePage /></PageWrapper></ProtectedRoute>} />
        <Route path="/quiz/:id" element={<ProtectedRoute><PageWrapper><QuizPage /></PageWrapper></ProtectedRoute>} />
        <Route path="/game" element={<ProtectedRoute><PageWrapper><GamePage /></PageWrapper></ProtectedRoute>} />
        <Route path="/playlab" element={<ProtectedRoute><PageWrapper><PlayLab /></PageWrapper></ProtectedRoute>} />
        <Route path="/game/:gameId" element={<ProtectedRoute><PageWrapper><GameContainer /></PageWrapper></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><PageWrapper><Leaderboard /></PageWrapper></ProtectedRoute>} />
        <Route path="/modules" element={<ProtectedRoute><PageWrapper><Modules /></PageWrapper></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-slate-950 transition-theme">
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}
