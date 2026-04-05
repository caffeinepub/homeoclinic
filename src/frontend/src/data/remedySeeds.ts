import type { RemedyData } from "./remedyDatabase";

export const SEED_REMEDIES: RemedyData[] = [
  {
    name: "Sulphur",
    abbreviation: "Sul",
    miasmaticClassification: "Psoric",
    keynotes:
      "Burning sensations everywhere. Redness of all orifices (lips, anus, eyelids). Dirty, untidy appearance. Worse bathing. The great anti-psoric. Lean, hungry, stooped individual. Philosophical, lazy, selfish. Morning diarrhea ('Gate has been opened'). Itching eruptions worse at night and from warmth. Hot burning palms and soles — must put feet out of bed.",
    materiaMedicaSummary:
      "Sulphur is Hahnemann's chief anti-psoric remedy. The Sulphur patient is lean, hungry, and stooped, with a red face, red lips, red eyelids, and red anus. There is a general burning sensation as if hot water were poured over the part. Skin: itching, burning eruptions, worse at night, worse from warmth of bed. Mind: philosophical, forgetful, selfish; thinks himself in great business. Abdomen: morning diarrhea driving out of bed at 5 AM. Chronic conditions that have been suppressed by external applications. Great weakness and emptiness at 11 AM. Aggravated: by heat, bathing, standing, at rest, at 11 AM. Ameliorated: by dry warm weather, lying on right side.",
    synopticKeyHighlights:
      "Key features per Synoptic Key (Bhanja): 1) Burning and heat of palms and soles. 2) Dirty, filthy persons who are never well unless dirty. 3) Redness of all orifices. 4) The 'ragged philosopher' — theoretical without practice. 5) Itching eruptions with thick yellowish scabs. 6) Complete indifference to personal appearance. 7) Hungry at 11 AM. 8) Every spring eruptions or complaints return.",
    clinicalIndications:
      "Psoric miasm base remedy. Skin diseases (eczema, psoriasis, urticaria). Chronic diarrhea. Hemorrhoids. Chronic rhinitis. Eye complaints. Liver affections. Chronic chest complaints with morning aggravation. Suppressed skin diseases causing internal complaints.",
    rubrics:
      "SKIN — ERUPTIONS — burning; STOMACH — APPETITE — canine, noon except at; RECTUM — DIARRHEA — morning, driving out of bed; EXTREMITIES — HEAT — hands; GENERALS — BATHING — worse; MIND — UNTIDY",
    farrington:
      "Farrington compares Sulphur with Calcarea and Lycopodium as the three great anti-psorics. Sulphur is the most acute of the three — acts more on the surface, burning, redness of orifices. Distinguishes from Aconite: Aconite acts on the surface in acute fevers with fear; Sulphur acts deeper, chronically. Compared to Mercurius: both have offensiveness but Sulphur's discharges burn while Mercury's are bland. Key Farrington notes: Sulphur the 'prince of anti-psorics' — use when well-selected remedies fail to act. The 11 AM hunger and hot, burning, offensive feet are pathognomonic. In skin diseases: prefer Sulphur when eruptions itch and burn worse at night and from warmth.",
    relationships: {
      complementary: "Calcarea carbonica, Lycopodium",
      antidotes: "Camphor",
      inimical: "Causticum",
      followsWell: "Nux vomica",
      followedBy: "Calcarea Carb, Lycopodium, Sarsaparilla, Sepia",
    },
  },
  {
    name: "Pulsatilla",
    abbreviation: "Puls",
    miasmaticClassification: "Sycotic (predominantly)",
    keynotes:
      "Mild, gentle, yielding disposition. Changeable symptoms — no two stools alike, no two chills alike. Thirstlessness even with fever. Worse in a warm room, better in open air. Weeping easily, craves consolation. Thick, bland, yellowish-green discharges. Wandering pains. Chilly yet averse to heat.",
    materiaMedicaSummary:
      "Pulsatilla is the weathercock remedy — constantly changing. The patient is fair, mild, timid, and easily moved to tears. Desires open air and cool. Stomach: aversion to fat, pork, and warm food/drink. Menses: late, suppressed, scanty, changeable. Colds: bland yellow-green thick discharges, not excoriating. Eyes: thick yellow discharge, worse in warm room. Joints: wandering, shifting rheumatic pains. Veins: varicose. Aggravated: from warmth, evening, rich food, fat, before menses. Ameliorated: in open air, cold applications, cold food/drink, motion.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Changeable, inconstant in everything. 2) Thirstlessness with dry mouth. 3) Never two stools alike, no fixed symptom pattern. 4) Weeping tendency, better from consolation. 5) Menses too late, irregular, and changeable. 6) Pains fly from joint to joint. 7) One-sided complaints. 8) Aversion to meat and fat food.",
    clinicalIndications:
      "Catarrhal affections. Measles (in children). Female complaints — dysmenorrhea, amenorrhea, menopause. Ophthalmia. Cystitis. Varicose veins. Indigestion from fatty food. Children who weep easily. One-sided headache.",
    rubrics:
      "MIND — WEEPING — tendency; GENERALS — THIRST — thirstlessness; FEMALE — MENSES — delayed; GENERALS — AIR — open, desire for; NOSE — DISCHARGE — yellow-green, bland",
    farrington:
      "Farrington distinguishes Pulsatilla from Kali bich, Hydrastis, and Sepia for catarrhal conditions. Pulsatilla: discharges thick, bland, yellow-green — non-irritating. Compare Kali bich: tenacious, stringy, ropy. Compare Hydrastis: thick but yellow, irritating. Compare Sepia: indifference and coldness, less weeping. Farrington's key: 'The Pulsatilla patient wants to go out into the cold air — the Sepia patient is equally chilly but from weakness.' Distinguishes from Cyclamen for menstrual disorders: Cyclamen has more nausea and visual disturbance. For ear: Pulsatilla vs Chamomilla — Chamomilla is more irritable and sensitive to pain.",
    relationships: {
      complementary: "Silicea",
      antidotes: "Chamomilla",
      inimical: "Cadmium Sulph",
      followsWell: "Sepia",
      followedBy: "Kali Mur, Lycopodium, Natrum Mur, Silica",
    },
  },
  {
    name: "Nux Vomica",
    abbreviation: "Nux-v",
    miasmaticClassification: "Syphilitic + Psoric",
    keynotes:
      "Oversensitive, irritable, chilly. Drug and coffee antidote. Ineffectual urging for stool and urine. Dyspepsia from overindulgence. Fainting from odors. Spasmodic, constrictive symptoms. Better after sleep. The 'city worker' — modern sedentary, overindulgent, competitive.",
    materiaMedicaSummary:
      "Nux Vomica suits the modern overworked professional. Great irritability, quarrelsome, impatient, fault-finding. Hypersensitive to noise, odors, light, and touch. Digestive: nausea, vomiting, constipation with ineffectual urging, piles with spasm. Nervous system: convulsions, spasms. Colds from dry cold air. Chilliness — cannot get warm. Wakes at 3 AM with anxiety. Aggravated: morning, mental exertion, after eating, touch, noise, dry weather, cold. Ameliorated: after sleep, in the evening, strong pressure, in wet or humid weather.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Hypersensitiveness — oversensitive to all external impressions. 2) Ineffectual desire for stool. 3) Antidotes coffee, tobacco, alcohol, sedentary habits. 4) Chilly remedy — worse from cold in any form. 5) Sedentary habits with mental overwork. 6) Spasmodic and crampy pains. 7) Digestive complaints from rich food and stimulants.",
    clinicalIndications:
      "Constipation. Indigestion. Hemorrhoids. Colds. Hangover/drug antidote. Insomnia. Irritable bowel. Menstrual cramps. Headache from overindulgence. Anxiety with impatience.",
    rubrics:
      "RECTUM — CONSTIPATION — ineffectual urging; MIND — IRRITABILITY; GENERALS — FOOD — coffee, agg; SLEEP — WAKING — 3 AM; GENERALS — COLD — general, sensitive to",
    farrington:
      "Farrington compares Nux vomica extensively with Bryonia and Ignatia. Nux: irritable from overwork, hypersensitive, constipation with ineffectual urging. Bryonia: irritable from being disturbed, wants to be left alone, constipation from dryness. Ignatia: irritability from grief, spasmodic, paradoxical symptoms. For digestive complaints: Nux vs Lycopodium — both have flatulence but Nux wakes at 3 AM while Lycopodium is worse 4-8 PM. Distinguishes from Strychninum: both have convulsive symptoms but Strychninum lacks the mental picture. Farrington's rule: Nux is the natural antidote for the modern sedentary, overworked, stimulant-abusing constitution.",
    relationships: {
      complementary: "Sulphur",
      antidotes: "Coffee",
      inimical: "Zincum",
      followsWell: "Sepia",
      followedBy: "Bryonia, Sulphur, Pulsatilla",
    },
  },
  {
    name: "Lycopodium",
    abbreviation: "Lyc",
    miasmaticClassification: "Sycotic + Psoric",
    keynotes:
      "Deep-seated, chronic constitutional remedy. Lack of self-confidence with dictatorial behavior at home. Right-sided symptoms, or left-to-right progression. Worse 4–8 PM. Digestive complaints: bloating immediately after eating. Craving for sweets. Craving for warm drinks. Anticipatory anxiety.",
    materiaMedicaSummary:
      "Lycopodium suits intellectually keen but physically weak individuals. Fan-like motion of alae nasi in respiratory complaints. Right-sided — kidney stone right, sore throat starts right, or right-to-left. Abdomen: full of gas, bloated, even after light food. Liver: right lobe affections. Impotence in young men with aversion to coition. Hair falling. Urinary: red sand in urine. Psoriasis. Eczema. Colds going to chest. Aggravated: 4–8 PM, warmth, warm food, right side, pressure of clothing. Ameliorated: warm drinks, uncovering, motion, after midnight.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Worse 4–8 PM — a very reliable keynote. 2) Intellectual activity with physical weakness. 3) Red sand in urine with renal colic. 4) Fan-like motion of wings of nose. 5) Sycotic with prominent liver complaints. 6) Craving for sweets and warm drinks. 7) Wants to be alone but dreads solitude.",
    clinicalIndications:
      "Digestive complaints. Liver diseases. Urinary calculi. Impotence. Respiratory complaints. Alopecia. Eczema. Psoriasis. Anxiety states. Right-sided headache.",
    rubrics:
      "ABDOMEN — FLATULENCE; GENERALS — TIME — 4–8 PM agg; KIDNEYS — PAIN — right; MIND — CONFIDENCE — want of self; URINE — SEDIMENT — red",
    farrington:
      "Farrington's comparative notes: Lycopodium is the 'intellectual remedy' — brain dominates brawn. Compare Silica: both are chilly, lack confidence, but Silica is more obstinate, Lycopodium more cowardly. Compare Argentum nitricum: both have anticipatory anxiety and flatulence but Arg-n is warm, craves sweets, worse from sugar; Lycopodium is chilly, craves sweets and warmth. Right-sidedness: Compare Chelidonium (right side, liver) — both are right-sided but Chel has the characteristic right shoulder blade pain. For kidney: Lyc has red sand; Pareira brava has constant urging with inability to urinate. Farrington notes: 'Lycopodium is the remedy of the 40-year-old man who has overtaxed his brain.'",
    relationships: {
      complementary: "Iodum",
      antidotes: "Camphor",
      inimical: "Coffea",
      followsWell: "Sulphur",
      followedBy: "Calcarea, Graphites, Kali Carb, Sulphur",
    },
  },
  {
    name: "Arsenicum Album",
    abbreviation: "Ars",
    miasmaticClassification: "Syphilitic + Psoric",
    keynotes:
      "Anxiety, restlessness, burning pains relieved by heat. Extreme weakness out of proportion to illness. Fastidious, anxious about health. Fear of death and being alone. Midnight and after (1–2 AM) aggravation. Thirst for frequent small sips of warm water. Burning discharge excoriating parts.",
    materiaMedicaSummary:
      "Arsenicum Album is the great tissue remedy. Profound debility, exhaustion, and emaciation with anguishing restlessness. Burning in every organ yet better from heat externally. GI: nausea, vomiting, diarrhea from bad food, cold fruits, ice cream; watery offensive stools. Skin: dry, rough, scaly, burning eruptions; skin looks like parchment. Asthma worse lying, better sitting up. Periodicity — complaints return every 7, 14, or 21 days. Aggravated: after midnight (1–2 AM), cold food/drink, exertion. Ameliorated: warmth, warm applications, sitting up, motion.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Burning pains better by heat — paradoxical but decisive. 2) Extreme restlessness with great prostration. 3) Great fear — fear of death, fear of being alone. 4) Periodical complaints — 7, 14, 21 days periodicity. 5) Fastidiousness — everything in order. 6) Aggravation at midnight and after. 7) Thirst for sips rather than large quantities.",
    clinicalIndications:
      "Gastroenteritis. Food poisoning. Asthma. Anxiety disorders. Cancer cachexia. Chronic skin diseases. Malaria (periodical). Typhoid. Debilitating illnesses.",
    rubrics:
      "MIND — ANXIETY — health about; MIND — RESTLESSNESS; GENERALS — MIDNIGHT — after; GENERALS — BURNING — heat, relieved by; STOMACH — THIRST — sips, in",
    farrington:
      "Farrington places Arsenicum as the leading remedy for the 'irritable, restless, exhausted' type. Compare Veratrum album: both have cold sweat, vomiting, diarrhea but Veratrum has more collapse and prostration; Arsenicum is more restless and anxious. Compare Phosphorus: both burn and have organotrophic action on lungs, liver but Phos has hemorrhagic tendency and is warm-blooded; Ars is chilly and restless. Distinguishes from China in debility: China's debility comes from loss of vital fluids, Arsenicum's from toxemia and sepsis. Farrington's key: 'The midnight aggravation, fear of death, restlessness in spite of weakness — the trinity of Arsenicum.' For malignancy and cachexia, Arsenicum leads over all other remedies.",
    relationships: {
      complementary: "Allium Sativa, Carbo Veg, Phosphorus, Sulphur, Thuja",
      antidotes: "China, Graphites, Hepar, Iodium, Nux Vomica",
      inimical: "None recorded",
      followsWell: "Aconite, Hepar, Phosphorus, Rhus Tox",
      followedBy: "Kali Arsenicum, Phosphorus, Sulphur, Thuja",
    },
  },
  {
    name: "Calcarea Carbonica",
    abbreviation: "Calc",
    miasmaticClassification: "Psoric",
    keynotes:
      "Fat, fair, flabby, chilly constitution. Cold and damp extremities (cold sweaty hands). Sweating of head, even during sleep, wetting the pillow. Craving for eggs and indigestible things. Slow development in children. Fears losing reason/going insane. Night terrors in children.",
    materiaMedicaSummary:
      "Calcarea Carbonica is prepared from the white of oyster shells and is a profound anti-psoric. The typical Calc patient is overweight, pale, flabby, with weak muscles and slow reflexes. Children: slow to walk/talk/dentition; large abdomen; night terrors; craving for eggs and chalk. Adults: chronic fatigue, obesity, hypothyroidism-like state. Glands: enlarged. Menses: too early, profuse. Perspiration: sour, offensive, particularly on head. Aggravated: exertion, cold and damp, ascending. Ameliorated: constipation, dry weather, lying on painful side.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Sweating on head at night — decisive keynote. 2) Cold and clammy hands. 3) Craving for eggs in all forms. 4) Slow in development — delayed milestones. 5) Enlarged glands. 6) Sour discharges — sour sweat, sour stool, sour vomiting. 7) Fears: insanity, dark, being observed.",
    clinicalIndications:
      "Childhood developmental delays. Hypothyroid state. Obesity. Chronic fatigue. Eczema. Uterine fibroids. Dental complaints. Recurrent respiratory infections.",
    rubrics:
      "HEAD — PERSPIRATION — sleep during; GENERALS — COLD — becoming, agg; STOMACH — DESIRES — eggs; MIND — FEAR — insane, of becoming; GENERALS — EXERTION — aggravates",
    farrington:
      "Farrington distinguishes Cal-c as the MIDDLE anti-psoric between Sulphur (surface/acute) and Lycopodium (deeply chronic). Cal-c: fair, fat, flabby, phlegmatic. Compare Baryta carbonica: both are slow and stout but Bar-c is more for senility and dwarfishness; Cal-c for the chilly, sweating, slow-learning child. Distinguishes from Silica: both are chilly and slow but Silica lacks the flabbiness and sweating head of Cal-c. 'The Calcarea child has a large head, sweats on the head at night, souring of everything.' Bone diseases: Cal-c vs Phosphorus — Cal-c for defective ossification with flabbiness; Phos for tall, slender, rapidly-growing bone conditions.",
    relationships: {
      complementary: "Belladonna, Lycopodium, Natrum Mur, Rhus Tox, Silica",
      antidotes: "Camphor, China, Nux Vomica, Sulphur",
      inimical: "Bromium, Nitric Acid",
      followsWell: "Belladonna, Nux Vomica, Sulphur",
      followedBy: "Lycopodium, Natrum Mur, Nux Vomica, Silica, Sulphur",
    },
  },
  {
    name: "Phosphorus",
    abbreviation: "Phos",
    miasmaticClassification: "Sycotic + Psoric",
    keynotes:
      "Tall, slender, delicate, with fine hair. Sympathetic, affectionate, anxious. Hemorrhagic tendency — blood bright red. Craves cold drinks, ice cream, salt. Burning between scapulae. Fear of dark, thunderstorms, being alone. Worse lying on left side. Indifferent to loved ones in serious illness.",
    materiaMedicaSummary:
      "Phosphorus is both a tissue remedy and a deep constitutional. Lean, tall, elegant with transparent skin, fine blonde or red hair, narrow chest. Mind: full of fears but magnetic, sympathetic personality. Hemorrhage: blood bright red, non-coagulating from any orifice. GI: vomiting when water warms in stomach; diarrhea exhausting; liver inflammation. Chest: bronchitis, pneumonia right lower lobe, with rust-colored sputum; can't lie on left. Aggravated: thunder, lying on left side, cold, alone. Ameliorated: cold food/drink (until it warms in stomach), lying on right side, rubbing, sleep.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Slender, delicate, tall build with transparency. 2) Craving for cold water which is vomited when it becomes warm. 3) Hemorrhagic diathesis — bright red blood. 4) Burning between shoulder blades. 5) Hungry soon after eating. 6) Fear of thunderstorm — lightning-like pains. 7) Indifference during serious illness (apathy).",
    clinicalIndications:
      "Pneumonia. Hemorrhagic conditions. Liver disease. Gastric ulcer. Anemia. Diabetes. Neuropathy. Anxiety disorders. Bone tuberculosis.",
    rubrics:
      "CHEST — LYING — left side, agg; GENERALS — HEMORRHAGE — bright red; STOMACH — THIRST — cold water; BACK — BURNING — scapulae between; MIND — FEAR — dark, of",
    farrington:
      "Farrington's notes: Phosphorus acts strongly on the nervous system, blood, and parenchymatous organs. Compare Ferrum phos: both have first-stage inflammations but Ferrum lacks the mental symptoms and hemorrhagic tendency of Phosphorus. Distinguishes from Tuberculinum: both are tall, slender, sensitive, chilly, with chest tendency; Tub has more rapid emaciation and family history of TB. Compare Arsenicum for pneumonia: Ars has more restlessness, anxiety, burning; Phos has more hepatization and blood-streaked expectoration. Farrington's rule: 'Phosphorus acts in any disease where there is great susceptibility to external impressions, when the vital powers are giving way.' The craving for cold drinks that become warm and are vomited is characteristic.",
    relationships: {
      complementary: "Arsenicum, Carbo Veg, Lycopodium",
      antidotes: "China, Coffea, Nux Vomica, Terebinthina",
      inimical: "Causticum",
      followsWell: "Arsenicum, Belladonna, Calc Carb, China",
      followedBy: "Arsenicum, Lycopodium, Sulphur",
    },
  },
  {
    name: "Belladonna",
    abbreviation: "Bell",
    miasmaticClassification: "Acute (Psoric base)",
    keynotes:
      "Sudden, violent onset. Three keynotes: heat, redness, throbbing. Dilated pupils. Dryness — dry mouth, dry throat, dry skin. Delirium — sees monsters, bites, strikes out. Throbbing headache with red face. Photophobia.",
    materiaMedicaSummary:
      "Belladonna is primarily an acute remedy for sudden, violent, inflammatory conditions. The face is bright red, hot, and dry. Pupils are dilated. Head throbs with every heartbeat. Wild delirium: seeing frightening visions, biting, striking. Throat: bright red, very dry, difficulty swallowing. Fever: dry burning heat with no perspiration. Meningism-like symptoms with photophobia, noise sensitivity. Convulsions in children. Aggravated: noise, light, jarring, afternoon, looking at bright objects. Ameliorated: rest, semi-erect position, warmth.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Inflammation always acute — intense heat, redness, throbbing. 2) Delirium — sees animals, wants to escape. 3) Photophobia with red eyes. 4) Throbbing headache worse jar, light, noise. 5) Dry mouth but thirstless in fever. 6) Convulsions in children with high fever.",
    clinicalIndications:
      "High fever. Encephalitis/meningitis (complementary). Acute tonsillitis. Acute otitis media. Sunstroke. Convulsions. Mastitis. Acute dysmenorrhea.",
    rubrics:
      "HEAD — PAIN — throbbing; FACE — REDNESS; GENERALS — HEAT — burning; MIND — DELIRIUM; GENERALS — ONSET — sudden",
    farrington:
      "Farrington compares Belladonna with Stramonium and Hyoscyamus in the trio of solanaceous remedies. Belladonna: acute violence — sudden onset, red face, dilated pupils, throbbing carotids — but subsides as rapidly. Stramonium: more persistently violent, terror, sees ghosts, wants light and company. Hyoscyamus: more low-grade, suspicious, jealousy, obscene, lascivious. For fever: Bell vs Aconite — Aconite has fear of death and dryness; Bell has delirium and throbbing. Farrington's key: 'Belladonna is indicated in all active conditions which come on suddenly, run a violent course, and have a tendency to end in delirium.' For children with high fever and convulsions, Bell vs Stramonium — Bell bites, Stramonium grinds teeth.",
    relationships: {
      complementary: "Calcarea carbonica",
      antidotes: "Camphor, Opium",
      inimical: "None significant",
      followsWell: "Calcarea",
      followedBy: "Calcarea, Hyoscyamus, Stramonium",
    },
  },
  {
    name: "Bryonia Alba",
    abbreviation: "Bry",
    miasmaticClassification: "Psoric",
    keynotes:
      "Dryness of all mucous membranes. Worse by any motion, better by pressure and rest. Stitching, tearing pains. Desires to lie still. Irritable, wants to go home. Great thirst for large quantities at long intervals. Lips and mouth dry.",
    materiaMedicaSummary:
      "Bryonia is the remedy of dryness and motion-aggravation. All mucous membranes are dry. Any motion makes the patient worse — holds the affected part, lies on the painful side (pressure better). Chest: pleurisy, pneumonia with stitching pain; cannot take deep breath. Joints: hot, red, swollen, worse motion. Constipation: stool dry as if burnt. Headache: worse motion, better pressure. Cough: worse on entering warm room, colds going to chest. Aggravated: any motion, warm room, morning, eating. Ameliorated: rest, pressure, cold, open air.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Worse any motion — must lie perfectly still. 2) Dryness of mucous membranes. 3) Irritable, wants to be left alone, wants to go home. 4) Stitching pains in chest and joints. 5) Large thirst at infrequent intervals. 6) Constipation — stool hard, dry.",
    clinicalIndications:
      "Pleuritis. Pneumonia. Arthritis. Constipation. Headache. Gastritis. Mastitis. Typhoid (early stage). Flu with muscle soreness.",
    rubrics:
      "GENERALS — MOTION — agg; GENERALS — PRESSURE — ameliorates; GENERALS — DRYNESS — mucous membranes; CHEST — PAIN — stitching, inspiration; STOMACH — THIRST — large quantities",
    farrington:
      "Farrington's comparative analysis: Bryonia is the 'great anti-inflammatory' for serous membranes. Compare Rhus tox: the fundamental difference — Bryonia patients want rest (pain worse any motion), Rhus tox patients cannot rest (pain better motion). For respiratory: Bryonia vs Phosphorus — Bryonia has rust-colored, brick-dust expectoration with sharp pleuritic stitches; Phos has hepatization, blood-streaked sputum. Distinguishes from Nux vomica in irritability: Bryonia resents being disturbed; Nux vomica is actively angry and hypersensitive. Farrington notes: 'Bryonia is the remedy when the synovial membranes are inflamed — the joints are hot, swollen, red, and exquisitely painful on any movement.'",
    relationships: {
      complementary: "Rhus tox",
      antidotes: "Aconite",
      inimical: "Calcarea",
      followsWell: "Natrum mur",
      followedBy:
        "Alumina, Calc Carb, Kali Carb, Natrum Mur, Nux Vomica, Pulsatilla, Sulphur",
    },
  },
  {
    name: "Natrum Muriaticum",
    abbreviation: "Nat-m",
    miasmaticClassification: "Psoric + Syphilitic",
    keynotes:
      "Grief, disappointed love — cannot cry in company, cries alone. Worse from consolation. Craving for salt. Anaemia. Weeping when alone. Mapped tongue. Cracks in corners of mouth. Intermittent fever with characteristic phases. Desires solitude yet fears being alone.",
    materiaMedicaSummary:
      "Natrum Muriaticum is the sodium chloride remedy. Deep grief that cannot be expressed — holds onto past hurts. Dwells on old unpleasant memories. Headache: migraine, hammering like little hammers, before and after menses. Skin: dry, oily in some areas, eczema in folds, herpes. Anemia from grief. Menses: irregular. Urine: involuntary on laughing, coughing. Leucorrhea: white, watery, acrid. Aggravated: 10 AM, heat, seashore, consolation, noise, music. Ameliorated: open air, cold, rest.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Grief — disappointed love — never gets over it. 2) Worse from consolation — anger or weeping if consoled. 3) Craving salt in all forms. 4) Mapped tongue — geographical tongue. 5) Herpes on lips (oral cold sores). 6) 10 AM aggravation. 7) Emaciation of neck despite eating well.",
    clinicalIndications:
      "Migraine. Grief disorders. Herpes simplex. Anemia. Eczema. Malaria. Hypothyroid states. Infertility. Chronic catarrh. Depression.",
    rubrics:
      "MIND — GRIEF — ailments from; MIND — CONSOLATION — aggravates; GENERALS — FOOD — salt, desire for; GENERALS — TIME — 10 AM agg; TONGUE — MAP-LIKE",
    farrington:
      "Farrington places Natrum mur as the chronic of Ignatia. Where Ignatia is acute grief/emotional shock, Natrum mur is the chronic state from sustained grief. Compare Sepia: both are reserved, indifferent, worse from consolation; but Sepia has the bearing-down sensation and hormonal changes while Natrum mur has mapped tongue and salt craving. Compare Lachesis: both have aggravation on waking, but Lachesis is loquacious and Natrum mur is taciturn. Farrington's key: 'Natrum muriaticum is one of the profoundest anti-psorics — its sphere of action covers the whole organism.' Distinguishes from Pulsatilla: Puls weeps easily and is comforted by it; Natrum mur weeps easily but is made worse by consolation.",
    relationships: {
      complementary: "Apis, Ignatia, Sepia",
      antidotes: "Arsenic, Phosphorus, Sulphur",
      inimical: "Argentum Nitricum",
      followsWell: "Apis, Ignatia, Kali Mur, Phosphorus, Sepia",
      followedBy: "Apis, Calcarea, Lycopodium, Sepia, Sulphur",
    },
  },
  {
    name: "Aconitum Napellus",
    abbreviation: "Acon",
    miasmaticClassification: "Psoric (Acute)",
    keynotes:
      "Sudden, violent onset of illness — always sudden. Fear of death — predicts the hour of death. Acute inflammatory conditions with high fever, dry burning heat, great thirst for cold water. Restlessness and anxiety. Worse at night and from cold wind. Caused by fright, dry cold wind, or sudden exposure.",
    materiaMedicaSummary:
      "Aconitum Napellus is the premier acute remedy for the very first stage of any acute illness. The onset is sudden — within hours of exposure. There is intense fear and anxiety with full, bounding pulse. Skin: dry, hot, no perspiration. Mind: great fear of death, predicts the time of death; restlessness; the patient cannot rest in any position. Croup: first-stage hoarse cough from cold night air. Fever: high, dry, burning heat, intense thirst for cold water. Eyes: red, inflamed, from cold or injury. After fright: convulsions, paralysis, emotional shock. Aggravated: night (especially midnight), cold wind, tobacco, music, lying on affected side. Ameliorated: open air, rest, sweating.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Sudden and violent — illness comes on quickly and intensely. 2) Fearfulness — fear of death, predicts own death time. 3) Restlessness with anguish. 4) Ailments from fright, dry cold wind, or shock. 5) Thirst for large quantities of cold water in fever. 6) No perspiration with burning fever. 7) Must be used in the first stage — not useful once perspiration begins.",
    clinicalIndications:
      "First stage of fevers. Croup. Acute conjunctivitis. Shock from fright. Palpitations from fear. Neuralgia from cold. Urine retention from fright. Restless insomnia from anxiety.",
    rubrics:
      "MIND — FEAR — death, of; GENERALS — ONSET — sudden; GENERALS — FEVER — dry heat; MIND — RESTLESSNESS — anxious; GENERALS — CAUSATION — fright",
    farrington:
      "Farrington's notes: Aconite is purely an acute remedy — no chronic indications. 'If you find yourself prescribing Aconite for weeks, change your remedy.' Compare Belladonna: Aconite in the first stage of inflammation — extreme fear, dry heat, thirst; Bell in the second stage with throbbing and delirium. Compare Coffea: both come from sudden shock/fright but Coffea is more from pleasant excitement; Aconite from fright and cold dry wind. Distinguishes from Ferrum phosphoricum in first stages: Ferrum phos lacks the anxiety and fear of Aconite. Farrington's rule: 'Aconite is suitable to robust, plethoric patients; not to those worn down by disease.' The numbness and tingling with the fear are the triad of Aconite.",
    relationships: {
      complementary: "Sulphur, Coffea",
      antidotes: "Camphor, Coffee, Nux vomica",
      inimical: "None significant",
      followsWell: "Bryonia",
      followedBy: "Belladonna, Bryonia, Sulphur",
    },
  },
  {
    name: "Sepia",
    abbreviation: "Sep",
    miasmaticClassification: "Psoric + Sycotic",
    keynotes:
      "Bearing down sensation in pelvis as if everything would fall out. Indifference to loved ones — to husband, children. Chilly yet worse from heat of room. Better from vigorous exercise, dancing. Irritable, wants solitude. Yellowish saddle across nose. Ball sensation in inner parts.",
    materiaMedicaSummary:
      "Sepia is the great female remedy made from cuttlefish ink. The Sepia woman is worn out, indifferent, and irritable. Bearing down pelvic sensation — must cross legs to prevent protrusion. Mind: indifference to family whom she loves; weeps when telling symptoms; dreads being alone but dislikes company. Skin: yellow complexion, yellowish patches on face, saddle across nose. Menses: late, scanty, or suppressed. Leucorrhea: yellowish-green, offensive. Prolapse of uterus. Liver: engorged, congested. Aggravated: cold air, before menses, evening, consolation. Ameliorated: vigorous exercise, warmth of bed, drawing up limbs, sleep.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Bearing down pelvic sensation — must cross legs. 2) Indifference to loved ones — her own family. 3) Yellow saddle across nose. 4) Chilly, worse cold but worse in warm room too. 5) Better from vigorous exercise. 6) Weeps when describing complaints. 7) Flushes of heat during menopause.",
    clinicalIndications:
      "Uterine prolapse. Dysmenorrhea. Menopause. Leucorrhea. Hepatic complaints. Constipation. Skin affections — eczema, ringworm. Depression with indifference. Morning sickness in pregnancy.",
    rubrics:
      "FEMALE — BEARING DOWN; MIND — INDIFFERENCE — loved ones; FACE — DISCOLORATION — yellow, saddle; GENERALS — EXERCISE — vigorous, ameliorates; MIND — WEEPING — telling symptoms",
    farrington:
      "Farrington compares Sepia extensively with Pulsatilla, Natrum mur, and Lachesis. Sepia: the 'washerwoman's remedy' — worn-out, indifferent, bearing-down sensation. Compare Pulsatilla: both are female remedies; Pulsatilla is emotional and yielding, Sepia is cold and indifferent. Compare Natrum mur: both worse from consolation but Natrum mur is more intellectual; Sepia is more physical and hormonal. Farrington's key: 'Sepia acts on the portal circulation, the uterus, and the skin — the patient looks as if she needed a good wash of yellow-brown complexion.' For menstrual disorders, Sepia vs Sabina: Sepia has the bearing-down; Sabina has bright red hemorrhage with clots. Distinguishes from Helonias: both have uterine exhaustion but Helonias has the peculiar symptom — pain relieved when attention is called to it.",
    relationships: {
      complementary: "Natrum mur",
      antidotes: "Nux vomica",
      inimical: "Bryonia, Lachesis, Pulsatilla",
      followsWell: "Pulsatilla",
      followedBy: "Natrum Mur, Sulphur",
    },
  },
  {
    name: "Silicea",
    abbreviation: "Sil",
    miasmaticClassification: "Tubercular + Psoric",
    keynotes:
      "Lack of vital heat. Chilly, sensitive to cold drafts. Suppuration — promotes expulsion of foreign bodies. Offensive perspiration of feet. Lack of confidence, yielding, obstinate when aroused. Slow in healing. Delicate, fine-featured constitution. Brittle, ingrowing nails.",
    materiaMedicaSummary:
      "Silicea (pure flint) is a deep constitutional remedy for poor assimilation and suppuration. The Silicea patient is refined, delicate, and lacks stamina. Every injury suppurates; slow healing. Mind: yielding, timid, lacks self-confidence; yet obstinate with fixed ideas. Glands: indurated, suppurating lymph nodes. Skin: keloids, unhealthy skin, every wound suppurates. Bone: caries, fistulae, abscesses at roots of teeth. Perspiration: offensive, on feet and axillae. Head: sweaty head during sleep. Constipation: stool recedes when partially expelled ('bashful stool'). Aggravated: cold, uncovering, drafts, exertion. Ameliorated: warmth, wrapping head, summer.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Excessive offensive perspiration of feet. 2) Bashful stool — recedes when partially expelled. 3) Suppuration with fistulous openings. 4) Promotes expulsion of foreign bodies — splinters, bones. 5) Lack of grit — mentally and physically. 6) Ingrowing toenails. 7) Keloid formations.",
    clinicalIndications:
      "Recurrent boils and abscesses. Fistulae. Sinusitis. Chronic ear discharge. Bone caries. Keloids. Ingrowing nails. Lack of stamina. Nutritional deficiencies. Expulsion of foreign bodies.",
    rubrics:
      "GENERALS — PERSPIRATION — offensive; RECTUM — CONSTIPATION — recedes, stool; GENERALS — COLD — sensitive to; MIND — CONFIDENCE — lack of self; SKIN — SUPPURATION",
    farrington:
      "Farrington places Silica as a deep-acting, slow, chronic remedy. Compare Calcarea carb: both are chilly but Cal-c is fat and flabby; Silica is lean and obstinate. Compare Pulsatilla: Silica is stubborn where Pulsatilla is yielding and weeps easily. Farrington's note: 'Silica is the chronic of Pulsatilla in many cases.' For suppuration: Silica vs Hepar sulph — Hepar is more sensitive to touch and cold air and more acute; Silica works more chronically to absorb or expel foreign bodies. Distinguishes from Phosphorus for nervous system: Phos is warm-blooded with burning; Silica is chilly with excessive sweating of head and feet. 'Give Silica when a patient is losing ground slowly — it acts deeply on nutrition.'",
    relationships: {
      complementary: "Pulsatilla",
      antidotes: "Fluoric acid",
      inimical: "Mercury (do not use before Mercury)",
      followsWell: "Sulphur",
      followedBy: "Calc Carb, Graphites, Hepar Sulph, Sulphur",
    },
  },
  {
    name: "Rhus Toxicodendron",
    abbreviation: "Rhus-t",
    miasmaticClassification: "Sycotic",
    keynotes:
      "Worse on first motion, better continued motion. Worse rest, better movement. Triangular red tip of tongue. Worse from cold and damp. Restlessness — must keep moving. Tearing pains in muscles and joints. Stiffness worse in cold damp weather.",
    materiaMedicaSummary:
      "Rhus Tox is the great remedy for rheumatic and musculoskeletal complaints. Initial motion is agonizing — patient limps and groans on getting up, but as movement continues, the pain eases. Skin: urticaria, vesicular eruptions (like poison ivy contact), intense itching. Joints: hot, painful, stiff, worse in damp cold. Ligaments and tendons: strains and sprains. Typhoid: the restless typhoid — cannot lie still, tosses. Mental restlessness mirrors physical. Red triangular tip of tongue. Aggravated: rest, cold, damp, night, beginning motion. Ameliorated: continued motion, warmth, dry weather, changing position.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Worse rest, better continued motion — the great keynote. 2) Triangular red tip of tongue. 3) Worse cold and damp — the season of aggravation. 4) Vesicular skin eruptions with intense itching. 5) Restlessness — compelled to move constantly. 6) Ligament and tendon complaints from overstraining. 7) Stiffness of joints worse beginning motion.",
    clinicalIndications:
      "Rheumatism. Sprains and strains. Lumbago. Sciatica. Typhoid. Herpes zoster. Urticaria. Cellulitis. Bell's palsy. Chickenpox.",
    rubrics:
      "GENERALS — MOTION — beginning, agg; GENERALS — MOTION — continued, ameliorates; GENERALS — WEATHER — wet, agg; TONGUE — RED, tip; GENERALS — REST — agg",
    farrington:
      "Farrington's central comparison: Rhus tox vs Bryonia — the defining pair. Bryonia: worse any motion; Rhus tox: better from motion (first motion painful, continued motion relieves). Compare Anacardium: both have skin eruptions and restlessness but Anacardium has a unique irresistible impulse and lack of moral sentiment. For rheumatic complaints: Rhus vs Ruta — Rhus is for tendons and muscles; Ruta is specifically for periosteum and cartilage. Farrington notes: 'Rhus tox has a special affinity for the fibrous tissue — tendons, aponeuroses, fasciae.' For typhoid states: Rhus vs Baptisia — both have stupor and offensive discharges; Baptisia has the peculiar delusion of the body being scattered.",
    relationships: {
      complementary: "Bryonia, Calcarea Carb, Phytolacca",
      antidotes: "Apis, Belladonna, Bryonia, Coffea, Croton Tig",
      inimical: "None significant",
      followsWell: "Arnica, Bryonia, Calc Carb",
      followedBy: "Calc Carb, Phytolacca, Sulphur",
    },
  },
  {
    name: "Ignatia Amara",
    abbreviation: "Ign",
    miasmaticClassification: "Psoric",
    keynotes:
      "Acute grief, disappointed love. Contradictory and paradoxical symptoms. Sighing, sobbing. Lump in throat (globus hystericus). Silent grief — cannot express it. Involuntary sighing. Changeable moods rapidly alternating. Worse from tobacco smoke.",
    materiaMedicaSummary:
      "Ignatia is the acute grief remedy par excellence. Made from St. Ignatius bean. The patient is sensitive, nervous, and highly emotional. Contradictory symptoms: sore throat better swallowing solids; empty feeling not relieved by eating; fever without thirst; cough worse from coughing. Convulsions from grief or fright. Headache: as if a nail driven in, better lying on it. Cramping pains. Hiccough. Involuntary sighing. Mind: rapid alternation of moods — laughing to weeping. History of loss or disappointment. Aggravated: grief, fright, tobacco, coffee, strong smells, consolation. Ameliorated: change of position, lying on painful side, solitude, eating.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Acute grief — recent bereavement or disappointed love. 2) Contradictory and paradoxical symptoms throughout. 3) Globus hystericus — sensation of lump in throat. 4) Silent, introspective grief — does not want to talk. 5) Sighing and sobbing involuntarily. 6) Rapidly changing moods. 7) Sensitive to tobacco smoke.",
    clinicalIndications:
      "Grief reactions. Hysteria. Conversion disorders. Headache from grief. Insomnia after emotional shock. Hiccough. Globus hystericus. Convulsions in children from fright.",
    rubrics:
      "MIND — GRIEF; MIND — SIGHING; THROAT — LUMP, sensation of; GENERALS — AILMENTS FROM — grief; MIND — MOODS — changeable",
    farrington:
      "Farrington notes: Ignatia is the acute grief remedy par excellence. Compare Natrum mur: Ignatia is acute, Natrum mur is chronic. The mother who cannot cry after losing her child needs Natrum mur; the one who weeps convulsively needs Ignatia. Compare Nux vomica: both are hypersensitive; Nux is from overwork/stimulants, Ignatia from grief/disappointment. Farrington's key: 'The contradictory, paradoxical symptoms of Ignatia are its most distinctive feature — sore throat better swallowing solids; hunger satisfied by a small amount; fever better from uncovering.' For spasms: Ignatia vs Hyoscyamus — Ignatia's convulsions are from emotional excitement; Hyoscyamus from toxic stupefaction. The globus hystericus of Ignatia is without parallel.",
    relationships: {
      complementary: "Nat Mur",
      antidotes: "Pulsatilla, Cocculus",
      inimical: "Coffea, Nux Vomica (do not alternate)",
      followsWell: "Aconite, Chamomilla, Nux Vomica",
      followedBy: "Natrum Mur, Sepia, Zincum",
    },
  },
  // --- Additional remedies from user data ---
  {
    name: "Lachesis",
    abbreviation: "Lach",
    miasmaticClassification: "Syphilitic",
    keynotes:
      "Left-sided remedy. Cannot bear tight clothing around neck or waist. Talkative, loquacious, jumps from subject to subject. Worse after sleep — wakes up worse. Better from discharges. Jealous, suspicious nature. Hot patient.",
    materiaMedicaSummary:
      "Lachesis is made from the venom of the bushmaster snake. A deep constitutional remedy, especially suited to climacteric complaints. Complaints are predominantly left-sided or travel from left to right. The patient cannot tolerate anything tight around the neck or waist. Great loquacity — talks constantly and rapidly, jumping from topic to topic. Jealousy and suspicion are marked. Worse after sleep — wakes in aggravation. Hot, flushes of heat at menopause. Hemorrhagic tendency with dark, decomposed blood. Throat: quinsy, left-sided tonsillitis. Heart: palpitations, anxiety about heart. Aggravated: after sleep, heat, tight clothing, sun, suppressed discharges. Ameliorated: discharges, cold applications.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Worse after sleep — wakes in aggravation (keynote). 2) Cannot bear tight clothes around neck. 3) Left-sided or left-to-right complaints. 4) Loquacity — talks without pause. 5) Jealousy and suspicion prominent. 6) Menopause with hot flushes and hemorrhage. 7) Dark, decomposed hemorrhagic discharges.",
    clinicalIndications:
      "Climacteric complaints. Left-sided sore throat. Hemorrhagic conditions. Jealousy and suspicious states. Varicose veins. Heart complaints. Typhoid with hemorrhage.",
    rubrics:
      "MIND — LOQUACITY; MIND — JEALOUSY; GENERALS — SLEEP — after, agg; GENERALS — CLOTHING — tight, intolerance; GENERALS — SIDE — left",
    farrington:
      "Farrington places Lachesis among the snake venoms with Crotalus, Elaps, and Naja. Lachesis: left-sidedness (or right to left), aggravation on waking from sleep, worse tight clothing around throat. Compare Crotalus horridus: more decomposition of blood, more hemorrhagic, jaundice; Lachesis has more frenzy and loquacity. Compare Lycopodium: both have right-to-left or left sidedness; Lycopodium right-to-left; Lachesis more purely left. Farrington's note: 'Lachesis is especially suited to women at the climacteric, to drunkards, and to low fevers with septic tendency.' Distinguishes from Naja: Naja is quieter, has more cardiac symptoms; Lachesis is more violent, jealous, loquacious. For throat: Lachesis vs Mercurius — Merc has more suppuration; Lachesis is worse after sleep.",
    relationships: {
      complementary: "Lycopodium, Hepar Sulph",
      antidotes: "Nux Vomica, Arsenicum, Alcohol",
      inimical: "Acetic Acid, Carbolic Acid",
      followsWell: "Sulphur, Lycopodium",
      followedBy: "Sepia, Hepar Sulph",
    },
  },
  {
    name: "Mercurius Solubilis",
    abbreviation: "Merc sol",
    miasmaticClassification: "Syphilitic",
    keynotes:
      "Offensive discharges from all orifices. Profuse salivation, even drooling on pillow. Trembling. Perspiration without relief — worse from sweating. Worse at night. Ulcers with irregular edges. Syphilitic miasm base remedy.",
    materiaMedicaSummary:
      "Mercurius Solubilis is Hahnemann's preparation of mercury. The great anti-syphilitic. Offensiveness is the keynote — breath, perspiration, discharges all smell bad. Salivation is profuse with moist mouth yet thirsty. Profuse perspiration that gives no relief — patient is worse after perspiring. Worse at night. Glands: suppurating, swollen. Throat: ulcers with gray membrane, tonsillitis. Gums: swollen, bleed easily, indented by teeth. Trembling of hands and tongue. Aggravated: night, lying on right side, sweating, wet weather. Ameliorated: moderate temperature (neither cold nor hot).",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Offensiveness of all discharges. 2) Profuse salivation with bad odor. 3) Perspiration without relief. 4) Worse at night — classic syphilitic periodicity. 5) Ulcers with irregular, undermined edges. 6) Glands suppurating. 7) Sensitive to both heat and cold — the 'mercury thermometer' remedy.",
    clinicalIndications:
      "Syphilitic conditions. Tonsillitis with ulcers. Suppurating glands. Gingivitis. Dysentery. Otitis media. Rheumatism worse at night. Liver complaints.",
    rubrics:
      "MOUTH — SALIVATION; GENERALS — PERSPIRATION — profuse, without relief; GENERALS — NIGHT — agg; MOUTH — ODOR — offensive; GENERALS — DISCHARGES — offensive",
    farrington:
      "Farrington's comparative analysis: Mercurius vs Hepar sulph vs Silicea in suppurative conditions. Merc: acts on all mucous membranes; profuse sweating that does not relieve; salivation; trembling. Hepar sulph: more sensitive to cold air — CATCHES cold from slightest draught; more splinter-like pains. Silica: chronic suppurations; slow; absorbs or expels. Compare Nitric acid: both affect mucous membrane-skin junctions (anus, lips, nostrils) but Nitric acid has more splinter-like, sticking pains. Farrington's key: 'Mercury affects the periosteum and the glands — caries of bone and glandular enlargement are its two great keynotes.' The aggravation at night and in the warmth of bed distinguishes Merc from Hepar (which is aggravated in cold).",
    relationships: {
      complementary: "Hepar Sulph, Silicea, Belladonna",
      antidotes: "Hepar Sulph, Lachesis, Sulphur, Aurum",
      inimical: "Silicea (do not follow Silica closely)",
      followsWell: "Belladonna, Kali Mur",
      followedBy: "Silicea, Hepar Sulph",
    },
  },
  {
    name: "Hepar Sulphuris",
    abbreviation: "Hepar sulph",
    miasmaticClassification: "Syphilitic + Psoric",
    keynotes:
      "Extreme sensitivity — to pain, touch, cold, and drafts. Suppuration — promotes or checks it depending on potency. Chilly remedy. Splinter-like pains. Irritable, angry, wants to kill. Fishy or sour smell of discharges.",
    materiaMedicaSummary:
      "Hepar Sulphuris (calcium sulphide) was Hahnemann's antidote to mercury abuse. Extreme hypersensitivity: the slightest draft causes illness; the slightest touch causes unbearable pain. Mind: extremely irritable, hasty, impulsive anger — wants to harm others or set fire to things. Suppuration: every wound or injury tends to suppurate. Croup: loose rattling cough, child wraps up warmly. Skin: unhealthy — every injury festers. Throat: sensation of a fish bone or splinter. Low potency promotes suppuration; high potency aborts it. Aggravated: cold, dry winds, touch, undressing, lying on affected side. Ameliorated: warmth, wrapping up, damp weather.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Extreme sensitivity to cold — cannot bear the slightest draft. 2) Suppurative tendency — everything suppurates. 3) Splinter sensation in throat or skin. 4) Irritable, hasty — wants to destroy. 5) Sourness of discharges and body odor. 6) Low potency promotes suppuration; high potency aborts it. 7) Croup with loose rattling.",
    clinicalIndications:
      "Suppurative conditions — boils, abscesses, carbuncles. Croup. Tonsillitis with abscess. Otitis media with discharge. Sinusitis. Skin ulcers. Corneal ulcers.",
    rubrics:
      "GENERALS — COLD — sensitive to; SKIN — SUPPURATION; THROAT — PAIN — splinter, as from; MIND — IRRITABILITY — extreme; GENERALS — DISCHARGES — sour",
    farrington:
      "Farrington compares Hepar sulph with Mercurius and Silica in suppurative states. Hepar: the most sensitive — slightest cold air, touch, or draught aggravates; wants to be wrapped warmly. Compare Mercurius: both affect glands and mucous membranes; but Merc has more night aggravation and salivation; Hepar has more sensitivity to cold and more splinter-like pains. Compare Silica: Hepar is more acute; Silica is more chronic and milder. Farrington's note: 'Low potencies of Hepar promote suppuration; high potencies abort it — a practical consideration for the prescriber.' For croup: Hepar vs Spongia — Spongia has hard, dry, croupy cough without rattling; Hepar has rattling loose cough with easy expectoration.",
    relationships: {
      complementary: "Silicea, Calendula",
      antidotes: "Belladonna, Chamomilla, Silica",
      inimical: "None significant",
      followsWell: "Merc Sol, Belladonna",
      followedBy: "Silicea, Merc Sol",
    },
  },
  {
    name: "Chamomilla",
    abbreviation: "Cham",
    miasmaticClassification: "Psoric",
    keynotes:
      "Irritable child — nothing pleases, cannot be pacified. One cheek red, one pale. Pain is intolerable — out of proportion to condition. Better when carried. Teething complaints. Worse at night and from anger.",
    materiaMedicaSummary:
      "Chamomilla is the primary remedy for extreme irritability and intolerance of pain. The keynote is: the pain is unbearable — the patient howls, weeps, and demands things which, when offered, are rejected. In children: cross, will not be touched except when carried; teething with diarrhea (green, slimy, smells like rotten eggs). One cheek red and hot, other pale and cold. Colic in babies, better when carried and rocked. Adults: neuralgic pains driving to distraction. Aggravated: night, heat, anger, wind, teething. Ameliorated: being carried, warm wet weather, sweating.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Intolerance of pain — screams, cannot bear it. 2) Child wants to be constantly carried. 3) One cheek red, one pale. 4) Teething with hot green diarrhea. 5) Nothing satisfies — asks for things then refuses them. 6) Worse from anger. 7) Oversensitiveness to all impressions.",
    clinicalIndications:
      "Teething complaints. Infantile colic. Earache in children. Dysmenorrhea with unbearable pain. Neuralgic pains. Toothache. Insomnia from pain or irritability.",
    rubrics:
      "MIND — IRRITABILITY; MIND — CARRIED, desires to be; FACE — DISCOLORATION — one-sided; PAIN — UNBEARABLE; GENERALS — ANGER — ailments from",
    farrington:
      "Farrington places Chamomilla in its trio with Coffea and Nux vomica for hypersensitivity. Chamomilla: irritable, peevish, cannot bear pain — pain drives to despair. Compare Coffea: oversensitive to pain; Coffea from happy excitement; Chamomilla from anguish. Compare Pulsatilla in children: Pulsatilla child is gentle, tearful, desires company; Chamomilla child demands to be carried and is cross — throws things away that were asked for. Farrington's key: 'Chamomilla is the remedy where mental irritability reaches its zenith — the one great keynote is that the child is better when carried.' For toothache: Chamomilla vs Mercurius — Merc toothache worse at night; Chamomilla toothache driven to frenzy, better by warmth.",
    relationships: {
      complementary: "Belladonna, Magnesia Phos",
      antidotes: "Nux Vomica, Pulsatilla, Aconite",
      inimical: "Zinc",
      followsWell: "Aconite, Pulsatilla, Belladonna",
      followedBy: "Belladonna, Sulphur, Calc Carb",
    },
  },
  {
    name: "Gelsemium",
    abbreviation: "Gels",
    miasmaticClassification: "Psoric",
    keynotes:
      "Dullness, drowsiness, dizziness, and trembling (4 D's). Stage fright — anticipatory anxiety with diarrhea and trembling. Heaviness of eyelids — cannot open eyes. Gradual onset. Better after urination. Absence of thirst.",
    materiaMedicaSummary:
      "Gelsemium (yellow jasmine) covers influenza, neurological conditions, and performance anxiety. The patient looks dull, drowsy, and heavy-lidded. Great weakness — limbs feel heavy as lead. Influenza: slow gradual onset, dull headache at occiput, aching muscles, chills up and down spine. Anticipatory anxiety: stage fright, examination funk, pre-event diarrhea, trembling. Paralytic weakness of muscles. Vertigo: staggering gait. Neuralgia. Fever: without thirst; sweating relieves. Aggravated: damp weather, anticipation, emotion, exertion, excitement. Ameliorated: urination (especially headache), rest, stimulants, continued motion.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) The 4 D's — dullness, drowsiness, dizziness, diplopia. 2) Stage fright — trembling, diarrhea before an event. 3) Heaviness of eyelids — drooping. 4) Gradual onset of complaints. 5) Better after profuse urination. 6) Absence of thirst even in fever. 7) Paralytic weakness — can barely lift limbs.",
    clinicalIndications:
      "Influenza. Anticipatory anxiety. Stage fright. Examination anxiety. Cervical spondylosis. Neurological weakness. Ptosis. Headache at occiput.",
    rubrics:
      "MIND — ANTICIPATION; EYES — HEAVINESS — lids; GENERALS — WEAKNESS — paralytic; MIND — FEAR — appearing in public; GENERALS — INFLUENZA",
    farrington:
      "Farrington's notes: Gelsemium is the leading remedy for nervous debility and functional paralysis. Compare Baptisia: both produce stupor and dullness but Baptisia has more septic tendency and offensive odor; Gelsemium has more paresis and trembling. Compare Ignatia: both have nervous symptoms from emotional excitement; Ignatia is hysterical, paradoxical; Gelsemium is paralytic and drooping. Farrington's key: 'The three D's of Gelsemium — Dullness, Dizziness, Drowsiness — are its most characteristic indications.' For anticipatory anxiety: Gelsemium vs Argentum nitricum — Arg-n has more palpitation, hurry, and desire for sweets; Gelsemium has more trembling and diarrhea from nervousness. In influenza, Gelsemium is the most important remedy.",
    relationships: {
      complementary: "Baptisia, Ipecac",
      antidotes: "Coffea, Digitalis, Nux Vomica",
      inimical: "None significant",
      followsWell: "Aconite, Belladonna, Baptisia",
      followedBy: "Baptisia, Sulphur",
    },
  },
  {
    name: "Kali Carbonicum",
    abbreviation: "Kali carb",
    miasmaticClassification: "Sycotic",
    keynotes:
      "3 AM aggravation — wakes at 3 AM with asthma or pain. Stitching, cutting pains. Weakness of back — must sit up from lying. Bag-like swelling of upper eyelids. Chilly, anxious. Never wants to be alone. Anxiety felt in stomach.",
    materiaMedicaSummary:
      "Kali Carbonicum (potassium carbonate) is a deep constitutional remedy. The patient is weak, chilly, and overly conscientious. Never well since a difficult delivery (women). The classic 3 AM aggravation is decisive. Stitching pains everywhere, especially chest (pleurisy, pneumonia). Bag-like swelling between upper lid and eyebrow. Back: extreme weakness, must be helped to sit up. Anxiety felt in epigastrium — the stomach knot of anxiety. Asthma worse 2–4 AM. Constipation. Aggravated: cold, 3 AM, exertion, coition, after childbirth. Ameliorated: warmth, sitting forward, daytime.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) 3 AM aggravation — decisive keynote. 2) Stitching pains in chest and elsewhere. 3) Bag-like puffiness of upper eyelids. 4) Weakness of back — cannot rise without help. 5) Anxiety felt in epigastrium. 6) Never wants to be alone — dreads solitude. 7) Never well since childbirth or miscarriage.",
    clinicalIndications:
      "Asthma. Pleurisy. Lumbago. Cardiac affections. Post-partum weakness. Constipation. Anemia. Cough worse 3 AM.",
    rubrics:
      "GENERALS — NIGHT — 3 AM agg; CHEST — PAIN — stitching; BACK — WEAKNESS; EYE — SWELLING — upper lid; STOMACH — ANXIETY, sensation",
    farrington:
      "Farrington places Kali carb as one of the deepest-acting constitutional remedies. Compare Arsenicum: both are chilly, anxious, precise, and sensitive; but Kali carb has the unique 3 AM aggravation and bag-like swelling between upper eyelid and brow. Compare Natrum mur: both are reserved and precise; Natrum mur is more refined; Kali carb is more dogmatic and rule-bound. Farrington's key: 'Kali carb patients are very particular, obstinate — they want everything done by rule.' The stitching pains in the chest worse from motion and pressure are characteristic (compare Bryonia — but Kali carb's pains are not relieved by firm pressure). For lung affections with emphysema, Kali carb is unsurpassed.",
    relationships: {
      complementary: "Arsenicum, Carbo Veg, Phosphorus",
      antidotes: "Camphor, Coffea",
      inimical: "None significant",
      followsWell: "Sepia, Sulphur, Lycopodium",
      followedBy: "Sulphur, Causticum",
    },
  },
  {
    name: "Causticum",
    abbreviation: "Caust",
    miasmaticClassification: "Syphilitic (Pseudo-psoric)",
    keynotes:
      "Paralysis — gradual, of single parts. Cannot bear injustice — sympathetic, indignant. Worse dry cold wind, better in damp wet weather. Burning raw pains. Paralytic weakness. Warts on face. Involuntary urination on coughing.",
    materiaMedicaSummary:
      "Causticum (Hahnemann's tinctura acris sine kali) is unique to Homoeopathy. A deep remedy for progressive paralysis and chronic catarrhal conditions. Paralysis: facial, vocal cords (hoarseness), bladder (dribbling), ptosis. Warts: large, fleshy, on nose and face. Mind: sympathetic, feels deeply for others; indignation at injustice. Rawness and soreness of mucous membranes. Rheumatism: shortening of tendons, contractures. Children: late to walk. Aggravated: dry cold wind, clear fine weather, motion. Ameliorated: damp wet weather, warmth, washing.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Paralysis — gradual and progressive, of single parts. 2) Better in wet weather — unusual modality. 3) Rawness and burning of mucous membranes. 4) Warts — large, pedunculated on face. 5) Involuntary urination on coughing or sneezing. 6) Sympathetic — cannot bear suffering of others. 7) Contracture of tendons.",
    clinicalIndications:
      "Facial paralysis. Vocal cord paralysis (hoarseness). Enuresis. Warts. Rheumatism with contractures. Ptosis. Chronic cystitis.",
    rubrics:
      "GENERALS — PARALYSIS; GENERALS — WEATHER — wet, ameliorates; BLADDER — URINATION — involuntary — coughing; GENERALS — SYMPATHETIC; SKIN — WARTS",
    farrington:
      "Farrington notes: Causticum is one of Hahnemann's own preparations — not found in nature. Compare Rhus tox: both improve in warm wet weather (unique among most remedies that aggravate in damp); both have paretic symptoms. Distinguishes from Gelsemium: Causticum's paralysis comes from sustained grief, long-lasting disease; Gelsemium from sudden nerve shock. Compare Arsenicum: both are chilly and restless; Causticum has more paralysis and political/moral intensity; Arsenicum has midnight restlessness. Farrington's key: 'Causticum is pre-eminently a remedy for the effects of burns — fresh burns that blister, with pain and rawness.' The sympathetic nature of Causticum ('cannot bear injustice, weeps over others' sorrow') is a guiding mental.",
    relationships: {
      complementary: "Carbo Veg, Petroseline",
      antidotes: "Nux Vomica, Coffea, Paralysis",
      inimical: "Phosphorus, Sulphur (do not use together)",
      followsWell: "Colocynth, Kali Carb, Rhus Tox",
      followedBy: "Carbo Veg, Sulphur",
    },
  },
  {
    name: "Carbo Vegetabilis",
    abbreviation: "Carb veg",
    miasmaticClassification: "Sycotic",
    keynotes:
      "Collapse with air hunger — wants to be fanned. Cold body yet desires cool air blown on face. Venous stasis and sluggish circulation. Bloating and flatulence after eating. The 'corpse reviver.' Vital force almost gone.",
    materiaMedicaSummary:
      "Carbo Vegetabilis (vegetable charcoal) is the great restorative remedy for near-collapse states. The patient is icy cold — cold breath, cold sweat, cold skin — yet wants to be fanned with cool air. Venous engorgement and passive hemorrhage of dark blood. Abdomen: tremendous flatulence, worse after eating any food; eructations give temporary relief. Lungs: chronic bronchitis, asthma with rattling; cannot take a deep breath. The 'last resort' remedy in collapse, post-operative weakness, or extreme debility. Aggravated: fatty food, wine, warm damp evening, lying down. Ameliorated: fanning, eructation, cool air.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Cold, clammy body with desire for fanning. 2) Air hunger — wants cool air though body is cold. 3) Flatulence — whole abdomen distended with gas. 4) Passive hemorrhage of dark blood. 5) Vital force depleted — corpse reviver. 6) Worse fatty food and lying down. 7) Eructations give temporary relief.",
    clinicalIndications:
      "Collapse states. Post-operative weakness. Chronic bronchitis with rattling. Passive hemorrhage. Varicose veins. Flatulent dyspepsia. Venous stasis.",
    rubrics:
      "GENERALS — COLLAPSE; CHEST — RESPIRATION — desire for fanning; ABDOMEN — FLATULENCE; GENERALS — COLD — body, with desire for cool air; HEMORRHAGE — dark, passive",
    farrington:
      "Farrington's comparative notes: Carbo veg is the 'corpse reviver.' Compare Arsenicum: both have weakness and cold but Arsenicum is restless; Carbo veg is sluggish and prostrated. Compare China: both have debility after loss of vital fluids; China is more nervous, sensitive to touch; Carbo veg is more venous, dusky, needs air but is cold. Farrington's key: 'Carbo veg is suited to patients who have never recovered from the effects of exhausting disease — they become sluggish, cold, and cyanotic.' The characteristic craving for fanning — wants air yet is cold to touch — is diagnostic. Distinguishes from Antimonium tartaricum: Ant-t has more rattling and drowsiness; Carbo veg has more coldness and need for air.",
    relationships: {
      complementary: "Arsenicum, Kali Carb, Phosphorus",
      antidotes: "Camphor, Coffea, Lachesis, Nux Vomica",
      inimical: "None significant",
      followsWell: "China, Phosphorus, Sulphur",
      followedBy: "Arsenicum, Sulphur, Drosera",
    },
  },
  {
    name: "Cina",
    abbreviation: "Cina",
    miasmaticClassification: "Psoric",
    keynotes:
      "Worm complaints — especially roundworms. Irritable child, cross, does not want to be touched. Picks nose constantly. Grinds teeth at night. Pale face with dark rings around eyes. Craves sweets.",
    materiaMedicaSummary:
      "Cina (wormseed) is the chief remedy for intestinal worms in children, particularly ascarides (roundworms) and pinworms. The child is extremely cross, irritable, and will not be touched or carried. Picks nose, bores into it constantly. Grinds teeth at night (bruxism). Face pale with dark rings around eyes. Convulsions from worms — especially at night. Squinting. Itching at anus. Hungry despite eating. Aggravated: worms, night, touch, looking fixedly. Ameliorated: lying on abdomen, rocking gently.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Worm complaints — roundworms and pinworms. 2) Child irritable — will not be touched. 3) Picks and bores into nose. 4) Grinds teeth at night. 5) Convulsions from worm irritation. 6) Pale face with dark circles. 7) Hungry soon after eating.",
    clinicalIndications:
      "Intestinal worms. Convulsions from worms. Bruxism. Itching at anus. Irritable children. Bed-wetting with worms.",
    rubrics:
      "GENERALS — WORMS; MIND — IRRITABILITY — touch, from; NOSE — BORING; SLEEP — GRINDING — teeth; FACE — DISCOLORATION — pale with dark circles",
    farrington:
      "Farrington notes: Cina is the primary remedy for worm affections in children. Compare Spigelia for worm symptoms: Spigelia has more neuralgic pains; Cina has more reflex irritation of the nervous system. Compare Chamomilla: both produce irritable, cross children; Chamomilla is pacified by carrying; Cina is more grinding of teeth, boring at nose, and touchy (cannot be touched or approached). Farrington's key: 'The Cina child wants things and then throws them away — similar to Chamomilla, but Cina has the grinding of teeth and the characteristic abdominal symptoms.' Distinguishes from Calcarea in the worm patient: Calcarea's child is slow; Cina's is irritable and active.",
    relationships: {
      complementary: "Calcarea Carb, Spigelia",
      antidotes: "Camphor, Nux Vomica",
      inimical: "None significant",
      followsWell: "Chamomilla, Sulphur",
      followedBy: "Sulphur, Santoninum",
    },
  },
  {
    name: "Antimonium Tartaricum",
    abbreviation: "Ant tart",
    miasmaticClassification: "Sycotic",
    keynotes:
      "Rattling of mucus in chest with inability to expectorate. Drowsy, sweaty, and prostrated. Weakness so great that coughing exhausts. Face pale with cold sweat. Worse lying down. Better sitting upright.",
    materiaMedicaSummary:
      "Antimonium Tartaricum (tartar emetic) covers bronchial and respiratory conditions with great rattling and inability to raise mucus. The patient is too weak to cough effectively — rattling cough that produces nothing. Drowsiness accompanies all complaints. Nausea and vomiting: nausea intense, relieved by vomiting. Skin: pustular eruptions (like smallpox, chickenpox). In the elderly or infants: last stages of pneumonia with rattling. Face: pale, cold, covered with cold perspiration. Aggravated: lying, evening, warmth. Ameliorated: sitting upright, cold open air, expectoration.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Rattling mucus in chest — cannot raise it. 2) Great drowsiness with respiratory complaints. 3) Cold sweat with pale face. 4) Nausea with desire to vomit. 5) In the last stages of pneumonia in elderly or infants. 6) Pustular skin eruptions. 7) Must sit up — cannot lie down.",
    clinicalIndications:
      "Bronchitis with rattling. Pneumonia (last stage). Asthma. Chickenpox. Whooping cough. Nausea and vomiting.",
    rubrics:
      "CHEST — RATTLING — mucus; GENERALS — DROWSINESS; FACE — SWEAT — cold; GENERALS — LYING — agg; NAUSEA",
    farrington:
      "Farrington compares Ant-t with Ipecac, Lobelia, and Carbo veg for respiratory symptoms. Ant-t: rattling of mucus in bronchi which cannot be expelled — the mucus drowns the patient. Compare Ipecac: Ipecac has constant nausea and nausea unrelieved by vomiting; Ant-t has drowsiness with the rattling. Compare Lobelia: Lobelia has nausea with feeling of lump in throat; Ant-t is more stuporous. Farrington's key: 'Antimonium tartaricum is the remedy for the last stage of pneumonia when the patient is too weak to expectorate — the chest fills with mucus.' For babies with capillary bronchitis: Ant-t when the child rattles and drowses, with little or no fever. The white-coated tongue is characteristic.",
    relationships: {
      complementary: "Ipecac, Sulphur",
      antidotes: "Nux Vomica",
      inimical: "None significant",
      followsWell: "Bryonia, Ipecac",
      followedBy: "Sulphur, Lycopodium",
    },
  },
  {
    name: "Tuberculinum",
    abbreviation: "Tub",
    miasmaticClassification: "Tubercular",
    keynotes:
      "Desire for change and travel. Restless, dissatisfied, never content. Recurrent respiratory infections in children. Emaciation despite good appetite. Desire for open air. Family history of tuberculosis.",
    materiaMedicaSummary:
      "Tuberculinum (maceration of tubercular abscess) is a nosode for the tubercular constitution. Intense restlessness — never satisfied with anything, constantly wants change — change of place, occupation, relationships. Children: recurrent tonsillitis, otitis, bronchitis; emaciate rapidly; desire open air. Mind: discontented, peevish, changeable. Desire to travel. Aversion to mental work. Sweating at night. Emaciation with good appetite. Headache in school children. Aggravated: cold, damp, closed room, exertion. Ameliorated: open air, travel, motion.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Desire for constant change — travel, occupation, residence. 2) Recurrent colds and respiratory infections. 3) Emaciation despite eating well. 4) Dissatisfied with everything. 5) Family or personal history of tuberculosis. 6) Night sweats. 7) Intense desire for open air.",
    clinicalIndications:
      "Recurrent respiratory infections. Chronic cough. Glandular affections. Emaciation. ADHD-like restlessness. Allergic disorders. Headache in school children.",
    rubrics:
      "MIND — TRAVEL — desire for; MIND — DISCONTENTED; GENERALS — EMACIATION — eating well despite; GENERALS — AIR — open, desire for; GENERALS — TUBERCULOSIS — history of",
    farrington:
      "Farrington notes: Tuberculinum (and related nosodes) represent the tubercular diathesis. Compare Phosphorus: both are tall, slender, sensitive; Phos has burning; Tub has more rapid emaciation and hereditary tendency. Compare Drosera: both have spasmodic cough; Drosera is more specific for whooping cough; Tub is constitutional. Farrington's principle: 'When a well-selected remedy fails to act in a case of phthisis, think of Tuberculinum as an intercurrent.' Compare Calcarea carb: Tub patient was often a Calcarea child who failed to develop; has the same sweating head but adds emaciation and cough. For recurrent cold-taking: Tub when the patient takes cold easily and never seems to recover fully — the chronic cold-catcher.",
    relationships: {
      complementary: "Psorinum, Sulphur, Calcarea Carb",
      antidotes: "Belladonna",
      inimical: "None significant",
      followsWell: "Calcarea Carb, Nat Mur, Sulphur",
      followedBy: "Sulphur, Calc Carb, Phosphorus",
    },
  },
  {
    name: "Medorrhinum",
    abbreviation: "Med",
    miasmaticClassification: "Sycotic",
    keynotes:
      "Extremes — goes to extremes in everything. Forgets words while speaking. Better at seaside. Worse during day, better at night. History of gonorrhea in self or family. Intense, hurried, impulsive.",
    materiaMedicaSummary:
      "Medorrhinum (gonorrheal nosode) covers the sycotic constitution deeply. Extremes in behavior — extreme in love, hate, fear, anxiety. Forgets words while speaking. Intense cruelty to animals in children or extreme tenderness. Worse during the day, better at night — the reverse of most remedies. Asthma: better at seashore, worse inland. Joints: painful, swollen, wandering, worse in wet weather. Children: intense, willful, bites nails. Memory: poor, loses thread. Aggravated: day, inland, cold, damp. Ameliorated: seashore, night, bending backward, uncovering.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Better at seashore — very characteristic. 2) Worse during day, better at night. 3) Loses words while speaking. 4) Sycotic diathesis — gonorrheal history. 5) Extremes of emotion and behavior. 6) Asthma in children better at coast. 7) Intense, hurried, impulsive personality.",
    clinicalIndications:
      "Sycotic conditions. Asthma better at seashore. Warts. Rheumatism. ADHD in children. Pelvic inflammatory disease. Memory weakness.",
    rubrics:
      "GENERALS — SEASHORE — ameliorates; MIND — HURRY; MIND — FORGETFUL — words, for; GENERALS — NIGHT — ameliorates; GENERALS — SYCOSIS",
    farrington:
      "Farrington places Medorrhinum as the chief sycotic nosode. Compare Thuja: both cover the sycotic miasm; Thuja is more warty, fixed, secretive; Medorrhinum is more intense, restless, anxious. Farrington's note: 'The Medorrhinum patient lives in the past — a great characteristic; Thuja lives in fear.' Compare Natrum sulph: both cover sycotic manifestations; Natrum sulph is more liver-predominant; Medorrhinum more genetic depth. For asthma with sycotic history: Medorrhinum when history of gonorrhea or family history of such complaints. The wild, extreme nature — extremes of sensation, worse just before dawn, better at sea — are Medorrhinum's hallmarks.",
    relationships: {
      complementary: "Thuja, Nat Sulph",
      antidotes: "Nux Vomica, Thuja",
      inimical: "None significant",
      followsWell: "Nat Mur, Thuja",
      followedBy: "Sulphur, Thuja",
    },
  },
  {
    name: "Syphilinum",
    abbreviation: "Syph",
    miasmaticClassification: "Syphilitic",
    keynotes:
      "Destructive ulcers with offensive discharge. Bone pains worse at night, driving to distraction. Hopeless, despairing of recovery. History of syphilis in family. Worse at night, better during the day.",
    materiaMedicaSummary:
      "Syphilinum (syphilitic nosode) is the deep anti-syphilitic. Destructive ulceration anywhere — throat, skin, bone. Bone pains: intense, worse at night, driving to walk about in despair. Hopeless, despairing mind — feels nothing can help. Forgets everything at once after seeming to remember. Tendency to wash hands constantly. Leucorrhea: profuse, acrid, yellow-green. Alopecia. Ptosis. Aggravated: night (dramatically), sunset to sunrise, extreme heat or cold. Ameliorated: daytime, slow motion, at sea.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Bone pains worse at night — drives to despair. 2) Destructive ulcers with offensive discharge. 3) Hopeless — feels beyond cure. 4) Worse from sunset to sunrise. 5) Forgets everything promptly. 6) Tendency to compulsive handwashing. 7) History of syphilitic infection in patient or family.",
    clinicalIndications:
      "Syphilitic conditions. Bone pain at night. Destructive ulcers. Chronic alcoholism. Alopecia. Nocturnal epilepsy. Hopeless depression.",
    rubrics:
      "GENERALS — NIGHT — agg dramatically; BONES — PAIN — night; MIND — HOPELESSNESS; GENERALS — ULCERS — destructive; GENERALS — SYPHILIS — history",
    farrington:
      "Farrington notes: Syphilinum (Luesinum) covers the syphilitic miasm in depth. Compare Mercurius: both cover syphilis; Merc covers the secondary stage; Syphilinum reaches the hereditary, tertiary, and deep constitutional effects. Compare Nitric acid: both have ulcers with offensive discharges; but Nitric acid is for acquired cases; Syphilinum for hereditary syphilitic constitutions. Farrington's principle: 'Syphilinum should be thought of when the syphilitic miasm is deep in the constitution — not for active syphilis but for its hereditary taint.' The aggravation at night (2-4 AM specifically) and the amelioration by the warmth of the sea are distinctive. For destructive bone disease not responding to Mercurius, Syphilinum acts deeper.",
    relationships: {
      complementary: "Merc Sol, Aurum Met",
      antidotes: "Nux Vomica, Hepar Sulph",
      inimical: "None significant",
      followsWell: "Lachesis, Merc Sol",
      followedBy: "Sulphur, Aurum",
    },
  },
  {
    name: "Thuja Occidentalis",
    abbreviation: "Thuja",
    miasmaticClassification: "Sycotic",
    keynotes:
      "Warty growths anywhere — condylomata, warts, polyps. Fixed ideas — as if body is fragile, made of glass. Oily skin with sweetish perspiration. Secretive nature. Worse from cold damp and 3 AM. Ailments from vaccination.",
    materiaMedicaSummary:
      "Thuja (arbor vitae) is the chief anti-sycotic remedy. Warty growths, condylomata, polyps on any mucous membrane or skin. Fixed ideas: as if body is made of glass and will break; as if a strange person is beside them. Oily skin with sweetish or garlic-like perspiration. Teeth decay at roots. Nails: brittle, deformed, crumbling. Gonorrheal history. Worse: 3 AM and 3 PM, cold damp, vaccination, onions. Mind: secretive, does not like strangers; thinks body is brittle. Aggravated: cold damp, night 3 AM, after breakfast. Ameliorated: dry warm weather, drawing up limbs.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Warts and condylomata — the chief sycotic remedy. 2) Fixed ideas — body is fragile or made of glass. 3) Oily, waxy skin with sweetish perspiration. 4) Ailments from vaccination. 5) 3 AM aggravation. 6) Secretive, does not reveal personal things. 7) Teeth decay at roots.",
    clinicalIndications:
      "Warts. Condylomata. Post-vaccination ailments. Gonorrheal sequelae. Polyps. Nail deformity. Fixed ideas. Sycotic chronic complaints.",
    rubrics:
      "SKIN — WARTS; MIND — DELUSION — body fragile; GENERALS — VACCINATION — ailments from; GENERALS — PERSPIRATION — oily; GENERALS — NIGHT — 3 AM agg",
    farrington:
      "Farrington places Thuja as the chief anti-sycotic remedy. Compare Medorrhinum: Thuja is chronic and slow in its action; Medorrhinum is more acute and intense. Compare Natrum sulph: both cover sycosis; Natrum sulph has more liver involvement and worse in damp weather; Thuja has more wart and condylomata tendency. Compare Silica: both are obstinate; Thuja has a peculiar fixed idea (cannot concentrate, believes his body is fragile like glass); Silica lacks this fantasy. Farrington's key: 'Thuja is the remedy for the effects of vaccination, of gonorrhea suppressed by injection, and for all forms of warts and condylomata.' The oily skin, the sensation of a living thing in abdomen, and the left-sided headaches are Thuja hallmarks.",
    relationships: {
      complementary: "Medorrhinum, Sabina, Nat Sulph",
      antidotes: "Camphor, Pulsatilla, Mercurius",
      inimical: "None significant",
      followsWell: "Nat Sulph, Medorrhinum",
      followedBy: "Sulphur, Nat Sulph",
    },
  },
  {
    name: "Nitric Acid",
    abbreviation: "Nit ac",
    miasmaticClassification: "Syphilitic",
    keynotes:
      "Splinter-like pains — as if a splinter is sticking in the ulcer or wound. Offensive, excoriating discharges. Fissures at muco-cutaneous junctions. Vindictive, unforgiving nature. Warts that bleed easily. Worse cold.",
    materiaMedicaSummary:
      "Nitric Acid is a deep syphilitic remedy. Pains are characteristically like a splinter or thorn sticking in the part. Ulcers: irregular edges, bleed easily on touch, offensive. Fissures: at anus, corner of mouth, urethra, everywhere skin meets mucous membrane. Discharges: offensive, acrid, excoriating, staining the linen. Mind: vindictive, holds grudges, never forgets offenses; despairing of recovery. Urine: cold, smells like horse's urine. Warts: moist, bleeding. Aggravated: cold, touch, jar, night. Ameliorated: riding in a carriage (vibration), warmth.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Splinter pains — sticking, pricking sensation. 2) Ulcers at muco-cutaneous junctions. 3) Offensive, excoriating, staining discharges. 4) Vindictive — cannot forgive. 5) Warts that bleed at touch. 6) Urine offensive, cold. 7) Fissures in corners of mouth and anus.",
    clinicalIndications:
      "Anal fissures and fistulae. Warts. Ulcers of throat. Hemorrhoids. Condylomata. Chronic catarrhal conditions. Cracks at corners of mouth.",
    rubrics:
      "GENERALS — PAIN — splinter, as from; GENERALS — DISCHARGES — offensive, excoriating; RECTUM — FISSURE; MIND — VINDICTIVE; SKIN — WARTS — bleeding",
    farrington:
      "Farrington compares Nitric acid with Mercurius and Hepar sulph in affections of mucous membranes. Nitric acid: splinter-like pains at junction of mucous membrane and skin — corners of mouth, anus, nasal margins. Compare Merc: both affect these junctions but Merc has more salivation, sweating; Nitric acid has more offensive urine (horse-urine odor), splinter sensations, irritability. Compare Syphilinum: both cover syphilitic diathesis; Nitric acid for acquired manifestations; Syphilinum for hereditary. Farrington's key: 'The urine of Nitric acid is offensive like horse urine — this one symptom often leads to the prescription.' Thin persons who take cold easily and have cracks at the mucocutaneous junctions are the Nitric acid type.",
    relationships: {
      complementary: "Calcarea Carb, Arsenicum",
      antidotes: "Hepar Sulph, Milk",
      inimical: "None significant",
      followsWell: "Merc Sol, Calcarea Carb",
      followedBy: "Sulphur, Causticum",
    },
  },
  {
    name: "Stramonium",
    abbreviation: "Stram",
    miasmaticClassification: "Syphilitic",
    keynotes:
      "Terror and violence — delirium with frightful visions. Fear of darkness, water, solitude. Desires light and company. Praying mania — prays, sings, and talks to God. Hot, dry, convulsive states.",
    materiaMedicaSummary:
      "Stramonium (thorn apple) is one of the most violent remedies in Homoeopathy. Delirium: sees animals, ghosts, frightening visions — wants to escape; alternates with praying and religious mania. Intense fear of dark and water. Convulsions with tetanic stiffness. Face red, hot; eyes staring and glassy. Muttering, violent, striking, biting. Stammering speech. Suppression of discharges leading to brain complaints. Aggravated: darkness, solitude, dazzling objects, looking at shining objects. Ameliorated: light, company, warmth, moderate pressure.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Intense terror with frightful visions. 2) Fear of darkness and water. 3) Praying mania — alternates with violence. 4) Hot, dry, red face with staring eyes. 5) Suppressed discharges causing brain symptoms. 6) Desires light and company. 7) Tetanic convulsions.",
    clinicalIndications:
      "Violent delirium. Convulsions. Hydrophobia. Night terrors in children. Meningitis with delirium. Mania. Stammering.",
    rubrics:
      "MIND — FEAR — dark; MIND — VIOLENCE; MIND — DELIRIUM — religious; MIND — FEAR — water; GENERALS — CONVULSIONS",
    farrington:
      "Farrington notes: Stramonium is the most violent of the solanaceous trio. Compare Belladonna: Bell is acute, sudden, subsides quickly; Stramonium is more persistent violence with religious and terror-filled delirium. Compare Hyoscyamus: Stramonium is more violent; Hyoscyamus is more obscene, jealous, low-grade. Farrington's key: 'Stramonium sees ghosts, frightful visions, and speaks with imaginary persons — the religious mania of Stramonium (prayers, songs, curses alternating) is characteristic.' For convulsions: Stramonium vs Belladonna — Stramonium convulsions are clonic, with turning of head; Bell convulsions are more tonic. Distinguishes from Cuprum in spasms: Cuprum has more violent, cramping type beginning in fingers and toes.",
    relationships: {
      complementary: "Belladonna, Hyoscyamus",
      antidotes: "Nux Vomica, Tabacum, Camphor",
      inimical: "None significant",
      followsWell: "Hyoscyamus, Belladonna",
      followedBy: "Belladonna, Calc Carb, Sulphur",
    },
  },
  {
    name: "Hyoscyamus",
    abbreviation: "Hyos",
    miasmaticClassification: "Syphilitic",
    keynotes:
      "Jealousy — foundation of the remedy. Loquacious delirium. Twitching and jerking. Obscene behavior — exposes body. Suspicious, accusing, jealous. Sleepless, muttering, picking at bedclothes.",
    materiaMedicaSummary:
      "Hyoscyamus (henbane) sits between Belladonna and Stramonium. Less violent than Stramonium, less red than Belladonna. Jealousy is the key emotion. Delirium: loquacious, silly, erotic, obscene — exposes genitals, sings lewd songs. Suspicious of spouse. Twitching and jerking of muscles. Sleeplessness from jealousy. Picking at bedclothes (carphologia) in low states. Hiccough. Convulsions after fright or jealousy. Aggravated: jealousy, emotions, night. Ameliorated: stooping, heat.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Jealousy — the central emotion of this remedy. 2) Loquacious, silly, erotic delirium. 3) Obscene behavior — exposes self. 4) Twitching and jerking of muscles. 5) Suspicious of spouse/partner. 6) Carphologia — picking at bedclothes in low fevers. 7) Jealous insanity.",
    clinicalIndications:
      "Jealous mania. Delirium. Convulsions from jealousy or fright. Insomnia. Hiccough. Low typhoid states with muttering. Obscene behavior in mental disease.",
    rubrics:
      "MIND — JEALOUSY; MIND — LOQUACITY; MIND — OBSCENE; EXTREMITIES — TWITCHING; SLEEP — SLEEPLESSNESS — jealousy",
    farrington:
      "Farrington places Hyoscyamus in the solanaceous trio as the most 'low-grade' delirium. Compare Belladonna: Bell is more acute and violent; Hyoscyamus is slower, muttering, obscene, jealous. Compare Stramonium: Stram is more terror and religious; Hyoscyamus is more suspicious, jealous, lascivious, and exposes genitals. Farrington's key: 'Hyoscyamus is the remedy for low-grade typhoid states where the patient mutters, picks at the bedclothes, and has subsultus tendinum.' For jealousy: Hyoscyamus vs Lachesis — Lachesis jealousy is from sexual passion; Hyoscyamus jealousy is more of a childlike, neurotic nature. The patient who fears being poisoned by his family is characteristic Hyoscyamus.",
    relationships: {
      complementary: "Belladonna, Stramonium",
      antidotes: "Camphor, Nux Vomica, Coffea",
      inimical: "None significant",
      followsWell: "Belladonna, Opium",
      followedBy: "Sulphur, Belladonna",
    },
  },
  {
    name: "Veratrum Album",
    abbreviation: "Verat alb",
    miasmaticClassification: "Syphilitic",
    keynotes:
      "Collapse with cold sweat on forehead. Excessive vomiting and purging simultaneously. Religious mania with delusion of grandeur. Cold body, cold sweat, cold breath. Cramps in calves.",
    materiaMedicaSummary:
      "Veratrum Album (white hellebore) covers cholera-like collapse and religious mania. Cold sweat on forehead is the decisive keynote. Cholera: violent simultaneous vomiting and purging; exhausting, rice-water stools; cramps in calves; cold body with cold sweat. Mind: delusion of grandeur — believes self to be a great person or Christ; preaches, prays. Mania alternating with collapse. Rapid debility after loss of fluids. Aggravated: cold, slightest motion, before stool. Ameliorated: warmth (but warmth of body not of room), lying.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Cold sweat on forehead — the single most decisive keynote. 2) Simultaneous vomiting and purging with exhaustion. 3) Religious mania with delusion of grandeur. 4) Cramps in calves during cholera. 5) Cold throughout — cold body, cold sweat, cold breath. 6) Rapid debility from fluid loss. 7) Alternating mania and collapse.",
    clinicalIndications:
      "Cholera. Collapse states. Gastroenteritis with prostration. Religious mania. Hysteria. Whooping cough with vomiting. Menstrual colic.",
    rubrics:
      "GENERALS — COLLAPSE; HEAD — PERSPIRATION — cold; MIND — DELUSION — greatness; GENERALS — COLD — body; VOMITING — purging, with",
    farrington:
      "Farrington notes: Veratrum album competes with Arsenicum and Cuprum in collapse and convulsive states. Veratrum: COLD perspiration on forehead with collapse, vomiting, diarrhea — the hallmark triad. Compare Arsenicum: both have cold sweat and anxiety; Arsenicum is more restless; Veratrum is more collapsed. Compare Cuprum: both have cramps; Cuprum has more violent cramps; Veratrum has more profuse cold sweat and rice-water stools. Farrington's key: 'Veratrum album is indicated in Asiatic cholera when the patient is cold, collapsed, with cold sweat on the forehead.' Distinguishes from Camphor: Camphor is the very earliest stage before stools appear; Veratrum when rice-water stools with prostration are established.",
    relationships: {
      complementary: "Arsenicum, Carbo Veg",
      antidotes: "Camphor, China, Digitalis",
      inimical: "None significant",
      followsWell: "Camphor, Arsenicum",
      followedBy: "Sulphur, Arsenicum",
    },
  },
  {
    name: "Apis Mellifica",
    abbreviation: "Apis",
    miasmaticClassification: "Sycotic",
    keynotes:
      "Edema — sudden, rosy, pitting, shiny. Stinging, burning pains better cold applications. Thirstlessness even with fever. Worse from heat. Jealousy. Absence of thirst with great dryness.",
    materiaMedicaSummary:
      "Apis Mellifica (honey bee venom) is the primary remedy for edematous and inflammatory conditions. Edema: rosy, shiny, pitting, burning — eyelids, throat, skin, kidney. Pains: stinging, burning, piercing like bee stings. Worse heat; better cold applications. Thirstlessness characteristic even in high fever. Urticaria: sudden, rosy, burning. Throat: swollen uvula, difficulty swallowing. Kidney: albuminuria, scanty urine with edema. Mind: jealous, suspicious, queen bee temperament. Ovarian cysts right side. Aggravated: heat, warm room, touch, pressure, late afternoon. Ameliorated: cold, open air, cold bathing.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Edema — rosy, shiny, pitting. 2) Stinging burning pains better cold. 3) Thirstlessness in all conditions. 4) Worse heat — opposite of Arsenicum. 5) Right-sided ovarian affections. 6) Sudden swelling of uvula and eyelids. 7) Jealousy as a mental characteristic.",
    clinicalIndications:
      "Urticaria. Angioedema. Nephritis with edema. Right ovarian cysts. Acute tonsillitis with edema. Meningitis with edema. Bee sting reactions.",
    rubrics:
      "GENERALS — EDEMA; GENERALS — PAIN — stinging; GENERALS — THIRST — thirstlessness; GENERALS — HEAT — agg; GENERALS — COLD — ameliorates",
    farrington:
      "Farrington's notes: Apis is one of the most important remedies for inflammatory edema. Compare Belladonna: both have red, shiny, hot inflammations — but Apis has the characteristic waxy, glistening edema; Bell has more dryness. Compare Rhus tox: both have skin vesicles; Rhus tox is better by warmth; Apis is worse by warmth and better by cold applications. Farrington's key: 'The stinging, burning pains of Apis — like bee stings — better from cold applications, combined with edema, is its defining picture.' Distinguishes from Arsenicum: Apis has no thirst (with all its inflammation); Arsenicum has great thirst. For urinary suppression: Apis when there is scanty urine with dropsy and the absence of thirst is striking.",
    relationships: {
      complementary: "Nat Mur, Baryta Carb",
      antidotes: "Arsenicum, Carbo Veg, Lachesis, Ledum, Rhus Tox",
      inimical: "Rhus Tox",
      followsWell: "Rhus Tox, Sulphur",
      followedBy: "Nat Mur, Sulphur",
    },
  },
  {
    name: "Argentum Nitricum",
    abbreviation: "Arg nit",
    miasmaticClassification: "Sycotic",
    keynotes:
      "Anticipatory anxiety — diarrhea before events. Impulsive, hurried, desires to do things quickly. Craves sweets that disagree. Fear of high places. Flatulence. Worse heat. Ophthalmia neonatorum.",
    materiaMedicaSummary:
      "Argentum Nitricum (silver nitrate) is the great anticipatory anxiety remedy. Cannot pass a point without going to it (compulsive impulses). Diarrhea: explosive, green, before examination or events; spluttering. Craves sugar but it makes diarrhea worse. Impulsive: wants to jump from heights, throw himself under trains. Time seems to pass slowly. Eye: ophthalmia neonatorum; purulent conjunctivitis. Gastric: flatulence immediately after eating; belching gives relief. Aggravated: anticipation, sweets, warmth, left side, night. Ameliorated: cold, open air, pressure, eructation.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Anticipatory diarrhea — the defining keynote. 2) Impulsive — sudden impulse to jump from heights. 3) Craves sweets that aggravate. 4) Fear of high places and crowds. 5) Explosive, spluttering green diarrhea. 6) Flatulence immediately after eating. 7) Worse warmth, better cold.",
    clinicalIndications:
      "Anticipatory anxiety. Stage fright. Pre-examination diarrhea. Ophthalmia neonatorum. Gastric ulcer. Phobia of heights. Impulsive disorders.",
    rubrics:
      "MIND — ANTICIPATION; MIND — IMPULSIVE; MIND — FEAR — high places; STOMACH — DESIRES — sweets; RECTUM — DIARRHEA — anticipation",
    farrington:
      "Farrington compares Argentum nitricum with Lycopodium and Gelsemium for anticipatory anxiety. Arg-n: hurried, anxious, craves sweets and sugar (which AGGRAVATE), warm-blooded. Compare Lycopodium: both have anticipatory dread and flatulence; Lycopodium is chilly; Arg-n is warm and desires cold air. Compare Gelsemium: Gelsemium trembles and becomes paralytic; Arg-n hurries and has palpitation. Farrington's key: 'Argentum nitricum is suited to the impulsive, hurried person who does everything in a hurry — walks fast, talks fast, eats fast.' For gastric ulcers: Arg-n has violent burning with splinter-sensation (compare Nitric acid). The specific aggravation from sugar despite craving is characteristic of Arg-n.",
    relationships: {
      complementary: "Gelsemium, Lycopodium",
      antidotes: "Arsenicum, Nat Mur, Pulsatilla",
      inimical: "Nat Mur (incompatible)",
      followsWell: "Nat Mur, Lycopodium",
      followedBy: "Sulphur, Nat Mur",
    },
  },
  {
    name: "Baryta Carbonica",
    abbreviation: "Bar carb",
    miasmaticClassification: "Sycotic",
    keynotes:
      "Dwarfish, stunted mental and physical development. Timid, bashful, hides behind furniture. Enlarged tonsils and glands. Delayed development in children. Premature senility in elderly. Worse cold.",
    materiaMedicaSummary:
      "Baryta Carbonica (barium carbonate) covers both extremes of life: delayed development in children and premature senility in the elderly. Children: small for age, mentally dull, bashful, will not play; enlarged tonsils with recurrent tonsillitis; cannot learn. Elderly: childishness, forgetfulness, loss of memory, weakness of limbs. Enlarged submaxillary glands. Heart: palpitations, hypertension in elderly. Aggravated: cold, damp, lying on painful side. Ameliorated: warmth, walking in open air.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Delayed development — stunted mentally and physically. 2) Extreme bashfulness — hides behind furniture with strangers. 3) Enlarged tonsils and cervical glands. 4) Premature senility — second childhood. 5) Cannot bear cold in any form. 6) Hypertension in elderly. 7) Childish behavior even in adults.",
    clinicalIndications:
      "Delayed development. Enlarged tonsils. Recurrent tonsillitis. Premature senility. Hypertension. Cerebral arteriosclerosis. Bashfulness.",
    rubrics:
      "MIND — BASHFUL; MIND — DEVELOPMENT — arrested; THROAT — TONSILS — enlarged; GENERALS — COLD — sensitive to; GENERALS — SENILITY — premature",
    farrington:
      "Farrington places Baryta carb as the remedy for the 'dwarfed in mind and body' patient. Compare Calcarea carb: both are slow, fat children but Cal-c has more sweating head and learning difficulties; Bar-c is more dwarfed, senile, and shy. Compare Lycopodium: both are cowardly; but Lycopodium develops intellectually (brain over brawn); Bar-c does not develop at all. Farrington's key: 'Baryta carbonica is the remedy for premature senility, for old age coming prematurely — and for children who are dwarfed and childish even at later age.' Distinguishes from Anacardium: both are slow in thinking; Anacardium has more irresistible impulses. For enlarged tonsils with frequent quinsy: Baryta carb vs Mercurius — Merc has more suppuration; Bar-c has recurring tonsil problems without full suppuration.",
    relationships: {
      complementary: "Dulcamara, Silicea",
      antidotes: "Camphor",
      inimical: "None significant",
      followsWell: "Calcarea Carb, Psorinum, Silicea",
      followedBy: "Calcarea Carb, Sulphur",
    },
  },
  {
    name: "China Officinalis",
    abbreviation: "China",
    miasmaticClassification: "Psoric",
    keynotes:
      "Debility from loss of vital fluids — hemorrhage, diarrhea, lactation, perspiration. Periodic complaints — every other day. Flatulence not relieved by belching or passing gas. Sensitive to touch but better hard pressure.",
    materiaMedicaSummary:
      "China Officinalis (Peruvian bark, quinine source) is Hahnemann's first proving. Great debility and exhaustion from loss of vital fluids: bleeding, prolonged diarrhea, seminal losses, lactation, excessive perspiration. Periodicity: complaints return every other day (as in malaria). Flatulence: entire abdomen distended; tympanic; not relieved by eructation or flatus. Hypersensitivity: to touch (light touch aggravates, but hard pressure relieves). Liver enlarged. Anemia. Aggravated: light touch, night, eating fruit, cold. Ameliorated: hard pressure, warmth, loose clothing.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Debility from loss of vital fluids. 2) Periodicity — complaints every other day. 3) Flatulence not relieved by eructation. 4) Sensitive to lightest touch, better hard pressure. 5) Great anemia after hemorrhage. 6) Hepatic complaints with enlarged liver. 7) Tinnitus and ringing in ears.",
    clinicalIndications:
      "Anemia from hemorrhage. Malaria. Post-diarrheal weakness. Convalescence. Flatulent dyspepsia. Neuralgia. Tinnitus.",
    rubrics:
      "GENERALS — DEBILITY — fluids, loss of; GENERALS — PERIODICITY; ABDOMEN — FLATULENCE — not relieved; GENERALS — TOUCH — light, agg; GENERALS — PRESSURE — hard, ameliorates",
    farrington:
      "Farrington's notes: China (Cinchona) was Hahnemann's proving that launched homeopathy. Compare Arsenicum: both have debility and periodic fevers; China's debility is specifically from loss of vital fluids (blood, semen, milk, sweat); Arsenicum's is from sepsis and toxemia. Compare Carbo veg: both follow great loss of fluids; Carbo veg is more venous/cyanotic; China is more intermittent and periodical. Farrington's key: 'China is suited to all conditions following loss of vital fluids — the patient is sensitive, nervous, and complains of exaggerated debility after even trifling exertion.' The periodicity of China (every other day, or exact same hour) and the aversion to tight clothing around the abdomen are characteristic.",
    relationships: {
      complementary: "Arsenicum, Carbo Veg, Ferrum",
      antidotes: "Arsenicum, Nat Mur, Nux Vomica",
      inimical: "None significant",
      followsWell: "Arsenicum, Calc Carb, Sulphur",
      followedBy: "Carbo Veg, Sulphur",
    },
  },
  {
    name: "Graphites",
    abbreviation: "Graph",
    miasmaticClassification: "Psoric + Sycotic",
    keynotes:
      "Sticky, honey-like discharge from eruptions. Cracks and fissures at muco-cutaneous junctions. Obesity with chilliness. Constipation with knotty, large stools. Indecision, timidity. Worse cold.",
    materiaMedicaSummary:
      "Graphites (black lead) is the chronic skin and mucous membrane remedy. Eruptions ooze a sticky, honey-like, glutinous fluid — eczema, psoriasis, impetigo. Cracks at corners of mouth, behind ears, at nails, nipples, anus. Obese, chilly patient with poor circulation. Mind: slow, timid, cannot decide; weeps at music. Menses: late, scanty, pale, with constipation. Nails: thick, deformed, crumbling. Keloids. Constipation: stool covered with mucus threads. Aggravated: cold, at night, music, warmth of bed. Ameliorated: darkness, wrapping up, eating.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Sticky glutinous discharge from eruptions. 2) Cracks at muco-cutaneous junctions. 3) Obese, chilly, sluggish constitution. 4) Weeps at music. 5) Constipation with knotty stools. 6) Nail deformities. 7) Keloid formations.",
    clinicalIndications:
      "Eczema with sticky discharge. Fissures at anus, lips, nipples. Keloids. Nail deformity. Obesity. Irregular menses. Otitis media with sticky discharge.",
    rubrics:
      "SKIN — ERUPTIONS — moist, sticky; GENERALS — FISSURES; GENERALS — OBESITY; MIND — WEEPING — music, at; GENERALS — COLD — sensitive to",
    farrington:
      "Farrington compares Graphites with Calcarea, Sulphur, and Petroleum for skin conditions. Graphites: eruptions that ooze a thick, honey-like, glutinous fluid — especially in folds of skin. Compare Petroleum: both have skin conditions in folds; Petroleum has more cracking and rawness; Graphites has more oozing of golden fluid. Compare Calcarea: both are fat, chilly, and slow; Graphites has more skin manifestations; Calcarea has more bone and glandular. Farrington's key: 'Graphites is pre-eminently a remedy for the flabby, chilly, constipated patient who oozes a sticky fluid from skin eruptions in the bends of joints.' Distinguishes from Sulphur: Sulphur's eruptions are dry, burning; Graphites eruptions weep a thick, golden discharge.",
    relationships: {
      complementary: "Causticum, Hepar Sulph, Lycopodium",
      antidotes: "Arsenicum, Nux Vomica",
      inimical: "None significant",
      followsWell: "Calc Carb, Lycopodium, Sulphur",
      followedBy: "Sulphur, Hepar Sulph",
    },
  },
  {
    name: "Iodium",
    abbreviation: "Iod",
    miasmaticClassification: "Tubercular",
    keynotes:
      "Emaciation despite good appetite — eats ravenously but loses weight. Restless, anxious, hurried. Hot patient. Hypertrophied then atrophied glands. Better in cold open air. Worse in warm room.",
    materiaMedicaSummary:
      "Iodium (iodine) is a tubercular-syphilitic remedy. The patient eats ravenously but emaciates rapidly. Great anxiety when quiet — must be doing something. Hot remedy — worse in warm room, better in cold. Glands: first hypertrophy (enlargement) then atrophy (wasting). Thyroid: goiter with hyperthyroidism. Skin: dark, yellow, withered. Croup: membranous, with great anxiety. Pneumonia: rapidly progressive. Aggravated: warmth, rest, inactivity. Ameliorated: cold, open air, motion, eating.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Emaciation despite eating ravenously. 2) Must keep active — anxiety when still. 3) Hot patient — worse warm room, better cold. 4) Glands — hypertrophy then atrophy. 5) Goiter. 6) Membranous croup. 7) Dark, withered skin.",
    clinicalIndications:
      "Thyroid disorders. Goiter. Membranous croup. Rapidly progressive pneumonia. Emaciation with appetite. Glandular affections. Diabetes.",
    rubrics:
      "GENERALS — EMACIATION — appetite, with good; MIND — ANXIETY — motion, compelling; GENERALS — HEAT — warm room, agg; GENERALS — GLANDS — hypertrophy; GENERALS — COLD — ameliorates",
    farrington:
      "Farrington notes: Iodine is the 'emaciation remedy' — eats well yet emaciates. Compare Arsenicum: both are restless and thin; Arsenicum is worse at midnight; Iodium is worse when quiet and must keep moving. Compare Natrum mur: both are thin and have heat aggravation; but Natrum mur has the salt craving and grief; Iodium has the peculiar ravenous hunger with emaciation. Farrington's key: 'Iodium is suited to the scrofulous type — lean, dark complexion, enlarged glands — the patient who must keep in constant motion.' For goitre and thyroid: Iodium vs Spongia — both affect the thyroid; Spongia has more heart involvement and anxiety; Iodium has more emaciation. The relief from eating (temporarily) despite emaciation is characteristic.",
    relationships: {
      complementary: "Lycopodium, Spongia",
      antidotes: "Arsenicum, Phosphorus, Sulphur",
      inimical: "None significant",
      followsWell: "Calcarea Carb, Spongia",
      followedBy: "Sulphur, Lycopodium",
    },
  },
  {
    name: "Kali Bichromicum",
    abbreviation: "Kali bich",
    miasmaticClassification: "Syphilitic + Sycotic",
    keynotes:
      "Tough, ropy, stringy, elastic mucus — can be pulled in long strings. Punched-out ulcers — well-defined, circular edges. Pains wander but at one small spot. Worse cold weather. Catarrhal complaints.",
    materiaMedicaSummary:
      "Kali Bichromicum (potassium bichromate) is the leading remedy for catarrhal complaints with characteristic stringy, tenacious, ropy mucus. Sinusitis: tough mucus, pressure at root of nose. Ulcers: round, punched-out, as if made with a hole punch. Pains: migratory but appear at fixed small spots; appear and disappear suddenly. Tongue: mapped, geographic. Liver: hepatitis with clay-colored stools. Stomach: ulcer with ropy mucus. Croup: rattling cough with tough mucus. Aggravated: cold, 2–3 AM, beer, hot weather (some complaints). Ameliorated: warmth, pressure.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Ropy, stringy, elastic mucus — pulls in long strings. 2) Punched-out ulcers. 3) Pains migrate to small fixed spots. 4) Sinusitis with pressure at root of nose. 5) Geographic tongue. 6) Worse cold, better warmth. 7) 2–3 AM aggravation.",
    clinicalIndications:
      "Sinusitis. Gastric ulcer. Croup. Laryngitis. Corneal ulcers. Hepatitis. Geographic tongue. Nasal polyps.",
    rubrics:
      "NOSE — DISCHARGE — ropy, stringy; GENERALS — PAIN — small spot, in; GENERALS — ULCERS — punched out; GENERALS — COLD — agg; GENERALS — MUCUS — stringy",
    farrington:
      "Farrington places Kali bich as the leading remedy for catarrhal discharges. Compare Pulsatilla: Pulsatilla has bland, thick, yellow-green discharges; Kali bich has tenacious, stringy, ropy mucus that can be drawn into long strings. Compare Hydrastis: Hydrastis has thick, yellowish discharges; Kali bich is more specifically ropy and stringy. Farrington's key: 'The stringy, tenacious discharges of Kali bich — drawn into strings — combined with deep, punched-out ulcers are its two great characteristics.' For migraine: Kali bich when headache begins at the side of the head with 'halos' or 'lights' and is preceded by visual disturbance — the headache begins as the visual symptoms vanish. Sinusitis with loss of smell responds well to Kali bich.",
    relationships: {
      complementary: "Arsenicum, Cinnabaris",
      antidotes: "Arsenicum, Lachesis",
      inimical: "None significant",
      followsWell: "Belladonna, Calc Carb",
      followedBy: "Sulphur, Arsenicum",
    },
  },
  {
    name: "Magnesia Phosphorica",
    abbreviation: "Mag phos",
    miasmaticClassification: "Psoric",
    keynotes:
      "Spasmodic, crampy pains. Better warmth and pressure — hot water bottle is the best friend. Neuralgic pains. Relieved by bending double. Worse cold in any form. Right-sided pains.",
    materiaMedicaSummary:
      "Magnesia Phosphorica is the anti-spasmodic remedy. All pains are crampy, spasmodic, neuralgic. Better from heat, warm applications, and pressure — particularly pressure combined with warmth. Colic: violent, griping, better bending double, better warm applications. Neuralgia: right facial neuralgia better warmth. Headache: right-sided, neuralgic, better warmth. Hiccough. Teething colic in children. Writer's cramp. Right-sided generally. Aggravated: cold (cold air, cold water, cold touch), night, touch. Ameliorated: warmth, pressure, bending double.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Spasmodic crampy pains relieved by warmth and pressure. 2) The 'warm water bottle' remedy. 3) Better bending double. 4) Right-sided neuralgic pains. 5) Colic in infants better warm applications. 6) Writer's cramp. 7) Worse from cold in any form.",
    clinicalIndications:
      "Neuralgic pains. Infantile colic. Dysmenorrhea. Writer's cramp. Facial neuralgia. Hiccough. Teething pains.",
    rubrics:
      "GENERALS — PAIN — cramping, spasmodic; GENERALS — WARMTH — ameliorates; GENERALS — PRESSURE — ameliorates; GENERALS — COLD — agg; ABDOMEN — COLIC — bending double",
    farrington:
      "Farrington notes: Magnesia phos is the 'anti-spasmodic' par excellence. Compare Colocynthis: both have violent cramps better from pressure and heat; Colocynthis has more embittered mental state (from indignation); Magnesia phos is more purely functional and spasmodic. Compare Dioscorea: Dioscorea's cramps are better from standing erect; Magnesia phos is specifically better from warmth and pressure. Farrington's key: 'Magnesia phosphorica is suited to nervous, exhausted patients who have lightning-like, cramping pains that are better from warmth, pressure, and bending double.' Distinguishes from Belladonna in spasm: Bell's cramps are hot and throbbing; Mag phos are purely cramping without heat. An important remedy for writer's cramp and painful cramps in professional musicians.",
    relationships: {
      complementary: "Colocynth, Kali Phos",
      antidotes: "Nux Vomica, Belladonna",
      inimical: "None significant",
      followsWell: "Colocynth, Chamomilla",
      followedBy: "Sulphur, Colocynth",
    },
  },
  {
    name: "Spigelia",
    abbreviation: "Spig",
    miasmaticClassification: "Syphilitic",
    keynotes:
      "Left-sided neuralgia — sharp, stitching pains in eye, temple, or face radiating to teeth. Heart complaints — palpitations, stitching pain in heart. Fear of sharp pointed objects. Worse motion, better rest.",
    materiaMedicaSummary:
      "Spigelia (pinkroot) is a prominent remedy for left-sided neuralgia and cardiac complaints. Neuralgia: sharp, stitching, radiating pains in left orbit, temple, jaw; worse motion, better rest and pressure. Heart: palpitations violent enough to be heard or seen; stitching pain in precordium extending to left shoulder and arm; worse motion. Fear of pointed objects (needles, pins). Worms in children with dilated pupils. Eyes: ciliary neuralgia. Aggravated: touch, motion, washing, cold, turning. Ameliorated: rest, lying on right side, warmth.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Left-sided neuralgia — eye, head, heart. 2) Palpitations visible through clothing. 3) Fear of sharp pointed things. 4) Stitching pains in heart extending to left arm. 5) Ciliary neuralgia. 6) Worse motion. 7) Worms in children with dilated pupils.",
    clinicalIndications:
      "Left-sided neuralgia. Cardiac pain. Ciliary neuralgia. Trigeminal neuralgia left side. Palpitations. Worm complaints in children. Keratitis.",
    rubrics:
      "HEAD — PAIN — left side; HEART — PAIN — stitching; GENERALS — SIDE — left; MIND — FEAR — pointed things; GENERALS — MOTION — agg",
    farrington:
      "Farrington notes: Spigelia is one of the most important heart and worm remedies. Compare Cactus grandiflorus: both have cardiac pain; Cactus has more constriction — 'iron band around the chest'; Spigelia has sharp, radiating pain to left arm and down. Compare Arsenicum: both have heart pains; Arsenicum is more restless with anxiety; Spigelia has more sharp stitching pain with trembling of heart. Farrington's key: 'Spigelia is the principal remedy for left-sided neuralgia and for pericarditis — the pain is lancinating, going from the heart to the left arm.' For ophthalmia: Spigelia is for sharp, neuralgic eye pain radiating into the head; worse from motion. Distinguishes from Ranunculus bulbosus: both have intercostal neuralgia; Ranunculus is more specifically left-sided intercostal (shingles area).",
    relationships: {
      complementary: "Cactus, Digitalis",
      antidotes: "Camphor, Nux Vomica",
      inimical: "None significant",
      followsWell: "Belladonna, Calc Carb",
      followedBy: "Sulphur, Calc Carb",
    },
  },
  {
    name: "Staphysagria",
    abbreviation: "Staph",
    miasmaticClassification: "Sycotic",
    keynotes:
      "Suppressed anger — ailments from indignation, humiliation, or suppressed feelings. Mild, sensitive, but deeply hurt. Urinary complaints after coition or surgery. Styes and chalazia. Cannot express anger — trembles instead.",
    materiaMedicaSummary:
      "Staphysagria (stavesacre) is the remedy of suppressed emotions, especially anger and indignation. The patient is gentle and mild in appearance but seething inside — cannot express anger, trembles, throws things. Ailments from: humiliation, insults, sexual indulgence, indignation. Urinary: cystitis after coition (honeymoon cystitis); frequent urge as if bladder never empties; post-operative urinary retention. Skin: styes, chalazia; itching that moves when scratched. Sexual: ill-effects of masturbation; prostatitis. Teeth: crumbling, decay at roots. Aggravated: suppressed emotions, coition, tobacco. Ameliorated: warmth, rest, expressing emotions.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Ailments from suppressed anger and indignation. 2) Cannot express anger — mild exterior, storm inside. 3) Honeymoon cystitis after coition. 4) Styes recurrent. 5) Teeth crumble and decay. 6) Itching moves when scratched. 7) Post-surgical urinary complaints.",
    clinicalIndications:
      "Honeymoon cystitis. Recurrent styes. Prostatitis. Post-surgical pain and urinary complaints. Indignation ailments. Teeth complaints. Sexual neurasthenia.",
    rubrics:
      "MIND — AILMENTS FROM — indignation; MIND — ANGER — suppressed; BLADDER — URINATION — difficult — coition, after; EYE — STYES; MIND — SENSITIVE — emotions",
    farrington:
      "Farrington places Staphysagria as the 'wounded dignity' remedy. Compare Colocynthis: both have indignation as causation; Colocynthis results in sudden, violent colic; Staphysagria in suppressed anger that produces chronic ailments — the ailments from indignation that cannot be expressed. Compare Ignatia: both have ailments from grief; Ignatia is more acute; Staphysagria is more chronic, with sexual symptoms. Farrington's key: 'Staphysagria is suited to mild, gentle natures who are easily hurt in their dignity — they swallow their anger and keep up appearances.' For urinary complaints: Staphysagria for cystitis after surgery, catheterization (mechanical injury to urethra), or honeymoon cystitis. Tooth affections with soft, spongy, crumbling teeth are characteristic.",
    relationships: {
      complementary: "Colocynth, Causticum",
      antidotes: "Camphor, Nux Vomica",
      inimical: "None significant",
      followsWell: "Colocynth, Nux Vomica",
      followedBy: "Sulphur, Colocynth",
    },
  },
  {
    name: "Arnica montana",
    abbreviation: "Arn",
    miasmaticClassification: "Traumatic (Psoric)",
    keynotes:
      "First remedy for all injuries, trauma, and mechanical shock. Bruised, sore, beaten feeling all over. Says nothing is wrong and refuses help. Fear of being touched — parts feel sore and beaten. Bed feels too hard. Restless — moves constantly to find a soft spot.",
    materiaMedicaSummary:
      "Arnica is the premier trauma remedy. Mechanical injuries of all kinds — falls, blows, contusions, overexertion, sprains. Prevents suppuration and septic conditions after injuries. Mind: indifference, says he is well when seriously ill, forgets what he was going to say, sudden shocks. Body: bruised, sore sensation; offensive breath and body odor; hemorrhages (dark, fluid blood). Concussion, apoplexy, epistaxis. Rheumatism from overuse. Post-surgical bruising. Aggravated: touch, motion, rest, wine, dampness. Ameliorated: lying down, cold applications to head.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Bed feels too hard — constantly moves to find a soft spot. 2) Says nothing is wrong even when very ill. 3) Fear of being touched due to soreness. 4) Offensive smell of breath and stool. 5) Dark, fluid hemorrhages. 6) Rheumatism from overexertion. 7) Excellent for concussion and head injuries.",
    clinicalIndications:
      "Trauma, sprains, bruises, contusions. Post-surgical recovery. Concussion. Hemorrhage (dark blood). Rheumatism from overuse. Epistaxis. Apoplexy. Sports injuries.",
    rubrics:
      "GENERALS — INJURIES — bruises; MIND — WELL — says he is; GENERALS — BED — hard, feels too; GENERALS — TOUCH — agg; GENERALS — OVEREXERTION — agg",
    farrington:
      "Farrington notes: Arnica is the first remedy to think of after mechanical injury. Compare Rhus tox: both help with soreness and bruised feeling; Arnica is for fresh trauma and ecchymosis; Rhus tox is for sprained tendons and ligaments that improve with gentle continued motion. Compare Ruta: Ruta is for periosteum and cartilage injuries; Arnica is for the bruised, sore muscle. Farrington's key: 'Arnica is the remedy when everything the patient lies on feels too hard — the peculiar soreness as if bruised, with the characteristic mental symptom of saying I am all right, I need no doctor.' Distinguishes from Hypericum: Hypericum is for nerve-rich injuries (fingers, toes, spine); Arnica for general traumatic soreness.",
    relationships: {
      complementary: "Aconite",
      antidotes: "Camphor",
      inimical: "None significant",
      followsWell: "Rhus tox",
      followedBy: "Sulphur, Rhus tox",
    },
  },
  {
    name: "Baptisia tinctoria",
    abbreviation: "Bapt",
    miasmaticClassification: "Septic (Syphilitic)",
    keynotes:
      "Septic states, typhoid-like fever with profound prostration. Offensive discharges — offensive breath, stool, sweat. Mental confusion — feels body is scattered in pieces. Stupid, besotted expression. Rapid prostration out of proportion to illness.",
    materiaMedicaSummary:
      "Baptisia (wild indigo) covers putrid, septic, typhoid conditions. Rapid onset of high fever with profound toxaemia. Face: dusky, besotted look, swollen. Mind: confusion — cannot tell where his limbs are; feels body scattered. Tongue: brown coating, dry, cracked in centre. Throat: dark red, swollen; can swallow liquids only. Extreme muscular soreness. Offensive odor to everything. Sleeps in mid-sentence. Used in influenza with great prostration and offensive secretions. Aggravated: humidity, fog, indoor air. Ameliorated: cool open air, rest.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Besotted, drunken-looking face. 2) Feels body is in pieces — scattered. 3) Profound prostration with high temperature. 4) Extremely offensive discharges. 5) Can only swallow liquids. 6) Sleeps while answering questions. 7) Dark red throat without much pain.",
    clinicalIndications:
      "Typhoid fever. Septicemia. Influenza with prostration. Putrid sore throat. Gastric fever. Offensive ulcers. Bed sores.",
    rubrics:
      "MIND — CONFUSION — identity; GENERALS — OFFENSIVENESS; THROAT — SWALLOWING — solids difficult; GENERALS — PROSTRATION; FEVER — TYPHOID",
    farrington:
      "Farrington places Baptisia in typhoid and septic states. Compare Gelsemium: both produce stupor and dullness; Gelsemium has paresis and trembling; Baptisia has more putrid, septic, offensive character — everything is offensive. Compare Rhus tox: both have restlessness and body soreness in typhoid; Rhus tox is more musculoskeletal; Baptisia has the unique delusion — patient thinks his body is scattered about the bed and tries to collect the pieces. Farrington's key: 'Baptisia is suited to low typhoid states where the patient has a stupid, besotted expression, and where all discharges are terribly offensive.' The rapid onset of prostration and the peculiar mental state (feels he is two persons) are characteristic.",
    relationships: {
      complementary: "Gelsemium, Arsenicum",
      antidotes: "Nux vomica",
      inimical: "None significant",
      followsWell: "Arsenicum, Belladonna",
      followedBy: "Sulphur, Arsenicum",
    },
  },
  {
    name: "Colocynthis",
    abbreviation: "Coloc",
    miasmaticClassification: "Psoric",
    keynotes:
      "Severe colicky abdominal pains better from hard pressure and bending double. Ailments from anger and indignation (similar to Staphysagria but pain dominant). Agonizing, cutting, griping pains forcing patient to bend double and press on abdomen. Sudden onset of cramps after eating fruit or when angry.",
    materiaMedicaSummary:
      "Colocynthis (bitter cucumber) is the great colic remedy. Violent abdominal cramps — griping, cutting, agonizing — relieved by bending double and firm pressure. Diarrhea: watery, offensive, after anger or eating fruit. Neuralgic pains in sciatic nerve — left-sided, cramping. Ovarian cysts — left ovary with colicky pains better pressure. Headache pressing, heavy, better lying quietly. Vomiting from extreme pain. Aggravated: anger, indignation, eating, after grief. Ameliorated: hard pressure, bending double, warmth.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Bending double and pressing hard on abdomen relieves. 2) Ailments following anger or indignation with pain. 3) Agonizing abdominal colic — screams. 4) Left-sided sciatica cramping, better pressure. 5) Watery diarrhea after fruit or anger. 6) Left ovarian cyst pain better pressure.",
    clinicalIndications:
      "Intestinal colic. Irritable bowel syndrome. Left-sided sciatica. Ovarian cyst (left). Diarrhea from anger. Neuralgic headaches. Renal colic.",
    rubrics:
      "ABDOMEN — PAIN — pressure, better; ABDOMEN — PAIN — bending double, better; MIND — AILMENTS FROM — anger; EXTREMITIES — SCIATIC NERVE — left",
    farrington:
      "Farrington's analysis: Colocynthis is the great remedy for colic from suppressed anger. Compare Magnesia phos: both have violent cramps better from heat and doubling up; Colocynthis has a definite emotional causation (indignation, humiliation); Mag phos is more mechanical. Compare Chamomilla: both are worse from anger; Chamomilla child is irritable and demands; Colocynthis adult has suppressed anger. Farrington's key: 'Colocynthis should be thought of whenever the patient says the colic comes on after anger or chagrin — the emotional causation is the key.' Distinguishes from Dioscorea: Dioscorea's colic is better from straightening up; Colocynthis is better by bending double. For sciatica: Colocynthis when the pain is better from firm pressure and warmth.",
    relationships: {
      complementary: "Mag Phos, Causticum",
      antidotes: "Coffea, Chamomilla",
      inimical: "None significant",
      followsWell: "Chamomilla, Merc sol",
      followedBy: "Sulphur, Mag Phos",
    },
  },
  {
    name: "Drosera rotundifolia",
    abbreviation: "Dros",
    miasmaticClassification: "Tubercular",
    keynotes:
      "Spasmodic, whooping cough — paroxysms so violent the patient turns blue and vomits. Cough after midnight with barking, deep hollow sound. Tickling larynx. Holds chest during cough. Suspicious mind. Used for tubercular tendency and bone destruction.",
    materiaMedicaSummary:
      "Drosera (sundew) is Hahnemann's specific for whooping cough and spasmodic cough. Cough: paroxysmal, suffocative; barking, deep hollow; worse after midnight, lying down, warmth; patient holds sides during cough; vomits after coughing; turns blue from violence of attack. Laryngeal phthisis. Growing pains in bones. Tuberculosis with night sweats. Suspicious, restless, doesn't want to be left alone. Aggravated: after midnight, lying down, warmth, singing, laughing. Ameliorated: rest, sitting up, open air.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Paroxysmal whooping cough worse after midnight. 2) Turns blue during coughing spells. 3) Vomiting after cough. 4) Holds sides during cough — sore. 5) Tuberculosis with night sweats. 6) Bone destruction, growing pains. 7) Suspicious disposition.",
    clinicalIndications:
      "Whooping cough. Spasmodic cough. Laryngeal phthisis. Tuberculosis. Growing pains in children. Night cough. Bronchitis.",
    rubrics:
      "COUGH — WHOOPING; COUGH — NIGHT — midnight, after; COUGH — PAROXYSMAL; LARYNX — PHTHISIS; GENERALS — TUBERCULAR DIATHESIS",
    farrington:
      "Farrington notes: Drosera is one of the most important remedies for spasmodic cough. Compare Pertussinum (nosode): Drosera is the acute remedy of choice for whooping cough with the violent spasmodic nature. Compare Coccus cacti: both have violent paroxysmal cough with vomiting of mucus; Coccus cacti is worse in warm room and from drinking; Drosera is worse after midnight and on lying down. Farrington's key: 'Drosera is pre-eminently the remedy for whooping cough — deep, hollow, barking cough, following one another rapidly, so that the patient cannot get breath, worse after midnight.' For laryngeal tuberculosis: Drosera has a special affinity. Distinguishes from Spongia: Spongia has more dry, barking cough; Drosera has more spasmodic, whooping character.",
    relationships: {
      complementary: "Tuberculinum, Nux Vomica",
      antidotes: "Camphor",
      inimical: "None significant",
      followsWell: "Belladonna, Sulphur",
      followedBy: "Sulphur, Calcarea",
    },
  },
  {
    name: "Eupatorium perfoliatum",
    abbreviation: "Eup-per",
    miasmaticClassification: "Psoric",
    keynotes:
      "Bone pains — deep, aching, as if bones would break (breakbone fever). Thirst for cold water before and during chill. Bilious vomiting during fever. Restless — must move despite pain. Influenza with intense bone-breaking pain.",
    materiaMedicaSummary:
      "Eupatorium perfoliatum (boneset) covers influenza and malarial fevers with intense, deep bone pains. Fever: chill begins 7–9 AM, preceded by thirst; during chill, thirst for large quantities of cold water; fever with intense bone pains; sweating ameliorates except head. Vomiting: bilious, with intense nausea; cannot bear smell of food; relieved after vomiting of bile. Headache: occipital, throbbing. Soreness of eyeballs. Cough: sore, painful chest; must hold chest during cough. Aggravated: morning 7–9 AM, motion, cold air. Ameliorated: sweating (except head), lying on face.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Bone pains during fever as if bones breaking. 2) Thirst before chill — distinctive keynote. 3) Bilious vomiting with nausea during fever. 4) Restless despite pain. 5) Soreness of eyeballs. 6) Chill starts 7–9 AM. 7) Holds chest during cough.",
    clinicalIndications:
      "Influenza. Malaria with bone pains. Dengue fever. Bilious fever. Hepatitis. Coughs with bone pain. Rheumatic conditions.",
    rubrics:
      "GENERALS — BONES — pain, as if broken; CHILL — THIRST — chill, during; STOMACH — NAUSEA — violent; FEVER — CHILL — 7–9 AM",
    farrington:
      "Farrington places Eupatorium in the acute febrile diseases, particularly influenza and dengue-like fever. Compare Gelsemium: both for influenza; Gelsemium has prostration, trembling, drooping; Eupatorium has more intense bone pain — 'breakbone fever.' Compare Arsenicum: both have periodicity; Eupatorium has specifically the intense pain in bones as if they would break. Farrington's key: 'Eupatorium perfoliatum is indicated in intense bone pains and headaches during febrile states — the patient says it feels as if the bones are broken.' For malaria-like symptoms: Eupatorium when chill begins in the back, preceded by thirst and followed by intense bone ache. Distinguishes from Nux vomica in fever: both can precede bone pains but Nux has more gastric component.",
    relationships: {
      complementary: "Bryonia, Natrum Mur",
      antidotes: "Arsenicum",
      inimical: "None significant",
      followsWell: "Aconite, Bryonia",
      followedBy: "Sulphur, Bryonia",
    },
  },
  {
    name: "Ferrum phosphoricum",
    abbreviation: "Ferr-p",
    miasmaticClassification: "Psoric",
    keynotes:
      "First stage of all inflammatory conditions before exudation — the ideal remedy for early fever and congestion. Mild fever with slow onset. Anemia with redness of face. Hemorrhages (bright red). Cough: hard, short, dry, worse 4–6 AM.",
    materiaMedicaSummary:
      "Ferrum phosphoricum (iron phosphate) is the Schuessler tissue salt for early inflammation. Suitable for all acute conditions at the very onset before pathological changes are established. Fever: slow onset, no intensity; patient wants to lie down; flushed, hot face. Anemia: face red, hot, flushed; pallor alternating with flushing. Respiratory: first stage of pneumonia, bronchitis, croup; cough hard, short; worse 4–6 AM. Hemorrhages: epistaxis (bright red blood). Ears: earache with intense local congestion. Aggravated: night, 4–6 AM, cold, motion. Ameliorated: cold applications, rest.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) First stage remedy before exudation. 2) Low-grade fever, no marked symptoms. 3) Bright red hemorrhages. 4) Flushed face alternating with pallor. 5) Cough 4–6 AM — very reliable keynote. 6) Anemia with hot flushes. 7) Onset of inflammatory conditions.",
    clinicalIndications:
      "Fevers (early stage). First stage pneumonia/bronchitis. Anemia. Epistaxis. Earache (otitis media early). Croup (early stage). Vomiting of undigested food.",
    rubrics:
      "FEVER — BEGINNING of illness; COUGH — MORNING — 4–6 AM; NOSE — EPISTAXIS — bright red; GENERALS — ANEMIA; GENERALS — INFLAMMATORY CONDITIONS — early",
    farrington:
      "Farrington places Ferrum phos in the first stage of all inflammations — before the exudate is formed. Compare Aconite: both are first-stage remedies; Aconite has more fear and restlessness with sudden onset; Ferrum phos is milder, more gradual, less anxiety. Compare Belladonna: Bell has high fever with violent delirium; Ferrum phos has moderate fever, flushed face but without the violent intensity. Farrington's key: 'Ferrum phosphoricum is the remedy for the first stage of colds, fevers, and inflammations when there are no characteristic symptoms to guide to a more specific remedy.' The slow, insidious onset distinguishes it from Aconite. Hemorrhages of bright red blood with moderate fever, tiredness, and mild fever point to Ferrum phos.",
    relationships: {
      complementary: "Calc Phos, Kali Mur",
      antidotes: "Nux Vomica",
      inimical: "None significant",
      followsWell: "Aconite, Belladonna",
      followedBy: "Sulphur, Kali Mur",
    },
  },
  {
    name: "Hamamelis virginiana",
    abbreviation: "Ham",
    miasmaticClassification: "Venous (Sycotic)",
    keynotes:
      "Venous stasis and passive hemorrhages — dark, non-coagulating blood. Varicose veins — bruised, sore, tired feeling. Hemorrhoids with bleeding and great soreness. Bruised, sore feeling everywhere without trauma. Depression and sadness.",
    materiaMedicaSummary:
      "Hamamelis (witch hazel) acts primarily on the venous circulation. All complaints arise from venous engorgement and passive hemorrhage. Hemorrhages: dark, fluid, non-coagulable — from any orifice. Hemorrhoids: bleeding, burning, raw soreness; hemorrhoids during pregnancy. Varicose veins: swollen, bruised, painful; leg ulcers. Nose: epistaxis, passive. Eyes: sub-conjunctival hemorrhage. Ovaries: neuralgia. Testicles: orchitis with bruised soreness. Aggravated: motion, warm moist air, warm bath, pressure. Ameliorated: rest.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Venous hemorrhage — dark, passive. 2) Varicose veins with bruised soreness. 3) Bleeding hemorrhoids — main indication. 4) Bruised sore feeling without injury. 5) Sub-conjunctival hemorrhage. 6) Depression with passive bleeding tendency. 7) Hemorrhage from any mucous membrane.",
    clinicalIndications:
      "Hemorrhoids (bleeding). Varicose veins. Passive hemorrhages. Epistaxis. Sub-conjunctival hemorrhage. Phlebitis. Orchitis. Venous ulcers.",
    rubrics:
      "RECTUM — HEMORRHOIDS — bleeding; GENERALS — HEMORRHAGE — dark; EXTREMITIES — VARICOSE VEINS; GENERALS — VENOUS CIRCULATION — weak; GENERALS — BRUISED — feeling",
    farrington:
      "Farrington notes: Hamamelis is the great venous hemorrhagic remedy. Compare Phosphorus: both have passive hemorrhages; Phosphorus has bright, profuse bleeding from any orifice with burning; Hamamelis has more passive, dark, venous blood with the peculiar soreness. Compare Lachesis: both have dark blood that does not coagulate; Lachesis is more purpuric and septic; Hamamelis is more specifically venous and varicose. Farrington's key: 'Hamamelis acts principally on the venous side of the circulation — venous congestion, varicose veins, hemorrhoids, and passive hemorrhages are its sphere.' The characteristic mental symptom — desire to be let alone; does not wish to be spoken to — accompanies its use. Distinguishes from Arnica: Arnica is for arterial ecchymosis; Hamamelis for venous oozing.",
    relationships: {
      complementary: "Arnica, Pulsatilla",
      antidotes: "Arnica",
      inimical: "None significant",
      followsWell: "Pulsatilla, Nux Vomica",
      followedBy: "Sulphur, Lycopodium",
    },
  },
  {
    name: "Ipecacuanha",
    abbreviation: "Ipec",
    miasmaticClassification: "Psoric",
    keynotes:
      "Persistent, constant nausea not relieved by vomiting — the hallmark. Clean, moist tongue (not coated). Hemorrhages — bright red, profuse, gushing. Spasmodic cough ending in nausea/gagging. Asthma: wheezing, constriction, nausea.",
    materiaMedicaSummary:
      "Ipecacuanha (ipecac root) is characterized by persistent nausea with clean tongue. Stomach: extreme nausea with copious saliva; nausea not relieved by vomiting; aversion to food; no thirst. Respiratory: spasmodic cough; child stiffens and becomes blue; rattling mucus; nausea with cough. Hemorrhages: bright, profuse, gushing hemorrhages — from lungs, uterus, bowels; blood is bright red. Malaria: apyrexia without thirst; nausea dominant feature. Asthma: sudden, with nausea and rattling. Aggravated: warm, moist air, lying down, eating, motion. Ameliorated: open air, rest, pressure.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Nausea persistent — the overriding symptom. 2) Clean, moist, clear tongue despite nausea. 3) Bright red profuse hemorrhage — distinctive. 4) Cough with gagging and vomiting. 5) Asthma with nausea. 6) No thirst at all. 7) Dysentery with constant nausea.",
    clinicalIndications:
      "Nausea and vomiting. Asthma. Hemorrhages (bright red). Whooping cough. Dysentery. Morning sickness. Malaria. Post-partum hemorrhage.",
    rubrics:
      "STOMACH — NAUSEA — persistent; TONGUE — CLEAN; GENERALS — HEMORRHAGE — bright red; COUGH — NAUSEA — during; GENERALS — THIRST — thirstlessness",
    farrington:
      "Farrington places Ipecac as the great 'nausea remedy.' Compare Antimonium tartaricum: both have nausea and respiratory mucus; Ant-t has drowsiness, coarse rattling, and is too weak to expectorate; Ipecac has persistent, unrelieved nausea with clean tongue. Compare Veratrum album: both have violent nausea and vomiting; Veratrum has cold perspiration on forehead with collapse; Ipecac has persistent nausea not relieved even after vomiting. Farrington's key: 'Ipecacuanha has one pre-eminent characteristic — constant, persistent nausea unrelieved by vomiting, with a clean moist tongue (not coated).' For hemorrhage: Ipecac when bright red blood is accompanied by nausea. Distinguishes from Phosphorus in hemorrhage: both have bright red blood but Ipecac always has the accompanying nausea.",
    relationships: {
      complementary: "Ant Tart, Arsenicum",
      antidotes: "Arsenicum, Nux Vomica",
      inimical: "None significant",
      followsWell: "Aconite, Belladonna",
      followedBy: "Sulphur, Ant Tart",
    },
  },
  {
    name: "Ledum palustre",
    abbreviation: "Led",
    miasmaticClassification: "Sycotic",
    keynotes:
      "Puncture wounds — first remedy for insect stings, nail wounds, animal bites. Affected parts are cold but better from cold applications (opposite to most remedies). Ascending rheumatism — starts in feet, goes upward. Black eye (orbital ecchymosis).",
    materiaMedicaSummary:
      "Ledum (marsh tea) is the remedy for puncture wounds and insect bites. Wounds: deep punctures from nails, thorns, bites; parts become cold, numb, discolored but better cold applications. Rheumatism: ascending from feet upward; joints swollen, hot, pale or livid; worse warmth. Gout: feet and small joints. Eye: ecchymosis after injuries; black eye. Prevents tetanus and suppuration after puncture wounds. Animal bites including tick bites (Lyme disease precursor). Aggravated: warmth, motion, heat of bed. Ameliorated: cold, cold bathing.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Puncture wounds — nails, insect stings, bites. 2) Parts feel cold but are better from cold. 3) Ascending rheumatism — feet upward. 4) Black eye after trauma. 5) Prevents tetanus. 6) Gout in small joints. 7) Better cold applications — distinctive.",
    clinicalIndications:
      "Puncture wounds. Insect stings. Animal bites. Black eye. Ascending rheumatism. Gout (small joints). Tetanus prevention. Tick bites.",
    rubrics:
      "GENERALS — INJURIES — puncture wounds; EXTREMITIES — RHEUMATISM — ascending; EYE — ECCHYMOSIS; GENERALS — COLD — applications, better; GENERALS — BITES — insect",
    farrington:
      "Farrington notes: Ledum is the leading remedy for punctured wounds and insect stings. Compare Arnica: Arnica is for blunt trauma and bruising; Ledum is for sharp, punctured injuries — especially when the injured part becomes cold and mottled, yet is better from cold applications. Compare Apis: both are better from cold; Apis has more burning and stinging; Ledum has more coldness of the part. Farrington's key: 'Ledum is the remedy for penetrating wounds, for bites from animals, for stings — when the wound is cold to the touch and cold applications relieve.' For rheumatism: Ledum's rheumatic pains begin in the feet and travel upward, and the affected parts feel cold. Distinguishes from Silica: both are for penetrating wounds; Silica is for old, infected wounds with tendency to suppurate; Ledum for fresh punctures.",
    relationships: {
      complementary: "Arnica, Hypericum",
      antidotes: "Camphor",
      inimical: "None significant",
      followsWell: "Hypericum, Arnica",
      followedBy: "Sulphur, Rhus tox",
    },
  },
  {
    name: "Phytolacca decandra",
    abbreviation: "Phyt",
    miasmaticClassification: "Syphilitic",
    keynotes:
      "Throat complaints — dark red, rough, burning; pains radiate to ears on swallowing. Breast: glandular swelling, mastitis, cracked nipples. Glandular enlargements. Rheumatic pains, shifting, electric, shooting through body.",
    materiaMedicaSummary:
      "Phytolacca (poke root) acts powerfully on fibrous and glandular tissues. Throat: dark red or purplish, rough, burning; pains shooting to ears; tonsils swollen; diphtheria. Breasts: mastitis with lump, hard, painful; nipples cracked and very sore; milk stringy; used in weaning. Glands: enlarged parotid, cervical, axillary glands; tonsils; breasts. Rheumatism: pains fly like electric shocks; worse cold damp; worse motion; shooting pains. Gonorrheal rheumatism. Aggravated: cold damp, motion, night. Ameliorated: warmth, rest, dry weather.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Sore throat dark red with ear radiation on swallowing. 2) Mastitis — hardness of breast with pain. 3) Glandular enlargements. 4) Shooting, electric rheumatic pains. 5) Cracked sore nipples. 6) Diphtheria with dark membranes. 7) Better warmth and rest.",
    clinicalIndications:
      "Mastitis. Sore throat (diphtheria, tonsillitis). Glandular swellings. Gonorrheal rheumatism. Sciatica. Mumps. Breast tumors. Cracked nipples.",
    rubrics:
      "THROAT — PAIN — ear extending to, swallowing on; FEMALE — BREAST — mastitis; GLANDS — ENLARGED; EXTREMITIES — PAIN — electric, like shocks; THROAT — DIPHTHERIA",
    farrington:
      "Farrington places Phytolacca in glandular and throat affections. Compare Mercurius: both affect tonsils and salivary glands; Merc has more salivation, sweat; Phytolacca has the unique shooting pains radiating to the ear on swallowing, and the characteristic dark red or bluish discoloration of the throat. Compare Belladonna: both have right-sided throat affections; Bell has bright red, dry; Phytolacca is more dark red, with radiating pains. Farrington's key: 'Phytolacca is suited to the dark, rough throat — the pains shoot to the ear on swallowing — this is pathognomonic.' Distinguishes from Apis in throat: Apis has shiny edema; Phytolacca has more fibrous, glandular swelling. For mastitis: Phytolacca when breasts are stony hard, purple, exquisitely painful.",
    relationships: {
      complementary: "Belladonna, Silica",
      antidotes: "Chamomilla",
      inimical: "None significant",
      followsWell: "Merc sol, Belladonna",
      followedBy: "Sulphur, Silica",
    },
  },
  {
    name: "Podophyllum peltatum",
    abbreviation: "Pod",
    miasmaticClassification: "Psoric",
    keynotes:
      "Profuse, gushing, watery or greenish diarrhea — morning diarrhea (5–10 AM) with offensive odor. Liver complaints — right lobe with desire to press liver. Prolapse of rectum during stool. Alternation of diarrhea with headache or constipation.",
    materiaMedicaSummary:
      "Podophyllum (May apple) acts primarily on the liver and bowels. Diarrhea: profuse, watery, gushing, offensive; morning 5–10 AM; child screams and rolls head before stool; jelly-like mucus; worse teething. Liver: enlarged right lobe; pain in right hypochondrium; desires to press and rub liver; jaundice; bilious headache. Rectum: prolapse; hemorrhoids. Stool: green, watery, grass-green, offensive; followed by weakness and nausea. Colic before stool. Alternation of head symptoms and bowel symptoms. Aggravated: morning, early AM, hot weather, eating, dentition. Ameliorated: lying on abdomen, rubbing liver.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Morning diarrhea gushing and profuse. 2) Liver complaints — desires to press right side. 3) Prolapse of rectum during stool. 4) Alternation of symptoms — head and bowels. 5) Green, offensive stool in teething children. 6) Empty, gone feeling in stomach. 7) Rolls head during teething.",
    clinicalIndications:
      "Summer diarrhea. Hepatitis. Cholera infantum. Teething diarrhea. Prolapse ani. Cholecystitis. Morning diarrhea. Jaundice.",
    rubrics:
      "RECTUM — DIARRHEA — morning; STOOL — GUSHING; ABDOMEN — LIVER — pressing on, desire; RECTUM — PROLAPSE — stool, during; STOOL — OFFENSIVE",
    farrington:
      "Farrington notes: Podophyllum is the great hepatic and diarrhea remedy. Compare China: both follow excessive discharges; Podophyllum's stools are profuse, gushing, painless, offensive, worse in morning; China's debility comes after such stools. Compare Aloe: both have sudden, gushing stools in morning driving out of bed; Aloe has more fullness in rectum; Podophyllum has more liver involvement and right-sided symptoms. Farrington's key: 'Podophyllum is indicated in chronic liver affections with morning diarrhea — profuse, gushing, offensive, painless, early morning, driving out of bed.' The teeth-grinding in children with liver symptoms is a characteristic. Distinguishes from Chamomilla: Cham has green stools from anger in children; Podophyllum has more hepatic symptoms.",
    relationships: {
      complementary: "Nat Sulph, Sulphur",
      antidotes: "Camphor, Nux Vomica",
      inimical: "None significant",
      followsWell: "Nux Vomica, Ipecac",
      followedBy: "Sulphur, Nat Sulph",
    },
  },
  {
    name: "Ruta graveolens",
    abbreviation: "Ruta",
    miasmaticClassification: "Sycotic",
    keynotes:
      "Injury to tendons, ligaments, and periosteum. Eye strain — aching eyes from overuse, fine work, reading. Wrists and ankles from sprains. Ganglion. Bruised bones (periosteum affected). Follows Arnica when bones feel bruised.",
    materiaMedicaSummary:
      "Ruta (rue) follows Arnica for injuries involving periosteum, tendons, and cartilage. Bruised feeling in bones and joints. Eyes: aching, burning, strained; blurred vision from overuse; useful for computer eye strain. Tendons: tendinitis, ganglia on wrists. Ankle: sprains with weakness. Periosteum: bruised, sore feelings. Spine: lumbago from overwork; bruised back. Rectum: rectal prolapse after straining. Constipation. Aggravated: lying, cold, wet, touch. Ameliorated: warmth, motion (slight).",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Periosteum and tendon injuries — bones feel bruised. 2) Eye strain from overuse — distinctive. 3) Wrist ganglion. 4) Ankle sprains with weakness. 5) Lumbago from overwork. 6) Prolapse rectum from straining. 7) Follows Arnica for deeper tissue injury.",
    clinicalIndications:
      "Tendon injuries. Eye strain. Ganglion wrist. Ankle sprains. Lumbago. Periostitis. Rectal prolapse. Constipation. Carpal tunnel syndrome.",
    rubrics:
      "EXTREMITIES — TENDONS — injuries; EYE — STRAIN — from; GENERALS — INJURIES — periosteum; BACK — LUMBAGO — overexertion; WRIST — GANGLION",
    farrington:
      "Farrington's notes: Ruta acts specifically on the periosteum and cartilage. Compare Arnica: Arnica is for muscle and soft tissue bruising; Ruta is for the periosteum and fibrous coverings — bruised bone pain. Compare Rhus tox: Rhus acts on tendons and ligaments (better from motion); Ruta acts on periosteum and cartilage (not specifically better from motion). Farrington's key: 'Ruta is suited to sprains and bruises of the bones — it is especially useful when there is a bruised, lame feeling in the bones, as if the tendons had been overstrained.' For eyes: Ruta is indicated when the eyes are strained from fine work (reading, needlework) — the eye aches as if from strain. Wrist complaints (ganglion, repetitive strain) respond well to Ruta.",
    relationships: {
      complementary: "Arnica, Calc Phos",
      antidotes: "Camphor",
      inimical: "None significant",
      followsWell: "Rhus tox, Arnica",
      followedBy: "Sulphur, Calc Phos",
    },
  },
  {
    name: "Sabadilla",
    abbreviation: "Sab",
    miasmaticClassification: "Psoric",
    keynotes:
      "Hay fever — violent sneezing with profuse watery nasal discharge and lachrymation. Chilly patient worse cold air, better warm drinks. Imaginary illness — hypochondriacal, thinks he has terrible diseases. Threadworm.",
    materiaMedicaSummary:
      "Sabadilla (cevadilla) is a leading remedy for hay fever and nasal allergies. Nose: violent, prolonged sneezing; watery nasal discharge; itching and tingling in nose; worse cold air, strong odors, flowers. Eyes: profuse watery lachrymation with sneezing. Mind: hypochondriacal — imagines he has terrible diseases, cancer; fixed ideas about health. Throat: stitching pains better swallowing. Worms: threadworms with itching anus. Chilly — chilliness from crown to toes. Aggravated: cold, cold air, odors (flowers, garlic). Ameliorated: warm food and drinks, warmth.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Hay fever with violent sneezing. 2) Imaginary illness — hypochondriacal delusions. 3) Watery discharge from nose and eyes. 4) Chilly — worse cold air. 5) Better warm drinks and food. 6) Threadworms with itching. 7) Stitching throat pains relieved by swallowing warm liquids.",
    clinicalIndications:
      "Hay fever. Allergic rhinitis. Threadworms. Hypochondriasis. Colds from cold air. Sneezing paroxysms. Lachrymation with sneezing.",
    rubrics:
      "NOSE — SNEEZING — violent; MIND — IMAGINATIONS — disease, of having; GENERALS — CHILLINESS; GENERALS — WARM — things, desire for; NOSE — HAY FEVER",
    farrington:
      "Farrington notes: Sabadilla is one of the most important remedies for hay fever and coryza. Compare Allium cepa: both have profuse watery coryza; Allium cepa has acrid nasal discharge (corroding upper lip) with bland eye discharge; Sabadilla has spasmodic sneezing with watery discharge and the peculiar chronic imaginative anxiety. Compare Arsenicum: both have watery, acrid nasal discharge; Arsenicum has more burning; Sabadilla's coryza is more sneezing-dominant. Farrington's key: 'Sabadilla is suited to hay fever with violent sneezing, lacrimation, and the peculiar mental characteristic of hypochondriasis — imagines disease where none exists.' The patient who complains of worms when there are none, or imagines organs are displaced, is Sabadilla.",
    relationships: {
      complementary: "Allium Cepa, Arsenicum",
      antidotes: "Camphor",
      inimical: "None significant",
      followsWell: "Arsenicum, Wyethia",
      followedBy: "Sulphur, Lycopodium",
    },
  },
  {
    name: "Sanguinaria canadensis",
    abbreviation: "Sang",
    miasmaticClassification: "Psoric",
    keynotes:
      "Right-sided migraine — pain starts occiput, goes over vertex, settles over right eye. Burning palms and soles. Flushes of heat in menopause. Circumscribed redness of cheeks. Periodic headaches worse sun and light.",
    materiaMedicaSummary:
      "Sanguinaria (bloodroot) has a prominent right-sided affinity. Headache: periodic, sick headache; starts in nape, goes over right side to settle above right eye; worse sun, motion, light; better dark room, lying still, sleep, vomiting. Menopause: flushes of heat, burning, circumscribed red cheeks. Chest: pneumonia right side; burning in chest. Throat: burning, rawness. Shoulder: right-sided rheumatism — cannot raise arm (deltoid). Polypi — nasal. Aggravated: right side, sun, odors, motion. Ameliorated: sleep, vomiting, dark room.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Right-sided periodic sick headache. 2) Burning palms and soles. 3) Circumscribed red cheeks. 4) Flushes of heat — menopausal. 5) Right deltoid rheumatism. 6) Nasal polypi. 7) Headache better after vomiting.",
    clinicalIndications:
      "Right-sided migraine. Menopause (hot flushes). Shoulder rheumatism (right deltoid). Nasal polypi. Right pneumonia. Burning dysmenorrhea. Pharyngitis.",
    rubrics:
      "HEAD — PAIN — right side; HEAD — PAIN — occiput, extending to; GENERALS — HEAT — flushes of; EXTREMITIES — SHOULDER — right; NOSE — POLYPI",
    farrington:
      "Farrington places Sanguinaria in right-sided headaches and respiratory affections. Compare Belladonna: both have right-sided head pains; Bell's pain is more throbbing and acute; Sanguinaria's headache begins in the back of the neck, rises over the head, and settles over the right eye. Compare Iris versicolor: both have sick headaches with vomiting; Iris has burning in the throat and stomach; Sanguinaria has the right-sided, over-eye localization. Farrington's key: 'Sanguinaria is pre-eminently right-sided — right shoulder, right side of head, right side of chest.' For climacteric symptoms: Sanguinaria when hot flushes begin at menopause, especially with the characteristic right-sided headaches. For bronchitis: Sanguinaria in old age with rust-colored expectoration.",
    relationships: {
      complementary: "Lachesis, Sulphur",
      antidotes: "Nux Vomica",
      inimical: "None significant",
      followsWell: "Belladonna, Nat Mur",
      followedBy: "Sulphur, Lachesis",
    },
  },
  {
    name: "Tarentula hispanica",
    abbreviation: "Tarent",
    miasmaticClassification: "Sycotic",
    keynotes:
      "Extreme restlessness — constant motion of hands and feet. Better from music (must dance). Hysterical — sudden onset of severe symptoms. Destructive, manipulative, cunning behavior. Rapid movement. Better rubbing affected part on rough surfaces.",
    materiaMedicaSummary:
      "Tarentula hispanica (Spanish spider) presents the most extreme form of restlessness and hypersensitivity. Mind: extreme restlessness; must move constantly; worse at rest; sudden attacks of crying/laughing; manipulative and cunning; better from bright colors, music, dancing. Nervous system: chorea, epilepsy, hysteria; involuntary movements. Cardiac: palpitations, angina with anguish. Skin: extreme sensitiveness; erysipelas; carbuncles. Physical manifestations of hysteria. Aggravated: seeing others in trouble, touch, motion, noise. Ameliorated: music, dancing, bright colors, rubbing on hard surface.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Better from music — must dance. 2) Extreme restlessness — cannot be still. 3) Cunning, manipulative personality. 4) Sudden changes in behavior. 5) Involuntary movements — chorea. 6) Better rubbing against hard rough surfaces. 7) Hysterical attacks.",
    clinicalIndications:
      "Hysteria. Chorea. Extreme restlessness. Angina. Carbuncles. Erysipelas. Attention deficit hyperactivity. Manipulative personality disorders. Palpitations.",
    rubrics:
      "MIND — RESTLESSNESS — extreme; GENERALS — MUSIC — ameliorates; MIND — DANCING; MIND — CUNNING; EXTREMITIES — MOTION — constant",
    farrington:
      "Farrington places Tarentula in the choreic and hysterical conditions with restlessness. Compare Stramonium: both have violent, uncontrolled movements; Stramonium has more terror and delirium; Tarentula has more rhythmic, music-driven behavior. Compare Zincum: both have restless legs; Zincum has more fidgety feet from weakness; Tarentula has the peculiar — music ameliorates, especially rhythmic music. Farrington's key: 'Tarentula hispanica is indicated when there is extreme nervous restlessness — the patient must keep in constant motion, and is ameliorated by music (especially rhythmic music).' Distinguishes from Hyoscyamus in mania: Hyoscyamus is more lewdness; Tarentula is more frenzied, destructive, and cunning. The sudden alternation between being cunning and innocent is characteristic.",
    relationships: {
      complementary: "Zincum, Lycopodium",
      antidotes: "Camphor",
      inimical: "None significant",
      followsWell: "Ignatia, Belladonna",
      followedBy: "Sulphur, Lycopodium",
    },
  },

  {
    name: "Agaricus Muscarius",
    abbreviation: "Agar",
    miasmaticClassification: "Syphilitic + Tubercular",
    keynotes:
      "Twitching, jerking, trembling — choreic and spasmodic movements. Itching, burning, redness of skin as if frostbitten. Diagonal symptoms (right arm + left leg affected). Sensitiveness of spine — cannot bear touch or pressure. Mental excitement alternating with depression. Delirium with singing, dancing, and loquacity.",
    materiaMedicaSummary:
      "Agaricus muscarius (fly agarite mushroom) acts powerfully on the nervous system. Mind: delirium with singing, shouting, cheerfulness alternating with depression; makes verses, prophesies; indifference to loved ones. Head: headache with nausea and stiffness of neck. Eyes: twitching of lids; involuntary movements. Spine: extremely sensitive — cannot bear touch on dorsal spine; caries of spine. Chorea: twitching worse in sleep; whole body in constant motion; trembling after exertion. Chilblains: burning, itching, redness of toes and fingers as if frostbitten. Aggravated: cold air, coition, after eating, pressure on spine. Ameliorated: moving about slowly.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Diagonal symptoms — right arm and left leg, or vice versa. 2) Twitching of muscles — choreic movements. 3) Burning, itching of parts as if frostbitten. 4) Spine sensitive to touch and pressure. 5) Mental excitement with loquacity and cheerfulness. 6) Trembling after eating or exertion.",
    clinicalIndications:
      "Chorea. Epilepsy. Spinal irritation. Chilblains. Tremors. Senile dementia. Locomotor ataxia. Delirium tremens. Twitching of eyelids. Tic douloureux.",
    rubrics:
      "EXTREMITIES — TWITCHING; BACK — SENSITIVE — dorsal; SKIN — ITCHING — burning; MIND — LOQUACITY; GENERALS — COLD — air, agg",
    farrington:
      "Farrington notes: Agaricus acts powerfully on the spinal cord and cerebellum. Compare Nux vomica: both affect the nervous system and are worse in cold air; Nux has more gastric and liver involvement; Agaricus has more specific spinal cord symptoms (burning, itching along spine). Compare Zincum: both have spinal irritation; Zincum has more mental exhaustion from overwork; Agaricus has more chorea-like symptoms and diagonally crossing symptoms. Farrington's key: 'Agaricus is characterized by symptoms appearing diagonally — right arm and left leg affected together — and by itching, burning, and twitching of the skin.' For chilblains with intense itching and burning: Agaricus is unsurpassed. Trembling and twitching with the spinal irritation are hallmarks.",
    relationships: {
      complementary: "Tarentula hispanica",
      antidotes: "Camphor, Coffee",
      inimical: "None noted",
      followsWell: "Rhus tox, Belladonna",
      followedBy: "Calcarea carb, Sulphur",
    },
  },
  {
    name: "Alumina",
    abbreviation: "Alum",
    miasmaticClassification: "Psoric + Syphilitic",
    keynotes:
      "Extreme dryness of mucous membranes and skin. Constipation — no desire for days; must strain even for soft stool. Slow, sluggish functions — everything is slowed. Confusion of identity — does not know who he is. Worse on alternate days. Falling tendency — staggers when closing eyes.",
    materiaMedicaSummary:
      "Alumina is the remedy for extreme constitutional dryness. The patient is elderly, thin, and dried up. Nervous system: staggers when walking with eyes closed; locomotor ataxia; loss of muscular control. Rectum: no desire for days; great straining for soft stool; dryness and inactivity. Mind: confusion about identity — wonders whose voice he hears, whose limbs are his; time moves very slowly; hurried yet does things slowly. Throat: dry, raw; food must be swallowed with difficulty. Skin: dry, rough, itching without eruption. Aggravated: alternate days, potatoes, periodically, morning on waking. Ameliorated: in open air, warm drinks, evening.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Constipation with no desire for stool even when soft. 2) Dryness everywhere — skin, mucous membranes. 3) Slow in all functions — mental and physical. 4) Staggers when walking with eyes closed (ataxia). 5) Confusion of identity. 6) Worse alternate days.",
    clinicalIndications:
      "Constipation. Locomotor ataxia. Senile conditions. Dryness of skin and mucous membranes. Laryngitis with dryness. Progressive muscular atrophy. Dementia. Difficulty swallowing.",
    rubrics:
      "RECTUM — CONSTIPATION — soft stool, even; GENERALS — DRYNESS; MIND — IDENTITY — confusion of; EXTREMITIES — STAGGERING; GENERALS — ALTERNATING — days",
    farrington:
      "Farrington places Alumina as the chief remedy for dryness and constipation. Compare Nux vomica: both have constipation; Nux has constant ineffectual urging; Alumina has inactivity of the rectum — no desire at all, dry stool requiring great straining. Compare Bryonia: Bryonia's dryness is all over; Alumina's dryness is more specifically of mucous membranes and with the characteristic perversion of appetite (eats chalk, pencils, charcoal). Farrington's key: 'Alumina is indicated when there is a total absence of desire for stool — the rectum is inactive, the stool is dry, and it requires great effort even for soft stool.' The peculiar symptom — when he sees a knife, the impulse to kill — is an Alumina hallmark. Perversion of senses (chalk tastes sweet, etc.) is characteristic.",
    relationships: {
      complementary: "Bryonia, Ferrum",
      antidotes: "Bryonia, Ipecac",
      inimical: "Belladonna",
      followsWell: "Bryonia, Lachesis, Sulphur",
      followedBy: "Bryonia, Calc carb",
    },
  },
  {
    name: "Antimonium Crudum",
    abbreviation: "Ant-c",
    miasmaticClassification: "Psoric + Sycotic",
    keynotes:
      "Thick white coating on tongue — like whitewash. Disposition to grow fat. Sentimental, lovelorn mood — especially in moonlight. Nails and skin of fingers split and horny. Cannot bear heat of sun or cold bathing. Gastric complaints from overindulgence. Warts on palms and soles.",
    materiaMedicaSummary:
      "Antimonium crudum suits fat, chubby children and adults who are fretful, whining, and sentimental. Tongue: thickly coated white — never clean. Stomach: loss of appetite after the slightest food; nausea; vomiting after overeating; loathing of food and smell of food. Skin: warts on palms; nails deformed, brittle, broken; horny skin of fingers. Mind: sentimental mood in moonlight; cannot bear being touched or looked at; irritable children who want to be carried. Feet: sensitive soles from corns and callosities. Aggravated: heat of sun, cold bathing, cold food, after eating, wine. Ameliorated: rest, open air.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) White thick coating on tongue — pathognomonic. 2) Sentimental by moonlight. 3) Warts on soles and palms. 4) Nails deformed and brittle. 5) Gastric complaints from overeating. 6) Cannot bear heat of sun. 7) Fretful, peevish children.",
    clinicalIndications:
      "Gastric disorders. Skin warts. Nail disorders. Corns and calluses. Obesity. Eczema. Indigestion. Sentimental depression. Children with feeding difficulties.",
    rubrics:
      "MOUTH — TONGUE — white coated; MIND — SENTIMENTAL — moonlight; SKIN — WARTS — palms; NAILS — DEFORMED; GENERALS — BATHING — cold, agg",
    farrington:
      "Farrington notes: Antimonium crudum is the remedy for the sulky, sullen, sentimentally romantic patient with gastric predominance. Compare Pulsatilla: both have gastric symptoms with emotional features; Pulsatilla is gentle, tearful, weeping; Antimonium crudum is surly, cross, does not want to be touched or looked at. Compare Nux vomica: both have gastric complaints from eating too much; Nux is irritably working class; Ant-c is more romantically sentimental (weeps at moonlight). Farrington's key: 'The three grand keynotes of Antimonium crudum: white-coated tongue, thick and milky; excessive ailments from overeating; and peevish, sulky disposition.' Distinguishes from Antimonium tartaricum: Ant-c is gastric and cutaneous; Ant-t is respiratory and pulmonary.",
    relationships: {
      complementary: "Sulphur, Squilla",
      antidotes: "Hepar sulph",
      inimical: "None noted",
      followsWell: "Mercurius, Pulsatilla",
      followedBy: "Calcarea carb, Sulphur",
    },
  },
  {
    name: "Berberis Vulgaris",
    abbreviation: "Berb",
    miasmaticClassification: "Sycotic",
    keynotes:
      "Radiating pains — from a center outward in all directions. Renal and biliary colic. Bubbling sensation in kidneys. Rapidly changing symptoms — pains change in character and locality rapidly. Jaundice with liver disease. Pale yellowish complexion. Worse jar and movement.",
    materiaMedicaSummary:
      "Berberis vulgaris (barberry) is a leading remedy for urinary and biliary calculi. Kidneys: bubbling or boiling sensation; stitching, burning pain radiating in all directions from the kidneys; pain from kidney into bladder and urethra. Urine: pale, turbid, with yellowish-red deposits; mucus sediment. Gall bladder: biliary colic, jaundice, liver pain radiating to right shoulder. Back: lumbago with stitching, radiating pains worse movement and standing. Joints: gout with uric acid deposits. Skin: pale yellowish waxy complexion. Aggravated: motion, standing, jarring, fatigue. Ameliorated: rest, lying on opposite side.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Radiating pains in all directions from a fixed center. 2) Bubbling sensation in renal region. 3) Biliary and renal calculi with colic. 4) Pale yellowish complexion. 5) Rapidly alternating symptoms. 6) Lumbago with radiation to hips and thighs.",
    clinicalIndications:
      "Renal calculi. Biliary calculi. Gout. Jaundice. Lumbago. Cystitis. Prostatitis. Hepatic disorders. Gall bladder disease. Radiating back pain.",
    rubrics:
      "KIDNEYS — PAIN — radiating; BACK — PAIN — lumbar — radiating; GENERALS — PAIN — radiating; URINE — TURBID; ABDOMEN — PAIN — gall bladder",
    farrington:
      "Farrington places Berberis vulgaris in renal and hepatic conditions with radiating pains. Compare Lycopodium: both have right-sided kidney symptoms; Lycopodium has red sand in urine; Berberis has unique bubbling, radiating pains in the kidney region radiating to the groin. Compare Ocimum canum: both have right-sided renal colic; Ocimum has more spasmodic pains; Berberis has more aching, radiating from kidney in all directions. Farrington's key: 'Berberis has a characteristic — the pains radiate FROM the kidney in all directions, as if from a radiating center — this is pathognomonic.' For biliary colic and jaundice: Berberis acts well in liver affections with the same radiating tendency. The pale, earthy complexion with sunken cheeks points to Berberis.",
    relationships: {
      complementary: "Lycopodium, Kali bich",
      antidotes: "Camphor, Belladonna",
      inimical: "None noted",
      followsWell: "Calcarea carb, Nux vomica",
      followedBy: "Lycopodium, Sulphur",
    },
  },
  {
    name: "Calcarea Phosphorica",
    abbreviation: "Calc-p",
    miasmaticClassification: "Tubercular",
    keynotes:
      "Defective nutrition and assimilation in children and old people. Slow development, delayed teething, fontanelles slow to close. Growing pains in long bones. Peevish, fretful children who want to go somewhere. Anemia with weakness. School headache from mental exertion.",
    materiaMedicaSummary:
      "Calcarea phosphorica is the tissue remedy of growth and nutrition. Children: emaciated; cold extremities; head sweats; teeth late; fontanelles slow to close; soft, brittle bones; rachitis. Growing pains in the limbs of adolescents. Anemia: bloodless, pale, waxy. Mind: restless, wants change; children want to travel, go somewhere; school headache. Digestion: desire for smoked or salted meat; diarrhea in teething children; flatus with every stool. Spine: curvature; neck complaints. Aggravated: cold, wet weather, motion, fruits. Ameliorated: warmth, summer, rest.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Imperfect development and growth in children. 2) Non-union of fractures. 3) School headache from mental exertion. 4) Desire to travel — restless disposition. 5) Slow dentition and fontanelle closure. 6) Growing pains in long bones. 7) Anemia in children with cold extremities.",
    clinicalIndications:
      "Rickets. Delayed dentition. Non-union of fractures. Anemia. Growing pains. Spinal weakness. School headache. Diarrhea in children. Convalescence after illness.",
    rubrics:
      "TEETH — DELAYED; BONES — WEAKNESS; MIND — RESTLESSNESS — travel, desire; GENERALS — GROWTH — impaired; HEAD — PAIN — exertion, mental",
    farrington:
      "Farrington notes: Calcarea phosphorica is the tissue salt for bone diseases and deficient nutrition. Compare Calcarea carbonica: both have bone diseases; Cal-c is more for the fat, flabby child; Cal-phos is more for the thin, tall, anemic child with delayed ossification. Compare Phosphorus: both have bone diseases; Phos is more for rapidly growing bones that are fragile; Cal-phos is more for delayed ossification and late teething. Farrington's key: 'Calcarea phosphorica is suited to the peevish, fretful child that cannot tolerate being touched — with pale, waxy face and defective ossification.' For spinal curvature and growing pains in adolescence, Cal-phos rivals Silica. Headaches of schoolchildren from mental effort respond to Cal-phos.",
    relationships: {
      complementary: "Ruta, Hepar sulph",
      antidotes: "None noted",
      inimical: "None noted",
      followsWell: "Ferrum phos, Kali phos",
      followedBy: "Silicea, Sulphur",
    },
  },
  {
    name: "Cantharis",
    abbreviation: "Canth",
    miasmaticClassification: "Sycotic",
    keynotes:
      "Violent burning and cutting pains in urinary tract. Intolerable urging — constant desire to urinate with burning pains. Burns and scalds of skin. Violent inflammation with rapid destruction of tissue. Sexual mania — excessively strong sexual desire. Membranous exudation.",
    materiaMedicaSummary:
      "Cantharis acts primarily on urinary mucous membranes and skin. Urinary: constant urging with intolerable burning cutting pain; urine passed drop by drop; nephritis; cystitis; scalding urine. Genitals: intense sexual excitement; priapism; inflammation. Gastric: burning from mouth to stomach; violent thirst with aversion to water. Skin: burns, scalds, erysipelas with large blisters; burning rawness. Respiration: pleurisy with burning. Aggravated: from drinking coffee, urinating, touch. Ameliorated: warmth of stomach, rest.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Intense burning cutting pain in bladder and urethra. 2) Constant urging with passage of only drops. 3) Burns and scalds with large blisters. 4) Violent sexual excitement. 5) Rapid destructive inflammation. 6) Membranous exudation.",
    clinicalIndications:
      "Cystitis. Urethritis. Nephritis. Burns and scalds. Erysipelas with blisters. Pyelonephritis. Priapism. Nymphomanis. Gastritis with burning.",
    rubrics:
      "BLADDER — URGING — constant; BLADDER — PAIN — burning; URINE — SCANTY — droplets; SKIN — BURNS; MALE — SEXUAL DESIRE — increased",
    farrington:
      "Farrington places Cantharis as the leading remedy for violent inflammatory states, especially urinary. Compare Aconite: both have sudden violent onset; Aconite has more fear and skin dryness; Cantharis has more sexual and vesical excitement. Compare Apis: both affect the kidneys; Apis has more edema and stinging; Cantharis has more violent burning — burning before, during, and after urination. Farrington's key: 'Cantharis is indicated when there is burning and cutting pain in the urethra before, during, and after urination — the most intense, urgent urinary remedy.' For burns: Cantharis after the primary Urtica urens stage — when the burn forms blisters. Distinguishes from Copaiva in urinary: Copaiva is more coating of mucus in urine; Cantharis is more violent burning.",
    relationships: {
      complementary: "Camphora",
      antidotes: "Camphora",
      inimical: "None noted",
      followsWell: "Aconite, Belladonna",
      followedBy: "Arsenicum, Mercurius",
    },
  },
  {
    name: "Coffea Cruda",
    abbreviation: "Coff",
    miasmaticClassification: "Psoric",
    keynotes:
      "Hypersensitiveness — extreme sensitiveness of all senses. Toothache relieved by holding cold water in mouth. Sleeplessness from overflow of ideas and plans; mind full of thoughts. Pain intolerable — pain makes her weep and tremble. Exhilaration; excessive cheerfulness with over-activity.",
    materiaMedicaSummary:
      "Coffea cruda is the antidote to all stimulant excess and suits states of excessive stimulation. Mind: wide-awake sleeplessness; cannot stop the flow of ideas; plans and mental activity at night; over-joy; excessive laughter; weeps from joy; great sensitivity. Pain: hypersensitive to pain — cannot bear it; pain drives to despair. Teeth: toothache during menses better from ice water in mouth (unusual amelioration by cold). Head: one-sided headache as if nail were driven in, worse noise, smell, open air. Heart: palpitations from excitement, joy. Aggravated: excessive emotions, noise, touch, narcotics, strong smells. Ameliorated: sleep, warmth, ice water (for toothache).",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Toothache better from ice cold water. 2) Sleeplessness from excessive mental activity. 3) Hypersensitive to pain — intolerable. 4) Excessive emotional states — joy, weeping, excitement. 5) Antidote to many remedies including Nux vomica, Chamomilla, Ignatia.",
    clinicalIndications:
      "Insomnia from mental excitement. Toothache. Neuralgia. Palpitations from excitement. Hypersensitivity. Menstrual pain with over-sensitiveness. Headache from excessive mental activity.",
    rubrics:
      "SLEEP — SLEEPLESSNESS — thoughts, from; MIND — SENSITIVE — pain, to; TEETH — PAIN — cold water ameliorates; MIND — CHEERFULNESS — excessive; HEART — PALPITATIONS — emotions, from",
    farrington:
      "Farrington places Coffea among the 'oversensitivity remedies' — with Nux vomica and Chamomilla. Coffea: oversensitivity from pleasurable excitement — the opposite of Chamomilla (which is oversensitive from pain and anger). Compare Nux vomica: both have hypersensitivity; Nux from overwork and stimulants; Coffea from sudden pleasant news, excessive joy. Compare Chamomilla: Chamomilla cannot bear pain; Coffea cannot bear the oversensitivity of nerves from any excitement. Farrington's key: 'Coffea is suited when symptoms come on from sudden pleasant surprise — joy, good news — which overstimulates the nervous system.' For toothache: Coffea toothache is temporarily relieved by cold water in the mouth. The insomnia of Coffea is from a rush of pleasant ideas.",
    relationships: {
      complementary: "None noted",
      antidotes: "Nux vomica, Chamomilla, Ignatia",
      inimical: "None noted",
      followsWell: "Aconite, Ignatia",
      followedBy: "Nux vomica",
    },
  },
  {
    name: "Conium Maculatum",
    abbreviation: "Con",
    miasmaticClassification: "Syphilitic",
    keynotes:
      "Ascending paralysis — paralysis beginning from below and going upward. Giddiness from motion of the head, especially turning the head sideways. Suppressed sexual instinct leads to mental and physical diseases. Hard, non-tender glandular tumors. Trembling and weakness of old age. Breast tumors (scirrhous type).",
    materiaMedicaSummary:
      "Conium maculatum (poison hemlock) acts on the nervous system causing ascending paralysis. Nervous system: paralysis ascending from feet upward; trembling; weakness; staggering gait; loss of will power. Glands: hard, stony, indurated enlargements especially in breast and testes; scirrhous tumors; after bruises. Vertigo: worse from slightest motion, turning head, lying down, turning in bed. Urinary: intermittent stream — starts and stops. Sexual: suppressed desire causes mental symptoms; hard painful testes; prostate enlargement. Aggravated: lying down, turning sideways, looking up, cold. Ameliorated: warmth, walking, fasting.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Ascending paralysis — from below upward. 2) Vertigo worse slightest motion of head. 3) Hard indurated glands and tumors. 4) Intermittent stream of urine. 5) Old age ailments with trembling. 6) Suppressed sexual instinct causing disease.",
    clinicalIndications:
      "Paralysis. Breast tumors (scirrhous). Prostate enlargement. Testicular induration. Vertigo. Parkinson's disease. Tumors of glands. Ovarian cysts. Senile conditions. Cataract.",
    rubrics:
      "GENERALS — PARALYSIS — ascending; VERTIGO — MOTION — head, on moving; GLANDS — INDURATED; BLADDER — URINATION — intermittent stream; BREAST — TUMORS",
    farrington:
      "Farrington notes: Conium is the 'old age and tumor remedy.' Compare Baryta carb: both are for premature aging; Bar-c has more mental weakness; Conium has more ascending paralysis and hard glandular tumors. Compare Phosphorus: both affect the liver and nervous system; Phos has more burning; Conium has more ascending paralysis and induration. Farrington's key: 'Conium is indicated in the effects of old age and in hard, slow-growing tumors — the paralysis ascending from feet upward is characteristic.' The peculiar symptom — dizziness on turning the head or eyes (as if bed is turning) — is Conium's hallmark. The sclerotic, hardened constitution of the aged with indurated glands points to Conium. Suppression of sexual desire in old age causing mental disturbances is a Conium indication.",
    relationships: {
      complementary: "Baryta carb, Phosphorus",
      antidotes: "Coffea, Tobacco",
      inimical: "None noted",
      followsWell: "Baryta carb, Rhus tox, Psorinum",
      followedBy: "Phosphorus, Sulphur",
    },
  },
  {
    name: "Euphrasia",
    abbreviation: "Euph",
    miasmaticClassification: "Psoric",
    keynotes:
      "Profuse acrid lachrymation with bland coryza — opposite of Allium cepa. Intense photophobia with eye inflammation. Catarrhal conditions of conjunctiva and cornea. Abundant watery discharge from eyes — excoriating. Hawking of mucus in the morning. Better in open air.",
    materiaMedicaSummary:
      "Euphrasia (eyebright) acts predominantly on the eyes and mucous membranes of the upper respiratory tract. Eyes: acrid watery discharge causing redness and burning of lids; photophobia; corneal ulcers; cataract; blepharitis; intense inflammation with excoriating tears. Nose: bland watery coryza (non-irritating) in contrast to eye discharge. Compare Allium cepa — reverse modality. Head: headache with eye complaints; worse sunlight. Cough: fluent bland discharge from nose; cough worse in the daytime. Menses: short, painful, appearing only in the daytime. Aggravated: sunlight, wind, warmth of room, evening, indoors. Ameliorated: open air, dark room, coffee.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Acrid excoriating eye discharge with bland coryza. 2) Photophobia intense. 3) Corneal ulcers and opacities. 4) Opposite of Allium cepa — eye discharge acrid, nasal bland. 5) Cough with profuse fluent discharge. 6) Better in open air.",
    clinicalIndications:
      "Conjunctivitis. Keratitis. Corneal ulcers. Blepharitis. Hay fever. Photophobia. Catarrhal conditions. Cataract (early). Optic neuritis.",
    rubrics:
      "EYE — DISCHARGE — acrid; EYE — PHOTOPHOBIA; NOSE — CORYZA — bland; EYE — INFLAMMATION — conjunctiva; GENERALS — AIR — open, ameliorates",
    farrington:
      "Farrington notes: Euphrasia is the main remedy for eye conditions. Compare Allium cepa: in coryza — Allium cepa has acrid nasal discharge with bland eye discharge; Euphrasia is the OPPOSITE — acrid, burning eye discharge with bland (non-irritating) nasal discharge. Farrington's key: 'Euphrasia — the one drug in which tears are acrid and burning while the nasal discharge is bland and non-irritating — this is the diagnostic pearl.' For conjunctivitis: Euphrasia when there is profuse, scalding lacrimation with photophobia. Compare Pulsatilla in eye: Pulsatilla has bland, thick yellow discharge; Euphrasia has acrid watery discharge. For catarrhal eye conditions in hay fever, Euphrasia alternated with Allium cepa covers the full picture.",
    relationships: {
      complementary: "Allium cepa (opposite picture)",
      antidotes: "Camphor, Pulsatilla",
      inimical: "None noted",
      followsWell: "Allium cepa (after bland coryza phase)",
      followedBy: "Calcarea carb, Sulphur",
    },
  },
  {
    name: "Fluoric Acid",
    abbreviation: "Fl-ac",
    miasmaticClassification: "Syphilitic",
    keynotes:
      "Increased ability to exercise without fatigue. Varicose veins with burning. Indifference to loved ones — cares only for strangers. Rapid growth of nails and hair. Caries and necrosis of bone. Old scars re-open. Patient feels generally better while walking fast.",
    materiaMedicaSummary:
      "Fluoric acid acts on bones, teeth, veins, and skin. Bones: caries, necrosis, fistulous openings; long bones affected; destruction without repair; syphilitic bone disease. Teeth: crumble, decay rapidly at roots; black stumps. Veins: varicose veins with burning and itching; better from cold. Skin: old scars become red and re-open; fistulae; ulcers with callous edges. Nails and hair: grow too rapidly; nails brittle and crumble. Mind: indifference to family; increased sexual desire; cheerful; full of energy despite pathology. Aggravated: warmth. Ameliorated: cold bathing, cold applications.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Necrosis and caries of bone — especially long bones. 2) Varicose veins better cold water. 3) Rapid growth of nails and hair. 4) Old scars open again. 5) Syphilitic bone disease. 6) Mental indifference to family. 7) Increased physical energy.",
    clinicalIndications:
      "Osteitis. Bone caries. Varicose veins. Varicose ulcers. Dental caries. Fistulae. Syphilitic bone disease. Alopecia (with rapid hair re-growth). Old unhealed ulcers.",
    rubrics:
      "BONES — CARIES; VEINS — VARICOSE; SKIN — ULCERS — fistulous; GENERALS — ENERGY — increased; NAILS — BRITTLE",
    farrington:
      "Farrington places Fluoric acid in the syphilitic miasm and for tissue breakdown. Compare Syphilinum: both act deeply on syphilitic conditions; Fluoric acid is for the physical manifestations — destruction of bone, fistulae; Syphilinum for the constitutional depth. Compare Silica: both expel foreign bodies; Silica is slow and cold; Fluoric acid is more warm-blooded and appropriate for hot, tissue-destroying conditions. Farrington's key: 'Fluoric acid is suited to the old syphilitic constitution with caries of bone, fistulae that ooze a thin, offensive discharge, and the peculiar mental state of indifference to loved ones but desire for strangers.' The increased sexual desire combined with the destructive physical state is characteristic. Varicose veins in the aged respond to Fluoric acid.",
    relationships: {
      complementary: "Silica (antidote to Silica's excessive suppuration)",
      antidotes: "Silicea",
      inimical: "Silicea (antidotal relationship)",
      followsWell: "Silicea, Kali carb",
      followedBy: "Calc fluor, Phosphorus",
    },
  },
  {
    name: "Glonoine",
    abbreviation: "Glon",
    miasmaticClassification: "Psoric",
    keynotes:
      "Rush of blood to head — congestive headaches with bursting, pulsating character. Sun headache — headache from exposure to sun. Cannot bear anything on the head. Confusion of places — loses his way in familiar streets. Heart: labored, visible pulsations. Worse going uphill, jar, sun.",
    materiaMedicaSummary:
      "Glonoine (nitroglycerine) produces intense cerebral congestion and cardiovascular symptoms. Head: bursting, throbbing, pulsating headaches; feels as if top of head would fly off; cannot bear hat or pressure; sunstroke; congestive headache from overexposure. Mind: confused — does not know familiar streets; sudden loss of consciousness; excitement. Heart: violent palpitations; labored heart action; angina pectoris. Face: flushed, red, hot. Hypertension: surging of blood upward. Aggravated: sun, heat, jar, going uphill, stooping, 3–6 PM. Ameliorated: brandy, vinegar, cold applications to head, uncovering.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Congestive throbbing headache worse sun. 2) Cannot bear anything on the head. 3) Confused about familiar places. 4) Labored, visible pulsations. 5) Sunstroke and heat exhaustion. 6) Rush of blood upward.",
    clinicalIndications:
      "Sunstroke. Hypertension. Angina pectoris. Congestive headache. Heat exhaustion. Meningeal congestion. Cerebral apoplexy. Sun headache.",
    rubrics:
      "HEAD — PAIN — congestive; HEAD — PAIN — sun, from; HEAD — CONSTRICTION — hat, from; MIND — CONFUSION — localities; HEART — PALPITATIONS — violent",
    farrington:
      "Farrington notes: Glonoine is the first remedy for sunstroke and violent head congestions. Compare Belladonna: both have congestion of head; Bell is more throbbing; Glonoine has more expansion, as if skull too small for the brain. Compare Amyl nitrite: both produce flushing and pulsation; Amyl nitrite is for the menopausal flush; Glonoine for the acute sunstroke or violent head congestion. Farrington's key: 'The great characteristic of Glonoine is the sensation of expansion — pulsating, throbbing, bursting head — as if the skull is too small.' Distinguishes from Natrum carb: Natrum carb's headache from sun is more chronic; Glonoine is the acute emergency. The patient cannot bear the sun on the head, and the headache comes on in waves at every heartbeat.",
    relationships: {
      complementary: "Aconite, Belladonna",
      antidotes: "Aconite, Camphor",
      inimical: "None noted",
      followsWell: "Belladonna",
      followedBy: "Belladonna, Gelsemium",
    },
  },
  {
    name: "Kali Phosphoricum",
    abbreviation: "Kali-p",
    miasmaticClassification: "Psoric + Tubercular",
    keynotes:
      "Great nervous exhaustion and prostration — nervous debility. Brain fatigue from overwork or study. Humming and buzzing in ears. Septic conditions — putrid, offensive discharges. Yellow, golden-hued or honey-colored discharge from any orifice. Extreme sensitiveness, especially to noise. Nerve remedy par excellence.",
    materiaMedicaSummary:
      "Kali phosphoricum is the chief nerve nutrient and anti-septic tissue salt. Mind: extreme nervous exhaustion; depression from overwork; nervous dread; fear; sensitive; night terrors in children. Head: occipital headache from mental strain; brain fag. Nerves: prostration; locomotor ataxia; neurasthenia. Digestion: desire for cold drinks; diarrhea with putrid, offensive, asafoetida-like stools. Discharges: yellow-golden offensive from any orifice. Urinary: bed-wetting from nervous weakness. Fever: typhoid states with extreme prostration. Aggravated: mental exertion, excitement, overwork, cold. Ameliorated: warmth, rest, nourishment.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Nervous exhaustion — brain fag. 2) Honey-colored or golden putrid discharges. 3) Humming in ears from nerve weakness. 4) Night terrors in children. 5) Septic states with putrid odor. 6) Extreme sensitiveness to noise.",
    clinicalIndications:
      "Neurasthenia. Brain fatigue. Depression. Night terrors. Bed-wetting. Typhoid. Septic fevers. Putrid discharges. Locomotor ataxia. Vertigo from overwork.",
    rubrics:
      "MIND — EXHAUSTION — mental; DISCHARGES — PUTRID; EAR — NOISES — humming; URINE — NOCTURNAL — enuresis; MIND — FEAR — nervous",
    farrington:
      "Farrington places Kali phos as the nervous tissue salt for the exhausted, worried patient. Compare Natrum mur: both affect the nervous system from grief and worry; Natrum mur has more fixed grief; Kali phos is more from overwork and nervous exhaustion. Compare Arsenicum: both are restless and anxious; Arsenicum's anxiety is about physical death; Kali phos is more about business failure, nervous dread. Farrington's key: 'Kali phosphoricum is the chief remedy for those conditions arising from want of nerve power — students who break down from overwork, business men who worry until their nerves are shattered.' The golden-yellow color of tongue, offensive breath, and nervous dread are characteristic. Depression with inability to collect thoughts after mental overwork is a hallmark.",
    relationships: {
      complementary: "Ferrum phos, Calc phos",
      antidotes: "Camphor",
      inimical: "None noted",
      followsWell: "Gelsemium, Ignatia",
      followedBy: "Calc phos, Phosphorus",
    },
  },
  {
    name: "Natrum Sulphuricum",
    abbreviation: "Nat-s",
    miasmaticClassification: "Sycotic",
    keynotes:
      "Chief anti-sycotic remedy after Thuja. Worse in wet weather and wet places. Never well since a head injury. Greenish-yellow morning diarrhea. Moist asthma. Suicidal tendency — must exert will to restrain. Liver complaints. All complaints worse dampness.",
    materiaMedicaSummary:
      "Natrum sulphuricum is the leading sycotic remedy for ailments from damp weather. Head: ailments from head injuries (concussion) — neuralgia, depression, mental symptoms; suicidal tendency after head injury. Chest: asthma worse in damp weather; moist rattling cough; greenish expectoration. Liver: hepatitis; jaundice; liver pain worse lying on left side. Rectum: morning diarrhea — 5 AM; flatus; green stool. Mind: fixed ideas; delirium in fevers; suicidal depression; music makes him weep. Aggravated: damp weather, lying on left side, music. Ameliorated: dry weather, pressure, open air.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Worse from all dampness — damp weather, damp dwellings. 2) Ailments since head injuries. 3) Morning diarrhea — greenish, 5 AM. 4) Moist asthma worse in wet weather. 5) Sycotic miasm — removes sycotic stigma. 6) Suicidal tendency from depression.",
    clinicalIndications:
      "Asthma. Liver disease. Jaundice. Diarrhea. Head injury sequelae. Depression. Sycotic conditions. Warts. Condylomata. Post-concussion syndrome.",
    rubrics:
      "GENERALS — WET — weather agg; HEAD — INJURY — effects of; RECTUM — DIARRHEA — morning; MIND — SUICIDAL — tendency; CHEST — ASTHMA — damp weather",
    farrington:
      "Farrington places Natrum sulph as the chief anti-sycotic in the Natrum family. Compare Thuja: both cover sycosis; Thuja is more constitutional; Natrum sulph is more specifically for liver and lung conditions in the sycotic patient. Compare Mercurius: both have bilious conditions; Merc has more glandular; Natrum sulph has more liver congestion worse in damp weather. Farrington's key: 'Natrum sulphuricum is the chronic of Thuja in many sycotic cases — it covers the liver and lungs when the sycotic taint is expressed through these organs.' For asthma worse in damp weather with sycotic history: Natrum sulph is unsurpassed. The characteristic mental symptom — suicidal impulse especially in the morning, must hold on to himself — is a serious Natrum sulph indication.",
    relationships: {
      complementary: "Thuja, Arsenicum",
      antidotes: "Camphor",
      inimical: "None noted",
      followsWell: "Thuja, Medorrhinum",
      followedBy: "Thuja, Sulphur",
    },
  },
  {
    name: "Opium",
    abbreviation: "Op",
    miasmaticClassification: "Syphilitic + Psoric",
    keynotes:
      "Painlessness of complaints that would normally be painful. Deep stupor — complete insensibility. Hot, sweating, besotted look. Constipation from inaction of intestines. Visions of frightful things; after fright or grief with insensibility. Complaints following fright or sudden joy.",
    materiaMedicaSummary:
      "Opium acts by causing complete narcosis and insensibility of the nervous system. Complaints are characterized by painlessness and stupor. Mind: dull, heavy stupor; besotted look; eyes half-closed; visions of spectres, ghosts; complaints from fright; ailments from pleasant or sudden good news. Respiration: slow, loud, stertorous; Cheyne-Stokes breathing. Constipation: from inactive bowels — no urging; feces like black balls. Fever: hot, dry burning skin with profuse sweating; no thirst. Old people: profound stupor; apoplexy. Aggravated: sleep, heat, stimulants, during and after sleep. Ameliorated: cold applications, constant walking.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Painlessness — even in conditions requiring pain. 2) Besotted, stuporous expression. 3) Constipation from intestinal inactivity — black balls. 4) Ailments from fright or sudden emotions. 5) Stertorous breathing — Cheyne-Stokes. 6) Hot dry skin with profuse sweat.",
    clinicalIndications:
      "Apoplexy. Coma. Constipation. Post-fright ailments. Acute alcohol poisoning. Senile constipation. Respiratory failure. Shock. Post-operative ileus.",
    rubrics:
      "GENERALS — PAIN — absence of; MIND — STUPOR; RECTUM — CONSTIPATION — inactivity; RESPIRATION — STERTOROUS; MIND — AILMENTS FROM — fright",
    farrington:
      "Farrington's notes: Opium is for states of stupor, insensibility, and painlessness where pain should exist. Compare Stramonium: both have delirium with frightful visions; Stramonium has terror, violence; Opium has more happy, blissful stupor alternating with horror. Compare Baptisia: both have stupor; Baptisia is in septic fevers with offensive discharges; Opium is more constipated, dry, hot, with snoring. Farrington's key: 'The Opium patient is remarkable for the absence of pain and functional activity — constipation without desire, retention without urging, stupor without response.' The peculiar characteristic: complaints dating from shock or fright in the past — the patient recovers but the fright remains. Complete insensibility where there should be reaction is the Opium guiding symptom.",
    relationships: {
      complementary: "Belladonna",
      antidotes: "Nux vomica, Camphor",
      inimical: "None noted",
      followsWell: "Belladonna, Hyoscyamus",
      followedBy: "Nux vomica, Sulphur",
    },
  },
  {
    name: "Platina",
    abbreviation: "Plat",
    miasmaticClassification: "Syphilitic",
    keynotes:
      "Haughty, proud, contemptuous disposition — everyone seems small, inferior to her. Excessive sexual desire in women with hypersensitiveness of genitals. Numbness with or after pains. Cramping, constrictive pains that increase and decrease gradually (like Stannum). Feels she is getting taller and bigger.",
    materiaMedicaSummary:
      "Platina (platinum) affects primarily the mind and female sexual sphere. Mind: extreme pride and haughtiness; contemptuous of everyone; feels all others are inferior; delusions of grandeur; alternating mental states — laughing and crying; hysterical symptoms. Female: hypersensitiveness of external genitals; vaginismus; ovarian pain with bearing down; nymphomania; excessive sexual desire. Pains: cramping, griping pains that increase gradually and decrease gradually. Numbness of parts that have been painful. Constipation in strangers or new places (travel constipation). Aggravated: exertion, emotions, sitting, sexual excitement. Ameliorated: walking in open air.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Haughty, proud, contemptuous. 2) Hypersensitiveness of genitalia. 3) Pains increase and decrease gradually. 4) Numbness during and after pain. 5) Constipation while traveling. 6) Nymphomania. 7) Mental and physical alternations.",
    clinicalIndications:
      "Nymphomania. Ovarian pain. Vaginismus. Hysteria. Depression with pride. Constipation. Cramping pains. Numbness. Sexual neurosis.",
    rubrics:
      "MIND — HAUGHTY; MIND — CONTEMPTUOUS; FEMALE — SEXUAL DESIRE — increased; GENITALIA — SENSITIVE — extreme; PAINS — GRADUAL — increase and decrease",
    farrington:
      "Farrington notes: Platina is the remedy for sexual hypersensitivity combined with proud mental state. Compare Palladium: both are platinum group metals; Palladium has more ovarian pain worse on right; Platina has more excessive sexual desire with hyperesthesia. Compare Lachesis: both have sexual excess; Lachesis is more jealous and loquacious; Platina is more proud and contemptuous. Farrington's key: 'Platina is indicated in nymphomania, in excessive sexual desire combined with the peculiar arrogance — everything seems small to her, other people appear as nothing.' The physical hyperesthesia — touch is intolerable — combined with the mental megalomania is characteristic. For emotional excitement causing hysterical paralysis or convulsions: Platina rivals Ignatia.",
    relationships: {
      complementary: "Pulsatilla",
      antidotes: "Pulsatilla, Sepia",
      inimical: "None noted",
      followsWell: "Palladium",
      followedBy: "Sepia, Pulsatilla",
    },
  },
  {
    name: "Rhododendron",
    abbreviation: "Rhod",
    miasmaticClassification: "Sycotic",
    keynotes:
      "Worse before a storm — weather prophets. Gout and rheumatism worse before thunderstorms. Testes: swelling, induration, pain especially before a storm. Toothache before a storm. Afraid of thunderstorm. Wandering pains in joints, worse at rest, better motion.",
    materiaMedicaSummary:
      "Rhododendron is the barometric remedy — the patient predicts weather changes by increased suffering. Joints: rheumatic pains worse before thunderstorms; worse cold, wet weather; better warmth and dry; wandering tearing pains; joints swollen. Testes: swelling, hardness, contusive pain in testes after a chill or before storms; epididymitis; orchitis. Teeth: toothache worse at night, before storms, better warm food. Gout: especially of small joints. Headache: before thunderstorm. Aggravated: rest, before storms, cold damp weather, wine. Ameliorated: motion, warmth, dry weather.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Worse before thunderstorms — barometric sensitivity. 2) Testicular induration and pain. 3) Rheumatic pains better motion, worse rest. 4) Toothache before storms. 5) Gout of small joints. 6) Fear of thunderstorms.",
    clinicalIndications:
      "Rheumatism. Gout. Orchitis. Epididymitis. Testicular induration. Neuralgias. Toothache. Fibrositis. Arthritis worse damp weather.",
    rubrics:
      "GENERALS — WEATHER — storm, before; MALE — TESTES — pain; GENERALS — RHEUMATISM; TEETH — PAIN — storm, before; GENERALS — MOTION — ameliorates",
    farrington:
      "Farrington places Rhododendron in rheumatic complaints with meteorological sensitivity. Compare Rhus tox: both have rheumatic pain; Rhus tox is worse initial motion, better continued motion; Rhododendron is specifically worse before a storm (before thunder). Compare Dulcamara: both are worse from damp cold; Dulcamara is more from sudden cold after heat; Rhododendron is more specifically from electrical storms approaching. Farrington's key: 'Rhododendron is the remedy for rheumatism and neuralgia that begins or aggravates before a storm — the patient says the weather is about to change before it happens.' Orchitis and testicular induration respond to Rhododendron. Distinguishes from Ruta: both have periosteal pains; Rhododendron is specifically weather-sensitive.",
    relationships: {
      complementary: "Bryonia, Rhus tox",
      antidotes: "Bryonia",
      inimical: "None noted",
      followsWell: "Bryonia, Calcarea carb",
      followedBy: "Bryonia, Sulphur",
    },
  },
  {
    name: "Sarsaparilla",
    abbreviation: "Sars",
    miasmaticClassification: "Sycotic + Syphilitic",
    keynotes:
      "Urine can be passed only in drops while standing; free flow only while standing. Severe pain at conclusion of urination. Vesical colic. Skin: herpetic eruptions, cracks at corners of mouth and fingers. Emaciation beginning from the neck. Syphilitic eruptions. Wasting in children.",
    materiaMedicaSummary:
      "Sarsaparilla acts on urinary organs and skin. Urinary: severe pain at the close of urination — most important keynote; urine dribbles while sitting, flows freely only when standing; urinary calculi; hematuria; turbid offensive urine. Skin: moist, itching, herpetic eruptions; cracks at corners of mouth, nose, hands; fissures; skin dirty, pale, shrivelled. Emaciation: child looks old, dried up; loses flesh from neck down. Syphilitic: secondary syphilitic eruptions; condylomata; gonorrhea. Aggravated: damp, cold, night, scratching, after urination. Ameliorated: uncovering neck, standing, eructations.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Urine flows freely only when standing. 2) Severe pain at END of urination. 3) Emaciation from neck downward. 4) Herpetic cracks at corners of mouth. 5) Urinary calculi with colic. 6) Syphilitic skin eruptions.",
    clinicalIndications:
      "Cystitis. Urinary calculi. Syphilitic conditions. Skin eruptions. Herpes. Rheumatism. Marasmus in children. Gonorrhea. Vesical colic.",
    rubrics:
      "BLADDER — URINATION — dribbling — sitting; URINE — PAIN — close of urination; GENERALS — EMACIATION — neck; SKIN — ERUPTIONS — herpetic; URINE — CALCULI",
    farrington:
      "Farrington notes: Sarsaparilla is an important remedy for renal and rheumatic conditions. Compare Berberis: both have renal calculi; Berberis has radiating pains; Sarsaparilla has the peculiar symptom that urine flows better when the patient stands up. Compare Lycopodium: both have red sand and renal complaints; Lycopodium's is right-sided; Sarsaparilla has more specific vesical symptoms. Farrington's key: 'Sarsaparilla is indicated when urine dribbles or passes better in the erect position — the patient can only urinate at the end of micturition.' For skin diseases with rheumatic diathesis: Sarsaparilla covers chronic herpetic eruptions. Distinguishes from Mercurius: both have herpetic skin; Merc has more glandular and mucosal involvement.",
    relationships: {
      complementary: "Mercury, Sepia",
      antidotes: "Mercurius, Belladonna",
      inimical: "None noted",
      followsWell: "Mercurius, Sulphur, Calc carb",
      followedBy: "Sulphur, Sepia",
    },
  },
  {
    name: "Secale Cornutum",
    abbreviation: "Sec",
    miasmaticClassification: "Syphilitic",
    keynotes:
      "Burning sensation yet patient wants to be uncovered and is BETTER from cold. Thin, watery, dark, offensive discharges. Gangrene with burning — dry gangrene in old, thin, scrawny people. Threatening abortion at third month. Contractions of the uterus. All symptoms better from cold.",
    materiaMedicaSummary:
      "Secale cornutum (ergot of rye) acts on blood vessels and uterine muscles. Circulation: dry gangrene in emaciated old people; vasoconstriction; thromboangiitis obliterans; Raynaud's phenomenon. Hemorrhage: thin, dark, watery, non-clotting bleeding; passive hemorrhage. Uterus: uterine inertia; threatened abortion; prolonged contractions after delivery; irregular contractions. Burning: intense burning despite wanting cold applications. Skin: formication; crawling; extreme burning yet worse heat. Aggravated: warmth, covering. Ameliorated: cold, rubbing, uncovering, fanning.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Burning heat yet BETTER cold — wants to be uncovered. 2) Dry gangrene in thin, scrawny old people. 3) Passive hemorrhage — dark, thin, non-clotting. 4) Uterine hemorrhage from atony. 5) Formication and crawling sensations. 6) Threatening abortion.",
    clinicalIndications:
      "Gangrene. Thromboangiitis obliterans. Uterine hemorrhage. Threatened abortion. Postpartum hemorrhage. Raynaud's disease. Ergotism. Metrorrhagia.",
    rubrics:
      "GENERALS — HEAT — burning, yet better cold; GENERALS — UNCOVERING — better; SKIN — GANGRENE; FEMALE — HEMORRHAGE — passive; UTERUS — CONTRACTIONS",
    farrington:
      "Farrington places Secale among the remedies for contracted, spasmodic vascular conditions. Compare Ergot preparations: Secale's action is for passive hemorrhages from atonic blood vessels — thin, dark blood that does not clot. Compare Cantharis: both affect the uterus; Cantharis is violent, burning; Secale has more passive, oozing, thin dark blood with suppressed sensation. Compare Arsenicum: both are cold patients; Arsenicum wants warmth; Secale has the peculiar characteristic of WANTING cold despite being cold — the patient throws off covers even though cold to touch. Farrington's key: 'Secale is characterized by persistent passive hemorrhage of thin, dark blood, and by the paradoxical desire for cold despite objective coldness.' For senile gangrene: Secale is unsurpassed when the skin is cold, shriveled, and dark.",
    relationships: {
      complementary: "Arsenicum (opposite in burning)",
      antidotes: "Camphor",
      inimical: "None noted",
      followsWell: "Chamomilla, Pulsatilla",
      followedBy: "China, Sulphur",
    },
  },
  {
    name: "Symphytum",
    abbreviation: "Symph",
    miasmaticClassification: "Psoric",
    keynotes:
      "Promotes union of fractured bones — knitting of bones. Eye injuries — blunt trauma to eyeball. Periosteum: irritation from mechanical injuries. Pains at site of fractures long after healing. Pricking pains in bones. Gastric ulcer.",
    materiaMedicaSummary:
      "Symphytum officinale (comfrey) is the specific remedy for fractured bones and eye injuries. Bones: promotes callus formation; pain at old fracture sites; periosteal irritation; non-union of fractures; traumatic periostitis. Eyes: injuries from blunt objects; pain after removal of foreign body; painful inflamed eye after a blow; glaucoma. Stomach: ulcers — gastric and duodenal; ulceration with burning; pains in stomach. Joints: stiffness from periosteal involvement after injury. Aggravated: touch, motion. Ameliorated: rest.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Fractures — promotes union; pain at old fracture sites. 2) Blunt trauma to eye. 3) Periosteal inflammation after injury. 4) Gastric ulcers. 5) Pricks and pains in bones long after injury. 6) Non-union of fractures.",
    clinicalIndications:
      "Fractures (healing). Non-union of fractures. Blunt eye injuries. Periostitis. Gastric ulcers. Duodenal ulcers. Traumatic arthritis. Bone pains after old injuries.",
    rubrics:
      "BONES — FRACTURES — promotes union; EYES — INJURIES — blunt trauma; STOMACH — ULCERS; PERIOSTEUM — IRRITATION; BONES — PAIN — old injuries",
    farrington:
      "Farrington notes: Symphytum is the specific for bone fractures and periosteal injuries. Compare Ruta: both affect periosteum; Ruta is for bruises and strains; Symphytum is more specifically for fractures — it accelerates union of broken bones. Compare Calcarea phosphorica: Cal-phos helps delayed fracture healing in the young; Symphytum assists union at any age. Farrington's key: 'Symphytum is pre-eminently the bone-healer — the vulnerary of bones — indicated after fracture to hasten callus formation.' For irritability of the stump after amputation and for phantom limb pain, Symphytum is unsurpassed. Distinguishes from Arnica: Arnica handles the initial trauma; Symphytum takes over for the healing phase of the bone.",
    relationships: {
      complementary: "Calcarea phos, Ruta",
      antidotes: "Camphor",
      inimical: "None noted",
      followsWell: "Arnica, Ruta",
      followedBy: "Calc phos, Silicea",
    },
  },
  {
    name: "Zincum Metallicum",
    abbreviation: "Zinc",
    miasmaticClassification: "Psoric + Syphilitic",
    keynotes:
      "Restless feet — constant motion of feet and legs. Brain and nerve exhaustion with hypersensitiveness. Child repeats everything said to it — echolalia. Suppressed eruptions or discharges causing brain symptoms. Trembling, twitching, jerking. Sweating on occiput. Weakness of memory.",
    materiaMedicaSummary:
      "Zincum metallicum acts on the nervous system and brain. Nervous system: great nervous exhaustion; restless, fidgety feet — must move them constantly; trembling and twitching; convulsions; chorea. Brain: exhaustion from over-study or over-exertion; inability to develop exanthemata; suppression causing cerebral complications. Mind: weak memory; slow to answer; echolalia; brain fag. Skin: cannot develop eruptions — eruptions go in or fail to appear. Spine: spinal irritation with weakness. Aggravated: touch, noise, wine, stimulants, during menses. Ameliorated: eating, motion, open air.",
    synopticKeyHighlights:
      "Per Synoptic Key (Bhanja): 1) Restless feet — constant fidgety motion. 2) Suppressed eruptions causing brain symptoms. 3) Echolalia — repeats what is said to him. 4) Brain exhaustion from overwork. 5) Trembling and jerking. 6) Sweating on occiput. 7) Cannot develop natural eruptions.",
    clinicalIndications:
      "Chorea. Epilepsy. Brain exhaustion. Restless legs syndrome. Suppressed exanthemata complications. Neurasthenia. Tremors. Echolalia. Spinal weakness.",
    rubrics:
      "EXTREMITIES — RESTLESSNESS — legs; MIND — REPEATING — echolalia; MIND — EXHAUSTION — mental; SKIN — ERUPTIONS — suppressed; GENERALS — TREMBLING",
    farrington:
      "Farrington places Zincum at the crossroads of exhausted nervous system and suppression. Compare Helleborus: both have cerebral exhaustion with automatic motions; Helleborus has more complete stupor; Zincum has more fidgety feet and restlessness. Compare Ignatia: both have nervous conditions; Ignatia is from acute emotional causes; Zincum is from chronic suppression, especially of eruptions. Farrington's key: 'Zincum is indicated when suppressed eruptions or discharges produce cerebral symptoms — the vital powers are so low that the system cannot develop the rash.' The characteristic fidgety feet — constant motion of the legs — is one of Zincum's most reliable symptoms. The child who cannot keep the feet still, combined with the inability to develop measles, is Zincum.",
    relationships: {
      complementary: "Ignatia",
      antidotes: "Hepar sulph, Nux vomica",
      inimical: "Nux vomica",
      followsWell: "Ignatia, Calcarea carb",
      followedBy: "Ignatia, Sulphur",
    },
  },
];
