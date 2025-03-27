import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "remixicon/fonts/remixicon.css";

const AdminProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Premium Engine Oil 5W-30",
      category: "Engine Oil",
      price: 3200,
      image:
        "https://images.unsplash.com/photo-1603200492388-65284fc30b23?auto=format&fit=crop&w=600&q=60",
      inStock: 120,
    },
    {
      id: 2,
      name: "Eco Engine Oil 10W-40",
      category: "Engine Oil",
      price: 2800,
      image:
        "https://images.unsplash.com/photo-1581090700227-1e8e8b3dd274?auto=format&fit=crop&w=600&q=60",
      inStock: 95,
    },
    {
      id: 3,
      name: "Premium Engine Oil 5W-30",
      category: "Engine Oil",
      price: 3200,
      image:
        "https://images.unsplash.com/photo-1603200492388-65284fc30b23?auto=format&fit=crop&w=600&q=60",
      inStock: 120,
    },
    {
      id: 4,
      name: "Eco Engine Oil 10W-40",
      category: "Engine Oil",
      price: 2800,
      image:
        "https://images.unsplash.com/photo-1581090700227-1e8e8b3dd274?auto=format&fit=crop&w=600&q=60",
      inStock: 95,
    },
    {
      id: 5,
      name: "Premium Engine Oil 5W-30",
      category: "Engine Oil",
      price: 3200,
      image:
        "https://images.unsplash.com/photo-1603200492388-65284fc30b23?auto=format&fit=crop&w=600&q=60",
      inStock: 120,
    },
    {
      id: 6,
      name: "Eco Engine Oil 10W-40",
      category: "Engine Oil",
      price: 2800,
      image:
        "https://images.unsplash.com/photo-1581090700227-1e8e8b3dd274?auto=format&fit=crop&w=600&q=60",
      inStock: 95,
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [viewProduct, setViewProduct] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") return b.id - a.id;
      if (sortOrder === "oldest") return a.id - b.id;
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setConfirmDelete(null);
  };

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    specifications: "",
    benefits: "",
    packaging: "",
    inStock: true,
    image: null,
    imagePreview: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSizeInMB = 2;

    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG and PNG images are allowed.");
      return;
    }

    if (file.size > maxSizeInMB * 1024 * 1024) {
      alert(`File size must be less than ${maxSizeInMB}MB.`);
      return;
    }

    setNewProduct((prev) => ({
      ...prev,
      image: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  const handleSaveProduct = () => {
    const { name, category, price, inStock } = newProduct;

    if (!name || !category || !price || !inStock) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("Product to save:", newProduct);
    // Add product to the product list (or call API)
    setShowAddModal(false);
    setNewProduct({
      name: "",
      category: "",
      price: "",
      inStock: "",
      description: "",
      packagingSizes: "",
      specifications: "",
      benefits: "",
      image: null,
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-[#001F3F] mb-6">
        Product Management
      </h2>

      {/* Filters & Controls */}
      <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 border rounded-md w-full md:w-96"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2 flex-wrap">
          <select
            className="p-2 border rounded-md"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Engine Oil">Engine Oil</option>
            <option value="Lubricants">Lubricants</option>
          </select>

          <select
            className="p-2 border rounded-md"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="asc">Price Low to High</option>
            <option value="desc">Price High to Low</option>
          </select>
          <select
            className="p-2 border rounded-md"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={5}>5 / page</option>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
          </select>
          <button
            className="bg-gradient-to-r from-[#FF4500] to-[#FF6347] text-white px-4 py-2 rounded-md hover:bg-[#003366]"
            onClick={() => setShowAddModal(true)}
          >
            <i className="ri-add-line mr-1"></i> Add Product
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto shadow border border-gray-200 rounded-lg bg-white">
        <table className="min-w-[900px] w-full text-left ">
          <thead className="bg-[#001F3F] text-white">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">In Stock</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-[#001F3F]">
                  {product.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {product.category}
                </td>
                <td className="px-4 py-3 text-sm">Rs. {product.price}</td>
                <td className="px-4 py-3 text-sm">{product.inStock}</td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => setViewProduct(product)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    <i className="ri-eye-line"></i> View
                  </button>
                  <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                    <i className="ri-pencil-line"></i> Edit
                  </button>
                  <button
                    onClick={() => setConfirmDelete(product)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    <i className="ri-delete-bin-line"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* View Modal */}
      <AnimatePresence>
        {viewProduct && (
          <motion.div
            className="fixed inset-0 bg-black/30 z-50 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="bg-white w-full sm:w-[400px] md:w-[500px] h-[70vh] overflow-y-auto shadow-2xl p-6 rounded-l-2xl relative"
            >
              <button
                onClick={() => setViewProduct(null)}
                className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
              >
                <i className="ri-close-line"></i>
              </button>
              <h3 className="text-xl font-bold text-[#001F3F] mb-4">
                {viewProduct.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Category: {viewProduct.category}
              </p>
              <img
                src={viewProduct.image}
                alt={viewProduct.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <p className="text-sm mb-2">Price: Rs. {viewProduct.price}</p>
              <p className="text-sm mb-2">In Stock: {viewProduct.inStock}</p>
              <p className="font-semibold mt-4">Specifications:</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {viewProduct.specifications?.map((spec, idx) => (
                  <li key={idx}>{spec}</li>
                ))}
              </ul>
              <p className="font-semibold mt-4">Benefits:</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {viewProduct.benefits?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="font-semibold mt-4">Packaging Sizes:</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {viewProduct.packagingSizes?.map((size, idx) => (
                  <li key={idx}>{size}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Delete */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center"
            >
              <h4 className="text-lg font-semibold text-[#001F3F] mb-3">
                Confirm Deletion
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to delete <b>{confirmDelete.name}</b>?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleDeleteProduct(confirmDelete.id)}
                  className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200"
                >
                  Delete
                </button>
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 relative"
          >
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
            >
              <i className="ri-close-line"></i>
            </button>

            <h3 className="text-2xl font-bold mb-6 text-[#001F3F]">
              Add New Product
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="border p-2 rounded-md"
              />
              <select
                name="category"
                value={newProduct.category}
                onChange={handleChange}
                className="border p-2 rounded-md"
              >
                <option value="">Select Category</option>
                <option>Engine Oil</option>
                <option>Brake Fluid</option>
                <option>Coolant</option>
              </select>

              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                placeholder="Price (NPR)"
                className="border p-2 rounded-md"
              />
              <input
                type="number"
                name="inStock"
                value={newProduct.inStock}
                onChange={handleChange}
                placeholder="In Stock Quantity"
                className="border p-2 rounded-md"
              />
            </div>

            <textarea
              placeholder="Description"
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              rows={3}
              className="w-full mt-4 border p-2 rounded-md"
            ></textarea>

            <input
              type="text"
              name="packagingSizes"
              value={newProduct.packagingSizes}
              onChange={handleChange}
              placeholder="Packaging Sizes (e.g. 1L, 4L, 20L)"
              className="w-full mt-4 border p-2 rounded-md"
            />

            <textarea
              placeholder="Specifications (separate with commas)"
              name="specifications"
              value={newProduct.specifications}
              onChange={handleChange}
              rows={2}
              className="w-full mt-4 border p-2 rounded-md"
            ></textarea>

            <textarea
              placeholder="Benefits (separate with commas)"
              name="benefits"
              value={newProduct.benefits}
              onChange={handleChange}
              rows={2}
              className="w-full mt-4 border p-2 rounded-md"
            ></textarea>
            <div className="mt-4">
              <label className="block mb-1 font-medium">Upload Image</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full border rounded-md p-2"
              />

              {newProduct.imagePreview && (
                <div className="mt-3">
                  <p className="text-sm text-gray-500 mb-1">Preview:</p>
                  <img
                    src={newProduct.imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded border"
                  />
                </div>
              )}
            </div>

            <div className="mt-6 text-right">
              <button
                className="bg-gradient-to-r from-[#FF4500] to-[#FF6347] text-white px-6 py-2 rounded-md hover:bg-[#FF6347]"
                onClick={handleSaveProduct}
              >
                Save Product
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminProductManagement;
