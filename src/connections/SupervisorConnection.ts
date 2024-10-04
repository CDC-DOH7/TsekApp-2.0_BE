import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async () => {
  const db = await mysql.createConnection({
    host: process.env.HOSTNAME,
    user: process.env.SUPERVISOR_USER,
    password: process.env.SUPERVISOR_PASS,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DIGITAL_OCEAN_MYSQL_PORT),
    ssl: { rejectUnauthorized: false }
  });

  return db;
};

const dbPromise = connectToDatabase();

export default dbPromise;