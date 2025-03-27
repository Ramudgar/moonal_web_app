import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from "react";
import Sidebar from "./SidebarComponent";
import Header from "./HeaderComponent";
import Dashboard from "./AdminDashboard";
import Contacts from "./AdminContact";
import DealershipRequests from "./DelearshipComponent";
import GalleryManagement from "./GalleryComponent";
import EventManagement from "./AdminEventPage";
import TeamManagement from "./AdminTeamManagement";
import AdminTestimonialManagement from "./AdminTestimonialManagement";
import AdminSubscriberManagement from "./AdminSubscriberManagement";
import AdminProductManagement from "./AdminProductPage";

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <Header toggleSidebar={toggleSidebar} />
          <main className="p-6">
            <Routes>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/contacts" element={<Contacts />} />
              <Route
                path="/admin/dealership"
                element={<DealershipRequests />}
              />
              <Route path="/admin/gallery" element={<GalleryManagement />} />
              <Route path="/admin/events" element={<EventManagement />} />
              <Route path="/admin/team" element={<TeamManagement />} />
              <Route
                path="/admin/testimonials"
                element={<AdminTestimonialManagement />}
              />
              <Route
                path="/admin/subscribers"
                element={<AdminSubscriberManagement />}
              />
              <Route path="/admin/products" element={<AdminProductManagement />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default AdminLayout;
