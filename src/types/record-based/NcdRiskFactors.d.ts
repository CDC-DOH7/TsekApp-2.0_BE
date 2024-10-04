import { RowDataPacket } from "mysql2";

export interface NcdRiskFactors extends RowDataPacket {
  rf_id: string | null;
  patient_id: string | null;
  rf_tobacco_use: string | null;
  rf_alcohol_intake: string | null;
  rf_binge_drinker: string | null;
  rf_physical_activity: string | null;
  rf_nad_assessment: string | null;
  rf_kg_weight: number | null;
  rf_cm_height: number | null;
  rf_bmi: number | null;
  rf_waist_circumference: number | null;
  rf_bp: string | null;
  hf_id: string;
}
