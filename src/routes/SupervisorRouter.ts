import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { RecordPaths } from "../common/constants/RoutePathNames";
import {
  register,
  login,
  logout,
} from "../controllers/user-based/user-controllers/SupervisorAuthController";

// update functions
import {
  supervisorUpdateArd,
  supervisorUpdateConsultation,
  supervisorUpdateFamilyHistory,
  supervisorUpdateManagement,
  supervisorUpdateNcdRiskFactors,
  supervisorUpdatePastMedicalHistory,
  supervisorUpdatePatientInfo,
  supervisorUpdateReferral,
  supervisorUpdateRiskScreening,
} from "../controllers/record-based/record-controllers/risk-assessment-form/RecordUpdateController";

// searching functions
import {
  supervisorAdvancedSearch,
  supervisorSearchArd,
  supervisorSearchConsultation,
  supervisorSearchFamilyHistory,
  supervisorSearchManagement,
  supervisorSearchNcdRiskFactors,
  supervisorSearchPastMedicalHistory,
  supervisorSearchPatientInfo,
  supervisorSearchReferral,
  supervisorSearchRiskScreening,
  supervisorSoftSearch,
} from "../controllers/record-based/record-controllers/risk-assessment-form/RecordSearchController";

// deletion functions
import {
  supervisorDeleteArd,
  supervisorDeleteConsultation,
  supervisorDeleteFamilyHistory,
  supervisorDeleteManagement,
  supervisorDeleteNcdRiskFactors,
  supervisorDeletePastMedicalHistory,
  supervisorDeletePatientInfo,
  supervisorDeleteReferral,
  supervisorDeleteRiskScreening,
} from "../controllers/record-based/record-controllers/risk-assessment-form/RecordDeleteController";

const supervisorRouter: Router = Router();

supervisorRouter.post("/register", register);
supervisorRouter.post("/login", login);
supervisorRouter.post("/logout", authMiddleware, logout);

// record-creation functions
const recordUpdatingRoutes = [
  { path: `${RecordPaths.UPDATE_PATH}/ard`, handler: supervisorUpdateArd },
  {
    path: `${RecordPaths.UPDATE_PATH}/consultation`,
    handler: supervisorUpdateConsultation,
  },
  {
    path: `${RecordPaths.UPDATE_PATH}/famhist`,
    handler: supervisorUpdateFamilyHistory,
  },
  {
    path: `${RecordPaths.UPDATE_PATH}/management`,
    handler: supervisorUpdateManagement,
  },
  {
    path: `${RecordPaths.UPDATE_PATH}/ncdrisk`,
    handler: supervisorUpdateNcdRiskFactors,
  },
  {
    path: `${RecordPaths.UPDATE_PATH}/pastmedhist`,
    handler: supervisorUpdatePastMedicalHistory,
  },
  {
    path: `${RecordPaths.UPDATE_PATH}/patientinfo`,
    handler: supervisorUpdatePatientInfo,
  },
  {
    path: `${RecordPaths.UPDATE_PATH}/referral`,
    handler: supervisorUpdateReferral,
  },
  {
    path: `${RecordPaths.UPDATE_PATH}/riskscreening`,
    handler: supervisorUpdateRiskScreening,
  },
];

// record-deletion functions
const recordSearchingRoutes = [
  { path: `${RecordPaths.DELETE_PATH}/ard`, handler: supervisorDeleteArd },
  {
    path: `${RecordPaths.DELETE_PATH}/consultation`,
    handler: supervisorDeleteConsultation,
  },
  {
    path: `${RecordPaths.DELETE_PATH}/famhist`,
    handler: supervisorDeleteFamilyHistory,
  },
  {
    path: `${RecordPaths.DELETE_PATH}/management`,
    handler: supervisorDeleteManagement,
  },
  {
    path: `${RecordPaths.DELETE_PATH}/ncdrisk`,
    handler: supervisorDeleteNcdRiskFactors,
  },
  {
    path: `${RecordPaths.DELETE_PATH}/pastmedhist`,
    handler: supervisorDeletePastMedicalHistory,
  },
  {
    path: `${RecordPaths.DELETE_PATH}/patientinfo`,
    handler: supervisorDeletePatientInfo,
  },
  {
    path: `${RecordPaths.DELETE_PATH}/referral`,
    handler: supervisorDeleteReferral,
  },
  {
    path: `${RecordPaths.DELETE_PATH}/riskscreening`,
    handler: supervisorDeleteRiskScreening,
  },
];

// record-searching functions
const recordDeletingRoutes = [
  {
    path: `${RecordPaths.SEARCH_PATH}/softsearch/`,
    handler: supervisorSoftSearch,
  },
  {
    path: `${RecordPaths.SEARCH_PATH}/advancedsearch/`,
    handler: supervisorAdvancedSearch,
  },
  {
    path: `${RecordPaths.SEARCH_PATH}/specificsearch/ard`,
    handler: supervisorSearchArd,
  },
  {
    path: `${RecordPaths.SEARCH_PATH}/specificsearch/consultation`,
    handler: supervisorSearchConsultation,
  },
  {
    path: `${RecordPaths.SEARCH_PATH}/specificsearch/famhist`,
    handler: supervisorSearchFamilyHistory,
  },
  {
    path: `${RecordPaths.SEARCH_PATH}/specificsearch/management`,
    handler: supervisorSearchManagement,
  },
  {
    path: `${RecordPaths.SEARCH_PATH}/specificsearch/ncdrisk`,
    handler: supervisorSearchNcdRiskFactors,
  },
  {
    path: `${RecordPaths.SEARCH_PATH}/specificsearch/pastmedhist`,
    handler: supervisorSearchPastMedicalHistory,
  },
  {
    path: `${RecordPaths.SEARCH_PATH}/specificsearch/patientinfo`,
    handler: supervisorSearchPatientInfo,
  },
  {
    path: `${RecordPaths.SEARCH_PATH}/specificsearch/referral`,
    handler: supervisorSearchReferral,
  },
  {
    path: `${RecordPaths.SEARCH_PATH}/specificsearch/riskscreening`,
    handler: supervisorSearchRiskScreening,
  },
];

// --- To Follow --- //
// officer account-related roles
supervisorRouter.post("/management/officer/update");
supervisorRouter.post("/management/officer/delete");

// record-related roles
supervisorRouter.post("/management/records/update");
supervisorRouter.post("/management/records/delete");

// deploy endpoints
recordUpdatingRoutes.forEach((route) => {
  supervisorRouter.post(route.path, route.handler);
});

recordSearchingRoutes.forEach((route) => {
  supervisorRouter.post(route.path, route.handler);
});

recordDeletingRoutes.forEach((route) => {
  supervisorRouter.post(route.path, route.handler);
});

export default supervisorRouter;
