import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import { recruiterController } from "./recruiter.controller";

const router = express.Router();

router.post(
  "/apply",
  authMiddleware(),

  recruiterController.applyRecruiter,
);

router.get("/me", authMiddleware(), recruiterController.getMyRequest);

export const recruiterRouter = router;
