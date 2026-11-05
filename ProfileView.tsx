import React, { useState } from 'react';
import { User, Language } from '../types';
import { translations } from '../data/translations';
import { localDb } from '../services/localDb';
import {
  User as UserIcon,
  MapPin,
  Sprout,
  Phone,
  Mail,
  ShieldCheck,
  Calendar,
  Save,
  KeyRound,
  Info,
} from 'lucide-react';

interface ProfileViewProps {
  currentUser: User | null;
  currentLang: Language;
  onUserUpdated?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  currentLang,
  onUserUpdated,
}) => {
  const t = translations[currentLang];

  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [stateName, setStateName] = useState(currentUser?.state || 'Karnataka');
  const [district, setDistrict] = useState(currentUser?.district || 'Dharwad');
  const [mainCrop, setMainCrop] = useState(currentUser?.mainCrop || 'Tomato');
  const [saveMessage, setSaveMessage] = useState('');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const updated: User = {
      ...currentUser,
      fullName: fullName.trim(),
      phone: phone.trim(),
      state: stateName.trim(),
      district: district.trim(),
      mainCrop,
    };

    await localDb.saveUser(updated);
    localStorage.setItem('agriscan_current_user_v1', JSON.stringify(updated));
    setSaveMessage('Farmer profile successfully updated in local IndexedDB storage.');
    setTimeout(() => setSaveMessage(''), 3000);
    if (onUserUpdated) onUserUpdated();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-600"></span>
          <span className="text-xs font-semibold text-emerald-800">
            Local User Profile & Farm Identity
          </span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 font-serif">
          Farmer Profile
        </h1>
        <p className="mt-1 text-xs text-stone-600">
          Manage your personal agricultural credentials and primary field zone settings stored securely on this device.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Profile Card & Edit Form (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="text-sm font-bold text-stone-900 font-serif">
              Edit Farmer Information
            </h3>
            <span className="text-[11px] font-mono text-stone-400">
              ID: {currentUser?.id}
            </span>
          </div>

          {saveMessage && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900 font-medium">
              {saveMessage}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-hidden"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700">Email (Read-only identifier)</label>
                <input
                  type="email"
                  value={currentUser?.email || ''}
                  disabled
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-100 px-3 py-2.5 text-xs text-stone-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-hidden"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700">State</label>
                <input
                  type="text"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700">District / Region</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700">Main Crop Cultivated</label>
              <select
                value={mainCrop}
                onChange={(e) => setMainCrop(e.target.value)}
                className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-xs text-stone-900 focus:border-emerald-700 focus:bg-white focus:outline-hidden"
              >
                <option value="Tomato">Tomato (Solanum lycopersicum)</option>
                <option value="Potato">Potato (Solanum tuberosum)</option>
                <option value="Rice (Paddy)">Rice / Paddy (Oryza sativa)</option>
                <option value="Maize / Corn">Maize / Corn (Zea mays)</option>
                <option value="Wheat">Wheat (Triticum aestivum)</option>
                <option value="Cotton">Cotton (Gossypium)</option>
                <option value="Chili / Pepper">Chili / Pepper (Capsicum)</option>
              </select>
            </div>

            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl bg-emerald-800 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700"
            >
              <Save className="h-4 w-4" />
              <span>Update Profile</span>
            </button>
          </form>
        </div>

        {/* Security & Offline Password Recovery Info (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-800" />
              <h3 className="text-sm font-bold text-stone-900 font-serif">
                Local Security & Encryption
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Your password hash is computed using native browser <strong>Web Crypto SHA-256</strong>. It is never transmitted across the network.
            </p>

            <div className="rounded-xl border border-stone-200 bg-stone-50 p-3 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">Storage Engine:</span>
                <strong className="text-stone-900 font-mono">IndexedDB `users`</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Network Telemetry:</span>
                <strong className="text-emerald-700">Zero / Disabled</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Created:</span>
                <strong className="text-stone-700 font-mono">
                  {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : 'Active'}
                </strong>
              </div>
            </div>
          </div>

          {/* Offline Password Recovery Instructions */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-sm">
              <KeyRound className="h-4 w-4 text-emerald-800" />
              <span>Offline Password Recovery Protocol</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Because AgriScan operates strictly offline without an external SMTP email server:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-xs text-stone-600">
              <li>Pre-seeded demo farmer credentials are: <strong>farmer@agriscan.org</strong> / <strong>farmer123</strong>.</li>
              <li>You can create an unlimited number of local profiles using the registration form.</li>
              <li>To reset credentials, use the Database Reset button in Settings.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
