import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { handleApiCall } from "../../Utils/handleApiCall";
import { useDispatch } from "react-redux";
import { createEvent } from "../../features/event/eventSlice";
const INITIAL_EVENT = {
  title: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  location: "",
  description: "",
  highlights: "",
  images: [],
};

const EventManagement = () => {
  const dispatch = useDispatch();
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Product Launch Event",
      startDate: "2024-03-10",
      endDate: "2024-03-12",
      startTime: "10:00 AM",
      endTime: "5:00 PM",
      location: "Kathmandu",
      description: "Showcasing our new product line.",
      highlights: "Keynote, Networking, Demos",
      images: [
        "https://www.shutterstock.com/image-photo/shipyard-started-serve-public-space-600nw-2486297109.jpg",
      ],
    },
    {
      id: 2,
      title: "Dealer Conference",
      startDate: "2024-03-10",
      endDate: "2024-03-12",
      startTime: "10:00 AM",
      endTime: "5:00 PM",
      location: "Pokhara",
      description: "Annual networking for dealership partners.",
      highlights: "Awards, Seminars, Dinner",
      images: [
        "https://content.sharesansar.com/photos/Ranjana/01/1000701421%20(2).jpg",
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEvent = async (e) => {
    e.preventDefault();

    const {
      title,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
      description,
      highlights,
    } = newEvent;

    // 🛑 Basic validation
    if (
      !title ||
      !startDate ||
      !endDate ||
      !startTime ||
      !endTime ||
      !location
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // ✅ Prepare FormData
    const formData = new FormData();
    formData.append("eventTitle", title);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("location", location);
    formData.append("description", description || "");
    formData.append("highlights", highlights || "");

    // ✅ Append each uploaded image
    uploadedFiles.forEach((file) => {
      formData.append("images", file); // multiple images supported by multer
    });

    // 🛑 Basic validation for images
    if (uploadedFiles.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    handleApiCall({
      apiFunc: () => dispatch(createEvent(formData)).unwrap(),
      loadingMsg: "creating event...",
      successMsg: "Event created successfully!",
      errorMsg: "Failed to create event.",
      onSuccess: () => {
        setIsAdding(false);
        setNewEvent(INITIAL_EVENT);
        setUploadedFiles([]);
      },
    });
  };
  // Inside your component
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [newEvent, setNewEvent] = useState(INITIAL_EVENT);

  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.filter(
      (file) =>
        !uploadedFiles.some((f) => f.name === file.name && f.size === file.size)
    );

    setUploadedFiles((prev) => [...prev, ...newFiles]);
    setNewEvent((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        ...newFiles.map((file) => URL.createObjectURL(file)),
      ],
    }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const removeImage = (index) => {
    const files = [...uploadedFiles];
    files.splice(index, 1);
    setUploadedFiles(files);

    const imgURLs = [...newEvent.images];
    imgURLs.splice(index, 1);
    setNewEvent({ ...newEvent, images: imgURLs });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-[#001F3F] mb-6">
        Event Management
      </h2>

      {/* Search & Add Button */}
      <div className="mb-4 flex md:justify-between flex-col md:flex-row space-y-2 md:space-y-0">
        <input
          type="text"
          placeholder="Search events..."
          className="p-2 border rounded-md w-full md:w-96"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-gradient-to-r from-[#FF4500] to-[#FF6347] text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition"
          onClick={() => setIsAdding(true)}
        >
          <i className="ri-add-line mr-1"></i> Add Event
        </button>
      </div>

      {/* Event List Table View */}
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-x-auto">
        <table className="w-full text-left min-w-max">
          <thead className="bg-[#001F3F] text-white">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Date Range</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => (
              <tr
                key={event.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">
                  {event.images && event.images.length > 0 ? (
                    <img
                      src={event.images[0]}
                      alt="event preview"
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-sm text-gray-400">No image</span>
                  )}
                </td>
                <td className="px-4 py-3 font-semibold text-[#001F3F]">
                  {event.title}
                </td>
                <td className="px-4 py-3">
                  {event.startDate} → {event.endDate}
                </td>
                <td className="px-4 py-3">
                  {event.startTime} - {event.endTime}
                </td>
                <td className="px-4 py-3">{event.location}</td>
                <td className="px-4 py-3 space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    <i className="ri-eye-line"></i> View
                  </button>
                  <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                    <i className="ri-pencil-line"></i> Edit
                  </button>
                  <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                    <i className="ri-delete-bin-line"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal to Add Event */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center p-6 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-2xl max-w-2xl w-full relative"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-center">
                Add New Event
              </h3>
              <form onSubmit={handleAddEvent} className="space-y-4">
                <input
                  type="text"
                  placeholder="Event Title"
                  className="w-full p-3 border rounded-lg"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />

                {/* Date Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="p-3 border rounded-lg w-full"
                      value={newEvent.startDate}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, startDate: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="p-3 border rounded-lg w-full"
                      value={newEvent.endDate}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, endDate: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Time Range */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Start Time
                    </label>
                    <input
                      type="time"
                      className="p-3 border rounded-lg w-full"
                      value={newEvent.startTime}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, startTime: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      End Time
                    </label>
                    <input
                      type="time"
                      className="p-3 border rounded-lg w-full"
                      value={newEvent.endTime}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, endTime: e.target.value })
                      }
                    />
                  </div>
                </div>

                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  placeholder="Location"
                  value={newEvent.location}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, location: e.target.value })
                  }
                />

                <textarea
                  rows={3}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Event Overview / Description"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                ></textarea>

                <textarea
                  rows={2}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Event Highlights (optional)"
                  value={newEvent.highlights}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, highlights: e.target.value })
                  }
                ></textarea>

                {/* Drag & Drop Image Upload */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Upload Images
                  </label>
                  <div
                    {...getRootProps()}
                    className={`w-full p-4 border-2 border-dashed rounded-md text-center cursor-pointer ${
                      isDragActive
                        ? "border-[#FF4500] bg-orange-50"
                        : "border-gray-300"
                    }`}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p className="text-[#FF4500]">Drop images here...</p>
                    ) : (
                      <p className="text-gray-600">
                        Drag & drop images here, or click to select
                      </p>
                    )}
                  </div>

                  {/* Image Previews */}
                  {newEvent.images.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-4">
                      {newEvent.images.map((img, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={img}
                            alt={`preview-${idx}`}
                            className="w-20 h-20 object-cover rounded shadow"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#FF4500] text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Save Event
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

export default EventManagement;
