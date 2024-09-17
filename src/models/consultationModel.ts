import mysql from "mysql2";
import dotenv from "dotenv";
import "dotenv/config";
import ConsultationParamsInterface from "../interfaces/misc/ConsultationParamsInterface";
import ConsultationLogSearchFilterInterface from "../interfaces/search_filters/ConsultationLogSearchFilterInterface";

dotenv.config();
const TABLE_NAME = "consultation_logs";

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
const createConsultationTable = `
CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
	cl_id VARCHAR(50) PRIMARY KEY,
	cl_description TEXT,
	cl_date DATE NOT NULL,
	patient_id VARCHAR(50),
	officer_id VARCHAR(50),
    hf_id VARCHAR(50),
    ref_id VARCHAR(50)
)`;

// # --- Begin Operations for Consultation Models --- #
export const searchConsultationLog = (
  searchFilter: ConsultationLogSearchFilterInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const { startDate, endDate, hf_id, patient_id, officer_id, ref_id } =
    searchFilter;

  let query = `SELECT * FROM ${TABLE_NAME} WHERE cl_id LIKE ?`;
  const queryParams: any[] = ["%"]; // Initial wildcard for cl_id

  // Add wildcard searches for each field
  if (startDate) {
    query += " AND cl_date >= ?";
    queryParams.push(startDate);
  }
  if (endDate) {
    query += " AND cl_date <= ?";
    queryParams.push(endDate);
  }
  if (hf_id) {
    query += " AND hf_id LIKE ?";
    queryParams.push(`%${hf_id}%`);
  }
  if (patient_id) {
    query += " AND patient_id LIKE ?";
    queryParams.push(`%${patient_id}%`);
  }
  if (officer_id) {
    query += " AND officer_id LIKE ?";
    queryParams.push(`%${officer_id}%`);
  }
  if (ref_id) {
    query += " AND ref_id LIKE ?";
    queryParams.push(`%${ref_id}%`);
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

// creates consultation record
const createConsultationLog = (
  consultation: ConsultationParamsInterface,
  callback: (err: Error | null, results?: any) => void
) => {
  const query = `INSERT INTO ${TABLE_NAME}(cl_id, cl_description, cl_date, patient_id, officer_id, hf_id, ref_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [
      consultation.cl_id,
      consultation.cl_description,
      consultation.cl_date,
      consultation.patient_id,
      consultation.officer_id,
      consultation.hf_id,
      consultation.ref_id,
    ],
    callback
  );
};

db.query(createConsultationTable, (err, results) => {
  if (err) throw err;
  console.log(`${TABLE_NAME} table exists.`);
});

export default { db, createConsultationLog };
