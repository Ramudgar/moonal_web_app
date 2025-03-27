import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import "remixicon/fonts/remixicon.css";
import MainLayout from "../Layouts/MainLayout";

const GalleryDetails = () => {
  const { eventId } = useParams();

  const galleries = [
    {
      id: 1,
      eventTitle: "Product Launch Event",
      images: [
        "https://images.unsplash.com/photo-1513174949-0a27043e40f7",
        "https://images.unsplash.com/photo-1513174949-0a27043e40f7",
        "https://images.unsplash.com/photo-1513174949-0a27043e40f7",
        "https://images.unsplash.com/photo-1513174949-0a27043e40f7",
      ],
    },
    {
      id: 2,
      eventTitle: "Dealer Conference",
      images: [
        "https://images.unsplash.com/photo-1556761175-4b46a572b786",
        "https://images.unsplash.com/photo-1556761175-4b46a572b786",
        "https://images.unsplash.com/photo-1556761175-4b46a572b786",
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846",
      ],
    },
  ];

  const selectedGallery = galleries.find(
    (gallery) => gallery.id === Number(eventId)
  );

  if (!selectedGallery) {
    return (
      <p className="text-center text-xl text-red-500 mt-10">
        Gallery not found.
      </p>
    );
  }

  return (
    <MainLayout>
      <div className="p-6">
        <h2 className="text-3xl font-bold text-[#001F3F] mb-6 text-center">
          {selectedGallery.eventTitle} Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {selectedGallery.images.map((image, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-md group transition-all hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={image}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Image {index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default GalleryDetails;
