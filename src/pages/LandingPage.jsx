import { useNavigate } from 'react-router-dom';
import { Church, MessageSquare, Bell, Users, Shield, ChevronRight, Cross, Star, Mail, Phone, MapPin } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    { icon: MessageSquare, title: 'Bulk SMS', desc: 'Send messages to all church members or specific groups instantly', color: 'bg-blue-50 text-blue-600' },
    { icon: Bell, title: 'Reminders', desc: 'Schedule service reminders, prayer meetings, and special events', color: 'bg-amber-50 text-amber-600' },
    { icon: Users, title: 'Member Management', desc: 'Manage all 43+ GRAFAM members, their contacts and groups', color: 'bg-green-50 text-green-600' },
    { icon: Shield, title: 'Announcements', desc: 'Send urgent announcements and important church notices', color: 'bg-purple-50 text-purple-600' },
  ];

  const stats = [
    { value: '43+', label: 'Church Members' },
    { value: '100%', label: 'Message Delivery' },
    { value: '7', label: 'Member Groups' },
    { value: '24/7', label: 'Access Available' },
  ];

  return (
    <div className="min-h-screen bg-white font-body overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-700 rounded-xl flex items-center justify-center shadow-lg">
              <Cross className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-display font-bold text-gray-900 text-lg leading-tight">GRAFAM</p>
              <p className="text-xs text-gray-500 leading-tight">Soppo Church Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/login')} className="text-gray-600 hover:text-primary-700 font-medium px-4 py-2 rounded-lg hover:bg-primary-50 transition-all text-sm">
              Sign In
            </button>
            <button onClick={() => navigate('/register')} className="bg-primary-700 text-white px-5 py-2 rounded-xl font-semibold hover:bg-primary-800 transition-all shadow-md hover:shadow-lg text-sm">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-800 to-primary-600">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        {/* Decorative blobs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-500 opacity-10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary-400 opacity-20 rounded-full blur-3xl" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8 animate-fade-in">
            <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
            <span className="text-white/90 text-sm font-medium">Grace Faith Mission — Soppo, Location Street 5</span>
            <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6 animate-slide-up">
            Grace Faith
            <span className="block text-gold-400">Mission</span>
            <span className="block text-3xl md:text-4xl font-normal text-white/80 mt-2">GRAFAM Soppo</span>
          </h1>

          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in">
            Stay connected with your church family. Send announcements, reminders, and messages to all members — anytime, anywhere.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <button onClick={() => navigate('/login')} className="group bg-white text-primary-800 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all shadow-2xl flex items-center justify-center gap-2">
              Access Dashboard
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => navigate('/register')} className="border-2 border-white/40 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
              Create Account
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-fade-in">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5">
                <p className="font-display text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-white/60 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 rounded-full px-4 py-2 text-sm font-semibold mb-4">
              <Church className="w-4 h-4" /> Church Communication Platform
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything Your Church Needs
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A complete communication hub designed specifically for GRAFAM Soppo to keep every member connected and informed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100">
                <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center mb-4`}>
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">Simple & Powerful</h2>
            <p className="text-gray-500 text-lg">Three steps to reach your entire congregation</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Log In Securely', desc: 'Authorized church staff log in with their credentials to access the portal.' },
              { step: '02', title: 'Compose Message', desc: 'Write your announcement, reminder, or prayer request. Choose your target group.' },
              { step: '03', title: 'Send to Members', desc: 'With one click, your message reaches all 43+ GRAFAM members instantly.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-display font-bold text-xl">{item.step}</span>
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary-900 to-primary-700">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Connect Your <span className="text-gold-400">Congregation?</span>
          </h2>
          <p className="text-white/70 text-lg mb-10">
            Join GRAFAM's digital communication platform and never miss an important announcement again.
          </p>
          <button onClick={() => navigate('/login')} className="bg-gold-500 hover:bg-gold-400 text-gray-900 px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-2xl inline-flex items-center gap-2">
            Enter Church Portal <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-primary-700 rounded-lg flex items-center justify-center">
                  <Cross className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
                <span className="font-display font-bold text-white text-lg">GRAFAM Soppo</span>
              </div>
              <p className="text-sm leading-relaxed">Grace Faith Mission — bringing believers together through the power of communication.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigate('/login')} className="hover:text-white transition-colors">Login</button></li>
                <li><button onClick={() => navigate('/register')} className="hover:text-white transition-colors">Register</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Contact</h4>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary-400" /> Location Street 5, Soppo</p>
                <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary-400" /> +237 6XX XXX XXX</p>
                <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary-400" /> info@grafamsoppo.org</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-sm">
            <p>© {new Date().getFullYear()} Grace Faith Mission (GRAFAM) Soppo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
