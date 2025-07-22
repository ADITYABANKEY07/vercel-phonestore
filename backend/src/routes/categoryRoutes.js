// routes/categoryRoutes.js

import express from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controller/categoryController.js';

const router = express.Router();

// Define routes for categories
router.route('/')
  .get(getCategories)   // GET /api/categories
  .post(createCategory); // POST /api/categories

router.route('/:id')
  .get(getCategoryById)   // GET /api/categories/:id
  .put(updateCategory)    // PUT /api/categories/:id
  .delete(deleteCategory); // DELETE /api/categories/:id

export default router;
