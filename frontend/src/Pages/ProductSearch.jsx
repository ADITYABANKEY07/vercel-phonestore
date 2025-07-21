import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import unfold from "../images/unfold.svg"; // Ensure the path is correct

const ProductSearch = () => {
  const navigate = useNavigate();

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

const models = {
  Apple: [
    "iPhone 15 Pro Max",
    "iPhone 15",
    "iPhone 14 Pro",
    "iPhone 14",
    "iPhone 13",
    "iPhone SE (2022)",
    "iPhone 12 Mini"
  ],
  Samsung: [
    "Galaxy S24 Ultra",
    "Galaxy S24",
    "Galaxy Z Fold 5",
    "Galaxy A54",
    "Galaxy M14",
    "Galaxy S22+"
  ],
  Oppo: [
    "Reno10 Pro 5G",
    "Find N3 Flip",
    "A78 5G",
    "F21 Pro",
    "Reno8"
  ],
  Vivo: [
    "Vivo V29 Pro",
    "Vivo X100",
    "Vivo T2 5G",
    "Vivo Y200",
    "Vivo V27"
  ],
  Xiaomi: [
    "Mi 11 Ultra",
    "Mi 11 Pro",
    "Mi 11 Lite",
    "Mi 11",
    "Mi 10 Pro",
  ],
  Google: [
    "Pixel 7 Pro",
    "Pixel 7",
    "Pixel 6 Pro",
    "Pixel 6",
    "Pixel 5",
  ],
  OnePlus: [
    "OnePlus 10 Pro",
    "OnePlus 10",
    "OnePlus 9 Pro",
    "OnePlus 9",
    "OnePlus 8 Pro",
  ],
  Motorola: [
    "Edge 50 Ultra",
    "Edge 50 Fusion",
    "Edge 30 Pro",
    "Edge 30",
    "Edge 20",
    "Edge 10",
    "Edge 9",
  ],
};


  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    setSelectedModel(""); // Reset model when brand changes
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  // Effect to handle navigation when both brand and model are selected
  useEffect(() => {
    if (selectedBrand && selectedModel) {
      const queryParams = new URLSearchParams();
      queryParams.append("brand", selectedBrand);
      queryParams.append("model", selectedModel);

      const queryString = queryParams.toString();
      const path = `/filteredproducts${queryString ? "?" + queryString : ""}`;
      console.log("Auto-navigating to:", path);
      navigate(path); // Auto-navigate to the filtered products page
    }
  }, [selectedBrand, selectedModel, navigate]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8 p-8 mx-auto max-w-4xl bg-blue-200 rounded-xl shadow-xl font-sans text-gray-800">
      {/* Heading Section */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-4 md:mb-0">
        Start Exploring
      </h2>

      {/* Phone Brand Dropdown */}
      <div className="w-full sm:w-64 relative group">
        <label htmlFor="phoneBrand" className="sr-only">
          Phone Brand
        </label>
        <select
          id="phoneBrand"
          className="appearance-none bg-gray-600 bg-opacity-80 border border-gray-300 text-white text-base rounded-lg
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10
                     shadow-lg transition-all duration-300 ease-in-out
                     hover:bg-opacity-90 cursor-pointer"
          onChange={handleBrandChange}
          value={selectedBrand}
        >
          <option value="" className="text-gray-800 bg-gray-100">Select a Phone Brand</option>
          <option value="Apple" className="text-gray-800 bg-gray-100">Apple</option>
          <option value="Samsung" className="text-gray-800 bg-gray-100">Samsung</option>
          <option value="Oppo" className="text-gray-800 bg-gray-100">Oppo</option>
          <option value="Vivo" className="text-gray-800 bg-gray-100">Vivo</option>
          <option value="Xiaomi" className="text-gray-800 bg-gray-100">Xiaomi</option>
          <option value="Google" className="text-gray-800 bg-gray-100">Google</option>
          <option value="OnePlus" className="text-gray-800 bg-gray-100">OnePlus</option>
          <option value="Motorola" className="text-gray-800 bg-gray-100">Motorola</option>
        </select>
        <img
          src={unfold}
          alt="Dropdown Icon"
          className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600 opacity-70 group-hover:opacity-100 transition-opacity duration-200"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/20x20/cccccc/000000?text=%E2%96%BC"; // Unicode down arrow as fallback
          }}
        />
      </div>

      {/* Model Dropdown */}
      <div className="w-full sm:w-64 relative group">
        <label htmlFor="phoneModel" className="sr-only">
          Phone Model
        </label>
        <select
          id="phoneModel"
          className={`appearance-none border border-gray-300 text-white text-base rounded-lg
                      focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10
                      shadow-lg transition-all duration-300 ease-in-out
                      ${!selectedBrand
                          ? 'bg-gray-600 bg-opacity-50 cursor-not-allowed' // Disabled state
                          : 'bg-gray-500 bg-opacity-80 hover:bg-opacity-90 cursor-pointer' // Active state
                      }`}
          onChange={handleModelChange}
          value={selectedModel}
          disabled={!selectedBrand} // Model dropdown is disabled until a brand is chosen
        >
          <option value="" className="text-gray-800 bg-gray-100">Select a Model</option>
          {selectedBrand &&
            models[selectedBrand]?.map((model) => (
              <option key={model} value={model} className="text-gray-800 bg-gray-100">
                {model}
              </option>
            ))}
        </select>
        <img
          src={unfold}
          alt="Dropdown Icon"
          className={`pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600 opacity-70 group-hover:opacity-100 transition-opacity duration-200
                      ${!selectedBrand ? 'opacity-30' : ''}`} // Dim icon when disabled
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/20x20/cccccc/000000?text=%E2%96%BC"; // Unicode down arrow as fallback
          }}
        />
      </div>
    </div>
  );
};

export default ProductSearch;
