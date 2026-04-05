import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronRight,
  FlaskConical,
  Loader2,
  Plus,
  Search,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { RemedyData } from "../data/remedyDatabase";
import { SEED_REMEDIES } from "../data/remedySeeds";
import { generateId } from "../utils/helpers";

// Remedies are local-only (not stored in the backend). generateId is used for
// local deduplication when user adds custom remedies in the current session.
void generateId; // suppress unused warning — kept for potential future use

const MIASM_COLORS: Record<string, string> = {
  Psoric: "0.45 0.14 193",
  Sycotic: "0.45 0.15 150",
  Syphilitic: "0.55 0.22 25",
  Acute: "0.50 0.14 90",
};

function getMiasmColor(miasm: string): string {
  for (const [key, val] of Object.entries(MIASM_COLORS)) {
    if (miasm.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return "0.45 0.15 260";
}

const RELATION_LABELS: {
  key: keyof RemedyData["relationships"];
  label: string;
  color: string;
}[] = [
  { key: "complementary", label: "Complementary", color: "0.45 0.15 150" },
  { key: "followsWell", label: "Follows Well", color: "0.45 0.14 193" },
  { key: "followedBy", label: "Followed By", color: "0.45 0.15 260" },
  { key: "antidotes", label: "Antidotes", color: "0.55 0.22 25" },
  { key: "inimical", label: "Inimical", color: "0.50 0.18 45" },
];

const FARRINGTON_COLOR = "0.72 0.15 85";

function RemedyCard({
  remedy,
  onClick,
}: { remedy: RemedyData; onClick: () => void }) {
  const color = getMiasmColor(remedy.miasmaticClassification);
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full text-left p-4 rounded-lg border transition-all"
      style={{
        background: "oklch(var(--card))",
        borderColor: "oklch(var(--border))",
        boxShadow: "var(--card-shadow)",
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <div
            className="font-display font-bold text-base"
            style={{ color: "oklch(var(--foreground))" }}
          >
            {remedy.name}
          </div>
          <div
            className="text-xs font-mono mt-0.5"
            style={{ color: `oklch(${color})` }}
          >
            {remedy.abbreviation}
          </div>
        </div>
        <ChevronRight
          className="w-4 h-4 mt-0.5"
          style={{ color: "oklch(var(--muted-foreground))" }}
        />
      </div>
      <Badge
        variant="outline"
        className="text-xs mb-2"
        style={{
          borderColor: `oklch(${color} / 0.35)`,
          color: `oklch(${color})`,
        }}
      >
        {remedy.miasmaticClassification}
      </Badge>
      <p
        className="text-xs line-clamp-2"
        style={{ color: "oklch(var(--muted-foreground))" }}
      >
        {remedy.keynotes}
      </p>
    </motion.button>
  );
}

function RemedyDetail({
  remedy,
  onClose,
}: { remedy: RemedyData; onClose: () => void }) {
  const color = getMiasmColor(remedy.miasmaticClassification);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(0,0,0,0.45)" }}
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border"
        style={{
          background: "oklch(var(--card))",
          borderColor: "oklch(var(--border))",
          boxShadow: "var(--card-shadow-md)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 flex items-center justify-between px-5 py-4 border-b"
          style={{
            background: "oklch(var(--card))",
            borderColor: "oklch(var(--border))",
          }}
        >
          <div>
            <div className="flex items-center gap-3">
              <div>
                <h2
                  className="text-xl font-display font-bold"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  {remedy.name}
                </h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className="text-sm font-mono"
                    style={{ color: `oklch(${color})` }}
                  >
                    {remedy.abbreviation}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-xs"
                    style={{
                      borderColor: `oklch(${color} / 0.35)`,
                      color: `oklch(${color})`,
                    }}
                  >
                    {remedy.miasmaticClassification}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-ocid="remedy_detail.close_button"
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: "oklch(var(--muted))",
              color: "oklch(var(--muted-foreground))",
            }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <Tabs defaultValue="keynotes">
            <TabsList
              className="mb-4 flex-wrap h-auto"
              style={{ background: "oklch(var(--muted))" }}
            >
              <TabsTrigger
                value="keynotes"
                data-ocid="remedy_detail.keynotes.tab"
              >
                Keynotes
              </TabsTrigger>
              <TabsTrigger
                value="materia"
                data-ocid="remedy_detail.materia.tab"
              >
                Materia Medica
              </TabsTrigger>
              <TabsTrigger
                value="synoptic"
                data-ocid="remedy_detail.synoptic.tab"
              >
                Synoptic Key
              </TabsTrigger>
              <TabsTrigger
                value="rubrics"
                data-ocid="remedy_detail.rubrics.tab"
              >
                Rubrics
              </TabsTrigger>
              <TabsTrigger
                value="relations"
                data-ocid="remedy_detail.relations.tab"
              >
                Relationships
              </TabsTrigger>
              {remedy.farrington && (
                <TabsTrigger
                  value="farrington"
                  data-ocid="remedy_detail.farrington.tab"
                  style={{
                    color: `oklch(${FARRINGTON_COLOR})`,
                  }}
                >
                  Farrington
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="keynotes">
              <div className="space-y-4">
                <div
                  className="p-4 rounded-lg"
                  style={{
                    background: `oklch(${color} / 0.05)`,
                    border: `1px solid oklch(${color} / 0.18)`,
                  }}
                >
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: `oklch(${color})` }}
                  >
                    Keynotes
                  </div>
                  <p
                    className="text-sm leading-relaxed whitespace-pre-line"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    {remedy.keynotes}
                  </p>
                </div>
                {remedy.clinicalIndications && (
                  <div
                    className="p-4 rounded-lg"
                    style={{
                      background: "oklch(var(--muted))",
                      border: "1px solid oklch(var(--border))",
                    }}
                  >
                    <div
                      className="text-xs font-semibold uppercase tracking-widest mb-2"
                      style={{ color: "oklch(var(--teal))" }}
                    >
                      Clinical Indications
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "oklch(var(--foreground))" }}
                    >
                      {remedy.clinicalIndications}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="materia">
              <div
                className="p-4 rounded-lg"
                style={{
                  background: "oklch(var(--muted))",
                  border: "1px solid oklch(var(--border))",
                }}
              >
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "oklch(var(--teal))" }}
                >
                  Materia Medica Summary (Boericke)
                </div>
                <p
                  className="text-sm leading-relaxed whitespace-pre-line"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  {remedy.materiaMedicaSummary}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="synoptic">
              <div
                className="p-4 rounded-lg"
                style={{
                  background: "oklch(var(--muted))",
                  border: "1px solid oklch(var(--border))",
                }}
              >
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "oklch(0.45 0.15 150)" }}
                >
                  Synoptic Key Highlights (Bhanja)
                </div>
                <p
                  className="text-sm leading-relaxed whitespace-pre-line"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  {remedy.synopticKeyHighlights}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="rubrics">
              <div
                className="p-4 rounded-lg"
                style={{
                  background: "oklch(var(--muted))",
                  border: "1px solid oklch(var(--border))",
                }}
              >
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "oklch(0.50 0.14 90)" }}
                >
                  Key Repertory Rubrics
                </div>
                <div className="space-y-1.5">
                  {remedy.rubrics.split(";").map((r) => (
                    <div
                      key={r.trim() || r}
                      className="text-xs px-2 py-1.5 rounded font-mono"
                      style={{
                        background: "oklch(var(--muted))",
                        color: "oklch(var(--foreground))",
                      }}
                    >
                      {r.trim()}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="relations">
              <div className="space-y-3">
                {RELATION_LABELS.map(
                  ({ key, label, color: relColor }) =>
                    remedy.relationships[key] && (
                      <div
                        key={key}
                        className="p-4 rounded-lg"
                        style={{
                          background: `oklch(${relColor} / 0.05)`,
                          border: `1px solid oklch(${relColor} / 0.18)`,
                        }}
                      >
                        <div
                          className="text-xs font-semibold uppercase tracking-widest mb-2"
                          style={{ color: `oklch(${relColor})` }}
                        >
                          {label}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {remedy.relationships[key].split(",").map((r) => (
                            <span
                              key={r.trim() || r}
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{
                                background: `oklch(${relColor} / 0.08)`,
                                color: `oklch(${relColor})`,
                                border: `1px solid oklch(${relColor} / 0.25)`,
                              }}
                            >
                              {r.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    ),
                )}
              </div>
            </TabsContent>

            {remedy.farrington && (
              <TabsContent value="farrington">
                <div
                  className="p-4 rounded-lg"
                  style={{
                    background: `oklch(${FARRINGTON_COLOR} / 0.06)`,
                    border: `1px solid oklch(${FARRINGTON_COLOR} / 0.25)`,
                  }}
                >
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: `oklch(${FARRINGTON_COLOR})` }}
                  >
                    Farrington's Comparative MM
                  </div>
                  <p
                    className="text-sm leading-relaxed whitespace-pre-line"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    {remedy.farrington}
                  </p>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
}

const EMPTY_REMEDY: RemedyData = {
  name: "",
  abbreviation: "",
  miasmaticClassification: "",
  keynotes: "",
  materiaMedicaSummary: "",
  synopticKeyHighlights: "",
  clinicalIndications: "",
  rubrics: "",
  relationships: {
    complementary: "",
    antidotes: "",
    inimical: "",
    followsWell: "",
    followedBy: "",
  },
  farrington: "",
};

export function Remedies() {
  // Remedies are stored locally only (no backend).
  // User-added remedies persist only for the session.
  const [userRemedies, setUserRemedies] = useState<RemedyData[]>([]);
  const [isLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<RemedyData | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [newRemedy, setNewRemedy] = useState<RemedyData>({ ...EMPTY_REMEDY });
  const [isSaving, setIsSaving] = useState(false);

  // Combine seed + user-added remedies, user remedies take priority by abbreviation
  const userAbbrs = new Set(userRemedies.map((r) => r.abbreviation));
  const seedFiltered = SEED_REMEDIES.filter(
    (r) => !userAbbrs.has(r.abbreviation),
  );
  const allRemedies = [...userRemedies, ...seedFiltered];

  const filtered = allRemedies.filter(
    (r) =>
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.abbreviation.toLowerCase().includes(search.toLowerCase()),
  );

  async function handleAddRemedy() {
    if (!newRemedy.name || !newRemedy.abbreviation) {
      toast.error("Name and abbreviation are required");
      return;
    }
    setIsSaving(true);
    try {
      setUserRemedies((prev) => [...prev, { ...newRemedy }]);
      toast.success("Remedy added");
      setAddOpen(false);
      setNewRemedy({ ...EMPTY_REMEDY });
    } catch {
      toast.error("Failed to add remedy");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FlaskConical
              className="w-4 h-4"
              style={{ color: "oklch(var(--teal))" }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "oklch(var(--teal))" }}
            >
              Remedy Reference
            </span>
          </div>
          <h1
            className="text-2xl font-display font-bold tracking-tight"
            style={{ color: "oklch(var(--foreground))" }}
          >
            Materia Medica & Relationships
          </h1>
        </div>

        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button
              data-ocid="remedies.add.open_modal_button"
              className="gap-2 h-9"
              style={{
                background: "oklch(var(--teal))",
                color: "oklch(0.99 0 0)",
              }}
            >
              <Plus className="w-4 h-4" />
              Add Remedy
            </Button>
          </DialogTrigger>
          <DialogContent
            data-ocid="remedies.add.dialog"
            className="max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{
              background: "oklch(var(--card))",
              borderColor: "oklch(var(--border))",
            }}
          >
            <DialogHeader>
              <DialogTitle
                className="font-display"
                style={{ color: "oklch(var(--foreground))" }}
              >
                Add New Remedy
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label
                    className="text-xs"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Name *
                  </Label>
                  <Input
                    value={newRemedy.name}
                    onChange={(e) =>
                      setNewRemedy((p) => ({ ...p, name: e.target.value }))
                    }
                    data-ocid="remedies.add.name.input"
                    placeholder="e.g., Sulphur"
                    style={{
                      background: "oklch(var(--muted))",
                      borderColor: "oklch(var(--border))",
                      color: "oklch(var(--foreground))",
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    className="text-xs"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Abbreviation *
                  </Label>
                  <Input
                    value={newRemedy.abbreviation}
                    onChange={(e) =>
                      setNewRemedy((p) => ({
                        ...p,
                        abbreviation: e.target.value,
                      }))
                    }
                    data-ocid="remedies.add.abbreviation.input"
                    placeholder="e.g., Sul"
                    style={{
                      background: "oklch(var(--muted))",
                      borderColor: "oklch(var(--border))",
                      color: "oklch(var(--foreground))",
                    }}
                  />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <Label
                    className="text-xs"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Miasmatic Classification
                  </Label>
                  <Input
                    value={newRemedy.miasmaticClassification}
                    onChange={(e) =>
                      setNewRemedy((p) => ({
                        ...p,
                        miasmaticClassification: e.target.value,
                      }))
                    }
                    data-ocid="remedies.add.miasm.input"
                    placeholder="e.g., Psoric, Sycotic, Syphilitic"
                    style={{
                      background: "oklch(var(--muted))",
                      borderColor: "oklch(var(--border))",
                      color: "oklch(var(--foreground))",
                    }}
                  />
                </div>
              </div>
              {[
                { field: "keynotes", label: "Keynotes", rows: 4 },
                {
                  field: "materiaMedicaSummary",
                  label: "Materia Medica Summary",
                  rows: 5,
                },
                {
                  field: "synopticKeyHighlights",
                  label: "Synoptic Key Highlights",
                  rows: 4,
                },
                {
                  field: "clinicalIndications",
                  label: "Clinical Indications",
                  rows: 3,
                },
                {
                  field: "rubrics",
                  label: "Key Rubrics (semicolon separated)",
                  rows: 3,
                },
                {
                  field: "farrington",
                  label: "Farrington's Comparative MM",
                  rows: 5,
                },
              ].map(({ field, label, rows }) => (
                <div key={field} className="space-y-1.5">
                  <Label
                    className="text-xs"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    {label}
                  </Label>
                  <Textarea
                    rows={rows}
                    value={
                      (newRemedy as unknown as Record<string, string>)[field]
                    }
                    onChange={(e) =>
                      setNewRemedy((p) => ({ ...p, [field]: e.target.value }))
                    }
                    data-ocid={`remedies.add.${field}.textarea`}
                    className="text-sm"
                    style={{
                      background: "oklch(var(--muted))",
                      borderColor: "oklch(var(--border))",
                      color: "oklch(var(--foreground))",
                    }}
                  />
                </div>
              ))}
              <div className="space-y-2 pt-1">
                <div
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "oklch(var(--teal))" }}
                >
                  Relationships
                </div>
                {RELATION_LABELS.map(({ key, label }) => (
                  <div key={key} className="space-y-1.5">
                    <Label
                      className="text-xs"
                      style={{ color: "oklch(var(--muted-foreground))" }}
                    >
                      {label}
                    </Label>
                    <Input
                      value={newRemedy.relationships[key]}
                      onChange={(e) =>
                        setNewRemedy((p) => ({
                          ...p,
                          relationships: {
                            ...p.relationships,
                            [key]: e.target.value,
                          },
                        }))
                      }
                      data-ocid={`remedies.add.${key}.input`}
                      placeholder="Comma separated"
                      style={{
                        background: "oklch(var(--muted))",
                        borderColor: "oklch(var(--border))",
                        color: "oklch(var(--foreground))",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                data-ocid="remedies.add.cancel_button"
                onClick={() => setAddOpen(false)}
                style={{
                  borderColor: "oklch(var(--border))",
                  color: "oklch(var(--muted-foreground))",
                }}
              >
                Cancel
              </Button>
              <Button
                data-ocid="remedies.add.submit_button"
                onClick={handleAddRemedy}
                disabled={isSaving}
                style={{
                  background: "oklch(var(--teal))",
                  color: "oklch(0.99 0 0)",
                }}
              >
                {isSaving ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  "Add Remedy"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="relative mb-6"
      >
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
          style={{ color: "oklch(var(--muted-foreground))" }}
        />
        <Input
          data-ocid="remedies.search_input"
          placeholder="Search remedies by name or abbreviation…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          style={{
            background: "oklch(var(--card))",
            borderColor: "oklch(var(--border))",
            color: "oklch(var(--foreground))",
          }}
        />
      </motion.div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-36 rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          data-ocid="remedies.empty_state"
          className="py-16 text-center rounded-lg border"
          style={{
            background: "oklch(var(--card))",
            borderColor: "oklch(var(--border))",
          }}
        >
          <FlaskConical
            className="w-10 h-10 mx-auto mb-3 opacity-20"
            style={{ color: "oklch(var(--teal))" }}
          />
          <p
            className="text-sm"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            No remedies found
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {filtered.map((remedy, i) => (
            <div
              key={remedy.abbreviation}
              data-ocid={`remedies.remedy.item.${i + 1}`}
            >
              <RemedyCard remedy={remedy} onClick={() => setSelected(remedy)} />
            </div>
          ))}
        </motion.div>
      )}

      {/* Remedy Detail Overlay */}
      <AnimatePresence>
        {selected && (
          <RemedyDetail remedy={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
