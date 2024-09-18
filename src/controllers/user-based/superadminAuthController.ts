import { Request, Response } from "express";
import db from "../../models/user-based/superadminModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ResultSetHeader } from "mysql2";
import { Superadmin } from "../../types/superadmin";
import SuperadminRegistrationProcedureParamsInterface from "../../interfaces/procedure_parameters/SuperadminRegistrationProcedureParamsInterface";
import UniqueIDGenerator from "../../common/cryptography/id_generators/UserUniqueIDGenerator";
import JwtConfig from "../../common/constants/JwtConfig";

// COOKIE MAX AGE
const COOKIE_MAX_AGE = Number(JwtConfig.JWT_EXPIRES_IN) || 604800000; // One week in milliseconds

// function for registration
export const register = (req: Request, res: Response) => {
  const {
    superadmin_email,
    superadmin_username,
    superadmin_password,
    superadmin_fname,
    superadmin_mname,
    superadmin_lname,
  } = req.body;

  bcrypt.hash(superadmin_password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send(err);
    }
    // query to be called to the database
    const query = `INSERT INTO a_superadmin_info(superadmin_id, superadmin_email, superadmin_username, superadmin_password, superadmin_fname, superadmin_mname, superadmin_lname, superadmin_contact_no, superadmin_designation, superadmin_is_verified, hf_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); `;

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

    // execute the query
    db.query<ResultSetHeader>(query, procedureParams, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send("superadmin registered");
    });
  });
};

// function for login
export const login = (req: Request, res: Response) => {
  const { superadmin_username, superadmin_password } = req.body;
  console.log(req.body);
  const query = `SELECT * FROM a_superadmin_info WHERE superadmin_username = ?`;
  db.query<Superadmin[]>(query, [superadmin_username], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(401).send("Invalid credentials");
    }
    const superadmin = results[0];
    bcrypt.compare(
      superadmin_password,
      superadmin.superadmin_password,
      (err, isMatch) => {
        if (err) {
          return res.status(500).send(err);
        }
        if (!isMatch) {
          return res.status(401).send("Invalid credentials");
        }

        const token = jwt.sign(
          { id: superadmin.superadmin_id },
          //process.env.JWT_SECRET as string,
          JwtConfig.JWT_SECRET,
          //{ expiresIn: process.env.JWT_EXPIRES_IN }
          { expiresIn: JwtConfig.JWT_EXPIRES_IN }
        );
        res.cookie("token", token, { maxAge: COOKIE_MAX_AGE });
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
