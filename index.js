import express from "express";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./routes/userRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
