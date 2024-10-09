import express from "express";
import {
  createVideo,
  deleteVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
} from "../controllers/video.js";

const router = express.Router();

router.get("/", getAllVideos);

router.get("/:id", getVideoById);

router.post("/", createVideo);

router.put("/:id", updateVideo);

router.delete("/:id", deleteVideo);

export default router;
