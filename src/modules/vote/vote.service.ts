import { prisma } from "../../lib/prisma";

export const voteJob = async (
  userId: number,
  jobId: number,
  type: "UP" | "DOWN",
) => {
  return prisma.vote.upsert({
    where: { userId_jobId: { userId, jobId } },
    update: { type },
    create: { userId, jobId, type },
  });
};
