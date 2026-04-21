import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login, getUser } from '../utils/auth';
import { Brain, Mail, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (login(email, pass)) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row transition-colors duration-300">

      {/* Branding Side (Visible on Desktop) */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-600 dark:bg-indigo-900 items-center justify-center p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-lg text-center">
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <Brain size={48} className="text-white" />
          </motion.div>
          <h1 className="text-5xl font-black text-white tracking-tight mb-6">NeuralPath</h1>
          <p className="text-xl text-indigo-100/90 font-medium leading-relaxed">
            Step into the world of Artificial Intelligence. Master algorithms through 3D simulations and interactive circuits.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
              <div className="text-2xl mb-2">🧊</div>
              <div className="text-sm font-bold uppercase tracking-widest text-indigo-200">3D Simulation</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-sm font-bold uppercase tracking-widest text-indigo-200">High Speed Lab</div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-slate-950">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-widest mb-4">
              <ShieldCheck size={16} /> Secure Authentication
            </div>
            <h2 className="text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 font-medium mt-2">Enter your credentials to access the arena.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input
                  type="email" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-600 dark:focus:border-indigo-500 transition-all font-medium"
                  placeholder="name@neuralpath.ai"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input
                  type="password" required
                  value={pass} onChange={(e) => setPass(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-600 dark:focus:border-indigo-500 transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold flex items-center gap-2 border border-red-100 dark:border-red-500/10"
              >
                <div className="w-2 h-2 rounded-full bg-red-500" />
                {error}
              </motion.div>
            )}

            <button
              disabled={loading}
              className={`w-full py-4 rounded-[1.5rem] font-black text-white shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 ${loading ? 'bg-slate-400' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'
                }`}
            >
              {loading ? <Sparkles className="animate-spin" /> : 'Log in'}
              <ArrowRight size={20} />
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 font-medium">
            New Account?{' '}
            <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
              Create New Profile
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
