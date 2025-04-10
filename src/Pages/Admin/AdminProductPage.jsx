import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "remixicon/fonts/remixicon.css";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { handleApiCall } from "../../Utils/handleApiCall";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../../features/product/productSlice";

const AdminProductManagement = () => {
  // 👀 Form setup from reat-hook-form
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  // 👀 Watch image input
  const selectedImage = watch("image");
  const imagePreview =
    selectedImage && selectedImage.length > 0
      ? URL.createObjectURL(selectedImage[0])
      : null;

  // 👀 Category and vehicle options
  const categoryOptions = [
    "engine oil",
    "gear oil",
    "brake oil",
    "coolant",
    "grease",
  ];

  const vehicleOptions = [
    { label: "Bike", value: "Bike" },
    { label: "Car", value: "Car" },
    { label: "Truck", value: "Truck" },
    { label: "Bus", value: "Bus" },
  ];

  // dispatch function
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const { products, loading } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [viewProduct, setViewProduct] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Filter and sort products based on user input
  const filteredProducts = (products || [])
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOrder === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 👀 State for managing product creation and editing

  const [editMode, setEditMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // 👀 Function to close modal
  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditMode(false);
    setEditingProduct(null);
    setExistingImagePreview(null); // ✅ clear
    reset(); // clear form
  };

  // handle delete product
  const handleDeleteProduct = (id) => {
    handleApiCall({
      apiFunc: () => dispatch(deleteProduct(id)).unwrap(),
      loadingMsg: "Deleting product...",
      successMsg: "Product deleted successfully!",
      errorMsg: "Failed to delete product.",
      onSuccess: () => {
        setConfirmDelete(null);
        dispatch(getAllProducts());
      },
    });
  };

  // 👀 Function to handle product creation and editing
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("availiablePackaging", data.packagingSizes);

    data.suitableFor.forEach((item) =>
      formData.append("suitableFor[]", item.value)
    );

    data.specifications
      .split(",")
      .map((item) => item.trim())
      .forEach((s) => formData.append("specifications[]", s));

    data.benefits
      .split(",")
      .map((item) => item.trim())
      .forEach((b) => formData.append("benefits[]", b));

    // Append image only if user selected a new one
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    const apiConfig = editMode
      ? {
          loadingMsg: "Updating product...",
          successMsg: "Product updated successfully!",
          errorMsg: "Failed to update product.",
          apiFunc: () =>
            dispatch(
              updateProduct({ id: editingProduct._id, formData })
            ).unwrap(),
          onSuccess: () => {
            setShowAddModal(false);
            setEditMode(false);
            setEditingProduct(null);
            dispatch(getAllProducts());
          },
        }
      : {
          loadingMsg: "Adding product...",
          successMsg: "Product added successfully!",
          errorMsg: "Failed to add product.",
          apiFunc: () => dispatch(createProduct(formData)).unwrap(),
          onSuccess: () => {
            setShowAddModal(false);
            dispatch(getAllProducts());
          },
        };

    handleApiCall(apiConfig);
    reset();
  };

  // Fetch products once
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const [existingImagePreview, setExistingImagePreview] = useState(null);

  useEffect(() => {
    if (showAddModal) {
      if (editMode && editingProduct) {
        reset({
          name: editingProduct.name,
          category: editingProduct.category,
          price: editingProduct.price,
          description: editingProduct.description,
          packagingSizes: editingProduct.availiablePackaging,
          suitableFor: editingProduct.suitableFor.map((val) => ({
            label: val,
            value: val,
          })),
          specifications: editingProduct.specifications?.join(", "),
          benefits: editingProduct.benefits?.join(", "),
          image: null,
        });

        setExistingImagePreview(editingProduct.image); // ✅ show existing image
      } else {
        reset({
          name: "",
          category: "",
          price: "",
          description: "",
          packagingSizes: "",
          suitableFor: [],
          specifications: "",
          benefits: "",
          image: null,
        });

        setExistingImagePreview(null); // clear old preview
      }
    }
  }, [editMode, editingProduct, showAddModal, reset]);

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
            {categoryOptions.map((category, index) => (
              <option key={index} value={category}>
                {category
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </option>
            ))}
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
            onClick={() => {
              setEditMode(false);
              setEditingProduct(null);
              setShowAddModal(true);
            }}
          >
            <i className="ri-add-line mr-1"></i> Add Product
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto shadow border border-gray-200 rounded-lg bg-white">
        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : (
          <table className="min-w-[900px] w-full text-left ">
            <thead className="bg-[#001F3F] text-white">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <tr
                  key={product._id}
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
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => setViewProduct(product)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      <i className="ri-eye-line"></i> View
                    </button>
                    <button
                      onClick={() => {
                        setEditMode(true);
                        setEditingProduct(product);
                        setShowAddModal(true);
                      }}
                      className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                    >
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
        )}
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
            className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl p-6 relative overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setViewProduct(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl"
              >
                <i className="ri-close-line"></i>
              </button>

              {/* Product Image */}
              <div className="mb-6">
                <img
                  src={viewProduct.image}
                  alt={viewProduct.name}
                  className="w-full h-64 object-cover rounded-xl border shadow-sm"
                />
              </div>

              {/* Product Info */}
              <h3 className="text-2xl font-bold text-[#001F3F] mb-2">
                {viewProduct.name}
              </h3>

              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium text-[#001F3F]">Category:</span>{" "}
                {viewProduct.category}
              </p>

              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium text-[#001F3F]">Price:</span> Rs.{" "}
                {viewProduct.price}
              </p>

              <p className="text-sm text-gray-600 mb-4">
                <span className="font-medium text-[#001F3F]">Description:</span>{" "}
                {viewProduct.description}
              </p>

              {/* available packaging */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm text-[#001F3F] mb-1">
                  Available Packaging:
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                    {viewProduct.availiablePackaging}
                  </span>
                </div>
              </div>

              {/* Badges for suitableFor */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm text-[#001F3F] mb-1">
                  Suitable For:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {viewProduct.suitableFor?.map((vehicle, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                    >
                      {vehicle}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              {viewProduct.specifications?.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-[#001F3F] mb-1">
                    Specifications:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {viewProduct.specifications.map((spec, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {viewProduct.benefits?.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-[#001F3F] mb-1">
                    Benefits:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {viewProduct.benefits.map((benefit, idx) => (
                      <span
                        key={idx}
                        className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Packaging Sizes */}
              {viewProduct.packagingSizes?.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-[#001F3F] mb-1">
                    Packaging Sizes:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {viewProduct.packagingSizes.map((size, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}
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
                  onClick={() => handleDeleteProduct(confirmDelete._id)}
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
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
            >
              <i className="ri-close-line"></i>
            </button>

            <h3 className="text-2xl font-bold mb-6 text-[#001F3F]">
              {editMode ? "Edit Product" : "Add New Product"}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Product Name"
                    {...register("name", {
                      required: "Product name is required",
                    })}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <select
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.map((category, index) => (
                      <option key={index} value={category}>
                        {category
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </option>
                    ))}
                  </select>

                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <input
                    type="number"
                    placeholder="Price (NPR)"
                    {...register("price", { required: "Price is required" })}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                {/* Suitable For */}
                <div>
                  <Controller
                    name="suitableFor"
                    control={control}
                    rules={{
                      required: "Please select at least one vehicle type",
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        options={vehicleOptions}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="Suitable For"
                      />
                    )}
                  />
                  {errors.suitableFor && (
                    <p className="text-red-500 text-sm">
                      {errors.suitableFor.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mt-4">
                <textarea
                  placeholder="Description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows={3}
                  className="w-full border p-2 rounded-md"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Packaging Sizes */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Packaging Sizes (e.g. 1L, 4L)"
                  {...register("packagingSizes", {
                    required: "Packaging sizes are required",
                  })}
                  className="w-full border p-2 rounded-md"
                />
                {errors.packagingSizes && (
                  <p className="text-red-500 text-sm">
                    {errors.packagingSizes.message}
                  </p>
                )}
              </div>

              {/* Specifications */}
              <div className="mt-4">
                <textarea
                  placeholder="Specifications (comma separated)"
                  {...register("specifications")}
                  rows={2}
                  className="w-full border p-2 rounded-md"
                ></textarea>
              </div>

              {/* Benefits */}
              <div className="mt-4">
                <textarea
                  placeholder="Benefits (comma separated)"
                  {...register("benefits")}
                  rows={2}
                  className="w-full border p-2 rounded-md"
                ></textarea>
              </div>

              {/* Image Upload */}
              <div className="mt-4">
                <input
                  type="file"
                  {...register("image", {
                    ...(editMode ? {} : { required: "Image is required" }), // ⬅️ Only required in add mode
                  })}
                  accept="image/*"
                  className="w-full border p-2 rounded-md"
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image.message}</p>
                )}

                {/* 👇 Image Preview */}
                {(imagePreview || existingImagePreview) && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-500 mb-1">Preview:</p>
                    <img
                      src={imagePreview || existingImagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded border"
                    />
                  </div>
                )}
              </div>

              <div className="mt-6 text-right">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#FF4500] to-[#FF6347] text-white px-6 py-2 rounded-md hover:bg-[#FF6347]"
                >
                  Save Product
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminProductManagement;
