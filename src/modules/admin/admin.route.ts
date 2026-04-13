import express from "express";
import { adminController } from "./admin.controller";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = express.Router();

router.get(
  "/users",
  authMiddleware(),

  adminController.getAllUsers,
);

router.get(
  "/recruiter-requests",
  authMiddleware(),

  adminController.getRecruiterRequests,
);

router.put(
  "/recruiter/:id/approve",
  authMiddleware(),

  adminController.approveRecruiter,
);

router.put(
  "/recruiter/:id/reject",
  authMiddleware(),

  adminController.rejectRecruiter,
);

export const adminRouter = router;
