import crypto from "crypto";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js"; // Make sure Product is imported if used in other parts of paymentController

// Assuming this is part of your paymentController.js or a separate orderController.js
// If it's in paymentController.js, ensure all necessary models are imported at the top.

export const checkoutCart = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      userDetails, // { name, email, phone, address, pincode }
    } = req.body;

    const userId = req.user._id;

    // 🔐 Step 1: Verify Razorpay Signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // 🛒 Step 2: Fetch user's cart
    const cart = await Cart.findOne({ userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 💵 Step 3: Calculate total price
    const totalAmount = cart.items.reduce((sum, item) => {
      // Defensive check for product existence and price
      return sum + (item.product?.price || 0) * item.quantity;
    }, 0);

    // 📦 Step 4: Save order
    const order = new Order({
      userId,
      razorpayOrderId: razorpay_order_id, // Ensure this is correctly set from Razorpay
      paymentId: razorpay_payment_id,
      paymentMethod: "Razorpay", // Assuming this is always Razorpay for this flow
      amount: totalAmount, // Use the calculated total amount
      status: "Completed", // Or 'Processing' as per your flow
      shippingInfo: userDetails,
      items: cart.items.map(item => ({ // Map items to ensure correct structure for order schema
          product: item.product._id,
          name: item.product.name || item.product.model, // Use name or model
          image: item.product.image,
          quantity: item.quantity,
          price: item.product.price
      })),
      paidAt: new Date(),
      isPaid: true,
    });

    await order.save();

    // 🧹 Step 5: Clear cart
    cart.items = [];
    await cart.save();

    // ✅ Done
    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("❌ Order Checkout Error:", error);
    // More specific error handling for duplicate key if it re-emerges
    if (error.code === 11000 && error.keyPattern && error.keyPattern.razorpayOrderId) {
        return res.status(409).json({ message: 'This order has already been processed.' });
    }
    res.status(500).json({ message: "Internal server error during checkout" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    // 🔍 Backend Debug Log: Check if req.user is available (from auth middleware)
    console.log("🚀 Backend: getAllOrders route accessed.");
    if (req.user) {
        console.log("🚀 Backend: User accessing getAllOrders:", req.user._id, req.user.email, req.user.role);
        // Add a role check here if only admins should see all orders
        // if (req.user.role !== 'admin') {
        //   return res.status(403).json({ message: 'Access denied. Admin role required.' });
        // }
    } else {
        console.log("🚀 Backend: No user found in req.user. Is auth middleware applied?");
    }


    const orders = await Order.find()
      .populate("userId", "name email") // Populate name as well for frontend display
      .populate("items.product", "name model price image"); // Populate more product details

    // 🔍 Backend Debug Log: Log the fetched orders before sending
    console.log("📦 Backend: Fetched Orders Count:", orders.length);
    console.log("📦 Backend: First 3 Fetched Orders (for inspection):", JSON.stringify(orders.slice(0, 3), null, 2));


    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("❌ Get Orders Error:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
