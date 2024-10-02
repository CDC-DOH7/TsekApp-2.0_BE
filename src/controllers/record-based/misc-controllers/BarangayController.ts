import { Request, Response } from "express";
import {
  officerRetrieveBarangayInfo,
  supervisorRetrieveBarangayInfo,
  superadminRetrieveBarangayInfo,
} from "../../../models/misc/BarangayModel";
import {
  authenticateOfficer,
  authenticateSuperadmin,
  authenticateSupervisor,
} from "../../../middleware/authMiddleware";

export const officerRetrieveBarangayList = [
  authenticateOfficer,
  async (req: Request, res: Response) => {
    const { muncity_id, province_id } = req.body;
    try {
      const results = await officerRetrieveBarangayInfo(
        muncity_id,
        province_id
      );
      res
        .status(200)
        .json({ message: "All Barangays:", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

export const supervisorRetrieveBarangayList = [
  authenticateSupervisor,
  async (req: Request, res: Response) => {
    const { muncity_id, province_id } = req.body;
    try {
      const results = await supervisorRetrieveBarangayInfo(
        muncity_id,
        province_id
      );
      res
        .status(200)
        .json({ message: "All Barangays:", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

export const superadminRetrieveBarangayList = [
  authenticateSuperadmin,
  async (req: Request, res: Response) => {
    const { muncity_id, province_id } = req.body;
    try {
      const results = await superadminRetrieveBarangayInfo(
        muncity_id,
        province_id
      );
      res
        .status(200)
        .json({ message: "All Barangays:", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];
