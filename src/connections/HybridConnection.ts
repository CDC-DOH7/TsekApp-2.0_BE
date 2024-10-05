import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const connectToDatabase = async () => {
  // check if production or not
  const isProduction: boolean =
    process.env.IS_PRODUCTION?.toLowerCase() === "true";

  let db: mysql.Connection;

  if (!isProduction) {
    db = await mysql.createConnection({
      host: process.env.DEV_HOSTNAME,
      user: process.env.DEV_HYBRID_USER,
      password: process.env.DEV_HYBRID_PASS,
      database: process.env.DATABASE_NAME,
      port: Number(process.env.LOCAL_MYSQL_PORT),
    });
  } else {
    db = await mysql.createConnection({
      host: process.env.PROD_HOSTNAME,
      user: process.env.PROD_HYBRID_USER,
      password: process.env.PROD_HYBRID_PASS,
      database: process.env.DATABASE_NAME,
      port: Number(process.env.REMOTE_MYSQL_PORT),
      ssl: { ca: fs.readFileSync(String(process.env.CA_CERTIFICATE_PATH)) },
    });
  }

  return db;
};

const dbPromise = connectToDatabase();
export default dbPromise;
