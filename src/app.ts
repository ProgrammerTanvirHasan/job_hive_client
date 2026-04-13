import express, { Application, Request, Response } from "express";

import cors from "cors";
import { applicationRouter } from "./modules/application/application.route";

import { commentRouter } from "./modules/comment/comment.route";
import { jobRouter } from "./modules/job/job.route";
import { paymentRouter } from "./modules/payment/payment.route";
import { userRouter } from "./modules/user/user.route";
import { voteRouter } from "./modules/vote/vote.route";
import { authRouter } from "./modules/auth/auth.route";
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import cookieParser from "cookie-parser";
const app: Application = express();

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

const frontendOrigin =
  process.env.FRONTEND_URL || process.env.CLIENT_URL || "http://localhost:3000";

app.use(
  cors({
    origin: frontendOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json());

app.use("/api/application", applicationRouter);
app.use("/api/auth", authRouter);
app.use("/api/comment", commentRouter);
app.use("/api/job", jobRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/user", userRouter);
app.use("/api/vote", voteRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!!");
});

app.use(notFound);

app.use(globalErrorHandler);

export default app;
