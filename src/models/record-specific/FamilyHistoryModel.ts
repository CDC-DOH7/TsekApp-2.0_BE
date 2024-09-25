import FamilyHistoryParamsInterface from "../../interfaces/misc/FamilyHistoryParamsInterface";
import FamilyHistorySearchFilterInterface from "../../interfaces/search_filters/FamilyHistorySearchFilterInterface";
import TableNames from "../../common/constants/TableNames";

// Decide on who can access
import officerDb from "../user-specific/OfficerModel";
import supervisorDb from "../user-specific/SupervisorModel";

// # --- Begin Operations for Family History Models --- #
const officerSearchFamilyHistory = (
  searchFilter: FamilyHistorySearchFilterInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const { fh_id, patient_id } = searchFilter;

  let query = `SELECT * FROM ${TableNames.FAMILY_HISTORY_TABLE} WHERE fh_id = ?`;
  const queryParams: any[] = [fh_id]; // Initial wildcard for cl_id

  // Add wildcard searches for each field
  if (patient_id) {
    query += " AND patient_id = ?";
    queryParams.push(patient_id);
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
const officerCreateFamilyHistory = (
  familyHistory: FamilyHistoryParamsInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `INSERT INTO ${TableNames.FAMILY_HISTORY_TABLE}(fh_id, patient_id, fh_hypertension, fh_stroke, fh_heart_disease, fh_diabetes_mellitus, fh_asthma, fh_cancer, fh_kidney_disease, fh_vascular_disease, fh_tb, fh_disorders, fh_copd) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // officer-specific
  officerDb.query(
    query,
    [
      familyHistory.fh_id,
      familyHistory.patient_id,
      familyHistory.fh_hypertension,
      familyHistory.fh_stroke,
      familyHistory.fh_heart_disease,
      familyHistory.fh_diabetes_mellitus,
      familyHistory.fh_asthma,
      familyHistory.fh_cancer,
      familyHistory.fh_kidney_disease,
      familyHistory.fh_vascular_disease,
      familyHistory.fh_tb,
      familyHistory.fh_disorders,
      familyHistory.fh_copd,
    ],
    callback
  );
};

// # ---- Supervisor Functions ---- #
const supervisorSearchFamilyHistory = (
  searchFilter: FamilyHistorySearchFilterInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const { fh_id, patient_id } = searchFilter;

  let query = `SELECT * FROM ${TableNames.FAMILY_HISTORY_TABLE} WHERE fh_id = ?`;
  const queryParams: any[] = [fh_id]; // Initial wildcard for cl_id

  // Add wildcard searches for each field
  if (patient_id) {
    query += " AND patient_id = ?";
    queryParams.push(patient_id);
  }

  // supervisor-specific
  supervisorDb.query(query, queryParams, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};


const supervisorUpdateFamilyHistory = (
  familyHistory: FamilyHistoryParamsInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `UPDATE ${TableNames.FAMILY_HISTORY_TABLE} patient_id = ?, fh_hypertension = ?, fh_stroke = ?, fh_heart_disease = ?, fh_diabetes_mellitus = ?, fh_asthma = ?, fh_cancer = ?, fh_kidney_disease = ?, fh_vascular_disease = ?, fh_tb = ?, fh_disorders = ?, fh_copd = ? WHERE fh_id = ?`;

  // supervisor-specific
  supervisorDb.query(
    query,
    [
      familyHistory.fh_hypertension,
      familyHistory.fh_stroke,
      familyHistory.fh_heart_disease,
      familyHistory.fh_diabetes_mellitus,
      familyHistory.fh_asthma,
      familyHistory.fh_cancer,
      familyHistory.fh_kidney_disease,
      familyHistory.fh_vascular_disease,
      familyHistory.fh_tb,
      familyHistory.fh_disorders,
      familyHistory.fh_copd,
      familyHistory.fh_id,
    ],
    callback
  );
};

// Delete consultation record
const supervisorDeleteFamilyHistory = (
  fh_id: string,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `DELETE FROM ${TableNames.FAMILY_HISTORY_TABLE} WHERE fh_id = ?`;
  supervisorDb.query(query, [fh_id], callback);
};

export default {
  officerSearchFamilyHistory,
  officerCreateFamilyHistory,
  supervisorSearchFamilyHistory,
  supervisorUpdateFamilyHistory,
  supervisorDeleteFamilyHistory,
};
