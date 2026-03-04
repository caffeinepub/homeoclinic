import type { Remedy } from "../backend.d";

export const SEED_REMEDIES: Remedy[] = [
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
    relationships: {
      complementary: "Aloe, Nux Vomica, Psorinum, Calcarea Carb, Sarsaparilla",
      antidotes: "Aconite, Camphor, China, Mercury, Pulsatilla",
      inimical: "Causticum",
      followsWell: "Aconite, Belladonna, Calcarea, Lycopodium, Pulsatilla",
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
    relationships: {
      complementary: "Kali Mur, Lycopodium, Silica, Kali Sulph",
      antidotes: "Chamomilla, Coffea, Ignatia, Nux Vomica",
      inimical: "Cadmium Sulph",
      followsWell: "Kali Mur, Lycopodium, Silica, Sulphur",
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
    relationships: {
      complementary: "Sulphur, Sepia",
      antidotes: "Aconite, Chamomilla, Coffea, Ignatia, Pulsatilla",
      inimical: "Zinc",
      followsWell: "Sulphur, Lycopodium, Phosphorus",
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
    relationships: {
      complementary: "Chelidonium, Lachesis, Sulphur",
      antidotes: "Aconite, Camphor, Pulsatilla",
      inimical: "Coffea",
      followsWell: "Calcarea, Carbo Veg, Lachesis, Sulphur",
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
    relationships: {
      complementary: "Calcarea Carb",
      antidotes: "Aconite, Camphor, Coffea, Hepar, Opium",
      inimical: "None significant",
      followsWell: "Aconite, Calcarea, Chamomilla, Sulphur",
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
    relationships: {
      complementary: "Alumina, Rhus Tox",
      antidotes: "Aconite, Chamomilla, Clematis, Colocynth, Ignatia",
      inimical: "Calcarea",
      followsWell: "Aconite, Belladonna, Nux Vomica",
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
    relationships: {
      complementary: "Apis, Ignatia, Sepia",
      antidotes: "Arsenic, Phosphorus, Sulphur",
      inimical: "Argentum Nitricum",
      followsWell: "Apis, Ignatia, Kali Mur, Phosphorus, Sepia",
      followedBy: "Apis, Calcarea, Lycopodium, Sepia, Sulphur",
    },
  },
];
