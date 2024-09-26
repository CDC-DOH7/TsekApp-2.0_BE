// controllers/consultationController.ts
import { Request, Response } from "express";
import PastMedicalHistoryModel from "../../../models/record-specific/PastMedicalHistoryModel";
import RecordsUniqueIDGenerator from "../../../common/cryptography/id_generators/record-specific/RecordsUniqueIDGenerator";
import {
  authenticateOfficer,
  authenticateSupervisor,
} from "../../../middleware/authMiddleware";
import PastMedicalHistoryParamsInterface from "../../../interfaces/misc/PastMedicalHistoryParamsInterface";

// (Officer) Add/create a new Past Medical History
export const officerCreatePastMedicalHistory = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
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
      return res.status(403).send("Access denied. Invalid officer ID.");
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
    };

    PastMedicalHistoryModel.officerCreatePastMedicalHistory(
      newPastMedicalHistory,
      (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }
        res
          .status(201)
          .json({ message: "Past Medical History added successfully", results });
      }
    );
  },
];

// (Officer) Read/Search a Past Medical History
export const officerSearchPastMedicalHistory = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
    const {
      pmh_id,
      patient_id,
      officer_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    PastMedicalHistoryModel.officerSearchPastMedicalHistory(
      {
        pmh_id,
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

// (Supervisor) Read/Search a Past Medical History
export const supervisorSearchPastMedicalHistory = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
    const {
      pmh_id,
      patient_id,
      supervisor_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    PastMedicalHistoryModel.supervisorSearchPastMedicalHistory(
      {
        pmh_id,
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

// (Supervisor) Read/Search a Past Medical History
export const supervisorUpdatePastMedicalHistory = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
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
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    PastMedicalHistoryModel.supervisorUpdatePastMedicalHistory(
      {
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

// (Supervisor) Delete a Past Medical History
export const supervisorDeletePastMedicalHistory = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
    const { pmh_id, supervisor_id } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    PastMedicalHistoryModel.supervisorUpdatePastMedicalHistory(
      pmh_id,
      (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }

        res.status(201).json({ message: "Deleted definitions.", results });
      }
    );
  },
];
