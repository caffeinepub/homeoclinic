import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Patient {
    id: string;
    age: bigint;
    sex: string;
    occupation: string;
    contact: string;
    name: string;
    address: string;
    registrationYear: bigint;
}
export interface CaseSheet {
    id: string;
    hpi: string;
    pastHistory: string;
    patientId: string;
    createdAt: bigint;
    year: bigint;
    personalHistory: string;
    physicalGenerals: string;
    examinationFindings: string;
    totality: string;
    miasmaticAnalysis: string;
    updatedAt: bigint;
    mentalGenerals: string;
    familyHistory: string;
    repertorialFindings: string;
    investigations: string;
    chiefComplaint: string;
}
export interface Memo {
    id: string;
    content: string;
    createdAt: bigint;
}
export interface FollowUp {
    id: string;
    rows: string;
    caseSheetId: string;
}
export interface Appointment {
    id: string;
    status: string;
    date: string;
    time: string;
    patientName: string;
    reason: string;
}
export interface Prescription {
    id: string;
    rows: string;
    caseSheetId: string;
}
export interface DoctorAccount {
    username: string;
    name: string;
    createdAt: bigint;
    role: string;
    gmail: string;
    passwordHash: string;
    phone: string;
    qualification: string;
    mustChangePassword: boolean;
}
export interface UserProfile {
    name: string;
    role: string;
    specialization?: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    changeOwnPassword(username: string, oldPasswordHash: string, newPasswordHash: string): Promise<string>;
    createAppointment(appointment: Appointment): Promise<string>;
    createCaseSheet(caseSheet: CaseSheet): Promise<string>;
    createDoctorWithPassword(username: string, passwordHash: string): Promise<string>;
    createFollowUp(followUp: FollowUp): Promise<string>;
    createMemo(memo: Memo): Promise<string>;
    createPatient(patient: Patient): Promise<string>;
    createPrescription(prescription: Prescription): Promise<string>;
    deleteAppointment(id: string): Promise<void>;
    deleteCaseSheet(id: string): Promise<void>;
    deleteFollowUp(id: string): Promise<void>;
    deleteMemo(id: string): Promise<void>;
    deletePatient(id: string): Promise<void>;
    deletePrescription(id: string): Promise<void>;
    getAllAppointments(): Promise<Array<Appointment>>;
    getAllDoctorAccounts(): Promise<Array<DoctorAccount>>;
    getAllMemos(): Promise<Array<Memo>>;
    getAllPatients(): Promise<Array<Patient>>;
    getAppointment(id: string): Promise<Appointment>;
    getAppointmentsByDate(date: string): Promise<Array<Appointment>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCaseSheet(id: string): Promise<CaseSheet>;
    getCaseSheetsByPatient(patientId: string): Promise<Array<CaseSheet>>;
    getFollowUp(id: string): Promise<FollowUp>;
    getFollowUpsByCaseSheet(caseSheetId: string): Promise<Array<FollowUp>>;
    getPatient(id: string): Promise<Patient>;
    getPatientsByYear(year: bigint): Promise<Array<Patient>>;
    getPrescription(id: string): Promise<Prescription>;
    getPrescriptionsByCaseSheet(caseSheetId: string): Promise<Array<Prescription>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    loginWithPassword(username: string, passwordHash: string): Promise<DoctorAccount | null>;
    registerWithPassword(username: string, passwordHash: string, name: string, qualification: string, gmail: string, phone: string): Promise<string>;
    resetDoctorPassword(username: string, newPasswordHash: string): Promise<string>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateAppointment(id: string, appointment: Appointment): Promise<void>;
    updateCaseSheet(id: string, caseSheet: CaseSheet): Promise<void>;
    updateDoctorAccountRole(username: string, newRole: string): Promise<string>;
    updateFollowUp(id: string, followUp: FollowUp): Promise<void>;
    updateMemo(id: string, memo: Memo): Promise<void>;
    updatePatient(id: string, patient: Patient): Promise<void>;
    updatePrescription(id: string, prescription: Prescription): Promise<void>;
    usernameExists(username: string): Promise<boolean>;
}
