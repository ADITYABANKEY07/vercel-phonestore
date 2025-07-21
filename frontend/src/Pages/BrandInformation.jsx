// src/components/HeroSection.jsx
import React, { useState, useEffect } from 'react';


import banner1 from "../images/banner1.png";
import banner2 from "../images/banner2.png";
import banner3 from "../images/banner3.png";

const images = [
  banner1, // Replace with your first image path
  banner2, // Replace with your second image path
  banner3, // Replace with your third image path
  // Add more image paths as needed
];

const BrandInformation = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="relative bg-gray-100 py-16 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left Side - Image Slider */}
        <div className="relative w-full md:w-1/2 flex justify-center md:justify-start mb-8 md:mb-0">
          <div className="w-full max-w-md md:max-w-none rounded-lg shadow-lg overflow-hidden">
            <img
              src={images[currentImageIndex]}
              alt="Mobile Accessories"
              className="w-full h-auto object-cover transition-opacity duration-500 ease-in-out"
            />
            {/* Navigation dots for the slider (optional) */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentImageIndex === index ? 'bg-white' : 'bg-gray-400'
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Text and Button */}
        <div className="w-full md:w-1/2 text-center md:text-left md:pl-12"> {/* Added padding-left for spacing */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Phonestore - GROWING UP!</h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            In India's fast-growing Mobile accessories Industry - filled with crowded low-quality options, comes an innovative technology company conceptualized on getting you the finest in Mobile accessories.
            <br /><br /> {/* Adding a line break for more separation as seen in the image */}
            Our mission is to provide high-quality, durable, and stylish mobile accessories that enhance the user experience and protect your valuable devices. We are committed to innovation and customer satisfaction, constantly striving to bring you the latest and best products in the market.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300">
            Shop now
          </button>
        </div>
      </div>

      {/* Reviews Tab (positioned absolutely) */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-white text-sm font-semibold py-2 px-2 rounded-l-lg rotate-90 origin-bottom-right">
        Reviews
      </div>
    </div>
  );
};

export default BrandInformation;