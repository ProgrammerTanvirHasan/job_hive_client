import express from "express";
import { applicationController } from "./application.controller";

const router = express.Router();
router.post("/", applicationController.applyJob);
router.get("/", applicationController.getApplications);
router.get("/:id", applicationController.getApplicationsByJob);
export const applicationRouter = router;
