import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJob,
  getJobById,
  getJobsCreated,
  updateJob,
} from "../controllers/job.controller.js";
import { createJobSchema, validateRequest } from "../middlewares/validation.js";
import isAuthenticated from "../middlewares/auth.js";
import isRecruiter from "../middlewares/recruiterAuth.js";
const jobRouter = Router();
jobRouter.get("/all", getAllJob);
jobRouter.use(isAuthenticated);
jobRouter.post(
  "/create",
  isRecruiter,
  validateRequest(createJobSchema),
  createJob
);
jobRouter.put(
  "/update/:id",
  isRecruiter,
  validateRequest(createJobSchema),
  updateJob
);
jobRouter.get("/created", isRecruiter, getJobsCreated);
jobRouter.get("/:id", getJobById);
jobRouter.delete("/:id", isRecruiter, deleteJob);

export default jobRouter;
