import express from "express";
import { loginController, registerController } from "./auth.controller";

const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);
export const authRouter = router;
