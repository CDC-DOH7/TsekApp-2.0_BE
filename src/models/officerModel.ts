import mysql from "mysql2";
import dotenv from "dotenv";
import "dotenv/config";

dotenv.config();

const TABLE_NAME = "officer_info";
// please change the connection in production mode
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST || "localhost",
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "12345",
  database: process.env.DATABASE_NAME || "e-TsekApp",
});

// connect function
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log(
    `Table ${TABLE_NAME} e-TsekApp Database is successfully connected.`
  );
});

// create officer table function
const createUserTable = `
CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
	officer_id VARCHAR(50) PRIMARY KEY,
	officer_email VARCHAR(50) NOT NULL,
	officer_username VARCHAR(50) NOT NULL,
	officer_password TEXT NOT NULL,
	officer_fname VARCHAR(50) NOT NULL,
	officer_mname VARCHAR(50),
	officer_lname VARCHAR(50) NOT NULL,
  officer_contact_no VARCHAR(11) NOT NULL,
	officer_designation VARCHAR(50) NOT NULL,
  officer_is_verified BOOLEAN NOT NULL,
  hf_id VARCHAR(18) NOT NULL
)`;

db.query(createUserTable, (err, results) => {
  if (err) throw err;
  console.log(`${TABLE_NAME} table exists.`);
});

export default db;
