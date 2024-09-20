import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// route imports
import officerRouter from "./routes/OfficerRouter";
import supervisorRouter from "./routes/SupervisorRouter";
import superadminRouter from "./routes/SuperadminRouter";

// dotenv
import dotenv from "dotenv";

dotenv.config();
const eTsekApp: express.Application = express();
const PORT = process.env.DEFAULT_PORT || 3000;
const REACT_PORT = process.env.DEFAULT_REACT_PORT || 5173;

const corsOptions = {
  origin: `http://localhost:${REACT_PORT}`, // Replace with your React app's URL
  credentials: true, // Allow credentials (cookies)
};

eTsekApp.use(cookieParser());
eTsekApp.use(cors(corsOptions));
eTsekApp.use(express.json());

// routes
eTsekApp.use("/supervisor", supervisorRouter);
eTsekApp.use("/officer", officerRouter);
eTsekApp.use("/superadmin", superadminRouter);

eTsekApp.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

eTsekApp.listen(PORT, () => {
  try {
    console.log(`eTsekApp Server is running at: http://localhost/${PORT}`);
  } catch (Exception) {
    console.error(Exception);
  }
});
