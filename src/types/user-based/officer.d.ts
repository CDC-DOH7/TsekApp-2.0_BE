import { RowDataPacket } from "mysql2";

export interface Officer extends RowDataPacket {
  officer_id: string;
  officer_email: string;
  officer_username: string;
  officer_password: string;
  officer_fname: string;
  officer_mname: string | null;
  officer_lname: string;
  officer_suffix: string | null;
  officer_contact_no: string;
  officer_designation: string;
  officer_is_verified: boolean;
  hf_id: string;
  hf_name: string;
}
