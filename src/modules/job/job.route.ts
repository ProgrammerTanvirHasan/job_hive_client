import express from "express";
import { jobController } from "./job.controller";

const router = express.Router();
router.post("/", jobController.createJob);
router.get("/", jobController.getAllJob);
router.get("/:id", jobController.getJobById);
router.put("/:id", jobController.updateJob);
router.delete(
  "/:id",

  jobController.deleteJob,
);
router.put(
  "/:id/approve",

  jobController.approveJob,
);
router.put(
  "/:id/reject",

  jobController.rejectJob,
);
export const jobRouter = router;
