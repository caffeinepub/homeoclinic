import type { RemedyData } from "../data/remedyDatabase";

export interface CaseInput {
  chiefComplaint: string;
  hpi: string;
  pastHistory: string;
  familyHistory: string;
  mentalGenerals: string;
  physicalGenerals: string;
  personalHistory: string;
  investigations?: string;
  miasmaticAnalysis: string;
  totality: string;
  repertorialFindings: string;
}

export interface RemedySuggestion {
  remedy: RemedyData;
  score: number;
  reasons: string[];
}

const STOP_WORDS = new Set([
  "with",
  "from",
  "that",
  "this",
  "have",
  "will",
  "more",
  "when",
  "also",
  "some",
  "than",
  "then",
  "they",
  "them",
  "been",
  "were",
  "much",
  "into",
  "very",
  "over",
  "well",
  "both",
  "after",
  "before",
  "often",
  "which",
  "where",
  "their",
  "there",
  "and",
  "the",
  "for",
  "are",
  "was",
  "his",
  "her",
  "its",
  "has",
  "not",
  "but",
  "one",
  "all",
  "can",
  "had",
  "said",
  "each",
  "about",
  "how",
  "way",
  "may",
  "such",
  "these",
  "those",
]);

/** Split a text into meaningful tokens */
function tokenise(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[\s,;:\(\)\[\]\/\n\r\t\.]+/)
    .map((t) => t.trim().replace(/[^a-z0-9\-]/g, ""))
    .filter((t) => t.length >= 4 && !STOP_WORDS.has(t));
}

/** Extract ngrams (1-2 word phrases) from text for richer matching */
function extractPhrases(text: string): string[] {
  const words = text
    .toLowerCase()
    .split(/[\s,;:\(\)\[\]\/\n\r\t\.]+/)
    .map((w) => w.trim().replace(/[^a-z0-9\- ]/g, ""))
    .filter((w) => w.length > 0);
  const phrases: string[] = [];
  for (let i = 0; i < words.length; i++) {
    if (words[i].length >= 4) phrases.push(words[i]);
    if (i + 1 < words.length && words[i + 1].length >= 3) {
      phrases.push(`${words[i]} ${words[i + 1]}`);
    }
  }
  return phrases;
}

export function analyseCase(
  input: CaseInput,
  remedies: RemedyData[],
): RemedySuggestion[] {
  // Combine all case text into one lowercase string
  const allCaseParts = [
    input.chiefComplaint,
    input.hpi,
    input.pastHistory,
    input.familyHistory,
    input.mentalGenerals,
    input.physicalGenerals,
    input.personalHistory,
    input.miasmaticAnalysis,
    input.totality,
    input.repertorialFindings,
  ];

  const caseText = allCaseParts.join(" ").toLowerCase();
  const casePhrases = extractPhrases(caseText);
  const casePhraseSet = new Set(casePhrases);

  if (!caseText.trim() || caseText.trim().length < 10) return [];

  const results: RemedySuggestion[] = [];

  for (const remedy of remedies) {
    let score = 0;
    const reasons: string[] = [];
    const reasonSet = new Set<string>();

    function addReason(r: string) {
      if (!reasonSet.has(r) && reasons.length < 6) {
        reasonSet.add(r);
        reasons.push(r);
      }
    }

    // ── 1. Keynote matches ──────────────────────────────────────────────────
    const keynoteTokens = tokenise(remedy.keynotes);
    const keynotePhrases = extractPhrases(remedy.keynotes);
    for (const phrase of keynotePhrases) {
      if (phrase.length >= 6 && casePhraseSet.has(phrase)) {
        score += 3;
        addReason(`Keynote match: ${phrase}`);
      }
    }
    for (const token of keynoteTokens) {
      if (caseText.includes(token)) {
        score += 1;
        addReason(`Keynote: ${token}`);
      }
    }

    // ── 2. Materia Medica matches ────────────────────────────────────────────
    const mmTokens = tokenise(remedy.materiaMedicaSummary);
    const mmPhrases = extractPhrases(remedy.materiaMedicaSummary);
    for (const phrase of mmPhrases) {
      if (phrase.length >= 8 && casePhraseSet.has(phrase)) {
        score += 2;
        addReason(`MM match: ${phrase}`);
      }
    }
    for (const token of mmTokens) {
      if (caseText.includes(token)) {
        score += 1;
        addReason(`Materia Medica: ${token}`);
      }
    }

    // ── 3. Synoptic Key matches ──────────────────────────────────────────────
    const synTokens = tokenise(remedy.synopticKeyHighlights);
    const synPhrases = extractPhrases(remedy.synopticKeyHighlights);
    for (const phrase of synPhrases) {
      if (phrase.length >= 8 && casePhraseSet.has(phrase)) {
        score += 2;
        addReason(`Synoptic Key: ${phrase}`);
      }
    }
    for (const token of synTokens) {
      if (caseText.includes(token)) {
        score += 1;
        addReason(`Synoptic Key: ${token}`);
      }
    }

    // ── 4. Clinical Indications matches ─────────────────────────────────────
    const ciTokens = tokenise(remedy.clinicalIndications);
    const ciPhrases = extractPhrases(remedy.clinicalIndications);
    for (const phrase of ciPhrases) {
      if (phrase.length >= 6 && casePhraseSet.has(phrase)) {
        score += 2;
        addReason(`Clinical indication: ${phrase}`);
      }
    }
    for (const token of ciTokens) {
      if (caseText.includes(token)) {
        score += 1;
        addReason(`Clinical: ${token}`);
      }
    }

    // ── 5. Rubric matches ────────────────────────────────────────────────────
    const rubricTokens = tokenise(remedy.rubrics);
    const rubricPhrases = extractPhrases(remedy.rubrics);
    for (const phrase of rubricPhrases) {
      if (phrase.length >= 6 && casePhraseSet.has(phrase)) {
        score += 3;
        addReason(`Rubric match: ${phrase}`);
      }
    }
    for (const token of rubricTokens) {
      if (caseText.includes(token)) {
        score += 1;
        addReason(`Rubric: ${token}`);
      }
    }

    // ── 6. Miasmatic bonus ───────────────────────────────────────────────────
    if (input.miasmaticAnalysis.trim()) {
      const miasmLower = remedy.miasmaticClassification.toLowerCase();
      const caseAnalysisLower = input.miasmaticAnalysis.toLowerCase();
      const miasmKeywords = ["psori", "sycot", "syphil", "tuberc"];
      for (const kw of miasmKeywords) {
        if (miasmLower.includes(kw) && caseAnalysisLower.includes(kw)) {
          score += 2;
          const miasmName = remedy.miasmaticClassification.split(/[\s,+]/)[0];
          addReason(`Miasm match: ${miasmName}`);
          break;
        }
      }
    }

    if (score > 0) {
      results.push({ remedy, score, reasons });
    }
  }

  // Sort by score descending, return top 5
  return results.sort((a, b) => b.score - a.score).slice(0, 5);
}
