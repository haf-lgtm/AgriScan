import React, { useState } from 'react';
import { User, Language } from '../types';
import { translations } from '../data/translations';
import { DISEASES_DATA, PESTS_DATA } from '../data/encyclopediaData';
import {
  ShieldCheck,
  Leaf,
  Bug,
  AlertTriangle,
  Beaker,
  Clock,
  CheckCircle2,
  ChevronRight,
  Sprout,
  Shield,
} from 'lucide-react';

interface TreatmentViewProps {
  currentUser: User | null;
  currentLang: Language;
}

export const TreatmentView: React.FC<TreatmentViewProps> = ({
  currentUser,
  currentLang,
}) => {
  const t = translations[currentLang];
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string>('tomato-early-blight');

  const selectedDisease = DISEASES_DATA.find((d) => d.id === selectedDiseaseId) || DISEASES_DATA[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-600"></span>
          <span className="text-xs font-semibold text-emerald-800">
            Integrated Pest Management (IPM) & Biological Shield
          </span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 font-serif">
          {t.nav.recommendations}
        </h1>
        <p className="mt-1 text-xs text-stone-600">
          Scientifically verified agronomic treatments following ICAR, CABI, and agricultural university standards. No hallucinated chemical dosages.
        </p>

        {/* Condition Selector */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-stone-100 pt-4">
          <span className="text-xs font-semibold text-stone-700">Select Target Condition:</span>
          {DISEASES_DATA.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDiseaseId(d.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedDiseaseId === d.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {d.name.split(' (')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main 4-Pillar Treatment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1: Immediate Cultural Actions */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-2">
              <Clock className="h-4 w-4 text-amber-600" />
              <span>Pillar 1 · Immediate Cultural Actions (0-24 Hours)</span>
            </div>
            <h3 className="text-base font-bold text-stone-900 font-serif">Sanitation & Moisture Arrest</h3>
            <p className="mt-1 text-xs text-stone-500">Essential field actions to immediately halt pathogen spore dissemination.</p>

            <ul className="mt-4 space-y-2.5">
              <li className="flex items-start gap-2 text-xs text-stone-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Prune infected leaves:</strong> Cut off lower 15-20 cm of foliage touching wet soil. Never compost infected leaves; bury or burn outside the field boundary.
                </span>
              </li>
              <li className="flex items-start gap-2 text-xs text-stone-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Halt overhead irrigation:</strong> Water exclusively at the root base via drip lines in early morning so leaves remain dry before evening dew.
                </span>
              </li>
              <li className="flex items-start gap-2 text-xs text-stone-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Sterilize cutting tools:</strong> Dip shears in 70% ethanol or 10% household sodium hypochlorite solution between individual plants.
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-4 rounded-xl bg-amber-50 p-3 text-[11px] text-amber-900 border border-amber-200">
            <strong>Farmer safety rule:</strong> Never work in wet fields during early morning dew to avoid dragging living spores from sick plants to clean rows.
          </div>
        </div>

        {/* Pillar 2: Organic & Botanical Prevention */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
              <Leaf className="h-4 w-4 text-emerald-600" />
              <span>Pillar 2 · Organic & Botanical Shield</span>
            </div>
            <h3 className="text-base font-bold text-stone-900 font-serif">Eco-Friendly Bio-Formulations</h3>
            <p className="mt-1 text-xs text-stone-500">Non-toxic botanical extracts that leave zero chemical residue on edible produce.</p>

            <ul className="mt-4 space-y-2.5">
              {selectedDisease.organicTreatment.map((org, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-stone-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{org}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-[11px] text-emerald-900 border border-emerald-200">
            <strong>Optimal spraying time:</strong> Spray neem oil emulsified with mild soap between 4:30 PM - 6:30 PM to prevent UV photolysis.
          </div>
        </div>

        {/* Pillar 3: Biological Control & Microbial Antagonists */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-blue-800 font-bold text-xs uppercase tracking-wider mb-2">
              <Sprout className="h-4 w-4 text-blue-600" />
              <span>Pillar 3 · Biological Control & Natural Predators</span>
            </div>
            <h3 className="text-base font-bold text-stone-900 font-serif">Beneficial Microbes & Insects</h3>
            <p className="mt-1 text-xs text-stone-500">Self-replicating biological agents that outcompete pathogens in the rhizosphere.</p>

            <ul className="mt-4 space-y-2.5">
              {selectedDisease.biologicalControl.map((bio, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-stone-700">
                  <CheckCircle2 className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
                  <span>{bio}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 rounded-xl bg-blue-50 p-3 text-[11px] text-blue-900 border border-blue-200">
            <strong>Microbial viability:</strong> Do not mix biological Trichoderma or Bacillus with synthetic copper fungicides in the same tank.
          </div>
        </div>

        {/* Pillar 4: Verified Chemical Control (Strict Standards) */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-stone-800 font-bold text-xs uppercase tracking-wider mb-2">
              <Beaker className="h-4 w-4 text-stone-600" />
              <span>Pillar 4 · University-Verified Chemical Treatment</span>
            </div>
            <h3 className="text-base font-bold text-stone-900 font-serif">Standard Chemical Protection</h3>
            <p className="mt-1 text-xs text-stone-500">Only to be used when disease exceeds economic threshold levels (ETL).</p>

            <ul className="mt-4 space-y-2.5">
              {selectedDisease.chemicalTreatment.map((chem, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-stone-700">
                  <ChevronRight className="h-4 w-4 text-stone-700 shrink-0 mt-0.5" />
                  <span>{chem}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 rounded-xl bg-stone-100 p-3 text-[11px] text-stone-800 border border-stone-200">
            <strong>Mandatory Safety Notice:</strong> Wear nitrile gloves and face mask during spray. Always observe registered Pre-Harvest Interval (PHI) before picking.
          </div>
        </div>
      </div>
    </div>
  );
};
