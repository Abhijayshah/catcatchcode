import { Link } from 'react-router-dom';
import { Star, Clock, Users } from 'lucide-react';

const CourseCard = ({ course }) => {
  return (
    <Link to={`/course/${course._id}`} className="block h-full group">
      <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(108,99,255,0.2)]">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={course.thumbnail?.url || 'https://via.placeholder.com/640x360?text=Course+Thumbnail'}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-2 right-2 px-2 py-1 bg-purple-600/90 backdrop-blur-md text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
            {course.category || 'Featured'}
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-200 mb-4 line-clamp-2 leading-relaxed font-medium">
            {course.description}
          </p>
          
          <div className="flex items-center gap-4 mb-4 text-[10px] font-bold text-gray-400 dark:text-gray-300 uppercase tracking-widest">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-500" />
              12+ Hours
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3 text-purple-500" />
              1.2k Students
            </span>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500 font-bold text-sm">4.8</span>
                  <div className="flex text-yellow-500">
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                  <span className="text-[10px] text-gray-400 dark:text-gray-300 font-medium">(2.4k)</span>
                </div>
                <div className="font-extrabold text-xl text-gray-900 dark:text-white mt-1">
                  ₹{course.price}
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-600/10 dark:bg-purple-600/20 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all">
                <Star className="w-5 h-5 group-hover:fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
