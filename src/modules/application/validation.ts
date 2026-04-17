import { z } from "zod";

export const applicationSchema = z.object({
  jobId: z.number(),
  resume: z.string(),
  coverLetter: z.string().optional(),
});
