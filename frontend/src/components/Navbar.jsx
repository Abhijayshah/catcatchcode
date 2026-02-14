import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, BookOpen, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

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

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
              C
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">catcatchcode</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 mx-8 max-w-2xl">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search for anything"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
              />
              <button type="submit" className="absolute left-3 top-2.5 text-gray-400">
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            <Link to="/courses" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">
              Categories
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 text-gray-700 hover:text-primary">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </button>
                <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block border border-gray-100">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    My Dashboard
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 border border-gray-900 text-gray-900 font-medium rounded-sm hover:bg-gray-50"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gray-900 text-white font-medium rounded-sm hover:bg-gray-800"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary dark:text-gray-200"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Top) */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="px-4 py-2 space-y-1">
             <input
                type="text"
                placeholder="Search..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full pl-4 pr-4 py-2 mb-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary transition-colors duration-300"
              />
            <Link to="/courses" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-300">
              Categories
            </Link>
            {!user && (
              <>
                <Link to="/login" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-300">
                  Log in
                </Link>
                <Link to="/register" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-300">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
