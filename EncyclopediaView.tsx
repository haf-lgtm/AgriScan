import React, { useState } from 'react';
import { User, Language, DiseaseEncyclopediaItem } from '../types';
import { translations } from '../data/translations';
import { DISEASES_DATA } from '../data/encyclopediaData';
import {
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  Layers,
  ChevronDown,
} from 'lucide-react';

interface EncyclopediaViewProps {
  currentUser: User | null;
  currentLang: Language;
}

export const EncyclopediaView: React.FC<EncyclopediaViewProps> = ({
  currentUser,
  currentLang,
}) => {
  const t = translations[currentLang];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCropFilter, setSelectedCropFilter] = useState('All');
  const [selectedPathogenFilter, setSelectedPathogenFilter] = useState('All');
  const [activeItem, setActiveItem] = useState<DiseaseEncyclopediaItem>(DISEASES_DATA[0]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  // Filtered encyclopedia list
  const filteredDiseases = DISEASES_DATA.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.symptoms.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCrop =
      selectedCropFilter === 'All' || item.affectedCrops.some((c) => c.includes(selectedCropFilter));

    const matchesPathogen =
      selectedPathogenFilter === 'All' || item.pathogenType === selectedPathogenFilter;

    return matchesSearch && matchesCrop && matchesPathogen;
  });

  return (
    <div className="space-y-6">
      {/* Header & Local Search Bar */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600"></span>
              <span className="text-xs font-semibold text-emerald-800">
                100% Offline Agricultural Pathology Library
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 font-serif">
              {t.nav.encyclopedia}
            </h1>
            <p className="mt-1 text-xs text-stone-600">
              Locally stored comprehensive knowledge base of crop pathogens, symptoms, favorable microclimates, and management.
            </p>
          </div>

          <button
            onClick={() => setShowComparisonModal(true)}
            className="flex items-center gap-2 rounded-xl border border-emerald-700 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-900 hover:bg-emerald-100 transition-colors shrink-0"
          >
            <Layers className="h-4 w-4 text-emerald-800" />
            <span>Similar Disease Comparison Matrix</span>
          </button>
        </div>

        {/* Search & Filters */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-12 gap-3 border-t border-stone-100 pt-4">
          <div className="sm:col-span-6 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search diseases, pathogens, symptoms (e.g. 'concentric', 'whorl')..."
              className="w-full rounded-xl border border-stone-200 bg-stone-50 pl-9 pr-3 py-2 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-hidden"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedCropFilter}
              onChange={(e) => setSelectedCropFilter(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-hidden"
            >
              <option value="All">All Host Crops</option>
              <option value="Tomato">Tomato</option>
              <option value="Potato">Potato</option>
              <option value="Apple">Apple</option>
              <option value="Grapes">Grapes</option>
              <option value="Banana">Banana</option>
              <option value="Mango">Mango</option>
              <option value="Citrus">Citrus (Lemon / Orange)</option>
              <option value="Rice">Rice (Paddy)</option>
              <option value="Maize">Maize / Corn</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedPathogenFilter}
              onChange={(e) => setSelectedPathogenFilter(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-hidden"
            >
              <option value="All">All Pathogen Classes</option>
              <option value="Fungal">Fungal (Molds & Mildews)</option>
              <option value="Bacterial">Bacterial (Spots & Blights)</option>
              <option value="Viral">Viral (Begomovirus & Mosaics)</option>
              <option value="Physiological">Physiological (Deficiencies & Stress)</option>
              <option value="Healthy">Healthy (Optimal Biomass)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Encyclopedia Master-Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Disease List (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider px-1">
            Matching Conditions ({filteredDiseases.length})
          </p>

          <div className="max-h-[600px] overflow-y-auto space-y-2 pr-1">
            {filteredDiseases.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all ${
                  activeItem.id === item.id
                    ? 'border-emerald-700 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-600'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 rounded-lg object-cover border border-stone-200 shrink-0 mt-0.5"
                  referrerPolicy="no-referrer"
                />
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-stone-900 truncate">{item.name}</h4>
                  <p className="text-[11px] text-stone-500 italic truncate">{item.scientificName}</p>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-stone-500">
                    <span className="font-semibold text-emerald-800">{item.pathogenType}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.affectedCrops.join(', ')}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Detailed Pathological Dossier (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                  {activeItem.pathogenType} Pathogen
                </span>
                {activeItem.severityLevel && (
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    activeItem.severityLevel === 'Critical' ? 'bg-red-100 text-red-800' :
                    activeItem.severityLevel === 'Severe' ? 'bg-orange-100 text-orange-800' :
                    activeItem.severityLevel === 'Moderate' ? 'bg-amber-100 text-amber-800' :
                    activeItem.severityLevel === 'Healthy' ? 'bg-emerald-100 text-emerald-800' :
                    'bg-stone-100 text-stone-800'
                  }`}>
                    Severity: {activeItem.severityLevel}
                  </span>
                )}
                <span className="text-xs text-stone-400 font-mono">ID: {activeItem.id}</span>
              </div>
              <h2 className="mt-1 text-xl font-bold text-stone-900 font-serif">{activeItem.name}</h2>
              <p className="text-xs text-stone-500 italic">{activeItem.scientificName}</p>
              {activeItem.affectedPlantParts && activeItem.affectedPlantParts.length > 0 && (
                <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px]">
                  <span className="text-stone-400 font-semibold uppercase">Parts Affected:</span>
                  {activeItem.affectedPlantParts.map((part, pIdx) => (
                    <span key={pIdx} className="rounded-md bg-stone-100 px-2 py-0.5 text-stone-700 font-medium">
                      {part}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="text-right sm:border-l sm:border-stone-200 sm:pl-4">
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Primary Hosts</span>
              <span className="text-xs font-bold text-stone-800">{activeItem.affectedCrops.join(', ')}</span>
            </div>
          </div>

          {/* Botanical Photo and Microclimate Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-4/3 overflow-hidden rounded-xl border border-stone-200 bg-stone-950">
              <img
                src={activeItem.image}
                alt={activeItem.name}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-3">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-serif">
                Environmental Favorability Window
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-stone-200/60 pb-1.5">
                  <span className="text-stone-500">Optimal Temperature:</span>
                  <strong className="text-stone-900 font-mono">{activeItem.favorableConditions.tempRange}</strong>
                </div>
                <div className="flex items-center justify-between border-b border-stone-200/60 pb-1.5">
                  <span className="text-stone-500">Relative Humidity:</span>
                  <strong className="text-stone-900 font-mono">{activeItem.favorableConditions.humidityRange}</strong>
                </div>
                <div className="flex items-center justify-between pb-1">
                  <span className="text-stone-500">Moisture Profile:</span>
                  <strong className="text-stone-900 text-right">{activeItem.favorableConditions.rainfall}</strong>
                </div>
              </div>

              <div className="mt-3 rounded-lg bg-amber-50 p-2.5 text-[11px] text-amber-900 border border-amber-200">
                <strong>Epidemiological insight:</strong> Pathogen spores initiate infection within 6 hours of continuous leaf wetness.
              </div>
            </div>
          </div>

          {/* Diagnostic Symptoms */}
          <div>
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-serif mb-2">
              Definitive Visible Symptoms
            </h3>
            <ul className="space-y-1.5">
              {activeItem.symptoms.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Agronomic Causes */}
          <div>
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-serif mb-2">
              Primary Etiology & Causes
            </h3>
            <ul className="space-y-1.5">
              {activeItem.causes.map((c, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                  <Info className="h-4 w-4 text-stone-500 shrink-0 mt-0.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Integrated Prevention & Bio-Management */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-stone-100 pt-4">
            <div>
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider font-serif mb-2">
                Preventative Cultural Shields
              </h4>
              <ul className="space-y-1 text-xs text-stone-700">
                {activeItem.prevention.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-700 font-bold">·</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-serif mb-2">
                Organic & Bio-Control Options
              </h4>
              <ul className="space-y-1 text-xs text-stone-700">
                {activeItem.organicTreatment.map((ot, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-700 font-bold">·</span>
                    <span>{ot}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Chemical Treatments (where applicable) */}
          {activeItem.chemicalTreatment && activeItem.chemicalTreatment.length > 0 && (
            <div className="border-t border-stone-100 pt-4">
              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider font-serif mb-2">
                Chemical Treatment Protocols (Targeted / Curative)
              </h4>
              <ul className="space-y-1 text-xs text-stone-700">
                {activeItem.chemicalTreatment.map((ct, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-700 font-bold">·</span>
                    <span>{ct}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Similar Disease Comparison Modal (Extra Feature 4) */}
      {showComparisonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-3xl rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl animate-in fade-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-emerald-800" />
                <h3 className="text-base font-bold text-stone-900 font-serif">
                  Similar Disease Differential Matrix
                </h3>
              </div>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="rounded-lg p-1.5 text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <p className="mt-2 text-xs text-stone-600">
              Crop diseases frequently exhibit overlapping initial symptoms. Use this side-by-side diagnostic table to prevent misidentification.
            </p>

            <div className="mt-4 space-y-4">
              {/* Pair 1 */}
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-serif mb-2">
                  Pair 1: Early Blight vs. Late Blight (Tomato / Potato)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="rounded-lg bg-white p-3 border border-stone-200">
                    <p className="font-bold text-stone-900">Early Blight (Alternaria solani)</p>
                    <p className="mt-1 text-stone-600">
                      Distinct concentric circular rings (target spots), dry texture, primarily lower foliage during alternating dry/wet warm spells (24-30°C).
                    </p>
                  </div>
                  <div className="rounded-lg bg-white p-3 border border-stone-200">
                    <p className="font-bold text-stone-900">Late Blight (Phytophthora infestans)</p>
                    <p className="mt-1 text-stone-600">
                      Rapidly expanding irregular water-soaked dark patches without concentric rings, white delicate mold on undersides during cool misty conditions (12-20°C).
                    </p>
                  </div>
                </div>
              </div>

              {/* Pair 2 */}
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-serif mb-2">
                  Pair 2: Bacterial Spot vs. Septoria Leaf Spot
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="rounded-lg bg-white p-3 border border-stone-200">
                    <p className="font-bold text-stone-900">Bacterial Spot (Xanthomonas)</p>
                    <p className="mt-1 text-stone-600">
                      Angular water-soaked greasy spots that crack; causes scabby rough blisters on green tomato/chili fruit.
                    </p>
                  </div>
                  <div className="rounded-lg bg-white p-3 border border-stone-200">
                    <p className="font-bold text-stone-900">Septoria Leaf Spot (Septoria lycopersici)</p>
                    <p className="mt-1 text-stone-600">
                      Circular spots with gray centers dotted with tiny black pepper-like fruiting bodies (pycnidia); fruit is never infected.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pair 3 */}
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-serif mb-2">
                  Pair 3: Nitrogen Deficiency vs. Viral Chlorosis
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="rounded-lg bg-white p-3 border border-stone-200">
                    <p className="font-bold text-stone-900">Nitrogen Deficiency (Soil Hunger)</p>
                    <p className="mt-1 text-stone-600">
                      Smooth, uniform, symmetrical yellowing across older bottom leaves first. Completely disappears after 48h foliar nitrogen feed.
                    </p>
                  </div>
                  <div className="rounded-lg bg-white p-3 border border-stone-200">
                    <p className="font-bold text-stone-900">Viral Chlorosis (TYLCV / Mosaic)</p>
                    <p className="mt-1 text-stone-600">
                      Mottled irregular green-yellow mosaic accompanied by leaf puckering, thick brittle veins, and upward cupping; does not respond to fertilizer.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-stone-100 pt-3 text-right">
              <button
                onClick={() => setShowComparisonModal(false)}
                className="rounded-xl bg-stone-900 px-5 py-2 text-xs font-semibold text-white hover:bg-stone-800"
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
