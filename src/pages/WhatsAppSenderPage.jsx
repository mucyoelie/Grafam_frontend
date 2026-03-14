import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import {
  Search, CheckSquare, Square, Send, Users, Filter,
  MessageCircle, ChevronDown, X, Loader2, CheckCircle2, RefreshCw
} from 'lucide-react';

const CHURCH_MEMBERS = [
  { id: 1,  name: 'Elder Serge',      phone: '679931488', group: 'Elders'   },
  { id: 2,  name: 'Sis Abigail',      phone: '671112872', group: 'Sisters'  },
  { id: 3,  name: 'Ma Hannah',        phone: '652650207', group: 'Others'   },
  { id: 4,  name: 'Sis Nerisa',       phone: '650471261', group: 'Sisters'  },
  { id: 5,  name: 'Ma Grace',         phone: '677171512', group: 'Others'   },
  { id: 6,  name: 'Ma Marbel',        phone: '678693303', group: 'Others'   },
  { id: 7,  name: 'Ma Pamela',        phone: '651713152', group: 'Others'   },
  { id: 8,  name: 'Sis Junabelle',    phone: '670335435', group: 'Sisters'  },
  { id: 9,  name: 'Br Ashu',          phone: '673753450', group: 'Brothers' },
  { id: 10, name: 'Dec. Felicity',    phone: '676344500', group: 'Deacons'  },
  { id: 11, name: 'Sis Dimobel',      phone: '673886641', group: 'Sisters'  },
  { id: 12, name: 'Sis Rita',         phone: '653713000', group: 'Sisters'  },
  { id: 13, name: 'Br Miracle',       phone: '683165760', group: 'Brothers' },
  { id: 14, name: 'Br Ronaldo',       phone: '653677617', group: 'Brothers' },
  { id: 15, name: 'Sis Rose',         phone: '680054696', group: 'Sisters'  },
  { id: 16, name: 'Sis Emerencia',    phone: '679793707', group: 'Sisters'  },
  { id: 17, name: 'Sis Vanessa',      phone: '672476782', group: 'Sisters'  },
  { id: 18, name: 'Br Teriel',        phone: '673356549', group: 'Brothers' },
  { id: 19, name: 'Br Ramson',        phone: '653417366', group: 'Brothers' },
  { id: 20, name: 'Br Brandy',        phone: '682396514', group: 'Brothers' },
  { id: 21, name: 'Sis Franka',       phone: '650359501', group: 'Sisters'  },
  { id: 22, name: 'Br Shama',         phone: '682108398', group: 'Brothers' },
  { id: 23, name: 'Ma Vivian',        phone: '681023135', group: 'Others'   },
  { id: 24, name: 'Ma Doris',         phone: '674225248', group: 'Others'   },
  { id: 25, name: 'Br Caleb',         phone: '676741870', group: 'Youth'    },
  { id: 26, name: 'Yvette',           phone: '678952652', group: 'Youth'    },
  { id: 27, name: 'Sis Mary',         phone: '650415624', group: 'Sisters'  },
  { id: 28, name: 'Br Inocent',       phone: '653013579', group: 'Brothers' },
  { id: 29, name: 'Sis Elizabeth',    phone: '671659072', group: 'Sisters'  },
  { id: 30, name: 'Mummy Syvian',     phone: '650935046', group: 'Others'   },
  { id: 31, name: 'Pastor Derick',    phone: '672723842', group: 'Leaders'  },
  { id: 32, name: 'Sis Favour W',     phone: '679559084', group: 'Sisters'  },
  { id: 33, name: 'Sis Confidence',   phone: '652156589', group: 'Sisters'  },
  { id: 34, name: 'Sis Esther',       phone: '670933143', group: 'Sisters'  },
  { id: 35, name: 'Sis Faith',        phone: '671606715', group: 'Sisters'  },
  { id: 36, name: 'Br Abenego',       phone: '679769999', group: 'Brothers' },
  { id: 37, name: 'Sis Hilda',        phone: '688559753', group: 'Sisters'  },
  { id: 38, name: 'Sis Minet',        phone: '679983224', group: 'Sisters'  },
  { id: 39, name: 'Sis Shanis',       phone: '675034033', group: 'Choir'    },
  { id: 40, name: 'Sis Linda',        phone: '651059252', group: 'Sisters'  },
  { id: 41, name: 'Sis Paoula',       phone: '650136288', group: 'Sisters'  },
  { id: 42, name: 'Br Bless',         phone: '671063339', group: 'Brothers' },
  { id: 43, name: 'Br Christian',     phone: '652070823', group: 'Brothers' },
];

const GROUPS = ['All', 'Leaders', 'Elders', 'Deacons', 'Brothers', 'Sisters', 'Youth', 'Choir', 'Others'];

const TEMPLATES = [
  {
    label: '📅 Sunday Service',
    text: 'Dear GRAFAM family, greetings in the Lord! 🙏\n\nThis is a reminder that Sunday Service at *Grace Faith Mission (GRAFAM) Soppo* begins at *9:00 AM*.\n\n📍 Location: Street 5, Soppo\n\nCome prepared to worship. God bless you! ✝️',
  },
  {
    label: '🙏 Prayer Meeting',
    text: 'Beloved GRAFAM family,\n\nYou are warmly invited to our *Prayer Meeting*.\n\n_Let us come together and seek the face of God._\n\nFurther details will be shared. Be present and be blessed! 🙏✝️\n\n— Grace Faith Mission, Soppo',
  },
  {
    label: '📢 General Announcement',
    text: 'Attention *GRAFAM Family*! 📢\n\nThis is an important announcement from the leadership of *Grace Faith Mission, Soppo*.\n\nPlease stay connected for more details.\n\nGod bless the GRAFAM family! ✝️',
  },
  {
    label: '📖 Bible Study',
    text: 'Dear GRAFAM members,\n\n*Bible Study* this week is on! 📖\n\nCome with your Bibles and a heart ready to receive the Word of God.\n\n_"Thy word is a lamp unto my feet, and a light unto my path."_ — Psalm 119:105\n\nGod bless you! — GRAFAM Soppo ✝️',
  },
];

const AVATAR_COLORS = [
  'bg-blue-100 text-blue-700', 'bg-purple-100 text-purple-700',
  'bg-green-100 text-green-700', 'bg-amber-100 text-amber-700',
  'bg-pink-100 text-pink-700',  'bg-teal-100 text-teal-700',
  'bg-indigo-100 text-indigo-700', 'bg-rose-100 text-rose-700',
];

const formatPhone = (p) => '237' + p.trim();
const getWaLink  = (phone, msg) => `https://wa.me/${formatPhone(phone)}?text=${encodeURIComponent(msg)}`;
const initials   = (name) => name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

export default function WhatsAppSenderPage() {
  const [message, setMessage]     = useState('');
  const [selected, setSelected]   = useState(new Set(CHURCH_MEMBERS.map(m => m.id)));
  const [sentSet, setSentSet]     = useState(new Set());
  const [search, setSearch]       = useState('');
  const [group, setGroup]         = useState('All');
  const [sending, setSending]     = useState(false);
  const [progress, setProgress]   = useState(0);
  const [showTemplates, setShowTemplates] = useState(false);
  const abortRef = useRef(false);

  const filtered = CHURCH_MEMBERS.filter(m => {
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.phone.includes(search);
    const matchGroup  = group === 'All' || m.group === group;
    return matchSearch && matchGroup;
  });

  const allFilteredSelected = filtered.every(m => selected.has(m.id));

  const toggle = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll  = () => setSelected(new Set(CHURCH_MEMBERS.map(m => m.id)));
  const selectNone = () => setSelected(new Set());
  const toggleFiltered = () => {
    setSelected(prev => {
      const next = new Set(prev);
      if (allFilteredSelected) filtered.forEach(m => next.delete(m.id));
      else filtered.forEach(m => next.add(m.id));
      return next;
    });
  };

  const markSent = (id) => setSentSet(prev => new Set([...prev, id]));
  const resetSent = () => { setSentSet(new Set()); setProgress(0); };

  const openSingle = (member) => {
    if (!message.trim()) { toast.error('Please type a message first'); return; }
    window.open(getWaLink(member.phone, message), '_blank');
    markSent(member.id);
    toast.success(`WhatsApp opened for ${member.name}`);
  };

  const sendAll = async () => {
    if (!message.trim()) { toast.error('Please compose a message first'); return; }
    const targets = CHURCH_MEMBERS.filter(m => selected.has(m.id));
    if (!targets.length) { toast.error('No members selected'); return; }
    if (!window.confirm(`This will open ${targets.length} WhatsApp windows one by one.\n\nMake sure pop-ups are allowed in your browser.\n\nContinue?`)) return;

    setSending(true);
    abortRef.current = false;
    setProgress(0);

    for (let i = 0; i < targets.length; i++) {
      if (abortRef.current) break;
      window.open(getWaLink(targets[i].phone, message), '_blank');
      markSent(targets[i].id);
      setProgress(Math.round(((i + 1) / targets.length) * 100));
      await new Promise(r => setTimeout(r, 1300));
    }

    setSending(false);
    if (!abortRef.current) {
      toast.success(`✅ All ${targets.length} WhatsApp chats opened!`);
    }
  };

  const stopSending = () => {
    abortRef.current = true;
    setSending(false);
    toast('Stopped sending', { icon: '⏹️' });
  };

  const applyTemplate = (tpl) => {
    setMessage(tpl.text);
    setShowTemplates(false);
    toast.success('Template applied');
  };

  const selectedCount = selected.size;
  const sentCount     = sentSet.size;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto font-body">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-green-600" />
          </div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">WhatsApp Bulk Sender</h1>
        </div>
        <p className="text-gray-500 ml-13 pl-0.5">Send announcements to GRAFAM members via WhatsApp</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Members', value: CHURCH_MEMBERS.length, color: 'text-primary-700', bg: 'bg-primary-50' },
          { label: 'Selected',      value: selectedCount,          color: 'text-blue-700',    bg: 'bg-blue-50'    },
          { label: 'Sent',          value: sentCount,              color: 'text-green-700',   bg: 'bg-green-50'   },
          { label: 'Remaining',     value: selectedCount - sentCount < 0 ? 0 : selectedCount - sentCount, color: 'text-amber-700', bg: 'bg-amber-50' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`${bg} rounded-2xl p-4 border border-white`}>
            <p className={`font-display text-3xl font-bold ${color}`}>{value}</p>
            <p className="text-gray-500 text-xs mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Compose panel */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-bold text-gray-900">Compose Message</h2>
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="flex items-center gap-1.5 text-sm text-primary-600 font-semibold hover:underline"
              >
                Templates <ChevronDown className={`w-4 h-4 transition-transform ${showTemplates ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {showTemplates && (
              <div className="mb-4 space-y-2 border border-gray-100 rounded-xl p-3 bg-gray-50">
                {TEMPLATES.map((tpl, i) => (
                  <button
                    key={i}
                    onClick={() => applyTemplate(tpl)}
                    className="w-full text-left px-3 py-2.5 rounded-xl bg-white border border-gray-100 hover:border-green-300 hover:bg-green-50 transition-all text-sm font-medium text-gray-700"
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>
            )}

            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type your announcement here…&#10;&#10;Tip: Use *bold*, _italic_ for WhatsApp formatting"
              rows={9}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 resize-none transition-all placeholder-gray-400"
            />
            <div className="flex justify-between items-center mt-1.5">
              <span className="text-xs text-gray-400">*bold* _italic_ ~strikethrough~</span>
              <span className={`text-xs font-medium ${message.length > 800 ? 'text-red-500' : 'text-gray-400'}`}>
                {message.length} chars
              </span>
            </div>

            {/* Progress bar */}
            {(sending || progress > 0) && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{sending ? 'Sending…' : 'Done'}</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-4 space-y-2">
              {sending ? (
                <button
                  onClick={stopSending}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 font-bold text-sm hover:bg-red-100 transition-all"
                >
                  <X className="w-4 h-4" /> Stop Sending
                </button>
              ) : (
                <button
                  onClick={sendAll}
                  disabled={!message.trim() || selectedCount === 0}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-green-500 hover:bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold text-sm transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  Send to {selectedCount} Members via WhatsApp
                </button>
              )}
              <button
                onClick={resetSent}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset sent status
              </button>
            </div>

            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-amber-800 text-xs font-semibold mb-1">⚠️ Allow pop-ups</p>
              <p className="text-amber-700 text-xs leading-relaxed">
                Your browser must allow pop-ups from this site. Each window opens WhatsApp Web with the message pre-filled — just tap <strong>Send</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Members panel */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Toolbar */}
            <div className="px-5 py-4 border-b border-gray-100 space-y-3">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text" value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search name or number…"
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400"
                  />
                  {search && (
                    <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <button onClick={selectAll}  className="text-xs px-3 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 font-medium whitespace-nowrap">All</button>
                <button onClick={selectNone} className="text-xs px-3 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 font-medium whitespace-nowrap">None</button>
              </div>

              {/* Group filter */}
              <div className="flex gap-1.5 flex-wrap">
                {GROUPS.map(g => (
                  <button
                    key={g}
                    onClick={() => setGroup(g)}
                    className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${group === g ? 'bg-green-500 text-white border-green-500' : 'border-gray-200 text-gray-600 hover:border-green-300'}`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-semibold text-gray-900">{filtered.length}</span> members
                </p>
                <button onClick={toggleFiltered} className="text-xs text-primary-600 font-semibold hover:underline flex items-center gap-1">
                  {allFilteredSelected ? <Square className="w-3.5 h-3.5" /> : <CheckSquare className="w-3.5 h-3.5" />}
                  {allFilteredSelected ? 'Deselect shown' : 'Select shown'}
                </button>
              </div>
            </div>

            {/* Member list */}
            <div className="divide-y divide-gray-50 max-h-[520px] overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="p-12 text-center">
                  <Users className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">No members match your search</p>
                </div>
              ) : (
                filtered.map((member, idx) => {
                  const isSel  = selected.has(member.id);
                  const isSent = sentSet.has(member.id);
                  const color  = AVATAR_COLORS[idx % AVATAR_COLORS.length];

                  return (
                    <div
                      key={member.id}
                      onClick={() => toggle(member.id)}
                      className={`flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors hover:bg-gray-50 ${isSel ? 'bg-green-50/40' : ''}`}
                    >
                      {/* Checkbox */}
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSel ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                        {isSel && <span className="text-white text-xs font-bold">✓</span>}
                      </div>

                      {/* Avatar */}
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${color}`}>
                        {initials(member.name)}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-gray-900 truncate">{member.name}</p>
                          {isSent && (
                            <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                              <CheckCircle2 className="w-3 h-3" /> Sent
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">+237 {member.phone} · {member.group}</p>
                      </div>

                      {/* WhatsApp button */}
                      <button
                        onClick={e => { e.stopPropagation(); openSingle(member); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded-xl transition-all flex-shrink-0 shadow-sm"
                        title="Open WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Send
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer summary */}
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                <span className="font-semibold text-green-600">{sentCount}</span> / {CHURCH_MEMBERS.length} messages opened
              </p>
              <div className="flex items-center gap-1.5">
                <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${(sentCount / CHURCH_MEMBERS.length) * 100}%` }} />
                </div>
                <span className="text-xs text-gray-500">{Math.round((sentCount / CHURCH_MEMBERS.length) * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
