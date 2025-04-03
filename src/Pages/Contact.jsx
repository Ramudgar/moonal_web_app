import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  submitContactForm,
  resetContactState,
} from "../features/contact/contactSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import MainLayout from "../Layouts/MainLayout";
import { Link as BrowserLink, useLocation } from "react-router-dom";
import { Link } from "react-scroll";

const ContactPage = () => {
  const dispatch = useDispatch();

  const { loading, successMessage, error } = useSelector(
    (state) => state.contact
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(submitContactForm(data));
  };

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      reset();
      dispatch(resetContactState());
    }

    if (error) {
      toast.error(error);
      dispatch(resetContactState());
    }
  }, [successMessage, error, dispatch, reset]);

  return (
    <MainLayout>
      <div className=" min-h-screen bg-gray-50">
        {/* 🚀 Page Header */}
        <div className="relative bg-[#002147] text-white py-20 text-center overflow-hidden">
          {/* Background Animation (Optional) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#001F3F] via-[#002147] to-[#001F3F] opacity-90"></div>

          {/* Animated Heading */}
          <motion.h1
            className="relative z-10 text-5xl md:text-6xl font-extrabold drop-shadow-lg"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
          >
            Let’s Connect & Grow Together
          </motion.h1>

          {/* Catchy Subheading */}
          <motion.p
            className="relative z-10 text-lg md:text-xl mt-4 max-w-2xl mx-auto opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Have Questions?{" "}
            <span className="text-[#FF4500] font-semibold">
              Let&apos;s Talk.
            </span>
            Your{" "}
            <span className="text-[#FF4500] font-semibold">Next Big Move</span>{" "}
            Starts Here!
          </motion.p>

          {/* Call-to-Action Buttons */}
          <div className="relative z-10 flex justify-center mt-6 space-x-4">
            {/* Call Us Now Button */}
            <motion.div whileHover={{ scale: 1.1 }}>
              <BrowserLink
                to="tel:+9771234567890"
                className="inline-block bg-[#FF4500] text-white font-semibold py-3 px-6 rounded-lg text-lg shadow-md transition transform hover:scale-105 cursor-pointer"
              >
                📞 Call Us Now
              </BrowserLink>
            </motion.div>

            {/* Send a Message Button */}
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link
                to="contact-form"
                smooth={true}
                duration={500}
                className="inline-block border-2 border-[#FF4500] text-[#FF4500] hover:bg-[#FF4500] hover:text-white font-semibold py-3 px-6 rounded-lg text-lg shadow-md transition transform hover:scale-105 cursor-pointer"
              >
                ✉️ Send a Message
              </Link>
            </motion.div>
          </div>
        </div>

        {/* 📍 Contact Information */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <MapPin className="h-8 w-8 text-white" />,
                title: "Our Location",
                text: "123 Industrial Area, Kathmandu, Nepal",
              },
              {
                icon: <Phone className="h-8 w-8 text-white" />,
                title: "Phone",
                text: "+977 1234567890\n+977 9876543210",
              },
              {
                icon: <Mail className="h-8 w-8 text-white" />,
                title: "Email",
                text: "info@moonaludhyog.com\nsupport@moonaludhyog.com",
              },
              {
                icon: <Clock className="h-8 w-8 text-white" />,
                title: "Business Hours",
                text: "Mon-Fri: 9 AM - 5 PM\nSat: 9 AM - 1 PM",
              },
            ].map((info, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-lg p-6 text-center shadow-md transition hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-[#FF4500] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {info.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-600 whitespace-pre-line">{info.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ✉️ Contact Form & Map */}
        <section className="py-16 bg-gray-50 " id="contact-form">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 🚀 Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Send Us a Message
              </h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-lg p-8 shadow-md"
              >
                {["name", "email", "phone", "subject"].map((field, index) => (
                  <div key={index} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {field} *
                    </label>
                    <input
                      type={
                        field === "email"
                          ? "email"
                          : field === "phone"
                          ? "tel"
                          : "text"
                      }
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF4500] focus:outline-none ${
                        errors[field] ? "border-red-500" : "border-gray-300"
                      }`}
                      {...register(field, {
                        required: `${field} is required`,
                      })}
                    />
                    {errors[field] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors[field].message}
                      </p>
                    )}
                  </div>
                ))}

                {/* Message Box */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF4500] focus:outline-none ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="How can we help you?"
                    {...register("message", {
                      required: "Message is required",
                    })}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="inline-flex items-center bg-[#FF4500] hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-lg transition transform hover:scale-105"
                >
                  {loading ? "Sending..." : "Send Message"}{" "}
                  <Send className="h-5 w-5 ml-2" />
                </button>
              </form>
              {/* )} */}
            </div>

            {/* 🌍 Map */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.31625950213!2d85.29111341744386!3d27.70895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                title="Moonal Udhyog Location"
              ></iframe>
            </div>
          </div>
        </section>
        {/* 🔥 "Are You Interested?" CTA Section */}
        <section className="py-16 bg-[#002147] text-white text-center">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-4xl font-extrabold mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Interested in Our Products?
            </motion.h2>

            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Explore our complete range of high-quality lubricants designed for
              superior engine performance.
            </p>

            <motion.div className="inline-block" whileHover={{ scale: 1.05 }}>
              <BrowserLink
                to="/products"
                className="inline-block bg-[#FF4500] text-white font-semibold py-3 px-6 rounded-lg text-lg shadow-md transition transform hover:scale-105 cursor-pointer"
              >
                View Products
              </BrowserLink>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default ContactPage;
