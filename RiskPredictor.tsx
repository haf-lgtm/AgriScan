import React, { useState } from 'react';
import { User, Language, EnvironmentalRiskInput, RiskPredictionResult } from '../types';
import { translations } from '../data/translations';
import { calculateEnvironmentalRisk } from '../services/riskEngine';
import {
  CloudSun,
  Thermometer,
  Droplets,
  CloudRain,
  Sprout,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
} from 'lucide-react';

interface RiskPredictorProps {
  currentUser: User | null;
  currentLang: Language;
}

export const RiskPredictor: React.FC<RiskPredictorProps> = ({
  currentUser,
  currentLang,
}) => {
  const t = translations[currentLang];

  const [input, setInput] = useState<EnvironmentalRiskInput>({
    temperatureC: 22,
    relativeHumidity: 88,
    rainfallMm: 18,
    cropType: currentUser?.mainCrop || 'Tomato',
    growthStage: 'Vegetative',
    soilMoisture: 'Optimal',
  });

  const [prediction, setPrediction] = useState<RiskPredictionResult>(() =>
    calculateEnvironmentalRisk({
      temperatureC: 22,
      relativeHumidity: 88,
      rainfallMm: 18,
      cropType: currentUser?.mainCrop || 'Tomato',
      growthStage: 'Vegetative',
      soilMoisture: 'Optimal',
    })
  );

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateEnvironmentalRisk(input);
    setPrediction(result);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-600"></span>
          <span className="text-xs font-semibold text-emerald-800">
            Offline Agro-Epidemiology Disease Triangle Model
          </span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 font-serif">
          {t.risk.title}
        </h1>
        <p className="mt-1 text-xs text-stone-600">{t.risk.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Meteorological Inputs (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
          <h2 className="text-sm font-bold text-stone-900 font-serif border-b border-stone-100 pb-3">
            Microclimatic Field Parameters
          </h2>

          <form onSubmit={handleCalculate} className="mt-4 space-y-4">
            {/* Crop Type */}
            <div>
              <label className="block text-xs font-semibold text-stone-700">Target Crop</label>
              <select
                value={input.cropType}
                onChange={(e) => setInput({ ...input, cropType: e.target.value })}
                className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-hidden"
              >
                <option value="Tomato">Tomato</option>
                <option value="Potato">Potato</option>
                <option value="Rice (Paddy)">Rice (Paddy)</option>
                <option value="Maize / Corn">Maize / Corn</option>
              </select>
            </div>

            {/* Growth Stage */}
            <div>
              <label className="block text-xs font-semibold text-stone-700">{t.risk.growthStage}</label>
              <select
                value={input.growthStage}
                onChange={(e) => setInput({ ...input, growthStage: e.target.value as any })}
                className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-hidden"
              >
                <option value="Seedling">Seedling / Nursery Stage</option>
                <option value="Vegetative">Vegetative Canopy Growth</option>
                <option value="Flowering">Flowering / Inflorescence</option>
                <option value="Fruit/Grain Filling">Fruit / Grain Filling</option>
                <option value="Maturity">Maturity / Pre-Harvest</option>
              </select>
            </div>

            {/* Temperature Slider */}
            <div>
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-stone-700 flex items-center gap-1.5">
                  <Thermometer className="h-3.5 w-3.5 text-stone-500" />
                  <span>{t.risk.temp}</span>
                </label>
                <span className="font-mono font-bold tabular-nums text-stone-900">{input.temperatureC}°C</span>
              </div>
              <input
                type="range"
                min="5"
                max="45"
                value={input.temperatureC}
                onChange={(e) => setInput({ ...input, temperatureC: Number(e.target.value) })}
                className="mt-2 w-full accent-emerald-700"
              />
            </div>

            {/* Relative Humidity Slider */}
            <div>
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-stone-700 flex items-center gap-1.5">
                  <Droplets className="h-3.5 w-3.5 text-blue-500" />
                  <span>{t.risk.humidity}</span>
                </label>
                <span className="font-mono font-bold tabular-nums text-stone-900">{input.relativeHumidity}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={input.relativeHumidity}
                onChange={(e) => setInput({ ...input, relativeHumidity: Number(e.target.value) })}
                className="mt-2 w-full accent-blue-600"
              />
            </div>

            {/* Rainfall Slider */}
            <div>
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-stone-700 flex items-center gap-1.5">
                  <CloudRain className="h-3.5 w-3.5 text-indigo-500" />
                  <span>{t.risk.rainfall}</span>
                </label>
                <span className="font-mono font-bold tabular-nums text-stone-900">{input.rainfallMm} mm</span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={input.rainfallMm}
                onChange={(e) => setInput({ ...input, rainfallMm: Number(e.target.value) })}
                className="mt-2 w-full accent-indigo-600"
              />
            </div>

            {/* Soil Condition */}
            <div>
              <label className="block text-xs font-semibold text-stone-700">{t.risk.soilCondition}</label>
              <div className="mt-1 grid grid-cols-3 gap-2">
                {['Dry', 'Optimal', 'Waterlogged'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setInput({ ...input, soilMoisture: s as any })}
                    className={`rounded-xl border py-2 text-xs font-medium transition-colors ${
                      input.soilMoisture === s
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-emerald-800 py-3 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700"
            >
              {t.risk.calculateRisk}
            </button>
          </form>
        </div>

        {/* Right: Epidemiological Risk Dashboard (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-stone-400 uppercase">Risk Evaluation</span>
                <h3 className="text-base font-bold text-stone-900 font-serif">
                  {prediction.cropType} Environmental Risk Index
                </h3>
              </div>

              <div className="text-right">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  prediction.overallRiskLevel === 'Severe' ? 'border-red-300 bg-red-50 text-red-800' :
                  prediction.overallRiskLevel === 'High' ? 'border-amber-300 bg-amber-50 text-amber-800' :
                  prediction.overallRiskLevel === 'Moderate' ? 'border-stone-300 bg-stone-100 text-stone-800' :
                  'border-emerald-300 bg-emerald-50 text-emerald-800'
                }`}>
                  {prediction.overallRiskLevel} Risk ({prediction.riskScore}%)
                </span>
              </div>
            </div>

            {/* Disease Vulnerability Cards */}
            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-serif mb-2">
                Pathogens Favored by Current Microclimate
              </h4>
              <div className="space-y-3">
                {prediction.primaryVulnerabilities.map((vuln, i) => (
                  <div key={i} className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900">{vuln.diseaseName}</span>
                      <span className="font-mono font-semibold text-amber-800">
                        Favorability: {vuln.riskIndex}%
                      </span>
                    </div>

                    <p className="text-[11px] text-stone-600 leading-normal">
                      <strong>Microclimate trigger:</strong> {vuln.favoredReason}
                    </p>

                    <div className="border-t border-stone-200/60 pt-2">
                      <p className="font-semibold text-emerald-950 text-[11px] mb-1">
                        Preemptive Agricultural Shield:
                      </p>
                      <ul className="space-y-1">
                        {vuln.preventativeMeasures.map((pm, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-[11px] text-stone-700">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 shrink-0 mt-0.5" />
                            <span>{pm}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actionable Field Inspection Advisory */}
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs">
              <div className="flex items-start gap-2.5">
                <Calendar className="h-4 w-4 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-stone-900">Recommended Scouting Frequency:</h4>
                  <p className="mt-0.5 text-stone-600 leading-normal">
                    {prediction.inspectionRecommendation}
                  </p>
                </div>
              </div>
            </div>

            {/* Critical Distinction Disclaimer (Prompt Rule 7) */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-[11px] text-amber-950">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Epidemiological Distinction Notice: </strong>
                  <span>{t.risk.riskDisclaimer} Always verify symptoms on foliage with AI Crop Scanner before initiating any intervention.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
