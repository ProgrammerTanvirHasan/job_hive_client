import { prisma } from "../../lib/prisma";

export const createPayment = async (
  userId: number,
  jobId: number,
  amount: number,
) => {
  return prisma.payment.create({
    data: { userId, jobId, amount, status: "SUCCESS" },
  });
};

export const getPayments = async () => prisma.payment.findMany();
