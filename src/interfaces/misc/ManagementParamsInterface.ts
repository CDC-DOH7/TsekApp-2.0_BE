export default interface ManagementParamsInterface {
  mngm_id: string | null;
  patient_id: string | null;
  mngm_diagnosis: string | null;
  mngm_diagnosis_date: Date | null;
  mngm_medication_prescription: string | null;
  mngm_followup_date: Date | null;
  mngm_referral: string | null;
  mngm_notes: string | null;
}
