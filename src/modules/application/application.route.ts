import express from "express";
import { applicationController } from "./application.controller";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = express.Router();
router.post("/", authMiddleware(), applicationController.applyJob);
router.get("/", applicationController.getApplications);
router.get("/:id", applicationController.getApplicationsByJob);
export const applicationRouter = router;
