// controllers/ManagementController.ts
import { Request, Response } from "express";
import ManagementModel from "../../../models/record-specific/ManagementModel";
import RecordsUniqueIDGenerator from "../../../common/cryptography/id_generators/record-specific/RecordsUniqueIDGenerator";
import {
  authenticateOfficer,
  authenticateSupervisor,
} from "../../../middleware/authMiddleware";
import ManagementParamsInterface from "../../../interfaces/misc/ManagementParamsInterface";
import ManagementDeletionInterface from "../../../interfaces/deletion_params/ManagementDeletionInterface";

// (Officer) Add/create a new Management
export const officerCreateManagement = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const {
      patient_id,
      mngm_lifestyle_mod,
      mngm_med_antihypertensive,
      mngm_med_antidiabetes,
      mngm_date_followup,
      mngm_remarks,
      officer_id,
      hf_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    const mngm_id = RecordsUniqueIDGenerator.generateCompactUniqueID(
      patient_id,
      hf_id,
      3
    );

    const newManagement: ManagementParamsInterface = {
      mngm_id,
      patient_id,
      mngm_lifestyle_mod,
      mngm_med_antihypertensive,
      mngm_med_antidiabetes,
      mngm_date_followup,
      mngm_remarks,
      hf_id,
    };

    try {
      const results = await ManagementModel.officerCreateManagement(
        newManagement
      );
      res
        .status(201)
        .json({ message: "Management added successfully.", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Officer) Read/Search a Management
export const officerSearchManagement = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const {
      mngm_date_followup_startdate,
      mngm_date_followup_enddate,
      mngm_id,
      patient_id,
      officer_id,
      hf_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    try {
      const results = await ManagementModel.officerSearchManagement({
        mngm_id,
        patient_id,
        mngm_date_followup_startdate,
        mngm_date_followup_enddate,
        hf_id,
      });
      res.status(201).json({ message: "Found results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Read/Search a Management
export const supervisorSearchManagement = [
  authenticateSupervisor, // Use the middleware to authenticate the supervisor
  async (req: Request, res: Response) => {
    const {
      mngm_id,
      patient_id,
      mngm_date_followup_startdate,
      mngm_date_followup_enddate,
      supervisor_id,
      hf_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    try {
      const results = await ManagementModel.supervisorSearchManagement({
        mngm_id,
        patient_id,
        mngm_date_followup_startdate,
        mngm_date_followup_enddate,
        hf_id,
      });
      res.status(200).json({ message: "Found Results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Read/Search a Management
export const supervisorUpdateManagement = [
  authenticateSupervisor, // Use the middleware to authenticate the supervisor
  async (req: Request, res: Response) => {
    const {
      mngm_lifestyle_mod,
      mngm_med_antihypertensive,
      mngm_med_antidiabetes,
      mngm_date_followup,
      mngm_remarks,
      mngm_id,
      patient_id,
      supervisor_id,
      hf_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid supervisor ID.");
    }

    try {
      const results = await ManagementModel.supervisorUpdateManagement({
        mngm_lifestyle_mod,
        mngm_med_antihypertensive,
        mngm_med_antidiabetes,
        mngm_date_followup,
        mngm_remarks,
        mngm_id,
        patient_id,
        hf_id,
      });
      res.status(200).json({ message: "Updated definitions.", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Delete a Management
export const supervisorDeleteManagement = [
  authenticateSupervisor, // Use the middleware to authenticate the supervisor
  async (req: Request, res: Response) => {
    const { mngm_id, patient_id, supervisor_id, hf_id } = req.body;

    const managementDeletion: ManagementDeletionInterface = {
      mngm_id,
      patient_id,
      hf_id,
    };

    // Ensure the officer_id in the body matches the authenticated supervisor
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid supervisor ID.");
    }

    try {
      const results = await ManagementModel.supervisorDeleteManagement(
        managementDeletion
      );
      res.status(200).json({ message: "Deleted definitions.", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];
