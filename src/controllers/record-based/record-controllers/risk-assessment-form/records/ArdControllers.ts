// controllers/ArdController.ts
import { Request, Response } from "express";
import ArdModel from "../../../../../models/record-specific/risk-assessment-form/ArdModel";
import RecordsUniqueIDGenerator from "../../../../../common/cryptography/id_generators/record-specific/RecordsUniqueIDGenerator";
import { authenticateOfficer } from "../../../../../middleware/authMiddleware";
import { authenticateSupervisor } from "../../../../../middleware/authMiddleware";
import ArdDeletionInterface from "../../../../../interfaces/deletion_params/risk-assessment-form/ArdDeletionInterface";

// (Officer) Add/create a new Ard log
export const officerCreateArd = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const {
      patient_id,
      ard_chest_pain,
      ard_difficulty_breathing,
      ard_loss_consciousness,
      ard_slurred_speech,
      ard_facial_asymmetry,
      ard_numb_arm,
      ard_disoriented,
      ard_chest_retractions,
      ard_seizure_or_convulsion,
      ard_selfharm_or_suicide,
      ard_aggressive_behavior,
      ard_eye_injury,
      ard_severe_injuries,
      officer_id,
      hf_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    const ard_id = RecordsUniqueIDGenerator.generateCompactUniqueID(
      patient_id,
      hf_id,
      0
    );

    try {
      const results = await ArdModel.officerCreateArd({
        ard_id,
        patient_id,
        ard_chest_pain,
        ard_difficulty_breathing,
        ard_loss_consciousness,
        ard_slurred_speech,
        ard_facial_asymmetry,
        ard_numb_arm,
        ard_disoriented,
        ard_chest_retractions,
        ard_seizure_or_convulsion,
        ard_selfharm_or_suicide,
        ard_aggressive_behavior,
        ard_eye_injury,
        ard_severe_injuries,
        hf_id,
      });

      res.status(201).json({ message: "Ard added successfully", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Officer) Read/Search a Ard log
export const officerSearchArd = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const { hf_id, ard_id, patient_id, officer_id } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    try {
      const results = await ArdModel.officerSearchArd({
        hf_id,
        ard_id,
        patient_id,
      });
      res.status(200).json({ message: "Found Results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Read/Search a Ard log
export const supervisorSearchArd = [
  authenticateSupervisor, // Use the middleware to authenticate the supervisor
  async (req: Request, res: Response) => {
    const { hf_id, ard_id, patient_id, supervisor_id } = req.body;

    // Ensure the supervisor_id in the body matches the authenticated supervisor
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid supervisor ID.");
    }

    try {
      const results = await ArdModel.supervisorSearchArd({
        hf_id,
        ard_id,
        patient_id,
      });
      res.status(200).json({ message: "Found Results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Update a Ard log
export const supervisorUpdateArd = [
  authenticateSupervisor, // Use the middleware to authenticate the supervisor
  async (req: Request, res: Response) => {
    const {
      ard_chest_pain,
      ard_difficulty_breathing,
      ard_loss_consciousness,
      ard_slurred_speech,
      ard_facial_asymmetry,
      ard_numb_arm,
      ard_disoriented,
      ard_chest_retractions,
      ard_seizure_or_convulsion,
      ard_selfharm_or_suicide,
      ard_aggressive_behavior,
      ard_eye_injury,
      ard_severe_injuries,
      ard_id,
      patient_id,
      supervisor_id,
      hf_id,
    } = req.body;

    // Ensure the supervisor_id in the body matches the authenticated supervisor
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid supervisor ID.");
    }

    try {
      const results = await ArdModel.supervisorUpdateArd({
        ard_chest_pain,
        ard_difficulty_breathing,
        ard_loss_consciousness,
        ard_slurred_speech,
        ard_facial_asymmetry,
        ard_numb_arm,
        ard_disoriented,
        ard_chest_retractions,
        ard_seizure_or_convulsion,
        ard_selfharm_or_suicide,
        ard_aggressive_behavior,
        ard_eye_injury,
        ard_severe_injuries,
        ard_id,
        patient_id,
        hf_id,
      });
      res.status(200).json({ message: "Updated definitions.", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Delete an Ard log
export const supervisorDeleteArd = [
  authenticateSupervisor, // Use the middleware to authenticate the supervisor
  async (req: Request, res: Response) => {
    const { ard_id, patient_id, supervisor_id, hf_id } = req.body;

    // Ensure the supervisor_id in the body matches the authenticated supervisor
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid supervisor ID.");
    }

    const ardDeletion: ArdDeletionInterface = { ard_id, patient_id, hf_id };

    try {
      const results = await ArdModel.supervisorDeleteArd(ardDeletion);
      res.status(200).json({ message: "Deleted definitions.", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];
