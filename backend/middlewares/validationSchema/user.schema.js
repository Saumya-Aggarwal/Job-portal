import z from "zod";
export const signupSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter") // Requires at least one uppercase letter
    .regex(/[a-z]/, "Password must contain at least one lowercase letter") // Requires at least one lowercase letter
    .regex(/[0-9]/, "Password must contain at least one number"), // Requires at least one digit
  phoneNumber: z.number().refine((val) => val.toString().length === 10, {
    message: "Phone number must be exactly 10 digits",
  }),
  role: z.enum(["applicant", "recruiter"], "Invalid role type"),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.enum(["applicant", "recruiter"], "Invalid role type"),
});

export const updateProfileSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .optional(),
  phoneNumber: z
    .number()
    .refine((val) => val.toString().length === 10, {
      message: "Phone number must be exactly 10 digits",
    })
    .optional(),
  profile: z
    .object({
      bio: z.string().optional(),
      skills: z.union([z.string(), z.array(z.string())]).optional(),
      resume: z.string().optional(),
      resumeOriginalName: z.string().optional(),
      company: z.string().optional(),
      Image: z.string().optional().default(""),
    })
    .optional(),
});