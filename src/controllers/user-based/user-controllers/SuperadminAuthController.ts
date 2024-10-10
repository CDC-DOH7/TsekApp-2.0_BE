// controllers/SuperadminController.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UniqueIDGenerator from "../../../common/cryptography/id_generators/user-specific/UserUniqueIDGenerator";
import dotenv from "dotenv";
import SuperadminModel from "../../../models/user-specific/SuperadminModel";
import SuperadminRegistrationParamsInterface from "../../../interfaces/user_specific_parameters/registration-parameters/registration-inputs/SuperadminRegistrationParamsInterface";
import SuperadminLoginParamsInterface from "../../../interfaces/user_specific_parameters/login-parameters/SuperadminLoginParamsInterface";

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
    superadmin_email,
    superadmin_username,
    superadmin_entered_password,
    superadmin_fname,
    superadmin_mname,
    superadmin_lname,
  } = req.body;

  try {
    // this function will automatically hash the entered_password into the user's password
    const superadmin_password = await bcrypt.hash(
      superadmin_entered_password,
      10
    );

    // override details for superadmin
    const superadmin_designation = "superadmin";
    const hf_id = "DOH000000000000001";

    const superadmin_id = UniqueIDGenerator.generateCompactUniqueID(
      superadmin_fname,
      superadmin_mname,
      superadmin_lname,
      superadmin_designation,
      hf_id
    );

    const procedureParams: SuperadminRegistrationParamsInterface[] = [
      {
        superadmin_id,
        superadmin_email,
        superadmin_username,
        superadmin_password,
        superadmin_fname,
        superadmin_mname,
        superadmin_lname,
      },
    ];

    await SuperadminModel.superadminRegister(procedureParams)
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
    superadmin_username,
    superadmin_password,
  }: SuperadminLoginParamsInterface = req.body;

  try {
    // Call the superadminLogin function
    const superadmin = await SuperadminModel.superadminLogin(
      superadmin_username
    );

    // Check if superadmin is null
    if (!superadmin) {
      return res
        .status(401)
        .send("Login failed. Please check your username and password.");
    }

    // Ensure superadmin_password is defined
    if (!superadmin.superadmin_password) {
      return res.status(500).send("Internal Server Error!");
    }

    // Compare the provided password with the stored password
    const isMatch = await bcrypt.compare(
      superadmin_password,
      superadmin.superadmin_password
    );

    if (!isMatch) {
      return res
        .status(401)
        .send("Login failed. Please check your username and password.");
    }

    const token = jwt.sign({ id: superadmin.superadmin_id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const lastName =
      superadmin.superadmin_lname != null
        ? superadmin.superadmin_lname.toUpperCase()
        : "Superadmin";
    const firstName =
      superadmin.superadmin_fname != null
        ? superadmin.superadmin_fname
        : "Name";
    const messageString = `Logged in! Welcome ${lastName}, ${firstName}`;

    // Exclude the password field from the superadmin info
    const {
      superadmin_password: _, // Exclude
      superadmin_username: __, // Exclude
      superadmin_email,
      ...superadmin_info
    } = superadmin;

    res.cookie("token", token, {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ message: messageString, superadmin_info });
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
