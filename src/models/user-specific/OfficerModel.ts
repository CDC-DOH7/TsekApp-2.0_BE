import { Request, Response } from "express";
import officerDb from "../../connections/OfficerConnection"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ResultSetHeader } from "mysql2";
import { Officer } from "../../types/user-based/officer";
import OfficerRegistrationProcedureParamsInterface from "../../interfaces/user_specific_parameters/OfficerRegistrationProcedureParamsInterface";
import UserUniqueIDGenerator from "../../common/cryptography/id_generators/user-specific/UserUniqueIDGenerator";
import dotenv from "dotenv";

// # --- Begin Operations for Officer Models --- #

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_ENCODED
  ? Buffer.from(process.env.JWT_SECRET_ENCODED, "base64").toString("utf-8")
  : "";

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN_ENCODED
  ? Buffer.from(process.env.JWT_EXPIRES_IN_ENCODED, "base64").toString("utf-8")
  : "";

const COOKIE_MAX_AGE = Number(process.env.JWT_EXPIRES_IN);

const officerRegister = async (officerDetails: OfficerRegistrationProcedureParamsInterface): Promise<string> => {
    const {
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
    } = officerDetails;
  
    try {
      // Check for duplicate email or username
      const duplicateCheckQuery = `SELECT * FROM a_officer_info WHERE officer_email = ? OR officer_username = ?`;
      const [duplicateResults] = await (await officerDb).query<Officer[]>(duplicateCheckQuery, [officer_email, officer_username]);
  
      if (duplicateResults.length > 0) {
        return "Email or Username already exists";
      }
  
      // If no duplicates, proceed with registration
      const hash = await bcrypt.hash(officer_password, 10);
      const officer_id = UserUniqueIDGenerator.generateCompactUniqueID(
        officer_fname,
        officer_mname,
        officer_lname,
        officer_designation,
        hf_id
      );
  
      const query = `INSERT INTO a_officer_info
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
  
      const procedureParams: [string, string, string, string, string, string | null, string, string, string, boolean, string] = [
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
const officerCreateArd = async (ard: ArdParamsInterface): Promise<QueryResult> => {
  const query = `INSERT INTO ${TableNames.ASSESS_RED_FLAG_TABLE}
  (ard_id,
  patient_id, 
  ard_chest_pain, 
  ard_difficulty_breathing, 
  ard_loss_consciousness, 
  ard_slurred_speech, 
  ard_facial_asymmetry, 
  ard_numb_arm, 
  ard_disoriented, 
  ard_chest_retractions, 
  ard_seizure_or_convulsion, 
  ard_selfharm_or_suicide, 
  ard_aggressive_behavior, 
  ard_eye_injury, 
  ard_severe_injuries) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // officer-specific
  try {
    const [result] = await (await officerDb).query(query, [
      ard.ard_id,
      ard.patient_id,
      ard.ard_chest_pain,
      ard.ard_difficulty_breathing,
      ard.ard_loss_consciousness,
      ard.ard_slurred_speech,
      ard.ard_facial_asymmetry,
      ard.ard_numb_arm,
      ard.ard_disoriented,
      ard.ard_chest_retractions,
      ard.ard_seizure_or_convulsion,
      ard.ard_selfharm_or_suicide,
      ard.ard_aggressive_behavior,
      ard.ard_eye_injury,
      ard.ard_severe_injuries,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

// # ---- Supervisor Functions ---- # //

const supervisorSearchArd = async (searchFilter: ArdSearchFilterInterface): Promise<QueryResult> => {
  const { ard_id, patient_id } = searchFilter;

  let query = `SELECT * FROM ${TableNames.ASSESS_RED_FLAG_TABLE} WHERE ard_id = ?`;
  const queryParams: any[] = [ard_id];

  if (patient_id) {
    query += " AND patient_id LIKE ?";
    queryParams.push(`%${patient_id}%`);
  }

  // supervisor-specific
  try {
    const [results] = await (await supervisorDb).query(query, queryParams);
    return results;
  } catch (err) {
    throw err;
  }
};

// Update consultation record
const supervisorUpdateArd = async (ard: ArdParamsInterface): Promise<QueryResult> => {
  const query = `UPDATE ${TableNames.ASSESS_RED_FLAG_TABLE} SET 
    ard_chest_pain = ?, 
    ard_difficulty_breathing = ?, 
    ard_loss_consciousness = ?, 
    ard_slurred_speech = ?, 
    ard_facial_asymmetry = ?, 
    ard_numb_arm = ?, 
    ard_disoriented = ?, 
    ard_chest_retractions = ?, 
    ard_seizure_or_convulsion = ?, 
    ard_selfharm_or_suicide = ?, 
    ard_aggressive_behavior = ?, 
    ard_eye_injury = ?, 
    ard_severe_injuries = ? 
    WHERE ard_id = ? AND patient_id = ?`;

  // supervisor-specific
  try {
    const [result] = await (await supervisorDb).query(query, [
      ard.ard_chest_pain,
      ard.ard_difficulty_breathing,
      ard.ard_loss_consciousness,
      ard.ard_slurred_speech,
      ard.ard_facial_asymmetry,
      ard.ard_numb_arm,
      ard.ard_disoriented,
      ard.ard_chest_retractions,
      ard.ard_seizure_or_convulsion,
      ard.ard_selfharm_or_suicide,
      ard.ard_aggressive_behavior,
      ard.ard_eye_injury,
      ard.ard_severe_injuries,
      ard.ard_id,
      ard.patient_id,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

// Delete consultation record
const supervisorDeleteArd = async (ard_id: string): Promise<QueryResult> => {
  const query = `DELETE FROM ${TableNames.ASSESS_RED_FLAG_TABLE} WHERE ard_id = ?`;

  // supervisor-specific
  try {
    const [result] = await (await supervisorDb).query(query, [ard_id]);
    return result;
  } catch (err) {
    throw err;
  }
};

export default {
  officerSearchArd,
  officerCreateArd,
  supervisorSearchArd,
  supervisorUpdateArd,
  supervisorDeleteArd,
};
