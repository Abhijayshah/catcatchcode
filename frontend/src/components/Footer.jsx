import { Github, Twitter, Facebook, Linkedin, Instagram, Youtube, Mail, Sparkles, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactForm from './ContactForm';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { icon: <Youtube className="w-5 h-5" />, url: 'https://www.youtube.com/channel/UCgzmNjDq8kI3StWFrIv7QZg', color: '#FF0000', label: 'YouTube' },
    { icon: <Instagram className="w-5 h-5" />, url: 'https://www.instagram.com/cat_catch_code/', color: '#E4405F', label: 'Instagram' },
    { icon: <Linkedin className="w-5 h-5" />, url: 'https://www.linkedin.com/in/catcatchcode/', color: '#0077B5', label: 'LinkedIn' },
    { icon: <Twitter className="w-5 h-5" />, url: 'https://x.com/catcatchcode', color: '#1DA1F2', label: 'X' },
    { icon: <Github className="w-5 h-5" />, url: 'https://github.com/catcatchcode', color: '#6e5494', label: 'GitHub' },
    { icon: <Facebook className="w-5 h-5" />, url: 'https://www.facebook.com/profile.php?id=61584628988988', color: '#1877F2', label: 'Facebook' },
  ];

  return (
    <footer className="relative bg-white dark:bg-[#0F0C29] border-t border-gray-200 dark:border-white/10 mt-20 transition-all duration-500 overflow-hidden">
      {/* Footer Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#00F5FF]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#6C63FF]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 sm:gap-16">
          {/* Brand & Description */}
          <div className="space-y-6 md:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-linear-to-br from-[#6C63FF] to-[#00F5FF] rounded-xl shadow-lg shadow-purple-500/20">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-primary dark:text-gradient tracking-tighter">CatCatchCode</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-bold leading-relaxed max-w-sm">
              Empowering the next generation of developers with high-octane resources, elite tutorials, and a community-driven neural network of learning. Join us to master the future of tech.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, i) => (
                <motion.a 
                  key={i}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 bg-white/5 border border-white/5 rounded-xl text-gray-500 hover:text-white transition-all duration-300"
                  style={{ '--hover-color': social.color }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-[10px] font-black text-gray-900 dark:text-white tracking-[0.2em] uppercase">Knowledge Hub</h3>
            <ul className="space-y-4">
              {[
                { label: 'Video Tutorials', path: '/video-resources' },
                { label: 'Expert Notes', path: '/handwritten-notes' },
                { label: 'AI Power Tools', path: '/ai-resources' },
                { label: 'Lab Manuals', path: '/lab-experiments' },
                { label: 'Historical Papers', path: '/previous-papers' },
                { label: 'Portfolio Assets', path: '/portfolio-templates' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-500 dark:text-gray-400 hover:text-[#00F5FF] font-bold text-xs transition-colors tracking-wide flex items-center gap-2 group">
                    <div className="w-1 h-1 bg-white/10 rounded-full group-hover:bg-[#00F5FF] transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-[10px] font-black text-gray-900 dark:text-white tracking-[0.2em] uppercase">Neural Access</h3>
            <ul className="space-y-4">
              {[
                { label: 'Elite Courses', path: '/courses' },
                { label: 'Neural Dashboard', path: '/dashboard' },
                { label: 'Personal Space', path: '/study-space' },
                { label: 'Secure Login', path: '/login' },
                { label: 'Join Network', path: '/register' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-500 dark:text-gray-400 hover:text-[#6C63FF] font-bold text-xs transition-colors tracking-wide flex items-center gap-2 group">
                    <div className="w-1 h-1 bg-white/10 rounded-full group-hover:bg-[#6C63FF] transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Form Section */}
          <div className="md:col-span-2 lg:col-span-4 glass-card p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00F5FF]/10 to-transparent blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                    <Send className="w-5 h-5 text-[#00F5FF]" />
                    <h3 className="text-[10px] font-black text-white tracking-[0.2em] uppercase">Direct Transmission</h3>
                </div>
                <ContactForm />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-gray-500 dark:text-gray-500 text-[10px] font-black uppercase tracking-[0.1em]">
              © {new Date().getFullYear()} CatCatchCode Neural Network. All systems operational.
            </p>
            <div className="flex gap-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">
              <a href="#" className="hover:text-[#00F5FF] transition-colors">Privacy Protocol</a>
              <a href="#" className="hover:text-[#6C63FF] transition-colors">Usage Terms</a>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0F0C29] bg-white/10 backdrop-blur-md flex items-center justify-center text-[10px] font-black text-white overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full object-cover opacity-80" />
                    </div>
                ))}
            </div>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
              Join <span className="text-white">5,000+</span> Elite Devs
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
