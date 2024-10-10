import express from "express";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import https from "https";
import http from "http";
import fs from "fs";
import dotenv from "dotenv";

// Route imports
import officerRouter from "./routes/OfficerRouter";
import supervisorRouter from "./routes/SupervisorRouter";
import superadminRouter from "./routes/SuperadminRouter";
import guestRouter from "./routes/GuestRouter";

// Import the database initialization function
import initializeDatabase from "./database-initiation/DatabaseInititialization";
import calculateCurrentDateTime from "./common/calc/CalcDateTime";

dotenv.config();

const eTsekApp = express();
const PORT = process.env.PORT || 3000;
const isProduction: boolean =
  process.env.IS_PRODUCTION?.toLowerCase() === "true";

const allowedOrigins = [
  "https://tsekap-2-0.vercel.app", // Add more allowed origins here if needed
];

// Define CORS options
const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, allowed?: boolean) => void
  ) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow credentials like cookies
};

eTsekApp.use(cookieParser());
eTsekApp.use(cors(corsOptions));
eTsekApp.use(express.json());

// Routes
eTsekApp.use("/v1/guest", guestRouter);
eTsekApp.use("/v1/supervisor", supervisorRouter);
eTsekApp.use("/v1/officer", officerRouter);
eTsekApp.use("/v1/superadmin", superadminRouter);

const startServer = async () => {
  try {
    // Initialize the database
    await initializeDatabase();

    const server = isProduction
      ? https.createServer(
          {
            cert: fs.readFileSync(process.env.SERVER_CERT as string, "utf-8"),
            key: fs.readFileSync(process.env.SERVER_KEY as string, "utf-8"), // Ensure you include the key
          },
          eTsekApp
        )
      : http.createServer(eTsekApp);

    server.listen(PORT, () => {
      console.info(`Production mode: ${isProduction}`);
      console.info(
        `\n${calculateCurrentDateTime()} >>> eTsekApp v1 API is running at: ${
          isProduction ? "https" : "http"
        }://localhost:${PORT}`
      );
    });

    server.on("error", (err) => {
      console.error(
        `${calculateCurrentDateTime()} >> Error starting server: ${err}`
      );
    });

    // Log incoming requests
    server.on("request", (req, res) => {
      console.log(`${req.method} request for '${req.url}'`);
    });
  } catch (err: any) {
    console.error(`Database initialization failed: ${err.message}`);
    throw err; // Rethrow the error to handle it in the catch block
  }
};
// Initialize the server
startServer().catch((err) => {
  console.error(`Server initialization failed: ${err.message}`);
});
