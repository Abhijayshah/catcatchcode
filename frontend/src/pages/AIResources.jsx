import { useState } from 'react';
import { Bot, Sparkles, Brain, Cpu, MessageSquare, Search, Zap, Crown, ArrowRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIResources = () => {
  const [activeTab, setActiveTab] = useState('tools');

  const tools = [
    { id: 1, name: 'CodeHelper AI', description: 'Advanced code completion and debugging assistant tailored for students.', icon: <Bot className="w-8 h-8" />, category: 'Coding Assistant', status: 'Free', users: '10k+', color: '#6C63FF' },
    { id: 2, name: 'NoteSummarizer', description: 'Instantly summarize long lecture notes and PDFs into concise bullet points.', icon: <MessageSquare className="w-8 h-8" />, category: 'Productivity', status: 'Freemium', users: '5k+', color: '#00F5FF' },
    { id: 3, name: 'AlgorithmVisualizer', description: 'AI-powered visualization of complex algorithms and data structures.', icon: <Brain className="w-8 h-8" />, category: 'Learning', status: 'Premium', users: '2k+', color: '#bf5af2' },
    { id: 4, name: 'InterviewBot', description: 'Mock technical interviews with real-time feedback on your answers.', icon: <Cpu className="w-8 h-8" />, category: 'Career', status: 'Free Trial', users: '8k+', color: '#FFD700' },
    { id: 5, name: 'ProjectGenerator', description: 'Generate full-stack project ideas with starter code and roadmaps.', icon: <Sparkles className="w-8 h-8" />, category: 'Projects', status: 'Free', users: '15k+', color: '#6C63FF' },
  ];

  const prompts = [
    { id: 1, title: 'Explain Complex Concept', prompt: 'Explain [Concept] to me like I am 5 years old, using real-world analogies.', category: 'Learning' },
    { id: 2, title: 'Code Refactoring', prompt: 'Refactor this code to improve performance and readability. Explain the changes.', category: 'Coding' },
    { id: 3, title: 'Bug Debugging', prompt: 'Here is a bug I am facing: [Error Message]. What are the possible causes and fixes?', category: 'Debugging' },
    { id: 4, title: 'Project Roadmap', prompt: 'Create a step-by-step roadmap to learn [Technology] in 4 weeks.', category: 'Planning' },
    { id: 5, title: 'Interview Prep', prompt: 'Act as a senior interviewer. Ask me 5 hard questions about [Topic].', category: 'Career' },
  ];

  const premiumTools = [
    { id: 1, name: 'GPT-4 Turbo Access', originalPrice: '$20/mo', ourPrice: '$5/mo', savings: '75%', description: 'Shared access to ChatGPT Plus features.' },
    { id: 2, name: 'Midjourney Pro', originalPrice: '$30/mo', ourPrice: '$8/mo', savings: '73%', description: 'High-quality AI image generation for your projects.' },
    { id: 3, name: 'GitHub Copilot Team', originalPrice: '$19/mo', ourPrice: '$6/mo', savings: '68%', description: 'AI pair programmer for faster coding.' },
    { id: 4, name: 'Claude 3 Opus', originalPrice: '$20/mo', ourPrice: '$5/mo', savings: '75%', description: 'Access to the most capable AI model for reasoning.' },
  ];

  return (
    <div className="relative min-h-screen pb-20">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-[#00F5FF]/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-[#6C63FF]/5 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      <div className="relative z-10 space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1"
          >
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              AI <span className="text-gradient">Resources</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">
              Supercharge your learning with AI
            </p>
          </motion.div>

          {/* Internal Navigation */}
          <div className="flex p-1.5 space-x-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
            {['tools', 'prompts', 'premium'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 ${
                  activeTab === tab
                    ? 'bg-linear-to-r from-[#6C63FF] to-[#00F5FF] text-white shadow-lg'
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab === 'premium' && <Crown className="w-3.5 h-3.5" />}
                {tab === 'tools' ? 'AI Tools' : tab === 'prompts' ? 'AI Prompts' : 'Premium Access'}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === 'tools' && (
              <motion.div 
                key="tools"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {tools.map((tool, i) => (
                  <motion.div 
                    key={tool.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-8 rounded-[2.5rem] border-white/5 group hover:border-[#6C63FF]/30 transition-all flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-8">
                      <div className="p-4 rounded-2xl bg-white/5 transition-transform group-hover:scale-110 duration-500" style={{ color: tool.color }}>
                        {tool.icon}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        tool.status === 'Free' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        tool.status === 'Premium' ? 'bg-[#bf5af2]/10 text-[#bf5af2] border-[#bf5af2]/20' :
                        'bg-[#00F5FF]/10 text-[#00F5FF] border-[#00F5FF]/20'
                      }`}>
                        {tool.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-gradient transition-all">{tool.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-bold leading-relaxed mb-8 flex-1">{tool.description}</p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-lg">{tool.category}</span>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{tool.users} users</span>
                    </div>
                    
                    <button className="w-full mt-6 py-4 bg-linear-to-r from-[#6C63FF] to-[#00F5FF] text-white text-xs font-black rounded-2xl uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg shadow-[#6C63FF]/20 active:scale-95 flex items-center justify-center gap-2">
                      Try Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'prompts' && (
              <motion.div 
                key="prompts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {prompts.map((prompt, i) => (
                  <motion.div 
                    key={prompt.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-6 md:p-8 rounded-3xl border-white/5 hover:border-[#00F5FF]/30 transition-all group"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-[#00F5FF] uppercase tracking-widest bg-[#00F5FF]/10 px-2 py-1 rounded-md">{prompt.category}</span>
                          <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">{prompt.title}</h3>
                        </div>
                        <p className="text-gray-400 font-mono text-sm bg-black/20 p-4 rounded-xl border border-white/5 leading-relaxed group-hover:border-[#00F5FF]/20 transition-all">
                          {prompt.prompt}
                        </p>
                      </div>
                      <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 text-white text-xs font-black rounded-2xl uppercase tracking-widest hover:bg-[#00F5FF] hover:text-black transition-all active:scale-95 shrink-0">
                        Copy Prompt
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'premium' && (
              <motion.div 
                key="premium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {premiumTools.map((tool, i) => (
                  <motion.div 
                    key={tool.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden group hover:border-[#FFD700]/30 transition-all flex flex-col"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FFD700]/20 to-transparent blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="relative z-10 space-y-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">{tool.name}</h3>
                        <div className="bg-[#FFD700] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-[#FFD700]/20">
                          Save {tool.savings}
                        </div>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 font-bold leading-relaxed text-sm flex-1">{tool.description}</p>
                      
                      <div className="flex items-baseline gap-4 pt-4 border-t border-white/5">
                        <span className="text-3xl font-black text-[#FFD700]">{tool.ourPrice}</span>
                        <span className="text-lg text-gray-600 line-through font-bold">{tool.originalPrice}</span>
                      </div>
                      
                      <button className="w-full py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl uppercase tracking-widest hover:bg-[#FFD700] hover:text-black transition-all active:scale-95 flex items-center justify-center gap-2">
                        Get Access <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AIResources;
