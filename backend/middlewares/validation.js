import z from "zod";
import {
  signInSchema,
  signupSchema,
  updateProfileSchema,
} from "./validationSchema/user.schema.js";
import {
  companySchema,
  updateCompanySchema,
} from "./validationSchema/company.schema.js";
import { createJobSchema } from "./validationSchema/job.schema.js";
const validateRequest = (Schema) => {
  //a function that return a function
  return (req, res, next) => {
    const validationResult = Schema.safeParse(req.body);
    console.log(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        errors: validationResult.error.errors,
      });
    }
    // Attach validated data to req for use in route handlers
    req.body = validationResult.data;
    next(); // Proceed to the next middleware or route handler
  };
};

export {
  validateRequest,
  signInSchema,
  signupSchema,
  updateProfileSchema,
  companySchema,
  updateCompanySchema,
  createJobSchema,
};
