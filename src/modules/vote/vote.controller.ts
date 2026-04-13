import { Request, Response } from "express";
import * as voteService from "./vote.service";
import { voteSchema } from "./validation";

export const voteJobController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = Number(req.user.id);

    const parsed = voteSchema.parse({
      jobId: Number(req.params.jobId),
      type: req.body.type,
    });

    const vote = await voteService.voteJob(userId, parsed.jobId, parsed.type);

    return res.status(200).json({
      success: true,
      message: "Vote recorded successfully",
      data: vote,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.errors || error.message,
    });
  }
};
