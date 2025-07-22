// controllers/productController.js
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import mongoose from "mongoose";

// Helper function to populate category and its parent
const populateCategoryAndParent = (query) => {
  return query.populate({
    path: "category",
    select: "name description imageUrl parent", // Select fields from category
    populate: {
      path: "parent",
      select: "name", // Select fields from parent category
    },
  });
};

// @desc    Get all products or filter by category, brand, model
// @route   GET /api/products?categoryId=...&brand=...&model=...
// @access  Public
 const getProducts = async (req, res) => {
  try {
    const { categoryId, brand, model } = req.query; // Extract query parameters
    const filter = {}; // Initialize an empty filter object

    if (categoryId) {
      // Validate if categoryId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID format" });
      }
      // Check if the category exists (optional, but good for robust error handling)
      const categoryExists = await Category.findById(categoryId);
      if (!categoryExists) {
        return res
          .status(404)
          .json({ message: "Category not found for the given ID" });
      }
      filter.category = categoryId; // Add category filter
    }

    if (brand) {
      filter.brand = { $regex: new RegExp(brand, "i") }; // Case-insensitive brand search
    }

    if (model) {
      filter.model = { $regex: new RegExp(model, "i") }; // Case-insensitive model search
    }

    // Find products based on the constructed filter and populate category/parent
    const products = await populateCategoryAndParent(Product.find(filter));
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products with filters:", error);
    res.status(500).json({ message: "Server error fetching products" });
  }
};

// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public
 const getProductById = async (req, res) => {
  try {
    const product = await populateCategoryAndParent(
      Product.findById(req.params.id)
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Server error fetching product" });
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Admin
 const createProduct = async (req, res) => {
  try {
    const {
      brand,
      model,
      price,
      description,
      comment,
      rating,
      image,
      category,
      subCategory,
    } = req.body;

    // Validate if the provided category ID exists
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(400).json({ message: "Invalid category ID provided" });
    }

    const newProduct = new Product({
      brand,
      model,
      price,
      description,
      comment,
      rating,
      image,
      category, // This will be the ObjectId of the category
      subCategory,
    });

    const savedProduct = await newProduct.save();
    // Populate the category and its parent on the saved product before sending response
    const populatedProduct = await populateCategoryAndParent(
      Product.findById(savedProduct._id)
    );
    res.status(201).json(populatedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Admin
 const updateProduct = async (req, res) => {
  try {
    const {
      brand,
      model,
      price,
      description,
      comment,
      rating,
      image,
      category,
      subCategory,
    } = req.body;

    // Validate if the provided category ID exists if it's being updated
    if (category) {
      const existingCategory = await Category.findById(category);
      if (!existingCategory) {
        return res
          .status(400)
          .json({ message: "Invalid category ID provided for update" });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        brand,
        model,
        price,
        description,
        comment,
        rating,
        image,
        category,
        subCategory,
      },
      { new: true, runValidators: true }
    );

    // Populate category and parent after update
    const populatedUpdatedProduct = await populateCategoryAndParent(
      Product.findById(updatedProduct._id)
    );
    if (!populatedUpdatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(populatedUpdatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error updating product" });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Admin
 const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error deleting product" });
  }
};

// @desc    Get products by category name and subCategory
// @route   GET /api/products/category/:categoryName/:subCategory
// @access  Public
 const getProductsByCategoryAndSub = async (req, res) => {
  try {
    const { categoryName, subCategory } = req.params;

    // Convert hyphenated route params to readable names
    const formattedCategory = categoryName.replace(/-/g, ' ');
    const formattedSubCategory = subCategory.replace(/-/g, ' ');

    console.log("🔍 Matching category:", formattedCategory);
    console.log("🔍 Matching subCategory:", formattedSubCategory);

    // Match category by name, case-insensitive
    const category = await Category.findOne({
      name: { $regex: `^${formattedCategory}$`, $options: 'i' }
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Find products with that category and subCategory match
    const products = await Product.find({
      category: category._id,
      subCategory: { $regex: `^${formattedSubCategory}$`, $options: 'i' }
    });

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category and subCategory:', error);
    res.status(500).json({ message: 'Server error fetching products' });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategoryAndSub,
  getFilteredProducts, // ✅ Add this line
};


// @desc    Get filtered products by brand, model, and category name (optional)
// @route   GET /api/products/filter?brand=...&model=...&category=...
// @access  Public
 const getFilteredProducts = async (req, res) => {
  try {
    const { brand, model, category } = req.query;
    const filter = {};

    if (brand) {
      filter.brand = { $regex: new RegExp(brand, "i") };
    }

    if (model) {
      filter.model = { $regex: new RegExp(model, "i") };
    }

    if (category) {
      // Find category by name (case-insensitive)
      const matchedCategory = await Category.findOne({
        name: { $regex: new RegExp(`^${category}$`, "i") },
      });

      if (!matchedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      filter.category = matchedCategory._id;
    }

    const products = await populateCategoryAndParent(Product.find(filter));
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    res.status(500).json({ message: "Server error fetching filtered products" });
  }
};

