export default interface ConsultationLogSearchFilterInterface {
  cl_date_startDate: Date | null;
  cl_date_endDate: Date | null;
  cl_id: string | null;
  // cl_date: Date | null
  hf_id: string | null;
  patient_id: string | null;
  officer_id: string | null;
  ref_id: string | null;
}
