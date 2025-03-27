import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { saveAs } from "file-saver";
import Papa from "papaparse";

const AdminSubscriberManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState("Newest"); // Options: Newest, Oldest, A-Z, Z-A
  const [currentPage, setCurrentPage] = useState(1);
  const [viewingSubscriber, setViewingSubscriber] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteMode, setDeleteMode] = useState("multiple"); // or 'single'

  const [subscribers, setSubscribers] = useState([
    {
      id: 1,
      email: "john@example.com",
      date: "2024-03-01",
    },
    {
      id: 2,
      email: "alice@example.com",
      date: "2024-03-03",
    },
    {
      id: 3,
      email: "zara@example.com",
      date: "2024-02-25",
    },
    {
      id: 4,
      email: "bibek@example.com",
      date: "2024-03-04",
    },
    {
      id: 5,
      email: "zara@example.com",
      date: "2024-02-25",
    },
    {
      id: 6,
      email: "bibek@example.com",
      date: "2024-03-04",
    },
  ]);

  // ✅ Search, Sort, Filter Logic (We'll enhance this in next step)
  const filteredSubscribers = [...subscribers].filter((sub) =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Apply Sorting
  const sortedSubscribers = [...filteredSubscribers].sort((a, b) => {
    if (sortBy === "Newest") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === "Oldest") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === "A-Z") {
      return a.email.localeCompare(b.email);
    } else if (sortBy === "Z-A") {
      return b.email.localeCompare(a.email);
    }
    return 0;
  });

  // ✅ Pagination Logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentSubscribers = sortedSubscribers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedSubscribers.length / itemsPerPage);

  // ✅ Delete subscriber
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this subscriber?"
    );
    if (confirmed) {
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // Export data as csv
  const handleExportCSV = () => {
    const csv = Papa.unparse(subscribers);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "subscribers.csv");
  };

  // handle muliple delete

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      alert("Please select subscribers to delete.");
      return;
    }
    setDeleteMode("multiple");
    setShowDeleteConfirm(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-[#001F3F] mb-6">
        Subscriber Management
      </h2>

      {/* Controls: Search, Sort, Per Page */}
      <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
        <input
          type="text"
          placeholder="Search by email..."
          className="p-2 border rounded-md w-full md:w-96"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2 flex-wrap">
          <select
            className="p-2 border rounded-md"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
            <option value="A-Z">Email A-Z</option>
            <option value="Z-A">Email Z-A</option>
          </select>

          <select
            className="p-2 border rounded-md"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5 / page</option>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
          </select>
          <button
            onClick={handleExportCSV}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            <i className="ri-download-line mr-1"></i> Export CSV
          </button>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
        <table className="min-w-[600px] w-full text-left">
          <thead className="bg-[#001F3F] text-white text-sm">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Subscribed On</th>
              <th className="px-4 py-3">Actions</th>
              <th className="px-4 py-3">
                <button
                  onClick={handleDeleteSelected}
                  className=" text-white px-4 py-2 rounded hover:bg-red-700 mb-2"
                >
                  <i className="ri-delete-bin-line mr-1"></i> Delete Selected (
                  {selectedIds.length})
                </button>
                <input
                  id="selectall"
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIds(currentSubscribers.map((s) => s.id));
                    } else {
                      setSelectedIds([]);
                    }
                  }}
                  checked={selectedIds.length === currentSubscribers.length}
                />
                <label htmlFor="selectall"> Select all</label>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentSubscribers.length > 0 ? (
              currentSubscribers.map((sub) => (
                <tr
                  key={sub.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">{sub.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {sub.date}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setViewingSubscriber(sub)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-4"
                    >
                      <i className="ri-eye-line"></i> View
                    </button>

                    <button
                      onClick={() => handleDelete(sub.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      <i className="ri-delete-bin-line"></i> Remove
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(sub.id)}
                      onChange={() => handleSelect(sub.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-4 py-6 text-center text-gray-400">
                  No subscribers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
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
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* View subscribe Modal */}
      <AnimatePresence>
        {viewingSubscriber && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/30 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="bg-white w-full sm:w-[350px] md:w-[400px] h-[50vh] mt-24 rounded-l-2xl p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setViewingSubscriber(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
              >
                <i className="ri-close-line"></i>
              </button>

              <div className="mt-6">
                <h3 className="text-xl font-bold text-[#001F3F] mb-2">
                  Subscriber Info
                </h3>
                <p className="text-gray-700 text-sm mb-1">
                  📧{" "}
                  <span className="font-medium">{viewingSubscriber.email}</span>
                </p>
                <p className="text-gray-600 text-sm">
                  🗓️ Subscribed on:{" "}
                  <span className="font-medium">{viewingSubscriber.date}</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm"
            >
              <h3 className="text-lg font-bold text-[#001F3F] mb-4">
                Confirm Deletion
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete{" "}
                <strong>{selectedIds.length} subscriber(s)</strong>?
              </p>

              <div className="flex justify-end gap-4">
                <button
                  className="text-gray-600 hover:underline"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
                  onClick={() => {
                    setSubscribers((prev) =>
                      prev.filter((sub) => !selectedIds.includes(sub.id))
                    );
                    setSelectedIds([]);
                    setShowDeleteConfirm(false);
                  }}
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminSubscriberManagement;
