import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import RecordPaths from "../common/constants/RoutePathNames";
import {
  register,
  login,
  logout,
} from "../controllers/user-based/SuperadminAuthController";

const superadminRouter: Router = Router();

superadminRouter.post("/register", register);
superadminRouter.post("/login", login);
superadminRouter.post("/logout", authMiddleware, logout);

// roles

export default superadminRouter;
