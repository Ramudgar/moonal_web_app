const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
  },
  review: {
    type: String,
    required: [true, "Review is required"],
  },
  contact: {
    type: String,
    required: [true, "Contact is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;