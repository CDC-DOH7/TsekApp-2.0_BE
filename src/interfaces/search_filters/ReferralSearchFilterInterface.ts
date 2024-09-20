export default interface ReferralSearchFilterInterface {
  ref_date_startDate: Date | null;
  ref_date_endDate: Date | null;
  ref_id: string | null;
  patient_id: string | null;
  officer_id: string | null;
  hf_id: string | null;
  // ref_date: Date | null;
  ref_reason: string | null;
  ref_destination: string | null;
}
