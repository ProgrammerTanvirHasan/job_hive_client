import { z } from "zod";

export const recruiterApplySchema = z.object({
  company: z.string().trim().min(2).max(100),

  experience: z.string().trim().min(10).max(1000),

  portfolio: z.string().url().optional(), 

  linkedin: z.string().url().optional(),
});
