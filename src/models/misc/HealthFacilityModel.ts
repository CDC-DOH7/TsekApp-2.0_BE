import { QueryResult } from "mysql2";
import TableNames from "../../common/constants/TableNames";

import guestDb from "../../connections/GuestConnection"
import officerDb from "../../connections/OfficerConnection"
import supervisorDb from "../../connections/SupervisorConnection"
import superadminDb from "../../connections/SuperadminConnection"

export const retrieveHealthFacilityInfo = async(): Promise<QueryResult> => {
  let query = `SELECT hf_id, hf_name from ${TableNames.HEALTH_FACILITY_INFO_TABLE};`;

  try {
    const [results] = await(await guestDb).query(query);
    return results; 
} catch (err) {
    throw err;
  }
};

export const officerRetrieveHealthFacilityInfo = async(): Promise<QueryResult> => {
  let query = `SELECT hf_id, hf_name from ${TableNames.HEALTH_FACILITY_INFO_TABLE};`;

  try {
    const [results] = await(await officerDb).query(query);
    return results; 
} catch (err) {
    throw err;
  }
};


export const supervisorRetrieveHealthFacilityInfo = async(): Promise<QueryResult> => {
  let query = `SELECT hf_id, hf_name from ${TableNames.HEALTH_FACILITY_INFO_TABLE};`;

  try {
    const [results] = await(await supervisorDb).query(query);
    return results; 
} catch (err) {
    throw err;
  }
};

export const superadminRetrieveHealthFacilityInfo = async(): Promise<QueryResult> => {
  let query = `SELECT hf_id, hf_name from ${TableNames.HEALTH_FACILITY_INFO_TABLE};`;

  try {
    const [results] = await(await superadminDb).query(query);
    return results; 
} catch (err) {
    throw err;
  }
};