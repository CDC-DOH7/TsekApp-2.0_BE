import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import RecordPaths from "../common/constants/RoutePathNames";
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
  supervisorUpdateRiskScreening
} from "../controllers/record-based/RecordUpdateController";

// searching functions
import { 
  supervisorSearchArd,
  supervisorSearchConsultation,
  supervisorSearchFamilyHistory,
  supervisorSearchManagement,
  supervisorSearchNcdRiskFactors,
  supervisorSearchPastMedicalHistory,
  supervisorSearchPatientInfo,
  supervisorSearchReferral,
  supervisorSearchRiskScreening
} from "../controllers/record-based/RecordSearchController";

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
  supervisorDeleteRiskScreening
} from "../controllers/record-based/RecordDeleteController";

const supervisorRouter: Router = Router();

supervisorRouter.post("/register", register);
supervisorRouter.post("/login", login);
supervisorRouter.post("/logout", authMiddleware, logout);

// record-creation functions
const recordUpdatingRoutes = [
  { path: `${RecordPaths.UPDATE_PATH}/ard`, handler: supervisorUpdateArd },
  { path: `${RecordPaths.UPDATE_PATH}/consultation`, handler: supervisorUpdateConsultation },
  { path: `${RecordPaths.UPDATE_PATH}/famhist`, handler: supervisorUpdateFamilyHistory },
  { path: `${RecordPaths.UPDATE_PATH}/management`, handler: supervisorUpdateManagement },
  { path: `${RecordPaths.UPDATE_PATH}/ncdrisk`, handler: supervisorUpdateNcdRiskFactors },
  { path: `${RecordPaths.UPDATE_PATH}/pastmedhist`, handler: supervisorUpdatePastMedicalHistory },
  { path: `${RecordPaths.UPDATE_PATH}/patientinfo`, handler: supervisorUpdatePatientInfo },
  { path: `${RecordPaths.UPDATE_PATH}/referral`, handler: supervisorUpdateReferral },
  { path: `${RecordPaths.UPDATE_PATH}/riskscreening`, handler: supervisorUpdateRiskScreening }
];

// record-searching functions
const recordSearchingRoutes = [
  { path: `${RecordPaths.DELETE_PATH}/ard`, handler: supervisorDeleteArd },
  { path: `${RecordPaths.DELETE_PATH}/consultation`, handler: supervisorDeleteConsultation },
  { path: `${RecordPaths.DELETE_PATH}/famhist`, handler: supervisorDeleteFamilyHistory },
  { path: `${RecordPaths.DELETE_PATH}/management`, handler: supervisorDeleteManagement },
  { path: `${RecordPaths.DELETE_PATH}/ncdrisk`, handler: supervisorDeleteNcdRiskFactors },
  { path: `${RecordPaths.DELETE_PATH}/pastmedhist`, handler: supervisorDeletePastMedicalHistory },
  { path: `${RecordPaths.DELETE_PATH}/patientinfo`, handler: supervisorDeletePatientInfo },
  { path: `${RecordPaths.DELETE_PATH}/referral`, handler: supervisorDeleteReferral },
  { path: `${RecordPaths.DELETE_PATH}/riskscreening`, handler: supervisorDeleteRiskScreening }
];

// record-deletion functions
const recordDeletingRoutes = [
  { path: `${RecordPaths.SEARCH_PATH}/ard`, handler: supervisorSearchArd },
  { path: `${RecordPaths.SEARCH_PATH}/consultation`, handler: supervisorSearchConsultation },
  { path: `${RecordPaths.SEARCH_PATH}/famhist`, handler: supervisorSearchFamilyHistory },
  { path: `${RecordPaths.SEARCH_PATH}/management`, handler: supervisorSearchManagement },
  { path: `${RecordPaths.SEARCH_PATH}/ncdrisk`, handler: supervisorSearchNcdRiskFactors },
  { path: `${RecordPaths.SEARCH_PATH}/pastmedhist`, handler: supervisorSearchPastMedicalHistory },
  { path: `${RecordPaths.SEARCH_PATH}/patientinfo`, handler: supervisorSearchPatientInfo },
  { path: `${RecordPaths.SEARCH_PATH}/referral`, handler: supervisorSearchReferral },
  { path: `${RecordPaths.SEARCH_PATH}/riskscreening`, handler: supervisorSearchRiskScreening }
];

// --- To Follow --- //
// officer account-related roles
supervisorRouter.post("/management/officer/update");
supervisorRouter.post("/management/officer/delete");

// record-related roles
supervisorRouter.post("/management/records/update");
supervisorRouter.post("/management/records/delete");


// deploy endpoints
recordUpdatingRoutes.forEach(route => {
  supervisorRouter.post(route.path, route.handler);
});

recordSearchingRoutes.forEach(route => {
  supervisorRouter.post(route.path, route.handler);
});

recordDeletingRoutes.forEach(route => {
  supervisorRouter.post(route.path, route.handler);
});

export default supervisorRouter;
