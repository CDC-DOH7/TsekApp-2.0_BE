import ManagementParamsInterface from "../../interfaces/misc/ManagementParamsInterface";
import ManagementSearchFilterInterface from "../../interfaces/search_filters/ManagementFilterInterface";
import TableNames from "../../common/constants/TableNames";

// Decide on who can access
import officerDb from "../user-based/OfficerModel";
import supervisorDb from "../user-based/SupervisorModel";

// # --- Begin Operations for Management Models --- #
const officerSearchManagement = (
  searchFilter: ManagementSearchFilterInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const { mgm_id, patient_id, mngm_diagnosis_date, mngm_followup_date } =
    searchFilter;

  let query = `SELECT * FROM ${TableNames.MANAGEMENT_TABLE} WHERE mgm_id = ?`;
  const queryParams: any[] = [mgm_id]; // Initial wildcard for cl_id

  // Add wildcard searches for each field
  if (patient_id) {
    query += " AND patient_id LIKE ?";
    queryParams.push(patient_id);
  }
  if (mngm_diagnosis_date) {
    query += " AND mngm_diagnosis_date LIKE ?";
    queryParams.push(mngm_diagnosis_date);
  }
  if (mngm_followup_date) {
    query += " AND mngm_followup_date LIKE ?";
    queryParams.push(mngm_followup_date);
  }

  // officer-specific
  officerDb.query(query, queryParams, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

// Create consultation record
const officerCreateManagement = (
  management: ManagementParamsInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `INSERT INTO ${TableNames.MANAGEMENT_TABLE}
  (mngm_id, patient_id, mngm_diagnosis, mngm_diagnosis_date,
   mngm_medication_prescription, mngm_followup_date, 
   mngm_referral, mngm_notes) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  // officer-specific
  officerDb.query(
    query,
    [
      management.mngm_id,
      management.patient_id,
      management.mngm_diagnosis,
      management.mngm_diagnosis_date,
      management.mngm_medication_prescription,
      management.mngm_followup_date,
      management.mngm_referral,
      management.mngm_notes,
    ],
    callback
  );
};

// # ---- Supervisor Functions ---- #

export const supervisorSearchManagement = (
  searchFilter: ManagementSearchFilterInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const { mgm_id, patient_id, mngm_diagnosis_date, mngm_followup_date } =
    searchFilter;

  let query = `SELECT * FROM ${TableNames.MANAGEMENT_TABLE} WHERE mgm_id = ?`;
  const queryParams: any[] = [mgm_id]; // Initial wildcard for cl_id

  // Add wildcard searches for each field
  if (patient_id) {
    query += " AND patient_id LIKE ?";
    queryParams.push(patient_id);
  }
  if (mngm_diagnosis_date) {
    query += " AND mngm_diagnosis_date LIKE ?";
    queryParams.push(mngm_diagnosis_date);
  }
  if (mngm_followup_date) {
    query += " AND mngm_followup_date LIKE ?";
    queryParams.push(mngm_followup_date);
  }

  // officer-specific
  supervisorDb.query(query, queryParams, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

// Update consultation record
const supervisorUpdateManagement = (
  management: ManagementParamsInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `UPDATE ${TableNames.MANAGEMENT_TABLE} SET mngm_diagnosis = ?, 
  mngm_diagnosis_date = ?, mngm_medication_prescription = ?, mngm_followup_date = ?, 
  mngm_referral = ?, mngm_notes = ? WHERE mngm_id = ?`;

  // supervisor-specific
  supervisorDb.query(
    query,
    [
      management.mngm_diagnosis,
      management.mngm_diagnosis_date,
      management.mngm_medication_prescription,
      management.mngm_followup_date,
      management.mngm_referral,
      management.mngm_notes,
      management.mngm_id,
    ],
    callback
  );
};

// Delete consultation record
const supervisorDeleteManagement = (
  mngm_id: string,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `DELETE FROM ${TableNames.MANAGEMENT_TABLE} WHERE fh_id = ?`;
  supervisorDb.query(query, [mngm_id], callback);
};

export default {
  officerSearchManagement,
  officerCreateManagement,
  supervisorSearchManagement,
  supervisorUpdateManagement,
  supervisorDeleteManagement,
};
