import express from "express";
import { voteJobController } from "./vote.controller";

const router = express.Router();
router.post("/:jobId", voteJobController);
export const voteRouter = router;
