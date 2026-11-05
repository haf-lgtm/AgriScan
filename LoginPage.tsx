import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { loginUser, getRememberedEmail } from '../services/authService';
import { Eye, EyeOff, Lock, User, WifiOff, ArrowRight, ShieldCheck } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onNavigateToRegister: () => void;
  currentLang: Language;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigateToRegister,
  currentLang,
}) => {
  const t = translations[currentLang];
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const remembered = getRememberedEmail();
    if (remembered) {
      setEmailOrUsername(remembered);
    } else {
      setEmailOrUsername('farmer@agriscan.org');
      setPassword('farmer123');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setForgotMsg('');

    if (!emailOrUsername.trim()) {
      setErrorMessage('Please enter your email or username.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await loginUser(emailOrUsername, password, rememberMe);
      if (res.success) {
        onLoginSuccess();
      } else {
        setErrorMessage(res.error || 'Authentication failed. Please check credentials.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred during local authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setForgotMsg(
      'Offline Password Recovery: As all credentials are kept strictly on this device without cloud servers, default demo password is "farmer123". You can also create a new profile with the registration form.'
    );
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-stone-900">
      {/* Attractive Agricultural Background Photo */}
      <img
        src="/src/assets/images/agriscan_farm_hero_1793884802132.jpg"
        alt="Lush agricultural farming landscape"
        className="absolute inset-0 h-full w-full object-cover opacity-35 filter brightness-75 contrast-110"
        referrerPolicy="no-referrer"
      />

      {/* Subtle Gradient Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/70 to-emerald-950/40" />

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-stone-800 bg-white/95 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-800 text-white shadow-md">
            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.5 8.4" />
              <path d="M12 22a10 10 0 0 0 10-10c0-5.5-4.5-10-10-10" />
              <path d="M12 2v20" />
              <path d="M12 7c2.5 0 5 1.5 6 4" />
              <path d="M12 12c-2.5 0-5 1.5-6 4" />
            </svg>
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-emerald-950 font-serif">AgriScan</h1>
          <p className="mt-1 text-xs text-stone-600 font-medium">{t.tagline}</p>

          {/* Offline verification badge */}
          <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-800 border border-emerald-200">
            <WifiOff className="h-3 w-3" />
            <span>100% Offline Local Authentication</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {errorMessage && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-800 font-medium">
              {errorMessage}
            </div>
          )}

          {forgotMsg && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900 leading-relaxed">
              {forgotMsg}
            </div>
          )}

          {/* Email or Username */}
          <div>
            <label className="block text-xs font-semibold text-stone-700">
              {t.auth.emailOrUsername}
            </label>
            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                <User className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="farmer@agriscan.org"
                className="w-full rounded-xl border border-stone-200 bg-stone-50/60 pl-9 pr-3 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                required
              />
            </div>
          </div>

          {/* Password with Show/Hide */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-stone-700">
                {t.auth.password}
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[11px] font-medium text-emerald-700 hover:text-emerald-900"
              >
                {t.auth.forgotPassword}
              </button>
            </div>
            <div className="relative mt-1.5">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-stone-200 bg-stone-50/60 pl-9 pr-10 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-stone-400 hover:text-stone-700"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded-sm border-stone-300 text-emerald-700 focus:ring-emerald-600"
              />
              <span className="text-xs text-stone-600">{t.auth.rememberMe}</span>
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 py-3 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 active:scale-[0.99] transition-all disabled:opacity-60"
          >
            <span>{isLoading ? 'Verifying Local Hash...' : t.auth.loginBtn}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Demo Credentials Tip */}
        <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50 p-2.5 text-[11px] text-stone-600 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0" />
          <span>Quick Demo Login: <strong>farmer@agriscan.org</strong> / <strong>farmer123</strong></span>
        </div>

        {/* Link to Registration */}
        <div className="mt-6 border-t border-stone-100 pt-4 text-center">
          <p className="text-xs text-stone-600">
            {t.auth.noAccount}{' '}
            <button
              onClick={onNavigateToRegister}
              className="font-semibold text-emerald-800 hover:underline inline-flex items-center gap-1"
            >
              {t.auth.registerBtn}
            </button>
          </p>
        </div>

        {/* Security Notice */}
        <p className="mt-4 text-[10px] text-stone-400 text-center leading-tight">
          {t.auth.localAuthNotice}
        </p>
      </div>
    </div>
  );
};
