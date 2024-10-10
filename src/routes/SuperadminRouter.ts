import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  register,
  login,
  logout,
} from "../controllers/user-based/user-controllers/SuperadminAuthController";

const superadminRouter: Router = Router();

superadminRouter.post("/register", register);
superadminRouter.post("/login", login);
superadminRouter.post("/logout", authMiddleware, logout);

// roles

export default superadminRouter;
