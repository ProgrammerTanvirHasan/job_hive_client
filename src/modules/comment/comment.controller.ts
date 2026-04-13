import { Request, Response } from "express";
import { commentSchema } from "./validation";
import { commentService } from "./comment.service";

const createComment = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = Number(req.user.id);

    const parsed = commentSchema.parse({
      jobId: Number(req.body.jobId),
      content: req.body.content,
      parentId: req.body.parentId ? Number(req.body.parentId) : undefined,
    });

    const comment = await commentService.createComment(
      userId,
      parsed.jobId,
      parsed.content,
      parsed.parentId,
    );

    return res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: comment,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.errors || error.message,
    });
  }
};
const getComments = async (req: Request, res: Response) => {
  try {
    const jobId = Number(req.params.jobId);

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Invalid jobId",
      });
    }

    const comments = await commentService.getCommentsByJob(jobId);

    return res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch comments",
    });
  }
};

export const commentController = {
  createComment,
  getComments,
};
