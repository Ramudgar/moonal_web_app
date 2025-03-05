import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home";
import ProductsPage from "./Pages/Products";
import ProductDetailPage from "./Pages/ProductDetailPage";
import ContactPage from "./Pages/Contact";
import DealershipPage from "./Pages/Dealership";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/dealership" element={<DealershipPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
