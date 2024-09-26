// controllers/NcdRiskFactorsController.ts
import { Request, Response } from "express";
import NcdRiskFactorsModel from "../../../models/record-specific/NcdRiskFactorsModel";
import RecordsUniqueIDGenerator from "../../../common/cryptography/id_generators/record-specific/RecordsUniqueIDGenerator";
import {
  authenticateOfficer,
  authenticateSupervisor,
} from "../../../middleware/authMiddleware";
import NcdRiskFactorsParamsInterface from "../../../interfaces/misc/NcdRiskFactorsParamsInterface";

// (Officer) Add/create a new NcdRiskFactors
export const officerCreateNcdRiskFactors = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
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
      return res.status(403).send("Access denied. Invalid officer ID.");
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
    };

    NcdRiskFactorsModel.officerCreateNcdRiskFactors(
      newNcdRiskFactors,
      (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }
        res
          .status(201)
          .json({ message: "NcdRiskFactors added successfully", results });
      }
    );
  },
];

// (Officer) Read/Search a NcdRiskFactors log
export const officerSearchNcdRiskFactors = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
    const { rf_id, patient_id, officer_id } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    NcdRiskFactorsModel.officerSearchNcdRiskFactors(
      {
        patient_id,
        rf_id,
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

// (Supervisor) Read/Search a NcdRiskFactors log
export const supervisorSearchNcdRiskFactors = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
    const { rf_id, patient_id, supervisor_id } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    NcdRiskFactorsModel.supervisorSearchNcdRiskFactors(
      {
        rf_id,
        patient_id,
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

// (Supervisor) Read/Search a NcdRiskFactors log
export const supervisorUpdateNcdRiskFactors = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
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
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    NcdRiskFactorsModel.supervisorUpdateNcdRiskFactors(
      {
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

// (Supervisor) Delete a NcdRiskFactors log
export const supervisorDeleteNcdRiskFactors = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
    const { rf_id, supervisor_id } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    NcdRiskFactorsModel.supervisorUpdateNcdRiskFactors(
      rf_id,
      (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }

        res.status(201).json({ message: "Deleted definitions.", results });
      }
    );
  },
];
