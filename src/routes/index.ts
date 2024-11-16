import express, { Request, Response } from "express";
import { authRouter } from "@routes/auth.router";
import { taskRouter } from "@/routes/task.router";
import { authenticationMiddleware } from "@/middlewares";
import { rateLimitMiddleware } from "@/middlewares/rate-limit.middleware";

export const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  res.status(200).json({ message: "Running", timestamp: Date.now() });
});

router.use("/auth", rateLimitMiddleware(100, 60e3), authRouter);
router.use(
  "/tasks",
  rateLimitMiddleware(1000, 60e3),
  authenticationMiddleware,
  taskRouter
);
