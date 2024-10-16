import TableNames from "../../common/constants/TableNames";

// -- create e-tsekapp database if non-existent--
// -- create tables for the database --
export const createTablesScripts = [
  `CREATE TABLE IF NOT EXISTS ${TableNames.RELIGION_TABLE} (
      religion_id INT PRIMARY KEY,
		  religion_name VARCHAR(50) NOT NULL
		  )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.ETHNICITY_TABLE} (
      ethnic_id INT PRIMARY KEY,
		  ethnic_name VARCHAR(100) NOT NULL
		  )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.BARANGAY_TABLE} (
      brgy_id INT NOT NULL PRIMARY KEY,
      province_id INT NOT NULL,
      muncity_id INT NOT NULL,
      brgy_name VARCHAR(50) NOT NULL,
      old_target INT,
      target INT,
      target_2022 INT,

      FOREIGN KEY (muncity_id) REFERENCES a_muncity_info(muncity_id),
      FOREIGN KEY (province_id) REFERENCES a_province_info(province_id)
      )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.MUNCITY_TABLE} (
      muncity_id INT NOT NULL PRIMARY KEY,
      province_id INT NOT NULL,
      muncity_name VARCHAR(50) NOT NULL, 
      FOREIGN KEY (province_id) REFERENCES a_province_info(province_id)
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.PROVINCE_TABLE} (
      province_id INT NOT NULL PRIMARY KEY,
      province_name VARCHAR(50) NOT NULL
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.AGE_GROUP_TABLE} (
      ag_id INT NOT NULL PRIMARY KEY,
      ag_range VARCHAR(50) NOT NULL,
      ag_description VARCHAR(50) NOT NULL
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.HEALTH_FACILITY_INFO_TABLE} (
      hf_id VARCHAR(50) NOT NULL PRIMARY KEY,
      hf_name TEXT NOT NULL,
      hf_phic_accreditation VARCHAR(50),
      hf_brgy VARCHAR(50),
      brgy_id INT,
      hf_muncity VARCHAR(50), 
      muncity_id INT,
      hf_province VARCHAR(50),
      province_id INT,
      hf_region VARCHAR(50),

      FOREIGN KEY (brgy_id) REFERENCES a_brgy_info(brgy_id),
      FOREIGN KEY (muncity_id) REFERENCES a_muncity_info(muncity_id),
      FOREIGN KEY (province_id) REFERENCES a_province_info(province_id)
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.SUPERADMIN_INFO_TABLE} (
      superadmin_id VARCHAR(50) PRIMARY KEY,
      superadmin_email VARCHAR(50) NOT NULL,
      superadmin_username VARCHAR(50) NOT NULL,
      superadmin_password TEXT NOT NULL,
      superadmin_fname VARCHAR(50) NOT NULL,
      superadmin_mname VARCHAR(50),
      superadmin_lname VARCHAR(50) NOT NULL,
      superadmin_suffix VARCHAR(10)
      )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.SUPERVISOR_INFO_TABLE} (
      supervisor_id VARCHAR(50) PRIMARY KEY,
      supervisor_email VARCHAR(50) NOT NULL,
      supervisor_username VARCHAR(50) NOT NULL,
      supervisor_password TEXT NOT NULL,
      supervisor_fname VARCHAR(50) NOT NULL,
      supervisor_mname VARCHAR(50),
      supervisor_lname VARCHAR(50) NOT NULL,
      supervisor_suffix VARCHAR(10),
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
      officer_suffix VARCHAR(10),
      officer_contact_no VARCHAR(11) NOT NULL,
      officer_designation VARCHAR(50) NOT NULL,
      officer_is_verified BOOLEAN NOT NULL,
      hf_id VARCHAR(18) NOT NULL,

      FOREIGN KEY (hf_id) REFERENCES a_health_facility_info(hf_id)
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.PATIENT_INFO_TABLE} (
      patient_id VARCHAR(75) NOT NULL PRIMARY KEY,
      patient_fname VARCHAR(50) NOT NULL,
      patient_mname VARCHAR(50),
      patient_lname VARCHAR(50) NOT NULL,
      patient_suffix VARCHAR(10),
      patient_date_assess DATE NOT NULL,
      patient_age INT NOT NULL,
      patient_age_group_id INT NOT NULL,
      patient_sex VARCHAR(10) NOT NULL,
      patient_dob DATE NOT NULL,
      patient_civil_status VARCHAR(20) NOT NULL,
      patient_religion_id INT NOT NULL,
      patient_contact_no VARCHAR(15),
      patient_street TEXT,
      patient_purok VARCHAR(50),
      patient_sitio VARCHAR(50),
      brgy_id INT NOT NULL,
      muncity_id INT NOT NULL,
      province_id INT NOT NULL, 
      patient_phic_no VARCHAR(50),
      patient_pwd_no VARCHAR(50),
      patient_emp_status VARCHAR(50),
      patient_ip VARCHAR(50),
      patient_ethnicity_id INT NOT NULL,
      hf_id VARCHAR(18) NOT NULL,
     
      FOREIGN KEY (patient_age_group_id) REFERENCES a_age_group(ag_id),
      FOREIGN KEY (patient_religion_id) REFERENCES a_religion(religion_id),
      FOREIGN KEY (patient_ethnicity_id) REFERENCES a_ethnicity(ethnic_id),
      FOREIGN KEY (hf_id) REFERENCES a_health_facility_info(hf_id),
      FOREIGN KEY (brgy_id) REFERENCES a_brgy_info(brgy_id),
      FOREIGN KEY (muncity_id) REFERENCES a_muncity_info(muncity_id),
      FOREIGN KEY (province_id) REFERENCES a_province_info(province_id)
      )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.ASSESS_RED_FLAG_TABLE}(
      ard_id VARCHAR(75) NOT NULL PRIMARY KEY,
      patient_id VARCHAR(75) NOT NULL,
      ard_chest_pain VARCHAR(7),
      ard_difficulty_breathing VARCHAR(7),
      ard_loss_consciousness VARCHAR(7),
      ard_slurred_speech VARCHAR(7),
      ard_facial_asymmetry VARCHAR(7),
      ard_numb_arm VARCHAR(7),
      ard_disoriented VARCHAR(7),
      ard_chest_retractions VARCHAR(7),
      ard_seizure_or_convulsion VARCHAR(7),
      ard_selfharm_or_suicide VARCHAR(7),
      ard_aggressive_behavior VARCHAR(7),
      ard_eye_injury VARCHAR(7),
      ard_severe_injuries VARCHAR(7),
      hf_id VARCHAR(18) NOT NULL,

      FOREIGN KEY (hf_id) REFERENCES a_health_facility_info(hf_id),
      FOREIGN KEY (patient_id) REFERENCES a_patient_info(patient_id)
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.ASSESS_RED_FLAG_SUMMARY_TABLE}(
      RedFlagType VARCHAR(50) NOT NULL,
      Status VARCHAR(50) NOT NULL,
      Count INT NOT NULL
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.PAST_MEDICAL_HISTORY_TABLE}(
      pmh_id VARCHAR(75) NOT NULL PRIMARY KEY,
      patient_id VARCHAR(75) NOT NULL,
      pmh_hypertension VARCHAR(7),
      pmh_heart_disease VARCHAR(7),
      pmh_diabetes VARCHAR(7),
      pmh_specify_diabetes VARCHAR(50),
      pmh_cancer VARCHAR(7),
      pmh_specify_cancer VARCHAR(50),
      pmh_copd VARCHAR(7),
      pmh_asthma VARCHAR(7),
      pmh_allergies VARCHAR(7),
      pmh_specify_allergy VARCHAR(50),
      pmh_disorders VARCHAR(7),
      pmh_specify_disorder VARCHAR(50),
      pmh_vision_problems VARCHAR(7),
      pmh_previous_surgical_history VARCHAR(7),
      pmh_specify_surgical_history VARCHAR(50),
      pmh_thyroid_disorder VARCHAR(7),
      pmh_kidney_disorder VARCHAR(7),
      hf_id VARCHAR(18) NOT NULL,

      FOREIGN KEY (hf_id) REFERENCES a_health_facility_info(hf_id),
      FOREIGN KEY (patient_id) REFERENCES a_patient_info(patient_id)
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.FAMILY_HISTORY_TABLE}(
      fh_id VARCHAR(75) NOT NULL PRIMARY KEY,
      patient_id VARCHAR(75) NOT NULL,
      fh_hypertension VARCHAR(7),
      fh_stroke VARCHAR(7),
      fh_heart_disease VARCHAR(7),
      fh_diabetes_mellitus VARCHAR(7),
      fh_asthma VARCHAR(7),
      fh_cancer VARCHAR(7),
      fh_kidney_disease VARCHAR(7),
      fh_vascular_disease VARCHAR(7),
      fh_tb VARCHAR(7),
      fh_disorders VARCHAR(7),
      fh_copd VARCHAR(7),
      hf_id VARCHAR(18) NOT NULL,

      FOREIGN KEY (hf_id) REFERENCES a_health_facility_info(hf_id),
      FOREIGN KEY (patient_id) REFERENCES a_patient_info(patient_id)
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.NCD_RISK_FACTORS_TABLE}(
      rf_id VARCHAR(75) NOT NULL PRIMARY KEY,
      patient_id VARCHAR(75) NOT NULL,
      rf_tobacco_use TEXT,
      rf_alcohol_intake VARCHAR(7),
      rf_binge_drinker VARCHAR(7),
      rf_physical_activity VARCHAR(7),
      rf_nad_assessment VARCHAR(7),
      rf_kg_weight FLOAT,
      rf_cm_height FLOAT,
      rf_bmi FLOAT,
      rf_waist_circumference FLOAT,
      rf_bp VARCHAR(10),
      hf_id VARCHAR(18) NOT NULL,

      FOREIGN KEY (hf_id) REFERENCES a_health_facility_info(hf_id),
      FOREIGN KEY (patient_id) REFERENCES a_patient_info(patient_id)
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.RISK_SCREENING_TABLE}(
      rs_id VARCHAR(75) NOT NULL PRIMARY KEY,
      patient_id VARCHAR(75) NOT NULL,
      rs_blood_sugar_fbs FLOAT,
      rs_blood_sugar_rbs FLOAT,
      rs_blood_sugar_date_taken DATE,
      rs_blood_sugar_symptoms TEXT,
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
      rs_respiratory TEXT,
      hf_id VARCHAR(18) NOT NULL,

      FOREIGN KEY (hf_id) REFERENCES a_health_facility_info(hf_id),
      FOREIGN KEY (patient_id) REFERENCES a_patient_info(patient_id)
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.MANAGEMENT_TABLE}(
      mngm_id VARCHAR(75) NOT NULL PRIMARY KEY,
      patient_id VARCHAR(75) NOT NULL,
      mngm_lifestyle_mod TEXT,
      mngm_med_antihypertensive TEXT,
      mngm_med_antidiabetes TEXT,
      mngm_date_followup DATE,
      mngm_remarks TEXT,
      hf_id VARCHAR(18) NOT NULL,

      FOREIGN KEY (hf_id) REFERENCES a_health_facility_info(hf_id),
      FOREIGN KEY (patient_id) REFERENCES a_patient_info(patient_id)
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.REFERRAL_TABLE} (
      ref_id VARCHAR(75) NOT NULL PRIMARY KEY,
      patient_id VARCHAR(75) NOT NULL,
      officer_id VARCHAR(50) NOT NULL,
      physician_name TEXT NOT NULL, 
      ref_date DATE NOT NULL,
      ref_reason TEXT NOT NULL,
      ref_destination_id VARCHAR(50) NOT NULL,
      hf_id VARCHAR(18) NOT NULL,

      FOREIGN KEY (patient_id) REFERENCES a_patient_info(patient_id),
      FOREIGN KEY (officer_id) REFERENCES a_officer_info(officer_id),
      FOREIGN KEY (hf_id) REFERENCES a_health_facility_info(hf_id),
      FOREIGN KEY (ref_destination_id) REFERENCES a_health_facility_info(hf_id)
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.CONSULTATION_TYPES_TABLE} (
      cl_type_id INT PRIMARY KEY,
      cl_type_description TEXT
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.CONSULTATION_LOGS_TABLE} (
      cl_id VARCHAR(75) PRIMARY KEY,
      cl_type_id INT NOT NULL,
      cl_date DATE NOT NULL,
      patient_id VARCHAR(75) NOT NULL,
      officer_id VARCHAR(50) NOT NULL,
      hf_id VARCHAR(50) NOT NULL,
      ref_id VARCHAR(75),

      FOREIGN KEY (cl_type_id) REFERENCES a_consultation_types(cl_type_id),
      FOREIGN KEY (patient_id) REFERENCES a_patient_info(patient_id),
      FOREIGN KEY (officer_id) REFERENCES a_officer_info(officer_id),
      FOREIGN KEY (hf_id) REFERENCES a_health_facility_info(hf_id),
      FOREIGN KEY (ref_id) REFERENCES a_referral(ref_id)
    )`,

  // generate default tables for the previous data records
  `CREATE TABLE IF NOT EXISTS ${TableNames.AGE_BRACKET} (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      description TEXT NOT NULL,
      created_at TIMESTAMP,
      updated_at TIMESTAMP
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.AVAILABLE_SERVICES} (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      facility_code TEXT NOT NULL,
      service TEXT,
      costing TEXT,
      type VARCHAR(30),
      created_at TIMESTAMP,
      updated_at TIMESTAMP
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.BRACKET_SERVICES} (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      bracket_id TEXT NOT NULL,
      service TEXT,
      costing TEXT,
      type VARCHAR(30),
      created_at TIMESTAMP,
      updated_at TIMESTAMP
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.CASES} (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      description TEXT NOT NULL,
      created_at TIMESTAMP,
      updated_at TIMESTAMP
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.FEEDBACK} (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      message TEXT NOT NULL,
      status INT NOT NULL,
      remarks TEXT NOT NULL,
      created_at TIMESTAMP,
      updated_at TIMESTAMP
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.GENERAL_INFORMATION} (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      profile_id INT,
      dengvaxia_recipient_no TEXT,
      respondent INT,
      contact_no VARCHAR(50),
      street_name TEXT,
      sitio TEXT,
      religion TEXT,
      religion_others TEXT,
      birth_place TEXT,
      yrs_current_address INT,
      status INT,
      created_at TIMESTAMP,
      updated_at TIMESTAMP
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.IMMUSTAT} (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      profile_id INT,
      description TEXT,
      created_at TIMESTAMP,
      updated_at TIMESTAMP
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.MEDICATION} (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      profile_id INT NOT NULL,
      type TEXT NOT NULL,
      status TEXT NOT NULL,
      remarks TEXT NOT NULL,
      created_at TIMESTAMP,
      updated_at TIMESTAMP
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.PHIC_MEMBERSHIP} (
      id INT UNSIGNED NOT NULL,
      profile_id INT,
      phic_status TEXT,
      phic_type TEXT,
      phic_sponsored TEXT,
      phic_sponsored_others TEXT,
      phic_employed TEXT,
      phic_benefits VARCHAR(10),
      phic_benefits_yes TEXT,
      phic_status1 INT,
      created_at TIMESTAMP,
      updated_at TIMESTAMP
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.PROFILE} (
      id INT(10) unsigned PRIMARY KEY AUTO_INCREMENT,
      unique_id TEXT NOT NULL,
      familyID TEXT NOT NULL,
      phicID TEXT NOT NULL,
      nhtsID TEXT NOT NULL,
      head TEXT NOT NULL,
      relation TEXT NOT NULL,
      fname TEXT NOT NULL,
      mname TEXT NOT NULL,
      lname TEXT NOT NULL,
      suffix TEXT NOT NULL,
      dob DATE NOT NULL,
      sex char(255) NOT NULL,
      barangay_id INT NOT NULL,
      muncity_id INT NOT NULL,
      province_id INT NOT NULL,
      income INT NOT NULL,
      unmet INT, 
      water INT,
      toilet VARCHAR(10),
      education VARCHAR(20),
      hypertension TEXT,
      diabetic TEXT,
      pwd TEXT,
      pregnant DATE,
      dengvaxia VARCHAR(45),
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      sitio_id INT,
      purok_id INT,
      birth_place TEXT,
      civil_status TEXT,
      religion TEXT,
      other_religion TEXT,
      contact TEXT,
      height DOUBLE(8,2),
      weight DOUBLE(8,2),
      cancer TEXT,
      cancer_type TEXT,
      mental_med TEXT,
      tbdots_med TEXT,
      cvd_med TEXT,
      covid_status TEXT,
      menarche TEXT,
      menarche_age INT,
      newborn_screen TEXT,
      newborn_text TEXT,
      deceased TEXT,
      deceased_date DATE,
      pwd_desc TEXT,
      sexually_active VARCHAR(10) NOT NULL,
      nhts TEXT NOT NULL,
      four_ps TEXT NOT NULL,
      ip TEXT NOT NULL,
      member_others TEXT NOT NULL,
      balik_probinsya TEXT NOT NULL,
      updated_by VARCHAR(10) NOT NULL
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.SERVICES} (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      code TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at TIMESTAMP,
      updated_at TIMESTAMP
    )`,

  `CREATE TABLE IF NOT EXISTS ${TableNames.TUBERCULOSIS} (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      profile_id INT,
      tb_diagnosis VARCHAR(10),
      tb_diagnosed_yes TEXT,
      tb_cat1 INT,
      tb_cat2 INT,
      tb_cat3 INT,
      tb_cat4 INT,
      tb_status INT,
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      tb_ppd INT,
      tb_result_ppd TEXT,
      tb_sputum_exam INT,
      tb_result_sputum_exam TEXT,
      tb_cxr INT,
      tb_result_cxr TEXT,
      tb_genxpert INT,
      tb_result_genxpert TEXT
    )`,
];
