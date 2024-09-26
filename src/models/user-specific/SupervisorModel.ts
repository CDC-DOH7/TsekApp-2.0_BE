import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async () => {
  const db = await mysql.createConnection({
    host: process.env.SUPERVISOR_HOSTNAME,
    user: process.env.SUPERVISOR_USER,
    password: process.env.SUPERVISOR_PASS,
    database: process.env.DATABASE_NAME,
  });

  console.log(`Supervisor is successfully connected.`);
  return db;
};

const dbPromise = connectToDatabase();

export default dbPromise;