import supervisorDb from "../../connections/SupervisorConnection";
import bcrypt from "bcryptjs";
import { ResultSetHeader } from "mysql2";
import { Supervisor } from "../../types/user-based/supervisor.d ";
import SupervisorRegistrationParamsInterface from "../../interfaces/user_specific_parameters/registration-parameters/SupervisorRegistrationParamsInterface";
import UserUniqueIDGenerator from "../../common/cryptography/id_generators/user-specific/UserUniqueIDGenerator";
import dotenv from "dotenv";
import TableNames from "../../common/constants/TableNames";

// # --- Begin Operations for Supervisor Models --- #
dotenv.config();

const supervisorCheckAccountDuplicate = async (
  supervisor_email: string,
  supervisor_username: string
): Promise<number> => {
  const duplicateCheckQuery = `SELECT COUNT(*) AS count FROM ${TableNames.SUPERVISOR_INFO_TABLE} WHERE supervisor_email = ? OR supervisor_username = ?`;

  // Execute the query and expect a single result row with a 'count' field
  const result = await (
    await supervisorDb
  ).query<Supervisor[]>(duplicateCheckQuery, [
    supervisor_email,
    supervisor_username,
  ]);

  if (result.length > 0) {
    return result.length;
  }
  return result.length; // Return the count, defaulting to 0 if no results
};

const supervisorRegister = async (
  supervisorDetails: SupervisorRegistrationParamsInterface[]
): Promise<string> => {
  const [
    {
      supervisor_email,
      supervisor_username,
      supervisor_password,
      supervisor_fname,
      supervisor_mname,
      supervisor_lname,
      supervisor_designation,
      supervisor_contact_no,
      supervisor_is_verified,
      hf_id,
    },
  ] = supervisorDetails;

  try {
    // If no duplicates, proceed with registration
    const hash = await bcrypt.hash(supervisor_password, 10);
    const supervisor_id = UserUniqueIDGenerator.generateCompactUniqueID(
      supervisor_fname,
      supervisor_mname,
      supervisor_lname,
      supervisor_designation,
      hf_id
    );

    const query = `INSERT INTO a_supervisor_info
      (supervisor_id,
      supervisor_email, 
      supervisor_username, 
      supervisor_password, 
      supervisor_fname, 
      supervisor_mname, 
      supervisor_lname, 
      supervisor_designation, 
      supervisor_contact_no, 
      supervisor_is_verified, 
      hf_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const procedureParams = [
      supervisor_id,
      supervisor_email,
      supervisor_username,
      hash,
      supervisor_fname,
      supervisor_mname,
      supervisor_lname,
      supervisor_designation,
      supervisor_contact_no,
      supervisor_is_verified,
      hf_id,
    ];

    await (await supervisorDb).query<ResultSetHeader>(query, procedureParams);
    return `Welcome to e-tsekapp ${supervisor_lname.toUpperCase()}, ${supervisor_fname}`;
  } catch (err) {
    console.error("Registration error:", err);
    return "An error occurred during registration. Please try again.";
  }
};

// Create consultation record
const supervisorLogin = async (
  supervisorUsername: string
): Promise<Partial<Supervisor> | null> => {
  const query: string = `SELECT * FROM ${TableNames.SUPERVISOR_INFO_TABLE} WHERE supervisor_username = ?`;

  try {
    const [results] = await (
      await supervisorDb
    ).query<Supervisor[]>(query, [supervisorUsername]);

    // Check if any supervisor was found
    if (results.length === 0) {
      return null; // No supervisor found, return null
    }

    const supervisor = results[0];

    // Exclude the password field from the supervisor info
    const {
      supervisor_password: _, // Exclude
      supervisor_username: __, // Exclude
      ...supervisor_info // Remaining supervisor info
    } = supervisor;

    return supervisor_info; // Return the supervisor info without password
  } catch (err) {
    console.error(err);
    return null; // Return null in case of an error
  }
};

export default {
  supervisorCheckAccountDuplicate,
  supervisorRegister,
  supervisorLogin,
};
