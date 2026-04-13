import { prisma } from "../../lib/prisma";

const createComment = async (
  userId: number,
  jobId: number,
  content: string,
  parentId?: number,
) => {
  try {
    return await prisma.comment.create({
      data: {
        userId,
        jobId,
        content,
        parentId,
      },
    });
  } catch (error) {
    throw new Error("Failed to create comment");
  }
};

const getCommentsByJob = async (jobId: number) => {
  try {
    return await prisma.comment.findMany({
      where: { jobId },
      include: {
        replies: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    throw new Error("Failed to fetch comments");
  }
};

export const commentService = {
  createComment,
  getCommentsByJob,
};
