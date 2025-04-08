const Delearship = require("../models/delearshipModel");

// Create a new delearship
const delearshipRequest = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      businessName,
      businessAddress,
      businessType,
      yearsInBusiness,
      businessCity,
      businessDistrict,
      businessState,
      businessExperience,
      investment,
      comments,
      terms,
    } = req.body;

    console.log(req.body);

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !businessName ||
      !businessAddress ||
      !businessType ||
      !yearsInBusiness ||
      !businessCity ||
      !businessDistrict ||
      !businessState ||
      !businessExperience ||
      !investment ||
      !comments ||
      !terms
    ) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // Check if the email and/or phone already exists
    const existingDelearship = await Delearship.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingDelearship) {
      return res.status(400).json({
        message: "Email or phone number already exists",
      });
    }
    // Check if the email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }
    // Check if the phone number is valid
    const phoneRegex = /^\+?\d{10,14}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        message: "Please enter a valid phone number",
      });
    }

    const delearship = await Delearship.create({
      firstName,
      lastName,
      email,
      phone,
      businessName,
      businessAddress,
      businessType,
      yearsInBusiness,
      businessCity,
      businessDistrict,
      businessState,
      businessExperience,
      investment,
      comments,
      terms,
    });

    res.status(201).json({
      message: "Delearship created successfully",
      delearship,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all delearship

const getDelearshipRequest = async (req, res) => {
  try {
    const delearship = await Delearship.find();
    if (!delearship) {
      return res.status(404).json({ message: "No delearship found" });
    }
    res.status(200).json({ delearship });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get delearship by id
const getDelearshipRequestById = async (req, res) => {
  try {
    const delearshipId = req.params.id;
    if (!delearshipId) {
      return res
        .status(400)
        .json({ message: "Please provide a delearship id" });
    }

    const delearship = await Delearship.findById(delearshipId);
    if (!delearship) {
      return res.status(404).json({ message: "Delearship not found" });
    }
    res.status(200).json({ delearship });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete delearship by id
const deleteDelearshipRequestById = async (req, res) => {
  try {
    const delearshipId = req.params.id;
    if (!delearshipId) {
      return res
        .status(400)
        .json({ message: "Please provide a delearship id" });
    }

    const delearship = await Delearship.findByIdAndDelete(delearshipId);
    if (!delearship) {
      return res.status(404).json({ message: "Delearship not found" });
    }
    res.status(200).json({ message: "Delearship deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export the module
module.exports = {
  delearshipRequest,
  getDelearshipRequest,
  getDelearshipRequestById,
  deleteDelearshipRequestById,
};
