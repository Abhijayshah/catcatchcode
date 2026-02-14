import { useEffect, useState } from 'react';
import api from '../services/api';
import CourseCard from '../components/CourseCard';
import Loader from '../components/Loader';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';

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
    <div className="space-y-8">
      {/* Personal Study Space Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-700">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-300 max-w-xl">
            Access your personal study library, manage your resources, and track your progress in your dedicated space.
          </p>
        </div>
        <Link 
          to="/study-space" 
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 whitespace-nowrap"
        >
          <BookOpen className="w-5 h-5" />
          Go to My Study Space
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Enrolled Courses</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        {purchasedCourses.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't enrolled in any courses yet.</p>
            <Link to="/" className="text-primary font-bold hover:underline">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {purchasedCourses.map((course) => (
              <div key={course._id} className="relative group">
                <CourseCard course={course} />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg pointer-events-none">
                    <Link to={`/learn/${course._id}`} className="bg-primary text-white px-6 py-2 rounded-full font-bold pointer-events-auto hover:bg-purple-700">
                        Start Learning
                    </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
