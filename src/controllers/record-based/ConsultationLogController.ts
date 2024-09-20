// controllers/consultationController.ts
import { Request, Response } from "express";
import ConsultationModel from "../../models/record-specific/ConsultationLogModel";
import RecordsUniqueIDGenerator from "../../common/cryptography/id_generators/record-specific/RecordsUniqueIDGenerator";
import {
  authenticateOfficer,
  authMiddleware,
} from "../../middleware/authMiddleware";
import ConsultationParamsInterface from "../../interfaces/misc/ConsultationParamsInterface";

// Add/create a new consultation
export const officerCreateConsultation = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
    const { cl_description, cl_date, patient_id, officer_id, hf_id, ref_id } =
      req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    const cl_id = RecordsUniqueIDGenerator.generateCompactUniqueID(
      patient_id,
      hf_id
    );

    const newConsultation: ConsultationParamsInterface = {
      cl_id,
      cl_description,
      cl_date,
      patient_id,
      officer_id,
      hf_id,
      ref_id,
    };

    ConsultationModel.officerCreateConsultationLog(
      newConsultation,
      (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }
        res
          .status(201)
          .json({ message: "Consultation added successfully", results });
      }
    );
  },
];

// Read/Search a consultation
export const officerSearchConsultation = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
    const { cl_description, cl_date, patient_id, officer_id, hf_id, ref_id } =
      req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    const cl_id = RecordsUniqueIDGenerator.generateCompactUniqueID(
      patient_id,
      hf_id
    );

    const newConsultation: ConsultationParamsInterface = {
      cl_id,
      cl_description,
      cl_date,
      patient_id,
      officer_id,
      hf_id,
      ref_id,
    };

    ConsultationModel.officerCreateConsultationLog(
      newConsultation,
      (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }
        res
          .status(201)
          .json({ message: "Consultation added successfully", results });
      }
    );
  },
];
