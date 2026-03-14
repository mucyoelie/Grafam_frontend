import { useState } from 'react';
import toast from 'react-hot-toast';
import { Bell, Clock, Plus, X, Calendar, AlertCircle, Trash2 } from 'lucide-react';

const REMINDER_TYPES = ['Service', 'Prayer Meeting', 'Bible Study', 'Youth Meeting', 'Choir Practice', 'Special Event'];

const defaultReminders = [
  { id: 1, title: 'Sunday Morning Service', time: '08:00', day: 'Sunday', type: 'Service', active: true, message: 'Dear GRAFAM family, Sunday Service starts at 9:00AM. Location: Street 5, Soppo. God bless you!' },
  { id: 2, title: 'Weekly Prayer Meeting', time: '18:00', day: 'Wednesday', type: 'Prayer Meeting', active: true, message: 'GRAFAM prayer warriors! Wednesday evening prayer meeting begins at 6PM. Come and pray!' },
  { id: 3, title: 'Bible Study', time: '17:00', day: 'Friday', type: 'Bible Study', active: false, message: 'GRAFAM Bible Study night begins at 5PM this Friday. Bring your Bibles!' },
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const RemindersPage = () => {
  const [reminders, setReminders] = useState(defaultReminders);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', time: '09:00', day: 'Sunday', type: 'Service', message: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title required';
    if (!form.message.trim()) errs.message = 'Message required';
    return errs;
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setReminders(prev => [...prev, { ...form, id: Date.now(), active: true }]);
    toast.success('Reminder created!');
    setShowModal(false);
    setForm({ title: '', time: '09:00', day: 'Sunday', type: 'Service', message: '' });
    setErrors({});
  };

  const toggleActive = (id) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
    toast.success('Reminder updated');
  };

  const deleteReminder = (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    setReminders(prev => prev.filter(r => r.id !== id));
    toast.success('Reminder deleted');
  };

  const dayColors = { Sunday: 'text-red-600 bg-red-50', Saturday: 'text-blue-600 bg-blue-50' };

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">Reminders</h1>
          <p className="text-gray-500 mt-1">Schedule automatic reminders for church activities</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md">
          <Plus className="w-4 h-4" /> New Reminder
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
        <Bell className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-amber-800 font-semibold text-sm">Scheduled Reminders</p>
          <p className="text-amber-700 text-sm">These reminders will automatically send messages to members on the configured day and time. Connect an SMS gateway to enable automatic sending.</p>
        </div>
      </div>

      {/* Reminders List */}
      <div className="space-y-4">
        {reminders.map(r => (
          <div key={r.id} className={`bg-white rounded-2xl shadow-sm border transition-all ${r.active ? 'border-gray-100 hover:shadow-md' : 'border-gray-100 opacity-60'}`}>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${r.active ? 'bg-primary-100' : 'bg-gray-100'}`}>
                    <Bell className={`w-6 h-6 ${r.active ? 'text-primary-700' : 'text-gray-400'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-display font-bold text-gray-900">{r.title}</h3>
                      <span className="bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded-full font-medium">{r.type}</span>
                      {!r.active && <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">Paused</span>}
                    </div>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-2">{r.message}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className={`flex items-center gap-1 font-medium ${dayColors[r.day] ? dayColors[r.day].split(' ')[0] : 'text-gray-600'}`}>
                        <Calendar className="w-3.5 h-3.5" /> {r.day}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {r.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleActive(r.id)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${r.active ? 'bg-primary-600' : 'bg-gray-300'}`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${r.active ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                  <button onClick={() => deleteReminder(r.id, r.title)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {reminders.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">No reminders set</p>
            <button onClick={() => setShowModal(true)} className="mt-4 text-primary-600 font-semibold text-sm hover:underline">Create your first reminder</button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-xl text-gray-900">New Reminder</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-xl"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title *</label>
                <input type="text" value={form.title} onChange={e => { setForm(p => ({ ...p, title: e.target.value })); setErrors(p => ({ ...p, title: '' })); }}
                  placeholder="e.g. Sunday Service Reminder"
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${errors.title ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-primary-200 focus:border-primary-400'}`} />
                {errors.title && <p className="mt-1 text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.title}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Day</label>
                  <select value={form.day} onChange={e => setForm(p => ({ ...p, day: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 bg-white">
                    {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Time</label>
                  <input type="time" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Type</label>
                <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 bg-white">
                  {REMINDER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message *</label>
                <textarea value={form.message} onChange={e => { setForm(p => ({ ...p, message: e.target.value })); setErrors(p => ({ ...p, message: '' })); }}
                  rows={3} placeholder="Message to send to members..."
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 resize-none transition-all ${errors.message ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-primary-200 focus:border-primary-400'}`} />
                {errors.message && <p className="mt-1 text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all">Cancel</button>
                <button type="submit" className="flex-1 bg-primary-700 hover:bg-primary-800 text-white py-3 rounded-xl font-bold text-sm transition-all">Create Reminder</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemindersPage;
