import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// please change the connection in production mode
const db = mysql.createConnection({
  host: process.env.SUPERVISOR_HOSTNAME,
  user: process.env.SUPERVISOR_USER,
  password: process.env.SUPERVISOR_PASS,
  database: process.env.DATABASE_NAME,
});

// connect function
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log(`Supervisor is successfully connected.`);
});

export default db;
