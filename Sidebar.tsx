import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import {
  Home,
  ScanLine,
  Images,
  Bug,
  HelpCircle,
  Activity,
  ShieldCheck,
  BookOpen,
  CloudSun,
  History,
  FileText,
  Mic,
  Bell,
  Globe,
  User as UserIcon,
  Settings as SettingsIcon,
  LogOut,
  X,
  WifiOff,
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  currentLang: Language;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  currentLang,
  isOpenMobile,
  onCloseMobile,
  onLogout,
}) => {
  const t = translations[currentLang];

  // Exactly 17 items in the requested order
  const navItems = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'scanner', label: t.nav.scanner, icon: ScanLine },
    { id: 'multiImage', label: t.nav.multiImage, icon: Images },
    { id: 'pests', label: t.nav.pests, icon: Bug },
    { id: 'multiCause', label: t.nav.multiCause, icon: HelpCircle },
    { id: 'healthReport', label: t.nav.healthReport, icon: Activity },
    { id: 'recommendations', label: t.nav.recommendations, icon: ShieldCheck },
    { id: 'encyclopedia', label: t.nav.encyclopedia, icon: BookOpen },
    { id: 'risk', label: t.nav.risk, icon: CloudSun },
    { id: 'history', label: t.nav.history, icon: History },
    { id: 'notes', label: t.nav.notes, icon: FileText },
    { id: 'voice', label: t.nav.voice, icon: Mic },
    { id: 'reminders', label: t.nav.reminders, icon: Bell },
    { id: 'languages', label: t.nav.languages, icon: Globe },
    { id: 'profile', label: t.nav.profile, icon: UserIcon },
    { id: 'settings', label: t.nav.settings, icon: SettingsIcon },
    { id: 'logout', label: t.nav.logout, icon: LogOut, isAction: true },
  ];

  const handleItemClick = (item: typeof navItems[0]) => {
    if (item.id === 'logout') {
      onLogout();
      if (onCloseMobile) onCloseMobile();
      return;
    }
    onTabChange(item.id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-stone-900/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Permanent Left Sidebar on Laptop/Desktop (w-64 or w-72), Collapsible Left Drawer on Mobile */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-stone-200 bg-white transition-transform duration-200 ease-in-out md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-stone-100 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-800 text-white shadow-xs">
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
              <span className="block text-[10px] text-emerald-700 font-semibold uppercase tracking-wider">Offline AI System</span>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 md:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items List (17 items, vertical scrollable) */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
          <div className="px-3 pb-1 pt-1 text-[10px] font-bold uppercase tracking-wider text-stone-400">
            Navigation Menu (17 Services)
          </div>

          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            const isLogout = item.id === 'logout';

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                  isLogout
                    ? 'mt-3 text-red-700 hover:bg-red-50 border-t border-stone-100 pt-3'
                    : isActive
                    ? 'bg-emerald-800 text-white shadow-xs font-semibold'
                    : 'text-stone-700 hover:bg-stone-100/80 hover:text-stone-900'
                }`}
              >
                <div className={`flex h-6 w-6 items-center justify-center shrink-0 ${
                  isLogout ? 'text-red-600' : isActive ? 'text-white' : 'text-stone-500'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="truncate text-left flex-1">{item.label}</span>
                <span className={`text-[10px] font-mono shrink-0 ${isActive ? 'text-emerald-200' : 'text-stone-400'}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>

        {/* Permanent Left Footer: Offline Status & Storage Indicator */}
        <div className="border-t border-stone-100 p-3 bg-stone-50/70">
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[11px] font-medium text-emerald-800 border border-emerald-200/60">
            <WifiOff className="h-3.5 w-3.5 shrink-0 text-emerald-700" />
            <div className="leading-tight">
              <span className="font-bold">100% Offline Mode</span>
              <span className="block text-[10px] text-stone-500">IndexedDB & Local CV</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
