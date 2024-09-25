import PastMedicalHistoryParamsInterface from "../../interfaces/misc/PastMedicalHistoryParamsInterface";
import PastMedicalHistorySearchFilterInterface from "../../interfaces/search_filters/PastMedicalHistorySearchFilterInterface";
import TableNames from "../../common/constants/TableNames";

// Decide on who can access
import officerDb from "../user-specific/OfficerModel";
import supervisorDb from "../user-specific/SupervisorModel";

// # --- Begin Operations for Past Medical Records Models --- #
const officerSearchPastMedicalHistory = (
  searchFilter: PastMedicalHistorySearchFilterInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const { pmh_id, patient_id } = searchFilter;

  let query = `SELECT * FROM ${TableNames.PAST_MEDICAL_HISTORY_TABLE} WHERE pmh_id = ?`;
  const queryParams: any[] = [pmh_id]; // Initial wildcard for cl_id

  // Add wildcard searches for each field
  if (patient_id) {
    query += " AND patient_id LIKE ?";
    queryParams.push(patient_id);
  }

  // sort the results from latest
  query += " ORDER BY patient_id DESC";

  // officer-specific
  officerDb.query(query, queryParams, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

// Create consultation record
const officerCreatePastMedicalHistory = (
  pastMedicalHistory: PastMedicalHistoryParamsInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `INSERT INTO ${TableNames.PAST_MEDICAL_HISTORY_TABLE}
  (pmh_id, patient_id, pmh_hypertension, pmh_heart_disease,
  pmh_diabetes, pmh_specify_diabetes, pmh_cancer, pmh_specify_cancer,
  pmh_copd, pmh_asthma, pmh_allergies, pmh_specify_allergy,
  pmh_disorders, pmh_specify_disorder, pmh_vision_problems,
  pmh_previous_surgical_history, pmh_specify_surgical_history,
  pmh_thyroid_disorder, pmh_kidney_disorder) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)`;

  // officer-specific
  officerDb.query(
    query,
    [
      pastMedicalHistory.pmh_id,
      pastMedicalHistory.patient_id,
      pastMedicalHistory.pmh_hypertension,
      pastMedicalHistory.pmh_heart_disease,
      pastMedicalHistory.pmh_diabetes,
      pastMedicalHistory.pmh_specify_diabetes,
      pastMedicalHistory.pmh_cancer,
      pastMedicalHistory.pmh_specify_cancer,
      pastMedicalHistory.pmh_copd,
      pastMedicalHistory.pmh_asthma,
      pastMedicalHistory.pmh_allergies,
      pastMedicalHistory.pmh_specify_allergy,
      pastMedicalHistory.pmh_disorders,
      pastMedicalHistory.pmh_specify_disorder,
      pastMedicalHistory.pmh_vision_problems,
      pastMedicalHistory.pmh_previous_surgical_history,
      pastMedicalHistory.pmh_specify_surgical_history,
      pastMedicalHistory.pmh_thyroid_disorder,
      pastMedicalHistory.pmh_kidney_disorder,
    ],
    callback
  );
};

// # ---- Supervisor Functions ---- #
const supervisorSearchPastMedicalHistory = (
  searchFilter: PastMedicalHistorySearchFilterInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const { pmh_id, patient_id } = searchFilter;

  let query = `SELECT * FROM ${TableNames.PAST_MEDICAL_HISTORY_TABLE} WHERE pmh_id = ?`;
  const queryParams: any[] = [pmh_id]; // Initial wildcard for pmh_id

  // Add wildcard searches for each field
  if (patient_id) {
    query += " AND patient_id LIKE ?";
    queryParams.push(patient_id);
  }

  // sort the results from latest
  query += " ORDER BY patient_id DESC";

  // officer-specific
  supervisorDb.query(query, queryParams, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

// Update consultation record
const supervisorUpdatePastMedicalHistory = (
  pastMedicalHistory: PastMedicalHistoryParamsInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `UPDATE ${TableNames.PAST_MEDICAL_HISTORY_TABLE} SET pmh_hypertension,
  pmh_heart_disease = ?, pmh_diabetes = ?, pmh_specify_diabetes = ?,
  pmh_cancer = ?, pmh_specify_cancer = ?, pmh_copd = ?,
  pmh_asthma = ?, pmh_allergies = ?, pmh_specify_allergy = ?,
  pmh_disorders = ?, pmh_specify_disorder = ?,
  pmh_vision_problems = ?, pmh_previous_surgical_history = ?,
  pmh_specify_surgical_history = ?, pmh_thyroid_disorder = ?,
  pmh_kidney_disorder = ? WHERE pmh_id = ? AND patient_id = ?`;

  // supervisor-specific
  supervisorDb.query(
    query,
    [ 
      pastMedicalHistory.pmh_hypertension,
      pastMedicalHistory.pmh_heart_disease,
      pastMedicalHistory.pmh_diabetes,
      pastMedicalHistory.pmh_specify_diabetes,
      pastMedicalHistory.pmh_cancer,
      pastMedicalHistory.pmh_specify_cancer,
      pastMedicalHistory.pmh_copd,
      pastMedicalHistory.pmh_asthma,
      pastMedicalHistory.pmh_allergies,
      pastMedicalHistory.pmh_specify_allergy,
      pastMedicalHistory.pmh_disorders,
      pastMedicalHistory.pmh_specify_disorder,
      pastMedicalHistory.pmh_vision_problems,
      pastMedicalHistory.pmh_previous_surgical_history,
      pastMedicalHistory.pmh_specify_surgical_history,
      pastMedicalHistory.pmh_thyroid_disorder,
      pastMedicalHistory.pmh_kidney_disorder,
      pastMedicalHistory.pmh_id,
      pastMedicalHistory.patient_id,
    ],
    callback
  );
};

// Delete consultation record
const supervisorDeletePastMedicalHistory = (
  pmh_id: string,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `DELETE FROM ${TableNames.PAST_MEDICAL_HISTORY_TABLE} WHERE pmh_id = ?`;
  supervisorDb.query(query, [pmh_id], callback);
};

export default {
  officerSearchPastMedicalHistory,
  officerCreatePastMedicalHistory,
  supervisorSearchPastMedicalHistory,
  supervisorUpdatePastMedicalHistory,
  supervisorDeletePastMedicalHistory,
};
