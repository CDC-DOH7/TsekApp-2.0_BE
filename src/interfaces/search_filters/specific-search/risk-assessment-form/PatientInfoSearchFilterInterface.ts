export default interface PatientInfoSearchFilterInterface {
  patient_date_assess_startdate: Date | null;
  patient_date_assess_enddate: Date | null;
  patient_id: string | null;
  patient_fname: string | null;
  patient_mname: string | null;
  patient_lname: string | null;
  patient_suffix: string | null;
  // patient_date_assess: Date | null;
  patient_age: number | null;
  patient_religion_id: number | null;
  patient_ethnicity_id: number | null;
  hf_id: string | null;
}
