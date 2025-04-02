import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AdminTestimonialManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [editStatus, setEditStatus] = useState(false);
  const [testimonialToEdit, setTestimonialToEdit] = useState(null);

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // you can change 5 to any default number

  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "Customer",
      rating: 5,
      message: "Great service, highly recommended!",
      date: "2021-10-01",
      status: "Approved",
    },
    {
      id: 2,
      name: "Jane Doe",
      role: "Customer",
      rating: 4,
      message: "Good service, will come back again!",
      date: "2021-10-02",
      status: "Approved",
    },
    {
      id: 3,
      name: "John Smith",
      role: "Customer",
      rating: 3,
      message: "Average service, could be better.",
      date: "2021-10-03",
      status: "Rejected",
    },
  ]);

  // filter the testimonials based on search term, rating and status

  const filteredTestimonials = testimonials.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.message.toLowerCase().includes(searchTerm.toLowerCase());

    const rating = Number(filterRating);
    const matchesRating =
      filterRating === "All" ||
      (rating === 5 && t.rating === 5) ||
      (rating === 4 && t.rating >= 4) ||
      (rating === 3 && t.rating >= 3);

    const matchesStatus = filterStatus === "All" || t.status === filterStatus;

    return matchesSearch && matchesRating && matchesStatus;
  });
  // function to handle the view of the testimonial

  const handleViewTestimonial = (testimonial) => {
    setSelectedTestimonial(testimonial);
  };

  // function to handle the status of the testimonial

  const handleTestimonialStatus = (testimonial) => {
    setEditStatus(true);
    setTestimonialToEdit(testimonial);
  };

  // function to update the status of the testimonial
  const updateStatus = (newStatus) => {
    setTestimonials((prev) =>
      prev.map((t) =>
        t.id === testimonialToEdit.id ? { ...t, status: newStatus } : t
      )
    );
    setEditStatus(false);
    setTestimonialToEdit(null);
  };

  // Slice the data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTestimonials = filteredTestimonials.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-[#001F3F] mb-6">
        Testimonial Management
      </h2>

      {/* Search & Filters */}
      <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
        <input
          type="text"
          placeholder="Search by name or message..."
          className="p-2 border rounded-md w-full md:w-96"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          <select
            className="p-1 border rounded ml-4"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page
            }}
          >
            <option value="5">5 / page</option>
            <option value="10">10 / page</option>
            <option value="20">20 / page</option>
          </select>

          <select
            className="p-2 border rounded-md"
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
          >
            <option value="All">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars & Up</option>
            <option value="3">3 Stars & Up</option>
          </select>
          <select
            className="p-2 border rounded-md"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow border border-gray-200 rounded-lg bg-white">
        <table className="min-w-[800px] w-full text-left">
          <thead className="bg-[#001F3F] text-white">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTestimonials.map((testimonial) => (
              <tr
                key={testimonial.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 font-medium">{testimonial.name}</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {testimonial.role}
                </td>
                <td className="px-4 py-3 text-yellow-500">
                  {"⭐".repeat(testimonial.rating)}
                </td>
                <td className="px-4 py-3 line-clamp-1 max-w-xs">
                  {testimonial.message}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {testimonial.date}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      testimonial.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {testimonial.status}{" "}
                  </span>
                  <button
                    onClick={() => handleTestimonialStatus(testimonial)}
                    className="text-blue-600 hover:text-blue-800 hover:cursor-pointer text-md font-medium"
                  >
                    <i className="ri-edit-2-line"></i>
                  </button>
                </td>

                <td className="px-4 py-3 space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    onClick={() => handleViewTestimonial(testimonial)}
                  >
                    <i className="ri-eye-line"></i> View
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

      {/* pagination  */}
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

      {/* View Modal */}

      {selectedTestimonial && (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 bg-black/30 z-50 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="bg-white w-full sm:w-[350px] md:w-[400px] h-[60vh] overflow-y-auto shadow-2xl p-6 rounded-l-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
              >
                <i className="ri-close-line"></i>
              </button>

              {/* Content */}
              <div className="flex flex-col gap-3 mt-4">
                <div>
                  <h3 className="text-xl font-bold text-[#001F3F]">
                    {selectedTestimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedTestimonial.role}
                  </p>
                </div>

                <div>
                  <p className="text-yellow-500 text-lg">
                    {"⭐".repeat(selectedTestimonial.rating)}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-800 leading-relaxed">
                  {selectedTestimonial.message}
                </div>

                <div className="text-xs text-gray-500 mt-2">
                  Submitted on: {selectedTestimonial.date}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* edit status of the testimonial */}

      {editStatus && testimonialToEdit && (
        <AnimatePresence>
          <div
            className="inset-0 z-50 flex justify-center items-center  bg-opacity-30 backdrop-blur-sm"
            style={{ overscrollBehavior: "none" }}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative"
            >
              <h3 className="text-2xl font-bold text-[#001F3F] mb-4">
                Edit Status
              </h3>

              <p className="text-gray-700 mb-6 text-sm">
                Current status:{" "}
                <span
                  className={`font-semibold ${
                    testimonialToEdit.status === "Approved"
                      ? "text-green-600"
                      : testimonialToEdit.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {testimonialToEdit.status}
                </span>
              </p>

              <div className="flex justify-end gap-3">
                {testimonialToEdit.status === "Approved" && (
                  <button
                    onClick={() => updateStatus("Rejected")}
                    className="bg-red-100 text-red-700 font-semibold px-4 py-2 rounded-lg hover:bg-red-200 transition"
                  >
                    Change to Rejected
                  </button>
                )}

                {testimonialToEdit.status === "Rejected" && (
                  <button
                    onClick={() => updateStatus("Approved")}
                    className="bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-lg hover:bg-green-200 transition"
                  >
                    Change to Approved
                  </button>
                )}

                {testimonialToEdit.status === "Pending" && (
                  <>
                    <button
                      onClick={() => updateStatus("Approved")}
                      className="bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-lg hover:bg-green-200 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus("Rejected")}
                      className="bg-red-100 text-red-700 font-semibold px-4 py-2 rounded-lg hover:bg-red-200 transition"
                    >
                      Reject
                    </button>
                  </>
                )}

                <button
                  onClick={() => {
                    requestAnimationFrame(() => {
                      setEditStatus(false);
                      setTestimonialToEdit(null);
                    });
                  }}
                  className="text-gray-600 font-medium hover:underline"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default AdminTestimonialManagement;
