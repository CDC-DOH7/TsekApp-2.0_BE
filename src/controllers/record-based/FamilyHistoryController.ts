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

    const newFamilyHistory: FamilyHistoryParamsInterface = {
      cl_id,
      cl_description,
      cl_date,
      patient_id,
      officer_id,
      hf_id,
      ref_id,
    };

    FamilyHistoryModel.officerCreateFamilyHistory(
      newFamilyHistory,
      (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }
        res
          .status(201)
          .json({ message: "FamilyHistory added successfully", results });
      }
    );
  },
];

// (Officer) Read/Search a FamilyHistory log
export const officerSearchFamilyHistory = [
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

    FamilyHistoryModel.officerSearchFamilyHistoryLog(
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

// (Supervisor) Read/Search a FamilyHistory log
export const supervisorSearchFamilyHistory = [
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

    FamilyHistoryModel.supervisorSearchFamilyHistoryLog(
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

// (Supervisor) Read/Search a FamilyHistory log
export const supervisorUpdateFamilyHistory = [
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

    FamilyHistoryModel.supervisorUpdateFamilyHistoryLog(
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

// (Supervisor) Delete a FamilyHistory log
export const supervisorDeleteFamilyHistory = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
    const { cl_id, supervisor_id } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    FamilyHistoryModel.supervisorUpdateFamilyHistoryLog(cl_id, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.status(201).json({ message: "Deleted definitions.", results });
    });
  },
];
