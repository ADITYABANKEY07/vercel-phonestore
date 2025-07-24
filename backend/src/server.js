// server.js
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'; // Your database connection
// import razorpay from './config/razorpay.js'; // Not directly used here, but good to know it's there

// Import your route files
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js'; // Your payment routes
import orderRoutes from './routes/orderRoutes.js';




// Connect to MongoDB database
connectDB();

// Initialize Express app
const app = express();

// Define the port to listen on
const port = process.env.PORT || 3001; // Defaults to 5000 if PORT is not set in .env

const allowedOrigins = [
  'http://localhost:5173',
  'https://vercel-phonestore-op04v7qwe-aditya-bankeys-projects.vercel.app',
];

// Middleware
// Enable CORS for all routes (important for frontend-backend communication)
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from this origin'));
    }
  },
  credentials: true,
}));

// Parse incoming JSON requests
app.use(express.json());
// Parse URL-encoded data (if you have form submissions)
app.use(express.urlencoded({ extended: true }));

// --- API Routes ---
// Mount your specific route modules
app.use('/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payment', paymentRoutes); // Mount the payment routes
app.use('/api/orders', orderRoutes);


// Basic route for testing server status
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});