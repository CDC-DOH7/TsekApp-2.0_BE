import { Router } from "express";
import { register, login, logout } from "../controllers/officerAuthController";
import authMiddleware from "../middleware/authMiddleware";

const officerRouter: Router = Router();

officerRouter.post("/register", register);
officerRouter.post("/login", login);
officerRouter.post("/logout", authMiddleware, logout);

export default officerRouter;
