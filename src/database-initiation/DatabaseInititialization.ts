import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { createTablesScripts } from "./initialization-scripts/DatabaseTableModelsCreation";
import {
  insertDefaultAgeGroupValues,
  insertDefaultBarangayValues,
  insertDefaultEthnicityValues,
  insertDefaultHealthFacilityValues,
  insertDefaultMuncityValues,
  insertDefaultProvinceValues,
  insertDefaultReligionValues,
} from "./initialization-scripts/DatabaseTableDefaultValueInsertion";
import calculateCurrentDateTime from "../common/calc/CalcDateTime";
import TableNames from "../common/constants/TableNames";
import fs from "fs";

dotenv.config();

const disableForeignKeyChecksCmd = `SET FOREIGN_KEY_CHECKS=0`;
const enableForeignKeyChecksCmd = `SET FOREIGN_KEY_CHECKS=1`;

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

    // Check if each table exists and create if not
    const tableNames = Object.values(TableNames);
    for (let i = 0; i < tableNames.length; i++) {
      const tableName = tableNames[i];
      const [rows] = await connection.query(`SHOW TABLES LIKE ?`, [tableName]);
      if (rows.length === 0) {
        try {
          await connection.query(createTablesScripts[i]);
          console.log(
            `${calculateCurrentDateTime()} >> Table created successfully: ${tableName}`
          );
        } catch (error: any) {
          console.error(
            `${calculateCurrentDateTime()} >> Critical error creating table ${tableName}: ${
              error.message
            }`
          );
        }
      } else {
        console.log(
          `${calculateCurrentDateTime()} >> Table already exists: ${tableName}`
        );
      }
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
