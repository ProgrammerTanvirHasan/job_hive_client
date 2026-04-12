import express from "express";
import { commentController } from "./comment.controller";

const router = express.Router();
router.post("/", commentController.createComment);
router.get("/:jobId", commentController.getComments);
export const commentRouter = router;
