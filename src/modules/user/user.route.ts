import express from "express";
import { userController } from "./user.controller";
import { authMiddleware } from "../../middleware/authMiddleware";
import { Role } from "../../../generated/prisma";

const router = express.Router();

router.get("/", authMiddleware(Role.ADMIN), userController.getAllUsers);

router.get("/:id", authMiddleware(), userController.getUser);

router.put("/:id", authMiddleware(), userController.updateUserController);
router.delete(
  "/:id",
  authMiddleware(Role.ADMIN),
  userController.deleteUserController,
);
router.patch(
  "/restore/:id",
  authMiddleware(Role.ADMIN),
  userController.restoreUserController,
);

export const userRouter = router;
