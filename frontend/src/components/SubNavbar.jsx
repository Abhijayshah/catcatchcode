import { Link, useLocation } from 'react-router-dom';
import { Home, Video, Bot, PenTool, BookOpen, FlaskConical, FileQuestion, Briefcase, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const SubNavbar = () => {
  const location = useLocation();
  const path = location.pathname;

  const links = [
    { name: 'Video', path: '/video-resources', icon: <Video className="w-4 h-4" />, color: '#6C63FF' },
    { name: 'AI Tools', path: '/ai-resources', icon: <Bot className="w-4 h-4" />, color: '#00F5FF' },
    { name: 'Handwritten', path: '/handwritten-notes', icon: <PenTool className="w-4 h-4" />, color: '#bf5af2' },
    { name: 'Topic Notes', path: '/topic-notes', icon: <BookOpen className="w-4 h-4" />, color: '#FFD700' },
    { name: 'Lab Exp', path: '/lab-experiments', icon: <FlaskConical className="w-4 h-4" />, color: '#00F5FF' },
    { name: 'Papers', path: '/previous-papers', icon: <FileQuestion className="w-4 h-4" />, color: '#6C63FF' },
    { name: 'Portfolio', path: '/portfolio-templates', icon: <Briefcase className="w-4 h-4" />, color: '#bf5af2' },
  ];

  return (
    <div className="sticky top-20 z-40 w-full bg-white/50 dark:bg-[#0F0C29]/50 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-3">
          <Link
            to="/"
            className={`flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shrink-0 ${
              path === '/' ? 'bg-white/10 text-[#00F5FF]' : 'text-gray-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          
          <div className="h-4 w-px bg-white/10 shrink-0" />

          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl whitespace-nowrap transition-all relative group shrink-0 ${
                path === link.path ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <span className="transition-transform group-hover:scale-110" style={{ color: path === link.path ? link.color : 'inherit' }}>
                {link.icon}
              </span>
              {link.name}
              {path === link.path && (
                <motion.div
                  layoutId="subnav-active"
                  className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              {path === link.path && (
                <motion.div
                  layoutId="subnav-indicator"
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ backgroundColor: link.color }}
                  initial={false}
                />
              )}
            </Link>
          ))}
          
          <div className="ml-auto pl-4 shrink-0 hidden md:block">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-[#6C63FF]/10 to-[#00F5FF]/10 border border-[#6C63FF]/20 rounded-full">
                <Sparkles className="w-3 h-3 text-[#00F5FF] animate-pulse" />
                <span className="text-[8px] font-black text-white uppercase tracking-[0.2em]">Resource Network Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubNavbar;
