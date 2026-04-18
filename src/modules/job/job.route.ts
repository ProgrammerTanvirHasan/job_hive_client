import express from "express";
import { jobController } from "./job.controller";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = express.Router();

router.get("/", jobController.getAllJob);
router.get("/:id", jobController.getJobById);

router.post("/", authMiddleware(), jobController.createJob);
router.put("/:id", authMiddleware(), jobController.updateJob);
router.delete("/:id", authMiddleware(), jobController.deleteJob);

router.put(
  "/admin/:id/approve",
  authMiddleware("ADMIN"),
  jobController.approveJob,
);
router.put(
  "/admin/:id/reject",
  authMiddleware("ADMIN"),
  jobController.rejectJob,
);

export const jobRouter = router;
