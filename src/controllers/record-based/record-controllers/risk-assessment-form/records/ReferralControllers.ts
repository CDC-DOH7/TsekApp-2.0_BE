// controllers/consultationController.ts
import { Request, Response } from "express";
import ReferralModel from "../../../../../models/record-specific/risk-assessment-form/ReferralModel";
import RecordsUniqueIDGenerator from "../../../../../common/cryptography/id_generators/record-specific/RecordsUniqueIDGenerator";
import {
  authenticateOfficer,
  authenticateSupervisor,
} from "../../../../../middleware/authMiddleware";
import ReferralParamsInterface from "../../../../../interfaces/misc/risk-assessment-form/ReferralParamsInterface";
import ReferralDeletionInterface from "../../../../../interfaces/deletion_params/risk-assessment-form/ReferralDeletionInterface";

// (Officer) Add/create a new Referral
export const officerCreateReferral = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const {
      patient_id,
      officer_id,
      physician_name,
      ref_date,
      ref_reason,
      ref_destination,
      hf_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    const ref_id = RecordsUniqueIDGenerator.generateCompactUniqueID(
      patient_id,
      hf_id,
      6
    );

    try {
      const results = await ReferralModel.officerCreateReferral({
        ref_id,
        patient_id,
        officer_id,
        physician_name,
        hf_id,
        ref_date,
        ref_reason,
        ref_destination,
      });
      res.status(201).json({ message: "Referral added successfully", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Officer) Read/Search a Referral
export const officerSearchReferral = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const {
      ref_date_startdate,
      ref_date_enddate,
      ref_id,
      patient_id,
      officer_id,
      physician_name,
      ref_reason,
      ref_destination,
      hf_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    try {
      const results = await ReferralModel.officerSearchReferral({
        ref_date_startdate,
        ref_date_enddate,
        ref_id,
        patient_id,
        officer_id,
        physician_name,
        hf_id,
        ref_reason,
        ref_destination,
      });
      res.status(200).json({ message: "Found Results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Read/Search a Referral
export const supervisorSearchReferral = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const {
      ref_date_startdate,
      ref_date_enddate,
      ref_id,
      patient_id,
      officer_id,
      physician_name,
      ref_reason,
      ref_destination,
      supervisor_id,
      hf_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    try {
      const results = await ReferralModel.supervisorSearchReferral({
        ref_date_startdate,
        ref_date_enddate,
        ref_id,
        patient_id,
        officer_id,
        physician_name,
        hf_id,
        ref_reason,
        ref_destination,
      });
      res.status(200).json({ message: "Found Results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Read/Search a Referral
export const supervisorUpdateReferral = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const {
      patient_id,
      officer_id,
      ref_date,
      ref_reason,
      physician_name,
      ref_destination,
      ref_id,
      supervisor_id,
      hf_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    try {
      const results = await ReferralModel.supervisorUpdateReferral({
        hf_id,
        patient_id,
        officer_id,
        physician_name,
        ref_date,
        ref_reason,
        ref_destination,
        ref_id,
      });
      res.status(200).json({ message: "Updated definitions.", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Delete a Referral
export const supervisorDeleteReferral = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const { ref_id, patient_id, supervisor_id, hf_id } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    const refDeletion: ReferralDeletionInterface = {
      ref_id,
      patient_id,
      hf_id,
    };

    try {
      const results = await ReferralModel.supervisorDeleteReferral(refDeletion);
      res.status(200).json({ message: "Deleted definitions.", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];
