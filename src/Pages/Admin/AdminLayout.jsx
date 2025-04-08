import {  Routes, Route } from "react-router-dom";

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
import AdminSettings from "./settingsComponent";


const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
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
    
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="dealership" element={<DealershipRequests />} />
              <Route path="gallery" element={<GalleryManagement />} />
              <Route path="events" element={<EventManagement />} />
              <Route path="team" element={<TeamManagement />} />
              <Route
                path="testimonials"
                element={<AdminTestimonialManagement />}
              />
              <Route
                path="subscribers"
                element={<AdminSubscriberManagement />}
              />
              <Route path="products" element={<AdminProductManagement />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </main>
        </div>
      </div>
  );
};

export default AdminLayout;
