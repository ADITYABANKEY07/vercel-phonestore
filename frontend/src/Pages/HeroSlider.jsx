import React, { useState, useEffect } from "react";

import banner1 from "../images/banner1.png";
import banner2 from "../images/banner2.png";
import banner3 from "../images/banner3.png";

const HeroSlider = () => {
  const slides = [
    {
      title:
        "Protect Your <br /> Investment <span class='text-blue-300'>in Style</span>",
      description:
        "Discover premium phone accessories designed to safeguard your device and enhance its functionality. From rugged cases to crystal-clear screen protectors, we have what you need.",
      buttonText: "Shop Now",
      imageUrl: banner1,
    },
    {
      title: "Power Up <br /> On the <span class='text-green-300'>Go</span>",
      description:
        "Never run out of battery again with our selection of fast chargers, power banks, and durable charging cables. Stay connected, always.",
      buttonText: "Shop Now",
      imageUrl: banner2,
    },
    {
      title:
        "Accessorize Your <br /> Digital <span class='text-purple-300'>Life</span>",
      description:
        "Explore a diverse range of phone accessories that combine innovation with elegant design. Find the perfect complement for your smartphone.",
      buttonText: "Shop Now",
      imageUrl: banner3,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Autoplay functionality 🚀
  useEffect(() => {
    const autoPlayInterval = setInterval(() => {
      goToNextSlide();
    }, 5000); // Changed to 5 seconds for a more natural slide transition

    return () => clearInterval(autoPlayInterval);
  }, [currentSlide]);

  return (
    <header className="relative w-full overflow-hidden h-[400px] md:h-[500px] lg:h-[600px]">
      {" "}
      {/* Set a fixed height for the hero section */}
      {/* Container for all slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slideData, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 relative h-full bg-cover bg-center" // Set slide as background with cover and center
            style={{ backgroundImage: `url(${slideData.imageUrl})` }}
          >
            {/* Blue Overlay */}
            <div className="absolute inset-0 bg-blue-800 opacity-50"></div>{" "}
            {/* Adjust opacity as needed */}
            {/* Content (Text and Button) */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 container mx-auto">
              <div className="lg:max-w-3xl">
                {" "}
                {/* Adjust max-width for better text centering */}
                <h1
                  className="text-3xl font-semibold text-white lg:text-5xl drop-shadow-lg" // Text color white for contrast, add shadow
                  dangerouslySetInnerHTML={{ __html: slideData.title }}
                ></h1>
                <p className="mt-3 text-gray-200 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
                  {" "}
                  {/* Lighter gray for readability */}
                  {slideData.description}
                </p>
                <button className="px-8 py-3 mt-6 text-lg tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                  {slideData.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Slider Navigation (Dots) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {" "}
        {/* Higher z-index */}
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-blue-600 scale-125"
                : "bg-gray-300 opacity-70"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
      {/* Previous/Next Buttons */}
    </header>
  );
};

export default HeroSlider;
