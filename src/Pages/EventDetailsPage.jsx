// import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";

// Sample event data (Replace with API or database)
const eventData = {
  id: 1,
  title: "Moonal Udhyog Annual Dealer Conference",
  date: "March 20, 2025",
  time: "10:00 AM - 4:00 PM",
  location: "Kathmandu Marriott Hotel, Nepal",
  description:
    "Join us for an exclusive gathering of our valued dealers and industry experts. Explore new product launches, sales strategies, and networking opportunities. Be part of Moonal Udhyog’s vision for a successful future!",
  highlights: [
    "🌟 New Product Launches",
    "📈 Sales & Marketing Strategies",
    "🤝 Networking with Industry Experts",
    "🏆 Dealer Recognition & Awards",
  ],
  image: "https://images.unsplash.com/photo-1621732648770-9699de6f78c3",
  gallery: [
    "https://images.unsplash.com/photo-1565060037074-d4f16b82f1f6",
    "https://images.unsplash.com/photo-1603200492388-65284fc30b23",
    "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1",
    "https://images.unsplash.com/photo-1513174949-0a27043e40f7",
  ],
};

const EventDetails = () => {
//   const { id } = useParams(); // Get event ID from URL params (For dynamic data fetching)

  return (
    <MainLayout>
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* 🔥 Event Header */}
      <div className="relative py-24 text-white text-center bg-gradient-to-r from-[#001F3F] via-[#002147] to-[#001F3F]">
        <motion.div
          className="relative z-10 px-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-lg leading-snug">
            {eventData.title}
          </h1>

          <div className="mt-4 flex justify-center items-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-[#FF4500]" />
              <span>{eventData.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-[#FF4500]" />
              <span>{eventData.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-6 w-6 text-[#FF4500]" />
              <span>{eventData.location}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 🔹 Event Details Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* 🎥 Event Image */}
          <motion.div
            className="rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={eventData.image}
              alt={eventData.title}
              className="w-full h-80 object-cover rounded-lg"
            />
          </motion.div>

          {/* 📋 Event Info */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-[#002147] mb-4">
              Event Overview
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {eventData.description}
            </p>

            {/* Event Highlights */}
            <h3 className="text-xl font-semibold text-[#FF4500] mb-3">
              Event Highlights:
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              {eventData.highlights.map((highlight, index) => (
                <li key={index} className="mb-2">
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* 📸 Event Gallery */}
      <div className="bg-[#F4F4F4] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#002147] mb-8">
            📸 Event Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {eventData.gallery.map((image, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-md group transition-all hover:shadow-xl"
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={image}
                  alt={`Event Image ${index + 1}`}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 📩 Call-To-Action */}
      <div className="py-16 text-center bg-gradient-to-r from-[#001F3F] via-[#002147] to-[#001F3F] text-white">
        <h2 className="text-3xl font-bold">Want to Attend?</h2>
        <p className="text-lg mt-4 mb-6">
          Register now and be a part of Moonal Udhyog’s exciting events.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-[#FF4500] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-red-600 transition transform hover:scale-105"
          >
            Register Now
          </Link>
          <Link
            to="/contact#contact-form"
            className="border-2 border-[#FF4500] text-[#FF4500] px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[#FF4500] hover:text-white transition transform hover:scale-105"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
    </MainLayout>
  );
};

export default EventDetails;
