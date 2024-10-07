export default interface AdvancedSearchFilterInterface {
  patient_id: string | null;
  ard_id: string | null;
  cl_id: string | null;
  cl_start_date: Date | null;
  cl_end_date: Date | null;
  fh_id: string | null;
  mngm_id: string | null;
  mngm_start_date_followup: Date | null;
  mngm_end_date_followup: Date | null;
  rf_id: string | null;
  pmh_id: string | null;
  physician_name: string | null;
  ref_start_date: Date | null;
  ref_end_date: Date | null;
  rs_id: string | null;
  hf_id: string;
}
