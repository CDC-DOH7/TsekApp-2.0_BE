import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
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

const corsOptions = {
  origin: function (origin: any, callback: (arg0: null, arg1: string) => void) {
    if (origin) {
      // Allow the origin that is making the request
      callback(null, origin);
    } else {
      // Handle cases where there's no origin (such as curl requests or similar)
      callback(null, "*");
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

// Async function to start the server
const startServer = async () => {
  try {
    // Initialize the database
    await initializeDatabase();

    // Create the HTTP server instead of HTTPS
    const server = http.createServer(eTsekApp);

    server.listen(PORT, () => {
      console.info(`Production mode: ${isProduction}`);
      console.info(
        `\n${calculateCurrentDateTime()} >>> eTsekApp v1 API is running at: http://localhost:${PORT}`
      );
    });

    server.on("error", (err) => {
      console.error(
        `${calculateCurrentDateTime()} >> Error starting server: ${err}`
      );
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
