import { prisma } from "../../lib/prisma";

const createJob = async (data: any, userId: number) => {
  return prisma.job.create({
    data: {
      ...data,
      recruiterId: userId,
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

const updateJob = async (
  id: number,
  data: any,
  userId: number,
  role: string,
) => {
  const job = await prisma.job.findUnique({ where: { id } });

  if (!job) throw new Error("Job not found");

  if (role !== "ADMIN" && job.recruiterId !== userId) {
    throw new Error("Not authorized");
  }

  return prisma.job.update({
    where: { id },
    data,
  });
};

const deleteJob = async (id: number, userId: number, role: string) => {
  const job = await prisma.job.findUnique({ where: { id } });

  if (!job) throw new Error("Job not found");

  if (role !== "ADMIN" && job.recruiterId !== userId) {
    throw new Error("Not authorized");
  }

  return prisma.job.delete({
    where: { id },
  });
};

const approveJob = async (jobId: number) => {
  return prisma.$transaction(async (tx) => {
    const job = await tx.job.findUnique({
      where: { id: jobId },
    });

    if (!job) throw new Error("Job not found");

    const updatedJob = await tx.job.update({
      where: { id: jobId },
      data: { status: "APPROVED" },
    });

    await tx.user.update({
      where: { id: job.recruiterId },
      data: { role: "RECRUITER" },
    });

    return updatedJob;
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
