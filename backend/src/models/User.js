// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // <--- Make sure bcryptjs is imported

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: { // Using isAdmin as per your current schema
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

// --- IMPORTANT: ADD THIS PRE-SAVE HOOK FOR PASSWORD HASHING ---
userSchema.pre('save', async function (next) {
  // Only hash the password if it's new or has been modified
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// --- IMPORTANT: ADD THIS CUSTOM METHOD FOR PASSWORD COMPARISON ---
userSchema.methods.matchPassword = async function (enteredPassword) {
  // 'this' refers to the user document
  return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', userSchema);

export default User;