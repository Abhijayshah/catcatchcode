import { useState, useEffect } from 'react';
import { Plus, BarChart2, BookOpen, Clock, Target, Sparkles, Filter, Trash2, Edit3, CheckCircle2, Circle } from 'lucide-react';
import api from '../services/api';
import ResourceCard from '../components/ResourceCard';
import AddResourceForm from '../components/AddResourceForm';
import PomodoroTimer from '../components/PomodoroTimer';
import Loader from '../components/Loader';
import { motion, AnimatePresence } from 'framer-motion';

const MyStudySpace = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data } = await api.get('/resources');
      setResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddResource = (newResource) => {
    setResources([newResource, ...resources]);
  };

  const handleDeleteResource = (id) => {
    setResources(resources.filter(r => r._id !== id));
  };

  const handleUpdateResource = (updatedResource) => {
    setResources(resources.map(r => r._id === updatedResource._id ? updatedResource : r));
  };

  // Analytics
  const completedCount = resources.filter(r => r.isCompleted).length;
  const totalCount = resources.length;
  const progressPercentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const sections = ['All', 'Home', 'Video', 'AI', 'Handwritten', 'Notes', 'Lab', 'Papers', 'Portfolio'];

  const filteredResources = filter === 'All' 
    ? resources 
    : resources.filter(r => r.section === filter);

  if (loading) return <Loader />;

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
              Study <span className="text-gradient">Space</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">
              Optimize your learning flow
            </p>
          </motion.div>

          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-linear-to-r from-[#6C63FF] to-[#00F5FF] text-white font-black rounded-2xl hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] transition-all active:scale-95 group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Add Resource
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Stats Overview */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00F5FF]/10 to-[#6C63FF]/10 blur-[80px] -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-700" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 rounded-xl bg-[#00F5FF]/10 text-[#00F5FF]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Learning Progress</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      <BookOpen className="w-3.5 h-3.5 text-[#6C63FF]" />
                      Total Items
                    </div>
                    <div className="text-3xl font-black text-gray-900 dark:text-white">{totalCount}</div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#6C63FF] w-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      <Target className="w-3.5 h-3.5 text-[#00F5FF]" />
                      Completed
                    </div>
                    <div className="text-3xl font-black text-gray-900 dark:text-white">{completedCount}</div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        className="h-full bg-[#00F5FF]" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      <BarChart2 className="w-3.5 h-3.5 text-[#bf5af2]" />
                      Success Rate
                    </div>
                    <div className="text-3xl font-black text-gray-900 dark:text-white">{progressPercentage}%</div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        className="h-full bg-[#bf5af2]" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Filter Section */}
            <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
              <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400">
                <Filter className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Filter By:</span>
              </div>
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => setFilter(section)}
                  className={`px-6 py-3 text-xs font-black rounded-2xl whitespace-nowrap transition-all uppercase tracking-widest ${
                    filter === section
                      ? 'bg-linear-to-r from-[#6C63FF] to-[#00F5FF] text-white shadow-[0_0_15px_rgba(108,99,255,0.3)]'
                      : 'bg-white/5 text-gray-500 dark:text-gray-400 border border-white/5 hover:border-white/20'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode='popLayout'>
                {filteredResources.map((resource) => (
                  <motion.div
                    key={resource._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <ResourceCard 
                      resource={resource} 
                      onDelete={handleDeleteResource}
                      onUpdate={handleUpdateResource}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredResources.length === 0 && (
              <div className="glass-card p-20 rounded-[2.5rem] text-center space-y-6">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                  <BookOpen className="w-10 h-10 text-gray-600" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-500 font-black uppercase tracking-widest text-xs">No resources in this category</p>
                  <p className="text-gray-600 dark:text-gray-500 text-sm max-w-xs mx-auto">Add your first learning resource to this section to get started.</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
            {/* Timer Section */}
            <div className="sticky top-28 space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-8 rounded-[2.5rem] border-[#6C63FF]/20"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 rounded-xl bg-[#6C63FF]/10 text-[#6C63FF]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Focus Timer</h2>
                </div>
                <PomodoroTimer />
              </motion.div>

              {/* Quick Notes / Reminders */}
              <div className="glass-card p-8 rounded-[2.5rem] border-white/5">
                <h4 className="text-xs font-black text-gray-900 dark:text-white mb-6 uppercase tracking-[0.2em]">Learning Tips</h4>
                <div className="space-y-4">
                  {[
                    "Use the Pomodoro technique (25/5 min)",
                    "Review your notes every 24 hours",
                    "Active recall is better than re-reading",
                    "Teach what you learn to someone else"
                  ].map((tip, i) => (
                    <div key={i} className="flex gap-3 text-xs text-gray-500 dark:text-gray-400 font-bold leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] mt-1.5 shrink-0" />
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Resource Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-[#0F0C29]/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-card w-full max-w-2xl rounded-[2.5rem] p-8 md:p-10 relative z-10 border-white/10"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Add New <span className="text-gradient">Resource</span></h2>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400"
                >
                  <Plus className="w-6 h-6 rotate-45" />
                </button>
              </div>
              <AddResourceForm 
                onAdd={handleAddResource} 
                onClose={() => setShowAddModal(false)} 
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyStudySpace;
