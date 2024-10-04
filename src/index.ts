import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import https from "https";
import dotenv from "dotenv";
import fs from "fs";

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
const PORT = process.env.DEFAULT_PORT || 3000;
const CACERT_PATH = process.env.CA_CERTIFICATE_PATH;


if (!CACERT_PATH) {
  throw new Error("CA_CERTIFICATE_PATH and CA_KEY_PATH must be defined in the .env file");
}

console.log(fs.readFileSync(CACERT_PATH));

const options = {
  cert: fs.readFileSync(CACERT_PATH as string),
};

const corsOptions = {
  credentials: true, // Allow credentials (cookies)
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

    return new Promise((resolve, reject) => {
      const server = https.createServer(options, eTsekApp).listen(PORT, () => {
        console.info(`\n${calculateCurrentDateTime()} >>> eTsekApp v1 API is running at: https://localhost:${PORT}`);
        resolve(server);
      });

      server.on("error", (err) => {
        console.error(`${calculateCurrentDateTime()} >> Error starting server: ${err}`);
        reject(err);
      });
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
