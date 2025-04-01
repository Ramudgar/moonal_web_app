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
      // upload_preset: "your_upload_preset",//it is optional if you are using uploading image from server side code like nodejs then you needn't to use this
      folder, // Organize uploads in a specific folder
      public_id: `img_${Date.now()}`, // Use a unique ID
    });
    return result;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw new Error("Failed to upload image to Cloudinary");
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

// Example Usage
const optimizedUrl = getOptimizedImageUrl("gallery");
// console.log("Optimized URL:", optimizedUrl);

const autoCropUrl = getAutoCropUrl("gallery");
// console.log("Auto-Cropped URL:", autoCropUrl);

module.exports = { uploadImage, getOptimizedImageUrl, getAutoCropUrl };
