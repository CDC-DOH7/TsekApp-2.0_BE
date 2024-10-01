import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import db from "../connections/OfficerConnection";
import { Officer } from "../types/user-based/officer";
import dotenv from "dotenv";
import { Supervisor } from "../types/user-based/supervisor.d ";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_ENCODED
  ? Buffer.from(process.env.JWT_SECRET_ENCODED, "base64").toString("utf-8")
  : "";
const COOKIE_MAX_AGE = Number(process.env.JWT_EXPIRES_IN) || 604800000; // One week in milliseconds

// Middleware for universal checking
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    req.user = verified;

    // Refresh the cookie
    res.cookie("token", token, { maxAge: COOKIE_MAX_AGE, httpOnly: true });
    next();
  } catch (err) {
    console.error(err);
    res.status(400).send("Invalid token.");
  }
};

// Middleware to check if the user is authenticated
export const authenticateOfficer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    req.body.officer_id = decoded.id;

    const query = `SELECT * FROM officer_info WHERE officer_is_verified = true AND officer_id = ?`;
    const [results] = await (await db).query<Officer[]>(query, [req.body.officer_id]);

    if (results.length === 0) {
      return res.status(401).send("Invalid login.");
    }

    const officer = results[0];

    if (req.body.hf_id !== officer.hf_id) {
      return res.status(403).send("Access denied. Invalid health facility ID.");
    }

    req.body.officer = officer;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).send("Invalid token.");
  }
};

// Middleware to check if the supervisor is authenticated
export const authenticateSupervisor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    req.body.supervisor_id = decoded.id;

    const query = `SELECT * FROM a_supervisor_info WHERE supervisor_id = ?`;
    const [results] = await (await db).query<Supervisor[]>(query, [req.body.supervisor_id]);

    if (results.length === 0) {
      return res.status(401).send("Invalid login.");
    }

    const supervisor = results[0];

    if (req.body.hf_id !== supervisor.hf_id) {
      return res.status(403).send("Access denied. Invalid health facility ID.");
    }

    req.body.supervisor = supervisor;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).send("Invalid token.");
  }
};
