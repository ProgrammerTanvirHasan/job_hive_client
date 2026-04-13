import express from "express";
import { commentController } from "./comment.controller";
import { authMiddleware } from "../../middleware/auth.Middleware";

const router = express.Router();

router.post("/", authMiddleware, commentController.createComment);
router.get("/:jobId", commentController.getComments);

export const commentRouter = router;
