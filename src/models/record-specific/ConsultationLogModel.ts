import ConsultationParamsInterface from "../../interfaces/misc/ConsultationParamsInterface";
import ConsultationLogSearchFilterInterface from "../../interfaces/search_filters/ConsultationLogSearchFilterInterface";
import TableNames from "../../common/constants/TableNames";

// Decide on who can access
import officerDb from "../user-specific/OfficerModel";
import supervisorDb from "../user-specific/SupervisorModel";

// # --- Begin Operations for Consultation Log Models --- #
const officerSearchConsultationLog = (
  searchFilter: ConsultationLogSearchFilterInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const {
    cl_date_startDate,
    cl_date_endDate,
    hf_id,
    cl_id,
    patient_id,
    officer_id,
    ref_id,
  } = searchFilter;

  let query = `SELECT * FROM ${TableNames.CONSULTATION_LOGS_TABLE} WHERE hf_id = ?`;
  const queryParams: any[] = [hf_id]; // Initial wildcard for cl_id

  // Add wildcard searches for each field
  if (cl_date_startDate) {
    query += " AND cl_date >= ?";
    queryParams.push(cl_date_startDate);
  }
  if (cl_date_endDate) {
    query += " AND cl_date <= ?";
    queryParams.push(cl_date_endDate);
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
const officerCreateConsultationLog = (
  consultation: ConsultationParamsInterface,
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

// # ---- Supervisor Functions ---- # //
const supervisorSearchConsultationLog = (
  searchFilter: ConsultationLogSearchFilterInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const {
    cl_date_startDate,
    cl_date_endDate,
    hf_id,
    cl_id,
    patient_id,
    officer_id,
    ref_id,
  } = searchFilter;

  let query = `SELECT * FROM ${TableNames.CONSULTATION_LOGS_TABLE} WHERE hf_id = ?`;
  const queryParams: any[] = [hf_id]; // Initial wildcard for cl_id

  // Add wildcard searches for each field
  if (cl_date_startDate) {
    query += " AND cl_date >= ?";
    queryParams.push(cl_date_startDate);
  }
  if (cl_date_endDate) {
    query += " AND cl_date <= ?";
    queryParams.push(cl_date_endDate);
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

  // supervisor-specific
  supervisorDb.query(query, queryParams, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

// Update consultation record
const supervisorUpdateConsultationLog = (
  consultation: ConsultationParamsInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `UPDATE ${TableNames.CONSULTATION_LOGS_TABLE} 
  SET cl_description = ?, cl_date = ?, officer_id = ?, 
  ref_id = ? WHERE cl_id = ? AND patient_id = ? AND hf_id = ?`;

  // supervisor-specific
  supervisorDb.query(
    query,
    [
      consultation.cl_description,
      consultation.cl_date,
      consultation.officer_id,
      consultation.ref_id,
      consultation.cl_id,
      consultation.patient_id,
      consultation.hf_id
    ],
    callback
  );
};

// Delete consultation record
const supervisorDeleteConsultationLog = (
  cl_id: string,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `DELETE FROM ${TableNames.CONSULTATION_LOGS_TABLE} 
  WHERE cl_id = ?`;

  supervisorDb.query(query, [cl_id], callback);
};

export default {
  officerSearchConsultationLog,
  officerCreateConsultationLog,
  supervisorSearchConsultationLog,
  supervisorUpdateConsultationLog,
  supervisorDeleteConsultationLog,
};