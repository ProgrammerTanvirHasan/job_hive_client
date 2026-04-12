import { Request, Response } from "express";
import * as voteService from "./vote.service";

export const voteJobController = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const jobId = Number(req.params.jobId);
  const { type } = req.body;
  const vote = await voteService.voteJob(userId, jobId, type);
  res.json(vote);
};
