import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { createTablesScripts } from "./initialization-scripts/DatabaseTableModelsCreation";
import {
  insertDefaultEthnicityValues,
  insertDefaultReligionValues,
  insertDefaultAgeGroupValues,
  insertDefaultBarangayValues,
  insertDefaultHealthFacilityValues,
  insertDefaultMuncityValues,
  insertDefaultProvinceValues,
} from "./initialization-scripts/DatabaseTableDefaultValueInsertion";
import calculateCurrentDateTime from "../common/calc/CalcDateTime";
import TableNames from "../common/constants/TableNames";
import fs from "fs";

dotenv.config();

const disableForeignKeyChecksCmd = `SET FOREIGN_KEY_CHECKS=0`;
const enableForeignKeyChecksCmd = `SET FOREIGN_KEY_CHECKS=1`;

const identifyTableName = (index: number) => {
  const tableNamesMap: { [key: number]: string } = {
    0: TableNames.RELIGION_TABLE,
    1: TableNames.ETHNICITY_TABLE,
    2: TableNames.BARANGAY_TABLE,
    3: TableNames.MUNCITY_TABLE,
    4: TableNames.PROVINCE_TABLE,
    5: TableNames.AGE_GROUP_TABLE,
    6: TableNames.HEALTH_FACILITY_INFO_TABLE,
    7: TableNames.SUPERADMIN_INFO_TABLE,
    8: TableNames.SUPERVISOR_INFO_TABLE,
    9: TableNames.OFFICER_INFO_TABLE,
    10: TableNames.PATIENT_INFO_TABLE,
    11: TableNames.ASSESS_RED_FLAG_TABLE,
    12: TableNames.ASSESS_RED_FLAG_SUMMARY_TABLE,
    13: TableNames.PAST_MEDICAL_HISTORY_TABLE,
    14: TableNames.FAMILY_HISTORY_TABLE,
    15: TableNames.NCD_RISK_FACTORS_TABLE,
    16: TableNames.RISK_SCREENING_TABLE,
    17: TableNames.MANAGEMENT_TABLE,
    18: TableNames.REFERRAL_TABLE,
    19: TableNames.CONSULTATION_LOGS_TABLE,
    20: TableNames.AGE_BRACKET,
    21: TableNames.AVAILABLE_SERVICES,
    22: TableNames.BRACKET_SERVICES,
    23: TableNames.CASES,
    24: TableNames.FEEDBACK,
    25: TableNames.GENERAL_INFORMATION,
    26: TableNames.IMMUSTAT,
    27: TableNames.MEDICATION,
    28: TableNames.PHIC_MEMBERSHIP,
    29: TableNames.PROFILE,
    30: TableNames.SERVICES,
    31: TableNames.TUBERCULOSIS,
  };

  return tableNamesMap[index] || "N/A";
};

const initializeDatabase = async (): Promise<void> => {
  const connection = await connectToDatabase();

  console.log(`\n${calculateCurrentDateTime()} >> Initializing System...`);
  try {
    console.log(`\n${calculateCurrentDateTime()} >> Initializing Database ...`);
    // Get database version
    const [versionRows] = (await connection.query(
      "SELECT VERSION() AS version"
    )) as [Array<{ version: string }>, mysql.ResultSetHeader];
    console.log(
      `${calculateCurrentDateTime()} >> MySQL/MariaDB Database version: ${
        versionRows[0].version
      }`
    );

    // Get OS information
    const [osRows] = (await connection.query(
      "SHOW VARIABLES LIKE 'version_comment'"
    )) as [Array<{ Value: string }>, mysql.ResultSetHeader];
    console.log(
      `${calculateCurrentDateTime()} >> OS information: ${osRows[0].Value}`
    );

    console.log(
      `${calculateCurrentDateTime()} >> Disabling foreign key checks.`
    );
    await connection.query(disableForeignKeyChecksCmd);

    // Check if any of the tables exist
    const tableNames = Object.values(TableNames);
    const existingTables = await Promise.all(
      tableNames.map(async (tableName) => {
        const [rows] = await connection.query(`SHOW TABLES LIKE ?`, [
          tableName,
        ]);
        return rows.length > 0;
      })
    );

    // If any of the tables exist, skip table creation
    if (existingTables.some((exists) => exists)) {
      console.log(
        `${calculateCurrentDateTime()} >> One or more required tables already exist. Skipping table creation.`
      );
    } else {
      // Create tables directly
      await Promise.all(
        createTablesScripts.map(async (script, index) => {
          try {
            await connection.query(script);
            console.log(
              `${calculateCurrentDateTime()} >> Table created successfully: ${identifyTableName(
                index
              )}`
            );
          } catch (error: any) {
            console.error(
              `${calculateCurrentDateTime()} >> Critical error creating table: ${
                error.message
              }`
            );
          }
        })
      );
    }

    // Insert default values directly
    await insertDefaultValues([
      insertDefaultEthnicityValues,
      insertDefaultReligionValues,
      insertDefaultProvinceValues,
      insertDefaultMuncityValues,
      insertDefaultBarangayValues,
      insertDefaultAgeGroupValues,
      insertDefaultHealthFacilityValues,
    ]);

    console.log(
      `${calculateCurrentDateTime()} >> Re-enabling foreign key checks.`
    );
    await connection.query(enableForeignKeyChecksCmd);
  } catch (err: any) {
    console.error(
      `${calculateCurrentDateTime()} >> Critical database initialization error: ${
        err.message
      }`
    );
  } finally {
    console.log(
      `${calculateCurrentDateTime()} >> Database initialization complete!`
    );
    await connection.end();
  }
};

const insertDefaultValues = async (valueScripts: string[][]): Promise<void> => {
  let duplicateCount = 0;

  const connection = await connectToDatabase();

  for (const scripts of valueScripts) {
    await Promise.all(
      scripts.map(async (script) => {
        try {
          await connection.query(script);
        } catch (error: any) {
          if (error.code === "ER_DUP_ENTRY") {
            duplicateCount++;
          } else {
            console.error(
              `${calculateCurrentDateTime()} >> Critical error inserting values: ${
                error.message
              }`
            );
          }
        }
      })
    );
  }

  if (duplicateCount > 0) {
    console.log(
      `${calculateCurrentDateTime()} >> Insertion completed with ${duplicateCount} duplicate entries ignored.`
    );
  } else {
    console.log(
      `${calculateCurrentDateTime()} >> Successfully inserted default values!`
    );
  }
};

const connectToDatabase = async (): Promise<any> => {
  const isProduction: boolean =
    process.env.IS_PRODUCTION?.toLowerCase() === "true";

  let connection: mysql.Connection;

  if (!isProduction) {
    connection = await mysql.createConnection({
      host: process.env.DEV_HOSTNAME,
      user: process.env.DEV_SUPERADMIN_USER,
      password: process.env.DEV_SUPERADMIN_PASS,
      database: process.env.DATABASE_NAME,
      port: Number(process.env.LOCAL_MYSQL_PORT),
    });
  } else {
    connection = await mysql.createConnection({
      host: process.env.PROD_HOSTNAME,
      user: process.env.PROD_SUPERADMIN_USER,
      password: process.env.PROD_SUPERADMIN_PASS,
      database: process.env.DATABASE_NAME,
      port: Number(process.env.REMOTE_MYSQL_PORT),
      ssl: { ca: fs.readFileSync(String(process.env.CA_CERTIFICATE_PATH)) },
    });
  }

  return connection;
};

// Export the initialization function
export default initializeDatabase;
