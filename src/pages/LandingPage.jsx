import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Brain, Zap, Target, Bot, BarChart3, Code2, ChevronRight, Star, Quote, Mail, Globe, MessageSquare, Link as LinkIcon, ArrowRight } from 'lucide-react';
import { getUser } from '../utils/auth';
import Navbar from '../components/Navbar';

export default function LandingPage() {
  const navigate = useNavigate();
  const user = getUser();

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

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

  const features = [
    { title: 'Learn with Games', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10', desc: 'Master concepts like SVM and Regression through interactive mini-games.' },
    { title: 'Interactive Visuals', icon: BarChart3, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10', desc: 'Explore algorithm behaviors in real-time with stunning 3D visualizations.' },
    { title: 'Code Playground', icon: Code2, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10', desc: 'Practice implementation with our integrated, zero-setup coding environment.' },
    { title: 'AI Tutor Support', icon: Bot, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10', desc: 'Get instant explanations and code help from our specialized Neural Tutor.' },
    { title: 'Global Leaderboards', icon: Star, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10', desc: 'Compete with learners worldwide and climb the ranks of ML experts.' },
    { title: 'Progress Tracking', icon: Target, color: 'text-sky-500', bg: 'bg-sky-50 dark:bg-sky-500/10', desc: 'Detailed analytics and skill radar to visualize your learning momentum.' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-theme selection:bg-indigo-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-black uppercase tracking-widest mb-8"
          >
            <Brain size={14} fill="currentColor" /> The Future of ML Education
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-800 dark:text-white tracking-tight mb-8 leading-[1.1]"
          >
            NeuralPath <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AIML Revolution</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed mb-12"
          >
            Learn AI & Machine Learning through games, visualizations, and practice. Our interactive platform helps you master complex concepts in minutes, not months.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {user ? (
              <Link to="/dashboard" className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-2xl shadow-indigo-500/20 hover:bg-indigo-500 hover:-translate-y-1 transition-all flex items-center gap-2">
                Continue to Dashboard <ArrowRight size={20} strokeWidth={3} />
              </Link>
            ) : (
              <>
                <Link to="/register" className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-2xl shadow-indigo-500/20 hover:bg-indigo-500 hover:-translate-y-1 transition-all flex items-center gap-2">
                  Get Started Free <ChevronRight size={20} strokeWidth={3} />
                </Link>
                <Link to="/login" className="px-10 py-5 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-2xl font-black text-lg border-2 border-slate-100 dark:border-slate-800 hover:border-indigo-600 transition-all">
                  Log In
                </Link>
              </>
            )}
            <button onClick={scrollToFeatures} className="px-10 py-5 text-indigo-600 font-bold text-lg hover:underline transition-all">
              Explore Features
            </button>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
           {[
             { label: 'Learners', val: '50K+' },
             { label: 'Algorithms', val: '25+' },
             { label: 'Mini Games', val: '8+' },
             { label: 'Accuracy', val: '98%' },
           ].map(s => (
             <div key={s.label} className="text-center">
               <div className="text-4xl font-black text-slate-800 dark:text-white mb-2">{s.val}</div>
               <div className="text-sm font-black uppercase text-slate-400 tracking-widest">{s.label}</div>
             </div>
           ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
             <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-6">Everything you need to <br /> Master the Future</h2>
             <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto">From neural network architecture to reinforcement learning, we've built the ultimate sandbox for AI exploration.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((f, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="p-10 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 group hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all"
              >
                <div className={`w-14 h-14 ${f.bg} ${f.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-black text-slate-800 dark:text-white mb-4 group-hover:text-indigo-600 transition-colors">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-32 relative overflow-hidden bg-slate-50 dark:bg-slate-900/30">
         <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
               <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-4">Five Steps to Mastery</h2>
               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Transform from Rookie to Researcher</p>
            </div>
            
            <div className="grid md:grid-cols-5 gap-4">
               {[
                 { step: 1, title: 'Register', desc: 'Create your Neural profile' },
                 { step: 2, title: 'Visualize', desc: 'See how data flows' },
                 { step: 3, title: 'Code', desc: 'Build models from scratch' },
                 { step: 4, title: 'Gamify', desc: 'Win algorithm challenges' },
                 { step: 5, title: 'Master', desc: 'Achieve AI God status' }
               ].map(s => (
                 <div key={s.step} className="relative p-8 bg-white dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800 text-center">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-black shadow-lg">
                      {s.step}
                    </div>
                    <h4 className="text-lg font-black text-slate-800 dark:text-white mt-4 mb-2">{s.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{s.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Testimonials */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
           <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Alex Rivera', role: 'Data Scientist @ TechFlow', txt: 'The 3D visualizations in NeuralPath helped me understand PCA in minutes. Truly a game changer.' },
                { name: 'Sarah Chen', role: 'CS Student', txt: 'PlayLab makes reinforcement learning fun. I finally understand Q-tables after playing the Robot game!' },
                { name: 'Marcus Knight', role: 'ML Engineer', txt: 'The zero-setup playground is perfect for quick experiments. The AI tutor is surprisingly capable.' },
              ].map((t, i) => (
                <div key={i} className="p-8 bg-white dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 rounded-[2rem]">
                  <Quote className="text-indigo-500 mb-4" />
                  <p className="text-slate-600 dark:text-slate-300 font-medium italic mb-6 leading-relaxed">"{t.txt}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full" />
                    <div>
                      <div className="text-sm font-black text-slate-800 dark:text-white">{t.name}</div>
                      <div className="text-xs text-slate-400 font-bold">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <Brain className="text-indigo-600" size={32} />
                <span className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">NeuralPath</span>
              </Link>
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm mb-8 leading-relaxed">
                Empowering the next generation of AI engineers through interactive practice and play.
              </p>
              <div className="flex gap-4">
                {[Globe, MessageSquare, LinkIcon].map((Icon, i) => (
                   <a href="#" key={i} className="w-10 h-10 bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-800 rounded-full flex items-center justify-center transition-all">
                     <Icon size={20} />
                   </a>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="font-black text-slate-800 dark:text-white uppercase text-xs tracking-widest mb-6">Platform</h5>
              <ul className="space-y-4 text-sm font-bold text-slate-400">
                <li><Link to="/playlab" className="hover:text-indigo-600">PlayLab Games</Link></li>
                <li><Link to="/modules" className="hover:text-indigo-600">Learning Paths</Link></li>
                <li><Link to="/leaderboard" className="hover:text-indigo-600">Leaderboards</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-black text-slate-800 dark:text-white uppercase text-xs tracking-widest mb-6">Company</h5>
              <ul className="space-y-4 text-sm font-bold text-slate-400">
                <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-600">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="text-center text-sm font-bold text-slate-400 pt-10 border-t border-slate-50 dark:border-slate-800">
            © 2024 NeuralPath AI. All rights reserved. Built for the future.
          </div>
        </div>
      </footer>
    </div>
  );
}
