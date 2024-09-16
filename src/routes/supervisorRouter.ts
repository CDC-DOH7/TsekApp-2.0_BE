import { Router } from "express";
import { register, login, logout } from "../controllers/supervisorAuthController";
import authMiddleware from "../middleware/authMiddleware";

const supervisorRouter: Router = Router();

supervisorRouter.post("/register", register);
supervisorRouter.post("/login", login);
supervisorRouter.post("/logout", authMiddleware, logout);

export default supervisorRouter;
