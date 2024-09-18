import FamilyHistoryParamsInterface from "../../interfaces/misc/FamilyHistoryParamsInterface";
import FamilyHistoryLogSearchFilterInterface from "../../interfaces/search_filters/FamilyHistoryLogSearchFilterInterface";
import TableNames from "../../common/constants/TableNames";

// Decide on who can access
import officerDb from "../user-based/officerModel";
import supervisorDb from "../user-based/supervisorModel";

// # --- Begin Operations for FamilyHistory Models --- #
export const officerSearchFamilyHistory = (
  searchFilter: FamilyHistoryLogSearchFilterInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const { startDate, endDate, hf_id, cl_id, patient_id, officer_id, ref_id } =
    searchFilter;

  let query = `SELECT * FROM ${TableNames.FAMILY_HISTORY_TABLE} WHERE hf_id = ?`;
  const queryParams: any[] = [hf_id]; // Initial wildcard for cl_id

  // Add wildcard searches for each field
  if (startDate) {
    query += " AND cl_date >= ?";
    queryParams.push(startDate);
  }
  if (endDate) {
    query += " AND cl_date <= ?";
    queryParams.push(endDate);
  }
  if (cl_id) {
    query += " AND cl_id LIKE ?";
    queryParams.push(`%${cl_id}%`);
  }
  if (patient_id) {
    query += " AND patient_id LIKE ?";
    queryParams.push(`%${patient_id}%`);
  }
  if (officer_id) {
    query += " AND officer_id LIKE ?";
    queryParams.push(`%${officer_id}%`);
  }
  if (ref_id) {
    query += " AND ref_id LIKE ?";
    queryParams.push(`%${ref_id}%`);
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
const officerCreateFamilyHistoryLog = (
  consultation: FamilyHistoryParamsInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `INSERT INTO ${TableNames.CONSULTATION_LOGS_TABLE}(cl_id, cl_description, cl_date, patient_id, officer_id, hf_id, ref_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  // officer-specific
  officerDb.query(
    query,
    [
      consultation.cl_id,
      consultation.cl_description,
      consultation.cl_date,
      consultation.patient_id,
      consultation.officer_id,
      consultation.hf_id,
      consultation.ref_id,
    ],
    callback
  );
};

// Update consultation record
const supervisorUpdateFamilyHistoryLog = (
  consultation: FamilyHistoryParamsInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `UPDATE ${TableNames.CONSULTATION_LOGS_TABLE} SET cl_description = ?, cl_date = ?, patient_id = ?, officer_id = ?, hf_id = ?, ref_id = ? WHERE cl_id = ?`;

  // supervisor-specific
  supervisorDb.query(
    query,
    [
      consultation.cl_description,
      consultation.cl_date,
      consultation.patient_id,
      consultation.officer_id,
      consultation.hf_id,
      consultation.ref_id,
      consultation.cl_id,
    ],
    callback
  );
};

// Delete consultation record
const supervisorDeleteFamilyHistoryLog = (
  cl_id: string,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `DELETE FROM ${TableNames.CONSULTATION_LOGS_TABLE} WHERE cl_id = ?`;
  supervisorDb.query(query, [cl_id], callback);
};

export default {
  officerSearchFamilyHistoryLog,
  officerCreateFamilyHistoryLog,
  supervisorUpdateFamilyHistoryLog,
  supervisorDeleteFamilyHistoryLog,
};
