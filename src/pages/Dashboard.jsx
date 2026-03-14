import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, MessageSquare, Send, Bell, TrendingUp, Clock, CheckCircle, Cross } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';

const StatCard = ({ icon: Icon, label, value, sub, color, bg }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
        <p className="text-3xl font-display font-bold text-gray-900">{value ?? '—'}</p>
        {sub && <p className="text-sm text-gray-400 mt-1">{sub}</p>}
      </div>
      <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [memberStats, setMemberStats] = useState(null);
  const [messageStats, setMessageStats] = useState(null);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [mRes, msgRes, rRes] = await Promise.all([
          axios.get('/members/stats/overview'),
          axios.get('/messages/stats/overview'),
          axios.get('/messages?limit=5'),
        ]);
        setMemberStats(mRes.data.stats);
        setMessageStats(msgRes.data.stats);
        setRecentMessages(rRes.data.messages || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const typeColors = {
    announcement: 'bg-blue-100 text-blue-700',
    reminder: 'bg-amber-100 text-amber-700',
    prayer: 'bg-purple-100 text-purple-700',
    event: 'bg-green-100 text-green-700',
    general: 'bg-gray-100 text-gray-700',
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">✝️</span>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">
            {greeting}, {user?.name?.split(' ')[0]}!
          </h1>
        </div>
        <p className="text-gray-500 ml-10">Welcome to the GRAFAM Soppo Church Communication Portal</p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1,2,3,4].map(i => <div key={i} className="bg-white rounded-2xl h-32 skeleton" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Users} label="Total Members" value={memberStats?.total} sub={`${memberStats?.active} active`} color="text-blue-600" bg="bg-blue-50" />
          <StatCard icon={MessageSquare} label="Messages Sent" value={messageStats?.total} sub="All time" color="text-green-600" bg="bg-green-50" />
          <StatCard icon={CheckCircle} label="Active Members" value={memberStats?.active} sub="Receiving messages" color="text-emerald-600" bg="bg-emerald-50" />
          <StatCard icon={TrendingUp} label="Reach Rate" value="100%" sub="Delivery success" color="text-purple-600" bg="bg-purple-50" />
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Messages */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-display font-bold text-gray-900 text-lg">Recent Messages</h2>
            <a href="/dashboard/messages" className="text-primary-600 text-sm font-medium hover:underline">View all</a>
          </div>
          <div className="divide-y divide-gray-50">
            {loading ? (
              [1,2,3].map(i => <div key={i} className="p-4 h-16 skeleton mx-4 my-2 rounded-xl" />)
            ) : recentMessages.length === 0 ? (
              <div className="p-12 text-center">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400 font-medium">No messages yet</p>
                <p className="text-gray-300 text-sm">Send your first message to the congregation</p>
              </div>
            ) : recentMessages.map((msg) => (
              <div key={msg._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900 text-sm truncate">{msg.title}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${typeColors[msg.type] || typeColors.general}`}>
                        {msg.type}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs truncate">{msg.content}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{msg.recipientCount} recipients</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{format(new Date(msg.createdAt), 'MMM d, h:mm a')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions + Member Groups */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary-900 to-primary-700 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Send className="w-5 h-5 text-gold-400" />
              <h3 className="font-display font-bold text-lg">Quick Send</h3>
            </div>
            <p className="text-white/70 text-sm mb-5">Reach all {memberStats?.active || 43} active members instantly</p>
            <a href="/dashboard/whatsapp" className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl text-center text-sm transition-all shadow-lg flex items-center justify-center gap-2 mb-2">
              <span>📱</span> WhatsApp All Members
            </a>
            <a href="/dashboard/send-message" className="block w-full bg-gold-500 hover:bg-gold-400 text-gray-900 font-bold py-3 px-4 rounded-xl text-center text-sm transition-all shadow-lg">
              Compose SMS Message
            </a>
            <a href="/dashboard/members" className="block w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-xl text-center text-sm transition-all mt-2 border border-white/20">
              Manage Members
            </a>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-display font-bold text-gray-900 mb-4">Member Groups</h3>
            {loading ? (
              <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="h-8 skeleton rounded-lg" />)}</div>
            ) : (
              <div className="space-y-2">
                {(memberStats?.byGroup || []).map(({ _id, count }) => (
                  <div key={_id} className="flex items-center justify-between py-2">
                    <span className="text-gray-600 text-sm">{_id}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${(count / (memberStats?.total || 1)) * 100}%` }} />
                      </div>
                      <span className="text-gray-900 text-sm font-bold w-6 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
