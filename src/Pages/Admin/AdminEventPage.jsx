import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { handleApiCall } from "../../Utils/handleApiCall";
import { useDispatch, useSelector } from "react-redux";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEventWithGallery,
} from "../../features/event/eventSlice";
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
  const { events, loading } = useSelector((state) => state.event);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  // state for confirm delete modal
  const [confirmDelete, setConfirmDelete] = useState(false);
  //variable for pagination
  const totalPages = Math.ceil(events.length / itemsPerPage);

  const filteredEvents = events
    .filter((event) =>
      event.eventTitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOrder === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });
  // Paginate events
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log("eidtMode", editMode);

  // function to handle form submission for adding or updating an event
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

    // ✅ Validation for required fields
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

    // ✅ If it's NOT edit mode, image is required
    if (!editMode && uploadedFiles.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    // ✅ Append images only if user uploaded during this session
    if (uploadedFiles.length > 0) {
      uploadedFiles.forEach((file) => {
        formData.append("images", file);
      });
    }

    // ✅ Choose whether to create or update
    const config = editMode
      ? {
          apiFunc: () =>
            dispatch(
              updateEventWithGallery({ id: newEvent._id, formData })
            ).unwrap(),
          loadingMsg: "Updating event...",
          successMsg: "Event updated successfully!",
          errorMsg: "Failed to update event.",
        }
      : {
          apiFunc: () => dispatch(createEvent(formData)).unwrap(),
          loadingMsg: "Creating event...",
          successMsg: "Event created successfully!",
          errorMsg: "Failed to create event.",
        };

    handleApiCall({
      ...config,
      onSuccess: () => {
        setShowFormModal(false);
        setNewEvent(INITIAL_EVENT);
        setUploadedFiles([]);
        dispatch(getEvents());
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

  // format date function
  const formatDate = (date) => {
    return date.split("T")[0];
  };

  // function to handle delete event
  const handleDeleteEvent = async (id) => {
    if (confirmDelete) {
      handleApiCall({
        apiFunc: () => dispatch(deleteEvent(id)).unwrap(),
        loadingMsg: "Deleting event...",
        successMsg: "Event deleted successfully!",
        errorMsg: "Failed to delete event.",
        onSuccess: () => {
          setConfirmDelete(false);
          dispatch(getEvents());
        },
      });
    }
  };

  // react useEffect to fetch events on component mount

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-[#001F3F] mb-6">
        Event Management
      </h2>

      {/* Filters & Controls */}
      <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
        <input
          type="text"
          placeholder="Search events..."
          className="p-2 border rounded-md w-full md:w-96"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2 flex-wrap">
          <select
            className="p-2 border rounded-md"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <select
            className="p-2 border rounded-md"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={5}>5 / page</option>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
          </select>
          <button
            className="bg-gradient-to-r from-[#FF4500] to-[#FF6347] text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition"
            onClick={() => {
              setShowFormModal(true);
              setNewEvent(INITIAL_EVENT);
              setUploadedFiles([]);
              setEditMode(false);
            }}
          >
            <i className="ri-add-line mr-1"></i> Add Event
          </button>
        </div>
      </div>

      {/* Event List Table View */}
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="loader"></div>
          </div>
        ) : (
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
              {paginatedEvents.map((event) => (
                <tr
                  key={event._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">
                    {event.gallery && event.gallery.length > 0 ? (
                      <img
                        src={event.gallery[0].url}
                        alt="event preview"
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      <span className="text-sm text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#001F3F]">
                    {event.eventTitle}
                  </td>
                  <td className="px-4 py-3">
                    {formatDate(event.startDate)} → {formatDate(event.endDate)}
                  </td>
                  <td className="px-4 py-3">
                    {event.startTime} - {event.endTime}
                  </td>
                  <td className="px-4 py-3">{event.location}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      onClick={() => {
                        setViewModal(true);
                        setSelectedEvent(event);
                      }}
                    >
                      <i className="ri-eye-line"></i> View
                    </button>

                    <button
                      onClick={() => {
                        setEditMode(true);
                        setNewEvent({
                          _id: event._id,
                          title: event.eventTitle,
                          startDate: formatDate(event.startDate),
                          endDate: formatDate(event.endDate),
                          startTime: event.startTime,
                          endTime: event.endTime,
                          location: event.location,
                          description: event.description,
                          highlights: event.highlights,
                          images: event.gallery?.map((img) => img.url) || [],
                        });
                        setShowFormModal(true);
                      }}
                      className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                    >
                      <i className="ri-pencil-line"></i> Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setConfirmDelete(true);
                      }}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      <i className="ri-delete-bin-line"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal to Add Event */}
      <AnimatePresence>
        {showFormModal && (
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
                {editMode ? "Edit Event" : "Add New Event"}
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
                  {newEvent?.images?.length > 0 && (
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
                    onClick={() => {
                      setShowFormModal(false);
                      setEditMode(false);
                      setNewEvent(INITIAL_EVENT);
                      setUploadedFiles([]);
                    }}
                    className="bg-gray-400 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#FF4500] hover:bg-red-600"
                    } text-white px-4 py-2 rounded-md`}
                  >
                    {loading
                      ? editMode
                        ? "Updating..."
                        : "Creating..."
                      : editMode
                      ? "Update Event"
                      : "Create Event"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Slide-in Event View Modal */}
      <AnimatePresence>
        {viewModal && (
          <motion.div
            className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-lg h-full overflow-y-auto shadow-lg relative rounded-l-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b px-6 py-4">
                <h2 className="text-xl font-semibold text-[#001F3F]">
                  {selectedEvent.eventTitle}
                </h2>
                <button
                  onClick={() => {
                    setViewModal(false);
                    setSelectedEvent(null);
                  }}
                  className="text-gray-500 hover:text-red-600 text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6 text-sm text-gray-700">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-gray-600">Start Date</p>
                    <p className="text-[#001F3F] font-semibold">
                      {formatDate(selectedEvent.startDate)}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">End Date</p>
                    <p className="text-[#001F3F] font-semibold">
                      {formatDate(selectedEvent.endDate)}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Start Time</p>
                    <p className="text-[#001F3F] font-semibold">
                      {selectedEvent.startTime}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">End Time</p>
                    <p className="text-[#001F3F] font-semibold">
                      {selectedEvent.endTime}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-medium text-gray-600">Location</p>
                    <p className="text-[#001F3F] font-semibold">
                      {selectedEvent.location}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {selectedEvent.description && (
                  <div>
                    <p className="font-medium text-gray-600 mb-1">
                      Description
                    </p>
                    <div className="bg-gray-50 border p-3 rounded-md text-gray-800">
                      {selectedEvent.description}
                    </div>
                  </div>
                )}

                {/* Highlights */}
                {selectedEvent.highlights && (
                  <div>
                    <p className="font-medium text-gray-600 mb-1">Highlights</p>

                    {selectedEvent.highlights.includes(",") ? (
                      <ol className="list-decimal list-inside space-y-1 bg-gray-50 border p-3 rounded-md text-gray-800">
                        {selectedEvent.highlights
                          .split(",")
                          .map((item, idx) => (
                            <li key={idx} className="pl-1">
                              {item.trim()}
                            </li>
                          ))}
                      </ol>
                    ) : (
                      <div className="bg-gray-50 border p-3 rounded-md text-gray-800">
                        {selectedEvent.highlights}
                      </div>
                    )}
                  </div>
                )}

                {/* Gallery */}
                <div>
                  <p className="font-medium text-gray-600 mb-2">Gallery</p>
                  {selectedEvent.gallery && selectedEvent.gallery.length > 0 ? (
                    <div className="grid grid-cols-3 gap-3">
                      {selectedEvent.gallery.map((img, idx) => (
                        <img
                          key={idx}
                          src={img.url}
                          alt={`Gallery ${idx}`}
                          className="w-full h-24 object-cover rounded-md shadow-sm border"
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">No images available.</p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Delete Modal */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center p-6 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
            >
              <h3 className="text-lg font-bold mb-4 text-center">
                Are you sure you want to delete this event?
              </h3>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteEvent(selectedEvent._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventManagement;
