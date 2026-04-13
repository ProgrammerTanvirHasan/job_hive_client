import { Request, Response } from "express";
import * as voteService from "./vote.service";

export const voteJobController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.user.id;
    const jobId = Number(req.params.jobId);
    const { type } = req.body;

    if (!type || !["UP", "DOWN"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vote type",
      });
    }

    const vote = await voteService.voteJob(userId, jobId, type);

    return res.status(200).json({
      success: true,
      message: "Vote recorded successfully",
      data: vote,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
