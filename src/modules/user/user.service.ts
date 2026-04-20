import { UserStatus } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.status === UserStatus.BANNED) {
    throw new Error("User is banned");
  }

  return user;
};

const updateUser = async (
  id: string,
  data: {
    name?: string;
    image?: string;
  },
) => {
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  if (existingUser.status !== UserStatus.ACTIVE) {
    throw new Error("User is not active");
  }

  return prisma.user.update({
    where: { id },
    data: {
      name: data.name,
      image: data.image,
    },
  });
};

const deleteUser = async (id: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  if (existingUser.status === UserStatus.INACTIVE) {
    throw new Error("User already deactivated");
  }

  return prisma.user.update({
    where: { id },
    data: {
      status: UserStatus.INACTIVE,
    },
  });
};

const restoreUser = async (id: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  return prisma.user.update({
    where: { id },
    data: {
      status: UserStatus.ACTIVE,
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
