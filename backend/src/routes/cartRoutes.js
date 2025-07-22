import express from 'express';
import {
  addToCart,
  getCartItems,
  checkoutCart,
  updateCartItemQuantity, // Import the new function
  removeCartItem          // Import the new function
} from '../controller/cartController.js'; // Ensure correct path to controller
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes
router.post('/add', protect, addToCart); // Route for adding a new item to cart
router.get('/', protect, getCartItems);  // Route for getting all cart items
router.post('/checkout', protect, checkoutCart); // Route for checking out the cart

// New routes for quantity increment/decrement and item removal:
router.put('/:productId', protect, updateCartItemQuantity); // Route to update item quantity
router.delete('/:productId', protect, removeCartItem);     // Route to remove an item

export default router;