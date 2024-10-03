import officerDb from "../../connections/OfficerConnection";
import { ResultSetHeader } from "mysql2";
import { Officer } from "../../types/user-based/officer";
import OfficerRegistrationParamsInterface from "../../interfaces/user_specific_parameters/registration-parameters/OfficerRegistrationParamsInterface";
import dotenv from "dotenv";
import TableNames from "../../common/constants/TableNames";

// # --- Begin Operations for Officer Models --- #
dotenv.config();

export const officerRegister = async (
  officerDetails: OfficerRegistrationParamsInterface[]
): Promise<string> => {
  const [
    {
      officer_id,
      officer_email,
      officer_username,
      officer_password,
      officer_fname,
      officer_mname,
      officer_lname,
      officer_designation,
      officer_contact_no,
      officer_is_verified,
      hf_id,
    },
  ] = officerDetails;

  const duplicateCheckQuery = `SELECT * FROM ${TableNames.OFFICER_INFO_TABLE} WHERE officer_email = ? OR officer_username = ?`;
  const [duplicateResults] = await (
    await officerDb
  ).query<Officer[]>(duplicateCheckQuery, [officer_email, officer_username]);

  if (duplicateResults.length > 0) {
    return "Email or Username already exists";
  }

  try {
    // If no duplicates, proceed with registration
    const query = `INSERT INTO ${TableNames.OFFICER_INFO_TABLE}
      (officer_id, officer_email, officer_username,
      officer_password, officer_fname, officer_mname,
      officer_lname, officer_designation, officer_contact_no,
      officer_is_verified, hf_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const procedureParams = [
      officer_id,
      officer_email,
      officer_username,
      officer_password,
      officer_fname,
      officer_mname,
      officer_lname,
      officer_designation,
      officer_contact_no,
      officer_is_verified,
      hf_id,
    ];

    await (await officerDb).query<ResultSetHeader>(query, procedureParams);
    return `Welcome to e-tsekapp ${officer_lname.toUpperCase()}, ${officer_fname}`;
  } catch (err) {
    console.error("Registration error:", err);
    throw new Error("An error occurred during registration. Please try again.");
  }
};

// Create consultation record
const officerLogin = async (
  officerUsername: string
): Promise<Partial<Officer> | null> => {
  const query: string = `SELECT * FROM ${TableNames.OFFICER_INFO_TABLE} WHERE officer_username = ?`;

  try {
    const [results] = await (
      await officerDb
    ).query<Officer[]>(query, [officerUsername]);

    // Check if any officer was found
    if (results.length === 0) {
      return null; // No officer found, return null
    }

    const officer_info = results[0];

    return officer_info; // Return the officer info
  } catch (err) {
    console.error(err);
    return null; // Return null in case of an error
  }
};

export default {
  officerRegister,
  officerLogin,
};
