// controllers/consultationController.ts
import { Request, Response } from "express";
import ConsultationModel from "../../models/record-specific/ConsultationLogModel";
import RecordsUniqueIDGenerator from "../../common/cryptography/id_generators/record-specific/RecordsUniqueIDGenerator";
import {
  authenticateOfficer,
  authenticateSupervisor,
} from "../../middleware/authMiddleware";
import ConsultationParamsInterface from "../../interfaces/misc/ConsultationParamsInterface";

// (Officer) Add/create a new consultation log
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

// (Officer) Read/Search a consultation log
export const officerSearchConsultation = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
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
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    ConsultationModel.officerSearchConsultationLog(
      {
        cl_date_startDate,
        cl_date_endDate,
        hf_id,
        cl_id,
        patient_id,
        officer_id,
        ref_id,
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

// (Supervisor) Read/Search a consultation log
export const supervisorSearchConsultation = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
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
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    ConsultationModel.supervisorSearchConsultationLog(
      {
        cl_date_startDate,
        cl_date_endDate,
        hf_id,
        cl_id,
        patient_id,
        officer_id,
        ref_id,
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

// (Supervisor) Read/Search a consultation log
export const supervisorUpdateConsultation = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
    const {
      cl_description,
      cl_date,
      officer_id,
      ref_id,
      cl_id,
      patient_id,
      hf_id,
      supervisor_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    ConsultationModel.supervisorUpdateConsultationLog(
      {
        cl_description,
        cl_date,
        officer_id,
        ref_id,
        cl_id,
        patient_id,
        hf_id,
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

// (Supervisor) Delete a consultation log
export const supervisorDeleteConsultation = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
    const { cl_id, supervisor_id } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    ConsultationModel.supervisorUpdateConsultationLog(cl_id, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.status(201).json({ message: "Deleted definitions.", results });
    });
  },
];
