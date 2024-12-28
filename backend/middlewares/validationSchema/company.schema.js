import z from "zod";
export const companySchema = z.object({
  name: z.string().min(1, "Please enter Company Email."),
  website: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  logo: z.string().optional(),
});

export const updateCompanySchema = z.object({
  website: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  logo: z.string().optional(),
});