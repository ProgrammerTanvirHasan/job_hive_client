import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { hashPassword, verifyPassword } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";

export const registerUser = async (data: any) => {
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existing) {
    throw new Error("User already exists");
  }

  const hashed = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashed,
      role: "USER",
    },
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const valid = await verifyPassword(password, user.password);

  if (!valid) throw new Error("Invalid credentials");

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role as any,
  });

  return {
    user,
    token,
  };
};
