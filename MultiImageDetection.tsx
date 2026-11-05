import React, { useState, useRef } from 'react';
import { User, Language, MultiImageBatchItem, MultiImageBatchReport, ScanResult } from '../types';
import { translations } from '../data/translations';
import { runOfflineInference } from '../services/visionEngine';
import { localDb } from '../services/localDb';
import {
  Images,
  Camera,
  Upload,
  Trash2,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Layers,
  ChevronRight,
  ShieldCheck,
  Plus,
} from 'lucide-react';

interface MultiImageDetectionProps {
  currentUser: User | null;
  currentLang: Language;
}

export const MultiImageDetection: React.FC<MultiImageDetectionProps> = ({
  currentUser,
  currentLang,
}) => {
  const t = translations[currentLang];
  const [selectedCrop, setSelectedCrop] = useState<string>(currentUser?.mainCrop || 'Tomato');
  const [samePlantConfirmed, setSamePlantConfirmed] = useState<boolean>(false);
  const [batchItems, setBatchItems] = useState<MultiImageBatchItem[]>([]);
  const [isBatchAnalyzing, setIsBatchAnalyzing] = useState<boolean>(false);
  const [combinedReport, setCombinedReport] = useState<MultiImageBatchReport | null>(null);

  // Camera capture modal state
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const multipleFileInputRef = useRef<HTMLInputElement | null>(null);

  // Pre-seed 3 demo batch images so user can immediately test with 1 click
  const loadDemoBatch = () => {
    const demos: MultiImageBatchItem[] = [
      {
        id: 'batch_demo_1',
        imageSrc: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
        fileName: 'leaf_sample_early_blight.jpg',
        cropName: 'Tomato',
      },
      {
        id: 'batch_demo_2',
        imageSrc: '/src/assets/images/potato_late_blight_1793884803341.jpg',
        fileName: 'leaf_sample_late_blight.jpg',
        cropName: 'Potato',
      },
      {
        id: 'batch_demo_3',
        imageSrc: '/src/assets/images/ladybug_beneficial_1793884803695.jpg',
        fileName: 'foliage_sample_predator.jpg',
        cropName: 'Tomato',
      },
    ];
    setBatchItems(demos);
    setCombinedReport(null);
  };

  // Start Camera
  const openCameraCapture = async () => {
    setCameraError('');
    setIsCameraModalOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      setCameraError(err?.message || 'Camera permission not granted.');
    }
  };

  const closeCameraCapture = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraModalOpen(false);
  };

  const snapAndAddBatchPhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const newItem: MultiImageBatchItem = {
        id: 'snap_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 5),
        imageSrc: dataUrl,
        fileName: `camera_leaf_${batchItems.length + 1}.jpg`,
        cropName: selectedCrop,
      };
      setBatchItems((prev) => [...prev, newItem]);
    }
  };

  // Gallery multi-selection
  const handleMultipleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const newItem: MultiImageBatchItem = {
          id: 'file_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 5),
          imageSrc: reader.result as string,
          fileName: file.name,
          cropName: selectedCrop,
        };
        setBatchItems((prev) => [...prev, newItem]);
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (multipleFileInputRef.current) {
      multipleFileInputRef.current.value = '';
    }
  };

  // Remove individual image
  const removeImage = (id: string) => {
    setBatchItems((prev) => prev.filter((item) => item.id !== id));
    setCombinedReport(null);
  };

  // Clear all images
  const clearAllImages = () => {
    setBatchItems([]);
    setCombinedReport(null);
  };

  // Analyze all selected images together locally
  const analyzeAllImages = async () => {
    if (batchItems.length === 0) return;
    setIsBatchAnalyzing(true);

    try {
      const analyzedItems: MultiImageBatchItem[] = [];

      for (const item of batchItems) {
        const result = await runOfflineInference(item.imageSrc, selectedCrop, currentUser?.id || 'demo');
        analyzedItems.push({
          ...item,
          analysis: result,
        });
        // Save scan to local IndexedDB
        await localDb.saveScan(result);
      }

      setBatchItems(analyzedItems);

      // Compute combined summary statistics
      const total = analyzedItems.length;
      let healthy = 0;
      let diseased = 0;
      let pestDamaged = 0;
      let uncertain = 0;

      analyzedItems.forEach((it) => {
        const res = it.analysis;
        if (!res) return;
        if (res.isRecaptureRecommended) uncertain++;
        else if (res.pathogenType === 'Healthy' || res.isBeneficial) healthy++;
        else if (res.pathogenType === 'Pest') pestDamaged++;
        else diseased++;
      });

      let overallStatus: MultiImageBatchReport['overallHealthStatus'] = 'Optimal';
      if (diseased >= 2 || pestDamaged >= 2) overallStatus = 'Severe Infestation';
      else if (diseased >= 1 || pestDamaged >= 1) overallStatus = 'Moderate Outbreak';
      else if (uncertain > 0) overallStatus = 'Mild Concern';

      const summaryText = samePlantConfirmed
        ? `Batch Analysis for Single Plant (${total} leaves sampled): ${diseased} leaves show active fungal/bacterial necrosis, ${pestDamaged} show pest chewing, and ${healthy} remain healthy.`
        : `Batch Analysis across Field Block (${total} distinct leaves sampled): Pathogen pressure detected on ${diseased} samples, pest damage on ${pestDamaged} samples, with ${healthy} healthy leaves.`;

      const interventions = [
        diseased > 0 ? 'Sanitize lower canopy and apply prophylactic bio-fungicide (Trichoderma or Copper Oxychloride).' : '',
        pestDamaged > 0 ? 'Scout central whorls and deploy pheromone monitoring traps.' : '',
        'Maintain morning ground-level drip irrigation to keep foliage dry.',
      ].filter(Boolean);

      setCombinedReport({
        totalAnalyzed: total,
        healthyCount: healthy,
        diseasedCount: diseased,
        pestDamagedCount: pestDamaged,
        uncertainCount: uncertain,
        overallHealthStatus: overallStatus,
        summaryProse: summaryText,
        recommendedInterventions: interventions,
      });
    } catch {
      // error handling
    } finally {
      setIsBatchAnalyzing(false);
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
                Advanced Multi-Foliar Batch Diagnostics
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 font-serif">
              Multiple Image Detection
            </h1>
            <p className="mt-1 text-xs text-stone-600">
              Capture or select multiple crop leaf photos in one go, analyze them simultaneously, and inspect both individual leaf findings and a combined field health summary.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={loadDemoBatch}
              className="rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100"
            >
              Load Demo Batch (3 Leaves)
            </button>
            <button
              onClick={openCameraCapture}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-800 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700"
            >
              <Camera className="h-4 w-4" />
              <span>Capture with Camera</span>
            </button>
            <button
              onClick={() => multipleFileInputRef.current?.click()}
              className="flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50"
            >
              <Upload className="h-4 w-4 text-emerald-800" />
              <span>Select from Gallery</span>
            </button>
          </div>
        </div>

        {/* Hidden Multi-file input */}
        <input
          ref={multipleFileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleMultipleGalleryUpload}
          className="hidden"
        />

        {/* Plant Correlation Confirmation & Crop Selector */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-stone-100 pt-4">
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-stone-700">Target Crop:</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs text-stone-900"
            >
              <option value="Tomato">Tomato</option>
              <option value="Potato">Potato</option>
              <option value="Apple">Apple</option>
              <option value="Grapes">Grapes</option>
              <option value="Banana">Banana</option>
              <option value="Mango">Mango</option>
              <option value="Citrus">Citrus (Lemon / Orange)</option>
              <option value="Rice (Paddy)">Rice (Paddy)</option>
              <option value="Maize / Corn">Maize / Corn</option>
              <option value="Wheat">Wheat</option>
              <option value="Cotton">Cotton</option>
            </select>
          </div>

          {/* Prompt requirement: Do not assume multiple photos belong to the same plant unless confirmed */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={samePlantConfirmed}
              onChange={(e) => setSamePlantConfirmed(e.target.checked)}
              className="h-4 w-4 rounded-sm border-stone-300 text-emerald-800 focus:ring-emerald-700"
            />
            <span className="text-xs text-stone-700 font-medium">
              Confirm: These photos belong to the same individual plant (Single-Plant Profile)
            </span>
          </label>
        </div>
      </div>

      {/* Selected Images Thumbnail Grid */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Images className="h-4 w-4 text-emerald-800" />
            <h3 className="text-sm font-bold text-stone-900 font-serif">
              Queued Leaf Images ({batchItems.length})
            </h3>
          </div>

          {batchItems.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={clearAllImages}
                className="text-xs font-medium text-stone-500 hover:text-red-700 flex items-center gap-1"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear All</span>
              </button>
              <button
                onClick={analyzeAllImages}
                disabled={isBatchAnalyzing}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-800 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isBatchAnalyzing ? 'animate-spin' : ''}`} />
                <span>{isBatchAnalyzing ? 'Analyzing Batch...' : 'Analyse All Selected Images'}</span>
              </button>
            </div>
          )}
        </div>

        {batchItems.length === 0 ? (
          <div className="py-12 text-center text-xs text-stone-500">
            No images selected yet. Click <strong>"Select from Gallery"</strong> or <strong>"Capture with Camera"</strong> or <strong>"Load Demo Batch"</strong> above.
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {batchItems.map((item, index) => (
              <div
                key={item.id}
                className="relative rounded-xl border border-stone-200 bg-stone-50 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 bg-stone-900">
                  <img
                    src={item.imageSrc}
                    alt={item.fileName}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    onClick={() => removeImage(item.id)}
                    className="absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white hover:bg-red-700 transition-colors"
                    title="Remove this image"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                  <span className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-0.5 text-[10px] text-white font-mono">
                    Image #{index + 1}
                  </span>
                </div>

                {/* Individual Analysis Badge */}
                <div className="p-3 text-xs space-y-1">
                  <p className="font-semibold text-stone-900 truncate">{item.fileName}</p>
                  {item.analysis ? (
                    <div className="space-y-1 pt-1 border-t border-stone-200">
                      <p className="font-bold text-emerald-950 truncate">
                        {item.analysis.predictedCondition}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-stone-600">
                        <span>Confidence: <strong className="font-mono">{item.analysis.confidenceScore}%</strong></span>
                        <span className={`font-semibold ${
                          item.analysis.severity === 'Critical' ? 'text-red-700' :
                          item.analysis.severity === 'Severe' ? 'text-orange-700' :
                          item.analysis.severity === 'Moderate' ? 'text-amber-700' : 'text-emerald-700'
                        }`}>
                          {item.analysis.severity}
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-500 pt-0.5 line-clamp-2">
                        <strong>Action:</strong> {item.analysis.recommendedSteps[0]}
                      </p>
                    </div>
                  ) : (
                    <p className="text-[11px] text-stone-400 italic">Ready for analysis</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Combined Crop Health Summary Report */}
      {combinedReport && (
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <span className="text-[10px] font-mono text-stone-400 uppercase">Batch Health Aggregation</span>
              <h3 className="text-base font-bold text-stone-900 font-serif">
                Combined Multi-Image Crop Health Summary
              </h3>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
              combinedReport.overallHealthStatus === 'Severe Infestation' ? 'border-red-300 bg-red-50 text-red-800' :
              combinedReport.overallHealthStatus === 'Moderate Outbreak' ? 'border-amber-300 bg-amber-50 text-amber-800' :
              'border-emerald-300 bg-emerald-50 text-emerald-800'
            }`}>
              {combinedReport.overallHealthStatus}
            </span>
          </div>

          {/* 5 KPI Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 text-center">
              <span className="text-xs text-stone-500">Total Analysed</span>
              <p className="text-xl font-bold font-mono text-stone-900 mt-1">{combinedReport.totalAnalyzed}</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 text-center">
              <span className="text-xs text-emerald-800">Healthy Leaves</span>
              <p className="text-xl font-bold font-mono text-emerald-700 mt-1">{combinedReport.healthyCount}</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 text-center">
              <span className="text-xs text-amber-800">Diseased Leaves</span>
              <p className="text-xl font-bold font-mono text-amber-700 mt-1">{combinedReport.diseasedCount}</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 text-center">
              <span className="text-xs text-red-800">Pest-Damaged</span>
              <p className="text-xl font-bold font-mono text-red-700 mt-1">{combinedReport.pestDamagedCount}</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 text-center">
              <span className="text-xs text-stone-500">Uncertain Results</span>
              <p className="text-xl font-bold font-mono text-stone-600 mt-1">{combinedReport.uncertainCount}</p>
            </div>
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs text-stone-800 leading-relaxed">
            <p className="font-semibold text-stone-900 mb-1">Agronomic Synthesis:</p>
            <p>{combinedReport.summaryProse}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-serif mb-2">
              Recommended Integrated Interventions
            </h4>
            <ul className="space-y-1.5">
              {combinedReport.recommendedInterventions.map((intv, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-stone-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{intv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Camera Capture Modal */}
      {isCameraModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-stone-900 p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-bold text-sm">Capture Multiple Foliage Photos</h3>
              <button onClick={closeCameraCapture} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <div className="mt-4 relative aspect-4/3 overflow-hidden rounded-xl bg-black">
              {cameraError ? (
                <p className="p-4 text-xs text-amber-400">{cameraError}</p>
              ) : (
                <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
              )}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-stone-400">Total in batch: {batchItems.length} photos</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={snapAndAddBatchPhoto}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500"
                >
                  Snap & Add to Batch
                </button>
                <button
                  onClick={closeCameraCapture}
                  className="rounded-xl bg-stone-800 px-4 py-2 text-xs font-medium text-stone-300 hover:bg-stone-700"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
