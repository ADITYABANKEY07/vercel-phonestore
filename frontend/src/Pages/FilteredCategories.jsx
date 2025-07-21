import React, { useEffect, useState } from 'react';

export default function FilteredCategory() {
  const BASE_URL = 'http://localhost:3001/api'; // Ensure this matches your backend port
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState(null);

  // States for filters received from URL
  const [filterCategoryId, setFilterCategoryId] = useState(null);
  const [filterBrand, setFilterBrand] = useState(null);
  const [filterModel, setFilterModel] = useState(null);
  const [displayTitle, setDisplayTitle] = useState('Filtered Products'); // Dynamic title

  // Effect to parse URL query parameters when the component mounts
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryId = params.get('categoryId');
    const categoryName = decodeURIComponent(params.get('categoryName') || '');
    const brand = params.get('brand');
    const model = params.get('model');

    setFilterCategoryId(categoryId);
    setFilterBrand(brand);
    setFilterModel(model);

    // Set a dynamic title based on the available filters
    if (categoryName && categoryName !== 'Selected Category') {
      setDisplayTitle(`Products in ${categoryName}`);
    } else if (brand && model) {
      setDisplayTitle(`Products for ${brand} ${model}`);
    } else if (brand) {
      setDisplayTitle(`Products for ${brand}`);
    } else {
      setDisplayTitle('All Products'); // Fallback if no specific filter
    }
  }, []); // Run once on mount to get initial params

  // Effect to fetch products based on the parsed filters
  useEffect(() => {
    const fetchProducts = async () => {
      // Only fetch if at least one filter is present, or if we want all products
      if (!filterCategoryId && !filterBrand && !filterModel) {
        setLoadingProducts(false);
        setProducts([]);
        // Optionally, fetch all products if no filters are specified
        // const response = await fetch(`${BASE_URL}/products`);
        // const data = await response.json();
        // setProducts(data);
        return;
      }

      setLoadingProducts(true);
      setError(null);

      try {
        // Construct query parameters for the API call
        const queryParams = new URLSearchParams();
        if (filterCategoryId) queryParams.append('categoryId', filterCategoryId);
        if (filterBrand) queryParams.append('brand', filterBrand);
        if (filterModel) queryParams.append('model', filterModel);

        const queryString = queryParams.toString();
        const apiUrl = `${BASE_URL}/products${queryString ? `?${queryString}` : ''}`;

        console.log("Fetching products from:", apiUrl); // Debugging line

        const response = await fetch(apiUrl);

        if (!response.ok) {
          if (response.status === 404) {
            setProducts([]); // No products found
            console.log(`No products found for the applied filters.`);
            return;
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error(`Failed to fetch products:`, err);
        if (err instanceof TypeError && err.message === 'Failed to fetch') {
          setError(`Failed to connect to the backend server. Please ensure your Node.js server is running at ${BASE_URL}.`);
        } else {
          setError(`Failed to load products: ${err.message}. Please try again later.`);
        }
        setProducts([]); // Clear products on error
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [filterCategoryId, filterBrand, filterModel]); // Re-fetch products when any filter changes

  const handleViewProductDetails = (productId) => {
    console.log(`Navigating to product details for ID: ${productId}`);
    alert(`Showing details for product ID: ${productId}`);
    // In a full React app, you'd navigate using React Router: history.push(`/product/${productId}`);
  };

  const handleAddToCart = (productId) => {
    console.log(`Adding product ID: ${productId} to cart`);
    alert(`Product ID: ${productId} added to cart!`);
  };

  const handleBack = () => {
    window.history.back(); // Go back to the previous page
  };

  if (loadingProducts)
    return (
      <div className="flex justify-center items-center h-screen text-center p-10">
        Loading products...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-center p-10 text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 font-inter p-4 sm:p-6 md:p-10">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
          {displayTitle}
        </h2>

        <div className="mb-6">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors duration-200 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back
          </button>
        </div>

        {products.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-10">
            No products found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-gray-100 border border-black rounded-lg shadow-md p-4 sm:p-6 text-center flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => handleViewProductDetails(product._id)}
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.model}
                    className="w-3/4 sm:w-2/3 md:w-full max-h-40 sm:max-h-48 object-contain mb-4 rounded-md"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x300/cccccc/333333?text=Image+Error"; }}
                  />
                )}
                <h3 className="text-sm sm:text-xl font-semibold mb-2">
                  {product.brand} {product.model}
                </h3>
                <p className="text-gray-600 mb-2 text-sm sm:text-base line-clamp-3">
                  {product.description}
                </p>
                <p className="text-gray-700 mb-2 text-base sm:text-lg font-bold">
                  ${product.price.toFixed(2)}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product._id);
                  }}
                  className="mt-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
