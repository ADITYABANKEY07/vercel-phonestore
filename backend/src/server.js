import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// Import routes and any other middlewares

dotenv.config();
const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://vercel-phonestore.vercel.app', // ✅ Your Vercel frontend domain
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`❌ CORS not allowed from this origin: ${origin}`);
      callback(new Error('CORS not allowed from this origin'));
    }
  },
  credentials: true, // Optional if you're using cookies/auth
}));

app.use(express.json());

// ✅ Your routes go here
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
// ...etc

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
  });
