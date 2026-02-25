import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import CourseCard from '../components/CourseCard';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';
import {
  Github, Twitter, Facebook, Linkedin, Instagram, Youtube,
  BookOpen, Video, FileText, Bot, FlaskConical,
  FileQuestion, Briefcase, LayoutDashboard, ArrowRight
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import Dashboard from './Dashboard';
import ProductivityDashboard from '../components/ProductivityDashboard';

const HERO_BANNER = 'https://media.licdn.com/dms/image/v2/D4D16AQFIM55TKI7AIQ/profile-displaybackgroundimage-shrink_350_1400/B4DZrxdcjuG4Ac-/0/1764987621122?e=1773878400&v=beta&t=SmNyhyDztH3PYgwmwWNc20-MOKJ2W-nIcGIqkUm0O2A';
const HERO_LOGO = 'https://media.licdn.com/dms/image/v2/D4D03AQHhQx3-pxI0hQ/profile-displayphoto-scale_400_400/B4DZrxdH2tIMAg-/0/1764987536073?e=1773878400&v=beta&t=_gGw8Y9-4XJt4YilX7rCmhsp5cP3EvLRQDA0TGkRSlQ';

const Home = () => {
  const { user } = useUser();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || '';

  const socialLinks = [
    { name: 'Official Channel', icon: <Youtube className="w-5 h-5" />, url: 'https://www.youtube.com/channel/UCgzmNjDq8kI3StWFrIv7QZg', color: 'text-red-600' },
    { name: 'Team Lead', icon: <Youtube className="w-5 h-5" />, url: 'https://www.youtube.com/channel/UCX8i_v1eL9VuLWG1fKwEXhw', color: 'text-red-600' },
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, url: 'https://www.instagram.com/cat_catch_code/', color: 'text-pink-600' },
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, url: 'https://www.linkedin.com/in/catcatchcode/', color: 'text-blue-600' },
    { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, url: 'https://x.com/catcatchcode', color: 'text-blue-400' },
    { name: 'GitHub', icon: <Github className="w-5 h-5" />, url: 'https://github.com/catcatchcode', color: 'text-gray-900' },
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, url: 'https://www.facebook.com/catcatcatchcode', color: 'text-blue-700' },
    { name: 'Reddit', icon: <span className="font-bold text-lg leading-none">R</span>, url: 'https://www.reddit.com/user/Super_Cartoonist1246/', color: 'text-orange-600' },
  ];

  const features = [
    {
      title: 'Video Resources',
      description: 'Access high-quality video tutorials covering DSA, MERN Stack, App Development, and more.',
      icon: <Video className="w-6 h-6 text-blue-500" />,
      bg: 'bg-blue-50',
      link: '/video-resources',
      trending: true
    },
    {
      title: 'Handwritten Notes',
      description: 'Concise, beautifully handwritten notes for quick revision and deep understanding.',
      icon: <FileText className="w-6 h-6 text-green-500" />,
      bg: 'bg-green-50',
      link: '/handwritten-notes'
    },
    {
      title: 'AI Resources',
      description: 'Curated collection of AI tools, prompts, and roadmaps to supercharge your workflow.',
      icon: <Bot className="w-6 h-6 text-purple-500" />,
      bg: 'bg-purple-50',
      link: '/ai-resources',
      trending: true
    },
    {
      title: 'Topic Notes',
      description: 'In-depth documentation and articles on specific programming topics and concepts.',
      icon: <BookOpen className="w-6 h-6 text-orange-500" />,
      bg: 'bg-orange-50',
      link: '/topic-notes'
    },
    {
      title: 'Lab Experiments',
      description: 'Comprehensive manuals and guides for Physics, Chemistry, and Computer Science labs.',
      icon: <FlaskConical className="w-6 h-6 text-teal-500" />,
      bg: 'bg-teal-50',
      link: '/lab-experiments'
    },
    {
      title: 'Previous Papers',
      description: 'Archive of previous year question papers to help you prepare for exams effectively.',
      icon: <FileQuestion className="w-6 h-6 text-red-500" />,
      bg: 'bg-red-50',
      link: '/previous-papers'
    },
    {
      title: 'Portfolio Templates',
      description: 'Professional, ready-to-use portfolio templates to showcase your skills and projects.',
      icon: <Briefcase className="w-6 h-6 text-indigo-500" />,
      bg: 'bg-indigo-50',
      link: '/portfolio-templates'
    },
    {
      title: 'My Study Space',
      description: 'Your personal productivity hub with Pomodoro timer, task tracking, and focus tools.',
      icon: <LayoutDashboard className="w-6 h-6 text-pink-500" />,
      bg: 'bg-pink-50',
      link: '/study-space'
    }
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        let query = '/courses';
        const params = new URLSearchParams();
        if (keyword) params.append('keyword', keyword);
        if (category) params.append('category', category);
        
        if (params.toString()) {
            query += `?${params.toString()}`;
        }

        const { data } = await api.get(query);
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [keyword, category]);

  if (loading) return <Loader />;

  // If user is logged in, show Dashboard at the top
  if (user) {
    return (
      <div className="space-y-12">
        <Dashboard />
        <ProductivityDashboard />
        <div className="border-t border-gray-200 dark:border-gray-800 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Explore More Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-32 pb-24 relative overflow-hidden bg-[#0F0C29]">
      {/* Background Futuristic GIF Overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none z-0">
        <img 
          src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueXp6eXp6eXp6eXp6eXp6eXp6eXp6eXp6eXp6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/L1R1TVr9W5267L3LY5/giphy.gif" 
          alt="Background Animation" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#00F5FF]/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-[#6C63FF]/5 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[10%] w-[700px] h-[700px] bg-[#bf5af2]/5 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      {/* Hero Section - LinkedIn Style */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-[#1a1c3d]/60 dark:backdrop-blur-3xl rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl relative z-10 mx-4 sm:mx-0"
      >
        {/* Banner */}
        <div className="h-40 sm:h-56 md:h-72 w-full overflow-hidden relative">
          <img 
            src={HERO_BANNER}
            alt="CatCatchCode Banner"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        
        {/* Profile Info Section */}
        <div className="px-6 sm:px-10 pb-10 relative">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-16 sm:-mt-24 md:-mt-32 relative z-20">
            {/* Profile Logo */}
            <div className="relative flex flex-col items-start group">
              <div className="relative">
                <img
                  src={HERO_LOGO}
                  alt="CatCatchCode Profile"
                  className="w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-full ring-4 sm:ring-8 ring-white dark:ring-[#0F0C29] object-cover shadow-2xl bg-white dark:bg-[#302b63] transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute bottom-4 right-4 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 border-4 border-white dark:border-[#0F0C29] rounded-full shadow-lg" title="Active Community" />
              </div>
              <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight whitespace-nowrap tracking-tight">
                Cat Catch Code
              </h1>
            </div>

            {/* Title & Info */}
            <div className="flex-1 pb-2">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1" />
                
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.linkedin.com/in/catcatchcode/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0077B5] text-white font-bold hover:bg-[#005fa3] transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95"
                  >
                    <Linkedin className="w-5 h-5" />
                    Connect
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white dark:bg-white/10 text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 font-bold hover:bg-gray-50 dark:hover:bg-white/20 transition-all shadow-sm active:scale-95"
                  >
                    Message
                  </a>
                </div>
              </div>

              {/* Badges Row */}
              <div className="flex flex-wrap gap-6 mt-8 text-sm font-bold">
                {socialLinks.slice(0, 4).map((link) => (
                  <a 
                    key={link.name}
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`flex items-center gap-2 transition-all hover:scale-105 ${link.color} dark:text-gray-400 dark:hover:text-white`}
                  >
                    {link.icon}
                    <span className="hidden sm:inline">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="mt-8 space-y-6 max-w-4xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-[2px] bg-[#00F5FF] rounded-full" />
              <p className="text-gray-500 dark:text-gray-400 font-black uppercase tracking-[0.3em] text-[10px]">
                Neural Skill Network
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {[
                { name: "Android", color: "from-[#6C63FF] to-[#00F5FF]" },
                { name: "Flutter", color: "from-[#6C63FF] to-[#00F5FF]" },
                { name: "iOS", color: "from-[#6C63FF] to-[#00F5FF]" },
                { name: "MERN", color: "from-[#6C63FF] to-[#00F5FF]" },
                { name: "Full Stack Development", color: "from-[#6C63FF] to-[#00F5FF]" },
                { name: "n8n AI Automation", color: "from-[#00F5FF] to-[#00D1FF]" },
                { name: "AI Agent", color: "from-[#00F5FF] to-[#00D1FF]" },
                { name: "LangChain", color: "from-[#00F5FF] to-[#00D1FF]" },
                { name: "OpenAI", color: "from-[#00F5FF] to-[#00D1FF]" },
                { name: "Custom Automation", color: "from-[#00F5FF] to-[#00D1FF]" },
                { name: "Hackathons", color: "from-[#bf5af2] to-[#ff375f]" },
                { name: "DSA", color: "from-[#bf5af2] to-[#ff375f]" },
                { name: "Video Tutorials", color: "from-[#bf5af2] to-[#ff375f]" },
                { name: "Expert Notes", color: "from-[#bf5af2] to-[#ff375f]" }
              ].map((skill) => (
                <motion.span 
                  key={skill.name}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-5 py-2.5 bg-white/10 dark:bg-white/5 border border-white/10 dark:border-white/10 rounded-2xl text-[11px] font-black text-white uppercase tracking-widest relative overflow-hidden group transition-all cursor-default shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                >
                  <div className={`absolute inset-0 bg-linear-to-r ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  <span className={`bg-linear-to-r ${skill.color} bg-clip-text text-transparent group-hover:text-white transition-colors`}>
                    {skill.name}
                  </span>
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="space-y-16 relative z-10 px-4 sm:px-0 mt-20">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Everything You Need to <span className="text-transparent bg-clip-text bg-linear-to-r from-[#6C63FF] to-[#00F5FF]">Succeed</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-bold leading-relaxed uppercase tracking-widest text-[12px]">
            We provide a comprehensive neural network of resources designed for elite performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 rounded-3xl group relative hover:scale-[1.03] transition-all duration-300"
            >
              {feature.trending && (
                <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-500 text-[10px] font-extrabold uppercase tracking-widest border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
                  Trending
                </div>
              )}
              <div className={`w-14 h-14 ${feature.bg} dark:bg-opacity-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xl shadow-purple-500/10`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-black text-white mb-3 group-hover:text-gradient transition-all">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed font-bold tracking-wide">
                {feature.description}
              </p>
              <Link to={feature.link} className="inline-flex items-center text-[#00F5FF] font-black text-[10px] uppercase tracking-[0.2em] hover:gap-3 transition-all group/link group-hover:text-white">
                Get Started <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Community Section */}
      <div className="px-4 sm:px-0">
        <div className="glass-card rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-cyan-500/10 opacity-50 group-hover:opacity-70 transition-opacity" />
          <div className="relative z-10 space-y-10">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                Join Our <span className="text-gradient">Community</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-bold leading-relaxed uppercase tracking-widest text-[12px]">
                Connect with our growing 10k+ learners. Get instant updates on tutorials, AI tools, and hackathon strategies.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-16 h-16 rounded-3xl bg-white dark:bg-white/5 flex items-center justify-center hover:bg-white dark:hover:bg-white hover:scale-110 transition-all duration-500 shadow-2xl border border-gray-100 dark:border-white/10 group/icon"
                  aria-label={link.name}
                >
                  <span className={`text-3xl transition-colors duration-300 ${link.color} dark:text-gray-400 dark:group-hover/icon:${link.color}`}>
                    {link.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      <div id="courses" className="space-y-12 relative z-10 px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Featured Learning Paths</h2>
            <p className="text-[#00F5FF] font-black uppercase tracking-widest text-[10px]">Master the most in-demand skills</p>
          </div>
          <Link to="/courses" className="inline-flex items-center gap-3 px-8 py-3 rounded-2xl bg-linear-to-r from-[#6C63FF] to-[#00F5FF] text-white font-black hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] transition-all active:scale-95 group">
            Explore All Courses <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {courses.length === 0 ? (
          <div className="text-center py-24 glass-card rounded-[2.5rem] border border-dashed border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/5 to-[#00F5FF]/5 opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 space-y-4">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-[#6C63FF]" />
              </div>
              <p className="text-white font-black uppercase tracking-widest text-xs">Neural Synthesis in Progress</p>
              <p className="text-gray-400 text-sm max-w-xs mx-auto font-bold">New paths are being crafted by our elite engineers. Check back soon for deployment.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {courses.slice(0, 4).map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="px-4 sm:px-0 pb-12">
        <div className="glass-card rounded-[2.5rem] grid grid-cols-2 md:grid-cols-4 gap-8 py-14 border border-white/5 relative z-10 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-cyan-500/5" />
          <div className="text-center space-y-3 relative z-10">
            <h3 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500 dark:from-purple-400 dark:to-cyan-300">10k+</h3>
            <p className="text-[10px] sm:text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">Active Learners</p>
          </div>
          <div className="text-center space-y-3 relative z-10 border-l border-gray-100 dark:border-white/10">
            <h3 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500 dark:from-purple-400 dark:to-cyan-300">500+</h3>
            <p className="text-[10px] sm:text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">Premium Assets</p>
          </div>
          <div className="text-center space-y-3 relative z-10 border-l border-gray-100 dark:border-white/10">
            <h3 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500 dark:from-purple-400 dark:to-cyan-300">50+</h3>
            <p className="text-[10px] sm:text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">Deep Tutorials</p>
          </div>
          <div className="text-center space-y-3 relative z-10 border-l border-gray-100 dark:border-white/10">
            <h3 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500 dark:from-purple-400 dark:to-cyan-300">4.9</h3>
            <p className="text-[10px] sm:text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">Star Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
