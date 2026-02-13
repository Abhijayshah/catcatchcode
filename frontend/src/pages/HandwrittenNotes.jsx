import { useState } from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';

const HandwrittenNotes = () => {
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

  const notes = [
    {
      id: 1,
      title: 'DSA Handwritten Notes - Complete',
      author: 'Sanjay Shah',
      pages: 120,
      size: '15 MB',
      category: 'DSA',
      preview: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' // Sample PDF
    },
    {
      id: 2,
      title: 'MERN Stack Quick Revision',
      author: 'Web Team',
      pages: 45,
      size: '5 MB',
      category: 'MERN',
      preview: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 3,
      title: 'Flutter Architecture Notes',
      author: 'Mobile Devs',
      pages: 30,
      size: '3.5 MB',
      category: 'Flutter',
      preview: 'https://images.unsplash.com/photo-1555421689-d68471e18963?w=800&q=80',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 4,
      title: 'Operating Systems & System Design',
      author: 'CS Dept',
      pages: 85,
      size: '12 MB',
      category: 'Other',
      preview: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 5,
      title: 'AI/ML Mathematics Formulae',
      author: 'Math Club',
      pages: 25,
      size: '2.8 MB',
      category: 'AI/ML',
      preview: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 6,
      title: 'iOS Swift Cheat Sheet',
      author: 'Apple Lovers',
      pages: 15,
      size: '1.2 MB',
      category: 'iOS',
      preview: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 7,
      title: 'Data Analytics Basics',
      author: 'Data Science Club',
      pages: 40,
      size: '6 MB',
      category: 'Data Analytics',
      preview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 8,
      title: 'Deep Learning Neural Nets',
      author: 'AI Research',
      pages: 60,
      size: '10 MB',
      category: 'Deep Learning',
      preview: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 9,
      title: 'Android Kotlin Notes',
      author: 'Droid Team',
      pages: 55,
      size: '7 MB',
      category: 'Android',
      preview: 'https://images.unsplash.com/photo-1607252650355-f7cb0460cbab?w=800&q=80',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    }
  ];

  const filteredNotes = activeCategory === 'All' 
    ? notes 
    : notes.filter(note => note.category === activeCategory);

  const handleOpenPdf = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Handwritten Notes</h1>
        
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <div key={note.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full">
            <div className="h-48 overflow-hidden bg-gray-100 relative group cursor-pointer" onClick={() => handleOpenPdf(note.pdfUrl)}>
              <img 
                src={note.preview} 
                alt={note.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors">
                <div className="bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <ExternalLink className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded">
                  {note.category}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary cursor-pointer transition-colors" onClick={() => handleOpenPdf(note.pdfUrl)}>
                {note.title}
              </h3>
              
              <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-sm text-gray-500">
                <span>{note.pages} pages</span>
                <span>{note.size}</span>
              </div>
              
              <button 
                onClick={() => handleOpenPdf(note.pdfUrl)}
                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HandwrittenNotes;
