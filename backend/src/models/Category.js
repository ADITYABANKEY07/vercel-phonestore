// models/Category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Category names should be unique
    trim: true,   // Remove whitespace from both ends of a string
  },
  description: {
    type: String,
    default: '',
  },
  imageUrl: { // Optional: for displaying category images on the frontend
    type: String,
    default: '',
  },
  // New field: reference to a parent category
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Self-reference to the Category model
    default: null,   // Top-level categories will have null as parent
  },
  // You might also add a 'slug' for cleaner URLs, or 'order' for display
  // slug: { type: String, unique: true },
  // order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);
