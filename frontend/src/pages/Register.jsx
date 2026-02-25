import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(name, email, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-[#00F5FF]/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-[#6C63FF]/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[40%] left-[10%] w-[300px] h-[300px] bg-[#bf5af2]/5 rounded-full blur-[100px] animate-pulse-slow delay-700" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-card p-8 sm:p-12 rounded-[2.5rem] w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Create <span className="text-gradient">Account</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">
            Join the elite developer community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-gray-700 dark:text-gray-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-gray-400 group-focus-within:text-[#6C63FF] transition-colors" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-2xl focus:outline-none focus:border-[#6C63FF]/50 focus:ring-1 focus:ring-[#6C63FF]/50 transition-all dark:text-white placeholder-gray-500 font-medium"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-gray-700 dark:text-gray-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-[#00F5FF] transition-colors" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-2xl focus:outline-none focus:border-[#00F5FF]/50 focus:ring-1 focus:ring-[#00F5FF]/50 transition-all dark:text-white placeholder-gray-500 font-medium"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-gray-700 dark:text-gray-400 uppercase tracking-[0.2em] ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-[#6C63FF] transition-colors" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-2xl focus:outline-none focus:border-[#6C63FF]/50 focus:ring-1 focus:ring-[#6C63FF]/50 transition-all dark:text-white placeholder-gray-500 font-medium"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-linear-to-r from-[#6C63FF] to-[#00F5FF] text-white py-4 rounded-2xl font-black hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Sign Up <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">
            Already have an account?{' '}
            <Link to="/login" className="text-[#6C63FF] dark:text-[#00F5FF] hover:underline transition-all">
              Log in here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
