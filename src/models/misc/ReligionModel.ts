import { QueryResult } from "mysql2";
import TableNames from "../../common/constants/TableNames";

import officerDb from "../../connections/OfficerConnection";
import supervisorDb from "../../connections/SupervisorConnection";
import superadminDb from "../../connections/SuperadminConnection";

export const officerRetrieveReligion = async (): Promise<QueryResult> => {
  let query = `SELECT religion_id, religion_name from ${TableNames.RELIGION_TABLE};`;

  try {
    const [results] = await (await officerDb).query(query);
    return results;
  } catch (err) {
    throw err;
  }
};

export const supervisorRetrieveReligion = async (): Promise<QueryResult> => {
  let query = `SELECT religion_id, religion_name from ${TableNames.RELIGION_TABLE};`;

  try {
    const [results] = await (await supervisorDb).query(query);
    return results;
  } catch (err) {
    throw err;
  }
};

export const superadminRetrieveReligion = async (): Promise<QueryResult> => {
  let query = `SELECT religion_id, religion_name from ${TableNames.RELIGION_TABLE};`;

  try {
    const [results] = await (await superadminDb).query(query);
    return results;
  } catch (err) {
    throw err;
  }
};
