// controllers/SupervisorController.ts
import { Request, Response } from "express";
import db from "../../../models/user-specific/SupervisorModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ResultSetHeader } from "mysql2";
import { Supervisor } from "../../../types/user-based/supervisor.d ";
import SupervisorRegistrationProcedureParamsInterface from "../../../interfaces/user_specific_parameters/SupervisorRegistrationProcedureParamsInterface";
import UniqueIDGenerator from "../../../common/cryptography/id_generators/user-specific/UserUniqueIDGenerator";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_ENCODED
  ? Buffer.from(process.env.JWT_SECRET_ENCODED, "base64").toString("utf-8")
  : "";

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN_ENCODED
  ? Buffer.from(process.env.JWT_EXPIRES_IN_ENCODED, "base64").toString("utf-8")
  : "";

const COOKIE_MAX_AGE = Number(process.env.JWT_EXPIRES_IN) || 604800000; // One week in milliseconds

// Function for registration
export const register = async (req: Request, res: Response) => {
  const {
    supervisor_email,
    supervisor_username,
    supervisor_password,
    supervisor_fname,
    supervisor_mname,
    supervisor_lname,
    supervisor_designation,
    supervisor_contact_no,
    hf_id,
  } = req.body;

  try {
    const hash = await bcrypt.hash(supervisor_password, 10);
    
    const supervisor_id = UniqueIDGenerator.generateCompactUniqueID(
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
      supervisor_contact_no, 
      supervisor_designation, 
      supervisor_is_verified, 
      hf_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    const procedureParams: SupervisorRegistrationProcedureParamsInterface[] = [
      supervisor_id,
      supervisor_email,
      supervisor_username,
      hash,
      supervisor_fname,
      supervisor_mname,
      supervisor_lname,
      supervisor_contact_no,
      supervisor_designation,
      true, // set true as default
      hf_id,
    ];

    await (await db).query<ResultSetHeader>(query, procedureParams);
    res.status(201).send("Supervisor registered");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// Function for login
export const login = async (req: Request, res: Response) => {
  const { supervisor_username, supervisor_password } = req.body;

  try {
    const query = `SELECT * FROM a_supervisor_info WHERE supervisor_username = ?`;
    const [results] = await (await db).query<Supervisor[]>(query, [supervisor_username]);

    if (results.length === 0) {
      return res.status(401).send("Invalid credentials");
    }

    const supervisor = results[0];
    const isMatch = await bcrypt.compare(supervisor_password, supervisor.supervisor_password);
    
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ id: supervisor.supervisor_id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const messageString = `Logged in! Welcome ${supervisor.supervisor_lname.toUpperCase()}, ${supervisor.supervisor_fname}`;
    
    // Exclude the password field from the supervisor info
    const {
      supervisor_password: _, // Exclude
      supervisor_username: __, // Exclude
      supervisor_is_verified,
      supervisor_email,
      ...supervisor_info
    } = supervisor;

    res.cookie("token", token, { maxAge: COOKIE_MAX_AGE });
    res.status(200).json({ message: messageString, supervisor_info });
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

// Function for deletion of officer accounts
export const deleteAccount = async (req: Request, res: Response) => {
  // Implement deletion logic if needed
  res.status(200).send("Deleted account.");
};
