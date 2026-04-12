import { Request, Response } from "express";
import * as paymentService from "./payment.service";

export const createPaymentController = async (req: Request, res: Response) => {
  const { jobId, amount } = req.body;
  const userId = req.user.id;
  const payment = await paymentService.createPayment(userId, jobId, amount);
  res.json(payment);
};
