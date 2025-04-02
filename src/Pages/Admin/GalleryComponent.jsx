import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "remixicon/fonts/remixicon.css";
import Select from "react-select/base";
import { useDropzone } from "react-dropzone";

const GalleryManagement = () => {
  const [gallery, setGallery] = useState([
    {
      id: 1,
      title: "Product Launch Event",
      date: "2024-03-10",
      images: [
        "https://www.shutterstock.com/image-photo/shipyard-started-serve-public-space-600nw-2486297109.jpg",
        "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?cs=srgb&dl=pexels-bertellifotografia-2608517.jpg&fm=jpg",
        "https://images.squarespace-cdn.com/content/v1/5b0325e150a54f13069fb6de/1586897347739-2UZ9CMQR68AKATJQB3U3/IMG_0071.jpeg",
        "https://images.squarespace-cdn.com/content/v1/5b0325e150a54f13069fb6de/1586897347739-2UZ9CMQR68AKATJQB3U3/IMG_0071.jpeg",
      ],
    },
    {
      id: 2,
      title: "Dealer Conference",
      date: "2024-02-15",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Kly_cp1c5XZoefiam3XCndJxUrsp3FVliw&s",
        "https://media.istockphoto.com/id/518198142/photo/visitors-in-art-gallery-looking-at-artwork-and-talking.jpg?s=612x612&w=0&k=20&c=6J9m4sr9nolyfNrQ1_nfXtGlctnhOM65MbwNWrmuO_4=",
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [isAdding, setIsAdding] = useState(false); // Controls modal visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // Event title/id
  const [eventDate, setEventDate] = useState(""); // Date input
  const [uploadedImages, setUploadedImages] = useState([]); // Uploaded image list
  // event options for dropdown and get it from the event list
  const eventOptions = gallery.map((item) => ({
    value: item.id,
    label: item.title,
  }));

  // Filter galleries based on search
  const filteredGallery = gallery.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitGallery = (e) => {
    e.preventDefault();

    if (!selectedEvent || !eventDate || uploadedImages.length === 0) {
      alert("All fields are required.");
      return;
    }

    const newGallery = {
      id: Date.now(),
      title: selectedEvent.label,
      date: eventDate,
      images: uploadedImages,
    };

    setGallery((prev) => [...prev, newGallery]);
    setIsAdding(false);
    setSelectedEvent(null);
    setEventDate("");
    setUploadedImages([]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: true,
    onDrop: (acceptedFiles) => {
      setUploadedImages(acceptedFiles.map((file) => URL.createObjectURL(file)));
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-[#001F3F] mb-6">
        Gallery Management
      </h2>

      {/* Search & Add Button */}
      <div className="mb-4 flex md:justify-between flex-col md:flex-row space-y-2 md:space-y-0">
        <input
          type="text"
          placeholder="Search gallery..."
          className="p-2 border rounded-md w-full md:w-96"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-gradient-to-r from-[#FF4500] to-[#FF6347] text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition"
          onClick={() => setIsAdding(true)}
        >
          <i className="ri-add-line"></i> Add Gallery
        </button>
      </div>

      {/* Gallery Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredGallery.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 cursor-pointer"
            onClick={() => setSelectedGallery(item)}
          >
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.date}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for Viewing Gallery Images */}
      <AnimatePresence>
        {selectedGallery && (
          <motion.div
            className="fixed inset-0  flex justify-center items-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full relative"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-center">
                {selectedGallery.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {selectedGallery.images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt="Gallery Image"
                      className="w-full h-60 object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
              <button
                className="absolute top-4 right-4 text-gray-700 text-3xl"
                onClick={() => setSelectedGallery(null)}
              >
                ✖
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-6 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-xl max-w-xl w-full relative"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
            >
              {/* Modal Header */}
              <h3 className="text-xl font-bold mb-4 text-center">
                Add Gallery
              </h3>

              {/* Form Body */}
              <form onSubmit={handleSubmitGallery}>
                {/* Event Dropdown */}
                <Select
                  options={eventOptions} // From gallery.map()
                  onChange={(option) => setSelectedEvent(option)}
                  isSearchable
                  placeholder="Select Event"
                />

                {/* Date Input */}
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full mt-4 p-2 border rounded-md"
                />

                {/* Drag & Drop Area */}
                <div
                  {...getRootProps()}
                  className="mt-4 border-2 border-dashed p-6 text-center cursor-pointer rounded-md hover:bg-gray-100"
                >
                  <input {...getInputProps()} />
                  <p className="text-gray-500">
                    Drag & drop or click to select images
                  </p>
                </div>

                {/* Image Preview */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {uploadedImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      className="h-24 w-full object-cover rounded-md"
                    />
                  ))}
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    onClick={() => setIsAdding(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Save Gallery
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryManagement;
