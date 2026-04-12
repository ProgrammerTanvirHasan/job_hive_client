import express from "express";
import { createPaymentController } from "./payment.controller";

const router = express.Router();
router.post("/", createPaymentController);
export const paymentRouter = router;
