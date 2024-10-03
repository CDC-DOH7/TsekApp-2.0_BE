import { Request, Response } from "express";
import {
  officerRetrieveMuncityInfo,
  superadminRetrieveMuncityInfo,
  supervisorRetrieveMuncityInfo,
} from "../../../models/misc/MuncityModel";
import {
  authenticateOfficer,
  authenticateSuperadmin,
  authenticateSupervisor,
} from "../../../middleware/authMiddleware";

export const officerRetrieveMuncityList = [
  authenticateOfficer,
  async (req: Request, res: Response) => {
    const { province_id } = req.body;
    try {
      const results = await officerRetrieveMuncityInfo(province_id);
      res
        .status(200)
        .json({ message: "All Municipalities/Cities:", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

export const supervisorRetrieveMuncityList = [
  authenticateSupervisor,
  async (req: Request, res: Response) => {
    const { province_id } = req.body;
    try {
      const results = await supervisorRetrieveMuncityInfo(province_id);
      res
        .status(200)
        .json({ message: "All Municipalities/Cities:", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

export const superadminRetrieveMuncityList = [
  authenticateSuperadmin,
  async (req: Request, res: Response) => {
    const { province_id } = req.body;
    try {
      const results = await superadminRetrieveMuncityInfo(province_id);
      res
        .status(200)
        .json({ message: "All Municipalities/Cities:", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];
