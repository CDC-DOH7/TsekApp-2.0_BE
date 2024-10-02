import { QueryResult } from "mysql2";
import TableNames from "../../common/constants/TableNames";

import officerDb from "../../connections/OfficerConnection"
import supervisorDb from "../../connections/SupervisorConnection"
import superadminDb from "../../connections/SuperadminConnection"


export const officerRetrieveBarangayInfo = async(muncity_id: number, province_id: number): Promise<QueryResult> => {
  let query = `SELECT brgy_id, brgy_name from ${TableNames.BARANGAY_TABLE} WHERE muncity_id = ? AND province_id = ? ;`;

  try {
    const [results] = await(await officerDb).query(query, [muncity_id, province_id]);
    return results; 
} catch (err) {
    throw err;
  }
};

export const supervisorRetrieveBarangayInfo = async(muncity_id: number, province_id: number): Promise<QueryResult> => {
  let query = `SELECT brgy_id, brgy_name from ${TableNames.BARANGAY_TABLE} WHERE muncity_id = ? AND province_id = ? ;`;

  try {
    const [results] = await(await supervisorDb).query(query, [muncity_id, province_id]);
    return results; 
} catch (err) {
    throw err;
  }
};

export const superadminRetrieveBarangayInfo = async(muncity_id: number, province_id: number): Promise<QueryResult> => {
  let query = `SELECT brgy_id, brgy_name from ${TableNames.BARANGAY_TABLE} WHERE muncity_id = ? AND province_id = ? ;`;

  try {
    const [results] = await(await superadminDb).query(query, [muncity_id, province_id]);
    return results; 
} catch (err) {
    throw err;
  }
};