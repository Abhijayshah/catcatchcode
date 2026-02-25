import { useEffect, useState } from 'react';
import api from '../services/api';
import CourseCard from '../components/CourseCard';
import Loader from '../components/Loader';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, LayoutDashboard, Settings, History, Bell, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useUser();
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const { data } = await api.get('/auth/profile');
        const coursePromises = data.purchasedCourses.map(id => api.get(`/courses/${id}`));
        const coursesResponses = await Promise.all(coursePromises);
        setPurchasedCourses(coursesResponses.map(res => res.data));
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPurchasedCourses();
    }
  }, [user]);

  if (loading) return <Loader />;

  return (
    <div className="relative min-h-screen pb-20">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-[#00F5FF]/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-[#6C63FF]/5 rounded-full blur-[120px] animate-pulse-slow" />
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
              My <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">
              Manage your learning journey
            </p>
          </motion.div>

          <div className="flex items-center gap-3">
            <button className="p-3 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-[#00F5FF] transition-all">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-[#6C63FF] transition-all">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Welcome Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#6C63FF]/20 to-[#00F5FF]/20 blur-[80px] -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-700" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#6C63FF]/20 text-[#00F5FF] text-[10px] font-black rounded-full uppercase tracking-widest border border-[#6C63FF]/20">
                Welcome back, {user?.name.split(' ')[0]}!
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight">
                Your Personal <br /> <span className="text-gradient">Study Sanctuary</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl font-medium leading-relaxed">
                You have access to your personal study library, resources, and progress tracking tools. Ready to continue your learning journey?
              </p>
            </div>
            
            <Link 
              to="/study-space" 
              className="flex items-center gap-3 px-8 py-5 bg-linear-to-r from-[#6C63FF] to-[#00F5FF] text-white font-black rounded-2xl hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] transition-all active:scale-95 group shrink-0"
            >
              <BookOpen className="w-6 h-6" />
              Enter Study Space
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Courses', value: purchasedCourses.length, icon: BookOpen, color: '#6C63FF' },
            { label: 'Completed', value: '0', icon: History, color: '#00F5FF' },
            { label: 'Hours', value: '12+', icon: Clock, color: '#bf5af2' },
            { label: 'Points', value: '450', icon: Star, color: '#FFD700' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-3xl border-white/5 flex flex-col items-center text-center space-y-2 group hover:border-white/10 transition-all"
            >
              <div className={`p-3 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform`} style={{ color: stat.color }}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{stat.value}</div>
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Courses Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
              <LayoutDashboard className="w-7 h-7 text-[#00F5FF]" />
              Enrolled Courses
            </h3>
            <Link to="/" className="text-xs font-black text-[#6C63FF] hover:text-[#00F5FF] transition-colors uppercase tracking-widest">
              Browse More
            </Link>
          </div>

          <div className="glass-card p-6 md:p-8 rounded-[2.5rem] border-white/5">
            {purchasedCourses.length === 0 ? (
              <div className="text-center py-20 space-y-6">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                  <BookOpen className="w-10 h-10 text-gray-600" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-xs">No courses found</p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm max-w-xs mx-auto">You haven't enrolled in any courses yet. Start your journey today!</p>
                </div>
                <Link 
                  to="/" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-black rounded-xl hover:bg-white/10 transition-all"
                >
                  Explore Catalog
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {purchasedCourses.map((course, i) => (
                  <motion.div 
                    key={course._id} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative group"
                  >
                    <CourseCard course={course} />
                    <div className="absolute inset-0 bg-[#0F0C29]/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-[2rem] pointer-events-none p-6">
                        <Link 
                          to={`/learn/${course._id}`} 
                          className="w-full py-4 bg-linear-to-r from-[#6C63FF] to-[#00F5FF] text-white rounded-2xl font-black text-center pointer-events-auto hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                          Start Learning <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
