import { prisma } from "../../lib/prisma";

const createJob = async (data: any, recruiterId: number) =>
  prisma.job.create({ data: { ...data, recruiterId } });

const getAllJobs = async () =>
  prisma.job.findMany({ where: { status: "APPROVED" } });

const getJobById = async (id: number) =>
  prisma.job.findUnique({ where: { id } });

const updateJob = async (id: number, data: any) =>
  prisma.job.update({ where: { id }, data });

const deleteJob = async (id: number) => prisma.job.delete({ where: { id } });

const approveJob = async (id: number) =>
  prisma.job.update({ where: { id }, data: { status: "APPROVED" } });

const rejectJob = async (id: number, feedback: string) =>
  prisma.job.update({
    where: { id },
    data: { status: "REJECTED", description: feedback },
  });

export const jobService = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  approveJob,
  rejectJob,
};
