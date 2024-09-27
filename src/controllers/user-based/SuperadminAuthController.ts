// controllers/SuperadminController.ts
import { Request, Response } from "express";
import db from "../../models/user-specific/SuperadminModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ResultSetHeader } from "mysql2";
import { Superadmin } from "../../types/user-based/superadmin";
import SuperadminRegistrationProcedureParamsInterface from "../../interfaces/user_specific_parameters/SuperadminRegistrationProcedureParamsInterface";
import UniqueIDGenerator from "../../common/cryptography/id_generators/user-specific/UserUniqueIDGenerator";
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
    superadmin_email,
    superadmin_username,
    superadmin_password,
    superadmin_fname,
    superadmin_mname,
    superadmin_lname,
  } = req.body;

  try {
    const hash = await bcrypt.hash(superadmin_password, 10);
    const query = `INSERT INTO a_superadmin_info
    (superadmin_id, 
    superadmin_email, 
    superadmin_username, 
    superadmin_password, 
    superadmin_fname, 
    superadmin_mname, 
    superadmin_lname) 
    VALUES (?, ?, ?, ?, ?, ?, ?);`;

    const superadmin_id = UniqueIDGenerator.generateCompactUniqueID(
      superadmin_fname,
      superadmin_mname,
      superadmin_lname,
      "ADMIN", // constant
      "E_TSEKAPP" // constant
    );

    const procedureParams: SuperadminRegistrationProcedureParamsInterface[] = [
      superadmin_id,
      superadmin_email,
      superadmin_username,
      hash,
      superadmin_fname,
      superadmin_mname,
      superadmin_lname,
    ];

    await (await db).query<ResultSetHeader>(query, procedureParams);
    res.status(201).send({ message: "Superadmin registered" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// Function for login
export const login = async (req: Request, res: Response) => {
  const { superadmin_username, superadmin_password } = req.body;

  try {
    const query = `SELECT * FROM a_superadmin_info WHERE superadmin_username = ?`;
    const [results] = await (await db).query<Superadmin[]>(query, [superadmin_username]);

    if (results.length === 0) {
      return res.status(401).send("Invalid credentials");
    }

    const superadmin = results[0];
    const isMatch = await bcrypt.compare(superadmin_password, superadmin.superadmin_password);

    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ id: superadmin.superadmin_id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const messageString = `Logged in! Welcome ${superadmin.superadmin_lname.toUpperCase()}, ${superadmin.superadmin_fname}`;

    // Exclude the password field from the superadmin info
    const {
      superadmin_password: _, // Exclude
      superadmin_username: __, // Exclude
      superadmin_email,
      ...superadmin_info
    } = superadmin;

    res.cookie("token", token, { maxAge: COOKIE_MAX_AGE });
    res.status(200).json({ message: messageString, superadmin_info });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// Function for logout
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).send("Logged out");
};
