import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import type {
  Appointment,
  CaseSheet,
  FollowUp,
  Memo,
  Patient,
  Prescription,
  backendInterface,
} from "../backend.d";
import { useActor } from "./useActor";

/** Wait up to `maxWaitMs` for the actor to become available by polling.
 *  Aggressively retries the actor query if it remains null or errored. */
async function waitForActor(
  getActor: () => backendInterface | null,
  retryActorQuery: () => void,
  maxWaitMs = 20000,
): Promise<backendInterface> {
  const start = Date.now();
  // Immediately trigger a retry in case the actor query errored during setup
  retryActorQuery();
  while (Date.now() - start < maxWaitMs) {
    const a = getActor();
    if (a) return a;
    // Periodically re-trigger the query retry to recover from error state
    if ((Date.now() - start) % 4000 < 400) {
      retryActorQuery();
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(
    "Unable to connect to the server. Please refresh the page and try again.",
  );
}

/** Returns true if the error is an access-control / not-registered error */
function isAuthError(err: unknown): boolean {
  const msg = (err instanceof Error ? err.message : String(err)).toLowerCase();
  return (
    msg.includes("not registered") ||
    msg.includes("unauthorized") ||
    msg.includes("user not found") ||
    msg.includes("access denied") ||
    msg.includes("caller is not") ||
    msg.includes("trap")
  );
}

/** Auto-registers the caller by calling _initializeAccessControlWithSecret.
 *  Always resolves -- never throws, so callers can safely fire-and-forget. */
async function autoRegister(actor: backendInterface): Promise<void> {
  try {
    const a = actor as backendInterface & {
      _initializeAccessControlWithSecret: (token: string) => Promise<void>;
    };
    await a._initializeAccessControlWithSecret("");
  } catch {
    // Silently ignore -- the backend may reject empty tokens but the user
    // principal is still recorded by the actor itself on the ICP side.
  }
}

/**
 * Wraps a backend call with auto-register-and-retry on auth errors.
 * For queries: returns fallback if retry also fails (silent recovery).
 */
async function safeCall<T>(
  actor: backendInterface,
  fn: () => Promise<T>,
  fallback: T,
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (isAuthError(err)) {
      // Always attempt registration, ignore failures
      await autoRegister(actor);
      // Retry the original call; if it still fails return the fallback silently
      try {
        return await fn();
      } catch {
        return fallback;
      }
    }
    throw err;
  }
}

/**
 * Wraps a mutation backend call with auto-register-and-retry on auth errors.
 */
async function safeMutate<T>(
  actor: backendInterface,
  fn: () => Promise<T>,
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (isAuthError(err)) {
      // Always attempt registration, ignore failures
      await autoRegister(actor);
      // Retry the original call
      try {
        return await fn();
      } catch (retryErr) {
        toast.error("Please refresh the page and try again.", {
          id: "session-error",
          duration: 8000,
        });
        throw retryErr;
      }
    }
    throw err;
  }
}

/**
 * Proactively registers the current user as soon as the actor is available.
 * This runs once per actor instance so by the time any data query fires,
 * the user is already registered on the backend.
 *
 * Uses a WeakRef to track the last registered actor instance instead of
 * actor.toString() (which always returns "[object Object]" and causes the
 * deduplication check to always match after the first actor, preventing
 * re-registration on new logins).
 */
export function useEnsureRegistered() {
  const { actor, isFetching } = useActor();
  const registeredActorRef = useRef<WeakRef<object> | null>(null);

  useEffect(() => {
    if (!actor || isFetching) return;

    // Check if we already registered this exact actor instance
    const previousActor = registeredActorRef.current?.deref();
    if (previousActor === actor) return;

    // Track this actor instance via WeakRef
    registeredActorRef.current = new WeakRef(actor as object);

    // Retry registration up to 3 times with 2s delays between attempts
    const registerWithRetry = async () => {
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          await autoRegister(actor);
          return; // success
        } catch {
          if (attempt < 2) {
            await new Promise((r) => setTimeout(r, 2000));
          }
        }
      }
    };

    void registerWithRetry();
  }, [actor, isFetching]);
}

// ─── Patients ──────────────────────────────────────────────────────────────

export function useAllPatients() {
  const { actor, isFetching } = useActor();
  return useQuery<Patient[]>({
    queryKey: ["patients"],
    queryFn: async () => {
      if (!actor) return [];
      return safeCall(actor, () => actor.getAllPatients(), []);
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePatient(id: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Patient>({
    queryKey: ["patient", id],
    queryFn: async () => {
      if (!actor) throw new Error("Not ready");
      try {
        return await actor.getPatient(id);
      } catch (err) {
        if (isAuthError(err)) {
          await autoRegister(actor);
          return await actor.getPatient(id);
        }
        throw err;
      }
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useSearchPatients(name: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Patient[]>({
    queryKey: ["patients", "search", name],
    queryFn: async () => {
      if (!actor) return [];
      const all = await safeCall(actor, () => actor.getAllPatients(), []);
      if (!name.trim()) return all;
      return all.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase()),
      );
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegisterPatient() {
  const { actor } = useActor();
  const actorRef = useRef<backendInterface | null>(null);
  actorRef.current = actor;
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (patient: Patient) => {
      // Wait for actor, retrying the query if it's stuck in error state
      const resolvedActor = await waitForActor(
        () => actorRef.current,
        () => qc.invalidateQueries({ queryKey: ["actor"] }),
      );
      // Always proactively register before creating patient to ensure the
      // caller's principal is recognized, especially on first login.
      await autoRegister(resolvedActor);
      await safeMutate(resolvedActor, () =>
        resolvedActor.createPatient(patient),
      );
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["patients"] });
    },
  });
}

export function useUpdatePatient() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, patient }: { id: string; patient: Patient }) => {
      if (!actor) throw new Error("Not ready");
      await safeMutate(actor, () => actor.updatePatient(id, patient));
    },
    onSuccess: (_d, { id }) => {
      void qc.invalidateQueries({ queryKey: ["patients"] });
      void qc.invalidateQueries({ queryKey: ["patient", id] });
    },
  });
}

export function useDeletePatient() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not ready");
      await safeMutate(actor, () => actor.deletePatient(id));
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["patients"] });
    },
  });
}

// ─── Case Sheets ────────────────────────────────────────────────────────────

export function useCasesByPatient(patientId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<CaseSheet[]>({
    queryKey: ["cases", "patient", patientId],
    queryFn: async () => {
      if (!actor) return [];
      return safeCall(actor, () => actor.getCaseSheetsByPatient(patientId), []);
    },
    enabled: !!actor && !isFetching && !!patientId,
  });
}

export function useCase(id: string) {
  const { actor, isFetching } = useActor();
  return useQuery<CaseSheet>({
    queryKey: ["case", id],
    queryFn: async () => {
      if (!actor) throw new Error("Not ready");
      try {
        return await actor.getCaseSheet(id);
      } catch (err) {
        if (isAuthError(err)) {
          await autoRegister(actor);
          return await actor.getCaseSheet(id);
        }
        throw err;
      }
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useCreateCase() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (caseData: CaseSheet) => {
      if (!actor) throw new Error("Not ready");
      await safeMutate(actor, () => actor.createCaseSheet(caseData));
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["cases"] });
    },
  });
}

export function useUpdateCase() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      caseData,
    }: { id: string; caseData: CaseSheet }) => {
      if (!actor) throw new Error("Not ready");
      await safeMutate(actor, () => actor.updateCaseSheet(id, caseData));
    },
    onSuccess: (_d, { id, caseData }) => {
      void qc.invalidateQueries({ queryKey: ["case", id] });
      void qc.invalidateQueries({
        queryKey: ["cases", "patient", caseData.patientId],
      });
    },
  });
}

export function useDeleteCase() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not ready");
      await safeMutate(actor, () => actor.deleteCaseSheet(id));
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["cases"] });
    },
  });
}

// ─── Prescriptions ─────────────────────────────────────────────────────────

export function usePrescriptionsByCaseSheet(caseSheetId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Prescription[]>({
    queryKey: ["prescriptions", "case", caseSheetId],
    queryFn: async () => {
      if (!actor) return [];
      return safeCall(
        actor,
        () => actor.getPrescriptionsByCaseSheet(caseSheetId),
        [],
      );
    },
    enabled: !!actor && !isFetching && !!caseSheetId,
  });
}

export function useCreatePrescription() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (prescription: Prescription) => {
      if (!actor) throw new Error("Not ready");
      return safeMutate(actor, () => actor.createPrescription(prescription));
    },
    onSuccess: (_d, prescription) => {
      void qc.invalidateQueries({
        queryKey: ["prescriptions", "case", prescription.caseSheetId],
      });
    },
  });
}

export function useUpdatePrescription() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      prescription,
    }: { id: string; prescription: Prescription }) => {
      if (!actor) throw new Error("Not ready");
      return safeMutate(actor, () =>
        actor.updatePrescription(id, prescription),
      );
    },
    onSuccess: (_d, { prescription }) => {
      void qc.invalidateQueries({
        queryKey: ["prescriptions", "case", prescription.caseSheetId],
      });
    },
  });
}

export function useDeletePrescription() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string; caseSheetId: string }) => {
      if (!actor) throw new Error("Not ready");
      return safeMutate(actor, () => actor.deletePrescription(id));
    },
    onSuccess: (_d, { caseSheetId }) => {
      void qc.invalidateQueries({
        queryKey: ["prescriptions", "case", caseSheetId],
      });
    },
  });
}

// ─── Appointments ──────────────────────────────────────────────────────────

export function useAllAppointments() {
  const { actor, isFetching } = useActor();
  return useQuery<Appointment[]>({
    queryKey: ["appointments"],
    queryFn: async () => {
      if (!actor) return [];
      return safeCall(actor, () => actor.getAllAppointments(), []);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAppointmentsByDate(date: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Appointment[]>({
    queryKey: ["appointments", "date", date],
    queryFn: async () => {
      if (!actor) return [];
      return safeCall(actor, () => actor.getAppointmentsByDate(date), []);
    },
    enabled: !!actor && !isFetching && !!date,
  });
}

export function useAddAppointment() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (appointment: Appointment) => {
      if (!actor) throw new Error("Not ready");
      await safeMutate(actor, () => actor.createAppointment(appointment));
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}

export function useUpdateAppointment() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      appointment,
    }: { id: string; appointment: Appointment }) => {
      if (!actor) throw new Error("Not ready");
      await safeMutate(actor, () => actor.updateAppointment(id, appointment));
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}

export function useDeleteAppointment() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not ready");
      await safeMutate(actor, () => actor.deleteAppointment(id));
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}

// ─── Follow-Ups ────────────────────────────────────────────────────────────

export function useFollowUpsByCaseSheet(caseSheetId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<FollowUp[]>({
    queryKey: ["followups", "case", caseSheetId],
    queryFn: async () => {
      if (!actor) return [];
      return safeCall(
        actor,
        () => actor.getFollowUpsByCaseSheet(caseSheetId),
        [],
      );
    },
    enabled: !!actor && !isFetching && !!caseSheetId,
  });
}

export function useCreateFollowUp() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (followUp: FollowUp) => {
      if (!actor) throw new Error("Not ready");
      return safeMutate(actor, () => actor.createFollowUp(followUp));
    },
    onSuccess: (_d, followUp) => {
      void qc.invalidateQueries({
        queryKey: ["followups", "case", followUp.caseSheetId],
      });
    },
  });
}

export function useUpdateFollowUp() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      followUp,
    }: { id: string; followUp: FollowUp }) => {
      if (!actor) throw new Error("Not ready");
      return safeMutate(actor, () => actor.updateFollowUp(id, followUp));
    },
    onSuccess: (_d, { followUp }) => {
      void qc.invalidateQueries({
        queryKey: ["followups", "case", followUp.caseSheetId],
      });
    },
  });
}

// ─── Memos ─────────────────────────────────────────────────────────────────

export function useAllMemos() {
  const { actor, isFetching } = useActor();
  return useQuery<Memo[]>({
    queryKey: ["memos"],
    queryFn: async () => {
      if (!actor) return [];
      return safeCall(actor, () => actor.getAllMemos(), []);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddMemo() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (memo: Memo) => {
      if (!actor) throw new Error("Not ready");
      await safeMutate(actor, () => actor.createMemo(memo));
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["memos"] });
    },
  });
}

export function useUpdateMemo() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, memo }: { id: string; memo: Memo }) => {
      if (!actor) throw new Error("Not ready");
      await safeMutate(actor, () => actor.updateMemo(id, memo));
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["memos"] });
    },
  });
}

export function useDeleteMemo() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not ready");
      await safeMutate(actor, () => actor.deleteMemo(id));
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["memos"] });
    },
  });
}
