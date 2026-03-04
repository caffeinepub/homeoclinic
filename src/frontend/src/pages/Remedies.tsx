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
import type { Remedy } from "../backend.d";
import { SEED_REMEDIES } from "../data/remedySeeds";
import {
  useAddRemedy,
  useAllRemedies,
  useDeleteRemedy,
} from "../hooks/useQueries";
import { generateId } from "../utils/helpers";

const MIASM_COLORS: Record<string, string> = {
  Psoric: "0.72 0.14 193",
  Sycotic: "0.78 0.12 160",
  Syphilitic: "0.62 0.20 25",
  Acute: "0.82 0.12 90",
};

function getMiasmColor(miasm: string): string {
  for (const [key, val] of Object.entries(MIASM_COLORS)) {
    if (miasm.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return "0.60 0.15 260";
}

const RELATION_LABELS: {
  key: keyof Remedy["relationships"];
  label: string;
  color: string;
}[] = [
  { key: "complementary", label: "Complementary", color: "0.78 0.12 160" },
  { key: "followsWell", label: "Follows Well", color: "0.72 0.14 193" },
  { key: "followedBy", label: "Followed By", color: "0.60 0.15 260" },
  { key: "antidotes", label: "Antidotes", color: "0.62 0.20 25" },
  { key: "inimical", label: "Inimical", color: "0.65 0.18 45" },
];

function RemedyCard({
  remedy,
  onClick,
}: { remedy: Remedy; onClick: () => void }) {
  const color = getMiasmColor(remedy.miasmaticClassification);
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full text-left p-4 rounded-lg border transition-colors"
      style={{
        background: "oklch(0.20 0.010 240)",
        borderColor: "oklch(0.28 0.012 240)",
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <div
            className="font-display font-bold text-base"
            style={{ color: "oklch(0.93 0.008 240)" }}
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
          style={{ color: "oklch(0.45 0.008 240)" }}
        />
      </div>
      <Badge
        variant="outline"
        className="text-xs mb-2"
        style={{
          borderColor: `oklch(${color} / 0.4)`,
          color: `oklch(${color})`,
        }}
      >
        {remedy.miasmaticClassification}
      </Badge>
      <p
        className="text-xs line-clamp-2"
        style={{ color: "oklch(0.55 0.010 240)" }}
      >
        {remedy.keynotes}
      </p>
    </motion.button>
  );
}

function RemedyDetail({
  remedy,
  onClose,
}: { remedy: Remedy; onClose: () => void }) {
  const color = getMiasmColor(remedy.miasmaticClassification);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(0,0,0,0.7)" }}
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
          background: "oklch(0.18 0.010 240)",
          borderColor: "oklch(0.28 0.012 240)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 flex items-center justify-between px-5 py-4 border-b"
          style={{
            background: "oklch(0.18 0.010 240)",
            borderColor: "oklch(0.26 0.012 240)",
          }}
        >
          <div>
            <div className="flex items-center gap-3">
              <div>
                <h2
                  className="text-xl font-display font-bold"
                  style={{ color: "oklch(0.93 0.008 240)" }}
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
                      borderColor: `oklch(${color} / 0.4)`,
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
              background: "oklch(0.24 0.012 240)",
              color: "oklch(0.60 0.010 240)",
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
              style={{ background: "oklch(0.22 0.012 240)" }}
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
            </TabsList>

            <TabsContent value="keynotes">
              <div className="space-y-4">
                <div
                  className="p-4 rounded-lg"
                  style={{
                    background: `oklch(${color} / 0.07)`,
                    border: `1px solid oklch(${color} / 0.2)`,
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
                    style={{ color: "oklch(0.88 0.008 240)" }}
                  >
                    {remedy.keynotes}
                  </p>
                </div>
                {remedy.clinicalIndications && (
                  <div
                    className="p-4 rounded-lg"
                    style={{
                      background: "oklch(0.22 0.012 240)",
                      border: "1px solid oklch(0.28 0.012 240)",
                    }}
                  >
                    <div
                      className="text-xs font-semibold uppercase tracking-widest mb-2"
                      style={{ color: "oklch(0.72 0.14 193)" }}
                    >
                      Clinical Indications
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "oklch(0.80 0.008 240)" }}
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
                  background: "oklch(0.22 0.012 240)",
                  border: "1px solid oklch(0.28 0.012 240)",
                }}
              >
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "oklch(0.72 0.14 193)" }}
                >
                  Materia Medica Summary (Boericke)
                </div>
                <p
                  className="text-sm leading-relaxed whitespace-pre-line"
                  style={{ color: "oklch(0.80 0.008 240)" }}
                >
                  {remedy.materiaMedicaSummary}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="synoptic">
              <div
                className="p-4 rounded-lg"
                style={{
                  background: "oklch(0.22 0.012 240)",
                  border: "1px solid oklch(0.28 0.012 240)",
                }}
              >
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "oklch(0.78 0.12 160)" }}
                >
                  Synoptic Key Highlights (Bhanja)
                </div>
                <p
                  className="text-sm leading-relaxed whitespace-pre-line"
                  style={{ color: "oklch(0.80 0.008 240)" }}
                >
                  {remedy.synopticKeyHighlights}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="rubrics">
              <div
                className="p-4 rounded-lg"
                style={{
                  background: "oklch(0.22 0.012 240)",
                  border: "1px solid oklch(0.28 0.012 240)",
                }}
              >
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "oklch(0.82 0.12 90)" }}
                >
                  Key Repertory Rubrics
                </div>
                <div className="space-y-1.5">
                  {remedy.rubrics.split(";").map((r) => (
                    <div
                      key={r}
                      className="text-xs px-2 py-1.5 rounded font-mono"
                      style={{
                        background: "oklch(0.26 0.012 240)",
                        color: "oklch(0.78 0.008 240)",
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
                          background: `oklch(${relColor} / 0.06)`,
                          border: `1px solid oklch(${relColor} / 0.2)`,
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
                              key={r}
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{
                                background: `oklch(${relColor} / 0.12)`,
                                color: `oklch(${relColor})`,
                                border: `1px solid oklch(${relColor} / 0.3)`,
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
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
}

const EMPTY_REMEDY: Remedy = {
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
};

export function Remedies() {
  const { data: backendRemedies, isLoading } = useAllRemedies();
  const addRemedy = useAddRemedy();
  useDeleteRemedy(); // Available for future use - keep hook call for consistency

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Remedy | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [newRemedy, setNewRemedy] = useState<Remedy>({ ...EMPTY_REMEDY });

  // Combine seed + backend, backend takes priority by abbreviation
  const backendAbbrs = new Set(
    (backendRemedies ?? []).map((r) => r.abbreviation),
  );
  const seedFiltered = SEED_REMEDIES.filter(
    (r) => !backendAbbrs.has(r.abbreviation),
  );
  const allRemedies = [...(backendRemedies ?? []), ...seedFiltered];

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
    try {
      await addRemedy.mutateAsync(newRemedy);
      toast.success("Remedy added");
      setAddOpen(false);
      setNewRemedy({ ...EMPTY_REMEDY });
    } catch {
      toast.error("Failed to add remedy");
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
              style={{ color: "oklch(0.72 0.14 193)" }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "oklch(0.72 0.14 193)" }}
            >
              Remedy Reference
            </span>
          </div>
          <h1
            className="text-2xl font-display font-bold tracking-tight"
            style={{ color: "oklch(0.93 0.008 240)" }}
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
                background: "oklch(0.72 0.14 193)",
                color: "oklch(0.13 0.012 240)",
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
              background: "oklch(0.18 0.010 240)",
              borderColor: "oklch(0.28 0.012 240)",
            }}
          >
            <DialogHeader>
              <DialogTitle
                className="font-display"
                style={{ color: "oklch(0.93 0.008 240)" }}
              >
                Add New Remedy
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label
                    className="text-xs"
                    style={{ color: "oklch(0.60 0.010 240)" }}
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
                      background: "oklch(0.22 0.012 240)",
                      borderColor: "oklch(0.30 0.012 240)",
                      color: "oklch(0.93 0.008 240)",
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    className="text-xs"
                    style={{ color: "oklch(0.60 0.010 240)" }}
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
                      background: "oklch(0.22 0.012 240)",
                      borderColor: "oklch(0.30 0.012 240)",
                      color: "oklch(0.93 0.008 240)",
                    }}
                  />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <Label
                    className="text-xs"
                    style={{ color: "oklch(0.60 0.010 240)" }}
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
                      background: "oklch(0.22 0.012 240)",
                      borderColor: "oklch(0.30 0.012 240)",
                      color: "oklch(0.93 0.008 240)",
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
              ].map(({ field, label, rows }) => (
                <div key={field} className="space-y-1.5">
                  <Label
                    className="text-xs"
                    style={{ color: "oklch(0.60 0.010 240)" }}
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
                      background: "oklch(0.22 0.012 240)",
                      borderColor: "oklch(0.30 0.012 240)",
                      color: "oklch(0.93 0.008 240)",
                    }}
                  />
                </div>
              ))}
              <div className="space-y-2 pt-1">
                <div
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "oklch(0.72 0.14 193)" }}
                >
                  Relationships
                </div>
                {RELATION_LABELS.map(({ key, label }) => (
                  <div key={key} className="space-y-1.5">
                    <Label
                      className="text-xs"
                      style={{ color: "oklch(0.60 0.010 240)" }}
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
                        background: "oklch(0.22 0.012 240)",
                        borderColor: "oklch(0.30 0.012 240)",
                        color: "oklch(0.93 0.008 240)",
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
                  borderColor: "oklch(0.30 0.012 240)",
                  color: "oklch(0.70 0.010 240)",
                }}
              >
                Cancel
              </Button>
              <Button
                data-ocid="remedies.add.submit_button"
                onClick={handleAddRemedy}
                disabled={addRemedy.isPending}
                style={{
                  background: "oklch(0.72 0.14 193)",
                  color: "oklch(0.13 0.012 240)",
                }}
              >
                {addRemedy.isPending ? (
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
          style={{ color: "oklch(0.50 0.008 240)" }}
        />
        <Input
          data-ocid="remedies.search_input"
          placeholder="Search remedies by name or abbreviation…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          style={{
            background: "oklch(0.20 0.010 240)",
            borderColor: "oklch(0.28 0.012 240)",
            color: "oklch(0.93 0.008 240)",
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
            background: "oklch(0.20 0.010 240)",
            borderColor: "oklch(0.28 0.012 240)",
          }}
        >
          <FlaskConical
            className="w-10 h-10 mx-auto mb-3 opacity-20"
            style={{ color: "oklch(0.72 0.14 193)" }}
          />
          <p className="text-sm" style={{ color: "oklch(0.55 0.010 240)" }}>
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
