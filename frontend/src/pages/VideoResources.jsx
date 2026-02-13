import { useState } from 'react';
import { Play } from 'lucide-react';

const VideoResources = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'DSA',
    'MERN',
    'Android',
    'iOS',
    'Flutter',
    'Data Analytics',
    'AI/ML',
    'Deep Learning',
    'Other'
  ];

  const videos = [
    {
      id: 1,
      title: 'Data Structures & Algorithms Full Course',
      author: 'CodeMaster',
      thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80',
      duration: '12:30:45',
      views: '1.2M',
      category: 'DSA'
    },
    {
      id: 2,
      title: 'MERN Stack Complete Bootcamp',
      author: 'WebDev Pro',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
      duration: '08:15:20',
      views: '850K',
      category: 'MERN'
    },
    {
      id: 3,
      title: 'Flutter for Beginners',
      author: 'AppAcademy',
      thumbnail: 'https://images.unsplash.com/photo-1617042375876-a13e36732a04?w=800&q=80',
      duration: '06:45:10',
      views: '500K',
      category: 'Flutter'
    },
    {
      id: 4,
      title: 'iOS Development with Swift',
      author: 'AppleDevs',
      thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
      duration: '10:20:30',
      views: '420K',
      category: 'iOS'
    },
    {
      id: 5,
      title: 'Machine Learning A-Z',
      author: 'AI Hub',
      thumbnail: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80',
      duration: '15:10:00',
      views: '900K',
      category: 'AI/ML'
    },
    {
      id: 6,
      title: 'Data Analytics with Python',
      author: 'DataWiz',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      duration: '09:40:15',
      views: '600K',
      category: 'Data Analytics'
    },
    {
      id: 7,
      title: 'Deep Learning Specialization',
      author: 'DeepMind',
      thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
      duration: '20:15:00',
      views: '300K',
      category: 'Deep Learning'
    },
    {
      id: 8,
      title: 'Android Development with Kotlin',
      author: 'Google Developers',
      thumbnail: 'https://images.unsplash.com/photo-1607252650355-f7cb0460cbab?w=800&q=80',
      duration: '11:00:00',
      views: '750K',
      category: 'Android'
    },
    {
      id: 9,
      title: 'Advanced DSA Patterns',
      author: 'AlgoExpert',
      thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
      duration: '05:30:00',
      views: '200K',
      category: 'DSA'
    }
  ];

  const filteredVideos = activeCategory === 'All' 
    ? videos 
    : videos.filter(video => video.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Video Resources</h1>
        
        {/* Category Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div key={video.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 group cursor-pointer">
            <div className="relative aspect-video bg-gray-100">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center pl-1 shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-primary fill-primary" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded font-medium">
                {video.duration}
              </span>
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {video.category}
                </span>
                <span className="text-xs text-gray-500">{video.views} views</span>
              </div>
              <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                {video.title}
              </h3>
              <p className="text-sm text-gray-500">{video.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoResources;
