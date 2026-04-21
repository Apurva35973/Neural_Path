import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, LogOut, Menu, X, Brain, LayoutDashboard, Database, Trophy, PlayCircle, Zap } from 'lucide-react';
import { getUser, logout } from '../utils/auth';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggle: toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = user ? [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/playlab', label: 'PlayLab', icon: PlayCircle },
    { to: '/modules', label: 'Modules', icon: Database },
    { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  ] : [
    { to: '#features', label: 'Features', icon: Zap, isScroll: true },
  ];

  const menuVariants = {
    open: { opacity: 1, y: 0, display: "block" },
    closed: { opacity: 0, y: -20, transitionEnd: { display: "none" } }
  };

  return (
    <nav className="sticky top-0 z-[100] bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ rotate: 15 }}
              className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20"
            >
              <Brain className="text-white" size={24} />
            </motion.div>
            <span className="text-xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent tracking-tight">
              NeuralPath
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = !link.isScroll && location.pathname.startsWith(link.to.substring(0, 7));
              
              if (link.isScroll) {
                return (
                  <button
                    key={link.to}
                    onClick={() => document.getElementById(link.to.substring(1))?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors flex items-center gap-2"
                  >
                    <link.icon size={18} />
                    {link.label}
                  </button>
                );
              }

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-4 py-2"
                >
                  <span className={`relative z-10 flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${
                    isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:text-indigo-500'
                  }`}>
                    <link.icon size={18} />
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-bg"
                      className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg -z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:ring-2 hover:ring-indigo-500/20 transition-all"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {!user && (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="px-5 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="px-5 py-2 text-sm font-black bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all">
                  Sign Up
                </Link>
              </div>
            )}

            {user && (
              <div className="hidden md:flex items-center gap-4 pl-4 border-l border-gray-200 dark:border-slate-800">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-none">{user.name}</span>
                  <span className="text-[10px] text-indigo-500 font-mono tracking-tighter uppercase font-bold">Lvl {user.level || 1} Rookie</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <LogOut size={20} />
                </motion.button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 transition-all font-semibold"
                >
                  <link.icon size={20} />
                  {link.label}
                </Link>
              ))}
              {user && (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all font-semibold"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
