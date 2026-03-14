import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import DashboardLayout from './components/DashboardLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import MembersPage from './pages/MembersPage';
import SendMessagePage from './pages/SendMessagePage';
import MessagesPage from './pages/MessagesPage';
import RemindersPage from './pages/RemindersPage';
import WhatsAppSenderPage from './pages/WhatsAppSenderPage';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-700 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500 font-medium">Loading GRAFAM...</p>
      </div>
    </div>
  );
  return user ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/dashboard" replace /> : children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/members" element={<ProtectedRoute><DashboardLayout><MembersPage /></DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/send-message" element={<ProtectedRoute><DashboardLayout><SendMessagePage /></DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/messages" element={<ProtectedRoute><DashboardLayout><MessagesPage /></DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/reminders" element={<ProtectedRoute><DashboardLayout><RemindersPage /></DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/whatsapp" element={<ProtectedRoute><DashboardLayout><WhatsAppSenderPage /></DashboardLayout></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: { borderRadius: '12px', fontFamily: 'Lato, sans-serif', fontSize: '14px', fontWeight: '500' },
            success: { iconTheme: { primary: '#1a34f5', secondary: 'white' } },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
