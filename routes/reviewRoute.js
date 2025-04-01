const express = require("express");
const router = express.Router();

const {
  postReview,
  getAllReviews,
  getReview,
  deleteReview,
} = require("../controllers/reviewController");

// @ desc     post a review
// @ route    POST /api/v1/reviews
// @ access   Public
router.post("/", postReview);

// @ desc     get all reviews
// @ route    GET /api/v1/reviews
// @ access   Private

router.get("/", getAllReviews);

// @ desc     get a single review
// @ route    GET /api/v1/reviews/:id
// @ access   Private

router.get("/:id", getReview);

// @ desc     delete a review
// @ route    DELETE /api/v1/reviews/:id
// @ access   Private

router.delete("/:id", deleteReview);

// export the router
module.exports = router;
