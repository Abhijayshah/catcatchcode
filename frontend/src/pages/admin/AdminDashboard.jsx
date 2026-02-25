import { useState, useEffect } from 'react';
import { 
  Users, DollarSign, BookOpen, CreditCard, 
  TrendingUp, Activity, CheckCircle, Clock, ArrowRight, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';
import Loader from '../../components/Loader';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/stats');
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch admin stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader />;

  const statCards = [
    { title: 'Total Revenue', value: `₹${stats?.totalRevenue || 0}`, icon: <DollarSign className="w-6 h-6" />, color: '#00F5FF', shadow: 'shadow-[#00F5FF]/20' },
    { title: 'Active Students', value: stats?.activeSubscribers || 0, icon: <Users className="w-6 h-6" />, color: '#6C63FF', shadow: 'shadow-[#6C63FF]/20' },
    { title: 'Total Courses', value: stats?.totalCourses || 0, icon: <BookOpen className="w-6 h-6" />, color: '#bf5af2', shadow: 'shadow-[#bf5af2]/20' },
    { title: 'Pending Payments', value: stats?.pendingPayments || 0, icon: <Clock className="w-6 h-6" />, color: '#FFD700', shadow: 'shadow-[#FFD700]/20' },
  ];

  return (
    <div className="relative min-h-screen pb-20">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[-5%] w-[600px] h-[600px] bg-[#00F5FF]/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-[#6C63FF]/5 rounded-full blur-[120px] animate-pulse-slow" />
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
              Admin <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">
              Platform Intelligence & Controls
            </p>
          </motion.div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[#00F5FF] animate-pulse" />
              Live Status: Optimal
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 rounded-[2.5rem] border-white/5 group hover:border-white/20 transition-all flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform duration-500 ${stat.shadow}`} style={{ color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="h-10 w-10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-400 opacity-50" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight group-hover:text-gradient transition-all">{stat.value}</h3>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-2">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Transactions Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-[2.5rem] border-white/5 overflow-hidden"
        >
          <div className="p-8 md:p-10 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                    <CreditCard className="w-7 h-7 text-[#00F5FF]" />
                    Recent Transactions
                </h2>
                <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">Latest revenue flow events</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white text-xs font-black rounded-xl uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
              View All History <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">User Details</th>
                  <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Course</th>
                  <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                  <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Flow Status</th>
                  <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stats?.recentTransactions?.length > 0 ? (
                  stats.recentTransactions.map((tx, i) => (
                    <motion.tr 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      key={tx._id} 
                      className="group hover:bg-white/5 transition-colors"
                    >
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#6C63FF] to-[#00F5FF] flex items-center justify-center text-white font-black">
                                {tx.user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="space-y-0.5">
                                <div className="text-sm font-black text-gray-900 dark:text-white group-hover:text-[#00F5FF] transition-colors">{tx.user?.name || 'Anonymous'}</div>
                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{tx.user?.email}</div>
                            </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 group-hover:border-[#6C63FF]/30 transition-all">
                            {tx.course?.title || 'System Resource'}
                        </span>
                      </td>
                      <td className="px-10 py-6">
                        <div className="text-sm font-black text-[#00F5FF]">₹{tx.amount}</div>
                      </td>
                      <td className="px-10 py-6">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          tx.status === 'approved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                          tx.status === 'pending' ? 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20' :
                          'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            tx.status === 'approved' ? 'bg-green-400' :
                            tx.status === 'pending' ? 'bg-[#FFD700]' :
                            'bg-red-400'
                          }`} />
                          {tx.status}
                        </div>
                      </td>
                      <td className="px-10 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        {new Date(tx.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-10 py-20 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-gray-600">
                                <History className="w-8 h-8" />
                            </div>
                            <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">No transaction data found in neural network.</p>
                        </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
