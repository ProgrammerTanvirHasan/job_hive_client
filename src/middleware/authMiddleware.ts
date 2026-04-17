import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";
import { Role, UserStatus } from "../../generated/prisma";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        name?: string | null;
        email: string;
        role: Role;
      };
    }
  }
}

export const authMiddleware = (...allowedRoles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers as HeadersInit,
      });

      if (!session || !session.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const userId = Number(session.user.id);

      if (isNaN(userId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid user ID",
        });
      }

      const dbUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!dbUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (dbUser.status !== UserStatus.ACTIVE) {
        return res.status(403).json({
          success: false,
          message:
            dbUser.status === UserStatus.BANNED
              ? "Account is banned"
              : "Account is deactivated",
        });
      }

      req.user = {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
      };

      if (allowedRoles.length > 0 && !allowedRoles.includes(dbUser.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: insufficient permissions",
        });
      }

      next();
    } catch (error) {
      console.error("Auth Middleware Error:", error);

      return res.status(500).json({
        success: false,
        message: "Authentication failed",
      });
    }
  };
};
