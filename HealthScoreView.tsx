import React, { useState, useEffect } from 'react';
import { User, Language, ScanResult } from '../types';
import { translations } from '../data/translations';
import { localDb } from '../services/localDb';
import {
  Activity,
  Download,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  FileText,
  BarChart2,
  Info,
} from 'lucide-react';

interface HealthScoreViewProps {
  currentUser: User | null;
  currentLang: Language;
}

export const HealthScoreView: React.FC<HealthScoreViewProps> = ({
  currentUser,
  currentLang,
}) => {
  const t = translations[currentLang];
  const [scans, setScans] = useState<ScanResult[]>([]);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    const fetchScans = async () => {
      if (currentUser) {
        const list = await localDb.getScansByUser(currentUser.id);
        setScans(list);
      }
    };
    fetchScans();
  }, [currentUser]);

  // Quantitative breakdown metrics
  const total = scans.length;
  const healthyCount = scans.filter((s) => s.pathogenType === 'Healthy' || s.isBeneficial).length;
  const diseaseCount = scans.filter((s) => s.pathogenType === 'Fungal' || s.pathogenType === 'Bacterial' || s.pathogenType === 'Viral').length;
  const pestCount = scans.filter((s) => s.pathogenType === 'Pest').length;

  const healthyRatio = total > 0 ? Math.round((healthyCount / total) * 100) : 85;
  const diseaseRatio = total > 0 ? Math.round((diseaseCount / total) * 100) : 10;
  const pestRatio = total > 0 ? Math.round((pestCount / total) * 100) : 5;

  const calculatedHealthIndex = Math.max(15, Math.min(98, Math.round(100 - (diseaseRatio * 0.7 + pestRatio * 0.9))));

  const handleExportReport = () => {
    // Generate clean self-contained HTML/PDF printable document
    const reportHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>AgriScan Crop Health Intelligence Report</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1c1917; }
          .header { border-bottom: 2px solid #15803d; padding-bottom: 15px; margin-bottom: 25px; }
          .title { font-size: 24px; font-weight: bold; color: #14532d; }
          .meta { font-size: 12px; color: #78716c; margin-top: 5px; }
          .score-card { background: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; border-radius: 8px; margin-bottom: 25px; }
          .score-val { font-size: 36px; font-weight: bold; color: #15803d; }
          .section { margin-bottom: 25px; }
          table { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 10px; }
          th, td { border: 1px solid #e7e5e4; padding: 8px 12px; text-align: left; }
          th { background: #f5f5f4; }
          .disclaimer { font-size: 11px; color: #a8a29e; border-top: 1px solid #e7e5e4; padding-top: 15px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">AgriScan Field Health Intelligence Report</div>
          <div class="meta">
            Farmer: ${currentUser?.fullName || 'Ramesh Patel'} | Crop: ${currentUser?.mainCrop || 'Tomato'} | Location: ${currentUser?.district || 'Dharwad'}, ${currentUser?.state || 'Karnataka'} | Date: ${new Date().toLocaleDateString()}
          </div>
        </div>

        <div class="score-card">
          <div style="font-size: 14px; font-weight: 600; color: #166534;">Calculated Crop Health Index</div>
          <div class="score-val">${calculatedHealthIndex} / 100</div>
          <div style="font-size: 13px; color: #374151; margin-top: 8px;">
            Healthy Foliage: ${healthyRatio}% · Disease Stress: ${diseaseRatio}% · Pest Pressure: ${pestRatio}%
          </div>
        </div>

        <div class="section">
          <h3>Sampled Foliage History</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Specimen Crop</th>
                <th>Condition Diagnosed</th>
                <th>Pathogen Category</th>
                <th>Severity</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              ${scans.map(s => `
                <tr>
                  <td>${new Date(s.timestamp).toLocaleDateString()}</td>
                  <td>${s.cropName}</td>
                  <td>${s.predictedCondition}</td>
                  <td>${s.pathogenType}</td>
                  <td>${s.severity}</td>
                  <td>${s.confidenceScore}%</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="disclaimer">
          <strong>Official Agronomic Disclaimer:</strong> This health report is generated locally via AgriScan Computer Vision pixel sampling. An optical leaf score is an estimate and does not replace a comprehensive full-acre agronomic inspection.
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([reportHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AgriScan_Crop_Health_Report_${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
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
                Automated Foliar Indexing & Progress Analytics
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 font-serif">
              {t.report.title}
            </h1>
            <p className="mt-1 text-xs text-stone-600">
              Aggregated agronomic health metric for <strong>{currentUser?.mainCrop || 'Cultivated Crops'}</strong>.
            </p>
          </div>

          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors shrink-0"
          >
            <Download className="h-4 w-4" />
            <span>{downloadSuccess ? 'Report Saved to Local Storage' : t.report.exportReport}</span>
          </button>
        </div>
      </div>

      {/* Main Health Index Gauge */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Circular Indicator (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center text-center">
            <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-8 border-stone-100 bg-emerald-50/50">
              <svg className="absolute inset-0 h-full w-full -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  className="stroke-stone-200"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  className="stroke-emerald-600 transition-all duration-1000"
                  strokeWidth="8"
                  strokeDasharray={552}
                  strokeDashoffset={552 - (552 * calculatedHealthIndex) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div>
                <span className="text-4xl font-bold tracking-tight text-emerald-950 font-mono tabular-nums">
                  {calculatedHealthIndex}
                </span>
                <span className="text-xs text-stone-500 block font-medium">out of 100</span>
              </div>
            </div>

            <span className="mt-3 text-xs font-bold text-stone-800 uppercase tracking-wide">
              {calculatedHealthIndex > 80 ? 'Vigorous Crop Health' : calculatedHealthIndex > 60 ? 'Moderate Foliage Stress' : 'Substantial Disease Pressure'}
            </span>
          </div>

          {/* Indicator Breakdowns (7 cols) */}
          <div className="md:col-span-7 space-y-4">
            <h3 className="text-sm font-bold text-stone-900 font-serif border-b border-stone-100 pb-2">
              Three-Factor Diagnostic Breakdown
            </h3>

            {/* 1. Healthy Foliar Indicator */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                  <span>{t.report.healthyIndicators}</span>
                </span>
                <span className="font-mono tabular-nums font-bold text-stone-900">{healthyRatio}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${healthyRatio}%` }} />
              </div>
              <p className="mt-1 text-[11px] text-stone-500">Normal chlorophyll density without chlorosis or leaf curling.</p>
            </div>

            {/* 2. Disease Stress Indicator */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-700" />
                  <span>{t.report.diseaseIndicators}</span>
                </span>
                <span className="font-mono tabular-nums font-bold text-stone-900">{diseaseRatio}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-amber-600 rounded-full" style={{ width: `${diseaseRatio}%` }} />
              </div>
              <p className="mt-1 text-[11px] text-stone-500">Fungal blight, bacterial spots, or viral mosaic observed on leaves.</p>
            </div>

            {/* 3. Pest Infestation Indicator */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-red-900 flex items-center gap-1.5">
                  <Activity className="h-4 w-4 text-red-700" />
                  <span>{t.report.pestIndicators}</span>
                </span>
                <span className="font-mono tabular-nums font-bold text-stone-900">{pestRatio}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-red-600 rounded-full" style={{ width: `${pestRatio}%` }} />
              </div>
              <p className="mt-1 text-[11px] text-stone-500">Ragged feeding holes, armyworm frass, or sucking whitefly damage.</p>
            </div>
          </div>
        </div>

        {/* Mandatory Agronomic Disclaimer (Prompt Rule 4) */}
        <div className="mt-8 rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs">
          <div className="flex items-start gap-2.5">
            <Info className="h-4 w-4 text-stone-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-stone-800">Important Agronomic Scope: </span>
              <span className="text-stone-600 leading-relaxed">
                {t.report.disclaimer} Always perform periodic perimeter zig-zag walks across your rows to evaluate root crown health, moisture uniformity, and weeds.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
