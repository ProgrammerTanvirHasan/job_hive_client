import express from "express";
import { voteJobController } from "./vote.controller";
import { authMiddleware } from "../../middleware/auth.Middleware";

const router = express.Router();

router.post("/:jobId", authMiddleware, voteJobController);

export const voteRouter = router;
