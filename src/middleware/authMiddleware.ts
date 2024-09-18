import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import db from "../models/user-based/officerModel";
import { Officer } from "../types/officer";
import JwtConfig from "../common/constants/JwtConfig";

const COOKIE_MAX_AGE = Number(JwtConfig.JWT_EXPIRES_IN) || 604800000; // One week in milliseconds

// middleware for universal checking
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // substituted values because .env still doesn't work.

  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("Access denied");
  }
  try {
    // substituted values because .env still doesn't work.
    const verified = jwt.verify(token, JwtConfig.JWT_SECRET);
    req.user = verified;
    // Refresh the cookie
    res.cookie("token", token, { maxAge: COOKIE_MAX_AGE, httpOnly: true });
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send("Invalid token");
  }
};

// Middleware to check if the user is authenticated
export const authenticateOfficer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, JwtConfig.JWT_SECRET) as { id: string };
    req.body.officer_id = decoded.id;

    const query = `SELECT * FROM officer_info WHERE officer_id = ?`;
    db.query<Officer[]>(query, [req.body.officer_id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (results.length === 0) {
        return res.status(401).send("Invalid token.");
      }

      const officer = results[0];

      // Check if the provided hf_id matches the officer's hf_id
      if (req.body.hf_id !== officer.hf_id) {
        return res
          .status(403)
          .send("Access denied. Invalid health facility ID.");
      }

      // Attach officer details to the request for further processing if needed
      req.body.officer = officer;
      next();
    });
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
