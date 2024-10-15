import { Request, Response } from "express";
import {
  officerRetrieveEthnicityList,
  superadminRetrieveEthnicityList,
  supervisorRetrieveEthnicityList,
} from "../../../models/misc/EthnicityModel";
import {
  authenticateOfficer,
  authenticateSuperadmin,
  authenticateSupervisor,
} from "../../../middleware/authMiddleware";

export const officerRetrieveEthnicityList = [
  authenticateOfficer,
  async (req: Request, res: Response) => {
    try {
      const results = await officerRetrieveEthnicityList();
      res.status(200).json({ message: "All Ethnicities:", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

export const supervisorRetrieveEthnicityList = [
  authenticateSupervisor,
  async (req: Request, res: Response) => {
    try {
      const results = await supervisorRetrieveEthnicityList();
      res.status(200).json({ message: "All Ethnicities:", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

export const superadminRetrieveEthnicityList = [
  authenticateSuperadmin,
  async (req: Request, res: Response) => {
    try {
      const results = await superadminRetrieveEthnicityList();
      res.status(200).json({ message: "All Ethnicities:", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];
