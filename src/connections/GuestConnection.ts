import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async () => {
  const db = await mysql.createConnection({
    host: process.env.GUEST_HOSTNAME,
    user: process.env.GUEST_USER,
    password: process.env.GUEST_PASS,
    database: process.env.DATABASE_NAME,
  });

  return db;
};

const dbPromise = connectToDatabase();
export default dbPromise;