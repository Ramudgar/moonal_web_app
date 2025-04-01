const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "Image URL is required"], // usually secure_url from Cloudinary
  },
  public_id: {
    type: String,
    required: [true, "Public ID is required"], // needed to delete or transform image via Cloudinary
  },
  format: String,
  width: Number,
  height: Number,
  caption: {
    type: String,
    default: "",
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const gallerySchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: [true, "Event is required"],
  },
  images: [imageSchema], // embed multiple images per gallery
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Gallery = mongoose.model("Gallery", gallerySchema);
module.exports = Gallery;
