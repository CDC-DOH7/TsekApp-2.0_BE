import { RowDataPacket } from "mysql2";

export interface Consultation extends RowDataPacket {
  cl_id: string | null;
  cl_description: string;
  cl_date: Date | null;
  patient_id: string;
  officer_id: string;
  hf_id: string;
  ref_id: string;
}
