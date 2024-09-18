import mysql from "mysql2";
import DatabaseConfig from "../../common/constants/DatabaseConfig";

// please change the connection in production mode
const db = mysql.createConnection({
  host: DatabaseConfig.OfficerConfig.HOSTNAME,
  user: DatabaseConfig.OfficerConfig.USER,
  password: DatabaseConfig.OfficerConfig.PASS,
  database: DatabaseConfig.DatabaseConnectionInfo.DATABASE_NAME,
});

// connect function
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log(`Officer is successfully connected.`);
});

export default db;
