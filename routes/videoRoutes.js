import express from "express";
import {
  createVideo,
  deleteVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
} from "../controllers/video.js";
import protectRoute from "../middlweare/protectedRoute.js";

const router = express.Router();

router.get("/", getAllVideos);

router.get("/:id", getVideoById);

router.post("/", protectRoute, createVideo);

router.put("/:id", protectRoute, updateVideo);

router.delete("/:id", protectRoute, deleteVideo);

export default router;
