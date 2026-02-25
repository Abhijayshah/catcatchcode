import { Link } from 'react-router-dom';
import { Star, Clock, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CourseCard = ({ course }) => {
  return (
    <Link to={`/course/${course._id}`} className="block h-full group">
      <div className="glass-card rounded-[2rem] overflow-hidden h-full flex flex-col transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(108,99,255,0.25)] border-white/5 group-hover:border-[#6C63FF]/30">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={course.thumbnail?.url || 'https://via.placeholder.com/640x360?text=Course+Thumbnail'}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-[#6C63FF]/80 backdrop-blur-md text-white text-[10px] font-black rounded-full uppercase tracking-widest border border-white/10">
              {course.category || 'Featured'}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0C29] via-transparent to-transparent opacity-60" />
        </div>
        
        <div className="p-6 flex flex-col flex-1 relative">
          <h3 className="text-lg font-black text-gray-900 dark:text-white line-clamp-2 mb-3 leading-tight group-hover:text-gradient transition-all">
            {course.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2 leading-relaxed font-bold">
            {course.description}
          </p>
          
          <div className="flex items-center gap-4 mb-6 text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
            <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg">
              <Clock className="w-3.5 h-3.5 text-[#00F5FF]" />
              12+ Hours
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg">
              <Users className="w-3.5 h-3.5 text-[#6C63FF]" />
              1.2k Students
            </span>
          </div>

          <div className="mt-auto pt-6 border-t border-white/5">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-yellow-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="text-sm font-black text-gray-900 dark:text-white">4.8</span>
                  <span className="text-[10px] text-gray-500 font-bold">(2.4k)</span>
                </div>
                <div className="font-black text-2xl text-gray-900 dark:text-white tracking-tight">
                  ₹{course.price}
                </div>
              </div>
              
              <div className="w-12 h-12 rounded-2xl bg-[#6C63FF]/10 flex items-center justify-center text-[#6C63FF] group-hover:bg-[#6C63FF] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] transition-all duration-300">
                <ArrowRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
