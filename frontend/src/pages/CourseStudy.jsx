import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlayCircle, FileText, Bot, PenTool, ChevronRight, Layout, MessageSquare, Info } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';
import { motion, AnimatePresence } from 'framer-motion';

const CourseStudy = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('video');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await api.get(`/courses/${id}`);
        setCourse(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <Loader />;
  if (!course) return <div className="min-h-screen flex items-center justify-center text-white font-bold text-2xl">Course not found</div>;

  const tabs = [
    { id: 'video', label: 'Video Lessons', icon: PlayCircle, color: '#6C63FF' },
    { id: 'ai', label: 'AI Assistant', icon: Bot, color: '#00F5FF' },
    { id: 'notes', label: 'Handwritten', icon: PenTool, color: '#bf5af2' },
    { id: 'topic', label: 'Study Guide', icon: FileText, color: '#FFD700' },
  ];

  return (
    <div className="relative min-h-[calc(100vh-120px)] pb-10">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-[#00F5FF]/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-[#6C63FF]/5 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-8 h-full">
        {/* Sidebar Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-80 shrink-0 space-y-6"
        >
          <div className="glass-card p-6 rounded-[2rem] border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-[#6C63FF]/10 text-[#6C63FF]">
                <Layout className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight line-clamp-1">{course.title}</h2>
            </div>

            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 px-5 py-4 text-xs font-black rounded-2xl transition-all uppercase tracking-widest group ${
                    activeTab === tab.id
                      ? 'bg-linear-to-r from-[#6C63FF] to-[#00F5FF] text-white shadow-[0_0_20px_rgba(108,99,255,0.3)]'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeTab === tab.id ? 'text-white' : ''}`} style={{ color: activeTab === tab.id ? '#fff' : tab.color }} />
                  <span className="flex-1 text-left">{tab.label}</span>
                  {activeTab === tab.id && <ChevronRight className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="glass-card p-6 rounded-[2rem] border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <Info className="w-4 h-4 text-[#00F5FF]" />
              <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Course Progress</h4>
            </div>
            <div className="space-y-4">
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-[#6C63FF] to-[#00F5FF] w-[35%]" />
              </div>
              <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest">
                <span>12 / 45 Lessons</span>
                <span>35%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 glass-card p-6 md:p-8 rounded-[2.5rem] border-white/5 min-h-[600px] relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {activeTab === 'video' && (
              <motion.div 
                key="video"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-8 h-full flex flex-col"
              >
                <div className="aspect-video bg-[#0F0C29] rounded-[2rem] overflow-hidden relative group border border-white/5 shadow-2xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-[0_0_30px_rgba(108,99,255,0.3)] group">
                      <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-xl text-xs font-bold text-white">
                      00:00 / 15:45
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-[#6C63FF]/20 text-[#00F5FF] text-[10px] font-black rounded-full uppercase tracking-widest border border-[#6C63FF]/20">
                      Module 1: Introduction
                    </span>
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                    Getting Started with <span className="text-gradient">{course.title}</span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-3xl">
                    In this lesson, we'll cover the fundamental concepts and set up our development environment. Make sure to follow along with the resources provided in the other tabs.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'ai' && (
              <motion.div 
                key="ai"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex flex-col h-full items-center justify-center text-center space-y-8 py-10"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-[#00F5FF]/20 blur-[60px] rounded-full animate-pulse" />
                  <Bot className="w-24 h-24 text-[#00F5FF] relative z-10" />
                </div>
                <div className="space-y-3 max-w-lg">
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">AI Learning <span className="text-gradient">Assistant</span></h3>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">Ask questions about the course content and get instant, context-aware answers to help you learn faster.</p>
                </div>
                <div className="w-full max-w-2xl relative group">
                  <div className="absolute -inset-1 bg-linear-to-r from-[#6C63FF] to-[#00F5FF] rounded-[2rem] blur opacity-25 group-focus-within:opacity-50 transition-opacity" />
                  <div className="relative flex items-center">
                    <MessageSquare className="absolute left-6 w-6 h-6 text-gray-500" />
                    <input 
                      type="text" 
                      placeholder="Ask anything about this module..." 
                      className="w-full pl-16 pr-24 py-6 bg-white dark:bg-black/40 border border-white/10 rounded-[2rem] focus:outline-none dark:text-white font-bold placeholder-gray-600 shadow-2xl" 
                    />
                    <button className="absolute right-4 px-6 py-3 bg-linear-to-r from-[#6C63FF] to-[#00F5FF] text-white text-xs font-black rounded-xl hover:shadow-lg transition-all active:scale-95">
                      ASK AI
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'notes' && (
              <motion.div 
                key="notes"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="glass-card p-6 rounded-[2rem] border-white/5 group hover:border-[#bf5af2]/30 transition-all cursor-pointer">
                    <div className="h-40 bg-[#0F0C29] rounded-2xl mb-4 flex items-center justify-center overflow-hidden relative">
                      <PenTool className="w-10 h-10 text-gray-700 group-hover:text-[#bf5af2] transition-colors group-hover:scale-110 duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#bf5af2]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Lecture {i}</p>
                        <p className="font-black text-gray-900 dark:text-white tracking-tight">Handwritten Notes</p>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-[#bf5af2] transition-colors">
                        <FileText className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'topic' && (
              <motion.div 
                key="topic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Module Study Guides</h3>
                  <button className="text-xs font-black text-[#6C63FF] uppercase tracking-widest hover:text-[#00F5FF] transition-colors">Download All PDF</button>
                </div>
                <div className="space-y-4">
                  {[
                    "1. Introduction to the Ecosystem",
                    "2. Core Concepts and Architecture",
                    "3. Setting up the Development Environment",
                    "4. First Project Implementation",
                    "5. Advanced Techniques and Best Practices"
                  ].map((topic, i) => (
                    <div key={i} className="glass-card p-6 rounded-2xl border-white/5 flex items-center justify-between group hover:bg-white/5 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#FFD700] font-black">{i+1}</div>
                        <span className="font-bold text-gray-700 dark:text-gray-300 tracking-wide">{topic}</span>
                      </div>
                      <button className="p-3 rounded-xl bg-white/5 text-gray-500 hover:text-white hover:bg-[#6C63FF] transition-all">
                        <FileText className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseStudy;
