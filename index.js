import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors"; // Import CORS
import userRoutes from "./routes/userRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
