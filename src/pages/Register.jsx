import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { register } from '../utils/auth';
import { Brain, User, Mail, Lock, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      register(name, email, pass);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row transition-colors duration-300">

      {/* Visual Side */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-700 to-purple-800 items-center justify-center p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="bg-white/10 backdrop-blur-2xl rounded-[3rem] p-10 border border-white/20 shadow-2xl"
          >
            <h2 className="text-4xl font-black text-white leading-tight mb-6">Join the AI Revolution</h2>
            <div className="space-y-6">
              {[
                { text: "Access 10+ advanced algorithms", icon: <CheckCircle2 className="text-emerald-400" size={18} /> },
                { text: "Interactive 3D visualization lab", icon: <CheckCircle2 className="text-emerald-400" size={18} /> },
                { text: "Compete on global leaderboards", icon: <CheckCircle2 className="text-emerald-400" size={18} /> },
                { text: "Track your progress with heatmaps", icon: <CheckCircle2 className="text-emerald-400" size={18} /> }
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-3 text-indigo-100 font-medium">
                  {feat.icon}
                  {feat.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Abstract background blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute top-10 right-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-slate-950">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 text-center md:text-left">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                <Brain className="text-white" size={20} />
              </div>
              <span className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">NeuralPath</span>
            </Link>
            <h2 className="text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Create Profile</h2>
            <p className="text-slate-500 font-medium mt-2">Begin your journey as an AI Architect today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"> Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input
                  type="text" required
                  value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-600 dark:focus:border-indigo-500 transition-all font-medium"
                  placeholder="Name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input
                  type="email" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-600 dark:focus:border-indigo-500 transition-all font-medium"
                  placeholder="abc@gmail.com"
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

            <button
              disabled={loading}
              className={`w-full py-4 mt-4 rounded-[1.5rem] font-black text-white shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 ${loading ? 'bg-slate-400' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'
                }`}
            >
              {loading ? (
                <Sparkles className="animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 font-medium">
            Already have Account?{' '}
            <Link to="/" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
