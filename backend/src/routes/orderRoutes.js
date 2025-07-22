import express from "express";
import {
  checkoutCart,
  getAllOrders
} from "../controller/orderController.js";

import {
  verifyPayment // ✅ Now correctly imported
} from "../controller/paymentController.js";

import { protect as authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/orders/checkout
router.post("/checkout", authMiddleware, checkoutCart);

// ✅ POST /api/orders/verify (calls verifyPayment from paymentController)
router.post("/verify", authMiddleware, verifyPayment);

// GET /api/orders
router.get("/",authMiddleware, getAllOrders);

export default router;
