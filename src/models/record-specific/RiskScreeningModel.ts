import RiskScreeningParamsInterface from "../../interfaces/misc/RiskScreeningParamsInterface";
import RiskScreeningSearchFilterInterface from "../../interfaces/search_filters/RiskScreeningFilterInterface";
import TableNames from "../../common/constants/TableNames";

// Decide on who can access
import officerDb from "../user-specific/OfficerModel";
import supervisorDb from "../user-specific/SupervisorModel";

// # --- Begin Operations for Risk Screening Models --- #
const officerSearchRiskScreening = (
  searchFilter: RiskScreeningSearchFilterInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const { rs_id, patient_id } = searchFilter;

  let query = `SELECT * FROM ${TableNames.RISK_SCREENING_TABLE} WHERE rs_id = ?`;
  const queryParams: any[] = [rs_id]; // Initial wildcard for rs_id

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
const officerCreateRiskScreening = (
  riskScreening: RiskScreeningParamsInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `INSERT INTO ${TableNames.RISK_SCREENING_TABLE}
  (rs_id, patient_id, rs_blood_sugar_fbs, rs_blood_sugar_rbs,
  rs_blood_sugar_date_taken, rs_blood_sugar_symptoms,
  rs_lipid_cholesterol, rs_lipid_hdl, rs_lipid_ldl, rs_lipid_vldl,
  rs_lipid_triglyceride, rs_lipid_date_taken, rs_urine_protein,
  rs_urine_protein_date_taken, rs_urine_ketones,
  rs_urine_ketones_date_taken, rs_respiratory) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // officer-specific
  officerDb.query(
    query,
    [
      riskScreening.rs_id,
      riskScreening.patient_id,
      riskScreening.rs_blood_sugar_fbs,
      riskScreening.rs_blood_sugar_rbs,
      riskScreening.rs_blood_sugar_date_taken,
      riskScreening.rs_blood_sugar_symptoms,
      riskScreening.rs_lipid_cholesterol,
      riskScreening.rs_lipid_hdl,
      riskScreening.rs_lipid_ldl,
      riskScreening.rs_lipid_vldl,
      riskScreening.rs_lipid_triglyceride,
      riskScreening.rs_lipid_date_taken,
      riskScreening.rs_urine_protein,
      riskScreening.rs_urine_protein_date_taken,
      riskScreening.rs_urine_ketones,
      riskScreening.rs_urine_ketones_date_taken,
      riskScreening.rs_respiratory,
    ],
    callback
  );
};

// # ---- Supervisor Functions ---- #
const supervisorSearchRiskScreening = (
  searchFilter: RiskScreeningSearchFilterInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const { rs_id, patient_id } = searchFilter;

  let query = `SELECT * FROM ${TableNames.RISK_SCREENING_TABLE} WHERE rs_id = ?`;
  const queryParams: any[] = [rs_id]; // Initial wildcard for rs_id

  // Add wildcard searches for each field
  if (patient_id) {
    query += " AND patient_id LIKE ?";
    queryParams.push(patient_id);
  }

  // sort the results from latest
  query += " ORDER BY patient_id DESC";

  // supervisor-specific
  supervisorDb.query(query, queryParams, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

// Update consultation record
const supervisorUpdateRiskScreening = (
  riskScreening: RiskScreeningParamsInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `UPDATE ${TableNames.RISK_SCREENING_TABLE} SET
  rs_blood_sugar_fbs, rs_blood_sugar_rbs, rs_blood_sugar_date_taken,
  rs_blood_sugar_symptoms, rs_lipid_cholesterol, rs_lipid_hdl, rs_lipid_ldl,
  rs_lipid_vldl, rs_lipid_triglyceride, rs_lipid_date_taken, rs_urine_protein,
  rs_urine_protein_date_taken, rs_urine_ketones, rs_urine_ketones_date_taken,
  rs_respiratory, WHERE rs_id = ? AND patient_id = ?`;

  // supervisor-specific
  supervisorDb.query(
    query,
    [
      riskScreening.rs_blood_sugar_fbs,
      riskScreening.rs_blood_sugar_rbs,
      riskScreening.rs_blood_sugar_date_taken,
      riskScreening.rs_blood_sugar_symptoms,
      riskScreening.rs_lipid_cholesterol,
      riskScreening.rs_lipid_hdl,
      riskScreening.rs_lipid_ldl,
      riskScreening.rs_lipid_vldl,
      riskScreening.rs_lipid_triglyceride,
      riskScreening.rs_lipid_date_taken,
      riskScreening.rs_urine_protein,
      riskScreening.rs_urine_protein_date_taken,
      riskScreening.rs_urine_ketones,
      riskScreening.rs_urine_ketones_date_taken,
      riskScreening.rs_respiratory,
      riskScreening.rs_id,
      riskScreening.patient_id,
    ],
    callback
  );
};

// Delete consultation record
const supervisorDeleteRiskScreening = (
  rs_id: string,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `DELETE FROM ${TableNames.RISK_SCREENING_TABLE} WHERE rs_id = ?`;
  supervisorDb.query(query, [rs_id], callback);
};

export default {
  officerSearchRiskScreening,
  officerCreateRiskScreening,
  supervisorSearchRiskScreening,
  supervisorUpdateRiskScreening,
  supervisorDeleteRiskScreening,
};
