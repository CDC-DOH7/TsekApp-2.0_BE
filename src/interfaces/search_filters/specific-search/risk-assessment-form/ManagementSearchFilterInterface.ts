export default interface ManagementSearchFilterInterface {
  mngm_date_followup_startdate: Date | null,
  mngm_date_followup_enddate: Date | null,
  mngm_id: string | null;
  patient_id: string | null;
  hf_id: string;
}
