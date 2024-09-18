import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Network configuration
import NetworkConfig from "./common/constants/NetworkConfig";

// route imports
import officerRouter from "./routes/officerRouter";
import supervisorRouter from "./routes/supervisorRouter";
import superadminRouter from "./routes/superadminRouter";

const eTsekApp: express.Application = express();
const PORT = NetworkConfig.DEFAULT_REACT_PORT || 3000;

const corsOptions = {
  origin: `http://localhost:${PORT}`, // Replace with your React app's URL
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
    console.log(`eTsekApp Server is running at http://localhost:${PORT}`);
  } catch (Exception) {
    console.error(Exception);
  }
});
