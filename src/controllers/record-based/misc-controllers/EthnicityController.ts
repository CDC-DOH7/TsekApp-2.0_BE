import { Request, Response } from "express";
import {
  officerRetrieveEthnicity,
  superadminRetrieveEthnicity,
  supervisorRetrieveEthnicity,
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
      const results = await officerRetrieveEthnicity();
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
      const results = await supervisorRetrieveEthnicity();
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
      const results = await superadminRetrieveEthnicity();
      res.status(200).json({ message: "All Ethnicities:", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];
