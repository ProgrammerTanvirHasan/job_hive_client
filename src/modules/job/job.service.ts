import { JobStatus, Role } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";

const createJob = async (data: any, userId: string) => {
  // ✅ Safe Date Conversion
  let applyDeadline = null;

  if (data.applyDeadline) {
    const parsedDate = new Date(data.applyDeadline);

    if (!isNaN(parsedDate.getTime())) {
      applyDeadline = parsedDate;
    } else {
      throw new Error("Invalid apply deadline format");
    }
  }

  return prisma.job.create({
    data: {
      title: data.title,
      description: data.description,
      company: data.company,
      location: data.location,
      category: data.category,

      salary: data.salary || null,

      isPaid: data.isPaid,
      price: data.price ?? null,

      requirements: data.requirements || [],
      qualifications: data.qualifications || [],
      benefits: data.benefits || [],

      applyDeadline,

      userId,
      status: "PENDING",
    },
  });
};
const getAllJobs = async () => {
  return prisma.job.findMany({
    include: {
      user: true,
    },
  });
};

const getJobsByCategoryPreview = async () => {
  const jobs = await prisma.job.findMany({
    where: {
      status: "APPROVED",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const map = new Map<string, any>();

  for (const job of jobs) {
    if (!map.has(job.category)) {
      map.set(job.category, job);
    }
  }

  return Array.from(map.values());
};
const getPremiumJobs = async () => {
  return prisma.job.findMany({
    where: {
      status: JobStatus.APPROVED,
      price: {
        gt: 0,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getJobById = async (id: number) => {
  return prisma.job.findUnique({
    where: { id },
    include: {
      user: true,
      applications: true,
    },
  });
};

const updateJob = async (
  id: number,
  data: any,
  userId: string,
  role: string,
) => {
  const job = await prisma.job.findUnique({ where: { id } });

  if (!job) throw new Error("Job not found");

  if (role !== Role.ADMIN && job.userId !== userId) {
    throw new Error("Not authorized");
  }

  return prisma.job.update({
    where: { id },
    data,
  });
};

const deleteJob = async (id: number, userId: string, role: string) => {
  const job = await prisma.job.findUnique({ where: { id } });

  if (!job) throw new Error("Job not found");

  if (role !== Role.ADMIN && job.userId !== userId) {
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
      data: { status: JobStatus.APPROVED },
    });

    await tx.user.updateMany({
      where: {
        id: job.userId,
        role: Role.USER,
      },
      data: {
        role: Role.RECRUITER,
      },
    });

    return updatedJob;
  });
};

const rejectJob = async (id: number, feedback: string) => {
  return prisma.job.update({
    where: { id },
    data: {
      status: JobStatus.REJECTED,
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
  getPremiumJobs,
  getJobsByCategoryPreview,
};
