import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import _CountUp from 'react-countup';
import * as Recharts from 'recharts';
import * as LucideIcons from 'lucide-react';
import * as Router from 'react-router-dom';
import { getUser } from '../utils/auth';
import { modules } from '../data/modules';
import Navbar from '../components/Navbar';
import ActivityHeatmap from '../components/ActivityHeatmap';
import ProgressBar from '../components/ProgressBar';

// Safe component extraction for libraries with CJS/ESM interop issues in React 19 + Vite
const CountUp = _CountUp.default || _CountUp;
const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } = Recharts;
const { Brain, Star, Flame, Trophy, ChevronRight, Zap, Target, BookOpen, Coins, Activity, TrendingUp } = LucideIcons;
const { Link } = Router;

const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'];

export default function Dashboard() {
  const user = getUser();
  if (!user) return null;

  const completedCount = user.completedModules?.length || 0;
  const progressPercent = (completedCount / modules.length) * 100;

  // Calculate skill data from game history
  const skillMap = {
    'Decision Tree': 20,
    'Regression': 20,
    'Classification': 20,
    'Clustering': 20,
    'Reinforcement': 20,
    'Neural Nets': 20,
  };

  if (user.gameHistory) {
    user.gameHistory.forEach(h => {
      if (h.gameId === 'decision-tree') skillMap['Decision Tree'] = Math.max(skillMap['Decision Tree'], h.accuracy);
      if (h.gameId === 'fit-the-line') skillMap['Regression'] = Math.max(skillMap['Regression'], h.accuracy);
      if (h.gameId === 'spam-catcher') skillMap['Classification'] = Math.max(skillMap['Classification'], h.accuracy);
      if (h.gameId === 'cluster-fruits') skillMap['Clustering'] = Math.max(skillMap['Clustering'], h.accuracy);
      if (h.gameId === 'train-robot') skillMap['Reinforcement'] = Math.max(skillMap['Reinforcement'], h.accuracy);
      if (h.gameId === 'neural-connect') skillMap['Neural Nets'] = Math.max(skillMap['Neural Nets'], h.accuracy);
    });
  }

  const skillData = Object.entries(skillMap).map(([subject, A]) => ({ subject, A, fullMark: 100 }));

  const progressData = [
    { name: 'Mon', xp: 20 },
    { name: 'Tue', xp: 45 },
    { name: 'Wed', xp: 30 },
    { name: 'Thu', xp: 80 },
    { name: 'Fri', xp: 50 },
    { name: 'Sat', xp: 90 },
    { name: 'Sun', xp: 120 },
  ];

  const distributionData = [
    { name: 'Beginner', value: 2 },
    { name: 'Intermediate', value: 3 },
    { name: 'Advanced', value: 5 },
  ];

  const nextModule = useMemo(() => {
    return modules.find(m => !user.completedModules?.includes(m.id)) || modules[0];
  }, [user]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="relative overflow-hidden bg-indigo-600 dark:bg-indigo-900 rounded-[2rem] p-8 md:p-12 text-white">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase"
                >
                  Rank: {user.level > 5 ? 'ML Master' : 'ML Explorer'} • Level {user.level || 1}
                </motion.span>
                <h1 className="text-4xl md:text-5xl font-black mt-4 leading-tight">
                  Welcome back, <br className="md:hidden" />
                  <span className="text-indigo-200">{user.name}</span>! 👋
                </h1>
                <p className="mt-4 text-indigo-100/80 max-w-xl text-lg font-medium leading-relaxed">
                  You've reached level <span className="text-white font-bold">{user.level || 1}</span>.
                  Ready to test your skills in the <Link to="/playlab" className="text-white underline decoration-2 underline-offset-4 decoration-indigo-400">PlayLab</Link>?
                </p>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/10 min-w-[140px]">
                  <div className="text-4xl mb-2">🚀</div>
                  <div className="text-3xl font-black"><CountUp end={user.xp || 0} duration={2} /></div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Total XP</div>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/10 min-w-[140px]">
                  <div className="text-4xl mb-2">🪙</div>
                  <div className="text-3xl font-black"><CountUp end={user.coins || 0} duration={2} /></div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Coins</div>
                </div>
              </div>
            </div>

            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Streak', value: user.streak || 0, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10' },
              { label: 'XP Points', value: user.xp || 0, icon: Zap, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
              { label: 'Badges', value: user.badges?.length || 0, icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
              { label: 'Accuracy', value: user.gameHistory?.[0]?.accuracy || 0, icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm shadow-indigo-500/5 group transition-all"
              >
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                  <stat.icon size={24} />
                </div>
                <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
                  <CountUp end={parseInt(stat.value)} duration={2} />
                  {stat.label === 'Target' && '%'}
                </div>
                <div className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Charts Section */}
          <motion.div variants={itemVariants} className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col">
              <div className="mb-8">
                <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
                  <Activity className="text-indigo-500" size={20} /> Skill Radar
                </h2>
                <p className="text-xs text-slate-400 font-medium">Concept mastery from PlayLab games</p>
              </div>
              <div className="h-64 w-full min-h-[256px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                    <PolarGrid stroke="#e2e8f0" className="dark:stroke-slate-800" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                    <Radar
                      name="Accuracy"
                      dataKey="A"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.6}
                    />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 flex justify-center">
                 <Link to="/playlab" className="text-xs font-black text-indigo-600 hover:underline uppercase tracking-widest">Upgrade Skills in PlayLab</Link>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
                    <TrendingUp className="text-emerald-500" size={20} /> Learning Momentum
                  </h2>
                  <p className="text-xs text-slate-400 font-medium">Daily activity overview</p>
                </div>
              </div>
              <div className="h-64 w-full min-h-[256px]">
                <ResponsiveContainer width="100%" height="100%" minHeight={256}>
                  <AreaChart data={progressData}>
                    <defs>
                      <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: 'rgba(255,255,255,0.95)' }}
                    />
                    <Area type="monotone" dataKey="xp" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorXp)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* Activity Heatmap */}
          <motion.div variants={itemVariants}>
            <ActivityHeatmap />
          </motion.div>

          {/* Continue Learning & Suggested */}
          <motion.div variants={itemVariants} className="grid lg:grid-cols-3 gap-8">
            {/* Suggested Module Card */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-3 tracking-tight">
                Recommended <Zap className="text-amber-500" fill="currentColor" size={20} />
              </h2>
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-8 rounded-[2rem] text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <span className="text-indigo-400 text-xs font-black uppercase tracking-widest">{nextModule.level}</span>
                  <h3 className="text-2xl font-black mt-2 leading-tight">{nextModule.title}</h3>
                  <p className="text-indigo-300/80 text-sm mt-4 leading-relaxed line-clamp-2">{nextModule.description}</p>
                  <Link
                    to={`/module/${nextModule.id}`}
                    className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold transition-all active:scale-95 group-hover:shadow-xl group-hover:shadow-indigo-500/20"
                  >
                    Continue Path <ChevronRight size={18} strokeWidth={3} />
                  </Link>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
                <Brain className="absolute -bottom-8 -right-8 text-white/5 w-48 h-48 rotate-12 transition-transform group-hover:rotate-0 duration-700" />
              </div>
            </div>

            {/* Other Modules Grid */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Learning Paths</h2>
                <Link to="/modules" className="text-indigo-600 font-bold text-sm hover:underline">View All</Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {modules.slice(0, 4).map((m) => {
                  const isDone = user.completedModules?.includes(m.id);
                  return (
                    <Link
                      key={m.id}
                      to={`/module/${m.id}`}
                      className="group bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                          <BookOpen size={20} />
                        </div>
                        {isDone && <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full">Pro</span>}
                      </div>
                      <h4 className="font-black text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{m.title}</h4>
                      <div className="mt-4">
                        <ProgressBar value={isDone ? 100 : 0} color={isDone ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
}
