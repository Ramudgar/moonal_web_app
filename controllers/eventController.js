const Event = require("../models/eventModel");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const Gallery = require("../models/galleryModel");
const { uploadImage } = require("../utils/cloudinary");

// Create Event + Gallery Together
const createEventWithGallery = async (req, res) => {
  try {
    const {
      eventTitle,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
      highlights,
      captions = [],
    } = req.body;

    if (
      !eventTitle ||
      !description ||
      !startDate ||
      !endDate ||
      !startTime ||
      !endTime ||
      !location ||
      !highlights
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (startDate > endDate) {
      return res
        .status(400)
        .json({ error: "Start date cannot be after end date." });
    }

    // 1. Save the event
    const newEvent = new Event({
      eventTitle,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
      highlights,
    });

    const savedEvent = await newEvent.save();

    // 2. Upload images to Cloudinary (if any)
    const images = [];

    if (req.files && req.files.length > 0) {
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
        // 3. Delete the temp file AFTER upload
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error(`Failed to delete temp file: ${file.path}`, err);
          }
        });
      }
    }

    // 3. Save gallery (if images exist)
    let savedGallery = null;
    if (images.length > 0) {
      const newGallery = new Gallery({
        event: savedEvent._id,
        images,
      });
      savedGallery = await newGallery.save();
    }

    // 4. Respond with success
    res.status(201).json({
      message: "Event created successfully",
      event: savedEvent,
      gallery: savedGallery,
    });
  } catch (error) {
    console.error("Error creating event with gallery:", error);
    res.status(500).json({ error: "Failed to create event and gallery." });
  }
};

const updateEventWithGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      eventTitle,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
      highlights,
      deletedImageIds = [], // optional public_ids to delete from Cloudinary
      captions = [],
    } = req.body;

    // 1. Update Event
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        eventTitle,
        description,
        startDate,
        endDate,
        startTime,
        endTime,
        location,
        highlights,
      },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found." });
    }

    // 2. Get existing gallery (if any)
    let gallery = await Gallery.findOne({ event: id });

    // 3. Delete images from Cloudinary if requested
    if (deletedImageIds.length > 0 && gallery) {
      // Remove from Cloudinary
      await Promise.all(
        deletedImageIds.map((public_id) => cloudinary.uploader.destroy(public_id))
      );

      // Filter out deleted images from gallery
      gallery.images = gallery.images.filter(
        (img) => !deletedImageIds.includes(img.public_id)
      );
    }

    // 4. Upload new images if provided
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const result = await uploadImage(file.path, "uploads/gallery");

        gallery.images.push({
          url: result.secure_url,
          public_id: result.public_id,
          format: result.format,
          width: result.width,
          height: result.height,
          uploadedAt: new Date(result.created_at),
          caption: captions[i] || "",
        });

        // Remove temp file
        fs.unlink(file.path, (err) => {
          if (err) console.error(`Temp delete failed: ${file.path}`, err);
        });
      }
    }

    // 5. Save or create the gallery
    if (gallery) {
      await gallery.save();
    } else if (req.files && req.files.length > 0) {
      gallery = await new Gallery({
        event: id,
        images: gallery.images,
      }).save();
    }

    // 6. Send updated response
    res.status(200).json({
      message: "Event and gallery updated successfully 🎯",
      event: updatedEvent,
      gallery: gallery?.images || [],
    });
  } catch (error) {
    console.error("Error updating event with gallery:", error);
    res.status(500).json({ error: "Failed to update event and gallery." });
  }
};


// controller for updating an event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params; // Event ID from URL
    const {
      eventTitle,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
      highlights,
    } = req.body;

    // 1. Find and update the Event first
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        eventTitle,
        description,
        startDate,
        endDate,
        startTime,
        endTime,
        location,
        highlights,
      },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found." });
    }

    res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Failed to update event." });
  }
};

// controller for getting all events along with their galleries
const getAllEventsWithGallery = async (req, res) => {
  try {
    // 1. Get all events
    const events = await Event.find();

    if (events.length === 0) {
      return res.status(404).json({ error: "No events found 😢" });
    }

    // 2. For each event, find the associated gallery (if exists)
    const eventsWithGallery = await Promise.all(
      events.map(async (event) => {
        const gallery = await Gallery.findOne({ event: event._id });

        return {
          ...event.toObject(), // convert Mongoose doc to plain object
          gallery: gallery ? gallery.images : [], // attach images array directly
        };
      })
    );

    res.status(200).json({
      message: "All events with their beautiful galleries ✨",
      data: eventsWithGallery,
    });
  } catch (error) {
    console.error("Error fetching events with gallery:", error);
    res.status(500).json({ error: "Failed to fetch event memories 😢" });
  }
};

// get event by id and populate the gallery
const getEventByIdWithGallery = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find the event
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found 😢" });
    }

    // 2. Find the associated gallery
    const gallery = await Gallery.findOne({ event: id });

    res.status(200).json({
      message: "Event found with its lovely gallery! 🎉",
      event,
      gallery: gallery?.images || [], // return [] if gallery not found
    });
  } catch (error) {
    console.error("Error fetching event with gallery:", error);
    res
      .status(500)
      .json({ error: "Something went wrong while fetching memories." });
  }
};

// controller for deleting an event along with its gallery
const deleteEventWithGallery = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find the event
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found 😢" });
    }

    // 2. Find and delete associated gallery images from Cloudinary
    const gallery = await Gallery.findOne({ event: id });
    if (gallery && gallery.images.length > 0) {
      const destroyPromises = gallery.images.map((img) =>
        cloudinary.uploader.destroy(img.public_id)
      );
      await Promise.all(destroyPromises);

      // 3. Delete gallery from MongoDB
      await Gallery.deleteOne({ _id: gallery._id });
    }

    // 4. Delete the event
    await Event.deleteOne({ _id: id });

    res
      .status(200)
      .json({ message: "Event and its gallery wiped from existence 💥" });
  } catch (error) {
    console.error("Error deleting event and gallery:", error);
    res.status(500).json({ error: "Failed to delete event and gallery 😓" });
  }
};

// controller for deleting all events along with their galleries
const deleteAllEventsWithGalleries = async (req, res) => {
  try {
    // 1. Get all galleries
    const galleries = await Gallery.find();

    // 2. Delete all images from Cloudinary
    const allImageDeletionPromises = [];

    for (const gallery of galleries) {
      for (const image of gallery.images) {
        allImageDeletionPromises.push(
          cloudinary.uploader.destroy(image.public_id)
        );
      }
    }

    await Promise.all(allImageDeletionPromises);

    // 3. Delete all galleries from MongoDB
    await Gallery.deleteMany({});

    // 4. Delete all events from MongoDB
    await Event.deleteMany({});

    res.status(200).json({
      message:
        "All events and their galleries were destroyed like Thanos snapped 😈",
    });
  } catch (error) {
    console.error("Error deleting all events and galleries:", error);
    res.status(500).json({ error: "Failed to wipe the history 😢" });
  }
};

// export the controllers

module.exports = {
  createEventWithGallery,
  updateEventWithGallery,
  updateEvent,
  getAllEventsWithGallery,
  getEventByIdWithGallery,
  deleteEventWithGallery,
  deleteAllEventsWithGalleries,
};
