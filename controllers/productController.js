const Product = require("../models/productModel");
const mongoose = require("mongoose");
const fs = require("fs");
const { uploadImage ,deleteImage} = require("../utils/cloudinary");

// UTIL: check if valid MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// @desc    Get all products (public)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ success: false, error: "Server error while fetching products" });
  }
};

// @desc    Get single product by ID (public)
const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid product ID" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .json({ success: false, error: "Server error while fetching product" });
  }
};

// @desc    Create a new product (admin)
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      suitableFor,
      availiablePackaging,
      specifications,
      benefits,
    } = req.body;


    // Required field validation
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !suitableFor ||
      !availiablePackaging
    ) {
      return res
        .status(400)
        .json({ success: false, error: "All required fields must be filled" });
    }

    if (isNaN(price)) {
      return res
        .status(400)
        .json({ success: false, error: "Price must be a number" });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: "Image file is required" });
    }
  

    // Upload to Cloudinary
    const result = await uploadImage(req.file.path, "uploads/products");
    const image = result.secure_url;
    const public_id = result.public_id;

    // Clean up temp file
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Temp file deletion failed:", err);
    });

    // Create product
    const product = await Product.create({
      name,
      description,
      price,
      image,
      category,
      suitableFor,
      availiablePackaging,
      specifications,
      benefits,
      public_id,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({ success: false, error: "Server error while creating product" });
  }
};

// @desc    Update a product (admin)

const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid product ID" });
  }

  try {
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    const {
      name,
      description,
      price,
      category,
      suitableFor,
      availiablePackaging,
      specifications,
      benefits,
    } = req.body;

    // Optional validation
    if (price && isNaN(price)) {
      return res
        .status(400)
        .json({ success: false, error: "Price must be a number" });
    }

    let updatedImage = existingProduct.image;
    let updatedPublicId = existingProduct.public_id;

    // If new image is uploaded
    if (req.file) {
      // Delete old image from Cloudinary (if exists)
      if (existingProduct.public_id) {
        await deleteImage(existingProduct.public_id);
      }

      // Upload new image
      const result = await uploadImage(req.file.path, "uploads/products");
      updatedImage = result.secure_url;
      updatedPublicId = result.public_id;

      // Delete temp file
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Temp file deletion failed:", err);
      });
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: name ?? existingProduct.name,
        description: description ?? existingProduct.description,
        price: price ?? existingProduct.price,
        category: category ?? existingProduct.category,
        suitableFor: suitableFor ?? existingProduct.suitableFor,
        availiablePackaging:
          availiablePackaging ?? existingProduct.availiablePackaging,
        specifications: specifications ?? existingProduct.specifications,
        benefits: benefits ?? existingProduct.benefits,
        image: updatedImage,
        public_id: updatedPublicId,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ success: false, error: "Server error while updating product" });
  }
};


// @desc    Delete a product (admin)
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid product ID" });
  }

  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({ success: false, error: "Server error while deleting product" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
