const BASE_URL = import.meta.env.VITE_API_URL;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import loadingGif from "../images/loading.gif"; // ✅ Step 2: Import

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleAddToCart = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || !storedUser.token) {
      alert("Please login to add items to cart.");
      return navigate("/login?redirect=/cart");
    }

    try {
      await axios.post(
        `${BASE_URL}/api/cart/add`,
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${storedUser.token}`,
          },
        }
      );
      navigate("/cart");
    } catch (err) {
      console.error("Cart Add Error:", err.response?.data || err.message);
      alert("Failed to add to cart.");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(`${BASE_URL}/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ Loading state with GIF
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={loadingGif} alt="Loading..." className="w-16 h-16 animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="p-10 text-center text-red-500">Error: {error}</div>
    );

  if (!product)
    return (
      <div className="p-10 text-center">No product found.</div>
    );

  const brand = typeof product.brand === "object" ? product.brand?.name : product.brand;
  const model = typeof product.model === "object" ? product.model?.name : product.model;
  const category = typeof product.category === "object" ? product.category?.name : product.category;

  return (
    <div className="bg-white min-h-screen px-4 sm:px-8 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Product Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src={product.image}
            alt={model || "Product Image"}
            className="w-full max-w-md object-contain rounded-lg shadow-md border"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            {brand} {model}
          </h1>

          <p className="text-gray-600 text-base sm:text-lg">
            Category: <span className="capitalize font-medium">{category}</span>
          </p>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{product.description}</p>

          <p className="text-2xl font-bold text-green-700 mt-4">
            ₹{typeof product.price === "number" ? product.price.toFixed(2) : "N/A"}
          </p>

          <button
            onClick={handleAddToCart}
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition duration-300 text-lg font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
