import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import PolicyTabs from "../Components/PolicyTabs";
const PolicyPages = () => {
  return (
    <MainLayout>
      <div className="relative py-24 md:py-32 text-white text-center bg-gradient-to-r from-[#001F3F] via-[#002147] to-[#001F3F]">
        {/* Animated Content */}
        <motion.div
          className="relative z-10 px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* 🌟 Heading */}
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide leading-snug">
            Our <span className="text-[#FF4500]">Policies</span>
          </h1>

          {/* 📌 Subheading */}
          <p className="mt-4 text-lg sm:text-xl font-medium opacity-90 leading-relaxed">
            Ensuring transparency, trust, and commitment to quality at Moonal
            Udhyog.
          </p>

          {/* 🏆 CTA Button */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Link
              to="/contact"
              className="bg-[#FF4500] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-red-600 transition transform hover:scale-105"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Policy tabs */}
      <PolicyTabs />
    </MainLayout>
  );
};

export default PolicyPages;
