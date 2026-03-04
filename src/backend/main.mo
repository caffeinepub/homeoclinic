import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let patientRecords = Map.empty<Text, Patient>();
  let cases = Map.empty<Text, Case>();
  let remedies = Map.empty<Text, Remedy>();
  let appointments = Map.empty<Text, Appointment>();
  let memos = Map.empty<Text, Memo>();

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
    occupation : Text;
    address : Text;
    contact : Text;
    religion : Text;
    maritalStatus : Text;
    registrationDate : Text;
    year : Nat;
  };

  module Patient {
    public func compare(patient1 : Patient, patient2 : Patient) : Order.Order {
      Text.compare(patient1.id, patient2.id);
    };
  };

  type Case = {
    id : Text;
    patientId : Text;
    year : Nat;
    chiefComplaint : Text;
    history : Text;
    pastHistory : Text;
    familyHistory : Text;
    personalHistory : Text;
    mentalGenerals : Text;
    physicalGenerals : Text;
    examination : Text;
    investigations : Text;
    miasmaticAnalysis : Text;
    totality : Text;
    repertoiralFindings : Text;
    prescriptions : [Prescription];
    followUps : [FollowUp];
  };

  type Prescription = {
    remedy : Text;
    potency : Text;
    dosage : Text;
    frequency : Text;
    duration : Text;
    date : Text;
    instructions : Text;
  };

  type FollowUp = {
    visitNumber : Nat;
    date : Text;
    feedback : Text;
    symptoms : Text;
    changes : Text;
    observations : Text;
    prescription : ?Prescription;
  };

  type Remedy = {
    name : Text;
    abbreviation : Text;
    miasmaticClassification : Text;
    keynotes : Text;
    materiaMedicaSummary : Text;
    synopticKeyHighlights : Text;
    clinicalIndications : Text;
    relationships : RemedyRelationships;
    rubrics : Text;
  };

  type RemedyRelationships = {
    complementary : Text;
    antidotes : Text;
    inimical : Text;
    followsWell : Text;
    followedBy : Text;
  };

  type Appointment = {
    id : Text;
    patientId : Text;
    date : Text;
    visitType : Text;
    notes : Text;
  };

  type Memo = {
    id : Text;
    date : Text;
    content : Text;
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

  public shared ({ caller }) func registerPatient(patient : Patient) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can register patients");
    };
    patientRecords.add(patient.id, patient);
  };

  public query ({ caller }) func getPatient(id : Text) : async Patient {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view patient data");
    };
    switch (patientRecords.get(id)) {
      case (null) { Runtime.trap("Patient does not exist") };
      case (?patient) { patient };
    };
  };

  public query ({ caller }) func searchPatientsByName(name : Text) : async [Patient] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can search patients");
    };
    patientRecords.values().toArray().filter(func(p) { p.name.contains(#text name) });
  };

  public query ({ caller }) func getAllPatients() : async [Patient] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view patients");
    };
    patientRecords.values().toArray();
  };

  public shared ({ caller }) func updatePatient(id : Text, patient : Patient) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can update patients");
    };
    patientRecords.add(id, patient);
  };

  public shared ({ caller }) func deletePatient(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can delete patients");
    };
    patientRecords.remove(id);
  };

  // -- Case Management

  public shared ({ caller }) func createCase(caseData : Case) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create cases");
    };
    cases.add(caseData.id, caseData);
  };

  public query ({ caller }) func getCase(id : Text) : async Case {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view cases");
    };
    switch (cases.get(id)) {
      case (null) { Runtime.trap("Case does not exist") };
      case (?caseData) { caseData };
    };
  };

  public query ({ caller }) func getCasesByPatient(patientId : Text) : async [Case] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view cases");
    };
    cases.values().toArray().filter(func(c) { c.patientId == patientId });
  };

  public shared ({ caller }) func updateCase(id : Text, caseData : Case) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can update cases");
    };
    cases.add(id, caseData);
  };

  public shared ({ caller }) func deleteCase(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can delete cases");
    };
    cases.remove(id);
  };

  // -- Remedies Management

  public shared ({ caller }) func addRemedy(remedy : Remedy) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add remedies");
    };
    remedies.add(remedy.abbreviation, remedy);
  };

  public query ({ caller }) func getRemedy(abbreviation : Text) : async Remedy {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view remedies");
    };
    switch (remedies.get(abbreviation)) {
      case (null) { Runtime.trap("Remedy does not exist") };
      case (?remedy) { remedy };
    };
  };

  public query ({ caller }) func searchRemediesByName(name : Text) : async [Remedy] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can search remedies");
    };
    remedies.values().toArray().filter(func(r) { r.name.contains(#text name) });
  };

  public query ({ caller }) func getAllRemedies() : async [Remedy] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view remedies");
    };
    remedies.values().toArray();
  };

  public shared ({ caller }) func updateRemedy(abbreviation : Text, remedy : Remedy) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update remedies");
    };
    remedies.add(abbreviation, remedy);
  };

  public shared ({ caller }) func deleteRemedy(abbreviation : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete remedies");
    };
    remedies.remove(abbreviation);
  };

  // -- Appointments Management

  public shared ({ caller }) func addAppointment(appointment : Appointment) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add appointments");
    };
    appointments.add(appointment.id, appointment);
  };

  public query ({ caller }) func getAppointment(id : Text) : async Appointment {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view appointments");
    };
    switch (appointments.get(id)) {
      case (null) { Runtime.trap("Appointment does not exist") };
      case (?appointment) { appointment };
    };
  };

  public query ({ caller }) func getAppointmentsByDate(date : Text) : async [Appointment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view appointments");
    };
    appointments.values().toArray().filter(func(a) { a.date == date });
  };

  public query ({ caller }) func getAllAppointments() : async [Appointment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view appointments");
    };
    appointments.values().toArray();
  };

  public shared ({ caller }) func updateAppointment(id : Text, appointment : Appointment) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update appointments");
    };
    appointments.add(id, appointment);
  };

  public shared ({ caller }) func deleteAppointment(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete appointments");
    };
    appointments.remove(id);
  };

  // -- Memo Management

  public shared ({ caller }) func addMemo(memo : Memo) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add memos");
    };
    memos.add(memo.id, memo);
  };

  public query ({ caller }) func getMemo(id : Text) : async Memo {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view memos");
    };
    switch (memos.get(id)) {
      case (null) { Runtime.trap("Memo does not exist") };
      case (?memo) { memo };
    };
  };

  public query ({ caller }) func getAllMemos() : async [Memo] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view memos");
    };
    memos.values().toArray();
  };

  public shared ({ caller }) func updateMemo(id : Text, memo : Memo) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update memos");
    };
    memos.add(id, memo);
  };

  public shared ({ caller }) func deleteMemo(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete memos");
    };
    memos.remove(id);
  };
};
