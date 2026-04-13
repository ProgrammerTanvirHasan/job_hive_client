import { randomBytes } from "crypto";
import { scryptAsync } from "@noble/hashes/scrypt.js";

const config = {
  N: 16384,
  r: 16,
  p: 1,
  dkLen: 64,
  maxmem: 128 * 16384 * 16 * 2,
};

export const hashPassword = async (password: string) => {
  const salt = randomBytes(16).toString("hex");

  const key = await scryptAsync(password.normalize("NFKC"), salt, config);

  return `${salt}:${Buffer.from(key).toString("hex")}`;
};

export const verifyPassword = async (password: string, hash: string) => {
  const [salt, stored] = hash.split(":");

  const key = await scryptAsync(password.normalize("NFKC"), salt, config);

  return Buffer.from(key).toString("hex") === stored;
};
