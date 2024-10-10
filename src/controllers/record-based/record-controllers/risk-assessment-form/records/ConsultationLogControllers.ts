// controllers/consultationController.ts
import { Request, Response } from "express";
import ConsultationModel from "../../../../../models/record-specific/risk-assessment-form/ConsultationLogModel";
import RecordsUniqueIDGenerator from "../../../../../common/cryptography/id_generators/record-specific/RecordsUniqueIDGenerator";
import {
  authenticateOfficer,
  authenticateSupervisor,
} from "../../../../../middleware/authMiddleware";
import ConsultationParamsInterface from "../../../../../interfaces/misc/risk-assessment-form/ConsultationLogParamsInterface";
import ConsultationLogDeletionInterface from "../../../../../interfaces/deletion_params/risk-assessment-form/ConsultationLogDeletionInterface";

// (Officer) Add/create a new consultation log
export const officerCreateConsultation = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const { cl_description, cl_date, patient_id, officer_id, hf_id, ref_id } =
      req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    const cl_id = RecordsUniqueIDGenerator.generateCompactUniqueID(
      patient_id,
      hf_id,
      1
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

    try {
      const results = await ConsultationModel.officerCreateConsultationLog(
        newConsultation
      );
      res.status(201).json({
        message: "Consultation added successfully",
        results,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Officer) Read/Search a consultation log
export const officerSearchConsultation = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const {
      cl_date_startDate,
      cl_date_endDate,
      hf_id,
      cl_id,
      patient_id,
      officer_id,
      ref_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    try {
      const results = await ConsultationModel.officerSearchConsultationLog({
        cl_date_startDate,
        cl_date_endDate,
        hf_id,
        cl_id,
        patient_id,
        officer_id,
        ref_id,
      });
      res.status(200).json({ message: "Found Results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Read/Search a consultation log
export const supervisorSearchConsultation = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const {
      cl_date_startDate,
      cl_date_endDate,
      hf_id,
      cl_id,
      patient_id,
      supervisor_id,
      officer_id,
      ref_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    try {
      const results = await ConsultationModel.supervisorSearchConsultationLog({
        cl_date_startDate,
        cl_date_endDate,
        hf_id,
        cl_id,
        patient_id,
        officer_id,
        ref_id,
      });
      res.status(200).json({ message: "Found Results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Read/Search a consultation log
export const supervisorUpdateConsultation = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const {
      cl_description,
      cl_date,
      officer_id,
      ref_id,
      cl_id,
      patient_id,
      supervisor_id,
      hf_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    try {
      const results = await ConsultationModel.supervisorUpdateConsultationLog({
        cl_description,
        cl_date,
        officer_id,
        ref_id,
        cl_id,
        patient_id,
        hf_id,
      });
      res.status(200).json({ message: "Updated definitions.", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Delete a consultation log
export const supervisorDeleteConsultation = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const { cl_id, patient_id, supervisor_id, hf_id } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    const consultationLogDeletion: ConsultationLogDeletionInterface = {
      cl_id,
      patient_id,
      hf_id,
    };

    try {
      const results = await ConsultationModel.supervisorDeleteConsultationLog(
        consultationLogDeletion
      );
      res.status(200).json({ message: "Deleted definitions.", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];
