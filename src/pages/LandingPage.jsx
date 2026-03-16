import { useNavigate } from 'react-router-dom';
import { Church, MessageSquare, Bell, Users, Shield, ChevronRight, Cross, Star, Mail, Phone, MapPin, Calendar, Quote, BookOpen, Heart, Clock, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    { icon: MessageSquare, title: 'Bulk SMS',           desc: 'Send messages to all church members or specific groups instantly',              color: 'bg-blue-50 text-blue-600'   },
    { icon: Bell,          title: 'Reminders',          desc: 'Schedule service reminders, prayer meetings, and special events',               color: 'bg-amber-50 text-amber-600' },
    { icon: Users,         title: 'Member Management',  desc: 'Manage all 43+ GRAFAM members, their contacts and groups',                      color: 'bg-green-50 text-green-600' },
    { icon: Shield,        title: 'Announcements',      desc: 'Send urgent announcements and important church notices',                        color: 'bg-purple-50 text-purple-600'},
  ];

  const stats = [
    { value: '43+',  label: 'Church Members'    },
    { value: '100%', label: 'Message Delivery'  },
    { value: '7',    label: 'Member Groups'     },
    { value: '24/7', label: 'Access Available'  },
  ];

  const testimonials = [
    {
      name: 'Sister Beatrice N.',
      role: 'Women\'s Ministry Leader',
      initials: 'BN',
      color: 'bg-pink-100 text-pink-700',
      text: 'The GRAFAM portal has completely transformed how we communicate with our women\'s group. Reminders for prayer meetings now reach everyone in seconds.',
    },
    {
      name: 'Elder Samuel T.',
      role: 'Church Elder',
      initials: 'ST',
      color: 'bg-blue-100 text-blue-700',
      text: 'Before this platform, we relied on word-of-mouth for announcements. Now every member is informed instantly. It\'s been a true blessing for our congregation.',
    },
    {
      name: 'Pastor Emmanuel K.',
      role: 'Senior Pastor',
      initials: 'EK',
      color: 'bg-primary-100 text-primary-700',
      text: 'As a pastor, staying connected with 43 members used to be a challenge. This portal has made communication seamless and our congregation more united than ever.',
    },
  ];

  const events = [
    {
      day: '22',
      month: 'Mar',
      title: 'Sunday Worship Service',
      time: '9:00 AM – 12:00 PM',
      location: 'Main Sanctuary, Soppo',
      type: 'Worship',
      typeColor: 'bg-blue-50 text-blue-600',
    },
    {
      day: '26',
      month: 'Mar',
      title: 'Midweek Prayer Meeting',
      time: '6:00 PM – 8:00 PM',
      location: 'Fellowship Hall',
      type: 'Prayer',
      typeColor: 'bg-purple-50 text-purple-600',
    },
    {
      day: '29',
      month: 'Mar',
      title: 'Youth Bible Study',
      time: '4:00 PM – 6:00 PM',
      location: 'Youth Room',
      type: 'Bible Study',
      typeColor: 'bg-green-50 text-green-600',
    },
    {
      day: '05',
      month: 'Apr',
      title: 'Monthly Thanksgiving Service',
      time: '9:00 AM – 1:00 PM',
      location: 'Main Sanctuary, Soppo',
      type: 'Special',
      typeColor: 'bg-amber-50 text-amber-600',
    },
  ];

  const ministries = [
    { icon: '🙏', title: 'Prayer Ministry',    desc: 'Interceding for the church and community every week.',          members: 12 },
    { icon: '🎵', title: 'Worship Team',       desc: 'Leading the congregation in spirit-filled praise and worship.',  members: 8  },
    { icon: '📖', title: 'Bible Study Group',  desc: 'Deep-diving into scripture together every Wednesday.',           members: 15 },
    { icon: '👧', title: 'Youth Ministry',     desc: 'Nurturing and empowering the next generation of believers.',     members: 10 },
    { icon: '👩', title: 'Women\'s Ministry',  desc: 'Empowering women through faith, fellowship and service.',        members: 14 },
    { icon: '🤝', title: 'Outreach Ministry',  desc: 'Serving the wider Soppo community in love and action.',          members: 9  },
  ];

  return (
    <div className="min-h-screen bg-white font-body overflow-x-hidden">

      {/* ── NAVBAR ──────────────────────────────────────────── */}
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

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-800 to-primary-600">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-500 opacity-10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary-400 opacity-20 rounded-full blur-3xl" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-fade-in">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5">
                <p className="font-display text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-white/60 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* ── SCRIPTURE OF THE WEEK ───────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-primary-900 to-primary-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 rounded-full px-4 py-2 text-sm font-semibold mb-6">
            <BookOpen className="w-4 h-4" /> Scripture of the Week
          </div>
          <blockquote className="relative">
            <Quote className="w-12 h-12 text-gold-400/40 mx-auto mb-4" />
            <p className="font-display text-2xl md:text-3xl font-medium text-white leading-relaxed italic mb-6">
              "For where two or three gather in my name, there am I with them."
            </p>
            <cite className="text-gold-400 font-semibold text-lg not-italic">Matthew 18:20</cite>
          </blockquote>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────── */}
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

      {/* ── HOW IT WORKS ────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">Simple & Powerful</h2>
            <p className="text-gray-500 text-lg">Three steps to reach your entire congregation</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Log In Securely',    desc: 'Authorized church staff log in with their credentials to access the portal.' },
              { step: '02', title: 'Compose Message',    desc: 'Write your announcement, reminder, or prayer request. Choose your target group.' },
              { step: '03', title: 'Send to Members',    desc: 'With one click, your message reaches all 43+ GRAFAM members instantly.' },
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

      {/* ── UPCOMING EVENTS ─────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 rounded-full px-4 py-2 text-sm font-semibold mb-4">
              <Calendar className="w-4 h-4" /> Upcoming Events
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What's Coming Up
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Stay informed about services, prayer meetings and special gatherings at GRAFAM Soppo.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100">
                {/* Date header */}
                <div className="bg-primary-700 text-white text-center py-5">
                  <p className="font-display text-4xl font-bold leading-none">{event.day}</p>
                  <p className="text-primary-200 text-sm font-medium uppercase tracking-widest mt-1">{event.month}</p>
                </div>
                {/* Body */}
                <div className="p-5">
                  <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${event.typeColor} mb-3`}>
                    {event.type}
                  </span>
                  <h3 className="font-display font-bold text-gray-900 text-base leading-snug mb-3">
                    {event.title}
                  </h3>
                  <div className="space-y-1.5">
                    <p className="flex items-center gap-2 text-gray-400 text-xs">
                      <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                      {event.time}
                    </p>
                    <p className="flex items-center gap-2 text-gray-400 text-xs">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      {event.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button onClick={() => navigate('/login')} className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:gap-3 transition-all duration-200 hover:text-primary-900">
              View all events in dashboard <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── MINISTRIES ──────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 rounded-full px-4 py-2 text-sm font-semibold mb-4">
              <Heart className="w-4 h-4" /> Our Ministries
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Active Church Groups
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Seven active ministries, each reachable through the GRAFAM portal with one click.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministries.map((m, i) => (
              <div key={i} className="group flex items-start gap-4 p-6 rounded-2xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50/30 transition-all duration-300">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                  {m.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-display font-bold text-gray-900 text-base">{m.title}</h3>
                    <span className="text-xs bg-primary-50 text-primary-600 font-semibold px-2 py-0.5 rounded-full">
                      {m.members} members
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 rounded-full px-4 py-2 text-sm font-semibold mb-4">
              <Star className="w-4 h-4 fill-primary-700" /> Member Testimonials
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Members Say
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Hear from GRAFAM Soppo members about how the portal has transformed church communication.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-gold-500 fill-gold-500" />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
                {/* Author */}
                <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                  <div className={`w-11 h-11 rounded-full ${t.color} flex items-center justify-center font-display font-bold text-sm flex-shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-display font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
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

      {/* ── FOOTER ──────────────────────────────────────────── */}
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
              <p className="text-sm leading-relaxed">
                Grace Faith Mission — bringing believers together through the power of communication.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigate('/login')}    className="hover:text-white transition-colors">Login</button></li>
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
