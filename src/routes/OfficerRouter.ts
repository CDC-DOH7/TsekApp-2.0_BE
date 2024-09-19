import { Router } from "express";
import {
  register,
  login,
  logout,
} from "../controllers/user-based/OfficerAuthController";
import { authMiddleware } from "../middleware/authMiddleware";
import { addConsultation } from "../controllers/record-based/ConsultationLogController";

const officerRouter: Router = Router();

officerRouter.post("/register", register);
officerRouter.post("/login", login);
officerRouter.post("/logout", authMiddleware, logout);

// roles
officerRouter.post("/add-consultation", addConsultation);
officerRouter.post("/search-consultation");

export default officerRouter;
