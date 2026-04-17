import { prisma } from "../../lib/prisma";

const createComment = async (
  userId: number,
  jobId: number,
  content: string,
  parentId?: number,
) => {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  if (parentId) {
    const parent = await prisma.comment.findUnique({
      where: { id: parentId },
    });

    if (!parent) {
      throw new Error("Parent comment not found");
    }

    if (parent.jobId !== jobId) {
      throw new Error("Invalid parent comment");
    }
  }

  return prisma.comment.create({
    data: {
      userId,
      jobId,
      content,
      parentId,
    },
    include: {
      user: true,
    },
  });
};

const getCommentsByJob = async (jobId: number) => {
  try {
    return await prisma.comment.findMany({
      where: { jobId ,parentId: null},
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
