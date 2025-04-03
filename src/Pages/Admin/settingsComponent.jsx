import { useState } from "react";
import { motion } from "framer-motion";

const SettingsPage = () => {
  const [company, setCompany] = useState({
    name: "Moonal Udhyog Pvt. Ltd.",
    website: "https://moonaloil.com",
    gst: "PAN12345678",
    contactPerson: "Ram Kumar",
    designation: "Managing Director",
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);


  const users = [
    {
      id: 1,
      name: "Rohit Sharma",
      role: "Admin Assistant",
      status: "Active",
      permissions: ["View", "Edit"],
    },
    {
      id: 2,
      name: "Sita Thapa",
      role: "Editor",
      status: "Suspended",
      permissions: ["View"],
    },
  ];

  const [showUserModal, setShowUserModal] = useState(false);
  const [formUser, setFormUser] = useState({
    name: "",
    email: "",
    role: "Admin Assistant",
    status: "Active",
    permissions: [],
  });

  const togglePermission = (permission) => {
    setFormUser((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleSaveUser = () => {
    if (editingUser) {
      // update logic
    } else {
      // create new user logic
    }
    setShowUserModal(false);
    setEditingUser(null);
  };

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleChangePassword = () => {
    if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
      alert("Please fill all fields");
      return;
    }
    if (passwordForm.new !== passwordForm.confirm) {
      alert("New passwords do not match");
      return;
    }

    // Proceed with actual password update logic (API)
    console.log("Password changed:", passwordForm);

    setShowChangePassword(false);
    setPasswordForm({ current: "", new: "", confirm: "" });
  };

  const handleSaveUserChanges = () => {
    // Validate then update in users list or call backend
    setFormUser((prev) =>
      prev.map((u) => (u.id === editingUser.id ? editingUser : u))
    );
    setEditingUser(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-[#001F3F] mb-6">Settings</h2>

      {/* Company Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[#001F3F]">
            Company Profile
          </h3>
          <button
            onClick={() => setShowEditModal(true)}
            className="text-sm text-blue-600 border px-3 py-1 rounded hover:bg-blue-50"
          >
            Edit Info
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Company Name</p>
            <p className="text-gray-700">{company.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Official Website</p>
            <p className="text-gray-700">{company.website}</p>
          </div>
          <div>
            <p className="text-sm font-medium">GST/PAN Number</p>
            <p className="text-gray-700">{company.gst}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Contact Person</p>
            <p className="text-gray-700">{company.contactPerson}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-medium">Designation</p>
            <p className="text-gray-700">{company.designation}</p>
          </div>
        </div>
      </motion.div>

      {/* Admin Controls Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
      >
        <h3 className="text-xl font-semibold text-[#001F3F] mb-4">
          Admin Controls
        </h3>

        <div className="space-y-4  mb-8">
          <button
            onClick={() => setShowChangePassword(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg mx-0 m-2"
          >
            Change Password
          </button>

          <button
            onClick={() => {
              setShowUserModal(true);
            }}
            className="bg-blue-950 hover:bg-blue-900 text-white px-4 py-2 rounded-lg m-2"
          >
            Add User
          </button>
        </div>

        <div className="overflow-x-auto">
          <h3 className="text-lg font-semibold text-[#001F3F] mb-4">
            User List
          </h3>
          <table className="min-w-[900px] w-full text-left text-sm">
            <thead className="bg-[#F1F5F9] text-[#001F3F]">
              <tr>
                <th className="p-4 font-semibold">👤 Name</th>
                <th className="p-4 font-semibold">🎯 Role</th>
                <th className="p-4 font-semibold">📶 Status</th>
                <th className="p-4 font-semibold">🔐 Permissions</th>
                <th className="p-4 font-semibold">⚙️ Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-4 font-medium text-gray-800 flex items-center gap-2">
                    <i className="ri-user-line text-lg text-[#001F3F]"></i>{" "}
                    {user.name}
                  </td>
                  <td className="p-4 text-gray-700">{user.role}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold inline-block ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      <i
                        className={`${
                          user.status === "Active"
                            ? "ri-check-line"
                            : "ri-error-warning-line"
                        } mr-1`}
                      ></i>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 text-xs">
                    {user.permissions.join(", ")}
                  </td>
                  <td className="p-4 space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      onClick={() => setEditingUser(true)}
                    >
                      <i className="ri-edit-line mr-1"></i>Edit
                    </button>
                    <button
                      className={`${
                        user.status === "Active"
                          ? "text-yellow-600 hover:text-yellow-800"
                          : "text-green-600 hover:text-green-800"
                      } text-sm font-medium`}
                      // onClick={() => handleToggleUserStatus(user)}
                    >
                      <i
                        className={`${
                          user.status === "Active"
                            ? "ri-lock-line"
                            : "ri-lock-unlock-line"
                        } mr-1`}
                      ></i>
                      {user.status === "Active" ? "Suspend" : "Unsuspend"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Edit Company Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white p-6 rounded-xl shadow-xl w-full max-w-xl relative"
          >
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
            >
              <i className="ri-close-line"></i>
            </button>
            <h3 className="text-xl font-bold text-[#001F3F] mb-4">
              Edit Company Info
            </h3>
            <div className="space-y-4">
              <input
                className="w-full p-2 border rounded-md"
                placeholder="Company Name"
                value={company.name}
                onChange={(e) =>
                  setCompany({ ...company, name: e.target.value })
                }
              />
              <input
                className="w-full p-2 border rounded-md"
                placeholder="Website"
                value={company.website}
                onChange={(e) =>
                  setCompany({ ...company, website: e.target.value })
                }
              />
              <input
                className="w-full p-2 border rounded-md"
                placeholder="GST / PAN"
                value={company.gst}
                onChange={(e) =>
                  setCompany({ ...company, gst: e.target.value })
                }
              />
              <input
                className="w-full p-2 border rounded-md"
                placeholder="Contact Person"
                value={company.contactPerson}
                onChange={(e) =>
                  setCompany({ ...company, contactPerson: e.target.value })
                }
              />
              <input
                className="w-full p-2 border rounded-md"
                placeholder="Designation"
                value={company.designation}
                onChange={(e) =>
                  setCompany({ ...company, designation: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showUserModal && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-xl relative"
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl"
              onClick={() => setShowUserModal(false)}
            >
              <i className="ri-close-line"></i>
            </button>

            <h3 className="text-2xl font-bold text-[#001F3F] mb-4">
              {editingUser ? "Edit User" : "Add New User"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formUser.name}
                onChange={(e) =>
                  setFormUser((prev) => ({ ...prev, name: e.target.value }))
                }
                className="border p-2 rounded-md"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formUser.email}
                onChange={(e) =>
                  setFormUser((prev) => ({ ...prev, email: e.target.value }))
                }
                className="border p-2 rounded-md"
              />
              <select
                value={formUser.role}
                onChange={(e) =>
                  setFormUser((prev) => ({ ...prev, role: e.target.value }))
                }
                className="border p-2 rounded-md"
              >
                <option value="Admin">Admin</option>
                <option value="Admin Assistant">Admin Assistant</option>
                <option value="Viewer">Viewer</option>
              </select>
              <select
                value={formUser.status}
                onChange={(e) =>
                  setFormUser((prev) => ({ ...prev, status: e.target.value }))
                }
                className="border p-2 rounded-md"
              >
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            {/* Permissions Section */}
            <div>
              <label className="block font-semibold mb-2 text-[#001F3F]">
                Permissions
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Manage Products",
                  "Manage Users",
                  "View Reports",
                  "Edit Settings",
                ].map((perm) => (
                  <label key={perm} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={formUser.permissions.includes(perm)}
                      onChange={
                        () => togglePermission(perm) // separate function below
                      }
                    />
                    {perm}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                className="text-gray-600 hover:underline"
                onClick={() => setShowUserModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-[#001F3F] text-white px-4 py-2 rounded-md hover:bg-[#002a5e]"
                onClick={handleSaveUser}
              >
                {editingUser ? "Update User" : "Add User"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showChangePassword && (
        <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center px-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md relative"
          >
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-xl"
              onClick={() => setShowChangePassword(false)}
            >
              <i className="ri-close-line"></i>
            </button>

            <h3 className="text-xl font-bold text-[#001F3F] mb-6">
              Change Password
            </h3>

            <div className="space-y-4">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full p-2 border rounded-md"
                value={passwordForm.current}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, current: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full p-2 border rounded-md"
                value={passwordForm.new}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, new: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full p-2 border rounded-md"
                value={passwordForm.confirm}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, confirm: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowChangePassword(false)}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md "
              >
                Update Password
              </button>
            </div>
          </motion.div>
        </div>
      )}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center px-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg relative"
          >
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-xl"
              onClick={() => setEditingUser(null)}
            >
              <i className="ri-close-line"></i>
            </button>

            <h3 className="text-xl font-bold text-[#001F3F] mb-4">
              Edit User - {editingUser.name}
            </h3>

            <div className="space-y-4">
              <input
                className="w-full border rounded-md p-2"
                placeholder="Full Name"
                value={editingUser.name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, name: e.target.value })
                }
              />

              <div>
                <label className="text-sm font-medium mb-1 block">Role</label>
                <select
                  className="w-full border rounded-md p-2"
                  value={editingUser.role}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, role: e.target.value })
                  }
                >
                  <option value="Admin">Admin</option>
                  <option value="AdminAssistant">Admin Assistant</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">
                  Permissions
                </label>
                {/* <div className="grid grid-cols-2 gap-2">
                  {[
                    "Edit Products",
                    "Manage Users",
                    "Change Settings",
                    "View Reports",
                  ].map((perm) => (
                    <label
                      key={perm}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={editingUser.permissions.includes(perm)}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...editingUser.permissions, perm]
                            : editingUser.permissions.filter((p) => p !== perm);
                          setEditingUser({
                            ...editingUser,
                            permissions: updated,
                          });
                        }}
                      />
                      {perm}
                    </label>
                  ))}
                </div> */}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditingUser(null)}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUserChanges}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
