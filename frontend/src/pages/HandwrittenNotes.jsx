import { useState } from 'react';
import { FileText, Download, ExternalLink, Filter, Search, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HandwrittenNotes = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
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

  const notes = [
    {
      id: 1,
      title: 'DSA Handwritten Notes - Complete',
      author: 'Sanjay Shah',
      pages: 120,
      size: '15 MB',
      category: 'DSA',
      preview: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' // Sample PDF
    },
    {
      id: 2,
      title: 'MERN Stack Quick Revision',
      author: 'Web Team',
      pages: 45,
      size: '5 MB',
      category: 'MERN',
      preview: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 3,
      title: 'Flutter Architecture Notes',
      author: 'Mobile Devs',
      pages: 30,
      size: '3.5 MB',
      category: 'Flutter',
      preview: 'https://images.unsplash.com/photo-1555421689-d68471e18963?w=800&q=80',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 4,
      title: 'Operating Systems & System Design',
      author: 'CS Dept',
      pages: 85,
      size: '12 MB',
      category: 'Other',
      preview: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 5,
      title: 'AI/ML Mathematics Formulae',
      author: 'Math Club',
      pages: 25,
      size: '2.8 MB',
      category: 'AI/ML',
      preview: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 6,
      title: 'iOS Swift Cheat Sheet',
      author: 'Apple Lovers',
      pages: 15,
      size: '1.2 MB',
      category: 'iOS',
      preview: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 7,
      title: 'Data Analytics Basics',
      author: 'Data Science Club',
      pages: 40,
      size: '6 MB',
      category: 'Data Analytics',
      preview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 8,
      title: 'Deep Learning Neural Nets',
      author: 'AI Research',
      pages: 60,
      size: '10 MB',
      category: 'Deep Learning',
      preview: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 9,
      title: 'Android Kotlin Notes',
      author: 'Droid Team',
      pages: 55,
      size: '7 MB',
      category: 'Android',
      preview: 'https://images.unsplash.com/photo-1607252650355-f7cb0460cbab?w=800&q=80',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    }
  ];

  const filteredNotes = activeCategory === 'All' 
    ? notes 
    : notes.filter(note => note.category === activeCategory);

  const handleOpenPdf = (url) => {
    window.open(url, '_blank');
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
              Handwritten <span className="text-gradient">Notes</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">
              Premium study materials by experts
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

        {/* Notes Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredNotes.map((note, i) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-[2.5rem] overflow-hidden flex flex-col group border-white/5 hover:border-[#6C63FF]/30 transition-all duration-500"
              >
                <div 
                  className="h-56 overflow-hidden relative cursor-pointer" 
                  onClick={() => handleOpenPdf(note.pdfUrl)}
                >
                  <img 
                    src={note.preview} 
                    alt={note.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0C29] via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-500">
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <ExternalLink className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#6C63FF]/80 backdrop-blur-md text-white text-[10px] font-black rounded-full uppercase tracking-widest border border-white/10">
                      {note.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-4 h-4 text-[#00F5FF]" />
                    <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                      Resource PDF
                    </span>
                  </div>
                  
                  <h3 
                    className="text-xl font-black text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-gradient transition-all cursor-pointer" 
                    onClick={() => handleOpenPdf(note.pdfUrl)}
                  >
                    {note.title}
                  </h3>
                  
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    <span className="bg-white/5 px-3 py-1 rounded-lg">{note.pages} pages</span>
                    <span className="bg-white/5 px-3 py-1 rounded-lg">{note.size}</span>
                  </div>
                  
                  <button 
                    onClick={() => handleOpenPdf(note.pdfUrl)}
                    className="mt-6 w-full flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-[#6C63FF] text-white font-black text-xs rounded-2xl uppercase tracking-widest transition-all duration-300 border border-white/10 hover:border-transparent active:scale-95 group/btn"
                  >
                    <Download className="w-4 h-4 group-hover/btn:-translate-y-0.5 transition-transform" />
                    Download PDF
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredNotes.length === 0 && (
          <div className="glass-card p-20 rounded-[2.5rem] text-center space-y-6">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="w-10 h-10 text-gray-600" />
            </div>
            <div className="space-y-2">
              <p className="text-gray-500 font-black uppercase tracking-widest text-xs">No notes in this category</p>
              <p className="text-gray-600 dark:text-gray-500 text-sm max-w-xs mx-auto">Check back later or explore other categories.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HandwrittenNotes;
