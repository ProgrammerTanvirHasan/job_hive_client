import { randomBytes } from "crypto";
import { scryptAsync } from "@noble/hashes/scrypt.js";
import { prisma } from "../lib/prisma";

const SCRYPT_CONFIG = {
  N: 16384,
  r: 16,
  p: 1,
  dkLen: 64,
  maxmem: 128 * 16384 * 16 * 2,
};

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");

  const key = await scryptAsync(
    password.normalize("NFKC"),
    salt,
    SCRYPT_CONFIG,
  );

  const keyHex = Buffer.from(key).toString("hex");

  return `${salt}:${keyHex}`;
}

async function seedAdmin() {
  try {
    const adminEmail = "tanvir129@gmail.com";

    const existing = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existing) {
      console.log("⚠️ Admin already exists");
      return;
    }

    const hashedPassword = await hashPassword("tanvir129");

    await prisma.user.create({
      data: {
        name: "Tanvir",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("✅ Admin seeded successfully");
  } catch (error) {
    console.error("❌ Failed to seed admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
