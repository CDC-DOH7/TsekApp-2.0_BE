import FamilyHistoryParamsInterface from "../../interfaces/misc/FamilyHistoryParamsInterface";
import FamilyHistorySearchFilterInterface from "../../interfaces/search_filters/FamilyHistorySearchFilterInterface";
import TableNames from "../../common/constants/TableNames";

// Decide on who can access
import officerDb from "../user-specific/OfficerModel";
import supervisorDb from "../user-specific/SupervisorModel";
import { QueryResult } from "mysql2";

// # --- Begin Operations for Family History Models --- #
const officerSearchFamilyHistory = async(
  searchFilter: FamilyHistorySearchFilterInterface,
): Promise<QueryResult> => {
  const { fh_id, patient_id } = searchFilter;

  let query = `SELECT * FROM ${TableNames.FAMILY_HISTORY_TABLE} WHERE fh_id = ?`;
  const queryParams: any[] = [fh_id]; // Initial wildcard for cl_id

  // Add wildcard searches for each field
  if (patient_id) {
    query += " AND patient_id = ?";
    queryParams.push(patient_id);
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
const officerCreateFamilyHistory = async(
  familyHistory: FamilyHistoryParamsInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `INSERT INTO ${TableNames.FAMILY_HISTORY_TABLE}
  (fh_id, 
  patient_id, 
  fh_hypertension, 
  fh_stroke, 
  fh_heart_disease, 
  fh_diabetes_mellitus, 
  fh_asthma, 
  fh_cancer, 
  fh_kidney_disease, 
  fh_vascular_disease, 
  fh_tb, 
  fh_disorders, 
  fh_copd) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // officer-specific
  try{
    const [result] = await (await officerDb).query(query, 
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
      ]
    );
  }catch(err){

  }
};

// # ---- Supervisor Functions ---- #
const supervisorSearchFamilyHistory = async(
  searchFilter: FamilyHistorySearchFilterInterface,
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
   try {
    const [results] = await (await supervisorDb).query(query, queryParams);
    return results;
  } catch (err) {
    throw err;
  }
};


const supervisorUpdateFamilyHistory = async(
  familyHistory: FamilyHistoryParamsInterface,
) => {
  const query = `UPDATE ${TableNames.FAMILY_HISTORY_TABLE} patient_id = ?, 
  fh_hypertension = ?, 
  fh_stroke = ?, 
  fh_heart_disease = ?, 
  fh_diabetes_mellitus = ?, 
  fh_asthma = ?, 
  fh_cancer = ?, 
  fh_kidney_disease = ?, 
  fh_vascular_disease = ?, 
  fh_tb = ?, 
  fh_disorders = ?, 
  fh_copd = ? 
  WHERE fh_id = ?`;

  // supervisor-specific
  try {
    const [result] = await (await supervisorDb).query(query, [
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
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

// Delete consultation record
const supervisorDeleteFamilyHistory = async (
  fh_id: string,
): Promise<QueryResult> => {
  const query = `DELETE FROM ${TableNames.FAMILY_HISTORY_TABLE} WHERE fh_id = ?`;
  // supervisor-specific
  try {
    const [result] = await (await supervisorDb).query(query, [fh_id]);
    return result;
  } catch (err) {
    throw err;
  }
};

export default {
  officerSearchFamilyHistory,
  officerCreateFamilyHistory,
  supervisorSearchFamilyHistory,
  supervisorUpdateFamilyHistory,
  supervisorDeleteFamilyHistory,
};
