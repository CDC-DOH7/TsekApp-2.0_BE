import { Request, Response } from "express";
import db from "../../models/user-based/officerModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ResultSetHeader } from "mysql2";
import { Officer } from "../../types/officer";
import OfficerRegistrationProcedureParamsInterface from "../../interfaces/procedure_parameters/OfficerRegistrationProcedureParamsInterface";
import UniqueIDGenerator from "../../common/cryptography/id_generators/UserUniqueIDGenerator";
import JwtConfig from "../../common/constants/JwtConfig";

// COOKIE MAX AGE
const COOKIE_MAX_AGE = Number(JwtConfig.JWT_EXPIRES_IN) || 604800000; // One week in milliseconds

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
    hf_id,
  } = req.body;

  // Check for duplicate email or username
  const duplicateCheckQuery = `SELECT * FROM a_officer_info WHERE officer_email = ? OR officer_username = ?`;
  db.query<Officer[]>(
    duplicateCheckQuery,
    [officer_email, officer_username],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (results.length > 0) {
        return res.status(409).send("Email or Username already exists");
      }

      // If no duplicates, proceed with registration
      bcrypt.hash(officer_password, 10, (err, hash) => {
        if (err) {
          return res.status(500).send(err);
        }

        // query to be called to the database
        const query = `INSERT INTO officer_info(officer_id, officer_email, officer_username, officer_password, officer_fname, officer_mname, officer_lname, officer_designation, officer_contact_no, officer_is_verified, hf_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const officer_id = UniqueIDGenerator.generateCompactUniqueID(
          officer_fname,
          officer_mname,
          officer_lname,
          officer_designation,
          hf_id
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
          hf_id,
        ];

        // execute the query
        db.query<ResultSetHeader>(query, procedureParams, (err, results) => {
          if (err) {
            return res.status(500).send(err);
          }
          res
            .status(200)
            .send(
              `Welcome to e-TsekApp ${officer_lname.toUpperCase()}, ${officer_fname}`
            );
        });
      });
    }
  );
};

// function for login
export const login = (req: Request, res: Response) => {
  const { officer_username, officer_password } = req.body;
  const query = `SELECT * FROM a_officer_info WHERE officer_username = ?`;
  db.query<Officer[]>(query, [officer_username], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(401).send("User does not exist.");
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

        const token = jwt.sign(
          { id: officer.officer_id },
          //process.env.JWT_SECRET as string,
          JwtConfig.JWT_SECRET,
          //{ expiresIn: process.env.JWT_EXPIRES_IN }
          { expiresIn: JwtConfig.JWT_EXPIRES_IN }
        );
        res.cookie("token", token, { maxAge: COOKIE_MAX_AGE });
        res
          .status(200)
          .send(
            `Logged in! Welcome ${officer.officer_lname.toUpperCase()}, ${
              officer.officer_fname
            }`
          );
      }
    );
  });
};

// function for logout
export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).send("Logged out");
};
