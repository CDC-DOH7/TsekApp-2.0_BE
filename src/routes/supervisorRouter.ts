import { Router } from "express";
import {
  register,
  login,
  logout,
} from "../controllers/user-based/supervisorAuthController";
import { authMiddleware } from "../middleware/authMiddleware";

const supervisorRouter: Router = Router();

supervisorRouter.post("/register", register);
supervisorRouter.post("/login", login);
supervisorRouter.post("/logout", authMiddleware, logout);

// roles

export default supervisorRouter;
