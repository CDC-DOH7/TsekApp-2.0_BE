// controllers/OfficerController.ts
import { Request, Response } from "express";
import db from "../../../models/user-specific/OfficerModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ResultSetHeader } from "mysql2";
import { Officer } from "../../../types/user-based/officer";
import OfficerRegistrationProcedureParamsInterface from "../../../interfaces/user_specific_parameters/OfficerRegistrationProcedureParamsInterface";
import UniqueIDGenerator from "../../../common/cryptography/id_generators/user-specific/UserUniqueIDGenerator";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_ENCODED
  ? Buffer.from(process.env.JWT_SECRET_ENCODED, "base64").toString("utf-8")
  : "";

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN_ENCODED
  ? Buffer.from(process.env.JWT_EXPIRES_IN_ENCODED, "base64").toString("utf-8")
  : "";

const COOKIE_MAX_AGE = Number(process.env.JWT_EXPIRES_IN);

// Function for registration
export const register = async (req: Request, res: Response) => {
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
  } = req.body;

  try {
    // Check for duplicate email or username
    const duplicateCheckQuery = `SELECT * FROM a_officer_info WHERE officer_email = ? OR officer_username = ?`;
    const [duplicateResults] = await (await db).query<Officer[]>(duplicateCheckQuery, [officer_email, officer_username]);

    if (duplicateResults.length > 0) {
      return res.status(409).send("Email or Username already exists");
    }

    // If no duplicates, proceed with registration
    const hash = await bcrypt.hash(officer_password, 10);
    const officer_id = UniqueIDGenerator.generateCompactUniqueID(
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

    const procedureParams: OfficerRegistrationProcedureParamsInterface[] = [
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

    await (await db).query<ResultSetHeader>(query, procedureParams);
    res.status(200).send(`Welcome to e-tsekapp ${officer_lname.toUpperCase()}, ${officer_fname}`);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// Function for login
export const login = async (req: Request, res: Response) => {
  const { officer_username, officer_password } = req.body;
  const query = `SELECT * FROM a_officer_info WHERE officer_username = ?`;

  try {
    const [results] = await (await db).query<Officer[]>(query, [officer_username]);

    if (results.length === 0) {
      return res.status(401).send("User does not exist.");
    }

    const officer = results[0];
    const isMatch = await bcrypt.compare(officer_password, officer.officer_password);

    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ id: officer.officer_id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const messageString = `Logged in! Welcome ${officer.officer_lname.toUpperCase()}, ${officer.officer_fname}`;

    // Exclude the password field from the officer info
    const {
      officer_password: _, // Exclude
      officer_username: __, // Exclude
      officer_is_verified,
      officer_email,
      ...officer_info
    } = officer;

    res.cookie("token", token, { maxAge: COOKIE_MAX_AGE });
    res.status(200).json({ message: messageString, officer_info });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// Function for logout
export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).send("Logged out");
};
