import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async () => {
  const db = await mysql.createConnection({
    host: process.env.OFFICER_HOSTNAME,
    user: process.env.OFFICER_USER,
    password: process.env.OFFICER_PASS,
    database: process.env.DATABASE_NAME,
  });

  return db;
};

const dbPromise = connectToDatabase();
export default dbPromise;