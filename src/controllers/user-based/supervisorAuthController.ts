import { Request, Response } from "express";
import db from "../../models/user-based/supervisorModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ResultSetHeader } from "mysql2";
import { Supervisor } from "../../types/supervisor.d ";
import SupervisorRegistrationProcedureParamsInterface from "../../interfaces/procedure_parameters/SupervisorRegistrationProcedureParamsInterface";
import UniqueIDGenerator from "../../common/cryptography/id_generators/UserUniqueIDGenerator";
import JwtConfig from "../../common/constants/JwtConfig";

// COOKIE MAX AGE
const COOKIE_MAX_AGE = Number(JwtConfig.JWT_EXPIRES_IN) || 604800000; // One week in milliseconds

// function for registration
export const register = (req: Request, res: Response) => {
  const {
    supervisor_email,
    supervisor_username,
    supervisor_password,
    supervisor_fname,
    supervisor_mname,
    supervisor_lname,
    supervisor_designation,
    supervisor_contact_no,
    supervisor_is_verified,
    hf_id,
  } = req.body;

  bcrypt.hash(supervisor_password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send(err);
    }
    // query to be called to the database
    const query = `INSERT INTO a_supervisor_info(supervisor_id, supervisor_email, supervisor_username, supervisor_password, supervisor_fname, supervisor_mname, supervisor_lname, supervisor_contact_no, supervisor_designation, supervisor_is_verified, hf_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); `;

    const supervisor_id = UniqueIDGenerator.generateCompactUniqueID(
      supervisor_fname,
      supervisor_mname,
      supervisor_lname,
      supervisor_designation,
      hf_id
    );

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
      supervisor_is_verified,
      hf_id,
    ];

    // execute the query
    db.query<ResultSetHeader>(query, procedureParams, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send("supervisor registered");
    });
  });
};

// function for login
export const login = (req: Request, res: Response) => {
  const { supervisor_username, supervisor_password } = req.body;
  console.log(req.body);
  const query = `SELECT * FROM a_supervisor_info WHERE supervisor_username = ?`;
  db.query<Supervisor[]>(query, [supervisor_username], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(401).send("Invalid credentials");
    }
    const supervisor = results[0];
    bcrypt.compare(
      supervisor_password,
      supervisor.supervisor_password,
      (err, isMatch) => {
        if (err) {
          return res.status(500).send(err);
        }
        if (!isMatch) {
          return res.status(401).send("Invalid credentials");
        }

        const token = jwt.sign(
          { id: supervisor.supervisor_id },
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
