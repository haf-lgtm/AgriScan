import React, { useState, useEffect } from 'react';
import { User, Language, ScanResult } from '../types';
import { translations } from '../data/translations';
import { localDb } from '../services/localDb';
import {
  ScanLine,
  Camera,
  Image,
  Bug,
  Activity,
  BookOpen,
  ShieldCheck,
  CloudSun,
  History,
  FileText,
  Mic,
  Bell,
  HelpCircle,
  Images,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Layers,
  WifiOff,
  Lightbulb,
} from 'lucide-react';

interface DashboardProps {
  currentUser: User | null;
  currentLang: Language;
  onNavigate: (tabId: string) => void;
  onOpenScannerWithMode?: (mode: 'camera' | 'upload') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentUser,
  currentLang,
  onNavigate,
  onOpenScannerWithMode,
}) => {
  const t = translations[currentLang];
  const [scans, setScans] = useState<ScanResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!currentUser) return;
      try {
        const userScans = await localDb.getScansByUser(currentUser.id);
        if (userScans.length === 0) {
          // Pre-seed initial scans for demonstration
          const sample1: ScanResult = {
            id: 'sample_scan_1',
            userId: currentUser.id,
            timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
            imageUrl: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
            cropName: 'Tomato',
            predictedCondition: 'Early Blight (Alternaria solani)',
            pathogenType: 'Fungal',
            confidenceScore: 94,
            severity: 'Moderate',
            visibleSymptoms: [
              'Circular dark brown spots with concentric target rings',
              'Chlorotic yellow halos surrounding necrotic leaf lesions',
            ],
            recommendedSteps: [
              'Isolate lower leaves touching the soil',
              'Apply prophylactic Bordeaux mixture or copper oxychloride',
            ],
            organicTreatments: ['Cold pressed neem oil (3 ml/L)', 'Trichoderma harzianum drench'],
            biologicalControls: ['Bacillus subtilis bio-inoculant'],
            ipmPractices: ['3-year crop rotation', 'Drip irrigation'],
            chemicalTreatments: ['Mancozeb 75% WP @ 2.5 g/L'],
            environmentalRiskScore: 68,
          };

          const sample2: ScanResult = {
            id: 'sample_scan_2',
            userId: currentUser.id,
            timestamp: new Date(Date.now() - 3600000 * 72).toISOString(),
            imageUrl: '/src/assets/images/ladybug_beneficial_1793884803695.jpg',
            cropName: 'Multi-Crop Agro-Ecosystem',
            predictedCondition: 'Seven-Spotted Ladybird Beetle (Coccinellidae)',
            pathogenType: 'Beneficial Insect',
            confidenceScore: 97,
            severity: 'Healthy',
            isBeneficial: true,
            visibleSymptoms: ['Convex oval red elytra with black spots', 'Active aphid hunting predation'],
            recommendedSteps: ['Preserve existing population - DO NOT SPRAY broad spectrum pesticides'],
            organicTreatments: ['Flowering border plants (coriander, fennel) for pollen'],
            biologicalControls: ['Natural biocontrol actively established'],
            ipmPractices: ['Conserve natural ground mulch'],
            chemicalTreatments: ['Withhold synthetic insecticides to protect predator'],
            environmentalRiskScore: 10,
          };

          await localDb.saveScan(sample1);
          await localDb.saveScan(sample2);
          setScans([sample1, sample2]);
        } else {
          setScans(userScans);
        }
      } catch {
        // local db fallback
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [currentUser]);

  // Derived counts strictly matching the user requirement
  const totalScans = scans.length;
  const healthyCropCount = scans.filter((s) => s.pathogenType === 'Healthy' || s.isBeneficial).length;
  const diseaseDetectedCount = scans.filter((s) => s.pathogenType === 'Fungal' || s.pathogenType === 'Bacterial' || s.pathogenType === 'Viral').length;
  const pestDetectedCount = scans.filter((s) => s.pathogenType === 'Pest').length;

  const cropHealthScore = Math.round(
    totalScans > 0
      ? scans.reduce((acc, s) => {
          if (s.severity === 'Critical') return acc + 25;
          if (s.severity === 'Severe') return acc + 45;
          if (s.severity === 'Moderate') return acc + 70;
          if (s.severity === 'Mild') return acc + 85;
          return acc + 96;
        }, 0) / totalScans
      : 88
  );

  return (
    <div className="space-y-6">
      {/* ========================================================
          NEW WELCOME HOMEPAGE SECTION
          "Welcome to AgriScan"
          "Your Intelligent Offline Crop Health & Disease Detection Assistant."
         ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-900/10 bg-linear-to-b from-emerald-900 via-emerald-800 to-emerald-950 p-6 text-white shadow-xl sm:p-10">
        {/* Subtle Decorative Background Leaf Pattern */}
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-emerald-200 backdrop-blur-md border border-white/15">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>100% Offline Edge Intelligence · Zero Cloud Dependency</span>
          </div>

          {/* Main Title & Subtitle */}
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight font-serif sm:text-4xl lg:text-5xl text-white">
            Welcome to AgriScan
          </h1>
          <p className="mt-2 text-base font-medium text-emerald-200 sm:text-lg">
            Your Intelligent Offline Crop Health & Disease Detection Assistant.
          </p>

          <p className="mt-3 text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-3xl">
            Empowering farmers, agronomists, and researchers with instant on-device computer vision. Detect foliar pathogens, identify beneficial vs harmful insects, diagnose nutrient deficiencies, and access comprehensive organic and chemical treatment protocols—completely offline without requiring an active internet connection.
          </p>

          {/* Prominent Action Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {/* Prominent "Get Started" button */}
            <button
              onClick={() => {
                const el = document.getElementById('operational-dashboard');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else if (onOpenScannerWithMode) onOpenScannerWithMode('camera');
                else onNavigate('scanner');
              }}
              className="group flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-xs sm:text-sm font-bold text-emerald-950 shadow-lg hover:bg-amber-300 transition-all hover:scale-102 active:scale-98"
            >
              <Sparkles className="h-4 w-4 text-emerald-950" />
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Quick Diagnostic Launchers */}
            <button
              onClick={() => {
                if (onOpenScannerWithMode) onOpenScannerWithMode('camera');
                else onNavigate('scanner');
              }}
              className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur-md hover:bg-white/25 transition-colors border border-white/20"
            >
              <Camera className="h-4 w-4 text-emerald-300" />
              <span>Camera Scan</span>
            </button>

            <button
              onClick={() => {
                if (onOpenScannerWithMode) onOpenScannerWithMode('upload');
                else onNavigate('scanner');
              }}
              className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur-md hover:bg-white/25 transition-colors border border-white/20"
            >
              <Image className="h-4 w-4 text-emerald-300" />
              <span>Gallery Upload</span>
            </button>

            <button
              onClick={() => onNavigate('encyclopedia')}
              className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-xs sm:text-sm font-semibold text-emerald-200 hover:bg-white/20 transition-colors border border-white/10"
            >
              <BookOpen className="h-4 w-4 text-emerald-300" />
              <span>50+ Preloaded Diseases</span>
            </button>
          </div>

          {/* Preloaded Crops Quick Pill Bar */}
          <div className="mt-8 border-t border-emerald-700/40 pt-5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300/90 block mb-2.5">
              Pre-Integrated Offline Disease Database (Instant Diagnosis):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              <button
                onClick={() => onNavigate('encyclopedia')}
                className="flex flex-col rounded-xl bg-emerald-950/60 p-2.5 text-left border border-emerald-500/20 hover:border-emerald-400/50 hover:bg-emerald-900/50 transition-all"
              >
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <span>🍅</span> Tomato
                </span>
                <span className="text-[10px] text-emerald-300 mt-0.5">17 Conditions Preloaded</span>
              </button>

              <button
                onClick={() => onNavigate('encyclopedia')}
                className="flex flex-col rounded-xl bg-emerald-950/60 p-2.5 text-left border border-emerald-500/20 hover:border-emerald-400/50 hover:bg-emerald-900/50 transition-all"
              >
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <span>🥔</span> Potato
                </span>
                <span className="text-[10px] text-emerald-300 mt-0.5">12 Conditions Preloaded</span>
              </button>

              <button
                onClick={() => onNavigate('encyclopedia')}
                className="flex flex-col rounded-xl bg-emerald-950/60 p-2.5 text-left border border-emerald-500/20 hover:border-emerald-400/50 hover:bg-emerald-900/50 transition-all"
              >
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <span>🍏</span> Apple
                </span>
                <span className="text-[10px] text-emerald-300 mt-0.5">5 Conditions Preloaded</span>
              </button>

              <button
                onClick={() => onNavigate('encyclopedia')}
                className="flex flex-col rounded-xl bg-emerald-950/60 p-2.5 text-left border border-emerald-500/20 hover:border-emerald-400/50 hover:bg-emerald-900/50 transition-all"
              >
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <span>🍇</span> Grapes
                </span>
                <span className="text-[10px] text-emerald-300 mt-0.5">5 Conditions Preloaded</span>
              </button>

              <button
                onClick={() => onNavigate('encyclopedia')}
                className="flex flex-col rounded-xl bg-emerald-950/60 p-2.5 text-left border border-emerald-500/20 hover:border-emerald-400/50 hover:bg-emerald-900/50 transition-all"
              >
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <span>🍌</span> Banana
                </span>
                <span className="text-[10px] text-emerald-300 mt-0.5">4 Conditions Preloaded</span>
              </button>

              <button
                onClick={() => onNavigate('encyclopedia')}
                className="flex flex-col rounded-xl bg-emerald-950/60 p-2.5 text-left border border-emerald-500/20 hover:border-emerald-400/50 hover:bg-emerald-900/50 transition-all"
              >
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <span>🥭</span> Mango
                </span>
                <span className="text-[10px] text-emerald-300 mt-0.5">4 Conditions Preloaded</span>
              </button>

              <button
                onClick={() => onNavigate('encyclopedia')}
                className="flex flex-col rounded-xl bg-emerald-950/60 p-2.5 text-left border border-emerald-500/20 hover:border-emerald-400/50 hover:bg-emerald-900/50 transition-all"
              >
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <span>🍋</span> Citrus
                </span>
                <span className="text-[10px] text-emerald-300 mt-0.5">4 Conditions Preloaded</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* OPERATIONAL DASHBOARD ANCHOR (Takes user here on "Get Started") */}
      <div id="operational-dashboard" className="relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 shadow-xs sm:p-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600"></span>
              <span>{t.offlineStatus} · Autonomous Edge Engine Active</span>
            </div>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-stone-900 font-serif sm:text-2xl">
              {t.auth.welcomeBack}, {currentUser?.fullName || 'Farmer'}
            </h2>
            <p className="mt-1 text-xs text-stone-600 max-w-2xl leading-relaxed">
              Real-time monitoring active for <strong>{currentUser?.mainCrop || 'Cultivated Crops'}</strong> in {currentUser?.district || 'Agricultural Zone'}, {currentUser?.state || 'India'}. All diagnostics run 100% locally on this device.
            </p>
          </div>

          {/* Quick Access to Camera, Gallery & Batch Scanning */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => {
                if (onOpenScannerWithMode) onOpenScannerWithMode('camera');
                else onNavigate('scanner');
              }}
              className="flex items-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors"
            >
              <Camera className="h-4 w-4" />
              <span>Camera Scan</span>
            </button>
            <button
              onClick={() => {
                if (onOpenScannerWithMode) onOpenScannerWithMode('upload');
                else onNavigate('scanner');
              }}
              className="flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
            >
              <Image className="h-4 w-4 text-emerald-800" />
              <span>Gallery Upload</span>
            </button>
            <button
              onClick={() => onNavigate('multiImage')}
              className="flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50/70 px-4 py-2.5 text-xs font-semibold text-emerald-900 hover:bg-emerald-100 transition-colors"
            >
              <Images className="h-4 w-4 text-emerald-800" />
              <span>Multi-Image Batch</span>
            </button>
          </div>
        </div>

        {/* Ambient Farm Info Strip */}
        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-stone-100 pt-4 text-xs text-stone-500">
          <span>Primary Crop: <strong className="text-stone-800">{currentUser?.mainCrop || 'Tomato'}</strong></span>
          <span aria-hidden="true">·</span>
          <span>IndexedDB Status: <strong className="text-stone-800">Active & Persisted</strong></span>
          <span aria-hidden="true">·</span>
          <span>Model Engine: <strong className="text-stone-800">MobileNetV2 Transfer Model + Pathology Classifier</strong></span>
        </div>
      </div>

      {/* Mandatory Counters Grid (Total Scans, Healthy Crop Count, Disease Detected, Pest Detected) */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {/* Total Crop Scans */}
        <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
          <p className="text-xs font-medium text-stone-500">Total Crop Scans</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-stone-900 font-mono tabular-nums">
              {totalScans}
            </span>
            <span className="text-xs text-stone-400">Total</span>
          </div>
          <p className="mt-2 text-[11px] text-stone-500">Indexed locally</p>
        </div>

        {/* Healthy Crop Count */}
        <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
          <p className="text-xs font-medium text-stone-500">Healthy Crop Count</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-emerald-700 font-mono tabular-nums">
              {healthyCropCount}
            </span>
            <span className="text-xs text-emerald-600 font-medium">Optimal</span>
          </div>
          <p className="mt-2 text-[11px] text-stone-500">Vigorous foliage</p>
        </div>

        {/* Disease Detected Count */}
        <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
          <p className="text-xs font-medium text-stone-500">Disease Detected Count</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-amber-700 font-mono tabular-nums">
              {diseaseDetectedCount}
            </span>
            <span className="text-xs text-amber-600 font-medium">Attention</span>
          </div>
          <p className="mt-2 text-[11px] text-stone-500">Fungal/Bacterial/Viral</p>
        </div>

        {/* Pest Detected Count */}
        <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
          <p className="text-xs font-medium text-stone-500">Pest Detected Count</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-red-700 font-mono tabular-nums">
              {pestDetectedCount}
            </span>
            <span className="text-xs text-red-600 font-medium">Alert</span>
          </div>
          <p className="mt-2 text-[11px] text-stone-500">Harmful insects</p>
        </div>
      </div>

      {/* Crop Health Overview & Important Agricultural Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Crop Health Overview (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-stone-900 font-serif">Crop Health Overview</h2>
              <p className="text-xs text-stone-500">Aggregated foliar assessment from local scans</p>
            </div>
            <div className="flex items-baseline gap-1 text-emerald-800">
              <span className="text-xl font-bold font-mono">{cropHealthScore}%</span>
              <span className="text-xs font-semibold">Average Index</span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-stone-700 font-medium">Healthy Foliar Biomass</span>
                <span className="font-mono text-stone-900">{totalScans > 0 ? Math.round((healthyCropCount / totalScans) * 100) : 80}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                  style={{ width: `${totalScans > 0 ? (healthyCropCount / totalScans) * 100 : 80}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-stone-700 font-medium">Pathogen Stress</span>
                <span className="font-mono text-stone-900">{totalScans > 0 ? Math.round((diseaseDetectedCount / totalScans) * 100) : 15}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                <div
                  className="h-full bg-amber-600 rounded-full transition-all duration-500"
                  style={{ width: `${totalScans > 0 ? (diseaseDetectedCount / totalScans) * 100 : 15}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-stone-700 font-medium">Pest Pressure</span>
                <span className="font-mono text-stone-900">{totalScans > 0 ? Math.round((pestDetectedCount / totalScans) * 100) : 5}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
                <div
                  className="h-full bg-red-600 rounded-full transition-all duration-500"
                  style={{ width: `${totalScans > 0 ? (pestDetectedCount / totalScans) * 100 : 5}%` }}
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 text-xs flex items-center justify-between">
            <span className="text-stone-600">Want a comprehensive field summary?</span>
            <button
              onClick={() => onNavigate('healthReport')}
              className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
            >
              <span>View Full Report</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Important Agricultural Tips (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Lightbulb className="h-4 w-4 text-amber-600" />
            <h2 className="text-sm font-bold text-stone-900 font-serif">Important Agricultural Tips</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
              <h4 className="font-bold text-emerald-950">1. Dew Timing & Infection Window</h4>
              <p className="mt-1 text-emerald-900 leading-normal">
                Avoid working or spraying in wet fields before 9:00 AM. Walking through wet rows mechanically spreads fungal spores across healthy foliage.
              </p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3">
              <h4 className="font-bold text-amber-950">2. Protect Beneficial Predators</h4>
              <p className="mt-1 text-amber-900 leading-normal">
                If ladybird beetles or lacewing larvae are active on your crops, delay chemical insecticide sprays by 3-5 days to allow natural biological control to operate.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50 p-3">
              <h4 className="font-bold text-stone-900">3. Lower Canopy Aeration</h4>
              <p className="mt-1 text-stone-600 leading-normal">
                Pruning the bottom 15 cm of foliage touching the ground prevents soil-borne *Alternaria* splash and improves air circulation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Scan Activity */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-sm font-bold text-stone-900 font-serif">Recent Scan Activity</h2>
            <p className="text-xs text-stone-500">Historical records saved in local device storage</p>
          </div>
          <button
            onClick={() => onNavigate('history')}
            className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
          >
            <span>View All Records</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-stone-400">Loading local archive...</div>
        ) : scans.length === 0 ? (
          <div className="py-8 text-center text-xs text-stone-500">
            No scans performed yet. Use Camera or Gallery Scan above to start diagnosing.
          </div>
        ) : (
          <div className="mt-4 divide-y divide-stone-100">
            {scans.slice(0, 4).map((scan) => (
              <div key={scan.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={scan.imageUrl}
                    alt={scan.cropName}
                    className="h-12 w-12 rounded-lg object-cover border border-stone-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-stone-900">{scan.predictedCondition}</h4>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {new Date(scan.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px] text-stone-500">
                      <span>Crop: {scan.cropName}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">Match: {scan.confidenceScore}%</span>
                      <span aria-hidden="true">·</span>
                      <span className={`font-semibold ${
                        scan.severity === 'Critical' ? 'text-red-700' :
                        scan.severity === 'Severe' ? 'text-orange-700' :
                        scan.severity === 'Moderate' ? 'text-amber-700' :
                        'text-emerald-700'
                      }`}>
                        {scan.severity}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('scanner')}
                  className="rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50"
                >
                  Review
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
