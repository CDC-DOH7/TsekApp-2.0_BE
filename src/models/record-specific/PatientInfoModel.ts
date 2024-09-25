import PatientInfoParamsInterface from "../../interfaces/misc/PatientInfoParamsInterface";
import PatientInfoSearchFilterInterface from "../../interfaces/search_filters/PatientInfoSearchFilterInterface";
import TableNames from "../../common/constants/TableNames";

// Decide on who can access
import officerDb from "../user-specific/OfficerModel";
import supervisorDb from "../user-specific/SupervisorModel";
import PatientInfoDeletionInterface from "../../interfaces/misc/PatientInfoDeletionInterface";

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
    patient_date_assess_startdate,
    patient_date_assess_enddate,
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
  if (patient_date_assess_startdate) {
    query += " AND patient_date_assess >= ?";
    queryParams.push(patient_date_assess_startdate);
  }
  if (patient_date_assess_enddate) {
    query += " AND patient_date_assess <= ?";
    queryParams.push(patient_date_assess_enddate);
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
    patient_date_assess_startdate,
    patient_date_assess_enddate,
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
  if (patient_date_assess_startdate) {
    query += " AND patient_date_assess >= ?";
    queryParams.push(patient_date_assess_startdate);
  }
  if (patient_date_assess_enddate) {
    query += " AND patient_date_assess <= ?";
    queryParams.push(patient_date_assess_enddate);
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
  patient_age = ?, patient_age_group = ?, patient_sex = ?, patient_dob,
  patient_civil_status = ?, patient_religion, patient_contact_no,
  patient_street, patient_purok, patient_sitio, brgy_id, patient_brgy,
  muncity_id, patient_muncity, province_id, patient_province, patient_phic_no,
  patient_pwd_no, patient_emp_status, patient_ip, patient_ip_ethinicity WHERE patient_id = ? AND hf_id = ?`;

  // supervisor-specific
  supervisorDb.query(
    query,
    [
      patientInfo.patient_fname,
      patientInfo.patient_mname,
      patientInfo.patient_lname,
      patientInfo.patient_date_assess,
      patientInfo.patient_age,
      patientInfo.patient_age_group,
      patientInfo.patient_sex,
      patientInfo.patient_dob,
      patientInfo.patient_civil_status,
      patientInfo.patient_religion,
      patientInfo.patient_contact_no,
      patientInfo.patient_street,
      patientInfo.patient_purok,
      patientInfo.patient_sitio,
      patientInfo.brgy_id,
      patientInfo.patient_brgy,
      patientInfo.muncity_id,
      patientInfo.patient_muncity,
      patientInfo.province_id,
      patientInfo.patient_province,
      patientInfo.patient_phic_no,
      patientInfo.patient_pwd_no,
      patientInfo.patient_emp_status,
      patientInfo.patient_ip,
      patientInfo.patient_ip_ethinicity,
      patientInfo.patient_id,
      patientInfo.hf_id,
    ],
    callback
  );
};



// Delete consultation record
const supervisorDeletePatientInfo = (
  deletionParameters: PatientInfoDeletionInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `DELETE FROM ${TableNames.PATIENT_INFO_TABLE} WHERE patient_id = ? AND hf_id = ?`;
  supervisorDb.query(query, [deletionParameters.patient_id, deletionParameters.hf_id], callback);
};

export default {
  officerSearchPatientInfo,
  officerCreatePatientInfo,
  supervisorSearchPatientInfo,
  supervisorUpdatePatientInfo,
  supervisorDeletePatientInfo,
};
