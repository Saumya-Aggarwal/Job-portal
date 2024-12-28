import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJob,
  getJobById,
  getJobsCreated,
} from "../controllers/job.controller.js";
import { createJobSchema, validateRequest } from "../middlewares/validation.js";
import isAuthenticated from "../middlewares/auth.js";
import isRecruiter from "../middlewares/recruiterAuth.js";
const jobRouter = Router();
jobRouter.use(isAuthenticated);
jobRouter.post(
  "/create",
  isRecruiter,
  validateRequest(createJobSchema),
  createJob
);
jobRouter.get("/created", isRecruiter, getJobsCreated);
jobRouter.get("/all", getAllJob);
jobRouter.get("/:id", getJobById);
jobRouter.delete("/:id", isRecruiter, deleteJob);

export default jobRouter;
