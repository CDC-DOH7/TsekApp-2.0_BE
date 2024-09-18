import { Router } from "express";
import {
  register,
  login,
  logout,
} from "../controllers/user-based/superadminAuthController";
import { authMiddleware } from "../middleware/authMiddleware";

const superadminRouter: Router = Router();

superadminRouter.post("/register", register);
superadminRouter.post("/login", login);
superadminRouter.post("/logout", authMiddleware, logout);

// roles

export default superadminRouter;
