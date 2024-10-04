import ConsultationParamsInterface from "../../interfaces/misc/ConsultationLogParamsInterface";
import ConsultationLogSearchFilterInterface from "../../interfaces/search_filters/ConsultationLogSearchFilterInterface";
import TableNames from "../../common/constants/TableNames";

// Decide on who can access
import officerDb from "../../connections/OfficerConnection";
import supervisorDb from "../../connections/SupervisorConnection";
import { QueryResult } from "mysql2";
import ConsultationLogDeletionInterface from "../../interfaces/deletion_params/ConsultationLogDeletionInterface";

// # --- Begin Operations for Consultation Log Models --- #
const officerSearchConsultationLog = async(
  searchFilter: ConsultationLogSearchFilterInterface,
): Promise<QueryResult> => {
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
  try {
    const [results] = await (await officerDb).query(query, queryParams);
    return results;
  } catch (err) {
    throw err;
  }
};

// Create consultation record
const officerCreateConsultationLog = async(
  consultation: ConsultationParamsInterface,
): Promise<QueryResult> => {
  const query = `INSERT INTO ${TableNames.CONSULTATION_LOGS_TABLE}
  (cl_id, 
  cl_description, 
  cl_date, 
  patient_id, 
  officer_id, 
  hf_id, 
  ref_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;


  // officer-specific
  try {
    const [result] = await (
      await officerDb
    ).query(query, [
      consultation.cl_id,
      consultation.cl_description,
      consultation.cl_date,
      consultation.patient_id,
      consultation.officer_id,
      consultation.hf_id,
      consultation.ref_id,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

// # ---- Supervisor Functions ---- # //
const supervisorSearchConsultationLog = async(
  searchFilter: ConsultationLogSearchFilterInterface,
): Promise<QueryResult> => {
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
  try {
    const [results] = await (await supervisorDb).query(query, queryParams);
    return results;
  } catch (err) {
    throw err;
  }
};

// Update consultation record
const supervisorUpdateConsultationLog = async(
  consultation: ConsultationParamsInterface,
): Promise<QueryResult> => {
  const query = `UPDATE ${TableNames.CONSULTATION_LOGS_TABLE} 
  SET cl_description = ?, 
  cl_date = ?, 
  officer_id = ?, 
  ref_id = ? 
  WHERE cl_id = ? AND patient_id = ? AND hf_id = ?`;

    // supervisor-specific
    try {
      const [result] = await (await supervisorDb).query(query, [
        consultation.cl_description,
        consultation.cl_date,
        consultation.officer_id,
        consultation.ref_id,
        consultation.cl_id,
        consultation.patient_id,
        consultation.hf_id
      ]);
      return result;
    } catch (err) {
      throw err;
    }
};

// Delete consultation record
const supervisorDeleteConsultationLog = async(
  consultationLogDeletion: ConsultationLogDeletionInterface,
): Promise<QueryResult> => {
  const query = `DELETE FROM ${TableNames.CONSULTATION_LOGS_TABLE} WHERE cl_id = ?`;
  const {cl_id, patient_id, hf_id} = consultationLogDeletion;

  // supervisor-specific
  try {
    const [result] = await (await supervisorDb).query(query, [cl_id, patient_id, hf_id]);
    return result;
  } catch (err) {
    throw err;
  }
};

export default {
  officerSearchConsultationLog,
  officerCreateConsultationLog,
  supervisorSearchConsultationLog,
  supervisorUpdateConsultationLog,
  supervisorDeleteConsultationLog,
};