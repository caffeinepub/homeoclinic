import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Columns2, GitCompare, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type ReactElement, useState } from "react";
import type { RemedyData } from "../data/remedyDatabase";
import { SEED_REMEDIES } from "../data/remedySeeds";

const MIASM_COLORS: Record<string, string> = {
  Psoric: "0.45 0.14 193",
  Sycotic: "0.45 0.15 150",
  Syphilitic: "0.55 0.22 25",
  Acute: "0.50 0.14 90",
};

// Amber color for Farrington section
const FARRINGTON_COLOR = "0.55 0.18 75";

function getMiasmColor(miasm: string): string {
  for (const [key, val] of Object.entries(MIASM_COLORS)) {
    if (miasm.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return "0.45 0.15 260";
}

// ── Helper: render text as a numbered/bulleted list ──────────────────────────
function renderAsList(
  text: string,
  ordered = false,
  className = "",
): ReactElement {
  if (!text || text.trim() === "—" || text === "") {
    return (
      <span style={{ color: "oklch(var(--foreground) / 0.85)" }}>
        {text || "—"}
      </span>
    );
  }
  let items = text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  if (items.length <= 1) {
    items = text
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (items.length <= 1) {
    const numbered = text
      .split(/(?=\d+\.\s)/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (numbered.length > 1) items = numbered;
  }
  if (items.length <= 1) {
    return (
      <span
        className={`text-xs leading-relaxed ${className}`}
        style={{ color: "oklch(var(--foreground) / 0.85)" }}
      >
        {text}
      </span>
    );
  }
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={
        ordered
          ? `list-decimal list-inside space-y-0.5 ${className}`
          : `list-disc list-inside space-y-0.5 ${className}`
      }
    >
      {items.map((item, i) => (
        <li
          key={`item-${i}-${item.slice(0, 15)}`}
          className="text-xs leading-relaxed"
          style={{ color: "oklch(var(--foreground) / 0.85)" }}
        >
          {item}
        </li>
      ))}
    </Tag>
  );
}

const SECTIONS = [
  { key: "keynotes" as const, label: "Keynotes" },
  { key: "materiaMedicaSummary" as const, label: "Materia Medica" },
  { key: "synopticKeyHighlights" as const, label: "Synoptic Key" },
  { key: "clinicalIndications" as const, label: "Clinical Indications" },
  { key: "rubrics" as const, label: "Rubrics" },
];

const REL_SECTIONS: {
  key: keyof RemedyData["relationships"];
  label: string;
}[] = [
  { key: "complementary", label: "Complementary" },
  { key: "antidotes", label: "Antidotes" },
  { key: "inimical", label: "Inimical" },
  { key: "followsWell", label: "Follows Well" },
  { key: "followedBy", label: "Followed By" },
];

// ---------- Diff helpers ----------

function splitItems(text: string): string[] {
  return text
    .split(/[\n;,]+/)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

function sectionHasDiffs(
  remedies: RemedyData[],
  key: keyof Omit<
    RemedyData,
    "name" | "abbreviation" | "miasmaticClassification" | "relationships"
  >,
): boolean {
  if (remedies.length < 2) return false;
  const first = remedies[0][key];
  return remedies.some((r) => r[key] !== first);
}

function relSectionHasDiffs(
  remedies: RemedyData[],
  key: keyof RemedyData["relationships"],
): boolean {
  if (remedies.length < 2) return false;
  const first = remedies[0].relationships[key];
  return remedies.some((r) => r.relationships[key] !== first);
}

function farringtonHasDiffs(remedies: RemedyData[]): boolean {
  if (remedies.length < 2) return false;
  const first = remedies[0].farrington ?? "";
  return remedies.some((r) => (r.farrington ?? "") !== first);
}

function getUniqueItems(value: string, otherValues: string[]): Set<string> {
  const myItems = splitItems(value);
  const otherAllItems = new Set(otherValues.flatMap((v) => splitItems(v)));
  const unique = new Set<string>();
  for (const item of myItems) {
    if (!otherAllItems.has(item)) unique.add(item);
  }
  return unique;
}

function HighlightedText({
  value,
  uniqueItems,
  miasmColor,
}: {
  value: string;
  uniqueItems: Set<string>;
  miasmColor: string;
}) {
  if (uniqueItems.size === 0) {
    return (
      <span style={{ color: "oklch(var(--foreground) / 0.85)" }}>
        {value || "—"}
      </span>
    );
  }

  const lines = value.split("\n");
  return (
    <>
      {lines.map((line, li) => {
        const trimmed = line.trim();
        const isUnique = trimmed && uniqueItems.has(trimmed.toLowerCase());
        return (
          <span key={`line-${li}-${line.slice(0, 20)}`}>
            {li > 0 && <br />}
            {isUnique ? (
              <span
                className="rounded px-0.5"
                style={{
                  background: `oklch(${miasmColor} / 0.18)`,
                  color: `oklch(${miasmColor})`,
                  fontWeight: 500,
                }}
              >
                {line}
              </span>
            ) : (
              <span style={{ color: "oklch(var(--foreground) / 0.85)" }}>
                {line}
              </span>
            )}
          </span>
        );
      })}
    </>
  );
}

// ---------- Sub-components ----------

function PlaceholderCol() {
  return (
    <div
      className="flex-1 min-w-0 flex items-center justify-center text-sm rounded-lg border-2 border-dashed"
      style={{
        color: "oklch(var(--muted-foreground))",
        borderColor: "oklch(var(--border))",
        minHeight: "60px",
      }}
    >
      Select a remedy
    </div>
  );
}

function RemedyColumnHeader({
  remedy,
  onRemove,
  onAddToPrescription,
}: {
  remedy: RemedyData;
  onRemove: () => void;
  onAddToPrescription?: (name: string) => void;
}) {
  const miasmColor = getMiasmColor(remedy.miasmaticClassification);
  return (
    <div
      className="flex flex-col gap-2 p-3 rounded-lg border"
      style={{
        background: `oklch(${miasmColor} / 0.06)`,
        borderColor: `oklch(${miasmColor} / 0.25)`,
      }}
    >
      <div className="flex items-start justify-between gap-1">
        <div>
          <div
            className="font-semibold text-sm"
            style={{ color: "oklch(var(--foreground))" }}
          >
            {remedy.name}
          </div>
          <div
            className="text-xs font-mono mt-0.5"
            style={{ color: `oklch(${miasmColor})` }}
          >
            {remedy.abbreviation}
          </div>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="rounded p-0.5 hover:opacity-70 flex-shrink-0"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <Badge
        className="text-xs w-fit"
        style={{
          background: `oklch(${miasmColor} / 0.15)`,
          color: `oklch(${miasmColor})`,
          border: `1px solid oklch(${miasmColor} / 0.3)`,
        }}
      >
        {remedy.miasmaticClassification}
      </Badge>
      {onAddToPrescription && (
        <Button
          size="sm"
          variant="outline"
          className="w-full text-xs h-7"
          onClick={() => onAddToPrescription(remedy.name)}
          data-ocid="remedy_compare.add_to_prescription.button"
          style={{
            borderColor: `oklch(${miasmColor} / 0.4)`,
            color: `oklch(${miasmColor})`,
          }}
        >
          Add to Prescription
        </Button>
      )}
    </div>
  );
}

// ---------- Main panel ----------

export interface RemedyComparePanelProps {
  onSelectRemedy?: (remedyName: string) => void;
}

export function RemedyComparePanel({
  onSelectRemedy,
}: RemedyComparePanelProps) {
  const [selected, setSelected] = useState<RemedyData[]>([]);
  const [open, setOpen] = useState(false);
  const [diffMode, setDiffMode] = useState(false);

  const available = SEED_REMEDIES.filter(
    (r) => !selected.some((s) => s.name === r.name),
  );

  function addRemedy(remedy: RemedyData) {
    if (selected.length >= 3) return;
    setSelected((prev) => [...prev, remedy]);
    setOpen(false);
  }

  function removeRemedy(name: string) {
    setSelected((prev) => prev.filter((r) => r.name !== name));
  }

  const SLOTS = ["slot-a", "slot-b", "slot-c"] as const;
  const columns: { key: string; remedy: RemedyData | null }[] = SLOTS.map(
    (key, i) => ({ key, remedy: selected[i] ?? null }),
  );

  const activeRemedies = selected;

  const identicalMainSections = SECTIONS.filter(
    (sec) =>
      activeRemedies.length >= 2 &&
      !sectionHasDiffs(
        activeRemedies,
        sec.key as keyof Omit<
          RemedyData,
          "name" | "abbreviation" | "miasmaticClassification" | "relationships"
        >,
      ),
  );
  const identicalRelSections = REL_SECTIONS.filter(
    (rs) =>
      activeRemedies.length >= 2 && !relSectionHasDiffs(activeRemedies, rs.key),
  );
  const farringtonIdentical =
    activeRemedies.length >= 2 && !farringtonHasDiffs(activeRemedies);

  const hiddenCount =
    identicalMainSections.length +
    identicalRelSections.length +
    (farringtonIdentical ? 1 : 0);

  const visibleMainSections =
    diffMode && activeRemedies.length >= 2
      ? SECTIONS.filter((s) => !identicalMainSections.includes(s))
      : SECTIONS;

  const visibleRelSections =
    diffMode && activeRemedies.length >= 2
      ? REL_SECTIONS.filter((s) => !identicalRelSections.includes(s))
      : REL_SECTIONS;

  const showFarrington =
    !diffMode || !farringtonIdentical || activeRemedies.length < 2;

  return (
    <div className="flex flex-col gap-4">
      {/* Selector + diff toggle row */}
      <div className="flex flex-wrap items-center gap-2">
        {selected.map((r) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.15 }}
          >
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-2.5 py-1 text-xs"
              style={{
                background: `oklch(${getMiasmColor(r.miasmaticClassification)} / 0.12)`,
                color: `oklch(${getMiasmColor(r.miasmaticClassification)})`,
                border: `1px solid oklch(${getMiasmColor(r.miasmaticClassification)} / 0.3)`,
              }}
            >
              {r.abbreviation} – {r.name}
              <button
                type="button"
                onClick={() => removeRemedy(r.name)}
                className="ml-1 hover:opacity-70"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          </motion.div>
        ))}

        {selected.length < 3 && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs gap-1.5"
                data-ocid="remedy_compare.add_remedy.button"
                style={{
                  borderColor: "oklch(var(--teal) / 0.4)",
                  color: "oklch(var(--teal))",
                }}
              >
                <Plus className="w-3.5 h-3.5" />
                Add remedy
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-72"
              align="start"
              style={{
                background: "oklch(var(--popover))",
                border: "1px solid oklch(var(--border))",
              }}
            >
              <Command>
                <CommandInput
                  placeholder="Search remedies…"
                  className="h-9"
                  data-ocid="remedy_compare.search_input"
                />
                <CommandList>
                  <CommandEmpty>No remedy found.</CommandEmpty>
                  <CommandGroup>
                    {available.map((r) => (
                      <CommandItem
                        key={r.name}
                        value={r.name}
                        onSelect={() => addRemedy(r)}
                      >
                        <span className="font-medium">{r.name}</span>
                        <span
                          className="ml-2 text-xs font-mono"
                          style={{
                            color: `oklch(${getMiasmColor(r.miasmaticClassification)})`,
                          }}
                        >
                          {r.abbreviation}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}

        {selected.length >= 2 && (
          <div className="flex items-center gap-2 ml-auto">
            {diffMode && hiddenCount > 0 && (
              <Badge
                className="text-xs h-6 px-2"
                style={{
                  background: "oklch(var(--muted) / 0.6)",
                  color: "oklch(var(--muted-foreground))",
                  border: "1px solid oklch(var(--border))",
                }}
              >
                {hiddenCount} identical section{hiddenCount !== 1 ? "s" : ""}{" "}
                hidden
              </Badge>
            )}
            <Button
              variant={diffMode ? "default" : "outline"}
              size="sm"
              className="h-7 text-xs gap-1.5 transition-all"
              onClick={() => setDiffMode((v) => !v)}
              data-ocid="remedy_compare.diff_mode.toggle"
              style={
                diffMode
                  ? {
                      background: "oklch(var(--teal))",
                      color: "oklch(var(--teal-foreground, 1 0 0))",
                      border: "1px solid oklch(var(--teal) / 0.6)",
                    }
                  : {
                      borderColor: "oklch(var(--teal) / 0.4)",
                      color: "oklch(var(--teal))",
                    }
              }
            >
              <GitCompare className="w-3.5 h-3.5" />
              {diffMode ? "Show All Sections" : "Show Differentiating Features"}
            </Button>
          </div>
        )}
      </div>

      {selected.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-12 rounded-xl border-2 border-dashed gap-3"
          style={{
            borderColor: "oklch(var(--border))",
            color: "oklch(var(--muted-foreground))",
          }}
          data-ocid="remedy_compare.empty_state"
        >
          <Columns2
            className="w-8 h-8 opacity-40"
            style={{ color: "oklch(var(--teal))" }}
          />
          <p className="text-sm">
            Add up to 3 remedies to compare side by side
          </p>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-0 rounded-xl border overflow-hidden"
            style={{
              borderColor: "oklch(var(--border))",
              background: "oklch(var(--card))",
            }}
          >
            {/* Diff mode banner */}
            {diffMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 px-4 py-2 text-xs border-b"
                style={{
                  background: "oklch(var(--teal) / 0.07)",
                  borderColor: "oklch(var(--teal) / 0.2)",
                  color: "oklch(var(--teal))",
                }}
              >
                <GitCompare className="w-3.5 h-3.5 flex-shrink-0" />
                <span>
                  <strong>Differentiating view</strong> — highlighted items are
                  unique to that remedy. Identical sections are hidden.
                </span>
              </motion.div>
            )}

            {/* Column headers */}
            <div
              className="grid gap-3 p-3 border-b"
              style={{
                gridTemplateColumns: "160px repeat(3, 1fr)",
                borderColor: "oklch(var(--border))",
                background: "oklch(var(--muted) / 0.4)",
              }}
            >
              <div
                className="text-xs font-semibold uppercase tracking-wider flex items-end pb-1"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                Section
              </div>
              {columns.map(({ key, remedy }) =>
                remedy ? (
                  <RemedyColumnHeader
                    key={remedy.name}
                    remedy={remedy}
                    onRemove={() => removeRemedy(remedy.name)}
                    onAddToPrescription={onSelectRemedy}
                  />
                ) : (
                  <PlaceholderCol key={key} />
                ),
              )}
            </div>

            {/* Main sections */}
            {visibleMainSections.length === 0 && diffMode ? (
              <div
                className="py-8 text-center text-sm"
                style={{ color: "oklch(var(--muted-foreground))" }}
                data-ocid="remedy_compare.diff_no_differences.empty_state"
              >
                All main sections are identical across selected remedies.
              </div>
            ) : (
              visibleMainSections.map((sec, sIdx) => (
                <div
                  key={sec.key}
                  className="grid gap-3 p-3"
                  style={{
                    gridTemplateColumns: "160px repeat(3, 1fr)",
                    borderBottom: "1px solid oklch(var(--border) / 0.5)",
                    background:
                      sIdx % 2 === 1
                        ? "oklch(var(--muted) / 0.15)"
                        : "transparent",
                  }}
                >
                  <div
                    className="text-xs font-semibold pt-1"
                    style={{ color: "oklch(var(--foreground) / 0.7)" }}
                  >
                    {sec.label}
                  </div>
                  {columns.map(({ key, remedy }) =>
                    remedy ? (
                      <div
                        key={remedy.name}
                        className="text-xs leading-relaxed"
                      >
                        {diffMode ? (
                          <HighlightedText
                            value={remedy[sec.key]}
                            uniqueItems={getUniqueItems(
                              remedy[sec.key],
                              activeRemedies
                                .filter((r) => r.name !== remedy.name)
                                .map((r) => r[sec.key]),
                            )}
                            miasmColor={getMiasmColor(
                              remedy.miasmaticClassification,
                            )}
                          />
                        ) : (
                          renderAsList(
                            remedy[sec.key],
                            sec.key === "keynotes" ||
                              sec.key === "clinicalIndications",
                          )
                        )}
                      </div>
                    ) : (
                      <div
                        key={key}
                        className="text-xs"
                        style={{
                          color: "oklch(var(--muted-foreground) / 0.4)",
                        }}
                      >
                        —
                      </div>
                    ),
                  )}
                </div>
              ))
            )}

            {/* ── Farrington's Comparative MM section ── */}
            {showFarrington && (
              <div
                className="border-t"
                style={{ borderColor: `oklch(${FARRINGTON_COLOR} / 0.25)` }}
              >
                {/* Section header banner */}
                <div
                  className="flex items-center gap-2 px-4 py-2 text-xs border-b"
                  style={{
                    background: `oklch(${FARRINGTON_COLOR} / 0.08)`,
                    borderColor: `oklch(${FARRINGTON_COLOR} / 0.2)`,
                    color: `oklch(${FARRINGTON_COLOR})`,
                  }}
                >
                  <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="font-semibold tracking-wide uppercase text-xs">
                    Farrington's Comparative Materia Medica
                  </span>
                  <span
                    className="ml-1 font-normal normal-case"
                    style={{ opacity: 0.75 }}
                  >
                    — Comparative &amp; differentiating notes
                  </span>
                </div>

                {/* Farrington row */}
                <div
                  className="grid gap-3 p-3"
                  style={{
                    gridTemplateColumns: "160px repeat(3, 1fr)",
                    background: `oklch(${FARRINGTON_COLOR} / 0.04)`,
                  }}
                >
                  <div
                    className="text-xs font-semibold pt-1"
                    style={{ color: `oklch(${FARRINGTON_COLOR})` }}
                  >
                    Farrington's Notes
                  </div>
                  {columns.map(({ key, remedy }) =>
                    remedy ? (
                      <div
                        key={remedy.name}
                        className="text-xs leading-relaxed"
                      >
                        {diffMode ? (
                          <HighlightedText
                            value={remedy.farrington || "—"}
                            uniqueItems={getUniqueItems(
                              remedy.farrington || "",
                              activeRemedies
                                .filter((r) => r.name !== remedy.name)
                                .map((r) => r.farrington || ""),
                            )}
                            miasmColor={FARRINGTON_COLOR}
                          />
                        ) : (
                          renderAsList(remedy.farrington || "—")
                        )}
                      </div>
                    ) : (
                      <div
                        key={key}
                        className="text-xs"
                        style={{
                          color: "oklch(var(--muted-foreground) / 0.4)",
                        }}
                      >
                        —
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Relationships section */}
            {visibleRelSections.length > 0 && (
              <div
                className="border-t"
                style={{ borderColor: "oklch(var(--border))" }}
              >
                <div
                  className="grid gap-3 p-3"
                  style={{
                    gridTemplateColumns: "160px repeat(3, 1fr)",
                    background: "oklch(var(--muted) / 0.25)",
                  }}
                >
                  <div
                    className="text-xs font-semibold uppercase tracking-wider pt-1"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Relationships
                  </div>
                  {columns.map(({ key, remedy }) =>
                    remedy ? (
                      <div key={remedy.name} className="flex flex-col gap-1.5">
                        {visibleRelSections.map((rs) => {
                          const val = remedy.relationships[rs.key] || "—";
                          const uniqueItems = diffMode
                            ? getUniqueItems(
                                val,
                                activeRemedies
                                  .filter((r) => r.name !== remedy.name)
                                  .map((r) => r.relationships[rs.key] || ""),
                              )
                            : new Set<string>();
                          return (
                            <div key={rs.key}>
                              <span
                                className="text-xs font-medium"
                                style={{
                                  color: "oklch(var(--foreground) / 0.55)",
                                }}
                              >
                                {rs.label}:{" "}
                              </span>
                              {diffMode ? (
                                <span className="text-xs">
                                  <HighlightedText
                                    value={val}
                                    uniqueItems={uniqueItems}
                                    miasmColor={getMiasmColor(
                                      remedy.miasmaticClassification,
                                    )}
                                  />
                                </span>
                              ) : (
                                <span
                                  className="text-xs"
                                  style={{
                                    color: "oklch(var(--foreground) / 0.85)",
                                  }}
                                >
                                  {val}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div
                        key={key}
                        className="text-xs"
                        style={{
                          color: "oklch(var(--muted-foreground) / 0.4)",
                        }}
                      >
                        —
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* If diff mode hides all relationships too */}
            {diffMode &&
              visibleRelSections.length === 0 &&
              visibleMainSections.length > 0 && (
                <div
                  className="px-4 py-2 text-xs border-t"
                  style={{
                    color: "oklch(var(--muted-foreground))",
                    borderColor: "oklch(var(--border))",
                    background: "oklch(var(--muted) / 0.1)",
                  }}
                >
                  All relationship sections are identical — hidden in diff view.
                </div>
              )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export function RemedyCompare() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(var(--background))" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-1">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "oklch(var(--teal) / 0.1)",
                border: "1px solid oklch(var(--teal) / 0.25)",
              }}
            >
              <Columns2
                className="w-4 h-4"
                style={{ color: "oklch(var(--teal))" }}
              />
            </div>
            <h1
              className="text-xl font-display font-bold tracking-tight"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Remedy Comparison
            </h1>
          </div>
          <p
            className="text-sm ml-11"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            Compare up to 3 remedies side by side across all sections including
            Farrington's comparative notes
          </p>
        </motion.div>

        <Separator className="mb-6" />

        <ScrollArea className="h-[calc(100vh-180px)]">
          <RemedyComparePanel />
          <div className="h-8" />
        </ScrollArea>
      </div>
    </div>
  );
}
