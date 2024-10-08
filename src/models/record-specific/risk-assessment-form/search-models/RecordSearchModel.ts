import { QueryResult } from "mysql2/promise";
import SoftSearchFilterInterface from "../../../../interfaces/search_filters/soft-search/risk-assessment-form/RecordSoftSearchFilterInterface";
import officerDb from "../../../../connections/OfficerConnection";
import supervisorDb from "../../../../connections/SupervisorConnection";

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

  let query = `SELECT patient_fname, patient_mname, patient_lname, patient_suffix, patient_date_assess, patient_age, patient_age_group_id, ag_range, ag_description, ard_id,
    ard_chest_pain, ard_difficulty_breathing, ard_loss_consciousness, ard_slurred_speech, ard_facial_asymmetry, ard_numb_arm, ard_disoriented, ard_chest_retractions,
    ard_seizure_or_convulsion, ard_selfharm_or_suicide, ard_aggressive_behavior, ard_eye_injury, ard_severe_injuries, ard_severe_injuries, cl_id, cl_description, cl_date, fh_id,
    fh_hypertension, fh_stroke, fh_heart_disease, fh_diabetes_mellitus, fh_asthma, fh_cancer, fh_kidney_disease, fh_vascular_disease, fh_tb, fh_disorders, fh_copd, mngm_id, mngm_lifestyle_mod,
    mngm_med_antihypertensive, mngm_med_antidiabetes, mngm_date_followup, mngm_remarks, rf_id, rf_tobacco_use, rf_alcohol_intake, rf_binge_drinker, rf_physical_activity,
    rf_nad_assessment, rf_kg_weight, rf_cm_height, rf_bmi, rf_waist_circumference, rf_bp, pmh_id, pmh_hypertension, pmh_heart_disease, pmh_diabetes, pmh_specify_diabetes,
    pmh_cancer, pmh_specify_cancer, pmh_copd, pmh_asthma, pmh_allergies, pmh_specify_allergy, pmh_disorders, pmh_specify_disorder, pmh_vision_problems, pmh_previous_surgical_history, pmh_specify_surgical_history
    pmh_thyroid_disorder, pmh_kidney_disorder, physician_name, ref_date, ref_reason, ref_destination, rs_id, rs_blood_sugar_fbs, rs_blood_sugar_rbs, rs_blood_sugar_date_taken, rs_blood_sugar_symptoms, rs_lipid_cholesterol,
    rs_lipid_hdl, rs_lipid_ldl, rs_lipid_vldl, rs_lipid_triglyceride, rs_lipid_date_taken, rs_urine_protein, rs_urine_protein_date_taken, rs_urine_ketones, rs_urine_ketones_date_taken, rs_respiratory
    FROM a_patient_info api
    LEFT JOIN a_age_group aag ON api.patient_age_group_id = aag.ag_id
    LEFT JOIN a_assess_red_flags aarf 
    ON api.patient_id = aarf.patient_id
    LEFT JOIN a_family_history afh 
    ON api.patient_id = afh.patient_id
    LEFT JOIN a_management am 
    ON api.patient_id = am.patient_id 
    LEFT JOIN a_ncd_risk_factors anrf 
    ON api.patient_id = anrf.patient_id 
    LEFT JOIN a_past_medical_history apmh 
    ON api.patient_id = apmh.patient_id
    LEFT JOIN a_referral ar ON api.patient_id = ar.patient_id 
    LEFT JOIN a_risk_screening ars ON api.patient_id = ars.patient_id 
    LEFT JOIN a_consultation_logs acl 
    ON api.patient_id = aarf.patient_id;`;

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
    SELECT patient_fname, patient_mname, patient_lname, patient_suffix, patient_date_assess, patient_age, patient_age_group_id, ag_range, ag_description, ard_id,
    ard_chest_pain, ard_difficulty_breathing, ard_loss_consciousness, ard_slurred_speech, ard_facial_asymmetry, ard_numb_arm, ard_disoriented, ard_chest_retractions,
    ard_seizure_or_convulsion, ard_selfharm_or_suicide, ard_aggressive_behavior, ard_eye_injury, ard_severe_injuries, ard_severe_injuries, cl_id, cl_description, cl_date, fh_id,
    fh_hypertension, fh_stroke, fh_heart_disease, fh_diabetes_mellitus, fh_asthma, fh_cancer, fh_kidney_disease, fh_vascular_disease, fh_tb, fh_disorders, fh_copd, mngm_id, mngm_lifestyle_mod,
    mngm_med_antihypertensive, mngm_med_antidiabetes, mngm_date_followup, mngm_remarks, rf_id, rf_tobacco_use, rf_alcohol_intake, rf_binge_drinker, rf_physical_activity,
    rf_nad_assessment, rf_kg_weight, rf_cm_height, rf_bmi, rf_waist_circumference, rf_bp, pmh_id, pmh_hypertension, pmh_heart_disease, pmh_diabetes, pmh_specify_diabetes,
    pmh_cancer, pmh_specify_cancer, pmh_copd, pmh_asthma, pmh_allergies, pmh_specify_allergy, pmh_disorders, pmh_specify_disorder, pmh_vision_problems, pmh_previous_surgical_history, pmh_specify_surgical_history,
    pmh_thyroid_disorder, pmh_kidney_disorder, physician_name, ref_date, ref_reason, ref_destination, rs_id, rs_blood_sugar_fbs, rs_blood_sugar_rbs, rs_blood_sugar_date_taken, rs_blood_sugar_symptoms, rs_lipid_cholesterol,
    rs_lipid_hdl, rs_lipid_ldl, rs_lipid_vldl, rs_lipid_triglyceride, rs_lipid_date_taken, rs_urine_protein, rs_urine_protein_date_taken, rs_urine_ketones, rs_urine_ketones_date_taken, rs_respiratory
    FROM a_patient_info api
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

export default { officerSoftSearchRecords, supervisorSoftSearchRecords };
