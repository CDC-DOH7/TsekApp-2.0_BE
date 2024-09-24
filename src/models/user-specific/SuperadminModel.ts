import mysql from "mysql2";
import dotenv from "dotenv";
import { createTablesScripts } from "../database-models-creation/DatabaseTableModelsCreation";

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


// Disable foreign key checks
db.query(disableForeignKeyChecks, (err) => {
  if (err) throw err;
  console.log(`Disabled foreign key checks.`);

  // Execute each create table statement sequentially
  let index = 0;
  const executeNextTable = () => {
    if (index < createTablesScripts.length) {
      db.query(createTablesScripts[index], (err) => {
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
