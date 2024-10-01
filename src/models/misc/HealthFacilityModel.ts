import { QueryResult } from "mysql2";
import TableNames from "../../common/constants/TableNames";
import guestDb from "../../connections/GuestConnection"

export const retrieveHealthFacility = async(): Promise<QueryResult> => {
  let query = `SELECT hf_id, hf_name from ${TableNames.HEALTH_FACILITY_INFO_TABLE};`;

  try {
    const [results] = await(await guestDb).query(query);
    return results; 
} catch (err) {
    throw err;
  }
};
