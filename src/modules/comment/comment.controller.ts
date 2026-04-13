import { Request, Response } from "express";
import { commentService } from "./comment.service";

const createComment = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.user.id;
    const { jobId, content, parentId } = req.body;

    if (!jobId || !content) {
      return res.status(400).json({
        success: false,
        message: "jobId and content are required",
      });
    }

    const comment = await commentService.createComment(
      userId,
      Number(jobId),
      content,
      parentId ? Number(parentId) : undefined,
    );

    return res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: comment,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
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
