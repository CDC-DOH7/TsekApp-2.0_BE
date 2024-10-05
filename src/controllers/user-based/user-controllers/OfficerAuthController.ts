// controllers/OfficerController.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UniqueIDGenerator from "../../../common/cryptography/id_generators/user-specific/UserUniqueIDGenerator";
import dotenv from "dotenv";
import OfficerModel from "../../../models/user-specific/OfficerModel";
import OfficerRegistrationParamsInterface from "../../../interfaces/user_specific_parameters/registration-parameters/OfficerRegistrationParamsInterface";
import OfficerLoginParamsInterface from "../../../interfaces/user_specific_parameters/login-parameters/OfficerLoginParamsInterface";

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
    officer_email,
    officer_username,
    officer_entered_password,
    officer_fname,
    officer_mname,
    officer_lname,
    officer_designation,
    officer_contact_no,
    officer_is_verified,
    hf_id,
  } = req.body;

  try {
    // this function will automatically hash the entered_password into the user's password
    const officer_password = await bcrypt.hash(officer_entered_password, 10);
    const officer_id = UniqueIDGenerator.generateCompactUniqueID(
      officer_fname,
      officer_mname,
      officer_lname,
      officer_designation,
      hf_id
    );

    const procedureParams: OfficerRegistrationParamsInterface[] = [
      {
        officer_id,
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
    ];

    await OfficerModel.officerRegister(procedureParams)
      .then((message) => {
        res.status(200).send(message);
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
  const { officer_username, officer_password }: OfficerLoginParamsInterface =
    req.body;

  try {
    // Call the officerLogin function
    const officer = await OfficerModel.officerLogin(officer_username);

    // Check if officer is null
    if (!officer) {
      return res.status(404).send("Officer not found");
    }

    // Ensure officer_password is defined
    if (!officer.officer_password) {
      return res.status(500).send("Internal server error: Password not found");
    }

    // Compare the provided password with the stored password
    const isMatch = await bcrypt.compare(
      officer_password,
      officer.officer_password
    );

    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ id: officer.officer_id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const lastName =
      officer.officer_lname != null
        ? officer.officer_lname.toUpperCase()
        : "Officer";
    const firstName =
      officer.officer_fname != null ? officer.officer_fname : "Name";
    const messageString = `Logged in! Welcome ${lastName}, ${firstName}`;

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
    res.status(500).send("An error occurred during login. Please try again.");
  }
};

// Function for logout
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).send("Logged out");
};
