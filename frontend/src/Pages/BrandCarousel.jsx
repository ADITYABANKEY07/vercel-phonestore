import React, { useState } from 'react';
import google from "../images/google.png";
import apple from "../images/apple.png";
import samsung from "../images/samsung.png";
import oppo from "../images/oppo.png";
import vivo from "../images/vivo.png";
import mi from "../images/mi.png";
import motorola from "../images/motorola.png";


// Main App component
const BrandCarousel = () => {
  // Array of brand data, including logo (SVG path) and name
  const brands = [
    {
      name: 'iPhone',
      logo: (
        <img src={apple} className="w-10 h-10 fill-current text-blue-600"/>
      ),
    },
    {
      name: 'Google',
      logo: (
        <img src={google} className="w-10 h-10 fill-current text-blue-600"/>
      ),
    },
    {
      name: 'Samsung',
      logo: (
        <img src={samsung} className="w-20 h-20 fill-current text-blue-600"/>
      ),
    },
    {
      name: 'Xiaomi',
      logo: (
        <img src={mi} className="w-10 h-10 fill-current text-blue-600"/>
      ),
    },
    {
      name: 'Oppo',
      logo: (
        <img src={oppo} className="w-20 h-20 fill-current text-blue-600"/>
      ),
    },
    {
      name: 'Vivo',
      logo: (
        <img src={vivo} className="w-20 h-20 fill-current text-blue-600"/>
      ),
    },
    {
      name: 'Motorola',
      logo: (
        <img src={motorola} className="w-15 h-15 fill-current text-blue-600"/>
      ),
    },
    
  ];

  // State for current page in the slider (for pagination dots)
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center mt-5 font-inter">
      <div className="w-full p-6 sm:p-8">
        {/* Section Title */}
        <h2 className="text-xl uppercase sm:text-2xl font-bold text-center text-gray-800 mb-8 tracking-wide">
          smartphone brand available
        </h2>

        {/* Brand Logos Slider */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }} // Simple translation for slider effect
          >
            {/* Map over brands to create individual brand items */}
            {brands.map((brand, index) => (
              <div
                key={brand.name}
                className="flex-shrink-0 w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6 xl:w-1/7 flex flex-col items-center p-2"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-100 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                  {brand.logo} {/* Render the SVG logo */}
                </div>
                <p className="mt-3 text-sm sm:text-base font-medium text-gray-700 text-center">
                  {brand.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {/* Create a dot for each "page" (assuming 7 brands, 1 page for now) */}
          {Array.from({ length: Math.ceil(brands.length / 7) }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentPage === index ? 'bg-teal-700' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => setCurrentPage(index)}
              aria-label={`Go to page ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandCarousel;
