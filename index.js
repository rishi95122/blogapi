import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
import compression from "compression";
import helmet from "helmet";

import userRoutes from "./routes/userRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import cluster from "cluster";
import os from "os";

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(`Primary ${process.pid} is running`);
  console.log(`Forking ${numCPUs} workers...\n`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
    cluster.fork();
  });
} else {
  const prisma = new PrismaClient();

  dotenv.config();

  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(
    compression({
      threshold: 0,
      level: 9,
    })
  );

  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/users", userRoutes);
  app.use("/api/videos", videoRoutes);

  const PORT = process.env.PORT || 2000;
  app.listen(PORT, () => {
    console.log(`Server is runndsadsadsaing on http://localhost:${PORT}`);
  });

  process.on("SIGINT", async () => {
    console.log("Shutting down server...");
    await prisma.$disconnect();
    process.exit(0);
  });
  process.on("SIGTERM", async () => {
    console.log("Shutting down server...");
    await prisma.$disconnect();
    process.exit(0);
  });
}
