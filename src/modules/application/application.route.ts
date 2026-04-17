import express from "express";
import { applicationController } from "./application.controller";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = express.Router();
router.post("/", authMiddleware(), applicationController.applyJob);
router.get("/", authMiddleware(), applicationController.getApplications);
router.get(
  "/:id",
  authMiddleware(),
  applicationController.getApplicationsByJob,
);
export const applicationRouter = router;
