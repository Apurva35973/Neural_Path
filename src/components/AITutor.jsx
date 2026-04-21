import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';

export default function AITutor({ moduleName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: `Hi! I'm your NeuralPath AI Tutor. Ask me anything about ${moduleName}!` }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      // Prepare history for OpenAI
      const history = messages.map(m => ({
        role: m.role === 'ai' ? 'assistant' : 'user',
        content: m.text
      }));
      history.push(userMessage);

      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history,
          context: moduleName
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, { role: 'ai', text: data.content }]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { role: 'ai', text: "I'm sorry, I encountered an error. Please make sure the backend server is running and the API key is configured." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Mini Toggle */}
      {!isOpen && (
        <motion.button
          layoutId="chat-box"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center group z-50 hover:bg-indigo-500 transition-all border-4 border-white dark:border-slate-800"
        >
          <Sparkles className="group-hover:scale-110 transition-transform" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-white dark:border-slate-900 animate-pulse" />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            layoutId="chat-box"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-8 right-8 w-80 md:w-96 h-[550px] bg-white dark:bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-3xl border border-gray-200 dark:border-slate-800 flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-indigo-600 flex items-center justify-between text-white shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Bot size={22} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm">NeuralPath Tutor</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-[10px] text-indigo-100 uppercase font-black tracking-widest leading-none">Online • {moduleName}</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg transition-transform"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-slate-50 dark:bg-slate-900/50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                  {m.role === 'ai' && (
                    <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0 mb-1">
                      <Bot size={12} className="text-indigo-600 dark:text-indigo-400" />
                    </div>
                  )}
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-br-none font-medium' 
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-gray-100 dark:border-slate-700'
                  }`}>
                    {m.text}
                  </motion.div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                    <Bot size={12} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex gap-1 p-2 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Overlay for context hints */}
            {messages.length === 1 && !isTyping && (
              <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar">
                {['Explain ELI5', 'Give Code', 'Take Quiz'].map(hint => (
                  <button 
                    key={hint}
                    onClick={() => { setInput(hint); }}
                    className="text-[10px] whitespace-nowrap bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800/50 px-3 py-1.5 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                  >
                    {hint}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message your AI Tutor..."
                disabled={isTyping}
                className="flex-1 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100 transition-all placeholder:text-gray-400 disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isTyping}
                className="w-11 h-11 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-500 transition-colors shadow-md disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:shadow-none"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
