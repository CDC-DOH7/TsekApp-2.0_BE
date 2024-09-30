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
import calculateCurrentDateTime from "../../common/calc/CalcDateTime";
dotenv.config();

const disableForeignKeyChecksCmd = `SET FOREIGN_KEY_CHECKS=0`;
const enableForeignKeyChecksCmd = `SET FOREIGN_KEY_CHECKS=1`;

const initializeDatabase = async () => {
  const connection = await connectToDatabase();
  let iteration: number = 0;
  try {
    console.log(`${calculateCurrentDateTime()}>> Disabling foreign key checks.\n`);
    await connection.query(disableForeignKeyChecksCmd);

    // Create tables
    for (const script of createTablesScripts) {
      await connection.query(script);
      console.log(`${calculateCurrentDateTime()} >> Count: (${iteration}) Table created successfully.`);
      iteration++;
    }
  
    // Insert default values
    iteration = 0; // reset
    for (const script of insertDefaultAgeGroupValues) {
      await connection.query(script);
      console.log(`${calculateCurrentDateTime()} >> Count: (${iteration}) Age group values inserted successfully.`);
      iteration++;
    }
 
    iteration = 0; // reset
    for (const script of insertDefaultProvinceValues) {
      await connection.query(script);
      console.log(`${calculateCurrentDateTime()} >> Count: (${iteration}) Province values inserted successfully.`);
      iteration++;
    }
 
    iteration = 0; // reset
    for(const script of insertDefaultHealthFacilityValues){
      await connection.query(script);
      console.log(`${calculateCurrentDateTime()} >> Count: (${iteration}) Health facility values inserted successfully`);
      iteration++;
    }
 
    iteration = 0; // reset
    for (const script of insertDefaultBarangayValues) {
      await connection.query(script);
      console.log(`${calculateCurrentDateTime()} >> Count: (${iteration}) Barangay values inserted successfully.`);
      iteration++;
    }
 
    iteration = 0; //reset
    for (const script of insertDefaultMuncityValues) {
      await connection.query(script);
      console.log(`${calculateCurrentDateTime()}>> Count: (${iteration}) Muncity values inserted successfully.`);
      iteration++;
    }

    console.log(`\n${calculateCurrentDateTime()} >> Re-enabling foreign key checks.`);
    await connection.query(enableForeignKeyChecksCmd);
  } catch (err: any) {
    console.error(`${calculateCurrentDateTime()} >> Database initialization error: ${err.message}`);
  } finally {
    await connection.end();
  }
};

const connectToDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.SUPERADMIN_HOSTNAME,
    user: process.env.SUPERADMIN_USER,
    password: process.env.SUPERADMIN_PASS,
    database: process.env.DATABASE_NAME,
  });
  console.log(
    `Superadmin is successfully connected. Beginning database initialization...`
  );
  return connection;
};

// Export the initialization function
export default initializeDatabase;
