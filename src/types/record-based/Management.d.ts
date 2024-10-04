import { RowDataPacket } from "mysql2";

export interface Management extends RowDataPacket {
  mngm_id: string | null;
  patient_id: string | null;
  mngm_lifestyle_mod: string | null;
  mngm_med_antihypertensive: string | null;
  mngm_med_antidiabetes: string | null;
  mngm_date_followup: Date | null;
  mngm_remarks: string | null;
  hf_id: string;
}
