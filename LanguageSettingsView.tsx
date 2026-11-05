import React from 'react';
import { User, Language } from '../types';
import { translations } from '../data/translations';
import { localDb } from '../services/localDb';
import { Globe, Check, Info, Sparkles } from 'lucide-react';

interface LanguageSettingsViewProps {
  currentUser: User | null;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSettingsView: React.FC<LanguageSettingsViewProps> = ({
  currentUser,
  currentLang,
  onLanguageChange,
}) => {
  const t = translations[currentLang];

  const languagesList = [
    {
      code: 'en' as Language,
      name: 'English',
      nativeName: 'English',
      region: 'Universal / Standard Agricultural English',
      description: 'Complete translations for all 17 services, disease encyclopedia, and agronomic reports.',
      active: true,
    },
    {
      code: 'kn' as Language,
      name: 'Kannada',
      nativeName: 'ಕನ್ನಡ',
      region: 'ಕರ್ನಾಟಕ (Karnataka)',
      description: 'ಸ್ಥಳೀಯ ಬೆಳೆ ರೋಗಗಳು, ಕೀಟ ನಿಯಂತ್ರಣ ಮತ್ತು ಕೃಷಿ ಸಲಹೆಗಳು ಕನ್ನಡದಲ್ಲಿ ಲಭ್ಯವಿದೆ.',
      active: true,
    },
    {
      code: 'hi' as Language,
      name: 'Hindi',
      nativeName: 'हिंदी',
      region: 'उत्तर एवं मध्य भारत (North & Central India)',
      description: 'फसल रोग, कीट प्रबंधन और कृषि विज्ञान की संपूर्ण जानकारी सरल हिंदी में उपलब्ध है।',
      active: true,
    },
    {
      code: 'te' as any,
      name: 'Telugu (Extensible Slot)',
      nativeName: 'తెలుగు',
      region: 'ఆంధ్రప్రదేశ్ & తెలంగాణ (AP & Telangana)',
      description: 'Upcoming offline translation module for southern regional dialects.',
      active: false,
    },
    {
      code: 'ta' as any,
      name: 'Tamil (Extensible Slot)',
      nativeName: 'தமிழ்',
      region: 'தமிழ்நாடு (Tamil Nadu)',
      description: 'Upcoming offline translation module for Kaveri basin agriculture.',
      active: false,
    },
  ];

  const handleSelectLanguage = async (code: Language) => {
    onLanguageChange(code);
    if (currentUser) {
      const updatedUser: User = { ...currentUser, preferredLanguage: code };
      await localDb.saveUser(updatedUser);
      localStorage.setItem('agriscan_current_user_v1', JSON.stringify(updatedUser));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-600"></span>
          <span className="text-xs font-semibold text-emerald-800">
            Localized Agronomic Vernacular Engine
          </span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 font-serif">
          Language Settings
        </h1>
        <p className="mt-1 text-xs text-stone-600">
          Switch the entire user interface, navigation menus, AI diagnostic results, symptoms, and voice assistant speech to your preferred regional language. All translations are stored locally on this device.
        </p>
      </div>

      {/* Language Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {languagesList.map((lang) => {
          const isSelected = currentLang === lang.code;
          return (
            <div
              key={lang.code}
              onClick={() => lang.active && handleSelectLanguage(lang.code)}
              className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                !lang.active
                  ? 'border-dashed border-stone-200 bg-stone-50/50 opacity-60 cursor-not-allowed'
                  : isSelected
                  ? 'border-emerald-700 bg-emerald-50/70 shadow-xs ring-2 ring-emerald-600 cursor-pointer'
                  : 'border-stone-200 bg-white hover:border-emerald-600 cursor-pointer shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-stone-900 font-serif">{lang.nativeName}</span>
                  {isSelected ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-800 text-white">
                      <Check className="h-4 w-4" />
                    </span>
                  ) : lang.active ? (
                    <span className="text-[10px] font-semibold text-stone-400 font-mono uppercase">Available</span>
                  ) : (
                    <span className="text-[10px] font-semibold text-stone-400 font-mono uppercase">Coming Soon</span>
                  )}
                </div>

                <p className="text-xs font-semibold text-emerald-950 mt-1">{lang.name}</p>
                <p className="text-[11px] text-stone-500 font-mono mt-0.5">{lang.region}</p>

                <p className="mt-3 text-xs text-stone-600 leading-normal">
                  {lang.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200/60">
                {isSelected ? (
                  <span className="text-xs font-bold text-emerald-800">Currently Active</span>
                ) : lang.active ? (
                  <span className="text-xs font-semibold text-stone-700 hover:text-emerald-800">Switch to {lang.name}</span>
                ) : (
                  <span className="text-[11px] text-stone-400">Extensible language slot</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Offline Translation Notice */}
      <div className="rounded-xl border border-stone-200 bg-white p-4 text-xs text-stone-600 flex items-start gap-3 shadow-xs">
        <Info className="h-4 w-4 text-emerald-800 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-stone-900">100% Local Dictionary Architecture: </span>
          <span>
            Unlike cloud-based translation tools, all agricultural descriptions, treatment steps, and voice synthesis lexicons are embedded in local JSON bundles. No internet requests are dispatched when changing languages.
          </span>
        </div>
      </div>
    </div>
  );
};
