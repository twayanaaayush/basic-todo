import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string(),
  DB_URI: z.string(),
});

const envVars = envSchema.safeParse(process.env);

if (!envVars.success) {
  console.error(
    "Environment variable validation error:",
    envVars.error.format()
  );
  throw new Error("Environment validation error");
}

export const config = {
  port: envVars.data.PORT,
  jwtSecret: envVars.data.JWT_SECRET,
  dbUri: envVars.data.DB_URI,
};
