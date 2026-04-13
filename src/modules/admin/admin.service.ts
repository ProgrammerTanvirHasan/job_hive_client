import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  return prisma.user.findMany();
};

const getRecruiterRequests = async () => {
  return prisma.recruiterRequest.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
};

const approveRecruiter = async (id: number) => {
  const request = await prisma.recruiterRequest.update({
    where: { id },
    data: { status: "APPROVED" },
  });

  await prisma.user.update({
    where: { id: request.userId },
    data: { role: "RECRUITER" },
  });

  return request;
};

const rejectRecruiter = async (id: number) => {
  return prisma.recruiterRequest.update({
    where: { id },
    data: { status: "REJECTED" },
  });
};

export const adminService = {
  getAllUsers,
  getRecruiterRequests,
  approveRecruiter,
  rejectRecruiter,
};