import { QueryResult } from "mysql2";
import TableNames from "../../common/constants/TableNames";

import officerDb from "../../connections/OfficerConnection"
import supervisorDb from "../../connections/SupervisorConnection"
import superadminDb from "../../connections/SuperadminConnection"

export const officerRetrieveMuncityInfo = async(province_id: number): Promise<QueryResult> => {
  let query = `SELECT muncity_id, muncity_name from ${TableNames.MUNCITY_TABLE} WHERE province_id = ?;`;

  try {
    const [results] = await(await officerDb).query(query, [province_id]);
    return results; 
} catch (err) {
    throw err;
  }
};

export const supervisorRetrieveMuncityInfo = async(province_id: number): Promise<QueryResult> => {
  let query = `SELECT muncity_id, muncity_name from ${TableNames.MUNCITY_TABLE} WHERE province_id = ?;`;

  try {
    const [results] = await(await supervisorDb).query(query, [province_id]);
    return results; 
} catch (err) {
    throw err;
  }
};

export const superadminRetrieveMuncityInfo = async(province_id: number): Promise<QueryResult> => {
  let query = `SELECT muncity_id, muncity_name from ${TableNames.MUNCITY_TABLE} WHERE province_id = ?;`;

  try {
    const [results] = await(await superadminDb).query(query, [province_id]);
    return results; 
} catch (err) {
    throw err;
  }
};