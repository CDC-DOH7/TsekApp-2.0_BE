import { Request, Response } from "express";
import {
  officerRetrieveProvinceInfo,
  supervisorRetrieveProvinceInfo,
  superadminRetrieveProvinceInfo,
} from "../../../models/misc/ProvinceModel";
import {
  authenticateOfficer,
  authenticateSuperadmin,
  authenticateSupervisor,
} from "../../../middleware/authMiddleware";

export const officerRetrieveProvinceList = [
  authenticateOfficer,
  async (req: Request, res: Response) => {
    try {
      const results = await officerRetrieveProvinceInfo();
      res.status(200).json({ message: "All Provinces:", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

export const supervisorRetrieveProvinceList = [
  authenticateSupervisor,
  async (req: Request, res: Response) => {
    try {
      const results = await supervisorRetrieveProvinceInfo();
      res.status(200).json({ message: "All Provinces:", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

export const superadminRetrieveProvinceList = [
  authenticateSuperadmin,
  async (req: Request, res: Response) => {
    try {
      const results = await superadminRetrieveProvinceInfo();
      res.status(200).json({ message: "All Provinces:", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];
