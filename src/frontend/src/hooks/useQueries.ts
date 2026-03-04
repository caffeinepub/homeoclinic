import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Appointment, CaseSheet, Memo, Patient } from "../backend.d";
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
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (patient: Patient) => {
      if (!actor) throw new Error("Not ready");
      await actor.createPatient(patient);
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

// ─── Case Sheets ────────────────────────────────────────────────────────────

export function useCasesByPatient(patientId: string) {
  const { actor, isFetching } = useActor();
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
  const { actor, isFetching } = useActor();
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
  const { actor } = useActor();
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
  const { actor } = useActor();
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
  const { actor } = useActor();
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
      await actor.createAppointment(appointment);
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
      await actor.createMemo(memo);
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
