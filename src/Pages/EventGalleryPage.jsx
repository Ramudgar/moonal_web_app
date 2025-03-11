import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import MainLayout from "../Layouts/MainLayout";

const EventsGalleryPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  // Sample events data
  const upcomingEvents = [
    {
      id: 1,
      title: "Automotive Expo 2025",
      date: "March 15-17, 2025",
      location: "Bhrikuti Mandap, Kathmandu",
      description:
        "Join us at the largest automotive exhibition in Nepal. We'll be showcasing our latest products and offering special promotions for visitors.",
      image:
        "https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      title: "Dealer Training Program",
      date: "April 5, 2025",
      location: "Hotel Himalaya, Lalitpur",
      description:
        "A comprehensive training program for our dealers covering product knowledge, technical specifications, and sales strategies.",
      image:
        "https://images.unsplash.com/photo-1558008258-3256797b43f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      title: "Industrial Machinery Exhibition",
      date: "May 10-12, 2025",
      location: "Pragya Pratisthan, Kamaladi",
      description:
        "Explore our industrial lubricants range at this specialized exhibition for machinery and equipment.",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const pastEvents = [
    {
      id: 4,
      title: "NADA Auto Show 2024",
      date: "September 5-10, 2024",
      location: "Bhrikuti Mandap, Kathmandu",
      description:
        "We showcased our complete range of automotive lubricants at Nepal's premier auto show.",
      image:
        "https://images.unsplash.com/photo-1612810806695-30f7a8258391?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 5,
      title: "Technical Workshop for Mechanics",
      date: "July 15, 2024",
      location: "Moonal Training Center, Kathmandu",
      description:
        "A hands-on workshop for mechanics on the importance of using quality lubricants and proper application techniques.",
      image:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 6,
      title: "Product Launch: New Synthetic Range",
      date: "May 20, 2024",
      location: "Hotel Yak & Yeti, Kathmandu",
      description:
        "We launched our new range of fully synthetic lubricants for high-performance vehicles.",
      image:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 7,
      title: "Annual Dealer Conference 2024",
      date: "February 10, 2024",
      location: "Soaltee Hotel, Kathmandu",
      description:
        "Our annual gathering of dealers from across Nepal to discuss business strategies and recognize top performers.",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    },
  ];

  // Gallery images
  const galleryImages = [
    {
      id: 1,
      title: "NADA Auto Show Booth",
      event: "NADA Auto Show 2024",
      image:
        "https://images.unsplash.com/photo-1612810806695-30f7a8258391?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "Technical Workshop Session",
      event: "Technical Workshop for Mechanics",
      image:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      title: "Product Launch Event",
      event: "New Synthetic Range Launch",
      image:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      title: "Dealer Conference",
      event: "Annual Dealer Conference 2024",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      title: "Product Display",
      event: "NADA Auto Show 2024",
      image:
        "https://images.unsplash.com/photo-1581092335397-9fa341108de8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      title: "Customer Interaction",
      event: "NADA Auto Show 2024",
      image:
        "https://images.unsplash.com/photo-1556125574-d7f27ec36a06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 7,
      title: "Technical Demonstration",
      event: "Technical Workshop for Mechanics",
      image:
        "https://images.unsplash.com/photo-1581092087607-21aee4a0945b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 8,
      title: "Award Ceremony",
      event: "Annual Dealer Conference 2024",
      image:
        "https://images.unsplash.com/photo-1561489413-985b06da5bee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <MainLayout>
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Page Header */}
      {/* Page Header */}
<div className="relative py-24 md:py-32 text-white text-center bg-gradient-to-r from-[#001F3F] via-[#002147] to-[#001F3F]">
  {/* Header Content */}
  <div className="container mx-auto px-4">
    <h1 className="text-5xl font-extrabold mb-4 text-[#FF4500] drop-shadow-lg">
      Events & Gallery
    </h1>
    <p className="text-xl max-w-2xl mx-auto text-gray-200 drop-shadow-md">
      Stay updated with our latest events and browse through our gallery of past activities.
    </p>
  </div>
</div>


      {/* Tab Navigation */}
  {/* Tab Navigation */}
<div className="container mx-auto px-4 py-8">
  <div className="flex justify-center border-b border-gray-300 mb-8">
    {[
      { id: "upcoming", label: "Upcoming Events" },
      { id: "past", label: "Past Events" },
      { id: "gallery", label: "Gallery" },
    ].map((tab) => (
      <button
        key={tab.id}
        className={`py-3 px-6 font-medium text-lg tracking-wide transition-colors duration-300 border-b-2 ${
          activeTab === tab.id
            ? "text-[#FF4500] border-[#FF4500] font-semibold"
            : "text-gray-500 hover:text-[#FF4500] border-transparent"
        }`}
        onClick={() => setActiveTab(tab.id)}
      >
        {tab.label}
      </button>
    ))}
  </div>

  {/* Upcoming Events */}
  {activeTab === "upcoming" && (
    <div>
      <h2 className="text-3xl font-bold text-[#002147] mb-8 text-center">
        🔥 Upcoming Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {upcomingEvents.map((event) => (
          <motion.div
            key={event.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl hover:-translate-y-2 border border-gray-200"
            whileHover={{ y: -5 }}
          >
            <div className="h-60 overflow-hidden group">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-semibold text-[#002147] mb-2">
                {event.title}
              </h3>
              <div className="flex justify-center items-center text-gray-600 mb-2 gap-2">
                <Calendar className="h-5 w-5 text-[#FF4500]" />
                <span className="font-medium">{event.date}</span>
              </div>
              <div className="flex justify-center items-center text-gray-600 mb-4 gap-2">
                <MapPin className="h-5 w-5 text-[#FF4500]" />
                <span className="font-medium">{event.location}</span>
              </div>
              <p className="text-gray-600 mb-4 text-sm">{event.description}</p>
              <a
                href="#"
                className="inline-flex items-center text-[#FF4500] font-medium hover:underline"
              >
                Learn More <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )}

  {/* Past Events */}
  {activeTab === "past" && (
    <div>
      <h2 className="text-3xl font-bold text-[#002147] mb-8 text-center">
        🎉 Past Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {pastEvents.map((event) => (
          <motion.div
            key={event.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl hover:-translate-y-2 border border-gray-200"
            whileHover={{ y: -5 }}
          >
            <div className="h-60 overflow-hidden group">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-semibold text-[#002147] mb-2">
                {event.title}
              </h3>
              <div className="flex justify-center items-center text-gray-600 mb-2 gap-2">
                <Calendar className="h-5 w-5 text-[#FF4500]" />
                <span className="font-medium">{event.date}</span>
              </div>
              <div className="flex justify-center items-center text-gray-600 mb-4 gap-2">
                <MapPin className="h-5 w-5 text-[#FF4500]" />
                <span className="font-medium">{event.location}</span>
              </div>
              <p className="text-gray-600 mb-4 text-sm">{event.description}</p>
              <a
                href="#"
                className="inline-flex items-center text-[#FF4500] font-medium hover:underline"
              >
                View Event Photos <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )}

  {/* Gallery */}
  {activeTab === "gallery" && (
    <div>
      <h2 className="text-3xl font-bold text-[#002147] mb-8 text-center">
        📸 Event Gallery
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleryImages.map((image) => (
          <motion.div
            key={image.id}
            className="relative overflow-hidden rounded-lg shadow-md group transition-all hover:shadow-xl"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={image.image}
              alt={image.title}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white font-semibold text-lg">{image.title}</h3>
              <p className="text-white/80 text-sm">{image.event}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )}
</div>

    </div>
    </MainLayout>
  );
};

export default EventsGalleryPage;
