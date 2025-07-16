import { PrismaClient } from "@prisma/client";
import { appEnv } from "./env.js";

export const prisma = new PrismaClient({
  datasourceUrl: appEnv.DATABASE_URL,
});
