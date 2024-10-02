import superadminDb from "../../connections/SuperadminConnection";
import bcrypt from "bcryptjs";
import { ResultSetHeader } from "mysql2";
import { Superadmin } from "../../types/user-based/superadmin";
import SuperadminRegistrationParamsInterface from "../../interfaces/user_specific_parameters/registration-parameters/SuperadminRegistrationParamsInterface";
import UserUniqueIDGenerator from "../../common/cryptography/id_generators/user-specific/UserUniqueIDGenerator";
import dotenv from "dotenv";
import TableNames from "../../common/constants/TableNames";

// # --- Begin Operations for Superadmin Models --- #
dotenv.config();

const superadminCheckAccountDuplicate = async (
  superadmin_email: string,
  superadmin_username: string
): Promise<number> => {
  const duplicateCheckQuery = `SELECT COUNT(*) AS count FROM ${TableNames.SUPERADMIN_INFO_TABLE} WHERE superadmin_email = ? OR superadmin_username = ?`;

  // Execute the query and expect a single result row with a 'count' field
  const result = await (
    await superadminDb
  ).query<Superadmin[]>(duplicateCheckQuery, [
    superadmin_email,
    superadmin_username,
  ]);

  if (result.length > 0) {
    return result.length;
  }
  return result.length; // Return the count, defaulting to 0 if no results
};

const superadminRegister = async (
  superadminDetails: SuperadminRegistrationParamsInterface[]
): Promise<string> => {
  const [
    {
      superadmin_email,
      superadmin_username,
      superadmin_password,
      superadmin_fname,
      superadmin_mname,
      superadmin_lname,
    },
  ] = superadminDetails;

  const designation = "superadmin";
  const facilityCode = "DOH-7";

  try {
    // If no duplicates, proceed with registration
    const hash = await bcrypt.hash(superadmin_password, 10);
    const superadmin_id = UserUniqueIDGenerator.generateCompactUniqueID(
      superadmin_fname,
      superadmin_mname,
      superadmin_lname,
      designation,
      facilityCode
    );

    const query = `INSERT INTO a_superadmin_info
      (superadmin_id,
      superadmin_email, 
      superadmin_username, 
      superadmin_password, 
      superadmin_fname, 
      superadmin_mname, 
      superadmin_lname) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const procedureParams = [
      superadmin_id,
      superadmin_email,
      superadmin_username,
      hash,
      superadmin_fname,
      superadmin_mname,
      superadmin_lname,
    ];

    await (await superadminDb).query<ResultSetHeader>(query, procedureParams);
    return `Welcome to e-tsekapp ${superadmin_lname.toUpperCase()}, ${superadmin_fname}`;
  } catch (err) {
    console.error("Registration error:", err);
    return "An error occurred during registration. Please try again.";
  }
};

// Create consultation record
const superadminLogin = async (
  superadminUsername: string
): Promise<Partial<Superadmin> | null> => {
  const query: string = `SELECT * FROM ${TableNames.SUPERADMIN_INFO_TABLE} WHERE superadmin_username = ?`;

  try {
    const [results] = await (
      await superadminDb
    ).query<Superadmin[]>(query, [superadminUsername]);

    // Check if any superadmin was found
    if (results.length === 0) {
      return null; // No superadmin found, return null
    }

    const superadmin = results[0];

    // Exclude the password field from the superadmin info
    const {
      superadmin_password: _, // Exclude
      superadmin_username: __, // Exclude
      ...superadmin_info // Remaining superadmin info
    } = superadmin;

    return superadmin_info; // Return the superadmin info without password
  } catch (err) {
    console.error(err);
    return null; // Return null in case of an error
  }
};

export default {
  superadminCheckAccountDuplicate,
  superadminRegister,
  superadminLogin,
};
