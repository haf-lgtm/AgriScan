import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { registerUser } from '../services/authService';
import { ArrowLeft, Check, ShieldCheck, User, Mail, Phone, Lock, MapPin, Sprout, Globe } from 'lucide-react';

interface RegisterPageProps {
  onRegisterSuccess: () => void;
  onNavigateToLogin: () => void;
  currentLang: Language;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onRegisterSuccess,
  onNavigateToLogin,
  currentLang,
}) => {
  const t = translations[currentLang];

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stateName, setStateName] = useState('Karnataka');
  const [district, setDistrict] = useState('Dharwad');
  const [preferredLang, setPreferredLang] = useState<Language>(currentLang);
  const [mainCrop, setMainCrop] = useState('Tomato');

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await registerUser({
        fullName,
        email,
        phone,
        password,
        state: stateName,
        district,
        preferredLanguage: preferredLang,
        mainCrop,
      });

      if (res.success) {
        onRegisterSuccess();
      } else {
        setErrorMessage(res.error || 'Failed to register farmer profile.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred while saving profile.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-stone-900 overflow-y-auto">
      {/* Background Image */}
      <img
        src="/src/assets/images/agriscan_farm_hero_1793884802132.jpg"
        alt="Farmland background"
        className="absolute inset-0 h-full w-full object-cover opacity-25 filter brightness-70 contrast-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/80 to-emerald-950/40" />

      {/* Main Registration Card */}
      <div className="relative z-10 my-8 w-full max-w-xl rounded-2xl border border-stone-800 bg-white/95 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <button
            onClick={onNavigateToLogin}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-emerald-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Sign In</span>
          </button>
          <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>SHA-256 Encrypted</span>
          </div>
        </div>

        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold tracking-tight text-emerald-950 font-serif">
            {t.auth.registerTitle}
          </h2>
          <p className="mt-1 text-xs text-stone-600">
            Register your offline farmer profile. All data remains exclusively on your device.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {errorMessage && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-800 font-medium">
              {errorMessage}
            </div>
          )}

          {/* Full Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700">
                {t.auth.fullName} *
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/60 pl-9 pr-3 py-2 text-xs text-stone-900 focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700">
                {t.auth.phone} *
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                  <Phone className="h-4 w-4" />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98450 XXXXX"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/60 pl-9 pr-3 py-2 text-xs text-stone-900 focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                  required
                />
              </div>
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-stone-700">
              Email Address (User Identifier) *
            </label>
            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="farmer@example.com"
                className="w-full rounded-xl border border-stone-200 bg-stone-50/60 pl-9 pr-3 py-2 text-xs text-stone-900 focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                required
              />
            </div>
          </div>

          {/* Password & Confirm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700">
                {t.auth.password} *
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 chars"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/60 pl-9 pr-3 py-2 text-xs text-stone-900 focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700">
                {t.auth.confirmPassword} *
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/60 pl-9 pr-3 py-2 text-xs text-stone-900 focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                  required
                />
              </div>
            </div>
          </div>

          {/* State and District */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700">
                {t.auth.state}
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                  <MapPin className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  placeholder="e.g. Karnataka"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/60 pl-9 pr-3 py-2 text-xs text-stone-900 focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700">
                {t.auth.district}
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                  <MapPin className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. Dharwad / Belagavi"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/60 pl-9 pr-3 py-2 text-xs text-stone-900 focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                  required
                />
              </div>
            </div>
          </div>

          {/* Preferred Language & Main Crop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700">
                {t.auth.preferredLanguage}
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                  <Globe className="h-4 w-4" />
                </div>
                <select
                  value={preferredLang}
                  onChange={(e) => setPreferredLang(e.target.value as Language)}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/60 pl-9 pr-3 py-2 text-xs text-stone-900 focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                >
                  <option value="en">English</option>
                  <option value="kn">ಕನ್ನಡ (Kannada)</option>
                  <option value="hi">हिंदी (Hindi)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700">
                {t.auth.mainCrop}
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                  <Sprout className="h-4 w-4" />
                </div>
                <select
                  value={mainCrop}
                  onChange={(e) => setMainCrop(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/60 pl-9 pr-3 py-2 text-xs text-stone-900 focus:border-emerald-600 focus:bg-white focus:outline-hidden"
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
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 py-3 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 active:scale-[0.99] transition-all disabled:opacity-60"
            >
              <Check className="h-4 w-4" />
              <span>{isLoading ? 'Creating Local Profile...' : t.auth.registerBtn}</span>
            </button>
          </div>
        </form>

        <div className="mt-4 border-t border-stone-100 pt-3 text-center">
          <p className="text-xs text-stone-600">
            {t.auth.hasAccount}{' '}
            <button
              onClick={onNavigateToLogin}
              className="font-semibold text-emerald-800 hover:underline"
            >
              {t.auth.loginBtn}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
