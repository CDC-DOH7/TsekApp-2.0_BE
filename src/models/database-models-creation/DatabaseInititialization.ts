import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { createTablesScripts } from "./initialization-scripts/DatabaseTableModelsCreation";
import { insertDefaultAgeGroupValues, insertDefaultBarangayValues, insertDefaultMuncityValues, insertDefaultProvinceValues } from "./initialization-scripts/DatabaseTableDefaultValueInsertion";
dotenv.config();

const disableForeignKeyChecksCmd = `SET FOREIGN_KEY_CHECKS=0`;
const enableForeignKeyChecksCmd = `SET FOREIGN_KEY_CHECKS=1`;

const initializeDatabase = async () => {
  const connection = await connectToDatabase();

  try {
    console.log(`Disabling foreign key checks.`);
    await connection.query(disableForeignKeyChecksCmd);

    // Create tables
    for (const script of createTablesScripts) {
      await connection.query(script);
      console.log(`Table created successfully.`);
    }

    // Insert default values
    for (const script of insertDefaultAgeGroupValues) {
      await connection.query(script);
      console.log(`Age group values inserted successfully.`);
    }

    for (const script of insertDefaultBarangayValues) {
      await connection.query(script);
      console.log(`Barangay values inserted successfully.`);
    }

    for (const script of insertDefaultMuncityValues) {
      await connection.query(script);
      console.log(`Muncity values inserted successfully.`);
    }

    for (const script of insertDefaultProvinceValues) {
      await connection.query(script);
      console.log(`Province values inserted successfully.`);
    }

    console.log(`Re-enabling foreign key checks.`);
    await connection.query(enableForeignKeyChecksCmd);
  } catch (err: any) {
    console.error(`Database initialization error: ${err.message}`);
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
  console.log(`Superadmin is successfully connected. Beginning database initialization...`);
  return connection;
};

// Export the initialization function
export default initializeDatabase;
