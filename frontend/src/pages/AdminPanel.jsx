import { useState, useEffect } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { 
  Trash2, Check, X, Upload, Plus, 
  BarChart2, BookOpen, CreditCard, Users, Settings, FileText, 
  Activity, ArrowRight, Star, Clock, Trash
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState(null);
  const [courses, setCourses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);
  const [settings, setSettings] = useState({ upiId: '', qrCode: null });
  const [loading, setLoading] = useState(true);

  // Form states for adding course
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', category: '', price: '', thumbnail: null });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'stats') {
        const { data } = await api.get('/admin/stats');
        setStats(data);
      } else if (activeTab === 'courses') {
        const { data } = await api.get('/courses');
        setCourses(data);
      } else if (activeTab === 'payments') {
        const { data } = await api.get('/payments');
        setPayments(data);
      } else if (activeTab === 'users') {
        const { data } = await api.get('/admin/users');
        setUsers(data);
      } else if (activeTab === 'settings') {
        const { data } = await api.get('/settings');
        setSettings({ ...data, qrCode: data.qrCode || null });
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Course Actions
  const handleAddCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newCourse.title);
    formData.append('description', newCourse.description);
    formData.append('category', newCourse.category);
    formData.append('price', newCourse.price);
    if (newCourse.thumbnail) formData.append('thumbnail', newCourse.thumbnail);

    try {
        await api.post('/courses', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Course added');
        setShowAddCourse(false);
        fetchData();
    } catch (error) {
        toast.error('Failed to add course');
    }
  };

  const handleDeleteCourse = async (id) => {
      if(window.confirm('Are you sure?')) {
          try {
              await api.delete(`/courses/${id}`);
              toast.success('Course deleted');
              fetchData();
          } catch (error) {
              toast.error('Failed to delete course');
          }
      }
  }

  // Payment Actions
  const handlePaymentStatus = async (id, status) => {
      try {
          await api.put(`/payments/${id}`, { status });
          toast.success(`Payment ${status}`);
          fetchData();
      } catch (error) {
          toast.error('Failed to update payment');
      }
  }

  // User Actions
  const handleBlockUser = async (id) => {
      try {
          await api.put(`/admin/users/${id}/block`);
          toast.success('User status updated');
          fetchData();
      } catch (error) {
          toast.error('Failed to update user');
      }
  }

  // Settings Actions
  const handleUpdateSettings = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('upiId', settings.upiId);
      if (settings.newQrCode) formData.append('qrCode', settings.newQrCode);

      try {
          await api.post('/settings', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          toast.success('Settings updated');
      } catch (error) {
          toast.error('Failed to update settings');
      }
  }

  const tabs = [
    { id: 'stats', label: 'Overview', icon: BarChart2, color: '#00F5FF' },
    { id: 'reports', label: 'Reports', icon: FileText, color: '#6C63FF' },
    { id: 'courses', label: 'Courses', icon: BookOpen, color: '#bf5af2' },
    { id: 'payments', label: 'Payments', icon: CreditCard, color: '#FFD700' },
    { id: 'users', label: 'Users', icon: Users, color: '#6C63FF' },
    { id: 'settings', label: 'Settings', icon: Settings, color: '#00F5FF' },
  ];

  return (
    <div className="relative min-h-screen pb-20">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-[#00F5FF]/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-[#6C63FF]/5 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-80 shrink-0 space-y-6"
        >
          <div className="glass-card p-6 rounded-[2.5rem] border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-xl bg-white/5 text-[#00F5FF]">
                <Activity className="w-6 h-6 animate-pulse" />
              </div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Admin <span className="text-gradient">Panel</span></h2>
            </div>

            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 text-[10px] font-black rounded-2xl transition-all uppercase tracking-widest group ${
                    activeTab === tab.id
                      ? 'bg-linear-to-r from-[#6C63FF] to-[#00F5FF] text-white shadow-lg'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeTab === tab.id ? 'text-white' : ''}`} style={{ color: activeTab === tab.id ? '#fff' : tab.color }} />
                  <span className="flex-1 text-left">{tab.label}</span>
                  {activeTab === tab.id && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats Summary */}
          {stats && activeTab !== 'stats' && (
            <div className="glass-card p-6 rounded-[2rem] border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Status</span>
                <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Live</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400">Total Users</span>
                  <span className="text-sm font-black text-white">{stats.totalUsers}</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00F5FF] w-[70%]" />
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Main Content Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 space-y-8"
        >
          {loading ? (
            <div className="glass-card p-20 rounded-[2.5rem] flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="glass-card p-8 md:p-10 rounded-[2.5rem] border-white/5"
              >
                {activeTab === 'stats' && stats && (
                  <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { label: 'Total Revenue', value: `₹${stats.totalRevenue}`, icon: DollarSign, color: '#00F5FF' },
                        { label: 'Total Users', value: stats.totalUsers, icon: Users, color: '#6C63FF' },
                        { label: 'Total Courses', value: stats.totalCourses, icon: BookOpen, color: '#bf5af2' },
                      ].map((s, i) => (
                        <div key={i} className="glass-card p-8 rounded-3xl border-white/5 bg-white/5 flex flex-col items-center text-center space-y-3 group hover:border-white/20 transition-all">
                          <div className="p-4 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform duration-500" style={{ color: s.color }}>
                            <s.icon className="w-8 h-8" />
                          </div>
                          <div className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{s.value}</div>
                          <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{s.label}</div>
                        </div>
                      ))}
                    </div>
                    {/* Add more stats visualization here if needed */}
                  </div>
                )}

                {activeTab === 'reports' && (
                  <div className="space-y-10">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                        <FileText className="w-7 h-7 text-[#6C63FF]" />
                        Export Neural Data
                      </h2>
                      <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Download platform analytics and user logs</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[
                        { title: 'Payment Intelligence', desc: 'Full transaction history with user data.', icon: CreditCard, color: '#00F5FF', endpoint: '/api/admin/export/payments' },
                        { title: 'User Archetypes', desc: 'Detailed user demographics and behavior logs.', icon: Users, color: '#6C63FF', endpoint: '/api/admin/export/users' },
                      ].map((r, i) => (
                        <div key={i} className="glass-card p-8 rounded-[2rem] border-white/5 bg-white/5 space-y-6 group hover:border-white/20 transition-all">
                          <div className="p-3 rounded-xl bg-white/5 w-fit" style={{ color: r.color }}>
                            <r.icon className="w-6 h-6" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-xl font-black text-white tracking-tight">{r.title}</h3>
                            <p className="text-gray-400 text-sm font-bold leading-relaxed">{r.desc}</p>
                          </div>
                          <button 
                            onClick={() => window.open(`http://localhost:5001${r.endpoint}`, '_blank')}
                            className="w-full py-4 bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center gap-2"
                          >
                            <Upload className="w-4 h-4 rotate-180" /> Export CSV
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'courses' && (
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-1">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                          <BookOpen className="w-7 h-7 text-[#bf5af2]" />
                          Course Infrastructure
                        </h2>
                        <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Manage curriculum and pricing models</p>
                      </div>
                      <button 
                        onClick={() => setShowAddCourse(!showAddCourse)} 
                        className="flex items-center gap-2 px-6 py-4 bg-linear-to-r from-[#6C63FF] to-[#00F5FF] text-white font-black text-xs rounded-2xl uppercase tracking-widest shadow-lg shadow-[#6C63FF]/20 hover:shadow-[#6C63FF]/40 transition-all active:scale-95"
                      >
                        {showAddCourse ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        {showAddCourse ? 'Cancel Operation' : 'Initialize New Course'}
                      </button>
                    </div>

                    <AnimatePresence>
                      {showAddCourse && (
                        <motion.form 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          onSubmit={handleAddCourse} 
                          className="glass-card p-8 rounded-3xl border-white/10 bg-white/5 space-y-6"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <input type="text" placeholder="Title" className="px-4 py-4 bg-black/40 border border-white/10 rounded-xl text-white font-bold placeholder-gray-600 focus:outline-none focus:border-[#00F5FF]/50 transition-all" value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} required />
                            <input type="text" placeholder="Category" className="px-4 py-4 bg-black/40 border border-white/10 rounded-xl text-white font-bold placeholder-gray-600 focus:outline-none focus:border-[#00F5FF]/50 transition-all" value={newCourse.category} onChange={e => setNewCourse({...newCourse, category: e.target.value})} required />
                            <input type="number" placeholder="Price" className="px-4 py-4 bg-black/40 border border-white/10 rounded-xl text-white font-bold placeholder-gray-600 focus:outline-none focus:border-[#00F5FF]/50 transition-all" value={newCourse.price} onChange={e => setNewCourse({...newCourse, price: e.target.value})} required />
                            <input type="file" onChange={e => setNewCourse({...newCourse, thumbnail: e.target.files[0]})} className="px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-gray-400 text-xs font-black uppercase tracking-widest cursor-pointer file:hidden" required />
                          </div>
                          <textarea placeholder="Description" className="w-full px-4 py-4 bg-black/40 border border-white/10 rounded-xl text-white font-bold placeholder-gray-600 focus:outline-none focus:border-[#00F5FF]/50 transition-all" rows="3" value={newCourse.description} onChange={e => setNewCourse({...newCourse, description: e.target.value})} required></textarea>
                          <button type="submit" className="w-full py-4 bg-[#00F5FF] text-black font-black text-xs rounded-xl uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all active:scale-95">Deploy Course</button>
                        </motion.form>
                      )}
                    </AnimatePresence>

                    <div className="overflow-x-auto no-scrollbar">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-white/5">
                            <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Title</th>
                            <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                            <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Price Flow</th>
                            <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {courses.map(course => (
                            <tr key={course._id} className="group hover:bg-white/5 transition-colors">
                              <td className="px-6 py-6 font-black text-white group-hover:text-[#bf5af2] transition-colors">{course.title}</td>
                              <td className="px-6 py-6">
                                <span className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-black text-gray-400 uppercase tracking-widest">{course.category}</span>
                              </td>
                              <td className="px-6 py-6 font-black text-[#00F5FF]">₹{course.price}</td>
                              <td className="px-6 py-6">
                                <button onClick={() => handleDeleteCourse(course._id)} className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'payments' && (
                  <div className="space-y-8">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                        <CreditCard className="w-7 h-7 text-[#FFD700]" />
                        Payment Approvals
                      </h2>
                      <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Verify and authorize incoming neural transactions</p>
                    </div>

                    <div className="overflow-x-auto no-scrollbar">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-white/5">
                            <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">User Entity</th>
                            <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Course ID</th>
                            <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">UTR/Hash</th>
                            <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Evidence</th>
                            <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Operation</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {payments.map(payment => (
                            <tr key={payment._id} className="group hover:bg-white/5 transition-colors">
                              <td className="px-6 py-6">
                                <div className="space-y-0.5">
                                  <div className="text-sm font-black text-white">{payment.user?.name}</div>
                                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{payment.user?.email}</div>
                                </div>
                              </td>
                              <td className="px-6 py-6 text-xs font-bold text-gray-300">{payment.course?.title}</td>
                              <td className="px-6 py-6 font-mono text-[10px] text-[#00F5FF]">{payment.transactionId}</td>
                              <td className="px-6 py-6">
                                <a href={payment.screenshot?.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black text-[#6C63FF] uppercase tracking-widest hover:text-[#00F5FF] transition-colors border-b border-[#6C63FF]/30 pb-0.5">Verify Link</a>
                              </td>
                              <td className="px-6 py-6">
                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                  payment.status === 'approved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                  payment.status === 'rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                  'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20'
                                }`}>
                                  {payment.status}
                                </span>
                              </td>
                              <td className="px-6 py-6">
                                {payment.status === 'pending' && (
                                  <div className="flex gap-2">
                                    <button onClick={() => handlePaymentStatus(payment._id, 'approved')} className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white transition-all shadow-lg hover:shadow-green-500/20"><Check className="w-5 h-5" /></button>
                                    <button onClick={() => handlePaymentStatus(payment._id, 'rejected')} className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg hover:shadow-red-500/20"><X className="w-5 h-5" /></button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'users' && (
                  <div className="space-y-8">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                        <Users className="w-7 h-7 text-[#6C63FF]" />
                        User Registry
                      </h2>
                      <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Control platform access and user permissions</p>
                    </div>

                    <div className="overflow-x-auto no-scrollbar">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-white/5">
                            <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Entity Name</th>
                            <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Hash</th>
                            <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Access Role</th>
                            <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Operation</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {users.map(u => (
                            <tr key={u._id} className="group hover:bg-white/5 transition-colors">
                              <td className="px-6 py-6 font-black text-white">{u.name}</td>
                              <td className="px-6 py-6 text-sm font-bold text-gray-500">{u.email}</td>
                              <td className="px-6 py-6 capitalize font-black text-[10px] tracking-widest text-gray-400">{u.role}</td>
                              <td className="px-6 py-6">
                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${u.isBlocked ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                                  {u.isBlocked ? 'Blocked' : 'Active'}
                                </span>
                              </td>
                              <td className="px-6 py-6">
                                <button 
                                  onClick={() => handleBlockUser(u._id)}
                                  className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border transition-all active:scale-95 ${u.isBlocked ? 'border-green-500/50 text-green-400 hover:bg-green-500 hover:text-white' : 'border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white'}`}
                                >
                                  {u.isBlocked ? 'Authorize Access' : 'Revoke Access'}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="max-w-xl space-y-10">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                        <Settings className="w-7 h-7 text-[#00F5FF]" />
                        System Protocols
                      </h2>
                      <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Configure payment gateways and system variables</p>
                    </div>

                    <form onSubmit={handleUpdateSettings} className="space-y-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Payment UPI ID</label>
                        <input 
                          type="text" 
                          value={settings.upiId} 
                          onChange={e => setSettings({...settings, upiId: e.target.value})}
                          className="w-full px-6 py-5 bg-black/40 border border-white/10 rounded-2xl text-white font-black placeholder-gray-600 focus:outline-none focus:border-[#00F5FF]/50 transition-all"
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">QR Code Visual</label>
                        <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-white/5 border border-white/5 rounded-[2.5rem]">
                          {settings.qrCode?.url && (
                            <div className="relative group">
                              <img 
                                src={settings.qrCode.url} 
                                alt="Current QR" 
                                className="w-40 h-40 object-cover rounded-2xl border-4 border-white/10 shadow-2xl transition-transform group-hover:scale-105" 
                                crossOrigin="anonymous"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Active QR</span>
                              </div>
                            </div>
                          )}
                          <div className="flex-1 space-y-4 text-center md:text-left">
                            <p className="text-gray-400 text-xs font-bold leading-relaxed">Upload a new QR code image to update the payment gateway visual for all users.</p>
                            <label className="inline-flex items-center gap-2 px-6 py-4 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl cursor-pointer hover:bg-white/10 transition-all active:scale-95">
                              <Upload className="w-4 h-4" /> Choose New Vector
                              <input 
                                  type="file" 
                                  onChange={e => setSettings({...settings, newQrCode: e.target.files[0]})}
                                  className="hidden"
                              />
                            </label>
                            {settings.newQrCode && <span className="block text-[10px] text-[#00F5FF] font-black uppercase mt-2 tracking-widest">Target: {settings.newQrCode.name}</span>}
                          </div>
                        </div>
                      </div>
                      
                      <button type="submit" className="w-full py-5 bg-linear-to-r from-[#6C63FF] to-[#00F5FF] text-white font-black text-xs rounded-2xl uppercase tracking-widest shadow-lg shadow-[#6C63FF]/20 hover:shadow-[#6C63FF]/40 transition-all active:scale-95">Commit Changes</button>
                    </form>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;
