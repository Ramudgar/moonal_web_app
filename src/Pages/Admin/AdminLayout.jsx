import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from "react";
import Sidebar from "./SidebarComponent";
import Header from "./HeaderComponent";
import Dashboard from "./AdminDashboard";

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
          <Header toggleSidebar={toggleSidebar} />
          <main className="p-6">
            <Routes>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              {/* <Route path="/admin/contacts" element={<Contacts />} />
              <Route path="/admin/dealership" element={<Dealership />} />
              <Route path="/admin/gallery" element={<Gallery />} />
              <Route path="/admin/events" element={<Events />} />
              <Route path="/admin/team" element={<Team />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/testimonials" element={<Testimonials />} />
              <Route path="/admin/subscribers" element={<Subscribers />} /> */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default AdminLayout;
