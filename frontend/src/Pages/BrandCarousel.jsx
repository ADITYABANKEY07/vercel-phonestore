import React, { useState } from 'react';

// Main App component
const BrandCarousel = () => {
  // Array of brand data, including logo (SVG path) and name
  const brands = [
    {
      name: 'iPhone',
      logo: (
        <svg viewBox="0 0 16 16" className="w-10 h-10 fill-current text-blue-600">
        <path d="M11.666 0c.92 0 1.667.746 1.667 1.667v12.666c0 .92-.747 1.667-1.667 1.667H4.333c-.92 0-1.666-.747-1.666-1.667V1.667C2.667.746 3.413 0 4.333 0h7.333zM8 14.333c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zM10.833 2.5H5.167c-.23 0-.417-.187-.417-.417s.187-.416.417-.416h5.666c.23 0 .417.186.417.416s-.187.417-.417.417z" />
        </svg>
      ),
    },
    {
      name: 'Motorola',
      logo: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current text-blue-600">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 1.5c4.694 0 8.5 3.806 8.5 8.5S16.694 20.5 12 20.5 3.5 16.694 3.5 12 7.306 3.5 12 3.5zM12 5c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 1.5c3.033 0 5.5 2.467 5.5 5.5S15.033 17.5 12 17.5 6.5 15.033 6.5 12 8.967 6.5 12 6.5zm0 1.5c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4z" />
        </svg>
      ),
    },
    {
      name: 'Pixel',
      logo: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current text-blue-600">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 1.5c4.694 0 8.5 3.806 8.5 8.5S16.694 20.5 12 20.5 3.5 16.694 3.5 12 7.306 3.5 12 3.5zM12 5c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 1.5c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4z" />
        </svg>
      ),
    },
    {
      name: 'Samsung',
      logo: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current text-blue-600">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 1.5c4.694 0 8.5 3.806 8.5 8.5S16.694 20.5 12 20.5 3.5 16.694 3.5 12 7.306 3.5 12 3.5zM12 5c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 1.5c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4z" />
        </svg>
      ),
    },
    {
      name: 'Vivo',
      logo: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current text-blue-600">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 1.5c4.694 0 8.5 3.806 8.5 8.5S16.694 20.5 12 20.5 3.5 16.694 3.5 12 7.306 3.5 12 3.5zM12 5c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 1.5c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4z" />
        </svg>
      ),
    },
    {
      name: 'IQOO',
      logo: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current text-blue-600">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 1.5c4.694 0 8.5 3.806 8.5 8.5S16.694 20.5 12 20.5 3.5 16.694 3.5 12 7.306 3.5 12 3.5zM12 5c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 1.5c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4z" />
        </svg>
      ),
    },
    {
      name: 'Mi',
      logo: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current text-blue-600">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 1.5c4.694 0 8.5 3.806 8.5 8.5S16.694 20.5 12 20.5 3.5 16.694 3.5 12 7.306 3.5 12 3.5zM12 5c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 1.5c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4z" />
        </svg>
      ),
    },
    {
      name: 'Realme',
      logo: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current text-blue-600"/>
      )
    }
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
