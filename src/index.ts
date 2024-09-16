import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

// route imports
import officerRouter from "./routes/officerRouter";
import supervisorRouter from "./routes/supervisorRouter";

dotenv.config();

const eTsekApp: express.Application = express();
const PORT = process.env.PORT || 3000;

eTsekApp.use(cookieParser());
eTsekApp.use(cors());
eTsekApp.use(express.json());

// routes
eTsekApp.use("/supervisor", supervisorRouter)
eTsekApp.use("/officer", officerRouter);

eTsekApp.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

eTsekApp.listen(PORT, () => {
  try {
    console.log(`eTsekApp Server is running at http://localhost:${PORT}`);
  } catch (Exception) {
    console.error(Exception);
  }
});
