import AdvancedSearchFilterInterface from "../../../../interfaces/search_filters/advanced-search/risk-assessment-form/RecordAdvancedSearchFilterInterface";
import SoftSearchFilterInterface from "../../../../interfaces/search_filters/soft-search/risk-assessment-form/RecordSoftSearchFilterInterface";

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

export const softSearch = async (
  softSearchParams: SoftSearchFilterInterface
) => [];

export const advancedSearch = async (
  advancedSearchParams: AdvancedSearchFilterInterface
) => {};
