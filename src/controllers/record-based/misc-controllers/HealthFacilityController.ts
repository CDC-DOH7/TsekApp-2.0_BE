import { Request, Response } from "express";
import {
  officerRetrieveHealthFacilityInfo,
  retrieveHealthFacilityInfo,
  superadminRetrieveHealthFacilityInfo,
  supervisorRetrieveHealthFacilityInfo,
} from "../../../models/misc/HealthFacilityModel";
import {
  authenticateOfficer,
  authenticateSuperadmin,
  authenticateSupervisor,
} from "../../../middleware/authMiddleware";

export const retrieveHealthFacilityList = [
  async (req: Request, res: Response) => {
    try {
      const results = await retrieveHealthFacilityInfo();
      res
        .status(200)
        .json({ message: "All Health Facilities:", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

export const officerRetrieveHealthFacilityList = [
  authenticateOfficer,
  async (req: Request, res: Response) => {
    try {
      const results = await officerRetrieveHealthFacilityInfo();
      res
        .status(200)
        .json({ message: "All Health Facilities:", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

export const supervisorRetrieveHealthFacilityList = [
  authenticateSupervisor,
  async (req: Request, res: Response) => {
    try {
      const results = await supervisorRetrieveHealthFacilityInfo();
      res
        .status(200)
        .json({ message: "All Health Facilities:", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

export const superadminRetrieveHealthFacilityList = [
  authenticateSuperadmin,
  async (req: Request, res: Response) => {
    try {
      const results = await superadminRetrieveHealthFacilityInfo();
      res
        .status(200)
        .json({ message: "All Health Facilities:", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];
