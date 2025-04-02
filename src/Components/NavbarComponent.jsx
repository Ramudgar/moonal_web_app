import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // For animations
import Logo from "../assets/MoonalLogo.jpg"; // Ensure the logo is in this path

export default function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current path

  return (
    <>
      {/* 🔹 Top Info Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex justify-around items-center bg-[#001F3F] text-white text-sm py-2 shadow-md"
      >
        {/* Left Contact Info */}
        <div className="flex items-center space-x-6">
          <Link to="#" className="flex items-center space-x-2 transition">
            <i className="ri-map-pin-2-fill p-1 px-[6px] bg-[#FF4500] rounded-full"></i>
            <span className="hover:text-[#FF4500]">Kathmandu, Nepal</span>
          </Link>
          <a href="tel:+01234567890" className="flex items-center space-x-2 transition">
            <i className="ri-phone-fill p-1 px-[6px] bg-[#FF4500] rounded-full"></i>
            <span>+01234567890</span>
          </a>
          <a href="mailto:example@gmail.com" className="flex items-center space-x-2 transition">
            <i className="ri-mail-fill p-1 px-[6px] bg-[#FF4500] rounded-full"></i>
            <span>example@gmail.com</span>
          </a>
        </div>

        {/* Right Social Media Links */}
        <div className="flex items-center space-x-4">
          {["linkedin", "facebook", "twitter-x", "instagram"].map((social, i) => (
            <Link
              key={i}
              to="#"
              className="w-8 h-8 flex items-center justify-center bg-[#FF4500] text-white rounded-full hover:bg-red-600 transition"
            >
              <i className={`ri-${social}-fill`}></i>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* 🔹 Sticky Navbar */}
      <nav className="sticky top-0 bg-white shadow-lg z-50">
        <div className="container mx-auto flex justify-between items-center py-3 px-4">
          {/* 🔵 Logo */}
          <Link to="/" className="flex items-center">
            <motion.img
              src={Logo}
              alt="Moonal Engine Oil"
              className="h-12 xl:h-14 w-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </Link>

          {/* 🟢 Navigation Links */}
          <ul className="hidden lg:flex space-x-6 text-lg font-medium">
            {["Home", "About", "Products", "Dealership", "Contact", "Event","Policy"].map(
              (item, index) => {
                const itemPath = item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`;
                const isActive = location.pathname === itemPath; // Check if active
                
                return (
                  <motion.li
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`relative transition ${
                      isActive ? "text-[#FF4500]" : "text-[#002147]"
                    }`}
                  >
                    <Link to={itemPath} className="hover:text-[#FF4500] transition">
                      {item}
                    </Link>
                    {isActive && (
                      <motion.div
                        className="absolute bottom-[-3px] left-0 w-full h-[3px] bg-[#FF4500]"
                        layoutId="underline"
                      />
                    )}
                  </motion.li>
                );
              }
            )}
          </ul>

          {/* 🔴 CTA Button (Always Visible) */}
          <Link
            to="/dealership"
            className="hidden lg:block bg-[#FF4500] text-white px-5 py-2 rounded-xl text-lg font-semibold shadow-md hover:bg-red-600 transition transform hover:scale-105"
          >
            Get Dealership
          </Link>

          {/* ☰ Mobile Menu Button */}
          <motion.button
            className="lg:hidden text-[#002147] text-3xl focus:outline-none border-[#FF4500] border-2 rounded-lg p-1"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <i className="ri-close-line"></i> : <i className="ri-menu-line"></i>}
          </motion.button>
        </div>

        {/* 📱 Mobile Menu (Slide-in Effect) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="lg:hidden bg-[#002147] text-white text-lg font-medium text-center overflow-hidden"
            >
              <ul className="space-y-3 py-4">
                {["Home", "About", "Products", "Dealership", "Contact", "Event","Policy"].map(
                  (item, index) => {
                    const itemPath = item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`;
                    const isActive = location.pathname === itemPath;

                    return (
                      <motion.li
                        key={index}
                        whileHover={{ scale: 1.1, color: "#FF4500" }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className={`py-2 ${isActive ? "text-[#FF4500]" : ""}`}
                      >
                        <Link to={itemPath} className="block">
                          {item}
                        </Link>
                        {isActive && (
                          <motion.div
                            className="mx-auto w-2/4 h-[2px] bg-[#FF4500] mt-1"
                            layoutId="underline"
                          />
                        )}
                      </motion.li>
                    );
                  }
                )}
                <li className="px-4">
                  <Link
                    to="/dealership"
                    className="block bg-[#FF4500] text-white px-4 py-2 mt-2 rounded-lg shadow-md hover:bg-red-600 transition transform hover:scale-105"
                  >
                    Get Dealership
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
