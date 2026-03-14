import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, MessageSquare, Bell, Send, LogOut, Menu, X, Cross, ChevronDown, User, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/dashboard',                  icon: LayoutDashboard, label: 'Dashboard',       end: true },
  { to: '/dashboard/members',          icon: Users,           label: 'Members'                    },
  { to: '/dashboard/send-message',     icon: Send,            label: 'Send Message'               },
  { to: '/dashboard/whatsapp',         icon: MessageCircle,   label: 'WhatsApp Sender',  badge: 'NEW' },
  { to: '/dashboard/messages',         icon: MessageSquare,   label: 'Message History'            },
  { to: '/dashboard/reminders',        icon: Bell,            label: 'Reminders'                  },
];

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-primary-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center border border-white/30">
            <Cross className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-display font-bold text-white text-base leading-tight">GRAFAM</p>
            <p className="text-primary-300 text-xs">Soppo Church Portal</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label, end, badge }) => (
          <NavLink
            key={to} to={to} end={end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-white text-primary-800 shadow-md' : 'text-primary-100 hover:bg-white/10 hover:text-white'}`
            }
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="flex-1">{label}</span>
            {badge && (
              <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full font-bold leading-none">
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-primary-800">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 cursor-pointer" onClick={() => setUserMenuOpen(!userMenuOpen)}>
          <div className="w-9 h-9 bg-gold-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-gray-900 font-bold text-sm">{user?.name?.charAt(0).toUpperCase()}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate">{user?.name}</p>
            <p className="text-primary-300 text-xs capitalize">{user?.role}</p>
          </div>
          <ChevronDown className="w-4 h-4 text-primary-300" />
        </div>
        {userMenuOpen && (
          <div className="mt-2 space-y-1">
            <button onClick={() => { navigate('/dashboard/profile'); setUserMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-primary-100 hover:bg-white/10 text-sm">
              <User className="w-4 h-4" /> Profile
            </button>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-300 hover:bg-red-500/20 text-sm">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 font-body overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-gradient-to-b from-primary-900 to-primary-800 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-b from-primary-900 to-primary-800 z-10">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700 p-1">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex-1 lg:flex-none">
            <p className="text-gray-900 font-display font-bold hidden lg:block text-lg">Grace Faith Mission</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-700 text-xs font-medium">Online</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-xl px-3 py-2">
              <div className="w-8 h-8 bg-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">{user?.name?.charAt(0).toUpperCase()}</span>
              </div>
              <span className="text-gray-700 text-sm font-medium hidden sm:block">{user?.name}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
