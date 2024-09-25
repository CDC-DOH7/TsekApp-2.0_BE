// controllers/consultationController.ts
import { Request, Response } from "express";
import ReferralModel from "../../models/record-specific/ReferralModel";
import RecordsUniqueIDGenerator from "../../common/cryptography/id_generators/record-specific/RecordsUniqueIDGenerator";
import {
  authenticateOfficer,
  authenticateSupervisor,
} from "../../middleware/authMiddleware";
import ReferralParamsInterface from "../../interfaces/misc/ReferralParamsInterface";

// (Officer) Add/create a new Referral
export const officerCreateReferral = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
    const {
      patient_id,
      officer_id,
      hf_id,
      ref_date,
      ref_reason,
      ref_destination,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    const ref_id = RecordsUniqueIDGenerator.generateCompactUniqueID(
      patient_id,
      hf_id,
      6
    );

    const newReferral: ReferralParamsInterface = {
      ref_id,
      patient_id,
      officer_id,
      hf_id,
      ref_date,
      ref_reason,
      ref_destination,
    };

    ReferralModel.officerCreateReferral(newReferral, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).json({ message: "Referral added successfully", results });
    });
  },
];

// (Officer) Read/Search a Referral
export const officerSearchReferral = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
    const {
      ref_date_startdate,
      ref_date_enddate,
      ref_id,
      patient_id,
      officer_id,
      hf_id,
      ref_reason,
      ref_destination,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    ReferralModel.officerSearchReferral(
      {
        ref_date_startdate,
        ref_date_enddate,
        ref_id,
        patient_id,
        officer_id,
        hf_id,
        ref_reason,
        ref_destination,
      },
      (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }

        res.status(201).json({ message: "Found Results!", results });
      }
    );
  },
];

// (Supervisor) Read/Search a Referral
export const supervisorSearchReferral = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
    const {
      ref_date_startdate,
      ref_date_enddate,
      ref_id,
      patient_id,
      officer_id,
      hf_id,
      ref_reason,
      ref_destination,
      supervisor_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    ReferralModel.supervisorSearchReferral(
      {
        ref_date_startdate,
        ref_date_enddate,
        ref_id,
        patient_id,
        officer_id,
        hf_id,
        ref_reason,
        ref_destination,
      },
      (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }

        res.status(201).json({ message: "Found Results!", results });
      }
    );
  },
];

// (Supervisor) Read/Search a Referral
export const supervisorUpdateReferral = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
    const {
      hf_id,
      patient_id,
      officer_id,
      ref_date,
      ref_reason,
      ref_destination,
      ref_id,
      supervisor_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    ReferralModel.supervisorUpdateReferral(
      {
        hf_id,
        patient_id,
        officer_id,
        ref_date,
        ref_reason,
        ref_destination,
        ref_id,
      },
      (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }

        res.status(201).json({ message: "Updated definitions.", results });
      }
    );
  },
];

// (Supervisor) Delete a Referral
export const supervisorDeleteReferral = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
    const { ref_id, supervisor_id } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    ReferralModel.supervisorUpdateReferral(ref_id, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.status(201).json({ message: "Deleted definitions.", results });
    });
  },
];
