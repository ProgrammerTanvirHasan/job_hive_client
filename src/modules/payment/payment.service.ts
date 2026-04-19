import SSLCommerzPayment from "sslcommerz-lts";
import { prisma } from "../../lib/prisma";
import { randomUUID } from "crypto";
import { PaymentStatus } from "../../../generated/prisma";

const store_id = process.env.SSL_STORE_ID!;
const store_passwd = process.env.SSL_STORE_PASSWORD!;
const is_live = false;

/* ================= INIT PAYMENT ================= */
const initPayment = async (userId: string, jobId: number) => {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job) throw new Error("Job not found");

  if (!job.isPaid) {
    throw new Error("This job is not paid");
  }

  // 🔥 prevent duplicate successful payment
  const existing = await prisma.payment.findFirst({
    where: {
      userId,
      jobId,
      status: PaymentStatus.SUCCESS,
    },
  });

  if (existing) {
    throw new Error("You already paid for this job");
  }

  const transactionId = `TXN_${randomUUID()}`;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("User not found");

  await prisma.payment.create({
    data: {
      transactionId,
      amount: job.price!,
      currency: "BDT",
      userId,
      jobId,
      status: PaymentStatus.PENDING,
      gateway: "SSLCommerz",
    },
  });

  const data = {
    total_amount: Number(job.price),
    currency: "BDT",
    tran_id: transactionId,

    success_url: `${process.env.BASE_URL}/api/payment/success`,
    fail_url: `${process.env.BASE_URL}/api/payment/fail`,
    cancel_url: `${process.env.BASE_URL}/api/payment/cancel`,
    ipn_url: `${process.env.BASE_URL}/api/payment/ipn`,

    product_name: job.title,
    product_category: job.category,
    product_profile: "general",

    cus_name: user.name || "Unknown",
    cus_email: user.email,
    cus_add1: "Dhaka",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    cus_phone: "01700000000",
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  const response = await sslcz.init(data);

  if (!response?.GatewayPageURL) {
    throw new Error("Payment gateway failed");
  }

  return response.GatewayPageURL;
};

/* ================= SUCCESS ================= */
const paymentSuccess = async (transactionId: string, valId?: string) => {
  const payment = await prisma.payment.findUnique({
    where: { transactionId },
  });

  if (!payment) throw new Error("Payment not found");

  return prisma.payment.update({
    where: { transactionId },
    data: {
      status: PaymentStatus.SUCCESS,
      valId: valId ?? null,
      isVerified: true,
    },
  });
};

/* ================= FAIL ================= */
const paymentFail = async (transactionId: string) => {
  const payment = await prisma.payment.findUnique({
    where: { transactionId },
  });

  if (!payment) throw new Error("Payment not found");

  return prisma.payment.update({
    where: { transactionId },
    data: {
      status: PaymentStatus.FAILED,
      isVerified: false,
    },
  });
};

/* ================= IPN ================= */
const handleIPN = async (data: any) => {
  const { tran_id, status, val_id } = data;

  const payment = await prisma.payment.findUnique({
    where: { transactionId: tran_id },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  if (status === "VALID") {
    return prisma.payment.update({
      where: { transactionId: tran_id },
      data: {
        status: PaymentStatus.SUCCESS,
        valId: val_id,
        isVerified: true,
      },
    });
  }

  return prisma.payment.update({
    where: { transactionId: tran_id },
    data: {
      status: PaymentStatus.FAILED,
      isVerified: false,
    },
  });
};

export const paymentService = {
  initPayment,
  paymentSuccess,
  paymentFail,
  handleIPN,
};
