const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createOrUpdateGallery,
  deleteGalleryImage,
  deleteGalleryByEventId,
  getAllGalleriesWithEvent,
  getGalleryByEventId,
} = require("../controllers/galleryController");

const upload = multer({ dest: "temp/" });

// @ route POST /api/v1/gallery/create
// @ desc Create a new gallery
// @ access Private
router.post("/", upload.array("images"), createOrUpdateGallery);

// @ route DELETE /api/v1/gallery/delete-image/public_id
// @ desc Delete an image by public_id
// @ access Private
router.delete("/delete-image/public_id", deleteGalleryImage);

// @ route DELETE /api/v1/gallery/delete/:id
// @ desc Delete a gallery by id
// @ access Private
router.delete("/delete/:eventId", deleteGalleryByEventId);

// @ route GET /api/v1/gallery/all-with-event
// @ desc Get all galleries with event populated
// @ access Public
router.get("/all-with-event", getAllGalleriesWithEvent);

// @ route GET /api/v1/gallery/:eventId
// @ desc Get gallery by event id
// @ access Public
router.get("/:eventId", getGalleryByEventId);

// export the router
module.exports = router;
