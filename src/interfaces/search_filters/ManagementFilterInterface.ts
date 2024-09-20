export default interface ManagementSearchFilterInterface {
  mngm_diagnosis_date_startDate: Date | null;
  mngm_diagnosis_date_endDate: Date | null;
  mngm_followup_date_startDate: Date | null;
  mngm_followup_date_endDate: Date | null;
  mgm_id: string | null;
  patient_id: string | null;
  // mngm_diagnosis_date: Date | null;
  // mngm_followup_date: Date | null;
}
