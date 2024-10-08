import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const createDatabasePool = async () => {
  // Check if in production or not
  const isProduction = process.env.IS_PRODUCTION?.toLowerCase() === "true";

  const pool = mysql.createPool({
    host: isProduction ? process.env.PROD_HOSTNAME : process.env.DEV_HOSTNAME,
    user: isProduction
      ? process.env.PROD_SUPERADMIN_USER
      : process.env.DEV_SUPERADMIN_USER,
    password: isProduction
      ? process.env.PROD_SUPERADMIN_PASS
      : process.env.DEV_SUPERADMIN_PASS,
    database: process.env.DATABASE_NAME,
    port: isProduction
      ? Number(process.env.REMOTE_MYSQL_PORT)
      : Number(process.env.LOCAL_MYSQL_PORT),
    ssl: isProduction
      ? { ca: fs.readFileSync(String(process.env.CA_CERTIFICATE_PATH)) }
      : undefined,
    waitForConnections: true,
    connectionLimit: 10, // Adjust as needed
    queueLimit: 0,
  });

  return pool;
};

const dbPool = createDatabasePool();
export default dbPool;
