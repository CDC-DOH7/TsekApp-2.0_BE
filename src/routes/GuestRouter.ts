import { Router } from "express";
import { retrieveHealthFacilityList } from "../controllers/record-based/misc-controllers/HealthFacilityController";

const guestRouter: Router = Router();

guestRouter.get("/listhf", retrieveHealthFacilityList);

export default guestRouter;
