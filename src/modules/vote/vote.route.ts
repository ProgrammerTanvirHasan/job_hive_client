import express from "express";
import { voteController } from "./vote.controller";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = express.Router();

router.post("/:jobId", authMiddleware(), voteController.voteJob);
router.get("/:jobId", voteController.getVoteCount);

export const voteRouter = router;
