import { useState, useEffect } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { Trash2, Check, X, Upload, Plus } from 'lucide-react';

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

  return (
    <div className="flex flex-col md:flex-row gap-6 min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-bold text-gray-900 dark:text-white">Admin Panel</h2>
        </div>
        <nav className="flex flex-col p-2">
            {['stats', 'reports', 'courses', 'payments', 'users', 'settings'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-left px-4 py-3 rounded-md capitalize mb-1 ${
                        activeTab === tab ? 'bg-primary text-white font-medium' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        {loading ? <Loader /> : (
            <>
                {activeTab === 'stats' && stats && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-100 dark:border-purple-800">
                            <h3 className="text-purple-800 dark:text-purple-300 font-medium">Total Revenue</h3>
                            <p className="text-3xl font-bold text-purple-900 dark:text-purple-100 mt-2">₹{stats.totalRevenue}</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
                            <h3 className="text-blue-800 dark:text-blue-300 font-medium">Total Users</h3>
                            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-2">{stats.totalUsers}</p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-100 dark:border-green-800">
                            <h3 className="text-green-800 dark:text-green-300 font-medium">Total Courses</h3>
                            <p className="text-3xl font-bold text-green-900 dark:text-green-100 mt-2">{stats.totalCourses}</p>
                        </div>
                    </div>
                )}

                {activeTab === 'reports' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold mb-4 dark:text-white">Export Reports</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="font-bold text-lg mb-2 dark:text-white">Payment Report</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">Export all payment transaction history to CSV.</p>
                                <button 
                                    onClick={() => window.open('http://localhost:5000/api/admin/export/payments', '_blank')}
                                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    <Upload className="w-4 h-4 rotate-180" /> Export Payments
                                </button>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="font-bold text-lg mb-2 dark:text-white">User Report</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">Export all registered users details to CSV.</p>
                                <button 
                                    onClick={() => window.open('http://localhost:5000/api/admin/export/users', '_blank')}
                                    className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                                >
                                    <Upload className="w-4 h-4 rotate-180" /> Export Users
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'courses' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold dark:text-white">Manage Courses</h2>
                            <button onClick={() => setShowAddCourse(!showAddCourse)} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-purple-700">
                                <Plus className="w-4 h-4" /> Add Course
                            </button>
                        </div>

                        {showAddCourse && (
                            <form onSubmit={handleAddCourse} className="mb-8 bg-gray-50 dark:bg-gray-700/30 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <input type="text" placeholder="Title" className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white" value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} required />
                                    <input type="text" placeholder="Category" className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white" value={newCourse.category} onChange={e => setNewCourse({...newCourse, category: e.target.value})} required />
                                    <input type="number" placeholder="Price" className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white" value={newCourse.price} onChange={e => setNewCourse({...newCourse, price: e.target.value})} required />
                                    <input type="file" onChange={e => setNewCourse({...newCourse, thumbnail: e.target.files[0]})} className="p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300" required />
                                </div>
                                <textarea placeholder="Description" className="w-full p-2 border rounded mb-4 dark:bg-gray-800 dark:border-gray-600 dark:text-white" rows="3" value={newCourse.description} onChange={e => setNewCourse({...newCourse, description: e.target.value})} required></textarea>
                                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Save Course</button>
                            </form>
                        )}

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium border-b dark:border-gray-600">
                                    <tr>
                                        <th className="p-3">Title</th>
                                        <th className="p-3">Category</th>
                                        <th className="p-3">Price</th>
                                        <th className="p-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="dark:text-gray-300">
                                    {courses.map(course => (
                                        <tr key={course._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <td className="p-3">{course.title}</td>
                                            <td className="p-3">{course.category}</td>
                                            <td className="p-3">₹{course.price}</td>
                                            <td className="p-3">
                                                <button onClick={() => handleDeleteCourse(course._id)} className="text-red-500 hover:text-red-700">
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
                     <div className="overflow-x-auto">
                        <h2 className="text-xl font-bold mb-6 dark:text-white">Payment Approvals</h2>
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium border-b dark:border-gray-600">
                                <tr>
                                    <th className="p-3">User</th>
                                    <th className="p-3">Course</th>
                                    <th className="p-3">Transaction ID</th>
                                    <th className="p-3">Screenshot</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody className="dark:text-gray-300">
                                {payments.map(payment => (
                                    <tr key={payment._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="p-3 text-sm">
                                            <div className="font-medium dark:text-white">{payment.user?.name}</div>
                                            <div className="text-gray-500 dark:text-gray-400">{payment.user?.email}</div>
                                        </td>
                                        <td className="p-3">{payment.course?.title}</td>
                                        <td className="p-3 font-mono text-sm">{payment.transactionId}</td>
                                        <td className="p-3">
                                            <a href={payment.screenshot?.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">View</a>
                                        </td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                payment.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                payment.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            {payment.status === 'pending' && (
                                                <div className="flex gap-2">
                                                    <button onClick={() => handlePaymentStatus(payment._id, 'approved')} className="text-green-600 hover:bg-green-50 p-1 rounded"><Check className="w-5 h-5" /></button>
                                                    <button onClick={() => handlePaymentStatus(payment._id, 'rejected')} className="text-red-600 hover:bg-red-50 p-1 rounded"><X className="w-5 h-5" /></button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="overflow-x-auto">
                        <h2 className="text-xl font-bold mb-6 dark:text-white">User Management</h2>
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium border-b dark:border-gray-600">
                                <tr>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Role</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody className="dark:text-gray-300">
                                {users.map(u => (
                                    <tr key={u._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="p-3">{u.name}</td>
                                        <td className="p-3">{u.email}</td>
                                        <td className="p-3 capitalize">{u.role}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${u.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                                {u.isBlocked ? 'Blocked' : 'Active'}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <button 
                                                onClick={() => handleBlockUser(u._id)}
                                                className={`text-sm px-3 py-1 rounded border ${u.isBlocked ? 'border-green-600 text-green-600 hover:bg-green-50' : 'border-red-600 text-red-600 hover:bg-red-50'}`}
                                            >
                                                {u.isBlocked ? 'Unblock' : 'Block'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="max-w-md">
                        <h2 className="text-xl font-bold mb-6 dark:text-white">Payment Settings</h2>
                        <form onSubmit={handleUpdateSettings} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">UPI ID</label>
                                <input 
                                    type="text" 
                                    value={settings.upiId} 
                                    onChange={e => setSettings({...settings, upiId: e.target.value})}
                                    className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">QR Code</label>
                                {settings.qrCode?.url && (
                                    <img 
                                      src={settings.qrCode.url} 
                                      alt="Current QR" 
                                      className="w-32 h-32 mb-2 object-cover border rounded dark:border-gray-600" 
                                      crossOrigin="anonymous"
                                      referrerPolicy="no-referrer"
                                    />
                                )}
                                <input 
                                    type="file" 
                                    onChange={e => setSettings({...settings, newQrCode: e.target.files[0]})}
                                    className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                />
                            </div>
                            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-md hover:bg-purple-700">
                                Save Settings
                            </button>
                        </form>
                    </div>
                )}
            </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
