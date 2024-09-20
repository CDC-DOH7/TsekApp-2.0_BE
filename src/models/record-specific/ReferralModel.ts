import ReferralParamsInterface from "../../interfaces/misc/ReferralParamsInterface";
import ReferralSearchFilterInterface from "../../interfaces/search_filters/ReferralSearchFilterInterface";
import TableNames from "../../common/constants/TableNames";

// Decide on who can access
import officerDb from "../user-specific/OfficerModel";
import supervisorDb from "../user-specific/SupervisorModel";

// # --- Begin Operations for Past Medical Records Models --- #
const officerSearchReferral = (
  searchFilter: ReferralSearchFilterInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const { ref_id, patient_id, hf_id } = searchFilter;

  let query = `SELECT * FROM ${TableNames.REFERRAL_TABLE} WHERE hf_id = ?`;
  const queryParams: any[] = [hf_id]; // Initial wildcard for hf_id

  // Add wildcard searches for each field
  if (ref_id) {
    query += " AND ref_id LIKE ?";
    queryParams.push(ref_id);
  }
  if (patient_id) {
    query += " AND patient_id LIKE ?";
    queryParams.push(patient_id);
  }

  // sort the results from latest
  query += " ORDER BY ref_date DESC";

  // officer-specific
  officerDb.query(query, queryParams, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

// Create consultation record
const officerCreateReferral = (
  referral: ReferralParamsInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `INSERT INTO ${TableNames.REFERRAL_TABLE}
  (ref_id, patient_id, officer_id, hf_id,
  ref_date, ref_reason, ref_destination) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  // officer-specific
  officerDb.query(
    query,
    [
      referral.ref_id,
      referral.patient_id,
      referral.officer_id,
      referral.hf_id,
      referral.ref_date,
      referral.ref_reason,
      referral.ref_destination,
    ],
    callback
  );
};

// # ---- Supervisor Functions ---- #
const supervisorSearchReferral = (
  searchFilter: ReferralSearchFilterInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const { ref_id, patient_id, hf_id, ref_date_startDate, ref_date_endDate } =
    searchFilter;

  let query = `SELECT * FROM ${TableNames.REFERRAL_TABLE} WHERE hf_id = ?`;
  const queryParams: any[] = [hf_id]; // Initial wildcard for hf_id

  // Add wildcard searches for each field
  if (ref_id) {
    query += " AND ref_id LIKE ?";
    queryParams.push(ref_id);
  }
  if (patient_id) {
    query += " AND patient_id LIKE ?";
    queryParams.push(patient_id);
  }
  if (ref_date_startDate) {
    query += " AND ref_date >= ?";
    queryParams.push(ref_date_startDate);
  }
  if (ref_date_endDate) {
    query += " AND ref_date <= ?";
    queryParams.push(ref_date_endDate);
  }

  // sort the results from latest
  query += " ORDER BY ref_date DESC";

  // supervisor-specific
  supervisorDb.query(query, queryParams, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

// Update consultation record
const supervisorUpdateReferral = (
  referral: ReferralParamsInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `UPDATE ${TableNames.REFERRAL_TABLE} SET officer_id,
  ref_date = ?, ref_reason = ?, ref_destination = ? WHERE ref_id = ?`;

  // supervisor-specific
  supervisorDb.query(
    query,
    [
      referral.officer_id,
      referral.ref_date,
      referral.ref_reason,
      referral.ref_destination,
      referral.ref_id,
    ],
    callback
  );
};

// Delete consultation record
const supervisorDeleteReferral = (
  ref_id: string,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `DELETE FROM ${TableNames.REFERRAL_TABLE} WHERE ref_id = ?`;
  supervisorDb.query(query, [ref_id], callback);
};

export default {
  officerSearchReferral,
  officerCreateReferral,
  supervisorSearchReferral,
  supervisorUpdateReferral,
  supervisorDeleteReferral,
};
