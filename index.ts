export type Language = 'en' | 'kn' | 'hi';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string;
  state: string;
  district: string;
  preferredLanguage: Language;
  mainCrop: string;
  createdAt: string;
}

export type SeverityLevel = 'Mild' | 'Moderate' | 'Severe' | 'Critical' | 'Healthy';

export interface LesionFeature {
  chlorosisPercent: number; // yellowing %
  necrosisPercent: number;  // dead brown tissue %
  spotCount: number;        // isolated spot count
  concentricRings: boolean; // target spot indicator
  waterSoaked: boolean;     // bacterial indicator
  marginDamage: boolean;    // nutrient/pest indicator
}

export interface LeafDetectionBox {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  cropName: string;
  diagnosis: string;
  severity: SeverityLevel;
  healthScore: number;
}

export interface ScanResult {
  id: string;
  userId: string;
  timestamp: string;
  imageUrl: string;
  cropName: string;
  predictedCondition: string;
  pathogenType: 'Fungal' | 'Bacterial' | 'Viral' | 'Pest' | 'Nutrient Deficiency' | 'Healthy' | 'Beneficial Insect' | 'Unknown' | 'Physiological';
  confidenceScore: number; // 0 - 100
  severity: SeverityLevel;
  visibleSymptoms: string[];
  recommendedSteps: string[];
  organicTreatments: string[];
  biologicalControls: string[];
  ipmPractices: string[];
  chemicalTreatments: string[];
  similarDiseases?: { name: string; distinction: string }[];
  isBeneficial?: boolean;
  notes?: string;
  environmentalRiskScore?: number;
  leafDetections?: LeafDetectionBox[];
  isRecaptureRecommended?: boolean;
  recaptureReason?: string;
}

export interface DiseaseEncyclopediaItem {
  id: string;
  name: string;
  scientificName: string;
  pathogenType: 'Fungal' | 'Bacterial' | 'Viral' | 'Pest' | 'Nutrient Deficiency' | 'Physiological' | 'Healthy';
  affectedCrops: string[];
  affectedPlantParts?: string[];
  severityLevel?: SeverityLevel;
  symptoms: string[];
  causes: string[];
  prevention: string[];
  organicTreatment: string[];
  biologicalControl: string[];
  chemicalTreatment: string[];
  image: string;
  favorableConditions: {
    tempRange: string;
    humidityRange: string;
    rainfall: string;
  };
  similarDiseases: {
    name: string;
    keyDifference: string;
  }[];
}

export interface BeneficialInsectItem {
  id: string;
  name: string;
  scientificName: string;
  preysOn: string[];
  cropsProtected: string[];
  ecologicalBenefit: string;
  howToAttract: string[];
  safeFarmingPractice: string;
  image: string;
}

export interface PestItem {
  id: string;
  name: string;
  scientificName: string;
  cropsAffected: string[];
  damageSymptoms: string[];
  infestationSeverity: SeverityLevel;
  preventionMethods: string[];
  organicControls: string[];
  chemicalControl: string[];
  image: string;
  isBeneficial: boolean;
}

export interface DeficiencyItem {
  id: string;
  name: string;
  nutrient: string;
  roleInPlant: string;
  symptoms: string[];
  distinctionFromDisease: string;
  correctiveActions: string[];
  organicSources: string[];
  affectedLeafRegion: 'Older Leaves' | 'Younger Leaves' | 'Whole Plant' | 'Leaf Margins';
}

export interface EnvironmentalRiskInput {
  temperatureC: number;
  relativeHumidity: number;
  rainfallMm: number;
  cropType: string;
  growthStage: 'Seedling' | 'Vegetative' | 'Flowering' | 'Fruit/Grain Filling' | 'Maturity';
  soilMoisture: 'Dry' | 'Optimal' | 'Waterlogged';
}

export interface RiskPredictionResult {
  cropType: string;
  overallRiskLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
  riskScore: number; // 0 - 100
  primaryVulnerabilities: {
    diseaseName: string;
    pathogen: string;
    riskIndex: number;
    favoredReason: string;
    preventativeMeasures: string[];
  }[];
  favorableFactors: string[];
  inspectionRecommendation: string;
}

export interface FarmerAlert {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'alert';
  read: boolean;
  cropTarget?: string;
  actionRequired?: string;
}

export interface FieldNote {
  id: string;
  date: string;
  title: string;
  crop: string;
  plotLocation: string;
  observation: string;
  imageUrl?: string;
}

export interface FarmerReminder {
  id: string;
  title: string;
  crop: string;
  dueDate: string;
  time: string;
  priority: 'low' | 'medium' | 'high';
  category: 'Inspection' | 'Spraying' | 'Irrigation' | 'Harvest' | 'General';
  completed: boolean;
  notes?: string;
}

export interface MultiImageBatchItem {
  id: string;
  imageSrc: string;
  fileName: string;
  cropName: string;
  analysis?: ScanResult;
  isAnalyzing?: boolean;
}

export interface MultiImageBatchReport {
  totalAnalyzed: number;
  healthyCount: number;
  diseasedCount: number;
  pestDamagedCount: number;
  uncertainCount: number;
  overallHealthStatus: 'Optimal' | 'Mild Concern' | 'Moderate Outbreak' | 'Severe Infestation';
  summaryProse: string;
  recommendedInterventions: string[];
}

export interface MultiCauseQuestionnaire {
  leafLocation: 'older' | 'younger' | 'all';
  patternType: 'uniform' | 'interveinal' | 'marginal_scorch' | 'concentric_spots' | 'water_soaked' | 'holes_chewed' | 'wilting';
  speedOfOnset: 'gradual_weeks' | 'sudden_days' | 'after_rain';
  weatherStress: 'none' | 'frost_cold' | 'extreme_heat' | 'drought' | 'waterlogging';
  pesticideRecentlySprayed: boolean;
  fertilizerDeficiencySuspected: boolean;
}

export interface MultiCauseDiagnosisResult {
  primaryCause: string;
  causeCategory: 'Fungal Disease' | 'Bacterial Disease' | 'Viral Disease' | 'Pest Damage' | 'Nutrient Deficiency' | 'Environmental Stress';
  confidence: number;
  underlyingMechanisms: string[];
  contributingFactors: string[];
  secondaryPossibilities: { cause: string; probability: number; rationale: string }[];
  fieldQuestions: string[];
  expertVerificationGuidance: string;
  recommendedActions: string[];
}

