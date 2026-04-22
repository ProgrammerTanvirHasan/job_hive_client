import { Role } from "../../../generated/prisma";
import { authMiddleware } from "../../middleware/authMiddleware";
import express from "express";
import { adminController } from "./admin.controller";
const router = express.Router();
router.get(
  "/dashboard",
  authMiddleware(Role.ADMIN),
  adminController.getDashboardStats,
);
router.delete(
  "/company/:company",
  authMiddleware(Role.ADMIN),
  adminController.deleteCompanyJobs,
);
export const adminRouter = router;
