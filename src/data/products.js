/**
 * FLORA PHARMACY - COMPREHENSIVE INDIAN PHARMACY PRODUCT CATALOG
 * 
 * Features iconic and daily household medicines, OTC essentials, health devices,
 * baby care, ayurvedic formulations, and surgical items stocked in Indian medical stores.
 * 
 * Instructions for Pharmacy Owner:
 * - Update, add, or remove products anytime below.
 * - WhatsApp direct ordering automatically encodes the product name.
 */

export const CATEGORIES = [
  "All",
  "OTC & Fever/Cold",
  "Prescription Medicines",
  "Vitamins & Supplements",
  "Pain Relief & Balms",
  "Digestion & Acidity",
  "Diabetic Care",
  "Baby Care",
  "Personal Care",
  "Ayurvedic & Herbal",
  "First Aid & Antiseptic",
  "Health Devices",
  "Elderly Care",
  "Surgical Items"
];

export const POPULAR_TAGS = [
  "Dolo 650",
  "Electral ORS",
  "Becosules Z",
  "Volini Spray",
  "Shelcal 500",
  "Digene Acidity",
  "BP Monitor",
  "Baby Diapers",
  "Accu-Chek",
  "Chyawanprash"
];

export const PRODUCTS = [
  // --- OTC & FEVER / COLD / COUGH ---
  {
    id: "otc-dolo",
    name: "Dolo 650 / Paracetamol Tablets (650mg)",
    category: "OTC & Fever/Cold",
    brandInfo: "Micro Labs • Most Trusted Fever Tablet",
    description: "India's go-to antipyretic & analgesic tablet for fast relief from high fever, severe headache, and body aches.",
    form: "15 Tablets / Strip",
    tag: "Fever & Pain",
    badge: "Bestseller",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "otc-crocin",
    name: "Crocin Advance Fast Release (500mg)",
    category: "OTC & Fever/Cold",
    brandInfo: "GSK • Optizorb Technology",
    description: "Rapidly absorbed paracetamol for everyday mild fever, toothache, earache, and headache relief.",
    form: "20 Tablets / Strip",
    tag: "Fast Relief",
    badge: "Must Have",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "otc-sinarest",
    name: "Sinarest New / Cheston Cold Tablets",
    category: "OTC & Fever/Cold",
    brandInfo: "Centaur • Triple Action Cold Relief",
    description: "Effective combination for runny nose, nasal blockage, sneezing, fever, and common cold congestion.",
    form: "10 Tablets / Strip",
    tag: "Cold & Sinus",
    badge: "Allergy & Cold",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "otc-vicks-rub",
    name: "Vicks VapoRub Multi-Symptom Relief Balm",
    category: "OTC & Fever/Cold",
    brandInfo: "P&G • Camphor, Menthol & Eucalyptus",
    description: "Household vaporizing ointment for blocked nose, cough, cold, muscular stiffness, and chest congestion.",
    form: "50g Jar",
    tag: "Household Staple",
    badge: "Classic",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1608248597359-bbad3f7bbfa1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "otc-vicks-inhaler",
    name: "Vicks Nasal Inhaler Pocket Stick",
    category: "OTC & Fever/Cold",
    brandInfo: "P&G • Quick Nasal Unblocker",
    description: "Instant relief for blocked nostrils on the go. Compact pocket-friendly camphor-menthol inhaler.",
    form: "0.5ml Inhaler Stick",
    tag: "Instant Breathe",
    badge: "Pocket Size",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "otc-strepsils",
    name: "Strepsils Honey & Lemon Lozenges",
    category: "OTC & Fever/Cold",
    brandInfo: "Reckitt • Antibacterial Throat Soother",
    description: "Soothing medicated lozenges for itchy throat, painful swallowing, hoarse voice, and throat irritation.",
    form: "Pack of 24 Lozenges",
    tag: "Sore Throat",
    badge: "Top Rated",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "otc-honitus",
    name: "Dabur Honitus Herbal Cough Syrup (Non-Drowsy)",
    category: "OTC & Fever/Cold",
    brandInfo: "Dabur • Honey, Tulsi, Mulethi & Banapsha",
    description: "100% ayurvedic herbal cough formulation safe for children and adults without daytime drowsiness.",
    form: "100ml Bottle",
    tag: "Herbal Syrup",
    badge: "Non-Drowsy",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "otc-benadryl",
    name: "Benadryl Cough Formula Syrup",
    category: "OTC & Fever/Cold",
    brandInfo: "Johnson & Johnson • Soothing Relief",
    description: "Trusted demulcent and expectorant syrup for deep soothing relief from acute dry irritating cough.",
    form: "100ml Bottle",
    tag: "Night Relief",
    badge: "Doctor Trusted",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "otc-electral",
    name: "Electral WHO-ORS Powder Sachet (21.8g)",
    category: "OTC & Fever/Cold",
    brandInfo: "FDC • WHO Recommended Oral Rehydration",
    description: "Restores essential electrolytes, sodium, and potassium lost during vomiting, diarrhea, sun stroke, or weakness.",
    form: "21.8g Sachet (Makes 1L)",
    tag: "Oral Rehydration",
    badge: "Essential",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80"
  },

  // --- DIGESTION & ACIDITY ---
  {
    id: "dig-digene",
    name: "Digene Acidity & Gas Relief Chewable Tablets (Mint)",
    category: "Digestion & Acidity",
    brandInfo: "Abbott • Fast Antacid Action",
    description: "Quick neutralizing action for painful heartburn, hyperacidity, stomach gas, and gastric distress.",
    form: "15 Chewable Tablets",
    tag: "Heartburn & Gas",
    badge: "Popular",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "dig-eno",
    name: "Eno Fruit Salt Fast Relief (Lemon 5g Sachet)",
    category: "Digestion & Acidity",
    brandInfo: "GSK • Works in 6 Seconds",
    description: "Sparkling effervescent antacid that instantly neutralizes stomach acid upon drinking.",
    form: "Pack of 6 Sachets (5g each)",
    tag: "Instant 6s Relief",
    badge: "Quick Acting",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "dig-pudinhara",
    name: "Dabur Pudin Hara Active Pearls (Mint Drops)",
    category: "Digestion & Acidity",
    brandInfo: "Dabur • Pudina Satva Natural Cooling",
    description: "Natural herbal cooling pearl capsules for instant stomach bloating, indigestion, and gas comfort.",
    form: "Pack of 10 Pearls",
    tag: "Natural Cooling",
    badge: "Herbal",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "dig-gelusil",
    name: "Gelusil MPS Liquid Antacid Syrup (Mint)",
    category: "Digestion & Acidity",
    brandInfo: "Pfizer • Aluminium & Magnesium Hydroxide",
    description: "Dual action antacid plus antiflatulent formula for coating sensitive stomach lining and releasing trapped gas.",
    form: "200ml Bottle",
    tag: "Liquid Antacid",
    badge: "Soothing",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=600&q=80"
  },

  // --- PAIN RELIEF & BALMS ---
  {
    id: "pain-volini",
    name: "Volini Rapid Pain Relief Spray (100g)",
    category: "Pain Relief & Balms",
    brandInfo: "Sun Pharma • Micro-Particles Deep Action",
    description: "360-degree spray technology for quick recovery from neck pain, shoulder sprain, lower backache, and sports injuries.",
    form: "100g Spray Can",
    tag: "Sprain & Joint",
    badge: "#1 Doctor Spray",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "pain-moov",
    name: "Moov Fast Pain Relief Ointment (50g)",
    category: "Pain Relief & Balms",
    brandInfo: "Reckitt • Nilgiri & Wintergreen Oil",
    description: "Specialized warming formulation providing deep penetration to relax stiff back muscles and joints.",
    form: "50g Tube",
    tag: "Back Pain Expert",
    badge: "Household Must",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1608248597359-bbad3f7bbfa1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "pain-amrutanjan",
    name: "Amrutanjan Strong Pain Balm (Yellow / Red)",
    category: "Pain Relief & Balms",
    brandInfo: "Amrutanjan • Pudina & Gandhapura Taila",
    description: "Time-tested Indian strong herbal balm for severe throbbing headache, cold, and neck tightness.",
    form: "50g Glass Bottle",
    tag: "Headache Relief",
    badge: "Strong Action",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1608248597359-bbad3f7bbfa1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "pain-zandu",
    name: "Zandu Balm Ultra Power for Severe Headache",
    category: "Pain Relief & Balms",
    brandInfo: "Emami • Mentha & Gaultheria Oil",
    description: "Fast-acting topical analgesic balm to ease tension headaches and physical body fatigue.",
    form: "25ml Bottle",
    tag: "Headache Balm",
    badge: "Fast Acting",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1608248597359-bbad3f7bbfa1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "pain-iodex",
    name: "Iodex Multi-Purpose Body Pain Balm (40g)",
    category: "Pain Relief & Balms",
    brandInfo: "GSK • 5 Natural Ayurvedic Oils",
    description: "Targeted soothing relief for swelling, muscular aches, sprained ankles, and joint stiffness.",
    form: "40g Glass Jar",
    tag: "Swelling & Aches",
    badge: "Classic",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1608248597359-bbad3f7bbfa1?auto=format&fit=crop&w=600&q=80"
  },

  // --- PRESCRIPTION MEDICINES (Famous Indian Formulations - Rx Required) ---
  {
    id: "rx-combiflam",
    name: "Combiflam (Ibuprofen 400mg + Paracetamol 325mg)",
    category: "Prescription Medicines",
    brandInfo: "Sanofi • Dual Action Pain & Inflammation",
    description: "Physician-prescribed dual analgesic for toothache, joint pain, muscular aches, and fever.",
    form: "20 Tablets / Strip",
    tag: "Pain & Inflammation",
    badge: "Rx Required",
    requiresPrescription: true,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "rx-pand",
    name: "Pan-D (Pantoprazole 40mg + Domperidone 30mg SR)",
    category: "Prescription Medicines",
    brandInfo: "Alkem • GERD & Gastric Reflux Control",
    description: "Standard prescription medicine for severe gastroesophageal reflux (GERD) and morning nausea.",
    form: "15 Capsules / Strip",
    tag: "GERD & Acidity",
    badge: "Rx Required",
    requiresPrescription: true,
    image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "rx-augmentin",
    name: "Augmentin / Amoxyclav (625mg)",
    category: "Prescription Medicines",
    brandInfo: "GSK • Amoxicillin & Potassium Clavulanate",
    description: "Broad-spectrum antibacterial prescribed by doctors for chest, ear, throat, and skin bacterial infections.",
    form: "10 Tablets / Strip",
    tag: "Antibacterial",
    badge: "Rx Required",
    requiresPrescription: true,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "rx-montek-lc",
    name: "Montek-LC / Montair-LC Tablets",
    category: "Prescription Medicines",
    brandInfo: "Sun Pharma • Montelukast + Levocetirizine",
    description: "Antiallergic formulation prescribed for persistent seasonal allergic rhinitis, sneezing, and respiratory allergy.",
    form: "10 Tablets / Strip",
    tag: "Allergy & Asthma",
    badge: "Rx Required",
    requiresPrescription: true,
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "rx-telma-40",
    name: "Telma 40 / Telmisartan Tablets (40mg)",
    category: "Prescription Medicines",
    brandInfo: "Glenmark • Cardiovascular Care",
    description: "Physician-prescribed cardiovascular formulation for long-term arterial hypertension control.",
    form: "15 Tablets / Strip",
    tag: "BP Management",
    badge: "Rx Required",
    requiresPrescription: true,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "rx-glycomet",
    name: "Glycomet-GP 1 (Metformin 500mg SR + Glimepiride 1mg)",
    category: "Prescription Medicines",
    brandInfo: "USV • Diabetes Glycemic Control",
    description: "Prescribed oral anti-diabetic medication for maintaining stable blood sugar levels under medical advice.",
    form: "15 Tablets / Strip",
    tag: "Diabetes Control",
    badge: "Rx Required",
    requiresPrescription: true,
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "rx-thyronorm",
    name: "Thyronorm / Eltroxin (50mcg / 100mcg)",
    category: "Prescription Medicines",
    brandInfo: "Abbott • Levothyroxine Sodium",
    description: "Daily morning thyroid hormone replacement therapy prescribed for hypothyroidism.",
    form: "120 Tablets / Bottle",
    tag: "Thyroid Care",
    badge: "Rx Required",
    requiresPrescription: true,
    image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "rx-atorva",
    name: "Atorva 10 / Atorvastatin Calcium (10mg)",
    category: "Prescription Medicines",
    brandInfo: "Zydus • Lipid & Cholesterol Regulator",
    description: "Cardiologist-prescribed statin tablet for managing serum cholesterol and protecting cardiovascular health.",
    form: "15 Tablets / Strip",
    tag: "Cholesterol",
    badge: "Rx Required",
    requiresPrescription: true,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80"
  },

  // --- VITAMINS & DAILY SUPPLEMENTS ---
  {
    id: "vit-becosules",
    name: "Becosules Z Capsules (B-Complex + Vitamin C + Zinc)",
    category: "Vitamins & Supplements",
    brandInfo: "Pfizer • India's #1 B-Complex",
    description: "Essential multivitamin for mouth ulcers, stamina replenishment, immune boost, and recovery from sickness.",
    form: "20 Capsules / Strip",
    tag: "Mouth Ulcers & Energy",
    badge: "Top Seller",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "vit-shelcal",
    name: "Shelcal 500 (Calcium 500mg + Vitamin D3 250 IU)",
    category: "Vitamins & Supplements",
    brandInfo: "Torrent • Pure Natural Calcium",
    description: "High-absorption calcium supplement for strong bones, joints, tooth health, and post-menopausal bone strength.",
    form: "15 Tablets / Strip",
    tag: "Bone Health",
    badge: "Doctor Recommended",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "vit-neurobion",
    name: "Neurobion Forte (Vitamin B-Complex with B12)",
    category: "Vitamins & Supplements",
    brandInfo: "Procter & Gamble • Nerve Care Formula",
    description: "Strengthens peripheral nerves, relieves tingling numbness in fingers & feet, and combats body fatigue.",
    form: "30 Tablets / Strip",
    tag: "Nerve Health",
    badge: "Popular",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "vit-limcee",
    name: "Limcee Chewable Vitamin C (500mg Orange)",
    category: "Vitamins & Supplements",
    brandInfo: "Abbott • Delicious Orange Chewables",
    description: "Antioxidant Vitamin C tablets to strengthen everyday immune defenses, collagen health, and wound healing.",
    form: "15 Chewable Tablets",
    tag: "Immunity Booster",
    badge: "Tasty Orange",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "vit-supradyn",
    name: "Supradyn Daily Multivitamin with Zinc & Minerals",
    category: "Vitamins & Supplements",
    brandInfo: "Bayer • All-Round Energy & Immunity",
    description: "Formulated with 12 vitamins, 5 trace minerals, and amino acids to maintain all-day energy and stamina.",
    form: "15 Tablets / Strip",
    tag: "Daily Multivitamin",
    badge: "All-Day Energy",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "vit-revital",
    name: "Revital H Daily Health Supplement with Ginseng",
    category: "Vitamins & Supplements",
    brandInfo: "Sun Pharma • Energy, Stamina & Focus",
    description: "Combines active ginseng root extract with 10 vitamins and 9 minerals to fight lethargy and stress.",
    form: "30 Capsules / Bottle",
    tag: "Ginseng Stamina",
    badge: "Power Pack",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "vit-evion",
    name: "Evion 400 (Vitamin E Capsules USP 400mg)",
    category: "Vitamins & Supplements",
    brandInfo: "P&G • Skin, Hair & Muscle Care",
    description: "High potency Vitamin E for nourishing healthy skin, reducing muscle cramps, and strengthening hair roots.",
    form: "10 Softgels / Strip",
    tag: "Skin & Hair",
    badge: "Top Choice",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "vit-d3",
    name: "Calcirol / Uprise D3 (60,000 IU Oral Granules & Softgel)",
    category: "Vitamins & Supplements",
    brandInfo: "Cadila • Weekly High-Dose Vitamin D3",
    description: "Weekly clinical dose of Cholecalciferol to rapidly correct Vitamin D deficiency and joint fatigue.",
    form: "4 Softgels / Strip",
    tag: "Weekly D3",
    badge: "High Potency",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=600&q=80"
  },

  // --- DIABETIC CARE ---
  {
    id: "diab-accuchek-strips",
    name: "Accu-Chek Active Blood Glucose Strips (50s)",
    category: "Diabetic Care",
    brandInfo: "Roche Diabetes • ISO Precision",
    description: "India's highest selling gold electrode capillary blood test strips for precise home sugar tracking.",
    form: "Box of 50 Strips",
    tag: "Sugar Testing",
    badge: "Highest Precision",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "diab-onetouch-strips",
    name: "OneTouch Select Plus Test Strips (Pack of 50)",
    category: "Diabetic Care",
    brandInfo: "LifeScan • Fast 5-Second Testing",
    description: "Compatible with OneTouch Select Plus meters. Provides ColorSure 3-color range indicator readings.",
    form: "Box of 50 Strips",
    tag: "Fast Read",
    badge: "Easy Read",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "diab-bd-syringes",
    name: "BD Ultra-Fine Insulin Syringes (31G / 1ml)",
    category: "Diabetic Care",
    brandInfo: "Becton Dickinson • Micro-Bonded Needle",
    description: "Micro-polished short insulin syringes designed for virtually painless single-dose insulin delivery.",
    form: "Pack of 10 Syringes",
    tag: "Painless Needle",
    badge: "Sterile",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "diab-sugarfree-gold",
    name: "Sugar Free Gold Sweetener Pellets (Dispenser 500)",
    category: "Diabetic Care",
    brandInfo: "Zydus Wellness • Zero Calorie Sweetener",
    description: "Ideal for sweetening tea, coffee, and beverages without adding extra calories or spiking blood sugar.",
    form: "500 Pellets Dispenser",
    tag: "Sugar Free",
    badge: "Zero Calorie",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "diab-protinex",
    name: "Protinex Diabetes Care Protein Drink (Vanilla 400g)",
    category: "Diabetic Care",
    brandInfo: "Danone • Low GI & Zero Added Sugar",
    description: "High protein, high fiber clinical nutritional shake enriched with 26 vitamins and chromium for diabetes.",
    form: "400g Tin",
    tag: "Clinical Nutrition",
    badge: "Low GI",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "diab-footcream",
    name: "Moisturex Soft 10% Urea Foot Cream for Diabetics",
    category: "Diabetic Care",
    brandInfo: "Sun Pharma • Intensive Heel & Skin Hydration",
    description: "Formulated to soften hard calluses, heal deep cracked heels, and protect sensitive diabetic skin.",
    form: "100g Tube",
    tag: "Foot Protection",
    badge: "Derm Approved",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1608248597359-bbad3f7bbfa1?auto=format&fit=crop&w=600&q=80"
  },

  // --- BABY CARE ---
  {
    id: "baby-pampers",
    name: "Pampers All Round Protection Baby Diaper Pants (M / L)",
    category: "Baby Care",
    brandInfo: "P&G • Magic Gel & Anti-Rash Lotion",
    description: "Soft breathable diaper pants with up to 12 hours of absorption to keep babies dry and rash-free through the night.",
    form: "Pack of 34 Pants",
    tag: "All-Night Dry",
    badge: "#1 Diaper",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "baby-sebamed",
    name: "Sebamed Baby Gentle Cleansing Bar (pH 5.5)",
    category: "Baby Care",
    brandInfo: "Sebamed Germany • Soap & Alkali Free",
    description: "Specially formulated for ultra-sensitive newborn skin to maintain natural moisture without stripping barrier lipids.",
    form: "100g Bar",
    tag: "Newborn Sensitive",
    badge: "Pediatric Choice",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "baby-gripewater",
    name: "Woodward's Celebrated Gripe Water (130ml)",
    category: "Baby Care",
    brandInfo: "Woodward's • Dill Oil & Sarjikakshara",
    description: "Trusted across generations for fast colic relief, infant teething tummy discomfort, and trapped gas.",
    form: "130ml Bottle",
    tag: "Colic & Gas",
    badge: "Generations Choice",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "baby-himalaya-oil",
    name: "Himalaya Baby Massage Oil with Olive & Ashvagandha",
    category: "Baby Care",
    brandInfo: "Himalaya Baby Care • Pure Herbal Nourishment",
    description: "Enriched with winter cherry and pure olive oil to promote infant bone strength, skin tone, and restful sleep.",
    form: "200ml Bottle",
    tag: "Bone Strength",
    badge: "Pure & Gentle",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1608248597359-bbad3f7bbfa1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "baby-nasoclear",
    name: "Nasoclear Pediatric Saline Nasal Drops (0.65% w/v)",
    category: "Baby Care",
    brandInfo: "Zydus • Gentle Isotonic Solution",
    description: "Pediatric nasal drop to safely loosen dry crusty mucus in newborn infants and clear congested airways.",
    form: "20ml Dropper Bottle",
    tag: "Easy Breathing",
    badge: "Gentle Drops",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "baby-siloderm",
    name: "Siloderm / Sudocrem Diaper Rash Ointment",
    category: "Baby Care",
    brandInfo: "Zinc Oxide & Dimethicone Barrier",
    description: "Water-repellent protective cream that soothes redness, chafing, and prevents diaper dermatitis.",
    form: "50g Tube",
    tag: "Rash Healer",
    badge: "Quick Healing",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80"
  },

  // --- PERSONAL CARE & HYGIENE ---
  {
    id: "pc-dettol-liquid",
    name: "Dettol Antiseptic Disinfectant Liquid (550ml)",
    category: "Personal Care",
    brandInfo: "Reckitt • Chloroxylenol Formula",
    description: "India's #1 germ defense liquid for first aid wound cleaning, bathing, shaving, and laundry sanitization.",
    form: "550ml Bottle",
    tag: "Germ Protection",
    badge: "#1 Brand",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "pc-savlon",
    name: "Savlon Antiseptic Liquid (No Burn Formula)",
    category: "Personal Care",
    brandInfo: "ITC • Chlorhexidine & Cetrimide",
    description: "Does not sting on cuts or wounds. Trusted antiseptic for children's scraped knees, burns, and general hygiene.",
    form: "200ml Bottle",
    tag: "No Sting",
    badge: "Gentle On Cuts",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "pc-whisper",
    name: "Whisper Choice Ultra Wings Sanitary Pads (XL - 20s)",
    category: "Personal Care",
    brandInfo: "P&G • Magic Gel Core",
    description: "Extra-long sanitary pads with wide back wings and dual leak-lock barriers for active daytime comfort.",
    form: "Pack of 20 Pads (XL)",
    tag: "Feminine Hygiene",
    badge: "Ultra Absorb",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "pc-sensodyne",
    name: "Sensodyne Rapid Relief Toothpaste (80g)",
    category: "Personal Care",
    brandInfo: "Haleon • Potassium Nitrate Formulation",
    description: "Clinically proven to beat tooth sensitivity from ice cream, hot tea, or cold water in as little as 60 seconds.",
    form: "80g Tube",
    tag: "Sensitivity Relief",
    badge: "Dentist Recommended",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "pc-listerine",
    name: "Listerine Cool Mint Antiseptic Mouthwash (250ml)",
    category: "Personal Care",
    brandInfo: "Johnson & Johnson • Kills 99.9% Oral Germs",
    description: "Deep oral cleansing wash providing 24-hour plaque protection and long-lasting fresh mint breath.",
    form: "250ml Bottle",
    tag: "Oral Care",
    badge: "Fresh Breath",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "pc-dettol-hw",
    name: "Dettol Original Germ Protection Handwash (200ml)",
    category: "Personal Care",
    brandInfo: "Reckitt • Pine Fragrance Pump",
    description: "Guards against 100 illness-causing germs with moisturizing glycerine formula for frequent handwashing.",
    form: "200ml Pump Bottle",
    tag: "Hand Hygiene",
    badge: "100 Germs Protection",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80"
  },

  // --- AYURVEDIC & HERBAL ---
  {
    id: "ayur-chyawanprash",
    name: "Dabur Chyawanprash with 40+ Ayurvedic Herbs (1kg)",
    category: "Ayurvedic & Herbal",
    brandInfo: "Dabur • Amla & Rejuvenating Herbs",
    description: "Traditional Indian immunity booster containing 2X immunity power for whole family vitality across seasonal changes.",
    form: "1kg Jar",
    tag: "Family Immunity",
    badge: "Winter & Summer",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ayur-liv52",
    name: "Himalaya Liv.52 DS Herbal Liver Care Tablets (60s)",
    category: "Ayurvedic & Herbal",
    brandInfo: "Himalaya • Caper Bush & Wild Chicory",
    description: "Double strength herbal hepatoprotective tablet supporting normal liver enzymes, appetite, and digestion.",
    form: "60 Tablets / Bottle",
    tag: "Liver Support",
    badge: "Double Strength",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ayur-honey",
    name: "Dabur 100% Pure & NMR Tested Honey (500g)",
    category: "Ayurvedic & Herbal",
    brandInfo: "Dabur • Zero Sugar Adulteration",
    description: "Rich in natural antioxidants. Perfect with warm water and lemon in the morning or as a natural cough soother.",
    form: "500g Squeezy Bottle",
    tag: "Pure Honey",
    badge: "100% Pure",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ayur-triphala",
    name: "Baidyanath Triphala Churna Digestive Powder (100g)",
    category: "Ayurvedic & Herbal",
    brandInfo: "Baidyanath • Amla, Haritaki & Bibhitaki",
    description: "Classical Ayurvedic powder for natural colon cleansing, relieving chronic constipation, and eye health.",
    form: "100g Pack",
    tag: "Gut Cleanser",
    badge: "Natural Regularity",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ayur-cystone",
    name: "Himalaya Cystone Tablets for Urinary Wellness",
    category: "Ayurvedic & Herbal",
    brandInfo: "Himalaya • Didymocarpus & Saxifraga",
    description: "Herbal formulation to prevent crystalloid formation, flush kidney gravel, and maintain healthy urinary tract function.",
    form: "60 Tablets / Bottle",
    tag: "Urinary Health",
    badge: "Herbal Care",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ayur-shilajit",
    name: "Dabur Shilajit Gold Capsules with Kesar & Swarna",
    category: "Ayurvedic & Herbal",
    brandInfo: "Dabur • Himalayan Purified Shilajit",
    description: "Authentic revitalizer formulated with purified asphaltum, gold bhasma, and ashwagandha for physical stamina.",
    form: "20 Gold Capsules",
    tag: "Stamina & Strength",
    badge: "Gold Formula",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1608248597359-bbad3f7bbfa1?auto=format&fit=crop&w=600&q=80"
  },

  // --- FIRST AID & ANTISEPTIC ---
  {
    id: "fa-betadine",
    name: "Betadine 5% Antiseptic Ointment (Povidone Iodine 20g)",
    category: "First Aid & Antiseptic",
    brandInfo: "Win-Medicare • Broad Spectrum Microbicide",
    description: "Gold standard antiseptic ointment for preventing wound infection in cuts, lacerations, scrapes, and minor surgery wounds.",
    form: "20g Tube",
    tag: "Wound Healer",
    badge: "#1 Doctor Choice",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "fa-soframycin",
    name: "Soframycin Skin Antibiotic Cream (Framycetin 30g)",
    category: "First Aid & Antiseptic",
    brandInfo: "Sanofi • Topical Antibacterial",
    description: "Household essential antibiotic ointment for infected wounds, cuts, folliculitis, and abrasions.",
    form: "30g Tube",
    tag: "Skin Antibiotic",
    badge: "Fast Healing",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "fa-burnol",
    name: "Burnol First Aid Cream for Minor Burns & Scalds (20g)",
    category: "First Aid & Antiseptic",
    brandInfo: "Morepen • Aminacrine & Cetrimide",
    description: "Immediate cooling and antiseptic relief for kitchen steam burns, hot oil splashes, cuts, and blisters.",
    form: "20g Tube",
    tag: "Burn Relief",
    badge: "Kitchen Essential",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "fa-hansaplast",
    name: "Hansaplast Washproof Medicated Band-Aids (30s)",
    category: "First Aid & Antiseptic",
    brandInfo: "Beiersdorf • Antiseptic Pad",
    description: "Water-resistant adhesive strips with medicated wound pad that keeps dirt and bacteria away while bathing.",
    form: "Pack of 30 Strips",
    tag: "Wound Dressing",
    badge: "Waterproof",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "fa-crepe",
    name: "Cotton Crepe Bandage with Fastener Clips (10cm x 4m)",
    category: "First Aid & Antiseptic",
    brandInfo: "Medical Grade 100% Cotton",
    description: "Elastic washable compression bandage providing firm support for sprained ankles, wrists, and ligament strain.",
    form: "1 Roll (10cm x 4m)",
    tag: "Sprain Support",
    badge: "Firm Compression",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "fa-firstaid-box",
    name: "Complete Home Emergency First Aid Kit",
    category: "First Aid & Antiseptic",
    brandInfo: "Flora Pharmacy Curated First Aid Box",
    description: "Organized box containing Betadine, Hansaplast, cotton roll, micropore tape, burnol, scissor, and Dettol.",
    form: "Full Medical Box",
    tag: "Home Emergency",
    badge: "Complete Kit",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=600&q=80"
  },

  // --- HEALTH DEVICES & MONITORS ---
  {
    id: "hd-omron-bp",
    name: "Omron HEM-7120 Automatic Digital Blood Pressure Monitor",
    category: "Health Devices",
    brandInfo: "Omron Healthcare Japan • IntelliSense Technology",
    description: "India's highest recommended one-touch digital upper arm BP monitor with body movement and hypertension indicator.",
    form: "Machine + Cuff + 4x AA Batteries",
    tag: "Blood Pressure",
    badge: "3-Yr Warranty",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "hd-oximeter",
    name: "Dr. Trust Professional Fingertip Pulse Oximeter",
    category: "Health Devices",
    brandInfo: "Dr. Trust USA • SpO2 & Pulse Perfusion Index",
    description: "Quick 6-second arterial oxygen and heart pulse check with dual-color OLED multi-directional display.",
    form: "Device + Lanyard + 2x AAA",
    tag: "SpO2 Oxygen Check",
    badge: "Fast 6s Read",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "hd-accuchek-meter",
    name: "Accu-Chek Instant Blood Glucose Monitoring System",
    category: "Health Devices",
    brandInfo: "Roche Diabetes • Target Range Indicator",
    description: "Effortless sugar testing with no setup required. Includes meter, 10 strips, and Softclix lancing pen.",
    form: "Kit (Meter + 10 Strips + Pen)",
    tag: "Sugar Monitor",
    badge: "Free 10 Strips",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "hd-thermometer",
    name: "Dr. Morepen Digi-Classic Digital Rigid Thermometer",
    category: "Health Devices",
    brandInfo: "Dr. Morepen • Mercury-Free Digital",
    description: "Safe, unbreakable oral/armpit digital thermometer with fever beeper and auto shut-off.",
    form: "1 Unit with Protective Case",
    tag: "Fever Check",
    badge: "100% Safe",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "hd-nebulizer",
    name: "Omron NE-C106 Compressor Nebulizer with Child & Adult Mask",
    category: "Health Devices",
    brandInfo: "Omron • Dense Aerosol Medication",
    description: "Efficient medication aerosolization for asthma, wheezing, and bronchitis. Suitable for children and elders.",
    form: "Compressor Unit + 2 Masks + Tubing",
    tag: "Asthma & Cough",
    badge: "Low Noise",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "hd-steamer",
    name: "Agaro / Dr. Trust 3-in-1 Facial Steamer & Vaporizer",
    category: "Health Devices",
    brandInfo: "Steam Inhaler for Cold & Sinus Relief",
    description: "Produces pure warm steam within seconds to relieve stuffy nose, sinus congestion, and soothe vocal cords.",
    form: "1 Steamer Unit (Electric)",
    tag: "Steam Inhalation",
    badge: "Sinus Relief",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "hd-heating-pad",
    name: "Flamingo Orthopedic Electric Heating Belt / Hot Pad",
    category: "Health Devices",
    brandInfo: "Flamingo Healthcare • 3 Temperature Controls",
    description: "Therapeutic warmth for lower back spasm, cervical pain, menstrual cramps, and arthritic joints.",
    form: "1 Belt with Washable Cover",
    tag: "Hot Fermentation",
    badge: "Safety Cutoff",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1608248597359-bbad3f7bbfa1?auto=format&fit=crop&w=600&q=80"
  },

  // --- ELDERLY CARE & MOBILITY ---
  {
    id: "eld-friends",
    name: "Friends Classic Adult Diaper Pants (Large / XL - 10s)",
    category: "Elderly Care",
    brandInfo: "Friends Incontinence • High Absorption Gel",
    description: "Underwear-style pull-up diapers with odor control and up to 8 hours of wetness protection for seniors.",
    form: "Pack of 10 Pull-Up Pants",
    tag: "Adult Incontinence",
    badge: "#1 Adult Diaper",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "eld-tynor-knee",
    name: "Tynor Orthopedic Knee Cap Support (Pair)",
    category: "Elderly Care",
    brandInfo: "Tynor Orthotics • 4-Way Stretch Elastic",
    description: "Provides controlled compression and warmth to arthritic knees, easing pain during walking and stairs climbing.",
    form: "Pair of 2 Sleeves",
    tag: "Knee Arthritis",
    badge: "Orthopedic",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "eld-tynor-back",
    name: "Tynor Lumbar Sacro Back Support Belt (Lumbopore)",
    category: "Elderly Care",
    brandInfo: "Tynor Orthotics • Anatomical Splints",
    description: "Rigid back support splints that immobilize the lumbosacral spine, relieving disc pain and postural strain.",
    form: "1 Adjustable Belt",
    tag: "Back Pain Support",
    badge: "Doctor Prescribed",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "eld-stick",
    name: "Adjustable Aluminum Walking Stick with Quad Base",
    category: "Elderly Care",
    brandInfo: "Lightweight Anodized Aluminum",
    description: "Ergonomic 4-legged rubber tip base providing superior stability and slip prevention on wet Indian tiles.",
    form: "1 Unit (Height Adjustable)",
    tag: "Mobility Aid",
    badge: "Non-Slip Base",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "eld-underpads",
    name: "Disposable Hospital Bed Underpads (60cm x 90cm - 10s)",
    category: "Elderly Care",
    brandInfo: "Waterproof Hygiene Bed Sheets",
    description: "Extra large absorbent bed protectors for senior bed care, post-surgical recovery, and keeping mattresses dry.",
    form: "Pack of 10 Sheets",
    tag: "Bed Protection",
    badge: "Super Absorbent",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "eld-pill-box",
    name: "Senior 7-Day AM/PM Weekly Pill Organizer Dispenser",
    category: "Elderly Care",
    brandInfo: "Braille Assisted Morning & Night Boxes",
    description: "Large 14-compartment medicine organizer to ensure seniors take their morning and evening doses without confusion.",
    form: "1 Caddy (14 Compartments)",
    tag: "Pill Management",
    badge: "No Confusion",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
  },

  // --- SURGICAL ITEMS & CLINICAL SUPPLIES ---
  {
    id: "surg-masks",
    name: "Surgical 3-Ply Protective Face Masks (ISI Certified 50s)",
    category: "Surgical Items",
    brandInfo: "Meltblown Layer • >98% Bacterial Filtration",
    description: "Breathable ultrasonic-sealed masks with soft elastic ear loops and adjustable nose clip.",
    form: "Box of 50 Masks",
    tag: "Face Protection",
    badge: "ISI Certified",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1586942593568-29361efcd571?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "surg-gloves",
    name: "Nitrile Medical Examination Gloves (Powder-Free 100s)",
    category: "Surgical Items",
    brandInfo: "Hospital Grade • Puncture Resistant",
    description: "Soft tactile feel nitrile gloves for home nursing care, dressing change, and elderly hygiene.",
    form: "Box of 100 Gloves",
    tag: "Exam Gloves",
    badge: "Powder Free",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "surg-tape",
    name: "3M Micropore Surgical Paper Tape (1 inch x 9m - 2s)",
    category: "Surgical Items",
    brandInfo: "3M Healthcare • Hypoallergenic",
    description: "Breathable medical tape that securely holds gauze dressings without tearing fragile skin.",
    form: "Pack of 2 Rolls",
    tag: "Surgical Tape",
    badge: "Skin Friendly",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "surg-cotton",
    name: "Absorbent Cotton Wool I.P. (Roll 500g)",
    category: "Surgical Items",
    brandInfo: "100% Pure Surgical Bleached Cotton",
    description: "High-grade pure cotton for clinical cleansing, wound padding, and maternity care.",
    form: "500g Roll",
    tag: "Pure Cotton I.P.",
    badge: "Hospital Grade",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "surg-spirit",
    name: "Medical Rubbing Spirit / Isopropyl Alcohol (IPA 70% 500ml)",
    category: "Surgical Items",
    brandInfo: "Topical Antiseptic Skin Disinfectant",
    description: "70% v/v isopropanol solution for disinfecting injection sites, clinical instruments, and skin preps.",
    form: "500ml Bottle",
    tag: "Disinfectant Spirit",
    badge: "70% IPA",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "surg-swabs",
    name: "Sterile Absorbent Gauze Swabs (10cm x 10cm, 12 Ply - 20s)",
    category: "Surgical Items",
    brandInfo: "Gamma Sterilized Wound Dressings",
    description: "Individually wrapped sterile surgical gauze pads for cleaning open wounds and post-op care.",
    form: "Box of 20 Pouches",
    tag: "Sterile Swabs",
    badge: "Sterile",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80"
  }
];
