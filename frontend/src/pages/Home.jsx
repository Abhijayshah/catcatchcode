import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import CourseCard from '../components/CourseCard';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';
import { 
  Github, Twitter, Facebook, Linkedin, Instagram, Youtube, 
  BookOpen, ArrowRight, Video, FileText, Bot, FlaskConical, 
  FileQuestion, Briefcase, LayoutDashboard, CheckCircle, 
  PlayCircle, Cloud, TrendingUp, Zap 
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import Dashboard from './Dashboard';
import ProductivityDashboard from '../components/ProductivityDashboard';

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
      link: '/video-resources'
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
      link: '/ai-resources'
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
        {/* User Dashboard */}
        <Dashboard />
        
        {/* Productivity Hub */}
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
    <div className="space-y-20 pb-12">
      {/* Hero Section */}
      <div className="bg-purple-50 dark:bg-gray-900 rounded-2xl p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden border border-purple-100 dark:border-gray-800">
        <div className="flex-1 space-y-6 z-10">
          <img 
            src="/assets/cat.jpeg" 
            alt="Cat" 
            className="w-full h-auto rounded-lg mb-6 shadow-lg border-4 border-white dark:border-gray-800"
          />
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            Study Smarter.<br />
            <span className="text-purple-600">Stay Focused.</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
            ✨ Build your personal study environment by uploading YouTube videos or any vedios and note  via URLs or link, and track your progress — all in one powerful, distraction-free dashboard.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link 
              to="/register" 
              className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 dark:shadow-none"
            >
              Start Learning Free →
            </Link>
            <a 
              href="#courses" 
              className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Explore Courses
            </a>
          </div>
          <div className="flex flex-wrap gap-6 pt-6 text-sm font-medium text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-purple-600" />
              Ad-free Video
            </div>
            <div className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-purple-600" />
              Cloud Notes
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Progress
            </div>
          </div>
        </div>
        
        {/* Hero Image / Mockup */}
        <div className="flex-1 w-full max-w-lg relative z-10">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Daily Goal</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">85%</span>
                  <span className="text-sm text-green-500 font-medium">+12%</span>
                </div>
              </div>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">DS</div>
                  <span className="font-medium text-gray-700 dark:text-gray-200">Data Structures</span>
                </div>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 flex items-center justify-center font-bold text-xs">JS</div>
                  <span className="font-medium text-gray-700 dark:text-gray-200">JavaScript</span>
                </div>
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-500"></div>
              </div>
              <div className="pt-2">
                <div className="flex items-center justify-end">
                   <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                     <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                     10k+ Learners
                   </span>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative background elements */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-pink-200 dark:bg-pink-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Everything You Need to Succeed</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">We provide a comprehensive ecosystem of resources designed to help students and developers learn effectively.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 ${feature.bg} dark:bg-opacity-20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed">{feature.description}</p>
              <Link to={feature.link} className="inline-flex items-center text-purple-600 dark:text-purple-400 font-medium text-sm hover:text-purple-700 dark:hover:text-purple-300">
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Community Section */}
      <div className="bg-gray-900 rounded-2xl p-8 md:p-16 text-center text-white relative overflow-hidden">
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
              <span className="text-purple-400">Join Our Community</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Connect with thousands of other learners. Stay updated with the latest tutorials, resources, and tech news by following us on social media.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://www.youtube.com/channel/UCgzmNjDq8kI3StWFrIv7QZg" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-[#FF0000] hover:scale-110 transition-all duration-300 text-gray-300" aria-label="YouTube Official">
              <i className="fab fa-youtube text-2xl"></i>
            </a>
            <a href="https://www.instagram.com/cat_catch_code/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-[#E4405F] hover:scale-110 transition-all duration-300 text-gray-300" aria-label="Instagram">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a href="https://www.linkedin.com/in/catcatchcode/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-[#0077B5] hover:scale-110 transition-all duration-300 text-gray-300" aria-label="LinkedIn">
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a href="https://x.com/catcatchcode" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-[#000000] hover:scale-110 transition-all duration-300 text-gray-300" aria-label="X (Twitter)">
              <i className="fab fa-x-twitter text-2xl"></i>
            </a>
            <a href="https://github.com/catcatchcode" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-[#181717] hover:scale-110 transition-all duration-300 text-gray-300" aria-label="GitHub">
              <i className="fab fa-github text-2xl"></i>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61584628988988" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-[#1877F2] hover:scale-110 transition-all duration-300 text-gray-300" aria-label="Facebook">
              <i className="fab fa-facebook text-2xl"></i>
            </a>
            <a href="https://www.reddit.com/user/Super_Cartoonist1246/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-[#FF4500] hover:scale-110 transition-all duration-300 text-gray-300" aria-label="Reddit">
              <i className="fab fa-reddit text-2xl"></i>
            </a>
          </div>
        </div>
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-900 opacity-20 filter blur-3xl"></div>
      </div>

      {/* Featured Courses */}
      <div id="courses" className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Courses</h2>
          <Link to="/courses" className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        {courses.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">No courses available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.slice(0, 4).map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-gray-100 dark:border-gray-800">
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">10k+</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Active Learners</p>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">500+</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Premium Resources</p>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">50+</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Video Courses</p>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">4.9/5</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">User Rating</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
