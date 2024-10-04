import { RowDataPacket } from "mysql2";

export interface RiskScreening extends RowDataPacket {
  rs_id: string | null;
  patient_id: string | null;
  rs_blood_sugar_fbs: number | null;
  rs_blood_sugar_rbs: number | null;
  rs_blood_sugar_date_taken: Date | null;
  rs_blood_sugar_symptoms: string | null;
  rs_lipid_cholesterol: number | null;
  rs_lipid_hdl: number | null;
  rs_lipid_ldl: number | null;
  rs_lipid_vldl: number | null;
  rs_lipid_triglyceride: number | null;
  rs_lipid_date_taken: Date | null;
  rs_urine_protein: number | null;
  rs_urine_protein_date_taken: Date | null;
  rs_urine_ketones: number | null;
  rs_urine_ketones_date_taken: Date | null;
  rs_respiratory: string | null;
  hf_id: string;
}
