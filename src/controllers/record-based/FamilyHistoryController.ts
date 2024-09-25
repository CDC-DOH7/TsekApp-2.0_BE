// controllers/FamilyHistoryController.ts
import { Request, Response } from "express";
import FamilyHistoryModel from "../../models/record-specific/FamilyHistoryModel";
import RecordsUniqueIDGenerator from "../../common/cryptography/id_generators/record-specific/RecordsUniqueIDGenerator";
import {
  authenticateOfficer,
  authenticateSupervisor,
} from "../../middleware/authMiddleware";
import FamilyHistoryParamsInterface from "../../interfaces/misc/FamilyHistoryParamsInterface";

// (Officer) Add/create a new FamilyHistory log
export const officerCreateFamilyHistory = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
    const {
      patient_id,
      fh_hypertension,
      fh_stroke,
      fh_heart_disease,
      fh_diabetes_mellitus,
      fh_asthma,
      fh_cancer,
      fh_kidney_disease,
      fh_vascular_disease,
      fh_tb,
      fh_disorders,
      fh_copd,
      hf_id,
      officer_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    const fh_id = RecordsUniqueIDGenerator.generateCompactUniqueID(
      patient_id,
      hf_id,
      2
    );

    const newFamilyHistory: FamilyHistoryParamsInterface = {
      fh_id,
      patient_id,
      fh_hypertension,
      fh_stroke,
      fh_heart_disease,
      fh_diabetes_mellitus,
      fh_asthma,
      fh_cancer,
      fh_kidney_disease,
      fh_vascular_disease,
      fh_tb,
      fh_disorders,
      fh_copd,
    };

    FamilyHistoryModel.officerCreateFamilyHistory(
      newFamilyHistory,
      (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }
        res
          .status(201)
          .json({ message: "Family History added successfully", results });
      }
    );
  },
];

// (Officer) Read/Search a Family History Record
export const officerSearchFamilyHistory = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
    const { fh_id, patient_id, officer_id } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    FamilyHistoryModel.officerSearchFamilyHistory(
      {
        fh_id,
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

// (Supervisor) Read/Search a Family History Record
export const supervisorSearchFamilyHistory = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
    const { fh_id, patient_id, supervisor_id } = req.body;

    // Ensure the supervisor_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid supervisor ID.");
    }

    FamilyHistoryModel.supervisorSearchFamilyHistory(
      {
        fh_id,
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

// (Supervisor) Read/Search a Family History Record
export const supervisorUpdateFamilyHistory = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
    const {
      fh_id,
      patient_id,
      fh_hypertension,
      fh_stroke,
      fh_heart_disease,
      fh_diabetes_mellitus,
      fh_asthma,
      fh_cancer,
      fh_kidney_disease,
      fh_vascular_disease,
      fh_tb,
      fh_disorders,
      fh_copd,
      supervisor_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid supervisor ID.");
    }

    FamilyHistoryModel.supervisorUpdateFamilyHistory(
      {
        fh_id,
        patient_id,
        fh_hypertension,
        fh_stroke,
        fh_heart_disease,
        fh_diabetes_mellitus,
        fh_asthma,
        fh_cancer,
        fh_kidney_disease,
        fh_vascular_disease,
        fh_tb,
        fh_disorders,
        fh_copd,
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

// (Supervisor) Delete a Family History Record
export const supervisorDeleteFamilyHistory = [
  authenticateSupervisor, // Use the middleware to authenticate the supervisor
  (req: Request, res: Response) => {
    const { fh_id, supervisor_id } = req.body;

    // Ensure the officer_id in the body matches the authenticated supervisor
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid supervisor ID.");
    }

    FamilyHistoryModel.supervisorDeleteFamilyHistory(
      fh_id,
      (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }

        res.status(201).json({ message: "Deleted definitions.", results });
      }
    );
  },
];
