import { EnvironmentalRiskInput, RiskPredictionResult } from '../types';

export function calculateEnvironmentalRisk(input: EnvironmentalRiskInput): RiskPredictionResult {
  const { temperatureC, relativeHumidity, rainfallMm, cropType, growthStage, soilMoisture } = input;

  let totalRisk = 0;
  const vulnerabilities: RiskPredictionResult['primaryVulnerabilities'] = [];
  const favorableFactors: string[] = [];

  // Disease Triangle Environmental Rules (Local agronomic epidemiology)

  // 1. Solanaceous crops: Tomato / Potato Late Blight (Phytophthora) & Early Blight (Alternaria)
  if (cropType === 'Tomato' || cropType === 'Potato') {
    // Late Blight favorability: 12-21°C + >88% RH + persistent moisture
    if (temperatureC >= 10 && temperatureC <= 22 && relativeHumidity >= 85) {
      const idx = Math.min(95, Math.round(50 + (relativeHumidity - 85) * 3 + (rainfallMm > 10 ? 20 : 5)));
      vulnerabilities.push({
        diseaseName: 'Late Blight (Phytophthora infestans)',
        pathogen: 'Oomycete / Water Mold',
        riskIndex: idx,
        favoredReason: `Cool temperatures (${temperatureC}°C) and saturated relative humidity (${relativeHumidity}%) create an ideal sporulation window.`,
        preventativeMeasures: [
          'Apply prophylactic protective spray of Copper Oxychloride 50% WP (2.5 g/L)',
          'Ensure ridge drainage to avoid tuber waterlogging',
          'Inspect leaf undersides for white fungal mold at dawn',
        ],
      });
      totalRisk += idx * 0.5;
    }

    // Early Blight favorability: 24-30°C + moderate-high humidity
    if (temperatureC >= 23 && temperatureC <= 32 && (relativeHumidity > 75 || rainfallMm > 5)) {
      const idx = Math.min(92, Math.round(45 + (temperatureC - 23) * 3 + (relativeHumidity > 80 ? 15 : 5)));
      vulnerabilities.push({
        diseaseName: 'Early Blight (Alternaria solani)',
        pathogen: 'Fungus',
        riskIndex: idx,
        favoredReason: `Warm temperatures (${temperatureC}°C) coupled with intermittent dew or rainfall trigger conidial germination.`,
        preventativeMeasures: [
          'Prune dense bottom foliage to improve airflow and hasten canopy drying',
          'Avoid overhead sprinkler watering during late afternoon',
          'Apply preventive bio-agent Trichoderma harzianum',
        ],
      });
      totalRisk += idx * 0.4;
    }

    // Whitefly & Tomato Yellow Leaf Curl Virus (TYLCV)
    if (temperatureC > 30 && relativeHumidity < 65 && rainfallMm < 3) {
      const idx = 78;
      vulnerabilities.push({
        diseaseName: 'Whitefly Vector & Leaf Curl Virus (TYLCV)',
        pathogen: 'Insect Vector + Begomovirus',
        riskIndex: idx,
        favoredReason: 'Hot and dry conditions accelerate whitefly reproductive cycles and dispersal across crops.',
        preventativeMeasures: [
          'Erect yellow sticky traps around crop perimeter (15 traps/acre)',
          'Spray cold-pressed neem oil (3 ml/L) as natural feeding deterrent',
        ],
      });
      totalRisk += idx * 0.35;
    }
  }

  // 2. Rice / Paddy: Rice Blast & Bacterial Leaf Blight
  if (cropType === 'Rice (Paddy)') {
    if (temperatureC >= 22 && temperatureC <= 29 && relativeHumidity >= 88) {
      const idx = Math.min(98, Math.round(55 + (relativeHumidity - 88) * 3.5 + (growthStage === 'Flowering' ? 18 : 8)));
      vulnerabilities.push({
        diseaseName: 'Rice Blast (Magnaporthe oryzae)',
        pathogen: 'Fungus',
        riskIndex: idx,
        favoredReason: `Optimal blast incubation zone (24-28°C) under high relative humidity (${relativeHumidity}%).`,
        preventativeMeasures: [
          'Avoid top-dressing excessive chemical nitrogen fertilizers',
          'Maintain balanced potassium fertilization to reinforce silica cell walls',
          'Apply protective Tricyclazole 75% WP @ 0.6 g/L if rain persists during panicle emergence',
        ],
      });
      totalRisk += idx * 0.6;
    }
  }

  // 3. Maize / Corn: Fall Armyworm & Turcicum Blight
  if (cropType === 'Maize / Corn') {
    if (temperatureC >= 22 && temperatureC <= 33 && (growthStage === 'Seedling' || growthStage === 'Vegetative')) {
      const idx = 82;
      vulnerabilities.push({
        diseaseName: 'Fall Armyworm (Spodoptera frugiperda)',
        pathogen: 'Lepidopteran Pest',
        riskIndex: idx,
        favoredReason: `Warm conditions during early whorl stage (${growthStage}) provide highly vulnerable tender feeding tissue.`,
        preventativeMeasures: [
          'Deploy pheromone monitoring traps (5 traps/acre)',
          'Apply neem seed kernel extract (NSKE 5%) or sand-wood ash into central whorls',
          'Scout inner leaves every 4 days for pin-hole feeding punctures',
        ],
      });
      totalRisk += idx * 0.55;
    }
  }

  // Growth stage modifiers
  if (growthStage === 'Flowering' || growthStage === 'Fruit/Grain Filling') {
    favorableFactors.push(`Crop is in sensitive reproductive phase (${growthStage}), increasing yield penalty if infected.`);
  }

  if (relativeHumidity > 80) {
    favorableFactors.push(`High atmospheric humidity (${relativeHumidity}%) promotes foliar fungal spore adhesion and germ tube penetration.`);
  }

  if (rainfallMm > 15) {
    favorableFactors.push(`Recent rainfall (${rainfallMm} mm) causes soil splashing and prolongs leaf surface wetness.`);
  }

  if (soilMoisture === 'Waterlogged') {
    favorableFactors.push('Waterlogged root zone limits oxygen uptake, causing root stress and predisposing plants to soil-borne damping-off and wilts.');
    totalRisk += 15;
  }

  const finalScore = Math.min(98, Math.max(12, Math.round(totalRisk > 0 ? totalRisk / Math.max(1, vulnerabilities.length * 0.8) : 18)));

  let overallRiskLevel: RiskPredictionResult['overallRiskLevel'] = 'Low';
  if (finalScore >= 75) overallRiskLevel = 'Severe';
  else if (finalScore >= 55) overallRiskLevel = 'High';
  else if (finalScore >= 35) overallRiskLevel = 'Moderate';

  let inspectionRecommendation = 'Routine crop monitoring every 7-10 days is adequate under current climatic parameters.';
  if (overallRiskLevel === 'Severe' || overallRiskLevel === 'High') {
    inspectionRecommendation = 'Urgent: Perform on-site field inspection within 24 to 48 hours. Check lower leaf undersides and deploy prophylactic organic/biological shields.';
  }

  return {
    cropType,
    overallRiskLevel,
    riskScore: finalScore,
    primaryVulnerabilities: vulnerabilities.length > 0 ? vulnerabilities : [
      {
        diseaseName: 'General Foliar Fungal Pathogens',
        pathogen: 'Fungal Spores',
        riskIndex: finalScore,
        favoredReason: 'Environmental conditions are currently stable with low immediate disease pressure.',
        preventativeMeasures: [
          'Maintain regular weeding to reduce microclimate humidity in crop rows',
          'Ensure adequate spacing between plants',
        ],
      },
    ],
    favorableFactors,
    inspectionRecommendation,
  };
}
