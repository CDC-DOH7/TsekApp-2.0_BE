import PatientInfoParamsInterface from "../../../interfaces/misc/risk-assessment-form/PatientInfoParamsInterface";
import PatientInfoSearchFilterInterface from "../../../interfaces/search_filters/specific-search/risk-assessment-form/PatientInfoSearchFilterInterface";
import TableNames from "../../../common/constants/TableNames";

// Decide on who can access
import officerDb from "../../../connections/OfficerConnection";
import supervisorDb from "../../../connections/SupervisorConnection";
import { PatientInfo } from "../../../types/record-based/PatientInfo";
import PatientInfoDeletionInterface from "../../../interfaces/deletion_params/risk-assessment-form/PatientInfoDeletionInterface";

// # --- Begin Operations for Past Medical Records Models --- #
const officerSearchPatientInfo = async (
  searchFilter: PatientInfoSearchFilterInterface
): Promise<any> => {
  const {
    patient_id,
    patient_fname,
    patient_mname,
    patient_lname,
    patient_suffix,
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
  if (patient_suffix) {
    query += " AND patient_suffix LIKE ?";
    queryParams.push(patient_suffix);
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
  try {
    const [results] = await (await officerDb).query(query, queryParams);
    return results;
  } catch (err) {
    throw err;
  }
};

// Create consultation record
const officerCreatePatientInfo = async (
  patientInfo: PatientInfoParamsInterface
) => {
  // Query to check if the patient already exists with the same name and birthdate and hf_id
  const checkQuery = `SELECT COUNT(*) as count FROM ${TableNames.PATIENT_INFO_TABLE}
    WHERE patient_fname = ? AND patient_mname = ? AND patient_lname = ? AND patient_dob = ? AND hf_id = ?`;

  // officer-specific
  try {
    const [checkResult] = await (
      await officerDb
    ).query<PatientInfo[]>(checkQuery, [
      patientInfo.patient_fname,
      patientInfo.patient_mname,
      patientInfo.patient_lname,
      patientInfo.patient_suffix,
      patientInfo.patient_dob, // Include birthdate in the check
      patientInfo.hf_id // Check against hf_id
    ]);

		console.log(checkResult);

    // Check if a record exists
    const recordExists = checkResult[0].count > 0;

    if (recordExists) {
      // If a record exists, do not insert
      throw new Error(
        "Patient with this name, birthdate, and hf_id already exists."
      );
    }

    // Proceed with insert if no record exists
    const insertQuery = `INSERT INTO ${TableNames.PATIENT_INFO_TABLE}
    (patient_id,
    patient_fname,
    patient_mname,
    patient_lname,
    patient_suffix,
    patient_date_assess, 
    patient_age, 
    patient_age_group_id,
    patient_sex,
    patient_dob,
    patient_civil_status,
    patient_religion_id,
    patient_contact_no,
    patient_street,
    patient_purok,
    patient_sitio,
    brgy_id,
    muncity_id,
    province_id,
    patient_phic_no,
    patient_pwd_no,
    patient_emp_status,
    patient_ip,
    patient_ethnicity_id,
    hf_id) VALUES (
     ?, ?, ?, ?, ?, 
     ?, ?, ?, ?, ?,
     ?, ?, ?, ?, ?, 
     ?, ?, ?, ?, ?, 
     ?, ?, ?, ?, ?)`;

    const [insertResult] = await (
      await officerDb
    ).query(insertQuery, [
      patientInfo.patient_id,
      patientInfo.patient_fname,
      patientInfo.patient_mname,
      patientInfo.patient_lname,
      patientInfo.patient_suffix,
      patientInfo.patient_date_assess,
      patientInfo.patient_age,
      patientInfo.patient_age_group_id,
      patientInfo.patient_sex,
      patientInfo.patient_dob,
      patientInfo.patient_civil_status,
      patientInfo.patient_religion_id,
      patientInfo.patient_contact_no,
      patientInfo.patient_street,
      patientInfo.patient_purok,
      patientInfo.patient_sitio,
      patientInfo.brgy_id,
      patientInfo.muncity_id,
      patientInfo.province_id,
      patientInfo.patient_phic_no,
      patientInfo.patient_pwd_no,
      patientInfo.patient_emp_status,
      patientInfo.patient_ip,
      patientInfo.patient_ethnicity_id,
      patientInfo.hf_id,
    ]);

    return insertResult;
  } catch (err) {
    throw err;
  }
};

// # ---- Supervisor Functions ---- #
const supervisorSearchPatientInfo = async (
  searchFilter: PatientInfoSearchFilterInterface
) => {
  const {
    patient_id,
    patient_fname,
    patient_mname,
    patient_lname,
    patient_suffix,
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
  if (patient_suffix) {
    query += " AND patient_suffix LIKE ?";
    queryParams.push(patient_suffix);
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
  try {
    const [results] = await (await supervisorDb).query(query, queryParams);
    return results;
  } catch (err) {
    throw err;
  }
};

// Update consultation record
const supervisorUpdatePatientInfo = async (
  patientInfo: PatientInfoParamsInterface
) => {
  const query = `UPDATE ${TableNames.PATIENT_INFO_TABLE} SET 
  patient_fname = ?,
  patient_mname = ?, 
  patient_lname = ?,
  patient_suffix = ?, 
  patient_date_assess = ?,
  patient_age = ?, 
  patient_age_group = ?,
  patient_sex = ?,
  patient_dob = ?,
  patient_civil_status = ?,
  patient_religion_id = ?,
  patient_contact_no = ?,
  patient_street = ?,
  patient_purok = ?, 
  patient_sitio = ?, 
  brgy_id = ?, 
  patient_brgy = ?,
  muncity_id = ?, 
  patient_muncity = ?, 
  province_id = ?, 
  patient_province = ?, 
  patient_phic_no = ?,
  patient_pwd_no = ?, 
  patient_emp_status = ?, 
  patient_ip = ?, 
  patient_ethinicity_id = ?
  WHERE patient_id = ? AND hf_id = ?`;

  // supervisor-specific
  try {
    const [result] = await (
      await supervisorDb
    ).query(query, [
      patientInfo.patient_fname,
      patientInfo.patient_mname,
      patientInfo.patient_lname,
      patientInfo.patient_suffix,
      patientInfo.patient_date_assess,
      patientInfo.patient_age,
      patientInfo.patient_age_group_id,
      patientInfo.patient_sex,
      patientInfo.patient_dob,
      patientInfo.patient_civil_status,
      patientInfo.patient_religion_id,
      patientInfo.patient_contact_no,
      patientInfo.patient_street,
      patientInfo.patient_purok,
      patientInfo.patient_sitio,
      patientInfo.brgy_id,
      patientInfo.muncity_id,
      patientInfo.province_id,
      patientInfo.patient_phic_no,
      patientInfo.patient_pwd_no,
      patientInfo.patient_emp_status,
      patientInfo.patient_ip,
      patientInfo.patient_ethnicity_id,
      patientInfo.patient_id,
      patientInfo.hf_id,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

// Delete consultation record
const supervisorDeletePatientInfo = async (
  patientInfoDeletion: PatientInfoDeletionInterface
) => {
  const query = `DELETE FROM ${TableNames.PATIENT_INFO_TABLE} WHERE patient_id = ? AND hf_id = ?`;
  const { patient_id, hf_id } = patientInfoDeletion;
  // supervisor-specific
  try {
    const [result] = await (
      await supervisorDb
    ).query(query, [patient_id, hf_id]);
    return result;
  } catch (err) {
    throw err;
  }
};

export default {
  officerSearchPatientInfo,
  officerCreatePatientInfo,
  supervisorSearchPatientInfo,
  supervisorUpdatePatientInfo,
  supervisorDeletePatientInfo,
};
