import NcdRiskFactorsParamsInterface from "../../interfaces/misc/NcdRiskFactorsParamsInterface";
import NcdRiskFactorsSearchFilterInterface from "../../interfaces/search_filters/NcdRiskFactorsSearchFilterInterface";
import TableNames from "../../common/constants/TableNames";

// Decide on who can access
import officerDb from "../user-based/OfficerModel";
import supervisorDb from "../user-based/SupervisorModel";

// # --- Begin Operations for NCD Risk Factors Models --- #
const officerSearchNcdRiskFactors = (
  searchFilter: NcdRiskFactorsSearchFilterInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const { rf_id, patient_id } = searchFilter;

  let query = `SELECT * FROM ${TableNames.NCD_RISK_FACTORS_TABLE} WHERE rf_id = ?`;
  const queryParams: any[] = [rf_id]; // Initial wildcard for cl_id

  // Add wildcard searches for each field
  if (patient_id) {
    query += " AND patient_id LIKE ?";
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
const officerCreateNcdRiskFactors = (
  ncdRiskFactors: NcdRiskFactorsParamsInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `INSERT INTO ${TableNames.NCD_RISK_FACTORS_TABLE}
  (rf_id, patient_id, rf_tobacco_use, rf_alcohol_intake, rf_binge_drinker,
  rf_physical_activity, rf_nad_assessment, rf_kg_weight, rf_cm_height,
  rf_bmi, rf_waist_circumference, rf_bp) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // officer-specific
  officerDb.query(
    query,
    [
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
    ],
    callback
  );
};

// # ---- Supervisor Functions ---- #

export const supervisorSearchNcdRiskFactors = (
  searchFilter: NcdRiskFactorsSearchFilterInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const { rf_id, patient_id } = searchFilter;

  let query = `SELECT * FROM ${TableNames.NCD_RISK_FACTORS_TABLE} WHERE rf_id = ?`;
  const queryParams: any[] = [rf_id]; // Initial wildcard for cl_id

  // Add wildcard searches for each field
  if (patient_id) {
    query += " AND patient_id LIKE ?";
    queryParams.push(patient_id);
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
const supervisorUpdateNcdRiskFactors = (
  ncdRiskFactors: NcdRiskFactorsParamsInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `UPDATE ${TableNames.NCD_RISK_FACTORS_TABLE} SET rf_tobacco_use = ?,
  rf_alcohol_intake = ?, rf_binge_drinker = ?, rf_physical_activity = ?, rf_nad_assessment = ?,
  rf_kg_weight = ?, rf_cm_height = ?, rf_bmi = ?, rf_waist_circumference = ?,
  rf_bp = ? WHERE rf_id = ?`;

  // supervisor-specific
  supervisorDb.query(
    query,
    [
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
    ],
    callback
  );
};

// Delete consultation record
const supervisorDeleteNcdRiskFactors = (
  rf_id: string,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `DELETE FROM ${TableNames.NCD_RISK_FACTORS_TABLE} WHERE rf_id = ?`;
  supervisorDb.query(query, [rf_id], callback);
};

export default {
  officerSearchNcdRiskFactors,
  officerCreateNcdRiskFactors,
  supervisorSearchNcdRiskFactors,
  supervisorUpdateNcdRiskFactors,
  supervisorDeleteNcdRiskFactors,
};
