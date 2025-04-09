const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Validate if Cloudinary is properly configured
if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error(
    "Cloudinary configuration is missing! Please check environment variables."
  );
}

// Function to upload an image to Cloudinary inside a gallery folder
const uploadImage = async (image, folder = "uploads/gallery") => {
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder, // Organize uploads in a specific folder
      public_id: `img_${Date.now()}`,
    });
    return result; // includes secure_url, public_id, etc.
  } catch (error) {
    console.error("Image upload failed:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

// Function to delete an image from Cloudinary
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Image deletion failed:", error);
    throw new Error("Failed to delete image from Cloudinary");
  }
};

// Function to get optimized image URL
const getOptimizedImageUrl = (publicId) => {
  return cloudinary.url(publicId, {
    fetch_format: "auto",
    quality: "auto",
  });
};

// Function to get auto-cropped image URL
const getAutoCropUrl = (publicId, width = 500, height = 500) => {
  return cloudinary.url(publicId, {
    crop: "auto",
    gravity: "auto",
    width,
    height,
  });
};

module.exports = {
  uploadImage,
  deleteImage,
  getOptimizedImageUrl,
  getAutoCropUrl,
};