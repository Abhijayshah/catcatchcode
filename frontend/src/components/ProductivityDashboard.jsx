import { useState, useEffect } from 'react';
import { 
  CheckCircle, Calendar, TrendingUp, Award, Clock, 
  BarChart2, Target, Bookmark, List, Bell, AlertCircle,
  BookOpen, Activity, Zap, Plus, Trash2, X
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';
import toast from 'react-hot-toast';

const ProductivityDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  
  // Data State
  const [stats, setStats] = useState({
    streak: 0,
    productivityScore: 0,
    dailyGoal: 2,
    dailyProgress: 0,
    subjectProgress: []
  });
  const [todos, setTodos] = useState([]);
  const [deadlines, setDeadlines] = useState([]);

  // Form State
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [showAddDeadline, setShowAddDeadline] = useState(false);
  const [newDeadline, setNewDeadline] = useState({ title: '', date: '', type: 'other' });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/dashboard');
      if (data.stats) setStats(data.stats);
      if (data.todos) setTodos(data.todos);
      if (data.deadlines) setDeadlines(data.deadlines);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
      // Fallback or seed suggestion
    } finally {
      setLoading(false);
    }
  };

  const seedData = async () => {
    try {
      setLoading(true);
      await api.post('/dashboard/seed');
      await fetchDashboardData();
      toast.success('Dashboard seeded with dummy data!');
    } catch (error) {
      toast.error('Failed to seed data');
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const { data } = await api.post('/dashboard/todos', { text: newTodo });
      setTodos([data, ...todos]);
      setNewTodo('');
      setShowAddTodo(false);
      toast.success('Task added');
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  const toggleTodo = async (id) => {
    try {
      const { data } = await api.put(`/dashboard/todos/${id}`);
      setTodos(todos.map(t => t._id === id ? data : t));
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/dashboard/todos/${id}`);
      setTodos(todos.filter(t => t._id !== id));
      toast.success('Task deleted');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleAddDeadline = async (e) => {
    e.preventDefault();
    if (!newDeadline.title || !newDeadline.date) return;
    try {
      const { data } = await api.post('/dashboard/deadlines', newDeadline);
      setDeadlines([...deadlines, data].sort((a, b) => new Date(a.date) - new Date(b.date)));
      setNewDeadline({ title: '', date: '', type: 'other' });
      setShowAddDeadline(false);
      toast.success('Deadline added');
    } catch (error) {
      toast.error('Failed to add deadline');
    }
  };

  const deleteDeadline = async (id) => {
    try {
      await api.delete(`/dashboard/deadlines/${id}`);
      setDeadlines(deadlines.filter(d => d._id !== id));
      toast.success('Deadline removed');
    } catch (error) {
      toast.error('Failed to remove deadline');
    }
  };

  const getDaysLeft = (dateStr) => {
    const diff = new Date(dateStr) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  // Helper for Heatmap (simple grid)
  const renderHeatmap = () => {
    // Generate last 28 days
    return Array.from({ length: 28 }).map((_, i) => {
      const intensity = Math.floor(Math.random() * 5); // 0-4
      const bgColors = [
        'bg-gray-100 dark:bg-gray-800', 
        'bg-green-200 dark:bg-green-900', 
        'bg-green-300 dark:bg-green-700', 
        'bg-green-400 dark:bg-green-600', 
        'bg-green-500 dark:bg-green-500'
      ];
      return (
        <div 
          key={i} 
          className={`w-6 h-6 rounded-sm ${bgColors[intensity]} transition-colors`}
          title={`Day ${i+1}: ${intensity} hours`}
        />
      );
    });
  };

  if (loading) return (
    <div className="h-64 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary" />
          Productivity Hub
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={seedData}
            className="text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Reset / Seed Data
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {/* 1. Learning Streak & Score (Top Left) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="col-span-1 md:col-span-2 lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Streak</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                {stats.streak} <span className="text-lg font-normal text-orange-500">days 🔥</span>
              </h3>
            </div>
            <Zap className="w-8 h-8 text-orange-400" />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Productivity Score</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${stats.productivityScore}%` }} />
              </div>
              <span className="font-bold text-primary">{stats.productivityScore}</span>
            </div>
          </div>
        </motion.div>

        {/* 2. Goal Completion Meter (Top Center) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="col-span-1 md:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white">Daily Goal</h3>
            <Target className="w-5 h-5 text-green-500" />
          </div>
          <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
             <svg className="w-full h-full transform -rotate-90">
               <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100 dark:text-gray-700" />
               <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={351} strokeDashoffset={351 - (351 * (stats.dailyProgress / stats.dailyGoal))} className="text-green-500 transition-all duration-1000" />
             </svg>
             <div className="absolute text-center">
               <span className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round((stats.dailyProgress / stats.dailyGoal) * 100)}%</span>
               <p className="text-xs text-gray-500">{stats.dailyProgress}/{stats.dailyGoal} hrs</p>
             </div>
          </div>
        </motion.div>

        {/* 3. Study Heatmap (Top Right - Wide) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="col-span-1 md:col-span-3 lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" /> Study Consistency
            </h3>
            <span className="text-xs text-gray-500">Last 4 Weeks</span>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {renderHeatmap()}
          </div>
          <div className="flex justify-end items-center gap-2 mt-4 text-xs text-gray-400">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-800"></div>
              <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900"></div>
              <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-600"></div>
              <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-500"></div>
            </div>
            <span>More</span>
          </div>
        </motion.div>

        {/* 4. Subject-wise Progress (Middle Left) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="col-span-1 md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-blue-500" /> Subject Mastery
          </h3>
          <div className="space-y-4">
            {stats.subjectProgress && stats.subjectProgress.length > 0 ? (
              stats.subjectProgress.map((subj) => (
                <div key={subj.subject}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 dark:text-gray-300">{subj.subject}</span>
                    <span className="text-gray-500">{subj.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full bg-blue-500`} style={{ width: `${subj.progress}%` }} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No subject progress data yet.</p>
            )}
          </div>
        </motion.div>

        {/* 5. Exam Countdown & Deadlines (Middle Right) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="col-span-1 md:col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-red-500" /> Upcoming Deadlines
            </h3>
            <button 
              onClick={() => setShowAddDeadline(true)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <Plus className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {showAddDeadline && (
            <form onSubmit={handleAddDeadline} className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
              <div className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Title"
                  className="p-2 text-sm border rounded dark:bg-gray-800 dark:border-gray-600"
                  value={newDeadline.title}
                  onChange={(e) => setNewDeadline({...newDeadline, title: e.target.value})}
                  required
                />
                <input
                  type="date"
                  className="p-2 text-sm border rounded dark:bg-gray-800 dark:border-gray-600"
                  value={newDeadline.date}
                  onChange={(e) => setNewDeadline({...newDeadline, date: e.target.value})}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddDeadline(false)} className="px-3 py-1 text-xs text-gray-500">Cancel</button>
                <button type="submit" className="px-3 py-1 text-xs bg-primary text-white rounded">Add</button>
              </div>
            </form>
          )}

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {deadlines.length > 0 ? (
              deadlines.map((deadline) => {
                const daysLeft = getDaysLeft(deadline.date);
                return (
                  <div key={deadline._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 border-red-400 group">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{deadline.title}</h4>
                      <p className="text-xs text-gray-500">{new Date(deadline.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <span className={`block text-lg font-bold ${daysLeft < 3 ? 'text-red-600' : 'text-red-500'}`}>{daysLeft}</span>
                        <span className="text-[10px] text-gray-400 uppercase">Days Left</span>
                      </div>
                      <button 
                        onClick={() => deleteDeadline(deadline._id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No upcoming deadlines.</p>
            )}
          </div>
        </motion.div>

        {/* 6. Smart To-Do List (Bottom Left) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="col-span-1 md:col-span-2 lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <List className="w-5 h-5 text-indigo-500" /> Smart To-Do
            </h3>
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"><TrendingUp className="w-4 h-4 text-gray-400" /></button>
          </div>
          
          <div className="space-y-2">
            {todos.map((task) => (
              <div key={task._id} className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors group">
                <button 
                  onClick={() => toggleTodo(task._id)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    task.completed 
                      ? 'bg-primary border-primary' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary'
                  }`}
                >
                  {task.completed && <CheckCircle className="w-3 h-3 text-white" />}
                </button>
                <span className={`flex-1 text-gray-700 dark:text-gray-300 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                  {task.text}
                </span>
                <button 
                  onClick={() => deleteTodo(task._id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            {showAddTodo ? (
              <form onSubmit={handleAddTodo} className="flex gap-2 mt-2">
                <input
                  type="text"
                  autoFocus
                  placeholder="New task..."
                  className="flex-1 px-3 py-2 text-sm border rounded-lg dark:bg-gray-800 dark:border-gray-600 outline-none focus:ring-2 focus:ring-primary"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                />
                <button type="submit" className="px-3 py-2 bg-primary text-white rounded-lg text-sm">Add</button>
                <button type="button" onClick={() => setShowAddTodo(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
              </form>
            ) : (
              <button 
                onClick={() => setShowAddTodo(true)}
                className="w-full py-2 mt-2 text-sm text-gray-500 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add new task
              </button>
            )}
          </div>
        </motion.div>

        {/* 7. Bookmarks & Quick Access (Bottom Right) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="col-span-1 md:col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
           <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-yellow-500" /> Bookmarked Pages
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             {['React Documentation', 'System Design Primer', 'LeetCode Top 75'].map((bookmark, i) => (
               <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-sm transition-shadow cursor-pointer">
                 <div className="w-8 h-8 rounded bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm text-xl">🔖</div>
                 <div>
                   <h4 className="font-medium text-sm text-gray-800 dark:text-gray-200">{bookmark}</h4>
                   <p className="text-xs text-gray-400">Last visited 2d ago</p>
                 </div>
               </div>
             ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ProductivityDashboard;
