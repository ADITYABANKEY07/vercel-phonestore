// routes/paymentRoutes.js
import express from 'express';
import { createOrder, verifyPayment } from '../controller/paymentController.js';

const router = express.Router();

// Route to create a new Razorpay order
router.post('/create-order', createOrder);

// Route to verify a Razorpay payment signature
router.post('/verify', verifyPayment);

export default router;