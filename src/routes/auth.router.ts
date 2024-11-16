import express from "express";
import { signinController, signupController } from "@/controllers";
import { signinSchema, signupSchema } from "@/dtos";
import { dtoValidationMiddleware, tryCatchWrapper } from "@/middlewares";

export const authRouter = express.Router();

authRouter.post(
  "/signup",
  dtoValidationMiddleware(signupSchema),
  tryCatchWrapper(signupController)
);
authRouter.post(
  "/signin",
  dtoValidationMiddleware(signinSchema),
  tryCatchWrapper(signinController)
);
