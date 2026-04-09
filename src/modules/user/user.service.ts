import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  return prisma.user.findMany();
};

const getUserById = async (id: number) => {
  return prisma.user.findUnique({ where: { id } });
};

const updateUser = async (id: number, data: any) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

const deleteUser = async (id: number) => {
  return prisma.user.delete({ where: { id } });
};

export const userService = {
  getAllUsers,
  updateUser,
  getUserById,
  deleteUser,
};
