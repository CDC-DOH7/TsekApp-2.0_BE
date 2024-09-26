import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { createTablesScripts } from "../database-models-creation/DatabaseTableModelsCreation";

dotenv.config();

// Create the database connection
const createDbConnection = async () => {

  // please change the connection in production mode
  const connection = await mysql.createConnection({
    host: process.env.SUPERADMIN_HOSTNAME,
    user: process.env.SUPERADMIN_USER,
    password: process.env.SUPERADMIN_PASS,
    database: process.env.DATABASE_NAME,
  });

  console.log(`Superadmin is successfully connected.`);
  return connection;
};

const disableForeignKeyChecks = `SET FOREIGN_KEY_CHECKS=0`;
const enableForeignKeyChecks = `SET FOREIGN_KEY_CHECKS=1`;

const createTables = async (connection: mysql.Connection) => {
  try {
    // Disable foreign key checks
    await connection.query(disableForeignKeyChecks);
    console.log(`Disabling foreign key checks.`);

    // Execute each create table statement sequentially
    for (const script of createTablesScripts) {
      await connection.query(script);
      console.log(`Table created successfully.`);
    }

    // Re-enable foreign key checks
    await connection.query(enableForeignKeyChecks);
    console.log(`Re-Enabled foreign key checks.`);
  } catch (err: any) {
    console.error(`Error during table creation: ${err.message}`);
  } finally {
    await connection.end(); // Close the database connection
  }
};

const initDb = async () => {
  const dbConnection = await createDbConnection();
  await createTables(dbConnection);
};

initDb().catch(err => console.error(`Database initialization failed: ${err.message}`));

