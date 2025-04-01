const express = require("express");
const { create } = require("../models/userModel");
const { delearshipRequest, getDelearshipRequest, getDelearshipRequestById, deleteDelearshipRequestById } = require("../controllers/delearshipController");
const router = express.Router();


// @api {post} /api/v1/delearship 
// @desc Create a new delearship
// @access Public
// @type POST

router.post("/",delearshipRequest);


// @desc getall delearship contact
// @api name /api/v1/delearship
//@access private admin
// @type get

router.get("/", getDelearshipRequest)


// @desc get delearship by id
// @ api /api/v1/delearship/:id
// @ access private 
// @ type get
router.get("/:id",getDelearshipRequestById)

// @desc delete delearship request
// @ api name /api/v1/delearship
//@ access private
// @ type Delete

router.delete("/:id", deleteDelearshipRequestById)


module.exports = router;