const Contact = require("../models/contactModel");

// Create a new contact - /api/v1/contacts/create
// @desc    Create a new contact
// @route   POST /api/v1/contacts/create
// @access  Public
// @auth    Not required

const createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });
    res.status(201).json({ message: "Contact created successfully", contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all contacts - /api/v1/contacts
// @desc    Get all contacts
// @route   GET /api/v1/contacts
// @access  admin
// @auth    required

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ message: "contacts found successfully", contacts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single contact - /api/v1/contacts/:id
// @desc    Get a single contact
// @route   GET /api/v1/contacts/:id
// @access  private (admin)
// @auth    Required

const getContact = async (req, res) => {
  try {
    const contact_id = req.params.id;
    if (!contact_id) {
      return res.status(400).json({ message: "Please provide a contact id" });
    }
    const contact = await Contact.findById(contact_id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact found successfully", contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a contact
const deleteContact = async (req, res) => {
  try {
    const contact_id = req.params.id;
    if (!contact_id) {
      return res.status(400).json({ message: "Please provide a contact id" });
    }
    const contact = await Contact.findByIdAndDelete(contact_id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createContact, getContacts, getContact, deleteContact };
