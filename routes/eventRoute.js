const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createEventWithGallery,
  updateEvent,
  getAllEventsWithGallery,
  getEventByIdWithGallery,
  deleteEventWithGallery,
  deleteAllEventsWithGalleries,
  updateEventWithGallery,
} = require("../controllers/eventController");
const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorizeMiddleware");

const upload = multer({ dest: "temp/" });

// @ route POST /api/v1/events/create
// @ desc Update an existing event
// @ access Private
router.post(
  "/create",
  upload.array("images"),
  protect,
  authorize("admin"),
  createEventWithGallery
);

// @ route POST /api/v1/events/update-with-gallery/:id
// @ desc Update an existing event with gallery
// @ access Private
router.put(
  "/update-with-gallery/:id",
  upload.array("images"),
  protect,
  authorize("admin"),
  updateEventWithGallery
);

// @ route PUT /api/v1/events/update/:id
// @ desc Update an existing event
// @ access Private
router.put("/update/:id", upload.array("images"), updateEvent);

// @ route GET /api/v1/events/all-with-gallery
// @ desc Get all events
// @ access Public
router.get("/all-with-gallery", getAllEventsWithGallery);

// @ route GET /api/v1/events/:id
// @ desc Get an event by id
// @ access Public
router.get("/:id", getEventByIdWithGallery);

// @ route DELETE /api/v1/events/:id
// @ desc Delete an event by id
// @ access Private
router.delete("/:id", deleteEventWithGallery);

// @ route DELETE /api/v1/events
// @ desc Delete all events
// @ access Private
router.delete("/", deleteAllEventsWithGalleries);

// export the router
module.exports = router;
