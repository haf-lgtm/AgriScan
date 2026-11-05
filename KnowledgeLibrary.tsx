import React, { useState, useEffect } from 'react';
import { User, Language, FieldNote } from '../types';
import { translations } from '../data/translations';
import { localDb } from '../services/localDb';
import {
  FileSpreadsheet,
  Plus,
  Calendar,
  MapPin,
  Sprout,
  Trash2,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';

interface KnowledgeLibraryProps {
  currentUser: User | null;
  currentLang: Language;
}

export const KnowledgeLibrary: React.FC<KnowledgeLibraryProps> = ({
  currentUser,
  currentLang,
}) => {
  const t = translations[currentLang];
  const [notes, setNotes] = useState<FieldNote[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const [title, setTitle] = useState('');
  const [crop, setCrop] = useState(currentUser?.mainCrop || 'Tomato');
  const [plotLocation, setPlotLocation] = useState('North Acre Plot #2');
  const [observation, setObservation] = useState('');

  const fetchNotes = async () => {
    const list = await localDb.getNotes();
    if (list.length === 0) {
      const initial: FieldNote = {
        id: 'note_init_1',
        date: new Date().toISOString(),
        title: 'Trichoderma Bio-Inoculation Routine',
        crop: currentUser?.mainCrop || 'Tomato',
        plotLocation: 'Plot 3 East Ridge',
        observation:
          'Applied Trichoderma harzianum @ 5 g/L through drip lines after light rain. Root crowns show robust mycelial colonization and no early dampening observed.',
      };
      await localDb.saveNote(initial);
      setNotes([initial]);
    } else {
      setNotes(list);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSaveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !observation.trim()) return;

    const newNote: FieldNote = {
      id: 'note_' + Date.now().toString(36),
      date: new Date().toISOString(),
      title: title.trim(),
      crop,
      plotLocation: plotLocation.trim(),
      observation: observation.trim(),
    };

    await localDb.saveNote(newNote);
    setTitle('');
    setObservation('');
    setShowAddModal(false);
    await fetchNotes();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this field note?')) {
      await localDb.deleteNote(id);
      await fetchNotes();
    }
  };

  const exportNotesCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Date,Title,Crop,Plot,Observation\n' +
      notes.map((n) => `"${new Date(n.date).toLocaleDateString()}","${n.title}","${n.crop}","${n.plotLocation}","${n.observation.replace(/"/g, '""')}"`).join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', `AgriScan_Field_Notes_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Smart Scan Recommendations (Feature 7)
  const inspectionRecommendations = [
    {
      crop: 'Tomato',
      dueInDays: 3,
      reason: 'Incubation cycle for Alternaria solani after recent rainfall is 72 hours. Inspect lower leaf collars.',
      status: 'Urgent',
    },
    {
      crop: 'Maize / Corn',
      dueInDays: 5,
      reason: 'Young whorls in vegetative phase are prone to 2nd-instar armyworm entry. Check center whorl leaves.',
      status: 'Scheduled',
    },
    {
      crop: 'Rice (Paddy)',
      dueInDays: 7,
      reason: 'Panicle emergence scouting to confirm absence of Neck Blast.',
      status: 'Nominal',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600"></span>
              <span className="text-xs font-semibold text-emerald-800">
                Offline Field Agronomy Diary & Smart Schedule
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 font-serif">
              {t.nav.notes}
            </h1>
            <p className="mt-1 text-xs text-stone-600">
              Record personal agricultural observations, plot spray dates, and follow-up schedules completely offline.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportNotesCsv}
              className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-50"
            >
              <Download className="h-4 w-4 text-emerald-800" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-800 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Field Note</span>
            </button>
          </div>
        </div>
      </div>

      {/* Smart Scan Recommendations Card (Feature 7) */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-[10px] font-mono text-stone-400 uppercase">Automated Agro-Scheduling</span>
            <h3 className="text-sm font-bold text-stone-900 font-serif">
              Smart Scan Recommendations (Next Inspections Due)
            </h3>
          </div>
          <span className="text-xs text-stone-500 font-mono">Based on Pathogen Incubation Cycles</span>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {inspectionRecommendations.map((rec, i) => (
            <div
              key={i}
              className={`rounded-xl border p-4 text-xs flex flex-col justify-between ${
                rec.status === 'Urgent'
                  ? 'border-amber-300 bg-amber-50/60 text-amber-950'
                  : 'border-stone-200 bg-stone-50/70 text-stone-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">{rec.crop}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    rec.status === 'Urgent' ? 'bg-amber-200 text-amber-900' : 'bg-stone-200 text-stone-700'
                  }`}>
                    Due in {rec.dueInDays} days
                  </span>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-stone-600">
                  {rec.reason}
                </p>
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800">
                <Clock className="h-3.5 w-3.5" />
                <span>Mark calendar reminder</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs flex flex-col justify-between hover:border-emerald-600 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono mb-1">
                <span>{new Date(note.date).toLocaleDateString()}</span>
                <span className="text-stone-700 font-semibold">{note.crop}</span>
              </div>

              <h4 className="text-sm font-bold text-stone-900 font-serif">{note.title}</h4>

              <div className="mt-1 flex items-center gap-1 text-[11px] text-stone-500">
                <MapPin className="h-3 w-3 text-stone-400" />
                <span>{note.plotLocation}</span>
              </div>

              <p className="mt-3 text-xs text-stone-700 leading-relaxed whitespace-pre-wrap">
                {note.observation}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3">
              <span className="text-[10px] text-emerald-800 font-semibold">Verified Field Observation</span>
              <button
                onClick={() => handleDelete(note.id)}
                className="text-stone-400 hover:text-red-700 p-1"
                title="Delete note"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Note Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-sm font-bold text-stone-900 font-serif">
                Record New Agricultural Observation
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-md p-1 text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNote} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700">Observation Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Copper Spray & Moisture Observation"
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700">Crop Type</label>
                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs"
                  >
                    <option value="Tomato">Tomato</option>
                    <option value="Potato">Potato</option>
                    <option value="Rice (Paddy)">Rice (Paddy)</option>
                    <option value="Maize / Corn">Maize / Corn</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Cotton">Cotton</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700">Plot Location / Block</label>
                  <input
                    type="text"
                    value={plotLocation}
                    onChange={(e) => setPlotLocation(e.target.value)}
                    placeholder="e.g. Block A West"
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700">Detailed Field Observation *</label>
                <textarea
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  rows={4}
                  placeholder="Describe leaf symptoms, irrigation history, organic sprays applied, or pest activity..."
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 p-3 text-xs"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-stone-100 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-stone-200 px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-800 px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700"
                >
                  Save to Local Diary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
