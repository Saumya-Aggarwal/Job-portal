import z from "zod";
import mongoose from "mongoose";
// Define the validation schema
export const createJobSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(1, "Job description is required"),
  location: z.string().min(1, "Location is required"),
  salary: z.number().positive("Salary must be a positive number"),
  requirements: z.union([
    z.string().min(3, "Requirement for Job is required"),
    z.array(z.string()),
  ]), // Accept either a string or an array of strings  location: z.string().min(1, "Job location is required"),
  jobType: z.string().min(1, "Job type is required"),
  experience: z.string().min(1, "Specify Experience required"),
  position: z.number().positive("Positions must be a positive number"),
  company: z
    .string()
    .min(1, "Create a company first")
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid Company ID",
    }),
  applications: z
    .string()
    .optional()
    .refine((val) => !val || mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid Application ID",
    }),
});
