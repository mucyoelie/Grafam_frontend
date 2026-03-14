import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Cross, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setServerError('');
    try {
      await login(form.email, form.password);
      toast.success('Welcome back to GRAFAM!');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please try again.';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-body">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-800 to-primary-600">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-20 right-20 w-64 h-64 bg-gold-500 opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary-400 opacity-20 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
              <Cross className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-display font-bold text-2xl">GRAFAM</p>
              <p className="text-white/60 text-sm">Soppo Church Portal</p>
            </div>
          </div>
          <h2 className="font-display text-5xl font-bold leading-tight mb-6">
            Welcome<br />
            <span className="text-gold-400">Back,</span><br />
            Faithful One.
          </h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-sm">
            Sign in to manage communications for Grace Faith Mission and stay connected with your church family.
          </p>
          <div className="mt-12 space-y-4">
            {['Send bulk announcements', 'Manage 43+ members', 'Schedule reminders'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-white/80">
                <div className="w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-gray-900 font-bold">✓</span>
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 bg-primary-700 rounded-xl flex items-center justify-center">
              <Cross className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-xl text-gray-900">GRAFAM Soppo</span>
          </div>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
            <p className="text-gray-500">Access your church administration portal</p>
          </div>

          {serverError && (
            <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="pastor@grafam.org"
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-400 focus:ring-red-200 bg-red-50' : 'border-gray-200 focus:ring-primary-200 focus:border-primary-400'}`}
                />
              </div>
              {errors.email && <p className="mt-1.5 text-red-500 text-sm flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-12 py-3 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors.password ? 'border-red-400 focus:ring-red-200 bg-red-50' : 'border-gray-200 focus:ring-primary-200 focus:border-primary-400'}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-red-500 text-sm flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.password}</p>}
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full bg-primary-700 hover:bg-primary-800 disabled:bg-primary-400 text-white py-3.5 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Signing in...</> : 'Sign In to Portal'}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-500 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-700 font-semibold hover:underline">Create one</Link>
          </p>

          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-amber-800 text-xs font-semibold mb-1">Demo Credentials</p>
            <p className="text-amber-700 text-xs">Email: admin@grafam.org | Password: grafam2024</p>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Grace Faith Mission (GRAFAM) Soppo
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
