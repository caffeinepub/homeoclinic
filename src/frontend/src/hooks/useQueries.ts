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

/** Wait up to `maxWaitMs` for the actor to become available by polling. */
async function waitForActor(
  getActor: () => backendInterface | null,
  retryActorQuery: () => void,
  maxWaitMs = 30000,
): Promise<backendInterface> {
  const start = Date.now();
  retryActorQuery();
  while (Date.now() - start < maxWaitMs) {
    const a = getActor();
    if (a) return a;
    if ((Date.now() - start) % 2000 < 500) {
      retryActorQuery();
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(
    "Unable to connect to the server. Please refresh the page and try again.",
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
  const { actor } = useActorDirect();
  const actorRef = { current: actor };
  actorRef.current = actor;
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (patient: Patient) => {
      const resolvedActor = await waitForActor(
        () => actorRef.current,
        () => {
          void qc.refetchQueries({ queryKey: ["actor-direct"] });
        },
      );
      await resolvedActor.createPatient(patient);
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
  const { actor } = useActorDirect();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, patient }: { id: string; patient: Patient }) => {
      if (!actor) throw new Error("Not ready");
      await actor.updatePatient(id, patient);
    },
    onSuccess: (_d, { id }) => {
      void qc.invalidateQueries({ queryKey: ["patients"] });
      void qc.invalidateQueries({ queryKey: ["patient", id] });
    },
  });
}

export function useDeletePatient() {
  const { actor } = useActorDirect();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not ready");
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
  const { actor } = useActorDirect();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (caseData: CaseSheet) => {
      if (!actor) throw new Error("Not ready");
      await actor.createCaseSheet(caseData);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["cases"] });
    },
  });
}

export function useUpdateCase() {
  const { actor } = useActorDirect();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      caseData,
    }: { id: string; caseData: CaseSheet }) => {
      if (!actor) throw new Error("Not ready");
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
  const { actor } = useActorDirect();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not ready");
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
  const { actor } = useActorDirect();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (prescription: Prescription) => {
      if (!actor) throw new Error("Not ready");
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
  const { actor } = useActorDirect();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      prescription,
    }: { id: string; prescription: Prescription }) => {
      if (!actor) throw new Error("Not ready");
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
  const { actor } = useActorDirect();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string; caseSheetId: string }) => {
      if (!actor) throw new Error("Not ready");
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
  const { actor } = useActorDirect();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (appointment: Appointment) => {
      if (!actor) throw new Error("Not ready");
      await actor.createAppointment(appointment);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}

export function useUpdateAppointment() {
  const { actor } = useActorDirect();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      appointment,
    }: { id: string; appointment: Appointment }) => {
      if (!actor) throw new Error("Not ready");
      await actor.updateAppointment(id, appointment);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}

export function useDeleteAppointment() {
  const { actor } = useActorDirect();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not ready");
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
  const { actor } = useActorDirect();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (followUp: FollowUp) => {
      if (!actor) throw new Error("Not ready");
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
  const { actor } = useActorDirect();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      followUp,
    }: { id: string; followUp: FollowUp }) => {
      if (!actor) throw new Error("Not ready");
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
  const { actor } = useActorDirect();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (memo: Memo) => {
      if (!actor) throw new Error("Not ready");
      await actor.createMemo(memo);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["memos"] });
    },
  });
}

export function useUpdateMemo() {
  const { actor } = useActorDirect();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, memo }: { id: string; memo: Memo }) => {
      if (!actor) throw new Error("Not ready");
      await actor.updateMemo(id, memo);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["memos"] });
    },
  });
}

export function useDeleteMemo() {
  const { actor } = useActorDirect();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not ready");
      await actor.deleteMemo(id);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["memos"] });
    },
  });
}
