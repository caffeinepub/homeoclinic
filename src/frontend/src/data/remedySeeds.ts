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
    relationships: {
      complementary: "Ignatia",
      antidotes: "Hepar sulph, Nux vomica",
      inimical: "Nux vomica",
      followsWell: "Ignatia, Calcarea carb",
      followedBy: "Ignatia, Sulphur",
    },
  },
];
