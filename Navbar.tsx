import React, { useState, useEffect } from 'react';
import { User, Language, FarmerAlert } from '../types';
import { translations } from '../data/translations';
import { localDb } from '../services/localDb';
import { 
  WifiOff, 
  Globe, 
  Bell, 
  User as UserIcon, 
  LogOut, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  Menu
} from 'lucide-react';
import { voiceAssistant } from '../services/voiceAssistant';

interface NavbarProps {
  currentUser: User | null;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onLogout: () => void;
  onToggleSidebar?: () => void;
  activeService: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentLang,
  onLanguageChange,
  onLogout,
  onToggleSidebar,
}) => {
  const t = translations[currentLang];
  const [alerts, setAlerts] = useState<FarmerAlert[]>([]);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const list = await localDb.getAlerts();
        if (list.length === 0) {
          // Initialize sample alert if empty
          const sample: FarmerAlert = {
            id: 'alert_initial',
            timestamp: new Date().toISOString(),
            title: 'High Humidity Weather Advisory',
            message: 'Relative humidity in your zone exceeds 85%. Inspect lower tomato and potato leaves for Early and Late Blight spores.',
            severity: 'warning',
            read: false,
            cropTarget: 'Tomato / Potato',
            actionRequired: 'Ensure foliage aeration and deploy preventive copper shield.',
          };
          await localDb.saveAlert(sample);
          setAlerts([sample]);
        } else {
          setAlerts(list);
        }
      } catch {
        // local db fallback
      }
    };
    fetchAlerts();
  }, []);

  const unreadCount = alerts.filter((a) => !a.read).length;

  const handleMarkAllRead = async () => {
    await localDb.markAlertsRead();
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  const toggleVoiceMute = () => {
    if (voiceAssistant.isCurrentlySpeaking()) {
      voiceAssistant.stop();
      setIsSpeaking(false);
    } else {
      voiceAssistant.speak(`${t.appName}. ${t.offlineStatus}. ${t.tagline}`, currentLang);
      setIsSpeaking(true);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-stone-200 bg-white/95 px-4 backdrop-blur-md md:px-6">
      {/* Zone 1: Brand Wordmark & Mobile Hamburger */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-stone-600 hover:bg-stone-100 md:hidden"
          title="Toggle Navigation"
          aria-label="Toggle Navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <a href="#home" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700 text-white shadow-xs">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.5 8.4" />
              <path d="M12 22a10 10 0 0 0 10-10c0-5.5-4.5-10-10-10" />
              <path d="M12 2v20" />
              <path d="M12 7c2.5 0 5 1.5 6 4" />
              <path d="M12 12c-2.5 0-5 1.5-6 4" />
            </svg>
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-emerald-950 font-serif">AgriScan</span>
            <span className="hidden text-xs text-stone-500 sm:inline ml-2 font-mono">v2.4-offline</span>
          </div>
        </a>
      </div>

      {/* Zone 2: Offline Status & Quick Actions */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Offline Status Capsule */}
        <div 
          className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 border border-emerald-200"
          title={t.offlineReady}
        >
          <WifiOff className="h-3.5 w-3.5 text-emerald-700" />
          <span className="hidden sm:inline">{t.offlineStatus}</span>
          <span className="sm:hidden">Offline</span>
        </div>

        {/* Voice Readout Toggle */}
        <button
          onClick={toggleVoiceMute}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
            isSpeaking ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-stone-200 text-stone-600 hover:bg-stone-50'
          }`}
          title={isSpeaking ? 'Stop Voice Guidance' : 'Speak Page Overview'}
          aria-label="Voice assistance"
        >
          {isSpeaking ? <Volume2 className="h-4 w-4 animate-pulse" /> : <VolumeX className="h-4 w-4" />}
        </button>

        {/* Language Selector */}
        <div className="relative flex items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-2 py-1">
          <Globe className="h-3.5 w-3.5 text-stone-500" />
          <select
            value={currentLang}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="cursor-pointer bg-transparent text-xs font-medium text-stone-700 focus:outline-hidden"
            aria-label="Select language"
          >
            <option value="en">English (EN)</option>
            <option value="kn">ಕನ್ನಡ (KN)</option>
            <option value="hi">हिंदी (HI)</option>
          </select>
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => setShowAlertModal(!showAlertModal)}
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50"
          title="Smart Farmer Alerts"
          aria-label="Alerts"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-600 px-1 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Zone 3: 1 Primary Action (User Profile & Sign Out) */}
      <div className="flex items-center gap-3 shrink-0">
        {currentUser ? (
          <div className="flex items-center gap-2">
            <div className="hidden text-right lg:block">
              <p className="text-xs font-semibold text-stone-800 leading-none">{currentUser.fullName}</p>
              <p className="text-[11px] text-stone-500 font-mono mt-0.5">{currentUser.district}, {currentUser.state}</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-colors"
              title="Sign Out"
            >
              <LogOut className="h-3.5 w-3.5 text-stone-500" />
              <span className="hidden sm:inline">{t.auth.logout}</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <UserIcon className="h-4 w-4 text-stone-500" />
          </div>
        )}
      </div>

      {/* Alerts Modal Drawer */}
      {showAlertModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/30 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl border border-stone-200 bg-white p-5 shadow-xl animate-in fade-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-emerald-700" />
                <h3 className="font-semibold text-stone-900 text-sm">{t.alerts.title}</h3>
              </div>
              <div className="flex items-center gap-3">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-xs text-emerald-700 hover:underline"
                  >
                    {t.alerts.markRead}
                  </button>
                )}
                <button
                  onClick={() => setShowAlertModal(false)}
                  className="rounded-md p-1 text-stone-400 hover:text-stone-700"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="mt-4 max-h-96 space-y-3 overflow-y-auto">
              {alerts.length === 0 ? (
                <p className="py-6 text-center text-xs text-stone-500">{t.alerts.noAlerts}</p>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`rounded-lg border p-3 text-xs transition-colors ${
                      alert.severity === 'warning'
                        ? 'border-amber-200 bg-amber-50/50 text-amber-950'
                        : alert.severity === 'alert'
                        ? 'border-red-200 bg-red-50/50 text-red-950'
                        : 'border-stone-200 bg-stone-50 text-stone-800'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {alert.severity === 'warning' ? (
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      ) : alert.severity === 'alert' ? (
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                      ) : (
                        <Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      )}
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{alert.title}</h4>
                          <span className="text-[10px] text-stone-400 font-mono">
                            {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="mt-1 text-stone-600 leading-relaxed">{alert.message}</p>
                        {alert.actionRequired && (
                          <p className="mt-2 text-stone-700 font-medium">
                            <span className="text-emerald-800 font-bold">Action:</span> {alert.actionRequired}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 border-t border-stone-100 pt-3 text-center">
              <button
                onClick={() => setShowAlertModal(false)}
                className="w-full rounded-lg bg-stone-100 py-2 text-xs font-medium text-stone-700 hover:bg-stone-200"
              >
                Close Alerts
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
