import { Github, Twitter, Facebook, Linkedin, Instagram, Youtube, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactForm from './ContactForm';

const Footer = () => {
  const socialLinks = [
    { name: 'Team Lead (Abhijay Shah)', icon: <Youtube className="w-5 h-5" />, url: 'https://www.youtube.com/channel/UCX8i_v1eL9VuLWG1fKwEXhw', color: 'hover:text-red-600' },
    { name: 'Official Channel', icon: <Youtube className="w-5 h-5" />, url: 'https://www.youtube.com/channel/UCgzmNjDq8kI3StWFrIv7QZg', color: 'hover:text-red-600' },
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, url: 'https://www.instagram.com/cat_catch_code/', color: 'hover:text-pink-600' },
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, url: 'https://www.linkedin.com/in/catcatchcode/', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, url: 'https://x.com/catcatchcode', color: 'hover:text-blue-400' },
    { name: 'GitHub', icon: <Github className="w-5 h-5" />, url: 'https://github.com/catcatchcode', color: 'hover:text-gray-900' },
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, url: 'https://www.facebook.com/catcatcatchcode', color: 'hover:text-blue-700' },
    { name: 'Reddit', icon: <span className="font-bold text-lg leading-none">R</span>, url: 'https://www.reddit.com/user/Super_Cartoonist1246/', color: 'hover:text-orange-600' },
  ];

  return (
    <footer className="bg-white dark:bg-[#0F0C29] border-t border-gray-200 dark:border-white/10 mt-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10">
          {/* Brand & Description */}
          <div className="space-y-4 md:col-span-2 lg:col-span-3">
            <h3 className="text-xl font-bold text-primary dark:text-gradient">CatCatchCode</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              Empowering developers with quality resources, tutorials, and a community-driven learning platform. Join us to master DSA, MERN, AI/ML and more.
            </p>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">Categories</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/video-resources" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Video Resources</Link>
              </li>
              <li>
                <Link to="/handwritten-notes" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Handwritten Notes</Link>
              </li>
              <li>
                <Link to="/ai-resources" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">AI Tools & Prompts</Link>
              </li>
              <li>
                <Link to="/topic-notes" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Topic Notes</Link>
              </li>
              <li>
                <Link to="/lab-experiments" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Lab Experiments</Link>
              </li>
              <li>
                <Link to="/previous-papers" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Previous Papers</Link>
              </li>
              <li>
                <Link to="/portfolio-templates" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Portfolio Templates</Link>
              </li>
              <li>
                <Link to="/study-space" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">My Study Space</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/courses" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Browse Courses</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Create Account</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">My Dashboard</Link>
              </li>
              <li>
                <a href="mailto:catcatchcode@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Contact Support</a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">Follow Us</h4>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a href="https://www.youtube.com/channel/UCgzmNjDq8kI3StWFrIv7QZg" target="_blank" rel="noopener noreferrer" className="text-xl sm:text-2xl text-gray-500 dark:text-gray-400 hover:text-[#FF0000] dark:hover:text-[#FF0000] transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://www.instagram.com/cat_catch_code/" target="_blank" rel="noopener noreferrer" className="text-xl sm:text-2xl text-gray-500 dark:text-gray-400 hover:text-[#E4405F] dark:hover:text-[#E4405F] transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com/in/catcatchcode/" target="_blank" rel="noopener noreferrer" className="text-xl sm:text-2xl text-gray-500 dark:text-gray-400 hover:text-[#0077B5] dark:hover:text-[#0077B5] transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://x.com/catcatchcode" target="_blank" rel="noopener noreferrer" className="text-xl sm:text-2xl text-gray-500 dark:text-gray-400 hover:text-[#000000] dark:hover:text-[#000000] transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800" aria-label="X (Twitter)">
                <i className="fab fa-x-twitter"></i>
              </a>
              <a href="https://github.com/catcatchcode" target="_blank" rel="noopener noreferrer" className="text-xl sm:text-2xl text-gray-500 dark:text-gray-400 hover:text-[#181717] dark:hover:text-[#181717] transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61584628988988" target="_blank" rel="noopener noreferrer" className="text-xl sm:text-2xl text-gray-500 dark:text-gray-400 hover:text-[#1877F2] dark:hover:text-[#1877F2] transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://www.reddit.com/user/Super_Cartoonist1246/" target="_blank" rel="noopener noreferrer" className="text-xl sm:text-2xl text-gray-500 dark:text-gray-400 hover:text-[#FF4500] dark:hover:text-[#FF4500] transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800" aria-label="Reddit">
                <i className="fab fa-reddit"></i>
              </a>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="md:col-span-2 lg:col-span-3">
            <ContactForm />
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} CatCatchCode. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6 text-sm text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
