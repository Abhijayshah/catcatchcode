import { useState } from 'react';
import { FileQuestion, Calendar, BookOpen, Download, Filter, Search, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PreviousPapers = () => {
  const [activeYear, setActiveYear] = useState('2023');

  const years = ['2023', '2022', '2021', '2020'];

  const papers = {
    '2023': [
      { id: 1, subject: 'Data Structures', semester: 'Sem 3', code: 'CS301', date: 'Dec 2023', type: 'End-Sem' },
      { id: 2, subject: 'Digital Logic', semester: 'Sem 3', code: 'CS302', date: 'Dec 2023', type: 'Mid-Sem' },
      { id: 3, subject: 'Operating Systems', semester: 'Sem 4', code: 'CS401', date: 'May 2023', type: 'End-Sem' },
      { id: 4, subject: 'Computer Networks', semester: 'Sem 4', code: 'CS402', date: 'May 2023', type: 'End-Sem' },
    ],
    '2022': [
      { id: 1, subject: 'Data Structures', semester: 'Sem 3', code: 'CS301', date: 'Dec 2022', type: 'End-Sem' },
      { id: 2, subject: 'Digital Logic', semester: 'Sem 3', code: 'CS302', date: 'Dec 2022', type: 'Mid-Sem' },
      { id: 3, subject: 'Operating Systems', semester: 'Sem 4', code: 'CS401', date: 'May 2022', type: 'End-Sem' },
    ],
    '2021': [
      { id: 1, subject: 'Mathematics III', semester: 'Sem 3', code: 'MA301', date: 'Dec 2021', type: 'End-Sem' },
      { id: 2, subject: 'Java Programming', semester: 'Sem 3', code: 'CS305', date: 'Dec 2021', type: 'Mid-Sem' },
    ],
    '2020': [
      { id: 1, subject: 'Physics', semester: 'Sem 1', code: 'PH101', date: 'Dec 2020', type: 'End-Sem' },
      { id: 2, subject: 'Basic Electronics', semester: 'Sem 1', code: 'EC101', date: 'Dec 2020', type: 'End-Sem' },
    ],
  };

  const handleDownload = () => {
    window.open('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', '_blank');
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
              Previous <span className="text-gradient">Papers</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">
              Master your exams with historical data
            </p>
          </motion.div>

          <div className="flex p-1.5 space-x-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-x-auto no-scrollbar">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-8 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap ${
                  activeYear === year
                    ? 'bg-linear-to-r from-[#6C63FF] to-[#00F5FF] text-white shadow-lg'
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                Year {year}
              </button>
            ))}
          </div>
        </div>

        {/* Papers Grid */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeYear}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {papers[activeYear].map((paper, i) => (
                <motion.div 
                  key={paper.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-8 rounded-[2.5rem] border-white/5 group hover:border-[#6C63FF]/30 transition-all flex flex-col"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black text-[#00F5FF] uppercase tracking-widest bg-[#00F5FF]/10 px-3 py-1 rounded-md">
                      {paper.code}
                    </span>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#6C63FF]" />
                      {paper.date}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-8 flex-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md">
                      {paper.type}
                    </span>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight group-hover:text-gradient transition-all">
                      {paper.subject}
                    </h3>
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-[#bf5af2]" />
                      {paper.semester}
                    </p>
                  </div>
                  
                  <button 
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-[#6C63FF] text-white font-black text-xs rounded-2xl uppercase tracking-widest transition-all duration-300 border border-white/10 hover:border-transparent active:scale-95 group/btn shadow-lg hover:shadow-[#6C63FF]/20"
                  >
                    <Download className="w-4 h-4 group-hover/btn:-translate-y-0.5 transition-transform" />
                    Download PDF
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {papers[activeYear].length === 0 && (
          <div className="glass-card p-20 rounded-[2.5rem] text-center space-y-6">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
              <FileQuestion className="w-10 h-10 text-gray-600" />
            </div>
            <div className="space-y-2">
              <p className="text-gray-500 font-black uppercase tracking-widest text-xs">No papers available for this year</p>
              <p className="text-gray-600 dark:text-gray-500 text-sm max-w-xs mx-auto">Check other years or browse our study guides.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousPapers;
