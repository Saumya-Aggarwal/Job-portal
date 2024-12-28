import { Router } from "express";
import isAuthenticated from "../middlewares/auth.js";
import {
  applyJob,
  getApplicants,
  getAppliedJob,
  updateStatus,
} from "../controllers/application.controller.js";
import isRecruiter from "../middlewares/recruiterAuth.js";
const applicationRouter = Router();
applicationRouter.use(isAuthenticated);
applicationRouter.post("/apply/:id",  applyJob);
applicationRouter.get("/applied", getAppliedJob);
applicationRouter.get("/applicants/:id", isRecruiter, getApplicants);
applicationRouter.put("/status/:id", isRecruiter, updateStatus);

export default applicationRouter;
