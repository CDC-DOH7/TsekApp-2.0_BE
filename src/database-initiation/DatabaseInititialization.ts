import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { createTablesScripts } from "./initialization-scripts/DatabaseTableModelsCreation";
import {
  insertDefaultAgeGroupValues,
  insertDefaultBarangayValues,
  insertDefaultHealthFacilityValues,
  insertDefaultMuncityValues,
  insertDefaultProvinceValues,
} from "./initialization-scripts/DatabaseTableDefaultValueInsertion";
import calculateCurrentDateTime from "../common/calc/CalcDateTime";
import TableNames from "../common/constants/TableNames";

dotenv.config();

const disableForeignKeyChecksCmd = `SET FOREIGN_KEY_CHECKS=0`;
const enableForeignKeyChecksCmd = `SET FOREIGN_KEY_CHECKS=1`;

const identifyTableName = (index: number) => {
  let tableName = "";
  switch (index) {
    case 0:
      tableName = TableNames.BARANGAY_TABLE;
      break;
    case 1:
      tableName = TableNames.MUNCITY_TABLE;
      break;
    case 2:
      tableName = TableNames.PROVINCE_TABLE;
      break;
    case 3:
      tableName = TableNames.AGE_GROUP_TABLE;
      break;
    case 4:
      tableName = TableNames.HEALTH_FACILITY_INFO_TABLE;
      break;
    case 5:
      tableName = TableNames.SUPERADMIN_INFO_TABLE;
      break;
    case 6:
      tableName = TableNames.SUPERVISOR_INFO_TABLE;
      break;
    case 7:
      tableName = TableNames.OFFICER_INFO_TABLE;
      break;
    case 8:
      tableName = TableNames.PATIENT_INFO_TABLE;
      break;
    case 9:
      tableName = TableNames.ASSESS_RED_FLAG_TABLE;
      break;
    case 10:
      tableName = TableNames.ASSESS_RED_FLAG_SUMMARY_TABLE;
      break;
    case 11:
      tableName = TableNames.PAST_MEDICAL_HISTORY_TABLE;
      break;
    case 12:
      tableName = TableNames.FAMILY_HISTORY_TABLE;
      break;
    case 13:
      tableName = TableNames.NCD_RISK_FACTORS_TABLE;
      break;
    case 14:
      tableName = TableNames.RISK_SCREENING_TABLE;
      break;
    case 15:
      tableName = TableNames.MANAGEMENT_TABLE;
      break;
    case 16:
      tableName = TableNames.REFERRAL_TABLE;
      break;
    case 17:
      tableName = TableNames.CONSULTATION_LOGS_TABLE;
      break;
    case 18:
      tableName = TableNames.AGE_BRACKET;
      break;
    case 19:
      tableName = TableNames.AVAILABLE_SERVICES;
      break;
    case 20:
      tableName = TableNames.BRACKET_SERVICES;
      break;
    case 21:
      tableName = TableNames.CASES;
      break;
    case 22:
      tableName = TableNames.FEEDBACK;
      break;
    case 23:
      tableName = TableNames.GENERAL_INFORMATION;
      break;
    case 24:
      tableName = TableNames.IMMUSTAT;
      break;
    case 25:
      tableName = TableNames.MEDICATION;
      break;
    case 26:
      tableName = TableNames.PHIC_MEMBERSHIP;
      break;
    case 27:
      tableName = TableNames.PROFILE;
      break;
    case 28:
      tableName = TableNames.SERVICES;
      break;
    case 29:
      tableName = TableNames.TUBERCULOSIS;
      break;
    default:
      tableName = "N/A";
      break;
  }

  return tableName;
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
      `${calculateCurrentDateTime()} >> MariaDB Database version: ${
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
      let iteration: number = 0;
      // Create tables directly
      await Promise.all(
        createTablesScripts.map(async (script) => {
          try {
            await connection.query(script);
            console.log(
              `${calculateCurrentDateTime()} >> Table created successfully: ${identifyTableName(
                iteration
              )}`
            );
            iteration++;
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
  const connection = await mysql.createConnection({
    host: process.env.SUPERADMIN_HOSTNAME,
    user: process.env.SUPERADMIN_USER,
    password: process.env.SUPERADMIN_PASS,
    database: process.env.DATABASE_NAME,
  });

  return connection;
};

// Export the initialization function
export default initializeDatabase;
