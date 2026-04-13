import express from "express";
import { jobController } from "./job.controller";
import { authMiddleware } from "../../middleware/auth.Middleware";
import { requireRole } from "../../middleware/role.middleware";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  requireRole(["RECRUITER", "ADMIN"]),
  jobController.createJob,
);

router.get("/", jobController.getAllJob);

router.get("/:id", jobController.getJobById);

router.put(
  "/:id",
  authMiddleware,
  requireRole(["RECRUITER", "ADMIN"]),
  jobController.updateJob,
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole(["RECRUITER", "ADMIN"]),
  jobController.deleteJob,
);

router.put(
  "/:id/approve",
  authMiddleware,
  requireRole("ADMIN"),
  jobController.approveJob,
);

router.put(
  "/:id/reject",
  authMiddleware,
  requireRole("ADMIN"),
  jobController.rejectJob,
);

export const jobRouter = router;
