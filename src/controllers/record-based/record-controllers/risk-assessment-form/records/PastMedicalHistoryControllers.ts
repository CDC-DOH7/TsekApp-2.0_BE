// controllers/consultationController.ts
import { Request, Response } from "express";
import PastMedicalHistoryModel from "../../../../../models/record-specific/risk-assessment-form/PastMedicalHistoryModel";
import RecordsUniqueIDGenerator from "../../../../../common/cryptography/id_generators/record-specific/RecordsUniqueIDGenerator";
import {
  authenticateOfficer,
  authenticateSupervisor,
} from "../../../../../middleware/authMiddleware";
import PastMedicalHistoryParamsInterface from "../../../../../interfaces/misc/risk-assessment-form/PastMedicalHistoryParamsInterface";
import PastMedicalHistoryDeletionInterface from "../../../../../interfaces/deletion_params/risk-assessment-form/PastMedicalHistoryDeletionInterface";

// (Officer) Add/create a new Past Medical History
export const officerCreatePastMedicalHistory = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const {
      patient_id,
      pmh_hypertension,
      pmh_heart_disease,
      pmh_diabetes,
      pmh_specify_diabetes,
      pmh_cancer,
      pmh_specify_cancer,
      pmh_copd,
      pmh_asthma,
      pmh_allergies,
      pmh_specify_allergy,
      pmh_disorders,
      pmh_specify_disorder,
      pmh_vision_problems,
      pmh_previous_surgical_history,
      pmh_specify_surgical_history,
      pmh_thyroid_disorder,
      pmh_kidney_disorder,
      officer_id,
      hf_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    const pmh_id = RecordsUniqueIDGenerator.generateCompactUniqueID(
      patient_id,
      hf_id,
      5
    );

    const newPastMedicalHistory: PastMedicalHistoryParamsInterface = {
      pmh_id,
      patient_id,
      pmh_hypertension,
      pmh_heart_disease,
      pmh_diabetes,
      pmh_specify_diabetes,
      pmh_cancer,
      pmh_specify_cancer,
      pmh_copd,
      pmh_asthma,
      pmh_allergies,
      pmh_specify_allergy,
      pmh_disorders,
      pmh_specify_disorder,
      pmh_vision_problems,
      pmh_previous_surgical_history,
      pmh_specify_surgical_history,
      pmh_thyroid_disorder,
      pmh_kidney_disorder,
      hf_id,
    };

    try {
      const results =
        await PastMedicalHistoryModel.officerCreatePastMedicalHistory(
          newPastMedicalHistory
        );
      res
        .status(201)
        .json({ message: "Past Medical History added successfully", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Officer) Read/Search a Past Medical History
export const officerSearchPastMedicalHistory = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const { pmh_id, patient_id, officer_id, hf_id } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    try {
      const results =
        await PastMedicalHistoryModel.officerSearchPastMedicalHistory({
          pmh_id,
          patient_id,
          hf_id,
        });
      res.status(200).json({ message: "Found Results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Read/Search a Past Medical History
export const supervisorSearchPastMedicalHistory = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const { pmh_id, patient_id, supervisor_id, hf_id } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    try {
      const results =
        await PastMedicalHistoryModel.supervisorSearchPastMedicalHistory({
          pmh_id,
          patient_id,
          hf_id,
        });
      res.status(200).json({ message: "Found Results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Read/Search a Past Medical History
export const supervisorUpdatePastMedicalHistory = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const {
      pmh_hypertension,
      pmh_heart_disease,
      pmh_diabetes,
      pmh_specify_diabetes,
      pmh_cancer,
      pmh_specify_cancer,
      pmh_copd,
      pmh_asthma,
      pmh_allergies,
      pmh_specify_allergy,
      pmh_disorders,
      pmh_specify_disorder,
      pmh_vision_problems,
      pmh_previous_surgical_history,
      pmh_specify_surgical_history,
      pmh_thyroid_disorder,
      pmh_kidney_disorder,
      pmh_id,
      patient_id,
      supervisor_id,
      hf_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    try {
      const results =
        await PastMedicalHistoryModel.supervisorUpdatePastMedicalHistory({
          pmh_hypertension,
          pmh_heart_disease,
          pmh_diabetes,
          pmh_specify_diabetes,
          pmh_cancer,
          pmh_specify_cancer,
          pmh_copd,
          pmh_asthma,
          pmh_allergies,
          pmh_specify_allergy,
          pmh_disorders,
          pmh_specify_disorder,
          pmh_vision_problems,
          pmh_previous_surgical_history,
          pmh_specify_surgical_history,
          pmh_thyroid_disorder,
          pmh_kidney_disorder,
          pmh_id,
          patient_id,
          hf_id,
        });
      res.status(200).json({ message: "Updated definitions.", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Delete a Past Medical History
export const supervisorDeletePastMedicalHistory = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const { pmh_id, patient_id, supervisor_id, hf_id } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    const pastMedicalHistoryDeletion: PastMedicalHistoryDeletionInterface = {
      pmh_id,
      patient_id,
      hf_id,
    };

    try {
      const results =
        await PastMedicalHistoryModel.supervisorDeletePastMedicalHistory(
          pastMedicalHistoryDeletion
        );
      res.status(200).json({ message: "Deleted definitions.", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];
