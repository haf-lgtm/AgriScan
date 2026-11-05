import React, { useState, useEffect } from 'react';
import { User, Language } from './types';
import { getCurrentUser, logoutUser, initializeDefaultUser } from './services/authService';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { Dashboard } from './components/Dashboard';
import { AiCropScanner } from './components/AiCropScanner';
import { MultiImageDetection } from './components/MultiImageDetection';
import { PestIdentifier } from './components/PestIdentifier';
import { MultiCauseDiagnosis } from './components/MultiCauseDiagnosis';
import { HealthScoreView } from './components/HealthScoreView';
import { TreatmentView } from './components/TreatmentView';
import { EncyclopediaView } from './components/EncyclopediaView';
import { RiskPredictor } from './components/RiskPredictor';
import { HistoryAndCompare } from './components/HistoryAndCompare';
import { KnowledgeLibrary } from './components/KnowledgeLibrary';
import { VoiceAssistantView } from './components/VoiceAssistantView';
import { RemindersView } from './components/RemindersView';
import { LanguageSettingsView } from './components/LanguageSettingsView';
import { ProfileView } from './components/ProfileView';
import { SettingsAndGuide } from './components/SettingsAndGuide';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);
  const [scannerInitialMode, setScannerInitialMode] = useState<'camera' | 'upload'>('upload');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize auth state on mount
  useEffect(() => {
    const init = async () => {
      await initializeDefaultUser();
      const user = getCurrentUser();
      if (user) {
        setCurrentUser(user);
        if (user.preferredLanguage) {
          setCurrentLang(user.preferredLanguage);
        }
      }
    };
    init();
  }, []);

  const handleLoginSuccess = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user?.preferredLanguage) {
      setCurrentLang(user.preferredLanguage);
    }
    setActiveTab('home');
    showToast('Signed in successfully in offline mode.');
  };

  const handleRegisterSuccess = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user?.preferredLanguage) {
      setCurrentLang(user.preferredLanguage);
    }
    setActiveTab('home');
    showToast('Offline farmer profile registered.');
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setAuthView('login');
    showToast('Signed out of local session.');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // If not logged in, render Page 1 (Login) or Page 2 (Register)
  if (!currentUser) {
    if (authView === 'login') {
      return (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onNavigateToRegister={() => setAuthView('register')}
          currentLang={currentLang}
        />
      );
    } else {
      return (
        <RegisterPage
          onRegisterSuccess={handleRegisterSuccess}
          onNavigateToLogin={() => setAuthView('login')}
          currentLang={currentLang}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col md:flex-row">
      {/* Permanent Left-Side Navigation on Desktop/Laptop, Collapsible Left Drawer on Mobile */}
      <Sidebar
        currentTab={activeTab}
        onTabChange={(tabId) => {
          setActiveTab(tabId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentLang={currentLang}
        isOpenMobile={sidebarOpenMobile}
        onCloseMobile={() => setSidebarOpenMobile(false)}
        onLogout={handleLogout}
      />

      {/* Main Content Area to the RIGHT of the Sidebar */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <Navbar
          currentUser={currentUser}
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          onLogout={handleLogout}
          onToggleSidebar={() => setSidebarOpenMobile(!sidebarOpenMobile)}
          activeService={activeTab}
        />

        {/* Viewport Content */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full min-w-0">
          {/* 1. Home Dashboard */}
          {activeTab === 'home' && (
            <Dashboard
              currentUser={currentUser}
              currentLang={currentLang}
              onNavigate={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenScannerWithMode={(mode) => {
                setScannerInitialMode(mode);
                setActiveTab('scanner');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* 2. AI Crop Scanner */}
          {activeTab === 'scanner' && (
            <AiCropScanner
              currentUser={currentUser}
              currentLang={currentLang}
              initialMode={scannerInitialMode}
              onNavigateToTreatment={() => setActiveTab('recommendations')}
            />
          )}

          {/* 3. Multiple Image Detection */}
          {activeTab === 'multiImage' && (
            <MultiImageDetection
              currentUser={currentUser}
              currentLang={currentLang}
            />
          )}

          {/* 4. Pest Identification */}
          {activeTab === 'pests' && (
            <PestIdentifier
              currentUser={currentUser}
              currentLang={currentLang}
            />
          )}

          {/* 5. Multi-Cause Diagnosis */}
          {activeTab === 'multiCause' && (
            <MultiCauseDiagnosis
              currentUser={currentUser}
              currentLang={currentLang}
            />
          )}

          {/* 6. Crop Health Report */}
          {activeTab === 'healthReport' && (
            <HealthScoreView
              currentUser={currentUser}
              currentLang={currentLang}
            />
          )}

          {/* 7. Treatment Recommendations */}
          {activeTab === 'recommendations' && (
            <TreatmentView
              currentUser={currentUser}
              currentLang={currentLang}
            />
          )}

          {/* 8. Disease Encyclopedia */}
          {activeTab === 'encyclopedia' && (
            <EncyclopediaView
              currentUser={currentUser}
              currentLang={currentLang}
            />
          )}

          {/* 9. Risk Prediction */}
          {activeTab === 'risk' && (
            <RiskPredictor
              currentUser={currentUser}
              currentLang={currentLang}
            />
          )}

          {/* 10. Scan History */}
          {activeTab === 'history' && (
            <HistoryAndCompare
              currentUser={currentUser}
              currentLang={currentLang}
            />
          )}

          {/* 11. Farmer Notes */}
          {activeTab === 'notes' && (
            <KnowledgeLibrary
              currentUser={currentUser}
              currentLang={currentLang}
            />
          )}

          {/* 12. Voice Assistant */}
          {activeTab === 'voice' && (
            <VoiceAssistantView
              currentUser={currentUser}
              currentLang={currentLang}
            />
          )}

          {/* 13. Notifications and Reminders */}
          {activeTab === 'reminders' && (
            <RemindersView
              currentUser={currentUser}
              currentLang={currentLang}
            />
          )}

          {/* 14. Language Settings */}
          {activeTab === 'languages' && (
            <LanguageSettingsView
              currentUser={currentUser}
              currentLang={currentLang}
              onLanguageChange={setCurrentLang}
            />
          )}

          {/* 15. Profile */}
          {activeTab === 'profile' && (
            <ProfileView
              currentUser={currentUser}
              currentLang={currentLang}
              onUserUpdated={() => {
                const refreshed = getCurrentUser();
                setCurrentUser(refreshed);
              }}
            />
          )}

          {/* 16. Settings */}
          {activeTab === 'settings' && (
            <SettingsAndGuide
              currentUser={currentUser}
              currentLang={currentLang}
              onLanguageChange={setCurrentLang}
              onUserUpdated={() => {
                const refreshed = getCurrentUser();
                setCurrentUser(refreshed);
              }}
            />
          )}
        </main>
      </div>

      {/* Offline Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 rounded-xl border border-stone-800 bg-stone-900/95 px-4 py-2.5 text-xs text-white shadow-xl backdrop-blur-md">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
