import { Briefcase, ExternalLink, Github, Globe, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PortfolioTemplates = () => {
  const templates = [
    {
      id: 1,
      title: 'Minimal Developer',
      description: 'Clean, dark-mode focused portfolio for software engineers.',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80',
      tech: ['React', 'Tailwind', 'Framer Motion'],
      demoLink: '#',
      repoLink: '#'
    },
    {
      id: 2,
      title: 'Creative Designer',
      description: 'Showcase your designs with beautiful grid layouts and animations.',
      image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&q=80',
      tech: ['Next.js', 'GSAP', 'SCSS'],
      demoLink: '#',
      repoLink: '#'
    },
    {
      id: 3,
      title: 'Data Scientist Pro',
      description: 'Highlight your data projects, visualizations and research papers.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      tech: ['Streamlit', 'Python', 'Plotly'],
      demoLink: '#',
      repoLink: '#'
    },
    {
      id: 4,
      title: 'Mobile App Showcase',
      description: 'Perfect for Flutter/iOS/Android developers to display apps.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
      tech: ['Flutter Web', 'Dart'],
      demoLink: '#',
      repoLink: '#'
    },
    {
      id: 5,
      title: '3D Interactive',
      description: 'Immersive 3D portfolio using Three.js and React Three Fiber.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
      tech: ['R3F', 'Three.js', 'React'],
      demoLink: '#',
      repoLink: '#'
    }
  ];

  return (
    <div className="relative min-h-screen pb-20">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-[#00F5FF]/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-[#6C63FF]/5 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      <div className="relative z-10 space-y-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Portfolio <span className="text-gradient">Templates</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">
            Ready-to-use professional showcases
          </p>
        </motion.div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, i) => (
            <motion.div 
              key={template.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-[2.5rem] overflow-hidden flex flex-col group border-white/5 hover:border-[#6C63FF]/30 transition-all duration-500"
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0C29] via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-[#0F0C29]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 backdrop-blur-sm">
                  <motion.a 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={template.demoLink} 
                    className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white hover:bg-[#00F5FF] hover:text-black transition-all shadow-xl" 
                    title="Live Demo"
                  >
                    <Globe className="w-6 h-6" />
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={template.repoLink} 
                    className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white hover:bg-[#6C63FF] transition-all shadow-xl" 
                    title="View Code"
                  >
                    <Github className="w-6 h-6" />
                  </motion.a>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#6C63FF]/80 backdrop-blur-md text-white text-[10px] font-black rounded-full uppercase tracking-widest border border-white/10 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    Premium
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-gradient transition-all">{template.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-bold leading-relaxed mb-8 line-clamp-2">
                  {template.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                  {template.tech.map((t) => (
                    <span key={t} className="px-3 py-1 bg-white/5 border border-white/5 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-lg">
                      {t}
                    </span>
                  ))}
                </div>
                
                <button className="w-full flex items-center justify-center gap-2 py-4 bg-linear-to-r from-[#6C63FF] to-[#00F5FF] text-white font-black rounded-2xl uppercase tracking-widest transition-all duration-300 shadow-lg shadow-[#6C63FF]/20 active:scale-95 group/btn">
                  Use Template <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioTemplates;
