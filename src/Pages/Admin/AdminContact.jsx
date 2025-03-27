import { useState } from "react";
import { motion } from "framer-motion";
import "remixicon/fonts/remixicon.css";

const Contacts = () => {
  // Sample Contact Data
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+977 9812345678",
      message: "Interested in dealership",
      status: "Pending",
      priority: "High",
      note: "Needs to be contacted ASAP",
    },
    {
      id: 2,
      name: "Alice Smith",
      email: "alice@example.com",
      phone: "+977 9801122334",
      message: "Inquiry about products",
      status: "Resolved",
      priority: "Moderate",
      note: "Follow up after a week",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael@example.com",
      phone: "+977 9845678910",
      message: "Requesting a call back",
      status: "Pending",
      priority: "Low",
      note: "Not urgent",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "+977 9867894561",
      message: "Looking for partnership",
      status: "Resolved",
      priority: "High",
      note: "Needs to be contacted ASAP",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage, setContactsPerPage] = useState(10);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");

  // Filter contacts based on search, status, and priority
  const filteredContacts = contacts.filter((contact) => {
    return (
      (filterStatus === "All" || contact.status === filterStatus) &&
      (filterPriority === "All" || contact.priority === filterPriority) &&
      (contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm))
    );
  });

  // Pagination Logic
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  // Function to View Contact Details
  const [selectedContact, setSelectedContact] = useState(null);

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
  };

  // Function to Resolve Contact
  const handleResolveContact = (id, notes) => {
    if (!notes.trim()) {
      alert("Notes are required to resolve a contact.");
      return;
    }

    setContacts(
      contacts.map((contact) =>
        contact.id === id ? { ...contact, status: "Resolved", notes } : contact
      )
    );
  };

  return (
    <div className=" md:p-6">
      <h2 className="text-3xl font-bold text-[#001F3F] mb-6">
        Contact Management
      </h2>

      <div className="mb-2 flex md:justify-between flex-col md:flex-row space-y-2 md:space-y-0 ">
        <div>
          <input
            type="text"
            placeholder="Search contacts..."
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
            <option value="All">All Contacts</option>
            <option value="Resolved">Resolved</option>
            <option value="Pending">Pending</option>
          </select>
          <select
            className="p-2 border rounded-md"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Moderate">Moderate</option>
            <option value="Low">Low</option>
          </select>
          <input
            type="number"
            className="p-2 border rounded-md"
            value={contactsPerPage}
            onChange={(e) => setContactsPerPage(Number(e.target.value) || 1)}
            min="1"
            max="50"
            placeholder="Contacts per page"
          />
        </div>
        {/* search input */}
      </div>

      {/* Contact Table */}
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-x-auto w-96 md:w-full">
        <table className="w-full min-w-max text-left ">
          <thead className="bg-[#001F3F] text-white">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Message</th>
              <th className="px-6 py-3">Priority</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.map((contact) => (
              <motion.tr
                key={contact.id}
                whileHover={{ scale: 1.02 }}
                className="border-b border-gray-200 hover:bg-gray-100 transition"
              >
                <td className="px-6 py-4">{contact.name}</td>
                <td className="px-6 py-4">{contact.email}</td>
                <td className="px-6 py-4">{contact.phone}</td>
                <td className="px-6 py-4">{contact.message}</td>
                <td className="px-6 py-4 font-semibold">{contact.priority}</td>
                <td
                  className={`px-6 py-4 font-semibold ${
                    contact.status === "Pending"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {contact.status}
                </td>
                <td className="px-6 py-4">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition mx-2"
                    onClick={() => handleViewContact(contact)}
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

      {selectedContact && (
        <div className="fixed inset-0 flex justify-end  bg-opacity-30 transition-opacity">
          <motion.div
            initial={{ x: "100%" }} // Starts off-screen (right)
            animate={{ x: 0 }} // Slides in
            exit={{ x: "100%" }} // Slides out
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full max-w-lg h-full bg-white shadow-2xl p-6 fixed right-0 top-0 overflow-y-auto rounded-l-lg"
          >
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-2xl font-bold text-gray-800">
                Contact Details
              </h3>
              <button
                className="text-gray-500 hover:text-gray-800 text-2xl"
                onClick={() => setSelectedContact(null)}
              >
                ✖
              </button>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center space-x-2 mb-4">
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  selectedContact.status === "Resolved"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {selectedContact.status}
              </span>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <p className="text-gray-700">
                <strong className="text-gray-900">Name:</strong>{" "}
                {selectedContact.name}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Email:</strong>{" "}
                {selectedContact.email}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Phone:</strong>{" "}
                {selectedContact.phone}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Message:</strong>{" "}
                {selectedContact.message}
              </p>
            </div>

            {/* Notes Section */}
            <div className="mt-4">
              <label className="block text-gray-900 font-medium mb-2">
                {selectedContact.status === "Resolved"
                  ? "Resolution Notes:"
                  : "Add Resolution Notes:"}
              </label>
              {selectedContact.status === "Resolved" ? (
                <p className="text-gray-700 mb-2">{selectedContact.note}</p>
              ) : (
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                  placeholder="Add resolution notes..."
                  value=""
                  onChange={(e) =>
                    setSelectedContact({
                      ...selectedContact,
                      notes: e.target.value,
                    })
                  }
                  disabled={selectedContact.status === "Resolved"} // Disable if already resolved
                ></textarea>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-between">
              {/* Resolve Button - Only visible if not resolved */}
              {selectedContact.status !== "Resolved" && (
                <button
                  className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
                  onClick={() =>
                    handleResolveContact(
                      selectedContact.id,
                      selectedContact.note
                    )
                  }
                >
                  ✅ Mark as Resolved
                </button>
              )}

              {/* Close Button */}
              <button
                className="px-5 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition"
                onClick={() => setSelectedContact(null)}
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

export default Contacts;
