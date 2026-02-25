import { useState } from 'react';
import { Book, ChevronRight, Hash, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HTMLTutorial from '../components/HTMLTutorial';

const TopicNotes = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'HTML',
    'DSA',
    'MERN',
    'Android',
    'iOS',
    'Flutter',
    'Data Analytics',
    'AI/ML',
    'Deep Learning',
    'Other'
  ];

  const topics = [
    {
      id: 1,
      title: 'Introduction to Data Structures',
      description: 'Arrays, Linked Lists, Stacks, Queues, and basic operations analysis.',
      category: 'DSA',
      readTime: '15 min read',
      tags: ['Basics', 'Arrays', 'Lists']
    },
    {
      id: 2,
      title: 'React Hooks Deep Dive',
      description: 'Understanding useState, useEffect, useContext, and custom hooks with examples.',
      category: 'MERN',
      readTime: '20 min read',
      tags: ['React', 'Hooks', 'Frontend']
    },
    {
      id: 3,
      title: 'Node.js Event Loop Explained',
      description: 'Detailed explanation of phases, timers, microtasks, and macrotasks.',
      category: 'MERN',
      readTime: '12 min read',
      tags: ['Backend', 'Node.js', 'Async']
    },
    {
      id: 4,
      title: 'Flutter State Management',
      description: 'Comparison of Provider, Riverpod, Bloc, and GetX for managing state.',
      category: 'Flutter',
      readTime: '18 min read',
      tags: ['Mobile', 'State', 'Dart']
    },
    {
      id: 5,
      title: 'SwiftUI vs UIKit',
      description: 'When to use declarative syntax vs imperative programming in iOS development.',
      category: 'iOS',
      readTime: '10 min read',
      tags: ['iOS', 'UI', 'Swift']
    },
    {
      id: 6,
      title: 'Neural Networks Basics',
      description: 'Perceptrons, activation functions, backpropagation, and loss functions.',
      category: 'Deep Learning',
      readTime: '25 min read',
      tags: ['Deep Learning', 'Neural Networks']
    },
    {
      id: 7,
      title: 'Supervised vs Unsupervised Learning',
      description: 'Core concepts of machine learning paradigms with real-world examples.',
      category: 'AI/ML',
      readTime: '15 min read',
      tags: ['ML', 'Basics', 'Algorithms']
    },
    {
      id: 8,
      title: 'Data Cleaning with Pandas',
      description: 'Handling missing values, duplicates, and data transformation techniques.',
      category: 'Data Analytics',
      readTime: '20 min read',
      tags: ['Python', 'Pandas', 'Data']
    },
    {
      id: 9,
      title: 'Android Activity Lifecycle',
      description: 'Understanding the lifecycle callback methods and state management.',
      category: 'Android',
      readTime: '12 min read',
      tags: ['Android', 'Kotlin', 'Lifecycle']
    },
    {
      id: 10,
      title: 'Graph Traversal Algorithms',
      description: 'BFS and DFS implementation and applications in solving problems.',
      category: 'DSA',
      readTime: '30 min read',
      tags: ['Graphs', 'Algorithms', 'BFS/DFS']
    }
  ];

  const filteredTopics = activeCategory === 'All' 
    ? topics 
    : topics.filter(topic => topic.category === activeCategory);

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
              Topic <span className="text-gradient">Notes</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">
              Comprehensive guides for every concept
            </p>
          </motion.div>

          <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar max-w-full md:max-w-xl">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-linear-to-r from-[#6C63FF] to-[#00F5FF] text-white shadow-lg shadow-[#6C63FF]/20'
                    : 'bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {activeCategory === 'HTML' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <HTMLTutorial />
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence mode='popLayout'>
              {filteredTopics.map((topic, i) => (
                <motion.div 
                  key={topic.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card p-8 rounded-[2rem] border-white/5 group cursor-pointer hover:border-[#6C63FF]/30 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-[#6C63FF]/20 text-[#00F5FF] text-[10px] font-black rounded-full uppercase tracking-widest border border-[#6C63FF]/20">
                          {topic.category}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                          <Clock className="w-3.5 h-3.5" />
                          {topic.readTime}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight group-hover:text-gradient transition-all">
                        {topic.title}
                      </h3>
                      
                      <p className="text-gray-500 dark:text-gray-400 font-bold leading-relaxed max-w-3xl">
                        {topic.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-3">
                        {topic.tags.map((tag) => (
                          <div key={tag} className="flex items-center gap-1.5 text-[10px] font-black text-gray-500 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 uppercase tracking-widest">
                            <Hash className="w-3.5 h-3.5 text-[#bf5af2]" />
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-[#6C63FF] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(108,99,255,0.4)]">
                      <ChevronRight className="w-7 h-7 text-gray-500 group-hover:text-white transition-all group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicNotes;
