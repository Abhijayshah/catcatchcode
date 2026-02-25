import { useState } from 'react';
import { Play, Clock, Eye, Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VideoResources = () => {
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

  const videos = [
    {
      id: 1,
      title: 'Data Structures & Algorithms Full Course',
      author: 'CodeMaster',
      thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80',
      duration: '12:30:45',
      views: '1.2M',
      category: 'DSA'
    },
    {
      id: 2,
      title: 'MERN Stack Complete Bootcamp',
      author: 'WebDev Pro',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
      duration: '08:15:20',
      views: '850K',
      category: 'MERN'
    },
    {
      id: 3,
      title: 'Flutter for Beginners',
      author: 'AppAcademy',
      thumbnail: 'https://images.unsplash.com/photo-1617042375876-a13e36732a04?w=800&q=80',
      duration: '06:45:10',
      views: '500K',
      category: 'Flutter'
    },
    {
      id: 4,
      title: 'iOS Development with Swift',
      author: 'AppleDevs',
      thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
      duration: '10:20:30',
      views: '420K',
      category: 'iOS'
    },
    {
      id: 5,
      title: 'Machine Learning A-Z',
      author: 'AI Hub',
      thumbnail: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80',
      duration: '15:10:00',
      views: '900K',
      category: 'AI/ML'
    },
    {
      id: 6,
      title: 'Data Analytics with Python',
      author: 'DataWiz',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      duration: '09:40:15',
      views: '600K',
      category: 'Data Analytics'
    },
    {
      id: 7,
      title: 'Deep Learning Specialization',
      author: 'DeepMind',
      thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
      duration: '20:15:00',
      views: '300K',
      category: 'Deep Learning'
    },
    {
      id: 8,
      title: 'Android Development with Kotlin',
      author: 'Google Developers',
      thumbnail: 'https://images.unsplash.com/photo-1607252650355-f7cb0460cbab?w=800&q=80',
      duration: '11:00:00',
      views: '750K',
      category: 'Android'
    },
    {
      id: 9,
      title: 'Advanced DSA Patterns',
      author: 'AlgoExpert',
      thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
      duration: '05:30:00',
      views: '200K',
      category: 'DSA'
    }
  ];

  const filteredVideos = activeCategory === 'All' 
    ? videos 
    : videos.filter(video => video.category === activeCategory);

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
              Video <span className="text-gradient">Resources</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">
              Learn through high-quality video content
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

        {/* Videos Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredVideos.map((video, i) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-[2.5rem] overflow-hidden flex flex-col group border-white/5 hover:border-[#6C63FF]/30 transition-all duration-500"
              >
                <div className="relative aspect-video overflow-hidden cursor-pointer">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0C29] via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-500">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest border border-white/10">
                    {video.duration}
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className="px-3 py-1 bg-[#6C63FF]/20 text-[#00F5FF] text-[10px] font-black rounded-full uppercase tracking-widest border border-[#6C63FF]/20">
                      {video.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      <Eye className="w-3.5 h-3.5" />
                      {video.views}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-gradient transition-all">
                    {video.title}
                  </h3>
                  
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-linear-to-br from-[#6C63FF] to-[#00F5FF] rounded-full flex items-center justify-center text-[10px] font-black text-white">
                        {video.author.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-gray-500 dark:text-gray-400">{video.author}</span>
                    </div>
                    <button className="p-2 rounded-xl bg-white/5 text-gray-400 group-hover:text-[#00F5FF] transition-colors">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredVideos.length === 0 && (
          <div className="glass-card p-20 rounded-[2.5rem] text-center space-y-6">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="w-10 h-10 text-gray-600" />
            </div>
            <div className="space-y-2">
              <p className="text-gray-500 font-black uppercase tracking-widest text-xs">No videos in this category</p>
              <p className="text-gray-600 dark:text-gray-500 text-sm max-w-xs mx-auto">Explore other categories or check back soon.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoResources;
