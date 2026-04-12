import { prisma } from "../../lib/prisma";

const createComment = async (
  userId: number,
  jobId: number,
  content: string,
  parentId?: number,
) => {
  return prisma.comment.create({ data: { userId, jobId, content, parentId } });
};

const getCommentsByJob = async (jobId: number) => {
  return prisma.comment.findMany({
    where: { jobId },
    include: { replies: true },
  });
};

export const commentService = {
  createComment,
  getCommentsByJob,
};
