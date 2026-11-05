import React, { useState } from 'react';
import { User, Language } from '../types';
import { translations } from '../data/translations';
import { DEFICIENCIES_DATA } from '../data/encyclopediaData';
import {
  Scale,
  Sparkles,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  FileCheck,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

interface DeficiencyAnalyzerProps {
  currentUser: User | null;
  currentLang: Language;
}

export const DeficiencyAnalyzer: React.FC<DeficiencyAnalyzerProps> = ({
  currentUser,
  currentLang,
}) => {
  const t = translations[currentLang];

  // Interactive diagnostic wizard questions
  const [leafRegion, setLeafRegion] = useState<'older' | 'younger' | 'all'>('older');
  const [symptomPattern, setSymptomPattern] = useState<'uniform' | 'veins' | 'target' | 'edges' | 'cupping'>('uniform');
  const [spotMarginClean, setSpotMarginClean] = useState<'yes' | 'no'>('yes');

  // Compute diagnostic verdict
  const computeDiagnosis = () => {
    if (symptomPattern === 'target' || spotMarginClean === 'no') {
      return {
        category: 'Pathogenic Infection (Fungal or Bacterial)',
        primarySuspect: 'Fungal Leaf Spot / Blight (e.g. Alternaria / Phytophthora)',
        confidence: 91,
        explanation:
          'Dark necrotic spots with irregular borders, concentric rings, or water-soaked halos are hallmarks of living pathogen infection rather than nutrient shortage.',
        isDisease: true,
        action: 'Treat with fungicide or biological shield (Trichoderma / Copper). Prune infected leaves.',
        expertNotice: 'If spots expand rapidly during rain, laboratory plating may be required.',
      };
    }

    if (leafRegion === 'older' && symptomPattern === 'uniform') {
      return {
        category: 'Macronutrient Deficiency',
        primarySuspect: 'Nitrogen (N) Deficiency',
        confidence: 95,
        explanation:
          'Nitrogen is highly mobile within the plant. When soil nitrogen is depleted, the plant translocates nitrogen from older lower leaves to feed new shoots, causing uniform pale yellowing starting from the base.',
        isDisease: false,
        action: 'Apply 1-2% foliar urea spray or enrich root zone with compost and ammonium sulfate.',
        expertNotice: 'Conduct a standard soil N-P-K test if yellowing persists after 5 days.',
      };
    }

    if (leafRegion === 'older' && symptomPattern === 'edges') {
      return {
        category: 'Macronutrient Deficiency',
        primarySuspect: 'Potassium (K) Marginal Scorch',
        confidence: 92,
        explanation:
          'Potassium regulates stomatal water pressure. Deficiency causes outer leaf margins to scorch and dry up into brown edges while center remains green.',
        isDisease: false,
        action: 'Apply Potassium Nitrate (13-0-45) foliar spray or Muriate of Potash to soil.',
        expertNotice: 'Differentiate from salt burn by checking soil electrical conductivity (EC).',
      };
    }

    if (leafRegion === 'younger' && symptomPattern === 'veins') {
      return {
        category: 'Micronutrient Deficiency',
        primarySuspect: 'Iron (Fe) Interveinal Chlorosis',
        confidence: 93,
        explanation:
          'Iron is immobile in plant tissue. Topmost young leaves cannot extract iron, causing brilliant interveinal yellowing with dark green vein network.',
        isDisease: false,
        action: 'Foliar spray of Chelated Iron (Fe-EDTA 12%) @ 1 g/L water in morning hours.',
        expertNotice: 'High alkaline soil pH (>7.5) often locks up iron even if present in soil.',
      };
    }

    if (symptomPattern === 'cupping') {
      return {
        category: 'Viral Infection or Sucking Pest Damage',
        primarySuspect: 'Leaf Curl Virus (TYLCV) / Thrips Damage',
        confidence: 89,
        explanation:
          'Upward leaf curling accompanied by bright yellow margins is caused by Begomovirus transmitted by whiteflies.',
        isDisease: true,
        action: 'Deploy yellow sticky traps and manage insect vectors with neem oil or acetamiprid.',
        expertNotice: 'Viral particles cannot be cured by fertilizer; rogue out infected plants.',
      };
    }

    return {
      category: 'Complex Abiotic / Biotic Interaction',
      primarySuspect: 'Magnesium (Mg) or Phosphorus (P) Deficiency',
      confidence: 84,
      explanation:
        'Interveinal purpling or lower leaf chlorosis consistent with secondary nutrient imbalance.',
      isDisease: false,
      action: 'Apply Epsom salt (Magnesium sulfate @ 5 g/L) and test soil pH.',
      expertNotice: 'Laboratory foliar tissue testing recommended.',
    };
  };

  const diagnosis = computeDiagnosis();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-600"></span>
          <span className="text-xs font-semibold text-emerald-800">
            Agronomic Differential Diagnosis Engine
          </span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 font-serif">
          {t.deficiency.title}
        </h1>
        <p className="mt-1 text-xs text-stone-600">{t.deficiency.subtitle}</p>
      </div>

      {/* Differential Wizard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Field Observation Form (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-5">
            <h2 className="text-sm font-bold text-stone-900 font-serif border-b border-stone-100 pb-2">
              Step 1: Leaf Symptom Geometry & Position
            </h2>

            {/* Question 1: Plant Location */}
            <div>
              <label className="text-xs font-bold text-stone-800 block mb-2">
                1. Where on the plant do symptoms first appear?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'older', label: 'Older / Lower Leaves', hint: 'Nitrogen, Potassium, Magnesium' },
                  { id: 'younger', label: 'Younger / Top Leaves', hint: 'Iron, Calcium, Boron' },
                  { id: 'all', label: 'Scattered / Whole Plant', hint: 'Fungal spores or virus' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setLeafRegion(opt.id as any)}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      leafRegion === opt.id
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-semibold shadow-xs'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <span className="text-xs block">{opt.label}</span>
                    <span className="text-[10px] text-stone-500 block mt-0.5">{opt.hint}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Symptom Pattern */}
            <div>
              <label className="text-xs font-bold text-stone-800 block mb-2">
                2. What is the pattern of discoloration or lesions?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'uniform', label: 'Uniform Yellowing', hint: 'Smooth, entire leaf pale' },
                  { id: 'edges', label: 'Marginal Scorch', hint: 'Burnt leaf edges only' },
                  { id: 'veins', label: 'Interveinal Striping', hint: 'Veins stay dark green' },
                  { id: 'target', label: 'Concentric Spots', hint: 'Ringed circles with halo' },
                  { id: 'cupping', label: 'Curled / Cupped Up', hint: 'Leaves stunted and curled' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSymptomPattern(opt.id as any)}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      symptomPattern === opt.id
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-semibold shadow-xs'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <span className="text-xs block">{opt.label}</span>
                    <span className="text-[10px] text-stone-500 block mt-0.5">{opt.hint}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Necrotic Spot Halos */}
            <div>
              <label className="text-xs font-bold text-stone-800 block mb-2">
                3. Are symptoms smooth and gradual, or discrete isolated spots?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSpotMarginClean('yes')}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    spotMarginClean === 'yes'
                      ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-semibold'
                      : 'border-stone-200 bg-stone-50 text-stone-700'
                  }`}
                >
                  <span className="text-xs font-semibold block">Smooth Gradual Yellowing</span>
                  <span className="text-[10px] text-stone-500 block">No isolated spots with distinct borders</span>
                </button>

                <button
                  onClick={() => setSpotMarginClean('no')}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    spotMarginClean === 'no'
                      ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-semibold'
                      : 'border-stone-200 bg-stone-50 text-stone-700'
                  }`}
                >
                  <span className="text-xs font-semibold block">Discrete Spots & Borders</span>
                  <span className="text-[10px] text-stone-500 block">Dark specks, wet patches, or dead rings</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Comparison Reference Table */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-serif mb-3">
              Essential Field Distinction Matrix
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-500">
                    <th className="pb-2 font-semibold">Diagnostic Attribute</th>
                    <th className="pb-2 font-semibold text-emerald-900">Nutrient Deficiency</th>
                    <th className="pb-2 font-semibold text-amber-900">Pathogenic Disease</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  <tr>
                    <td className="py-2.5 font-medium">Symptom Symmetry</td>
                    <td className="py-2.5">Symmetrical on opposing leaves</td>
                    <td className="py-2.5">Asymmetrical, random spot distribution</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-medium">Foliar Spores / Ooze</td>
                    <td className="py-2.5">Never produces spores or bacterial slime</td>
                    <td className="py-2.5">Often shows molds, white downy fuzz or ooze</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-medium">Speed of Spread</td>
                    <td className="py-2.5">Slow, linked with soil exhaustion</td>
                    <td className="py-2.5">Rapid explosive spread after rain/mist</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-medium">Foliar Feed Response</td>
                    <td className="py-2.5">Greens up in 48-72 hours after spray</td>
                    <td className="py-2.5">Does not respond to fertilizer application</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Differential Verdict & Action Guidance (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <span className="text-[10px] font-mono font-semibold text-stone-400 uppercase">
                Diagnostic Conclusion
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                diagnosis.isDisease
                  ? 'border-amber-300 bg-amber-50 text-amber-800'
                  : 'border-emerald-300 bg-emerald-50 text-emerald-800'
              }`}>
                {diagnosis.confidence}% Diagnostic Match
              </span>
            </div>

            <div>
              <p className="text-xs text-stone-500 font-medium">{diagnosis.category}</p>
              <h3 className="text-lg font-bold text-stone-900 font-serif mt-0.5">
                {diagnosis.primarySuspect}
              </h3>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-200">
              {diagnosis.explanation}
            </p>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 text-xs">
              <p className="font-semibold text-emerald-950 mb-1">Recommended Action:</p>
              <p className="text-emerald-900">{diagnosis.action}</p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-xs">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-950">Expert Agronomist Verification:</p>
                  <p className="text-amber-900 text-[11px] mt-0.5">{diagnosis.expertNotice}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reference Cards for Supported Nutrients */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-serif mb-3">
              Supported Nutrient Deficiencies
            </h3>
            <div className="space-y-3">
              {DEFICIENCIES_DATA.map((def) => (
                <div key={def.id} className="rounded-xl border border-stone-200 p-3 text-xs bg-stone-50/60">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-stone-900">{def.name}</h4>
                    <span className="text-[10px] font-mono text-emerald-800 bg-white px-2 py-0.5 rounded-md border border-stone-200">
                      {def.affectedLeafRegion}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-stone-600 line-clamp-2">
                    {def.distinctionFromDisease}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
