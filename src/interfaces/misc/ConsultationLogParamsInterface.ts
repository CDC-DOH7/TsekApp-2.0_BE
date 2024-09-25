export default interface ConsultationParamsInterface {
  cl_id: string | null;
  cl_description: string;
  cl_date: Date | null;
  patient_id: string;
  officer_id: string;
  hf_id: string;
  ref_id: string | null;
}
