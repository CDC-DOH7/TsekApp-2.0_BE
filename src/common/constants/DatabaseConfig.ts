enum DatabaseConnectionInfo {
  DATABASE_NAME = "e-TsekApp",
}
// change their roles here
enum SuperAdminConfig {
  HOSTNAME = "localhost",
  USER = "root",
  PASS = "12345",
  DATABASE = "e-TsekApp",
}

enum SupervisorConfig {
  HOSTNAME = "localhost",
  USER = "root",
  PASS = "12345",
  DATABASE = "e-TsekApp",
}

enum OfficerConfig {
  HOSTNAME = "localhost",
  USER = "root",
  PASS = "12345",
  DATABASE = "e-TsekApp",
}

export default {
  DatabaseConnectionInfo,
  SuperAdminConfig,
  SupervisorConfig,
  OfficerConfig,
};
