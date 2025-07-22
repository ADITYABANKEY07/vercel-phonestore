// controller/paymentController.js
import razorpay from '../config/razorpay.js';
import crypto from 'crypto';
import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

/**
 * @desc Create a new Razorpay order
 * @route POST /api/payment/create-order
 * @access Protected (assuming user is logged in to create an order)
 *
 */
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // Amount should already be in paise (e.g., 50000 for ₹500.00)

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount provided. Amount must be a positive number.' });
    }

    const options = {
      amount, // amount is already in paise
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`, // Unique receipt ID
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);

  } catch (error) {
    console.error('❌ Error creating Razorpay order:', error.message);
    // Log Razorpay's specific error response if available
    if (error.error) {
      console.error('Razorpay API Error Response:', error.error);
    }
    res.status(500).json({
      message: 'Failed to create Razorpay order',
      error: error.message,
      code: error.code || 'SERVER_ERROR',
    });
  }
};

/**
 * @desc Verify a Razorpay payment signature and save the order
 * @route POST /api/payment/verify
 * @access Protected (requires user to be authenticated via authMiddleware)
 */
export const verifyPayment = async (req, res) => {
  try {
    // 🔍 Backend Debug Log: Raw req.body received
    console.log("🚀 Backend: Raw req.body received for /api/orders/verify:", JSON.stringify(req.body, null, 2));

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentDetails
    } = req.body;

    // 🔍 Backend Debug Log: Destructured Razorpay IDs
    console.log(`🚀 Backend: Destructured IDs - Order ID: ${razorpay_order_id}, Payment ID: ${razorpay_payment_id}, Signature: ${razorpay_signature}`);


    // 🚨 CRITICAL VALIDATION: Ensure razorpay_order_id is present
    if (!razorpay_order_id || razorpay_order_id === '') { // Added check for empty string
      console.error('Validation Error: Missing or empty razorpay_order_id in request body.');
      return res.status(400).json({ message: 'Razorpay Order ID is missing or empty. Cannot verify payment.' });
    }
    if (!razorpay_payment_id || razorpay_payment_id === '') { // Added check for empty string
      console.error('Validation Error: Missing or empty razorpay_payment_id in request body.');
      return res.status(400).json({ message: 'Razorpay Payment ID is missing or empty. Cannot verify payment.' });
    }
    if (!razorpay_signature || razorpay_signature === '') { // Added check for empty string
      console.error('Validation Error: Missing or empty razorpay_signature in request body.');
      return res.status(400).json({ message: 'Razorpay Signature is missing or empty. Cannot verify payment.' });
    }


    const { amount, items, shippingInfo } = paymentDetails;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: 'Invalid cart items: items array is missing or not an array.' });
    }

    // 🔍 Backend Debug Log: Received Cart Items (already present, but good to keep)
    console.log("📦 Received Cart Items for Verification:", items);

    // ✅ Validate and fetch product data
    const orderItems = await Promise.all(
      items.map(async (item) => {
        if (!item.productId || !mongoose.Types.ObjectId.isValid(item.productId)) {
          throw new Error(`❌ Invalid product ID format or missing: ${item.productId}`);
        }

        const product = await Product.findById(item.productId).lean();

        if (!product) {
          throw new Error(`❌ Product not found in database for ID: ${item.productId}`);
        }

        return {
          product: product._id,
          name: product.brand + ' ' + product.model,
          image: product.image,
          quantity: item.quantity,
          price: product.price
        };
      })
    );

    // 🧾 Create and save the order
    const order = new Order({
      userId: req.user._id,
      razorpayOrderId: razorpay_order_id, // This is the unique ID from Razorpay, and should be unique in DB
      paymentId: razorpay_payment_id,
      paymentMethod: 'Razorpay',
      amount,
      status: 'Completed',
      shippingInfo,
      items: orderItems,
      paidAt: new Date(),
      isPaid: true
    });

    // 🔍 Backend Debug Log: Value of razorpayOrderId in the Mongoose order object
    console.log("Attempting to save order with order.razorpayOrderId:", order.razorpayOrderId);


    await order.save();

    res.status(201).json({ message: '✅ Payment verified and order saved', order });

  } catch (error) {
    console.error('❌ Error during payment verification and order saving:', error);
    if (error.code === 11000 && error.keyPattern) {
        if (error.keyPattern.razorpayOrderId === 1) {
            return res.status(409).json({ message: 'This order has already been processed (duplicate Razorpay Order ID).' });
        }
        // This case should ideally not happen if 'orderId_1' index was dropped.
        // If it still happens, it means the index was not dropped successfully or was recreated.
        if (error.keyPattern.orderId === 1) {
            console.error('CRITICAL: Duplicate key error on "orderId" field. The "orderId_1" index might still exist or was recreated.');
            return res.status(409).json({ message: 'A conflicting order ID index exists in the database. Please contact support.' });
        }
        return res.status(409).json({ message: 'A duplicate key error occurred.' });
    }
    res.status(500).json({ message: error.message || 'Server error during payment verification.' });
  }
};
