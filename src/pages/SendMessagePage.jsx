import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Send, Users, MessageSquare, Bell, Calendar, Heart, Tag, AlertCircle, Loader2, CheckCircle } from 'lucide-react';

const GROUPS = ['All Members', 'Elders', 'Deacons', 'Sisters', 'Brothers', 'Youth', 'Choir'];
const MESSAGE_TYPES = [
  { value: 'announcement', label: 'Announcement', icon: '📢', color: 'border-blue-400 bg-blue-50' },
  { value: 'reminder', label: 'Reminder', icon: '🔔', color: 'border-amber-400 bg-amber-50' },
  { value: 'prayer', label: 'Prayer Request', icon: '🙏', color: 'border-purple-400 bg-purple-50' },
  { value: 'event', label: 'Event', icon: '📅', color: 'border-green-400 bg-green-50' },
  { value: 'general', label: 'General', icon: '✉️', color: 'border-gray-400 bg-gray-50' },
];

const TEMPLATES = [
  { label: 'Sunday Service Reminder', type: 'reminder', content: 'Dear beloved in Christ, this is a reminder that Sunday Service at Grace Faith Mission (GRAFAM) Soppo begins at 9:00 AM. Location: Street 5, Soppo. Come prepared to worship. God bless you!' },
  { label: 'Prayer Meeting', type: 'reminder', content: 'Beloved, you are invited to our weekly prayer meeting. Let us come together and seek the face of God. Details will be shared. Be present and be blessed!' },
  { label: 'Special Announcement', type: 'announcement', content: 'Attention GRAFAM family! We have an important announcement from the church leadership. Please stay connected for more details. God bless the Grace Faith Mission family!' },
  { label: 'Church Event', type: 'event', content: 'Dear GRAFAM members, we are delighted to invite you to a special church event. Watch out for further details on date, time and venue. Your presence is valued!' },
];

const SendMessagePage = () => {
  const [form, setForm] = useState({ title: '', content: '', type: 'announcement', targetGroup: 'All Members' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [recipientCount, setRecipientCount] = useState(0);
  const [sent, setSent] = useState(false);
  const [lastSent, setLastSent] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const params = { status: 'active' };
        if (form.targetGroup !== 'All Members') params.group = form.targetGroup;
        const { data } = await axios.get('/members', { params });
        setRecipientCount(data.count);
      } catch { setRecipientCount(0); }
    };
    fetchCount();
  }, [form.targetGroup]);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Message title is required';
    if (!form.content.trim()) errs.content = 'Message content is required';
    else if (form.content.trim().length < 10) errs.content = 'Message must be at least 10 characters';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const { data } = await axios.post('/messages/send', form);
      setLastSent(data);
      setSent(true);
      toast.success(`Message sent to ${data.recipientCount} members!`);
      setTimeout(() => { setSent(false); setForm({ title: '', content: '', type: 'announcement', targetGroup: 'All Members' }); }, 4000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const applyTemplate = (tpl) => {
    setForm(p => ({ ...p, title: tpl.label, content: tpl.content, type: tpl.type }));
    setErrors({});
  };

  const charCount = form.content.length;

  if (sent) {
    return (
      <div className="p-6 lg:p-8 max-w-2xl mx-auto flex items-center justify-center min-h-96">
        <div className="text-center animate-fade-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">Message Sent!</h2>
          <p className="text-gray-500 text-lg mb-1">Delivered to <span className="font-bold text-gray-900">{lastSent?.recipientCount}</span> GRAFAM members</p>
          <p className="text-gray-400 text-sm">Redirecting to compose new message...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">Send Message</h1>
        <p className="text-gray-500 mt-1">Compose and send messages to GRAFAM members</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
            {/* Message Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Message Type</label>
              <div className="grid grid-cols-5 gap-2">
                {MESSAGE_TYPES.map(t => (
                  <button key={t.value} type="button" onClick={() => setForm(p => ({ ...p, type: t.value }))}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${form.type === t.value ? t.color + ' border-opacity-100' : 'border-gray-200 hover:border-gray-300'}`}>
                    <span className="text-xl block mb-1">{t.icon}</span>
                    <span className="text-xs font-medium text-gray-700 leading-tight block">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Group */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Send To</label>
              <div className="flex flex-wrap gap-2">
                {GROUPS.map(g => (
                  <button key={g} type="button" onClick={() => setForm(p => ({ ...p, targetGroup: g }))}
                    className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all ${form.targetGroup === g ? 'bg-primary-700 text-white border-primary-700' : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300'}`}>
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message Title *</label>
              <input
                type="text" value={form.title} onChange={e => { setForm(p => ({ ...p, title: e.target.value })); setErrors(p => ({ ...p, title: '' })); }}
                placeholder="e.g. Sunday Service Reminder"
                className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${errors.title ? 'border-red-400 focus:ring-red-200 bg-red-50' : 'border-gray-200 focus:ring-primary-200 focus:border-primary-400'}`}
              />
              {errors.title && <p className="mt-1 text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.title}</p>}
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message Content *</label>
              <textarea
                value={form.content} onChange={e => { setForm(p => ({ ...p, content: e.target.value })); setErrors(p => ({ ...p, content: '' })); }}
                rows={6} placeholder="Type your message to the congregation..."
                className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all resize-none ${errors.content ? 'border-red-400 focus:ring-red-200 bg-red-50' : 'border-gray-200 focus:ring-primary-200 focus:border-primary-400'}`}
              />
              <div className="flex justify-between mt-1">
                {errors.content ? <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.content}</p> : <span />}
                <span className={`text-xs ${charCount > 160 ? 'text-amber-500' : 'text-gray-400'}`}>{charCount} chars {charCount > 160 ? `(${Math.ceil(charCount / 160)} SMS)` : '(1 SMS)'}</span>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-primary-700 hover:bg-primary-800 disabled:bg-primary-400 text-white py-4 rounded-xl font-bold text-base transition-all shadow-lg flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" />Sending...</> : <><Send className="w-5 h-5" />Send to {recipientCount} Members</>}
            </button>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Preview */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-display font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-600" /> Recipients
            </h3>
            <div className="text-center py-4">
              <p className="font-display text-4xl font-bold text-primary-700">{recipientCount}</p>
              <p className="text-gray-500 text-sm mt-1">{form.targetGroup}</p>
              <p className="text-gray-400 text-xs mt-2">active members will receive this message</p>
            </div>
          </div>

          {/* Templates */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-display font-bold text-gray-900 mb-3">Quick Templates</h3>
            <div className="space-y-2">
              {TEMPLATES.map((tpl, i) => (
                <button key={i} onClick={() => applyTemplate(tpl)} className="w-full text-left p-3 rounded-xl border border-gray-100 hover:border-primary-300 hover:bg-primary-50 transition-all group">
                  <p className="text-sm font-semibold text-gray-700 group-hover:text-primary-700">{tpl.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5 capitalize">{tpl.type}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessagePage;
