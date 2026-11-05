import React, { useState, useEffect } from 'react';
import { User, Language, FarmerReminder } from '../types';
import { translations } from '../data/translations';
import { localDb } from '../services/localDb';
import {
  Bell,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  Trash2,
  AlertTriangle,
  Sparkles,
  Sprout,
} from 'lucide-react';

interface RemindersViewProps {
  currentUser: User | null;
  currentLang: Language;
}

export const RemindersView: React.FC<RemindersViewProps> = ({
  currentUser,
  currentLang,
}) => {
  const t = translations[currentLang];
  const [reminders, setReminders] = useState<FarmerReminder[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [crop, setCrop] = useState(currentUser?.mainCrop || 'Tomato');
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('08:30');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('high');
  const [category, setCategory] = useState<FarmerReminder['category']>('Inspection');
  const [notes, setNotes] = useState('');

  const fetchReminders = async () => {
    const list = await localDb.getReminders();
    if (list.length === 0) {
      // Seed pre-set crop inspection and scan reminders
      const defaults: FarmerReminder[] = [
        {
          id: 'rem_1',
          title: '3-Day Alternaria Incubation Inspection',
          crop: currentUser?.mainCrop || 'Tomato',
          dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
          time: '08:00',
          priority: 'high',
          category: 'Inspection',
          completed: false,
          notes: 'Inspect lower leaf collars for concentric rings following recent high humidity.',
        },
        {
          id: 'rem_2',
          title: 'Neem Oil Preventive Spray Application',
          crop: currentUser?.mainCrop || 'Tomato',
          dueDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
          time: '17:30',
          priority: 'medium',
          category: 'Spraying',
          completed: false,
          notes: 'Apply 3 ml/L cold-pressed neem oil in late afternoon to prevent whitefly vectoring.',
        },
      ];
      for (const d of defaults) {
        await localDb.saveReminder(d);
      }
      setReminders(defaults);
    } else {
      setReminders(list);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const handleCreateReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newReminder: FarmerReminder = {
      id: 'rem_' + Date.now().toString(36),
      title: title.trim(),
      crop,
      dueDate,
      time,
      priority,
      category,
      completed: false,
      notes: notes.trim(),
    };

    await localDb.saveReminder(newReminder);
    setShowAddModal(false);
    setTitle('');
    setNotes('');
    await fetchReminders();
  };

  const toggleComplete = async (reminder: FarmerReminder) => {
    const updated = { ...reminder, completed: !reminder.completed };
    await localDb.saveReminder(updated);
    await fetchReminders();
  };

  const handleDelete = async (id: string) => {
    await localDb.deleteReminder(id);
    await fetchReminders();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600"></span>
              <span className="text-xs font-semibold text-emerald-800">
                Autonomous Local Scheduling & Crop Alerts
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 font-serif">
              Notifications and Reminders
            </h1>
            <p className="mt-1 text-xs text-stone-600">
              Set automated follow-up crop inspection reminders and create custom agricultural alerts without cloud notification dependencies.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Add Reminder</span>
          </button>
        </div>
      </div>

      {/* Reminders List */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-stone-900 font-serif border-b border-stone-100 pb-3">
          Scheduled Agricultural Tasks ({reminders.length})
        </h3>

        {reminders.length === 0 ? (
          <div className="py-12 text-center text-xs text-stone-500">
            No reminders scheduled. Click "Add Reminder" above.
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {reminders.map((rem) => (
              <div
                key={rem.id}
                className={`py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  rem.completed ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleComplete(rem)}
                    className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
                      rem.completed
                        ? 'border-emerald-700 bg-emerald-700 text-white'
                        : 'border-stone-300 bg-white text-transparent hover:border-emerald-700'
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className={`text-xs font-bold text-stone-900 ${rem.completed ? 'line-through' : ''}`}>
                        {rem.title}
                      </h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        rem.priority === 'high' ? 'bg-red-50 text-red-800 border border-red-200' :
                        rem.priority === 'medium' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                        'bg-stone-100 text-stone-700'
                      }`}>
                        {rem.priority.toUpperCase()}
                      </span>
                    </div>

                    <p className="mt-1 text-[11px] text-stone-600">{rem.notes}</p>

                    <div className="mt-1.5 flex items-center gap-3 text-[11px] text-stone-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{rem.dueDate}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{rem.time}</span>
                      </span>
                      <span>Crop: {rem.crop}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:self-center">
                  <button
                    onClick={() => handleDelete(rem.id)}
                    className="p-1.5 text-stone-400 hover:text-red-700 transition-colors"
                    title="Delete reminder"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal to add reminder */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-sm font-bold text-stone-900 font-serif">Create Farm Reminder</h3>
              <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <form onSubmit={handleCreateReminder} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700">Task Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Follow-up Leaf Inspection"
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700">Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700">Time</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs"
                  >
                    <option value="Inspection">Inspection</option>
                    <option value="Spraying">Spraying</option>
                    <option value="Irrigation">Irrigation</option>
                    <option value="Harvest">Harvest</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700">Notes / Instructions</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Additional field instructions..."
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 p-3 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-stone-200 px-4 py-2 text-xs text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-800 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                >
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
