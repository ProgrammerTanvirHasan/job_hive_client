import { Request, Response } from "express";
import { paymentService } from "./payment.service";

/* ================= INIT ================= */
const initPayment = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { jobId } = req.body;

    const url = await paymentService.initPayment(userId, jobId);

    return res.json({
      success: true,
      url,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= SUCCESS ================= */
const success = async (req: Request, res: Response) => {
  try {
    const { tran_id, val_id } = req.body;

    await paymentService.paymentSuccess(tran_id, val_id);

    return res.redirect(`${process.env.FRONTEND_URL}/payment/success`);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= FAIL ================= */
const fail = async (req: Request, res: Response) => {
  try {
    const { tran_id } = req.body;

    await paymentService.paymentFail(tran_id);

    return res.redirect(`${process.env.FRONTEND_URL}/payment/fail`);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const ipn = async (req: Request, res: Response) => {
  try {
    await paymentService.handleIPN(req.body);
    res.send("OK");
  } catch {
    res.status(500).send("IPN error");
  }
};

export const paymentController = {
  initPayment,
  success,
  fail,
  ipn,
};
