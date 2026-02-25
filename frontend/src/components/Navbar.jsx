import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, BookOpen, LogOut, Sun, Moon, X, LayoutDashboard } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import LOGO from '../assets/logo.svg';

const Navbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/courses?keyword=${keyword}`);
    } else {
      navigate('/courses');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-[#0F0C29]/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border-b border-white/10' 
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center gap-4">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative">
              <img src={LOGO} alt="CatCatchCode Logo" className="w-10 h-10 rounded-xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-purple-500/20" />
              <div className="absolute inset-0 bg-[#6C63FF]/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter dark:text-gradient">
              CatCatchCode
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 mx-8 max-w-2xl relative group">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#00F5FF] transition-colors" />
              <input
                type="text"
                placeholder="Search resources, tutorials..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-100/50 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-2xl focus:outline-none focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-[#6C63FF]/30 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium"
              />
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/courses" 
              className={`text-sm font-bold transition-all uppercase tracking-widest relative group ${
                isActive('/courses') ? 'text-[#6C63FF] dark:text-[#00F5FF]' : 'text-gray-600 dark:text-gray-300 hover:text-[#6C63FF] dark:hover:text-[#00F5FF]'
              }`}
            >
              Explore
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#6C63FF] to-[#00F5FF] transition-all duration-300 ${
                isActive('/courses') ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
            
            <ThemeToggle />

            {!user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-6 py-2.5 text-sm font-black text-gray-700 dark:text-white hover:text-[#6C63FF] dark:hover:text-[#00F5FF] transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 bg-linear-to-r from-[#6C63FF] to-[#00F5FF] text-white text-sm font-black rounded-2xl hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] transition-all active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="group">
                  <div className="w-10 h-10 bg-linear-to-br from-[#6C63FF] to-[#00F5FF] rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-3 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 border border-red-500/20 shadow-lg shadow-red-500/10 active:scale-95"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 border border-white/5 text-gray-700 dark:text-gray-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-[#0F0C29]/95 backdrop-blur-2xl border-b border-gray-200 dark:border-white/10"
          >
            <div className="px-4 py-6 space-y-6">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-100 dark:bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/50 dark:text-white"
                />
              </form>

              <div className="space-y-2">
                <Link 
                  to="/courses" 
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-4 text-lg font-bold rounded-2xl transition-all ${
                    isActive('/courses') ? 'bg-[#6C63FF]/10 text-[#6C63FF] dark:text-[#00F5FF]' : 'text-gray-700 dark:text-gray-200 hover:bg-purple-600/10 dark:hover:bg-white/5'
                  }`}
                >
                  Explore Courses
                </Link>
                
                {!user ? (
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center py-4 text-base font-black text-gray-700 dark:text-white border border-gray-200 dark:border-white/10 rounded-2xl"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center py-4 bg-linear-to-r from-[#6C63FF] to-[#00F5FF] text-white text-base font-black rounded-2xl shadow-xl shadow-purple-600/20"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-white/5">
                    <Link 
                      to="/dashboard" 
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-4 text-lg font-bold rounded-2xl transition-all ${
                        isActive('/dashboard') ? 'bg-[#6C63FF]/10 text-[#6C63FF]' : 'text-gray-700 dark:text-gray-200 hover:bg-purple-600/10'
                      }`}
                    >
                      <LayoutDashboard className={`w-5 h-5 ${isActive('/dashboard') ? 'text-[#6C63FF]' : 'text-purple-500'}`} />
                      My Dashboard
                    </Link>
                    {user.role === 'admin' && (
                      <Link 
                        to="/admin/dashboard" 
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-4 text-lg font-bold rounded-2xl transition-all ${
                          isActive('/admin/dashboard') ? 'bg-[#00F5FF]/10 text-[#00F5FF]' : 'text-gray-700 dark:text-gray-200 hover:bg-purple-600/10'
                        }`}
                      >
                        <BookOpen className={`w-5 h-5 ${isActive('/admin/dashboard') ? 'text-[#00F5FF]' : 'text-cyan-500'}`} />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                      className="flex w-full items-center gap-3 px-4 py-4 text-lg font-bold text-red-600 hover:bg-red-500/10 rounded-2xl transition-all"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
