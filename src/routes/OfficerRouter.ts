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
officerRouter.post("/add-consultation", officerCreateConsultation);
officerRouter.post("/search-consultation", officerSearchConsultation);

export default officerRouter;
