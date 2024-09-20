import PatientInfoParamsInterface from "../../interfaces/misc/PatientInfoParamsInterface";
import PatientInfoSearchFilterInterface from "../../interfaces/search_filters/PatientInfoSearchFilterInterface";
import TableNames from "../../common/constants/TableNames";

// Decide on who can access
import officerDb from "../user-specific/OfficerModel";
import supervisorDb from "../user-specific/SupervisorModel";

// # --- Begin Operations for Past Medical Records Models --- #
const officerSearchPatientInfo = (
  searchFilter: PatientInfoSearchFilterInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const {
    patient_id,
    patient_fname,
    patient_mname,
    patient_lname,
    patient_date_assess_startDate,
    patient_date_assess_endDate,
    hf_id,
  } = searchFilter;

  let query = `SELECT * FROM ${TableNames.PATIENT_INFO_TABLE} WHERE hf_id = ?`;
  const queryParams: any[] = [hf_id]; // Initial wildcard for hf_id

  // Add wildcard searches for each field
  if (patient_id) {
    query += " AND patient_id LIKE ?";
    queryParams.push(patient_id);
  }
  if (patient_fname) {
    query += " AND patient_fname LIKE ?";
    queryParams.push(patient_fname);
  }
  if (patient_mname) {
    query += " AND patient_mname LIKE ?";
    queryParams.push(patient_mname);
  }
  if (patient_lname) {
    query += " AND patient_lname LIKE ?";
    queryParams.push(patient_lname);
  }
  if (patient_date_assess_startDate) {
    query += " AND patient_date_assess >= ?";
    queryParams.push(patient_date_assess_startDate);
  }
  if (patient_date_assess_endDate) {
    query += " AND patient_date_assess <= ?";
    queryParams.push(patient_date_assess_endDate);
  }

  // sort the results from latest
  query += " ORDER BY patient_date_assess DESC";

  // officer-specific
  officerDb.query(query, queryParams, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

// Create consultation record
const officerCreatePatientInfo = (
  patientInfo: PatientInfoParamsInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `INSERT INTO ${TableNames.PATIENT_INFO_TABLE}
  (patient_id, patient_fname, patient_mname, patient_lname,
  patient_date_assess, patient_age, hf_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  // officer-specific
  officerDb.query(
    query,
    [
      patientInfo.patient_id,
      patientInfo.patient_fname,
      patientInfo.patient_mname,
      patientInfo.patient_lname,
      patientInfo.patient_date_assess,
      patientInfo.patient_age,
      patientInfo.hf_id,
    ],
    callback
  );
};

// # ---- Supervisor Functions ---- #
const supervisorSearchPatientInfo = (
  searchFilter: PatientInfoSearchFilterInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const {
    patient_id,
    patient_fname,
    patient_mname,
    patient_lname,
    patient_date_assess_startDate,
    patient_date_assess_endDate,
    hf_id,
  } = searchFilter;

  let query = `SELECT * FROM ${TableNames.PATIENT_INFO_TABLE} WHERE hf_id = ?`;
  const queryParams: any[] = [hf_id]; // Initial wildcard for hf_id

  // Add wildcard searches for each field
  if (patient_id) {
    query += " AND patient_id LIKE ?";
    queryParams.push(patient_id);
  }
  if (patient_fname) {
    query += " AND patient_fname LIKE ?";
    queryParams.push(patient_fname);
  }
  if (patient_mname) {
    query += " AND patient_mname LIKE ?";
    queryParams.push(patient_mname);
  }
  if (patient_lname) {
    query += " AND patient_lname LIKE ?";
    queryParams.push(patient_lname);
  }
  if (patient_date_assess_startDate) {
    query += " AND patient_date_assess >= ?";
    queryParams.push(patient_date_assess_startDate);
  }
  if (patient_date_assess_endDate) {
    query += " AND patient_date_assess <= ?";
    queryParams.push(patient_date_assess_endDate);
  }

  // sort the results from latest
  query += " ORDER BY patient_date_assess DESC";

  // supervisor-specific
  supervisorDb.query(query, queryParams, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

// Update consultation record
const supervisorUpdatePatientInfo = (
  patientInfo: PatientInfoParamsInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `UPDATE ${TableNames.PATIENT_INFO_TABLE} SET patient_fname,
  patient_mname = ?, patient_lname = ?, patient_date_assess = ?,
  patient_age = ? WHERE patient_id = ?`;

  // supervisor-specific
  supervisorDb.query(
    query,
    [
      patientInfo.patient_fname,
      patientInfo.patient_mname,
      patientInfo.patient_lname,
      patientInfo.patient_date_assess,
      patientInfo.patient_age,
      patientInfo.patient_id,
    ],
    callback
  );
};

// Delete consultation record
const supervisorDeletePatientInfo = (
  patient_id: string,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `DELETE FROM ${TableNames.PATIENT_INFO_TABLE} WHERE patient_id = ?`;
  supervisorDb.query(query, [patient_id], callback);
};

export default {
  officerSearchPatientInfo,
  officerCreatePatientInfo,
  supervisorSearchPatientInfo,
  supervisorUpdatePatientInfo,
  supervisorDeletePatientInfo,
};
