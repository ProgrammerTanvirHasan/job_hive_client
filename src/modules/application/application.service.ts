import { prisma } from "../../lib/prisma";

const applyJob = async (
  userId: number,
  jobId: number,
  resume: string,
  coverLetter?: string,
) => {
  return prisma.application.create({
    data: {
      userId,
      jobId,
      resume,
      coverLetter: coverLetter ?? null,
    },
  });
};

const getApplications = async () => {
  return prisma.application.findMany();
};

const getApplicationsByJob = async (jobId: number) => {
  return prisma.application.findMany({
    where: { jobId },
  });
};

export const applicationService = {
  applyJob,
  getApplications,
  getApplicationsByJob,
};
