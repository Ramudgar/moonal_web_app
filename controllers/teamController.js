const Team = require("../models/teamModel");
const mongoose = require("mongoose");
const fs = require("fs");
const { uploadImage } = require("../utils/cloudinary");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// @desc Get all team members (user)
const getAllTeamMembers = async (req, res) => {
  try {
    const team = await Team.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: team });
  } catch (error) {
    console.error("Error fetching team members:", error);
    res.status(500).json({ success: false, error: "Failed to fetch team members" });
  }
};

// @desc Get single team member by ID (user)
const getTeamMemberById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ success: false, error: "Invalid ID" });
  }

  try {
    const member = await Team.findById(id);
    if (!member) {
      return res.status(404).json({ success: false, error: "Team member not found" });
    }
    res.status(200).json({ success: true, data: member });
  } catch (error) {
    console.error("Error fetching member:", error);
    res.status(500).json({ success: false, error: "Failed to fetch team member" });
  }
};

// @desc Create team member (admin)
const createTeamMember = async (req, res) => {
  try {
    const { name, position, bio } = req.body;

    if (!name || !position || !bio || !req.file) {
      return res.status(400).json({ success: false, error: "All fields and image are required" });
    }

    const result = await uploadImage(req.file.path, "uploads/team");
    fs.unlink(req.file.path, () => {}); // clean temp

    const member = await Team.create({
      name,
      position,
      bio,
      image: result.secure_url,
    });

    res.status(201).json({ success: true, message: "Team member created", data: member });
  } catch (error) {
    console.error("Error creating member:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// @desc Update team member (admin)
const updateTeamMember = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ success: false, error: "Invalid ID" });
  }

  try {
    const existing = await Team.findById(id);
    if (!existing) {
      return res.status(404).json({ success: false, error: "Team member not found" });
    }

    let image = existing.image;
    if (req.file) {
      const result = await uploadImage(req.file.path, "uploads/team");
      fs.unlink(req.file.path, () => {});
      image = result.secure_url;
    }

    const updated = await Team.findByIdAndUpdate(
      id,
      {
        name: req.body.name ?? existing.name,
        position: req.body.position ?? existing.position,
        bio: req.body.bio ?? existing.bio,
        image,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: "Team member updated", data: updated });
  } catch (error) {
    console.error("Error updating member:", error);
    res.status(500).json({ success: false, error: "Update failed" });
  }
};

// @desc Delete team member (admin)
const deleteTeamMember = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ success: false, error: "Invalid ID" });
  }

  try {
    const deleted = await Team.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Team member not found" });
    }

    res.status(200).json({ success: true, message: "Team member deleted" });
  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({ success: false, error: "Delete failed" });
  }
};

module.exports = {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
