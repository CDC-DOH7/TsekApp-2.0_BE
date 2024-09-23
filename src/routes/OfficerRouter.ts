import { Router } from "express";
import {
  register,
  login,
  logout,
} from "../controllers/user-based/OfficerAuthController";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  officerCreateConsultation,
  officerSearchConsultation,
} from "../controllers/record-based/ConsultationLogController";

const officerRouter: Router = Router();

officerRouter.post("/register", register);
officerRouter.post("/login", login);
officerRouter.post("/logout", authMiddleware, logout);

// roles
officerRouter.post("/records/create", officerCreateConsultation);
officerRouter.post("/records/search", officerSearchConsultation);

export default officerRouter;
