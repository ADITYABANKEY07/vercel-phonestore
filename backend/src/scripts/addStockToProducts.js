// scripts/addStockToProducts.js (run this once, or modify if already run)
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js'; // Adjust path
import connectDB from '../config/db.js'; // Your DB connection

dotenv.config();
connectDB();

const addCountInStock = async () => {
  try {
    // Find products that *do not* have the 'countInStock' field
    // OR products where 'countInStock' is 0 or low, and you want to replenish
    const productsToUpdateStock = await Product.find({
      $or: [
        { countInStock: { $exists: false } },
        { countInStock: { $lt: 5 } } // Example: Replenish if less than 5
      ]
    });

    console.log(`Found ${productsToUpdateStock.length} products to update/add 'countInStock'.`);

    for (const product of productsToUpdateStock) {
      // Set a default stock for existing products or replenish low stock.
      // Use a value that makes sense for your initial inventory.
      if (product.countInStock === undefined) {
         product.countInStock = 10; // Initial stock for new field
      } else if (product.countInStock < 5) {
         product.countInStock = 10; // Replenish to 10 if less than 5
      }
      await product.save({ validateBeforeSave: false }); // Bypass validation to add the new field or change existing value
      console.log(`Updated product "${product.model}" (ID: ${product._id}) with countInStock: ${product.countInStock}`);
    }

    console.log('Product stock migration/replenishment complete.');
  } catch (error) {
    console.error('❌ Error during product stock migration:', error);
  } finally {
    mongoose.disconnect();
  }
};

addCountInStock();