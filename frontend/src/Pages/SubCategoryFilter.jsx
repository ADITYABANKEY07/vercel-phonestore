const BASE_URL = import.meta.env.VITE_API_URL;
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function SubCategoryFilter() {
  const { categoryName, subCategory } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `${BASE_URL}/api/products/category/${categoryName}/${subCategory}`
        );

        setProducts(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [categoryName, subCategory]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-center p-10">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-center p-10 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-center p-10">
        No products found for {subCategory.replace(/-/g, " ")}.
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center capitalize">
        {subCategory.replace(/-/g, " ")} Products
      </h1>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {products.map((product) => {
            if (!product._id) {
              return (
                <div
                  key={`no-id-${Math.random()}`}
                  className="w-full text-center text-red-500"
                >
                  Invalid product data
                </div>
              );
            }

            return (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="w-full"
              >
                <div className="bg-gray-100 border border-black rounded-lg shadow-md p-4 sm:p-6 text-center flex flex-col items-center">
                  {product.image && typeof product.image === "string" && (
                    <img
                      src={product.image}
                      alt={
                        typeof product.model === "string"
                          ? product.model
                          : "Product Image"
                      }
                      className="w-3/4 sm:w-2/3 md:w-full max-h-40 sm:max-h-48 object-contain mb-4 rounded-md"
                    />
                  )}

                  <h2 className="text-sm sm:text- text-nowrap font-semibold mb-2">
                    {typeof product.brand === "object"
                      ? product.brand?.name
                      : product.brand || ""}
                    {" "}
                    {typeof product.model === "object"
                      ? product.model?.name
                      : product.model || ""}
                  </h2>

                  <p className="text-gray-600 mb-2 text-sm sm:text-base line-clamp-3">
                    {typeof product.description === "string"
                      ? product.description
                      : ""}
                  </p>

                  <p className="text-gray-700 mb-2 text-base sm:text-lg font-bold">
                    {typeof product.price === "number"
                      ? `$${product.price.toFixed(2)}`
                      : "N/A"}
                  </p>

                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    Add to Cart
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SubCategoryFilter;
