import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Appointment, Case, Memo, Patient, Remedy } from "../backend.d";
import { useActor } from "./useActor";

// ─── Patients ──────────────────────────────────────────────────────────────

export function useAllPatients() {
  const { actor, isFetching } = useActor();
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
  const { actor, isFetching } = useActor();
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
  const { actor, isFetching } = useActor();
  return useQuery<Patient[]>({
    queryKey: ["patients", "search", name],
    queryFn: async () => {
      if (!actor) return [];
      if (!name.trim()) return actor.getAllPatients();
      return actor.searchPatientsByName(name);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegisterPatient() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (patient: Patient) => {
      if (!actor) throw new Error("Not ready");
      await actor.registerPatient(patient);
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
      await actor.updatePatient(id, patient);
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
      await actor.deletePatient(id);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["patients"] });
    },
  });
}

// ─── Cases ─────────────────────────────────────────────────────────────────

export function useCasesByPatient(patientId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Case[]>({
    queryKey: ["cases", "patient", patientId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCasesByPatient(patientId);
    },
    enabled: !!actor && !isFetching && !!patientId,
  });
}

export function useCase(id: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Case>({
    queryKey: ["case", id],
    queryFn: async () => {
      if (!actor) throw new Error("Not ready");
      return actor.getCase(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useCreateCase() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (caseData: Case) => {
      if (!actor) throw new Error("Not ready");
      await actor.createCase(caseData);
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
    mutationFn: async ({ id, caseData }: { id: string; caseData: Case }) => {
      if (!actor) throw new Error("Not ready");
      await actor.updateCase(id, caseData);
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
      await actor.deleteCase(id);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["cases"] });
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
      return actor.getAllAppointments();
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
      return actor.getAppointmentsByDate(date);
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
      await actor.addAppointment(appointment);
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
      await actor.updateAppointment(id, appointment);
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
      await actor.deleteAppointment(id);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["appointments"] });
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
      return actor.getAllMemos();
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
      await actor.addMemo(memo);
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
      await actor.updateMemo(id, memo);
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
      await actor.deleteMemo(id);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["memos"] });
    },
  });
}

// ─── Remedies ──────────────────────────────────────────────────────────────

export function useAllRemedies() {
  const { actor, isFetching } = useActor();
  return useQuery<Remedy[]>({
    queryKey: ["remedies"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRemedies();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchRemedies(name: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Remedy[]>({
    queryKey: ["remedies", "search", name],
    queryFn: async () => {
      if (!actor) return [];
      if (!name.trim()) return actor.getAllRemedies();
      return actor.searchRemediesByName(name);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddRemedy() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (remedy: Remedy) => {
      if (!actor) throw new Error("Not ready");
      await actor.addRemedy(remedy);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["remedies"] });
    },
  });
}

export function useUpdateRemedy() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      abbreviation,
      remedy,
    }: { abbreviation: string; remedy: Remedy }) => {
      if (!actor) throw new Error("Not ready");
      await actor.updateRemedy(abbreviation, remedy);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["remedies"] });
    },
  });
}

export function useDeleteRemedy() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (abbreviation: string) => {
      if (!actor) throw new Error("Not ready");
      await actor.deleteRemedy(abbreviation);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["remedies"] });
    },
  });
}
