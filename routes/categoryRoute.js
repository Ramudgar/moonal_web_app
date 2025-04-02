const express = require("express");
const router = express.Router();
const Category = require("../models/categoryModel");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

//@ route GET /api/categories
//@ desc Get all categories
//@ access Admin only
router.get("/", getCategories);

//@ route POST /api/categories
//@ desc Create a new category
//@ access Admin only
router.post("/", createCategory);

// @route PUT /api/categories/:id
// @desc Update a category
// @access Admin only
router.put("/:id", updateCategory);

// @route DELETE /api/categories/:id
// @desc Delete a category
// @access Admin only
router.delete("/:id", deleteCategory);

// Export the router
module.exports = router;
