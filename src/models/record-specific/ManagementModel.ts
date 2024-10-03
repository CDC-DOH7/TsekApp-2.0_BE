import ManagementParamsInterface from "../../interfaces/misc/ManagementParamsInterface";
import ManagementSearchFilterInterface from "../../interfaces/search_filters/ManagementSearchFilterInterface";
import TableNames from "../../common/constants/TableNames";

// Decide on who can access
import officerDb from "../../connections/OfficerConnection";
import supervisorDb from "../../connections/SupervisorConnection";
import { QueryResult } from "mysql2";

// # --- Begin Operations for Management Models --- #
const officerSearchManagement = async (
  searchFilter: ManagementSearchFilterInterface
): Promise<QueryResult> => {
  const {
    mngm_id,
    patient_id,
    mngm_date_followup_startdate,
    mngm_date_followup_enddate,
  } = searchFilter;

  let query = `SELECT * FROM ${TableNames.MANAGEMENT_TABLE} WHERE mgm_id = ?`;
  const queryParams: any[] = [mngm_id]; // Initial wildcard for cl_id

  // Add wildcard searches for each field
  if (patient_id) {
    query += " AND patient_id LIKE ?";
    queryParams.push(patient_id);
  }
  if (mngm_date_followup_startdate) {
    query += " AND mngm_date_followup >= ?";
    queryParams.push(mngm_date_followup_startdate);
  }
  if (mngm_date_followup_enddate) {
    query += " AND mngm_date_followup <= ?";
    queryParams.push(mngm_date_followup_enddate);
  }

  // officer-specific
  try {
    const [results] = await (await officerDb).query(query, queryParams);
    return results;
  } catch (err) {
    throw err;
  }
};

// Create consultation record
const officerCreateManagement = async (
  management: ManagementParamsInterface
): Promise<QueryResult> => {
  const query = `INSERT INTO ${TableNames.MANAGEMENT_TABLE}
  (mngm_id, 
  patient_id, 
  mngm_lifestyle_mod, 
  mngm_med_antihypertensive,
  mngm_med_antidiabetes, 
  mngm_date_followup, 
  mngm_remarks) 
  VALUES (?, ?, ?, ?, ?, ?, ?)`;

  // officer-specific
  try {
    const [result] = await (
      await officerDb
    ).query(query, [
      management.mngm_id,
      management.patient_id,
      management.mngm_lifestyle_mod,
      management.mngm_med_antihypertensive,
      management.mngm_med_antidiabetes,
      management.mngm_date_followup,
      management.mngm_remarks,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

// # ---- Supervisor Functions ---- #
const supervisorSearchManagement = async (
  searchFilter: ManagementSearchFilterInterface
): Promise<QueryResult> => {
  const {
    mngm_id,
    patient_id,
    mngm_date_followup_startdate,
    mngm_date_followup_enddate,
  } = searchFilter;

  let query = `SELECT * FROM ${TableNames.MANAGEMENT_TABLE} WHERE mngm_id = ?`;
  const queryParams: any[] = [mngm_id]; // Initial wildcard for mngm_id

  // Add wildcard searches for each field
  if (patient_id) {
    query += " AND patient_id LIKE ?";
    queryParams.push(patient_id);
  }
  if (mngm_date_followup_startdate) {
    query += " AND mngm_date_followup >= ?";
    queryParams.push(mngm_date_followup_startdate);
  }
  if (mngm_date_followup_enddate) {
    query += " AND mngm_date_followup <= ?";
    queryParams.push(mngm_date_followup_enddate);
  }

  // supervisor-specific
  try {
    const [results] = await (await supervisorDb).query(query, queryParams);
    return results;
  } catch (err) {
    throw err;
  }
};

// Update consultation record
const supervisorUpdateManagement = async (
  management: ManagementParamsInterface
): Promise<QueryResult> => {
  const query = `UPDATE ${TableNames.MANAGEMENT_TABLE} SET 
  mngm_lifestyle_mod = ?, 
  mngm_med_antihypertensive = ?, 
  mngm_med_antidiabetes = ?, 
  mngm_date_followup = ?, 
  mngm_remarks = ? 
  WHERE mngm_id = ? AND patient_id = ?`;

  // supervisor-specific
  try {
    const [result] = await (
      await supervisorDb
    ).query(query, [
      management.mngm_lifestyle_mod,
      management.mngm_med_antihypertensive,
      management.mngm_med_antidiabetes,
      management.mngm_date_followup,
      management.mngm_remarks,
      management.mngm_id,
      management.patient_id,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

// Delete consultation record
const supervisorDeleteManagement = async (
  mngm_id: string
): Promise<QueryResult> => {
  const query = `DELETE FROM ${TableNames.MANAGEMENT_TABLE} WHERE mngm_id = ?`;
  // supervisor-specific
  try {
    const [result] = await (await supervisorDb).query(query, [mngm_id]);
    return result;
  } catch (err) {
    throw err;
  }
};

export default {
  officerSearchManagement,
  officerCreateManagement,
  supervisorSearchManagement,
  supervisorUpdateManagement,
  supervisorDeleteManagement,
};
