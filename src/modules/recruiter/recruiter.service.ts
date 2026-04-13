import { prisma } from "../../lib/prisma";

const applyRecruiter = async (userId: number, data: any) => {
  const existing = await prisma.recruiterRequest.findFirst({
    where: {
      userId,
      status: "PENDING",
    },
  });

  if (existing) {
    throw new Error("Already applied");
  }

  return prisma.recruiterRequest.create({
    data: {
      userId,
      company: data.company,
      experience: data.experience,
    },
  });
};

const getMyRequest = async (userId: number) => {
  return prisma.recruiterRequest.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const recruiterService = {
  applyRecruiter,
  getMyRequest,
};
