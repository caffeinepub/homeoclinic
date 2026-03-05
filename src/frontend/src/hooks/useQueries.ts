import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { useActorDirect } from "./useActorDirect";
import { useInternetIdentity } from "./useInternetIdentity";

const ACTOR_DIRECT_QUERY_KEY = "actor-direct";

/**
 * Resolve the actor from the React Query cache, triggering a refetch if needed.
 * This reads directly from the cache so it doesn't depend on component re-renders.
 */
async function resolveActor(
  qc: ReturnType<typeof useQueryClient>,
  principalStr: string,
  maxWaitMs = 30000,
): Promise<backendInterface> {
  // Fast path: actor already in cache
  const cached = qc.getQueryData<backendInterface | null>([
    ACTOR_DIRECT_QUERY_KEY,
    principalStr,
  ]);
  if (cached) return cached;

  // Trigger a refetch and await it
  await qc.refetchQueries({
    queryKey: [ACTOR_DIRECT_QUERY_KEY, principalStr],
    exact: true,
  });

  const afterRefetch = qc.getQueryData<backendInterface | null>([
    ACTOR_DIRECT_QUERY_KEY,
    principalStr,
  ]);
  if (afterRefetch) return afterRefetch;

  // Fallback: poll the cache for up to maxWaitMs
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    await new Promise((r) => setTimeout(r, 400));
    // Retry refetch every 2 seconds
    if ((Date.now() - start) % 2000 < 500) {
      await qc.refetchQueries({
        queryKey: [ACTOR_DIRECT_QUERY_KEY, principalStr],
        exact: true,
      });
    }
    const polled = qc.getQueryData<backendInterface | null>([
      ACTOR_DIRECT_QUERY_KEY,
      principalStr,
    ]);
    if (polled) return polled;
  }

  throw new Error(
    "Unable to connect to the server. Please log in and try again.",
  );
}

// ─── Patients ──────────────────────────────────────────────────────────────

export function useAllPatients() {
  const { actor, isFetching } = useActorDirect();
  return useQuery<Patient[]>({
    queryKey: ["patients"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPatients();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePatient(id: string) {
  const { actor, isFetching } = useActorDirect();
  return useQuery<Patient>({
    queryKey: ["patient", id],
    queryFn: async () => {
      if (!actor) throw new Error("Not ready");
      return actor.getPatient(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useSearchPatients(name: string) {
  const { actor, isFetching } = useActorDirect();
  return useQuery<Patient[]>({
    queryKey: ["patients", "search", name],
    queryFn: async () => {
      if (!actor) return [];
      const all = await actor.getAllPatients();
      if (!name.trim()) return all;
      return all.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase()),
      );
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegisterPatient() {
  const { identity } = useInternetIdentity();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (patient: Patient) => {
      const principalStr = identity?.getPrincipal().toString() ?? "anonymous";
      const actor = await resolveActor(qc, principalStr);
      await actor.createPatient(patient);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["patients"] });
    },
    onError: (err) => {
      toast.error(
        err instanceof Error ? err.message : "Failed to register patient",
        { id: "register-error", duration: 5000 },
      );
    },
  });
}

export function useUpdatePatient() {
  const { identity } = useInternetIdentity();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, patient }: { id: string; patient: Patient }) => {
      const principalStr = identity?.getPrincipal().toString() ?? "anonymous";
      const actor = await resolveActor(qc, principalStr);
      await actor.updatePatient(id, patient);
    },
    onSuccess: (_d, { id }) => {
      void qc.invalidateQueries({ queryKey: ["patients"] });
      void qc.invalidateQueries({ queryKey: ["patient", id] });
    },
  });
}

export function useDeletePatient() {
  const { identity } = useInternetIdentity();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const principalStr = identity?.getPrincipal().toString() ?? "anonymous";
      const actor = await resolveActor(qc, principalStr);
      await actor.deletePatient(id);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["patients"] });
    },
  });
}

// ─── Case Sheets ────────────────────────────────────────────────────────────

export function useCasesByPatient(patientId: string) {
  const { actor, isFetching } = useActorDirect();
  return useQuery<CaseSheet[]>({
    queryKey: ["cases", "patient", patientId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCaseSheetsByPatient(patientId);
    },
    enabled: !!actor && !isFetching && !!patientId,
  });
}

export function useCase(id: string) {
  const { actor, isFetching } = useActorDirect();
  return useQuery<CaseSheet>({
    queryKey: ["case", id],
    queryFn: async () => {
      if (!actor) throw new Error("Not ready");
      return actor.getCaseSheet(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useCreateCase() {
  const { identity } = useInternetIdentity();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (caseData: CaseSheet) => {
      const principalStr = identity?.getPrincipal().toString() ?? "anonymous";
      const actor = await resolveActor(qc, principalStr);
      await actor.createCaseSheet(caseData);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["cases"] });
    },
  });
}

export function useUpdateCase() {
  const { identity } = useInternetIdentity();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      caseData,
    }: { id: string; caseData: CaseSheet }) => {
      const principalStr = identity?.getPrincipal().toString() ?? "anonymous";
      const actor = await resolveActor(qc, principalStr);
      await actor.updateCaseSheet(id, caseData);
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
  const { identity } = useInternetIdentity();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const principalStr = identity?.getPrincipal().toString() ?? "anonymous";
      const actor = await resolveActor(qc, principalStr);
      await actor.deleteCaseSheet(id);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["cases"] });
    },
  });
}

// ─── Prescriptions ─────────────────────────────────────────────────────────

export function usePrescriptionsByCaseSheet(caseSheetId: string) {
  const { actor, isFetching } = useActorDirect();
  return useQuery<Prescription[]>({
    queryKey: ["prescriptions", "case", caseSheetId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPrescriptionsByCaseSheet(caseSheetId);
    },
    enabled: !!actor && !isFetching && !!caseSheetId,
  });
}

export function useCreatePrescription() {
  const { identity } = useInternetIdentity();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (prescription: Prescription) => {
      const principalStr = identity?.getPrincipal().toString() ?? "anonymous";
      const actor = await resolveActor(qc, principalStr);
      return actor.createPrescription(prescription);
    },
    onSuccess: (_d, prescription) => {
      void qc.invalidateQueries({
        queryKey: ["prescriptions", "case", prescription.caseSheetId],
      });
    },
  });
}

export function useUpdatePrescription() {
  const { identity } = useInternetIdentity();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      prescription,
    }: { id: string; prescription: Prescription }) => {
      const principalStr = identity?.getPrincipal().toString() ?? "anonymous";
      const actor = await resolveActor(qc, principalStr);
      return actor.updatePrescription(id, prescription);
    },
    onSuccess: (_d, { prescription }) => {
      void qc.invalidateQueries({
        queryKey: ["prescriptions", "case", prescription.caseSheetId],
      });
    },
  });
}

export function useDeletePrescription() {
  const { identity } = useInternetIdentity();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string; caseSheetId: string }) => {
      const principalStr = identity?.getPrincipal().toString() ?? "anonymous";
      const actor = await resolveActor(qc, principalStr);
      return actor.deletePrescription(id);
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
  const { actor, isFetching } = useActorDirect();
  return useQuery<Appointment[]>({
    queryKey: ["appointments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAppointments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAppointmentsByDate(date: string) {
  const { actor, isFetching } = useActorDirect();
  return useQuery<Appointment[]>({
    queryKey: ["appointments", "date", date],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAppointmentsByDate(date);
    },
    enabled: !!actor && !isFetching && !!date,
  });
}

export function useAddAppointment() {
  const { identity } = useInternetIdentity();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (appointment: Appointment) => {
      const principalStr = identity?.getPrincipal().toString() ?? "anonymous";
      const actor = await resolveActor(qc, principalStr);
      await actor.createAppointment(appointment);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}

export function useUpdateAppointment() {
  const { identity } = useInternetIdentity();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      appointment,
    }: { id: string; appointment: Appointment }) => {
      const principalStr = identity?.getPrincipal().toString() ?? "anonymous";
      const actor = await resolveActor(qc, principalStr);
      await actor.updateAppointment(id, appointment);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}

export function useDeleteAppointment() {
  const { identity } = useInternetIdentity();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const principalStr = identity?.getPrincipal().toString() ?? "anonymous";
      const actor = await resolveActor(qc, principalStr);
      await actor.deleteAppointment(id);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}

// ─── Follow-Ups ────────────────────────────────────────────────────────────

export function useFollowUpsByCaseSheet(caseSheetId: string) {
  const { actor, isFetching } = useActorDirect();
  return useQuery<FollowUp[]>({
    queryKey: ["followups", "case", caseSheetId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFollowUpsByCaseSheet(caseSheetId);
    },
    enabled: !!actor && !isFetching && !!caseSheetId,
  });
}

export function useCreateFollowUp() {
  const { identity } = useInternetIdentity();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (followUp: FollowUp) => {
      const principalStr = identity?.getPrincipal().toString() ?? "anonymous";
      const actor = await resolveActor(qc, principalStr);
      return actor.createFollowUp(followUp);
    },
    onSuccess: (_d, followUp) => {
      void qc.invalidateQueries({
        queryKey: ["followups", "case", followUp.caseSheetId],
      });
    },
  });
}

export function useUpdateFollowUp() {
  const { identity } = useInternetIdentity();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      followUp,
    }: { id: string; followUp: FollowUp }) => {
      const principalStr = identity?.getPrincipal().toString() ?? "anonymous";
      const actor = await resolveActor(qc, principalStr);
      return actor.updateFollowUp(id, followUp);
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
  const { actor, isFetching } = useActorDirect();
  return useQuery<Memo[]>({
    queryKey: ["memos"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMemos();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddMemo() {
  const { identity } = useInternetIdentity();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (memo: Memo) => {
      const principalStr = identity?.getPrincipal().toString() ?? "anonymous";
      const actor = await resolveActor(qc, principalStr);
      await actor.createMemo(memo);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["memos"] });
    },
  });
}

export function useUpdateMemo() {
  const { identity } = useInternetIdentity();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, memo }: { id: string; memo: Memo }) => {
      const principalStr = identity?.getPrincipal().toString() ?? "anonymous";
      const actor = await resolveActor(qc, principalStr);
      await actor.updateMemo(id, memo);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["memos"] });
    },
  });
}

export function useDeleteMemo() {
  const { identity } = useInternetIdentity();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const principalStr = identity?.getPrincipal().toString() ?? "anonymous";
      const actor = await resolveActor(qc, principalStr);
      await actor.deleteMemo(id);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["memos"] });
    },
  });
}
