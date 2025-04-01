const Gallery = require("../models/galleryModel");
const Event = require("../models/eventModel");
const { uploadImage } = require("../utils/cloudinary"); // use your existing function
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const createOrUpdateGallery = async (req, res) => {
  try {
    const { event, captions = [] } = req.body;

    if (!event) {
      return res.status(400).json({ error: "Event ID is required." });
    }

    const eventExists = await Event.findById(event);
    if (!eventExists) {
      return res.status(404).json({ error: "Event not found." });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images uploaded." });
    }

    const images = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];

      const result = await uploadImage(file.path, "uploads/gallery");

      images.push({
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
        uploadedAt: new Date(result.created_at),
        caption: captions[i] || "",
      });

      // Cleanup temp file
      fs.unlink(file.path, (err) => {
        if (err) console.error("Temp file deletion failed:", err);
      });
    }

    // 🔍 Check if gallery already exists for this event
    let gallery = await Gallery.findOne({ event });

    if (gallery) {
      // 🛠️ Update: Add new images to existing gallery
      gallery.images.push(...images);
      const updated = await gallery.save();

      return res.status(200).json({
        message: "Gallery updated with new images 🎉",
        data: updated,
      });
    } else {
      // ✨ Create new gallery
      const newGallery = new Gallery({ event, images });
      const saved = await newGallery.save();

      return res.status(201).json({
        message: "Gallery created successfully 🎨",
        data: saved,
      });
    }
  } catch (error) {
    console.error("Error creating/updating gallery:", error);
    res.status(500).json({ error: "Gallery operation failed 💥" });
  }
};

const deleteGalleryImage = async (req, res) => {
  try {
    const { eventId, publicId } = req.body;

    if (!eventId || !publicId) {
      return res
        .status(400)
        .json({ error: "eventId and publicId are required." });
    }

    // 1. Delete image from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // 2. Remove image from gallery.images[] in MongoDB
    const updatedGallery = await Gallery.findOneAndUpdate(
      { event: eventId },
      { $pull: { images: { public_id: publicId } } },
      { new: true }
    );

    if (!updatedGallery) {
      return res
        .status(404)
        .json({ error: "Gallery not found for this event." });
    }

    res.status(200).json({
      message: "Image deleted from gallery 🎯",
      gallery: updatedGallery,
    });
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    res.status(500).json({ error: "Failed to delete image from gallery." });
  }
};

const deleteGalleryByEventId = async (req, res) => {
  try {
    const { eventId } = req.params;

    // 1. Find the gallery by event
    const gallery = await Gallery.findOne({ event: eventId });

    if (!gallery) {
      return res
        .status(404)
        .json({ error: "Gallery not found for this event 😢" });
    }

    // 2. Delete images from Cloudinary
    const deletePromises = gallery.images.map((img) =>
      cloudinary.uploader.destroy(img.public_id)
    );
    await Promise.all(deletePromises);

    // 3. Delete gallery from MongoDB
    await Gallery.deleteOne({ _id: gallery._id });

    res.status(200).json({
      message:
        "Gallery deleted successfully along with its beautiful memories 📸💔",
    });
  } catch (error) {
    console.error("Error deleting gallery:", error);
    res.status(500).json({ error: "Failed to delete gallery 😓" });
  }
};

// get all galleries for an event algog with images and captions and event details.
const getAllGalleriesWithEvent = async (req, res) => {
  try {
    // 1. Fetch all galleries and populate their associated event
    const galleries = await Gallery.find().populate("event");

    res.status(200).json({
      message: "All galleries with their lovely events ✨",
      data: galleries,
    });
  } catch (error) {
    console.error("Error fetching galleries with events:", error);
    res.status(500).json({ error: "Failed to fetch gallery list 😢" });
  }
};

// get gallery by event id along with images and captions and event details.
const getGalleryByEventId = async (req, res) => {
  try {
    const { eventId } = req.params;

    // 1. Find gallery by event ID and populate the event details
    const gallery = await Gallery.findOne({ event: eventId }).populate("event");

    if (!gallery) {
      return res.status(404).json({ error: "No gallery found for this event 😢" });
    }

    res.status(200).json({
      message: "Gallery found for the event 📸✨",
      data: gallery,
    });
  } catch (error) {
    console.error("Error fetching gallery by event ID:", error);
    res.status(500).json({ error: "Failed to fetch gallery 📉" });
  }
};

module.exports = {
  createOrUpdateGallery,
  deleteGalleryImage,
  deleteGalleryByEventId,
  getAllGalleriesWithEvent,
  getGalleryByEventId,
};
