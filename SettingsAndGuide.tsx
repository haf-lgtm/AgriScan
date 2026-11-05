import React, { useState } from 'react';
import { User, Language } from '../types';
import { translations } from '../data/translations';
import { localDb } from '../services/localDb';
import {
  Settings,
  Terminal,
  Database,
  Cpu,
  Download,
  RotateCcw,
  CheckCircle2,
  BookOpen,
  Copy,
  Check,
  Server,
  FolderTree,
} from 'lucide-react';

interface SettingsAndGuideProps {
  currentUser: User | null;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onUserUpdated?: () => void;
}

export const SettingsAndGuide: React.FC<SettingsAndGuideProps> = ({
  currentUser,
  currentLang,
  onLanguageChange,
  onUserUpdated,
}) => {
  const t = translations[currentLang];
  const [activeTab, setActiveTab] = useState<'settings' | 'guide' | 'training' | 'architecture'>('settings');

  // Editable settings
  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [mainCrop, setMainCrop] = useState(currentUser?.mainCrop || 'Tomato');
  const [stateName, setStateName] = useState(currentUser?.state || 'Karnataka');
  const [district, setDistrict] = useState(currentUser?.district || 'Dharwad');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const updatedUser: User = {
      ...currentUser,
      fullName: fullName.trim(),
      mainCrop,
      state: stateName.trim(),
      district: district.trim(),
      preferredLanguage: currentLang,
    };

    await localDb.saveUser(updatedUser);
    localStorage.setItem('agriscan_current_user_v1', JSON.stringify(updatedUser));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    if (onUserUpdated) onUserUpdated();
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const handleResetData = async () => {
    if (confirm('Clear all local scans and field notes from this device? (Account will remain)')) {
      const allScans = await localDb.getScansByUser(currentUser?.id || '');
      for (const s of allScans) {
        await localDb.deleteScan(s.id);
      }
      alert('Local scan storage has been cleaned.');
      window.location.reload();
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
                System Administration & CSE Academic Specifications
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 font-serif">
              {t.nav.settings}
            </h1>
            <p className="mt-1 text-xs text-stone-600">
              Configure local profile parameters, offline storage, and view complete College CSE project localhost deployment instructions.
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-xl bg-stone-100 p-1 shrink-0">
            <button
              onClick={() => setActiveTab('settings')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === 'settings' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Farmer Profile
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === 'guide' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Laptop & Android Install
            </button>
            <button
              onClick={() => setActiveTab('training')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === 'training' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Model Training (MobileNetV2)
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === 'architecture' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              CSE Architecture
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Profile Form (7 cols) */}
          <div className="md:col-span-7 rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900 font-serif border-b border-stone-100 pb-3">
              Farmer Profile & Regional Preferences
            </h3>

            {saveSuccess && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900 font-medium">
                Profile updated successfully in local IndexedDB storage.
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700">Primary Cultivated Crop</label>
                  <select
                    value={mainCrop}
                    onChange={(e) => setMainCrop(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs"
                  >
                    <option value="Tomato">Tomato</option>
                    <option value="Potato">Potato</option>
                    <option value="Rice (Paddy)">Rice (Paddy)</option>
                    <option value="Maize / Corn">Maize / Corn</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Cotton">Cotton</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700">Interface Language</label>
                  <select
                    value={currentLang}
                    onChange={(e) => onLanguageChange(e.target.value as Language)}
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs"
                  >
                    <option value="en">English (EN)</option>
                    <option value="kn">ಕನ್ನಡ (Kannada)</option>
                    <option value="hi">हिंदी (Hindi)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700">State</label>
                  <input
                    type="text"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700">District / Region</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="rounded-xl bg-emerald-800 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700"
              >
                Save Profile Changes
              </button>
            </form>
          </div>

          {/* Local Storage & Security (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-stone-900 font-serif border-b border-stone-100 pb-2">
                Local Device Data Governance
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                AgriScan stores all credentials, model inference buffers, and diagnostic scan histories locally. No data is transmitted to external cloud servers.
              </p>

              <div className="rounded-xl bg-stone-50 p-3 text-xs space-y-1.5 border border-stone-200">
                <div className="flex justify-between">
                  <span className="text-stone-500">Database Engine:</span>
                  <strong className="text-stone-900 font-mono">IndexedDB / SQLite</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Encryption:</span>
                  <strong className="text-stone-900 font-mono">Web Crypto SHA-256</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Offline Status:</span>
                  <strong className="text-emerald-700">100% Autonomous</strong>
                </div>
              </div>

              <button
                onClick={handleResetData}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-2.5 text-xs font-semibold text-red-800 hover:bg-red-100 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Local Scan Archive</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'guide' && (
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h2 className="text-base font-bold text-stone-900 font-serif">
              Instructions to Run AgriScan on Localhost (100% Offline)
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Complete setup guide for academic viva, project evaluations, and running on field laptops or Raspberry Pi.
            </p>
          </div>

          {/* Step by step */}
          <div className="space-y-4 text-xs">
            {/* Step 1 */}
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-stone-900">Step 1: Clone or Extract Repository on Host System</h4>
                <button
                  onClick={() => handleCopy('git clone <repo-url>\ncd agriscan', 'step1')}
                  className="text-emerald-800 hover:underline flex items-center gap-1 font-mono text-[11px]"
                >
                  {copiedCmd === 'step1' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>Copy</span>
                </button>
              </div>
              <pre className="rounded-lg bg-stone-900 p-2.5 font-mono text-emerald-300 text-[11px] overflow-x-auto">
{`git clone <repo-url>
cd agriscan
npm install`}
              </pre>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-stone-900">Step 2: Start Local Offline Development Server</h4>
                <button
                  onClick={() => handleCopy('npm run dev', 'step2')}
                  className="text-emerald-800 hover:underline flex items-center gap-1 font-mono text-[11px]"
                >
                  {copiedCmd === 'step2' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>Copy</span>
                </button>
              </div>
              <pre className="rounded-lg bg-stone-900 p-2.5 font-mono text-emerald-300 text-[11px] overflow-x-auto">
{`npm run dev
# Server initiates on http://localhost:3000`}
              </pre>
              <p className="text-stone-600 text-[11px]">
                Once launched, you can disconnect your computer from WiFi/LAN completely. All computer vision models, encyclopedia items, and databases will function seamlessly.
              </p>
            </div>

            {/* Step 3: Python Flask Alternative */}
            {/* Step 4: Android Mobile Installation */}
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-2">
              <h4 className="font-bold text-stone-900">Step 4: Running on Android Mobile Devices (Offline PWA / Local Host)</h4>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                AgriScan supports direct offline installation on Android tablets and phones via Progressive Web App (PWA) standards:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-stone-600">
                <li>Connect your Android phone to the same local Wi-Fi router or hotspot as your laptop.</li>
                <li>Find your laptop's local IP address (e.g. <code>192.168.1.15:3000</code>).</li>
                <li>Open Google Chrome or Brave on Android and navigate to <code>http://192.168.1.15:3000</code>.</li>
                <li>Tap Chrome's menu (three dots) and select <strong>"Add to Home screen"</strong> or <strong>"Install App"</strong>.</li>
                <li>AgriScan will install as a standalone native-feeling Android icon on your home screen.</li>
                <li>Disconnect from Wi-Fi: the Service Worker and IndexedDB will continue running 100% offline!</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'training' && (
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h2 className="text-base font-bold text-stone-900 font-serif">
              Model Training & Transfer Learning Guide (MobileNetV2)
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Instructions for adding new crop disease classes using TensorFlow, Keras, and agricultural datasets (PlantVillage, PlantDoc, IP102).
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-2">
              <h4 className="font-bold text-stone-900">1. Dataset Selection</h4>
              <p className="text-stone-600 leading-relaxed text-[11px]">
                To expand AgriScan's detection classes:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-stone-600 text-[11px]">
                <li><strong>PlantVillage Dataset:</strong> 54,303 images across 38 crop disease classes (Tomato, Potato, Corn, Apple, Grape, Peach).</li>
                <li><strong>PlantDoc Dataset:</strong> Real-world field condition images capturing natural shadows, dust, and varying angles.</li>
                <li><strong>IP102 Dataset:</strong> Over 75,000 images covering 102 insect and pest classes for pest identification.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-2">
              <h4 className="font-bold text-stone-900">2. MobileNetV2 Transfer Learning Pipeline (Python / Keras)</h4>
              <pre className="rounded-lg bg-stone-900 p-3 font-mono text-emerald-300 text-[11px] overflow-x-auto leading-relaxed">
{`import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model

# 1. Load pretrained MobileNetV2 base (ImageNet weights) without top head
base_model = MobileNetV2(input_shape=(224, 224, 3), include_top=False, weights='imagenet')
base_model.trainable = False  # Freeze convolutional feature extractors

# 2. Add custom classification head for crop diseases
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dropout(0.3)(x)
x = Dense(256, activation='relu')(x)
predictions = Dense(NUM_CLASSES, activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=predictions)
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# 3. Fine-tune top 30 layers with small learning rate (1e-5)
base_model.trainable = True
for layer in base_model.layers[:-30]:
    layer.trainable = False

# 4. Export to TensorFlow Lite for offline deployment
converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
tflite_model = converter.convert()
with open('agriscan_mobilenet_v2.tflite', 'wb') as f:
    f.write(tflite_model)`}
              </pre>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs text-emerald-950">
              <h4 className="font-bold mb-1">3. Offline Web Deployment via TensorFlow.js</h4>
              <p className="text-[11px] leading-relaxed">
                Run <code>tensorflowjs_converter --input_format=keras model.h5 ./web_model</code> to generate the binary weight shards and <code>model.json</code>. Place these files inside <code>/public/models/</code> to execute deterministic client-side inference via <code>tf.loadLayersModel()</code> without an internet connection.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'architecture' && (
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h2 className="text-base font-bold text-stone-900 font-serif">
              College-Level CSE Project Architecture & Folder Hierarchy
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Detailed technical blueprint submitted for Computer Science & Engineering capstone presentation.
            </p>
          </div>

          {/* Folder Hierarchy Display */}
          <div className="rounded-xl bg-stone-950 p-4 font-mono text-[11px] text-stone-300 overflow-x-auto leading-relaxed border border-stone-800">
            <p className="text-emerald-400 font-bold mb-2">AGRISCAN PROJECT STRUCTURE:</p>
{`├── backend-python-flask/
│   ├── app.py                     # Flask REST API endpoints & CORS handler
│   ├── database.py                # SQLite schema (users, scans, encyclopedia)
│   ├── model_handler.py           # TensorFlow Lite / OpenCV inference engine
│   ├── requirements.txt           # Python dependencies (Flask, TFLite, OpenCV)
│   └── README.md                  # Dedicated python server instructions
├── src/
│   ├── assets/images/             # High-res diagnostic pathology reference images
│   ├── components/
│   │   ├── AiCropScanner.tsx      # Service 1 & Feature 1 (Multi-leaf CNN)
│   │   ├── PestIdentifier.tsx     # Service 2 & Feature 3 (Biocontrol protector)
│   │   ├── DeficiencyAnalyzer.tsx # Service 3 (Disease vs Nutrient matrix)
│   │   ├── HealthScoreView.tsx    # Service 4 (Calculated crop health index)
│   │   ├── TreatmentView.tsx      # Service 5 (IPM 4-pillar recommendations)
│   │   ├── EncyclopediaView.tsx   # Service 6 & Feature 4 (Offline encyclopedia)
│   │   ├── RiskPredictor.tsx      # Service 7 (Disease triangle risk model)
│   │   ├── HistoryAndCompare.tsx  # Service 8 (Dual image slider comparison)
│   │   ├── KnowledgeLibrary.tsx   # Feature 6 (Farmer field notes diary)
│   │   ├── SettingsAndGuide.tsx   # Settings, installation guide & CSE specs
│   │   ├── Navbar.tsx             # 3-Zone top bar with language & voice readout
│   │   ├── Sidebar.tsx            # Navigation drawer with 9 core services
│   │   ├── LoginPage.tsx          # Page 1 (Offline authentication)
│   │   └── RegisterPage.tsx       # Page 2 (Profile creation & SHA-256)
│   ├── data/
│   │   ├── encyclopediaData.ts    # 20+ crop diseases, pests & beneficial insects
│   │   └── translations.ts        # English, Kannada (ಕನ್ನಡ), Hindi (हिंदी)
│   ├── services/
│   │   ├── authService.ts         # Local SHA-256 hashing & session management
│   │   ├── localDb.ts             # IndexedDB / SQLite browser persistence
│   │   ├── visionEngine.ts        # Canvas pixel segmentation & CNN classifier
│   │   ├── riskEngine.ts          # Environmental disease triangle simulator
│   │   └── voiceAssistant.ts      # Web Speech API speech synthesis & commands
│   ├── types/
│   │   └── index.ts               # Complete TypeScript data model definitions
│   ├── App.tsx                    # Main state machine, router & auth guardian
│   └── main.tsx                   # React 19 entry point`}
          </div>

          {/* Technical ML Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-2">
              <h4 className="font-bold text-stone-900">Computer Vision & ML Pipeline</h4>
              <ul className="list-disc pl-4 space-y-1 text-stone-600">
                <li>Normalized Excess Green Index ($ExG = 2G - R - B$) segmentation.</li>
                <li>Laplacian gradient edge variance for blurriness & confidence check.</li>
                <li>Clustered bounding box generation for multi-leaf segmentation.</li>
                <li>Concentric ring target spot detection via radial standard deviation.</li>
                <li>Water-soaked translucency index for bacterial & oomycete blights.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-2">
              <h4 className="font-bold text-stone-900">Offline Database & Security</h4>
              <ul className="list-disc pl-4 space-y-1 text-stone-600">
                <li>Native IndexedDB transaction isolation with zero cloud telemetry.</li>
                <li>SHA-256 cryptographic password hashing using Web Crypto API.</li>
                <li>Local image storage via base64 encoded byte payloads.</li>
                <li>Multilingual local resource bundles in English, Kannada, and Hindi.</li>
                <li>Zero external CDN links at runtime for true field air-gapped usage.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
