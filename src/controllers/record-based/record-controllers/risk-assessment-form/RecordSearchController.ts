import { Request, Response } from "express";
import AdvancedSearchFilterInterface from "../../../../interfaces/search_filters/advanced-search/risk-assessment-form/RecordAdvancedSearchFilterInterface";
import SoftSearchFilterInterface from "../../../../interfaces/search_filters/soft-search/risk-assessment-form/RecordSoftSearchFilterInterface";
import {
  authenticateOfficer,
  authenticateSuperadmin,
  authenticateSupervisor,
} from "../../../../middleware/authMiddleware";

import RecordSearchModel from "../../../../models/record-specific/risk-assessment-form/search-models/RecordSearchModel";

// all officer-related record querying functions here:
export { officerSearchArd } from "./records/ArdControllers";
export { officerSearchConsultation } from "./records/ConsultationLogControllers";
export { officerSearchFamilyHistory } from "./records/FamilyHistoryControllers";
export { officerSearchManagement } from "./records/ManagementControllers";
export { officerSearchNcdRiskFactors } from "./records/NcdRiskFactorsControllers";
export { officerSearchPastMedicalHistory } from "./records/PastMedicalHistoryControllers";
export { officerSearchPatientInfo } from "./records/PatientInfoControllers";
export { officerSearchReferral } from "./records/ReferralControllers";
export { officerSearchRiskScreening } from "./records/RiskScreeningControllers";

// all supervisor-related record querying functions here:
export { supervisorSearchArd } from "./records/ArdControllers";
export { supervisorSearchConsultation } from "./records/ConsultationLogControllers";
export { supervisorSearchFamilyHistory } from "./records/FamilyHistoryControllers";
export { supervisorSearchManagement } from "./records/ManagementControllers";
export { supervisorSearchNcdRiskFactors } from "./records/NcdRiskFactorsControllers";
export { supervisorSearchPastMedicalHistory } from "./records/PastMedicalHistoryControllers";
export { supervisorSearchPatientInfo } from "./records/PatientInfoControllers";
export { supervisorSearchReferral } from "./records/ReferralControllers";
export { supervisorSearchRiskScreening } from "./records/RiskScreeningControllers";

// Soft searches
export const officerSoftSearch = [
  authenticateOfficer,
  async (req: Request, res: Response) => {
    const {
      patient_id,
      officer_id,
      ard_id,
      cl_id,
      fh_id,
      mngm_id,
      rf_id,
      pmh_id,
      rs_id,
      hf_id,
    } = req.body;

    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    const searchParams: SoftSearchFilterInterface = {
      patient_id,
      ard_id,
      cl_id,
      fh_id,
      mngm_id,
      rf_id,
      pmh_id,
      rs_id,
      hf_id,
    };

    try {
      const results = await RecordSearchModel.officerSoftSearchRecords(
        searchParams
      );
      res.status(200).json({ message: "Found Results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

export const supervisorSoftSearch = [
  authenticateSupervisor,
  async (req: Request, res: Response) => {
    const {
      patient_id,
      supervisor_id,
      ard_id,
      cl_id,
      fh_id,
      mngm_id,
      rf_id,
      pmh_id,
      rs_id,
      hf_id,
    } = req.body;

    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    const searchParams: SoftSearchFilterInterface = {
      patient_id,
      ard_id,
      cl_id,
      fh_id,
      mngm_id,
      rf_id,
      pmh_id,
      rs_id,
      hf_id,
    };

    try {
      const results = await RecordSearchModel.supervisorSoftSearchRecords(
        searchParams
      );
      res.status(200).json({ message: "Found Results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

export const superadminSoftSearch = [
  authenticateSuperadmin,
  async (req: Request, res: Response) => {
    const {
      patient_id,
      superadmin_id,
      ard_id,
      cl_id,
      fh_id,
      mngm_id,
      rf_id,
      pmh_id,
      rs_id,
      hf_id,
    } = req.body;

    if (req.body.superadmin_id !== superadmin_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    const searchParams: SoftSearchFilterInterface = {
      patient_id,
      ard_id,
      cl_id,
      fh_id,
      mngm_id,
      rf_id,
      pmh_id,
      rs_id,
      hf_id,
    };

    try {
      const results = await RecordSearchModel.superadminSoftSearchRecords(
        searchParams
      );
      res.status(200).json({ message: "Found Results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

// Advanced searches
export const officerAdvancedSearch = [
  authenticateOfficer,
  async (req: Request, res: Response) => {
    const {
      patient_id,
      officer_id,
      ard_id,
      cl_id,
      cl_start_date,
      cl_end_date,
      fh_id,
      mngm_id,
      mngm_start_date_followup,
      mngm_end_date_followup,
      rf_id,
      pmh_id,
      physician_name,
      ref_start_date,
      ref_end_date,
      rs_id,
      hf_id,
    } = req.body;

    if (req.body.officer_id !== officer_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    const searchParams: AdvancedSearchFilterInterface = {
      patient_id,
      ard_id,
      cl_id,
      cl_start_date,
      cl_end_date,
      fh_id,
      mngm_id,
      mngm_start_date_followup,
      mngm_end_date_followup,
      rf_id,
      pmh_id,
      physician_name,
      ref_start_date,
      ref_end_date,
      rs_id,
      hf_id,
    };

    try {
      const results = await RecordSearchModel.officerAdvancedSearchRecords(
        searchParams
      );
      res.status(200).json({ message: "Found Results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

export const supervisorAdvancedSearch = [
  authenticateSupervisor,
  async (req: Request, res: Response) => {
    const {
      patient_id,
      supervisor_id,
      ard_id,
      cl_id,
      cl_start_date,
      cl_end_date,
      fh_id,
      mngm_id,
      mngm_start_date_followup,
      mngm_end_date_followup,
      rf_id,
      pmh_id,
      physician_name,
      ref_start_date,
      ref_end_date,
      rs_id,
      hf_id,
    } = req.body;

    if (req.body.supervisor_id !== supervisor_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    const searchParams: AdvancedSearchFilterInterface = {
      patient_id,
      ard_id,
      cl_id,
      cl_start_date,
      cl_end_date,
      fh_id,
      mngm_id,
      mngm_start_date_followup,
      mngm_end_date_followup,
      rf_id,
      pmh_id,
      physician_name,
      ref_start_date,
      ref_end_date,
      rs_id,
      hf_id,
    };

    try {
      const results = await RecordSearchModel.supervisorAdvancedSearchRecords(
        searchParams
      );
      res.status(200).json({ message: "Found Results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];

export const superadminAdvancedSearch = [
  authenticateSuperadmin,
  async (req: Request, res: Response) => {
    const {
      patient_id,
      superadmin_id,
      ard_id,
      cl_id,
      cl_start_date,
      cl_end_date,
      fh_id,
      mngm_id,
      mngm_start_date_followup,
      mngm_end_date_followup,
      rf_id,
      pmh_id,
      physician_name,
      ref_start_date,
      ref_end_date,
      rs_id,
      hf_id,
    } = req.body;

    if (req.body.superadmin_id !== superadmin_id) {
      return res.status(403).send("Access denied. Invalid ID.");
    }

    const searchParams: AdvancedSearchFilterInterface = {
      patient_id,
      ard_id,
      cl_id,
      cl_start_date,
      cl_end_date,
      fh_id,
      mngm_id,
      mngm_start_date_followup,
      mngm_end_date_followup,
      rf_id,
      pmh_id,
      physician_name,
      ref_start_date,
      ref_end_date,
      rs_id,
      hf_id,
    };

    try {
      const results = await RecordSearchModel.superadminAdvancedSearchRecords(
        searchParams
      );
      res.status(200).json({ message: "Found Results!", results });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
];
