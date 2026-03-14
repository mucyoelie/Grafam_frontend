import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Shield, Cross, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'secretary' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const passwordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = passwordStrength(form.password);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][strength];
  const strengthColor = ['', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-emerald-500'][strength];

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    else if (form.name.trim().length < 3) errs.name = 'Name must be at least 3 characters';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
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
    try {
      await register({ name: form.name, email: form.email, password: form.password, role: form.role });
      toast.success('Account created! Welcome to GRAFAM!');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ label, name, type = 'text', placeholder, icon: Icon, showToggle, onToggle, show, children }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type={showToggle ? (show ? 'text' : 'password') : type}
          name={name} value={form[name]} onChange={handleChange} placeholder={placeholder}
          className={`w-full pl-11 pr-${showToggle ? '12' : '4'} py-3 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors[name] ? 'border-red-400 focus:ring-red-200 bg-red-50' : 'border-gray-200 focus:ring-primary-200 focus:border-primary-400'}`}
        />
        {showToggle && (
          <button type="button" onClick={onToggle} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {errors[name] && <p className="mt-1.5 text-red-500 text-sm flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors[name]}</p>}
      {children}
    </div>
  );

  return (
    <div className="min-h-screen flex font-body">
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-800 to-primary-600">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-20 right-10 w-56 h-56 bg-gold-500 opacity-10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col justify-center px-14 text-white">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
              <Cross className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-display font-bold text-2xl">GRAFAM</p>
              <p className="text-white/60 text-sm">Soppo Church Portal</p>
            </div>
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight mb-4">
            Join the<br /><span className="text-gold-400">GRAFAM</span><br />Family Portal
          </h2>
          <p className="text-white/70 leading-relaxed">Create your account to access church communication tools and connect with your congregation.</p>
          <div className="mt-10 grid grid-cols-2 gap-3">
            {[{ icon: '✉️', text: 'Send messages' }, { icon: '👥', text: 'Manage members' }, { icon: '🔔', text: 'Set reminders' }, { icon: '📢', text: 'Announcements' }].map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2.5 text-sm text-white/80 border border-white/10">
                <span>{item.icon}</span><span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="flex lg:hidden items-center gap-3 mb-6 justify-center">
            <div className="w-10 h-10 bg-primary-700 rounded-xl flex items-center justify-center">
              <Cross className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-xl text-gray-900">GRAFAM Soppo</span>
          </div>

          <div className="mb-7">
            <h1 className="font-display text-3xl font-bold text-gray-900 mb-1">Create Account</h1>
            <p className="text-gray-500">Register as church staff or administrator</p>
          </div>

          {serverError && (
            <div className="mb-5 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Field label="Full Name" name="name" icon={User} placeholder="Pastor Derick" />
            <Field label="Email Address" name="email" type="email" icon={Mail} placeholder="derick@grafam.org" />

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Role</label>
              <div className="relative">
                <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select name="role" value={form.role} onChange={handleChange} className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition-all appearance-none bg-white">
                  <option value="secretary">Church Secretary</option>
                  <option value="pastor">Pastor</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>

            <Field label="Password" name="password" icon={Lock} showToggle onToggle={() => setShowPassword(!showPassword)} show={showPassword} placeholder="Min. 6 characters">
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">Strength: <span className="font-semibold">{strengthLabel}</span></p>
                </div>
              )}
            </Field>

            <Field label="Confirm Password" name="confirmPassword" icon={Lock} showToggle onToggle={() => setShowConfirm(!showConfirm)} show={showConfirm} placeholder="Repeat password">
              {form.confirmPassword && form.password === form.confirmPassword && (
                <p className="mt-1.5 text-green-600 text-sm flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Passwords match</p>
              )}
            </Field>

            <button
              type="submit" disabled={loading}
              className="w-full bg-primary-700 hover:bg-primary-800 disabled:bg-primary-400 text-white py-3.5 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-2"
            >
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Creating account...</> : 'Create Account'}
            </button>
          </form>

          <p className="mt-5 text-center text-gray-500 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-700 font-semibold hover:underline">Sign in</Link>
          </p>
          <p className="mt-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Grace Faith Mission (GRAFAM) Soppo</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
