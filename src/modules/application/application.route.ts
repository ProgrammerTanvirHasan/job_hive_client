import express from "express";
import { applicationController } from "./application.controller";
import { authMiddleware } from "../../middleware/authMiddleware";
import { Role } from "../../../generated/prisma";

const router = express.Router();
router.post("/", authMiddleware(Role.USER), applicationController.applyJob);
router.get(
  "/",
  authMiddleware(Role.USER),
  applicationController.getApplications,
);
///////////////

router.get(
  "/not-applied",
  authMiddleware(Role.USER),
  applicationController.getNotAppliedJobs,
);
/////////////////////////////
router.get(
  "/job/:jobId",
  authMiddleware(Role.RECRUITER, Role.ADMIN),
  applicationController.getApplicationsByJob,
);

export const applicationRouter = router;
