import express from "express";
import { jobController } from "./job.controller";
import { authMiddleware } from "../../middleware/authMiddleware";
import { Role } from "../../../generated/prisma";

const router = express.Router();

router.get("/", jobController.getAllJob);
router.get("/:id", jobController.getJobById);

router.post(
  "/",
  authMiddleware(Role.USER, Role.RECRUITER),
  jobController.createJob,
);

router.patch(
  "/:id",
  authMiddleware(Role.RECRUITER, Role.ADMIN),
  jobController.updateJob,
);

router.delete(
  "/:id",
  authMiddleware(Role.RECRUITER, Role.ADMIN),
  jobController.deleteJob,
);

router.put(
  "/admin/:id/approve",
  authMiddleware(Role.ADMIN),
  jobController.approveJob,
);

router.put(
  "/admin/:id/reject",
  authMiddleware(Role.ADMIN),
  jobController.rejectJob,
);

export const jobRouter = router;
