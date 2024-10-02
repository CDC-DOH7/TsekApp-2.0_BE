import officerDb from "../../connections/OfficerConnection";
import bcrypt from "bcryptjs";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { Officer } from "../../types/user-based/officer";
import OfficerRegistrationParamsInterface from "../../interfaces/user_specific_parameters/registration-parameters/OfficerRegistrationParamsInterface";
import UserUniqueIDGenerator from "../../common/cryptography/id_generators/user-specific/UserUniqueIDGenerator";
import dotenv from "dotenv";
import TableNames from "../../common/constants/TableNames";

// # --- Begin Operations for Officer Models --- #
dotenv.config();

const officerCheckAccountDuplicate = async (
  officer_email: string,
  officer_username: string
): Promise<any> => {
  const duplicateCheckQuery = `SELECT * FROM a_officer_info WHERE officer_email = ? OR officer_username = ?`;
  const [duplicateResults] = await (await officerDb).query<Officer[]>(duplicateCheckQuery, [officer_email, officer_username]);

  return duplicateResults.length;
};


const officerRegister = async (
  officerDetails: OfficerRegistrationParamsInterface[]
): Promise<string> => {
  const [
    {
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

  try {
    // If no duplicates, proceed with registration
    const hash = await bcrypt.hash(officer_password, 10);
    const officer_id = UserUniqueIDGenerator.generateCompactUniqueID(
      officer_fname,
      officer_mname,
      officer_lname,
      officer_designation,
      hf_id
    );

    const query = `INSERT INTO ${TableNames.OFFICER_INFO_TABLE}
      (officer_id,
      officer_email, 
      officer_username, 
      officer_password, 
      officer_fname, 
      officer_mname, 
      officer_lname, 
      officer_designation, 
      officer_contact_no, 
      officer_is_verified, 
      hf_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const procedureParams = [
      officer_id,
      officer_email,
      officer_username,
      hash,
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
    return "An error occurred during registration. Please try again.";
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

    const officer = results[0];

    // Exclude the password field from the officer info
    const {
      officer_password: _, // Exclude
      officer_username: __, // Exclude
      ...officer_info // Remaining officer info
    } = officer;

    return officer_info; // Return the officer info without password
  } catch (err) {
    console.error(err);
    return null; // Return null in case of an error
  }
};

export default {
  officerCheckAccountDuplicate,
  officerRegister,
  officerLogin,
};
