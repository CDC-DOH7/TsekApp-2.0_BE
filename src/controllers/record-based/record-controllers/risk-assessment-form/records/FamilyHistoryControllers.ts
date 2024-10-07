// controllers/FamilyHistoryController.ts
import { Request, Response } from "express";
import FamilyHistoryModel from "../../../../../models/record-specific/risk-assessment-form/FamilyHistoryModel";
import RecordsUniqueIDGenerator from "../../../../../common/cryptography/id_generators/record-specific/RecordsUniqueIDGenerator";
import {
  authenticateOfficer,
  authenticateSupervisor,
} from "../../../../../middleware/authMiddleware";
import FamilyHistoryParamsInterface from "../../../../../interfaces/misc/risk-assessment-form/FamilyHistoryParamsInterface";
import FamilyHistoryDeletionInterface from "../../../../../interfaces/deletion_params/risk-assessment-form/FamilyHistoryDeletionInterface";

// (Officer) Add/create a new FamilyHistory log
export const officerCreateFamilyHistory = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
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
      officer_id,
      hf_id, 
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid ID.");
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
      hf_id
    };

    try {
      const results = await FamilyHistoryModel.officerCreateFamilyHistory(newFamilyHistory);
      res.status(201).json({ message: "Family history added successfully", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Officer) Read/Search a Family History Record
export const officerSearchFamilyHistory = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  async(req: Request, res: Response) => {
    const { fh_id, patient_id, officer_id, hf_id } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    try {
      const results = await FamilyHistoryModel.officerSearchFamilyHistory({ fh_id, patient_id, hf_id });
      res.status(200).json({ message: "Found Results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Read/Search a Family History Record
export const supervisorSearchFamilyHistory = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  async(req: Request, res: Response) => {
    const { fh_id, patient_id, supervisor_id, hf_id } = req.body;

    // Ensure the supervisor_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid supervisor ID.");
    }

    try {
      const results = await FamilyHistoryModel.supervisorSearchFamilyHistory({ fh_id, patient_id, hf_id });
      res.status(200).json({ message: "Found Results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Read/Search a Family History Record
export const supervisorUpdateFamilyHistory = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  async(req: Request, res: Response) => {
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
      hf_id
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid supervisor ID.");
    }

    try {
      const results = await FamilyHistoryModel.supervisorUpdateFamilyHistory({
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
        hf_id
      });
      res.status(200).json({ message: "Updated definitions.", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
];

// (Supervisor) Delete a Family History Record
export const supervisorDeleteFamilyHistory = [
  authenticateSupervisor, // Use the middleware to authenticate the supervisor
  async(req: Request, res: Response) => {
    const { fh_id, patient_id, supervisor_id, hf_id} = req.body;

    const familyHistoryDeletion: FamilyHistoryDeletionInterface = {
      fh_id,
      patient_id,
      hf_id,
    };

    // Ensure the officer_id in the body matches the authenticated supervisor
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid supervisor ID.");
    }


    try {
      const results = await FamilyHistoryModel.supervisorDeleteFamilyHistory(familyHistoryDeletion);
      res.status(200).json({ message: "Deleted definitions.", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];
