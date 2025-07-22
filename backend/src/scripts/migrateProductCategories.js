// scripts/migrateProductCategories.js (run this once)
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js'; // Adjust path
import Category from '../models/Category.js'; // Adjust path
import connectDB from '../config/db.js'; // Your DB connection

dotenv.config();
connectDB();

const migrateCategories = async () => {
  try {
    // Find products where 'category' is still a string (old data)
    const productsToMigrate = await Product.find({
      category: { $type: 'string' } // Find documents where 'category' is of BSON type 'string'
    });

    console.log(`Found ${productsToMigrate.length} products to migrate category type.`);

    for (const product of productsToMigrate) {
      const oldCategoryName = product.category;

      // Find the corresponding Category document by name
      const categoryDoc = await Category.findOne({ name: oldCategoryName });

      if (categoryDoc) {
        // Update the product's category to the ObjectId reference
        product.category = categoryDoc._id;
        // Temporarily bypass validation. This is for adding the field if it's missing,
        // or changing its type, but we want to ensure *all* existing data is processed.
        // Once this specific category type issue is resolved, remove `validateBeforeSave: false`.
        await product.save({ validateBeforeSave: false });
        console.log(`✅ Migrated product "${product.model}" (ID: ${product._id}) category from string "${oldCategoryName}" to ObjectId "${categoryDoc._id}".`);
      } else {
        console.warn(`⚠️ Warning: Category "${oldCategoryName}" not found in Category collection for product "${product.model}" (ID: ${product._id}). Skipping migration for this product.`);
        // You might want to handle products with missing categories, e.g., set to a default, or log them for manual review.
      }
    }
    console.log('Product category migration complete.');
  } catch (error) {
    console.error('❌ Error during product category migration:', error);
  } finally {
    mongoose.disconnect();
  }
};

migrateCategories();