import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { RecordPaths, MiscPaths } from "../common/constants/RoutePathNames";
import {
  register,
  login,
  logout,
} from "../controllers/user-based/user-controllers/OfficerAuthController";

// creation functions
import {
  officerCreateArd,
  officerCreateConsultation,
  officerCreateFamilyHistory,
  officerCreateManagement,
  officerCreateNcdRiskFactors,
  officerCreatePastMedicalHistory,
  officerCreatePatientInfo,
  officerCreateReferral,
  officerCreateRiskScreening,
} from "../controllers/record-based/record-controllers/risk-assessment-form/RecordCreationController";

// searching functions
import {
  officerAdvancedSearch,
  officerSearchArd,
  officerSearchConsultation,
  officerSearchFamilyHistory,
  officerSearchManagement,
  officerSearchNcdRiskFactors,
  officerSearchPastMedicalHistory,
  officerSearchPatientInfo,
  officerSearchReferral,
  officerSearchRiskScreening,
  officerSoftSearch,
} from "../controllers/record-based/record-controllers/risk-assessment-form/RecordSearchController";
import { officerRetrieveBarangayList } from "../controllers/record-based/misc-controllers/BarangayController";
import { officerRetrieveHealthFacilityList } from "../controllers/record-based/misc-controllers/HealthFacilityController";
import { officerRetrieveProvinceList } from "../controllers/record-based/misc-controllers/ProvinceController";
import { officerRetrieveMuncityList } from "../controllers/record-based/misc-controllers/MuncityController";
import { officerRetrieveReligionList } from "../models/misc/ReligionModel";
import { officerRetrieveEthnicityList } from "../models/misc/EthnicityModel";

const officerRouter: Router = Router();

officerRouter.post("/register", register);
officerRouter.post("/login", login);
officerRouter.post("/logout", authMiddleware, logout);

// form-related info querying functions (e.g. barangay, muncity, and province)
const infoQueryingRoutes = [
  { path: `${MiscPaths.BARANGAY_PATH}`, handler: officerRetrieveBarangayList },
  { path: `${MiscPaths.MUNCITY_PATH}`, handler: officerRetrieveMuncityList },
  { path: `${MiscPaths.PROVINCE_PATH}`, handler: officerRetrieveProvinceList },
  {
    path: `${MiscPaths.HEALTH_FACILITY_PATH}`,
    handler: officerRetrieveHealthFacilityList,
  },
  {
    path: `${MiscPaths.RELIGION_PATH}`,
    handler: officerRetrieveReligionList,
  },
  {
    path: `${MiscPaths.ETHNICITY_PATH}`,
    handler: officerRetrieveEthnicityList,
  },
];

// record-creation functions
const recordCreatingRoutes = [
  { path: `${RecordPaths.CREATE_PATH}/ard`, handler: officerCreateArd },
  {
    path: `${RecordPaths.CREATE_PATH}/consultation`,
    handler: officerCreateConsultation,
  },
  {
    path: `${RecordPaths.CREATE_PATH}/famhist`,
    handler: officerCreateFamilyHistory,
  },
  {
    path: `${RecordPaths.CREATE_PATH}/management`,
    handler: officerCreateManagement,
  },
  {
    path: `${RecordPaths.CREATE_PATH}/ncdrisk`,
    handler: officerCreateNcdRiskFactors,
  },
  {
    path: `${RecordPaths.CREATE_PATH}/pastmedhist`,
    handler: officerCreatePastMedicalHistory,
  },
  {
    path: `${RecordPaths.CREATE_PATH}/patientinfo`,
    handler: officerCreatePatientInfo,
  },
  {
    path: `${RecordPaths.CREATE_PATH}/referral`,
    handler: officerCreateReferral,
  },
  {
    path: `${RecordPaths.CREATE_PATH}/riskscreening`,
    handler: officerCreateRiskScreening,
  },
];

// record-searching functions
const recordSearchingRoutes = [
  {
    path: `${RecordPaths.SEARCH_PATH}/softsearch/`,
    handler: officerSoftSearch,
  },
  {
    path: `${RecordPaths.SEARCH_PATH}/advancedsearch/`,
    handler: officerAdvancedSearch,
  },
  {
    path: `${RecordPaths.SEARCH_PATH}/specificsearch/ard`,
    handler: officerSearchArd,
  },
  {
    path: `${RecordPaths.SEARCH_PATH}/specificsearch/consultation`,
    handler: officerSearchConsultation,
  },
  {
    path: `${RecordPaths.SEARCH_PATH}/specificsearch/famhist`,
    handler: officerSearchFamilyHistory,
  },
  {
    path: `${RecordPaths.SEARCH_PATH}/specificsearch/management`,
    handler: officerSearchManagement,
  },
  {
    path: `${RecordPaths.SEARCH_PATH}/specificsearch/ncdrisk`,
    handler: officerSearchNcdRiskFactors,
  },
  {
    path: `${RecordPaths.SEARCH_PATH}/specificsearch/pastmedhist`,
    handler: officerSearchPastMedicalHistory,
  },
  {
    path: `${RecordPaths.SEARCH_PATH}/specificsearch/patientinfo`,
    handler: officerSearchPatientInfo,
  },
  {
    path: `${RecordPaths.SEARCH_PATH}/specificsearch/referral`,
    handler: officerSearchReferral,
  },
  {
    path: `${RecordPaths.SEARCH_PATH}/specificsearch/riskscreening`,
    handler: officerSearchRiskScreening,
  },
];

// deploy endpoints
infoQueryingRoutes.forEach((route) => {
  officerRouter.post(route.path, route.handler);
});

recordCreatingRoutes.forEach((route) => {
  officerRouter.post(route.path, route.handler);
});

recordSearchingRoutes.forEach((route) => {
  officerRouter.post(route.path, route.handler);
});

export default officerRouter;
