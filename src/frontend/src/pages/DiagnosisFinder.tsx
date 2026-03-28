import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronRight,
  GitCompare,
  Microscope,
  Search,
  Stethoscope,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { RemedyData } from "../data/remedyDatabase";
import { SEED_REMEDIES } from "../data/remedySeeds";
import {
  DIAGNOSIS_DATABASE,
  type DiagnosisEntry,
  searchDiagnoses,
} from "../utils/diagnosisData";

// ── Miasm colors (mirrors RemedyCompare) ──────────────────────────────────────
const MIASM_COLORS: Record<string, string> = {
  Psoric: "0.45 0.14 193",
  Sycotic: "0.45 0.15 150",
  Syphilitic: "0.55 0.22 25",
  Acute: "0.50 0.14 90",
  Tubercular: "0.50 0.18 290",
};
function getMiasmColor(miasm: string): string {
  for (const [key, val] of Object.entries(MIASM_COLORS)) {
    if (miasm.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return "0.45 0.15 260";
}

// ── Remedy matching ──────────────────────────────────────────────────────────
interface RemedyMatch {
  remedy: RemedyData;
  score: number;
  matchedKeywords: string[];
  matchedFields: string[];
}

function findMatchingRemedies(
  diagnosis: DiagnosisEntry,
  remedies: RemedyData[],
): RemedyMatch[] {
  return remedies
    .map((remedy) => {
      const fields: { label: string; text: string }[] = [
        { label: "Clinical Indications", text: remedy.clinicalIndications },
        { label: "Keynotes", text: remedy.keynotes },
        { label: "Materia Medica", text: remedy.materiaMedicaSummary },
        { label: "Synoptic Key", text: remedy.synopticKeyHighlights },
        { label: "Rubrics", text: remedy.rubrics },
      ];

      const fullText = fields
        .map((f) => f.text)
        .join(" ")
        .toLowerCase();
      const matchedKeywords = diagnosis.keywords.filter((kw) =>
        fullText.includes(kw.toLowerCase()),
      );

      const matchedFields = fields
        .filter((f) =>
          diagnosis.keywords.some((kw) =>
            f.text.toLowerCase().includes(kw.toLowerCase()),
          ),
        )
        .map((f) => f.label);

      return {
        remedy,
        score: matchedKeywords.length,
        matchedKeywords,
        matchedFields,
      };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

// short excerpt around the first keyword hit
function getExcerpt(text: string, keywords: string[], maxLen = 120): string {
  const lower = text.toLowerCase();
  for (const kw of keywords) {
    const idx = lower.indexOf(kw.toLowerCase());
    if (idx !== -1) {
      const start = Math.max(0, idx - 30);
      const end = Math.min(text.length, idx + kw.length + 60);
      const excerpt = text.slice(start, end);
      return (start > 0 ? "…" : "") + excerpt + (end < text.length ? "…" : "");
    }
  }
  return text.slice(0, maxLen) + (text.length > maxLen ? "…" : "");
}

// ── Category badge colours ───────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  Acute: "0.55 0.18 30",
  Endocrine: "0.52 0.16 305",
  Respiratory: "0.50 0.13 230",
  Gastrointestinal: "0.50 0.14 160",
  Cardiovascular: "0.55 0.20 25",
  Musculoskeletal: "0.52 0.15 70",
  Neurological: "0.48 0.18 290",
  Skin: "0.52 0.15 50",
  Urological: "0.48 0.14 250",
  Gynaecology: "0.52 0.16 340",
  ENT: "0.50 0.14 195",
  Metabolic: "0.50 0.16 130",
  Pediatric: "0.55 0.18 60",
  "Mental Health": "0.52 0.16 310",
};
function getCatColor(cat: string): string {
  return CATEGORY_COLORS[cat] ?? "0.45 0.12 260";
}

// ── Sub-components ───────────────────────────────────────────────────────────

function HarrisonsCard({ diagnosis }: { diagnosis: DiagnosisEntry }) {
  const color = getCatColor(diagnosis.category);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-xl border p-5"
      style={{
        background: `oklch(${color} / 0.05)`,
        borderColor: `oklch(${color} / 0.25)`,
      }}
      data-ocid="diagnosis_finder.harrisons.card"
    >
      {/* Header */}
      <div className="flex flex-wrap items-start gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: `oklch(${color} / 0.12)`,
            border: `1px solid oklch(${color} / 0.3)`,
          }}
        >
          <BookOpen className="w-4 h-4" style={{ color: `oklch(${color})` }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <h2
              className="text-base font-display font-bold tracking-tight"
              style={{ color: "oklch(var(--foreground))" }}
            >
              {diagnosis.name}
            </h2>
            <Badge
              className="text-xs"
              style={{
                background: `oklch(${color} / 0.12)`,
                color: `oklch(${color})`,
                border: `1px solid oklch(${color} / 0.3)`,
              }}
            >
              {diagnosis.category}
            </Badge>
          </div>
          <p
            className="text-xs"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            Harrison's Clinical Correlation
          </p>
        </div>
      </div>

      {/* Definition */}
      <div className="mb-4">
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-1"
          style={{ color: `oklch(${color})` }}
        >
          Definition
        </p>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "oklch(var(--foreground) / 0.85)" }}
        >
          {diagnosis.harrisons.definition}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        {/* Classic Symptoms */}
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-2"
            style={{ color: `oklch(${color})` }}
          >
            Classic Symptoms
          </p>
          <ul className="space-y-1">
            {diagnosis.harrisons.classicSymptoms.map((s) => (
              <li
                key={s.slice(0, 20)}
                className="flex items-start gap-1.5 text-xs"
                style={{ color: "oklch(var(--foreground) / 0.82)" }}
              >
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: `oklch(${color})` }}
                />
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Key Signs */}
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-2"
            style={{ color: `oklch(${color})` }}
          >
            Key Clinical Signs
          </p>
          <ul className="space-y-1">
            {diagnosis.harrisons.keySigns.map((s) => (
              <li
                key={s.slice(0, 20)}
                className="flex items-start gap-1.5 text-xs"
                style={{ color: "oklch(var(--foreground) / 0.82)" }}
              >
                <ChevronRight
                  className="w-3 h-3 mt-0.5 flex-shrink-0"
                  style={{ color: `oklch(${color})` }}
                />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-3">
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-1"
          style={{ color: `oklch(${color})` }}
        >
          Key Features
        </p>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "oklch(var(--foreground) / 0.80)" }}
        >
          {diagnosis.harrisons.keyFeatures}
        </p>
      </div>

      {/* Reference */}
      <p
        className="text-xs italic"
        style={{ color: "oklch(var(--muted-foreground) / 0.7)" }}
      >
        📖 {diagnosis.harrisons.reference}
      </p>
    </motion.div>
  );
}

function RemedyMatchCard({
  match,
  isSelected,
  onToggleSelect,
}: {
  match: RemedyMatch;
  isSelected: boolean;
  onToggleSelect: () => void;
}) {
  const miasmColor = getMiasmColor(match.remedy.miasmaticClassification);
  const topField = match.matchedFields[0];
  const excerpt = topField
    ? getExcerpt(
        match.remedy[
          (
            {
              "Clinical Indications": "clinicalIndications",
              Keynotes: "keynotes",
              "Materia Medica": "materiaMedicaSummary",
              "Synoptic Key": "synopticKeyHighlights",
              Rubrics: "rubrics",
            } as Record<string, keyof RemedyData>
          )[topField] ?? "keynotes"
        ] as string,
        match.matchedKeywords,
      )
    : "";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="rounded-lg border p-4 transition-all"
      style={{
        background: isSelected
          ? `oklch(${miasmColor} / 0.07)`
          : "oklch(var(--card))",
        borderColor: isSelected
          ? `oklch(${miasmColor} / 0.4)`
          : "oklch(var(--border))",
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className="font-semibold text-sm"
              style={{ color: "oklch(var(--foreground))" }}
            >
              {match.remedy.name}
            </span>
            <span
              className="text-xs font-mono"
              style={{ color: `oklch(${miasmColor})` }}
            >
              {match.remedy.abbreviation}
            </span>
            <Badge
              className="text-xs"
              style={{
                background: `oklch(${miasmColor} / 0.12)`,
                color: `oklch(${miasmColor})`,
                border: `1px solid oklch(${miasmColor} / 0.3)`,
              }}
            >
              {match.remedy.miasmaticClassification}
            </Badge>
          </div>

          {/* Score dots */}
          <div className="flex items-center gap-1.5">
            <span
              className="text-xs"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              Relevance:
            </span>
            <div className="flex gap-0.5">
              {Array.from({ length: Math.min(match.score, 10) }).map((_, i) => (
                <span
                  key={`dot-score-${i}-${match.score}`}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background:
                      i < 8
                        ? `oklch(${miasmColor})`
                        : `oklch(${miasmColor} / 0.4)`,
                  }}
                />
              ))}
            </div>
            <span
              className="text-xs"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              {match.score} keyword{match.score !== 1 ? "s" : ""} matched
            </span>
          </div>
        </div>

        {/* Select toggle */}
        <button
          type="button"
          onClick={onToggleSelect}
          data-ocid="diagnosis_finder.remedy.toggle"
          className="flex-shrink-0 rounded-md px-2 py-1 text-xs font-medium transition-all border"
          style={
            isSelected
              ? {
                  background: `oklch(${miasmColor} / 0.15)`,
                  color: `oklch(${miasmColor})`,
                  borderColor: `oklch(${miasmColor} / 0.4)`,
                }
              : {
                  background: "transparent",
                  color: "oklch(var(--muted-foreground))",
                  borderColor: "oklch(var(--border))",
                }
          }
        >
          {isSelected ? "✓ Selected" : "+ Compare"}
        </button>
      </div>

      {/* Matched fields */}
      {match.matchedFields.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {match.matchedFields.map((f) => (
            <span
              key={f}
              className="text-xs px-1.5 py-0.5 rounded"
              style={{
                background: `oklch(${miasmColor} / 0.1)`,
                color: `oklch(${miasmColor})`,
              }}
            >
              {f}
            </span>
          ))}
        </div>
      )}

      {/* Excerpt */}
      {excerpt && (
        <p
          className="text-xs leading-relaxed line-clamp-3"
          style={{ color: "oklch(var(--foreground) / 0.68)" }}
        >
          {excerpt}
        </p>
      )}
    </motion.div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export function DiagnosisFinder() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selectedDiagnosis, setSelectedDiagnosis] =
    useState<DiagnosisEntry | null>(null);
  const [suggestions, setSuggestions] = useState<DiagnosisEntry[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRemedies, setSelectedRemedies] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Autocomplete
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    const results = searchDiagnoses(query).slice(0, 8);
    setSuggestions(results);
    setShowDropdown(results.length > 0);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function selectDiagnosis(d: DiagnosisEntry) {
    setSelectedDiagnosis(d);
    setQuery(d.name);
    setShowDropdown(false);
    setSelectedRemedies([]);
  }

  function clearSearch() {
    setQuery("");
    setSelectedDiagnosis(null);
    setSelectedRemedies([]);
    inputRef.current?.focus();
  }

  function toggleRemedy(name: string) {
    setSelectedRemedies((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : prev.length < 3
          ? [...prev, name]
          : prev,
    );
  }

  function openCompare() {
    localStorage.setItem(
      "homeo_compare_preload",
      JSON.stringify(selectedRemedies),
    );
    navigate({ to: "/remedy-compare" });
  }

  const matches = selectedDiagnosis
    ? findMatchingRemedies(selectedDiagnosis, SEED_REMEDIES)
    : [];

  // Category sections for discovery
  const FEATURED_CATEGORIES = [
    { key: "Acute", label: "Acute Conditions" },
    { key: "Respiratory", label: "Respiratory" },
    { key: "Cardiovascular", label: "Cardiovascular" },
    { key: "Gastrointestinal", label: "Gastrointestinal" },
    { key: "Neurological", label: "Neurological" },
    { key: "Musculoskeletal", label: "Musculoskeletal" },
    { key: "Endocrine", label: "Endocrine" },
    { key: "Metabolic", label: "Metabolic" },
    { key: "Urological", label: "Urological" },
    { key: "Gynaecology", label: "Gynaecology" },
    { key: "Skin", label: "Skin" },
    { key: "ENT", label: "ENT" },
    { key: "Pediatric", label: "Pediatric" },
    { key: "Mental Health", label: "Mental Health" },
  ];
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<
    string | null
  >(null);
  const categorySections = FEATURED_CATEGORIES.map((cat) => ({
    ...cat,
    diagnoses: DIAGNOSIS_DATABASE.filter((d) => d.category === cat.key),
  }));
  const displayedSections = activeCategoryFilter
    ? categorySections.filter((s) => s.key === activeCategoryFilter)
    : categorySections;

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(var(--background))" }}
    >
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-6"
          data-ocid="diagnosis_finder.page"
        >
          <div className="flex items-center gap-3 mb-1">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{
                background: "oklch(var(--teal) / 0.1)",
                border: "1px solid oklch(var(--teal) / 0.25)",
              }}
            >
              <Microscope
                className="w-4.5 h-4.5"
                style={{ color: "oklch(var(--teal))" }}
              />
            </div>
            <div>
              <h1
                className="text-xl font-display font-bold tracking-tight"
                style={{ color: "oklch(var(--foreground))" }}
              >
                Diagnosis Finder
              </h1>
              <p
                className="text-sm"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Type a diagnosis to find indicated remedies with Harrison's
                clinical correlation
              </p>
            </div>
          </div>
        </motion.div>

        <Separator className="mb-6" />

        {/* ── Search Box ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.05 }}
          className="relative mb-6"
          data-ocid="diagnosis_finder.section"
        >
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: "oklch(var(--muted-foreground))" }}
            />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() =>
                query.length >= 2 && setShowDropdown(suggestions.length > 0)
              }
              placeholder="Search by diagnosis, e.g. Pneumonia, Migraine, Gout…"
              className="pl-9 pr-9 h-11 text-sm"
              data-ocid="diagnosis_finder.search_input"
              style={{
                background: "oklch(var(--card))",
                border: "1px solid oklch(var(--border))",
                color: "oklch(var(--foreground))",
              }}
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded hover:opacity-70"
                data-ocid="diagnosis_finder.close_button"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12 }}
                className="absolute top-full left-0 right-0 z-50 mt-1 rounded-lg border shadow-lg overflow-hidden"
                style={{
                  background: "oklch(var(--popover))",
                  borderColor: "oklch(var(--border))",
                }}
                data-ocid="diagnosis_finder.popover"
              >
                {suggestions.map((d) => (
                  <button
                    key={d.name}
                    type="button"
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:opacity-80 transition-opacity"
                    style={{
                      background:
                        selectedDiagnosis?.name === d.name
                          ? `oklch(${getCatColor(d.category)} / 0.08)`
                          : "transparent",
                    }}
                    onClick={() => selectDiagnosis(d)}
                    data-ocid="diagnosis_finder.dropdown_menu"
                  >
                    <Stethoscope
                      className="w-3.5 h-3.5 flex-shrink-0"
                      style={{ color: `oklch(${getCatColor(d.category)})` }}
                    />
                    <span
                      className="text-sm font-medium flex-1"
                      style={{ color: "oklch(var(--foreground))" }}
                    >
                      {d.name}
                    </span>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{
                        background: `oklch(${getCatColor(d.category)} / 0.1)`,
                        color: `oklch(${getCatColor(d.category)})`,
                      }}
                    >
                      {d.category}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── No search yet — category sections ── */}
        {!selectedDiagnosis && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="space-y-5"
          >
            {/* Category filter pills */}
            <div className="flex flex-wrap gap-2">
              {FEATURED_CATEGORIES.map((cat) => {
                const color = getCatColor(cat.key);
                const isActive = activeCategoryFilter === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() =>
                      setActiveCategoryFilter(isActive ? null : cat.key)
                    }
                    data-ocid="diagnosis_finder.tab"
                    className="rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-all border"
                    style={{
                      background: isActive
                        ? `oklch(${color} / 0.18)`
                        : `oklch(${color} / 0.06)`,
                      borderColor: isActive
                        ? `oklch(${color} / 0.6)`
                        : `oklch(${color} / 0.25)`,
                      color: `oklch(${color})`,
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Diagnosis chips grouped by category */}
            {displayedSections.map((section) => {
              const color = getCatColor(section.key);
              return (
                <div key={section.key}>
                  <p
                    className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"
                    style={{ color: `oklch(${color})` }}
                  >
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{ background: `oklch(${color})` }}
                    />
                    {section.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {section.diagnoses.map((d) => (
                      <button
                        key={d.name}
                        type="button"
                        onClick={() => selectDiagnosis(d)}
                        className="rounded-full px-3 py-1 text-xs font-medium transition-all hover:opacity-80 border"
                        data-ocid="diagnosis_finder.button"
                        style={{
                          background: `oklch(${color} / 0.08)`,
                          borderColor: `oklch(${color} / 0.3)`,
                          color: `oklch(${color})`,
                        }}
                      >
                        {d.name}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* ── Results ── */}
        <AnimatePresence mode="wait">
          {selectedDiagnosis && (
            <motion.div
              key={selectedDiagnosis.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Section A — Harrison's card */}
              <HarrisonsCard diagnosis={selectedDiagnosis} />

              {/* Section B — Matched Remedies */}
              <div data-ocid="diagnosis_finder.panel">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3
                      className="text-sm font-display font-semibold"
                      style={{ color: "oklch(var(--foreground))" }}
                    >
                      Remedies Indicated in {selectedDiagnosis.name}
                    </h3>
                    <Badge
                      className="text-xs"
                      style={{
                        background: "oklch(var(--teal) / 0.1)",
                        color: "oklch(var(--teal))",
                        border: "1px solid oklch(var(--teal) / 0.3)",
                      }}
                    >
                      {matches.length} found
                    </Badge>
                  </div>
                  {selectedRemedies.length > 0 && (
                    <span
                      className="text-xs"
                      style={{ color: "oklch(var(--muted-foreground))" }}
                    >
                      {selectedRemedies.length}/3 selected for compare
                    </span>
                  )}
                </div>

                {matches.length === 0 ? (
                  <div
                    className="flex flex-col items-center justify-center py-10 rounded-xl border-2 border-dashed gap-3"
                    style={{
                      borderColor: "oklch(var(--border))",
                      color: "oklch(var(--muted-foreground))",
                    }}
                    data-ocid="diagnosis_finder.empty_state"
                  >
                    <Microscope className="w-8 h-8 opacity-30" />
                    <p className="text-sm">
                      No remedies matched in the current database for this
                      diagnosis.
                    </p>
                    <p className="text-xs opacity-70">
                      Try a broader search term or explore the Remedy Reference.
                    </p>
                  </div>
                ) : (
                  <ScrollArea className="h-[50vh]">
                    <div className="grid gap-3 pr-2">
                      <AnimatePresence>
                        {matches.map((match, idx) => (
                          <motion.div
                            key={match.remedy.name}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            data-ocid={`diagnosis_finder.item.${idx + 1}`}
                          >
                            <RemedyMatchCard
                              match={match}
                              isSelected={selectedRemedies.includes(
                                match.remedy.name,
                              )}
                              onToggleSelect={() =>
                                toggleRemedy(match.remedy.name)
                              }
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </ScrollArea>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Sticky Compare Bar ── */}
      <AnimatePresence>
        {selectedRemedies.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
            data-ocid="diagnosis_finder.panel"
          >
            <div
              className="flex items-center gap-3 rounded-xl px-5 py-3 shadow-xl border"
              style={{
                background: "oklch(var(--card))",
                borderColor: "oklch(var(--teal) / 0.4)",
                boxShadow: "0 8px 32px oklch(var(--teal) / 0.15)",
              }}
            >
              <div className="flex flex-wrap gap-1">
                {selectedRemedies.map((name) => (
                  <Badge
                    key={name}
                    className="text-xs"
                    style={{
                      background: "oklch(var(--teal) / 0.12)",
                      color: "oklch(var(--teal))",
                      border: "1px solid oklch(var(--teal) / 0.3)",
                    }}
                  >
                    {name}
                    <button
                      type="button"
                      className="ml-1 hover:opacity-70"
                      onClick={() => toggleRemedy(name)}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Button
                size="sm"
                className="gap-1.5 h-8"
                onClick={openCompare}
                data-ocid="diagnosis_finder.primary_button"
                style={{
                  background: "oklch(var(--teal))",
                  color: "white",
                }}
              >
                <GitCompare className="w-3.5 h-3.5" />
                Compare Selected
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
