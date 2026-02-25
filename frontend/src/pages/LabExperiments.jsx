import { useState } from 'react';
import { FlaskConical, Beaker, Terminal, Microscope, Atom, Download, ChevronRight, Clock, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LabExperiments = () => {
  const [activeTab, setActiveTab] = useState('physics');

  const categories = [
    { id: 'physics', name: 'Physics', icon: <Atom className="w-5 h-5" />, color: '#6C63FF' },
    { id: 'chemistry', name: 'Chemistry', icon: <Beaker className="w-5 h-5" />, color: '#00F5FF' },
    { id: 'computer', name: 'Computer Science', icon: <Terminal className="w-5 h-5" />, color: '#bf5af2' },
    { id: 'biology', name: 'Biology', icon: <Microscope className="w-5 h-5" />, color: '#FFD700' },
  ];

  const experiments = {
    physics: [
      { id: 1, title: 'Ohm\'s Law Verification', description: 'To verify Ohm\'s law by plotting a graph between potential difference and current.', duration: '1.5 hrs', difficulty: 'Beginner' },
      { id: 2, title: 'Focal Length of Convex Lens', description: 'To find the focal length of a convex lens by plotting graphs between u and v or between 1/u and 1/v.', duration: '2 hrs', difficulty: 'Intermediate' },
      { id: 3, title: 'Screw Gauge', description: 'To measure diameter of a given wire using screw gauge.', duration: '1 hr', difficulty: 'Beginner' },
    ],
    chemistry: [
      { id: 1, title: 'Titration Analysis', description: 'Determination of concentration of KMnO4 solution by titrating it against a standard solution of Oxalic acid.', duration: '2 hrs', difficulty: 'Advanced' },
      { id: 2, title: 'Salt Analysis', description: 'Identification of one cation and one anion in a given salt.', duration: '2.5 hrs', difficulty: 'Intermediate' },
    ],
    computer: [
      { id: 1, title: 'Sorting Algorithms', description: 'Implementation of Bubble, Selection, and Insertion sort in C++.', duration: '3 hrs', difficulty: 'Beginner' },
      { id: 2, title: 'Database Connectivity', description: 'Connecting Java application with MySQL database using JDBC.', duration: '2 hrs', difficulty: 'Intermediate' },
      { id: 3, title: 'Web Development Basics', description: 'Creating a personal portfolio website using HTML, CSS and JavaScript.', duration: '4 hrs', difficulty: 'Beginner' },
    ],
    biology: [
      { id: 1, title: 'Mitosis in Onion Root Tip', description: 'Study of mitosis in onion root tip cells using squash technique.', duration: '1.5 hrs', difficulty: 'Intermediate' },
      { id: 2, title: 'Starch Test', description: 'To test the presence of starch in a given food sample.', duration: '45 mins', difficulty: 'Beginner' },
    ]
  };

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
              Lab <span className="text-gradient">Experiments</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">
              Interactive manuals and procedures
            </p>
          </motion.div>

          <div className="flex p-1.5 space-x-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === cat.id
                    ? 'bg-linear-to-r from-[#6C63FF] to-[#00F5FF] text-white shadow-lg'
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={`${activeTab === cat.id ? 'text-white' : ''}`} style={{ color: activeTab === cat.id ? '#fff' : cat.color }}>
                  {cat.icon}
                </span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Experiments Grid */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {experiments[activeTab].map((exp, i) => (
                <motion.div 
                  key={exp.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-8 rounded-[2.5rem] border-white/5 group hover:border-[#6C63FF]/30 transition-all flex flex-col"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-[#00F5FF] uppercase tracking-widest bg-[#00F5FF]/10 px-2 py-1 rounded-md">
                        {exp.difficulty}
                      </span>
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight group-hover:text-gradient transition-all">{exp.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <Clock className="w-3 h-3 text-[#6C63FF]" />
                      {exp.duration}
                    </div>
                  </div>
                  
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-bold leading-relaxed mb-8 flex-1">
                    {exp.description}
                  </p>
                  
                  <button className="w-full flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-[#6C63FF] text-white font-black text-xs rounded-2xl uppercase tracking-widest transition-all duration-300 border border-white/10 hover:border-transparent active:scale-95 group/btn shadow-lg hover:shadow-[#6C63FF]/20">
                    <Download className="w-4 h-4 group-hover/btn:-translate-y-0.5 transition-transform" />
                    Download Manual
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LabExperiments;
