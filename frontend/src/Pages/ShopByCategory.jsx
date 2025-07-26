import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import loadingGif from "../images/loading.gif"; // 👈 Import your loading gif

const BASE_URL = import.meta.env.VITE_API_URL;
export default function ShopByCategoryTabs() {
  const SHOP_URL = `${BASE_URL}/api`;

  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef(null);
  const mainCategories = categories.filter((cat) => !cat.parent);
  const subCategories = categories.filter(
    (cat) => String(cat.parent) === String(activeTab)
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${SHOP_URL}/categories`);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setCategories(data);

        const firstMain = data.find((cat) => !cat.parent);
        setActiveTab(firstMain?._id);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = 260; // Adjust based on your `min-w-[...]`
      const index = Math.round(scrollLeft / cardWidth);
      setCurrentSlide(index);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [subCategories]);

  return (
    <div className="bg-blue-100 min-h-screen font-inter p-4 sm:p-6">
      <div className="max-w-7xl mx-auto rounded-xl p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          SHOP BY CATEGORY
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {mainCategories.map((cat) => (
            <button
              key={cat._id}
              className={`px-5 py-2 rounded-full font-semibold border ${
                activeTab === cat._id
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500 border-blue-300 hover:bg-blue-50"
              }`}
              onClick={() => setActiveTab(cat._id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* ✅ Loading State with GIF */}
        {loading ? (
          <div className="text-center">
            <img
              src={loadingGif}
              alt="Loading..."
              className="mx-auto w-16 h-16 animate-spin"
            />
            <p className="text-gray-600 mt-2">Loading categories...</p>
          </div>
        ) : subCategories.length === 0 ? (
          <div className="text-center text-gray-500">
            No subcategories found.
          </div>
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto md:overflow-hidden gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 scroll-smooth snap-x snap-mandatory"
          >
            {subCategories.map((subcat) => (
              <div
                key={subcat._id}
                className="min-w-[250px] flex-shrink-0 snap-start sm:min-w-0 bg-white rounded-xl shadow hover:shadow-lg transform transition duration-300 hover:scale-105"
              >
                <img
                  src={
                    subcat.imageUrl ||
                    "https://placehold.co/300x300?text=No+Image"
                  }
                  alt={subcat.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/300x300?text=Image+Error";
                  }}
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {subcat.name}
                  </h3>
                  <button
                    className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition"
                    onClick={() => {
                      const parentCategory = categories.find(
                        (cat) => cat._id === subcat.parent
                      );
                      const categorySlug = parentCategory?.name
                        ?.toLowerCase()
                        .replace(/\s+/g, "-");
                      const subCategorySlug = subcat.name
                        .toLowerCase()
                        .replace(/\s+/g, "-");

                      if (categorySlug) {
                        navigate(
                          `/products/category/${categorySlug}/${subCategorySlug}`
                        );
                      } else {
                        alert("Parent category not found");
                      }
                    }}
                  >
                    Explore Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
                    {/* Pagination Dots - only for mobile view */}
            <div className="flex justify-center mt-4 sm:hidden">
              {subCategories.map((_, index) => (
                <span
                  key={index}
                  className={`w-2.5 h-2.5 mx-1 rounded-full ${
                    index === currentSlide ? "bg-blue-600" : "bg-gray-300"
                  }`}
                ></span>
              ))}
            </div>
      </div>
    </div>
  );
}
