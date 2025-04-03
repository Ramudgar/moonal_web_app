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
function App() {
  return (
    <>
        <Router>
      <Routes>
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
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
    <ToastContainer position="top-right" theme="colored" />
    </>

  );
}

export default App;
