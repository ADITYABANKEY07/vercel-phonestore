import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// Core and Navigation/Pagination modules are common
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import required modules (e.g., Navigation, Pagination, Autoplay)
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import google from "../images/google.png";
import apple from "../images/apple.png";
import samsung from "../images/samsung.png";
import oppo from "../images/oppo.png";
import vivo from "../images/vivo.png";
import mi from "../images/mi.png";
import motorola from "../images/motorola.png";
import realme from "../images/realme.png";
import iqoo from "../images/iqoo.png";
import oneplus from "../images/oneplus.png";
import nothing from "../images/nothing.png";

// Main App component
const BrandCarousel = () => {
  // Array of brand data, including logo (image path) and name
  const brands = [
    {
      name: "iPhone",
      logo: (
        <img
          src={apple}
          className="w-10 h-10 object-contain"
          alt="Apple Logo"
        />
      ),
    },
    {
      name: "Google",
      logo: (
        <img
          src={google}
          className="w-10 h-10 object-contain"
          alt="Google Logo"
        />
      ),
    },
    {
      name: "Samsung",
      logo: (
        <img
          src={samsung}
          className="w-20 h-20 object-contain"
          alt="Samsung Logo"
        />
      ),
    },
    {
      name: "Xiaomi",
      logo: (
        <img src={mi} className="w-10 h-10 object-contain" alt="Xiaomi Logo" />
      ),
    },
    {
      name: "Oppo",
      logo: (
        <img src={oppo} className="w-20 h-20 object-contain" alt="Oppo Logo" />
      ),
    },
    {
      name: "Vivo",
      logo: (
        <img src={vivo} className="w-20 h-20 object-contain" alt="Vivo Logo" />
      ),
    },
    {
      name: "Realme",
      logo: (
        <img
          src={realme}
          className="w-20 h-20 object-contain"
          alt="Realme Logo"
        />
      ),
    },
    {
      name: "IQOO",
      logo: (
        <img src={iqoo} className="w-20 h-20 object-contain" alt="IQOO Logo" />
      ),
    },
    {
      name: "OnePlus",
      logo: (
        <img
          src={oneplus}
          className="w-20 h-20 object-contain"
          alt="OnePlus Logo"
        />
      ),
    },
    {
      name: "Motorola",
      logo: (
        <img
          src={motorola}
          className="w-15 h-15 object-contain"
          alt="Motorola Logo"
        />
      ),
    },
    {
      name: "Nothing",
      logo: (
        <img
          src={nothing}
          className="w-30 h-30 object-contain"
          alt="Nothing Logo"
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center mt-5 font-inter">
      <div className="w-full p-6 sm:p-8">
        {/* Section Title */}
        <h2 className="text-xl uppercase sm:text-2xl font-bold text-center text-gray-800 mb-8 tracking-wide">
          smartphone brand available
        </h2>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]} // Enable desired modules
          spaceBetween={20} // Space between slides
          slidesPerView={3} // Default number of slides per view
          loop={true} // Enable continuous looping
          autoplay={{
            delay: 2500, // Autoplay delay in ms
            disableOnInteraction: false, // Continue autoplay after user interaction
          }}
          navigation={false} // Enable navigation arrows
          pagination={{ clickable: true }} // Enable clickable pagination dots
          breakpoints={{
            // When window width is >= 640px (sm)
            640: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            // When window width is >= 768px (md)
            768: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
            // When window width is >= 1024px (lg)
            1024: {
              slidesPerView: 6,
              spaceBetween: 50,
            },
            // You can add more breakpoints if needed for larger screens
            1280: {
              // xl
              slidesPerView: 7,
              spaceBetween: 60,
            },
          }}
          className="mySwiper" // Custom class for styling
        >
          {brands.map((brand, index) => (
            <SwiperSlide key={brand.name}>
              <div className="flex flex-col items-center p-2">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-100 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                  {brand.logo} {/* Render the image logo */}
                </div>
                <p className="mt-3 text-sm sm:text-base font-medium text-gray-700 text-center">
                  {brand.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BrandCarousel;
