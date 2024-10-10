import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// controllers/videoController.mjs
export const getAllVideos = async (req, res, prisma) => {
  try {
    const videos = await prisma.video.findMany();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

export const getVideoById = async (req, res, prisma) => {
  try {
    const video = await prisma.video.findUnique({
      where: { id: Number(req.params.id) },
      include: { user: true },
    });
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch video" });
  }
};

export const createVideo = async (req, res) => {
  try {
    const { title, description, url: videoUrl, thumbnail: thumbnailUrl } = req.body;
    const video = await prisma.video.create({
      data: {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        // uploadedBy can be added here if available
      },
    });
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ error: "Failed to create video" });
  }
};


export const updateVideo = async (req, res, prisma) => {
  try {
    const { title, description, videoUrl, thumbnailUrl } = req.body;
    const video = await prisma.video.update({
      where: { id: Number(req.params.id) },
      data: {
        title,
        description,
        videoUrl,
        thumbnailUrl,
      },
    });
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: "Failed to update video" });
  }
};

export const deleteVideo = async (req, res, prisma) => {
  try {
    const video = await prisma.video.delete({
      where: { id: Number(req.params.id) },
    });
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete video" });
  }
};
