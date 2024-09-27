import ReferralParamsInterface from "../../interfaces/misc/ReferralParamsInterface";
import ReferralSearchFilterInterface from "../../interfaces/search_filters/ReferralSearchFilterInterface";
import TableNames from "../../common/constants/TableNames";

// Decide on who can access
import officerDb from "../user-specific/OfficerModel";
import supervisorDb from "../user-specific/SupervisorModel";

// # --- Begin Operations for Past Medical Records Models --- #
const officerSearchReferral = async (
  searchFilter: ReferralSearchFilterInterface
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
  try {
    const [results] = await (await officerDb).query(query, queryParams);
    return results;
  } catch (err) {
    throw err;
  }
};

// Create consultation record
const officerCreateReferral = async (referral: ReferralParamsInterface) => {
  const query = `INSERT INTO ${TableNames.REFERRAL_TABLE}
  (ref_id, 
  patient_id, 
  officer_id, 
  hf_id,
  ref_date, 
  ref_reason, 
  ref_destination) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  // officer-specific
  try {
    const [result] = await (
      await officerDb
    ).query(query, [
      referral.ref_id,
      referral.patient_id,
      referral.officer_id,
      referral.hf_id,
      referral.ref_date,
      referral.ref_reason,
      referral.ref_destination,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

// # ---- Supervisor Functions ---- # //

const supervisorSearchReferral = async (
  searchFilter: ReferralSearchFilterInterface
) => {
  const {
    ref_date_startdate,
    ref_date_enddate,
    ref_id,
    patient_id,
    officer_id,
    hf_id,
    ref_reason,
    ref_destination,
  } = searchFilter;

  let query = `SELECT * FROM ${TableNames.REFERRAL_TABLE} WHERE hf_id = ?`;
  const queryParams: any[] = [hf_id]; // Initial wildcard for hf_id

  // Add wildcard searches for each field
  if (ref_id) {
    query += " AND ref_id LIKE ?";
    queryParams.push(ref_id);
  }
  if (patient_id) {
    query += " and patient_id like ?";
    queryParams.push(patient_id);
  }
  if (officer_id) {
    query += " and officer_id like ?";
    queryParams.push(officer_id);
  }
  if (ref_date_startdate) {
    query += " AND ref_date >= ?";
    queryParams.push(ref_date_startdate);
  }
  if (ref_date_enddate) {
    query += " AND ref_date <= ?";
    queryParams.push(ref_date_enddate);
  }
  if (ref_reason) {
    query += " and ref_reason like ?";
    queryParams.push(ref_reason);
  }
  if (ref_destination) {
    query += " and ref_destination like ?";
    queryParams.push(ref_destination);
  }

  // sort the results from latest
  query += " ORDER BY ref_date DESC";

  // supervisor-specific
  try {
    const [results] = await (await supervisorDb).query(query, queryParams);
    return results;
  } catch (err) {
    throw err;
  }
};

// Update consultation record
const supervisorUpdateReferral = async (referral: ReferralParamsInterface) => {
  const query = `UPDATE ${TableNames.REFERRAL_TABLE} SET 
  officer_id = ?,
  ref_date = ?, 
  ref_reason = ?, 
  ref_destination = ? 
  WHERE patient_id = ? AND ref_id = ? AND hf_id = ?`;

  // supervisor-specific
  try {
    const [result] = await (
      await supervisorDb
    ).query(query, [
      referral.officer_id,
      referral.ref_date,
      referral.ref_reason,
      referral.ref_destination,
      referral.patient_id,
      referral.ref_id,
      referral.hf_id,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

// Delete consultation record
const supervisorDeleteReferral = async (ref_id: string) => {
  const query = `DELETE FROM ${TableNames.REFERRAL_TABLE} WHERE ref_id = ?`;

  try {
    const [result] = await (await supervisorDb).query(query, [ref_id]);
    return result;
  } catch (err) {
    throw err;
  }
};

export default {
  officerSearchReferral,
  officerCreateReferral,
  supervisorSearchReferral,
  supervisorUpdateReferral,
  supervisorDeleteReferral,
};
