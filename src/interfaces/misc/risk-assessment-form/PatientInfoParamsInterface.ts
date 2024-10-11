export default interface PatientInfoParamsInterface {
  patient_id: string;
  patient_fname: string;
  patient_mname: string | null;
  patient_lname: string;
  patient_suffix: string | null;
  patient_date_assess: Date;
  patient_age: number;
  patient_age_group_id: number;
  patient_sex: string;
  patient_dob: Date;
  patient_civil_status: string;
  patient_religion: string;
  patient_contact_no: string;
  patient_street: string | null;
  patient_purok: string | null;
  patient_sitio: string | null;
  brgy_id: number;
  muncity_id: number;
  province_id: number;
  patient_phic_no: string | null;
  patient_pwd_no: string | null;
  patient_emp_status: string;
  patient_ip: string;
  patient_ethnicity: string;
  hf_id: string;
}
