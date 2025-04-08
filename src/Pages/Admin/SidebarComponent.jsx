import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "remixicon/fonts/remixicon.css";
import { handleApiCall } from "../../Utils/handleApiCall";
import { useDispatch } from "react-redux";
import { logoutUser, resetAuthState } from "../../features/auth/authSlice";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation(); // Get current path
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: "ri-dashboard-fill", path: "/admin/dashboard" },
    { name: "Contact List", icon: "ri-contacts-fill", path: "/admin/contacts" },
    {
      name: "Dealership Requests",
      icon: "ri-user-follow-fill",
      path: "/admin/dealership",
    },
    { name: "Gallery", icon: "ri-gallery-fill", path: "/admin/gallery" },
    { name: "Events", icon: "ri-calendar-event-fill", path: "/admin/events" },
    { name: "Team Handling", icon: "ri-group-fill", path: "/admin/team" },
    { name: "Products", icon: "ri-box-3-fill", path: "/admin/products" },
    {
      name: "Testimonials",
      icon: "ri-chat-quote-fill",
      path: "/admin/testimonials",
    },
    {
      name: "Subscribers",
      icon: "ri-mail-send-fill",
      path: "/admin/subscribers",
    },
    {
      name: "Settings",
      icon: "ri-settings-3-fill",
      path: "/admin/settings",
    },
  ];

  const handleLogout = () => {
    handleApiCall({
      apiFunc: () => dispatch(logoutUser()).unwrap(),
      successMsg: "Logged out successfully",
      onSuccess: () => {
        dispatch(resetAuthState());
        navigate("/admin/login");
      },
    });
  };

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: isOpen ? 0 : -250 }}
      transition={{ duration: 0.3 }}
      className={`fixed left-0 top-0 h-full w-64 bg-[#001F3F] text-white shadow-lg flex flex-col z-50`}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-600">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button onClick={toggleSidebar} className="text-white text-2xl">
          <i className="ri-close-line"></i>
        </button>
      </div>
      <nav className="flex flex-col mt-4 space-y-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center px-6 py-3 transition ${
              location.pathname === item.path
                ? "bg-[#FF4500] text-white"
                : "hover:bg-[#FF4500]"
            }`}
          >
            <i className={`${item.icon} text-xl mr-3`}></i>
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="flex-grow"></div>
      <div className="p-4 border-t border-gray-600">
        <button
          onClick={handleLogout}
          className="flex items-center w-full text-left px-6 py-3 text-red-500 hover:bg-red-500 hover:text-white transition"
        >
          <i className="ri-logout-circle-r-fill text-xl mr-3"></i>
          Logout
        </button>
      </div>
    </motion.div>
  );
};
Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
