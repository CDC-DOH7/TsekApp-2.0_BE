// controllers/consultationController.ts
import { Request, Response } from "express";
import PatientInfoModel from "../../../models/record-specific/PatientInfoModel";
import PatientUniqueIDGenerator from "../../../common/cryptography/id_generators/record-specific/PatientUniqueIDGenerator";
import {
  authenticateOfficer,
  authenticateSupervisor,
} from "../../../middleware/authMiddleware";
import PatientInfoParamsInterface from "../../../interfaces/misc/PatientInfoParamsInterface";
import { calculateAgeGroup } from "../../../common/calc/CalcPatientAgeGroup";

// (Officer) Add/create a new consultation log
export const officerCreatePatientInfo = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
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
      patient_brgy,
      muncity_id,
      patient_muncity,
      province_id,
      patient_province,
      patient_phic_no,
      patient_pwd_no,
      patient_emp_status,
      patient_ip,
      patient_ip_ethinicity,
      hf_id,
      officer_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    // Generate unique patient_id
    const patient_id = PatientUniqueIDGenerator.generateCompactUniqueID(
      patient_fname,
      patient_mname,
      patient_lname,
      patient_brgy,
      patient_muncity,
      patient_province
    );

    const patient_age_group_id: number = calculateAgeGroup(patient_age);

    const newPatientInfo: PatientInfoParamsInterface = {
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
      patient_brgy,
      muncity_id,
      patient_muncity,
      province_id,
      patient_province,
      patient_phic_no,
      patient_pwd_no,
      patient_emp_status,
      patient_ip,
      patient_ip_ethinicity,
      hf_id,
    };

    PatientInfoModel.officerCreatePatientInfo(
      newPatientInfo,
      (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }
        res
          .status(201)
          .json({ message: "PatientInfo added successfully", results });
      }
    );
  },
];

// (Officer) Read/Search a consultation log
export const officerSearchPatientInfo = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
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
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    PatientInfoModel.officerSearchPatientInfo(
      {
        patient_date_assess_startdate,
        patient_date_assess_enddate,
        patient_id,
        patient_fname,
        patient_mname,
        patient_lname,
        patient_age,
        hf_id,
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
export const supervisorSearchPatientInfo = [
  authenticateOfficer, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
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
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    PatientInfoModel.supervisorSearchPatientInfo(
      {
        patient_date_assess_startdate,
        patient_date_assess_enddate,
        patient_id,
        patient_fname,
        patient_mname,
        patient_lname,
        patient_age,
        hf_id,
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
export const supervisorUpdatePatientInfo = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
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
      patient_brgy,
      muncity_id,
      patient_muncity,
      province_id,
      patient_province,
      patient_phic_no,
      patient_pwd_no,
      patient_emp_status,
      patient_ip,
      patient_ip_ethinicity,
      patient_id,
      hf_id,
      supervisor_id,
    } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    const patient_age_group_id = calculateAgeGroup(patient_age); 

    PatientInfoModel.supervisorUpdatePatientInfo(
      {
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
        patient_brgy,
        muncity_id,
        patient_muncity,
        province_id,
        patient_province,
        patient_phic_no,
        patient_pwd_no,
        patient_emp_status,
        patient_ip,
        patient_ip_ethinicity,
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
export const supervisorDeletePatientInfo = [
  authenticateSupervisor, // Use the middleware to authenticate the officer
  (req: Request, res: Response) => {
    const { patient_id, hf_id, supervisor_id } = req.body;

    // Ensure the officer_id in the body matches the authenticated officer
    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid officer ID.");
    }

    PatientInfoModel.supervisorDeletePatientInfo({patient_id, hf_id}, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.status(201).json({ message: "Deleted definitions.", results });
    });
  },
];
