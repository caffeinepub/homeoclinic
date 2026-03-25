import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";

import Array "mo:core/Array";
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
  let userProfiles = Map.empty<Principal, UserProfile>();

  let ssoDoctors = Map.empty<Text, Text>();
  let passwordHashDoctorMap = Map.empty<Text, DoctorAccount>();

  public type UserProfile = {
    name : Text;
    role : Text;
    specialization : ?Text;
  };

  // TODO create list of valid role types
  // TODO should it not be enough to only use DoctorAccount by naming all actors "doctors"?
  public type DoctorAccount = {
    username : Text;
    passwordHash : Text;
    name : Text;
    qualification : Text;
    gmail : Text;
    phone : Text;
    role : Text;
    mustChangePassword : Bool;
    createdAt : Int;
  };

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

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  private func requireAuthenticated(caller : Principal) {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot access this resource");
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };

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

  public shared ({ caller }) func registerWithPassword(
    username : Text,
    passwordHash : Text,
    name : Text,
    qualification : Text,
    gmail : Text,
    phone : Text,
  ) : async Text {
    let currentTimestamp = 0;
    if (passwordHashDoctorMap.containsKey(username)) {
      return "Username already exists";
    };
    let newDoctorAccount : DoctorAccount = {
      username;
      passwordHash;
      name;
      qualification;
      gmail;
      phone;
      role = "pending";
      mustChangePassword = false;
      createdAt = currentTimestamp;
    };
    passwordHashDoctorMap.add(username, newDoctorAccount);

    "ok";
  };

  public shared ({ caller }) func loginWithPassword(username : Text, passwordHash : Text) : async ?DoctorAccount {
    switch (passwordHashDoctorMap.get(username)) {
      case (null) {
        null;
      };
      case (?doctorAccount) {
        if (doctorAccount.passwordHash == passwordHash) {
          ?doctorAccount;
        } else {
          null;
        };
      };
    };
  };

  public shared ({ caller }) func updateDoctorAccountRole(username : Text, newRole : Text) : async Text {
    switch (passwordHashDoctorMap.get(username)) {
      case (null) { "Username not found" };
      case (?doctorAccount) { passwordHashDoctorMap.add(username, { doctorAccount with role = newRole }); "ok" };
    };
  };

  // Manage creation of new doctor and ensuring doctor's authenticity (TODO - using admin's functionality, needs refactoring)
  // let newDoctor = { doctor with caller };
  // DOCTORS.add(caller, newDoctor);
  //SSO.add(doctor.id, caller);

  public query ({ caller }) func usernameExists(username : Text) : async Bool {
    passwordHashDoctorMap.containsKey(username);
  };

  public shared ({ caller }) func resetDoctorPassword(username : Text, newPasswordHash : Text) : async Text {
    switch (passwordHashDoctorMap.get(username)) {
      case (null) { "Doctor Account Not Found" };
      case (?doctorAccount) {
        passwordHashDoctorMap.add(username, { doctorAccount with passwordHash = newPasswordHash });
        "ok";
      };
    };
  };

  public shared ({ caller }) func changeOwnPassword(username : Text, oldPasswordHash : Text, newPasswordHash : Text) : async Text {
    switch (passwordHashDoctorMap.get(username)) {
      case (null) {
        "Doctor Account Not Found";
      };
      case (?doctorAccount) {
        if (doctorAccount.passwordHash != oldPasswordHash) {
          "Old password is incorrect";
        } else if (oldPasswordHash == newPasswordHash) {
          "New password cannot be the same as the old password";
        } else {
          passwordHashDoctorMap.add(username, { doctorAccount with passwordHash = newPasswordHash });
          passwordHashDoctorMap.remove(oldPasswordHash);
          "ok";
        };
      };
    };
  };

  //add new Doctor to SSO table
  public shared ({ caller }) func createDoctorWithPassword(username : Text, passwordHash : Text) : async Text {
    //add new user to password hash
    if (passwordHashDoctorMap.containsKey(username)) {
      return "Username already exists";
    };
    passwordHashDoctorMap.add(username, {
      username = passwordHash;
      passwordHash = passwordHash;
      name = passwordHash;
      qualification = passwordHash;
      gmail = passwordHash;
      phone = passwordHash;
      role = passwordHash;
      mustChangePassword = false;
      createdAt = 0;
    });
    //add new SSO connection
    ssoDoctors.add(username, passwordHash);
    "ok";
  };

  public shared ({ caller }) func getAllDoctorAccounts() : async [DoctorAccount] {
    let doctorAccounts = passwordHashDoctorMap.values().toArray();
    if (doctorAccounts.size() == 0) {
      Runtime.trap("No Doctor accounts are existing");
    };
    doctorAccounts;
  };
};
