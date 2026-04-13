export type JwtUser = {
  id: number;
  email: string;
  role: "ADMIN" | "RECRUITER" | "USER";
};
