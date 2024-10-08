import ArdParamsInterface from "../../../interfaces/misc/risk-assessment-form/ArdParamsInterface";
import ArdSearchFilterInterface from "../../../interfaces/search_filters/specific-search/risk-assessment-form/ArdSearchFilterInterface";
import TableNames from "../../../common/constants/TableNames";

// Decide on who can access
import officerDb from "../../../connections/OfficerConnection";
import supervisorDb from "../../../connections/SupervisorConnection";
import { QueryResult } from "mysql2";
import ArdDeletionInterface from "../../../interfaces/deletion_params/risk-assessment-form/ArdDeletionInterface";

// # --- Begin Operations for ARD Models --- #

const officerSearchArd = async (searchFilter: ArdSearchFilterInterface): Promise<QueryResult> => {
  const { hf_id, ard_id, patient_id } = searchFilter;

  let query = `SELECT * FROM ${TableNames.ASSESS_RED_FLAG_TABLE} WHERE hf_id = ? AND ard_id = ?`;
  const queryParams: any[] = [hf_id,ard_id];

  if (patient_id) {
    query += " AND patient_id LIKE ?";
    queryParams.push(`%${patient_id}%`);
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
const officerCreateArd = async (ard: ArdParamsInterface): Promise<QueryResult> => {
  const query = `INSERT INTO ${TableNames.ASSESS_RED_FLAG_TABLE}
  (ard_id,
  patient_id, 
  ard_chest_pain, 
  ard_difficulty_breathing, 
  ard_loss_consciousness, 
  ard_slurred_speech, 
  ard_facial_asymmetry, 
  ard_numb_arm, 
  ard_disoriented, 
  ard_chest_retractions, 
  ard_seizure_or_convulsion, 
  ard_selfharm_or_suicide, 
  ard_aggressive_behavior, 
  ard_eye_injury, 
  ard_severe_injuries,
  hf_id) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // officer-specific
  try {
    const [result] = await (await officerDb).query(query, [
      ard.ard_id,
      ard.patient_id,
      ard.ard_chest_pain,
      ard.ard_difficulty_breathing,
      ard.ard_loss_consciousness,
      ard.ard_slurred_speech,
      ard.ard_facial_asymmetry,
      ard.ard_numb_arm,
      ard.ard_disoriented,
      ard.ard_chest_retractions,
      ard.ard_seizure_or_convulsion,
      ard.ard_selfharm_or_suicide,
      ard.ard_aggressive_behavior,
      ard.ard_eye_injury,
      ard.ard_severe_injuries,
      ard.hf_id
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

// # ---- Supervisor Functions ---- # //

const supervisorSearchArd = async (searchFilter: ArdSearchFilterInterface): Promise<QueryResult> => {
  const { hf_id, ard_id, patient_id } = searchFilter;

  let query = `SELECT * FROM ${TableNames.ASSESS_RED_FLAG_TABLE} WHERE hf_id = ? AND ard_id = ?`;
  const queryParams: any[] = [hf_id, ard_id];

  if (patient_id) {
    query += " AND patient_id LIKE ?";
    queryParams.push(`%${patient_id}%`);
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
const supervisorUpdateArd = async (ard: ArdParamsInterface): Promise<QueryResult> => {
  const query = `UPDATE ${TableNames.ASSESS_RED_FLAG_TABLE} SET 
    ard_chest_pain = ?, 
    ard_difficulty_breathing = ?, 
    ard_loss_consciousness = ?, 
    ard_slurred_speech = ?, 
    ard_facial_asymmetry = ?, 
    ard_numb_arm = ?, 
    ard_disoriented = ?, 
    ard_chest_retractions = ?, 
    ard_seizure_or_convulsion = ?, 
    ard_selfharm_or_suicide = ?, 
    ard_aggressive_behavior = ?, 
    ard_eye_injury = ?, 
    ard_severe_injuries = ? 
    WHERE ard_id = ? AND patient_id = ? AND hf_id = ?`;

  // supervisor-specific
  try {
    const [result] = await (await supervisorDb).query(query, [
      ard.ard_chest_pain,
      ard.ard_difficulty_breathing,
      ard.ard_loss_consciousness,
      ard.ard_slurred_speech,
      ard.ard_facial_asymmetry,
      ard.ard_numb_arm,
      ard.ard_disoriented,
      ard.ard_chest_retractions,
      ard.ard_seizure_or_convulsion,
      ard.ard_selfharm_or_suicide,
      ard.ard_aggressive_behavior,
      ard.ard_eye_injury,
      ard.ard_severe_injuries,
      ard.ard_id,
      ard.patient_id,
      ard.hf_id
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

// Delete consultation record
const supervisorDeleteArd = async (ardDeletion: ArdDeletionInterface): Promise<QueryResult> => {
  const query = `DELETE FROM ${TableNames.ASSESS_RED_FLAG_TABLE} WHERE ard_id = ? AND patient_id = ? AND hf_id = ?`;
  const {ard_id, patient_id, hf_id} = ardDeletion;
  // supervisor-specific
  try {
    const [result] = await (await supervisorDb).query(query, [ard_id, patient_id, hf_id]);
    return result;
  } catch (err) {
    throw err;
  }
};

export default {
  officerSearchArd,
  officerCreateArd,
  supervisorSearchArd,
  supervisorUpdateArd,
  supervisorDeleteArd,
};
