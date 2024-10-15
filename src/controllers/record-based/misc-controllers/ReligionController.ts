import { Request, Response } from "express";
import {
  officerRetrieveReligionList,
  superadminRetrieveReligionList,
  supervisorRetrieveReligionList,
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
      const results = await officerRetrieveReligionList();
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
      const results = await supervisorRetrieveReligionList();
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
      const results = await superadminRetrieveReligionList();
      res.status(200).json({ message: "All Religions:", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];
