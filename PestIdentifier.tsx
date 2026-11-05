import React, { useState } from 'react';
import { User, Language, ScanResult } from '../types';
import { translations } from '../data/translations';
import { runPestInference } from '../services/visionEngine';
import { PESTS_DATA, BENEFICIAL_INSECTS_DATA } from '../data/encyclopediaData';
import { localDb } from '../services/localDb';
import {
  Bug,
  ShieldCheck,
  AlertTriangle,
  Upload,
  RefreshCw,
  Heart,
  Ban,
  CheckCircle2,
  Info,
} from 'lucide-react';

interface PestIdentifierProps {
  currentUser: User | null;
  currentLang: Language;
}

export const PestIdentifier: React.FC<PestIdentifierProps> = ({
  currentUser,
  currentLang,
}) => {
  const t = translations[currentLang];
  const [activeTab, setActiveTab] = useState<'scan' | 'harmful' | 'beneficial'>('scan');
  const [imageSrc, setImageSrc] = useState<string>('/src/assets/images/fall_armyworm_pest_1793884804393.jpg');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const samplePestSpecimens = [
    {
      label: 'Fall Armyworm (Harmful Pest)',
      type: 'pest',
      path: '/src/assets/images/fall_armyworm_pest_1793884804393.jpg',
      desc: 'Destructive caterpillar boring into maize whorls',
    },
    {
      label: 'Ladybird Beetle (Beneficial Friend)',
      type: 'beneficial',
      path: '/src/assets/images/ladybug_beneficial_1793884803695.jpg',
      desc: 'Predatory insect devouring aphids and whiteflies',
    },
  ];

  const handleRunScan = async (src: string = imageSrc) => {
    setIsAnalyzing(true);
    try {
      const res = await runPestInference(src);
      setResult(res);
      await localDb.saveScan(res);
    } catch {
      // error fallback
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectSample = (sample: typeof samplePestSpecimens[0]) => {
    setImageSrc(sample.path);
    setResult(null);
    handleRunScan(sample.path);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        setImageSrc(url);
        setResult(null);
        handleRunScan(url);
      };
      reader.readAsDataURL(file);
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
                Biological Entomology & Agro-Ecology Engine
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 font-serif">
              {t.pests.title}
            </h1>
            <p className="mt-1 text-xs text-stone-600">{t.pests.subtitle}</p>
          </div>

          <div className="flex items-center gap-1 rounded-xl bg-stone-100 p-1">
            <button
              onClick={() => setActiveTab('scan')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === 'scan' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Insect Classifier
            </button>
            <button
              onClick={() => setActiveTab('beneficial')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === 'beneficial' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t.pests.beneficialInsects}
            </button>
            <button
              onClick={() => setActiveTab('harmful')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === 'harmful' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t.pests.harmfulPests}
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'scan' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Specimen Viewer & Upload (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-stone-200 bg-stone-950 shadow-xs flex items-center justify-center">
              <img
                src={imageSrc}
                alt="Insect specimen"
                className="h-full w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Specimen Picker */}
            <div className="rounded-xl border border-stone-200 bg-white p-4">
              <p className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2 font-serif">
                Select Calibrated Insect Specimen
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {samplePestSpecimens.map((sample) => (
                  <button
                    key={sample.label}
                    onClick={() => handleSelectSample(sample)}
                    className={`flex items-center gap-3 rounded-lg border p-2.5 text-left transition-all ${
                      imageSrc === sample.path
                        ? 'border-emerald-700 bg-emerald-50/50 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50/40'
                    }`}
                  >
                    <img
                      src={sample.path}
                      alt={sample.label}
                      className="h-14 w-14 rounded-md object-cover border border-stone-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="text-xs font-bold text-stone-900 block">{sample.label}</span>
                      <span className="text-[11px] text-stone-500 line-clamp-1">{sample.desc}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-3">
                <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 hover:underline">
                  <Upload className="h-3.5 w-3.5" />
                  <span>Upload Custom Insect Photo</span>
                  <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                </label>

                <button
                  onClick={() => handleRunScan()}
                  disabled={isAnalyzing}
                  className="rounded-xl bg-emerald-800 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700"
                >
                  {isAnalyzing ? 'Analyzing Morphology...' : 'Classify Specimen'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: AI Insect Report (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {!result && !isAnalyzing ? (
              <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-xs">
                <Bug className="mx-auto h-8 w-8 text-emerald-700 mb-2" />
                <h3 className="text-sm font-bold text-stone-900 font-serif">Pest vs Friend Diagnostic Ready</h3>
                <p className="mt-1 text-xs text-stone-500">
                  Select an insect specimen above or upload a photo to identify whether it is a damaging crop pest or a beneficial predator.
                </p>
                <button
                  onClick={() => handleRunScan()}
                  className="mt-4 rounded-xl bg-emerald-800 px-4 py-2 text-xs font-semibold text-white"
                >
                  Analyze Specimen
                </button>
              </div>
            ) : isAnalyzing ? (
              <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-xs">
                <RefreshCw className="mx-auto h-7 w-7 text-emerald-700 animate-spin mb-2" />
                <p className="text-xs font-semibold text-stone-800">Examining morphological patterns...</p>
              </div>
            ) : result ? (
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
                {/* Status Callout (Crucial Anti-Pesticide Protection for Beneficial Friends) */}
                {result.isBeneficial ? (
                  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4">
                    <div className="flex items-start gap-3">
                      <Heart className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5 fill-emerald-100" />
                      <div>
                        <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                          {t.pests.beneficialBadge}
                        </h4>
                        <p className="mt-1 text-xs font-medium text-emerald-900 leading-relaxed">
                          {t.pests.protectFriendly}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                          {t.pests.harmfulBadge}
                        </h4>
                        <p className="mt-1 text-xs font-medium text-amber-900">
                          Economic threshold intervention required to prevent foliage loss.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <span className="text-[10px] font-mono text-stone-400 uppercase">Classification</span>
                  <h3 className="text-base font-bold text-stone-900 font-serif">
                    {result.predictedCondition}
                  </h3>
                  <div className="mt-2 flex items-center gap-3 text-xs text-stone-600">
                    <span>Confidence: <strong className="text-stone-900 font-mono">{result.confidenceScore}%</strong></span>
                    <span aria-hidden="true">·</span>
                    <span>Infestation Severity: <strong className="text-stone-900">{result.severity}</strong></span>
                  </div>
                </div>

                {/* Biological Role / Damage Symptoms */}
                <div>
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-serif">
                    {result.isBeneficial ? 'Ecological Predation Benefit' : 'Typical Crop Damage Caused'}
                  </h4>
                  <ul className="mt-2 space-y-1.5">
                    {result.visibleSymptoms.map((sym, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-stone-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Safe Prevention & IPM Control */}
                <div>
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-serif">
                    {result.isBeneficial ? 'How to Conserve & Attract' : 'Safe IPM Prevention Methods'}
                  </h4>
                  <ul className="mt-2 space-y-1.5">
                    {result.recommendedSteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-stone-700">
                        <Info className="h-3.5 w-3.5 text-stone-500 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Organic & Biological Recommendation */}
                <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 text-xs space-y-2">
                  <p className="font-semibold text-stone-900">Targeted Biological Control:</p>
                  <p className="text-[11px] text-stone-600 leading-normal">
                    {result.organicTreatments[0] || 'Observe 48-hour monitoring interval before applying any bio-formulation.'}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Beneficial Insects Catalog View */}
      {activeTab === 'beneficial' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 text-xs text-emerald-950">
            <h3 className="font-bold text-sm">Beneficial Insect Protection Charter</h3>
            <p className="mt-1 leading-relaxed">
              Indiscriminate chemical insecticide spraying kills beneficial predators faster than pests, leading to catastrophic pest resurgence. Conserve these predatory insects to provide continuous free biological protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BENEFICIAL_INSECTS_DATA.map((ben) => (
              <div key={ben.id} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <img
                    src={ben.image}
                    alt={ben.name}
                    className="h-36 w-full object-cover rounded-xl border border-stone-200 mb-3"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[10px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Friend / Biocontrol
                  </span>
                  <h3 className="text-sm font-bold text-stone-900 font-serif mt-2">{ben.name}</h3>
                  <p className="text-[11px] text-stone-500 italic">{ben.scientificName}</p>

                  <p className="mt-2 text-xs text-stone-700 leading-normal">
                    {ben.ecologicalBenefit}
                  </p>

                  <div className="mt-3 border-t border-stone-100 pt-2 text-[11px] text-stone-600 space-y-1">
                    <p><strong>Preys on:</strong> {ben.preysOn.join(', ')}</p>
                    <p><strong>Crops protected:</strong> {ben.cropsProtected.join(', ')}</p>
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-stone-50 p-2.5 text-[11px] text-stone-700">
                  <span className="font-semibold text-emerald-900">Farmer practice: </span>
                  {ben.safeFarmingPractice}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Harmful Pests Catalog View */}
      {activeTab === 'harmful' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PESTS_DATA.map((pest) => (
            <div key={pest.id} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div>
                <img
                  src={pest.image}
                  alt={pest.name}
                  className="h-36 w-full object-cover rounded-xl border border-stone-200 mb-3"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[10px] font-mono font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {pest.infestationSeverity} Infestation Risk
                </span>
                <h3 className="text-sm font-bold text-stone-900 font-serif mt-2">{pest.name}</h3>
                <p className="text-[11px] text-stone-500 italic">{pest.scientificName}</p>

                <div className="mt-3 text-xs text-stone-700">
                  <p className="font-semibold text-stone-900 mb-1">Damage Symptoms:</p>
                  <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-stone-600">
                    {pest.damageSymptoms.slice(0, 2).map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 border-t border-stone-100 pt-3">
                <p className="text-[11px] font-semibold text-emerald-900">Recommended Organic Control:</p>
                <p className="text-[11px] text-stone-600 mt-0.5">{pest.organicControls[0]}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
