import {Request, Response} from "express";
import { retrieveHealthFacility } from "../../../models/misc/HealthFacilityModel";

const retrieveHealthFacilityList = async(req: Request, res: Response) => {
    try {
        const results = await retrieveHealthFacility();
        res.status(200).json({message: "All available health facilities:", results});
    } catch (err) {
        return res.status(500).send(err);
  }
}

export default retrieveHealthFacilityList;