import mysql from "mysql2";
import TableNames from "../../common/constants/TableNames";
import dotenv from "dotenv";

dotenv.config();

// please change the connection in production mode
const db = mysql.createConnection({
  host: process.env.SUPERADMIN_HOSTNAME,
  user: process.env.SUPERADMIN_USER,
  password: process.env.SUPERADMIN_PASS,
  database: process.env.DATABASE_NAME,
});

const disableForeignKeyChecks = `SET FOREIGN_KEY_CHECKS=0`;
const enableForeignKeyChecks = `SET FOREIGN_KEY_CHECKS=1`;

// -- create tables for the database --
// Create table SQL statements
const createTables = [
  `CREATE TABLE IF NOT EXISTS ${TableNames.HEALTH_FACILITY_INFO_TABLE} (
    hf_id VARCHAR(50) NOT NULL PRIMARY KEY,
    hf_name VARCHAR(64) NOT NULL,
    hf_phic_accreditation VARCHAR(50),
    hf_brgy VARCHAR(50) NOT NULL,
    brgy_id INT(11) NOT NULL,
    hf_muncity VARCHAR(50) NOT NULL, 
    muncity_id VARCHAR(50) NOT NULL,
    hf_province VARCHAR(50) NOT NULL,
    province_id INT NOT NULL,
    hf_region VARCHAR(50) NOT NULL,
  )`,
  `CREATE TABLE IF NOT EXISTS ${TableNames.SUPERADMIN_INFO_TABLE} (
    superadmin_id VARCHAR(50) PRIMARY KEY,
    superadmin_email VARCHAR(50) NOT NULL,
    superadmin_username VARCHAR(50) NOT NULL,
    superadmin_password TEXT NOT NULL,
    superadmin_fname VARCHAR(50) NOT NULL,
    superadmin_mname VARCHAR(50),
    superadmin_lname VARCHAR(50) NOT NULL,
    superadmin_designation VARCHAR(50) NOT NULL,
    superadmin_is_verified BOOLEAN NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS ${TableNames.SUPERVISOR_INFO_TABLE} (
    supervisor_id VARCHAR(50) PRIMARY KEY,
    supervisor_email VARCHAR(50) NOT NULL,
    supervisor_username VARCHAR(50) NOT NULL,
    supervisor_password TEXT NOT NULL,
    supervisor_fname VARCHAR(50) NOT NULL,
    supervisor_mname VARCHAR(50),
    supervisor_lname VARCHAR(50) NOT NULL,
    supervisor_contact_no VARCHAR(11) NOT NULL,
    supervisor_designation VARCHAR(50) NOT NULL,
    supervisor_is_verified BOOLEAN NOT NULL,
    hf_id VARCHAR(18) NOT NULL,
    FOREIGN KEY (hf_id) REFERENCES a_health_facility_info(hf_id)
  )`,
  `CREATE TABLE IF NOT EXISTS ${TableNames.OFFICER_INFO_TABLE} (
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
  )`,
  `CREATE TABLE IF NOT EXISTS ${TableNames.PATIENT_INFO_TABLE} (
    patient_id VARCHAR(50) NOT NULL PRIMARY KEY,
    patient_fname VARCHAR(50) NOT NULL,
    patient_mname VARCHAR(50),
    patient_lname VARCHAR(50) NOT NULL,
    patient_date_assess DATE NOT NULL,
    patient_age INT NOT NULL,
    patient_sex CHAR(1) NOT NULL,
    patient_dob DATE NOT NULL,
    patient_civil_status VARCHAR(20) NOT NULL,
    patient_religion VARCHAR(50),
    patient_contact_no VARCHAR(15),
    patient_street VARCHAR(100),
    patient_purok VARCHAR(50),
    patient_sitio VARCHAR(50),
    patient_brgy VARCHAR(50),
    patient_muncity VARCHAR(50),
    patient_province VARCHAR(50),
    patient_phic_no VARCHAR(50),
    patient_pwd_no VARCHAR(50),
    patient_emp_status VARCHAR(50),
    patient_ip VARCHAR(50),
    patient_ip_ethinicity VARCHAR(50),
    hf_id VARCHAR(50),
    FOREIGN KEY (hf_id) REFERENCES a_health_facility_info(hf_id)
  )`,
  `CREATE TABLE IF NOT EXISTS ${TableNames.ASSESS_RED_FLAG_TABLE}(
    ard_id VARCHAR(50) NOT NULL PRIMARY KEY,
    patient_id VARCHAR(50),
    ard_chest_pain CHAR(3),
    ard_difficulty_breathing CHAR(3),
    ard_loss_consciousness CHAR(3),
    ard_slurred_speech CHAR(3),
    ard_facial_asymmetry CHAR(3),
    ard_numb_arm CHAR(3),
    ard_disoriented CHAR(3),
    ard_chest_retractions CHAR(3),
    ard_seizure_or_convulsion CHAR(3),
    ard_selfharm_or_suicide CHAR(3),
    ard_aggressive_behavior CHAR(3),
    ard_eye_injury CHAR(3),
    ard_severe_injuries CHAR(3),
    FOREIGN KEY (patient_id) REFERENCES a_patient_info(patient_id)
  )`,
  `CREATE TABLE IF NOT EXISTS ${TableNames.PAST_MEDICAL_HISTORY_TABLE}(
    pmh_id VARCHAR(50) NOT NULL PRIMARY KEY,
    patient_id VARCHAR(50),
    pmh_hypertension CHAR(3),
    pmh_heart_disease CHAR(3),
    pmh_diabetes CHAR(3),
    pmh_specify_diabetes VARCHAR(50),
    pmh_cancer CHAR(3),
    pmh_specify_cancer VARCHAR(50),
    pmh_copd CHAR(3),
    pmh_asthma CHAR(3),
    pmh_allergies CHAR(3),
    pmh_specify_allergy VARCHAR(50),
    pmh_disorders CHAR(3),
    pmh_specify_disorder VARCHAR(50),
    pmh_vision_problems CHAR(3),
    pmh_previous_surgical_history CHAR(3),
    pmh_specify_surgical_history VARCHAR(50),
    pmh_thyroid_disorder CHAR(3),
    pmh_kidney_disorder CHAR(3),
    FOREIGN KEY (patient_id) REFERENCES a_patient_info(patient_id)
  )`,
  `CREATE TABLE IF NOT EXISTS ${TableNames.FAMILY_HISTORY_TABLE}(
    fh_id VARCHAR(50) NOT NULL PRIMARY KEY,
    patient_id VARCHAR(50),
    fh_hypertension CHAR(3),
    fh_stroke CHAR(3),
    fh_heart_disease CHAR(3),
    fh_diabetes_mellitus CHAR(3),
    fh_asthma CHAR(3),
    fh_cancer CHAR(3),
    fh_kidney_disease CHAR(3),
    fh_vascular_disease CHAR(3),
    fh_tb CHAR(3),
    fh_disorders CHAR(3),
    fh_copd CHAR(3),
    FOREIGN KEY (patient_id) REFERENCES a_patient_info(patient_id)
  )`,
  `CREATE TABLE IF NOT EXISTS ${TableNames.NCD_RISK_FACTORS_TABLE}(
    rf_id VARCHAR(50) NOT NULL PRIMARY KEY,
    patient_id VARCHAR(50),
    rf_tobacco_use CHAR(3),
    rf_alcohol_intake CHAR(3),
    rf_binge_drinker CHAR(3),
    rf_physical_activity CHAR(3),
    rf_nad_assessment CHAR(3),
    rf_kg_weight FLOAT,
    rf_cm_height FLOAT,
    rf_bmi FLOAT,
    rf_waist_circumference FLOAT,
    rf_bp VARCHAR(10),
    FOREIGN KEY (patient_id) REFERENCES a_patient_info(patient_id)
  )`,
  `CREATE TABLE IF NOT EXISTS ${TableNames.RISK_SCREENING_TABLE}(
    rs_id VARCHAR(50) NOT NULL PRIMARY KEY,
    patient_id VARCHAR(50),
    rs_blood_sugar_fbs FLOAT,
    rs_blood_sugar_rbs FLOAT,
    rs_blood_sugar_date_taken DATE,
    rs_blood_sugar_symptoms CHAR(3),
    rs_lipid_cholesterol FLOAT,
    rs_lipid_hdl FLOAT,
    rs_lipid_ldl FLOAT,
    rs_lipid_vldl FLOAT,
    rs_lipid_triglyceride FLOAT,
    rs_lipid_date_taken DATE,
    rs_urine_protein FLOAT,
    rs_urine_protein_date_taken DATE,
    rs_urine_ketones FLOAT,
    rs_urine_ketones_date_taken DATE,
    rs_respiratory CHAR(3),
    FOREIGN KEY (patient_id) REFERENCES a_patient_info(patient_id)
  )`,
  `CREATE TABLE IF NOT EXISTS ${TableNames.MANAGEMENT_TABLE}(
    mngm_id VARCHAR(50) NOT NULL PRIMARY KEY,
    patient_id VARCHAR(50),
    mngm_diagnosis VARCHAR(50) NOT NULL,
    mngm_diagnosis_date DATE NOT NULL,
    mngm_medication_prescription TEXT NOT NULL,
    mngm_followup_date DATE,
    mngm_referral VARCHAR(50) NOT NULL,
    mngm_notes TEXT,
    FOREIGN KEY (patient_id) REFERENCES a_patient_info(patient_id)
  )`,
  `CREATE TABLE IF NOT EXISTS ${TableNames.REFERRAL_TABLE} (
    ref_id VARCHAR(50) NOT NULL PRIMARY KEY,
    patient_id VARCHAR(50),
    officer_id VARCHAR(50),
    hf_id VARCHAR(50),
    ref_date DATE NOT NULL,
    ref_reason TEXT NOT NULL,
    ref_destination VARCHAR(50) NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES a_patient_info(patient_id),
    FOREIGN KEY (officer_id) REFERENCES a_officer_info(officer_id),
    FOREIGN KEY (hf_id) REFERENCES a_health_facility_info(hf_id)
  )`,
  `CREATE TABLE IF NOT EXISTS ${TableNames.CONSULTATION_LOGS_TABLE} (
    cl_id VARCHAR(50) PRIMARY KEY,
    cl_description TEXT,
    cl_date DATE NOT NULL,
    patient_id VARCHAR(50),
    officer_id VARCHAR(50),
    hf_id VARCHAR(50),
    ref_id VARCHAR(50)
  )`,

  // generate default tables for the previous data records
  `CREATE TABLE IF NOT EXISTS ${TableNames.AGE_BRACKET} (
    id int(10) unsigned AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS ${TableNames.AVAILABLE_SERVICES} (
    id int(10) unsigned AUTO_INCREMENT PRIMARY KEY,
    facility_code VARCHAR(255) NOT NULL,
    service VARCHAR(255),
    costing VARCHAR(255),
    type VARCHAR(30),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS ${TableNames.BRACKET_SERVICES} (
    id int(10) unsigned AUTO_INCREMENT PRIMARY KEY,
    bracket_id VARCHAR(255) NOT NULL,
    service VARCHAR(255),
    costing VARCHAR(255),
    type VARCHAR(30),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
  )`,
];

// Disable foreign key checks
db.query(disableForeignKeyChecks, (err) => {
  if (err) throw err;
  console.log(`Disabled foreign key checks.`);

  // Execute each create table statement sequentially
  let index = 0;
  const executeNextTable = () => {
    if (index < createTables.length) {
      db.query(createTables[index], (err) => {
        if (err) throw err;
        console.log(`Table ${index + 1} created successfully.`);
        index++;
        executeNextTable(); // Move to the next table
      });
    } else {
      // Re-enable foreign key checks
      db.query(enableForeignKeyChecks, (err) => {
        if (err) throw err;
        console.log(`Enabled foreign key checks.`);
        db.end(); // Close the database connection
      });
    }
  };

  executeNextTable(); // Start the table creation process
});

// connect function
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log(`Superadmin is successfully connected.`);
});

export default db;
