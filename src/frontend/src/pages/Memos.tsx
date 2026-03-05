import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Loader2, Plus, Save, StickyNote, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Memo } from "../backend.d";
import {
  useAddMemo,
  useAllMemos,
  useDeleteMemo,
  useUpdateMemo,
} from "../hooks/useQueries";
import { generateId } from "../utils/helpers";

export function Memos() {
  const { data: memos, isLoading } = useAllMemos();
  const addMemo = useAddMemo();
  const updateMemo = useUpdateMemo();
  const deleteMemo = useDeleteMemo();

  const [newContent, setNewContent] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function handleAdd() {
    if (!newContent.trim()) {
      toast.error("Memo content cannot be empty");
      return;
    }
    const memo: Memo = {
      id: generateId(),
      content: newContent.trim(),
      createdAt: BigInt(Date.now()),
    };
    try {
      await addMemo.mutateAsync(memo);
      toast.success("Memo saved");
      setNewContent("");
    } catch {
      toast.error("Failed to save memo");
    }
  }

  function startEdit(memo: Memo) {
    setEditId(memo.id);
    setEditContent(memo.content);
  }

  async function handleSaveEdit(memo: Memo) {
    if (!editContent.trim()) return;
    try {
      await updateMemo.mutateAsync({
        id: memo.id,
        memo: { ...memo, content: editContent.trim() },
      });
      toast.success("Memo updated");
      setEditId(null);
    } catch {
      toast.error("Failed to update memo");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteMemo.mutateAsync(id);
      toast.success("Memo deleted");
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete memo");
    }
  }

  const sorted = [...(memos ?? [])].sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt),
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 mb-1">
          <StickyNote
            className="w-4 h-4"
            style={{ color: "oklch(var(--teal))" }}
          />
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "oklch(var(--teal))" }}
          >
            Physician Notes
          </span>
        </div>
        <h1
          className="text-2xl font-display font-bold tracking-tight"
          style={{ color: "oklch(var(--foreground))" }}
        >
          Memos
        </h1>
      </motion.div>

      {/* New memo */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="rounded-xl border p-4 mb-6"
        style={{
          background: "oklch(var(--card))",
          borderColor: "oklch(var(--border))",
          boxShadow: "var(--card-shadow)",
        }}
      >
        <div
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: "oklch(var(--teal))" }}
        >
          New Memo
        </div>
        <Textarea
          data-ocid="memos.new.textarea"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          rows={4}
          placeholder="Write a clinical note, reminder, or observation…"
          className="text-sm mb-3"
          style={{
            background: "oklch(var(--muted))",
            borderColor: "oklch(var(--border))",
            color: "oklch(var(--foreground))",
          }}
        />
        <div className="flex justify-end">
          <Button
            data-ocid="memos.new.submit_button"
            onClick={handleAdd}
            disabled={addMemo.isPending || !newContent.trim()}
            className="gap-1.5 h-8 text-sm"
            style={{
              background: "oklch(var(--teal))",
              color: "oklch(0.99 0 0)",
            }}
          >
            {addMemo.isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
            Save Memo
          </Button>
        </div>
      </motion.div>

      {/* Memo list */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : !sorted.length ? (
        <div
          data-ocid="memos.empty_state"
          className="py-16 text-center rounded-xl border"
          style={{
            background: "oklch(var(--card))",
            borderColor: "oklch(var(--border))",
          }}
        >
          <StickyNote
            className="w-10 h-10 mx-auto mb-3 opacity-20"
            style={{ color: "oklch(var(--teal))" }}
          />
          <p
            className="text-sm"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            No memos yet. Write your first clinical note above.
          </p>
        </div>
      ) : (
        <AnimatePresence initial={false}>
          <div className="space-y-3">
            {sorted.map((memo, i) => (
              <motion.div
                key={memo.id}
                data-ocid={`memos.memo.item.${i + 1}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
                className="rounded-xl border group"
                style={{
                  background: "oklch(var(--card))",
                  borderColor: "oklch(var(--border))",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <div
                  className="flex items-center justify-between px-4 py-2.5 border-b"
                  style={{ borderColor: "oklch(var(--border))" }}
                >
                  <div className="flex items-center gap-1.5">
                    <Clock
                      className="w-3 h-3"
                      style={{ color: "oklch(var(--muted-foreground))" }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: "oklch(var(--muted-foreground))" }}
                    >
                      {new Date(Number(memo.createdAt)).toLocaleDateString(
                        "en-IN",
                        { day: "numeric", month: "short", year: "numeric" },
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {editId === memo.id ? (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          data-ocid={`memos.cancel_button.${i + 1}`}
                          onClick={() => setEditId(null)}
                          className="h-6 px-2 text-xs"
                          style={{ color: "oklch(var(--muted-foreground))" }}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          data-ocid={`memos.save_button.${i + 1}`}
                          onClick={() => handleSaveEdit(memo)}
                          disabled={updateMemo.isPending}
                          className="h-6 px-2 text-xs gap-1"
                          style={{
                            background: "oklch(var(--teal))",
                            color: "oklch(0.99 0 0)",
                          }}
                        >
                          <Save className="w-3 h-3" />
                          Save
                        </Button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          data-ocid={`memos.edit_button.${i + 1}`}
                          onClick={() => startEdit(memo)}
                          className="px-2 py-0.5 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            color: "oklch(var(--teal))",
                            background: "oklch(var(--teal) / 0.08)",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          data-ocid={`memos.delete_button.${i + 1}`}
                          onClick={() => setDeleteId(memo.id)}
                          className="w-6 h-6 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            color: "oklch(var(--destructive))",
                            background: "oklch(var(--destructive) / 0.08)",
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="px-4 py-3">
                  {editId === memo.id ? (
                    <Textarea
                      data-ocid={`memos.edit.textarea.${i + 1}`}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={4}
                      autoFocus
                      className="text-sm"
                      style={{
                        background: "oklch(var(--muted))",
                        borderColor: "oklch(var(--teal) / 0.4)",
                        color: "oklch(var(--foreground))",
                      }}
                    />
                  ) : (
                    <p
                      className="text-sm whitespace-pre-wrap leading-relaxed"
                      style={{ color: "oklch(var(--foreground))" }}
                    >
                      {memo.content}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}

      {/* Delete confirm */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent
          data-ocid="memos.delete.dialog"
          style={{
            background: "oklch(var(--card))",
            borderColor: "oklch(var(--border))",
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle style={{ color: "oklch(var(--foreground))" }}>
              Delete Memo?
            </AlertDialogTitle>
            <AlertDialogDescription
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              This memo will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="memos.delete.cancel_button"
              style={{
                background: "oklch(var(--muted))",
                borderColor: "oklch(var(--border))",
                color: "oklch(var(--foreground))",
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="memos.delete.confirm_button"
              onClick={() => deleteId && handleDelete(deleteId)}
              style={{
                background: "oklch(var(--destructive))",
                color: "oklch(0.99 0 0)",
              }}
            >
              {deleteMemo.isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
