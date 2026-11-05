import { DiseaseEncyclopediaItem, BeneficialInsectItem, PestItem, DeficiencyItem } from '../types';

export const DISEASES_DATA: DiseaseEncyclopediaItem[] = [
  // ==========================================
  // TOMATO DISEASES (17 Conditions)
  // ==========================================
  {
    id: 'tomato-early-blight',
    name: 'Early Blight',
    scientificName: 'Alternaria solani',
    pathogenType: 'Fungal',
    affectedCrops: ['Tomato', 'Potato', 'Eggplant'],
    affectedPlantParts: ['Older Leaves', 'Stems', 'Fruit Calyx'],
    severityLevel: 'Moderate',
    symptoms: [
      'Circular dark brown to black spots with concentric target-board rings',
      'Chlorotic yellow halos surrounding the necrotic lesions',
      'Lower/older leaves develop symptoms first, spreading upward',
      'Severe defoliation exposing green fruit to sunscald',
      'Dark sunken leathery stem lesions near soil level',
    ],
    causes: [
      'Fungal pathogen Alternaria solani surviving in solanaceous plant debris',
      'Warm temperatures (24°C - 30°C) with alternating wet and dry periods',
      'Rain splash or overhead irrigation transferring spores onto foliage',
    ],
    prevention: [
      'Practice 3-year crop rotation with non-solanaceous crops (cereals/legumes)',
      'Mulch soil surface with clean straw or plastic to prevent rain splash',
      'Prune lower 25 cm of foliage to improve canopy aeration',
      'Use drip irrigation instead of overhead sprinklers',
    ],
    organicTreatment: [
      'Copper hydroxide or Bordeaux mixture (1%) preventive foliar spray',
      'Cold-pressed neem oil (3-5 ml/L) or neem seed kernel extract (NSKE 5%)',
      'Bio-fungicide Trichoderma harzianum foliar spray (5 g/L)',
    ],
    biologicalControl: [
      'Bacillus subtilis strain QST 713 bio-inoculant at onset of humidity',
      'Trichoderma viride seed and soil treatment',
    ],
    chemicalTreatment: [
      'Mancozeb 75% WP @ 2.5 g/L water as protective prophylactic spray',
      'Azoxystrobin 23% SC @ 1 ml/L or Chlorothalonil 75% WP @ 2 g/L',
      'Difenoconazole 25% EC @ 0.5 ml/L on active lesions',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '24°C - 29°C',
      humidityRange: '> 85%',
      rainfall: 'Moderate to high dew periods',
    },
    similarDiseases: [
      {
        name: 'Late Blight (Phytophthora)',
        keyDifference: 'Late blight lesions lack concentric target rings, spread rapidly into large water-soaked olive patches with white downy growth underneath.',
      },
      {
        name: 'Septoria Leaf Spot',
        keyDifference: 'Septoria spots are much smaller (2-3 mm) with tiny black specks (pycnidia) in gray centers without concentric rings.',
      },
    ],
  },
  {
    id: 'tomato-late-blight',
    name: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    pathogenType: 'Fungal',
    affectedCrops: ['Tomato', 'Potato'],
    affectedPlantParts: ['Leaves', 'Stems', 'Green & Ripe Fruit'],
    severityLevel: 'Critical',
    symptoms: [
      'Irregular water-soaked pale to dark olive-green spots on leaves',
      'Lesions rapidly enlarge, turning dark brown/purplish-black with wet collapse',
      'Delicate white fungal mold on leaf undersides in humid or misty mornings',
      'Greasy brown firm lesions on green tomato fruits',
      'Foul rotting odor in severely affected fields',
    ],
    causes: [
      'Oomycete pathogen Phytophthora infestans spread by windblown sporangia',
      'Cool temperatures (12°C - 20°C) combined with high humidity (>90%)',
      'Continuous rain or dense fog lasting 8-12 hours',
    ],
    prevention: [
      'Use certified disease-free transplants and resistant cultivars',
      'Avoid planting tomatoes near potatoes or downwind of infected fields',
      'Destroy volunteer potato plants and nightshade weeds before the season',
      'Ensure wide plant spacing for rapid canopy drying',
    ],
    organicTreatment: [
      'Copper oxychloride 50% WP (3 g/L) prophylactic application',
      'Liquid seaweed extract combined with potassium silicate to reinforce cell walls',
    ],
    biologicalControl: [
      'Trichoderma asperellum rhizosphere colonization',
      'Bacillus amyloliquefaciens foliar spray prior to rain fronts',
    ],
    chemicalTreatment: [
      'Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ) @ 2.5 g/L water at first sign',
      'Cymoxanil 8% + Mancozeb 64% WP @ 2 g/L',
      'Dimethomorph 50% WP @ 1 g/L in rotational program',
    ],
    image: '/src/assets/images/potato_late_blight_1793884803341.jpg',
    favorableConditions: {
      tempRange: '10°C - 21°C',
      humidityRange: '> 90%',
      rainfall: 'Frequent showers, fog, or persistent cloud cover',
    },
    similarDiseases: [
      {
        name: 'Early Blight',
        keyDifference: 'Early blight forms dry brown concentric target rings on older foliage, whereas late blight produces rapidly expanding water-soaked lesions with white downy underside mold.',
      },
    ],
  },
  {
    id: 'tomato-septoria-leaf-spot',
    name: 'Septoria Leaf Spot',
    scientificName: 'Septoria lycopersici',
    pathogenType: 'Fungal',
    affectedCrops: ['Tomato'],
    affectedPlantParts: ['Lower Leaves', 'Stems', 'Petioles'],
    severityLevel: 'Severe',
    symptoms: [
      'Numerous small (2-3 mm) circular spots with grayish-white centers and dark brown margins',
      'Tiny black speck-like fruiting bodies (pycnidia) visible inside the gray center',
      'Leaves turn yellow, wither, and drop prematurely from the ground up',
      'Fruit is rarely infected directly, but defoliation leads to sunscald',
    ],
    causes: [
      'Fungus Septoria lycopersici overwintering on diseased plant refuse',
      'Prolonged periods of warm wet weather (20°C - 26°C)',
      'Water splashing from rain or overhead sprinklers',
    ],
    prevention: [
      'Apply organic or plastic mulch around plant bases to prevent soil splash',
      'Stake or cage tomato plants and remove bottom leaves 20-30 cm high',
      'Rotate crops for at least 2 years out of solanaceous crops',
    ],
    organicTreatment: [
      'Copper octanoate (copper soap) or Bordeaux mixture spray every 7-10 days',
      'Potassium bicarbonate foliar spray (3 g/L)',
    ],
    biologicalControl: [
      'Bacillus subtilis foliar application',
      'Trichoderma harzianum soil drenching',
    ],
    chemicalTreatment: [
      'Chlorothalonil 75% WP @ 2 g/L water',
      'Mancozeb 75% WP @ 2 g/L',
      'Pyraclostrobin 20% WG @ 1 g/L',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '20°C - 26°C',
      humidityRange: '> 80%',
      rainfall: 'Frequent rain splashing or wet foliage',
    },
    similarDiseases: [
      {
        name: 'Bacterial Speck',
        keyDifference: 'Septoria spots develop distinct gray/white centers with visible black pycnidia; bacterial specks remain solid black or brown with distinct chlorotic halos.',
      },
    ],
  },
  {
    id: 'bacterial-spot-tomato',
    name: 'Bacterial Spot',
    scientificName: 'Xanthomonas perforans / Xanthomonas vesicatoria',
    pathogenType: 'Bacterial',
    affectedCrops: ['Tomato', 'Bell Pepper', 'Chili'],
    affectedPlantParts: ['Leaves', 'Stems', 'Fruit'],
    severityLevel: 'Severe',
    symptoms: [
      'Small (1-3 mm) dark brown, water-soaked circular spots on leaves',
      'Lesion centers dry out and frequently tear or fall out, giving a "shot-hole" look',
      'Leaves turn yellow, scorch, and drop prematurely',
      'Fruit shows small, raised, black scab-like pustules with rough brown margins',
    ],
    causes: [
      'Bacterial pathogen Xanthomonas introduced via infected seed or rain storms',
      'Warm temperatures (24°C - 30°C) with high humidity and driving rain',
      'Overhead irrigation or mechanical farm equipment spread',
    ],
    prevention: [
      'Use certified pathogen-free hot water-treated seed (50°C for 25 min)',
      'Sanitize stakes, pruning shears, and trellising twine with 10% bleach',
      'Avoid working in wet fields when dew is present',
    ],
    organicTreatment: [
      'Copper hydroxide mixed with Bacillus subtilis',
      'Liquid potassium silicate foliar sprays to harden cell walls',
    ],
    biologicalControl: [
      'Bacteriophage bio-treatments specific to Xanthomonas perforans',
      'Bacillus amyloliquefaciens seed and seedling treatment',
    ],
    chemicalTreatment: [
      'Copper oxychloride (2.5 g/L) + Streptomycin sulfate 9% + Tetracycline 1% (Streptocycline @ 0.6 g/10L)',
      'Kasugamycin 3% SL @ 2 ml/L',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '24°C - 30°C',
      humidityRange: '> 85%',
      rainfall: 'Thunderstorms and driving rain',
    },
    similarDiseases: [
      {
        name: 'Early Blight',
        keyDifference: 'Bacterial spot lesions are smaller, water-soaked, lack concentric rings, and produce rough raised scabs on green fruit.',
      },
    ],
  },
  {
    id: 'tomato-bacterial-speck',
    name: 'Bacterial Speck',
    scientificName: 'Pseudomonas syringae pv. tomato',
    pathogenType: 'Bacterial',
    affectedCrops: ['Tomato'],
    affectedPlantParts: ['Leaves', 'Stems', 'Fruit Calyx'],
    severityLevel: 'Moderate',
    symptoms: [
      'Tiny, pinpoint (less than 1 mm), dark brown to black spots on leaves',
      'Distinct bright yellow chlorotic halo surrounding each tiny black speck',
      'On green fruit, very small (1 mm), superficial black flecks that do not crack deeply',
      'Can cause heavy blossom drop under cool rainy conditions',
    ],
    causes: [
      'Bacterium Pseudomonas syringae pv. tomato thriving in cool, wet weather',
      'Cool temperatures (18°C - 24°C) with prolonged moisture (>10 hours)',
      'Contaminated seed or plant debris',
    ],
    prevention: [
      'Use certified disease-tested seed and resistant cultivars',
      'Maintain wide row spacing to maximize sunshine penetration and airflow',
      'Drip irrigate early in the morning so foliage dries quickly',
    ],
    organicTreatment: [
      'Fixed copper sprays (copper hydroxide 2 g/L) at seedling stage',
      'Chitosan foliar sprays to induce systemic acquired resistance (SAR)',
    ],
    biologicalControl: [
      'Pseudomonas fluorescens antagonistic bio-agent spray',
    ],
    chemicalTreatment: [
      'Copper oxychloride (2 g/L) tank-mixed with Mancozeb (2 g/L) for synergistic control',
      'Streptomycin formulation where permitted by local agricultural regulations',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '18°C - 24°C',
      humidityRange: '> 80%',
      rainfall: 'Cool rainy intervals or heavy morning dew',
    },
    similarDiseases: [
      {
        name: 'Bacterial Spot',
        keyDifference: 'Bacterial speck favors cool weather (18-24°C) and creates tiny pinpoint specks (<1mm), while bacterial spot favors hot weather (25-30°C) with larger 2-3mm lesions.',
      },
    ],
  },
  {
    id: 'tomato-target-spot',
    name: 'Target Spot',
    scientificName: 'Corynespora cassiicola',
    pathogenType: 'Fungal',
    affectedCrops: ['Tomato', 'Cucumber', 'Soybean', 'Cotton'],
    affectedPlantParts: ['Foliage', 'Stems', 'Fruit'],
    severityLevel: 'Moderate',
    symptoms: [
      'Small pinpoint brown spots on upper leaf surfaces rapidly enlarging to 1 cm diameter',
      'Distinct concentric rings resembling a target board with sharp brown margins',
      'Lesion centers dry, crack, and frequently tear out leaving ragged holes',
      'On fruit, dark brown sunken circular pits with velvety fungal growth',
    ],
    causes: [
      'Fungus Corynespora cassiicola surviving in crop residue and alternative weed hosts',
      'Warm, very humid conditions (20°C - 28°C)',
      'Dense vegetative canopy with stagnant air circulation',
    ],
    prevention: [
      'Strict canopy pruning to remove excessive suckers and optimize wind movement',
      'Sanitize greenhouse structures and eradicate weed hosts',
      'Avoid high-nitrogen overfertilization that creates dense foliage',
    ],
    organicTreatment: [
      'Copper soap or copper sulfate pentahydrate',
      'Potassium silicate foliar treatments',
    ],
    biologicalControl: [
      'Bacillus subtilis bio-fungicide foliar spray',
      'Trichoderma harzianum soil amendment',
    ],
    chemicalTreatment: [
      'Pyraclostrobin + Boscalid @ 1 g/L water',
      'Azoxystrobin + Difenoconazole @ 1 ml/L',
      'Chlorothalonil @ 2 g/L',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '20°C - 28°C',
      humidityRange: '> 85%',
      rainfall: 'Warm rain and overcast humid days',
    },
    similarDiseases: [
      {
        name: 'Early Blight',
        keyDifference: 'Target spot lesions develop on both upper and lower canopy simultaneously and tear open easily, whereas early blight strictly starts on oldest lower leaves and has larger yellow chlorotic halos.',
      },
    ],
  },
  {
    id: 'tomato-leaf-mold',
    name: 'Leaf Mold',
    scientificName: 'Passalora fulva (Cladosporium fulvum)',
    pathogenType: 'Fungal',
    affectedCrops: ['Tomato'],
    affectedPlantParts: ['Upper & Lower Leaf Surfaces'],
    severityLevel: 'Moderate',
    symptoms: [
      'Pale green to yellowish blotches on the upper surface of older leaves',
      'Dense, velvety, olive-green to brownish-gray fungal mold coating the corresponding lower leaf surface',
      'Infected leaves curl upward, wither, and drop prematurely',
      'Fruit is rarely infected, but blossoms can drop from high inoculum',
    ],
    causes: [
      'Fungus Passalora fulva common in greenhouse or high-tunnel structures',
      'Relative humidity consistently above 85%',
      'Temperatures between 21°C and 27°C with stagnant air',
    ],
    prevention: [
      'Ventilate greenhouses using exhaust fans to keep relative humidity below 80%',
      'Space plants generously and prune side shoots',
      'Grow resistant tomato varieties containing Cf resistance genes',
    ],
    organicTreatment: [
      'Potassium bicarbonate foliar spray (4 g/L)',
      'Sulfur dust or wettable sulfur (2 g/L) before flowering',
    ],
    biologicalControl: [
      'Trichoderma harzianum preventive spray',
      'Bacillus amyloliquefaciens foliar misting',
    ],
    chemicalTreatment: [
      'Difenoconazole 25% EC @ 0.5 ml/L',
      'Chlorothalonil 75% WP @ 2 g/L',
      'Thiophanate-methyl 70% WP @ 1 g/L',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '21°C - 27°C',
      humidityRange: '> 85%',
      rainfall: 'High condensation or enclosed greenhouse humidity',
    },
    similarDiseases: [
      {
        name: 'Powdery Mildew',
        keyDifference: 'Powdery mildew produces white talcum-like powder on upper leaf surfaces; leaf mold produces yellow upper patches with velvety olive-brown mold on the underside.',
      },
    ],
  },
  {
    id: 'tomato-anthracnose',
    name: 'Anthracnose',
    scientificName: 'Colletotrichum coccodes',
    pathogenType: 'Fungal',
    affectedCrops: ['Tomato', 'Chili', 'Potato'],
    affectedPlantParts: ['Ripe & Ripening Fruit', 'Stems', 'Roots'],
    severityLevel: 'Moderate',
    symptoms: [
      'Small, circular, sunken, water-soaked spots on ripe and ripening tomato fruit',
      'Spots expand into large depressions with concentric rings of dark speckles (microsclerotia)',
      'During moist periods, gelatinous salmon-pink spore masses ooze from lesion centers',
      'Root rot and cortical decay on mature roots ("black dot" disease)',
    ],
    causes: [
      'Fungus Colletotrichum coccodes living in soil and old crop debris',
      'Warm wet weather (26°C - 30°C)',
      'Heavy rain splashing soil onto low-hanging fruit clusters',
    ],
    prevention: [
      'Harvest fruit promptly as soon as they reach commercial color',
      'Mulch plants with clean straw or plastic to eliminate soil splash onto fruit',
      'Stake plants so fruit does not touch or hang near the soil surface',
    ],
    organicTreatment: [
      'Fixed copper fungicides applied prior to fruit ripening',
      'Bio-fungicide Bacillus subtilis foliar spray',
    ],
    biologicalControl: [
      'Trichoderma virens soil incorporation at planting',
    ],
    chemicalTreatment: [
      'Azoxystrobin 23% SC @ 1 ml/L',
      'Chlorothalonil 75% WP @ 2 g/L',
      'Pyraclostrobin 20% WG @ 1 g/L',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '26°C - 30°C',
      humidityRange: '> 80%',
      rainfall: 'Rain splash on ripening fruit clusters',
    },
    similarDiseases: [
      {
        name: 'Blossom End Rot',
        keyDifference: 'Blossom end rot is a dry, black, flat lesion strictly localized to the blossom end of green or ripening fruit caused by calcium stress, whereas anthracnose creates sunken concentric circular pits anywhere on the fruit.',
      },
    ],
  },
  {
    id: 'tomato-mosaic-virus',
    name: 'Tomato Mosaic Virus (ToMV)',
    scientificName: 'Tomato mosaic tobamovirus',
    pathogenType: 'Viral',
    affectedCrops: ['Tomato', 'Tobacco', 'Pepper', 'Eggplant'],
    affectedPlantParts: ['Leaves', 'Stems', 'Fruit Flesh'],
    severityLevel: 'Severe',
    symptoms: [
      'Mottled alternating light and dark green patches on leaf blades',
      'Leaf distortion, blistering, curling, and "shoestring" or fern-like thinning',
      'Plant stunting with shortened internodes',
      'Internal brown necrotic streaking in fruit flesh with uneven yellow blotchy ripening',
    ],
    causes: [
      'Extremely stable Tobamovirus transmitted mechanically via workers\' hands, tools, and infected seed',
      'Smokers carrying tobacco mosaic virus residues on fingers',
      'No insect vector required; spreads readily by plant-to-plant contact',
    ],
    prevention: [
      'Disinfect pruning tools in 20% nonfat dry milk or 10% trisodium phosphate (TSP)',
      'Hands must be washed thoroughly with soap before handling tomato crops; avoid tobacco products',
      'Plant certified resistant cultivars (indicated by "Tm-2" or "ToMV" on seed packet)',
    ],
    organicTreatment: [
      'No chemical cure exists for viral infections; rogue out and burn infected plants immediately',
      'Spray skim milk solution (20%) on seedling trays before transplanting to inhibit mechanical transmission',
    ],
    biologicalControl: [
      'Cross-protection using mild attenuated viral strains where registered',
    ],
    chemicalTreatment: [
      'No synthetic chemical cures virus. Sanitize benches, stakes, and irrigation lines with quaternary ammonium disinfectants',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '20°C - 30°C',
      humidityRange: 'Any (mechanically transmitted)',
      rainfall: 'Independent of rain',
    },
    similarDiseases: [
      {
        name: 'Tomato Yellow Leaf Curl Virus',
        keyDifference: 'ToMV causes mosaic green mottling and shoestring leaflets; TYLCV causes severe upward leaf cupping, extreme yellow margins, and complete flower abortion transmitted by whiteflies.',
      },
    ],
  },
  {
    id: 'tomato-yellow-leaf-curl',
    name: 'Tomato Yellow Leaf Curl Virus (TYLCV)',
    scientificName: 'Tomato yellow leaf curl begomovirus',
    pathogenType: 'Viral',
    affectedCrops: ['Tomato', 'Chili', 'Beans', 'Ornamentals'],
    affectedPlantParts: ['Growing Tips', 'Young Foliage', 'Blossoms'],
    severityLevel: 'Critical',
    symptoms: [
      'Severe upward curling and cupping of leaflet margins',
      'Marked interveinal chlorosis and bright yellow leaf edges on terminal shoots',
      'Extreme plant stunting and bushy erect growth habit',
      'Complete flower drop with virtually zero fruit set if infected early',
    ],
    causes: [
      'Begomovirus transmitted exclusively by the sweetpotato whitefly (Bemisia tabaci)',
      'High whitefly population spikes during dry warm weather',
      'Infected seedling transplants brought from endemic regions',
    ],
    prevention: [
      'Grow resistant/tolerant hybrid varieties (Ty-1, Ty-3 genes)',
      'Install 40-50 mesh insect-proof netting in nurseries and greenhouses',
      'Deploy bright yellow sticky traps (15-20 traps/acre) to monitor and mass-trap whiteflies',
      'Silver reflective plastic mulch to deter flying whiteflies from landing',
    ],
    organicTreatment: [
      'Cold-pressed neem oil 10,000 ppm @ 3 ml/L or Pongamia pinnata oil (3 ml/L)',
      'Potassium soap of fatty acids (insecticidal soap @ 5 g/L)',
      'Rogue out and bury early symptomatic plants in sealed plastic bags',
    ],
    biologicalControl: [
      'Release whitefly parasitoid wasp Encarsia formosa or Eretmocerus mundus',
      'Entomopathogenic fungus Beauveria bassiana or Lecanicillium lecanii @ 5 g/L',
    ],
    chemicalTreatment: [
      'Imidacloprid 17.8% SL @ 0.3 ml/L or Thiamethoxam 25% WG @ 0.3 g/L as systemic vector control',
      'Cyantraniliprole 10.26% OD @ 1.8 ml/L',
      'Spiromesifen 22.9% SC @ 1 ml/L against whitefly nymphs',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '26°C - 35°C',
      humidityRange: '< 70% (favors whitefly explosion)',
      rainfall: 'Dry warm spells',
    },
    similarDiseases: [
      {
        name: 'Herbicide Drift Damage',
        keyDifference: '2,4-D hormone herbicide drift causes strapped and claw-like leaf deformities without bright golden-yellow margins, and whiteflies will not be present.',
      },
    ],
  },
  {
    id: 'tomato-fusarium-wilt',
    name: 'Fusarium Wilt',
    scientificName: 'Fusarium oxysporum f. sp. lycopersici',
    pathogenType: 'Fungal',
    affectedCrops: ['Tomato'],
    affectedPlantParts: ['Vascular System', 'Roots', 'Lower Foliage'],
    severityLevel: 'Critical',
    symptoms: [
      'Initial yellowing of lower leaves, often strikingly restricted to one side of the plant or even one side of a single leaf branch ("one-sided wilt")',
      'Daytime wilting with partial overnight recovery, progressing to permanent wilt and death',
      'Brown, chocolate-colored vascular discoloration visible when the stem is sliced open lengthwise',
      'Stunting and failure to mature fruit',
    ],
    causes: [
      'Soil-borne fungus Fusarium oxysporum producing long-lived chlamydospores surviving >10 years in soil',
      'High soil temperatures (27°C - 32°C) and acidic soils (pH 5.0 - 6.0)',
      'Root wounding caused by root-knot nematodes (Meloidogyne spp.) or cultivation tools',
    ],
    prevention: [
      'Plant Fusarium-resistant tomato hybrids (marked "F", "FF", or "FFF" for races 1, 2, and 3)',
      'Maintain soil pH between 6.5 and 7.0 using agricultural lime',
      'Avoid root damage during intercultural mechanical weeding',
      'Control root-knot nematodes to prevent infection entry wounds',
    ],
    organicTreatment: [
      'Soil solarization with clear transparent polyethylene for 4-6 weeks during peak summer',
      'Drench root zone with Trichoderma harzianum or Trichoderma viride (10 g/L) enriched in farmyard manure',
    ],
    biologicalControl: [
      'Pseudomonas fluorescens (strain Pf-1) root dipping (10 g/L) and soil application',
      'Bacillus subtilis strain bio-inoculants',
    ],
    chemicalTreatment: [
      'Soil drench with Carbendazim 50% WP @ 2 g/L or Thiophanate-methyl 70% WP @ 1.5 g/L around root zone',
      'No foliar chemical spray can cure systemic vascular wilt once internal colonization occurs',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '27°C - 32°C',
      humidityRange: 'Warm sandy acidic soil',
      rainfall: 'Moderate to high soil temperature',
    },
    similarDiseases: [
      {
        name: 'Bacterial Wilt (Ralstonia)',
        keyDifference: 'Bacterial wilt causes rapid green wilting within 48-72 hours without prior foliar yellowing, and produces milky bacterial stream in a water test tube.',
      },
      {
        name: 'Verticillium Wilt',
        keyDifference: 'Verticillium wilt produces distinct V-shaped yellow wedges on lower leaves and favors cool soils (20-25°C), while Fusarium favors hot soils (28°C+).',
      },
    ],
  },
  {
    id: 'tomato-verticillium-wilt',
    name: 'Verticillium Wilt',
    scientificName: 'Verticillium dahliae / Verticillium albo-atrum',
    pathogenType: 'Fungal',
    affectedCrops: ['Tomato', 'Potato', 'Eggplant', 'Strawberry', 'Cotton'],
    affectedPlantParts: ['Vascular System', 'Older Foliage'],
    severityLevel: 'Severe',
    symptoms: [
      'V-shaped yellow chlorotic patches on lower leaves, widening toward leaf margins',
      'Yellow V-shaped wedges turn brown and necrotic with yellow margins',
      'Leaves wilt and drop progressively from base to crown',
      'Light tan (not dark brown) vascular discoloration when stem base is sliced open',
    ],
    causes: [
      'Soil-inhabiting fungus Verticillium dahliae producing persistent microsclerotia surviving >15 years',
      'Cool to moderate soil temperatures (20°C - 25°C)',
      'Broad host range covering hundreds of dicotyledonous crops',
    ],
    prevention: [
      'Plant cultivars resistant to Verticillium (marked with "V")',
      'Long rotation (4+ years) with monocot cereal crops (sorghum, corn, pearl millet, sudangrass)',
      'Deep plowing and soil solarization',
    ],
    organicTreatment: [
      'Bio-fumigation by incorporating mustard or brassica green manure before planting',
      'Heavy soil amendment with compost enriched with Trichoderma harzianum',
    ],
    biologicalControl: [
      'Bacillus amyloliquefaciens and Streptomyces lydicus root drench',
    ],
    chemicalTreatment: [
      'Soil drench around root crown with Thiophanate-methyl 70% WP @ 1.5 g/L',
      'Systemic fungicides provide only suppression; preventative cultivar choice is primary',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '20°C - 25°C',
      humidityRange: 'Moderate soil moisture',
      rainfall: 'Early cool season conditions',
    },
    similarDiseases: [
      {
        name: 'Fusarium Wilt',
        keyDifference: 'Fusarium causes one-sided yellowing and dark chocolate-brown vascular discoloration in hot weather; Verticillium causes characteristic V-shaped chlorotic wedges and light tan vascular browning in cooler weather.',
      },
    ],
  },
  {
    id: 'tomato-bacterial-wilt',
    name: 'Bacterial Wilt',
    scientificName: 'Ralstonia solanacearum',
    pathogenType: 'Bacterial',
    affectedCrops: ['Tomato', 'Potato', 'Eggplant', 'Chili', 'Ginger', 'Banana'],
    affectedPlantParts: ['Root Vascular Bundles', 'Main Stem', 'Entire Canopy'],
    severityLevel: 'Critical',
    symptoms: [
      'Sudden and rapid wilting of the entire plant while foliage remains completely GREEN',
      'No prior yellowing or leaf spot lesions; plant collapses within 2 to 4 days',
      'Stems may develop adventitious roots along the lower trunk',
      'Vascular ring turns dark brown; when a freshly cut stem section is suspended in clear water, milky white threads of bacterial slime stream out ("bacterial streaming test")',
    ],
    causes: [
      'Ralstonia solanacearum bacterium entering through root wounds or natural openings',
      'Hot weather (28°C - 35°C) and waterlogged, poorly drained soils',
      'Spreads through furrow irrigation runoff, contaminated tools, and infected seedlings',
    ],
    prevention: [
      'Plant on raised beds with excellent subsurface drainage',
      'Graft commercial tomato scions onto resistant wild eggplant rootstocks (e.g. Solanum torvum)',
      'Sterilize knives, stakes, and footwear when moving between plots',
      'Adjust soil pH to alkaline levels with lime where appropriate',
    ],
    organicTreatment: [
      'Soil drench with Pseudomonas fluorescens (10 g/L) and Bacillus subtilis',
      'Apply neem cake @ 250 kg/acre to suppress soil pathogen populations',
    ],
    biologicalControl: [
      'Seedling dip with antagonistic Pseudomonas putida or Streptomyces strains',
    ],
    chemicalTreatment: [
      'Streptomycin sulfate + Tetracycline (Streptocycline @ 1 g/10L water) root drench',
      'Copper oxychloride (3 g/L) drenching around surrounding healthy plants to contain spread',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '28°C - 35°C',
      humidityRange: 'High soil moisture & waterlogging',
      rainfall: 'Heavy tropical monsoon downpours',
    },
    similarDiseases: [
      {
        name: 'Fusarium Wilt',
        keyDifference: 'In bacterial wilt, leaves remain green when the plant wilts and a cut stem produces visible milky streaming in water; in Fusarium wilt, leaves turn distinctly yellow before wilting and no milky streaming occurs.',
      },
    ],
  },
  {
    id: 'tomato-southern-blight',
    name: 'Southern Blight',
    scientificName: 'Athelia rolfsii (Sclerotium rolfsii)',
    pathogenType: 'Fungal',
    affectedCrops: ['Tomato', 'Pepper', 'Potato', 'Peanut', 'Beans'],
    affectedPlantParts: ['Stem Base / Crown', 'Taproot', 'Soil-Touching Fruit'],
    severityLevel: 'Severe',
    symptoms: [
      'Sudden daytime wilting of the plant while leaves remain green or pale',
      'Thick, fan-like white cottony mycelium coating the stem at the soil line',
      'Abundant tiny (1-2 mm), round, tan-to-brown mustard-seed-like sclerotia forming on the white fungal mat',
      'Brown, watery soft rot girdling the main stem collar',
    ],
    causes: [
      'Soil fungus Athelia rolfsii thriving in warm, moist soils containing organic matter',
      'Hot weather (28°C - 35°C) with humid soil surface',
      'Sclerotia survive in the top 5-10 cm of soil for 3-5 years',
    ],
    prevention: [
      'Deep plowing (moldboard plow to 25-30 cm) to bury sclerotia below their survival depth',
      'Avoid placing un-decomposed organic matter or mulch right against plant stems',
      'Crop rotation with non-host grass crops like corn or sorghum',
    ],
    organicTreatment: [
      'Trichoderma harzianum or Trichoderma viride mass-multiplied in farmyard manure applied to planting furrows',
      'Soil solarization during peak hot summer months',
    ],
    biologicalControl: [
      'Gliocladium virens bio-fungicide soil treatment',
    ],
    chemicalTreatment: [
      'Azoxystrobin 23% SC @ 1 ml/L directed to stem bases',
      'Fluopyram + Tebuconazole or Penthiopyrad stem-directed sprays',
      'Carbendazim 50% WP @ 2 g/L collar drench',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '28°C - 35°C',
      humidityRange: '> 85%',
      rainfall: 'Warm humid soil surface',
    },
    similarDiseases: [
      {
        name: 'Bacterial Wilt',
        keyDifference: 'Southern blight produces distinctive white cottony mycelium and mustard-seed-like round sclerotia at the soil line; bacterial wilt shows zero external fungal growth.',
      },
    ],
  },
  {
    id: 'tomato-blossom-end-rot',
    name: 'Blossom End Rot',
    scientificName: 'Physiological disorder (Calcium deficiency & moisture stress)',
    pathogenType: 'Physiological',
    affectedCrops: ['Tomato', 'Pepper', 'Watermelon', 'Eggplant'],
    affectedPlantParts: ['Blossom End of Fruit'],
    severityLevel: 'Moderate',
    symptoms: [
      'Water-soaked circular spot at the blossom end (distal tip) of green fruit',
      'Lesion enlarges, turns dark brown to sunken, leathery black',
      'Infected area remains firm and dry unless invaded by secondary saprophytic molds',
      'Fruit ripens prematurely on the plant',
    ],
    causes: [
      'Localized deficiency of Calcium in developing fruit cells during rapid expansion',
      'Fluctuating soil moisture: drying out followed by heavy irrigation',
      'Excess nitrogen fertilization (especially ammonium-based) competing with calcium uptake',
      'Root damage from mechanical cultivation reducing water absorption',
    ],
    prevention: [
      'Maintain consistent, uniform soil moisture using drip irrigation and organic mulches',
      'Conduct soil test: apply agricultural lime, dolomite, or gypsum before transplanting if calcium is deficient',
      'Avoid high-ammonium fertilizers; use calcium nitrate if supplemental nitrogen is needed',
      'Avoid deep cultivating near plant roots',
    ],
    organicTreatment: [
      'Foliar spray of Calcium Chloride (0.5%) or chelated Calcium (2 ml/L) directed at young developing fruit clusters',
      'Wood ash or bone meal incorporated in soil at transplanting',
    ],
    biologicalControl: [
      'Mycorrhizal fungi inoculation to enhance root surface area and mineral uptake',
    ],
    chemicalTreatment: [
      'Foliar application of Calcium Nitrate @ 5 g/L water sprayed every 7 days during fruit set',
      'No chemical pesticide is needed as this is a physiological calcium-water transport disorder',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '25°C - 36°C',
      humidityRange: 'Dry winds & hot days',
      rainfall: 'Irregular watering or sudden dry spells',
    },
    similarDiseases: [
      {
        name: 'Anthracnose Fruit Rot',
        keyDifference: 'Blossom end rot is strictly on the blossom end of green fruit and produces flat leathery dry spots; anthracnose occurs anywhere on ripe fruit with sunken gelatinous salmon-pink spore rings.',
      },
    ],
  },
  {
    id: 'tomato-powdery-mildew',
    name: 'Powdery Mildew',
    scientificName: 'Oidium neolycopersici / Leveillula taurica',
    pathogenType: 'Fungal',
    affectedCrops: ['Tomato', 'Pepper', 'Eggplant'],
    affectedPlantParts: ['Upper & Lower Leaf Surfaces', 'Petioles'],
    severityLevel: 'Mild',
    symptoms: [
      'Bright white, talcum-powder-like patches of fungal mycelium and spores on upper leaf surfaces',
      'In Leveillula taurica infections, yellow chlorotic patches appear on upper surfaces with diffuse white powder underneath',
      'Infected leaves turn yellow, curl upward, brown, and senesce prematurely',
      'Fruit is not directly infected but suffers sunscald due to foliar defoliation',
    ],
    causes: [
      'Airborne fungal conidia thriving in warm, dry weather with high ambient relative humidity',
      'Moderate temperatures (18°C - 26°C)',
      'Low light intensity and shaded canopies',
    ],
    prevention: [
      'Prune and stake plants to allow maximum direct sunlight through the canopy',
      'Avoid overhead wetting of foliage late in the evening',
      'Plant resistant cultivars with Ol-1 to Ol-4 genes',
    ],
    organicTreatment: [
      'Potassium bicarbonate spray (3 g/L water) or baking soda (5 g/L) with horticultural oil',
      'Wettable sulfur 80% WDG @ 2-3 g/L (do not apply sulfur if temperature exceeds 32°C)',
      'Diluted milk spray (10-20% cow milk in water) under direct sunshine',
    ],
    biologicalControl: [
      'Ampelomyces quisqualis hyperparasitic bio-agent',
      'Bacillus pumilus foliar spray',
    ],
    chemicalTreatment: [
      'Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L',
      'Myclobutanil 10% WP @ 1 g/L or Penconazole 10% EC @ 0.5 ml/L',
      'Kresoxim-methyl 44.3% SC @ 0.7 ml/L',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '18°C - 27°C',
      humidityRange: '50% - 75% (requires dry leaf surface for spore dispersal)',
      rainfall: 'Dry weather with high nocturnal humidity',
    },
    similarDiseases: [
      {
        name: 'Leaf Mold',
        keyDifference: 'Powdery mildew produces bright white surface powder; leaf mold produces yellow upper surface blotches with dense velvety olive-brown mold on the underside.',
      },
    ],
  },
  {
    id: 'tomato-gray-mold',
    name: 'Gray Mold',
    scientificName: 'Botrytis cinerea',
    pathogenType: 'Fungal',
    affectedCrops: ['Tomato', 'Strawberry', 'Grape', 'Lettuce'],
    affectedPlantParts: ['Senescent Flowers', 'Stems', 'Fruit', 'Leaves'],
    severityLevel: 'Moderate',
    symptoms: [
      'Soft, brown, rotting lesions on stems, leaves, and fruit covered with dense fuzzy gray-brown mold',
      'Distinctive "ghost spots" (tiny white rings with dark brown pin centers) on green fruit',
      'Stems develop pale oval cankers that girdle the shoot and cause wilting above the lesion',
      'Infection starts on dying flower petals stuck to leaves or young green fruit',
    ],
    causes: [
      'Necrotrophic fungus Botrytis cinerea thriving in cool, damp, shaded conditions',
      'Temperatures between 16°C and 22°C with free moisture or relative humidity >90%',
      'Damaged tissue from pruning wounds or unpicked senescent blossoms',
    ],
    prevention: [
      'Prune only during dry sunny afternoons so wounds desiccate and heal rapidly',
      'Promptly remove senescent flowers from developing fruit clusters',
      'Maximize greenhouse ventilation and heating to prevent condensation on foliage',
    ],
    organicTreatment: [
      'Copper soap or potassium bicarbonate sprays',
      'Prune and discard infected fruit clusters in plastic bags immediately',
    ],
    biologicalControl: [
      'Trichoderma harzianum strain T-22 or Bacillus subtilis foliar spray',
      'Ulocladium oudemansii bio-control agent',
    ],
    chemicalTreatment: [
      'Cyprodinil 37.5% + Fludioxonil 25% WG (Switch) @ 0.8 g/L',
      'Boscalid 50% WG @ 1 g/L',
      'Fenhexamid 50% WDG @ 1.5 g/L',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '16°C - 22°C',
      humidityRange: '> 90%',
      rainfall: 'Cool wet days and heavy dew',
    },
    similarDiseases: [
      {
        name: 'Late Blight',
        keyDifference: 'Gray mold produces prolific fuzzy ash-gray fungal carpets, oval stem cankers, and white ghost-spots on fruit; late blight produces dark purple-brown wet collapse with delicate white underside mold.',
      },
    ],
  },

  // ==========================================
  // POTATO DISEASES (12 Conditions)
  // ==========================================
  {
    id: 'potato-early-blight',
    name: 'Early Blight',
    scientificName: 'Alternaria solani',
    pathogenType: 'Fungal',
    affectedCrops: ['Potato', 'Tomato'],
    affectedPlantParts: ['Foliage', 'Stems', 'Tubers'],
    severityLevel: 'Moderate',
    symptoms: [
      'Dark brown to black angular spots with concentric target-board rings on older potato leaves',
      'Yellow chlorotic halos surrounding the foliar lesions',
      'Lower canopy dies prematurely, reducing tuber bulk and starch accumulation',
      'Tubers develop dark, sunken, irregular circular lesions with raised purple margins and dry corky flesh underneath',
    ],
    causes: [
      'Fungus Alternaria solani surviving in crop debris and infected seed tubers',
      'Alternating wet and dry weather with temperatures of 24°C - 30°C',
      'Stressed or senescing plants (nitrogen deficiency or drought) are most susceptible',
    ],
    prevention: [
      'Plant certified disease-free seed tubers',
      'Maintain balanced nitrogen and potassium fertility throughout vegetative growth',
      'Allow potato vine skin to set completely (2-3 weeks after vine kill) before harvest to prevent tuber wounding',
    ],
    organicTreatment: [
      'Copper oxychloride (3 g/L) prophylactic sprays starting at canopy closure',
      'Cold-pressed neem oil (3 ml/L)',
    ],
    biologicalControl: [
      'Trichoderma harzianum tuber coating and foliar spray',
      'Bacillus subtilis bio-fungicide',
    ],
    chemicalTreatment: [
      'Mancozeb 75% WP @ 2.5 g/L water',
      'Azoxystrobin 23% SC @ 1 ml/L',
      'Difenoconazole 25% EC @ 0.5 ml/L',
    ],
    image: '/src/assets/images/potato_late_blight_1793884803341.jpg',
    favorableConditions: {
      tempRange: '24°C - 29°C',
      humidityRange: '> 80%',
      rainfall: 'Warm dew periods and intermittent rain',
    },
    similarDiseases: [
      {
        name: 'Late Blight',
        keyDifference: 'Early blight forms dry circular concentric target rings on older foliage; late blight spreads rapidly across all foliage as dark water-soaked rot with white downy underside mold.',
      },
    ],
  },
  {
    id: 'potato-late-blight',
    name: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    pathogenType: 'Fungal',
    affectedCrops: ['Potato', 'Tomato'],
    affectedPlantParts: ['Leaves', 'Stems', 'Tubers'],
    severityLevel: 'Critical',
    symptoms: [
      'Irregular water-soaked pale-to-dark olive green spots on leaf margins and tips',
      'Lesions rapidly enlarge into black/purplish necrotized foliage with wet breakdown',
      'Fine white downy fungal mold on the undersides of leaves during misty mornings',
      'Tubers develop brown, dry, granular rot extending 5-15 mm below the tuber skin',
      'Whole fields can be destroyed in 7-10 days under cool cloudy weather',
    ],
    causes: [
      'Oomycete Phytophthora infestans dispersed by windborne sporangia',
      'Cool temperatures (10°C - 20°C) with prolonged relative humidity (>90%)',
      'Cull piles and volunteer potato plants serving as early inoculum sources',
    ],
    prevention: [
      'Use certified disease-free seed tubers; eliminate all cull piles before planting',
      'Earth up ridges high (at least 15 cm soil cover over tubers) to prevent zoospores from washing down to tubers',
      'Kill vines completely 2 weeks before harvest; never harvest wet tubers in rainy weather',
    ],
    organicTreatment: [
      'Bordeaux mixture (1%) or Copper hydroxide (2.5 g/L) prophylactic spray',
      'Liquid seaweed extract combined with potassium phosphite',
    ],
    biologicalControl: [
      'Trichoderma asperellum seed tuber treatment',
      'Bacillus amyloliquefaciens preventive foliar spray',
    ],
    chemicalTreatment: [
      'Metalaxyl 8% + Mancozeb 64% WP @ 2.5 g/L water',
      'Cymoxanil 8% + Mancozeb 64% WP @ 2 g/L',
      'Mandipropamid 23.4% SC @ 0.8 ml/L',
    ],
    image: '/src/assets/images/potato_late_blight_1793884803341.jpg',
    favorableConditions: {
      tempRange: '10°C - 20°C',
      humidityRange: '> 90%',
      rainfall: 'Continuous rain, fog, overcast cloud cover',
    },
    similarDiseases: [
      {
        name: 'Early Blight',
        keyDifference: 'Late blight lesions lack concentric target rings, spread rapidly into large water-soaked olive patches with white downy growth underneath.',
      },
    ],
  },
  {
    id: 'potato-common-scab',
    name: 'Common Scab',
    scientificName: 'Streptomyces scabies (Streptomyces scabiei)',
    pathogenType: 'Bacterial',
    affectedCrops: ['Potato', 'Beetroot', 'Radish', 'Carrot'],
    affectedPlantParts: ['Tuber Surface / Periderm'],
    severityLevel: 'Moderate',
    symptoms: [
      'Rough, corky, raised, circular or irregular brownish scabs on the tuber skin',
      'Pitted scab: deep sunken brown craters extending 3-5 mm into the flesh',
      'Russet scab: superficial roughening or netting of the tuber skin',
      'Foliage appears completely healthy with no visible above-ground symptoms',
    ],
    causes: [
      'Filamentous actinomycete bacterium Streptomyces scabies ubiquitous in soil',
      'Warm, dry soils during tuber initiation (2 to 6 weeks after plant emergence)',
      'High soil pH (pH 6.5 to 8.0) and alkaline conditions from recent liming',
    ],
    prevention: [
      'Keep soil pH slightly acidic (pH 5.2 to 5.5); avoid heavy liming directly before potatoes',
      'Maintain adequate soil moisture (>80% field capacity) for 4-6 weeks starting at tuber initiation',
      'Plant scab-resistant cultivars',
      'Avoid applying fresh un-composted animal manure right before planting',
    ],
    organicTreatment: [
      'Soil application of elemental sulfur to lower soil pH in alkaline soils',
      'Incorporate green manure of rye or brassicas to promote antagonistic microbes',
    ],
    biologicalControl: [
      'Antagonistic non-pathogenic Streptomyces strains (e.g. S. diastatochromogenes)',
      'Bacillus subtilis seed piece inoculation',
    ],
    chemicalTreatment: [
      'Seed tuber dressing with Mancozeb 75% WP @ 2.5 g/kg seed or Fludioxonil @ 2 ml/kg',
      'No in-season foliar chemical spray can control soil-borne scab',
    ],
    image: '/src/assets/images/potato_late_blight_1793884803341.jpg',
    favorableConditions: {
      tempRange: '20°C - 25°C',
      humidityRange: 'Dry soil during tuber set',
      rainfall: 'Low soil moisture / alkaline soil',
    },
    similarDiseases: [
      {
        name: 'Powdery Scab',
        keyDifference: 'Common scab lesions are hard, corky, and open; powdery scab lesions start as pimple-like blisters that rupture to reveal powdery dark brown-olive spore masses.',
      },
    ],
  },
  {
    id: 'potato-powdery-scab',
    name: 'Powdery Scab',
    scientificName: 'Spongospora subterranea',
    pathogenType: 'Fungal',
    affectedCrops: ['Potato'],
    affectedPlantParts: ['Tubers', 'Roots', 'Stolons'],
    severityLevel: 'Moderate',
    symptoms: [
      'Small, raised, purple-brown pimple-like blisters on immature tuber skin',
      'Blisters rupture open, leaving shallow circular craters filled with dark brown to olive powdery spore balls',
      'Small galls or swellings (3-10 mm) forming on potato roots and stolons',
      'Vector for Potato Mop-Top Virus (PMTV) which causes internal brown arcs in tuber flesh',
    ],
    causes: [
      'Plasmodiophorid pathogen Spongospora subterranea producing motile swimming zoospores',
      'Cool, wet, poorly drained soils (11°C - 16°C) at tuber initiation',
      'Persistent cystosori surviving >10 years in contaminated soil',
    ],
    prevention: [
      'Use certified pathogen-free seed tubers tested for Spongospora',
      'Improve field drainage and avoid over-irrigation during early tuber set',
      'Long crop rotation (6+ years) away from solanaceous hosts',
    ],
    organicTreatment: [
      'Apply agricultural zinc sulfate or boron to soil to inhibit zoospore motility',
      'Plant antagonistic bio-fumigant mustard crops in rotation',
    ],
    biologicalControl: [
      'Trichoderma harzianum tuber inoculation',
    ],
    chemicalTreatment: [
      'Seed treatment with Fluazinam @ 1.5 ml/kg seed tuber',
      'Soil treatment with Fluazinam in planting furrow where registered',
    ],
    image: '/src/assets/images/potato_late_blight_1793884803341.jpg',
    favorableConditions: {
      tempRange: '11°C - 16°C',
      humidityRange: 'Wet saturated soil',
      rainfall: 'Cool wet conditions at tuber initiation',
    },
    similarDiseases: [
      {
        name: 'Common Scab',
        keyDifference: 'Common scab occurs in warm, dry, alkaline soils with corky open margins; powdery scab occurs in cool, wet soils and contains loose dark powdery spore balls with root galls.',
      },
    ],
  },
  {
    id: 'potato-black-scurf',
    name: 'Black Scurf & Rhizoctonia Canker',
    scientificName: 'Rhizoctonia solani',
    pathogenType: 'Fungal',
    affectedCrops: ['Potato', 'Beans', 'Beet'],
    affectedPlantParts: ['Sprouts', 'Stems', 'Stolons', 'Tuber Skin'],
    severityLevel: 'Severe',
    symptoms: [
      'Hard, irregular, dark brown to black dirt-like crusts (sclerotia) adhering tightly to tuber skin ("the dirt that won\'t wash off")',
      'Sunken reddish-brown to dark cankers on underground sprouts causing sprout death and uneven patchy emergence',
      'Stems develop aerial tubers in leaf axils and swollen purplish top foliage due to girdled phloem transport',
      'White powdery collar of sexual state (Thanatephorus) on lower stem near soil line',
    ],
    causes: [
      'Fungus Rhizoctonia solani surviving as sclerotia on seed tubers and in soil',
      'Cool, wet soils (10°C - 18°C) that delay sprout emergence',
      'Planting infected seed tubers without prior fungicide dressing',
    ],
    prevention: [
      'Plant sprouted seed in warm, well-aerated soil so sprouts emerge rapidly through the soil surface',
      'Shallow planting in early season followed by later hilling up',
      'Harvest tubers promptly after vine kill; prolonged soil storage increases black scurf development',
    ],
    organicTreatment: [
      'Dip seed tubers in Trichoderma viride or Trichoderma harzianum (10 g/L) slurry',
      'Apply well-cured compost enriched with antagonistic Pseudomonas',
    ],
    biologicalControl: [
      'Bacillus subtilis GB03 seed tuber treatment',
      'Coniothyrium minitans mycoparasite application',
    ],
    chemicalTreatment: [
      'Seed tuber dressing with Moncut (Flutolanil 40% SC) @ 2 ml/kg seed',
      'Pencycuron 250 SC @ 2.5 ml/kg seed or Azoxystrobin in-furrow spray @ 2.5 ml/L',
      'Carboxin 37.5% + Thiram 37.5% DS @ 2.5 g/kg seed',
    ],
    image: '/src/assets/images/potato_late_blight_1793884803341.jpg',
    favorableConditions: {
      tempRange: '10°C - 18°C',
      humidityRange: 'Wet cold soil during emergence',
      rainfall: 'Cool wet planting season',
    },
    similarDiseases: [
      {
        name: 'Common Scab',
        keyDifference: 'Black scurf sclerotia are raised black crusts sitting on top of the skin that do not damage flesh underneath; scab produces rough sunken or raised corky lesions into the tuber periderm.',
      },
    ],
  },
  {
    id: 'potato-blackleg',
    name: 'Blackleg & Aerial Stem Rot',
    scientificName: 'Pectobacterium atrosepticum / Pectobacterium brasiliense',
    pathogenType: 'Bacterial',
    affectedCrops: ['Potato'],
    affectedPlantParts: ['Seed Tuber', 'Lower Stem', 'Daughter Tubers'],
    severityLevel: 'Critical',
    symptoms: [
      'Inky-black, slimy, water-soaked decay extending up the lower stem from the decaying mother seed tuber',
      'Stunted, pale yellow, stiff, erect foliage with leaflets rolling upward',
      'Stem rapidly wilts, collapses, and emits a foul rotting odor',
      'Daughter tubers show sunken, black, soft rot starting at the stolon attachment point',
    ],
    causes: [
      'Enterobacteriaceae bacteria Pectobacterium residing inside lenticels and vascular bundles of seed tubers',
      'Cool wet soils initially, followed by warm weather (20°C - 28°C)',
      'Cutting seed tubers without disinfected blades or planting uncut damaged tubers in waterlogged soils',
    ],
    prevention: [
      'Plant only whole, certified, pathogen-tested seed tubers; avoid cutting seed if possible',
      'Disinfect seed-cutting blades frequently with 10% sodium hypochlorite',
      'Ensure soil is well-drained and warm (>12°C) at planting',
      'Rogue out and destroy infected blackleg plants and their daughter tubers immediately',
    ],
    organicTreatment: [
      'Pre-plant suberization: cure cut seed pieces at 15°C with 90% humidity for 3-5 days to form protective suberin layer',
      'Seed piece dusting with wood ash or sulfur powder',
    ],
    biologicalControl: [
      'Pseudomonas fluorescens antagonistic tuber coating',
    ],
    chemicalTreatment: [
      'Treat seed tubers with Streptocycline (1 g/10L) + Copper oxychloride (2.5 g/L) dip for 20 minutes before planting',
      'No foliar chemical spray can cure established systemic blackleg',
    ],
    image: '/src/assets/images/potato_late_blight_1793884803341.jpg',
    favorableConditions: {
      tempRange: '18°C - 26°C',
      humidityRange: 'Waterlogged soil & high humidity',
      rainfall: 'Cool planting followed by warm wet canopy',
    },
    similarDiseases: [
      {
        name: 'Bacterial Soft Rot',
        keyDifference: 'Blackleg produces characteristic inky-black decay originating from the mother tuber extending up the main stem; soft rot affects injured tubers and canopy stems through foliar wounds.',
      },
    ],
  },
  {
    id: 'potato-bacterial-soft-rot',
    name: 'Bacterial Soft Rot',
    scientificName: 'Pectobacterium carotovorum / Dickeya solani',
    pathogenType: 'Bacterial',
    affectedCrops: ['Potato', 'Carrot', 'Onion', 'Tomato', 'Cabbage'],
    affectedPlantParts: ['Tubers in Field & Storage', 'Stems'],
    severityLevel: 'Critical',
    symptoms: [
      'Tubers become soft, watery, cream-colored to mushy brown with a distinct foul, putrid odor',
      'Tuber skin remains intact as a thin bag holding liquid disintegrated flesh',
      'Rapid breakdown of tubers in storage, causing hot spots and rotting of neighboring healthy tubers',
      'Foliar soft rot causing water-soaked collapse of stems after rainstorms',
    ],
    causes: [
      'Bacteria Pectobacterium carotovorum and Dickeya solani producing pectinolytic enzymes',
      'Tuber skin damage or bruising during harvesting and grading',
      'Condensation, poor airflow, and lack of oxygen in potato storage bins',
      'Washing tubers in recycled, non-sanitized wash water',
    ],
    prevention: [
      'Allow potato skins to fully mature and harden for 2-3 weeks before digging',
      'Minimize drops and mechanical impacts (>15 cm drop causes internal bruising) during harvest',
      'Dry tubers thoroughly before storage; maintain positive ventilation at 95% RH with continuous airflow',
      'Sanitize sorting belts, storage walls, and wash flumes with chlorine dioxide',
    ],
    organicTreatment: [
      'Cure freshly harvested tubers at 13°C - 15°C with high humidity for 10-14 days to heal wounds',
      'Wash with ozonated or chlorinated water (100-150 ppm free chlorine)',
    ],
    biologicalControl: [
      'Lytic bacteriophages targeting Dickeya and Pectobacterium',
      'Bacillus subtilis post-harvest misting',
    ],
    chemicalTreatment: [
      'Disinfect storage boxes and cold storage rooms with 2% formaldehyde or quaternary ammonium before loading',
      'No chemical fungicide is effective against soft-rot bacteria',
    ],
    image: '/src/assets/images/potato_late_blight_1793884803341.jpg',
    favorableConditions: {
      tempRange: '22°C - 32°C',
      humidityRange: '> 95% with surface water film',
      rainfall: 'Harvesting in wet mud or poor storage ventilation',
    },
    similarDiseases: [
      {
        name: 'Fusarium Dry Rot',
        keyDifference: 'Bacterial soft rot produces wet, mushy, liquefied flesh with a pungent foul odor; Fusarium dry rot produces dry, shriveled, wrinkled cavities lined with white or pink fungal mycelium without liquid ooze.',
      },
    ],
  },
  {
    id: 'potato-fusarium-dry-rot',
    name: 'Fusarium Dry Rot',
    scientificName: 'Fusarium sambucinum / Fusarium coeruleum',
    pathogenType: 'Fungal',
    affectedCrops: ['Potato'],
    affectedPlantParts: ['Tubers in Storage & Seed Pieces'],
    severityLevel: 'Moderate',
    symptoms: [
      'Dark, sunken, dry circular lesions on the tuber surface',
      'Tuber skin wrinkles in concentric rings as the internal flesh shrinks',
      'Internal flesh develops dry, brown, hollow cavities lined with yellow, white, or pink fuzzy fungal mycelium',
      'Tubers eventually shrivel into hard, lightweight, dry mummies',
    ],
    causes: [
      'Fusarium fungi entering through wounds, skin cracks, bruises, or enlarged lenticels during harvest',
      'Temperatures of 15°C - 25°C in storage with poor wound-healing conditions',
      'Contaminated harvesting machinery, conveyors, and storage bins',
    ],
    prevention: [
      'Harvest only when pulp temperature is between 10°C and 18°C to minimize skinning and cracking',
      'Cure tubers immediately after harvest at 10°C - 13°C for 2 weeks to promote wound periderm formation',
      'Clean and disinfect storage bins and handling equipment with quaternary ammonium',
    ],
    organicTreatment: [
      'Tuber dipping in Trichoderma harzianum bio-fungicide slurry prior to storage',
      'Fumigation with essential oils (clove or thyme oil) in storage ventilation streams',
    ],
    biologicalControl: [
      'Pseudomonas syringae bio-protectant (Bio-Save)',
      'Bacillus amyloliquefaciens post-harvest application',
    ],
    chemicalTreatment: [
      'Fludioxonil 480 FS @ 5 ml/tonne of seed tubers as ultra-low-volume spray at storage loading',
      'Thiabendazole @ 40 ml/tonne where fungal resistance has not developed',
    ],
    image: '/src/assets/images/potato_late_blight_1793884803341.jpg',
    favorableConditions: {
      tempRange: '15°C - 25°C',
      humidityRange: 'Moderate humidity in poorly cured storage',
      rainfall: 'Harvest bruising in dry or cold soils',
    },
    similarDiseases: [
      {
        name: 'Bacterial Soft Rot',
        keyDifference: 'Dry rot produces shriveled dry cavities with white/pink mold and no odor; soft rot produces liquefied mush with offensive rotting odor.',
      },
    ],
  },
  {
    id: 'potato-virus-y',
    name: 'Potato Virus Y (PVY)',
    scientificName: 'Potato potyvirus Y',
    pathogenType: 'Viral',
    affectedCrops: ['Potato', 'Tomato', 'Pepper', 'Tobacco'],
    affectedPlantParts: ['Foliage', 'Tubers'],
    severityLevel: 'Severe',
    symptoms: [
      'Mottled yellow-green mosaic patterns on leaf blades',
      'Severe rugosity: leaflets become crinkled, puckered, and twisted',
      'Necrotic leaf drop: lower leaves develop dark brown vein necrosis, wither, and hang dry along the stem ("leaf-drop symptom")',
      'In PVY-NTN strains: circular sunken necrotic rings on the surface of tubers ("Potato Tuber Necrotic Ringspot Disease")',
    ],
    causes: [
      'Potyvirus transmitted non-persistently within seconds by over 50 aphid species (notably green peach aphid Myzus persicae)',
      'Planting infected seed tubers (secondary infection causes severe stunting)',
      'Mechanical transmission via tractor wheels, cutting knives, and walking through wet fields',
    ],
    prevention: [
      'Plant certified generation-1 or generation-2 virus-tested seed tubers',
      'Spray crop mineral oils (paraffinic oils @ 1-2%) weekly to interfere with aphid stylet virus transmission',
      'Rogue out and destroy symptomatic plants during early field inspections before aphid flights begin',
      'Kill vines early in seed potato production to prevent late-season aphid inoculation into tubers',
    ],
    organicTreatment: [
      'Stylet-cleansing light mineral oil sprays (1%)',
      'Yellow sticky water-pan traps to monitor aphid migration peaks',
    ],
    biologicalControl: [
      'Conserve aphid predators (ladybird beetles, hoverfly larvae, parasitic wasps)',
    ],
    chemicalTreatment: [
      'Insecticides are ineffective at preventing PVY spread because aphids transmit the virus non-persistently before dying; focus on mineral oils and resistant varieties',
    ],
    image: '/src/assets/images/potato_late_blight_1793884803341.jpg',
    favorableConditions: {
      tempRange: '18°C - 26°C',
      humidityRange: 'Mild sunny days favoring aphid flight',
      rainfall: 'Dry warm spells',
    },
    similarDiseases: [
      {
        name: 'Potato Leaf Roll Virus',
        keyDifference: 'PVY causes leaf drop, vein necrosis, and rugose mottling; PLRV causes stiff upward rolling of lower leaves with leathery texture and paper-like rustling.',
      },
    ],
  },
  {
    id: 'potato-leaf-roll-virus',
    name: 'Potato Leaf Roll Virus (PLRV)',
    scientificName: 'Potato leafroll polerovirus',
    pathogenType: 'Viral',
    affectedCrops: ['Potato'],
    affectedPlantParts: ['Vascular Phloem', 'Leaves', 'Tubers'],
    severityLevel: 'Severe',
    symptoms: [
      'Lower leaves roll tightly upward along margins, becoming stiff, leathery, and brittle',
      'Affected leaves rustle like parchment paper when shaken or brushed',
      'Foliage shows purplish or pale yellow discoloration on leaflet undersides',
      'Tubers may develop "net necrosis": fine dark brown vascular netting through the tuber flesh',
      'Plant stunting with upright, rigid growth habit',
    ],
    causes: [
      'Polerovirus transmitted persistently and circulative by aphids (Myzus persicae is primary vector)',
      'Aphid must feed for several hours to acquire and transmit the virus',
      'Infected seed tubers carry the virus into subsequent seasons',
    ],
    prevention: [
      'Use certified disease-free seed tubers',
      'Systemic vector management to suppress aphid colonies before persistent transmission can occur',
      'Isolate seed production fields at high altitudes or windy coastal regions where aphids are rare',
    ],
    organicTreatment: [
      'Neem oil (3 ml/L) or insecticidal soap sprays targeting aphid colonies on leaf undersides',
      'Prompt roguing of infected plants early in the season',
    ],
    biologicalControl: [
      'Release Aphidius colemani parasitic wasps',
      'Spray entomopathogenic fungi Verticillium lecanii',
    ],
    chemicalTreatment: [
      'Imidacloprid 17.8% SL @ 0.3 ml/L or Thiamethoxam 25% WG @ 0.3 g/L early season spray',
      'Pymetrozine 50% WG @ 0.6 g/L or Flonicamid 50% WG @ 0.3 g/L (aphid feeding blockers)',
    ],
    image: '/src/assets/images/potato_late_blight_1793884803341.jpg',
    favorableConditions: {
      tempRange: '20°C - 28°C',
      humidityRange: 'Low to moderate humidity',
      rainfall: 'Warm dry spring/summer',
    },
    similarDiseases: [
      {
        name: 'Potato Virus Y',
        keyDifference: 'PLRV causes thick, leathery, spoon-shaped upward rolled leaves that rustle like paper; PVY causes mosaic mottling, crinkling, and necrotic leaf drop.',
      },
    ],
  },
  {
    id: 'potato-verticillium-wilt',
    name: 'Verticillium Wilt (Early Dying Syndrome)',
    scientificName: 'Verticillium albo-atrum / Verticillium dahliae',
    pathogenType: 'Fungal',
    affectedCrops: ['Potato', 'Tomato', 'Eggplant'],
    affectedPlantParts: ['Vascular System', 'Foliage', 'Tuber Vascular Ring'],
    severityLevel: 'Severe',
    symptoms: [
      'Premature senescence and early death of potato vines ("Potato Early Dying")',
      'Interveinal chlorosis and necrosis starting on lower leaves, often on one side of the stem',
      'Daytime wilting of leaves during hot sunny periods, recovering at night',
      'Light brown vascular ring discoloration near the stem end of harvested tubers',
    ],
    causes: [
      'Soil fungus Verticillium dahliae surviving as microsclerotia for 10-15 years',
      'Synergistic interaction with root-lesion nematodes (Pratylenchus penetrans)',
      'Water stress or high crop load during tuber bulking',
    ],
    prevention: [
      'Long rotation (4+ years) with non-hosts like corn, sudangrass, or barley',
      'Maintain adequate irrigation to minimize plant stress during tuber bulking',
      'Soil testing and management for root-lesion nematodes',
      'Plant cultivars tolerant to Verticillium wilt',
    ],
    organicTreatment: [
      'Green manuring with Sorghum-Sudangrass or Oriental mustard before potato planting',
      'Soil solarization and heavy compost application',
    ],
    biologicalControl: [
      'Trichoderma harzianum or Streptomyces lydicus in-furrow application',
    ],
    chemicalTreatment: [
      'Soil fumigation with Metam Sodium where legal and warranted in commercial seed production',
      'No foliar chemical spray can cure systemic Verticillium once plants are infected',
    ],
    image: '/src/assets/images/potato_late_blight_1793884803341.jpg',
    favorableConditions: {
      tempRange: '21°C - 27°C',
      humidityRange: 'Moderate soil moisture followed by heat stress',
      rainfall: 'Warm mid-to-late season',
    },
    similarDiseases: [
      {
        name: 'Fusarium Wilt',
        keyDifference: 'Verticillium causes early dying with light brown vascular ring discoloration in tubers; Fusarium causes severe rot and darker brown-black discoloration in stem base.',
      },
    ],
  },
  {
    id: 'potato-silver-scurf',
    name: 'Silver Scurf',
    scientificName: 'Helminthosporium solani',
    pathogenType: 'Fungal',
    affectedCrops: ['Potato'],
    affectedPlantParts: ['Tuber Periderm (Skin)'],
    severityLevel: 'Mild',
    symptoms: [
      'Silvery, metallic, glistening patches or sheen on the surface of tubers when washed or wet',
      'Lesions are superficial with distinct margins, expanding during storage',
      'Tuber periderm loses moisture, resulting in wrinkled, shriveled, dehydrated tubers',
      'Foliage shows zero symptoms throughout the growing season',
    ],
    causes: [
      'Fungus Helminthosporium solani seed-borne on tubers and spreading in humid storage',
      'Warm, moist storage conditions (>10°C and >90% RH) allow secondary spread between stored tubers',
      'Delays in harvesting after vine desiccation',
    ],
    prevention: [
      'Plant certified seed tubers free of silver scurf lesions',
      'Harvest tubers promptly as soon as skin set is achieved (14 days after vine kill)',
      'Lower storage temperature quickly to 3°C - 4°C with continuous air circulation',
    ],
    organicTreatment: [
      'Post-harvest washing with hydrogen peroxide or peroxyacetic acid solutions',
      'Tuber dipping in biological bio-fungicide Bacillus subtilis before binning',
    ],
    biologicalControl: [
      'Pseudomonas fluorescens antagonistic strain treatment',
    ],
    chemicalTreatment: [
      'Seed tuber treatment with Fludioxonil 480 FS @ 5 ml/tonne seed',
      'Post-harvest treatment with Pyrimethanil or Difenoconazole where registered',
    ],
    image: '/src/assets/images/potato_late_blight_1793884803341.jpg',
    favorableConditions: {
      tempRange: '15°C - 24°C',
      humidityRange: '> 90%',
      rainfall: 'Late season rain delaying harvest',
    },
    similarDiseases: [
      {
        name: 'Black Dot (Colletotrichum)',
        keyDifference: 'Silver scurf lesions are uniformly silvery with smooth borders and lack tiny dots; black dot lesions have irregular margins and are peppered with minute black microsclerotia.',
      },
    ],
  },

  // ==========================================
  // APPLE DISEASES (5 Conditions)
  // ==========================================
  {
    id: 'apple-scab',
    name: 'Apple Scab',
    scientificName: 'Venturia inaequalis',
    pathogenType: 'Fungal',
    affectedCrops: ['Apple', 'Crabapple', 'Pear'],
    affectedPlantParts: ['Leaves', 'Fruit', 'Petioles'],
    severityLevel: 'Severe',
    symptoms: [
      'Dull olive-green to velvety dark brown circular spots on leaf surfaces',
      'Lesions become raised, corky, and dark olive-black as spores develop',
      'Leaves turn yellow, curl, and drop prematurely',
      'Fruit develops circular rough, black, corky scabs that crack open, deforming the apple',
    ],
    causes: [
      'Ascomycete fungus Venturia inaequalis overwintering in fallen dead leaves on the orchard floor',
      'Spring rains eject ascospores when leaves remain wet for 6 to 12 hours',
      'Cool to moderate temperatures (13°C - 24°C) with persistent moisture',
    ],
    prevention: [
      'Rake, shred, or flail-mow fallen orchard leaves in autumn to accelerate decomposition',
      'Spray 5% urea on orchard floor in late autumn to stimulate microbial breakdown of leaf litter',
      'Plant scab-resistant apple cultivars (e.g. Liberty, Enterprise, GoldRush, Prima)',
      'Prune tree canopies to allow rapid sunlight drying of morning dew',
    ],
    organicTreatment: [
      'Liquid lime sulfur or wettable sulfur applied before predicted rain periods',
      'Potassium bicarbonate foliar sprays',
    ],
    biologicalControl: [
      'Bacillus subtilis bio-fungicide foliar applications',
    ],
    chemicalTreatment: [
      'Mancozeb 75% WP @ 2.5 g/L or Captan 50% WP @ 2 g/L (protective)',
      'Difenoconazole 25% EC @ 0.5 ml/L or Myclobutanil 10% WP @ 0.8 g/L (curative)',
      'Kresoxim-methyl 44.3% SC @ 0.5 ml/L',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '13°C - 24°C',
      humidityRange: '> 85%',
      rainfall: 'Prolonged leaf wetness in spring',
    },
    similarDiseases: [
      {
        name: 'Cedar Apple Rust',
        keyDifference: 'Apple scab forms dark olive-green velvety scabs; cedar apple rust forms bright yellow-orange spots on the upper leaf with tube-like spore horns underneath.',
      },
    ],
  },
  {
    id: 'apple-black-rot',
    name: 'Black Rot (Frogeye Leaf Spot)',
    scientificName: 'Botryosphaeria obtusa',
    pathogenType: 'Fungal',
    affectedCrops: ['Apple', 'Pear'],
    affectedPlantParts: ['Fruit', 'Leaves', 'Limbs / Bark'],
    severityLevel: 'Moderate',
    symptoms: [
      '"Frogeye" leaf spots: small purple specks expanding into circular spots with light tan centers and prominent dark purple margins',
      'Fruit rot: firm, brown rot with concentric dark and light rings expanding across the apple',
      'Rotting fruit turns completely black, shrivels into a hard mummy adhering to the tree',
      'Sunken reddish-brown cankers girdling tree limbs and twigs',
    ],
    causes: [
      'Fungus Botryosphaeria obtusa colonizing dead wood, pruning stubs, and fire-blight cankers',
      'Warm wet weather (20°C - 27°C)',
      'Physical wounds on fruit from hail, insects, or sunscald',
    ],
    prevention: [
      'Prune out and burn all dead limbs, cankers, and mummified fruit during winter dormancy',
      'Make clean pruning cuts flush to the branch collar; avoid leaving pruning stubs',
      'Control fruit-wounding insect pests (codling moth, plum curculio)',
    ],
    organicTreatment: [
      'Copper-based dormant sprays at bud break',
      'Sulfur sprays during early fruit development',
    ],
    biologicalControl: [
      'Trichoderma harzianum wound dressing on large limb cuts',
    ],
    chemicalTreatment: [
      'Captan 50% WP @ 2 g/L or Mancozeb 75% WP @ 2.5 g/L',
      'Thiophanate-methyl 70% WP @ 1 g/L',
      'Pyraclostrobin + Boscalid @ 1 g/L',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '20°C - 27°C',
      humidityRange: '> 80%',
      rainfall: 'Warm rain and overcast intervals',
    },
    similarDiseases: [
      {
        name: 'Apple Scab',
        keyDifference: 'Black rot forms distinctive "frogeye" spots with pale tan centers and purple rings, and causes black mummified fruit; scab forms olive-green velvety spots with rough scabby skin.',
      },
    ],
  },
  {
    id: 'apple-cedar-rust',
    name: 'Cedar Apple Rust',
    scientificName: 'Gymnosporangium juniperi-virginianae',
    pathogenType: 'Fungal',
    affectedCrops: ['Apple', 'Crabapple', 'Eastern Red Cedar (Juniper)'],
    affectedPlantParts: ['Leaves', 'Fruit', 'Young Twigs'],
    severityLevel: 'Moderate',
    symptoms: [
      'Bright yellow-orange or reddish circular spots on the upper leaf surface',
      'Tiny black specks (pycnia) develop inside the orange centers',
      'Lower leaf surface develops raised cylindrical blisters that produce tube-like spore cups (aecia) that curl back like fringe',
      'Leaves turn chlorotic and defoliate under heavy infection',
      'Fruit develops raised orange-yellow blemishes near the calyx end',
    ],
    causes: [
      'Heteroecious rust fungus requiring two alternate hosts: apple and eastern red cedar (Juniperus virginiana)',
      'Orange gelatinous horn-like galls on junipers release basidiospores during wet spring weather',
      'Wind carries spores from junipers to apple trees up to 1-2 miles away',
    ],
    prevention: [
      'Remove cedar and juniper trees within a 500-meter radius of the orchard where feasible',
      'Prune cedar galls from ornamental junipers in winter before spring rains',
      'Plant rust-resistant apple cultivars (e.g. Enterprise, Liberty, Freedom, Redfree)',
    ],
    organicTreatment: [
      'Wettable sulfur or copper sprays applied from tight cluster through petal fall',
    ],
    biologicalControl: [
      'Bacillus subtilis bio-fungicide preventive sprays',
    ],
    chemicalTreatment: [
      'Myclobutanil 10% WP @ 0.8 g/L or Difenoconazole 25% EC @ 0.5 ml/L',
      'Mancozeb 75% WP @ 2.5 g/L',
      'Trifloxystrobin 50% WG @ 0.3 g/L',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '15°C - 24°C',
      humidityRange: '> 85%',
      rainfall: 'Spring rainfall coinciding with juniper gall hydration',
    },
    similarDiseases: [
      {
        name: 'Apple Scab',
        keyDifference: 'Cedar apple rust produces brilliant fluorescent yellow-orange spots with fringed underside tube cups; scab produces dull olive-green/black velvety patches.',
      },
    ],
  },
  {
    id: 'apple-powdery-mildew',
    name: 'Powdery Mildew',
    scientificName: 'Podosphaera leucotricha',
    pathogenType: 'Fungal',
    affectedCrops: ['Apple', 'Pear'],
    affectedPlantParts: ['Shoot Tips', 'Young Foliage', 'Blossoms', 'Fruit'],
    severityLevel: 'Moderate',
    symptoms: [
      'White to pale-gray talcum-powder-like fungal coating on young expanding leaves and terminal shoot tips',
      'Infected leaves become narrow, crinkled, rolled upward, and brittle',
      'Severely affected terminal shoots become stunted ("silver shoots") and die back',
      'Fruit develops a fine, web-like russet netting across the skin',
    ],
    causes: [
      'Fungus Podosphaera leucotricha overwintering as mycelium in dormant terminal and lateral buds',
      'Spreads in warm, dry weather with high ambient relative humidity (70% - 90%)',
      'Does NOT require free standing water on leaves to germinate',
    ],
    prevention: [
      'Prune out and destroy infected "silver tip" shoots during winter and early spring pruning',
      'Plant mildew-tolerant apple varieties',
      'Maintain balanced nitrogen fertilization to avoid excessive succulent late-season vegetative flushes',
    ],
    organicTreatment: [
      'Wettable sulfur @ 3 g/L or potassium bicarbonate (4 g/L) applied every 7-10 days',
      'Horticultural mineral oil (1%) before flower bloom',
    ],
    biologicalControl: [
      'Bacillus amyloliquefaciens foliar spray',
      'Ampelomyces quisqualis hyperparasitic fungus',
    ],
    chemicalTreatment: [
      'Myclobutanil 10% WP @ 0.8 g/L',
      'Penconazole 10% EC @ 0.5 ml/L',
      'Kresoxim-methyl 44.3% SC @ 0.5 ml/L',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '18°C - 26°C',
      humidityRange: '70% - 90%',
      rainfall: 'Warm dry days with humid nights',
    },
    similarDiseases: [
      {
        name: 'Apple Scab',
        keyDifference: 'Powdery mildew forms white/gray flour-like surface powder on narrow crinkled leaves; scab forms dark olive-green velvety spots with rough scabby texture.',
      },
    ],
  },
  {
    id: 'apple-fire-blight',
    name: 'Fire Blight',
    scientificName: 'Erwinia amylovora',
    pathogenType: 'Bacterial',
    affectedCrops: ['Apple', 'Pear', 'Quince', 'Cotoneaster'],
    affectedPlantParts: ['Blossoms', 'Shoots', 'Branches', 'Fruit'],
    severityLevel: 'Critical',
    symptoms: [
      'Blossoms, leaves, and twigs suddenly wilt, turn black or dark brown, and look scorched as if burned by fire',
      'Terminal shoots hook sharply at the tip, forming a characteristic "shepherd\'s crook"',
      'Dead leaves remain firmly attached to the branches rather than dropping',
      'Droplets of sticky, amber-colored bacterial ooze exude from blighted tissues under humid conditions',
      'Bark develops sunken, dark, cracking cankers that girdle limbs and kill entire trees',
    ],
    causes: [
      'Bacterium Erwinia amylovora entering through open blossom nectaries and insect feeding wounds',
      'Warm, humid weather (18°C - 28°C) with rain, heavy dew, or hail',
      'Pollinating honeybees, aphids, and splashing rain disperse bacteria rapidly from flower to flower',
    ],
    prevention: [
      'Prune out blighted strikes during dry winter weather; cut at least 30 cm below visible damage',
      'Sterilize pruning shears between EVERY single cut with 70% isopropyl alcohol or 10% bleach',
      'Avoid heavy nitrogen applications that stimulate rapid, succulent shoot growth',
      'Plant resistant rootstocks (Geneva series) and scion cultivars',
    ],
    organicTreatment: [
      'Copper hydroxide or Bordeaux mixture dormant spray at silver-tip bud break',
      'Apply blossom protectants (potassium aluminum sulfate or biologicals) at bloom',
    ],
    biologicalControl: [
      'Pseudomonas fluorescens (strain A506) or Pantoea agglomerans applied during 20% to 80% bloom',
      'Bacillus subtilis bloom spray',
    ],
    chemicalTreatment: [
      'Streptomycin sulfate @ 0.6 g/L or Kasugamycin @ 2 ml/L sprayed strictly during bloom based on Maryblyt predictive model',
      'Prohexadione-calcium (Apogee) growth regulator to harden shoot tips against vegetative strikes',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '18°C - 28°C',
      humidityRange: '> 80%',
      rainfall: 'Warm rain, thunderstorms, or hail during bloom',
    },
    similarDiseases: [
      {
        name: 'Black Rot Canker',
        keyDifference: 'Fire blight causes rapid blackened "shepherd\'s crook" shoot tips with amber bacterial ooze and scorched clinging leaves; black rot causes slow concentric frogeye leaf spots and dry mummified fruit.',
      },
    ],
  },

  // ==========================================
  // GRAPES DISEASES (5 Conditions)
  // ==========================================
  {
    id: 'grapes-downy-mildew',
    name: 'Downy Mildew',
    scientificName: 'Plasmopara viticola',
    pathogenType: 'Fungal',
    affectedCrops: ['Grapes'],
    affectedPlantParts: ['Leaves', 'Young Shoots', 'Tendrils', 'Berry Clusters'],
    severityLevel: 'Critical',
    symptoms: [
      'Translucent, yellowish-green "oil spots" on the upper leaf surface',
      'Dense, delicate white downy fungal growth on the corresponding underside of the leaf oil spots',
      'Lesions brown, wither, and cause severe premature canopy defoliation',
      'Infected young berry clusters curl into an S-shape and become coated in white downy mold',
      'Older berries turn dull, brownish-gray, shrivel, and drop ("brown rot" phase)',
    ],
    causes: [
      'Oomycete Plasmopara viticola overwintering as oospores in fallen vineyard leaves',
      'The "10-10-24" rule: requires at least 10 mm of rain, temperature of 10°C or higher, within a 24-hour period for primary infection',
      'Heavy morning dew and dense vine canopies',
    ],
    prevention: [
      'Vine training and leaf pulling around fruit zones to maximize air movement and sun exposure',
      'Maintain clean vineyard floor and mow cover crops regularly',
      'Plant resistant grapevine hybrids (PIWI varieties)',
    ],
    organicTreatment: [
      'Bordeaux mixture (1%) or Copper oxychloride (2.5 g/L) prophylactic sprays',
      'Potassium phosphite foliar sprays to induce vine defense mechanisms',
    ],
    biologicalControl: [
      'Trichoderma harzianum or Bacillus subtilis preventive applications',
    ],
    chemicalTreatment: [
      'Metalaxyl 8% + Mancozeb 64% WP @ 2.5 g/L',
      'Dimethomorph 50% WP @ 1 g/L or Mandipropamid 23.4% SC @ 0.8 ml/L',
      'Cymoxanil 8% + Mancozeb 64% WP @ 2 g/L',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '18°C - 25°C',
      humidityRange: '> 90%',
      rainfall: 'Warm rain and morning fog',
    },
    similarDiseases: [
      {
        name: 'Powdery Mildew',
        keyDifference: 'Downy mildew forms distinct yellow "oil spots" with white mold strictly on the leaf underside; powdery mildew forms powdery white ash on both leaf surfaces and gives berries an odor of damp mushrooms.',
      },
    ],
  },
  {
    id: 'grapes-powdery-mildew',
    name: 'Powdery Mildew (Oidium)',
    scientificName: 'Erysiphe necator (Uncinula necator)',
    pathogenType: 'Fungal',
    affectedCrops: ['Grapes'],
    affectedPlantParts: ['Leaves', 'Canes', 'Flowers', 'Green Berries'],
    severityLevel: 'Severe',
    symptoms: [
      'Dull white to grayish-white powdery patches on either surface of young grapevine leaves',
      'Leaves become distorted, crinkled, rolled upward, and brittle',
      'Infected berries develop a web of gray-white fungal powder and stop expanding',
      'Berry skin cracks open, exposing seeds to secondary rot and vinegar flies',
      'Dormant winter canes show prominent dark reddish-brown web-like scars',
    ],
    causes: [
      'Ascomycete fungus Erysiphe necator overwintering as chasmothecia on bark and as dormant mycelium in buds',
      'Warm temperatures (20°C - 28°C) with low sunlight and shaded canopies',
      'Does NOT require rain; inhibited by direct water washing but stimulated by high relative humidity',
    ],
    prevention: [
      'Prune and train vines to open canopies for direct sunlight exposure (sunlight UV inhibits spore germination)',
      'Shoot thinning and hedging to reduce canopy density',
      'Begin prophylactic spray programs early at 2-3 leaf shoot stage',
    ],
    organicTreatment: [
      'Wettable sulfur (3 g/L) or sulfur dusting (25 kg/ha) — standard worldwide control',
      'Potassium bicarbonate (3-5 g/L) or narrow-range horticultural mineral oil',
    ],
    biologicalControl: [
      'Ampelomyces quisqualis bio-fungicide',
      'Bacillus pumilus foliar applications',
    ],
    chemicalTreatment: [
      'Azoxystrobin + Difenoconazole @ 1 ml/L',
      'Penconazole 10% EC @ 0.5 ml/L or Myclobutanil 10% WP @ 0.8 g/L',
      'Fluopyram + Tebuconazole @ 0.6 ml/L',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '20°C - 28°C',
      humidityRange: '60% - 90%',
      rainfall: 'Warm cloudy dry weather with high humidity',
    },
    similarDiseases: [
      {
        name: 'Downy Mildew',
        keyDifference: 'Powdery mildew produces ash-white powder on upper and lower leaf surfaces and cracks expanding berries; downy mildew produces yellow oily upper spots with white downy mold on the underside.',
      },
    ],
  },
  {
    id: 'grapes-black-rot',
    name: 'Black Rot',
    scientificName: 'Guignardia bidwellii',
    pathogenType: 'Fungal',
    affectedCrops: ['Grapes'],
    affectedPlantParts: ['Foliage', 'Shoots', 'Tendrils', 'Berries'],
    severityLevel: 'Severe',
    symptoms: [
      'Small, circular, reddish-brown leaf spots with dark brown margins',
      'Tiny black pimple-like fruiting bodies (pycnidia) arranged in a distinct circle near lesion borders',
      'Half-grown green berries develop small light brown spots that rapidly rot the entire berry in 48 hours',
      'Infected berries shrivel into hard, wrinkled, jet-black mummies covered in black pimples',
      'Mummies remain firmly attached to the bunch stem throughout winter',
    ],
    causes: [
      'Fungus Guignardia bidwellii overwintering in mummified berries on the vine trellis or vineyard floor',
      'Warm wet spring and summer weather (21°C - 32°C)',
      'Requires continuous leaf wetness (6 to 24 hours depending on temperature)',
    ],
    prevention: [
      'Remove and destroy all mummified grape clusters from vines during winter pruning',
      'Cultivate vineyard floor or bury mummies under soil before bud break',
      'Maintain an open canopy for fast drying of leaves and clusters',
    ],
    organicTreatment: [
      'Copper hydroxide or Bordeaux mixture applied before bloom through veraison',
      'Lime sulfur dormant spray',
    ],
    biologicalControl: [
      'Trichoderma harzianum vineyard floor application',
    ],
    chemicalTreatment: [
      'Mancozeb 75% WP @ 2.5 g/L or Captan 50% WP @ 2 g/L',
      'Myclobutanil 10% WP @ 0.8 g/L or Tebuconazole 25.9% EC @ 0.7 ml/L',
      'Azoxystrobin 23% SC @ 1 ml/L',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '21°C - 32°C',
      humidityRange: '> 85%',
      rainfall: 'Rainfall events keeping vines wet >8 hours',
    },
    similarDiseases: [
      {
        name: 'Botrytis Bunch Rot',
        keyDifference: 'Black rot turns berries into hard, shriveled, jet-black mummies with tiny pimples; Botrytis produces soft, watery rot covered in fuzzy gray-brown mold carpets.',
      },
    ],
  },
  {
    id: 'grapes-anthracnose',
    name: "Anthracnose (Bird's Eye Rot)",
    scientificName: 'Elsinoë ampelina',
    pathogenType: 'Fungal',
    affectedCrops: ['Grapes'],
    affectedPlantParts: ['Shoots', 'Leaves', 'Tendrils', 'Berries'],
    severityLevel: 'Moderate',
    symptoms: [
      'Characteristic "bird\'s-eye" spots on berries: circular sunken spots with dark purplish-brown margins, a light gray center, and a sharp black outer rim',
      'On leaves, small circular dark brown spots whose gray centers drop out, creating numerous "shot holes"',
      'Shoots develop deep, sunken, elongated, cankerous pits with raised purplish rims that cause shoots to become brittle and break in wind',
    ],
    causes: [
      'Fungus Elsinoë ampelina overwintering in cankers on dormant canes and mummified fruit',
      'Cool to warm spring weather with heavy rain showers and high humidity',
      'Water droplets splashing conidia from cane cankers onto newly emerging shoots',
    ],
    prevention: [
      'Prune out and destroy infected canes showing sunken purplish cankers during winter dormancy',
      'Apply dormant liquid lime sulfur spray before bud swell to eradicate overwintering cankers',
      'Ensure proper drainage and air circulation across the vineyard rows',
    ],
    organicTreatment: [
      'Liquid lime sulfur applied just before bud break at dormant rates',
      'Copper hydroxide applied from 5 cm shoot growth through bloom',
    ],
    biologicalControl: [
      'Bacillus subtilis bio-fungicide foliar applications',
    ],
    chemicalTreatment: [
      'Mancozeb 75% WP @ 2.5 g/L or Chlorothalonil 75% WP @ 2 g/L',
      'Difenoconazole 25% EC @ 0.5 ml/L',
      'Pyraclostrobin + Metiram @ 2 g/L',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '18°C - 28°C',
      humidityRange: '> 85%',
      rainfall: 'Frequent spring rainfall and splashing water',
    },
    similarDiseases: [
      {
        name: 'Black Rot',
        keyDifference: "Anthracnose produces distinctive 'bird's eye' lesions with gray centers and raised purple margins, plus deep cankers on canes; black rot shrivels whole berries into jet-black pimpled mummies.",
      },
    ],
  },
  {
    id: 'grapes-botrytis-bunch-rot',
    name: 'Botrytis Bunch Rot (Gray Mold)',
    scientificName: 'Botrytis cinerea',
    pathogenType: 'Fungal',
    affectedCrops: ['Grapes', 'Strawberry', 'Tomato'],
    affectedPlantParts: ['Ripe & Ripening Berry Bunches', 'Leaves', 'Shoots'],
    severityLevel: 'Critical',
    symptoms: [
      'Soft, watery, brownish decay of individual berries inside tight grape clusters',
      'Infected berries split open and become engulfed in a dense carpet of fluffy gray-brown mold',
      'Rot quickly spreads from berry to berry throughout the entire bunch ("slip-skin" condition where skin slides easily off pulp)',
      'Entire cluster turns into a foul-smelling rotting mass',
    ],
    causes: [
      'Fungus Botrytis cinerea entering through bloom residues, insect feeding punctures, berry split from rain, or powdery mildew cracks',
      'Cool to warm temperatures (15°C - 22°C) combined with prolonged high relative humidity (>90%)',
      'Tight-clustered grape varieties with dense foliage around the fruiting zone',
    ],
    prevention: [
      'Pull leaves from the fruiting zone immediately after berry set to expose grape bunches to wind and sun',
      'Prevent berry cracking by managing irrigation uniformly and controlling powdery mildew',
      'Avoid high-nitrogen fertilizer applications that inflate berry size and promote compact bunches',
    ],
    organicTreatment: [
      'Potassium bicarbonate or copper soap sprays applied at veraison and pre-harvest',
      'Plant extracts (e.g. Reynoutria sachalinensis extract)',
    ],
    biologicalControl: [
      'Ulocladium oudemansii bio-control agent',
      'Trichoderma harzianum or Bacillus subtilis targeted cluster sprays',
    ],
    chemicalTreatment: [
      'Cyprodinil + Fludioxonil (Switch) @ 0.8 g/L',
      'Boscalid 50% WG @ 1 g/L or Fenhexamid 50% WDG @ 1.5 g/L',
      'Fluopyram 41.5% SC @ 0.5 ml/L',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '15°C - 22°C',
      humidityRange: '> 90%',
      rainfall: 'Rain near harvest with morning fog',
    },
    similarDiseases: [
      {
        name: 'Sour Rot',
        keyDifference: 'Botrytis rot produces prolific gray fuzzy fungal carpets; sour rot produces dripping watery breakdown smelling strongly of vinegar and acetic acid populated by Drosophila fruit flies.',
      },
    ],
  },

  // ==========================================
  // BANANA DISEASES (4 Conditions)
  // ==========================================
  {
    id: 'banana-panama-disease',
    name: 'Panama Disease (Fusarium Wilt - TR4)',
    scientificName: 'Fusarium oxysporum f. sp. cubense',
    pathogenType: 'Fungal',
    affectedCrops: ['Banana', 'Plantain'],
    affectedPlantParts: ['Vascular System', 'Pseudostem', 'Root System'],
    severityLevel: 'Critical',
    symptoms: [
      'Progressive yellowing of oldest lower leaves along leaf margins, spreading toward the midrib',
      'Infected leaves collapse at the petiole junction and hang down along the pseudostem like a dead "skirt"',
      'Longitudinal splitting of the base of the outer pseudostem sheaths',
      'Internal vascular discoloration: continuous reddish-brown to dark brown streaks visible in pseudostem cross-sections',
    ],
    causes: [
      'Soil fungus Fusarium oxysporum producing long-lived chlamydospores that survive >30 years in soil',
      'Tropical Race 4 (TR4) attacks Cavendish bananas as well as local varieties',
      'Spreads via contaminated suckers, farm tools, soil on boots, and irrigation runoff',
    ],
    prevention: [
      'Strict quarantine: plant only certified tissue-cultured banana plantlets produced in sterile laboratories',
      'Disinfect all footwear, machetes, tractor tires, and tools with 20% quaternary ammonium before entering plantations',
      'Fence off contaminated areas and avoid using river or canal runoff water from infected fields',
      'Plant resistant somaclonal variants (e.g. GCTCV-218) where available',
    ],
    organicTreatment: [
      'No cure exists once infected; rogue out, inject with herbicide, and enclose infected mat in plastic bags to prevent spore spread',
      'Incorporate Trichoderma harzianum and mycorrhizal fungi in planting holes for preventative defense',
    ],
    biologicalControl: [
      'Pseudomonas putida and Bacillus velezensis rhizosphere colonization',
    ],
    chemicalTreatment: [
      'No chemical fungicide is effective against systemic Panama disease in the soil or plant',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '25°C - 32°C',
      humidityRange: 'High soil moisture & poor drainage',
      rainfall: 'Tropical wet periods and flood runoff',
    },
    similarDiseases: [
      {
        name: 'Black Sigatoka',
        keyDifference: 'Panama disease is a soil-borne vascular wilt that causes leaf collapse at petioles and brown vascular discoloration inside the pseudostem; Black Sigatoka is an airborne foliar leaf spot.',
      },
    ],
  },
  {
    id: 'banana-black-sigatoka',
    name: 'Black Sigatoka (Black Leaf Streak)',
    scientificName: 'Pseudocercospora fijiensis (Mycosphaerella fijiensis)',
    pathogenType: 'Fungal',
    affectedCrops: ['Banana', 'Plantain'],
    affectedPlantParts: ['Foliage (Leaf Lamina)'],
    severityLevel: 'Critical',
    symptoms: [
      'Tiny reddish-brown to black narrow streaks (1-5 mm) parallel to leaf veins on the underside of leaves',
      'Streaks enlarge into dark brown to black elliptical spots with sunken gray centers and chlorotic halos',
      'Adjacent spots coalesce, causing extensive necrosis of the entire leaf blade and premature leaf death',
      'Defoliation causes premature, uneven ripening of banana bunches and severe bunch weight reduction',
    ],
    causes: [
      'Fungus Pseudocercospora fijiensis producing windborne ascospores and water-splashed conidia',
      'Warm temperatures (25°C - 28°C) combined with high relative humidity (>90%) and rain',
      'Continuous monoculture of susceptible Cavendish bananas',
    ],
    prevention: [
      'Regular leaf de-trashing: mechanically cut off and drop severely infected leaf sections to the ground',
      'Optimize plant density and improve plantation drainage to reduce canopy humidity',
      'Plant resistant or tolerant banana cultivars where market-acceptable',
    ],
    organicTreatment: [
      'Narrow-range horticultural mineral oil sprays (5-10 L/ha) to inhibit fungal ascospore penetration',
      'Copper oxychloride mixed with agricultural paraffin oil',
    ],
    biologicalControl: [
      'Bacillus subtilis foliar misting',
      'Trichoderma harzianum leaf litter application to accelerate decomposition',
    ],
    chemicalTreatment: [
      'Propiconazole 25% EC @ 1 ml/L or Difenoconazole 25% EC @ 0.5 ml/L',
      'Azoxystrobin 23% SC @ 1 ml/L (rotate chemical classes to prevent rapid fungicide resistance)',
      'Trifloxystrobin 50% WG @ 0.4 g/L',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '25°C - 28°C',
      humidityRange: '> 90%',
      rainfall: 'Tropical monsoon rainfall and heavy morning dew',
    },
    similarDiseases: [
      {
        name: 'Yellow Sigatoka',
        keyDifference: 'Black Sigatoka produces dark rusty-black streaks that appear on very young leaves and destroy tissue much faster than Yellow Sigatoka, which produces yellowish-green streaks on older foliage.',
      },
    ],
  },
  {
    id: 'banana-bunchy-top-virus',
    name: 'Banana Bunchy Top Virus (BBTV)',
    scientificName: 'Banana bunchy top babuvirus',
    pathogenType: 'Viral',
    affectedCrops: ['Banana', 'Plantain', 'Abaca'],
    affectedPlantParts: ['Growing Point', 'Pseudostem', 'All Foliage'],
    severityLevel: 'Critical',
    symptoms: [
      'Distinctive dark green "dot-dash" or Morse-code streaks along secondary leaf veins, midribs, and petioles',
      'Leaves become progressively smaller, narrow, stiff, erect, and crowded at the top of the pseudostem, forming a "bunchy" rosette',
      'Leaflet margins become chlorotic and curl upward with necrosis',
      'Plants become severely stunted and completely fail to produce a fruit bunch',
    ],
    causes: [
      'Babuvirus transmitted exclusively by the banana aphid (Pentalonia nigronervosa)',
      'Spreads long distances through infected vegetative planting suckers and corms',
      'Aphid retains virus persistently throughout its entire life',
    ],
    prevention: [
      'Plant only certified virus-indexed tissue-cultured plantlets from accredited laboratories',
      'Strict eradication: inject infected plants with glyphosate or kerosene and dig out the entire corm mat to kill underground buds',
      'Spray aphids with insecticidal soap or imidacloprid before destroying infected plants to prevent vectors from flying to adjacent mats',
    ],
    organicTreatment: [
      'No cure exists for viral infection; prompt eradication of infected plants is the only effective measure',
      'Neem oil (5 ml/L) directed into leaf axils to suppress aphid vector colonies',
    ],
    biologicalControl: [
      'Conserve ladybird beetles and lacewings that prey on banana aphids',
    ],
    chemicalTreatment: [
      'Imidacloprid 17.8% SL @ 0.5 ml/L or Thiamethoxam 25% WG @ 0.3 g/L targeted into leaf axils to kill aphid vectors',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '22°C - 30°C',
      humidityRange: 'Humid tropical plantations',
      rainfall: 'Warm conditions favoring aphid colonization',
    },
    similarDiseases: [
      {
        name: 'Infectious Chlorosis (CMV)',
        keyDifference: 'BBTV produces characteristic dark green "dot-dash" Morse-code veins and an erect bunchy rosette at the plant crown; CMV produces continuous yellow mosaic bands across leaves without bunchy rosettes.',
      },
    ],
  },
  {
    id: 'banana-anthracnose',
    name: 'Anthracnose (Fruit Rot)',
    scientificName: 'Colletotrichum musae',
    pathogenType: 'Fungal',
    affectedCrops: ['Banana', 'Plantain'],
    affectedPlantParts: ['Peel of Ripe & Green Fruit', 'Fruit Pedicel'],
    severityLevel: 'Moderate',
    symptoms: [
      'Small, circular, dark brown to black sunken spots on banana peel as fruit ripens',
      'Lesions coalesce into large sunken black rots with bright salmon-pink to orange gelatinous spore masses in the center',
      'The pulp beneath the lesion becomes soft, brown, and rots',
      'Crown rot: black decay of the finger neck/cushion leading to premature finger drop',
    ],
    causes: [
      'Fungus Colletotrichum musae causing latent quiescent infections on immature green fruit in the field',
      'Spores remain dormant on the green peel until fruit ripening begins (sugar accumulation and acid decrease)',
      'Fruit bruising and abrasion during harvesting, transport, and de-handing',
    ],
    prevention: [
      'Bag banana bunches with perforated plastic sleeves early (immediately after flower bracts shed) to protect fruit from rain-splashed spores',
      'Remove dead floral parts (perianths) from individual banana finger tips by hand',
      'Handle fruit gently with padded packing trays to prevent skin abrasions',
      'Sanitize de-handing wash tanks with clean running water',
    ],
    organicTreatment: [
      'Hot water post-harvest dip (50°C for 3-5 minutes) to kill latent fungal mycelium',
      'Wash fruit in chlorinated water (100 ppm available chlorine)',
    ],
    biologicalControl: [
      'Post-harvest dip with antagonistic yeast (Pichia anomala or Candida oleophila)',
    ],
    chemicalTreatment: [
      'Pre-harvest foliar spray with Azoxystrobin 23% SC @ 1 ml/L or Mancozeb @ 2.5 g/L',
      'Post-harvest dip with Thiabendazole @ 400 ppm or Prochloraz @ 250 ppm where permitted',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '25°C - 30°C',
      humidityRange: '> 85%',
      rainfall: 'Frequent rain during fruit cluster emergence',
    },
    similarDiseases: [
      {
        name: 'Cigar End Rot (Verticillium)',
        keyDifference: 'Anthracnose produces sunken circular black peel pits with salmon-pink spore masses on the fruit body; cigar end rot strictly affects the fruit tip, producing a dry ash-gray powdery rot resembling a burnt cigar tip.',
      },
    ],
  },

  // ==========================================
  // MANGO DISEASES (4 Conditions)
  // ==========================================
  {
    id: 'mango-anthracnose',
    name: 'Anthracnose (Blossom Blight & Fruit Rot)',
    scientificName: 'Colletotrichum gloeosporioides',
    pathogenType: 'Fungal',
    affectedCrops: ['Mango', 'Avocado', 'Papaya'],
    affectedPlantParts: ['Blossom Panicles', 'Tender Leaves', 'Twigs', 'Fruit'],
    severityLevel: 'Critical',
    symptoms: [
      'Blossom blight: panicles develop minute black spots that expand, causing flowers to blacken, dry out, and drop completely (heavy yield loss)',
      'Tender young leaves develop angular brown-to-black spots that tear, giving leaves a ragged, shot-hole appearance',
      'On fruit, dark brown to black sunken circular or irregular patches develop during ripening',
      '"Tear-stain" symptom: black streaks running vertically down the fruit surface where spore-laden rainwater dripped from twigs',
    ],
    causes: [
      'Fungus Colletotrichum gloeosporioides overwintering on defoliated twigs and old leaves',
      'Warm temperatures (24°C - 30°C) with persistent rain or high humidity during flowering and fruit set',
      'Latent quiescent infections established on green fruit emerging after harvest',
    ],
    prevention: [
      'Prune dead wood, twigs, and crisscrossing branches after harvest to open the canopy to air and sunlight',
      'Spray preventive fungicides at 10-14 day intervals from flower bud emergence through fruit set',
      'Harvest fruit with 1 cm stem pedicel attached to prevent latex burn and fungal entry wounds',
    ],
    organicTreatment: [
      'Hot water treatment of harvested mangoes (52°C for 5 minutes) to eradicate latent peel infections',
      'Copper oxychloride (3 g/L) prophylactic sprays before flowering',
    ],
    biologicalControl: [
      'Bacillus subtilis or Trichoderma viride panicle spray',
    ],
    chemicalTreatment: [
      'Azoxystrobin 23% SC @ 1 ml/L or Pyraclostrobin 20% WG @ 1 g/L at flowering',
      'Carbendazim 50% WP @ 1 g/L or Thiophanate-methyl 70% WP @ 1.5 g/L',
      'Difenoconazole 25% EC @ 0.5 ml/L',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '24°C - 30°C',
      humidityRange: '> 85%',
      rainfall: 'Rain or persistent morning fog during flowering',
    },
    similarDiseases: [
      {
        name: 'Bacterial Canker',
        keyDifference: 'Anthracnose lesions on fruit are sunken, smooth, and tear-stained; bacterial canker produces raised, starry, star-cracked black scabs with gummy exuding sap.',
      },
    ],
  },
  {
    id: 'mango-powdery-mildew',
    name: 'Powdery Mildew',
    scientificName: 'Oidium mangiferae',
    pathogenType: 'Fungal',
    affectedCrops: ['Mango'],
    affectedPlantParts: ['Flower Panicles', 'Tender Foliage', 'Young Fruitlets'],
    severityLevel: 'Severe',
    symptoms: [
      'White to grayish powdery coating covering flower buds, panicle stalks, and open blossoms',
      'Infected flowers fail to open, dry out, turn brown, and drop off, resulting in zero fruit set',
      'Young pea-sized fruitlets become coated in white powder, crack, become corky, and drop prematurely',
      'Young tender leaves show white powdery patches, become curled, distorted, and leathery',
    ],
    causes: [
      'Fungus Oidium mangiferae spreading via windborne conidia during early spring flowering',
      'Cool nights (10°C - 15°C) followed by warm sunny days (20°C - 26°C) with morning dew',
      'Low light and shaded canopies promote rapid spread',
    ],
    prevention: [
      'Prune inner branches after harvest to allow maximum sunlight into the center of the tree',
      'Apply first preventive spray when flower panicles are 5-8 cm long before blossoms open',
    ],
    organicTreatment: [
      'Wettable sulfur (80% WDG) @ 2.5 g/L water sprayed in early morning before temperatures exceed 30°C',
      'Potassium bicarbonate (3 g/L)',
    ],
    biologicalControl: [
      'Ampelomyces quisqualis bio-parasite',
      'Bacillus subtilis bio-fungicide',
    ],
    chemicalTreatment: [
      'Hexaconazole 5% EC @ 1 ml/L or Difenoconazole 25% EC @ 0.5 ml/L',
      'Myclobutanil 10% WP @ 0.8 g/L',
      'Dinocap 48% EC @ 1 ml/L or Penconazole @ 0.5 ml/L',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '18°C - 26°C',
      humidityRange: '60% - 85%',
      rainfall: 'Dry weather with heavy dew at flowering stage',
    },
    similarDiseases: [
      {
        name: 'Anthracnose Blossom Blight',
        keyDifference: 'Powdery mildew coats flower panicles in white flour-like powder during dry cool weather; anthracnose causes black necrotic rotting of flower stalks during wet rainy periods.',
      },
    ],
  },
  {
    id: 'mango-bacterial-canker',
    name: 'Bacterial Canker (Black Spot)',
    scientificName: 'Xanthomonas citri pv. mangiferaeindicae',
    pathogenType: 'Bacterial',
    affectedCrops: ['Mango'],
    affectedPlantParts: ['Leaves', 'Twigs', 'Fruit', 'Fruit Stalks'],
    severityLevel: 'Severe',
    symptoms: [
      'Leaves show water-soaked angular black spots (1-4 mm) surrounded by a clear yellow halo',
      'Spots coalesce into raised, rough, dark brown to black corky patches along veins',
      'Fruit develops water-soaked spots that crack into distinctive raised, star-shaped ("stellate") fissures',
      'Sticky gum exudes from the cracked fruit cankers and runs down the skin',
      'Heavy premature fruit drop of marble-sized fruitlets',
    ],
    causes: [
      'Bacterium Xanthomonas citri pv. mangiferaeindicae entering through stomata and mechanical wounds',
      'High temperatures (25°C - 32°C) combined with frequent rainstorms and gale winds',
      'Wind-blown sand and leaf rubbing during storms creates wound entry portals',
    ],
    prevention: [
      'Plant windbreaks around the orchard perimeter (Casuarina, Eucalyptus) to reduce mechanical wind abrasion',
      'Prune and burn infected twigs and cankered branches during the dry season',
      'Disinfect secateurs with 10% bleach between trees',
    ],
    organicTreatment: [
      'Copper oxychloride (3 g/L) prophylactic sprays starting at leaf flush and fruit set',
      'Bordeaux mixture (1%) post-harvest spray',
    ],
    biologicalControl: [
      'Bacillus amyloliquefaciens foliar spray',
    ],
    chemicalTreatment: [
      'Copper oxychloride (2.5 g/L) + Streptomycin sulfate (Streptocycline @ 0.6 g/10L water) applied every 14 days during storm periods',
      'Kasugamycin 3% SL @ 2 ml/L',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '25°C - 32°C',
      humidityRange: '> 85%',
      rainfall: 'High wind and torrential rain storms',
    },
    similarDiseases: [
      {
        name: 'Anthracnose',
        keyDifference: 'Bacterial canker produces raised star-shaped cracked fruit lesions with sticky gummy exudate; anthracnose produces sunken smooth circular black lesions without star-cracks.',
      },
    ],
  },
  {
    id: 'mango-dieback',
    name: 'Dieback Disease',
    scientificName: 'Lasiodiplodia theobromae (Botryosphaeria rhodina)',
    pathogenType: 'Fungal',
    affectedCrops: ['Mango', 'Citrus', 'Guava'],
    affectedPlantParts: ['Twigs', 'Branches', 'Trunk Vascular System'],
    severityLevel: 'Severe',
    symptoms: [
      'Progressive drying and withering of twigs from the tip backward ("dieback")',
      'Leaves on affected branches turn brown, roll inward, dry up, and remain attached to dead twigs',
      'Bark of affected branches turns dark brown, cracks, and exudes brown sticky gum (gummosis)',
      'Internal vascular discoloration: brown discoloration of wood when branch is sliced open',
    ],
    causes: [
      'Fungus Lasiodiplodia theobromae entering through pruning cuts, frost cracks, sunburn, or stem-borer insect tunnels',
      'High temperatures (28°C - 35°C) and water stress or drought',
      'Un-sanitized pruning tools transmitting spores between trees',
    ],
    prevention: [
      'Prune dead branches at least 5-8 cm into healthy green wood',
      'Immediately paint all cut wounds with copper oxychloride paste or Bordeaux paste (10%)',
      'Control mango stem borer (Batocera rufomaculata) to prevent entry wounds',
      'Maintain regular irrigation and avoid water stress during dry summer months',
    ],
    organicTreatment: [
      'Apply cow-dung and clay paste mixed with copper oxychloride to tree trunk wounds',
      'Neem cake soil amendment to improve tree vigor',
    ],
    biologicalControl: [
      'Trichoderma viride wound paste application',
    ],
    chemicalTreatment: [
      'Spray copper oxychloride 50% WP @ 3 g/L or Carbendazim 50% WP @ 1.5 g/L immediately after pruning',
      'Thiophanate-methyl 70% WP @ 1 g/L',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '28°C - 35°C',
      humidityRange: 'Hot dry weather alternating with rains',
      rainfall: 'Drought-stressed trees following summer',
    },
    similarDiseases: [
      {
        name: 'Verticillium Wilt',
        keyDifference: 'Dieback causes tip-to-base drying of branches with brown clinging leaves and gum exudation on mature trees; Verticillium affects young trees with sudden yellow wilt.',
      },
    ],
  },

  // ==========================================
  // CITRUS DISEASES (4 Conditions)
  // ==========================================
  {
    id: 'citrus-canker',
    name: 'Citrus Canker',
    scientificName: 'Xanthomonas axonopodis pv. citri',
    pathogenType: 'Bacterial',
    affectedCrops: ['Citrus', 'Lemon', 'Lime', 'Sweet Orange', 'Grapefruit'],
    affectedPlantParts: ['Leaves', 'Twigs', 'Fruit'],
    severityLevel: 'Critical',
    symptoms: [
      'Raised, corky, blister-like circular pustules on both upper and lower leaf surfaces',
      'Lesions develop a crater-like depression in the center and are surrounded by a distinct oily yellow chlorotic halo',
      'Fruit develops raised, rough, spongy, corky brown lesions that reduce commercial market value',
      'Severe infection causes premature fruit drop and heavy defoliation',
    ],
    causes: [
      'Bacterium Xanthomonas axonopodis pv. citri entering through stomata or wounds caused by Asian citrus leafminer (Phyllocnistis citrella)',
      'Warm temperatures (20°C - 30°C) with blowing rain and wind gusts',
      'Splashing overhead irrigation and contaminated pruning tools',
    ],
    prevention: [
      'Establish tall windbreak trees around the orchard to reduce wind speeds below 8 m/s (reduces bacterial water-soaking penetration)',
      'Aggressively control Asian citrus leafminer larvae whose serpentine leaf mines dramatically increase bacterial infection by 100-fold',
      'Prune and burn cankered twigs and water sprouts before the spring vegetative flush',
    ],
    organicTreatment: [
      'Bordeaux mixture (1%) or Copper hydroxide (2 g/L) protective sprays applied at new shoot flushes',
      'Neem seed kernel extract (NSKE 5%) to suppress leafminer larvae',
    ],
    biologicalControl: [
      'Release leafminer parasitoid wasp Ageniaspis citricola',
      'Bacillus subtilis bio-bactericide sprays',
    ],
    chemicalTreatment: [
      'Copper oxychloride (2.5 g/L) + Streptomycin sulfate (Streptocycline @ 0.6 g/10L) spray',
      'Kasugamycin 3% SL @ 2 ml/L',
      'Imidacloprid 17.8% SL @ 0.5 ml/L for leafminer control',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '20°C - 30°C',
      humidityRange: '> 80%',
      rainfall: 'Blowing rainstorms and wind-driven moisture',
    },
    similarDiseases: [
      {
        name: 'Citrus Black Spot',
        keyDifference: 'Citrus canker lesions are raised, corky, eruptive blisters on both leaf surfaces surrounded by oily yellow halos; Citrus black spot lesions are sunken, hard, dark spots on fruit and leaves with no corky eruption.',
      },
    ],
  },
  {
    id: 'citrus-greening',
    name: 'Citrus Greening (Huanglongbing - HLB)',
    scientificName: 'Candidatus Liberibacter asiaticus',
    pathogenType: 'Bacterial',
    affectedCrops: ['Citrus', 'Sweet Orange', 'Mandarin', 'Grapefruit', 'Lime'],
    affectedPlantParts: ['Phloem Vascular System', 'Leaves', 'Root System', 'Fruit'],
    severityLevel: 'Critical',
    symptoms: [
      'Asymmetrical, blotchy, irregular yellow mottling across leaf veins (unlike nutrient deficiency which is symmetrical)',
      'Yellow shoots standing out starkly in an otherwise green canopy ("yellow dragon disease")',
      'Leaves become small, upright, thick, and leathery with raised corky veins',
      'Fruit remains small, lopsided, irregularly shaped, and fails to ripen fully (remains green at the blossom end)',
      'Fruit juice tastes bitter, salty, and sour; aborted black seeds inside fruit',
      'Progressive canopy dieback and tree death within 3 to 5 years',
    ],
    causes: [
      'Fastidious, unculturable phloem-limited bacterium Candidatus Liberibacter asiaticus',
      'Transmitted by the Asian citrus psyllid (Diaphorina citri)',
      'Spreads through infected nursery graft budwood',
    ],
    prevention: [
      'Plant only certified disease-free rootstocks and scions from screenhouse-certified nurseries',
      'Monitor for Asian citrus psyllids (adults feed at characteristic 45-degree angle to stem tips)',
      'Rogue out and remove PCR-positive HLB infected trees immediately to eliminate regional reservoir',
      'Area-wide coordinated psyllid management across neighboring orchards',
    ],
    organicTreatment: [
      'No cure exists for established HLB; tree removal is required to protect orchard',
      'Foliar nutritional therapy (zinc, manganese, iron, potassium phosphite) provides temporary vigor support',
      'Spray horticultural mineral oil (1-2%) to deter psyllid egg-laying on new flush',
    ],
    biologicalControl: [
      'Release psyllid ectoparasitoid Tamarixia radiata',
      'Conserve ladybird beetles and lacewings that feed on psyllid nymphs',
    ],
    chemicalTreatment: [
      'Systemic insecticides for psyllid control: Imidacloprid 17.8% SL (soil drench on young trees) or Thiamethoxam 25% WG',
      'Dimethoate 30% EC @ 1.5 ml/L or Chlorpyrifos 20% EC @ 2 ml/L during shoot flushes',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '24°C - 32°C',
      humidityRange: 'Semi-arid to humid subtropical/tropical',
      rainfall: 'Flushing periods favoring psyllid reproduction',
    },
    similarDiseases: [
      {
        name: 'Zinc Deficiency',
        keyDifference: 'Zinc deficiency causes symmetrical interveinal chlorosis identical on both halves of the leaf blade; Citrus greening causes distinctly asymmetrical, blotchy mottle crossing the veins randomly.',
      },
    ],
  },
  {
    id: 'citrus-black-spot',
    name: 'Citrus Black Spot',
    scientificName: 'Phyllosticta citricarpa (Guignardia citricarpa)',
    pathogenType: 'Fungal',
    affectedCrops: ['Citrus', 'Sweet Orange', 'Lemon', 'Mandarin'],
    affectedPlantParts: ['Fruit Rind', 'Leaves', 'Twigs'],
    severityLevel: 'Severe',
    symptoms: [
      'Hard spot on fruit: small, round, sunken circular spots with gray-white centers and brick-red to black margins with tiny black pycnidia',
      'False melanose: numerous tiny, raised, dark brown to black specks without pycnidia',
      'Virulent spot: large, irregular sunken necrotic lesions that cause premature fruit drop',
      'Leaves show circular sunken spots with yellow halos (common on lemons, rare on sweet orange foliage)',
    ],
    causes: [
      'Fungus Phyllosticta citricarpa producing windblown ascospores from decaying orchard leaf litter',
      'Spreads during warm, rainy periods (21°C - 30°C) onto young fruitlets (most susceptible from petal fall to 5 months later)',
      'Symptoms remain latent on green fruit and express dramatically as fruit ripens and turns color',
    ],
    prevention: [
      'Accelerate decomposition of fallen leaf litter by applying urea or frequent under-tree mulching',
      'Maintain an open canopy to facilitate quick drying after rainfall',
      'Prevent transport of fruit with leaves or twigs attached into uninfected zones',
    ],
    organicTreatment: [
      'Copper oxychloride (2.5 g/L) or copper hydroxide applied at 3-4 week intervals from petal fall',
      'Lime sulfur dormant sprays',
    ],
    biologicalControl: [
      'Bacillus subtilis bio-fungicide applications',
    ],
    chemicalTreatment: [
      'Azoxystrobin 23% SC @ 1 ml/L or Pyraclostrobin 20% WG @ 1 g/L',
      'Mancozeb 75% WP @ 2.5 g/L (protective tank-mix with strobilurins)',
      'Difenoconazole 25% EC @ 0.5 ml/L',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '21°C - 30°C',
      humidityRange: '> 85%',
      rainfall: 'Warm rain events from petal fall through fruit development',
    },
    similarDiseases: [
      {
        name: 'Citrus Canker',
        keyDifference: 'Citrus black spot produces sunken hard lesions with black rims and white centers strictly on the rind; citrus canker produces raised, spongy, corky blisters with oily yellow halos.',
      },
    ],
  },
  {
    id: 'citrus-gummosis',
    name: 'Gummosis & Foot Rot',
    scientificName: 'Phytophthora nicotianae / Phytophthora citrophthora',
    pathogenType: 'Fungal',
    affectedCrops: ['Citrus', 'Sweet Orange', 'Lemon', 'Mandarin'],
    affectedPlantParts: ['Trunk Base', 'Crown Roots', 'Low-Hanging Fruit'],
    severityLevel: 'Critical',
    symptoms: [
      'Dark, water-soaked patches on the trunk bark near the soil line that crack and exude profuse amber-colored gum',
      'Bark dries out, shrinks, and sloughs off in vertical strips, leaving exposed dead wood',
      'Girdling of the trunk base causes canopy chlorosis, leaf drop, twig dieback, and tree collapse',
      'Low-hanging fruit develops brown rot with a characteristic pungent foul odor',
    ],
    causes: [
      'Soil-borne oomycete Phytophthora entering through bark wounds, prolonged trunk wetting, and deep planting',
      'Heavy, clayey, poorly drained soils subject to waterlogging',
      'Flood irrigation water contacting the trunk bark directly',
    ],
    prevention: [
      'Bud or graft commercial scions high (>30-45 cm above ground) onto Phytophthora-resistant rootstocks (e.g. Swingle citrumelo, Trifoliate orange, Carrizo citrange)',
      'Keep irrigation water away from tree trunks; use drip emitters placed 50 cm away from the trunk',
      'Avoid deep planting: crown root flare must remain at or slightly above the soil surface',
      'Paint tree trunks up to 50 cm with Bordeaux paste (1:1:10 copper sulfate, lime, water)',
    ],
    organicTreatment: [
      'Scrape away infected bark with a sanitized curved knife down to healthy wood and paint with Bordeaux paste',
      'Apply Trichoderma harzianum enriched in compost around root zone',
    ],
    biologicalControl: [
      'Pseudomonas fluorescens root zone colonization',
    ],
    chemicalTreatment: [
      'Foliar spray with Potassium phosphite (Fosetyl-Al @ 2.5 g/L) which moves systemically down to roots',
      'Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ) @ 2.5 g/L trunk paint and soil drench',
      'Mefenoxam soil drench around drip line',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '24°C - 32°C',
      humidityRange: 'Waterlogged soil & high moisture',
      rainfall: 'Flooding or sprinkler water striking lower trunk',
    },
    similarDiseases: [
      {
        name: 'Citrus Greening',
        keyDifference: 'Gummosis causes trunk bark cracking with profuse gum leakage and girdling decay; greening produces asymmetrical foliar mottle and lopsided bitter fruit without trunk bark lesions.',
      },
    ],
  },

  // ==========================================
  // HEALTHY PLANT CATEGORIES FOR ALL SUPPORTED CROPS
  // ==========================================
  {
    id: 'tomato-healthy',
    name: 'Tomato (Healthy Foliage)',
    scientificName: 'Solanum lycopersicum (Healthy)',
    pathogenType: 'Healthy',
    affectedCrops: ['Tomato'],
    affectedPlantParts: ['Leaves', 'Stems', 'Fruit', 'Roots'],
    severityLevel: 'Healthy',
    symptoms: [
      'Vibrant deep green leaflets with uniform chlorophyll reflectance',
      'Complete absence of chlorotic yellow halos, concentric necrotic spots, or water-soaked lesions',
      'Strong, erect stems with active apical meristem growth and healthy glandular hairs',
      'Intact flower trusses with successful pollination and firm fruit set',
    ],
    causes: [
      'Balanced soil nutrition, optimal irrigation, and effective preventative pest/disease management',
    ],
    prevention: [
      'Continue standard crop monitoring schedule every 5-7 days',
      'Maintain regular drip irrigation keeping root zone evenly moist',
      'Apply organic compost tea or balanced fertilizer based on soil test',
    ],
    organicTreatment: [
      'Prophylactic cold-pressed neem oil (2 ml/L) or Panchagavya spray',
      'Mulch beds with clean organic straw to retain moisture and suppress weeds',
    ],
    biologicalControl: [
      'Conserve resident beneficial predators (ladybugs, lacewings, predatory mites)',
    ],
    chemicalTreatment: [
      'No chemical treatment required for healthy, vigorous foliage',
    ],
    image: '/src/assets/images/agriscan_farm_hero_1793884802132.jpg',
    favorableConditions: {
      tempRange: '20°C - 28°C',
      humidityRange: '50% - 70%',
      rainfall: 'Adequate uniform soil moisture',
    },
    similarDiseases: [],
  },
  {
    id: 'potato-healthy',
    name: 'Potato (Healthy Foliage & Tubers)',
    scientificName: 'Solanum tuberosum (Healthy)',
    pathogenType: 'Healthy',
    affectedCrops: ['Potato'],
    affectedPlantParts: ['Canopy', 'Stolons', 'Tubers'],
    severityLevel: 'Healthy',
    symptoms: [
      'Dense, dark green foliage canopy without leaf cupping, curling, or brown necrotic spots',
      'Clean stems without blackleg inkiness, cankers, or aerial tubers',
      'Uniform tuber enlargement under soil ridges with smooth periderm and clean lenticels',
    ],
    causes: [
      'High-quality certified seed tubers, good ridge hilling, and disease-free soil',
    ],
    prevention: [
      'Maintain deep hilling to protect expanding tubers from greening and spores',
      'Schedule preventative copper spray prior to rainy weather fronts',
    ],
    organicTreatment: [
      'Liquid seaweed extract foliar spray for vigor',
    ],
    biologicalControl: [
      'Conserve ground beetles and parasitoids',
    ],
    chemicalTreatment: [
      'No chemical treatment required',
    ],
    image: '/src/assets/images/agriscan_farm_hero_1793884802132.jpg',
    favorableConditions: {
      tempRange: '15°C - 22°C',
      humidityRange: '60% - 80%',
      rainfall: 'Consistent moisture with good drainage',
    },
    similarDiseases: [],
  },
  {
    id: 'apple-healthy',
    name: 'Apple (Healthy Orchard Foliage)',
    scientificName: 'Malus domestica (Healthy)',
    pathogenType: 'Healthy',
    affectedCrops: ['Apple'],
    affectedPlantParts: ['Leaves', 'Shoots', 'Spurs', 'Fruit'],
    severityLevel: 'Healthy',
    symptoms: [
      'Unblemished, glossy green leaves without olive-green scab spots or powdery mildew powder',
      'Straight vigorous shoot growth without shepherd’s crook blighting',
      'Smooth, intact fruit skin free of blemishes, russeting, or rot craters',
    ],
    causes: [
      'Good winter sanitation, canopy pruning, and well-timed seasonal nutrition',
    ],
    prevention: [
      'Maintain annual winter pruning and mow orchard floor regularly',
    ],
    organicTreatment: [
      'Preventive dormant mineral oil spray',
    ],
    biologicalControl: [
      'Maintain flowering cover crops for pollinator and predator habitat',
    ],
    chemicalTreatment: [
      'No chemical treatment required',
    ],
    image: '/src/assets/images/agriscan_farm_hero_1793884802132.jpg',
    favorableConditions: {
      tempRange: '18°C - 24°C',
      humidityRange: '50% - 70%',
      rainfall: 'Well-spaced sunshine and rain',
    },
    similarDiseases: [],
  },
  {
    id: 'grapes-healthy',
    name: 'Grapes (Healthy Vine Canopy)',
    scientificName: 'Vitis vinifera (Healthy)',
    pathogenType: 'Healthy',
    affectedCrops: ['Grapes'],
    affectedPlantParts: ['Canopy', 'Canes', 'Clusters'],
    severityLevel: 'Healthy',
    symptoms: [
      'Lush, green, expanded vine leaves free of yellow oil spots or white powdery mold',
      'Firm, clean green berry clusters with intact natural waxy bloom',
      'Vigorous cane extension with active green tendrils',
    ],
    causes: [
      'Proper canopy shoot-positioning, leaf thinning in fruit zone, and balanced trellis management',
    ],
    prevention: [
      'Regular hedging and shoot positioning to maintain open canopy',
    ],
    organicTreatment: [
      'Preventative wettable sulfur at vegetative intervals',
    ],
    biologicalControl: [
      'Conserve predatory mites (Typhlodromus pyri)',
    ],
    chemicalTreatment: [
      'No chemical treatment required',
    ],
    image: '/src/assets/images/agriscan_farm_hero_1793884802132.jpg',
    favorableConditions: {
      tempRange: '20°C - 28°C',
      humidityRange: '50% - 65%',
      rainfall: 'Dry flowering and ripening weather',
    },
    similarDiseases: [],
  },
  {
    id: 'banana-healthy',
    name: 'Banana (Healthy Plant Canopy)',
    scientificName: 'Musa acuminata (Healthy)',
    pathogenType: 'Healthy',
    affectedCrops: ['Banana', 'Plantain'],
    affectedPlantParts: ['Leaves', 'Pseudostem', 'Bunch'],
    severityLevel: 'Healthy',
    symptoms: [
      'Broad, vibrant green leaves with unbroken lamina extending gracefully from pseudostem',
      'Clean pseudostem without splitting, gummy weeping, or dead leaf skirts',
      'Uniform fruit bunch with plump green fingers and clean skin',
    ],
    causes: [
      'Clean certified tissue-culture planting material, ample organic mulching, and potassium nutrition',
    ],
    prevention: [
      'Maintain de-trashing of dry leaves and adequate drainage trenches',
    ],
    organicTreatment: [
      'Heavy mulching with organic crop residues',
    ],
    biologicalControl: [
      'Conserve soil biodiversity around the root zone',
    ],
    chemicalTreatment: [
      'No chemical treatment required',
    ],
    image: '/src/assets/images/agriscan_farm_hero_1793884802132.jpg',
    favorableConditions: {
      tempRange: '25°C - 32°C',
      humidityRange: '70% - 85%',
      rainfall: 'Even tropical rainfall or drip irrigation',
    },
    similarDiseases: [],
  },
  {
    id: 'mango-healthy',
    name: 'Mango (Healthy Canopy & Fruit)',
    scientificName: 'Mangifera indica (Healthy)',
    pathogenType: 'Healthy',
    affectedCrops: ['Mango'],
    affectedPlantParts: ['Foliage', 'Panicles', 'Fruit'],
    severityLevel: 'Healthy',
    symptoms: [
      'Glossy, dark green mature leaves free of necrotic spots or powder',
      'Vigorous, branching flower panicles with abundant hermaphrodite blossoms',
      'Smooth clean skin on expanding fruit without tear-stains or star cracks',
    ],
    causes: [
      'Post-harvest canopy pruning, optimal micronutrient foliar sprays, and dry weather at flowering',
    ],
    prevention: [
      'Annual post-harvest sanitation pruning to allow sunlight into tree interior',
    ],
    organicTreatment: [
      'Neem cake root zone amendment',
    ],
    biologicalControl: [
      'Encourage honeybee and pollinator fly populations during bloom',
    ],
    chemicalTreatment: [
      'No chemical treatment required',
    ],
    image: '/src/assets/images/agriscan_farm_hero_1793884802132.jpg',
    favorableConditions: {
      tempRange: '24°C - 32°C',
      humidityRange: '50% - 70%',
      rainfall: 'Dry flowering period',
    },
    similarDiseases: [],
  },
  {
    id: 'citrus-healthy',
    name: 'Citrus (Healthy Tree Canopy)',
    scientificName: 'Citrus spp. (Healthy)',
    pathogenType: 'Healthy',
    affectedCrops: ['Citrus', 'Lemon', 'Sweet Orange'],
    affectedPlantParts: ['Leaves', 'Twigs', 'Fruit'],
    severityLevel: 'Healthy',
    symptoms: [
      'Rich, glossy, dark green aromatic leaves without blotchy yellow mottle or corky cankers',
      'Firm clean green twigs without gum exudation or dieback',
      'Smooth, intact fruit peel free of scab pustules or black spots',
    ],
    causes: [
      'Certified disease-free rootstocks, windbreak protection, and balanced micronutrient nutrition',
    ],
    prevention: [
      'Maintain annual trunk painting and psyllid monitoring',
    ],
    organicTreatment: [
      'Zinc and manganese sulfate foliar sprays during vegetative flush',
    ],
    biologicalControl: [
      'Conserve Tamarixia wasps and ladybird predators',
    ],
    chemicalTreatment: [
      'No chemical treatment required',
    ],
    image: '/src/assets/images/agriscan_farm_hero_1793884802132.jpg',
    favorableConditions: {
      tempRange: '20°C - 30°C',
      humidityRange: '55% - 75%',
      rainfall: 'Regular drip irrigation with well-drained soil',
    },
    similarDiseases: [],
  },

  // ==========================================
  // EXISTING CEREAL DISEASES (Kept Intact)
  // ==========================================
  {
    id: 'rice-blast',
    name: 'Rice Blast (Magnaporthe oryzae)',
    scientificName: 'Magnaporthe oryzae (Pyricularia oryzae)',
    pathogenType: 'Fungal',
    affectedCrops: ['Rice (Paddy)'],
    affectedPlantParts: ['Leaves', 'Neck', 'Panicles', 'Nodes'],
    severityLevel: 'Critical',
    symptoms: [
      'Elliptical or spindle-shaped (diamond-like) spots with gray/white centers and dark brown borders',
      'Spots enlarge and coalesce, rapidly killing entire leaf blades',
      'Neck rot: blackish-brown lesion at the panicle base causing the head to snap and lodge ("rotten neck")',
      'Blanking: empty, whitish, erect panicles with zero grain filling',
    ],
    causes: [
      'Fungus Magnaporthe oryzae producing airborne conidia',
      'Overuse of chemical nitrogen fertilizers (urea) causing excessive lush, tender tillers',
      'High relative humidity (>90%) with prolonged leaf wetness (dew) and night temperatures 17°C - 22°C',
    ],
    prevention: [
      'Split application of nitrogenous fertilizers; avoid excess single doses of urea',
      'Maintain 5 cm standing water in paddy fields (drought stress accelerates blast infection)',
      'Use certified blast-resistant seed varieties and avoid dense planting',
    ],
    organicTreatment: [
      'Foliar spray of fermented cow urine and neem leaf extract (10%)',
      'Silica supplementation (potassium silicate @ 2 ml/L) to harden silica cells in rice epidermis',
    ],
    biologicalControl: [
      'Pseudomonas fluorescens (seed treatment @ 10 g/kg seed + foliar spray @ 5 g/L)',
      'Trichoderma viride nursery seedbed drenching',
    ],
    chemicalTreatment: [
      'Tricyclazole 75% WP @ 0.6 g/L water (most effective protective and curative active)',
      'Isoprothiolane 40% EC @ 1.5 ml/L or Kasugamycin 3% SL @ 2.5 ml/L',
      'Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '19°C - 28°C',
      humidityRange: '> 92%',
      rainfall: 'High dew periods and cloudy drizzle',
    },
    similarDiseases: [
      {
        name: 'Brown Spot (Bipolaris oryzae)',
        keyDifference: 'Brown spot lesions are oval or circular with dark brown margins resembling sesame seeds, lacking the distinct diamond/spindle pointed ends of blast.',
      },
    ],
  },
  {
    id: 'maize-turcicum-leaf-blight',
    name: 'Turcicum Leaf Blight / Northern Corn Leaf Blight',
    scientificName: 'Exserohilum turcicum (Setosphaeria turcica)',
    pathogenType: 'Fungal',
    affectedCrops: ['Maize / Corn', 'Sorghum'],
    affectedPlantParts: ['Leaf Blades', 'Sheaths'],
    severityLevel: 'Severe',
    symptoms: [
      'Long, elliptical, grayish-green or tan lesions (3 to 15 cm long) parallel to leaf veins',
      'Lesions resemble boat or spindle shapes ("cigar-shaped" blights)',
      'Olive-green to black velvety fungal spore mats visible in lesion centers during wet mornings',
      'Premature burning and death of the entire canopy during silking and grain filling',
    ],
    causes: [
      'Fungus Exserohilum turcicum surviving on old maize stubble and crop residue',
      'Moderate temperatures (18°C - 27°C) accompanied by heavy dews or overcast days',
      'Continuous monocropping of susceptible hybrid corn',
    ],
    prevention: [
      'Deep plowing to bury infested maize crop residue below 15 cm depth',
      'Plant resistant corn hybrids with Ht genes',
      'Rotate crops with legumes or sunflower for at least 1-2 seasons',
    ],
    organicTreatment: [
      'Foliar spray of 5% raw cow milk or whey solution to foster antagonistic epiphytes',
      'Spray Trichoderma harzianum (5 g/L) at 30 and 45 days after sowing',
    ],
    biologicalControl: [
      'Bacillus amyloliquefaciens seed and foliar inoculants',
    ],
    chemicalTreatment: [
      'Mancozeb 75% WP @ 2.5 g/L water at first appearance of cigar lesions',
      'Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L',
      'Propiconazole 25% EC @ 1 ml/L applied at knee-high and tasseling stages',
    ],
    image: '/src/assets/images/tomato_early_blight_1793884801908.jpg',
    favorableConditions: {
      tempRange: '18°C - 27°C',
      humidityRange: '> 85%',
      rainfall: 'Overcast weather with extended dew periods',
    },
    similarDiseases: [
      {
        name: 'Common Rust (Puccinia sorghi)',
        keyDifference: 'Common rust produces small, powdery, cinnamon-brown pustules on both leaf surfaces; Turcicum blight produces long cigar-shaped tan lesions without pustules.',
      },
    ],
  },
];

export const PESTS_DATA: PestItem[] = [
  {
    id: 'fall-armyworm',
    name: 'Fall Armyworm',
    scientificName: 'Spodoptera frugiperda',
    cropsAffected: ['Maize / Corn', 'Sorghum', 'Rice', 'Sugarcane', 'Cotton'],
    infestationSeverity: 'Severe',
    damageSymptoms: [
      'Pinholes and ragged "window-pane" feeding holes in young whorl leaves',
      'Extensive chewing of central leaf whorl with heaps of moist, sawdust-like brownish frass',
      'Caterpillars bore directly into developing corn cobs and tassels, destroying grain filling',
    ],
    preventionMethods: [
      'Deep summer plowing to expose pupae to predatory birds and intense solar heat',
      'Intercropping maize with desmodium and planting Napier grass on borders (push-pull strategy)',
      'Install sex pheromone traps @ 5 traps per acre for early moth monitoring',
    ],
    organicControls: [
      'Apply neem seed kernel extract (NSKE 5%) or Azadirachtin 1500 ppm (5 ml/L) directly into whorls',
      'Whorl application of a mixture of dry wood ash and fine sand (1:9 ratio)',
      'Spray bio-pesticide Bacillus thuringiensis var. kurstaki (Bt) @ 2 g/L in late afternoon',
      'Release egg parasitoid Trichogramma chilonis @ 50,000 per acre at first moth catch',
    ],
    chemicalControl: [
      'Chlorantraniliprole 18.5% SC @ 0.4 ml/L water into whorls',
      'Emamectin benzoate 5% SG @ 0.4 g/L if larval threshold exceeds 10%',
    ],
    isBeneficial: false,
    image: '/src/assets/images/fall_armyworm_pest_1793884804393.jpg',
  },
  {
    id: 'aphids-cotton-aphid',
    name: 'Aphids (Green Peach & Cotton Aphid)',
    scientificName: 'Aphis gossypii / Myzus persicae',
    cropsAffected: ['Cotton', 'Tomato', 'Potato', 'Chili', 'Mustard', 'Citrus'],
    infestationSeverity: 'Moderate',
    damageSymptoms: [
      'Dense colonies of tiny soft-bodied pear-shaped insects crowding young shoot tips and leaf undersides',
      'Sucking of plant sap causing leaves to curl downward, cup, and become crinkled and stunted',
      'Excretion of sticky sugary honeydew leading to extensive black sooty mold coating leaves',
      'Major vector transmitting dangerous viruses (PVY, PLRV, CMV)',
    ],
    preventionMethods: [
      'Erect yellow sticky traps @ 15-20 traps per acre to capture winged dispersing adults',
      'Avoid excessive chemical nitrogen fertilizer that creates succulent sap-rich shoots',
      'Preserve natural ladybird beetle populations by avoiding broad-spectrum chemical sprays',
    ],
    organicControls: [
      'Forceful water spray on leaf undersides to dislodge small colonies',
      'Spray potassium salts of fatty acids (insecticidal soap @ 5 g/L) or cold-pressed neem oil (3-5 ml/L)',
      'Release predatory green lacewing larvae (Chrysoperla carnea) @ 2,000 per acre',
      'Apply entomopathogenic fungus Verticillium lecanii @ 5 g/L during humid mornings',
    ],
    chemicalControl: [
      'Flonicamid 50% WG @ 0.3 g/L or Pymetrozine 50% WG @ 0.6 g/L',
      'Imidacloprid 17.8% SL @ 0.3 ml/L',
    ],
    isBeneficial: false,
    image: '/src/assets/images/fall_armyworm_pest_1793884804393.jpg',
  },
  {
    id: 'whitefly',
    name: 'Whitefly',
    scientificName: 'Bemisia tabaci',
    cropsAffected: ['Tomato', 'Cotton', 'Chili', 'Okra', 'Brinjal', 'Beans'],
    infestationSeverity: 'Severe',
    damageSymptoms: [
      'Clouds of minute (1 mm) white moth-like insects fluttering when foliage is disturbed',
      'Both nymphs and adults suck sap, causing yellow chlorotic stippling and leaf shedding',
      'Copious honeydew production leading to heavy black sooty mold fungus',
      'Primary vector for devastating Tomato Yellow Leaf Curl Virus (TYLCV) and Cotton Leaf Curl Virus',
    ],
    preventionMethods: [
      'Use 40-50 mesh insect-proof netting in nurseries and transplant houses',
      'Install yellow sticky traps (20 per acre) above crop canopy level',
      'Use reflective silver plastic mulch on seedbeds to repel flying adults',
    ],
    organicControls: [
      'Spray neem oil 10,000 ppm @ 3 ml/L or 5% neem seed kernel extract (NSKE)',
      'Foliar spray of entomopathogenic fungus Beauveria bassiana @ 5 g/L',
      'Release nymph parasitoid Encarsia formosa or predatory mirid bugs',
    ],
    chemicalControl: [
      'Spiromesifen 22.9% SC @ 1 ml/L or Pyriproxyfen 10% EC @ 1.5 ml/L',
      'Diafenthiuron 50% WP @ 1.2 g/L',
    ],
    isBeneficial: false,
    image: '/src/assets/images/fall_armyworm_pest_1793884804393.jpg',
  },
];

export const BENEFICIAL_INSECTS_DATA: BeneficialInsectItem[] = [
  {
    id: 'ladybird-beetle',
    name: 'Seven-Spotted Ladybird Beetle',
    scientificName: 'Coccinella septempunctata',
    preysOn: ['Aphids', 'Whitefly nymphs', 'Mealybugs', 'Spider mites', 'Small jassids'],
    cropsProtected: ['Tomato', 'Potato', 'Cotton', 'Mustard', 'Citrus', 'Vegetables'],
    ecologicalBenefit: 'A single ladybird adult can consume 50-70 aphids per day; a single larva eats over 400 aphids before pupation, providing natural organic pest suppression.',
    howToAttract: [
      'Plant flowering companion border crops: fennel, coriander, dill, marigold, and mustard',
      'Avoid spraying synthetic pyrethroid and organophosphate broad-spectrum chemical insecticides',
      'Provide permanent mulch or straw ground cover for overwintering shelter',
    ],
    safeFarmingPractice: 'Delay chemical insecticide spraying if ladybird eggs (yellow clusters under leaves) or alligator-like dark larvae are actively feeding on pests.',
    image: '/src/assets/images/ladybug_beneficial_1793884803695.jpg',
  },
  {
    id: 'green-lacewing',
    name: 'Green Lacewing (Aphid Lion)',
    scientificName: 'Chrysoperla carnea',
    preysOn: ['Aphids', 'Thrips', 'Spider mites', 'Whitefly eggs & nymphs', 'Small caterpillar eggs'],
    cropsProtected: ['Cotton', 'Chili', 'Tomato', 'Grapes', 'Pome Fruit'],
    ecologicalBenefit: 'Lacewing larvae are aggressive voracious predators nicknamed "aphid lions", piercing soft-bodied pests with sickle-like jaws and injecting digestive enzymes.',
    howToAttract: [
      'Intercrop with flowering buckwheat, sunflower, and sweet alyssum for adult nectar feeding',
      'Spray artificial wheast/yeast-sugar food sprays to encourage egg-laying',
    ],
    safeFarmingPractice: 'Target biological microbial insecticides (Bt, Beauveria) rather than contact neurotoxin chemicals when lacewing eggs on stalks are spotted.',
    image: '/src/assets/images/ladybug_beneficial_1793884803695.jpg',
  },
  {
    id: 'parasitic-wasp',
    name: 'Egg Parasitoid Wasp (Trichogramma spp.)',
    scientificName: 'Trichogramma chilonis',
    preysOn: ['Fall armyworm eggs', 'Bollworm eggs', 'Stem borer eggs', 'Leaf roller eggs'],
    cropsProtected: ['Sugarcane', 'Rice', 'Maize', 'Cotton', 'Tomato'],
    ecologicalBenefit: 'Microscopic beneficial wasps lay their own eggs inside lepidopteran pest eggs, killing pest larvae before they ever hatch and chew crop tissue.',
    howToAttract: [
      'Tie "Tricho-cards" (containing parasitized Corcyra eggs) under leaf canopies at 5 cards per acre',
      'Plant cowpea or flowering mustard on field borders',
    ],
    safeFarmingPractice: 'Never spray systemic or contact insecticides within 7 days of Tricho-card field release.',
    image: '/src/assets/images/ladybug_beneficial_1793884803695.jpg',
  },
];

export const DEFICIENCIES_DATA: DeficiencyItem[] = [
  {
    id: 'nitrogen-deficiency',
    name: 'Nitrogen (N) Deficiency',
    nutrient: 'Nitrogen (N)',
    roleInPlant: 'Essential constituent of amino acids, proteins, and chlorophyll molecule required for vegetative biomass.',
    symptoms: [
      'Uniform pale light green to generalized yellowing (chlorosis)',
      'Symptoms appear FIRST on older/lower leaves because Nitrogen is highly mobile within the plant',
      'Yellowing starts at leaf tips and progresses inward along the midrib in a V-shaped pattern (e.g. in maize)',
      'Stunted thin stems and premature leaf drop',
    ],
    distinctionFromDisease: 'Unlike fungal or bacterial spots, Nitrogen deficiency shows smooth, symmetrical, uniform yellowing across whole leaflets without necrotic spot margins or water-soaking.',
    correctiveActions: [
      'Foliar spray of 1-2% urea solution (10-20 g/L water) for immediate green-up response within 48-72 hours',
      'Split application of ammonium sulfate or calcium nitrate at root zone',
    ],
    organicSources: ['Well-rotted farmyard manure (FYM)', 'Neem cake (5%)', 'Vermicompost (2-3 tonnes/acre)', 'Azotobacter/Azospirillum biofertilizers'],
    affectedLeafRegion: 'Older Leaves',
  },
  {
    id: 'potassium-deficiency',
    name: 'Potassium (K) Deficiency',
    nutrient: 'Potassium (K)',
    roleInPlant: 'Regulates stomatal opening, osmotic water potential, enzyme activation, and disease resistance.',
    symptoms: [
      'Marginal chlorosis turning into scorched, brown, necrotic leaf edges ("edge burn")',
      'Starts on older mature leaves while young tip leaves remain green',
      'Weak stems prone to lodging under wind or fruit weight',
      'Poor fruit filling, uneven ripening, and diminished shelf life',
    ],
    distinctionFromDisease: 'Often confused with Late Blight or Salt Burn. Potassium scorch is strictly confined to leaf outer margins without fungal spores or concentric target rings.',
    correctiveActions: [
      'Foliar spray of Potassium Nitrate (13-0-45) @ 10 g/L water during fruit sizing stage',
      'Soil application of Muriate of Potash (MOP) or Sulfate of Potash (SOP)',
    ],
    organicSources: ['Wood ash (applied conservatively)', 'Potash-solubilizing bacteria (Frateuria aurantia)', 'Banana peel extract / compost'],
    affectedLeafRegion: 'Leaf Margins',
  },
  {
    id: 'iron-deficiency',
    name: 'Iron (Fe) Deficiency (Interveinal Chlorosis)',
    nutrient: 'Iron (Fe)',
    roleInPlant: 'Catalyst for chlorophyll synthesis and electron transport in chloroplasts.',
    symptoms: [
      'Striking interveinal chlorosis where leaf veins remain dark green while tissue between veins turns creamy yellow to bleached white',
      'Symptoms appear FIRST on youngest topmost leaves because Iron is immobile in plant tissue',
      'Severe cases cause necrotic brown patches on scorched bleached leaves',
    ],
    distinctionFromDisease: 'Distinguished from viral mosaic by strict geometric adherence to leaf venation; veins form an intricate dark green skeleton against bright yellow background.',
    correctiveActions: [
      'Foliar spray of Chelated Iron (Fe-EDTA 12%) @ 1-1.5 g/L water in early morning',
      'Ferrous sulfate (FeSO4 19%) @ 5 g/L with 1 g citric acid/lime to enhance absorption',
    ],
    organicSources: ['Iron-fortified compost', 'Lowering high soil pH with sulfur or organic acids'],
    affectedLeafRegion: 'Younger Leaves',
  },
];
