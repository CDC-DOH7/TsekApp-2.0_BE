export default interface ReferralSearchFilterInterface {
  ref_date_startdate: Date | null;
  ref_date_enddate: Date | null;
  ref_id: string | null;
  patient_id: string | null;
  officer_id: string | null;
  hf_id: string | null;
  physician_name: string | null;
  // ref_date: Date | null;
  ref_reason: string | null;
  ref_destination_id: string | null;
}
