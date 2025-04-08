import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home";
import ProductsPage from "./Pages/Products";
import ProductDetailPage from "./Pages/ProductDetailPage";
import ContactPage from "./Pages/Contact";
import DealershipPage from "./Pages/Dealership";
import EventsGalleryPage from "./Pages/EventGalleryPage";
import EventDetails from "./Pages/EventDetailsPage";
import AboutUs from "./Pages/About";
import PolicyPages from "./Pages/PolicyPages";
import ReviewsPage from "./Pages/ReviewPage";
import GalleryDetails from "./Pages/GalleryDetailsPage";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminLayout from "./Pages/Admin/AdminLayout";
import LoginForm from "./Pages/Admin/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const { user, isUserChecked } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  // Check if user is fetched
  if (!isUserChecked) {
    return null; // or a loading spinner
  }
  return (
    <>
      <Router>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dealership" element={<DealershipPage />} />
          <Route path="/event" element={<EventsGalleryPage />} />
          <Route path="event/:id" element={<EventDetails />} />
          <Route path="/gallery/:eventId" element={<GalleryDetails />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/policy" element={<PolicyPages />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/admin/login" element={<LoginForm />} />
          {/* Admin Routes */}

          <Route
            path="/admin/*"
            element={
              user && user.role === "admin" ? (
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              ) : (
                <h1>404 Not Found</h1>
              )
            }
          />

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" theme="colored" />
    </>
  );
}

export default App;
