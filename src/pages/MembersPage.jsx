import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Users, Plus, Search, Edit2, Trash2, X, Phone, Loader2, AlertCircle, Download } from 'lucide-react';

const GROUPS = ['All Members', 'Elders', 'Deacons', 'Sisters', 'Brothers', 'Youth', 'Choir'];
const defaultForm = { name: '', phone: '', email: '', group: 'All Members', status: 'active', notes: '' };

const CHURCH_MEMBERS = [
  { name: 'Elder Serge', phone: '679931488' }, { name: 'Sis Abigail', phone: '671112872' },
  { name: 'Ma Hannah', phone: '652650207' }, { name: 'Sis Nerisa', phone: '650471261' },
  { name: 'Ma Grace', phone: '677171512' }, { name: 'Ma Marbel', phone: '678693303' },
  { name: 'Ma Pamela', phone: '651713152' }, { name: 'Sis Junabelle', phone: '670335435' },
  { name: 'Br Ashu', phone: '673753450' }, { name: 'Dec. Felicity', phone: '676344500' },
  { name: 'Sis Dimobel', phone: '673886641' }, { name: 'Sis Rita', phone: '653713000' },
  { name: 'Br Miracle', phone: '683165760' }, { name: 'Br Ronaldo', phone: '653677617' },
  { name: 'Sis Rose', phone: '680054696' }, { name: 'Sis Emerencia', phone: '679793707' },
  { name: 'Sis Vanessa', phone: '672476782' }, { name: 'Br Teriel', phone: '673356549' },
  { name: 'Br Ramson', phone: '653417366' }, { name: 'Br Brandy', phone: '682396514' },
  { name: 'Sis Franka', phone: '650359501' }, { name: 'Br Shama', phone: '682108398' },
  { name: 'Ma Vivian', phone: '681023135' }, { name: 'Ma Doris', phone: '674225248' },
  { name: 'Br Caleb', phone: '676741870' }, { name: 'Yvette', phone: '678952652' },
  { name: 'Sis Mary', phone: '650415624' }, { name: 'Br Inocent', phone: '653013579' },
  { name: 'Sis Elizabeth', phone: '671659072' }, { name: 'Mummy Syvian', phone: '650935046' },
  { name: 'Pastor Derick', phone: '672723842' }, { name: 'Sis Favour W', phone: '679559084' },
  { name: 'Sis Confidence', phone: '652156589' }, { name: 'Sis Esther', phone: '670933143' },
  { name: 'Sis Faith', phone: '671606715' }, { name: 'Br Abenego', phone: '679769999' },
  { name: 'Sis Hilda', phone: '688559753' }, { name: 'Sis Minet', phone: '679983224' },
  { name: 'Sis Shanis', phone: '675034033' }, { name: 'Sis Linda', phone: '651059252' },
  { name: 'Sis Paoula', phone: '650136288' }, { name: 'Br Bless', phone: '671063339' },
  { name: 'Br Christian', phone: '652070823' },
];

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterGroup, setFilterGroup] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [importing, setImporting] = useState(false);

  const fetchMembers = async () => {
    try {
      const params = {};
      if (filterGroup) params.group = filterGroup;
      if (search) params.search = search;
      const { data } = await axios.get('/members', { params });
      setMembers(data.members);
    } catch {
      toast.error('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMembers(); }, [search, filterGroup]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    return errs;
  };

  const openAdd = () => { setEditingId(null); setForm(defaultForm); setFormErrors({}); setShowModal(true); };
  const openEdit = (m) => {
    setEditingId(m._id);
    setForm({ name: m.name, phone: m.phone, email: m.email || '', group: m.group, status: m.status, notes: m.notes || '' });
    setFormErrors({});
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setFormErrors(errs); return; }
    setSaving(true);
    try {
      if (editingId) {
        await axios.put(`/members/${editingId}`, form);
        toast.success('Member updated!');
      } else {
        await axios.post('/members', form);
        toast.success('Member added!');
      }
      setShowModal(false);
      fetchMembers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove ${name} from the roster?`)) return;
    try {
      await axios.delete(`/members/${id}`);
      toast.success(`${name} removed`);
      fetchMembers();
    } catch {
      toast.error('Delete failed');
    }
  };

  const importMembers = async () => {
    setImporting(true);
    try {
      const { data } = await axios.post('/members/bulk-import', { members: CHURCH_MEMBERS });
      toast.success(`Imported ${data.results.inserted} members, skipped ${data.results.skipped} duplicates`);
      fetchMembers();
    } catch {
      toast.error('Import failed');
    } finally {
      setImporting(false);
    }
  };

  const groupColors = {
    Elders: 'bg-amber-100 text-amber-800',
    Deacons: 'bg-purple-100 text-purple-800',
    Sisters: 'bg-pink-100 text-pink-800',
    Brothers: 'bg-blue-100 text-blue-800',
    Youth: 'bg-green-100 text-green-800',
    Choir: 'bg-indigo-100 text-indigo-800',
    'All Members': 'bg-gray-100 text-gray-800',
  };

  const initials = (name) => name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">Church Members</h1>
          <p className="text-gray-500 mt-1">{members.length} members in directory</p>
        </div>
        <div className="flex gap-2">
          <button onClick={importMembers} disabled={importing} className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 text-sm font-medium transition-all">
            {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Import from Excel
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md">
            <Plus className="w-4 h-4" /> Add Member
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or phone..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400"
          />
        </div>
        <select value={filterGroup} onChange={e => setFilterGroup(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 bg-white text-gray-700">
          <option value="">All Groups</option>
          {GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center"><Loader2 className="w-8 h-8 animate-spin text-primary-500 mx-auto" /></div>
        ) : members.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">No members found</p>
            <button onClick={importMembers} className="mt-4 text-primary-600 text-sm font-semibold hover:underline">Import from Excel data</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Member</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Group</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
                  <th className="px-6 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {members.map(m => (
                  <tr key={m._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-primary-100 text-primary-700 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {initials(m.name)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{m.name}</p>
                          {m.email && <p className="text-gray-400 text-xs">{m.email}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        {m.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${groupColors[m.group] || groupColors['All Members']}`}>
                        {m.group}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${m.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => openEdit(m)} className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(m._id, m.name)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-xl text-gray-900">{editingId ? 'Edit Member' : 'Add New Member'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              {[
                { label: 'Full Name *', name: 'name', placeholder: 'e.g. Sis Abigail' },
                { label: 'Phone Number *', name: 'phone', placeholder: 'e.g. 671112872' },
                { label: 'Email (optional)', name: 'email', type: 'email', placeholder: 'member@email.com' },
              ].map(({ label, name, type = 'text', placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                  <input
                    type={type} name={name} value={form[name]}
                    onChange={e => { setForm(p => ({ ...p, [name]: e.target.value })); setFormErrors(p => ({ ...p, [name]: '' })); }}
                    placeholder={placeholder}
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${formErrors[name] ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-primary-200 focus:border-primary-400'}`}
                  />
                  {formErrors[name] && <p className="mt-1 text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{formErrors[name]}</p>}
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Group</label>
                  <select name="group" value={form.group} onChange={e => setForm(p => ({ ...p, group: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 bg-white">
                    {GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
                  <select name="status" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 bg-white">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Notes</label>
                <textarea name="notes" value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} rows={2} placeholder="Optional notes..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-primary-700 hover:bg-primary-800 text-white py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : (editingId ? 'Update' : 'Add Member')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembersPage;
