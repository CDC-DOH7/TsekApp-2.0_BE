// controllers/NcdRiskFactorsController.ts
import { Request, Response } from "express";
import NcdRiskFactorsModel from "../../../../../models/record-specific/risk-assessment-form/NcdRiskFactorsModel";
import RecordsUniqueIDGenerator from "../../../../../common/cryptography/id_generators/record-specific/RecordsUniqueIDGenerator";
import {
  authenticateOfficer,
  authenticateSupervisor,
} from "../../../../../middleware/authMiddleware";
import NcdRiskFactorsParamsInterface from "../../../../../interfaces/misc/risk-assessment-form/NcdRiskFactorsParamsInterface";
import NcdRiskFactorsDeletionInterface from "../../../../../interfaces/deletion_params/risk-assessment-form/NcdRiskFactorsDeletionInterface";

// (Officer) Add/create a new NcdRiskFactors
export const officerCreateNcdRiskFactors = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const {
      patient_id,
      rf_tobacco_use,
      rf_alcohol_intake,
      rf_binge_drinker,
      rf_physical_activity,
      rf_nad_assessment,
      rf_kg_weight,
      rf_cm_height,
      rf_bmi,
      rf_waist_circumference,
      rf_bp,
      officer_id,
      hf_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    const rf_id = RecordsUniqueIDGenerator.generateCompactUniqueID(
      patient_id,
      hf_id,
      4
    );

    const newNcdRiskFactors: NcdRiskFactorsParamsInterface = {
      rf_id,
      patient_id,
      rf_tobacco_use,
      rf_alcohol_intake,
      rf_binge_drinker,
      rf_physical_activity,
      rf_nad_assessment,
      rf_kg_weight,
      rf_cm_height,
      rf_bmi,
      rf_waist_circumference,
      rf_bp,
      hf_id,
    };

    try {
      const results = await NcdRiskFactorsModel.officerCreateNcdRiskFactors(
        newNcdRiskFactors
      );
      res
        .status(201)
        .json({ message: "NcdRiskFactors added successfully", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Officer) Read/Search a NcdRiskFactors log
export const officerSearchNcdRiskFactors = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const { rf_id, patient_id, officer_id, hf_id } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    try {
      const results = await NcdRiskFactorsModel.officerSearchNcdRiskFactors({
        rf_id,
        patient_id,
        hf_id
      });
      res.status(200).json({ message: "Found Results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Read/Search a NcdRiskFactors log
export const supervisorSearchNcdRiskFactors = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const { rf_id, patient_id, supervisor_id, hf_id } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    try {
      const results = await NcdRiskFactorsModel.supervisorSearchNcdRiskFactors({
        rf_id,
        patient_id,
        hf_id
      });
      res.status(200).json({ message: "Found Results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Read/Search a NcdRiskFactors log
export const supervisorUpdateNcdRiskFactors = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const {
      rf_tobacco_use,
      rf_alcohol_intake,
      rf_binge_drinker,
      rf_physical_activity,
      rf_nad_assessment,
      rf_kg_weight,
      rf_cm_height,
      rf_bmi,
      rf_waist_circumference,
      rf_bp,
      rf_id,
      patient_id,
      supervisor_id,
      hf_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    try {
      const results = await NcdRiskFactorsModel.supervisorUpdateNcdRiskFactors({
        rf_tobacco_use,
        rf_alcohol_intake,
        rf_binge_drinker,
        rf_physical_activity,
        rf_nad_assessment,
        rf_kg_weight,
        rf_cm_height,
        rf_bmi,
        rf_waist_circumference,
        rf_bp,
        rf_id,
        patient_id,
        hf_id,
      });
      res.status(200).json({ message: "Updated definitions.", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Delete a NcdRiskFactors log
export const supervisorDeleteNcdRiskFactors = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const { rf_id, patient_id, supervisor_id, hf_id } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    const ncdRiskFactorsDeletion: NcdRiskFactorsDeletionInterface = {
      rf_id,
      patient_id,
      hf_id,
    };

    try {
      const results = await NcdRiskFactorsModel.supervisorDeleteNcdRiskFactors(
        ncdRiskFactorsDeletion
      );
      res.status(200).json({ message: "Deleted definitions.", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];
