import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Create the database connection
const connectToDatabase = async () => {
  // please change the connection in production mode
  const connection = await mysql.createConnection({
    host: process.env.HOSTNAME,
    user: process.env.SUPERADMIN_USER,
    password: process.env.SUPERADMIN_PASS,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DIGITAL_OCEAN_MYSQL_PORT),
    ssl: { rejectUnauthorized: false }
  });

  return connection;
};

const dbPromise = connectToDatabase();

export default dbPromise;
