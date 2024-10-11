import { RowDataPacket } from "mysql2";

export interface Superadmin extends RowDataPacket {
  superadmin_id: string;
  superadmin_email: string;
  superadmin_username: string;
  superadmin_password: string;
  superadmin_fname: string;
  superadmin_mname: string | null;
  superadmin_lname: string;
  superadmin_suffix: string | null;
}
