import NcdRiskFactorsParamsInterface from "../../../interfaces/misc/risk-assessment-form/NcdRiskFactorsParamsInterface";
import NcdRiskFactorsSearchFilterInterface from "../../../interfaces/search_filters/specific-search/risk-assessment-form/NcdRiskFactorsSearchFilterInterface";
import TableNames from "../../../common/constants/TableNames";

// Decide on who can access
import officerDb from "../../../connections/OfficerConnection";
import supervisorDb from "../../../connections/SupervisorConnection";
import { QueryResult } from "mysql2";
import NcdRiskFactorsDeletionInterface from "../../../interfaces/deletion_params/risk-assessment-form/NcdRiskFactorsDeletionInterface";

// # --- Begin Operations for NCD Risk Factors Models --- #
const officerSearchNcdRiskFactors = async (
  searchFilter: NcdRiskFactorsSearchFilterInterface
): Promise<QueryResult> => {
  const { rf_id, patient_id } = searchFilter;

  let query = `SELECT * FROM ${TableNames.NCD_RISK_FACTORS_TABLE} WHERE rf_id = ?`;
  const queryParams: any[] = [rf_id]; // Initial wildcard for cl_id

  // Add wildcard searches for each field
  if (patient_id) {
    query += " AND patient_id LIKE ?";
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
const officerCreateNcdRiskFactors = async (
  ncdRiskFactors: NcdRiskFactorsParamsInterface
): Promise<QueryResult> => {
  const query = `INSERT INTO ${TableNames.NCD_RISK_FACTORS_TABLE}
  (rf_id, 
  patient_id, 
  rf_tobacco_use, 
  rf_alcohol_intake, 
  rf_binge_drinker,
  rf_physical_activity, 
  rf_nad_assessment, 
  rf_kg_weight, 
  rf_cm_height,
  rf_bmi, 
  rf_waist_circumference, 
  rf_bp,
  hf_id
  ) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // officer-specific
  try {
    const [result] = await (
      await officerDb
    ).query(query, [
      ncdRiskFactors.rf_id,
      ncdRiskFactors.patient_id,
      ncdRiskFactors.rf_tobacco_use,
      ncdRiskFactors.rf_alcohol_intake,
      ncdRiskFactors.rf_binge_drinker,
      ncdRiskFactors.rf_physical_activity,
      ncdRiskFactors.rf_nad_assessment,
      ncdRiskFactors.rf_kg_weight,
      ncdRiskFactors.rf_cm_height,
      ncdRiskFactors.rf_bmi,
      ncdRiskFactors.rf_waist_circumference,
      ncdRiskFactors.rf_bp,
      ncdRiskFactors.hf_id,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

// # ---- Supervisor Functions ---- #
const supervisorSearchNcdRiskFactors = async (
  searchFilter: NcdRiskFactorsSearchFilterInterface
): Promise<QueryResult> => {
  const { rf_id, patient_id } = searchFilter;

  let query = `SELECT * FROM ${TableNames.NCD_RISK_FACTORS_TABLE} WHERE rf_id = ?`;
  const queryParams: any[] = [rf_id]; // Initial wildcard for rf_id

  // Add wildcard searches for each field
  if (patient_id) {
    query += " AND patient_id LIKE ?";
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

// Update consultation record
const supervisorUpdateNcdRiskFactors = async (
  ncdRiskFactors: NcdRiskFactorsParamsInterface
): Promise<QueryResult> => {
  const query = `UPDATE ${TableNames.NCD_RISK_FACTORS_TABLE} SET 
  rf_tobacco_use = ?,
  rf_alcohol_intake = ?, 
  rf_binge_drinker = ?, 
  rf_physical_activity = ?, 
  rf_nad_assessment = ?,
  rf_kg_weight = ?, 
  rf_cm_height = ?, 
  rf_bmi = ?, 
  rf_waist_circumference = ?,
  rf_bp = ? 
  WHERE rf_id = ? AND patient_id = ? AND hf_id = ?`;

  // supervisor-specific
  try {
    const [result] = await (
      await supervisorDb
    ).query(query, [
      ncdRiskFactors.rf_tobacco_use,
      ncdRiskFactors.rf_alcohol_intake,
      ncdRiskFactors.rf_binge_drinker,
      ncdRiskFactors.rf_physical_activity,
      ncdRiskFactors.rf_nad_assessment,
      ncdRiskFactors.rf_kg_weight,
      ncdRiskFactors.rf_cm_height,
      ncdRiskFactors.rf_bmi,
      ncdRiskFactors.rf_waist_circumference,
      ncdRiskFactors.rf_bp,
      ncdRiskFactors.rf_id,
      ncdRiskFactors.patient_id,
      ncdRiskFactors.hf_id,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

// Delete consultation record
const supervisorDeleteNcdRiskFactors = async (
  ncdRiskFactorsDeletion: NcdRiskFactorsDeletionInterface
): Promise<QueryResult> => {
  const query = `DELETE FROM ${TableNames.NCD_RISK_FACTORS_TABLE} WHERE rf_id = ? AND patient_id = ? AND hf_id = ?`;
  const { rf_id, patient_id, hf_id } = ncdRiskFactorsDeletion;
  // supervisor-specific
  try {
    const [result] = await (
      await supervisorDb
    ).query(query, [rf_id, patient_id, hf_id]);
    return result;
  } catch (err) {
    throw err;
  }
};

export default {
  officerSearchNcdRiskFactors,
  officerCreateNcdRiskFactors,
  supervisorSearchNcdRiskFactors,
  supervisorUpdateNcdRiskFactors,
  supervisorDeleteNcdRiskFactors,
};
