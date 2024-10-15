import supervisorDb from "../../connections/SupervisorConnection";
import { ResultSetHeader } from "mysql2";
import { Supervisor } from "../../types/user-based/supervisor";
import SupervisorRegistrationParamsInterface from "../../interfaces/user_specific_parameters/registration-parameters/registration-inputs/SupervisorRegistrationParamsInterface";
import dotenv from "dotenv";
import TableNames from "../../common/constants/TableNames";
import UserRegistrationResultInterface from "../../interfaces/user_specific_parameters/registration-parameters/registration-result/UserRegistrationResultInterface";

// # --- Begin Operations for Supervisor Models --- #
dotenv.config();

export const supervisorRegister = async (
  supervisorDetails: SupervisorRegistrationParamsInterface[]
): Promise<UserRegistrationResultInterface> => {
  const [
    {
      supervisor_id,
      supervisor_email,
      supervisor_username,
      supervisor_password,
      supervisor_fname,
      supervisor_mname,
      supervisor_lname,
      supervisor_suffix,
      supervisor_designation,
      supervisor_contact_no,
      supervisor_is_verified,
      hf_id,
    },
  ] = supervisorDetails;

  const duplicateCheckQuery = `SELECT * FROM ${TableNames.SUPERVISOR_INFO_TABLE} WHERE supervisor_email = ? OR supervisor_username = ?`;
  const [duplicateResults] = await (
    await supervisorDb
  ).query<Supervisor[]>(duplicateCheckQuery, [
    supervisor_email,
    supervisor_username,
  ]);

  if (duplicateResults.length > 0) {
    return {
      message: "Email or Username already exists",
      duplicates: duplicateResults.length,
    };
  }

  try {
    // If no duplicates, proceed with registration
    const query = `INSERT INTO ${TableNames.SUPERVISOR_INFO_TABLE}
      (supervisor_id, supervisor_email, supervisor_username,
      supervisor_password, supervisor_fname, supervisor_mname,
      supervisor_lname, supervisor_suffix, supervisor_designation,
      supervisor_contact_no, supervisor_is_verified, hf_id) VALUES 
      (?, ?, ?,
      ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?)`;

    const procedureParams = [
      supervisor_id,
      supervisor_email,
      supervisor_username,
      supervisor_password,
      supervisor_fname,
      supervisor_mname,
      supervisor_lname,
      supervisor_suffix,
      supervisor_designation,
      supervisor_contact_no,
      supervisor_is_verified,
      hf_id,
    ];

    await (await supervisorDb).query<ResultSetHeader>(query, procedureParams);
    return {
      message: `Welcome to e-tsekapp ${supervisor_lname.toUpperCase()}, ${supervisor_fname}`,
      duplicates: duplicateResults.length,
    };
  } catch (err) {
    console.error("Registration error:", err);
    throw new Error("An error occurred during registration. Please try again.");
  }
};

// Create consultation record
const supervisorLogin = async (
  supervisorUsername: string
): Promise<Partial<Supervisor> | null> => {
  const query: string = `SELECT supervisor_id, supervisor_email, supervisor_password, supervisor_username, 
  supervisor_fname, supervisor_mname, supervisor_lname, supervisor_suffix,
  supervisor_contact_no, supervisor_designation, supervisor_is_verified,
  asi.hf_id, hf_name
  FROM a_supervisor_info asi 
  LEFT JOIN a_health_facility_info ahfi ON ahfi.hf_id = asi.hf_id 
  WHERE supervisor_username = ?`;

  try {
    const [results] = await (
      await supervisorDb
    ).query<Supervisor[]>(query, [supervisorUsername]);

    // Check if any supervisor was found
    if (results.length === 0) {
      return null; // No supervisor found, return null
    }

    const supervisor_info = results[0];

    return supervisor_info; // Return the supervisor info
  } catch (err) {
    console.error(err);
    return null; // Return null in case of an error
  }
};

export default {
  supervisorRegister,
  supervisorLogin,
};
