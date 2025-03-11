import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  Send,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import {Link} from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
const DealershipPage = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const toggleAccordion = (index) => {
    if (activeAccordion === index) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index);
    }
  };

  // Sample FAQs
  const faqs = [
    {
      question: "What are the benefits of becoming a Moonal Udhyog dealer?",
      answer:
        "As a Moonal Udhyog dealer, you'll enjoy competitive margins, marketing support, technical training, exclusive territory rights, and access to our complete product range. We also provide regular business development assistance and promotional materials.",
    },
    {
      question: "What is the investment required to become a dealer?",
      answer:
        "The investment varies based on location and scale of operation. Typically, it includes costs for inventory, infrastructure, and working capital. Our team will provide detailed information after reviewing your application.",
    },
    {
      question: "How long does the application process take?",
      answer:
        "The standard application process takes approximately 2-4 weeks. This includes application review, background verification, territory assessment, and final approval. Once approved, we'll guide you through the onboarding process.",
    },
    {
      question: "Is there any training provided to new dealers?",
      answer:
        "Yes, we provide comprehensive training to all new dealers. This includes product knowledge, technical specifications, sales techniques, and business management. We also conduct regular refresher training sessions to keep our dealers updated with the latest products and industry trends.",
    },
    {
      question: "What territories are currently available?",
      answer:
        "We have dealership opportunities available across Nepal. Priority areas include major cities and industrial hubs. Please mention your preferred location in your application, and our team will assess availability.",
    },
  ];

  const onSubmit = (data) => {
    console.log(data);
    // In a real application, you would send this data to your backend
    setSubmitSuccess(true);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  return (
    <MainLayout>
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* 🚀 Page Header */}
      <div className="relative py-24 md:py-32 text-white text-center bg-gradient-to-r from-[#001F3F] via-[#002147] to-[#001F3F]">
        {/* Animated Overlay Content */}
        <motion.div
          className="relative z-10 px-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* ✨ Catchy Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-wide drop-shadow-lg leading-snug"
            whileHover={{ scale: 1.02 }}
          >
            Become a <span className="text-[#FF4500]">Dealer</span>
          </motion.h1>

          {/* 💡 Subheading for Engagement */}
          <motion.p
            className="mt-4 text-lg sm:text-xl md:text-2xl font-medium opacity-90 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Join our growing network of successful dealers and grow your
            business with Moonal Udhyog
          </motion.p>

          {/* 🚀 Call-to-Action Buttons */}
          <motion.div
            className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <a
              href="#dealership-form"
              className="bg-[#FF4500] text-white px-6 py-3 rounded-lg text-sm sm:text-lg font-semibold shadow-md hover:bg-red-600 transition transform hover:scale-105"
            >
              Apply for Dealership
            </a>
            <a
              href="/contact"
              className="border-2 border-[#FF4500] text-[#FF4500] px-6 py-3 rounded-lg text-sm sm:text-lg font-semibold shadow-md hover:bg-[#FF4500] hover:text-white transition transform hover:scale-105"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* 🌟 Benifits with us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* ✨ Section Title */}
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Why <span className="text-[#FF4500]">Partner</span> With Us?
          </motion.h2>

          {/* 🚀 Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <TrendingUp className="h-10 w-10 text-white" />,
                title: "Profitable Business",
                desc: "High margins & growing market demand ensure great returns.",
              },
              {
                icon: <Award className="h-10 w-10 text-white" />,
                title: "Premium Products",
                desc: "Represent a trusted brand with quality lubricants.",
              },
              {
                icon: <Users className="h-10 w-10 text-white" />,
                title: "Full Support",
                desc: "Marketing, technical & business assistance provided.",
              },
              {
                icon: <MapPin className="h-10 w-10 text-white" />,
                title: "Exclusive Territory",
                desc: "Enjoy secured business rights in your local market.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 rounded-lg p-6 text-center shadow-md transition hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                {/* 🔹 Icon Box */}
                <div className="w-16 h-16 bg-[#FF4500] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {item.icon}
                </div>

                {/* 🔸 Benefit Title */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>

                {/* 🔹 Benefit Description */}
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 bg-gray-50" id="dealership-form">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Apply for <span className="text-[#FF4500]">Dealership</span>
            </motion.h2>

            <p className="text-gray-600 mb-8 text-center">
              Fill out the form below to apply for a dealership opportunity with
              Moonal Udhyog PVT.LTD.
            </p>

            {submitSuccess ? (
              <motion.div
                className="bg-[#002147] border border-[#FF4500] rounded-lg p-8 text-center shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* 🎉 Success Icon */}
                <div className="flex justify-center">
                  <CheckCircle className="h-16 w-16 text-[#FF4500]" />
                </div>

                {/* ✅ Success Message */}
                <h3 className="text-3xl font-bold text-white mt-4">
                  🎉 Application Submitted Successfully!
                </h3>
                <p className="text-gray-300 mt-2 text-lg">
                  Thank you for your interest in becoming a{" "}
                  <span className="font-semibold text-[#FF4500]">
                    Moonal Udhyog
                  </span>{" "}
                  dealer. Our team will review your application and contact you
                  within{" "}
                  <span className="font-semibold text-[#FF4500]">
                    5-7 business days
                  </span>
                  .
                </p>

                {/* 📧 Contact Information */}
                <p className="text-gray-300 mt-4">
                  If you have any questions, feel free to reach out:
                  <span className="font-semibold block mt-1 text-[#FF4500]">
                    📩 dealership@moonaludhyog.com
                  </span>
                </p>

                {/* 🔗 Call-to-Actions */}
                <div className="mt-6 flex justify-center gap-4">
                  <a
                    href="/"
                    className="bg-[#FF4500] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-red-600 transition transform hover:scale-105"
                  >
                    Return Home
                  </a>
                  <a
                    href="/contact"
                    className="border-2 border-[#FF4500] text-[#FF4500] px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[#FF4500] hover:text-white transition transform hover:scale-105"
                  >
                    Contact Support
                  </a>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-lg p-8 shadow-md"
              >
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        }`}
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                        {...register("phone", {
                          required: "Phone number is required",
                        })}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Business Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label
                        htmlFor="companyName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Company/Business Name *
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none ${
                          errors.companyName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        {...register("companyName", {
                          required: "Company name is required",
                        })}
                      />
                      {errors.companyName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.companyName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="businessType"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Business Type *
                      </label>
                      <select
                        id="businessType"
                        className={`w-full  px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none ${
                          errors.businessType
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        {...register("businessType", {
                          required: "Please select business type",
                        })}
                      >
                        <option value="">Select Business Type</option>
                        <option
                          value="Sole Proprietorship"
                          className="hover:nth-[]:"
                        >
                          Sole Proprietorship
                        </option>
                        <option value="Partnership">Partnership</option>
                        <option value="Private Limited">Private Limited</option>
                        <option value="Public Limited">Public Limited</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.businessType && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.businessType.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="yearsInBusiness"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Years in Business *
                      </label>
                      <select
                        id="yearsInBusiness"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none ${
                          errors.yearsInBusiness
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        {...register("yearsInBusiness", {
                          required: "Please select years in business",
                        })}
                      >
                        <option value="">Select Experience</option>
                        <option value="New Business">New Business</option>
                        <option value="Less than 1 year">
                          Less than 1 year
                        </option>
                        <option value="1-3 years">1-3 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5-10 years">5-10 years</option>
                        <option value="More than 10 years">
                          More than 10 years
                        </option>
                      </select>
                      {errors.yearsInBusiness && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.yearsInBusiness.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Location Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Business Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none ${
                          errors.address ? "border-red-500" : "border-gray-300"
                        }`}
                        {...register("address", {
                          required: "Business address is required",
                        })}
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.address.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none ${
                          errors.city ? "border-red-500" : "border-gray-300"
                        }`}
                        {...register("city", { required: "City is required" })}
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="district"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        District *
                      </label>
                      <input
                        type="text"
                        id="district"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none ${
                          errors.district ? "border-red-500" : "border-gray-300"
                        }`}
                        {...register("district", {
                          required: "District is required",
                        })}
                      />
                      {errors.district && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.district.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Additional Information
                  </h3>
                  <div>
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Experience in Lubricant Industry (if any)
                    </label>
                    <textarea
                      id="experience"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                      placeholder="Please describe your experience in the lubricant industry..."
                      {...register("experience")}
                    ></textarea>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="investment"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Planned Investment Range *
                    </label>
                    <select
                      id="investment"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none ${
                        errors.investment ? "border-red-500" : "border-gray-300"
                      }`}
                      {...register("investment", {
                        required: "Please select investment range",
                      })}
                    >
                      <option value="">Select Investment Range</option>
                      <option value="Less than NPR 5 Lakhs">
                        Less than NPR 5 Lakhs
                      </option>
                      <option value="NPR 5-10 Lakhs">NPR 5-10 Lakhs</option>
                      <option value="NPR 10-20 Lakhs">NPR 10-20 Lakhs</option>
                      <option value="NPR 20-50 Lakhs">NPR 20-50 Lakhs</option>
                      <option value="More than NPR 50 Lakhs">
                        More than NPR 50 Lakhs
                      </option>
                    </select>
                    {errors.investment && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.investment.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="comments"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Additional Comments
                    </label>
                    <textarea
                      id="comments"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                      placeholder="Any additional information you'd like to share..."
                      {...register("comments")}
                    ></textarea>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        className={`h-4 w-4 text-red-600 accent-[#FF4500]  border-gray-300 rounded focus:ring-red-500 ${
                          errors.terms ? "border-red-500" : ""
                        }`}
                        {...register("terms", {
                          required: "You must agree to the terms",
                        })}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms"
                        className="font-medium text-gray-700"
                      >
                        I agree to the terms and conditions and authorize Moonal
                        Udhyog to contact me regarding my application *
                      </label>
                      {errors.terms && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.terms.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center bg-[#FF4500] hover:bg-red-00 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                  >
                    Submit Application <Send className="h-5 w-5 ml-2" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <h2 className="text-4xl font-bold text-[#002147] mb-12 text-center">
            Frequently Asked Questions
          </h2>

          {/* FAQs Accordion */}
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-5">
                {/* FAQ Question Button */}
                <button
                  className="flex justify-between items-center w-full p-5 bg-white hover:bg-[#FF4500]/10 border border-gray-300 rounded-lg text-left focus:outline-none shadow-sm transition"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="font-semibold text-[#002147] text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-6 w-6 text-[#FF4500] transition-transform ${
                      activeAccordion === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {/* FAQ Answer */}
                {activeAccordion === index && (
                  <div className="p-5 bg-white border-l-4 border-[#FF4500] rounded-b-lg mt-2 shadow-md">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="text-center mt-12">
            <p className="text-gray-700 text-lg font-medium mb-4">
              Still have questions about becoming a dealer?
              <Link
                to="/contact#contact-form"
                className="  text-[#FF4500]   font-light"
              >
               &nbsp; Contact Our Dealership Team
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
    </MainLayout>
  );
};

export default DealershipPage;
