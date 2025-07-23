const BASE_URL = import.meta.env.VITE_API_URL;
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

function FilteredProducts() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const brand = searchParams.get("brand");
  const model = searchParams.get("model");
    const category = searchParams.get("category"); // ✅ <--- Add it here


useEffect(() => {
  const fetchFilteredProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      if (brand) queryParams.append("brand", brand);
      if (model) queryParams.append("model", model);
      if (category) queryParams.append("category", category); // ✅ use it here

      const response = await axios.get(
        `${BASE_URL}/api/products/filter?${queryParams.toString()}`
      );

      setProducts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchFilteredProducts();
}, [brand, model, category]);


  if (loading) return <div className="text-center p-10">Loading products...</div>;
  if (error) return <div className="text-center text-red-500 p-10">Error: {error}</div>;
  if (products.length === 0)
    return (
      <div className="text-center p-10">
        No products found for {brand} {model}.
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center capitalize">
        {brand} {model} Products
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id}>
            <div className="bg-white border rounded-lg shadow p-4 text-center">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.model}
                  className="w-full h-40 object-contain mb-4"
                />
              )}
              <h2 className="text-sm font-semibold mb-1">{product.brand} {product.model}</h2>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
              <p className="text-lg font-bold text-gray-800 mb-2">${product.price.toFixed(2)}</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FilteredProducts;