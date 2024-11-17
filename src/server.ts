import path from "path";
import helmet from "helmet";
import express, { Request, Response } from "express";

import { config } from "./config";
import {
  errorHandlerMiddleware,
  corsHandlerMiddleware,
} from "@middlewares/index";
import { router } from "@routes/index";
import mongoose from "mongoose";

const app = express();
const port = config.port;
const dbUri = config.dbUri;

// Static files and view engine
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(helmet());
app.use(corsHandlerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);

app.use("/api/", router);
app.use(errorHandlerMiddleware);

mongoose
  .connect(dbUri)
  .then((res) => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

process.on("SIGINT", () => {
  console.log("SIGINT: Server is shutting down...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM: Server is shutting down...");
  process.exit(0);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled rejection at:", promise, "reason:", reason);
  process.exit(1);
});
