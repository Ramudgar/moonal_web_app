const e = require("express");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  public_id: {
    type: String,
    required: [true, "Public ID is required"],
  },
  category: {
    type: String,
    enum: {
      values: ["engine oil", "gear oil", "brake oil", "coolant", "grease"],
      message: "Category is not valid",
    },
    validate: {
      validator: function (value) {
        return [
          "engine oil",
          "gear oil",
          "brake oil",
          "coolant",
          "grease",
        ].includes(value);
      },
      required: [true, "Category is required"],
    },
  },
  suitableFor: {
    type: [String],
    required: [true, "Suitable for is required"],
  },

  availiablePackaging: {
    type: String,
    required: [true, "Packaging is required"],
  },
  specifications: {
    type: [String],
  },

  benefits: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
