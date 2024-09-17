import { Request, Response } from "express";
import db from "../models/officerModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ResultSetHeader } from "mysql2";
import { Officer } from "../types/officer";
import OfficerRegistrationProcedureParamsInterface from "../interfaces/procedure_parameters/OfficerRegistrationProcedureParamsInterface";
import UniqueIDGenerator from "../common/cryptography/id_generators/UserUniqueIDGenerator";

// COOKIE MAX AGE
const COOKIE_MAX_AGE = Number(process.env.COOKIE_MAX_AGE) || 604800000; // One week in milliseconds

// function for registration
export const register = (req: Request, res: Response) => {
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
    officer_facility_code,
  } = req.body;

  bcrypt.hash(officer_password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send(err);
    }

    // query to be called to the database
    const query = `INSERT INTO officer_info(officer_id, officer_email, officer_username, officer_password, officer_fname, officer_mname, officer_lname, officer_designation, officer_contact_no, officer_is_verified, officer_facility_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const officer_id = UniqueIDGenerator.generateCompactUniqueID(
      officer_fname,
      officer_mname,
      officer_lname,
      officer_designation,
      officer_facility_code
    );

    const procedureParams: OfficerRegistrationProcedureParamsInterface[] = [
      officer_id,
      officer_email,
      officer_username,
      hash,
      officer_fname,
      officer_mname,
      officer_lname,
      officer_contact_no,
      officer_designation,
      officer_is_verified,
      officer_facility_code,
    ];

    // execute the query
    db.query<ResultSetHeader>(query, procedureParams, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send("User registered");
    });
  });
};

// export const

// function for login
export const login = (req: Request, res: Response) => {
  const { officer_username, officer_password } = req.body;
  console.log(req.body);
  const query = `SELECT * FROM officer_info WHERE officer_username = ?`;
  db.query<Officer[]>(query, [officer_username], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(401).send("Invalid credentials");
    }
    const officer = results[0];
    bcrypt.compare(
      officer_password,
      officer.officer_password,
      (err, isMatch) => {
        if (err) {
          return res.status(500).send(err);
        }
        if (!isMatch) {
          return res.status(401).send("Invalid credentials");
        }

        // substituted values because .env still doesn't work.
        const JWT_SECRET = "d0hRegion7@eTs3kA99";
        const JWT_EXPIRES_IN = "30d";

        const token = jwt.sign(
          { id: officer.officer_id },
          //process.env.JWT_SECRET as string,
          JWT_SECRET,
          //{ expiresIn: process.env.JWT_EXPIRES_IN }
          { expiresIn: JWT_EXPIRES_IN }
        );
        res.cookie("token", token, { maxAge: COOKIE_MAX_AGE, httpOnly: true });
        res.status(200).send("Logged in");
      }
    );
  });
};

// function for logout
export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).send("Logged out");
};
