import jwt, { JwtPayload } from "jsonwebtoken";
import { JwtUser } from "../types/jwt";

export const generateToken = (user: JwtUser) => {
  return jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string): JwtUser => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as
    | JwtPayload
    | string;

  if (typeof decoded === "string") {
    throw new Error("Invalid token");
  }

  return decoded as JwtUser;
};
