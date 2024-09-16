import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const COOKIE_MAX_AGE = Number(process.env.COOKIE_MAX_AGE) || 604800000; // One week in milliseconds

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // substituted values because .env still doesn't work.
  const JWT_SECRET = "d0hRegion7@eTs3kA99";
  const JWT_EXPIRES_IN = "30d";

  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("Access denied");
  }
  try {
    // const verified = jwt.verify(token, process.env.JWT_SECRET as string);
    // substituted values because .env still doesn't work.
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    // Refresh the cookie
    res.cookie("token", token, { maxAge: COOKIE_MAX_AGE, httpOnly: true });
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send("Invalid token");
  }
};

export default authMiddleware;
