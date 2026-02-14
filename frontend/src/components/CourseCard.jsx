import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const CourseCard = ({ course }) => {
  return (
    <Link to={`/course/${course._id}`} className="block h-full">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow h-full flex flex-col">
        <div className="relative aspect-video">
          <img
            src={course.thumbnail?.url || 'https://via.placeholder.com/640x360?text=Course+Thumbnail'}
            alt={course.title}
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-1">{course.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">{course.description}</p>
          <div className="mt-auto">
             <div className="flex items-center mb-2">
                <span className="text-yellow-500 font-bold text-sm mr-1">4.5</span>
                <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                </div>
                <span className="text-xs text-gray-400 ml-1">(1,234)</span>
            </div>
            <div className="font-bold text-lg text-gray-900 dark:text-white">₹{course.price}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
