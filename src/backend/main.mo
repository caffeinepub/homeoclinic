import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let mutablePatientRecords = Map.empty<Text, Patient>();
  let mutableCaseSheets = Map.empty<Text, CaseSheet>();
  let mutablePrescriptions = Map.empty<Text, Prescription>();
  let mutableFollowUps = Map.empty<Text, FollowUp>();
  let mutableAppointments = Map.empty<Text, Appointment>();
  let mutableMemos = Map.empty<Text, Memo>();
  var nextPatientId = 1;
  var nextCaseSheetId = 1;
  var nextPrescriptionId = 1;
  var nextFollowUpId = 1;
  var nextAppointmentId = 1;
  var nextMemoId = 1;

  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
    role : Text;
    specialization : ?Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public type Patient = {
    id : Text;
    name : Text;
    age : Nat;
    sex : Text;
    address : Text;
    occupation : Text;
    contact : Text;
    registrationYear : Nat;
  };

  public type CaseSheet = {
    id : Text;
    patientId : Text;
    year : Nat;
    chiefComplaint : Text;
    hpi : Text;
    pastHistory : Text;
    familyHistory : Text;
    personalHistory : Text;
    mentalGenerals : Text;
    physicalGenerals : Text;
    examinationFindings : Text;
    investigations : Text;
    miasmaticAnalysis : Text;
    totality : Text;
    repertorialFindings : Text;
    createdAt : Int;
    updatedAt : Int;
  };

  public type PrescriptionRow = {
    date : Text;
    remedy : Text;
    potency : Text;
    dosage : Text;
    frequency : Text;
    duration : Text;
    instructions : Text;
  };

  public type Prescription = {
    id : Text;
    caseSheetId : Text;
    rows : Text; // JSON encoded rows
  };

  public type FollowUpRow = {
    visitNo : Nat;
    date : Text;
    patientFeedback : Text;
    currentSymptoms : Text;
    changesObserved : Text;
    observations : Text;
    prescription : Text;
  };

  public type FollowUp = {
    id : Text;
    caseSheetId : Text;
    rows : Text; // JSON encoded rows
  };

  public type Appointment = {
    id : Text;
    date : Text;
    patientName : Text;
    time : Text;
    reason : Text;
    status : Text; // scheduled/completed/cancelled
  };

  public type Memo = {
    id : Text;
    content : Text;
    createdAt : Int;
  };

  // Helper function to check if caller is authenticated (non-anonymous)
  // Per CRITICAL requirement: any authenticated caller is allowed, anonymous are rejected
  private func requireAuthenticated(caller : Principal) {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot access this resource");
    };
    // If not anonymous, caller is automatically treated as authenticated user
    // No need to check if they're registered - auto-treat as #user
  };

  // -- User Profile Management

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    requireAuthenticated(caller);
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    requireAuthenticated(caller);
    // Per CRITICAL requirement: any authenticated user can do everything
    // No role checks needed - if authenticated, they can view any profile
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    requireAuthenticated(caller);
    userProfiles.add(caller, profile);
  };

  // -- Patient Management

  public shared ({ caller }) func createPatient(patient : Patient) : async Text {
    requireAuthenticated(caller);
    let id = nextPatientId.toText();
    let newPatient = { patient with id };
    mutablePatientRecords.add(id, newPatient);
    nextPatientId += 1;
    id;
  };

  public query ({ caller }) func getPatient(id : Text) : async Patient {
    requireAuthenticated(caller);
    switch (mutablePatientRecords.get(id)) {
      case (null) { Runtime.trap("Patient does not exist") };
      case (?patient) { patient };
    };
  };

  public query ({ caller }) func getAllPatients() : async [Patient] {
    requireAuthenticated(caller);
    mutablePatientRecords.values().toArray();
  };

  public query ({ caller }) func getPatientsByYear(year : Nat) : async [Patient] {
    requireAuthenticated(caller);
    mutablePatientRecords.values().toArray().filter(func(p) { p.registrationYear == year });
  };

  public shared ({ caller }) func updatePatient(id : Text, patient : Patient) : async () {
    requireAuthenticated(caller);
    switch (mutablePatientRecords.get(id)) {
      case (null) { Runtime.trap("Patient does not exist") };
      case (?_) {
        mutablePatientRecords.add(id, patient);
      };
    };
  };

  public shared ({ caller }) func deletePatient(id : Text) : async () {
    requireAuthenticated(caller);
    let existed = mutablePatientRecords.containsKey(id);
    mutablePatientRecords.remove(id);
    if (not existed) {
      Runtime.trap("Patient does not exist");
    };
  };

  // -- CaseSheet Management

  public shared ({ caller }) func createCaseSheet(caseSheet : CaseSheet) : async Text {
    requireAuthenticated(caller);
    let id = nextCaseSheetId.toText();
    let newCaseSheet = { caseSheet with id };
    mutableCaseSheets.add(id, newCaseSheet);
    nextCaseSheetId += 1;
    id;
  };

  public query ({ caller }) func getCaseSheet(id : Text) : async CaseSheet {
    requireAuthenticated(caller);
    switch (mutableCaseSheets.get(id)) {
      case (null) { Runtime.trap("Case sheet does not exist") };
      case (?caseSheet) { caseSheet };
    };
  };

  public query ({ caller }) func getCaseSheetsByPatient(patientId : Text) : async [CaseSheet] {
    requireAuthenticated(caller);
    mutableCaseSheets.values().toArray().filter(func(c) { c.patientId == patientId });
  };

  public shared ({ caller }) func updateCaseSheet(id : Text, caseSheet : CaseSheet) : async () {
    requireAuthenticated(caller);
    switch (mutableCaseSheets.get(id)) {
      case (null) { Runtime.trap("Case sheet does not exist") };
      case (?_) {
        mutableCaseSheets.add(id, caseSheet);
      };
    };
  };

  public shared ({ caller }) func deleteCaseSheet(id : Text) : async () {
    requireAuthenticated(caller);
    let existed = mutableCaseSheets.containsKey(id);
    mutableCaseSheets.remove(id);
    if (not existed) {
      Runtime.trap("Case sheet does not exist");
    };
  };

  // -- Prescription Management

  public shared ({ caller }) func createPrescription(prescription : Prescription) : async Text {
    requireAuthenticated(caller);
    let id = nextPrescriptionId.toText();
    let newPrescription = { prescription with id };
    mutablePrescriptions.add(id, newPrescription);
    nextPrescriptionId += 1;
    id;
  };

  public query ({ caller }) func getPrescription(id : Text) : async Prescription {
    requireAuthenticated(caller);
    switch (mutablePrescriptions.get(id)) {
      case (null) { Runtime.trap("Prescription does not exist") };
      case (?prescription) { prescription };
    };
  };

  public query ({ caller }) func getPrescriptionsByCaseSheet(caseSheetId : Text) : async [Prescription] {
    requireAuthenticated(caller);
    mutablePrescriptions.values().toArray().filter(func(p) { p.caseSheetId == caseSheetId });
  };

  public shared ({ caller }) func updatePrescription(id : Text, prescription : Prescription) : async () {
    requireAuthenticated(caller);
    switch (mutablePrescriptions.get(id)) {
      case (null) { Runtime.trap("Prescription does not exist") };
      case (?_) {
        mutablePrescriptions.add(id, prescription);
      };
    };
  };

  public shared ({ caller }) func deletePrescription(id : Text) : async () {
    requireAuthenticated(caller);
    let existed = mutablePrescriptions.containsKey(id);
    mutablePrescriptions.remove(id);
    if (not existed) {
      Runtime.trap("Prescription does not exist");
    };
  };

  // -- FollowUp Management

  public shared ({ caller }) func createFollowUp(followUp : FollowUp) : async Text {
    requireAuthenticated(caller);
    let id = nextFollowUpId.toText();
    let newFollowUp = { followUp with id };
    mutableFollowUps.add(id, newFollowUp);
    nextFollowUpId += 1;
    id;
  };

  public query ({ caller }) func getFollowUp(id : Text) : async FollowUp {
    requireAuthenticated(caller);
    switch (mutableFollowUps.get(id)) {
      case (null) { Runtime.trap("Follow-up does not exist") };
      case (?followUp) { followUp };
    };
  };

  public query ({ caller }) func getFollowUpsByCaseSheet(caseSheetId : Text) : async [FollowUp] {
    requireAuthenticated(caller);
    mutableFollowUps.values().toArray().filter(func(f) { f.caseSheetId == caseSheetId });
  };

  public shared ({ caller }) func updateFollowUp(id : Text, followUp : FollowUp) : async () {
    requireAuthenticated(caller);
    switch (mutableFollowUps.get(id)) {
      case (null) { Runtime.trap("Follow-up does not exist") };
      case (?_) {
        mutableFollowUps.add(id, followUp);
      };
    };
  };

  public shared ({ caller }) func deleteFollowUp(id : Text) : async () {
    requireAuthenticated(caller);
    let existed = mutableFollowUps.containsKey(id);
    mutableFollowUps.remove(id);
    if (not existed) {
      Runtime.trap("Follow-up does not exist");
    };
  };

  // -- Appointment Management

  public shared ({ caller }) func createAppointment(appointment : Appointment) : async Text {
    requireAuthenticated(caller);
    let id = nextAppointmentId.toText();
    let newAppointment = { appointment with id };
    mutableAppointments.add(id, newAppointment);
    nextAppointmentId += 1;
    id;
  };

  public query ({ caller }) func getAppointment(id : Text) : async Appointment {
    requireAuthenticated(caller);
    switch (mutableAppointments.get(id)) {
      case (null) { Runtime.trap("Appointment does not exist") };
      case (?appointment) { appointment };
    };
  };

  public query ({ caller }) func getAllAppointments() : async [Appointment] {
    requireAuthenticated(caller);
    mutableAppointments.values().toArray();
  };

  public query ({ caller }) func getAppointmentsByDate(date : Text) : async [Appointment] {
    requireAuthenticated(caller);
    mutableAppointments.values().toArray().filter(func(a) { a.date == date });
  };

  public shared ({ caller }) func updateAppointment(id : Text, appointment : Appointment) : async () {
    requireAuthenticated(caller);
    switch (mutableAppointments.get(id)) {
      case (null) { Runtime.trap("Appointment does not exist") };
      case (?_) {
        mutableAppointments.add(id, appointment);
      };
    };
  };

  public shared ({ caller }) func deleteAppointment(id : Text) : async () {
    requireAuthenticated(caller);
    let existed = mutableAppointments.containsKey(id);
    mutableAppointments.remove(id);
    if (not existed) {
      Runtime.trap("Appointment does not exist");
    };
  };

  // -- Memo Management

  public shared ({ caller }) func createMemo(memo : Memo) : async Text {
    requireAuthenticated(caller);
    let id = nextMemoId.toText();
    let newMemo = { memo with id };
    mutableMemos.add(id, newMemo);
    nextMemoId += 1;
    id;
  };

  public query ({ caller }) func getAllMemos() : async [Memo] {
    requireAuthenticated(caller);
    mutableMemos.values().toArray();
  };

  public shared ({ caller }) func updateMemo(id : Text, memo : Memo) : async () {
    requireAuthenticated(caller);
    switch (mutableMemos.get(id)) {
      case (null) { Runtime.trap("Memo does not exist") };
      case (?_) {
        mutableMemos.add(id, memo);
      };
    };
  };

  public shared ({ caller }) func deleteMemo(id : Text) : async () {
    requireAuthenticated(caller);
    let existed = mutableMemos.containsKey(id);
    mutableMemos.remove(id);
    if (not existed) {
      Runtime.trap("Memo does not exist");
    };
  };
};
