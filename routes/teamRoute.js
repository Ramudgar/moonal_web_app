const express = require("express");
const router = express.Router();
const {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require("../controllers/teamController");
const multer = require("multer");
const upload = multer({ dest: "temp/" });

// @route GET /api/v1/team
// @desc Get all team members
// @access Public
router.get("/", getAllTeamMembers);

// @route GET /api/v1/team/:id
// @desc Get single team member by ID
// @access Public
router.get("/:id", getTeamMemberById);
// @route POST /api/v1/team
// @desc Create a new team member
// @access Private
router.post("/", upload.single("image"), createTeamMember);
// @route PUT /api/v1/team/:id
// @desc Update an existing team member
// @access Private
router.put("/:id", upload.single("image"), updateTeamMember);
// @route DELETE /api/v1/team/:id
// @desc Delete a team member by ID
// @access Private
router.delete("/:id", deleteTeamMember);
// export the router
module.exports = router;
