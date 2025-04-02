import { useState } from "react";
import { motion } from "framer-motion";
import "remixicon/fonts/remixicon.css";

const DealershipRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@gmail.com",
      phone: "+977 9812345678",
      businessName: "Doe Lubricants",
      businessType: "Sole Proprietorship",
      yearsInBusiness: "3-5 years",
      address: "Kathmandu, Nepal",
      city: "Kathmandu",
      district: "Bagmati",
      investment: "NPR 10-20 Lakhs",
      experience: "5 years in the lubricant industry",
      comments: "Looking forward to collaborating with Moonal Udhyog.",
      requestDate: "2024-03-10",
      message: "Interested in dealership partnership.",
      status: "Pending",
      notes: "",
    },
    {
      id: 2,
      name: "Alice Smith",
      email: "alice@example.com",
      phone: "+977 9801122334",
      businessName: "Smith Auto Parts",
      businessType: "Partnership",
      yearsInBusiness: "5-10 years",
      address: "Pokhara, Nepal",
      city: "Pokhara",
      district: "Gandaki",
      investment: "NPR 20-50 Lakhs",
      experience: "",
      comments: "",
      requestDate: "2024-03-08",
      message: "Looking for dealership opportunities.",
      status: "Resolved",
      notes: "Provided pricing details & dealership contract.",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage, setRequestsPerPage] = useState(10);
  const [filterStatus, setFilterStatus] = useState("All");

  // Filter requests based on search and status
  const filteredRequests = requests.filter((request) => {
    return (
      (filterStatus === "All" || request.status === filterStatus) &&
      (request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.phone.includes(searchTerm) ||
        request.businessName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Pagination Logic
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
  };

  const handleResolveRequest = (id, notes) => {
    if (!notes.trim()) {
      alert("Resolution notes are required to resolve this request.");
      return;
    }

    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "Resolved", notes } : req
      )
    );
    setSelectedRequest(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-[#001F3F] mb-6">
        Dealership Requests
      </h2>

      <div className="mb-2 flex md:justify-between flex-col md:flex-row space-y-2 md:space-y-0 ">
        <div>
          <input
            type="text"
            placeholder="Search dealership requests..."
            className="p-2 border rounded-md w-full md:w-96"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Filters & Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            className="p-2 border rounded-md"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Requests</option>
            <option value="Resolved">Resolved</option>
            <option value="Pending">Pending</option>
          </select>
          <input
            type="number"
            className="p-2 border rounded-md"
            value={requestsPerPage}
            onChange={(e) => setRequestsPerPage(Number(e.target.value) || 1)}
            min="1"
            max="50"
            placeholder="Requests per page"
          />
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-x-auto w-96 md:w-full">
        <table className="w-full min-w-max text-left ">
          <thead className="bg-[#001F3F] text-white">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Business</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Request Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.map((request) => (
              <motion.tr
                key={request.id}
                whileHover={{ scale: 1.02 }}
                className="border-b border-gray-200 hover:bg-gray-100 transition"
              >
                <td className="px-6 py-4">{request.name}</td>
                <td className="px-6 py-4">{request.businessName}</td>
                <td className="px-6 py-4">{request.phone}</td>
                <td className="px-6 py-4">{request.requestDate}</td>
                <td
                  className={`px-6 py-4 font-semibold ${
                    request.status === "Pending"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {request.status}
                </td>
                <td className="px-6 py-4">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition mx-2"
                    onClick={() => handleViewRequest(request)}
                  >
                    <i className="ri-eye-line"></i>{" "}
                    <span className="hidden md:inline-block">View</span>
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-300 px-4 py-2 rounded-lg"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <p className="text-gray-700">
          Page {currentPage} of {totalPages}
        </p>
        <button
          className="bg-gray-300 px-4 py-2 rounded-lg"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
      {/* Right-side Modal for Viewing Request Details */}
      {selectedRequest && (
        <div className="fixed inset-0 flex justify-end bg-opacity-30 transition-opacity">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full max-w-lg h-full bg-white shadow-2xl p-6 fixed right-0 top-0 overflow-y-auto rounded-l-lg"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-2xl font-bold text-gray-800">
                Dealership Request
              </h3>
              <button
                className="text-gray-500 hover:text-gray-800 text-2xl"
                onClick={() => setSelectedRequest(null)}
              >
                ✖
              </button>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center space-x-2 mb-4">
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  selectedRequest.status === "Resolved"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {selectedRequest.status}
              </span>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-900">
                Personal Information
              </h4>
              <p>
                <strong>Name:</strong> {selectedRequest.name}{" "}
                {selectedRequest.lastName}
              </p>
              <p>
                <strong>Email:</strong> {selectedRequest.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedRequest.phone}
              </p>
            </div>

            {/* Business Information */}
            <div className="mt-4 space-y-3">
              <h4 className="text-lg font-semibold text-gray-900">
                Business Information
              </h4>
              <p>
                <strong>Company Name:</strong> {selectedRequest.companyName}
              </p>
              <p>
                <strong>Business Type:</strong> {selectedRequest.businessType}
              </p>
              <p>
                <strong>Years in Business:</strong>{" "}
                {selectedRequest.yearsInBusiness}
              </p>
            </div>

            {/* Location Information */}
            <div className="mt-4 space-y-3">
              <h4 className="text-lg font-semibold text-gray-900">
                Location Information
              </h4>
              <p>
                <strong>Business Address:</strong> {selectedRequest.address}
              </p>
              <p>
                <strong>City:</strong> {selectedRequest.city}
              </p>
              <p>
                <strong>District:</strong> {selectedRequest.district}
              </p>
            </div>

            {/* Additional Information */}
            <div className="mt-4 space-y-3">
              <h4 className="text-lg font-semibold text-gray-900">
                Additional Information
              </h4>
              <p>
                <strong>Industry Experience:</strong>{" "}
                {selectedRequest.experience || "N/A"}
              </p>
              <p>
                <strong>Investment Range:</strong> {selectedRequest.investment}
              </p>
              <p>
                <strong>Comments:</strong> {selectedRequest.comments || "N/A"}
              </p>
            </div>

            {/* Contact Options */}
            <div className="flex gap-3 my-4">
              <a
                href={`mailto:${selectedRequest.email}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                📧 Email
              </a>
              <a
                href={`https://wa.me/${selectedRequest.phone.replace(
                  /\s+/g,
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                📱 WhatsApp
              </a>
            </div>

            {/* Resolve Section */}
            <div className="mt-4">
              <label className="block text-gray-900 font-medium mb-2">
                {selectedRequest.status === "Resolved"
                  ? "Resolution Notes:"
                  : "Add Resolution Notes:"}
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                placeholder="Add resolution notes..."
                value={selectedRequest.notes}
                onChange={(e) =>
                  setSelectedRequest({
                    ...selectedRequest,
                    notes: e.target.value,
                  })
                }
                disabled={selectedRequest.status === "Resolved"} // Disable if already resolved
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-between">
              {selectedRequest.status !== "Resolved" && (
                <button
                  className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
                  onClick={() =>
                    handleResolveRequest(
                      selectedRequest.id,
                      selectedRequest.notes
                    )
                  }
                >
                  ✅ Mark as Resolved
                </button>
              )}

              <button
                className="px-5 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition"
                onClick={() => setSelectedRequest(null)}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DealershipRequests;
