import express from "express";
import {
  getProducts, // Main list with optional query filters
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategoryAndSub,
  getFilteredProducts // <-- add this
} from "../controller/productController.js";

// Import your authentication and authorization middleware
import { protect, admin } from '../middleware/authMiddleware.js'; // Adjust path if necessary

const router = express.Router();

// Filter products (by brand, model, category) - accessible by anyone
router.get("/filter", getFilteredProducts);

// Get by category and subcategory - accessible by anyone
router.get("/category/:categoryName/:subCategory", getProductsByCategoryAndSub);

// Basic CRUD operations with middleware applied
router.route("/")
  .get(getProducts) // Anyone can view all products
  .post(protect, admin, createProduct); // Only authenticated admins can create products

// Individual product operations
router
  .route("/:id")
  .get(getProductById) // Anyone can view a single product
  .put(protect, admin, updateProduct) // Only authenticated admins can update products
  .delete(protect, admin, deleteProduct); // Only authenticated admins can delete products


export default router;