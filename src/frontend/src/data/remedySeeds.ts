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
    relationships: {
      complementary: "Sulphur, Coffea",
      antidotes: "Camphor, Coffee, Vinegar, Wine",
      inimical: "None significant",
      followsWell: "Belladonna, Bryonia, Spongia",
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
    relationships: {
      complementary: "Nat Mur, Nux Vomica",
      antidotes: "Aconite, Antimonium Crudum, Rhus Tox",
      inimical: "Bryonia, Lachesis, Pulsatilla",
      followsWell: "Natrum Mur, Pulsatilla, Phosphorus",
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
    relationships: {
      complementary: "Pulsatilla, Thuja, Sanicula",
      antidotes: "Camphor, Fluoricum Acidum, Hepar Sulph",
      inimical: "Mercury (do not use before Mercury)",
      followsWell: "Calcarea Carb, Calc Phos, Pulsatilla",
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
    relationships: {
      complementary: "Colocynth, Causticum",
      antidotes: "Camphor, Nux Vomica",
      inimical: "None significant",
      followsWell: "Colocynth, Nux Vomica",
      followedBy: "Sulphur, Colocynth",
    },
  },
];
