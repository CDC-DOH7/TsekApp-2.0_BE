import { Request, Response } from "express";
import {
  officerRetrieveReligion,
  superadminRetrieveReligion,
  supervisorRetrieveReligion,
} from "../../../models/misc/ReligionModel";
import {
  authenticateOfficer,
  authenticateSuperadmin,
  authenticateSupervisor,
} from "../../../middleware/authMiddleware";

export const officerRetrieveReligionList = [
  authenticateOfficer,
  async (req: Request, res: Response) => {
    try {
      const results = await officerRetrieveReligion();
      res.status(200).json({ message: "All Religions:", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

export const supervisorRetrieveReligionList = [
  authenticateSupervisor,
  async (req: Request, res: Response) => {
    try {
      const results = await supervisorRetrieveReligion();
      res.status(200).json({ message: "All Religions:", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

export const superadminRetrieveReligionList = [
  authenticateSuperadmin,
  async (req: Request, res: Response) => {
    try {
      const results = await superadminRetrieveReligion();
      res.status(200).json({ message: "All Religions:", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];
