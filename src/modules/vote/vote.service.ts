import { prisma } from "../../lib/prisma";

export const voteJob = async (
  userId: number,
  jobId: number,
  type: "UP" | "DOWN",
) => {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  if (job.status !== "APPROVED") {
    throw new Error("You can only vote approved jobs");
  }

  if (job.recruiterId === userId) {
    throw new Error("You cannot vote your own job");
  }

  return prisma.vote.upsert({
    where: {
      userId_jobId: { userId, jobId },
    },
    update: {
      type,
    },
    create: {
      userId,
      jobId,
      type,
    },
  });
};
