import { Role } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";

const applyJob = async (
  userId: string,
  jobId: number,
  resume: string,
  coverLetter?: string,
) => {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  const existing = await prisma.application.findUnique({
    where: {
      userId_jobId: {
        userId,
        jobId,
      },
    },
  });

  if (existing) {
    throw new Error("You already applied to this job");
  }

  return prisma.application.create({
    data: {
      userId,
      jobId,
      resume,
      coverLetter: coverLetter ?? null,
    },
  });
};

const getApplications = async (userId: string) => {
  return prisma.application.findMany({
    where: { userId },
    include: {
      job: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
//////////////////////

const getNotAppliedJobs = async (userId: string) => {
  const jobs = await prisma.job.findMany({
    where: {
      AND: [
        {
          status: "APPROVED",
        },
        {
          applications: {
            none: {
              userId,
            },
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return jobs;
};
const getApplicationsByJob = async (
  userId: string,
  jobId: number,
  role: Role,
) => {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job) throw new Error("Job not found");

  if (role !== Role.ADMIN && job.userId !== userId) {
    throw new Error("Not authorized");
  }

  return prisma.application.findMany({
    where: { jobId },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const applicationService = {
  applyJob,
  getApplications,
  getApplicationsByJob,
  getNotAppliedJobs,
};
