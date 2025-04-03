import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-scroll"; // ✅ Smooth scrolling to form
import MainLayout from "../Layouts/MainLayout";

const ReviewPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      rating: 5,
      comment:
        "Exceptional quality lubricants! My machinery runs smoothly now.",
      date: "March 12, 2024",
    },
    {
      id: 2,
      name: "Anita Verma",
      rating: 4,
      comment: "Great customer support and quick delivery. Very reliable.",
      date: "March 10, 2024",
    },
    {
      id: 3,
      name: "Vikas Patel",
      rating: 5,
      comment: "Highly recommend! Superior performance and durability.",
      date: "March 8, 2024",
    },
  ]);

  // ⭐ Handle Review Submission
  const onSubmit = (data) => {
    const newReview = {
      id: reviews.length + 1,
      name: data.name,
      email: data.email,
      contact: data.contact,
      rating: parseInt(data.rating),
      comment: data.comment,
      date: new Date().toLocaleDateString(),
    };

    setReviews([newReview, ...reviews]); // Add new review at the top
    reset(); // Clear form
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* 🌟 Page Header with "Review Now" Button */}
        <div className="relative py-24 md:py-32 text-white text-center bg-gradient-to-r from-[#001F3F] via-[#002147] to-[#001F3F]">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-extrabold mb-4 text-[#FF4500] drop-shadow-lg">
              Customer Reviews
            </h1>
            <p className="text-xl max-w-2xl mx-auto text-gray-200 drop-shadow-md">
              See what our customers have to say about our products and
              services.
            </p>

            {/* 🚀 "Review Now" Button - Scrolls to Review Form */}
            <div className="mt-6">
              <Link
                to="review-form"
                smooth={true}
                duration={800}
                className="bg-[#FF4500] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-red-600 transition transform hover:scale-105 inline-block cursor-pointer"
              >
                Review Now
              </Link>
            </div>
          </div>
        </div>

        {/* ⭐ Reviews Section */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-[#002147] text-center mb-8">
            What Our Customers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all"
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-[#002147]">
                    {review.name}
                  </h3>
                  <span className="text-gray-500 text-sm">{review.date}</span>
                </div>
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-5 h-5 ${
                        index < review.rating
                          ? "text-[#FF4500]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mt-3">{review.comment}</p>
              </motion.div>
            ))}
          </div>

          {/* 📝 Submit Review Form */}
          <div
            id="review-form"
            className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-[#002147] text-center mb-4">
              Leave a Review
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name Field */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Your Name *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF4500] focus:outline-none"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Email Address *
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF4500] focus:outline-none"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Contact Number Field */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF4500] focus:outline-none"
                  {...register("contact", {
                    required: "Contact number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10-digit contact number",
                    },
                  })}
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contact.message}
                  </p>
                )}
              </div>

              {/* Rating Field */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Rating *
                </label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF4500] focus:outline-none"
                  {...register("rating", { required: "Rating is required" })}
                >
                  <option value="">Select Rating</option>
                  <option value="5">⭐️⭐️⭐️⭐️⭐️ - Excellent</option>
                  <option value="4">⭐️⭐️⭐️⭐️ - Good</option>
                  <option value="3">⭐️⭐️⭐️ - Average</option>
                  <option value="2">⭐️⭐️ - Below Average</option>
                  <option value="1">⭐️ - Poor</option>
                </select>
                {errors.rating && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.rating.message}
                  </p>
                )}
              </div>

              {/* Comment Field */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Your Review *
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF4500] focus:outline-none"
                  {...register("comment", { required: "Feedback is required" })}
                ></textarea>
                {errors.comment && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.comment.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-[#FF4500] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-red-600 transition transform hover:scale-105 inline-flex items-center"
                >
                  Submit Review <Send className="h-5 w-5 ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReviewPage;
