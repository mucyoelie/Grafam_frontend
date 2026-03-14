import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MessageSquare, Search, Trash2, Users, Calendar, Eye, X, Loader2, Filter } from 'lucide-react';
import { format } from 'date-fns';

const typeColors = {
  announcement: { bg: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500', icon: '📢' },
  reminder: { bg: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500', icon: '🔔' },
  prayer: { bg: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500', icon: '🙏' },
  event: { bg: 'bg-green-100 text-green-700', dot: 'bg-green-500', icon: '📅' },
  general: { bg: 'bg-gray-100 text-gray-700', dot: 'bg-gray-400', icon: '✉️' },
};

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [selected, setSelected] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const fetchMessages = async () => {
    try {
      const params = {};
      if (filterType) params.type = filterType;
      const { data } = await axios.get('/messages', { params });
      setMessages(data.messages || []);
    } catch {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, [filterType]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await axios.delete(`/messages/${id}`);
      toast.success('Message deleted');
      setShowDetail(false);
      fetchMessages();
    } catch {
      toast.error('Delete failed');
    }
  };

  const filtered = messages.filter(m =>
    m.title?.toLowerCase().includes(search.toLowerCase()) ||
    m.content?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">Message History</h1>
          <p className="text-gray-500 mt-1">{messages.length} messages sent</p>
        </div>
        <a href="/dashboard/send-message" className="inline-flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md">
          + New Message
        </a>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200" />
        </div>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 bg-white text-gray-700">
          <option value="">All Types</option>
          {['announcement', 'reminder', 'prayer', 'event', 'general'].map(t => (
            <option key={t} value={t} className="capitalize">{t.charAt(0).toUpperCase() + t.slice(1)}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 font-medium">No messages found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(msg => {
            const t = typeColors[msg.type] || typeColors.general;
            return (
              <div key={msg._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all cursor-pointer" onClick={() => { setSelected(msg); setShowDetail(true); }}>
                <div className="flex items-start gap-4">
                  <div className="text-2xl flex-shrink-0 mt-0.5">{t.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <h3 className="font-display font-bold text-gray-900">{msg.title}</h3>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${t.bg}`}>{msg.type}</span>
                    </div>
                    <p className="text-gray-500 text-sm line-clamp-2">{msg.content}</p>
                    <div className="flex items-center gap-4 mt-2.5 text-xs text-gray-400 flex-wrap">
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{msg.recipientCount} recipients</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{format(new Date(msg.createdAt), 'MMM d, yyyy · h:mm a')}</span>
                      {msg.sentBy && <span>by {msg.sentBy.name}</span>}
                      <span className="text-emerald-500 font-medium">{msg.targetGroup}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={e => { e.stopPropagation(); setSelected(msg); setShowDetail(true); }} className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={e => { e.stopPropagation(); handleDelete(msg._id); }} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {showDetail && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowDetail(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-screen overflow-y-auto">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{(typeColors[selected.type] || typeColors.general).icon}</span>
                <div>
                  <h2 className="font-display font-bold text-xl text-gray-900">{selected.title}</h2>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${(typeColors[selected.type] || typeColors.general).bg}`}>{selected.type}</span>
                </div>
              </div>
              <button onClick={() => setShowDetail(false)} className="p-2 hover:bg-gray-100 rounded-xl"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">{selected.content}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
              <div className="bg-blue-50 rounded-xl p-3">
                <p className="text-blue-500 text-xs font-semibold mb-0.5">Recipients</p>
                <p className="text-blue-900 font-bold text-lg">{selected.recipientCount}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-3">
                <p className="text-green-500 text-xs font-semibold mb-0.5">Target Group</p>
                <p className="text-green-900 font-bold">{selected.targetGroup}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 col-span-2">
                <p className="text-gray-500 text-xs font-semibold mb-0.5">Sent</p>
                <p className="text-gray-800 font-medium">{format(new Date(selected.createdAt), 'MMMM d, yyyy at h:mm a')}</p>
                {selected.sentBy && <p className="text-gray-500 text-xs">by {selected.sentBy.name}</p>}
              </div>
            </div>
            <button onClick={() => handleDelete(selected._id)} className="w-full flex items-center justify-center gap-2 py-2.5 border border-red-200 text-red-500 hover:bg-red-50 rounded-xl text-sm font-semibold transition-all">
              <Trash2 className="w-4 h-4" /> Delete Message
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
