import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Remedy {
    rubrics: string;
    name: string;
    keynotes: string;
    synopticKeyHighlights: string;
    abbreviation: string;
    clinicalIndications: string;
    materiaMedicaSummary: string;
    relationships: RemedyRelationships;
    miasmaticClassification: string;
}
export interface Case {
    id: string;
    pastHistory: string;
    patientId: string;
    year: bigint;
    personalHistory: string;
    physicalGenerals: string;
    history: string;
    examination: string;
    totality: string;
    miasmaticAnalysis: string;
    mentalGenerals: string;
    familyHistory: string;
    followUps: Array<FollowUp>;
    repertoiralFindings: string;
    prescriptions: Array<Prescription>;
    investigations: string;
    chiefComplaint: string;
}
export interface Memo {
    id: string;
    content: string;
    date: string;
}
export interface RemedyRelationships {
    antidotes: string;
    inimical: string;
    complementary: string;
    followsWell: string;
    followedBy: string;
}
export interface FollowUp {
    visitNumber: bigint;
    prescription?: Prescription;
    date: string;
    feedback: string;
    symptoms: string;
    changes: string;
    observations: string;
}
export interface Appointment {
    id: string;
    patientId: string;
    date: string;
    visitType: string;
    notes: string;
}
export interface Prescription {
    remedy: string;
    duration: string;
    dosage: string;
    date: string;
    instructions: string;
    potency: string;
    frequency: string;
}
export interface Patient {
    id: string;
    age: bigint;
    sex: string;
    occupation: string;
    contact: string;
    name: string;
    year: bigint;
    address: string;
    registrationDate: string;
    religion: string;
    maritalStatus: string;
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
    addAppointment(appointment: Appointment): Promise<void>;
    addMemo(memo: Memo): Promise<void>;
    addRemedy(remedy: Remedy): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCase(caseData: Case): Promise<void>;
    deleteAppointment(id: string): Promise<void>;
    deleteCase(id: string): Promise<void>;
    deleteMemo(id: string): Promise<void>;
    deletePatient(id: string): Promise<void>;
    deleteRemedy(abbreviation: string): Promise<void>;
    getAllAppointments(): Promise<Array<Appointment>>;
    getAllMemos(): Promise<Array<Memo>>;
    getAllPatients(): Promise<Array<Patient>>;
    getAllRemedies(): Promise<Array<Remedy>>;
    getAppointment(id: string): Promise<Appointment>;
    getAppointmentsByDate(date: string): Promise<Array<Appointment>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCase(id: string): Promise<Case>;
    getCasesByPatient(patientId: string): Promise<Array<Case>>;
    getMemo(id: string): Promise<Memo>;
    getPatient(id: string): Promise<Patient>;
    getRemedy(abbreviation: string): Promise<Remedy>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    registerPatient(patient: Patient): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchPatientsByName(name: string): Promise<Array<Patient>>;
    searchRemediesByName(name: string): Promise<Array<Remedy>>;
    updateAppointment(id: string, appointment: Appointment): Promise<void>;
    updateCase(id: string, caseData: Case): Promise<void>;
    updateMemo(id: string, memo: Memo): Promise<void>;
    updatePatient(id: string, patient: Patient): Promise<void>;
    updateRemedy(abbreviation: string, remedy: Remedy): Promise<void>;
}
