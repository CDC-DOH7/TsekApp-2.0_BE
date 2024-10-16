import ReferralParamsInterface from "../../../interfaces/misc/risk-assessment-form/ReferralParamsInterface";
import ReferralSearchFilterInterface from "../../../interfaces/search_filters/specific-search/risk-assessment-form/ReferralSearchFilterInterface";
import TableNames from "../../../common/constants/TableNames";

// Decide on who can access
import officerDb from "../../../connections/OfficerConnection";
import supervisorDb from "../../../connections/SupervisorConnection";
import ReferralDeletionInterface from "../../../interfaces/deletion_params/risk-assessment-form/ReferralDeletionInterface";

// # --- Begin Operations for Past Medical Records Models --- #
const officerSearchReferral = async (
  searchFilter: ReferralSearchFilterInterface
) => {
  const {
    ref_date_startdate,
    ref_date_enddate,
    ref_id,
    patient_id,
    officer_id,
    physician_name,
    ref_reason,
    ref_destination_id,
    hf_id,
  } = searchFilter;

  let query = `SELECT * FROM ${TableNames.REFERRAL_TABLE} WHERE hf_id = ?`;
  const queryParams: any[] = [hf_id]; // Initial wildcard for hf_id

  // Add wildcard searches for each field
  if (ref_id) {
    query += " AND ref_id LIKE ?";
    queryParams.push(ref_id);
  }
  if (patient_id) {
    query += " AND patient_id like ?";
    queryParams.push(patient_id);
  }
  if (officer_id) {
    query += " AND officer_id like ?";
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
  if (physician_name) {
    query += " AND physician_name like ?";
    queryParams.push(physician_name);
  }
  if (ref_reason) {
    query += " AND ref_reason like ?";
    queryParams.push(ref_reason);
  }
  if (ref_destination_id) {
    query += " AND ref_destination_id like ?";
    queryParams.push(ref_destination_id);
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
  physician_name,
  ref_date,
  ref_reason,
  ref_destination_id, 
  hf_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  // officer-specific
  try {
    const [result] = await (
      await officerDb
    ).query(query, [
      referral.ref_id,
      referral.patient_id,
      referral.officer_id,
      referral.physician_name,
      referral.ref_date,
      referral.ref_reason,
      referral.ref_destination_id,
      referral.hf_id,
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
    physician_name,
    ref_reason,
    ref_destination_id,
    hf_id,
  } = searchFilter;

  let query = `SELECT * FROM ${TableNames.REFERRAL_TABLE} WHERE hf_id = ?`;
  const queryParams: any[] = [hf_id]; // Initial wildcard for hf_id

  // Add wildcard searches for each field
  if (ref_id) {
    query += " AND ref_id LIKE ?";
    queryParams.push(ref_id);
  }
  if (patient_id) {
    query += " AND patient_id like ?";
    queryParams.push(patient_id);
  }
  if (officer_id) {
    query += " AND officer_id like ?";
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
  if (physician_name) {
    query += " AND physician_name like ?";
    queryParams.push(physician_name);
  }
  if (ref_reason) {
    query += " AND ref_reason like ?";
    queryParams.push(ref_reason);
  }
  if (ref_destination_id) {
    query += " AND ref_destination_id like ?";
    queryParams.push(ref_destination_id);
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
  ref_destination_id = ?,
  physician_name = ?, 
  WHERE patient_id = ? AND ref_id = ? AND hf_id = ?`;

  // supervisor-specific
  try {
    const [result] = await (
      await supervisorDb
    ).query(query, [
      referral.officer_id,
      referral.ref_date,
      referral.ref_reason,
      referral.ref_destination_id,
      referral.physician_name,
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
const supervisorDeleteReferral = async (
  referralDeletion: ReferralDeletionInterface
) => {
  const query = `DELETE FROM ${TableNames.REFERRAL_TABLE} WHERE ref_id = ? AND patient_id = ? AND hf_id = ?`;
  const { ref_id, patient_id, hf_id } = referralDeletion;
  try {
    const [result] = await (
      await supervisorDb
    ).query(query, [ref_id, patient_id, hf_id]);
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
