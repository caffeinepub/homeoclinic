import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Nat "mo:core/Nat";
import Int "mo:core/Int";

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

  type Patient = {
    id : Text;
    name : Text;
    age : Nat;
    sex : Text;
    address : Text;
    occupation : Text;
    contact : Text;
    registrationYear : Nat;
  };

  type CaseSheet = {
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

  type PrescriptionRow = {
    date : Text;
    remedy : Text;
    potency : Text;
    dosage : Text;
    frequency : Text;
    duration : Text;
    instructions : Text;
  };

  type Prescription = {
    id : Text;
    caseSheetId : Text;
    rows : Text; // JSON encoded rows
  };

  type FollowUpRow = {
    visitNo : Nat;
    date : Text;
    patientFeedback : Text;
    currentSymptoms : Text;
    changesObserved : Text;
    observations : Text;
    prescription : Text;
  };

  type FollowUp = {
    id : Text;
    caseSheetId : Text;
    rows : Text; // JSON encoded rows
  };

  type Appointment = {
    id : Text;
    date : Text;
    patientName : Text;
    time : Text;
    reason : Text;
    status : Text; // scheduled/completed/cancelled
  };

  type Memo = {
    id : Text;
    content : Text;
    createdAt : Int;
  };

  // -- User Profile Management

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    // Users can only view their own profile, unless they are admins
    if (caller != user) {
      if (not AccessControl.isAdmin(accessControlState, caller)) {
        Runtime.trap("Unauthorized: Can only view your own profile");
      };
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // -- Patient Management

  public shared ({ caller }) func createPatient(patient : Patient) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create patients");
    };
    let id = nextPatientId.toText();
    let newPatient = { patient with id };
    mutablePatientRecords.add(id, newPatient);
    nextPatientId += 1;
    id;
  };

  public query ({ caller }) func getPatient(id : Text) : async Patient {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view patient data");
    };
    switch (mutablePatientRecords.get(id)) {
      case (null) { Runtime.trap("Patient does not exist") };
      case (?patient) { patient };
    };
  };

  public query ({ caller }) func getAllPatients() : async [Patient] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view patients");
    };
    mutablePatientRecords.values().toArray();
  };

  public query ({ caller }) func getPatientsByYear(year : Nat) : async [Patient] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view patients");
    };
    mutablePatientRecords.values().toArray().filter(func(p) { p.registrationYear == year });
  };

  public shared ({ caller }) func updatePatient(id : Text, patient : Patient) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update patients");
    };
    switch (mutablePatientRecords.get(id)) {
      case (null) { Runtime.trap("Patient does not exist") };
      case (?_) {
        mutablePatientRecords.add(id, patient);
      };
    };
  };

  public shared ({ caller }) func deletePatient(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete patients");
    };
    let existed = mutablePatientRecords.containsKey(id);
    mutablePatientRecords.remove(id);
    if (not existed) {
      Runtime.trap("Patient does not exist");
    };
  };

  // -- CaseSheet Management

  public shared ({ caller }) func createCaseSheet(caseSheet : CaseSheet) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create case sheets");
    };
    let id = nextCaseSheetId.toText();
    let newCaseSheet = { caseSheet with id };
    mutableCaseSheets.add(id, newCaseSheet);
    nextCaseSheetId += 1;
    id;
  };

  public query ({ caller }) func getCaseSheet(id : Text) : async CaseSheet {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view case sheets");
    };
    switch (mutableCaseSheets.get(id)) {
      case (null) { Runtime.trap("Case sheet does not exist") };
      case (?caseSheet) { caseSheet };
    };
  };

  public query ({ caller }) func getCaseSheetsByPatient(patientId : Text) : async [CaseSheet] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view case sheets");
    };
    mutableCaseSheets.values().toArray().filter(func(c) { c.patientId == patientId });
  };

  public shared ({ caller }) func updateCaseSheet(id : Text, caseSheet : CaseSheet) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update case sheets");
    };
    switch (mutableCaseSheets.get(id)) {
      case (null) { Runtime.trap("Case sheet does not exist") };
      case (?_) {
        mutableCaseSheets.add(id, caseSheet);
      };
    };
  };

  public shared ({ caller }) func deleteCaseSheet(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete case sheets");
    };
    let existed = mutableCaseSheets.containsKey(id);
    mutableCaseSheets.remove(id);
    if (not existed) {
      Runtime.trap("Case sheet does not exist");
    };
  };

  // -- Prescription Management

  public shared ({ caller }) func createPrescription(prescription : Prescription) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create prescriptions");
    };
    let id = nextPrescriptionId.toText();
    let newPrescription = { prescription with id };
    mutablePrescriptions.add(id, newPrescription);
    nextPrescriptionId += 1;
    id;
  };

  public query ({ caller }) func getPrescription(id : Text) : async Prescription {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view prescriptions");
    };
    switch (mutablePrescriptions.get(id)) {
      case (null) { Runtime.trap("Prescription does not exist") };
      case (?prescription) { prescription };
    };
  };

  public query ({ caller }) func getPrescriptionsByCaseSheet(caseSheetId : Text) : async [Prescription] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view prescriptions");
    };
    mutablePrescriptions.values().toArray().filter(func(p) { p.caseSheetId == caseSheetId });
  };

  public shared ({ caller }) func updatePrescription(id : Text, prescription : Prescription) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update prescriptions");
    };
    switch (mutablePrescriptions.get(id)) {
      case (null) { Runtime.trap("Prescription does not exist") };
      case (?_) {
        mutablePrescriptions.add(id, prescription);
      };
    };
  };

  public shared ({ caller }) func deletePrescription(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete prescriptions");
    };
    let existed = mutablePrescriptions.containsKey(id);
    mutablePrescriptions.remove(id);
    if (not existed) {
      Runtime.trap("Prescription does not exist");
    };
  };

  // -- FollowUp Management

  public shared ({ caller }) func createFollowUp(followUp : FollowUp) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create follow-ups");
    };
    let id = nextFollowUpId.toText();
    let newFollowUp = { followUp with id };
    mutableFollowUps.add(id, newFollowUp);
    nextFollowUpId += 1;
    id;
  };

  public query ({ caller }) func getFollowUp(id : Text) : async FollowUp {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view follow-ups");
    };
    switch (mutableFollowUps.get(id)) {
      case (null) { Runtime.trap("Follow-up does not exist") };
      case (?followUp) { followUp };
    };
  };

  public query ({ caller }) func getFollowUpsByCaseSheet(caseSheetId : Text) : async [FollowUp] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view follow-ups");
    };
    mutableFollowUps.values().toArray().filter(func(f) { f.caseSheetId == caseSheetId });
  };

  public shared ({ caller }) func updateFollowUp(id : Text, followUp : FollowUp) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update follow-ups");
    };
    switch (mutableFollowUps.get(id)) {
      case (null) { Runtime.trap("Follow-up does not exist") };
      case (?_) {
        mutableFollowUps.add(id, followUp);
      };
    };
  };

  public shared ({ caller }) func deleteFollowUp(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete follow-ups");
    };
    let existed = mutableFollowUps.containsKey(id);
    mutableFollowUps.remove(id);
    if (not existed) {
      Runtime.trap("Follow-up does not exist");
    };
  };

  // -- Appointment Management

  public shared ({ caller }) func createAppointment(appointment : Appointment) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create appointments");
    };
    let id = nextAppointmentId.toText();
    let newAppointment = { appointment with id };
    mutableAppointments.add(id, newAppointment);
    nextAppointmentId += 1;
    id;
  };

  public query ({ caller }) func getAppointment(id : Text) : async Appointment {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view appointments");
    };
    switch (mutableAppointments.get(id)) {
      case (null) { Runtime.trap("Appointment does not exist") };
      case (?appointment) { appointment };
    };
  };

  public query ({ caller }) func getAllAppointments() : async [Appointment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view appointments");
    };
    mutableAppointments.values().toArray();
  };

  public query ({ caller }) func getAppointmentsByDate(date : Text) : async [Appointment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view appointments");
    };
    mutableAppointments.values().toArray().filter(func(a) { a.date == date });
  };

  public shared ({ caller }) func updateAppointment(id : Text, appointment : Appointment) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update appointments");
    };
    switch (mutableAppointments.get(id)) {
      case (null) { Runtime.trap("Appointment does not exist") };
      case (?_) {
        mutableAppointments.add(id, appointment);
      };
    };
  };

  public shared ({ caller }) func deleteAppointment(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete appointments");
    };
    let existed = mutableAppointments.containsKey(id);
    mutableAppointments.remove(id);
    if (not existed) {
      Runtime.trap("Appointment does not exist");
    };
  };

  // -- Memo Management

  public shared ({ caller }) func createMemo(memo : Memo) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create memos");
    };
    let id = nextMemoId.toText();
    let newMemo = { memo with id };
    mutableMemos.add(id, newMemo);
    nextMemoId += 1;
    id;
  };

  public query ({ caller }) func getAllMemos() : async [Memo] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view memos");
    };
    mutableMemos.values().toArray();
  };

  public shared ({ caller }) func updateMemo(id : Text, memo : Memo) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update memos");
    };
    switch (mutableMemos.get(id)) {
      case (null) { Runtime.trap("Memo does not exist") };
      case (?_) {
        mutableMemos.add(id, memo);
      };
    };
  };

  public shared ({ caller }) func deleteMemo(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete memos");
    };
    let existed = mutableMemos.containsKey(id);
    mutableMemos.remove(id);
    if (not existed) {
      Runtime.trap("Memo does not exist");
    };
  };
};
