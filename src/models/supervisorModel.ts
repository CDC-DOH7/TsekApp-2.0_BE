import mysql from "mysql2";
import dotenv from "dotenv";
import "dotenv/config";

dotenv.config();

const TABLE_NAME = "supervisor_info"
// please change the connection in production mode
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST || "localhost",
  user: process.env.DATABASE_SUPERVISOR || "root",
  password: process.env.DATABASE_PASSWORD || "12345",
  database: process.env.DATABASE_NAME || "e-TsekApp",
});

// connect function
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log(`Table ${TABLE_NAME} e-TsekApp Database is successfully connected.`);
});

// create supervisor table function
const createSupervisorTable = `
CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
	supervisor_id VARCHAR(50) PRIMARY KEY,
	supervisor_email VARCHAR(50) NOT NULL,
	supervisor_username VARCHAR(50) NOT NULL,
	supervisor_password TEXT NOT NULL,
	supervisor_fname VARCHAR(50) NOT NULL,
	supervisor_mname VARCHAR(50),
	supervisor_lname VARCHAR(50) NOT NULL,
  supervisor_contact_no VARCHAR(50) NOT NULL,
	supervisor_designation VARCHAR(50) NOT NULL,
  supervisor_is_verified BOOLEAN NOT NULL,
  supervisor_facility_code VARCHAR(50) NOT NULL
)`;

db.query(createSupervisorTable, (err, results) => {
  if (err) throw err;
  console.log(`${TABLE_NAME} table exists.`);
});

export default db;
