import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';
import { CheckCircle, Lock, Upload, Clock, Users, Star, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(null);
  const [screenshot, setScreenshot] = useState(null);
  const [transactionId, setTransactionId] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await api.get(`/courses/${id}`);
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course:', error);
        toast.error('Failed to load course details');
      } finally {
        setLoading(false);
      }
    };

    const fetchSettings = async () => {
        try {
            const { data } = await api.get('/settings');
            setSettings(data);
        } catch (error) {
            console.error('Error fetching settings', error);
        }
    }

    fetchCourse();
    fetchSettings();
  }, [id]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
        toast.error('Please login to purchase');
        navigate('/login');
        return;
    }
    if (!screenshot || !transactionId) {
        toast.error('Please provide transaction ID and screenshot');
        return;
    }

    const formData = new FormData();
    formData.append('courseId', id);
    formData.append('transactionId', transactionId);
    formData.append('amount', course.price);
    formData.append('screenshot', screenshot);

    setPaymentLoading(true);
    try {
        await api.post('/payments', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        toast.success('Payment submitted for approval!');
        navigate('/dashboard');
    } catch (error) {
        console.error('Payment error:', error);
        toast.error(error.response?.data?.message || 'Payment submission failed');
    } finally {
        setPaymentLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (!course) return <div className="min-h-screen flex items-center justify-center text-white font-bold text-2xl">Course not found</div>;

  const isPurchased = user?.purchasedCourses?.includes(course._id);

  return (
    <div className="relative min-h-screen pb-20">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[-5%] w-[600px] h-[600px] bg-[#00F5FF]/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-[#6C63FF]/5 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      <div className="relative z-10">
        {/* Course Header Section */}
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#6C63FF]/20 text-[#00F5FF] text-[10px] font-black rounded-full uppercase tracking-widest border border-[#6C63FF]/20">
                {course.category || 'Featured Course'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
              {course.title.split(' ').map((word, i) => 
                i === course.title.split(' ').length - 1 ? <span key={i} className="text-gradient"> {word}</span> : <span key={i}> {word}</span>
              )}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl leading-relaxed font-medium">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#00F5FF]" />
                12+ Hours Content
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#6C63FF]" />
                1,240+ Students Enrolled
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                4.9 (420+ Reviews)
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-10">
            {/* Video Placeholder/Preview */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-[2.5rem] overflow-hidden aspect-video relative group"
            >
              <img 
                src={course.thumbnail?.url || 'https://via.placeholder.com/1280x720'} 
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-[0_0_30px_rgba(108,99,255,0.3)]">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2" />
                </div>
              </div>
            </motion.div>

            {/* Curriculum/What you'll learn */}
            <div className="glass-card p-8 md:p-10 rounded-[2.5rem]">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8 tracking-tight flex items-center gap-3">
                <ShieldCheck className="w-7 h-7 text-[#00F5FF]" />
                What's Included in this Course
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Full access to video tutorials",
                  "Source code & project assets",
                  "Lifetime community access",
                  "Completion certificate",
                  "Weekly live Q&A sessions",
                  "Downloadable resources"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 dark:bg-black/20 border border-white/5 group hover:border-[#6C63FF]/30 transition-all">
                    <CheckCircle className="w-6 h-6 text-[#00F5FF] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 dark:text-gray-300 font-bold text-sm tracking-wide">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar / Purchase Area */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-8 rounded-[2.5rem] border-[#6C63FF]/20"
              >
                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-black text-gray-900 dark:text-white">₹{course.price}</span>
                    <span className="text-lg text-gray-500 line-through font-bold">₹{course.price * 2}</span>
                    <span className="text-sm font-black text-[#00F5FF]">50% OFF</span>
                  </div>
                  <p className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">Lifetime access + 30-day guarantee</p>
                </div>

                {isPurchased ? (
                  <button
                    onClick={() => navigate(`/learn/${course._id}`)}
                    className="w-full bg-linear-to-r from-[#6C63FF] to-[#00F5FF] text-white py-5 rounded-2xl font-black hover:shadow-[0_0_25px_rgba(108,99,255,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2 group"
                  >
                    Go to Course <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <div className="p-4 rounded-2xl bg-[#6C63FF]/5 border border-[#6C63FF]/10 space-y-4">
                      <div className="flex items-center gap-3 text-gray-900 dark:text-white mb-2">
                        <CreditCard className="w-5 h-5 text-[#00F5FF]" />
                        <span className="font-black text-sm uppercase tracking-widest">Payment Details</span>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] ml-1">Transaction ID</label>
                        <input
                          type="text"
                          placeholder="Enter UTR/Transaction ID"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          className="w-full px-4 py-4 bg-white/50 dark:bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-[#00F5FF]/50 transition-all dark:text-white placeholder-gray-600 text-sm font-bold"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] ml-1">Payment Screenshot</label>
                        <div className="relative group">
                          <input
                            type="file"
                            onChange={(e) => setScreenshot(e.target.files[0])}
                            className="hidden"
                            id="screenshot-upload"
                            required
                          />
                          <label 
                            htmlFor="screenshot-upload"
                            className="flex items-center justify-center gap-3 w-full px-4 py-8 bg-white/50 dark:bg-black/40 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer group-hover:border-[#6C63FF]/50 transition-all"
                          >
                            <Upload className="w-6 h-6 text-gray-400 group-hover:text-[#6C63FF] transition-colors" />
                            <span className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                              {screenshot ? screenshot.name : 'Upload Screenshot'}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={paymentLoading}
                      className="w-full bg-linear-to-r from-[#6C63FF] to-[#00F5FF] text-white py-5 rounded-2xl font-black hover:shadow-[0_0_25px_rgba(108,99,255,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {paymentLoading ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Complete Enrollment <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>

              <div className="glass-card p-6 rounded-[2rem] border-white/5">
                <h4 className="text-xs font-black text-gray-900 dark:text-white mb-4 uppercase tracking-[0.2em]">QR Payment</h4>
                {settings?.qrCode?.url ? (
                  <div className="bg-white p-3 rounded-2xl inline-block mx-auto mb-4 border-8 border-white/5 shadow-2xl">
                    <img src={settings.qrCode.url} alt="QR Code" className="w-40 h-40" />
                  </div>
                ) : (
                  <div className="py-10 text-center text-gray-500 font-bold text-xs uppercase tracking-widest">QR Code Loading...</div>
                )}
                <div className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] leading-relaxed">
                  Scan to pay using any UPI app. After payment, upload the screenshot and transaction ID for manual approval.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
