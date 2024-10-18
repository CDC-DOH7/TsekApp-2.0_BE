export default interface ReferralParamsInterface {
  ref_id: string | null;
  patient_id: string | null;
  officer_id: string | null;
  physician_name: string | null;
  hf_id: string | null;
  ref_date: Date | null;
  ref_reason: string | null;
  ref_destination_id: string | null;
}
