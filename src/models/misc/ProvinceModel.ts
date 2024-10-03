import { QueryResult } from "mysql2";
import TableNames from "../../common/constants/TableNames";

import officerDb from "../../connections/OfficerConnection"
import supervisorDb from "../../connections/SupervisorConnection"
import superadminDb from "../../connections/SuperadminConnection"

export const officerRetrieveProvinceInfo = async(): Promise<QueryResult> => {
  let query = `SELECT province_id, province_name from ${TableNames.PROVINCE_TABLE};`;

  try {
    const [results] = await(await officerDb).query(query);
    return results; 
} catch (err) {
    throw err;
  }
};

export const supervisorRetrieveProvinceInfo = async(): Promise<QueryResult> => {
  let query = `SELECT province_id, province_name from ${TableNames.PROVINCE_TABLE};`;

  try {
    const [results] = await(await supervisorDb).query(query);
    return results; 
} catch (err) {
    throw err;
  }
};

export const superadminRetrieveProvinceInfo = async(): Promise<QueryResult> => {
  let query = `SELECT province_id, province_name from ${TableNames.PROVINCE_TABLE};`;

  try {
    const [results] = await(await superadminDb).query(query);
    return results; 
} catch (err) {
    throw err;
  }
};