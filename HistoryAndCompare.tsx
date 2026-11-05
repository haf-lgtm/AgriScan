import React, { useState, useEffect } from 'react';
import { User, Language, ScanResult } from '../types';
import { translations } from '../data/translations';
import { localDb } from '../services/localDb';
import {
  History,
  GitCompare,
  Trash2,
  Calendar,
  Sparkles,
  ArrowRight,
  ChevronRight,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

interface HistoryAndCompareProps {
  currentUser: User | null;
  currentLang: Language;
}

export const HistoryAndCompare: React.FC<HistoryAndCompareProps> = ({
  currentUser,
  currentLang,
}) => {
  const t = translations[currentLang];
  const [scans, setScans] = useState<ScanResult[]>([]);
  const [selectedScanA, setSelectedScanA] = useState<ScanResult | null>(null);
  const [selectedScanB, setSelectedScanB] = useState<ScanResult | null>(null);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const fetchScans = async () => {
    if (currentUser) {
      const list = await localDb.getScansByUser(currentUser.id);
      setScans(list);
      if (list.length >= 2) {
        setSelectedScanA(list[0]);
        setSelectedScanB(list[1]);
      } else if (list.length === 1) {
        setSelectedScanA(list[0]);
      }
    }
  };

  useEffect(() => {
    fetchScans();
  }, [currentUser]);

  const handleDeleteScan = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this scan record from local device storage?')) {
      await localDb.deleteScan(id);
      await fetchScans();
    }
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
                Local Historical Archive & Symptom Progression Tracking
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 font-serif">
              {t.nav.history}
            </h1>
            <p className="mt-1 text-xs text-stone-600">
              Compare two scans side-by-side to track whether disease lesions are shrinking after treatment or spreading.
            </p>
          </div>

          {scans.length >= 2 && (
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors shrink-0"
            >
              <GitCompare className="h-4 w-4" />
              <span>Launch Side-by-Side Comparison Slider</span>
            </button>
          )}
        </div>
      </div>

      {/* Scans Archive Table / List */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-serif mb-4">
          Recorded Diagnostic Sessions ({scans.length})
        </h3>

        {scans.length === 0 ? (
          <div className="py-12 text-center text-xs text-stone-500">
            No scans recorded in local database yet. Go to AI Crop Scanner to perform an inspection.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scans.map((scan) => (
              <div
                key={scan.id}
                className="rounded-xl border border-stone-200 bg-stone-50/50 p-4 shadow-xs flex flex-col justify-between hover:border-emerald-600 transition-colors"
              >
                <div>
                  <div className="aspect-4/3 w-full overflow-hidden rounded-lg bg-stone-900 mb-3 border border-stone-200">
                    <img
                      src={scan.imageUrl}
                      alt={scan.cropName}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                    <span className="font-mono">{new Date(scan.timestamp).toLocaleDateString()}</span>
                    <span className="font-semibold text-stone-800">{scan.cropName}</span>
                  </div>

                  <h4 className="text-xs font-bold text-stone-900">{scan.predictedCondition}</h4>

                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-stone-500">
                      Match: <strong className="text-stone-900 font-mono">{scan.confidenceScore}%</strong>
                    </span>
                    <span className={`font-semibold ${
                      scan.severity === 'Critical' ? 'text-red-700' :
                      scan.severity === 'Severe' ? 'text-orange-700' :
                      scan.severity === 'Moderate' ? 'text-amber-700' :
                      'text-emerald-800'
                    }`}>
                      {scan.severity}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-stone-200/60 pt-3">
                  <button
                    onClick={() => {
                      setSelectedScanA(scan);
                      setIsCompareModalOpen(true);
                    }}
                    className="text-xs font-medium text-emerald-800 hover:underline flex items-center gap-1"
                  >
                    <span>Compare This</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={(e) => handleDeleteScan(scan.id, e)}
                    className="text-stone-400 hover:text-red-700 p-1 rounded"
                    title="Delete record"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Side-by-Side Comparison Slider Modal */}
      {isCompareModalOpen && selectedScanA && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-4xl rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl animate-in fade-in duration-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <GitCompare className="h-5 w-5 text-emerald-800" />
                <h3 className="text-base font-bold text-stone-900 font-serif">
                  Foliage Symptom Progression Comparison
                </h3>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="rounded-lg p-1 text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            {/* Specimen Pickers */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700">Baseline Inspection (Before):</label>
                <select
                  value={selectedScanA.id}
                  onChange={(e) => setSelectedScanA(scans.find((s) => s.id === e.target.value) || selectedScanA)}
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs"
                >
                  {scans.map((s) => (
                    <option key={s.id} value={s.id}>
                      {new Date(s.timestamp).toLocaleDateString()} - {s.predictedCondition} ({s.severity})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700">Follow-up Inspection (After):</label>
                <select
                  value={selectedScanB?.id || ''}
                  onChange={(e) => setSelectedScanB(scans.find((s) => s.id === e.target.value) || null)}
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs"
                >
                  {scans.map((s) => (
                    <option key={s.id} value={s.id}>
                      {new Date(s.timestamp).toLocaleDateString()} - {s.predictedCondition} ({s.severity})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comparison Visualizer Slider */}
            {selectedScanA && selectedScanB && (
              <div className="mt-6 space-y-4">
                <div className="relative aspect-16/9 w-full overflow-hidden rounded-xl bg-stone-950 border border-stone-200 select-none">
                  {/* Background Image (After Scan B) */}
                  <img
                    src={selectedScanB.imageUrl}
                    alt="After scan"
                    className="absolute inset-0 h-full w-full object-contain"
                    referrerPolicy="no-referrer"
                  />

                  {/* Foreground Image (Before Scan A) with clip-path */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    <img
                      src={selectedScanA.imageUrl}
                      alt="Before scan"
                      className="absolute inset-0 h-full w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Vertical Dividing Line */}
                  <div
                    className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -left-3.5 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-emerald-950 shadow-md text-xs font-bold">
                      ↔
                    </div>
                  </div>

                  {/* Watermark Tags */}
                  <span className="absolute bottom-3 left-3 rounded-md bg-black/70 px-2 py-1 text-[11px] text-white font-mono">
                    Baseline: {new Date(selectedScanA.timestamp).toLocaleDateString()}
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 text-[11px] text-white font-mono">
                    Follow-up: {new Date(selectedScanB.timestamp).toLocaleDateString()}
                  </span>
                </div>

                {/* Slider Input */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-stone-500">Baseline</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="w-full accent-emerald-700"
                  />
                  <span className="text-xs text-stone-500">Follow-up</span>
                </div>

                {/* Quantitative Progression Verdict */}
                <div className="grid grid-cols-2 gap-4 border-t border-stone-100 pt-4 text-xs">
                  <div className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                    <p className="font-semibold text-stone-900">Baseline Inspection Findings</p>
                    <p className="mt-1 text-stone-600">Diagnosis: <strong>{selectedScanA.predictedCondition}</strong></p>
                    <p className="text-stone-600">Severity: <strong>{selectedScanA.severity}</strong></p>
                  </div>

                  <div className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                    <p className="font-semibold text-stone-900">Follow-up Inspection Findings</p>
                    <p className="mt-1 text-stone-600">Diagnosis: <strong>{selectedScanB.predictedCondition}</strong></p>
                    <p className="text-stone-600">Severity: <strong>{selectedScanB.severity}</strong></p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 border-t border-stone-100 pt-3 text-right">
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="rounded-xl bg-stone-900 px-5 py-2 text-xs font-semibold text-white"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
