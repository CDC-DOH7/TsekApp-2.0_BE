import { QueryResult } from "mysql2";
import TableNames from "../../common/constants/TableNames";

import officerDb from "../../connections/OfficerConnection";
import supervisorDb from "../../connections/SupervisorConnection";
import superadminDb from "../../connections/SuperadminConnection";

export const officerRetrieveEthnicity = async (): Promise<QueryResult> => {
  let query = `SELECT ethnic_id, ethnic_name from ${TableNames.ETHNICITY_TABLE};`;

  try {
    const [results] = await (await officerDb).query(query);
    return results;
  } catch (err) {
    throw err;
  }
};

export const supervisorRetrieveEthnicity = async (): Promise<QueryResult> => {
  let query = `SELECT ethnic_id, ethnic_name from ${TableNames.ETHNICITY_TABLE};`;

  try {
    const [results] = await (await supervisorDb).query(query);
    return results;
  } catch (err) {
    throw err;
  }
};

export const superadminRetrieveEthnicity = async (): Promise<QueryResult> => {
  let query = `SELECT ethnic_id, ethnic_name from ${TableNames.ETHNICITY_TABLE};`;

  try {
    const [results] = await (await superadminDb).query(query);
    return results;
  } catch (err) {
    throw err;
  }
};
