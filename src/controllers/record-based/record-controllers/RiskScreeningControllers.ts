// controllers/RiskScreeningController.ts
import { Request, Response } from "express";
import RiskScreeningModel from "../../../models/record-specific/RiskScreeningModel";
import RecordsUniqueIDGenerator from "../../../common/cryptography/id_generators/record-specific/RecordsUniqueIDGenerator";
import {
  authenticateOfficer,
  authenticateSupervisor,
} from "../../../middleware/authMiddleware";
import RiskScreeningParamsInterface from "../../../interfaces/misc/RiskScreeningParamsInterface";

// (Officer) Add/create a new RiskScreening log
export const officerCreateRiskScreening = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  async(req: Request, res: Response) => {
    const {
      patient_id,
      rs_blood_sugar_fbs,
      rs_blood_sugar_rbs,
      rs_blood_sugar_date_taken,
      rs_blood_sugar_symptoms,
      rs_lipid_cholesterol,
      rs_lipid_hdl,
      rs_lipid_ldl,
      rs_lipid_vldl,
      rs_lipid_triglyceride,
      rs_lipid_date_taken,
      rs_urine_protein,
      rs_urine_protein_date_taken,
      rs_urine_ketones,
      rs_urine_ketones_date_taken,
      rs_respiratory,
      officer_id,
      hf_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    const rs_id = RecordsUniqueIDGenerator.generateCompactUniqueID(
      patient_id,
      hf_id,
      7
    );

    try {
      const results = await RiskScreeningModel.officerCreateRiskScreening({
        rs_id,
        patient_id,
        rs_blood_sugar_fbs,
        rs_blood_sugar_rbs,
        rs_blood_sugar_date_taken,
        rs_blood_sugar_symptoms,
        rs_lipid_cholesterol,
        rs_lipid_hdl,
        rs_lipid_ldl,
        rs_lipid_vldl,
        rs_lipid_triglyceride,
        rs_lipid_date_taken,
        rs_urine_protein,
        rs_urine_protein_date_taken,
        rs_urine_ketones,
        rs_urine_ketones_date_taken,
        rs_respiratory,
      });
      res.status(201).json({ message: "Risk screening added successfully", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Officer) Read/Search a RiskScreening log
export const officerSearchRiskScreening = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  async(req: Request, res: Response) => {
    const { rs_id, patient_id, officer_id } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    try {
      const results = await RiskScreeningModel.officerSearchRiskScreening({
        rs_id,
        patient_id,
    });
      res.status(200).json({ message: "Found Results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Read/Search a RiskScreening log
export const supervisorSearchRiskScreening = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  async(req: Request, res: Response) => {
    const { rs_id, patient_id, supervisor_id } = req.body;

    // Ensure the supervisor_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    try {
      const results = await RiskScreeningModel.supervisorSearchRiskScreening({
        rs_id,
        patient_id,
    });
      res.status(200).json({ message: "Found Results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Read/Search a RiskScreening log
export const supervisorUpdateRiskScreening = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  async(req: Request, res: Response) => {
    const {
      rs_blood_sugar_fbs,
      rs_blood_sugar_rbs,
      rs_blood_sugar_date_taken,
      rs_blood_sugar_symptoms,
      rs_lipid_cholesterol,
      rs_lipid_hdl,
      rs_lipid_ldl,
      rs_lipid_vldl,
      rs_lipid_triglyceride,
      rs_lipid_date_taken,
      rs_urine_protein,
      rs_urine_protein_date_taken,
      rs_urine_ketones,
      rs_urine_ketones_date_taken,
      rs_respiratory,
      rs_id,
      patient_id,
      supervisor_id,
    } = req.body;

    // Ensure the supervisor_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    try {
      const results = await RiskScreeningModel.supervisorUpdateRiskScreening({
        rs_blood_sugar_fbs,
        rs_blood_sugar_rbs,
        rs_blood_sugar_date_taken,
        rs_blood_sugar_symptoms,
        rs_lipid_cholesterol,
        rs_lipid_hdl,
        rs_lipid_ldl,
        rs_lipid_vldl,
        rs_lipid_triglyceride,
        rs_lipid_date_taken,
        rs_urine_protein,
        rs_urine_protein_date_taken,
        rs_urine_ketones,
        rs_urine_ketones_date_taken,
        rs_respiratory,
        rs_id,
        patient_id,
      });
      res.status(200).json({ message: "Updated definitions.", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Delete a RiskScreening log
export const supervisorDeleteRiskScreening = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  async(req: Request, res: Response) => {
    const { rs_id, supervisor_id } = req.body;

    // Ensure the supervisor_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    try {
      const results = await RiskScreeningModel.supervisorUpdateRiskScreening(rs_id);
      res.status(200).json({ message: "Deleted definitions.", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];
