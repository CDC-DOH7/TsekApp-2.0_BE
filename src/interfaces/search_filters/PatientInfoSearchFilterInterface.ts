export default interface PatientInfoSearchFilterInterface {
  patient_date_assess_startDate: Date | null;
  patient_date_assess_endDate: Date | null;
  patient_id: string | null;
  patient_fname: string | null;
  patient_mname: string | null;
  patient_lname: string | null;
  // patient_date_assess: Date | null;
  patient_age: number | null;
  hf_id: string | null;
}
