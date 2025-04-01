const Review = require("../models/reviewModel");

// controller to post a review

exports.postReview = async (req, res) => {
  try {
    const { name, rating, review, contact } = req.body;
    if (!name || !rating || !review || !contact) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide all the required fields",
      });
    }
    const newReview = await Review.create(req.body);
    res.status(201).json({
      status: "success",
      msg: "Review added successfully",
      data: {
        newReview,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// controller to get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({
      status: "success",
      message: "All reviews fetched successfully",
      reviews,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// controller to get a single review
exports.getReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    if (!reviewId) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide the review ID",
      });
    }
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        status: "fail",
        message: "Review not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Review fetched successfully",
      review,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// controller to delete a review
exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    if (!reviewId) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide the review ID",
      });
    }
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      return res.status(404).json({
        status: "fail",
        message: "Review not found",
      });
    }
    res.status(204).json({
      status: "success",
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

