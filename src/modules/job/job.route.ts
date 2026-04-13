import express from "express";
import { jobController } from "./job.controller";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/",
  authMiddleware(),

  jobController.createJob,
);

router.get("/", jobController.getAllJob);

router.get("/:id", jobController.getJobById);

router.put(
  "/:id",
  authMiddleware(),

  jobController.updateJob,
);

router.delete(
  "/:id",
  authMiddleware(),

  jobController.deleteJob,
);

router.put(
  "/:id/approve",
  authMiddleware(),

  jobController.approveJob,
);

router.put(
  "/:id/reject",
  authMiddleware(),

  jobController.rejectJob,
);

export const jobRouter = router;
