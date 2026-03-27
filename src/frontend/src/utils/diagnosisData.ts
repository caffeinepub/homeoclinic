export interface DiagnosisEntry {
  name: string;
  aliases: string[];
  category: string;
  harrisons: {
    definition: string;
    classicSymptoms: string[];
    keySigns: string[];
    keyFeatures: string;
    reference: string;
  };
  keywords: string[];
}

export const DIAGNOSIS_DATABASE: DiagnosisEntry[] = [
  // ── RESPIRATORY ──
  {
    name: "Pneumonia",
    aliases: ["lung infection", "chest infection", "lobar pneumonia"],
    category: "Respiratory",
    harrisons: {
      definition:
        "Acute infection of the pulmonary parenchyma characterised by consolidation and inflammatory exudate filling alveoli.",
      classicSymptoms: [
        "Fever with rigors",
        "Productive cough with rust-coloured or purulent sputum",
        "Pleuritic chest pain",
        "Dyspnoea",
        "Malaise and myalgia",
      ],
      keySigns: [
        "Dullness on percussion",
        "Bronchial breath sounds",
        "Increased vocal fremitus",
        "Crackles / crepitations",
        "Tachycardia, tachypnoea",
      ],
      keyFeatures:
        "Typically caused by Streptococcus pneumoniae (lobar pattern) or atypical organisms. Rust-coloured sputum is pathognomonic for pneumococcal pneumonia. CXR shows lobar or segmental consolidation. Severity assessed by CURB-65 score.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 121",
    },
    keywords: [
      "pneumonia",
      "lung",
      "chest",
      "consolidation",
      "rust colored sputum",
      "lobar",
      "pleural",
      "cough",
      "fever",
      "dyspnea",
      "rigor",
      "crepitation",
      "bronchial breathing",
    ],
  },
  {
    name: "Bronchitis",
    aliases: ["acute bronchitis", "chest cold", "bronchial catarrh"],
    category: "Respiratory",
    harrisons: {
      definition:
        "Inflammation of the bronchial mucosa, presenting acutely with cough and sputum production, or chronically as defined by productive cough for ≥3 months in ≥2 consecutive years.",
      classicSymptoms: [
        "Persistent cough (dry initially, then productive)",
        "Scanty to copious sputum",
        "Substernal rawness or burning",
        "Low-grade fever",
        "Wheeze",
      ],
      keySigns: [
        "Rhonchi and wheeze on auscultation",
        "Mild tachypnoea",
        "Normal or slightly dull percussion",
      ],
      keyFeatures:
        "Acute bronchitis is usually viral; chronic bronchitis is linked to smoking and environmental pollutants. Mucus hypersecretion with goblet-cell hyperplasia is the pathological hallmark of chronic disease.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 292",
    },
    keywords: [
      "bronchitis",
      "bronchial",
      "cough",
      "expectoration",
      "mucus",
      "phlegm",
      "wheeze",
      "rawness",
      "burning chest",
      "smoking",
      "chronic cough",
    ],
  },
  {
    name: "Asthma",
    aliases: ["bronchial asthma", "reactive airway disease"],
    category: "Respiratory",
    harrisons: {
      definition:
        "Chronic inflammatory disorder of the airways characterised by variable and reversible airflow obstruction, bronchial hyperresponsiveness, and airway inflammation.",
      classicSymptoms: [
        "Episodic wheeze",
        "Breathlessness",
        "Chest tightness",
        "Night or early-morning cough",
        "Symptoms triggered by allergens, cold air, exercise or infections",
      ],
      keySigns: [
        "Expiratory polyphonic wheeze",
        "Prolonged expiration",
        "Hyperinflated chest",
        "Use of accessory muscles in acute attack",
        "Pulsus paradoxus in severe attack",
      ],
      keyFeatures:
        "Atopy (IgE-mediated) is the strongest risk factor. Diurnal variation of peak flow ≥20% is diagnostic. Response to bronchodilators and corticosteroids confirms the diagnosis. Silent chest in severe attack is an emergency sign.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 291",
    },
    keywords: [
      "asthma",
      "wheeze",
      "breathlessness",
      "dyspnea",
      "bronchospasm",
      "airway",
      "allergic",
      "atopic",
      "chest tightness",
      "nocturnal cough",
      "exercise",
      "inhaler",
      "expiratory",
    ],
  },
  {
    name: "Pleurisy",
    aliases: ["pleuritis", "pleural inflammation"],
    category: "Respiratory",
    harrisons: {
      definition:
        "Inflammation of the parietal pleura causing sharp, localised chest pain worsened by breathing and coughing.",
      classicSymptoms: [
        "Sharp, stabbing chest pain worsened by inspiration",
        "Pain relieved by breath-holding or lying on affected side",
        "Dry cough",
        "Fever (if infective)",
        "Dyspnoea",
      ],
      keySigns: [
        "Pleural friction rub on auscultation",
        "Reduced breath sounds if effusion develops",
        "Stony dullness on percussion (effusion)",
      ],
      keyFeatures:
        "Causes include viral infection, pneumonia, pulmonary embolism, autoimmune disease (SLE, RA), and TB. Pleuritic pain is classic: knife-like, positional, worse with deep breathing. When exudate accumulates, pain often diminishes.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 316",
    },
    keywords: [
      "pleurisy",
      "pleural",
      "pleura",
      "chest pain",
      "stabbing",
      "inspiration",
      "friction rub",
      "effusion",
      "stitching pain",
    ],
  },
  {
    name: "Tuberculosis",
    aliases: ["TB", "pulmonary TB", "phthisis", "consumption"],
    category: "Respiratory",
    harrisons: {
      definition:
        "Chronic granulomatous infection caused by Mycobacterium tuberculosis, primarily affecting the lungs but capable of involving any organ.",
      classicSymptoms: [
        "Prolonged productive cough (>2 weeks)",
        "Haemoptysis",
        "Night sweats",
        "Low-grade evening fever",
        "Progressive weight loss",
        "Fatigue",
      ],
      keySigns: [
        "Dullness at apex on percussion",
        "Post-tussive crepitations",
        "Consolidation or cavitation on CXR",
        "Lymphadenopathy (miliary / extrapulmonary)",
      ],
      keyFeatures:
        "Classic triad: haemoptysis, night sweats, and weight loss. AFB smear and culture confirm diagnosis. Cavitary lesions in upper lobes are characteristic of post-primary TB. Latent TB reactivates under immunosuppression.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 175",
    },
    keywords: [
      "tuberculosis",
      "TB",
      "phthisis",
      "haemoptysis",
      "night sweats",
      "weight loss",
      "cavitation",
      "apex",
      "consumptive",
      "mycobacterium",
      "scrofula",
      "miliary",
    ],
  },
  {
    name: "Influenza",
    aliases: ["flu", "grippe", "influenza infection"],
    category: "Respiratory",
    harrisons: {
      definition:
        "Acute viral respiratory illness caused by influenza A or B viruses, characterised by abrupt onset of systemic and respiratory symptoms.",
      classicSymptoms: [
        "Abrupt high fever",
        "Severe myalgia and bone pain",
        "Headache",
        "Dry cough",
        "Sore throat",
        "Profound fatigue and prostration",
      ],
      keySigns: [
        "Flushed face",
        "Pharyngeal erythema",
        "Mild cervical lymphadenopathy",
        "Tachycardia",
      ],
      keyFeatures:
        "Sudden onset differentiates flu from other URTIs. Systemic symptoms predominate over localised nasal symptoms. Complications include primary influenza pneumonia and secondary bacterial pneumonia. Rapid antigen test confirms diagnosis.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 228",
    },
    keywords: [
      "influenza",
      "flu",
      "fever",
      "myalgia",
      "bone aching",
      "cough",
      "prostration",
      "chills",
      "sudden onset",
      "headache",
      "fatigue",
      "grippe",
    ],
  },
  {
    name: "Sinusitis",
    aliases: ["rhinosinusitis", "sinus infection", "nasal sinus infection"],
    category: "Respiratory",
    harrisons: {
      definition:
        "Inflammation of the mucosa of one or more paranasal sinuses, most often following a viral upper respiratory infection.",
      classicSymptoms: [
        "Facial pain and pressure",
        "Nasal congestion and discharge",
        "Post-nasal drip",
        "Headache worse on bending forward",
        "Reduced sense of smell",
        "Fever (bacterial)",
      ],
      keySigns: [
        "Tenderness over affected sinus",
        "Purulent nasal discharge",
        "Mucosal oedema on nasal examination",
        "Transillumination opacification",
      ],
      keyFeatures:
        "Maxillary sinusitis is most common; pain radiates to cheek and upper teeth. Frontal sinusitis causes supraorbital pain worse in the morning. Persistence >10 days with purulent discharge suggests bacterial superinfection.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 236",
    },
    keywords: [
      "sinusitis",
      "sinus",
      "nasal",
      "catarrh",
      "post-nasal",
      "facial pain",
      "frontal",
      "maxillary",
      "pressure",
      "congestion",
      "discharge",
      "smell",
    ],
  },

  // ── GASTROINTESTINAL ──
  {
    name: "Gastritis",
    aliases: ["stomach inflammation", "gastric inflammation"],
    category: "Gastrointestinal",
    harrisons: {
      definition:
        "Histological inflammation of the gastric mucosa, ranging from acute erosive disease to chronic atrophic changes.",
      classicSymptoms: [
        "Epigastric burning or pain",
        "Nausea and vomiting",
        "Bloating and fullness",
        "Belching",
        "Loss of appetite",
      ],
      keySigns: [
        "Epigastric tenderness",
        "Guarding if erosive",
        "Haematemesis or melaena in severe erosive gastritis",
      ],
      keyFeatures:
        "H. pylori infection is the most common cause of chronic gastritis. NSAIDs and alcohol cause acute erosive gastritis. Autoimmune gastritis affects the corpus and leads to pernicious anaemia. Endoscopy is the gold standard.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 322",
    },
    keywords: [
      "gastritis",
      "stomach",
      "epigastric",
      "burning",
      "nausea",
      "vomiting",
      "belching",
      "acidity",
      "heartburn",
      "H pylori",
      "NSAID",
      "erosive",
    ],
  },
  {
    name: "Peptic Ulcer",
    aliases: ["peptic ulcer disease", "gastric ulcer", "duodenal ulcer", "PUD"],
    category: "Gastrointestinal",
    harrisons: {
      definition:
        "Disruption of the mucosal barrier of the stomach or duodenum leading to full-thickness mucosal defects exposed to acid and pepsin.",
      classicSymptoms: [
        "Epigastric pain — gnawing or burning",
        "Duodenal: pain relieved by food; Gastric: pain worsened by food",
        "Night pain waking patient",
        "Nausea and vomiting",
        "Haematemesis or melaena (if complicated)",
      ],
      keySigns: [
        "Epigastric tenderness",
        "Guarding if perforation",
        "Board-like rigidity if perforated",
        "Succussion splash if pyloric stenosis",
      ],
      keyFeatures:
        "H. pylori and NSAIDs are the major causes. Duodenal ulcers are more common and classically wake the patient at 2–3 AM. Gastric ulcers must be biopsied to exclude malignancy. Complications: haemorrhage, perforation, obstruction.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 323",
    },
    keywords: [
      "peptic ulcer",
      "ulcer",
      "epigastric",
      "gnawing",
      "hunger pain",
      "night pain",
      "haematemesis",
      "melaena",
      "H pylori",
      "acid",
      "duodenal",
      "gastric ulcer",
    ],
  },
  {
    name: "Irritable Bowel Syndrome",
    aliases: ["IBS", "spastic colon", "functional bowel disorder"],
    category: "Gastrointestinal",
    harrisons: {
      definition:
        "A functional bowel disorder characterised by recurrent abdominal pain associated with altered bowel habit in the absence of structural pathology.",
      classicSymptoms: [
        "Cramping abdominal pain relieved by defecation",
        "Alternating constipation and diarrhoea",
        "Bloating and distension",
        "Mucus in stool",
        "Sense of incomplete evacuation",
      ],
      keySigns: [
        "Diffuse mild abdominal tenderness",
        "Palpable sigmoid colon",
        "No alarming features (no blood, no weight loss)",
      ],
      keyFeatures:
        "Diagnosis requires Rome IV criteria: recurrent abdominal pain ≥1 day/week for 3 months. Stress, diet, and gut microbiome alterations play roles. Subtypes: IBS-C, IBS-D, IBS-M. Exclusion of organic pathology is essential.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 332",
    },
    keywords: [
      "IBS",
      "irritable bowel",
      "spastic colon",
      "alternating",
      "constipation",
      "diarrhea",
      "bloating",
      "flatulence",
      "mucus stool",
      "cramps",
      "anxiety",
      "functional",
    ],
  },
  {
    name: "Dysentery",
    aliases: ["bacillary dysentery", "amoebic dysentery", "bloody diarrhea"],
    category: "Gastrointestinal",
    harrisons: {
      definition:
        "Inflammatory disease of the intestine, especially the colon, characterised by severe diarrhoea containing mucus and blood.",
      classicSymptoms: [
        "Frequent bloody, mucoid stools (tenesmus)",
        "Severe colicky abdominal pain",
        "Fever",
        "Urgency and tenesmus",
        "Dehydration",
      ],
      keySigns: [
        "Left iliac fossa tenderness",
        "Palpable spastic colon",
        "Dehydration signs",
        "Rectal examination: blood and mucus",
      ],
      keyFeatures:
        "Bacillary dysentery (Shigella) causes explosive onset; amoebic dysentery (E. histolytica) has subacute onset with classic 'anchovy-sauce' pus. Sigmoidoscopy shows mucosal ulceration. Risk of complications: HUS (Shigella), liver abscess (amoeba).",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 187",
    },
    keywords: [
      "dysentery",
      "bloody stool",
      "mucus stool",
      "tenesmus",
      "colicky",
      "amoeba",
      "shigella",
      "diarrhea",
      "fever",
      "dehydration",
    ],
  },
  {
    name: "Cholera",
    aliases: ["rice-water diarrhea", "epidemic diarrhea"],
    category: "Gastrointestinal",
    harrisons: {
      definition:
        "Acute secretory diarrhoeal illness caused by Vibrio cholerae, producing profuse watery stools and rapid dehydration.",
      classicSymptoms: [
        "Sudden profuse watery diarrhoea (rice-water stools)",
        "Vomiting",
        "Muscle cramps",
        "Rapid and profound dehydration",
        "No fever (usually)",
      ],
      keySigns: [
        "Severe dehydration: sunken eyes, dry mucosae, decreased skin turgor",
        "Weak thready pulse",
        "Hypotension",
        "Oliguria",
      ],
      keyFeatures:
        "Cholera toxin activates adenylate cyclase, causing massive Cl− secretion. Rice-water stools are pathognomonic. Fluid replacement is the cornerstone of treatment. Oral rehydration salt (ORS) reduces mortality dramatically.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 193",
    },
    keywords: [
      "cholera",
      "rice water",
      "profuse",
      "watery diarrhea",
      "dehydration",
      "cramps",
      "vomiting",
      "collapse",
      "sunken eyes",
    ],
  },
  {
    name: "Hepatitis",
    aliases: [
      "jaundice",
      "viral hepatitis",
      "liver inflammation",
      "infectious hepatitis",
    ],
    category: "Gastrointestinal",
    harrisons: {
      definition:
        "Inflammation of the liver most commonly due to viral infection (Hepatitis A–E), characterised by hepatocellular injury and varying degrees of jaundice.",
      classicSymptoms: [
        "Jaundice (yellow discolouration of skin and sclera)",
        "Dark urine and pale stools",
        "Right hypochondrial pain or discomfort",
        "Nausea, anorexia, vomiting",
        "Prodromal flu-like illness",
        "Fatigue",
      ],
      keySigns: [
        "Tender hepatomegaly",
        "Scleral icterus",
        "Splenomegaly (viral hepatitis)",
        "Spider naevi (chronic)",
        "Palmar erythema (chronic)",
      ],
      keyFeatures:
        "Hep A/E are faeco-oral (acute, self-limiting). Hep B/C/D are blood-borne (risk of chronicity, cirrhosis, HCC). Elevated ALT/AST with bilirubin confirms hepatocellular damage. Serology differentiates subtypes.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 342",
    },
    keywords: [
      "hepatitis",
      "jaundice",
      "liver",
      "icterus",
      "yellow",
      "dark urine",
      "clay stool",
      "nausea",
      "hepatomegaly",
      "bilirubin",
      "viral",
    ],
  },
  {
    name: "Constipation",
    aliases: ["costiveness", "infrequent stools"],
    category: "Gastrointestinal",
    harrisons: {
      definition:
        "Infrequent passage of hard, dry stools (fewer than 3 per week) associated with straining, bloating, and a sense of incomplete evacuation.",
      classicSymptoms: [
        "Infrequent, hard, pellet-like stools",
        "Straining at stool",
        "Abdominal bloating and distension",
        "Sensation of incomplete emptying",
        "Abdominal discomfort",
      ],
      keySigns: [
        "Palpable faecal masses in colon",
        "Distended abdomen",
        "Hard faeces on rectal examination",
      ],
      keyFeatures:
        "Primary (functional/idiopathic) vs secondary (drugs, hypothyroidism, colorectal lesion). Dietary fibre, fluid intake, and activity are first-line measures. Alarm symptoms (blood, weight loss, family history of CRC) warrant colonoscopy.",
      reference: "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 49",
    },
    keywords: [
      "constipation",
      "costive",
      "hard stool",
      "straining",
      "infrequent",
      "bloating",
      "incomplete",
      "dry stool",
      "sluggish",
    ],
  },
  {
    name: "Appendicitis",
    aliases: ["acute appendicitis", "inflamed appendix"],
    category: "Gastrointestinal",
    harrisons: {
      definition:
        "Acute inflammation of the vermiform appendix, the most common surgical emergency of the abdomen.",
      classicSymptoms: [
        "Central colicky pain migrating to right iliac fossa",
        "Anorexia",
        "Nausea and vomiting after pain onset",
        "Low-grade fever",
        "Constipation (occasionally diarrhoea)",
      ],
      keySigns: [
        "McBurney's point tenderness",
        "Rebound tenderness (Blumberg sign)",
        "Rovsing sign",
        "Psoas sign",
        "Guarding and rigidity (perforation)",
      ],
      keyFeatures:
        "Classic migration of pain from umbilicus to RIF within 24 h. Alvarado score aids diagnosis. Elevated WBC with neutrophilia. CT abdomen is most sensitive. Perforation risk increases with delay >24–48 h.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 330",
    },
    keywords: [
      "appendicitis",
      "appendix",
      "right iliac fossa",
      "McBurney",
      "rebound",
      "guarding",
      "fever",
      "nausea",
      "surgical abdomen",
    ],
  },
  {
    name: "Renal Colic",
    aliases: [
      "kidney stone",
      "urolithiasis",
      "nephrolithiasis",
      "ureteric colic",
    ],
    category: "Urological",
    harrisons: {
      definition:
        "Severe, paroxysmal flank pain caused by passage of a calculus through the ureter, often radiating to the groin.",
      classicSymptoms: [
        "Sudden severe colicky flank pain radiating to groin",
        "Haematuria (visible or microscopic)",
        "Nausea and vomiting",
        "Dysuria and urgency",
        "Restlessness — cannot find comfortable position",
      ],
      keySigns: [
        "Costovertebral angle tenderness",
        "Microscopic haematuria on urine dipstick",
        "Ureteric calculus on non-contrast CT KUB",
      ],
      keyFeatures:
        "Calcium oxalate stones are most common (80%). Staghorn calculi (struvite) are infection-related. Pain is colicky and severe; patient is writhing (unlike peritonitis). Hydration and NSAIDs for analgesia; larger stones may need lithotripsy.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 307",
    },
    keywords: [
      "renal colic",
      "kidney stone",
      "urolithiasis",
      "flank pain",
      "hematuria",
      "groin",
      "ureter",
      "calculus",
      "oxalate",
      "colicky",
      "uric acid",
    ],
  },

  // ── CARDIOVASCULAR ──
  {
    name: "Hypertension",
    aliases: ["high blood pressure", "arterial hypertension"],
    category: "Cardiovascular",
    harrisons: {
      definition:
        "Sustained elevation of systemic arterial blood pressure (≥130/80 mmHg by 2017 ACC/AHA guidelines) resulting in increased risk of cardiovascular, cerebrovascular, and renal damage.",
      classicSymptoms: [
        "Usually asymptomatic ('silent killer')",
        "Headache (occipital, morning)",
        "Epistaxis",
        "Dizziness",
        "Visual disturbances (hypertensive retinopathy)",
      ],
      keySigns: [
        "Elevated BP on repeated measurement",
        "Hypertensive retinopathy (Keith-Wagener changes)",
        "Left ventricular hypertrophy (loud S4, displaced apex)",
        "Renal bruit (renovascular)",
      ],
      keyFeatures:
        "Essential (primary) hypertension accounts for 95% of cases. Target organ damage: LVH, CKD, stroke, MI, retinopathy. Secondary causes include CKD, primary aldosteronism, phaeochromocytoma, coarctation.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 271",
    },
    keywords: [
      "hypertension",
      "high blood pressure",
      "headache",
      "occipital",
      "dizziness",
      "epistaxis",
      "heart",
      "stroke",
      "renal",
      "LVH",
    ],
  },
  {
    name: "Palpitations",
    aliases: [
      "heart palpitations",
      "awareness of heartbeat",
      "irregular heartbeat",
    ],
    category: "Cardiovascular",
    harrisons: {
      definition:
        "Conscious awareness of the heartbeat, perceived as rapid, irregular, fluttering, or pounding sensations in the chest.",
      classicSymptoms: [
        "Rapid or irregular heartbeat sensation",
        "Fluttering in chest",
        "Pounding heartbeat",
        "Associated dizziness or near-syncope",
        "Anxiety",
      ],
      keySigns: [
        "Irregular pulse or tachycardia on examination",
        "ECG may show arrhythmia",
        "Pallor (anaemia-related)",
      ],
      keyFeatures:
        "Benign (anxiety, caffeine, ectopics) vs pathological (AF, SVT, VT). Red flags: syncope, structural heart disease, family history of sudden death. 24-h Holter monitor correlates symptoms with rhythm.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 268",
    },
    keywords: [
      "palpitations",
      "heart",
      "irregular",
      "rapid",
      "flutter",
      "anxiety",
      "caffeine",
      "ectopic",
      "tachycardia",
      "arrhythmia",
    ],
  },
  {
    name: "Angina",
    aliases: ["angina pectoris", "chest pain cardiac", "ischaemic chest pain"],
    category: "Cardiovascular",
    harrisons: {
      definition:
        "Chest pain or discomfort due to myocardial ischaemia, typically precipitated by exertion and relieved by rest or nitrates.",
      classicSymptoms: [
        "Central chest pain — pressure, squeezing, or heaviness",
        "Radiation to left arm, jaw, or neck",
        "Precipitated by exertion or stress",
        "Relieved within minutes by rest or GTN",
        "Associated dyspnoea and diaphoresis",
      ],
      keySigns: [
        "Normal examination between attacks",
        "S4 gallop during episode",
        "ST depression on ECG during pain",
      ],
      keyFeatures:
        "Stable angina: predictable, exertional, relieved by nitrates. Unstable angina: occurs at rest, crescendo pattern, requires urgent assessment. Diagnosis via stress ECG, stress echo, or coronary angiography.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 267",
    },
    keywords: [
      "angina",
      "chest pain",
      "cardiac",
      "ischaemia",
      "exertion",
      "pressure",
      "left arm",
      "jaw",
      "nitrate",
      "coronary",
      "heart",
    ],
  },
  {
    name: "Anaemia",
    aliases: ["anemia", "low haemoglobin", "iron deficiency anemia"],
    category: "Cardiovascular",
    harrisons: {
      definition:
        "Reduction in circulating haemoglobin concentration below the normal range for age and sex, impairing oxygen delivery to tissues.",
      classicSymptoms: [
        "Fatigue and weakness",
        "Dyspnoea on exertion",
        "Palpitations",
        "Pallor",
        "Dizziness and headache",
        "Pica (iron deficiency)",
      ],
      keySigns: [
        "Pallor of conjunctivae, palms, mucosae",
        "Tachycardia and flow murmur",
        "Koilonychia (iron deficiency)",
        "Glossitis, angular stomatitis (B12/iron)",
        "Splenomegaly (haemolytic)",
      ],
      keyFeatures:
        "Iron deficiency is most common (blood loss, poor intake). B12/folate deficiency causes megaloblastic anaemia. Haemolytic anaemia presents with jaundice and splenomegaly. MCV guides classification: microcytic, normocytic, macrocytic.",
      reference: "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 93",
    },
    keywords: [
      "anaemia",
      "anemia",
      "pallor",
      "fatigue",
      "weakness",
      "palpitations",
      "dyspnea",
      "iron",
      "haemoglobin",
      "koilonychia",
      "glossitis",
    ],
  },

  // ── MUSCULOSKELETAL ──
  {
    name: "Rheumatoid Arthritis",
    aliases: ["RA", "rheumatoid", "inflammatory arthritis"],
    category: "Musculoskeletal",
    harrisons: {
      definition:
        "Chronic systemic autoimmune inflammatory disease primarily affecting synovial joints, causing progressive joint destruction, disability, and extra-articular manifestations.",
      classicSymptoms: [
        "Symmetrical polyarthritis — small joints of hands and feet",
        "Morning stiffness >1 hour",
        "Swollen, warm, tender joints",
        "Constitutional: fatigue, weight loss, fever",
        "Extra-articular: nodules, vasculitis, pericarditis",
      ],
      keySigns: [
        "Fusiform swelling of PIP and MCP joints",
        "Swan-neck and Boutonnière deformity",
        "Ulnar deviation of fingers",
        "Rheumatoid nodules over elbows",
        "Positive RF and anti-CCP antibodies",
      ],
      keyFeatures:
        "RF and anti-CCP antibodies are seropositive in ~70–80%. Symmetrical small joint involvement, morning stiffness >1 h, and x-ray erosions are diagnostic criteria. DMARDs (methotrexate) are the mainstay of treatment.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 354",
    },
    keywords: [
      "rheumatoid arthritis",
      "RA",
      "joint",
      "synovitis",
      "morning stiffness",
      "deformity",
      "small joints",
      "symmetric",
      "autoimmune",
      "inflammation",
      "nodules",
    ],
  },
  {
    name: "Osteoarthritis",
    aliases: ["OA", "degenerative joint disease", "wear and tear arthritis"],
    category: "Musculoskeletal",
    harrisons: {
      definition:
        "The most prevalent joint disease characterised by progressive degradation of articular cartilage with secondary bone changes, synovial inflammation, and pain.",
      classicSymptoms: [
        "Joint pain worsened by activity, relieved by rest",
        "Short-duration morning stiffness (<30 min)",
        "Crepitus on movement",
        "Restricted range of motion",
        "Joints: knees, hips, spine, hands (DIP)",
      ],
      keySigns: [
        "Bony enlargement of joints (Heberden's — DIP, Bouchard's — PIP)",
        "Crepitus",
        "Reduced range of movement",
        "No warmth (unlike RA)",
        "X-ray: joint space narrowing, osteophytes, subchondral sclerosis",
      ],
      keyFeatures:
        "Primary OA is age-related; secondary OA follows trauma, obesity, or metabolic disease. Pain is mechanical — worse with activity. NSAIDs, physiotherapy, and joint replacement are treatments. Anti-inflammatory remedies address the synovitis component.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 362",
    },
    keywords: [
      "osteoarthritis",
      "degenerative",
      "cartilage",
      "crepitus",
      "Heberden",
      "joint pain",
      "mechanical pain",
      "elderly",
      "knee",
      "hip",
      "osteophyte",
    ],
  },
  {
    name: "Gout",
    aliases: ["gouty arthritis", "hyperuricaemia", "podagra"],
    category: "Musculoskeletal",
    harrisons: {
      definition:
        "Inflammatory arthritis caused by monosodium urate crystal deposition in joints and soft tissues due to hyperuricaemia.",
      classicSymptoms: [
        "Sudden, severe nocturnal joint pain (podagra — 1st MTP)",
        "Exquisite tenderness — cannot bear sheet touching joint",
        "Redness, warmth, swelling",
        "Fever during acute attack",
        "Tophi over ears, elbows, fingers",
      ],
      keySigns: [
        "Red, swollen 1st MTP joint",
        "Tophi (chalky deposits)",
        "Elevated serum uric acid",
        "Needle-shaped negatively birefringent crystals on joint aspiration",
      ],
      keyFeatures:
        "Classically affects first MTP joint (podagra) in middle-aged men. Triggers: alcohol, purine-rich foods, diuretics, dehydration. Inter-critical gout: asymptomatic between attacks. Allopurinol reduces urate production for prophylaxis.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 360",
    },
    keywords: [
      "gout",
      "uric acid",
      "podagra",
      "toe",
      "MTP",
      "tophi",
      "crystal",
      "nocturnal",
      "red hot joint",
      "alcohol",
      "purine",
    ],
  },
  {
    name: "Sciatica",
    aliases: ["sciatic neuralgia", "lumbar radiculopathy", "nerve root pain"],
    category: "Musculoskeletal",
    harrisons: {
      definition:
        "Pain radiating along the course of the sciatic nerve (posterior thigh to leg and foot), typically caused by lumbar disc herniation compressing L4–S1 nerve roots.",
      classicSymptoms: [
        "Radiating pain from low back down leg to foot",
        "Burning, shooting, or electric-shock quality",
        "Paraesthesia and numbness in dermatomal distribution",
        "Worsened by sitting, coughing, and Valsalva",
        "Weakness of foot dorsiflexion (L4/5)",
      ],
      keySigns: [
        "Positive straight-leg raise (Lasègue sign) <60°",
        "Reduced ankle reflex (S1)",
        "Sensory loss in dermatomal pattern",
        "Antalgic posture",
      ],
      keyFeatures:
        "L5/S1 disc herniation is the most common cause. MRI is the gold standard. Conservative management (analgesia, physiotherapy) for 6–8 weeks. Surgical decompression (discectomy) for refractory cases or neurological deficit.",
      reference: "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 15",
    },
    keywords: [
      "sciatica",
      "sciatic",
      "lumbar",
      "radiation",
      "leg pain",
      "nerve",
      "disc",
      "L4",
      "L5",
      "S1",
      "burning",
      "shooting",
      "paraesthesia",
    ],
  },
  {
    name: "Lumbago",
    aliases: ["low back pain", "lumbar pain", "backache"],
    category: "Musculoskeletal",
    harrisons: {
      definition:
        "Pain localised to the lumbar spine region, one of the most common reasons for physician consultation, arising from musculoligamentous, disc, or facet joint pathology.",
      classicSymptoms: [
        "Aching or stiffness in lower back",
        "Worse on movement, prolonged sitting or standing",
        "Morning stiffness",
        "Muscle spasm",
        "May radiate to buttocks without sciatica",
      ],
      keySigns: [
        "Restricted lumbar flexion and extension",
        "Paraspinal muscle spasm",
        "No neurological deficit (uncomplicated)",
        "Tenderness over lumbar vertebrae or paraspinals",
      ],
      keyFeatures:
        "90% of acute low back pain resolves within 6 weeks. Red flags (fever, weight loss, night pain, neurological deficit) suggest serious pathology (fracture, malignancy, infection). Facet joint disease worsens with extension; disc disease with flexion.",
      reference: "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 15",
    },
    keywords: [
      "lumbago",
      "back pain",
      "lumbar",
      "backache",
      "stiffness",
      "spasm",
      "worse movement",
      "spine",
      "muscle",
    ],
  },
  {
    name: "Fibromyalgia",
    aliases: ["fibrositis", "diffuse muscle pain", "chronic widespread pain"],
    category: "Musculoskeletal",
    harrisons: {
      definition:
        "Chronic widespread musculoskeletal pain syndrome characterised by diffuse pain, fatigue, sleep disturbance, and tenderness at specific tender points.",
      classicSymptoms: [
        "Widespread aching pain (>3 months)",
        "Unrefreshing sleep and morning stiffness",
        "Fatigue and cognitive fog ('fibro fog')",
        "Depression and anxiety",
        "Irritable bowel and bladder",
      ],
      keySigns: [
        "Tenderness at defined tender-point sites",
        "Normal inflammatory markers",
        "Normal imaging and blood tests (diagnosis of exclusion)",
      ],
      keyFeatures:
        "Predominantly affects women 20–50 years. Pathophysiology involves central sensitisation (amplified pain processing). Treated with low-dose amitriptyline, aerobic exercise, CBT, and duloxetine/pregabalin.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 396",
    },
    keywords: [
      "fibromyalgia",
      "fibrositis",
      "widespread pain",
      "tender points",
      "fatigue",
      "sleep",
      "fog",
      "anxiety",
      "depression",
      "women",
      "chronic pain",
    ],
  },

  // ── NEUROLOGICAL ──
  {
    name: "Migraine",
    aliases: ["migraine headache", "hemicrania", "sick headache"],
    category: "Neurological",
    harrisons: {
      definition:
        "Recurrent episodic headache disorder characterised by moderate-to-severe unilateral throbbing pain lasting 4–72 hours, associated with nausea, photophobia, and phonophobia.",
      classicSymptoms: [
        "Unilateral pulsating headache (>4 h)",
        "Nausea and/or vomiting",
        "Photophobia and phonophobia",
        "Aura — visual, sensory, or speech disturbance (30%)",
        "Worsening with physical activity",
        "Prodrome: mood change, yawning",
      ],
      keySigns: [
        "Normal neurological exam between attacks",
        "Pallor and diaphoresis during attack",
        "Visual scotoma or fortification spectra (aura)",
      ],
      keyFeatures:
        "IHS criteria: ≥5 attacks, 4–72 h, unilateral, pulsating, moderate-severe, aggravated by activity + nausea/photophobia. Triptans are acute treatment. Propranolol, topiramate, valproate for prevention.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 422",
    },
    keywords: [
      "migraine",
      "headache",
      "hemicrania",
      "throbbing",
      "pulsating",
      "unilateral",
      "nausea",
      "vomiting",
      "photophobia",
      "aura",
      "visual",
      "phonophobia",
    ],
  },
  {
    name: "Vertigo",
    aliases: ["dizziness", "BPPV", "vestibular disorder", "labyrinthitis"],
    category: "Neurological",
    harrisons: {
      definition:
        "Illusion of movement (usually rotational) of the self or environment due to asymmetric input from peripheral or central vestibular structures.",
      classicSymptoms: [
        "Sensation of spinning or environment moving",
        "Nausea and vomiting",
        "Gait unsteadiness",
        "Hearing loss or tinnitus (peripheral)",
        "Triggered by head position change (BPPV)",
      ],
      keySigns: [
        "Nystagmus (horizontal geotropic in BPPV)",
        "Positive Dix-Hallpike test",
        "Romberg's sign positive",
        "Cerebellar signs (central vertigo)",
      ],
      keyFeatures:
        "Peripheral (benign): BPPV, Ménière's disease, vestibular neuritis. Central (dangerous): cerebellar stroke, MS, acoustic neuroma. HINTS exam differentiates. Epley manoeuvre is curative for BPPV.",
      reference: "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 26",
    },
    keywords: [
      "vertigo",
      "dizziness",
      "spinning",
      "vestibular",
      "nystagmus",
      "Meniere",
      "labyrinthitis",
      "BPPV",
      "nausea",
      "tinnitus",
      "hearing",
    ],
  },
  {
    name: "Epilepsy",
    aliases: ["seizures", "convulsions", "fits"],
    category: "Neurological",
    harrisons: {
      definition:
        "Chronic neurological disorder characterised by recurrent unprovoked seizures due to abnormal, excessive, or synchronous neuronal activity in the brain.",
      classicSymptoms: [
        "Tonic-clonic convulsions with loss of consciousness",
        "Post-ictal confusion and drowsiness",
        "Absence spells (staring, blinking)",
        "Focal motor or sensory symptoms",
        "Aura preceding seizure",
      ],
      keySigns: [
        "Tongue bite",
        "Urinary incontinence post-seizure",
        "Todd's paralysis (focal weakness post-seizure)",
        "Abnormal EEG",
      ],
      keyFeatures:
        "Classification: focal vs generalised. EEG and MRI brain guide diagnosis. First-line antiepileptics: sodium valproate (generalised), carbamazepine (focal). SUDEP is a rare but serious complication.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 418",
    },
    keywords: [
      "epilepsy",
      "seizures",
      "convulsions",
      "fits",
      "tonic-clonic",
      "absence",
      "aura",
      "EEG",
      "loss of consciousness",
      "post-ictal",
    ],
  },
  {
    name: "Neuralgia",
    aliases: [
      "trigeminal neuralgia",
      "nerve pain",
      "tic douloureux",
      "postherpetic neuralgia",
    ],
    category: "Neurological",
    harrisons: {
      definition:
        "Intense paroxysmal pain along the distribution of a nerve, most commonly the trigeminal nerve, triggered by light touch or chewing.",
      classicSymptoms: [
        "Electric-shock-like, lancinating facial pain",
        "Pain in jaw, cheek, lips, or tongue",
        "Triggered by eating, talking, or touching face",
        "Very brief episodes (<2 min)",
        "No pain between attacks (classic type)",
      ],
      keySigns: [
        "Trigger zones on face",
        "Normal neurological exam in idiopathic type",
        "Abnormal MRI if secondary cause",
      ],
      keyFeatures:
        "Trigeminal neuralgia (V2/V3 most common) due to vascular compression of nerve root. Carbamazepine is first-line. Postherpetic neuralgia follows herpes zoster reactivation — treated with gabapentin, amitriptyline.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 425",
    },
    keywords: [
      "neuralgia",
      "nerve pain",
      "trigeminal",
      "shooting pain",
      "lightning",
      "electric",
      "facial pain",
      "lancinating",
      "trigger",
      "herpes zoster",
      "burning",
    ],
  },

  // ── SKIN ──
  {
    name: "Eczema",
    aliases: ["atopic dermatitis", "atopic eczema", "dermatitis"],
    category: "Skin",
    harrisons: {
      definition:
        "Chronic relapsing inflammatory skin condition characterised by intense pruritus, xerosis, and eczematous plaques, strongly associated with atopy.",
      classicSymptoms: [
        "Intense itching (pruritus)",
        "Dry, scaly skin (xerosis)",
        "Erythematous papules and vesicles",
        "Lichenification with chronicity",
        "Weeping and crusting",
      ],
      keySigns: [
        "Flexural distribution (infants: extensor)",
        "Dennie-Morgan folds",
        "Lichenification",
        "Excoriations from scratching",
        "Elevated IgE",
      ],
      keyFeatures:
        "Atopic triad: eczema, asthma, allergic rhinitis. Barrier dysfunction (filaggrin gene mutations) central to pathogenesis. Topical corticosteroids are first-line; tacrolimus for maintenance. Dupilumab (anti-IL-4/IL-13) for moderate-severe.",
      reference: "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 57",
    },
    keywords: [
      "eczema",
      "atopic",
      "dermatitis",
      "itching",
      "pruritus",
      "dry skin",
      "xerosis",
      "flexural",
      "weeping",
      "lichenification",
      "IgE",
      "allergy",
    ],
  },
  {
    name: "Urticaria",
    aliases: ["hives", "nettle rash", "angioedema"],
    category: "Skin",
    harrisons: {
      definition:
        "Transient raised erythematous wheals with intense pruritus due to mast cell degranulation releasing histamine, lasting <24 hours per lesion.",
      classicSymptoms: [
        "Raised, itchy erythematous wheals",
        "Each lesion lasts <24 hours and resolves without marks",
        "Angioedema: deeper swelling of lips, eyelids, throat",
        "Anaphylaxis in severe cases",
        "Triggered by food, drugs, infection",
      ],
      keySigns: [
        "Migrating urticarial wheals",
        "Dermatographism",
        "Swelling of lips/tongue (angioedema)",
      ],
      keyFeatures:
        "Acute urticaria (<6 weeks): usually allergic (IgE-mediated) — food, drugs, insect stings. Chronic urticaria (>6 weeks): often idiopathic or autoimmune. Antihistamines (cetirizine, loratadine) are first-line. Epinephrine for anaphylaxis.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 347",
    },
    keywords: [
      "urticaria",
      "hives",
      "wheals",
      "pruritus",
      "angioedema",
      "allergic",
      "histamine",
      "mast cell",
      "nettle rash",
      "itching",
    ],
  },
  {
    name: "Psoriasis",
    aliases: ["psoriatic skin disease", "plaque psoriasis"],
    category: "Skin",
    harrisons: {
      definition:
        "Chronic immune-mediated inflammatory skin disease characterised by well-demarcated erythematous plaques with silvery scales.",
      classicSymptoms: [
        "Well-defined erythematous plaques with silvery-white scales",
        "Itching and burning",
        "Nail changes: pitting, onycholysis",
        "Joint involvement (psoriatic arthritis ~20%)",
        "Koebner phenomenon",
      ],
      keySigns: [
        "Extensor surface distribution (elbows, knees, scalp)",
        "Auspitz sign (bleeding on scale removal)",
        "Nail pitting",
        "Salmon patches",
      ],
      keyFeatures:
        "Triggered by infection (streptococcal), stress, drugs (lithium, beta-blockers). Topical steroids and vitamin D analogues for mild disease. Biologics (anti-TNF, anti-IL-17) for moderate-severe. Psoriatic arthritis is a significant comorbidity.",
      reference: "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 58",
    },
    keywords: [
      "psoriasis",
      "plaque",
      "scales",
      "silvery",
      "erythema",
      "Koebner",
      "nail",
      "itching",
      "extensor",
      "chronic",
      "immune",
    ],
  },
  {
    name: "Acne",
    aliases: ["acne vulgaris", "pimples", "comedones"],
    category: "Skin",
    harrisons: {
      definition:
        "Chronic inflammatory disorder of the pilosebaceous unit, affecting predominantly the face and trunk, characterised by comedones, papules, pustules, and cysts.",
      classicSymptoms: [
        "Comedones (blackheads and whiteheads)",
        "Papules and pustules on face, chest, back",
        "Nodules and cysts (severe)",
        "Post-inflammatory hyperpigmentation",
        "Scarring",
      ],
      keySigns: [
        "Open/closed comedones",
        "Inflamed papulopustules",
        "Nodulocystic lesions (severe)",
        "Oily skin (seborrhoea)",
      ],
      keyFeatures:
        "Pathogenesis: sebum overproduction, follicular hyperkeratosis, C. acnes colonisation, inflammation. Topical retinoids + benzoyl peroxide are first-line. Oral antibiotics (doxycycline) for moderate. Isotretinoin for severe or resistant acne.",
      reference: "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 57",
    },
    keywords: [
      "acne",
      "pimples",
      "comedones",
      "pustules",
      "blackheads",
      "sebum",
      "oily",
      "face",
      "scarring",
      "cystic",
      "hormonal",
    ],
  },
  {
    name: "Boils",
    aliases: ["furuncle", "carbuncle", "skin abscess", "furunculosis"],
    category: "Skin",
    harrisons: {
      definition:
        "Acute necrotising infection of the hair follicle (furuncle) or a coalescence of furuncles (carbuncle) caused predominantly by Staphylococcus aureus.",
      classicSymptoms: [
        "Painful, red, hot nodule on skin",
        "Fluctuant swelling with pus",
        "Fever and malaise (carbuncle)",
        "Recurrent boils in hair-bearing areas",
        "Spontaneous discharge of pus",
      ],
      keySigns: [
        "Fluctuant nodule with surrounding erythema",
        "Central necrotic plug",
        "Regional lymphadenopathy",
      ],
      keyFeatures:
        "S. aureus (including MRSA) is the predominant organism. Risk factors: diabetes, obesity, poor hygiene, nasal carriage. Incision and drainage is definitive treatment. Oral antibiotics (flucloxacillin) for systemic features. Recurrent cases need decolonisation.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 145",
    },
    keywords: [
      "boil",
      "furuncle",
      "carbuncle",
      "abscess",
      "staphylococcus",
      "pus",
      "hot nodule",
      "recurrent",
      "diabetes",
      "infection",
      "skin infection",
    ],
  },

  // ── UROLOGICAL ──
  {
    name: "Urinary Tract Infection",
    aliases: ["UTI", "cystitis", "bladder infection", "urethritis"],
    category: "Urological",
    harrisons: {
      definition:
        "Bacterial infection of any part of the urinary tract — urethra (urethritis), bladder (cystitis), or kidney (pyelonephritis).",
      classicSymptoms: [
        "Dysuria (burning on urination)",
        "Urinary frequency and urgency",
        "Suprapubic pain",
        "Haematuria",
        "Fever and rigors (pyelonephritis)",
        "Loin pain and tenderness (pyelonephritis)",
      ],
      keySigns: [
        "Suprapubic tenderness (cystitis)",
        "Renal angle tenderness (pyelonephritis)",
        "Dipstick: nitrites + leucocytes",
      ],
      keyFeatures:
        "E. coli causes 80% of community UTIs. Women affected far more than men (short urethra). Urine culture and sensitivity guides antibiotic choice. Trimethoprim or nitrofurantoin for uncomplicated cystitis. Recurrent UTIs need investigation for structural abnormality.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 130",
    },
    keywords: [
      "UTI",
      "cystitis",
      "dysuria",
      "burning urination",
      "frequency",
      "urgency",
      "bladder",
      "hematuria",
      "pyelonephritis",
      "E coli",
      "suprapubic",
    ],
  },
  {
    name: "Enuresis",
    aliases: [
      "bedwetting",
      "nocturnal enuresis",
      "urinary incontinence children",
    ],
    category: "Urological",
    harrisons: {
      definition:
        "Involuntary voiding of urine during sleep beyond the developmentally expected age (>5 years), either primary (never dry) or secondary (recurrence after ≥6 months dry).",
      classicSymptoms: [
        "Bedwetting during sleep",
        "Normal daytime bladder control",
        "Deep sleep / difficulty arousing",
        "Family history of enuresis",
        "Psychological stress (secondary)",
      ],
      keySigns: [
        "Normal physical examination",
        "Exclude UTI, diabetes, structural anomaly",
        "Assessment of sleep patterns",
      ],
      keyFeatures:
        "Primary monosymptomatic enuresis (PME) is most common and is largely genetic. Reduced nocturnal ADH secretion plays a role. Bed alarm therapy is first-line; desmopressin for short-term control. Resolves spontaneously in most.",
      reference: "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 51",
    },
    keywords: [
      "enuresis",
      "bedwetting",
      "nocturnal",
      "incontinence",
      "children",
      "sleep",
      "urine",
      "involuntary",
    ],
  },

  // ── GYNAECOLOGY ──
  {
    name: "Dysmenorrhea",
    aliases: ["painful periods", "menstrual cramps", "dysmenorrhoea"],
    category: "Gynaecology",
    harrisons: {
      definition:
        "Painful menstruation, classified as primary (no pelvic pathology) or secondary (associated with endometriosis, fibroids, or adenomyosis).",
      classicSymptoms: [
        "Crampy lower abdominal pain coinciding with menstruation",
        "Pain radiating to back and thighs",
        "Nausea and vomiting",
        "Diarrhoea",
        "Headache and dizziness",
      ],
      keySigns: [
        "Uterine tenderness on bimanual examination (secondary)",
        "Normal examination (primary)",
        "Adnexal tenderness (endometriosis)",
      ],
      keyFeatures:
        "Primary dysmenorrhoea: due to prostaglandin excess causing uterine hypercontractility. Secondary: endometriosis is most common cause (dyspareunia + infertility triad). NSAIDs and OCP are first-line for primary. Laparoscopy for suspected secondary.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 412",
    },
    keywords: [
      "dysmenorrhea",
      "painful periods",
      "menstrual cramps",
      "uterine",
      "pelvis",
      "lower abdomen",
      "nausea",
      "prostaglandin",
      "endometriosis",
    ],
  },
  {
    name: "Leucorrhoea",
    aliases: ["vaginal discharge", "whites", "leucorrhea"],
    category: "Gynaecology",
    harrisons: {
      definition:
        "Abnormal vaginal discharge characterised by excessive mucoid or purulent secretion from the vagina, cervix, or uterus.",
      classicSymptoms: [
        "White, yellow, or greenish vaginal discharge",
        "Pruritus vulvae",
        "Burning sensation",
        "Foul or fishy odour (bacterial vaginosis)",
        "Dyspareunia",
      ],
      keySigns: [
        "Vaginal erythema",
        "Cheesy discharge (candida)",
        "Frothy yellow-green discharge (Trichomonas)",
        "Thin grey discharge with fishy amine odour (BV)",
      ],
      keyFeatures:
        "Physiological leucorrhoea (clear, odourless, cyclic) is normal. Pathological causes: candida (most common — curdy white, itchy), BV (fishy odour, Clue cells), Trichomonas (frothy green, STI), cervicitis (gonorrhoea/chlamydia).",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 131",
    },
    keywords: [
      "leucorrhoea",
      "vaginal discharge",
      "whites",
      "pruritus",
      "itching",
      "candida",
      "bacterial vaginosis",
      "trichomonas",
      "burning",
      "odour",
    ],
  },
  {
    name: "Menorrhagia",
    aliases: ["heavy periods", "excessive menstrual bleeding", "HMB"],
    category: "Gynaecology",
    harrisons: {
      definition:
        "Heavy menstrual bleeding (>80 mL per cycle or lasting >7 days) that interferes with quality of life, resulting in iron deficiency anaemia.",
      classicSymptoms: [
        "Prolonged or heavy menstrual flow with clots",
        "Need for double protection",
        "Flooding through pads/clothes",
        "Symptoms of anaemia: pallor, fatigue, dyspnoea",
        "Pelvic pain (if fibroid-related)",
      ],
      keySigns: [
        "Uterine enlargement (fibroids)",
        "Pallor and signs of anaemia",
        "Uterine tenderness",
      ],
      keyFeatures:
        "Causes: dysfunctional uterine bleeding (DUB), fibroids, adenomyosis, coagulopathy, thyroid disease. Tranexamic acid and NSAIDs reduce blood loss. Mirena IUS is most effective medical option. Hysterectomy definitive.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 412",
    },
    keywords: [
      "menorrhagia",
      "heavy periods",
      "flooding",
      "clots",
      "prolonged",
      "uterine",
      "fibroids",
      "anaemia",
      "iron",
      "excessive bleeding",
    ],
  },
  {
    name: "PCOS",
    aliases: ["polycystic ovary syndrome", "polycystic ovaries", "PCOD"],
    category: "Gynaecology",
    harrisons: {
      definition:
        "A heterogeneous endocrine disorder characterised by hyperandrogenism, oligo/anovulation, and polycystic ovarian morphology, often associated with insulin resistance.",
      classicSymptoms: [
        "Irregular or absent periods",
        "Hirsutism and acne",
        "Weight gain and obesity",
        "Infertility",
        "Scalp hair thinning (androgenic alopecia)",
      ],
      keySigns: [
        "Acanthosis nigricans (insulin resistance)",
        "Polycystic ovaries on ultrasound (≥12 follicles)",
        "Elevated LH:FSH ratio (>2:1)",
        "Elevated serum androgens",
      ],
      keyFeatures:
        "Rotterdam criteria (2/3): oligo-anovulation, clinical/biochemical hyperandrogenism, PCO morphology on USS. Metformin improves insulin sensitivity. OCP for cycle regulation and androgen suppression. Clomifene for ovulation induction.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 408",
    },
    keywords: [
      "PCOS",
      "polycystic",
      "ovary",
      "irregular periods",
      "hirsutism",
      "acne",
      "obesity",
      "insulin resistance",
      "androgen",
      "infertility",
      "anovulation",
    ],
  },

  // ── ENT ──
  {
    name: "Tonsillitis",
    aliases: ["tonsillar infection", "sore throat", "streptococcal throat"],
    category: "ENT",
    harrisons: {
      definition:
        "Inflammation of the palatine tonsils, most commonly due to Group A beta-haemolytic Streptococcus or viral infection, characterised by sore throat and constitutional symptoms.",
      classicSymptoms: [
        "Sore throat with difficulty swallowing (odynophagia)",
        "Fever and chills",
        "Headache",
        "Tonsillar exudate",
        "Tender cervical lymphadenopathy",
        "Trismus (peritonsillar abscess)",
      ],
      keySigns: [
        "Enlarged erythematous tonsils with or without exudate",
        "Anterior cervical lymphadenopathy",
        "Fever",
        "Palatal petechiae (Strep)",
      ],
      keyFeatures:
        "Centor/McIsaac criteria guide antibiotic use: exudate, tender anterior nodes, fever, no cough (each +1). Rapid strep test or throat swab confirms GAS. Penicillin V for 10 days. Tonsillectomy for ≥7 attacks/year.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 236",
    },
    keywords: [
      "tonsillitis",
      "tonsils",
      "sore throat",
      "streptococcal",
      "exudate",
      "lymphadenopathy",
      "fever",
      "swallowing",
      "throat",
      "quinsy",
    ],
  },
  {
    name: "Otitis Media",
    aliases: ["ear infection", "middle ear infection", "AOM"],
    category: "ENT",
    harrisons: {
      definition:
        "Infection and inflammation of the middle ear cleft, occurring predominantly in children, caused by bacterial or viral pathogens.",
      classicSymptoms: [
        "Ear pain (otalgia)",
        "Fever",
        "Hearing loss",
        "Ear discharge (if perforation)",
        "Irritability in infants",
        "Tugging at ear (infants)",
      ],
      keySigns: [
        "Erythematous, bulging, non-mobile tympanic membrane",
        "Otorrhoea (with perforation)",
        "Conductive hearing loss",
      ],
      keyFeatures:
        "S. pneumoniae, H. influenzae, and M. catarrhalis are common pathogens. Eustachian tube dysfunction predisposes. Most resolve spontaneously (watchful waiting). Amoxicillin if severe or no improvement. Grommets for recurrent or secretory OM.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 237",
    },
    keywords: [
      "otitis media",
      "ear infection",
      "otalgia",
      "ear pain",
      "discharge",
      "hearing loss",
      "tympanic",
      "eustachian",
      "children",
    ],
  },
  {
    name: "Allergic Rhinitis",
    aliases: ["hay fever", "nasal allergy", "rhinoconjunctivitis"],
    category: "ENT",
    harrisons: {
      definition:
        "IgE-mediated inflammation of the nasal mucosa triggered by inhaled allergens, characterised by sneezing, rhinorrhoea, nasal congestion, and pruritus.",
      classicSymptoms: [
        "Sneezing (paroxysmal)",
        "Watery rhinorrhoea",
        "Nasal congestion and obstruction",
        "Nasal and palatal itching",
        "Watery, itchy eyes (conjunctivitis)",
        "Post-nasal drip",
      ],
      keySigns: [
        "Pale, bluish, swollen nasal turbinates",
        "Allergic shiners",
        "Cobblestoning of posterior pharynx",
        "Elevated eosinophils and IgE",
      ],
      keyFeatures:
        "Perennial (house dust mite, pets) vs seasonal (pollen). Skin prick testing identifies allergens. Intranasal corticosteroids are first-line. Antihistamines for breakthrough symptoms. Allergen immunotherapy for refractory cases.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 347",
    },
    keywords: [
      "allergic rhinitis",
      "hay fever",
      "sneezing",
      "rhinorrhoea",
      "nasal",
      "congestion",
      "watery eyes",
      "pollen",
      "dust",
      "IgE",
      "pruritus",
      "conjunctivitis",
    ],
  },

  // ── METABOLIC ──
  {
    name: "Diabetes Mellitus",
    aliases: [
      "diabetes",
      "DM",
      "Type 2 diabetes",
      "Type 1 diabetes",
      "sugar disease",
    ],
    category: "Metabolic",
    harrisons: {
      definition:
        "A group of metabolic disorders characterised by hyperglycaemia resulting from defects in insulin secretion, insulin action, or both.",
      classicSymptoms: [
        "Polyuria",
        "Polydipsia",
        "Polyphagia",
        "Weight loss (Type 1)",
        "Fatigue",
        "Recurrent infections",
        "Blurred vision",
        "Slow wound healing",
      ],
      keySigns: [
        "Elevated fasting glucose (≥7 mmol/L)",
        "HbA1c ≥48 mmol/mol (6.5%)",
        "Glucose in urine",
        "Complications: retinopathy, neuropathy, nephropathy",
      ],
      keyFeatures:
        "Type 1: autoimmune beta-cell destruction, absolute insulin deficiency. Type 2: insulin resistance + relative deficiency, strongly linked to obesity. Complications: microvascular (retinopathy, nephropathy, neuropathy) and macrovascular (IHD, stroke, PVD).",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 397",
    },
    keywords: [
      "diabetes",
      "polyuria",
      "polydipsia",
      "polyphagia",
      "thirst",
      "urination",
      "glucose",
      "insulin",
      "sugar",
      "fatigue",
      "retinopathy",
      "neuropathy",
      "obesity",
    ],
  },
  {
    name: "Hypothyroidism",
    aliases: ["underactive thyroid", "myxoedema", "thyroid deficiency"],
    category: "Metabolic",
    harrisons: {
      definition:
        "Deficiency of thyroid hormone resulting in a generalised slowing of metabolic processes, most commonly due to Hashimoto's thyroiditis or iodine deficiency.",
      classicSymptoms: [
        "Fatigue and lethargy",
        "Weight gain despite poor appetite",
        "Cold intolerance",
        "Constipation",
        "Dry skin and hair loss",
        "Bradycardia",
        "Depression and cognitive slowing",
        "Menorrhagia",
      ],
      keySigns: [
        "Bradycardia",
        "Goitre (Hashimoto's)",
        "Periorbital puffiness",
        "Delayed relaxation of ankle jerk",
        "Myxoedema",
        "Elevated TSH, low free T4",
      ],
      keyFeatures:
        "Hashimoto's is autoimmune (anti-TPO antibodies). TSH is the best screening test — elevated in primary hypothyroidism. Levothyroxine replacement is the treatment. Myxoedema coma is a life-threatening emergency.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 376",
    },
    keywords: [
      "hypothyroidism",
      "thyroid",
      "fatigue",
      "cold intolerance",
      "weight gain",
      "constipation",
      "dry skin",
      "bradycardia",
      "TSH",
      "myxoedema",
      "goitre",
      "hair loss",
    ],
  },
  {
    name: "Obesity",
    aliases: ["overweight", "adiposity", "corpulence"],
    category: "Metabolic",
    harrisons: {
      definition:
        "Chronic metabolic disease characterised by excessive accumulation of body fat (BMI ≥30 kg/m²), associated with significant morbidity and mortality.",
      classicSymptoms: [
        "Excessive weight gain",
        "Dyspnoea on exertion",
        "Sleep apnoea and snoring",
        "Joint pain (weight-bearing joints)",
        "Fatigue",
        "Low self-esteem",
      ],
      keySigns: [
        "BMI ≥30 kg/m²",
        "Central adiposity (waist >102 cm men, >88 cm women)",
        "Hypertension and metabolic syndrome",
        "Acanthosis nigricans",
      ],
      keyFeatures:
        "Multifactorial: genetic predisposition, diet, physical inactivity, endocrine (hypothyroid, Cushing's). Complications: T2DM, IHD, OSA, NAFLD, OA, malignancy. Lifestyle modification is first-line; bariatric surgery for BMI >40 or >35 with comorbidities.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 400",
    },
    keywords: [
      "obesity",
      "overweight",
      "adiposity",
      "weight",
      "BMI",
      "metabolic",
      "insulin resistance",
      "hypertension",
      "sleep apnea",
      "joint pain",
      "fatigue",
    ],
  },
];

export const DIAGNOSIS_CATEGORIES = [
  "All",
  ...Array.from(new Set(DIAGNOSIS_DATABASE.map((d) => d.category))).sort(),
];

export function searchDiagnoses(query: string): DiagnosisEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return DIAGNOSIS_DATABASE.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.aliases.some((a) => a.toLowerCase().includes(q)) ||
      d.keywords.some((k) => k.toLowerCase().includes(q)),
  );
}
