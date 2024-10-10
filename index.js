import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";  // Import CORS
import userRoutes from "./routes/userRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());



// Routes
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
