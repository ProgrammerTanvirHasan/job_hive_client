import { Role } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";

const getDashboardStats = async () => {
  const [totalUsers, totalJobs, pendingJobs] = await prisma.$transaction([
    prisma.user.count(),
    prisma.job.count(),
    prisma.job.count({
      where: {
        status: "PENDING",
      },
    }),
  ]);

  return {
    totalUsers,
    totalJobs,
    pendingJobs,
  };
};
//////////////////////////////
const deleteJobsByCompany = async (company: string, role: string) => {
  if (role !== Role.ADMIN) {
    throw new Error("Not authorized");
  }

  const deleted = await prisma.job.deleteMany({
    where: {
      company,
    },
  });

  if (deleted.count === 0) {
    throw new Error("No jobs found for this company");
  }

  return deleted;
};
export const adminService = {
  getDashboardStats,
  deleteJobsByCompany,
};
