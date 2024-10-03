export default interface SupervisorRegistrationParamsInterface {
  supervisor_id: string;
  supervisor_email: string;
  supervisor_username: string;
  supervisor_password: string;
  supervisor_fname: string;
  supervisor_mname: string | null;
  supervisor_lname: string;
  supervisor_contact_no: string;
  supervisor_designation: string;
  supervisor_is_verified: boolean;
  hf_id: string;
}
