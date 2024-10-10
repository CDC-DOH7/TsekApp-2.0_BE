import superadminDb from "../../connections/SuperadminConnection";
import { ResultSetHeader } from "mysql2";
import { Superadmin } from "../../types/user-based/superadmin";
import SuperadminRegistrationParamsInterface from "../../interfaces/user_specific_parameters/registration-parameters/registration-inputs/SuperadminRegistrationParamsInterface";
import dotenv from "dotenv";
import TableNames from "../../common/constants/TableNames";
import UserRegistrationResultInterface from "../../interfaces/user_specific_parameters/registration-parameters/registration-result/UserRegistrationResultInterface";

// # --- Begin Operations for Superadmin Models --- #
dotenv.config();

export const superadminRegister = async (
  superadminDetails: SuperadminRegistrationParamsInterface[]
): Promise<UserRegistrationResultInterface> => {
  const [
    {
      superadmin_id,
      superadmin_email,
      superadmin_username,
      superadmin_password,
      superadmin_fname,
      superadmin_mname,
      superadmin_lname,
    },
  ] = superadminDetails;

  const duplicateCheckQuery = `SELECT * FROM ${TableNames.SUPERADMIN_INFO_TABLE} WHERE superadmin_email = ? OR superadmin_username = ?`;
  const [duplicateResults] = await (
    await superadminDb
  ).query<Superadmin[]>(duplicateCheckQuery, [
    superadmin_email,
    superadmin_username,
  ]);

  if (duplicateResults.length > 0) {
    return {
      message: "Email or Username already exists",
      duplicates: duplicateResults.length,
    };
  }

  try {
    // If no duplicates, proceed with registration
    const query = `INSERT INTO ${TableNames.SUPERADMIN_INFO_TABLE}
      (superadmin_id, superadmin_email, superadmin_username,
      superadmin_password, superadmin_fname, superadmin_mname,
      superadmin_lname) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const procedureParams = [
      superadmin_id,
      superadmin_email,
      superadmin_username,
      superadmin_password,
      superadmin_fname,
      superadmin_mname,
      superadmin_lname,
    ];

    await (await superadminDb).query<ResultSetHeader>(query, procedureParams);
    return {
      message: `Welcome to e-tsekapp ${superadmin_lname.toUpperCase()}, ${superadmin_fname}`,
      duplicates: duplicateResults.length,
    };
  } catch (err) {
    console.error("Registration error:", err);
    throw new Error("An error occurred during registration. Please try again.");
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

    const superadmin_info = results[0];

    return superadmin_info; // Return the superadmin info
  } catch (err) {
    console.error(err);
    return null; // Return null in case of an error
  }
};

export default {
  superadminRegister,
  superadminLogin,
};
