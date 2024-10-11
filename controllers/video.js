import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllVideos = async (req, res) => {
  try {
    const videos = await prisma.video.findMany();
    return res.json(videos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

export const getVideoById = async (req, res) => {
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
  const uploadedBy = req.uploadedBy;
  try {
    const { title, description, videoUrl, thumbnailUrl } = req.body;

    const video = await prisma.video.create({
      data: {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        uploadedBy,
      },
    });
    res.status(201).json(video);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create video" });
  }
};

export const updateVideo = async (req, res) => {
  const uploadedBy = req.uploadedBy;
  try {
    const { title, description, videoUrl, thumbnailUrl } = req.body;
    const video = await prisma.video.update({
      where: { id: Number(req.params.id) },
      data: {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        uploadedBy,
      },
    });
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: "Failed to update video" });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const video = await prisma.video.delete({
      where: { id: Number(req.params.id) },
    });
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete video" });
  }
};
