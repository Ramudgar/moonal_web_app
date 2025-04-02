const express = require("express");
const multer = require("multer");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const router = express.Router();
const upload = multer({ dest: "temp/" });

// @ route GET /api/v1/products
// @ desc Get all products
// @ access Public
router.get("/", getAllProducts);

// @ route GET /api/v1/products/:id
// @ desc Get single product by ID
// @ access Public
router.get("/:id", getProductById);

// @ route POST /api/v1/products
// @ desc Create a new product
// @ access Private
router.post("/", upload.single("image"), createProduct);

// @ route PUT /api/v1/products/:id
// @ desc Update an existing product
// @ access Private
router.put("/:id", upload.single("image"), updateProduct);

// @ route DELETE /api/v1/products/:id
// @ desc Delete a product by ID
// @ access Private
router.delete("/:id", deleteProduct);

// export the router
module.exports = router;
