import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { FocusProvider } from './context/FocusContext';
import { ThemeProvider } from './context/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const CourseDetails = lazy(() => import('./pages/CourseDetails'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const MyStudySpace = lazy(() => import('./pages/MyStudySpace'));
const CourseStudy = lazy(() => import('./pages/CourseStudy'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const AIResources = lazy(() => import('./pages/AIResources'));
const VideoResources = lazy(() => import('./pages/VideoResources'));
const HandwrittenNotes = lazy(() => import('./pages/HandwrittenNotes'));
const TopicNotes = lazy(() => import('./pages/TopicNotes'));
const LabExperiments = lazy(() => import('./pages/LabExperiments'));
const PreviousPapers = lazy(() => import('./pages/PreviousPapers'));
const PortfolioTemplates = lazy(() => import('./pages/PortfolioTemplates'));

function App() {
  return (
    <HelmetProvider>
        <Router>
        <ThemeProvider>
        <UserProvider>
          <FocusProvider>
            <Layout>
            <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loader /></div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/courses" element={<Home />} />
                    <Route path="/video-resources" element={<VideoResources />} />
                    <Route path="/ai-resources" element={<AIResources />} />
                    <Route path="/handwritten-notes" element={<HandwrittenNotes />} />
                    <Route path="/topic-notes" element={<TopicNotes />} />
                    <Route path="/lab-experiments" element={<LabExperiments />} />
                    <Route path="/previous-papers" element={<PreviousPapers />} />
                    <Route path="/portfolio-templates" element={<PortfolioTemplates />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/course/:id" element={<CourseDetails />} />
                    
                    {/* Protected Routes */}
                    <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                        <Dashboard />
                        </ProtectedRoute>
                    } 
                    />
                    <Route 
                    path="/study-space" 
                    element={
                        <ProtectedRoute>
                        <MyStudySpace />
                        </ProtectedRoute>
                    } 
                    />
                    <Route 
                    path="/learn/:id" 
                    element={
                        <ProtectedRoute>
                        <CourseStudy />
                        </ProtectedRoute>
                    } 
                    />

                    {/* Admin Routes */}
                    <Route 
                    path="/admin/dashboard" 
                    element={
                        <ProtectedRoute adminOnly={true}>
                        <AdminPanel />
                        </ProtectedRoute>
                    } 
                    />
                </Routes>
            </Suspense>
            </Layout>
          </FocusProvider>
        </UserProvider>
        </ThemeProvider>
        </Router>
    </HelmetProvider>
  );
}

export default App;
