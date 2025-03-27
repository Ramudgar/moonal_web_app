import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "remixicon/fonts/remixicon.css";

const Dashboard = () => {
  const analyticsData = [
    { name: "Jan", subscribers: 30, requests: 15 },
    { name: "Feb", subscribers: 50, requests: 20 },
    { name: "Mar", subscribers: 70, requests: 35 },
    { name: "Apr", subscribers: 90, requests: 45 },
    { name: "May", subscribers: 110, requests: 50 },
  ];

  const overviewStats = [
    { label: "Contacts", value: 320, icon: "ri-contacts-fill" },
    { label: "Dealership Requests", value: 85, icon: "ri-user-follow-fill" },
    { label: "Gallery Uploads", value: 150, icon: "ri-gallery-fill" },
    { label: "Events", value: 10, icon: "ri-calendar-event-fill" },
    { label: "Products", value: 45, icon: "ri-box-3-fill" },
    { label: "Testimonials", value: 95, icon: "ri-chat-quote-fill" },
    { label: "Subscribers", value: 1200, icon: "ri-mail-send-fill" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-[#001F3F] mb-6">
        Admin Dashboard
      </h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 border border-gray-200"
          >
            <i className={`${stat.icon} text-4xl text-[#FF4500]`}></i>
            <div>
              <p className="text-xl font-bold text-[#001F3F]">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activities & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Recent Activities */}
        <div className="col-span-2 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-[#001F3F] mb-4">
            Recent Activities
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center space-x-3">
              <i className="ri-check-fill text-[#FF4500]"></i>
              <span>Approved a dealership request</span>
            </li>
            <li className="flex items-center space-x-3">
              <i className="ri-image-fill text-[#FF4500]"></i>
              <span>Uploaded 5 new product images</span>
            </li>
            <li className="flex items-center space-x-3">
              <i className="ri-calendar-event-fill text-[#FF4500]"></i>
              <span>Scheduled a new event for June 15th</span>
            </li>
            <li className="flex items-center space-x-3">
              <i className="ri-mail-send-fill text-[#FF4500]"></i>
              <span>Sent newsletters to 200 subscribers</span>
            </li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-[#001F3F] mb-4">
            Quick Actions
          </h3>
          <button className="w-full bg-[#FF4500] text-white py-2 rounded-lg hover:bg-red-600 transition mb-3">
            Add New Product
          </button>
          <button className="w-full bg-[#FF4500] text-white py-2 rounded-lg hover:bg-red-600 transition mb-3">
            Approve Requests
          </button>
          <button className="w-full bg-[#FF4500] text-white py-2 rounded-lg hover:bg-red-600 transition">
            Manage Team
          </button>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 mt-8">
        <h3 className="text-xl font-bold text-[#001F3F] mb-4">
          Analytics Overview
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="subscribers"
              stroke="#FF4500"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="requests"
              stroke="#001F3F"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
