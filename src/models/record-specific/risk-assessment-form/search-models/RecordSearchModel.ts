import { QueryResult } from "mysql2/promise";
import SoftSearchFilterInterface from "../../../../interfaces/search_filters/soft-search/risk-assessment-form/RecordSoftSearchFilterInterface";
import officerDb from "../../../../connections/OfficerConnection";
import supervisorDb from "../../../../connections/SupervisorConnection";
import superadminDb from "../../../../connections/SuperadminConnection";
import AdvancedSearchFilterInterface from "../../../../interfaces/search_filters/advanced-search/risk-assessment-form/RecordAdvancedSearchFilterInterface";

const officerSoftSearchRecords = async (
  searchFilter: SoftSearchFilterInterface
): Promise<QueryResult> => {
  const {
    patient_id,
    ard_id,
    cl_id,
    fh_id,
    mngm_id,
    rf_id,
    pmh_id,
    rs_id,
    hf_id,
  } = searchFilter;

  let query = `SELECT * FROM a_patient_info api
    LEFT JOIN a_age_group aag ON api.patient_age_group_id = aag.ag_id
    LEFT JOIN a_assess_red_flags aarf ON api.patient_id = aarf.patient_id
    LEFT JOIN a_family_history afh ON api.patient_id = afh.patient_id
    LEFT JOIN a_management am ON api.patient_id = am.patient_id 
    LEFT JOIN a_ncd_risk_factors anrf ON api.patient_id = anrf.patient_id 
    LEFT JOIN a_past_medical_history apmh ON api.patient_id = apmh.patient_id
    LEFT JOIN a_referral ar ON api.patient_id = ar.patient_id 
    LEFT JOIN a_risk_screening ars ON api.patient_id = ars.patient_id 
    LEFT JOIN a_consultation_logs acl ON api.patient_id = aarf.patient_id;`;

  const queryParams: any[] = [hf_id, ard_id];

  if (hf_id) {
    query += " AND api.hf_id = ?";
    queryParams.push(hf_id);
  }
  if (patient_id) {
    query += " AND api.patient_id LIKE ?";
    queryParams.push(`%${patient_id}%`);
  }
  if (ard_id) {
    query += " AND aarf.ard_id LIKE ?";
    queryParams.push(`%${ard_id}%`);
  }
  if (cl_id) {
    query += " AND acl.cl_id LIKE ?";
    queryParams.push(`%${cl_id}%`);
  }
  if (fh_id) {
    query += " AND afh.fh_id LIKE ?";
    queryParams.push(`%${fh_id}%`);
  }
  if (mngm_id) {
    query += " AND am.mngm_id LIKE ?";
    queryParams.push(`%${mngm_id}%`);
  }
  if (rf_id) {
    query += " AND anrf.rf_id LIKE ?";
    queryParams.push(`%${rf_id}%`);
  }
  if (pmh_id) {
    query += " AND apmh.pmh_id LIKE ?";
    queryParams.push(`%${pmh_id}%`);
  }
  if (rs_id) {
    query += " AND ars.rs_id LIKE ?";
    queryParams.push(`%${rs_id}%`);
  }

  // officer-specific
  try {
    const [results] = await (await officerDb).query(query, queryParams);
    return results;
  } catch (err) {
    throw err;
  }
};

const supervisorSoftSearchRecords = async (
  searchFilter: SoftSearchFilterInterface
): Promise<QueryResult> => {
  const {
    patient_id,
    ard_id,
    cl_id,
    fh_id,
    mngm_id,
    rf_id,
    pmh_id,
    rs_id,
    hf_id,
  } = searchFilter;

  let query = `
    SELECT * FROM a_patient_info api
    LEFT JOIN a_age_group aag ON api.patient_age_group_id = aag.ag_id
    LEFT JOIN a_assess_red_flags aarf ON api.patient_id = aarf.patient_id
    LEFT JOIN a_family_history afh ON api.patient_id = afh.patient_id
    LEFT JOIN a_management am ON api.patient_id = am.patient_id 
    LEFT JOIN a_ncd_risk_factors anrf ON api.patient_id = anrf.patient_id 
    LEFT JOIN a_past_medical_history apmh ON api.patient_id = apmh.patient_id
    LEFT JOIN a_referral ar ON api.patient_id = ar.patient_id 
    LEFT JOIN a_risk_screening ars ON api.patient_id = ars.patient_id 
    LEFT JOIN a_consultation_logs acl ON api.patient_id = acl.patient_id
    WHERE 1=1`;

  const queryParams: any[] = [];

  if (hf_id) {
    query += " AND api.hf_id = ?";
    queryParams.push(hf_id);
  }
  if (patient_id) {
    query += " AND api.patient_id LIKE ?";
    queryParams.push(`%${patient_id}%`);
  }
  if (ard_id) {
    query += " AND aarf.ard_id LIKE ?";
    queryParams.push(`%${ard_id}%`);
  }
  if (cl_id) {
    query += " AND acl.cl_id LIKE ?";
    queryParams.push(`%${cl_id}%`);
  }
  if (fh_id) {
    query += " AND afh.fh_id LIKE ?";
    queryParams.push(`%${fh_id}%`);
  }
  if (mngm_id) {
    query += " AND am.mngm_id LIKE ?";
    queryParams.push(`%${mngm_id}%`);
  }
  if (rf_id) {
    query += " AND anrf.rf_id LIKE ?";
    queryParams.push(`%${rf_id}%`);
  }
  if (pmh_id) {
    query += " AND apmh.pmh_id LIKE ?";
    queryParams.push(`%${pmh_id}%`);
  }
  if (rs_id) {
    query += " AND ars.rs_id LIKE ?";
    queryParams.push(`%${rs_id}%`);
  }

  // officer-specific
  try {
    const [results] = await (await supervisorDb).query(query, queryParams);
    return results;
  } catch (err) {
    throw err;
  }
};

const superadminSoftSearchRecords = async (
  searchFilter: SoftSearchFilterInterface
): Promise<QueryResult> => {
  const {
    patient_id,
    ard_id,
    cl_id,
    fh_id,
    mngm_id,
    rf_id,
    pmh_id,
    rs_id,
    hf_id,
  } = searchFilter;

  let query = `
    SELECT * FROM a_patient_info api
    LEFT JOIN a_age_group aag ON api.patient_age_group_id = aag.ag_id
    LEFT JOIN a_assess_red_flags aarf ON api.patient_id = aarf.patient_id
    LEFT JOIN a_family_history afh ON api.patient_id = afh.patient_id
    LEFT JOIN a_management am ON api.patient_id = am.patient_id 
    LEFT JOIN a_ncd_risk_factors anrf ON api.patient_id = anrf.patient_id 
    LEFT JOIN a_past_medical_history apmh ON api.patient_id = apmh.patient_id
    LEFT JOIN a_referral ar ON api.patient_id = ar.patient_id 
    LEFT JOIN a_risk_screening ars ON api.patient_id = ars.patient_id 
    LEFT JOIN a_consultation_logs acl ON api.patient_id = acl.patient_id`;

  const queryParams: any[] = [];

  if (hf_id) {
    query += " AND api.hf_id = ?";
    queryParams.push(hf_id);
  }
  if (patient_id) {
    query += " AND api.patient_id LIKE ?";
    queryParams.push(`%${patient_id}%`);
  }
  if (ard_id) {
    query += " AND aarf.ard_id LIKE ?";
    queryParams.push(`%${ard_id}%`);
  }
  if (cl_id) {
    query += " AND acl.cl_id LIKE ?";
    queryParams.push(`%${cl_id}%`);
  }
  if (fh_id) {
    query += " AND afh.fh_id LIKE ?";
    queryParams.push(`%${fh_id}%`);
  }
  if (mngm_id) {
    query += " AND am.mngm_id LIKE ?";
    queryParams.push(`%${mngm_id}%`);
  }
  if (rf_id) {
    query += " AND anrf.rf_id LIKE ?";
    queryParams.push(`%${rf_id}%`);
  }
  if (pmh_id) {
    query += " AND apmh.pmh_id LIKE ?";
    queryParams.push(`%${pmh_id}%`);
  }
  if (rs_id) {
    query += " AND ars.rs_id LIKE ?";
    queryParams.push(`%${rs_id}%`);
  }

  // superadmin-specific
  try {
    const [results] = await (await superadminDb).query(query, queryParams);
    return results;
  } catch (err) {
    throw err;
  }
};

// Advanced searches

const supervisorAdvancedSearchRecords = async (
  searchFilter: AdvancedSearchFilterInterface
): Promise<QueryResult> => {
  const {
    patient_id,
    ard_id,
    cl_id,
    cl_start_date,
    cl_end_date,
    fh_id,
    mngm_id,
    mngm_start_date_followup,
    mngm_end_date_followup,
    rf_id,
    pmh_id,
    physician_name,
    ref_start_date,
    ref_end_date,
    rs_id,
    hf_id,
  } = searchFilter;

  let query = `
    SELECT * FROM a_patient_info api
    LEFT JOIN a_age_group aag ON api.patient_age_group_id = aag.ag_id
    LEFT JOIN a_assess_red_flags aarf ON api.patient_id = aarf.patient_id
    LEFT JOIN a_family_history afh ON api.patient_id = afh.patient_id
    LEFT JOIN a_management am ON api.patient_id = am.patient_id 
    LEFT JOIN a_ncd_risk_factors anrf ON api.patient_id = anrf.patient_id 
    LEFT JOIN a_past_medical_history apmh ON api.patient_id = apmh.patient_id
    LEFT JOIN a_referral ar ON api.patient_id = ar.patient_id 
    LEFT JOIN a_risk_screening ars ON api.patient_id = ars.patient_id 
    LEFT JOIN a_consultation_logs acl ON api.patient_id = acl.patient_id`;

  const queryParams: any[] = [];

  if (hf_id) {
    query += " AND api.hf_id = ?";
    queryParams.push(hf_id);
  }
  if (patient_id) {
    query += " AND api.patient_id LIKE ?";
    queryParams.push(`%${patient_id}%`);
  }
  if (ard_id) {
    query += " AND aarf.ard_id LIKE ?";
    queryParams.push(`%${ard_id}%`);
  }
  if (cl_id) {
    query += " AND acl.cl_id LIKE ?";
    queryParams.push(`%${cl_id}%`);
  }
  if (fh_id) {
    query += " AND afh.fh_id LIKE ?";
    queryParams.push(`%${fh_id}%`);
  }
  if (mngm_id) {
    query += " AND am.mngm_id LIKE ?";
    queryParams.push(`%${mngm_id}%`);
  }
  if (rf_id) {
    query += " AND anrf.rf_id LIKE ?";
    queryParams.push(`%${rf_id}%`);
  }
  if (pmh_id) {
    query += " AND apmh.pmh_id LIKE ?";
    queryParams.push(`%${pmh_id}%`);
  }
  if (rs_id) {
    query += " AND ars.rs_id LIKE ?";
    queryParams.push(`%${rs_id}%`);
  }
  if (physician_name) {
    query += " AND ar.physician_name LIKE ?";
    queryParams.push(`%${physician_name}%`);
  }
  if (cl_start_date) {
    query += " AND acl.cl_date >= ?";
    queryParams.push(cl_start_date);
  }
  if (cl_end_date) {
    query += " AND acl.cl_date <= ?";
    queryParams.push(cl_end_date);
  }
  if (mngm_start_date_followup) {
    query += " AND am.mngm_date_followup >= ?";
    queryParams.push(mngm_start_date_followup);
  }
  if (mngm_end_date_followup) {
    query += " AND am.mngm_date_followup <= ?";
    queryParams.push(mngm_end_date_followup);
  }
  if (ref_start_date) {
    query += " AND ar.ref_date >= ?";
    queryParams.push(ref_start_date);
  }
  if (ref_end_date) {
    query += " AND ar.ref_date <= ?";
    queryParams.push(ref_end_date);
  }

  try {
    const [results] = await (await supervisorDb).query(query, queryParams);
    return results;
  } catch (err) {
    throw err;
  }
};

const officerAdvancedSearchRecords = async (
  searchFilter: AdvancedSearchFilterInterface
): Promise<QueryResult> => {
  const {
    patient_id,
    ard_id,
    cl_id,
    cl_start_date,
    cl_end_date,
    fh_id,
    mngm_id,
    mngm_start_date_followup,
    mngm_end_date_followup,
    rf_id,
    pmh_id,
    physician_name,
    ref_start_date,
    ref_end_date,
    rs_id,
    hf_id,
  } = searchFilter;

  let query = `
    SELECT * FROM a_patient_info api
    LEFT JOIN a_age_group aag ON api.patient_age_group_id = aag.ag_id
    LEFT JOIN a_assess_red_flags aarf ON api.patient_id = aarf.patient_id
    LEFT JOIN a_family_history afh ON api.patient_id = afh.patient_id
    LEFT JOIN a_management am ON api.patient_id = am.patient_id 
    LEFT JOIN a_ncd_risk_factors anrf ON api.patient_id = anrf.patient_id 
    LEFT JOIN a_past_medical_history apmh ON api.patient_id = apmh.patient_id
    LEFT JOIN a_referral ar ON api.patient_id = ar.patient_id 
    LEFT JOIN a_risk_screening ars ON api.patient_id = ars.patient_id 
    LEFT JOIN a_consultation_logs acl ON api.patient_id = acl.patient_id`;

  const queryParams: any[] = [];

  if (hf_id) {
    query += " AND api.hf_id = ?";
    queryParams.push(hf_id);
  }
  if (patient_id) {
    query += " AND api.patient_id LIKE ?";
    queryParams.push(`%${patient_id}%`);
  }
  if (ard_id) {
    query += " AND aarf.ard_id LIKE ?";
    queryParams.push(`%${ard_id}%`);
  }
  if (cl_id) {
    query += " AND acl.cl_id LIKE ?";
    queryParams.push(`%${cl_id}%`);
  }
  if (fh_id) {
    query += " AND afh.fh_id LIKE ?";
    queryParams.push(`%${fh_id}%`);
  }
  if (mngm_id) {
    query += " AND am.mngm_id LIKE ?";
    queryParams.push(`%${mngm_id}%`);
  }
  if (rf_id) {
    query += " AND anrf.rf_id LIKE ?";
    queryParams.push(`%${rf_id}%`);
  }
  if (pmh_id) {
    query += " AND apmh.pmh_id LIKE ?";
    queryParams.push(`%${pmh_id}%`);
  }
  if (rs_id) {
    query += " AND ars.rs_id LIKE ?";
    queryParams.push(`%${rs_id}%`);
  }
  if (physician_name) {
    query += " AND ar.physician_name LIKE ?";
    queryParams.push(`%${physician_name}%`);
  }
  if (cl_start_date) {
    query += " AND acl.cl_date >= ?";
    queryParams.push(cl_start_date);
  }
  if (cl_end_date) {
    query += " AND acl.cl_date <= ?";
    queryParams.push(cl_end_date);
  }
  if (mngm_start_date_followup) {
    query += " AND am.mngm_date_followup >= ?";
    queryParams.push(mngm_start_date_followup);
  }
  if (mngm_end_date_followup) {
    query += " AND am.mngm_date_followup <= ?";
    queryParams.push(mngm_end_date_followup);
  }
  if (ref_start_date) {
    query += " AND ar.ref_date >= ?";
    queryParams.push(ref_start_date);
  }
  if (ref_end_date) {
    query += " AND ar.ref_date <= ?";
    queryParams.push(ref_end_date);
  }

  try {
    const [results] = await (await officerDb).query(query, queryParams);
    return results;
  } catch (err) {
    throw err;
  }
};

const superadminAdvancedSearchRecords = async (
  searchFilter: AdvancedSearchFilterInterface
): Promise<QueryResult> => {
  const {
    patient_id,
    ard_id,
    cl_id,
    cl_start_date,
    cl_end_date,
    fh_id,
    mngm_id,
    mngm_start_date_followup,
    mngm_end_date_followup,
    rf_id,
    pmh_id,
    physician_name,
    ref_start_date,
    ref_end_date,
    rs_id,
    hf_id,
  } = searchFilter;

  let query = `
    SELECT * FROM a_patient_info api
    LEFT JOIN a_age_group aag ON api.patient_age_group_id = aag.ag_id
    LEFT JOIN a_assess_red_flags aarf ON api.patient_id = aarf.patient_id
    LEFT JOIN a_family_history afh ON api.patient_id = afh.patient_id
    LEFT JOIN a_management am ON api.patient_id = am.patient_id 
    LEFT JOIN a_ncd_risk_factors anrf ON api.patient_id = anrf.patient_id 
    LEFT JOIN a_past_medical_history apmh ON api.patient_id = apmh.patient_id
    LEFT JOIN a_referral ar ON api.patient_id = ar.patient_id 
    LEFT JOIN a_risk_screening ars ON api.patient_id = ars.patient_id 
    LEFT JOIN a_consultation_logs acl ON api.patient_id = acl.patient_id`;

  const queryParams: any[] = [];

  if (hf_id) {
    query += " AND api.hf_id = ?";
    queryParams.push(hf_id);
  }
  if (patient_id) {
    query += " AND api.patient_id LIKE ?";
    queryParams.push(`%${patient_id}%`);
  }
  if (ard_id) {
    query += " AND aarf.ard_id LIKE ?";
    queryParams.push(`%${ard_id}%`);
  }
  if (cl_id) {
    query += " AND acl.cl_id LIKE ?";
    queryParams.push(`%${cl_id}%`);
  }
  if (fh_id) {
    query += " AND afh.fh_id LIKE ?";
    queryParams.push(`%${fh_id}%`);
  }
  if (mngm_id) {
    query += " AND am.mngm_id LIKE ?";
    queryParams.push(`%${mngm_id}%`);
  }
  if (rf_id) {
    query += " AND anrf.rf_id LIKE ?";
    queryParams.push(`%${rf_id}%`);
  }
  if (pmh_id) {
    query += " AND apmh.pmh_id LIKE ?";
    queryParams.push(`%${pmh_id}%`);
  }
  if (rs_id) {
    query += " AND ars.rs_id LIKE ?";
    queryParams.push(`%${rs_id}%`);
  }
  if (physician_name) {
    query += " AND ar.physician_name LIKE ?";
    queryParams.push(`%${physician_name}%`);
  }
  if (cl_start_date) {
    query += " AND acl.cl_date >= ?";
    queryParams.push(cl_start_date);
  }
  if (cl_end_date) {
    query += " AND acl.cl_date <= ?";
    queryParams.push(cl_end_date);
  }
  if (mngm_start_date_followup) {
    query += " AND am.mngm_date_followup >= ?";
    queryParams.push(mngm_start_date_followup);
  }
  if (mngm_end_date_followup) {
    query += " AND am.mngm_date_followup <= ?";
    queryParams.push(mngm_end_date_followup);
  }
  if (ref_start_date) {
    query += " AND ar.ref_date >= ?";
    queryParams.push(ref_start_date);
  }
  if (ref_end_date) {
    query += " AND ar.ref_date <= ?";
    queryParams.push(ref_end_date);
  }

  try {
    const [results] = await (await superadminDb).query(query, queryParams);
    return results;
  } catch (err) {
    throw err;
  }
};

export default {
  officerSoftSearchRecords,
  officerAdvancedSearchRecords,
  supervisorSoftSearchRecords,
  supervisorAdvancedSearchRecords,
  superadminSoftSearchRecords,
  superadminAdvancedSearchRecords,
};
