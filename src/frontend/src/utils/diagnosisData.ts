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
  // ── ACUTE ──
  {
    name: "Common Fever",
    aliases: ["fever", "pyrexia", "high temperature", "febrile illness"],
    category: "Acute",
    harrisons: {
      definition:
        "A regulated rise in core body temperature above 38.3°C (101°F), driven by pyrogens acting on the hypothalamic thermoregulatory centre. Fever is a symptom, not a diagnosis.",
      classicSymptoms: [
        "Core temperature > 38.3°C",
        "Chills and rigors",
        "Profuse sweating",
        "Headache and myalgia",
        "Malaise and anorexia",
      ],
      keySigns: [
        "Tachycardia (pulse rises ~10 bpm per °C)",
        "Flushed warm skin or cold clammy skin during rigor",
        "Coated tongue, concentrated urine",
      ],
      keyFeatures:
        "Fever pattern (intermittent, remittent, continuous) aids diagnosis. Investigate for focus of infection. Antipyretics (paracetamol/NSAIDs) provide symptomatic relief. Investigate if > 7 days (fever of unknown origin).",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 16; Davidson's Principles, 23rd Ed., Ch. 6",
    },
    keywords: [
      "fever",
      "pyrexia",
      "temperature",
      "rigor",
      "chills",
      "febrile",
      "high temp",
      "hyperthermia",
    ],
  },
  {
    name: "Common Cold",
    aliases: [
      "cold",
      "rhinitis",
      "URTI",
      "upper respiratory tract infection",
      "coryza",
    ],
    category: "Acute",
    harrisons: {
      definition:
        "Acute, self-limiting viral infection of the upper respiratory tract, most commonly caused by rhinoviruses, characterised by nasal symptoms and mild systemic upset.",
      classicSymptoms: [
        "Nasal congestion and profuse watery rhinorrhoea",
        "Sneezing and nasal irritation",
        "Sore throat (pharyngitis)",
        "Mild headache",
        "Low-grade fever (more common in children)",
      ],
      keySigns: [
        "Erythematous nasal mucosa",
        "Clear to mucopurulent nasal discharge",
        "Mild pharyngeal injection",
      ],
      keyFeatures:
        "Rhinovirus accounts for > 50% of cases. Incubation 1–3 days; illness lasts 7–10 days. No effective antiviral therapy; management is symptomatic. Secondary bacterial sinusitis or otitis media may complicate.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 202; Davidson's 23rd Ed., Ch. 19",
    },
    keywords: [
      "cold",
      "coryza",
      "rhinitis",
      "nasal",
      "runny nose",
      "sneezing",
      "URTI",
      "rhinorrhea",
      "blocked nose",
    ],
  },
  {
    name: "Influenza",
    aliases: ["flu", "viral fever", "grippe", "influenza A", "influenza B"],
    category: "Acute",
    harrisons: {
      definition:
        "Acute respiratory illness caused by influenza A or B virus, characterised by abrupt onset of systemic and respiratory symptoms, with epidemic and pandemic potential.",
      classicSymptoms: [
        "Abrupt onset high fever (38–41°C) with rigors",
        "Severe myalgia and arthralgia",
        "Frontal headache",
        "Dry, hacking cough",
        "Profound malaise and prostration",
      ],
      keySigns: [
        "High fever with flushed face",
        "Injected conjunctivae and pharynx",
        "Tachycardia; tachypnoea if complicated",
      ],
      keyFeatures:
        "Differentiating feature from common cold: abrupt onset and severe systemic symptoms. Complications include primary viral pneumonia, secondary bacterial pneumonia, myocarditis, encephalitis. Oseltamivir (Tamiflu) effective if started within 48 h.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 203; Davidson's 23rd Ed., Ch. 19",
    },
    keywords: [
      "influenza",
      "flu",
      "grippe",
      "myalgia",
      "headache",
      "fever",
      "prostration",
      "viral fever",
      "cough",
    ],
  },
  {
    name: "Acute Gastroenteritis",
    aliases: [
      "stomach flu",
      "food poisoning",
      "gastro",
      "diarrhea vomiting",
      "vomiting diarrhea",
    ],
    category: "Acute",
    harrisons: {
      definition:
        "Acute inflammation of the stomach and intestines, typically caused by viral (norovirus, rotavirus) or bacterial (Salmonella, E. coli) pathogens, presenting with nausea, vomiting, and diarrhoea.",
      classicSymptoms: [
        "Nausea and vomiting",
        "Watery diarrhoea (non-bloody in viral, may be bloody in bacterial)",
        "Cramping abdominal pain",
        "Fever (mild to moderate)",
        "Dehydration, thirst, oliguria",
      ],
      keySigns: [
        "Diffuse abdominal tenderness (mild)",
        "Hyperactive bowel sounds",
        "Signs of dehydration (dry mucosa, reduced skin turgor, sunken eyes)",
      ],
      keyFeatures:
        "Oral rehydration is the cornerstone of management. Antibiotics indicated for severe bacterial gastroenteritis (cholera, Shigella). ETEC is the commonest cause of traveller's diarrhoea. Rotavirus is the leading cause in children under 5.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 158; Davidson's 23rd Ed., Ch. 22",
    },
    keywords: [
      "gastroenteritis",
      "diarrhea",
      "vomiting",
      "food poisoning",
      "nausea",
      "stomach",
      "dehydration",
      "norovirus",
      "rotavirus",
    ],
  },
  {
    name: "Urinary Tract Infection",
    aliases: [
      "UTI",
      "cystitis",
      "dysuria",
      "bladder infection",
      "urinary infection",
    ],
    category: "Acute",
    harrisons: {
      definition:
        "Microbial infection of any part of the urinary tract; cystitis denotes bladder infection while pyelonephritis involves the upper tract. E. coli is responsible for > 80% of community-acquired cases.",
      classicSymptoms: [
        "Dysuria (burning/stinging on urination)",
        "Urinary frequency and urgency",
        "Suprapubic pain or pressure",
        "Haematuria (visible or microscopic)",
        "Foul-smelling or cloudy urine",
      ],
      keySigns: [
        "Suprapubic tenderness",
        "Costovertebral angle tenderness (upper UTI/pyelonephritis)",
        "Fever and rigors (upper tract involvement)",
      ],
      keyFeatures:
        "Urinalysis showing leukocyte esterase, nitrites, and pyuria supports diagnosis. Urine culture confirms. Short-course nitrofurantoin or trimethoprim for uncomplicated cystitis. Recurrent UTIs in women warrant further investigation.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 130; Davidson's 23rd Ed., Ch. 17",
    },
    keywords: [
      "UTI",
      "cystitis",
      "dysuria",
      "frequency",
      "urgency",
      "haematuria",
      "bladder",
      "burning urination",
      "suprapubic pain",
    ],
  },
  {
    name: "Acute Tonsillitis",
    aliases: [
      "tonsillitis",
      "sore throat",
      "strep throat",
      "pharyngotonsillitis",
    ],
    category: "Acute",
    harrisons: {
      definition:
        "Acute infection and inflammation of the palatine tonsils, predominantly caused by Group A Streptococcus (GAS) or viral pathogens (adenovirus, EBV), presenting with sore throat, fever, and tonsillar exudate.",
      classicSymptoms: [
        "Severe sore throat, worse on swallowing",
        "Fever (often > 38.5°C)",
        "Odynophagia (painful swallowing)",
        "Tender cervical lymphadenopathy",
        "Muffled voice ('hot potato voice') in severe cases",
      ],
      keySigns: [
        "Erythematous, swollen tonsils",
        "Tonsillar exudate (yellow-white patches)",
        "Tender anterior cervical lymph nodes",
      ],
      keyFeatures:
        "Centor/McIsaac score aids decision for antibiotics. GAS tonsillitis treated with penicillin V (10 days) to prevent rheumatic fever. Infectious mononucleosis (EBV) mimics GAS tonsillitis — avoid ampicillin (causes rash). Peritonsillar abscess is a complication.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 27; Davidson's 23rd Ed., Ch. 19",
    },
    keywords: [
      "tonsillitis",
      "sore throat",
      "strep",
      "tonsillar exudate",
      "odynophagia",
      "pharyngitis",
      "fever",
      "cervical nodes",
    ],
  },
  {
    name: "Conjunctivitis",
    aliases: ["pink eye", "eye infection", "red eye", "conjunctival infection"],
    category: "Acute",
    harrisons: {
      definition:
        "Inflammation of the conjunctiva caused by bacterial, viral, or allergic stimuli, characterised by conjunctival injection, discharge, and ocular discomfort.",
      classicSymptoms: [
        "Red, injected eye(s)",
        "Mucopurulent or watery discharge",
        "Gritty, foreign-body sensation",
        "Eyelid crusting (especially on waking)",
        "Itching (prominent in allergic type)",
      ],
      keySigns: [
        "Conjunctival hyperaemia (bulbar and tarsal)",
        "Papillae (allergic/bacterial) or follicles (viral)",
        "Purulent discharge (bacterial) or clear watery (viral/allergic)",
      ],
      keyFeatures:
        "Bacterial conjunctivitis (S. aureus, H. influenzae): purulent discharge, responds to topical antibiotics. Viral (adenovirus): watery discharge, pre-auricular lymphadenopathy, highly contagious. Allergic: bilateral, intensely itchy, associated with atopy. Gonococcal conjunctivitis requires systemic treatment.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 40; Davidson's 23rd Ed., Ch. 28",
    },
    keywords: [
      "conjunctivitis",
      "pink eye",
      "red eye",
      "eye discharge",
      "itching eye",
      "watery eye",
      "conjunctival injection",
    ],
  },
  {
    name: "Acute Urinary Tract Infection (UTI)",
    aliases: [
      "cystitis",
      "bladder infection",
      "UTI",
      "urinary infection",
      "uncomplicated UTI",
    ],
    category: "Acute",
    harrisons: {
      definition:
        "Uncomplicated lower urinary tract infection (cystitis) caused predominantly by Escherichia coli and other Enterobacteriaceae, presenting with dysuria, frequency, and urgency without systemic features.",
      classicSymptoms: [
        "Dysuria (burning or pain on urination)",
        "Increased urinary frequency and urgency",
        "Suprapubic pain or discomfort",
        "Cloudy, offensive-smelling urine",
        "Haematuria (in haemorrhagic cystitis)",
        "Low-grade fever (uncommon in uncomplicated cystitis)",
      ],
      keySigns: [
        "Suprapubic tenderness on palpation",
        "Urine dipstick: nitrites and leucocyte esterase positive",
        "Pyuria on urine microscopy (>10 WBC/hpf)",
        "Urine culture: ≥10⁵ CFU/mL (E. coli most common)",
      ],
      keyFeatures:
        "Uncomplicated UTI affects predominantly women; E. coli accounts for 80–85% of cases. Distinguish from pyelonephritis (fever, loin pain, rigors) which requires longer antibiotic courses. In pregnancy, even asymptomatic bacteriuria must be treated. Recurrent UTIs require investigation for structural anomaly. Homeopathic remedies: Cantharis (intolerable burning, urging), Apis mellifica (stinging pain, scanty urine), Sarsaparilla (pain at end of urination). References: Harrison's 21st Ed. Ch. 130; Davidson's 23rd Ed. Ch. 17; Alagappan's Manual of Practical Medicine 5th Ed.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 130; Davidson's 23rd Ed., Ch. 17; Alagappan's Manual of Practical Medicine",
    },
    keywords: [
      "UTI",
      "cystitis",
      "urinary infection",
      "dysuria",
      "burning urination",
      "bladder infection",
      "urinary tract",
      "frequent urination",
    ],
  },
  {
    name: "Acute Otitis Media",
    aliases: ["ear infection", "middle ear infection", "AOM", "otitis media"],
    category: "Acute",
    harrisons: {
      definition:
        "Acute bacterial or viral infection of the middle ear cavity, characterised by otalgia, fever, and otoscopic evidence of middle ear inflammation, most common in children under 5 years.",
      classicSymptoms: [
        "Severe otalgia (ear pain), especially in children",
        "Fever (often >38.5°C)",
        "Irritability and crying in infants (pulling at ear)",
        "Hearing loss or muffled hearing",
        "Otorrhoea if tympanic membrane perforates",
        "Preceding upper respiratory tract infection",
      ],
      keySigns: [
        "Bulging, erythematous tympanic membrane on otoscopy",
        "Loss of tympanic membrane light reflex",
        "Reduced tympanic membrane mobility on pneumatic otoscopy",
        "Conductive hearing loss on audiometry",
      ],
      keyFeatures:
        "Streptococcus pneumoniae, Haemophilus influenzae, and Moraxella catarrhalis are the commonest pathogens. Many cases are viral and self-limiting; watchful waiting is appropriate for mild cases in children ≥2 years. Antibiotics (amoxicillin) are indicated for severe or bilateral disease and children <2 years. Complications include mastoiditis, labyrinthitis, and meningitis. Homeopathic remedies: Pulsatilla (bland discharge, clingy child, worse warm room), Belladonna (sudden high fever, throbbing pain), Chamomilla (pain intolerable, screaming child). References: Harrison's 21st Ed. Ch. 46; Davidson's 23rd Ed. Ch. 28; Alagappan's.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 46; Davidson's 23rd Ed., Ch. 28; Alagappan's Manual of Practical Medicine",
    },
    keywords: [
      "otitis media",
      "ear infection",
      "ear pain",
      "otalgia",
      "middle ear",
      "AOM",
      "child ear pain",
      "hearing loss",
    ],
  },
  {
    name: "Acute Sinusitis",
    aliases: [
      "sinus infection",
      "sinusitis",
      "rhinosinusitis",
      "acute bacterial rhinosinusitis",
      "ABRS",
    ],
    category: "Acute",
    harrisons: {
      definition:
        "Acute inflammation of the paranasal sinuses (maxillary, frontal, ethmoid, or sphenoid) of less than 4 weeks' duration, most commonly following viral upper respiratory infection, with bacterial superinfection in 0.5–2% of cases.",
      classicSymptoms: [
        "Facial pain or pressure (worse on bending forward)",
        "Nasal congestion and purulent nasal discharge",
        "Hyposmia or anosmia",
        "Toothache or cheek pain (maxillary sinusitis)",
        "Headache (frontal, periorbital, or vertex)",
        "Post-nasal drip with cough and sore throat",
      ],
      keySigns: [
        "Tenderness over affected sinus on palpation/percussion",
        "Purulent nasal discharge on anterior rhinoscopy",
        "Mucosal oedema and nasal polyps if chronic",
        "CT sinuses: air-fluid levels, mucosal thickening",
      ],
      keyFeatures:
        "Viral rhinosinusitis is self-limiting (7–10 days); bacterial sinusitis is suggested by symptoms >10 days without improvement, severe symptoms from onset, or double-worsening (initial improvement then relapse). S. pneumoniae, H. influenzae, and M. catarrhalis are commonest bacteria. Complications: orbital cellulitis, meningitis, cavernous sinus thrombosis. Decongestants, saline irrigation, and analgesics suffice for most cases; amoxicillin-clavulanate for confirmed bacterial cases. Homeopathic: Kali bichromicum (thick ropy discharge, post-nasal drip, sinus pain), Hydrastis (thick yellow discharge), Pulsatilla (bland discharge, no thirst).",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 46; Davidson's 23rd Ed., Ch. 28; Alagappan's Manual of Practical Medicine",
    },
    keywords: [
      "sinusitis",
      "sinus infection",
      "facial pain",
      "nasal congestion",
      "rhinosinusitis",
      "sinus headache",
      "purulent discharge",
      "paranasal sinus",
    ],
  },
  {
    name: "Acute Bronchitis",
    aliases: [
      "chest cold",
      "bronchitis",
      "lower respiratory infection",
      "tracheobronchitis",
    ],
    category: "Acute",
    harrisons: {
      definition:
        "Acute self-limiting inflammation of the tracheobronchial tree, predominantly of viral aetiology, characterised by cough (with or without sputum) lasting up to 3 weeks in an otherwise healthy individual.",
      classicSymptoms: [
        "Productive cough (initially dry, then purulent-appearing sputum)",
        "Low-grade fever and malaise",
        "Retrosternal chest discomfort on coughing",
        "Dyspnoea on exertion (mild)",
        "Preceding upper respiratory tract symptoms (coryza, sore throat)",
        "Wheeze or mild breathlessness",
      ],
      keySigns: [
        "Scattered rhonchi or wheeze on auscultation",
        "Normal or slightly elevated respiratory rate",
        "Clear chest X-ray (distinguishes from pneumonia)",
        "Normal oxygen saturation",
      ],
      keyFeatures:
        "Viral aetiology (rhinovirus, influenza, parainfluenza, coronavirus) accounts for >90% of cases; antibiotics are not indicated in immunocompetent adults. The yellow-green colour of sputum reflects neutrophil peroxidase, not bacterial infection. Cough may persist 2–3 weeks ('post-infectious cough'). Distinguish from pneumonia (fever, consolidation, hypoxia) and early COPD. Inhaled bronchodilators reduce wheeze; cough suppressants provide symptomatic relief. Homeopathic remedies: Antimonium tartaricum (loose rattling cough, weakness), Drosera (spasmodic cough worse at night), Ipecacuanha (persistent cough with nausea).",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 295; Davidson's 23rd Ed., Ch. 19; Alagappan's Manual of Practical Medicine",
    },
    keywords: [
      "bronchitis",
      "chest cold",
      "productive cough",
      "lower respiratory infection",
      "tracheobronchitis",
      "cough sputum",
      "wheeze",
      "viral bronchitis",
    ],
  },
  {
    name: "Food Poisoning",
    aliases: [
      "food-borne illness",
      "food intoxication",
      "gastroenteritis food",
      "staphylococcal food poisoning",
      "salmonella poisoning",
    ],
    category: "Acute",
    harrisons: {
      definition:
        "Acute illness caused by ingestion of contaminated food or water containing pathogenic organisms (Salmonella, Staphylococcus aureus, Campylobacter, E. coli, Clostridium) or their preformed toxins, characterised by nausea, vomiting, and diarrhoea.",
      classicSymptoms: [
        "Sudden-onset nausea and profuse vomiting",
        "Watery or bloody diarrhoea",
        "Abdominal cramps and pain",
        "Fever (variable; prominent in Salmonella/Campylobacter)",
        "Myalgia and malaise",
        "Dehydration with thirst and reduced urine output",
      ],
      keySigns: [
        "Signs of dehydration (dry mucosae, tachycardia, reduced skin turgor)",
        "Diffuse abdominal tenderness on palpation",
        "High fever (>38.5°C) in invasive bacterial infections",
        "Bloody stool on rectal examination (dysentery-like picture)",
      ],
      keyFeatures:
        "Incubation period guides aetiology: 1–6 h (S. aureus toxin, preformed), 8–16 h (C. perfringens), 12–48 h (Salmonella, Campylobacter). Most cases are self-limiting; oral rehydration is the mainstay. Antibiotics indicated for systemic illness, elderly, or immunocompromised. Stool culture and sensitivity guide targeted therapy. Outbreak investigation includes food history, shared meals. Haemolytic uraemic syndrome (HUS) is a feared complication of EHEC (E. coli O157:H7). Homeopathic: Arsenicum album (burning diarrhoea and vomiting, anxiety, restlessness, midnight aggravation), Veratrum album (profuse watery stools, cold sweat, prostration).",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 163–165; Davidson's 23rd Ed., Ch. 13; Alagappan's Manual of Practical Medicine",
    },
    keywords: [
      "food poisoning",
      "food-borne illness",
      "vomiting diarrhoea",
      "gastroenteritis",
      "salmonella",
      "staphylococcal",
      "contaminated food",
      "nausea vomiting",
    ],
  },
  {
    name: "Dengue Fever",
    aliases: [
      "dengue",
      "break-bone fever",
      "dengue haemorrhagic fever",
      "dengue viral fever",
      "DHF",
    ],
    category: "Acute",
    harrisons: {
      definition:
        "Mosquito-borne viral illness caused by dengue virus (DENV 1–4, Flaviviridae) transmitted by Aedes aegypti, characterised by sudden high fever, severe myalgia/arthralgia, rash, and potential haemorrhagic complications.",
      classicSymptoms: [
        "Sudden high fever (39–40°C), biphasic (saddle-back) pattern",
        "Severe headache (frontal/retro-orbital pain)",
        "Myalgia and arthralgia ('break-bone fever')",
        "Maculopapular rash appearing on day 3–5",
        "Nausea, vomiting, abdominal pain",
        "Bleeding manifestations (petechiae, epistaxis, gum bleeding in severe disease)",
      ],
      keySigns: [
        "Positive tourniquet test (≥10 petechiae/sq inch)",
        "Thrombocytopaenia (<100,000 platelets/μL) and leukopenia",
        "Haemoconcentration (>20% rise in haematocrit)",
        "Hepatomegaly with elevated transaminases",
      ],
      keyFeatures:
        "WHO dengue classification: dengue without warning signs, dengue with warning signs (abdominal pain, persistent vomiting, fluid accumulation, mucosal bleeding, rapid drop in platelets), and severe dengue (plasma leakage, severe bleeding, organ impairment). No specific antiviral; management is supportive with oral/IV hydration. Aspirin and NSAIDs are contraindicated (bleeding risk). Watch for dengue shock syndrome (DSS) on defervescence (day 4–6) when vascular leak peaks. NS1 antigen (day 1–5) and IgM/IgG ELISA confirm diagnosis. Homeopathic: Eupatorium perfoliatum (bone-breaking pain, high fever, chills), Rhus toxicodendron (restlessness, body ache, rash).",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 233; Davidson's 23rd Ed., Ch. 14; Alagappan's Manual of Practical Medicine",
    },
    keywords: [
      "dengue",
      "dengue fever",
      "break-bone fever",
      "dengue haemorrhagic",
      "thrombocytopenia fever",
      "aedes mosquito",
      "dengue rash",
      "DHF",
    ],
  },
  {
    name: "Malaria",
    aliases: [
      "malaria fever",
      "plasmodium",
      "paludism",
      "falciparum malaria",
      "vivax malaria",
      "malarial fever",
    ],
    category: "Acute",
    harrisons: {
      definition:
        "Parasitic infection caused by Plasmodium species (P. falciparum, P. vivax, P. ovale, P. malariae) transmitted by female Anopheles mosquito, characterised by periodic paroxysms of fever, rigors, and anaemia.",
      classicSymptoms: [
        "Periodic fever with chills and rigors (classic malarial paroxysm)",
        "Severe headache, myalgia, and arthralgia",
        "Profuse sweating at end of fever episode",
        "Nausea, vomiting, and abdominal discomfort",
        "Anaemia causing pallor and fatigue",
        "Altered consciousness or seizures (severe falciparum malaria)",
      ],
      keySigns: [
        "Splenomegaly (tender in acute, firm in chronic malaria)",
        "Anaemia with pallor and mild jaundice",
        "Peripheral blood smear: ring forms, gametocytes (Giemsa stain)",
        "Thrombocytopaenia; elevated bilirubin and LDH",
      ],
      keyFeatures:
        "P. falciparum causes severe malaria: cerebral malaria (coma, seizures), severe anaemia, hypoglycaemia, pulmonary oedema, acute kidney injury, and blackwater fever (massive haemolysis). P. vivax and P. ovale form hypnozoites causing relapses; primaquine required for radical cure. Rapid Diagnostic Tests (RDTs) and thick/thin blood smears confirm diagnosis. Artemisinin-based combination therapy (ACT) is first-line for uncomplicated falciparum malaria; IV artesunate for severe disease. Fever pattern: every 48 h (tertian – vivax/falciparum/ovale); every 72 h (quartan – malariae). Homeopathic: China officinalis (periodical fever, anaemia, debility after malarial illness), Natrum muriaticum (intermittent fever, anaemia, herpes), Arsenic album (anxiety, burning, exhaustion, midnight aggravation).",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 219; Davidson's 23rd Ed., Ch. 13; Alagappan's Manual of Practical Medicine",
    },
    keywords: [
      "malaria",
      "malarial fever",
      "plasmodium",
      "periodic fever",
      "rigors chills",
      "falciparum",
      "vivax malaria",
      "anopheles mosquito",
    ],
  },
  {
    name: "Typhoid Fever",
    aliases: [
      "enteric fever",
      "typhoid",
      "Salmonella typhi",
      "paratyphoid",
      "typhoid salmonella",
    ],
    category: "Acute",
    harrisons: {
      definition:
        "Systemic illness caused by Salmonella typhi (or S. paratyphi) characterised by sustained fever, relative bradycardia, rose spots, and splenomegaly, transmitted via faecal-oral route through contaminated food and water.",
      classicSymptoms: [
        "Stepladder rise of fever over 3–4 days (up to 39–40°C)",
        "Relative bradycardia (Faget's sign: pulse-temperature dissociation)",
        "Headache, malaise, and myalgia",
        "Constipation in early phase; diarrhoea ('pea-soup') in later phase",
        "Rose spots: faint salmon-pink maculopapular rash on trunk (2nd week)",
        "Abdominal pain, hepatosplenomegaly, and coated tongue",
      ],
      keySigns: [
        "Sustained high fever with relative bradycardia",
        "Splenomegaly and hepatomegaly",
        "Rose spots on abdomen (transient, 2–4 mm salmon macules)",
        "Blood culture positive in week 1 (Widal rising titres from week 2)",
      ],
      keyFeatures:
        "Widal test (O and H antigens) has low sensitivity/specificity; blood culture is the gold standard in week 1, stool/urine culture in weeks 2–3. Ciprofloxacin or ceftriaxone is first-line (increasing fluoroquinolone resistance in South Asia); azithromycin an alternative. Complications: intestinal perforation (week 3), haemorrhage, myocarditis, encephalopathy. The carrier state (gallbladder colonisation) is an important public health concern. Vaccination (Vi polysaccharide) advised for endemic areas. Homeopathic: Baptisia tinctoria (stupor, foul odour, can only swallow liquids), Muriatic acid (profound prostration, sliding down bed), Arnica (soreness, refuses to be examined, putrid fever).",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 164; Davidson's 23rd Ed., Ch. 13; Alagappan's Manual of Practical Medicine",
    },
    keywords: [
      "typhoid",
      "enteric fever",
      "salmonella typhi",
      "stepladder fever",
      "rose spots",
      "widal test",
      "typhoid salmonella",
      "paratyphoid",
    ],
  },
  {
    name: "Chickenpox (Varicella)",
    aliases: [
      "varicella",
      "chicken pox",
      "VZV infection",
      "chickenpox",
      "varicella zoster",
    ],
    category: "Acute",
    harrisons: {
      definition:
        "Highly contagious primary infection with Varicella-Zoster Virus (VZV), characterised by successive crops of pruritic vesicular rash on erythematous base ('dewdrop on a rose petal'), fever, and malaise.",
      classicSymptoms: [
        "Pruritic vesicular rash in successive crops (face → trunk → limbs)",
        "Low-grade fever and malaise preceding rash by 1–2 days",
        "Lesions in different stages simultaneously (macule, papule, vesicle, pustule, crust)",
        "Rash involves scalp and mucous membranes (oral, conjunctival)",
        "Intense pruritus causing scratching and secondary infection",
        "Headache and anorexia in prodrome",
      ],
      keySigns: [
        "'Dewdrop on rose petal' vesicle appearance on erythematous base",
        "Lesions in all stages present simultaneously (pathognomonic)",
        "Tzanck smear: multinucleated giant cells",
        "VZV PCR or DFA from vesicle fluid confirms diagnosis",
      ],
      keyFeatures:
        "Incubation period 10–21 days; infectious 1–2 days before rash until all lesions crust (5–7 days). Complications: bacterial superinfection (S. aureus, S. pyogenes), pneumonia (especially in adults and immunocompromised), encephalitis, cerebellar ataxia, and haemorrhagic varicella. Aciclovir indicated in adults, immunocompromised, neonates, and pregnant women. Aspirin contraindicated (Reye's syndrome risk in children). Varicella vaccine (VZV live attenuated) prevents disease. Latent virus reactivates as Herpes Zoster. Homeopathic: Antimonium tartaricum (large pustular eruptions, restlessness), Rhus toxicodendron (intense itching, restlessness), Mezereum (thick crusts, intolerable itching).",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 192; Davidson's 23rd Ed., Ch. 14; Alagappan's Manual of Practical Medicine",
    },
    keywords: [
      "chickenpox",
      "varicella",
      "VZV",
      "vesicular rash",
      "pruritic rash",
      "varicella zoster",
      "chicken pox",
      "dewdrop vesicle",
    ],
  },
  {
    name: "Acute Pharyngitis",
    aliases: [
      "sore throat",
      "throat infection",
      "strep throat",
      "tonsillitis",
      "pharyngotonsillitis",
      "streptococcal pharyngitis",
    ],
    category: "Acute",
    harrisons: {
      definition:
        "Acute inflammation of the posterior pharynx and tonsillar region caused by Group A β-haemolytic Streptococcus (GABHS) or viral pathogens, presenting with sore throat, odynophagia, and tonsillar exudates.",
      classicSymptoms: [
        "Sore throat and odynophagia (pain on swallowing)",
        "High fever (>38.5°C) and chills (bacterial)",
        "Tonsillar enlargement with white/grey exudates",
        "Tender anterior cervical lymphadenopathy",
        "Absence of cough (distinguishes bacterial from viral)",
        "Headache, malaise, and loss of appetite",
      ],
      keySigns: [
        "Erythematous, oedematous tonsils with exudates (bacterial)",
        "Tender jugulodigastric (tonsillar) lymph nodes",
        "Palatal petechiae (streptococcal pharyngitis)",
        "Positive rapid streptococcal antigen test or throat culture",
      ],
      keyFeatures:
        "Centor/McIsaac criteria guide antibiotic decision: exudate, tender anterior nodes, fever, absence of cough (score 4 = treat). GABHS pharyngitis must be treated with penicillin/amoxicillin to prevent acute rheumatic fever (ARF) and post-streptococcal glomerulonephritis. Viral pharyngitis (adenovirus, EBV, CMV) is self-limiting. EBV (infectious mononucleosis) presents with exudative pharyngitis, splenomegaly, and atypical lymphocytosis; avoid ampicillin (rash). Peritonsillar abscess (quinsy) is a complication requiring drainage. Homeopathic: Belladonna (sudden high fever, bright red throat, tonsils), Mercurius solubilis (offensive breath, salivation, sweating), Baryta carbonica (recurrent tonsillitis, enlarged tonsils in children, timid).",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 46; Davidson's 23rd Ed., Ch. 28; Alagappan's Manual of Practical Medicine",
    },
    keywords: [
      "pharyngitis",
      "sore throat",
      "strep throat",
      "tonsillitis",
      "throat infection",
      "odynophagia",
      "streptococcal",
      "tonsillar exudate",
    ],
  },
  {
    name: "Cellulitis",
    aliases: [
      "skin infection",
      "bacterial cellulitis",
      "erysipelas",
      "soft tissue infection",
      "acute cellulitis",
    ],
    category: "Acute",
    harrisons: {
      definition:
        "Acute bacterial infection of the dermis and subcutaneous tissues, most commonly caused by Group A Streptococcus (S. pyogenes) and Staphylococcus aureus, characterised by spreading erythema, warmth, oedema, and tenderness.",
      classicSymptoms: [
        "Localised spreading erythema, warmth, and oedema",
        "Skin tenderness and pain at the site",
        "Fever, chills, and systemic malaise",
        "Red streaking (lymphangitis) tracking proximally",
        "Regional lymphadenopathy",
        "Preceding skin breach (trauma, insect bite, tinea, ulcer)",
      ],
      keySigns: [
        "Non-pitting erythema with indistinct borders",
        "Tenderness on palpation; fluctuance suggests abscess",
        "Elevated inflammatory markers (CRP, WBC)",
        "Lymphangitis: red streaks along lymphatic channels",
      ],
      keyFeatures:
        "Cellulitis commonly affects the lower limbs; predisposing factors include tinea pedis, lymphoedema, obesity, and diabetes. Erysipelas (S. pyogenes) is a superficial form with sharply demarcated, raised, bright-red lesion with systemic toxicity. Distinguish from DVT (mimicker), necrotising fasciitis (surgical emergency: pain out of proportion, wooden-hard feel, gas on imaging), and contact dermatitis. MRSA community-acquired cellulitis requires trimethoprim-sulfamethoxazole or doxycycline; non-purulent cellulitis responds to beta-lactams. Elevation of limb reduces oedema. Homeopathic: Belladonna (bright red, hot, inflamed skin, rapid spread), Apis mellifica (oedematous, stinging, rosy-pink), Hepar sulphuris (suppurating, very sensitive to touch, worse cold).",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 124; Davidson's 23rd Ed., Ch. 27; Alagappan's Manual of Practical Medicine",
    },
    keywords: [
      "cellulitis",
      "skin infection",
      "erysipelas",
      "bacterial skin",
      "soft tissue infection",
      "spreading redness",
      "lymphangitis",
      "streptococcal skin",
    ],
  },
  {
    name: "Acute Anaphylaxis",
    aliases: [
      "anaphylaxis",
      "anaphylactic shock",
      "severe allergic reaction",
      "anaphylactic reaction",
      "IgE hypersensitivity",
    ],
    category: "Acute",
    harrisons: {
      definition:
        "Life-threatening acute systemic hypersensitivity reaction mediated by IgE, mast cells, and basophils, triggered by allergens (foods, drugs, insect stings, latex), causing multisystem involvement including airway compromise, cardiovascular collapse, and urticaria.",
      classicSymptoms: [
        "Sudden urticaria, angioedema (lips, tongue, throat)",
        "Stridor or bronchospasm causing respiratory distress",
        "Hypotension and tachycardia (anaphylactic shock)",
        "Nausea, vomiting, abdominal cramps",
        "Pruritus and generalised flushing",
        "Loss of consciousness and collapse in severe cases",
      ],
      keySigns: [
        "Urticaria and angioedema (skin/mucosal)",
        "Stridor (upper airway) or wheeze (lower airway)",
        "Hypotension (systolic <90 mmHg) with tachycardia",
        "Elevated serum tryptase (diagnostic biomarker within 1–3 h)",
      ],
      keyFeatures:
        "Adrenaline (epinephrine) 0.5 mg IM (anterolateral thigh) is the first-line treatment; delay is the commonest cause of death. Biphasic reactions (recurrence 8–72 h later) occur in 5–20% — observation for minimum 6–8 h. H1/H2 antihistamines and corticosteroids are adjuncts only, not first-line. Common triggers: peanuts, tree nuts, shellfish, bee/wasp venom, penicillin, NSAIDs. Epinephrine auto-injector (EpiPen) prescribed for all at-risk patients. Allergy referral and component-resolved diagnostics identify specific triggers. Homeopathic: Apis mellifica (angioedema, urticaria, stinging, < heat), Carbo vegetabilis (collapse, cyanosis, air hunger), Urtica urens (urticaria, intense burning and itching).",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 349; Davidson's 23rd Ed., Ch. 4; Alagappan's Manual of Practical Medicine",
    },
    keywords: [
      "anaphylaxis",
      "anaphylactic shock",
      "severe allergy",
      "allergic reaction",
      "epinephrine emergency",
      "angioedema",
      "urticaria shock",
      "IgE reaction",
    ],
  },
  {
    name: "Tension-Type Headache",
    aliases: [
      "tension headache",
      "acute headache",
      "stress headache",
      "TTH",
      "bilateral headache",
      "tension-type headache",
    ],
    category: "Acute",
    harrisons: {
      definition:
        "The most common primary headache disorder, characterised by bilateral, pressing/tightening, non-pulsating head pain of mild to moderate intensity, not aggravated by routine physical activity, without significant nausea or vomiting.",
      classicSymptoms: [
        "Bilateral headache ('band-like' or 'vice-like' pressure around head)",
        "Non-pulsating, pressing or tightening quality",
        "Mild to moderate intensity; does not prevent activity",
        "No significant nausea or vomiting (unlike migraine)",
        "May have photo- or phonophobia (not both simultaneously)",
        "Associated neck and shoulder muscle stiffness/tenderness",
      ],
      keySigns: [
        "Pericranial muscle tenderness on palpation (diagnostic criterion)",
        "No neurological deficit on examination",
        "Normal fundoscopy and vital signs",
        "No meningeal signs (important red flag exclusion)",
      ],
      keyFeatures:
        "Episodic TTH (<15 days/month) vs. chronic TTH (≥15 days/month for >3 months). Red flags (SNOOP criteria): Systemic illness, Neurological deficit, Onset sudden/thunderclap, Onset after 50, Positional variation, Papilloedema — warrant urgent neuroimaging. Simple analgesics (paracetamol, NSAIDs) are effective for episodic TTH; triptans are not effective. Amitriptyline is the drug of choice for prophylaxis of chronic TTH. Migraine differentiators: unilateral, pulsating, moderate-severe, associated nausea/vomiting, photophobia AND phonophobia. Homeopathic: Natrum muriaticum (sunrise to sunset headache, hammering, worse sun exposure), Belladonna (throbbing, sudden onset, better pressure), Gelsemium (dull heavy headache, beginning in occiput, band-like, better urination).",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 422; Davidson's 23rd Ed., Ch. 26; Alagappan's Manual of Practical Medicine",
    },
    keywords: [
      "tension headache",
      "TTH",
      "stress headache",
      "band-like headache",
      "bilateral headache",
      "muscle contraction headache",
      "pressure headache",
      "acute headache",
    ],
  },
  {
    name: "Acute Diarrhoea",
    aliases: [
      "diarrhoea",
      "acute diarrhea",
      "loose motions",
      "acute gastroenteritis",
      "watery diarrhoea",
      "infectious diarrhoea",
    ],
    category: "Acute",
    harrisons: {
      definition:
        "Sudden-onset passage of three or more loose/liquid stools per day, of less than 14 days' duration, caused by infectious (bacterial, viral, parasitic) or non-infectious (drugs, toxins) aetiologies, with risk of dehydration and electrolyte imbalance.",
      classicSymptoms: [
        "Frequent watery or loose stools (≥3/day)",
        "Abdominal cramps and borborygmi",
        "Nausea and vomiting (especially in viral gastroenteritis)",
        "Fever (in invasive bacterial infections)",
        "Blood or mucus in stool (dysentery: Shigella, EHEC, amoeba)",
        "Signs of dehydration: thirst, dry mouth, oliguria, dizziness",
      ],
      keySigns: [
        "Dehydration assessment: skin turgor, mucous membranes, sunken eyes, capillary refill",
        "Tenderness on abdominal palpation (periumbilical or diffuse)",
        "Hyperactive bowel sounds",
        "Stool microscopy: leukocytes (invasive), cysts/trophozoites (amoeba), ova (helminthic)",
      ],
      keyFeatures:
        "Secretory diarrhoea (large-volume, watery, no blood): ETEC, Vibrio cholerae, rotavirus, Giardia; oral rehydration therapy (ORS) is the cornerstone. Inflammatory/invasive diarrhoea (small-volume, bloody, mucus, fever): Shigella, Campylobacter, Entamoeba histolytica; stool culture guides antibiotic therapy. Traveller's diarrhoea is most commonly caused by ETEC; empirical azithromycin/ciprofloxacin for severe cases. Red flags warranting investigation: bloody stool, high fever, severe abdominal pain, immunocompromise, elderly. Cholera (rice-water stools, profuse, painless) is a medical emergency. Homeopathic: Arsenicum album (watery burning stools, anxiety, restlessness, midnight aggravation), Croton tiglium (sudden explosive watery stool, gushing), Podophyllum (profuse, gushing, offensive, painless, morning aggravation).",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 163; Davidson's 23rd Ed., Ch. 13; Alagappan's Manual of Practical Medicine",
    },
    keywords: [
      "diarrhoea",
      "loose motions",
      "acute diarrhoea",
      "gastroenteritis",
      "watery stool",
      "infectious diarrhoea",
      "dehydration diarrhoea",
      "bloody diarrhoea",
    ],
  },
  {
    name: "Heat Stroke / Sunstroke",
    aliases: [
      "heat stroke",
      "sunstroke",
      "heat exhaustion",
      "hyperthermia",
      "classic heat stroke",
      "exertional heat stroke",
    ],
    category: "Acute",
    harrisons: {
      definition:
        "Life-threatening heat-related illness characterised by core body temperature >40°C with neurological dysfunction (confusion, seizures, coma), caused by failure of thermoregulatory mechanisms due to environmental heat exposure (classic) or exertion (exertional).",
      classicSymptoms: [
        "Core temperature >40°C (104°F) – hallmark finding",
        "Central nervous system dysfunction: confusion, delirium, seizures, coma",
        "Anhidrosis (dry hot skin) in classic heat stroke; diaphoresis in exertional",
        "Nausea, vomiting, and headache as prodromal symptoms",
        "Muscle cramps and weakness (heat cramps preceding full syndrome)",
        "Collapse and loss of consciousness",
      ],
      keySigns: [
        "Rectal temperature >40°C (oral temperature may be underestimated)",
        "Neurological signs: altered sensorium, ataxia, focal deficits",
        "Dry, hot, flushed skin (classic) or wet in exertional",
        "Rhabdomyolysis: elevated CK, myoglobinuria (tea-coloured urine)",
      ],
      keyFeatures:
        "Classic heat stroke: elderly or chronically ill patients during heat waves; exertional heat stroke: athletes and military in hot humid conditions. Immediate cooling is the priority — ice-water immersion is most effective; evaporative cooling (tepid water + fanning) is an alternative. Target temperature <39°C within 30 min. Complications: rhabdomyolysis, AKI, DIC, hepatic injury, ARDS, and multiorgan failure. Differentiate from heat exhaustion (temperature <40°C, no CNS dysfunction — less severe). Malignant hyperthermia (anaesthetic trigger) and neuroleptic malignant syndrome (antipsychotic drug) are important differentials. IV fluids, electrolyte correction, and ICU monitoring essential. Homeopathic: Glonoine (sudden, bursting headache, flushing, worse sun, cerebral congestion), Belladonna (hot dry skin, throbbing headache, delirium), Natrum carbonicum (ill effects of sun/heat, headache, prostration).",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 449; Davidson's 23rd Ed., Ch. 12; Alagappan's Manual of Practical Medicine",
    },
    keywords: [
      "heat stroke",
      "sunstroke",
      "hyperthermia",
      "heat exhaustion",
      "high temperature",
      "heat-related illness",
      "sun exposure fever",
      "exertional heat stroke",
    ],
  },
  // ── ENDOCRINE ──
  {
    name: "Type 2 Diabetes Mellitus",
    aliases: [
      "diabetes",
      "T2DM",
      "high blood sugar",
      "type 2 diabetes",
      "non-insulin dependent diabetes",
    ],
    category: "Endocrine",
    harrisons: {
      definition:
        "A chronic metabolic disorder characterised by hyperglycaemia resulting from progressive impairment of insulin secretion and insulin resistance, associated with microvascular and macrovascular complications.",
      classicSymptoms: [
        "Polyuria and polydipsia",
        "Polyphagia with weight loss",
        "Fatigue and generalised weakness",
        "Blurring of vision",
        "Recurrent infections (skin, urinary, vaginal)",
      ],
      keySigns: [
        "Fasting plasma glucose ≥ 7.0 mmol/L or HbA1c ≥ 48 mmol/mol (6.5%)",
        "Acanthosis nigricans (insulin resistance marker)",
        "Signs of complications: retinopathy, peripheral neuropathy, foot changes",
      ],
      keyFeatures:
        "WHO diagnostic criteria: FPG ≥ 7.0 mmol/L, 2-h PG ≥ 11.1 mmol/L, HbA1c ≥ 48 mmol/mol. Metformin is first-line therapy. Lifestyle modification (diet, exercise) is cornerstone. Screen for nephropathy (urine ACR), retinopathy, neuropathy, and cardiovascular disease annually.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 397; Davidson's 23rd Ed., Ch. 20; Alagappan Manual of Practical Medicine, 4th Ed.",
    },
    keywords: [
      "diabetes",
      "T2DM",
      "hyperglycemia",
      "polyuria",
      "polydipsia",
      "HbA1c",
      "insulin resistance",
      "glucose",
      "diabetic",
      "metformin",
    ],
  },
  {
    name: "Hypothyroidism",
    aliases: ["underactive thyroid", "myxoedema", "hypothyroid", "low thyroid"],
    category: "Endocrine",
    harrisons: {
      definition:
        "Deficiency of thyroid hormone due to primary thyroid failure (autoimmune — Hashimoto's thyroiditis being the commonest cause) or secondary/tertiary hypothalamic-pituitary disease, resulting in slowing of metabolic processes.",
      classicSymptoms: [
        "Fatigue, lethargy, somnolence",
        "Weight gain despite poor appetite",
        "Cold intolerance",
        "Constipation",
        "Dry skin, hair loss, brittle nails",
      ],
      keySigns: [
        "Bradycardia and low blood pressure",
        "Non-pitting periorbital and peripheral oedema (myxoedema)",
        "Delayed relaxation of deep tendon reflexes",
        "Goitre (in Hashimoto's thyroiditis)",
      ],
      keyFeatures:
        "Elevated TSH with low free T4 confirms primary hypothyroidism. Hashimoto's thyroiditis: positive anti-TPO antibodies. Treatment: levothyroxine (L-T4), dose titrated to TSH. Myxoedema coma is a rare, life-threatening emergency. Screen with TSH in all women over 50.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 376; Davidson's 23rd Ed., Ch. 20; Alagappan 4th Ed.",
    },
    keywords: [
      "hypothyroidism",
      "thyroid",
      "TSH",
      "levothyroxine",
      "myxoedema",
      "cold intolerance",
      "fatigue",
      "weight gain",
      "Hashimoto",
      "dry skin",
    ],
  },
  {
    name: "Hyperthyroidism",
    aliases: [
      "overactive thyroid",
      "thyrotoxicosis",
      "Graves disease",
      "Graves' disease",
    ],
    category: "Endocrine",
    harrisons: {
      definition:
        "Excess production and secretion of thyroid hormones (T3 and T4) causing hypermetabolic state. Graves' disease (TSH-receptor autoantibodies) is the commonest cause, accounting for 70–80% of cases.",
      classicSymptoms: [
        "Palpitations and tachycardia",
        "Weight loss despite increased appetite",
        "Heat intolerance and excessive sweating",
        "Tremor (fine, postural)",
        "Anxiety, irritability, emotional lability",
      ],
      keySigns: [
        "Tachycardia or atrial fibrillation",
        "Warm, moist, velvety skin",
        "Diffuse goitre (Graves') with bruit",
        "Exophthalmos and lid retraction (Graves' ophthalmopathy)",
        "Hyperreflexia",
      ],
      keyFeatures:
        "Suppressed TSH with elevated free T4/T3 confirms hyperthyroidism. Graves' disease: positive TSH-receptor antibodies (TRAb). Radioactive iodine, antithyroid drugs (carbimazole/propylthiouracil), or surgery are treatment options. Thyroid storm is a life-threatening complication.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 376; Davidson's 23rd Ed., Ch. 20; Alagappan 4th Ed.",
    },
    keywords: [
      "hyperthyroidism",
      "thyrotoxicosis",
      "Graves",
      "palpitations",
      "weight loss",
      "sweating",
      "tremor",
      "goitre",
      "exophthalmos",
      "tachycardia",
    ],
  },
  {
    name: "Polycystic Ovary Syndrome",
    aliases: ["PCOS", "polycystic ovaries", "polycystic ovary disease"],
    category: "Endocrine",
    harrisons: {
      definition:
        "A common endocrine-metabolic disorder in women of reproductive age characterised by hyperandrogenism, ovulatory dysfunction, and polycystic ovarian morphology (Rotterdam criteria: 2 of 3 features).",
      classicSymptoms: [
        "Oligomenorrhoea or amenorrhoea",
        "Hirsutism (excessive hair on face, chest, abdomen)",
        "Acne and oily skin",
        "Weight gain and central obesity",
        "Subfertility or infertility",
      ],
      keySigns: [
        "Elevated serum androgens (testosterone, DHEAS)",
        "Polycystic ovaries on ultrasound (≥ 12 follicles per ovary)",
        "Acanthosis nigricans (insulin resistance)",
        "LH:FSH ratio often > 2:1",
      ],
      keyFeatures:
        "Rotterdam criteria (2003): 2 of — oligo/anovulation, clinical or biochemical hyperandrogenism, polycystic ovaries on USS. Associated with insulin resistance and metabolic syndrome. Combined OCP for menstrual regulation; metformin for metabolic/fertility. Clomiphene or letrozole for ovulation induction.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 388; Davidson's 23rd Ed., Ch. 20",
    },
    keywords: [
      "PCOS",
      "polycystic ovary",
      "hirsutism",
      "amenorrhea",
      "oligomenorrhea",
      "androgen",
      "infertility",
      "acne",
      "insulin resistance",
    ],
  },
  {
    name: "Cushing's Syndrome",
    aliases: [
      "hypercortisolism",
      "Cushings",
      "adrenal excess",
      "Cushing syndrome",
    ],
    category: "Endocrine",
    harrisons: {
      definition:
        "A clinical syndrome resulting from prolonged exposure to excess glucocorticoids, most commonly iatrogenic (exogenous steroids); endogenous causes include pituitary ACTH-secreting adenoma (Cushing's disease), adrenal adenoma, or ectopic ACTH.",
      classicSymptoms: [
        "Weight gain with central obesity",
        "Round ('moon') face and buffalo hump",
        "Proximal muscle weakness",
        "Skin fragility with easy bruising and striae",
        "Mood disturbance (depression, psychosis)",
      ],
      keySigns: [
        "Centripetal obesity, moon face, buffalo hump",
        "Purple striae > 1 cm wide (pathognomonic)",
        "Proximal myopathy",
        "Hypertension",
        "Hypokalaemia, hyperglycaemia",
      ],
      keyFeatures:
        "Screening: 24-h urinary free cortisol, late-night salivary cortisol, or low-dose dexamethasone suppression test. Cushing's disease (pituitary ACTH): fails low-dose but suppresses on high-dose DST. Purple striae and proximal weakness are most specific signs. Treatment depends on aetiology.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 379; Davidson's 23rd Ed., Ch. 20",
    },
    keywords: [
      "Cushing",
      "hypercortisolism",
      "moon face",
      "buffalo hump",
      "striae",
      "cortisol",
      "ACTH",
      "adrenal",
      "obesity",
      "purple striae",
    ],
  },
  {
    name: "Addison's Disease",
    aliases: [
      "adrenal insufficiency",
      "hypoadrenalism",
      "primary adrenal insufficiency",
      "adrenal failure",
    ],
    category: "Endocrine",
    harrisons: {
      definition:
        "Primary adrenocortical insufficiency due to destruction of the adrenal cortex (autoimmune adrenalitis in > 80% of cases in developed countries), resulting in deficiency of cortisol and aldosterone.",
      classicSymptoms: [
        "Chronic fatigue, weakness, and lethargy",
        "Anorexia, nausea, vomiting, and weight loss",
        "Salt craving",
        "Postural hypotension and dizziness",
        "Abdominal pain",
      ],
      keySigns: [
        "Hyperpigmentation (buccal mucosa, skin creases, scars) — due to elevated ACTH/MSH",
        "Postural hypotension",
        "Hyponatraemia and hyperkalaemia on biochemistry",
        "Vitiligo (associated autoimmune condition)",
      ],
      keyFeatures:
        "Short Synacthen test: subnormal cortisol rise confirms primary AI. Elevated ACTH with low cortisol distinguishes primary from secondary AI. Addisonian crisis (acute adrenal insufficiency): shock, hypotension, hyponatraemia — treat with IV hydrocortisone immediately. Long-term: hydrocortisone + fludrocortisone.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 379; Davidson's 23rd Ed., Ch. 20",
    },
    keywords: [
      "Addison",
      "adrenal insufficiency",
      "hypoadrenalism",
      "cortisol",
      "hyperpigmentation",
      "salt craving",
      "hypotension",
      "ACTH",
      "Addisonian crisis",
    ],
  },

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

  // ── Pediatric ─────────────────────────────────────────────────────────────
  {
    name: "Measles (Rubeola)",
    aliases: ["rubeola", "measles"],
    category: "Pediatric",
    harrisons: {
      definition: "",
      classicSymptoms: [
        "High fever (>39°C) for 4–5 days",
        "Coryza, cough, and conjunctivitis (3 Cs)",
        "Koplik's spots on buccal mucosa (pathognomonic)",
        "Maculopapular rash starting at hairline, spreading downward",
        "Photophobia",
        "Malaise and anorexia",
      ],
      keySigns: [
        "Koplik's spots (white spots on buccal mucosa opposite lower molars)",
        "Erythematous maculopapular rash — cephalocaudal spread",
        "Cervical lymphadenopathy",
        "Conjunctival injection",
      ],
      keyFeatures:
        "Caused by paramyxovirus (Morbillivirus). Highly contagious (R0 = 12–18). Complications: pneumonia, encephalitis, SSPE (subacute sclerosing panencephalitis), blindness, diarrhoea. Notifiable disease. MMR vaccine preventable. Vitamin A reduces morbidity in malnourished children.",
      reference:
        "Nelson Textbook of Pediatrics, 21st Ed.; Alagappan's Manual of Practical Medicine, 5th Ed.",
    },
    keywords: [
      "measles",
      "rubeola",
      "koplik",
      "rash",
      "fever",
      "MMR",
      "paramyxovirus",
      "pediatric",
      "coryza",
      "conjunctivitis",
    ],
  },
  {
    name: "Chickenpox (Varicella)",
    aliases: ["varicella", "chickenpox", "VZV"],
    category: "Pediatric",
    harrisons: {
      definition: "",
      classicSymptoms: [
        "Low-grade fever and malaise for 1–2 days before rash",
        "Pruritic vesicular rash — starts on trunk, spreads to face and limbs",
        "Lesions in multiple stages simultaneously (macule → papule → vesicle → crust)",
        "Itching (often intense)",
        "Anorexia",
      ],
      keySigns: [
        "Polymorphic rash: lesions in different stages on same area",
        "'Dew drop on a rose petal' vesicle appearance",
        "Rash predominantly on trunk (centripetal)",
        "Lesions also on scalp and mucous membranes",
      ],
      keyFeatures:
        "Caused by Varicella-Zoster Virus (VZV). Highly contagious via respiratory droplets and direct contact. Incubation 10–21 days. Complications: secondary bacterial skin infection, pneumonia, encephalitis, cerebellar ataxia. Reactivation causes Herpes Zoster (shingles). Acyclovir for high-risk groups. Varicella vaccine available.",
      reference:
        "Nelson Textbook of Pediatrics, 21st Ed.; Harrison's Principles of Internal Medicine, 21st Ed., Ch. 189",
    },
    keywords: [
      "varicella",
      "chickenpox",
      "vesicular rash",
      "VZV",
      "pediatric",
      "pruritus",
      "blister",
      "herpes",
    ],
  },
  {
    name: "Whooping Cough (Pertussis)",
    aliases: ["pertussis", "whooping cough", "Bordetella pertussis"],
    category: "Pediatric",
    harrisons: {
      definition: "",
      classicSymptoms: [
        "Catarrhal phase: mild cough, coryza, low fever (1–2 weeks)",
        "Paroxysmal phase: severe paroxysms of coughing followed by inspiratory 'whoop'",
        "Post-tussive vomiting",
        "Cyanosis during paroxysms",
        "Convalescent phase: gradual improvement over weeks",
      ],
      keySigns: [
        "Whooping inspiratory sound after paroxysmal cough",
        "Post-tussive vomiting",
        "Subconjunctival haemorrhages from coughing",
        "Lymphocytosis on blood count (>20,000 lymphocytes/μL)",
      ],
      keyFeatures:
        "Caused by Bordetella pertussis. Highly contagious; most dangerous in infants <6 months (can cause apnoea, pneumonia, death). Diagnosis by nasopharyngeal PCR. Treatment: azithromycin or erythromycin. DPT vaccine is preventable. Notifiable disease.",
      reference:
        "Nelson Textbook of Pediatrics, 21st Ed.; Davidson's Principles and Practice of Medicine, 23rd Ed., Ch. 13",
    },
    keywords: [
      "pertussis",
      "whooping cough",
      "Bordetella",
      "paroxysmal cough",
      "pediatric",
      "lymphocytosis",
      "DPT",
    ],
  },
  {
    name: "Rickets",
    aliases: ["rickets", "nutritional rickets", "vitamin D deficiency rickets"],
    category: "Pediatric",
    harrisons: {
      definition: "",
      classicSymptoms: [
        "Bowing of legs (genu varum) or knock-knees (genu valgum)",
        "Delayed dentition and dental caries",
        "Frontal bossing and craniotabes (soft skull bones)",
        "Rachitic rosary (beading of costochondral junctions)",
        "Harrison's sulcus (groove along lower chest)",
        "Muscle weakness and hypotonia",
        "Delayed motor milestones",
      ],
      keySigns: [
        "Widening of wrists and ankles (metaphyseal expansion)",
        "Craniotabes — ping-pong ball feel of skull",
        "Rachitic rosary",
        "X-ray: cupping, fraying, splaying of metaphyses",
        "Low serum calcium, phosphorus; elevated ALP and PTH",
      ],
      keyFeatures:
        "Caused by Vitamin D deficiency (most common), Calcium deficiency, or Phosphate deficiency. Risk factors: breastfed infants without supplementation, dark skin, limited sun exposure, malabsorption. Treatment: Vitamin D and calcium supplementation. Severe cases may need orthopedic correction.",
      reference:
        "Nelson Textbook of Pediatrics, 21st Ed.; Alagappan's Manual of Practical Medicine, 5th Ed.",
    },
    keywords: [
      "rickets",
      "vitamin D",
      "bowing",
      "calcium",
      "craniotabes",
      "rachitic rosary",
      "pediatric",
      "metaphyseal",
      "ALP",
    ],
  },
  {
    name: "Tonsillitis",
    aliases: ["tonsillitis", "acute tonsillitis", "strep throat"],
    category: "Pediatric",
    harrisons: {
      definition: "",
      classicSymptoms: [
        "Sore throat (acute onset)",
        "Dysphagia (pain on swallowing)",
        "Fever (>38.5°C)",
        "Tonsillar swelling with exudate (pus)",
        "Foul breath (halitosis)",
        "Ear pain (referred otalgia)",
        "Headache and malaise",
      ],
      keySigns: [
        "Enlarged erythematous tonsils with or without white exudate",
        "Tender cervical lymphadenopathy (especially jugulodigastric nodes)",
        "Soft palate erythema",
        "Absence of cough distinguishes bacterial from viral",
      ],
      keyFeatures:
        "Most commonly caused by Group A beta-haemolytic Streptococcus (GABHS) or viral (EBV, adenovirus). Centor criteria for GABHS: exudate, tender cervical nodes, fever, no cough. Treat GABHS with penicillin (amoxicillin) for 10 days to prevent rheumatic fever. Complications: peritonsillar abscess, rheumatic fever, post-streptococcal GN.",
      reference:
        "Alagappan's Manual of Practical Medicine, 5th Ed.; Davidson's Principles of Medicine, 23rd Ed.",
    },
    keywords: [
      "tonsillitis",
      "sore throat",
      "strep",
      "tonsils",
      "pediatric",
      "GABHS",
      "exudate",
      "lymphadenopathy",
    ],
  },
  {
    name: "Febrile Seizures",
    aliases: ["febrile seizure", "febrile convulsion"],
    category: "Pediatric",
    harrisons: {
      definition: "",
      classicSymptoms: [
        "Seizure occurring in the context of fever (>38°C)",
        "Age 6 months to 5 years",
        "Usually brief tonic-clonic seizure lasting <15 minutes",
        "Child recovers fully and is alert after seizure (simple febrile seizure)",
        "No focal neurological signs",
        "Postictal drowsiness",
      ],
      keySigns: [
        "Temperature >38°C (febrile illness at time of seizure)",
        "Generalised tonic-clonic activity",
        "Normal neurological examination after recovery",
        "Complex febrile seizure: focal, prolonged >15 min, or multiple within 24 hours",
      ],
      keyFeatures:
        "Most common seizure disorder in children (2–5% of children). Simple febrile seizure: generalised, <15 min, single episode in 24 hours. Complex febrile seizure: focal/prolonged/multiple. Risk of recurrence ~30%. Small increased risk of epilepsy later. Investigate for cause of fever; LP if meningitis suspected. Diazepam for prolonged seizures.",
      reference:
        "Nelson Textbook of Pediatrics, 21st Ed.; Alagappan's Manual of Practical Medicine, 5th Ed.",
    },
    keywords: [
      "febrile seizure",
      "convulsion",
      "fever",
      "pediatric",
      "tonic-clonic",
      "postictal",
      "epilepsy",
    ],
  },

  // ── Mental Health ──────────────────────────────────────────────────────────
  {
    name: "Major Depressive Disorder",
    aliases: ["depression", "MDD", "major depression", "unipolar depression"],
    category: "Mental Health",
    harrisons: {
      definition: "",
      classicSymptoms: [
        "Persistent depressed mood (most of the day, nearly every day, ≥2 weeks)",
        "Anhedonia — loss of interest or pleasure in activities",
        "Significant weight change (loss or gain) or appetite disturbance",
        "Insomnia or hypersomnia",
        "Psychomotor agitation or retardation",
        "Fatigue or loss of energy",
        "Feelings of worthlessness or excessive guilt",
        "Difficulty concentrating or making decisions",
        "Recurrent thoughts of death or suicidal ideation",
      ],
      keySigns: [
        "DSM-5: ≥5 symptoms for ≥2 weeks; must include depressed mood or anhedonia",
        "PHQ-9 score ≥10 suggests moderate-to-severe depression",
        "Exclude medical causes (hypothyroidism, anaemia, medications)",
        "Risk assessment: suicidal/homicidal ideation, plan, intent, means",
      ],
      keyFeatures:
        "Most common psychiatric disorder worldwide. Biopsychosocial model: genetic, neurobiological (↓serotonin, norepinephrine, dopamine), psychosocial stressors. Subtypes: melancholic, atypical, psychotic, seasonal. Treatment: SSRIs (first-line), SNRIs, CBT, interpersonal therapy. Severe/refractory: ECT. Monitor for suicidality.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 467; DSM-5",
    },
    keywords: [
      "depression",
      "MDD",
      "anhedonia",
      "low mood",
      "suicide",
      "SSRIs",
      "mental health",
      "PHQ-9",
      "worthlessness",
    ],
  },
  {
    name: "Generalised Anxiety Disorder",
    aliases: ["GAD", "generalised anxiety", "anxiety disorder"],
    category: "Mental Health",
    harrisons: {
      definition: "",
      classicSymptoms: [
        "Excessive, uncontrollable worry about multiple topics (≥6 months)",
        "Restlessness or feeling on edge",
        "Fatigue",
        "Difficulty concentrating ('mind going blank')",
        "Irritability",
        "Muscle tension",
        "Sleep disturbance (difficulty falling or staying asleep)",
      ],
      keySigns: [
        "GAD-7 score ≥10 suggests moderate-to-severe anxiety",
        "DSM-5: excessive anxiety/worry ≥6 months; ≥3 of 6 symptoms",
        "Rule out: hyperthyroidism, phaeochromocytoma, caffeine, medications",
        "Functional impairment in social or occupational domains",
      ],
      keyFeatures:
        "Prevalence ~5–7% lifetime. Female:male 2:1. Pathophysiology: HPA axis dysregulation, amygdala hyperactivation, ↓GABA tone. Commonly comorbid with depression. First-line: CBT, SSRIs/SNRIs. Short-term: benzodiazepines (caution for dependence). Buspirone is a non-addictive anxiolytic alternative.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 467; DSM-5",
    },
    keywords: [
      "anxiety",
      "GAD",
      "worry",
      "restlessness",
      "mental health",
      "GAD-7",
      "tension",
      "insomnia",
    ],
  },
  {
    name: "Schizophrenia",
    aliases: ["schizophrenia", "psychosis", "psychotic disorder"],
    category: "Mental Health",
    harrisons: {
      definition: "",
      classicSymptoms: [
        "Positive symptoms: hallucinations (typically auditory — hearing voices)",
        "Positive symptoms: delusions (persecutory, referential, grandiose)",
        "Positive symptoms: disorganised thinking and speech (formal thought disorder)",
        "Positive symptoms: grossly disorganised or catatonic behaviour",
        "Negative symptoms: flat affect, alogia, avolition, anhedonia, social withdrawal",
        "Cognitive symptoms: impaired working memory, attention, executive function",
      ],
      keySigns: [
        "DSM-5: ≥2 of 5 criteria for ≥1 month; continuous disturbance ≥6 months",
        "Auditory hallucinations (command, commentary, or third-person)",
        "Schneiderian first-rank symptoms: thought insertion, withdrawal, broadcasting",
        "Social/occupational dysfunction",
        "Negative symptoms often more disabling than positive",
      ],
      keyFeatures:
        "Prevalence ~1% worldwide. Onset: late teens/20s for men; late 20s/30s for women. Dopamine hypothesis: excess D2 activity in mesolimbic pathway. Treatment: antipsychotics (typical: haloperidol; atypical: olanzapine, risperidone, clozapine for resistant). Clozapine for treatment-resistant schizophrenia. Monitor for metabolic side effects of atypical antipsychotics.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 465; DSM-5",
    },
    keywords: [
      "schizophrenia",
      "psychosis",
      "hallucinations",
      "delusions",
      "mental health",
      "antipsychotic",
      "thought disorder",
    ],
  },
  {
    name: "Obsessive-Compulsive Disorder",
    aliases: ["OCD", "obsessive compulsive disorder"],
    category: "Mental Health",
    harrisons: {
      definition: "",
      classicSymptoms: [
        "Obsessions: recurrent, intrusive, unwanted thoughts, urges, or images",
        "Compulsions: repetitive behaviours or mental acts performed to neutralise obsessions",
        "Common themes: contamination/washing, symmetry/ordering, harm/checking, forbidden thoughts",
        "Significant time-consuming (>1 hour/day) and distress-causing",
        "Insight: individual recognises obsessions as excessive (usually)",
        "Avoidance of triggers",
      ],
      keySigns: [
        "Y-BOCS (Yale-Brown Obsessive Compulsive Scale) for severity",
        "Ego-dystonic nature distinguishes from normal rituals",
        "Comorbid depression, anxiety, tics (Tourette's)",
        "Insight specifier: good insight, poor insight, absent insight/delusional",
      ],
      keyFeatures:
        "Prevalence ~2–3%. Equal sex distribution (childhood onset more common in males). Neurobiology: cortico-striato-thalamo-cortical (CSTC) circuit dysregulation, ↑serotonin involvement. First-line: SSRIs (at higher doses than depression) + ERP (Exposure and Response Prevention therapy). Clomipramine for refractory. 40–60% respond to treatment.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 467; DSM-5",
    },
    keywords: [
      "OCD",
      "obsessive",
      "compulsive",
      "rituals",
      "mental health",
      "washing",
      "checking",
      "intrusive thoughts",
    ],
  },
  {
    name: "Bipolar Disorder",
    aliases: [
      "bipolar disorder",
      "bipolar affective disorder",
      "manic depression",
      "mania",
    ],
    category: "Mental Health",
    harrisons: {
      definition: "",
      classicSymptoms: [
        "Manic episode: elevated or irritable mood lasting ≥1 week",
        "Manic episode: decreased need for sleep (feels rested after 3 hours)",
        "Manic episode: grandiosity or inflated self-esteem",
        "Manic episode: pressured speech, flight of ideas, racing thoughts",
        "Manic episode: increased goal-directed activity or psychomotor agitation",
        "Manic episode: reckless behaviour (spending, sex, risky activities)",
        "Depressive episodes: as in MDD",
        "Bipolar II: hypomania (less severe, <1 week) + MDD",
      ],
      keySigns: [
        "DSM-5: Bipolar I — ≥1 manic episode; Bipolar II — hypomania + MDD",
        "Mood cycling between mania/hypomania and depression",
        "Psychotic features may occur in severe mania",
        "Rapid cycling: ≥4 episodes/year",
      ],
      keyFeatures:
        "Lifetime prevalence ~2–3% (Bipolar I + II). Bimodal onset: late teens/early 20s. Strong genetic component. Triggered by sleep deprivation, substances, antidepressants (may precipitate mania). Treatment: mood stabilisers (lithium — gold standard; valproate; lamotrigine). Acute mania: antipsychotics + benzodiazepines. Monitor lithium levels (narrow therapeutic index).",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 466; DSM-5",
    },
    keywords: [
      "bipolar",
      "mania",
      "hypomania",
      "lithium",
      "mental health",
      "mood disorder",
      "manic",
      "elated",
    ],
  },
  {
    name: "Post-Traumatic Stress Disorder",
    aliases: ["PTSD", "post traumatic stress", "trauma disorder"],
    category: "Mental Health",
    harrisons: {
      definition: "",
      classicSymptoms: [
        "Re-experiencing: flashbacks, nightmares, intrusive memories of traumatic event",
        "Avoidance: avoiding trauma-related thoughts, feelings, places, or people",
        "Negative cognitions and mood: persistent negative beliefs, blame, emotional numbing",
        "Hyperarousal: hypervigilance, exaggerated startle response, sleep disturbance",
        "Angry outbursts and irritability",
        "Difficulty concentrating",
        "Symptoms >1 month; significant functional impairment",
      ],
      keySigns: [
        "History of exposure to traumatic event (death, serious injury, sexual violence — actual or threatened)",
        "PCL-5 screening tool for PTSD",
        "DSM-5: symptoms in all 4 clusters (re-experiencing, avoidance, negative cognitions, hyperarousal) for >1 month",
        "High comorbidity with depression, anxiety, substance use disorders",
      ],
      keyFeatures:
        "Prevalence 10–20% lifetime in trauma-exposed individuals. Risk factors: severity of trauma, lack of social support, prior mental health history, female sex. Neurobiology: amygdala hyperactivation, ↓hippocampal volume, HPA axis dysregulation. First-line: trauma-focused CBT, EMDR (Eye Movement Desensitisation and Reprocessing), SSRIs (sertraline, paroxetine FDA-approved). Prazosin for nightmares.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 467; DSM-5",
    },
    keywords: [
      "PTSD",
      "trauma",
      "flashbacks",
      "nightmares",
      "mental health",
      "hypervigilance",
      "avoidance",
      "re-experiencing",
    ],
  },
  // ── RESPIRATORY (additional) ──
  {
    name: "COPD (Chronic Obstructive Pulmonary Disease)",
    aliases: [
      "COPD",
      "chronic obstructive pulmonary disease",
      "chronic bronchitis",
      "emphysema",
      "smoker's lung",
    ],
    category: "Respiratory",
    harrisons: {
      definition:
        "A preventable and treatable disease characterised by persistent, progressive airflow limitation due to chronic bronchitis and/or emphysema, usually caused by long-term exposure to noxious particles or gases, predominantly tobacco smoke.",
      classicSymptoms: [
        "Chronic productive cough — 'smoker's cough', worse in the mornings",
        "Progressive exertional dyspnoea — initially on exertion, later at rest",
        "Wheeze — particularly on exertion",
        "Copious mucoid sputum production, purulent during exacerbations",
        "Reduced exercise tolerance and fatigue",
        "Recurrent chest infections (acute exacerbations of COPD)",
        "Weight loss and muscle wasting in advanced disease",
      ],
      keySigns: [
        "Barrel chest, prolonged expiratory phase, use of accessory muscles",
        "Reduced air entry, scattered rhonchi/wheeze on auscultation",
        "Pursed lip breathing, cyanosis in advanced disease",
        "Spirometry: FEV1/FVC < 0.70 post-bronchodilator (diagnostic criterion — GOLD criteria)",
        "HRCT: emphysematous bullae, air trapping, bronchial wall thickening",
      ],
      keyFeatures:
        "GOLD staging (I–IV) based on FEV1 % predicted. Management: smoking cessation (most effective), SABA/LABA bronchodilators, ICS in frequent exacerbators, pulmonary rehabilitation, oxygen therapy in severe hypoxaemia (PaO2 <55 mmHg). Vaccination against influenza and pneumococcus recommended. Exacerbations treated with bronchodilators, systemic steroids, antibiotics if purulent sputum.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 290; Davidson's Principles, 23rd Ed., Ch. 17; GOLD Guidelines 2023",
    },
    keywords: [
      "COPD",
      "emphysema",
      "chronic bronchitis",
      "smoker",
      "dyspnoea",
      "wheeze",
      "spirometry",
      "airflow obstruction",
    ],
  },
  {
    name: "Pulmonary Embolism",
    aliases: [
      "PE",
      "pulmonary embolism",
      "lung clot",
      "pulmonary thromboembolism",
    ],
    category: "Respiratory",
    harrisons: {
      definition:
        "Obstruction of the pulmonary arterial circulation by thrombus (usually originating from deep veins of the legs/pelvis), air, fat, or amniotic fluid, leading to haemodynamic compromise and V/Q mismatch.",
      classicSymptoms: [
        "Sudden onset pleuritic chest pain — sharp, worse on inspiration",
        "Acute dyspnoea — sudden breathlessness at rest",
        "Haemoptysis — blood-stained sputum",
        "Tachycardia and tachypnoea",
        "Syncope or near-syncope in massive PE",
        "Anxiety and sense of impending doom",
        "Leg pain and swelling if associated DVT",
      ],
      keySigns: [
        "Tachycardia, tachypnoea, hypoxia (SpO2 <94%)",
        "Raised JVP, right heart strain on ECG (S1Q3T3 pattern, right bundle branch block)",
        "CTPA: filling defect in pulmonary arteries (gold standard)",
        "Elevated D-dimer (sensitive, not specific); raised troponin/BNP in large PE",
        "Wells score for pre-test probability assessment",
      ],
      keyFeatures:
        "Risk factors: Virchow's triad — stasis (immobility, pregnancy), hypercoagulability (thrombophilia, malignancy, OCP), vessel wall injury. Treatment: anticoagulation with LMWH/DOAC (rivaroxaban, apixaban) immediately. Thrombolysis for haemodynamically unstable massive PE. Long-term anticoagulation 3–6 months (provoked) or indefinitely (unprovoked/recurrent). DVT prophylaxis in hospitalised patients is essential.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 273; Davidson's Principles, 23rd Ed., Ch. 17",
    },
    keywords: [
      "pulmonary embolism",
      "PE",
      "DVT",
      "lung clot",
      "pleuritic chest pain",
      "haemoptysis",
      "tachycardia",
      "CTPA",
    ],
  },
  {
    name: "Pleural Effusion",
    aliases: [
      "pleural effusion",
      "fluid in lungs",
      "hydrothorax",
      "pleural fluid",
    ],
    category: "Respiratory",
    harrisons: {
      definition:
        "Accumulation of excess fluid in the pleural space between the parietal and visceral pleura. Classified as transudate (protein <30 g/L) or exudate (protein >30 g/L) using Light's criteria.",
      classicSymptoms: [
        "Progressive breathlessness and reduced exercise tolerance",
        "Pleuritic chest pain — dull ache on the affected side",
        "Dry non-productive cough",
        "Reduced breath sounds on the affected side",
        "Dullness to percussion at the lung base",
        "Ipsilateral mediastinal shift towards effusion if large",
      ],
      keySigns: [
        "Stony dullness on percussion over the effusion",
        "Reduced or absent breath sounds; bronchial breathing at the upper border",
        "CXR: blunting of costophrenic angle (>200 mL), opacification with concave meniscus sign",
        "USS guided thoracocentesis: fluid analysis distinguishes cause (LDH, protein, pH, cytology, culture)",
        "Light's criteria: exudate if pleural LDH/serum LDH >0.6, pleural protein/serum protein >0.5, or pleural LDH >2/3 upper normal serum LDH",
      ],
      keyFeatures:
        "Common causes of transudate: heart failure, cirrhosis, nephrotic syndrome, hypoalbuminaemia. Exudate causes: pneumonia (parapneumonic), malignancy, TB, pulmonary embolism, rheumatoid arthritis. Large symptomatic effusions require therapeutic thoracocentesis. Malignant effusions may need pleurodesis or indwelling pleural catheter. TB effusion requires anti-TB therapy.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 292; Davidson's Principles, 23rd Ed., Ch. 17",
    },
    keywords: [
      "pleural effusion",
      "fluid in chest",
      "hydrothorax",
      "dullness to percussion",
      "breathlessness",
      "thoracocentesis",
      "transudate",
      "exudate",
    ],
  },
  {
    name: "Lung Cancer",
    aliases: [
      "lung cancer",
      "bronchogenic carcinoma",
      "non-small cell lung cancer",
      "NSCLC",
      "small cell lung cancer",
      "SCLC",
      "lung carcinoma",
    ],
    category: "Respiratory",
    harrisons: {
      definition:
        "Malignant tumour arising from the bronchial epithelium. Major types: non-small cell lung cancer (NSCLC — adenocarcinoma, squamous cell, large cell; ~85%) and small cell lung cancer (SCLC; ~15%). Leading cause of cancer death worldwide.",
      classicSymptoms: [
        "Persistent cough — often a change in a pre-existing cough",
        "Haemoptysis — blood-streaked or frank blood in sputum",
        "Progressive dyspnoea and wheeze",
        "Chest pain — dull, persistent, pleuritic",
        "Unexplained weight loss, anorexia, fatigue",
        "Recurrent pneumonia or persistent radiological shadowing",
        "Hoarseness (recurrent laryngeal nerve palsy), dysphagia, SVC syndrome",
      ],
      keySigns: [
        "CXR/CT chest: peripheral mass, hilar/mediastinal lymphadenopathy, pleural effusion, collapse",
        "Bronchoscopy and biopsy / CT-guided biopsy for histological diagnosis",
        "PET-CT for staging; brain MRI to detect metastases",
        "Paraneoplastic syndromes: SIADH (hyponatraemia), hypercalcaemia, Lambert-Eaton syndrome, HPOA",
        "Pancoast tumour: apical tumour causing Horner's syndrome, shoulder/arm pain",
      ],
      keyFeatures:
        "Risk factors: tobacco smoking (80–85%), occupational exposure (asbestos, radon, silica), air pollution, family history. Staging (TNM) determines treatment. NSCLC early stage: surgical resection ± adjuvant chemotherapy. Advanced NSCLC: targeted therapy (EGFR, ALK, ROS1 inhibitors), immunotherapy (pembrolizumab), platinum-based chemotherapy. SCLC: highly chemo-sensitive initially — cisplatin + etoposide; prophylactic cranial irradiation in limited disease. Prognosis: 5-year survival ~15–20% overall.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 514; Davidson's Principles, 23rd Ed., Ch. 17",
    },
    keywords: [
      "lung cancer",
      "bronchogenic carcinoma",
      "NSCLC",
      "SCLC",
      "haemoptysis",
      "smoking",
      "lung mass",
      "carcinoma",
    ],
  },
  {
    name: "Bronchiectasis",
    aliases: [
      "bronchiectasis",
      "dilated bronchi",
      "chronic bronchial dilation",
    ],
    category: "Respiratory",
    harrisons: {
      definition:
        "Abnormal, permanent dilation of bronchi due to destruction of bronchial wall components (muscle, elastic tissue, cartilage), resulting in impaired mucociliary clearance and chronic airway infection.",
      classicSymptoms: [
        "Chronic productive cough — large volume purulent sputum ('cupful' per day), worse on posture change",
        "Recurrent chest infections — exacerbations with fever, increased sputum volume and purulence",
        "Haemoptysis — can be massive",
        "Dyspnoea and wheeze in advanced disease",
        "Halitosis due to chronic infection",
        "Fatigue, malaise, weight loss in severe disease",
      ],
      keySigns: [
        "Coarse crepitations and wheeze over affected areas (often bilateral basal)",
        "Finger clubbing in longstanding disease",
        "HRCT chest: 'signet ring sign' (bronchial diameter > adjacent pulmonary artery), bronchial wall thickening, mucus plugging — gold standard for diagnosis",
        "Sputum culture: Pseudomonas aeruginosa, H. influenzae, S. aureus common",
        "Spirometry: obstructive or mixed pattern",
      ],
      keyFeatures:
        "Causes: post-infectious (measles, pertussis, TB), cystic fibrosis, primary ciliary dyskinesia, immunodeficiency (hypogammaglobulinaemia), allergic bronchopulmonary aspergillosis (ABPA), obstruction. Management: airway clearance physiotherapy (postural drainage, oscillating PEP devices), antibiotics during exacerbations (guided by culture), long-term prophylactic antibiotics (azithromycin 3x/week) in frequent exacerbators, bronchodilators. Surgery in localised disease.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 287; Davidson's Principles, 23rd Ed., Ch. 17",
    },
    keywords: [
      "bronchiectasis",
      "productive cough",
      "purulent sputum",
      "recurrent chest infection",
      "haemoptysis",
      "HRCT",
      "signet ring",
    ],
  },
  {
    name: "Pulmonary Fibrosis",
    aliases: [
      "pulmonary fibrosis",
      "IPF",
      "idiopathic pulmonary fibrosis",
      "interstitial lung disease",
      "ILD",
      "fibrosing alveolitis",
    ],
    category: "Respiratory",
    harrisons: {
      definition:
        "Progressive scarring (fibrosis) of lung parenchyma leading to impaired gas exchange. Idiopathic pulmonary fibrosis (IPF) is the most common form of idiopathic interstitial pneumonia, with a poor prognosis.",
      classicSymptoms: [
        "Progressive exertional dyspnoea — insidious onset over months/years",
        "Dry, non-productive cough — persistent, distressing",
        "Reduced exercise tolerance and fatigue",
        "No significant sputum production",
        "Cyanosis in advanced disease",
        "Symptoms of pulmonary hypertension in late stage (RHF, oedema)",
      ],
      keySigns: [
        "Bilateral fine 'Velcro' inspiratory crepitations at lung bases",
        "Finger clubbing (~50% of IPF patients)",
        "HRCT: honeycombing, traction bronchiectasis, subpleural/basal predominant reticular opacities — usual interstitial pneumonia (UIP) pattern",
        "Restrictive spirometry: reduced FVC, reduced DLCO",
        "Desaturation on 6-minute walk test",
      ],
      keyFeatures:
        "Causes of ILD: IPF (idiopathic), connective tissue disease (RA, SLE, scleroderma), hypersensitivity pneumonitis (bird/mold exposure), sarcoidosis, drug-induced (amiodarone, methotrexate), occupational (asbestosis, silicosis). IPF treatment: antifibrotics — pirfenidone or nintedanib slow FVC decline. Lung transplantation for eligible patients. Prognosis of IPF: median survival 3–5 years from diagnosis.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 291; Davidson's Principles, 23rd Ed., Ch. 17",
    },
    keywords: [
      "pulmonary fibrosis",
      "IPF",
      "ILD",
      "interstitial lung disease",
      "Velcro crepitations",
      "dry cough",
      "dyspnoea",
      "honeycombing",
    ],
  },
  {
    name: "Sarcoidosis",
    aliases: [
      "sarcoidosis",
      "sarcoid",
      "pulmonary sarcoid",
      "systemic sarcoidosis",
    ],
    category: "Respiratory",
    harrisons: {
      definition:
        "A multisystem granulomatous disorder of unknown aetiology characterised by non-caseating granulomas predominantly affecting the lungs and intrathoracic lymph nodes, but also the skin, eyes, liver, and nervous system.",
      classicSymptoms: [
        "Dry cough and dyspnoea — most common respiratory symptoms",
        "Bilateral hilar lymphadenopathy — often asymptomatic, found incidentally on CXR",
        "Erythema nodosum — painful red nodules on shins (Löfgren's syndrome)",
        "Uveitis — ocular sarcoidosis causing red, painful eyes",
        "Fatigue, malaise, low-grade fever",
        "Skin lesions — lupus pernio (violaceous plaques on nose/cheeks)",
        "Hypercalcaemia — thirst, polyuria, renal stones",
      ],
      keySigns: [
        "CXR staging: Stage 0 (normal), I (bilateral hilar lymphadenopathy), II (BHL + pulmonary infiltrates), III (infiltrates only), IV (pulmonary fibrosis)",
        "Elevated serum ACE level (elevated in ~60%, not specific)",
        "Hypercalcaemia and hypercalciuria due to macrophage 1-hydroxylase activity",
        "Tissue biopsy showing non-caseating granulomas (bronchoscopy/EBUS-guided biopsy)",
        "BAL: lymphocytosis with CD4:CD8 ratio >3.5",
      ],
      keyFeatures:
        "Young adults (20–40 years); Black individuals have higher prevalence and more severe disease. Löfgren's syndrome (BHL + erythema nodosum + arthralgia + fever) has an excellent prognosis and often resolves spontaneously. Treatment: corticosteroids (prednisolone) for symptomatic/progressive disease, ocular, neurological, cardiac, or hypercalcaemia involvement. Most pulmonary sarcoidosis (stage I–II) resolves spontaneously within 2 years.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 390; Davidson's Principles, 23rd Ed., Ch. 17",
    },
    keywords: [
      "sarcoidosis",
      "BHL",
      "bilateral hilar lymphadenopathy",
      "non-caseating granuloma",
      "erythema nodosum",
      "uveitis",
      "ACE",
      "sarcoid",
    ],
  },
  {
    name: "Pneumothorax",
    aliases: [
      "pneumothorax",
      "collapsed lung",
      "spontaneous pneumothorax",
      "tension pneumothorax",
    ],
    category: "Respiratory",
    harrisons: {
      definition:
        "Accumulation of air in the pleural space causing partial or complete lung collapse. Primary spontaneous pneumothorax (PSP) occurs without underlying lung disease; secondary (SSP) complicates pre-existing lung disease.",
      classicSymptoms: [
        "Sudden onset unilateral pleuritic chest pain — sharp, stabbing",
        "Acute dyspnoea — severity depends on size of pneumothorax",
        "Reduced breath sounds on the affected side",
        "Tachycardia",
        "In tension pneumothorax: rapidly worsening dyspnoea, hypotension, cyanosis, tracheal deviation — medical emergency",
        "In small PSP: may be asymptomatic or mild symptoms only",
      ],
      keySigns: [
        "Reduced/absent breath sounds and hyper-resonance on percussion on affected side",
        "CXR: visible pleural line with absent lung markings beyond it; deep sulcus sign on supine film",
        "Tracheal deviation away from side of tension pneumothorax",
        "SpO2 reduction, tachycardia, hypotension in tension/large pneumothorax",
        "Risk factors: tall thin young males (PSP), Marfan syndrome, COPD, asthma, TB (SSP)",
      ],
      keyFeatures:
        "Management of small PSP (<2 cm rim): observation, supplemental O2. Moderate/large PSP: needle aspiration or intercostal drain. SSP always requires drainage. Tension pneumothorax: immediate needle decompression (2nd intercostal space, midclavicular line) then chest drain. Recurrence rate ~30% after first PSP — video-assisted thoracoscopic surgery (VATS) with pleurodesis recommended after second episode or high-risk occupation.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 292; Davidson's Principles, 23rd Ed., Ch. 17; BTS Guidelines",
    },
    keywords: [
      "pneumothorax",
      "collapsed lung",
      "pleuritic chest pain",
      "dyspnoea",
      "tension pneumothorax",
      "pleural line",
      "chest drain",
    ],
  },
  {
    name: "Pulmonary Hypertension",
    aliases: [
      "pulmonary hypertension",
      "PAH",
      "pulmonary arterial hypertension",
      "right heart failure secondary",
      "cor pulmonale",
    ],
    category: "Respiratory",
    harrisons: {
      definition:
        "Mean pulmonary arterial pressure (mPAP) ≥25 mmHg at rest, measured by right heart catheterisation. WHO Group 1 (PAH) is idiopathic or associated with connective tissue disease, HIV, congenital heart disease. Groups 2–5 are secondary causes.",
      classicSymptoms: [
        "Progressive exertional dyspnoea — cardinal symptom",
        "Fatigue and reduced exercise tolerance",
        "Syncope on exertion — poor prognostic sign",
        "Chest pain — atypical, possibly anginal",
        "Palpitations",
        "Peripheral oedema and ascites in right heart failure",
        "Haemoptysis in severe cases",
      ],
      keySigns: [
        "Loud P2 (pulmonary component of S2), right ventricular heave",
        "Raised JVP, peripheral oedema, hepatomegaly in cor pulmonale",
        "ECG: right axis deviation, RBBB, right ventricular hypertrophy",
        "ECHO: elevated RVSP (>35 mmHg), RV dilatation/hypertrophy, tricuspid regurgitation",
        "Right heart catheterisation: diagnostic gold standard (mPAP ≥25 mmHg, PAWP ≤15 mmHg for PAH)",
      ],
      keyFeatures:
        "Causes: idiopathic, heritable (BMPR2 mutation), connective tissue disease (scleroderma — most common secondary CTD cause), left heart disease (Group 2), lung disease/hypoxia (Group 3), chronic thromboembolic (CTEPH — potentially curable by pulmonary endarterectomy). PAH treatment: ERA (bosentan, ambrisentan), PDE5 inhibitors (sildenafil, tadalafil), prostacyclin analogues (epoprostenol IV). Anticoagulation in idiopathic PAH. CTEPH: riociguat, balloon pulmonary angioplasty, or endarterectomy.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 277; Davidson's Principles, 23rd Ed., Ch. 17",
    },
    keywords: [
      "pulmonary hypertension",
      "PAH",
      "cor pulmonale",
      "dyspnoea",
      "right heart failure",
      "loud P2",
      "ECHO",
      "sildenafil",
    ],
  },
  {
    name: "Obstructive Sleep Apnoea",
    aliases: [
      "OSA",
      "obstructive sleep apnoea",
      "sleep apnoea",
      "sleep apnea",
      "OSAS",
      "snoring disorder",
    ],
    category: "Respiratory",
    harrisons: {
      definition:
        "Repetitive episodes of partial or complete upper airway obstruction during sleep, leading to oxygen desaturation and arousal from sleep. Defined as Apnoea-Hypopnoea Index (AHI) ≥5 events/hour with symptoms, or AHI ≥15 regardless of symptoms.",
      classicSymptoms: [
        "Loud habitual snoring — witnessed by bed partner",
        "Witnessed apnoeas — partner observes breathing cessation",
        "Excessive daytime sleepiness (EDS) — Epworth Sleepiness Scale",
        "Morning headaches due to nocturnal hypercapnia",
        "Non-refreshing sleep, frequent nocturnal waking",
        "Nocturia, mood changes, poor concentration",
        "Choking or gasping on awakening",
      ],
      keySigns: [
        "Obesity: BMI >30 kg/m² (major risk factor); neck circumference >43 cm (men), >38 cm (women)",
        "Oropharyngeal crowding: Mallampati score, tonsillar hypertrophy",
        "Overnight polysomnography (PSG): gold standard — measures AHI, oxygen desaturation",
        "Home sleep apnoea testing (HSAT): acceptable alternative in moderate-high pre-test probability",
        "Cardiovascular complications: systemic hypertension (50%), arrhythmias, increased MI/stroke risk",
      ],
      keyFeatures:
        "Prevalence: ~10–17% men, 3–9% women; higher in obesity, hypothyroidism, acromegaly. AHI classification: mild (5–14), moderate (15–29), severe (≥30). Treatment: CPAP (continuous positive airway pressure) — gold standard for moderate-severe OSA; improves EDS, cardiovascular outcomes. Mandibular advancement devices for mild-moderate. Weight loss, positional therapy, alcohol avoidance as adjuncts. Surgical options (UPPP, bariatric surgery) in selected patients.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 294; Davidson's Principles, 23rd Ed., Ch. 17",
    },
    keywords: [
      "OSA",
      "sleep apnoea",
      "snoring",
      "daytime sleepiness",
      "CPAP",
      "apnoea",
      "AHI",
      "polysomnography",
    ],
  },
  {
    name: "Allergic Bronchopulmonary Aspergillosis (ABPA)",
    aliases: [
      "ABPA",
      "allergic bronchopulmonary aspergillosis",
      "aspergillosis",
      "fungal asthma",
    ],
    category: "Respiratory",
    harrisons: {
      definition:
        "A hypersensitivity reaction to Aspergillus fumigatus antigens occurring in the airways of patients with asthma or cystic fibrosis, leading to bronchiectasis, pulmonary infiltrates, and mucus impaction.",
      classicSymptoms: [
        "Worsening asthma not responding to usual treatment",
        "Expectoration of brown/black mucus plugs",
        "Low-grade fever and malaise",
        "Eosinophilia in blood",
        "Fleeting or recurrent pulmonary infiltrates on CXR",
        "Proximal bronchiectasis on HRCT",
      ],
      keySigns: [
        "Elevated serum IgE (total >1000 IU/mL) and specific IgE/IgG to Aspergillus",
        "Immediate skin test reactivity to Aspergillus antigens",
        "Blood eosinophilia (>500/μL)",
        "HRCT: central (proximal) bronchiectasis, mucoid impaction, finger-in-glove opacities",
        "Sputum culture: Aspergillus species (not always positive)",
      ],
      keyFeatures:
        "Diagnostic criteria (modified Rosenberg-Patterson): history of asthma, positive Aspergillus skin test, elevated total IgE, elevated specific IgE/IgG, radiological infiltrates, blood eosinophilia. Treatment: oral corticosteroids (prednisolone) to suppress immune response; itraconazole or voriconazole as steroid-sparing agents. Long-term follow-up needed as ABPA can progress to end-stage fibrosis.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 287; Davidson's Principles, 23rd Ed., Ch. 17",
    },
    keywords: [
      "ABPA",
      "aspergillosis",
      "fungal asthma",
      "mucus plugs",
      "eosinophilia",
      "IgE",
      "bronchiectasis",
      "aspergillus",
    ],
  },
  {
    name: "Hypersensitivity Pneumonitis",
    aliases: [
      "hypersensitivity pneumonitis",
      "extrinsic allergic alveolitis",
      "farmer's lung",
      "bird fancier's lung",
      "EAA",
    ],
    category: "Respiratory",
    harrisons: {
      definition:
        "An immune-mediated inflammatory lung disease caused by repeated inhalation of organic antigens (fungal spores, avian proteins, chemical sensitizers) in susceptible individuals, involving both Type III and Type IV hypersensitivity reactions.",
      classicSymptoms: [
        "Acute: flu-like illness 4–6 hours after antigen exposure — fever, chills, myalgia",
        "Dyspnoea and dry cough after exposure",
        "Subacute: progressive breathlessness, weight loss, fatigue",
        "Chronic: insidious progressive breathlessness mimicking IPF",
        "Symptoms improve when away from the exposure source (e.g., on holiday)",
        "Bilateral fine crepitations at the lung bases",
      ],
      keySigns: [
        "Bilateral fine crepitations, occasionally crackles",
        "HRCT: ground-glass opacities, centrilobular nodules, mosaic attenuation (air trapping)",
        "BAL: lymphocytosis (>30%), CD4:CD8 ratio <1 (opposite to sarcoidosis)",
        "Serum precipitins (IgG) to causative antigen (e.g., Farmer's lung antibodies to thermophilic actinomycetes)",
        "Restrictive spirometry, reduced DLCO",
      ],
      keyFeatures:
        "Common causes: Farmer's lung (Saccharopolyspora rectivirgula in mouldy hay), Bird Fancier's lung (avian proteins in feathers/droppings), Humidifier lung, Chemical worker's lung (isocyanates). Key treatment: antigen avoidance (most important step). Corticosteroids for acute/subacute disease. Chronic HP may progress to fibrosis despite antigen avoidance. Prognosis varies: acute/subacute good if antigen removed; chronic HP poor prognosis.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 291; Davidson's Principles, 23rd Ed., Ch. 17",
    },
    keywords: [
      "hypersensitivity pneumonitis",
      "EAA",
      "farmer's lung",
      "bird fancier's lung",
      "antigen exposure",
      "dyspnoea",
      "organic dust",
      "alveolitis",
    ],
  },
  {
    name: "Respiratory Failure",
    aliases: [
      "respiratory failure",
      "type 1 respiratory failure",
      "type 2 respiratory failure",
      "hypoxic respiratory failure",
      "hypercapnic respiratory failure",
      "ARF",
    ],
    category: "Respiratory",
    harrisons: {
      definition:
        "Inadequacy of respiratory system to maintain normal blood gas levels. Type 1 (hypoxaemic): PaO2 <60 mmHg with normal/low PaCO2 — V/Q mismatch. Type 2 (hypercapnic/ventilatory): PaCO2 >45 mmHg ± hypoxaemia — alveolar hypoventilation.",
      classicSymptoms: [
        "Type 1: severe breathlessness, cyanosis, confusion, agitation — in pneumonia, pulmonary oedema, ARDS, pulmonary embolism",
        "Type 2: drowsiness, headache (CO2 retention), bounding pulse — in COPD exacerbation, neuromuscular disease, obesity hypoventilation",
        "Use of accessory muscles, intercostal recession",
        "Inability to complete sentences",
        "Paradoxical breathing in neuromuscular failure",
        "Reduced consciousness in severe cases",
      ],
      keySigns: [
        "ABG (arterial blood gas): definitive diagnosis — PaO2 <60 mmHg (Type 1); PaCO2 >45 mmHg (Type 2)",
        "SpO2 <90% on pulse oximetry",
        "Tachypnoea (RR >25/min), tachycardia",
        "Cyanosis (central — tongue), confusion",
        "Underlying cause: auscultation for wheeze (COPD/asthma), crackles (pulmonary oedema/pneumonia), absent sounds (pneumothorax)",
      ],
      keyFeatures:
        "Type 1 treatment: controlled oxygen therapy (target SpO2 94–98%), treat underlying cause. Type 2 treatment: controlled O2 (target SpO2 88–92% in COPD to avoid worsening hypercapnia), NIV (non-invasive ventilation/BiPAP) — first-line for COPD exacerbation with acidosis. ARDS management: lung-protective ventilation (low tidal volume 6 mL/kg, PEEP), prone positioning. ICU/intubation for life-threatening failure.",
      reference:
        "Harrison's Principles of Internal Medicine, 21st Ed., Ch. 296; Davidson's Principles, 23rd Ed., Ch. 9",
    },
    keywords: [
      "respiratory failure",
      "type 1",
      "type 2",
      "hypoxaemia",
      "hypercapnia",
      "ABG",
      "BiPAP",
      "ARDS",
      "ventilation",
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
