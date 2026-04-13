import { Request, Response, NextFunction } from "express";

export const requireRole = (roles: string | string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const allowed = Array.isArray(roles) ? roles : [roles];

    if (!allowed.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};
