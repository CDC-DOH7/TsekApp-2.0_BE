import { RowDataPacket } from "mysql2";

export interface Ard extends RowDataPacket {
  ard_id: string | null;
  patient_id: string | null;
  ard_chest_pain: string | null;
  ard_difficulty_breathing: string | null;
  ard_loss_consciousness: string | null;
  ard_slurred_speech: string | null;
  ard_facial_asymmetry: string | null;
  ard_numb_arm: string | null;
  ard_disoriented: string | null;
  ard_chest_retractions: string | null;
  ard_seizure_or_convulsion: string | null;
  ard_selfharm_or_suicide: string | null;
  ard_aggressive_behavior: string | null;
  ard_eye_injury: string | null;
  ard_severe_injuries: string | null;
  hf_id: string;
}
