import Navbar from './Navbar';
import SubNavbar from './SubNavbar';
import BottomNav from './BottomNav';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';
import { useFocus } from '../context/FocusContext';
import { Maximize, Minimize } from 'lucide-react';

const Layout = ({ children }) => {
  const { isFocusMode, toggleFocusMode } = useFocus();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-16 md:pb-0 flex flex-col transition-colors duration-300">
      {!isFocusMode && <Navbar />}
      {!isFocusMode && <SubNavbar />}
      
      <main className={`flex-grow w-full transition-all duration-300 ${isFocusMode ? 'p-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
        {children}
      </main>

      {!isFocusMode && <Footer />}
      {!isFocusMode && <BottomNav />}
      
      <Toaster position="top-center" />
    </div>
  );
};

export default Layout;
