import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";

export enum UserRole {
  ADMIN = "ADMIN",
  RECRUITER = "RECRUITER",
  USER = "USER",
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name?: string | null;
        email: string;
        role: UserRole;
      };
    }
  }
}

export const authMiddleware = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers as any,
      });

      if (!session || !session.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const dbUser = await prisma.user.findUnique({
        where: { id: Number(session.user.id) },
        select: { status: true, role: true },
      });

      if (!dbUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (dbUser.status === "BANNED") {
        return res.status(403).json({
          success: false,
          message: "Account is suspended",
        });
      }

      req.user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: dbUser.role as UserRole,
      };

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: insufficient permissions",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Authentication failed",
      });
    }
  };
};
