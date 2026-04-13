import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  return prisma.user.findMany({
    where: {
      status: "ACTIVE",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user || user.status !== "ACTIVE") {
    throw new Error("User not found");
  }

  return user;
};

const updateUser = async (id: number, data: any) => {
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser || existingUser.status !== "ACTIVE") {
    throw new Error("User not found or inactive");
  }

  return prisma.user.update({
    where: { id },
    data,
  });
};

const deleteUser = async (id: number) => {
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  if (existingUser.status === "INACTIVE") {
    throw new Error("User already deactivated");
  }

  return prisma.user.update({
    where: { id },
    data: {
      status: "INACTIVE",
    },
  });
};

const restoreUser = async (id: number) => {
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  return prisma.user.update({
    where: { id },
    data: {
      status: "ACTIVE",
    },
  });
};

export const userService = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  restoreUser,
};
