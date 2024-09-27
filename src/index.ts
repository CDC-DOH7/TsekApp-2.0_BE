import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import swagger from "./swagger/swagger"; // Adjust path if necessary

// Route imports
import officerRouter from "./routes/OfficerRouter";
import supervisorRouter from "./routes/SupervisorRouter";
import superadminRouter from "./routes/SuperadminRouter";

// Dotenv
import dotenv from "dotenv";

// Import the database initialization function
import initializeDatabase from "./models/database-models-creation/databaseInititialization";

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

swagger(eTsekApp); // Set up Swagger

// Routes
eTsekApp.use("/v1/supervisor", supervisorRouter);
eTsekApp.use("/v1/officer", officerRouter);
eTsekApp.use("/v1/superadmin", superadminRouter);

eTsekApp.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

// Async function to start the server
const startServer = async () => {
  try {
    // Initialize the database
    await initializeDatabase();

    return new Promise((resolve, reject) => {
      const server = eTsekApp.listen(PORT, () => {
        console.log(`eTsekApp v1 API is running at: http://localhost:${PORT}`);
        resolve(server);
      });

      server.on("error", (err) => {
        console.error(`Error starting server: ${err}`);
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
