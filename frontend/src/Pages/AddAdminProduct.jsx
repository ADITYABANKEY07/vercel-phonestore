import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AddAdminProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const [form, setForm] = useState({
    brand: '',
    model: '',
    price: '',
    description: '',
    image: '',
    category: '',
    subCategory: '',
  });

  const BASE_URL = 'http://localhost:3001/api';

  const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token;
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get(`${BASE_URL}/products`);
    setProducts(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get(`${BASE_URL}/categories`);
    setCategories(res.data);
  };

  const mainCategories = categories.filter(cat => !cat.parent);
  const subCategories = categories.filter(cat => String(cat.parent) === String(form.category));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'category' ? { subCategory: '' } : {}) // reset subCategory on category change
    }));
  };

  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setForm({
      brand: product.brand,
      model: product.model,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category?._id || '',
      subCategory: product.subCategory || ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      if (editingProduct) {
        await axios.put(`${BASE_URL}/products/${editingProduct}`, form, config);
      } else {
        await axios.post(`${BASE_URL}/products`, form, config);
      }

      setForm({
        brand: '',
        model: '',
        price: '',
        description: '',
        image: '',
        category: '',
        subCategory: '',
      });

      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this product?")) return;

    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(`${BASE_URL}/products/${id}`, config);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product Manager</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input type="text" name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" className="input" />
        <input type="text" name="model" value={form.model} onChange={handleChange} placeholder="Model" className="input" />
        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" className="input" />
        <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input" />
        <input type="text" name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="input" />

        <select name="category" value={form.category} onChange={handleChange} className="input">
          <option value="">Select Main Category</option>
          {mainCategories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        <select name="subCategory" value={form.subCategory} onChange={handleChange} className="input">
          <option value="">Select Subcategory</option>
          {subCategories.map((sub) => (
            <option key={sub._id} value={sub.name}>{sub.name}</option>
          ))}
        </select>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      <div className="grid gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded shadow">
            <h2 className="font-semibold">{product.brand} {product.model}</h2>
            <p>${product.price}</p>
            <p>{product.description}</p>
            <img src={product.image} alt={product.model} className="h-32 object-contain my-2" />
            <p className="text-sm text-gray-600">Category: {product.category?.name || 'N/A'}</p>
            <p className="text-sm text-gray-600">Sub: {product.subCategory}</p>

            <div className="mt-2 flex gap-2">
              <button onClick={() => handleEdit(product)} className="bg-yellow-400 px-3 py-1 rounded text-white">Edit</button>
              <button onClick={() => handleDelete(product._id)} className="bg-red-500 px-3 py-1 rounded text-white">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}