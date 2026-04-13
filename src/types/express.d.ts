declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        name?: string | null;
        email: string;
        role: UserRole;
      };
    }
  }
}
