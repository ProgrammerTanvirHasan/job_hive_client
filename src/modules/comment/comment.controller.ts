import { Request, Response } from "express";
import { commentService } from "./comment.service";

const createComment = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { jobId, content, parentId } = req.body;
  const comment = await commentService.createComment(
    userId,
    jobId,
    content,
    parentId,
  );
  res.json(comment);
};

const getComments = async (req: Request, res: Response) => {
  const jobId = Number(req.params.jobId);
  const comments = await commentService.getCommentsByJob(jobId);
  res.json(comments);
};

export const commentController = {
  createComment,
  getComments,
};
