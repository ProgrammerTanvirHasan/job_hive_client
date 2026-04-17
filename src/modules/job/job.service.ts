import { prisma } from "../../lib/prisma";

const createJob = async (data: any, recruiterId: number) => {
  return prisma.job.create({
    data: {
      ...data,
      recruiterId,
      status: "PENDING",
    },
  });
};

const getAllJobs = async () => {
  return prisma.job.findMany({
    where: { status: "APPROVED" },
    include: {
      recruiter: true,
    },
  });
};

const getJobById = async (id: number) => {
  return prisma.job.findUnique({
    where: { id },
    include: {
      recruiter: true,
      applications: true,
    },
  });
};

const updateJob = async (id: number, data: any, userId: number) => {
  const job = await prisma.job.findUnique({ where: { id } });

  if (!job) throw new Error("Job not found");

  if (job.recruiterId !== userId) {
    throw new Error("Not authorized");
  }

  return prisma.job.update({
    where: { id },
    data,
  });
};

const deleteJob = async (id: number, userId: number) => {
  const job = await prisma.job.findUnique({ where: { id } });

  if (!job) throw new Error("Job not found");

  if (job.recruiterId !== userId) {
    throw new Error("Not authorized");
  }

  return prisma.job.delete({ where: { id } });
};

const approveJob = async (id: number) => {
  return prisma.job.update({
    where: { id },
    data: { status: "APPROVED" },
  });
};
const rejectJob = async (id: number, feedback: string) => {
  return prisma.job.update({
    where: { id },
    data: {
      status: "REJECTED",
      rejectionReason: feedback,
    },
  });
};

export const jobService = {
  rejectJob,
  approveJob,
  deleteJob,
  updateJob,
  getAllJobs,
  getJobById,
  createJob,
};
