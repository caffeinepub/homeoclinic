import type { CaseInput } from "./caseAnalysis";

export type InvestigationCategory =
  | "Haematology"
  | "Biochemistry"
  | "Imaging"
  | "Urine/Stool"
  | "Cardiology"
  | "Specialty";

export interface InvestigationSuggestion {
  name: string;
  category: InvestigationCategory;
  reasoning: string;
  reference: string;
  urgency: "routine" | "urgent" | "if_needed";
}

// ── Keyword sets for symptom cluster matching ─────────────────────────────────

const FEVER_KEYWORDS = [
  "fever",
  "febrile",
  "pyrexia",
  "high temperature",
  "chills",
  "rigor",
  "malaria",
  "typhoid",
  "widal",
  "dengue",
  "infection",
  "sepsis",
  "influenza",
];

const ANAEMIA_KEYWORDS = [
  "anaemia",
  "anemia",
  "pallor",
  "pale",
  "fatigue",
  "weakness",
  "tired",
  "exhaustion",
  "breathless",
  "dizziness",
  "fainting",
  "iron deficiency",
  "b12",
  "folate",
];

const JAUNDICE_KEYWORDS = [
  "jaundice",
  "icterus",
  "yellow",
  "yellowish",
  "liver",
  "hepatitis",
  "cholestasis",
  "bilirubin",
  "dark urine",
  "clay stool",
  "hepatomegaly",
  "cirrhosis",
];

const CARDIAC_KEYWORDS = [
  "chest pain",
  "angina",
  "palpitation",
  "hypertension",
  "hypertensive",
  "high blood pressure",
  "cardiac",
  "heart",
  "dyspnoea",
  "shortness of breath",
  "oedema",
  "edema",
  "swollen legs",
  "tachycardia",
  "bradycardia",
  "arrhythmia",
];

const DIABETES_KEYWORDS = [
  "diabetes",
  "diabetic",
  "excessive thirst",
  "polydipsia",
  "polyuria",
  "frequent urination",
  "sugar",
  "glycosuria",
  "hyperglycaemia",
  "hypoglycaemia",
  "craving sweets",
  "sweet cravings",
];

const THYROID_KEYWORDS = [
  "thyroid",
  "hypothyroid",
  "hyperthyroid",
  "goitre",
  "obesity",
  "weight gain",
  "weight loss",
  "cold intolerance",
  "heat intolerance",
  "palpitations",
  "dry skin",
  "hair fall",
  "constipation",
  "fatigue hypothyroid",
];

const JOINT_KEYWORDS = [
  "joint pain",
  "arthritis",
  "rheumatoid",
  "gout",
  "uric acid",
  "swollen joint",
  "stiffness",
  "synovitis",
  "spondylitis",
  "arthralgia",
  "polyarthritis",
  "bone pain",
];

const RESPIRATORY_KEYWORDS = [
  "cough",
  "breathless",
  "dyspnoea",
  "asthma",
  "bronchitis",
  "pneumonia",
  "haemoptysis",
  "tuberculosis",
  "tb",
  "wheezing",
  "sputum",
  "chest",
  "respiratory",
  "lung",
  "pleurisy",
];

const URINARY_KEYWORDS = [
  "urinary",
  "urine",
  "kidney",
  "renal",
  "nephritis",
  "hematuria",
  "haematuria",
  "burning urination",
  "frequent urination",
  "uti",
  "dysuria",
  "proteinuria",
  "oedema",
  "oliguria",
  "polyuria",
];

const ABDOMINAL_KEYWORDS = [
  "diarrhoea",
  "diarrhea",
  "dysentery",
  "abdomen",
  "abdominal",
  "stomach",
  "nausea",
  "vomiting",
  "bloating",
  "flatulence",
  "constipation",
  "indigestion",
  "peptic",
  "gastric",
  "colitis",
  "ibs",
];

const HEADACHE_KEYWORDS = [
  "headache",
  "migraine",
  "vertigo",
  "dizziness",
  "neurological",
  "convulsion",
  "epilepsy",
  "numbness",
  "paralysis",
  "weakness",
  "trembling",
  "neuro",
];

const SKIN_KEYWORDS = [
  "eczema",
  "psoriasis",
  "dermatitis",
  "urticaria",
  "hives",
  "allergy",
  "allergic",
  "skin eruption",
  "rash",
  "itching",
  "pruritus",
  "atopic",
];

const GYNAECOLOGY_KEYWORDS = [
  "menstrual",
  "menses",
  "amenorrhoea",
  "dysmenorrhoea",
  "pcos",
  "polycystic",
  "leucorrhoea",
  "uterus",
  "ovary",
  "pelvic",
  "infertility",
  "gynaecology",
  "gynecology",
  "irregular periods",
  "menopausal",
];

const PAEDIATRIC_KEYWORDS = [
  "child",
  "paediatric",
  "pediatric",
  "growth retardation",
  "delayed development",
  "dwarfism",
  "rickets",
  "malnutrition",
  "developmental delay",
];

const DEBILITY_KEYWORDS = [
  "debility",
  "general weakness",
  "loss of weight",
  "emaciation",
  "malaise",
  "prostration",
  "chronic fatigue",
  "anorexia",
  "cachexia",
];

// ── Utility: check if any keyword appears in the combined case text ────────────

function matchesAny(text: string, keywords: string[]): boolean {
  const lower = text.toLowerCase();
  return keywords.some((kw) => lower.includes(kw.toLowerCase()));
}

// ── Build combined text from CaseInput ────────────────────────────────────────

function buildCaseText(input: CaseInput): string {
  return [
    input.chiefComplaint,
    input.hpi,
    input.pastHistory,
    input.familyHistory,
    input.physicalGenerals,
    input.personalHistory,
    input.investigations,
    input.miasmaticAnalysis,
  ]
    .filter(Boolean)
    .join(" ");
}

// ── Main function ─────────────────────────────────────────────────────────────

export function suggestInvestigations(
  input: CaseInput,
): InvestigationSuggestion[] {
  const text = buildCaseText(input);
  if (!text.trim() || text.trim().length < 10) return [];

  const suggestions: InvestigationSuggestion[] = [];
  const added = new Set<string>();

  function add(s: InvestigationSuggestion) {
    if (!added.has(s.name)) {
      added.add(s.name);
      suggestions.push(s);
    }
  }

  // ── FEVER / INFECTION cluster ──────────────────────────────────────────────
  if (matchesAny(text, FEVER_KEYWORDS)) {
    add({
      name: "Complete Blood Count (CBC) with Differential",
      category: "Haematology",
      reasoning:
        "Fever with possible infection — CBC helps assess leucocytosis (bacterial infection), leucopenia (viral/typhoid), and haemoglobin status. Differential count differentiates bacterial vs. viral aetiology.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 19 — Approach to the Patient with Fever",
      urgency: "urgent",
    });
    add({
      name: "Erythrocyte Sedimentation Rate (ESR)",
      category: "Haematology",
      reasoning:
        "Elevated ESR is a non-specific marker of systemic inflammation and infection, useful for monitoring acute febrile illness and chronic inflammatory states.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 19 — Fever and the Acute Phase Response",
      urgency: "routine",
    });
    add({
      name: "C-Reactive Protein (CRP)",
      category: "Biochemistry",
      reasoning:
        "CRP rises rapidly in acute infection and inflammation. Differentiates bacterial from viral infections; useful for gauging severity and monitoring treatment response.",
      reference:
        "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 5 — Laboratory Reference Values",
      urgency: "routine",
    });
    if (matchesAny(text, ["malaria", "malarial", "rigor", "chills"])) {
      add({
        name: "Malarial Antigen (PfHRP2/pLDH Rapid Test)",
        category: "Haematology",
        reasoning:
          "Indicated in suspected malaria — especially with periodic fever, rigors, and chills. Rapid antigen test detects P. falciparum and P. vivax within 15 minutes.",
        reference:
          "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 219 — Malaria",
        urgency: "urgent",
      });
    }
    if (matchesAny(text, ["typhoid", "widal", "enteric"])) {
      add({
        name: "Widal Test / Typhidot",
        category: "Haematology",
        reasoning:
          "Indicated in suspected enteric fever (typhoid) with stepladder fever pattern, abdominal discomfort, and relative bradycardia. Typhidot (IgM) is more sensitive in early disease.",
        reference:
          "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 190 — Typhoid Fever",
        urgency: "urgent",
      });
    }
    add({
      name: "Urine Routine & Microscopy (R/E)",
      category: "Urine/Stool",
      reasoning:
        "Urine examination is essential in febrile illness to rule out urinary tract infection as a focus of infection, especially in children and women.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 130 — Urinary Tract Infections",
      urgency: "routine",
    });
  }

  // ── ANAEMIA / PALLOR / FATIGUE cluster ────────────────────────────────────
  if (matchesAny(text, ANAEMIA_KEYWORDS)) {
    add({
      name: "Complete Blood Count (CBC) with Differential",
      category: "Haematology",
      reasoning:
        "Essential for diagnosis and classification of anaemia — haemoglobin level, MCV (microcytic vs. macrocytic), MCH, and differential WBC count guide the aetiology.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 93 — Anaemia and Polycythaemia",
      urgency: "routine",
    });
    add({
      name: "Peripheral Blood Smear",
      category: "Haematology",
      reasoning:
        "Morphological examination of red cells identifies microcytic hypochromic (iron deficiency), macrocytic (B12/folate), sickle cells, or target cells, narrowing the diagnosis.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 77 — Disorders of the Haematopoietic System",
      urgency: "routine",
    });
    add({
      name: "Serum Iron, TIBC & Transferrin Saturation",
      category: "Biochemistry",
      reasoning:
        "Low serum iron with high TIBC confirms iron deficiency anaemia. Transferrin saturation below 16% is diagnostic. Essential before prescribing iron therapy.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 93 — Iron Deficiency Anaemia",
      urgency: "routine",
    });
    add({
      name: "Serum Ferritin",
      category: "Biochemistry",
      reasoning:
        "Best single test to confirm iron deficiency — low ferritin (<12 ng/mL) is diagnostic. Also elevated in inflammatory states, serving as an acute phase reactant.",
      reference: "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 93",
      urgency: "routine",
    });
    add({
      name: "Serum Vitamin B12 & Folate",
      category: "Biochemistry",
      reasoning:
        "Macrocytic anaemia with neurological symptoms (subacute combined degeneration) requires B12 estimation. Folate deficiency often accompanies poor nutrition or malabsorption.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 95 — Megaloblastic Anaemia",
      urgency: "routine",
    });
  }

  // ── JAUNDICE / LIVER cluster ───────────────────────────────────────────────
  if (matchesAny(text, JAUNDICE_KEYWORDS)) {
    add({
      name: "Liver Function Tests (LFT): SGOT, SGPT, ALP, GGT, Total & Direct Bilirubin, Total Protein, Albumin",
      category: "Biochemistry",
      reasoning:
        "LFT is the primary investigation for jaundice and liver disease. SGOT/SGPT elevation indicates hepatocellular damage; ALP/GGT elevation suggests cholestasis; bilirubin differentiates obstructive from hepatocellular causes.",
      reference:
        "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 22 — Liver and Biliary Tract",
      urgency: "urgent",
    });
    add({
      name: "HBsAg (Hepatitis B Surface Antigen)",
      category: "Biochemistry",
      reasoning:
        "Hepatitis B is a common cause of acute and chronic hepatitis with jaundice. HBsAg is the first serological marker to appear and confirms active hepatitis B infection.",
      reference:
        "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 22 — Viral Hepatitis",
      urgency: "urgent",
    });
    add({
      name: "Anti-HCV Antibody (Hepatitis C)",
      category: "Biochemistry",
      reasoning:
        "Hepatitis C is a major cause of chronic liver disease, cirrhosis, and hepatocellular carcinoma. Anti-HCV screening is essential in all jaundice cases.",
      reference:
        "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 22 — Hepatitis C",
      urgency: "routine",
    });
    add({
      name: "Ultrasound Abdomen (USG)",
      category: "Imaging",
      reasoning:
        "USG abdomen is the first-line imaging for jaundice — assesses liver size, echogenicity, bile duct dilatation (obstructive jaundice), gallstones, and portal hypertension.",
      reference:
        "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 22 — Investigation of Liver Disease",
      urgency: "urgent",
    });
  }

  // ── CARDIAC / HYPERTENSION / CHEST PAIN cluster ──────────────────────────
  if (matchesAny(text, CARDIAC_KEYWORDS)) {
    add({
      name: "Electrocardiogram (ECG / 12-Lead)",
      category: "Cardiology",
      reasoning:
        "Essential for any cardiac complaint — chest pain, palpitations, hypertension, or shortness of breath. Detects ischaemia, arrhythmias, conduction defects, and ventricular hypertrophy.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 267 — Approach to the Patient with Possible Cardiovascular Disease",
      urgency: "urgent",
    });
    add({
      name: "2D Echocardiogram (Echo)",
      category: "Cardiology",
      reasoning:
        "Echocardiogram evaluates valvular disease, wall motion abnormalities, ejection fraction, pericardial effusion, and structural cardiac defects. Indicated in chest pain, dyspnoea, and hypertension with target organ damage.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 270 — Echocardiography",
      urgency: "if_needed",
    });
    add({
      name: "Lipid Profile (TC, LDL, HDL, VLDL, Triglycerides)",
      category: "Biochemistry",
      reasoning:
        "Dyslipidaemia is a major risk factor for ischaemic heart disease. Fasting lipid profile is essential in all patients with chest pain, hypertension, or cardiovascular risk factors.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 291 — Disorders of Lipoprotein Metabolism",
      urgency: "routine",
    });
    add({
      name: "Renal Function Tests (RFT): BUN, Serum Creatinine, Uric Acid, Electrolytes (Na, K)",
      category: "Biochemistry",
      reasoning:
        "Hypertension causes and is caused by renal impairment. RFT assesses baseline renal function, detects hypertensive nephropathy, guides antihypertensive therapy, and monitors drug toxicity.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 295 — Hypertensive Vascular Disease",
      urgency: "routine",
    });
    add({
      name: "Chest X-Ray (PA View)",
      category: "Imaging",
      reasoning:
        "Chest X-ray assesses cardiac size (cardiomegaly), pulmonary oedema, pleural effusion, and mediastinal widening — all relevant in cardiac and respiratory complaints.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 267",
      urgency: "routine",
    });
  }

  // ── DIABETES cluster ──────────────────────────────────────────────────────
  if (matchesAny(text, DIABETES_KEYWORDS)) {
    add({
      name: "Fasting Blood Sugar (FBS)",
      category: "Biochemistry",
      reasoning:
        "FBS ≥126 mg/dL on two occasions confirms diabetes mellitus. Essential in any patient with excessive thirst, polyuria, weight loss, or family history of diabetes.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 396 — Diabetes Mellitus",
      urgency: "routine",
    });
    add({
      name: "Post-Prandial Blood Sugar (PPBS / 2-hour)",
      category: "Biochemistry",
      reasoning:
        "PPBS ≥200 mg/dL is diagnostic of diabetes. Detects impaired glucose tolerance (pre-diabetes) missed by fasting sugar alone. Essential for complete diabetes screening.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 396",
      urgency: "routine",
    });
    add({
      name: "HbA1c (Glycated Haemoglobin)",
      category: "Biochemistry",
      reasoning:
        "HbA1c reflects average blood glucose over 2–3 months. ≥6.5% is diagnostic of diabetes. Used to assess long-term glycaemic control and treatment efficacy.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 396",
      urgency: "routine",
    });
    add({
      name: "Urine Sugar & Ketones (Routine Examination)",
      category: "Urine/Stool",
      reasoning:
        "Glycosuria with ketonuria indicates poor metabolic control or diabetic ketoacidosis. Baseline urine examination is mandatory in all newly diagnosed diabetics.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 396",
      urgency: "routine",
    });
  }

  // ── THYROID cluster ───────────────────────────────────────────────────────
  if (matchesAny(text, THYROID_KEYWORDS)) {
    add({
      name: "Thyroid Function Tests: T3, T4 (Free T4), TSH",
      category: "Biochemistry",
      reasoning:
        "TSH is the most sensitive screening test for thyroid dysfunction. Low TSH with high T3/T4 confirms hyperthyroidism; high TSH with low free T4 confirms hypothyroidism. Both present with fatigue, weight changes, and heat/cold intolerance.",
      reference:
        "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 18 — Endocrine Disease",
      urgency: "routine",
    });
    add({
      name: "Anti-TPO Antibodies (Thyroid Peroxidase)",
      category: "Biochemistry",
      reasoning:
        "Elevated Anti-TPO confirms autoimmune thyroiditis (Hashimoto's disease), the most common cause of hypothyroidism. Also elevated in Graves' disease. Essential for long-term thyroid management.",
      reference:
        "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 18 — Thyroid Disorders",
      urgency: "if_needed",
    });
    add({
      name: "Thyroid Ultrasound",
      category: "Imaging",
      reasoning:
        "Ultrasound assesses thyroid size, nodules, goitre, and vascularity. Indicated when a thyroid nodule or goitre is palpated; guides fine-needle aspiration if needed.",
      reference:
        "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 18",
      urgency: "if_needed",
    });
  }

  // ── JOINT / ARTHRITIS cluster ─────────────────────────────────────────────
  if (matchesAny(text, JOINT_KEYWORDS)) {
    add({
      name: "ESR & CRP",
      category: "Haematology",
      reasoning:
        "Elevated ESR and CRP indicate active joint inflammation. Help distinguish inflammatory arthritis (RA, spondylitis) from non-inflammatory conditions (osteoarthritis).",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 393 — Approach to Articular and Musculoskeletal Disorders",
      urgency: "routine",
    });
    add({
      name: "Rheumatoid Factor (RF) & Anti-CCP Antibodies",
      category: "Biochemistry",
      reasoning:
        "RF is positive in ~80% of rheumatoid arthritis; Anti-CCP has higher specificity (>95%). Together, they confirm rheumatoid arthritis. Essential in polyarthritis with morning stiffness.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 380 — Rheumatoid Arthritis",
      urgency: "routine",
    });
    add({
      name: "Serum Uric Acid",
      category: "Biochemistry",
      reasoning:
        "Elevated uric acid (>7 mg/dL in men, >6 mg/dL in women) with acute monoarthritis (especially great toe, ankle, knee) is consistent with gout. Essential for diagnosis and dietary guidance.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 431 — Gout",
      urgency: "routine",
    });
    add({
      name: "ANA (Antinuclear Antibody)",
      category: "Biochemistry",
      reasoning:
        "ANA screening is essential in polyarthritis with systemic features (rash, renal involvement, serositis) to rule out systemic lupus erythematosus and other connective tissue disorders.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 378 — SLE",
      urgency: "if_needed",
    });
    add({
      name: "X-Ray of Affected Joints",
      category: "Imaging",
      reasoning:
        "X-ray identifies joint space narrowing, erosions, periarticular osteoporosis (RA), osteophytes (OA), and calcification (gout tophi). Baseline films are essential in all chronic arthritis.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 393",
      urgency: "routine",
    });
  }

  // ── RESPIRATORY cluster ───────────────────────────────────────────────────
  if (matchesAny(text, RESPIRATORY_KEYWORDS)) {
    add({
      name: "Chest X-Ray (PA View)",
      category: "Imaging",
      reasoning:
        "First-line investigation in all respiratory complaints — assesses consolidation (pneumonia), pleural effusion, hyperinflation (COPD/asthma), cavitation (TB), and malignancy.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 306 — Approach to the Patient with Respiratory Disease",
      urgency: "urgent",
    });
    add({
      name: "Complete Blood Count (CBC)",
      category: "Haematology",
      reasoning:
        "CBC in respiratory illness — leucocytosis suggests bacterial pneumonia; eosinophilia in asthma/tropical eosinophilia; lymphocytosis in viral or TB infection.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 306",
      urgency: "routine",
    });
    if (matchesAny(text, ["tuberculosis", "tb", "haemoptysis", "sputum"])) {
      add({
        name: "Sputum AFB Smear & Culture (for TB)",
        category: "Specialty",
        reasoning:
          "Sputum for acid-fast bacilli (AFB) is the primary investigation for suspected pulmonary tuberculosis. Three consecutive morning samples increase sensitivity. Culture confirms drug sensitivity.",
        reference:
          "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 173 — Tuberculosis",
        urgency: "urgent",
      });
    }
    if (matchesAny(text, ["asthma", "bronchitis", "wheezing", "copd"])) {
      add({
        name: "Spirometry / Pulmonary Function Test (PFT)",
        category: "Specialty",
        reasoning:
          "PFT is the gold standard for diagnosing and staging asthma and COPD. FEV1/FVC ratio below 0.7 post-bronchodilator confirms obstructive disease; reversibility >12% confirms asthma.",
        reference:
          "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 309 — Asthma; Ch. 314 — COPD",
        urgency: "if_needed",
      });
    }
  }

  // ── URINARY / RENAL cluster ───────────────────────────────────────────────
  if (matchesAny(text, URINARY_KEYWORDS)) {
    add({
      name: "Urine Routine & Microscopy (R/E)",
      category: "Urine/Stool",
      reasoning:
        "Urine R/E is the first investigation for any urinary complaint. Detects haematuria, proteinuria, pyuria (infection), casts (renal disease), and glycosuria (diabetes).",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 335 — Approach to the Patient with Renal Disease",
      urgency: "urgent",
    });
    add({
      name: "Urine Culture & Sensitivity (C/S)",
      category: "Urine/Stool",
      reasoning:
        "Mandatory in suspected UTI with dysuria and frequency — identifies the causative organism and guides antibiotic selection. Colony count >10^5/mL confirms significant bacteriuria.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 130 — Urinary Tract Infections",
      urgency: "urgent",
    });
    add({
      name: "Renal Function Tests (RFT): BUN, Serum Creatinine, Uric Acid, Electrolytes",
      category: "Biochemistry",
      reasoning:
        "RFT assesses glomerular filtration rate and tubular function. Elevated creatinine and BUN indicate impaired renal function. Essential in all renal and urinary complaints.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 335",
      urgency: "routine",
    });
    add({
      name: "Ultrasound KUB (Kidneys, Ureters, Bladder)",
      category: "Imaging",
      reasoning:
        "USG KUB is the first-line imaging for renal colic, haematuria, and obstructive uropathy — detects renal calculi, hydronephrosis, cysts, renal parenchymal disease, and bladder lesions.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 335",
      urgency: "routine",
    });
  }

  // ── ABDOMINAL / GASTROINTESTINAL cluster ──────────────────────────────────
  if (matchesAny(text, ABDOMINAL_KEYWORDS)) {
    add({
      name: "Stool Routine & Microscopy (R/E)",
      category: "Urine/Stool",
      reasoning:
        "Stool R/E detects parasitic infestations (Giardia, Entamoeba, helminths), occult blood, mucus, and pus cells in diarrhoea and dysentery. Essential in all gastrointestinal complaints.",
      reference:
        "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 22 — Gastrointestinal Disease",
      urgency: "routine",
    });
    add({
      name: "Stool Culture & Sensitivity",
      category: "Urine/Stool",
      reasoning:
        "Identifies bacterial enteropathogens (Salmonella, Shigella, Campylobacter, E. coli) in infectious diarrhoea and dysentery. Guides appropriate antimicrobial therapy.",
      reference:
        "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 22",
      urgency: "if_needed",
    });
    add({
      name: "Ultrasound Abdomen (USG)",
      category: "Imaging",
      reasoning:
        "USG abdomen is the first-line imaging for abdominal pain, hepatomegaly, splenomegaly, ascites, and cholecystitis. Assesses liver, gallbladder, pancreas, spleen, kidneys, and bowel.",
      reference:
        "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 22",
      urgency: "routine",
    });
    add({
      name: "Liver Function Tests (LFT)",
      category: "Biochemistry",
      reasoning:
        "LFT is warranted in abdominal complaints with jaundice, hepatomegaly, or right upper quadrant pain. SGOT/SGPT elevation confirms hepatocellular disease.",
      reference:
        "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 22",
      urgency: "if_needed",
    });
  }

  // ── HEADACHE / NEUROLOGICAL cluster ──────────────────────────────────────
  if (matchesAny(text, HEADACHE_KEYWORDS)) {
    add({
      name: "Complete Blood Count (CBC)",
      category: "Haematology",
      reasoning:
        "CBC in headache — anaemia causes throbbing headaches; polycythaemia causes headaches and visual changes; leucocytosis suggests meningitis or encephalitis.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 22 — Headache",
      urgency: "routine",
    });
    add({
      name: "Blood Sugar (Fasting & Random)",
      category: "Biochemistry",
      reasoning:
        "Hypoglycaemia and hyperglycaemia are important treatable causes of headache and neurological symptoms. Blood sugar measurement is mandatory in all headache evaluations.",
      reference: "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 22",
      urgency: "urgent",
    });
    add({
      name: "Blood Pressure Measurement",
      category: "Cardiology",
      reasoning:
        "Hypertension is a common and serious cause of headache, especially occipital morning headaches. Blood pressure >180/120 mmHg can cause hypertensive encephalopathy.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 295 — Hypertension",
      urgency: "urgent",
    });
    if (
      matchesAny(text, [
        "sudden headache",
        "worst headache",
        "neurological",
        "convulsion",
        "seizure",
        "paralysis",
        "numbness",
      ])
    ) {
      add({
        name: "CT Scan Head (Non-Contrast)",
        category: "Imaging",
        reasoning:
          "Urgent CT head is indicated in sudden severe headache (thunderclap), progressive neurological deficits, seizures, or suspected intracranial haemorrhage. Rules out space-occupying lesions.",
        reference:
          "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 22 — Approach to Headache",
        urgency: "urgent",
      });
    }
  }

  // ── SKIN / ALLERGY cluster ────────────────────────────────────────────────
  if (matchesAny(text, SKIN_KEYWORDS)) {
    add({
      name: "CBC with Absolute Eosinophil Count (AEC)",
      category: "Haematology",
      reasoning:
        "Eosinophilia (>500/μL) confirms atopic/allergic disease, parasitic infestation, or drug hypersensitivity. Essential in eczema, urticaria, and asthma to assess allergic burden.",
      reference:
        "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 28 — Skin Disorders",
      urgency: "routine",
    });
    add({
      name: "Total IgE Level",
      category: "Biochemistry",
      reasoning:
        "Elevated total IgE confirms atopic constitution underlying eczema, allergic rhinitis, and asthma. Guides immunotherapy decisions and monitoring in severe atopic disease.",
      reference:
        "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 28",
      urgency: "if_needed",
    });
    if (
      matchesAny(text, [
        "contact",
        "occupational",
        "patch test",
        "contact dermatitis",
      ])
    ) {
      add({
        name: "Patch Test (for Contact Dermatitis)",
        category: "Specialty",
        reasoning:
          "Patch testing identifies specific allergens causing contact dermatitis — nickel, fragrances, rubber, preservatives. Essential for occupational and contact skin disease.",
        reference:
          "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 28 — Contact Dermatitis",
        urgency: "if_needed",
      });
    }
  }

  // ── GYNAECOLOGICAL cluster ────────────────────────────────────────────────
  if (matchesAny(text, GYNAECOLOGY_KEYWORDS)) {
    add({
      name: "Pelvic Ultrasound (Transabdominal / Transvaginal)",
      category: "Imaging",
      reasoning:
        "Pelvic USG is the first-line imaging for menstrual disorders, pelvic pain, PCOS, ovarian cysts, fibroid uterus, and endometriosis. Assesses uterine size, endometrial thickness, and ovarian morphology.",
      reference:
        "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 16 — Reproductive Medicine",
      urgency: "routine",
    });
    add({
      name: "Complete Blood Count (CBC)",
      category: "Haematology",
      reasoning:
        "Menorrhagia commonly causes iron deficiency anaemia. CBC assesses haemoglobin levels and guides management of menstrual blood loss.",
      reference:
        "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 16",
      urgency: "routine",
    });
    add({
      name: "Thyroid Function Tests (T3, T4, TSH)",
      category: "Biochemistry",
      reasoning:
        "Thyroid dysfunction is a common and often overlooked cause of menstrual irregularities, infertility, and dysmenorrhoea. Thyroid screening is mandatory in all menstrual disorders.",
      reference:
        "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 16 & Ch. 18",
      urgency: "routine",
    });
    if (
      matchesAny(text, [
        "pcos",
        "polycystic",
        "infertility",
        "amenorrhoea",
        "irregular periods",
        "hirsutism",
      ])
    ) {
      add({
        name: "Hormonal Assay: FSH, LH, Prolactin, Oestradiol, AMH",
        category: "Biochemistry",
        reasoning:
          "Hormonal profile is essential in PCOS, amenorrhoea, and infertility. Elevated LH/FSH ratio (>2:1) with polycystic ovaries confirms PCOS. Elevated prolactin explains amenorrhoea and galactorrhoea.",
        reference:
          "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 16",
        urgency: "routine",
      });
    }
  }

  // ── PAEDIATRIC / DEVELOPMENTAL cluster ───────────────────────────────────
  if (matchesAny(text, PAEDIATRIC_KEYWORDS)) {
    add({
      name: "Complete Blood Count (CBC)",
      category: "Haematology",
      reasoning:
        "CBC assesses anaemia (iron deficiency, nutritional), infection, and haematological disorders common in paediatric growth retardation and developmental delay.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 401 — Growth Disorders",
      urgency: "routine",
    });
    add({
      name: "Thyroid Function Tests (T3, T4, TSH)",
      category: "Biochemistry",
      reasoning:
        "Congenital hypothyroidism and acquired hypothyroidism are important treatable causes of growth retardation and developmental delay in children.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 401",
      urgency: "routine",
    });
    add({
      name: "X-Ray Wrist / Knee (Bone Age)",
      category: "Imaging",
      reasoning:
        "Bone age assessment by X-ray is essential in short stature and growth retardation. Bone age significantly less than chronological age suggests growth hormone deficiency or hypothyroidism.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 401",
      urgency: "if_needed",
    });
    add({
      name: "Serum Calcium, Phosphorus & Alkaline Phosphatase",
      category: "Biochemistry",
      reasoning:
        "Low calcium/phosphorus with elevated ALP suggests rickets (vitamin D deficiency) — common in children with bony deformities and growth failure.",
      reference:
        "Harrison's Principles of Internal Medicine, 20th Ed., Ch. 403 — Rickets",
      urgency: "routine",
    });
  }

  // ── GENERAL DEBILITY cluster ──────────────────────────────────────────────
  if (matchesAny(text, DEBILITY_KEYWORDS)) {
    add({
      name: "Complete Blood Count (CBC)",
      category: "Haematology",
      reasoning:
        "CBC screens for anaemia, infection, and haematological malignancy as causes of general debility, fatigue, and unexplained weight loss.",
      reference:
        "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 1 — Approach to the Patient",
      urgency: "routine",
    });
    add({
      name: "ESR",
      category: "Haematology",
      reasoning:
        "Markedly elevated ESR (>100 mm/hr) in debility and weight loss warrants investigation for malignancy, tuberculosis, or chronic inflammatory disease.",
      reference:
        "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 1",
      urgency: "routine",
    });
    add({
      name: "Blood Sugar (Fasting)",
      category: "Biochemistry",
      reasoning:
        "Uncontrolled diabetes causes profound weakness, weight loss, and fatigue. Fasting blood sugar is a mandatory screening test in any debilitated patient.",
      reference:
        "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 1",
      urgency: "routine",
    });
    add({
      name: "Urine Routine & Microscopy",
      category: "Urine/Stool",
      reasoning:
        "Urine R/E screens for occult UTI, proteinuria (renal disease), and glycosuria (diabetes) as underlying causes of general debility.",
      reference:
        "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 1",
      urgency: "routine",
    });
    add({
      name: "Liver Function Tests (LFT)",
      category: "Biochemistry",
      reasoning:
        "Liver disease (hepatitis, cirrhosis) is a common cause of general debility, fatigue, and weight loss. LFT screens for hepatocellular dysfunction.",
      reference:
        "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 1",
      urgency: "if_needed",
    });
    add({
      name: "Thyroid Function Tests (TSH, Free T4)",
      category: "Biochemistry",
      reasoning:
        "Hypothyroidism is a classic cause of unexplained fatigue, weight gain, and general debility. TSH is the single most sensitive screening test.",
      reference:
        "Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 1 & Ch. 18",
      urgency: "routine",
    });
  }

  return suggestions;
}
