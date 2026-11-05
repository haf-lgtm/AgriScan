import { Language } from '../types';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  offlineStatus: string;
  offlineReady: string;
  nav: {
    home: string;
    scanner: string;
    multiImage: string;
    pests: string;
    multiCause: string;
    healthReport: string;
    recommendations: string;
    encyclopedia: string;
    risk: string;
    history: string;
    notes: string;
    voice: string;
    reminders: string;
    languages: string;
    profile: string;
    settings: string;
    logout: string;
  };
  auth: {
    welcomeBack: string;
    loginTitle: string;
    registerTitle: string;
    emailOrUsername: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    phone: string;
    state: string;
    district: string;
    preferredLanguage: string;
    mainCrop: string;
    rememberMe: string;
    forgotPassword: string;
    loginBtn: string;
    registerBtn: string;
    noAccount: string;
    hasAccount: string;
    logout: string;
    localAuthNotice: string;
  };
  scanner: {
    title: string;
    subtitle: string;
    uploadTab: string;
    cameraTab: string;
    selectCrop: string;
    analyzeBtn: string;
    analyzing: string;
    capture: string;
    recaptureRequired: string;
    recaptureTip: string;
    confidence: string;
    severity: string;
    symptoms: string;
    nextSteps: string;
    healthyLeaf: string;
  };
  pests: {
    title: string;
    subtitle: string;
    harmfulPests: string;
    beneficialInsects: string;
    beneficialBadge: string;
    harmfulBadge: string;
    protectFriendly: string;
    biologicalRole: string;
  };
  deficiency: {
    title: string;
    subtitle: string;
    diseaseVsNutrient: string;
    howToTellDifference: string;
  };
  risk: {
    title: string;
    subtitle: string;
    temp: string;
    humidity: string;
    rainfall: string;
    growthStage: string;
    soilCondition: string;
    calculateRisk: string;
    riskDisclaimer: string;
  };
  report: {
    title: string;
    overallHealth: string;
    healthyIndicators: string;
    diseaseIndicators: string;
    pestIndicators: string;
    disclaimer: string;
    exportReport: string;
  };
  alerts: {
    title: string;
    noAlerts: string;
    markRead: string;
    criticalNotice: string;
  };
  common: {
    viewDetails: string;
    learnMore: string;
    save: string;
    cancel: string;
    search: string;
    filter: string;
    all: string;
    export: string;
    compare: string;
    date: string;
    crop: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    appName: 'AgriScan',
    tagline: 'Offline AI-Powered Crop Disease, Pest & Health Diagnostic System',
    offlineStatus: '100% Offline Mode Active',
    offlineReady: 'Zero cloud dependencies · Local CV engine ready',
    nav: {
      home: 'Home',
      scanner: 'AI Crop Scanner',
      multiImage: 'Multiple Image Detection',
      pests: 'Pest Identification',
      multiCause: 'Multi-Cause Diagnosis',
      healthReport: 'Crop Health Report',
      recommendations: 'Treatment Recommendations',
      encyclopedia: 'Disease Encyclopedia',
      risk: 'Risk Prediction',
      history: 'Scan History',
      notes: 'Farmer Notes',
      voice: 'Voice Assistant',
      reminders: 'Notifications and Reminders',
      languages: 'Language Settings',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
    },
    auth: {
      welcomeBack: 'Welcome back, Farmer',
      loginTitle: 'Sign in to AgriScan Local',
      registerTitle: 'Create New Farmer Profile',
      emailOrUsername: 'Email or Mobile Number',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      fullName: 'Full Name',
      phone: 'Phone Number',
      state: 'State',
      district: 'District',
      preferredLanguage: 'Preferred Language',
      mainCrop: 'Main Cultivated Crop',
      rememberMe: 'Remember Me on this device',
      forgotPassword: 'Forgot Password?',
      loginBtn: 'Sign In (Offline)',
      registerBtn: 'Register Locally',
      noAccount: "Don't have an offline profile? Register now",
      hasAccount: 'Already have a profile? Sign in',
      logout: 'Sign Out',
      localAuthNotice: 'All credentials are encrypted with SHA-256 and stored exclusively on this device in SQLite/IndexedDB.',
    },
    scanner: {
      title: 'AI Crop Scanner',
      subtitle: 'Capture or upload foliage photos to analyze crop health locally with Grad-CAM explainability.',
      uploadTab: 'Choose from Gallery',
      cameraTab: 'Capture Photo',
      selectCrop: 'Select Crop Type',
      analyzeBtn: 'Analyse Image',
      analyzing: 'Processing image pixels locally on device...',
      capture: 'Capture Frame',
      recaptureRequired: 'Low Diagnostic Confidence — Recapture Requested',
      recaptureTip: 'The leaf was not clearly detected or lighting was insufficient. Please position a single leaf in focus against a clean background.',
      confidence: 'AI Confidence Score',
      severity: 'Severity Level',
      symptoms: 'Visible Diagnostic Symptoms',
      nextSteps: 'Immediate Action Plan',
      healthyLeaf: 'Foliage Appears Healthy & Vigor Normal',
    },
    pests: {
      title: 'Intelligent Pest & Insect Identification',
      subtitle: 'Identify agricultural pests and protect beneficial insects crucial for natural pollination and biocontrol.',
      harmfulPests: 'Harmful Crop Pests',
      beneficialInsects: 'Beneficial Friend Insects',
      beneficialBadge: 'Friend / Beneficial Insect',
      harmfulBadge: 'Crop Pest / Requires IPM',
      protectFriendly: 'Do Not Spray! Natural biological predator protecting your crops.',
      biologicalRole: 'Ecological Function',
    },
    deficiency: {
      title: 'Multi-Cause Diagnostic Engine',
      subtitle: 'Distinguish between fungal, bacterial, viral, pest, nutrient deficiency and environmental stress.',
      diseaseVsNutrient: 'Pathogen vs Nutrient Distinction',
      howToTellDifference: 'How to Differentiate Symptoms in Field',
    },
    risk: {
      title: 'Disease Risk Prediction',
      subtitle: 'Offline environmental disease triangle model based on temperature, humidity, rainfall, and observations.',
      temp: 'Field Temperature (°C)',
      humidity: 'Relative Humidity (%)',
      rainfall: 'Rainfall / Wetness (mm)',
      growthStage: 'Crop Phenology Stage',
      soilCondition: 'Soil Moisture Condition',
      calculateRisk: 'Estimate Environmental Risk',
      riskDisclaimer: 'Note: Risk prediction estimates microclimatic favorability for pathogen development, not a confirmed field infection.',
    },
    report: {
      title: 'Crop Health Report',
      overallHealth: 'Calculated Crop Health Index',
      healthyIndicators: 'Healthy Biomass Indicators',
      diseaseIndicators: 'Active Disease Pressure',
      pestIndicators: 'Pest Infestation Pressure',
      disclaimer: 'This score is an automated optical estimate based on sampled leaves and does not replace full agronomic field survey.',
      exportReport: 'Download Complete Agronomy Report (PDF/HTML)',
    },
    alerts: {
      title: 'Notifications and Reminders',
      noAlerts: 'No critical alerts at this time. All crops within safe thresholds.',
      markRead: 'Mark all as read',
      criticalNotice: 'Immediate attention recommended for high risk conditions.',
    },
    common: {
      viewDetails: 'View Details',
      learnMore: 'Learn More',
      save: 'Save Observation',
      cancel: 'Cancel',
      search: 'Search encyclopedia...',
      filter: 'Filter by crop',
      all: 'All Categories',
      export: 'Export Data',
      compare: 'Compare Scans',
      date: 'Date',
      crop: 'Crop',
    },
  },
  kn: {
    appName: 'ಅಗ್ರಿಸ್ಕ್ಯಾನ್ (AgriScan)',
    tagline: 'ಆಫ್‌ಲೈನ್ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಬೆಳೆ ರೋಗ, ಕೀಟ ಮತ್ತು ಆರೋಗ್ಯ ತಪಾಸಣಾ ವ್ಯವಸ್ಥೆ',
    offlineStatus: '100% ಆಫ್‌ಲೈನ್ ಮೋಡ್ ಸಕ್ರಿಯವಾಗಿದೆ',
    offlineReady: 'ಇಂಟರ್ನೆಟ್ ಅಗತ್ಯವಿಲ್ಲ · ಸ್ಥಳೀಯ AI ಎಂಜಿನ್ ಸಿದ್ಧವಾಗಿದೆ',
    nav: {
      home: 'ಮುಖಪುಟ (Home)',
      scanner: 'AI ಬೆಳೆ ಸ್ಕ್ಯಾನರ್',
      multiImage: 'ಬಹು ಚಿತ್ರಗಳ ತಪಾಸಣೆ',
      pests: 'ಕೀಟ ಗುರುತಿಸುವಿಕೆ',
      multiCause: 'ಬಹು-ಕಾರಣ ರೋಗನಿರ್ಣಯ',
      healthReport: 'ಬೆಳೆ ಆರೋಗ್ಯ ವರದಿ',
      recommendations: 'ಚಿಕಿತ್ಸಾ ಶಿಫಾರಸುಗಳು',
      encyclopedia: 'ರೋಗಗಳ ವಿಶ್ವಕೋಶ',
      risk: 'ರೋಗ ಅಪಾಯ ಊಹೆ',
      history: 'ಸ್ಕ್ಯಾನ್ ಇತಿಹಾಸ',
      notes: 'ರೈತರ ಟಿಪ್ಪಣಿಗಳು',
      voice: 'ಧ್ವನಿ ಸಹಾಯಕ (Voice)',
      reminders: 'ಅಧಿಸೂಚನೆಗಳು ಮತ್ತು ಜ್ಞಾಪನೆಗಳು',
      languages: 'ಭಾಷಾ ಸೆಟ್ಟಿಂಗ್ಸ್',
      profile: 'ಪ್ರೊಫೈಲ್',
      settings: 'ಸೆಟ್ಟಿಂಗ್ಸ್',
      logout: 'ಲಾಗ್ ಔಟ್',
    },
    auth: {
      welcomeBack: 'ಮತ್ತೆ ಸುಸ್ವಾಗತ, ರೈತ ಮಿತ್ರರೆ',
      loginTitle: 'ಅಗ್ರಿಸ್ಕ್ಯಾನ್ ಸ್ಥಳೀಯ ಲಾಗಿನ್',
      registerTitle: 'ಹೊಸ ರೈತ ಪ್ರೊಫೈಲ್ ರಚಿಸಿ',
      emailOrUsername: 'ಇಮೇಲ್ ಅಥವಾ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
      password: 'ಪಾಸ್‌ವರ್ಡ್',
      confirmPassword: 'ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ',
      fullName: 'ಪೂರ್ಣ ಹೆಸರು',
      phone: 'ಫೋನ್ ಸಂಖ್ಯೆ',
      state: 'ರಾಜ್ಯ',
      district: 'ಜಿಲ್ಲೆ',
      preferredLanguage: 'ಆದ್ಯತೆಯ ಭಾಷೆ',
      mainCrop: 'ಮುಖ್ಯ ಬೆಳೆ',
      rememberMe: 'ಈ ಸಾಧನದಲ್ಲಿ ನನ್ನನ್ನು ನೆನಪಿಡಿ',
      forgotPassword: 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ?',
      loginBtn: 'ಲಾಗಿನ್ ಮಾಡಿ (ಆಫ್‌ಲೈನ್)',
      registerBtn: 'ನೋಂದಣಿ ಮಾಡಿ',
      noAccount: 'ಖಾತೆ ಇಲ್ಲವೇ? ಈಗಲೇ ಉಚಿತವಾಗಿ ನೋಂದಾಯಿಸಿ',
      hasAccount: 'ಈಗಾಗಲೇ ಖಾತೆ ಹೊಂದಿದ್ದೀರಾ? ಲಾಗಿನ್ ಮಾಡಿ',
      logout: 'ಲಾಗ್ ಔಟ್',
      localAuthNotice: 'ಎಲ್ಲಾ ಮಾಹಿತಿಯನ್ನು SHA-256 ನೊಂದಿಗೆ ಸುರಕ್ಷಿತವಾಗಿ ಈ ಮೊಬೈಲ್/ಕಂಪ್ಯೂಟರ್‌ನಲ್ಲಿ ಮಾತ್ರ ಉಳಿಸಲಾಗುತ್ತದೆ.',
    },
    scanner: {
      title: 'AI ಬೆಳೆ ಸ್ಕ್ಯಾನರ್',
      subtitle: 'ಕ್ಯಾಮೆರಾ ಅಥವಾ ಗ್ಯಾಲರಿ ಮೂಲಕ ಎಲೆಯ ಫೋಟೋ ತೆಗೆದು ಆಫ್‌ಲೈನ್ AI ಯಿಂದ ರೋಗ ಪತ್ತೆ ಮಾಡಿ.',
      uploadTab: 'ಗ್ಯಾಲರಿಯಿಂದ ಆಯ್ಕೆಮಾಡಿ',
      cameraTab: 'ಕ್ಯಾಮೆರಾ ಫೋಟೋ ತೆಗೆಯಿರಿ',
      selectCrop: 'ಬೆಳೆಯ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      analyzeBtn: 'ಚಿತ್ರ ವಿಶ್ಲೇಷಿಸಿ',
      analyzing: 'ಸಾಧನದಲ್ಲಿಯೇ ಸ್ಥಳೀಯವಾಗಿ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
      capture: 'ಫೋಟೋ ತೆಗೆಯಿರಿ',
      recaptureRequired: 'ಸ್ಪಷ್ಟತೆ ಕಡಿಮೆ ಇದೆ — ದಯವಿಟ್ಟು ಮರು-ಕ್ಯಾಪ್ಚರ್ ಮಾಡಿ',
      recaptureTip: 'ಎಲೆ ಸರಿಯಾಗಿ ಕಾಣುತ್ತಿಲ್ಲ ಅಥವಾ ಬೆಳಕು ಕಡಿಮೆಯಾಗಿದೆ. ದಯವಿಟ್ಟು ಎಲೆಯನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಫೋಕಸ್ ಮಾಡಿ ಮತ್ತೊಮ್ಮೆ ಫೋಟೋ ತೆಗೆಯಿರಿ.',
      confidence: 'AI ವಿಶ್ವಾಸಾರ್ಹತೆ ಸ್ಕೋರ್',
      severity: 'ತೀವ್ರತೆಯ ಮಟ್ಟ',
      symptoms: 'ಕಂಡುಬರುವ ರೋಗ ಲಕ್ಷಣಗಳು',
      nextSteps: 'ತಕ್ಷಣದ ಪರಿಹಾರ ಕ್ರಮಗಳು',
      healthyLeaf: 'ಎಲೆ ಆರೋಗ್ಯಕರವಾಗಿದೆ, ಯಾವುದೇ ರೋಗ ಕಂಡುಬಂದಿಲ್ಲ',
    },
    pests: {
      title: 'ಕೀಟ ಮತ್ತು ಉಪದ್ರವ ಗುರುತಿಸುವಿಕೆ',
      subtitle: 'ಬೆಳೆಗೆ ಹಾನಿ ಮಾಡುವ ಕೀಟಗಳನ್ನು ಪತ್ತೆ ಮಾಡಿ ಮತ್ತು ಉಪಕಾರಿ ಕೀಟಗಳನ್ನು ರಕ್ಷಿಸಿ.',
      harmfulPests: 'ಹಾನಿಕಾರಕ ಕೀಟಗಳು',
      beneficialInsects: 'ರೈತ ಮಿತ್ರ ಉಪಕಾರಿ ಕೀಟಗಳು',
      beneficialBadge: 'ರೈತ ಮಿತ್ರ ಕೀಟ (ಉಪಕಾರಿ)',
      harmfulBadge: 'ಹಾನಿಕಾರಕ ಕೀಟ / ಕೀಟನಾಶಕ ಅಗತ್ಯ',
      protectFriendly: 'ಔಷಧ ಸಿಂಪಡಿಸಬೇಡಿ! ಇದು ನೈಸರ್ಗಿಕವಾಗಿ ಶತ್ರು ಕೀಟಗಳನ್ನು ತಿನ್ನುತ್ತದೆ.',
      biologicalRole: 'ಜೈವಿಕ ಪಾತ್ರ',
    },
    deficiency: {
      title: 'ಬಹು-ಕಾರಣ ರೋಗನಿರ್ಣಯ ಎಂಜಿನ್',
      subtitle: 'ಶಿಲೀಂಧ್ರ, ಬ್ಯಾಕ್ಟೀರಿಯಾ, ವೈರಸ್, ಕೀಟ, ಪೋಷಕಾಂಶ ಕೊರತೆ ಮತ್ತು ಪರಿಸರ ಒತ್ತಡಗಳನ್ನು ಪ್ರತ್ಯೇಕಿಸಿ.',
      diseaseVsNutrient: 'ರೋಗ ಮತ್ತು ಪೋಷಕಾಂಶ ಕೊರತೆಯ ವ್ಯತ್ಯಾಸ',
      howToTellDifference: 'ಹೊಲದಲ್ಲಿ ಲಕ್ಷಣಗಳನ್ನು ಗುರುತಿಸುವುದು ಹೇಗೆ',
    },
    risk: {
      title: 'ರೋಗ ಅಪಾಯ ಊಹೆ',
      subtitle: 'ತಾಪಮಾನ, ತೇವಾಂಶ ಮತ್ತು ಮಳೆಯ ಆಧಾರದ ಮೇಲೆ ಮುಂಚಿತವಾಗಿ ರೋಗದ ಅಪಾಯ ತಿಳಿಯಿರಿ.',
      temp: 'ತಾಪಮಾನ (°C)',
      humidity: 'ಗಾಳಿಯ ತೇವಾಂಶ (%)',
      rainfall: 'ಮಳೆ / ತೇವಾಂಶ (mm)',
      growthStage: 'ಬೆಳೆಯ ಹಂತ',
      soilCondition: 'ಮಣ್ಣಿನ ತೇವಾಂಶ ಸ್ಥಿತಿ',
      calculateRisk: 'ಅಪಾಯ ಲೆಕ್ಕಾಚಾರ ಮಾಡಿ',
      riskDisclaimer: 'ಗಮನಿಸಿ: ಇದು ಹವಾಮಾನದ ಆಧಾರದ ಮೇಲೆ ರೋಗ ಬರಬಹುದಾದ ಸಾಧ್ಯತೆಯನ್ನು ಸೂಚಿಸುತ್ತದೆ.',
    },
    report: {
      title: 'ಬೆಳೆ ಆರೋಗ್ಯ ವರದಿ',
      overallHealth: 'ಒಟ್ಟು ಬೆಳೆ ಆರೋಗ್ಯ ಸೂಚ್ಯಂಕ',
      healthyIndicators: 'ಆರೋಗ್ಯಕರ ಹಸಿರು ಸೂಚಕಗಳು',
      diseaseIndicators: 'ಸಕ್ರಿಯ ರೋಗ ಬಾಧೆ',
      pestIndicators: 'ಕೀಟ ಬಾಧೆ ಪ್ರಮಾಣ',
      disclaimer: 'ಇದು ಎಲೆಗಳ ಮಾದರಿ ಆಧಾರಿತ ಅಂದಾಜು ವರದಿಯಾಗಿದೆ.',
      exportReport: 'ಸಂಪೂರ್ಣ ವರದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ (PDF)',
    },
    alerts: {
      title: 'ಅಧಿಸೂಚನೆಗಳು ಮತ್ತು ಜ್ಞಾಪನೆಗಳು',
      noAlerts: 'ಪ್ರಸ್ತುತ ಯಾವುದೇ ತುರ್ತು ಎಚ್ಚರಿಕೆಗಳಿಲ್ಲ.',
      markRead: 'ಎಲ್ಲವನ್ನೂ ಓದಲಾಗಿದೆ ಎಂದು ಗುರುತಿಸಿ',
      criticalNotice: 'ಹೆಚ್ಚಿನ ಅಪಾಯದ ಪರಿಸ್ಥಿತಿಯಲ್ಲಿ ತಕ್ಷಣ ಗಮನಹರಿಸಿ.',
    },
    common: {
      viewDetails: 'ವಿವರಗಳನ್ನು ನೋಡಿ',
      learnMore: 'ಹೆಚ್ಚಿನ ಮಾಹಿತಿ',
      save: 'ಟಿಪ್ಪಣಿ ಉಳಿಸಿ',
      cancel: 'ರದ್ದುಮಾಡಿ',
      search: 'ವಿಶ್ವಕೋಶದಲ್ಲಿ ಹುಡುಕಿ...',
      filter: 'ಬೆಳೆಯ ಪ್ರಕಾರ ಫಿಲ್ಟರ್',
      all: 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
      export: 'ಡೇಟಾ ಡೌನ್‌ಲೋಡ್',
      compare: 'ಹೋಲಿಕೆ ಮಾಡಿ',
      date: 'ದಿನಾಂಕ',
      crop: 'ಬೆಳೆ',
    },
  },
  hi: {
    appName: 'एग्रीस्कैन (AgriScan)',
    tagline: 'ऑफ़लाइन एआई-संचालित बहु-फसल रोग, कीट एवं स्वास्थ्य निदान प्रणाली',
    offlineStatus: '100% ऑफ़लाइन मोड सक्रिय',
    offlineReady: 'इंटरनेट की कोई आवश्यकता नहीं · स्थानीय एआई मॉडल सक्रिय',
    nav: {
      home: 'होम (Dashboard)',
      scanner: 'एआई फसल स्कैनर',
      multiImage: 'मल्टीपल इमेज डिटेक्शन',
      pests: 'कीट पहचान',
      multiCause: 'बहु-कारण निदान',
      healthReport: 'फसल स्वास्थ्य रिपोर्ट',
      recommendations: 'उपचार सिफारिशें',
      encyclopedia: 'रोग विश्वकोश',
      risk: 'रोग जोखिम पूर्वानुमान',
      history: 'स्कैन इतिहास',
      notes: 'किसान नोट्स',
      voice: 'वॉयस असिस्टेंट',
      reminders: 'सूचनाएं और अनुस्मारक',
      languages: 'भाषा सेटिंग्स',
      profile: 'प्रोफ़ाइल',
      settings: 'सेटिंग्स',
      logout: 'लॉग आउट',
    },
    auth: {
      welcomeBack: 'वापसी पर स्वागत है, किसान साथी',
      loginTitle: 'एग्रीस्कैन स्थानीय लॉगिन',
      registerTitle: 'नया किसान प्रोफ़ाइल बनाएं',
      emailOrUsername: 'ईमेल या मोबाइल नंबर',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      fullName: 'पूरा नाम',
      phone: 'फ़ोन नंबर',
      state: 'राज्य',
      district: 'ज़िला',
      preferredLanguage: 'पसंदीदा भाषा',
      mainCrop: 'मुख्य फसल',
      rememberMe: 'इस डिवाइस पर मुझे याद रखें',
      forgotPassword: 'पासवर्ड भूल गए?',
      loginBtn: 'साइन इन करें (ऑफ़लाइन)',
      registerBtn: 'स्थानीय पंजीकरण करें',
      noAccount: 'प्रोफ़ाइल नहीं है? अभी निःशुल्क बनाएं',
      hasAccount: 'पहले से प्रोफ़ाइल है? लॉगिन करें',
      logout: 'लॉग आउट',
      localAuthNotice: 'सभी क्रेडेंशियल SHA-256 से एन्क्रिप्ट होकर केवल आपके इसी डिवाइस में सुरक्षित रहते हैं।',
    },
    scanner: {
      title: 'एआई फसल स्कैनर',
      subtitle: 'कैमरे या गैलरी से पत्ती की फोटो लें और ग्रेड-सीएएम व्याख्या सहित ऑफ़लाइन विश्लेषण करें।',
      uploadTab: 'गैलरी से चुनें',
      cameraTab: 'फोटो खींचें',
      selectCrop: 'फसल का चयन करें',
      analyzeBtn: 'तस्वीर का विश्लेषण करें',
      analyzing: 'डिवाइस पर स्थानीय रूप से विश्लेषण जारी है...',
      capture: 'फोटो लें',
      recaptureRequired: 'कम डायग्नोस्टिक विश्वास — दोबारा फोटो लें',
      recaptureTip: 'पत्ती साफ नहीं दिख रही है या रोशनी कम है। कृपया पत्ती को केंद्र में रखकर दोबारा स्पष्ट फोटो लें।',
      confidence: 'एआई विश्वास स्कोर',
      severity: 'गंभीरता स्तर',
      symptoms: 'दिखाई देने वाले लक्षण',
      nextSteps: 'तत्काल समाधान कदम',
      healthyLeaf: 'पत्ती पूरी तरह स्वस्थ है, कोई रोग नहीं मिला',
    },
    pests: {
      title: 'बुद्धिमान कीट पहचान एवं मित्र कीट संरक्षण',
      subtitle: 'फसल को नुकसान पहुंचाने वाले कीटों की पहचान करें और लाभकारी मित्र कीटों को बचाएं।',
      harmfulPests: 'हानिकारक फसल कीट',
      beneficialInsects: 'किसान मित्र कीट',
      beneficialBadge: 'मित्र कीट (लाभकारी)',
      harmfulBadge: 'हानिकारक कीट / नियंत्रण आवश्यक',
      protectFriendly: 'कीटनाशक न छिड़कें! यह स्वाभाविक रूप से हानिकारक कीटों को नष्ट करता है।',
      biologicalRole: 'पारिस्थितिक भूमिका',
    },
    deficiency: {
      title: 'बहु-कारण निदान इंजन',
      subtitle: 'कवक, जीवाणु, वायरस, कीट, पोषक तत्व कमी और मौसमी तनाव में अंतर समझें।',
      diseaseVsNutrient: 'रोग और पोषक तत्व कमी में अंतर',
      howToTellDifference: 'खेत में लक्षणों की पहचान कैसे करें',
    },
    risk: {
      title: 'रोग जोखिम पूर्वानुमान',
      subtitle: 'तापमान, आर्द्रता और वर्षा के आधार पर प्रारंभिक बीमारी के खतरे का आकलन।',
      temp: 'तापमान (°C)',
      humidity: 'आर्द्रता (%)',
      rainfall: 'वर्षा / नमी (mm)',
      growthStage: 'फसल अवस्था',
      soilCondition: 'मिट्टी की नमी',
      calculateRisk: 'जोखिम का अनुमान लगाएं',
      riskDisclaimer: 'नोट: यह मौसमी परिस्थितियों के आधार पर रोग की अनुकूलता का अनुमान है, पुष्टि नहीं।',
    },
    report: {
      title: 'फसल स्वास्थ्य बुद्धिमत्ता रिपोर्ट',
      overallHealth: 'गणना किया गया फसल स्वास्थ्य सूचकांक',
      healthyIndicators: 'स्वस्थ पत्ती बायोमास',
      diseaseIndicators: 'सक्रिय रोग का दबाव',
      pestIndicators: 'कीट प्रकोप स्तर',
      disclaimer: 'यह स्कोर स्कैन की गई पत्तियों के आधार पर अनुमानित है।',
      exportReport: 'कृषि विज्ञान रिपोर्ट डाउनलोड करें (PDF)',
    },
    alerts: {
      title: 'सूचनाएं और अनुस्मारक',
      noAlerts: 'वर्तमान में कोई गंभीर चेतावनी नहीं है।',
      markRead: 'सभी को पढ़ा हुआ मार्क करें',
      criticalNotice: 'उच्च जोखिम की स्थिति में तुरंत निवारक उपाय करें।',
    },
    common: {
      viewDetails: 'विवरण देखें',
      learnMore: 'और जानें',
      save: 'नोट सहेजें',
      cancel: 'रद्द करें',
      search: 'विश्वकोश में खोजें...',
      filter: 'फसल अनुसार फ़िल्टर',
      all: 'सभी श्रेणियां',
      export: 'डेटा निर्यात',
      compare: 'तुलना करें',
      date: 'दिनांक',
      crop: 'फसल',
    },
  },
};
