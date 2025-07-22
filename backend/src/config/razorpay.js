// config/razorpay.js
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config(); // Line 5

// Initialize Razorpay instance with your Key ID and Key Secret
// These keys are loaded from your .env file
const instance = new Razorpay({ // Line 9
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export default instance;