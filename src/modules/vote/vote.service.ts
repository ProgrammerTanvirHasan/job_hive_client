import { prisma } from "../../lib/prisma";

export const voteJob = async (
  userId: number,
  jobId: number,
  type: "UP" | "DOWN",
) => {
  try {
    return await prisma.vote.upsert({
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
  } catch (error) {
    throw new Error("Failed to vote job");
  }
};
