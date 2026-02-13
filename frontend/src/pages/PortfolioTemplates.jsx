import { Briefcase, ExternalLink, Github, Globe } from 'lucide-react';

const PortfolioTemplates = () => {
  const templates = [
    {
      id: 1,
      title: 'Minimal Developer',
      description: 'Clean, dark-mode focused portfolio for software engineers.',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80',
      tech: ['React', 'Tailwind', 'Framer Motion'],
      demoLink: '#',
      repoLink: '#'
    },
    {
      id: 2,
      title: 'Creative Designer',
      description: 'Showcase your designs with beautiful grid layouts and animations.',
      image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&q=80',
      tech: ['Next.js', 'GSAP', 'SCSS'],
      demoLink: '#',
      repoLink: '#'
    },
    {
      id: 3,
      title: 'Data Scientist Pro',
      description: 'Highlight your data projects, visualizations and research papers.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      tech: ['Streamlit', 'Python', 'Plotly'],
      demoLink: '#',
      repoLink: '#'
    },
    {
      id: 4,
      title: 'Mobile App Showcase',
      description: 'Perfect for Flutter/iOS/Android developers to display apps.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
      tech: ['Flutter Web', 'Dart'],
      demoLink: '#',
      repoLink: '#'
    },
    {
      id: 5,
      title: '3D Interactive',
      description: 'Immersive 3D portfolio using Three.js and React Three Fiber.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
      tech: ['R3F', 'Three.js', 'React'],
      demoLink: '#',
      repoLink: '#'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-primary" />
          Portfolio Templates
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={template.image} 
                alt={template.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <a href={template.demoLink} className="p-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors" title="Live Demo">
                  <Globe className="w-5 h-5" />
                </a>
                <a href={template.repoLink} className="p-2 bg-white rounded-full hover:bg-black hover:text-white transition-colors" title="View Code">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{template.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {template.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {template.tech.map((t) => (
                  <span key={t} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                    {t}
                  </span>
                ))}
              </div>
              
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
                Use Template <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioTemplates;
