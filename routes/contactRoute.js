const express=require('express');
const { createContact, getContacts, getContact } = require('../controllers/contactController');

const router=express.Router();


// @route POST /api/v1/contact/create
// @desc Create a new contact
// @access Public
// @auth Not required
router.post('/create',createContact);

// @route GET /api/v1/contact
// @desc Get all contacts
// @access admin
// @auth required
router.get('/',getContacts);

// @route GET /api/v1/contact/:id
// @desc Get a single contact
// @access private (admin)
// @auth Required
router.get('/:id',getContact);

module.exports=router;