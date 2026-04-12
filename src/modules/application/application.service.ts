import { prisma } from "../../lib/prisma";

const applyJob = async (
  userId: number,
  jobId: number,
  resume: string,
  coverLetter?: string,
) => {
  return prisma.application.create({
    data: { userId, jobId, resume, coverLetter },
  });
};

const getApplications = async () => prisma.application.findMany();

const getApplicationsByJob = async (jobId: number) =>
  prisma.application.findMany({ where: { jobId } });

export const applicationService = {
  applyJob,
  getApplications,
  getApplicationsByJob,
};
