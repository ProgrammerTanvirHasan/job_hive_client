import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUserController);
router.delete("/:id", userController.deleteUserController);

export const userRouter = router;
