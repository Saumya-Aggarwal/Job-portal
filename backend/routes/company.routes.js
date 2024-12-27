import {
  companySchema,
  updateCompanySchema,
  validateRequest,
} from "../middlewares/validation";
import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import isRecruiter from "../middlewares/recruiterAuth.js";
import {
  registerCompany,
  updateCompany,
  deleteCompany,
  getCompanies,
  getCompanyById,
} from "../controllers/company.controller.js";

const companyRouter = express.Router();

// Apply middleware to all routes in the router
companyRouter.use(isAuthenticated, isRecruiter);

// Define your routes
companyRouter.post(
  "/register",
  validateRequest(companySchema),
  registerCompany
);
companyRouter.put(
  "/update/:id",
  validateRequest(updateCompanySchema),
  updateCompany
);
companyRouter.delete("/delete/:id", deleteCompany);
companyRouter.get("/:id", getCompanyById);
companyRouter.get("/all", getCompanies);

export default companyRouter;
