import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';
import { CheckCircle, Lock, Upload } from 'lucide-react';
import { useUser } from '../context/UserContext';
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
  if (!course) return <div>Course not found</div>;

  const isPurchased = user?.purchasedCourses?.includes(course._id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
        <p className="text-lg text-gray-700">{course.description}</p>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold mb-4">What you'll learn</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">Comprehensive curriculum covering all aspects</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sidebar / Payment Card */}
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 sticky top-24">
          <div className="aspect-video mb-4 rounded-md overflow-hidden">
             <img 
               src={course.thumbnail?.url} 
               alt={course.title} 
               className="w-full h-full object-cover" 
               crossOrigin="anonymous"
               referrerPolicy="no-referrer"
             />
          </div>
          <div className="text-3xl font-bold mb-4">₹{course.price}</div>

          {isPurchased ? (
             <div className="w-full bg-green-100 text-green-800 py-3 rounded-md font-bold text-center mb-4">
                You own this course
             </div>
          ) : (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
                {settings?.upiId && (
                    <div className="bg-gray-50 p-4 rounded-md text-sm mb-4">
                        <p className="font-semibold mb-1">Pay via UPI:</p>
                        <p className="font-mono bg-gray-200 p-1 rounded select-all">{settings.upiId}</p>
                        {settings.qrCode?.url && (
                             <img 
                               src={settings.qrCode.url} 
                               alt="QR Code" 
                               className="w-32 h-32 mt-2 mx-auto" 
                               crossOrigin="anonymous"
                               referrerPolicy="no-referrer"
                             />
                        )}
                    </div>
                )}

                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Transaction ID</label>
                    <input 
                        type="text" 
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                        placeholder="Enter UPI Ref ID"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Upload Screenshot</label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-6 h-6 text-gray-400" />
                                <p className="mb-2 text-xs text-gray-500"><span className="font-semibold">Click to upload</span></p>
                            </div>
                            <input type="file" className="hidden" onChange={(e) => setScreenshot(e.target.files[0])} accept="image/*" required />
                        </label>
                    </div>
                    {screenshot && <p className="text-xs text-green-600 mt-1">Selected: {screenshot.name}</p>}
                </div>

                <button
                    type="submit"
                    disabled={paymentLoading}
                    className="w-full bg-primary text-white py-3 rounded-md font-bold hover:bg-purple-700 transition-colors disabled:bg-purple-300"
                >
                    {paymentLoading ? 'Submitting...' : 'Buy Now'}
                </button>
            </form>
          )}

          <p className="text-xs text-center text-gray-500 mt-4">
            30-Day Money-Back Guarantee
          </p>
          <p className="text-xs text-center text-gray-500 mt-1">
            Full Lifetime Access
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
