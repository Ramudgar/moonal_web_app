import { useState } from "react";
import { motion } from "framer-motion";

const TeamManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [viewingMember, setViewingMember] = useState(null);

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Ram Udgar Yadav",
      position: "Founder & CEO",
      bio: "Leading the vision and direction of the company.",
      imageUrl: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      id: 2,
      name: "Sneha Sharma",
      position: "Marketing Head",
      bio: "Managing all marketing strategies and outreach.",
      imageUrl: "https://randomuser.me/api/portraits/women/12.jpg",
    },
  ]);

  const [newMember, setNewMember] = useState({
    name: "",
    position: "",
    bio: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  const filteredMembers = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewMember({ ...newMember, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
        <h2 className="text-3xl font-bold text-[#001F3F]">Team Management</h2>
        <div className="flex gap-4 flex-col md:flex-row w-full md:w-auto">
          <input
            type="text"
            placeholder="Search team..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-md w-full md:w-72"
          />
          <button
            onClick={() => setIsAdding(true)}
            className="bg-gradient-to-r from-[#FF4500] to-[#FF6347] text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
          >
            <i className="ri-add-line mr-1"></i> Add Team Member
          </button>
        </div>
      </div>

      {/* Team Cards */}
      <div className="mt-6 w-96 md:w-auto overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-lg">
        <table className="min-w-[800px] w-full text-left">
          <thead className="bg-[#001F3F] text-white">
            <tr>
              <th className="px-4 py-3">Photo</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Position</th>
              <th className="px-4 py-3">Bio</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <motion.tr
                key={member.id}
                whileHover={{ scale: 1.01 }}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-3 font-semibold text-[#001F3F] whitespace-nowrap">
                  {member.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                  {member.position}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap max-w-xs truncate">
                  {member.bio}
                </td>
                <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                  <button
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    onClick={() => setViewingMember(member)}
                  >
                    <i className="ri-eye-line"></i> View
                  </button>
                  <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                    <i className="ri-pencil-line"></i> Edit
                  </button>
                  <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                    <i className="ri-delete-bin-line"></i> Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal for add team member  */}
      {isAdding && (
        <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative"
          >
            <h3 className="text-2xl font-bold text-[#001F3F] mb-4">
              Add Team Member
            </h3>

            <form className="space-y-4">
              <div>
                <label className="text-sm text-gray-700 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border p-2 rounded-md"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm text-gray-700 font-medium">
                  Position
                </label>
                <input
                  type="text"
                  className="w-full border p-2 rounded-md"
                  value={newMember.position}
                  onChange={(e) =>
                    setNewMember({ ...newMember, position: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm text-gray-700 font-medium">Bio</label>
                <textarea
                  rows={3}
                  className="w-full border p-2 rounded-md"
                  value={newMember.bio}
                  onChange={(e) =>
                    setNewMember({ ...newMember, bio: e.target.value })
                  }
                ></textarea>
              </div>

              <div>
                <label className="text-sm text-gray-700 font-medium">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border rounded-md mt-1"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-3 h-24 w-24 object-cover rounded-full border shadow"
                  />
                )}
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                  onClick={() => {
                    setIsAdding(false);
                    setNewMember({
                      name: "",
                      position: "",
                      bio: "",
                      image: null,
                    });
                    setPreview(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#FF4500] text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  onClick={(e) => {
                    e.preventDefault();
                    // We'll do this in backend/Step 3
                    alert("Member Added");
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* view member code */}

      {viewingMember && (
        <div className="fixed inset-0 z-50 flex justify-end  bg-opacity-20 backdrop-blur-sm">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md h-full bg-white shadow-lg overflow-y-auto p-6 relative"
          >
            <button
              onClick={() => setViewingMember(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl"
            >
              <i className="ri-close-line"></i>
            </button>

            <div className="pt-10 space-y-6">
              <div className="flex flex-col items-center text-center">
                <img
                  src={viewingMember.imageUrl}
                  alt={viewingMember.name}
                  className="w-28 h-28 rounded-full object-cover border shadow mb-3"
                />
                <h3 className="text-2xl font-bold text-[#001F3F]">
                  {viewingMember.name}
                </h3>
                <p className="text-sm text-gray-500 font-medium">
                  {viewingMember.position}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-md font-semibold text-[#001F3F]">Bio</h4>
                <p className="text-gray-700 text-sm">{viewingMember.bio}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;
