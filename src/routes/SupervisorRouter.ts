import { Router } from "express";
import {
  register,
  login,
  logout,
} from "../controllers/user-based/SupervisorAuthController";
import { authMiddleware } from "../middleware/authMiddleware";

const supervisorRouter: Router = Router();

supervisorRouter.post("/register", register);
supervisorRouter.post("/login", login);
supervisorRouter.post("/logout", authMiddleware, logout);

// officer account-related roles
supervisorRouter.post("/management/officer/update");
supervisorRouter.post("/management/officer/delete");

// record-related roles
supervisorRouter.post("/management/records/update");
supervisorRouter.post("/management/records/delete");

export default supervisorRouter;
