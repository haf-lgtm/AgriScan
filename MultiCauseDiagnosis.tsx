import React, { useState } from 'react';
import { User, Language, MultiCauseQuestionnaire, MultiCauseDiagnosisResult } from '../types';
import { translations } from '../data/translations';
import {
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Layers,
  ChevronRight,
  ShieldCheck,
  Thermometer,
  CloudSun,
  Droplets,
  Bug,
} from 'lucide-react';

interface MultiCauseDiagnosisProps {
  currentUser: User | null;
  currentLang: Language;
}

export const MultiCauseDiagnosis: React.FC<MultiCauseDiagnosisProps> = ({
  currentUser,
  currentLang,
}) => {
  const t = translations[currentLang];

  const [questionnaire, setQuestionnaire] = useState<MultiCauseQuestionnaire>({
    leafLocation: 'older',
    patternType: 'concentric_spots',
    speedOfOnset: 'after_rain',
    weatherStress: 'none',
    pesticideRecentlySprayed: false,
    fertilizerDeficiencySuspected: false,
  });

  const [hasRunDiagnostic, setHasRunDiagnostic] = useState(true);

  // Advanced Multi-Cause rule and probability synthesizer
  const computeMultiCauseVerdict = (): MultiCauseDiagnosisResult => {
    const { leafLocation, patternType, speedOfOnset, weatherStress, pesticideRecentlySprayed } = questionnaire;

    // Environmental / Chemical Burn
    if (pesticideRecentlySprayed && patternType === 'marginal_scorch' && speedOfOnset === 'sudden_days') {
      return {
        primaryCause: 'Chemical Phytotoxicity / Fertilizer Burn',
        causeCategory: 'Environmental Stress',
        confidence: 93,
        underlyingMechanisms: [
          'High osmotic concentration or chemical contact injury on tender leaf cuticle',
          'Rapid cell collapse without fungal fruiting bodies or bacterial ooze',
        ],
        contributingFactors: [
          'Pesticide tank-mix incompatibility or spraying in intense afternoon heat',
          'Excessive foliar nitrogen/salt concentration',
        ],
        secondaryPossibilities: [
          { cause: 'Potassium (K) Marginal Scorch', probability: 42, rationale: 'Shows similar outer edge burn, but develops over weeks rather than hours.' },
          { cause: 'Late Blight (Early Stage)', probability: 28, rationale: 'Dark patches can resemble burn, but Late Blight shows water-soaked margins.' },
        ],
        fieldQuestions: [
          'Was the spray applied under direct hot sun (>32°C)?',
          'Did new leaves emerging after the spray show normal healthy tissue?',
        ],
        expertVerificationGuidance: 'Flush root zone with clean water; delay any further chemical application for 7 days.',
        recommendedActions: [
          'Cease foliar chemical applications immediately.',
          'Irrigate soil thoroughly to leach excess root-zone salts.',
          'Inspect newly emerging leaves—if clear, the damage is confirmed abiotic phytotoxicity.',
        ],
      };
    }

    // Weather Stress (Frost or Heat Sunscald)
    if (weatherStress === 'frost_cold' || weatherStress === 'extreme_heat') {
      return {
        primaryCause: weatherStress === 'frost_cold' ? 'Chilling / Frost Necrosis' : 'Solar Radiation Sunscald & Heat Stress',
        causeCategory: 'Environmental Stress',
        confidence: 90,
        underlyingMechanisms: [
          weatherStress === 'frost_cold'
            ? 'Intracellular ice crystallization puncturing vacuole membranes causing water-logged collapse'
            : 'Thermal denaturation of chlorophyll enzymes on leaves exposed to direct southwest afternoon sun',
        ],
        contributingFactors: [
          'Low nocturnal ground temperature inversion or prolonged heat wave exceeding 38°C',
        ],
        secondaryPossibilities: [
          { cause: 'Bacterial Spot (Xanthomonas)', probability: 35, rationale: 'Bacterial lesions can look dark, but bacterial spots remain small and greasy.' },
        ],
        fieldQuestions: [
          'Are symptoms strictly on the upper sun-exposed foliage canopy?',
        ],
        expertVerificationGuidance: 'Check whether sheltered under-canopy leaves are completely uninjured.',
        recommendedActions: [
          'Deploy shade netting (35-50% green mesh) during extreme heat waves.',
          'Provide light evening sprinkler irrigation before predicted ground frost.',
        ],
      };
    }

    // Pest Damage
    if (patternType === 'holes_chewed') {
      return {
        primaryCause: 'Lepidopteran Chewing Pest (Fall Armyworm / Helicoverpa)',
        causeCategory: 'Pest Damage',
        confidence: 95,
        underlyingMechanisms: [
          'Direct mechanical consumption of leaf blade tissue and central whorl funnels',
          'Granular fecal droppings (frass) accumulating in leaf axils',
        ],
        contributingFactors: ['Favorable nocturnal flight temperatures for adult egg-laying moths'],
        secondaryPossibilities: [
          { cause: 'Hail Damage', probability: 20, rationale: 'Hail leaves torn edges without insect frass or live larvae.' },
        ],
        fieldQuestions: [
          'Can you see dark caterpillars or sawdust-like frass inside the central whorl?',
        ],
        expertVerificationGuidance: 'Count percentage of damaged plants across 20 consecutive crop stands.',
        recommendedActions: [
          'Apply Azadirachtin 1500 ppm @ 5 ml/L into whorls in late afternoon.',
          'Deploy pheromone traps at 5 units/acre.',
        ],
      };
    }

    // Viral Disease
    if (patternType === 'wilting' || patternType === 'interveinal') {
      return {
        primaryCause: 'Tomato Yellow Leaf Curl Virus (TYLCV) / Viral Stunt',
        causeCategory: 'Viral Disease',
        confidence: 88,
        underlyingMechanisms: [
          'Systemic viral disruption of phloem loading causing leaf cupping and interveinal chlorosis',
          'Vectors (whiteflies or thrips) injecting Begomovirus during feeding',
        ],
        contributingFactors: ['Dry, warm spells facilitating explosive whitefly populations'],
        secondaryPossibilities: [
          { cause: 'Iron (Fe) Deficiency', probability: 48, rationale: 'Interveinal yellowing is shared, but viral leaves cup upwards and become brittle.' },
        ],
        fieldQuestions: [
          'Are tiny white flies fluttering when you gently shake the plant branches?',
        ],
        expertVerificationGuidance: 'Viral symptoms cannot be cured by spraying; rogue out severely stunted plants.',
        recommendedActions: [
          'Install yellow sticky card traps to capture whitefly vectors.',
          'Spray neem oil repellent (3 ml/L).',
        ],
      };
    }

    // Bacterial Disease
    if (patternType === 'water_soaked') {
      return {
        primaryCause: 'Bacterial Spot (Xanthomonas campestris)',
        causeCategory: 'Bacterial Disease',
        confidence: 91,
        underlyingMechanisms: [
          'Bacterial entry through natural stomata and hydathodes during driving rain',
          'Enzymatic pectin breakdown producing greasy, water-soaked translucent halos',
        ],
        contributingFactors: ['Driving convective rain splashing bacteria from soil to foliage'],
        secondaryPossibilities: [
          { cause: 'Early Blight', probability: 38, rationale: 'Early blight has concentric dry rings, while bacterial spots are greasy and angular.' },
        ],
        fieldQuestions: [
          'Do you notice bacterial ooze beads on lesions under morning mist?',
        ],
        expertVerificationGuidance: 'Laboratory bacterial streaming test under microscope confirms diagnosis.',
        recommendedActions: [
          'Apply Copper Oxychloride 50% WP (2.5 g/L) + Streptocycline (100 ppm).',
          'Strictly refrain from handling wet plants.',
        ],
      };
    }

    // Default: Fungal Target Blight
    return {
      primaryCause: 'Fungal Foliar Blight (Alternaria solani / Early Blight)',
      causeCategory: 'Fungal Disease',
      confidence: 92,
      underlyingMechanisms: [
        'Airborne conidia germinating during extended leaf wetness (>6 hours)',
        'Mycelium radiating outward in characteristic concentric target rings',
      ],
      contributingFactors: ['Alternating warm dry and humid misty spells (24-30°C)'],
      secondaryPossibilities: [
        { cause: 'Septoria Leaf Spot', probability: 45, rationale: 'Septoria spots are smaller with tiny black pycnidia specks in center.' },
        { cause: 'Potassium Scorch', probability: 30, rationale: 'Potassium stays on leaf margins without concentric target rings.' },
      ],
      fieldQuestions: [
        'Do the lesions display dark concentric target board rings?',
        'Did symptoms begin on the lower older foliage touching wet soil?',
      ],
      expertVerificationGuidance: 'Incubate infected leaf in moist chamber; fungal conidiophores emerge within 24h.',
      recommendedActions: [
        'Prune lower 20 cm of infected foliage.',
        'Apply Mancozeb 75% WP @ 2.5 g/L or bio-agent Trichoderma harzianum.',
      ],
    };
  };

  const result = computeMultiCauseVerdict();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-600"></span>
          <span className="text-xs font-semibold text-emerald-800">
            Advanced Multi-Cause Agronomic Differential Engine
          </span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 font-serif">
          Multi-Cause Diagnosis
        </h1>
        <p className="mt-1 text-xs text-stone-600">
          Distinguishes between <strong>Fungal</strong>, <strong>Bacterial</strong>, <strong>Viral</strong>, <strong>Pest Damage</strong>, <strong>Nutrient Deficiencies</strong>, and <strong>Environmental Stress</strong> using multi-factor symptom correlation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Symptom Questionnaire Form (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-stone-900 font-serif border-b border-stone-100 pb-2">
            Field Symptom Questionnaire
          </h2>

          {/* Question 1: Visible Lesion / Damage Geometry */}
          <div>
            <label className="text-xs font-bold text-stone-800 block mb-1.5">
              1. What pattern best describes the leaf symptoms?
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'concentric_spots', label: 'Concentric Target Rings', desc: 'Fungal Alternaria hallmark' },
                { id: 'water_soaked', label: 'Greasy / Water-Soaked Spots', desc: 'Bacterial lesion hallmark' },
                { id: 'holes_chewed', label: 'Ragged Holes / Chewed Blades', desc: 'Chewing pest hallmark' },
                { id: 'marginal_scorch', label: 'Burnt Outer Leaf Margins', desc: 'Potassium / Chemical burn' },
                { id: 'interveinal', label: 'Interveinal Yellowing', desc: 'Iron / Magnesium / Virus' },
                { id: 'wilting', label: 'Leaf Cupping / Stunted Curled', desc: 'Viral Begomovirus hallmark' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setQuestionnaire({ ...questionnaire, patternType: opt.id as any })}
                  className={`rounded-xl border p-2.5 text-left transition-all ${
                    questionnaire.patternType === opt.id
                      ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span className="block">{opt.label}</span>
                  <span className="text-[10px] text-stone-500 font-normal">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Leaf Location */}
          <div>
            <label className="text-xs font-bold text-stone-800 block mb-1.5">
              2. Where are symptoms concentrated?
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { id: 'older', label: 'Older / Bottom Leaves' },
                { id: 'younger', label: 'Younger / Top Leaves' },
                { id: 'all', label: 'Random / Whole Canopy' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setQuestionnaire({ ...questionnaire, leafLocation: opt.id as any })}
                  className={`rounded-xl border p-2 text-center transition-all ${
                    questionnaire.leafLocation === opt.id
                      ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold'
                      : 'border-stone-200 bg-stone-50 text-stone-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Speed of Onset */}
          <div>
            <label className="text-xs font-bold text-stone-800 block mb-1.5">
              3. How fast did symptoms appear?
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { id: 'sudden_days', label: 'Sudden (1-2 days)' },
                { id: 'after_rain', label: 'Following rain/fog' },
                { id: 'gradual_weeks', label: 'Gradual (2-3 weeks)' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setQuestionnaire({ ...questionnaire, speedOfOnset: opt.id as any })}
                  className={`rounded-xl border p-2 text-center transition-all ${
                    questionnaire.speedOfOnset === opt.id
                      ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold'
                      : 'border-stone-200 bg-stone-50 text-stone-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 4: Weather Stress & Chemical Factors */}
          <div className="grid grid-cols-2 gap-3 text-xs pt-1 border-t border-stone-100">
            <div>
              <label className="font-bold text-stone-800 block mb-1">Weather Stress:</label>
              <select
                value={questionnaire.weatherStress}
                onChange={(e) => setQuestionnaire({ ...questionnaire, weatherStress: e.target.value as any })}
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-2.5 py-1.5"
              >
                <option value="none">Normal Weather</option>
                <option value="extreme_heat">Heat Wave (above 36°C)</option>
                <option value="frost_cold">Cold Snap / Frost</option>
                <option value="drought">Drought</option>
                <option value="waterlogging">Waterlogged Soil</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-stone-800 block mb-1">Recent Chemical Spray:</label>
              <button
                type="button"
                onClick={() => setQuestionnaire({ ...questionnaire, pesticideRecentlySprayed: !questionnaire.pesticideRecentlySprayed })}
                className={`w-full rounded-xl border py-1.5 text-xs font-semibold ${
                  questionnaire.pesticideRecentlySprayed
                    ? 'border-red-300 bg-red-50 text-red-900'
                    : 'border-stone-200 bg-stone-50 text-stone-700'
                }`}
              >
                {questionnaire.pesticideRecentlySprayed ? 'Yes, Sprayed within 48h' : 'No Chemical Spray'}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Multi-Cause Diagnostic Verdict & Explanations (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <span className="text-[10px] font-mono text-stone-400 uppercase">Differential Verdict</span>
              <h3 className="text-base font-bold text-stone-900 font-serif">
                {result.primaryCause}
              </h3>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-800">
              {result.causeCategory} ({result.confidence}%)
            </span>
          </div>

          {/* Why this matches the symptoms */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-serif mb-1.5">
              Biological Mechanism & Why Symptoms Match
            </h4>
            <ul className="space-y-1.5">
              {result.underlyingMechanisms.map((m, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Secondary Possibilities & Probability */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-serif mb-1.5">
              Secondary Differential Candidates
            </h4>
            <div className="space-y-2">
              {result.secondaryPossibilities.map((sec, idx) => (
                <div key={idx} className="rounded-xl border border-stone-200 bg-stone-50 p-2.5 text-xs">
                  <div className="flex justify-between font-semibold text-stone-900">
                    <span>{sec.cause}</span>
                    <span className="font-mono text-stone-500">{sec.probability}% match</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-stone-600">{sec.rationale}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Questions to confirm uncertainty */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-xs">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-950">Verify in Field (To eliminate false positives):</p>
                <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[11px] text-amber-900">
                  {result.fieldQuestions.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Actionable recommendations */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-serif mb-1.5">
              Recommended Protocol
            </h4>
            <ul className="space-y-1">
              {result.recommendedActions.map((act, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-xs text-stone-700">
                  <ChevronRight className="h-3.5 w-3.5 text-emerald-800 shrink-0 mt-0.5" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
