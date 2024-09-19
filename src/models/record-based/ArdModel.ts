import ArdParamsInterface from "../../interfaces/misc/ArdParamsInterface";
import ArdSearchFilterInterface from "../../interfaces/search_filters/ArdSearchFilterInterface";
import TableNames from "../../common/constants/TableNames";

// Decide on who can access
import officerDb from "../user-based/OfficerModel";
import supervisorDb from "../user-based/SupervisorModel";

// # --- Begin Operations for ARD Models --- #
const officerSearchArd = (
  searchFilter: ArdSearchFilterInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const { ard_id, patient_id } = searchFilter;

  let query = `SELECT * FROM ${TableNames.ASSESS_RED_FLAG_TABLE} WHERE ard_id = ?`;
  const queryParams: any[] = [ard_id]; // Initial wildcard for cl_id

  // Add wildcard searches for each field
  if (patient_id) {
    query += " AND patient_id LIKE ?";
    queryParams.push(`%${patient_id}%`);
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
const officerCreateArd = (
  ard: ArdParamsInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `INSERT INTO ${TableNames.ASSESS_RED_FLAG_TABLE}(ard_id, patient_id, ard_chest_pain, ard_difficulty_breathing, ard_loss_consciousness, ard_slurred_speech, ard_facial_asymmetry, ard_numb_arm, ard_disoriented, ard_chest_retractions, ard_seizure_or_convulsion, ard_selfharm_or_suicide, ard_aggressive_behavior, ard_eye_injury, ard_severe_injuries) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // officer-specific
  officerDb.query(
    query,
    [
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
    ],
    callback
  );
};

// # ---- Supervisor Functions ---- # //

const supervisorSearchArd = (
  searchFilter: ArdSearchFilterInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const { ard_id, patient_id } = searchFilter;

  let query = `SELECT * FROM ${TableNames.ASSESS_RED_FLAG_TABLE} WHERE ard_id = ?`;
  const queryParams: any[] = [ard_id]; // Initial wildcard for cl_id

  // Add wildcard searches for each field
  if (patient_id) {
    query += " AND patient_id LIKE ?";
    queryParams.push(`%${patient_id}%`);
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
const supervisorUpdateArd = (
  ard: ArdParamsInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `UPDATE ${TableNames.ASSESS_RED_FLAG_TABLE} SET ard_chest_pain = ?, ard_difficulty_breathing = ?, ard_loss_consciousness = ?, ard_slurred_speech = ?, ard_facial_asymmetry = ?, ard_numb_arm = ?, ard_disoriented = ?, ard_chest_retractions = ?, ard_seizure_or_convulsion = ?, ard_selfharm_or_suicide = ?, ard_aggressive_behavior = ?, ard_eye_injury = ?, ard_severe_injuries = ? WHERE ard_id = ?`;

  // supervisor-specific
  supervisorDb.query(
    query,
    [
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
    ],
    callback
  );
};

// Delete consultation record
const supervisorDeleteArd = (
  ard_id: string,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `DELETE FROM ${TableNames.ASSESS_RED_FLAG_TABLE} WHERE ard_id = ?`;
  supervisorDb.query(query, [ard_id], callback);
};

export default {
  officerSearchArd,
  officerCreateArd,
  supervisorSearchArd,
  supervisorUpdateArd,
  supervisorDeleteArd,
};
