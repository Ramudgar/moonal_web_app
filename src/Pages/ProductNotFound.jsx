import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import productBackground from "../assets/images/product_background.jpg"; // Ensure this is the correct path

const ProductNotFound = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${productBackground})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black/70"></div> {/* Dark overlay for contrast */}

      {/* Content Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 bg-white/90 p-10 rounded-xl shadow-lg max-w-lg mx-4"
      >
        <h2 className="text-5xl font-extrabold text-[#002147] mb-4 drop-shadow-lg">
          404
        </h2>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Product Not Found
        </h3>
        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
          The product you&apos;re looking for is not available. Please browse our 
          other high-performance engine oils.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="flex items-center justify-center bg-[#FF4500] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-red-600 transition transform hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Explore Products
          </Link>
          <Link
            to="/contact"
            className="flex items-center justify-center border-2 border-[#FF4500] text-[#FF4500] px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[#FF4500] hover:text-white transition transform hover:scale-105"
          >
            Contact Support
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductNotFound;
