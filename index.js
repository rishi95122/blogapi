import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import userRoutes from "./routes/userRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";

// Initialize Prisma
const prisma = new PrismaClient();

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Apply middleware
app.use(helmet()); // Security headers
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000", // Update with allowed origin
    credentials: true,
  })
);
app.use(
  compression({
    threshold: 0, // Compress all responses
    level: 9, // Maximum compression level
  })
);
// Compress all responses
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter); // Apply rate limiter to all requests

// Routes
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);

// Server and Port configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is runndsadsadsaing on http://localhost:${PORT}`);
});

// Handle Prisma shutdown gracefully
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
