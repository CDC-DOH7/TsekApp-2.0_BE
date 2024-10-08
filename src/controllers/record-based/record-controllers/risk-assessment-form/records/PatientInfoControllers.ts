// controllers/consultationController.ts
import { Request, Response } from "express";
import PatientInfoModel from "../../../../../models/record-specific/risk-assessment-form/PatientInfoModel";
import PatientUniqueIDGenerator from "../../../../../common/cryptography/id_generators/record-specific/PatientUniqueIDGenerator";
import {
  authenticateOfficer,
  authenticateSupervisor,
} from "../../../../../middleware/authMiddleware";
import { calculateAgeGroup } from "../../../../../common/calc/CalcPatientAgeGroup";
import PatientInfoDeletionInterface from "../../../../../interfaces/deletion_params/risk-assessment-form/PatientInfoDeletionInterface";

// (Officer) Add/create a new consultation log
export const officerCreatePatientInfo = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const {
      patient_fname,
      patient_mname,
      patient_lname,
      patient_date_assess,
      patient_age,
      patient_sex,
      patient_dob,
      patient_civil_status,
      patient_religion,
      patient_contact_no,
      patient_street,
      patient_purok,
      patient_sitio,
      brgy_id,
      muncity_id,
      province_id,
      patient_phic_no,
      patient_pwd_no,
      patient_emp_status,
      patient_ip,
      patient_ethnicity,
      hf_id,
      officer_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    // Generate unique patient_id
    const patient_id = PatientUniqueIDGenerator.generateCompactUniqueID(
      patient_fname,
      patient_mname,
      patient_lname,
      patient_dob,
      brgy_id,
      muncity_id,
      province_id
    );

    const patient_age_group_id: number = calculateAgeGroup(patient_age);

    try {
      const results = await PatientInfoModel.officerCreatePatientInfo({
        patient_id,
        patient_fname,
        patient_mname,
        patient_lname,
        patient_date_assess,
        patient_age,
        patient_age_group_id,
        patient_sex,
        patient_dob,
        patient_civil_status,
        patient_religion,
        patient_contact_no,
        patient_street,
        patient_purok,
        patient_sitio,
        brgy_id,
        muncity_id,
        province_id,
        patient_phic_no,
        patient_pwd_no,
        patient_emp_status,
        patient_ip,
        patient_ethnicity,
        hf_id,
      });
      res.status(201).json({
        patient_id: patient_id,
        message: "Patient Info added successfully",
        results,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Officer) Read/Search a consultation log
export const officerSearchPatientInfo = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const {
      patient_date_assess_startdate,
      patient_date_assess_enddate,
      patient_id,
      patient_fname,
      patient_mname,
      patient_lname,
      patient_age,
      officer_id,
      hf_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).json({ message: "Access denied. Invalid ID." });
    }

    try {
      const results = await PatientInfoModel.officerSearchPatientInfo({
        patient_date_assess_startdate,
        patient_date_assess_enddate,
        patient_id,
        patient_fname,
        patient_mname,
        patient_lname,
        patient_age,
        hf_id,
      });
      res.status(200).json({ message: "Found Results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Read/Search a consultation log
export const supervisorSearchPatientInfo = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const {
      patient_date_assess_startdate,
      patient_date_assess_enddate,
      patient_id,
      patient_fname,
      patient_mname,
      patient_lname,
      patient_age,
      supervisor_id,
      hf_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    try {
      const results = await PatientInfoModel.supervisorSearchPatientInfo({
        patient_date_assess_startdate,
        patient_date_assess_enddate,
        patient_id,
        patient_fname,
        patient_mname,
        patient_lname,
        patient_age,
        hf_id,
      });
      res.status(200).json({ message: "Found Results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// (Supervisor) Read/Search a consultation log
export const supervisorUpdatePatientInfo = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const {
      patient_fname,
      patient_mname,
      patient_lname,
      patient_date_assess,
      patient_age,
      patient_sex,
      patient_dob,
      patient_civil_status,
      patient_religion,
      patient_contact_no,
      patient_street,
      patient_purok,
      patient_sitio,
      brgy_id,
      muncity_id,
      province_id,
      patient_phic_no,
      patient_pwd_no,
      patient_emp_status,
      patient_ip,
      patient_ethnicity,
      patient_id,
      hf_id,
      supervisor_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    const patient_age_group_id = calculateAgeGroup(patient_age);

    try {
      const results = await PatientInfoModel.supervisorUpdatePatientInfo({
        patient_fname,
        patient_mname,
        patient_lname,
        patient_date_assess,
        patient_age,
        patient_age_group_id,
        patient_sex,
        patient_dob,
        patient_civil_status,
        patient_religion,
        patient_contact_no,
        patient_street,
        patient_purok,
        patient_sitio,
        brgy_id,
        muncity_id,
        province_id,
        patient_phic_no,
        patient_pwd_no,
        patient_emp_status,
        patient_ip,
        patient_ethnicity,
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
export const supervisorDeletePatientInfo = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  async (req: Request, res: Response) => {
    const { patient_id, hf_id, supervisor_id } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    const patientDeletion: PatientInfoDeletionInterface = { patient_id, hf_id };

    try {
      const results = await PatientInfoModel.supervisorDeletePatientInfo(
        patientDeletion
      );
      res.status(200).json({ message: "Deleted definitions.", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];
