// controllers/SupervisorController.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UniqueIDGenerator from "../../../common/cryptography/id_generators/user-specific/UserUniqueIDGenerator";
import dotenv from "dotenv";
import SupervisorModel from "../../../models/user-specific/SupervisorModel";
import SupervisorRegistrationParamsInterface from "../../../interfaces/user_specific_parameters/registration-parameters/registration-inputs/SupervisorRegistrationParamsInterface";
import SupervisorLoginParamsInterface from "../../../interfaces/user_specific_parameters/login-parameters/SupervisorLoginParamsInterface";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_ENCODED
  ? Buffer.from(process.env.JWT_SECRET_ENCODED, "base64").toString("utf-8")
  : "";

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN_ENCODED
  ? Buffer.from(process.env.JWT_EXPIRES_IN_ENCODED, "base64").toString("utf-8")
  : "";

const COOKIE_MAX_AGE = Number(process.env.JWT_EXPIRES_IN);

export const register = async (req: Request, res: Response) => {
  const {
    supervisor_email,
    supervisor_username,
    supervisor_entered_password,
    supervisor_fname,
    supervisor_mname,
    supervisor_lname,
    supervisor_suffix,
    supervisor_designation,
    supervisor_contact_no,
    supervisor_is_verified,
    hf_id,
  } = req.body;

  try {
    // this function will automatically hash the entered_password into the user's password
    const supervisor_password = await bcrypt.hash(
      supervisor_entered_password,
      10
    );
    const supervisor_id = UniqueIDGenerator.generateCompactUniqueID(
      supervisor_fname,
      supervisor_mname,
      supervisor_lname,
      supervisor_designation,
      hf_id
    );

    const procedureParams: SupervisorRegistrationParamsInterface[] = [
      {
        supervisor_id,
        supervisor_email,
        supervisor_username,
        supervisor_password,
        supervisor_fname,
        supervisor_mname,
        supervisor_lname,
        supervisor_suffix,
        supervisor_designation,
        supervisor_contact_no,
        supervisor_is_verified,
        hf_id,
      },
    ];

    await SupervisorModel.supervisorRegister(procedureParams)
      .then((result) => {
        result.duplicates > 0
          ? res.status(403).send(result)
          : res.status(200).send(result);
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .send("An error occurred during registration. Please try again.");
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("An error occurred during registration. Please try again.");
  }
};

export const login = async (req: Request, res: Response) => {
  const {
    supervisor_username,
    supervisor_password,
  }: SupervisorLoginParamsInterface = req.body;

  // Validate request body
  if (!supervisor_username || !supervisor_password) {
    return res.status(400).send("Username and password are required.");
  }

  try {
    // Call the supervisorLogin function
    const supervisor = await SupervisorModel.supervisorLogin(
      supervisor_username
    );

    // Check if supervisor is null
    if (!supervisor) {
      return res
        .status(401)
        .send("Login failed. Please check your credentials.");
    }

    // Ensure supervisor_password is defined
    if (!supervisor.supervisor_password) {
      return res.status(500).send("Internal Server Error!");
    }

    // Compare the provided password with the stored password
    const isMatch = await bcrypt.compare(
      supervisor_password,
      supervisor.supervisor_password
    );

    if (!isMatch) {
      return res
        .status(401)
        .send("Login failed. Please check your credentials.");
    }

    if (!supervisor.supervisor_is_verified) {
      return res.status(401).send("Login failed. Please try again.");
    }

    const token = jwt.sign({ id: supervisor.supervisor_id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const lastName =
      supervisor.supervisor_lname != null
        ? supervisor.supervisor_lname.toUpperCase()
        : "Supervisor";
    const firstName =
      supervisor.supervisor_fname != null
        ? supervisor.supervisor_fname
        : "Name";
    const messageString = `Logged in! Welcome ${lastName}, ${firstName}`;

    // Exclude the password field from the supervisor info
    const {
      supervisor_password: _, // Exclude
      supervisor_username: __, // Exclude
      supervisor_is_verified,
      supervisor_email,
      ...supervisor_info
    } = supervisor;

    res.cookie("token", token, {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ message: messageString, supervisor_info });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred during login. Please try again.");
  }
};

// Function for logout
export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).send("Logged out");
};
