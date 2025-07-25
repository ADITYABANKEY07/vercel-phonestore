import React, { useState, useEffect } from "react";
import banner1 from "../images/banner1.png";
import banner2 from "../images/banner2.png";
import banner3 from "../images/banner3.png";
import "../index.css"

const slides = [
  {
    title: "Protect Your Investment in Style",
    description: "Premium phone accessories designed to safeguard your device.",
    buttonText: "Shop Now",
    imageUrl: banner1,
  },
  {
    title: "Power Up On the Go",
    description: "Stay charged everywhere with our power banks and cables.",
    buttonText: "Shop Now",
    imageUrl: banner2,
  },
  {
    title: "Accessorize Your Digital Life",
    description: "Elegant, innovative accessories to suit your lifestyle.",
    buttonText: "Shop Now",
    imageUrl: banner3,
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const goto = (i) => setCurrent(i);
  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [current]);

  return (
    <header className="relative w-full h-[240px] md:h-[380px] lg:h-[500px] overflow-hidden">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className="w-full flex-shrink-0 relative h-full bg-center bg-cover"
            style={{ backgroundImage: `url(${s.imageUrl})` }}
          >
            {/* Minimal dark overlay, lighter */}
            <div className="absolute inset-0 bg-black/40"></div>
            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 text-center">
              <h1 className="text-white text-2xl md:text-4xl font-semibold mb-2">
                {s.title}
              </h1>
              <p className="text-gray-300 text-base md:text-lg">
                {s.description}
              </p>
              {/* <button className="px-6 py-2 mt-5 rounded-md bg-white text-black font-semibold text-base shadow-none hover:bg-gray-100 transition-colors">
                {s.buttonText}
              </button> */}
            </div>
          </div>
        ))}
      </div>
      {/* Dots */}
<div className="flex gap-2 absolute bottom-7 left-1/2 -translate-x-1/2 z-20">
  {slides.map((_, idx) => (
    <span
      key={idx}
      className={`dot ${current === idx ? 'active' : 'inactive'} h-4`}
      style={{
        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        display: "inline-block"
      }}
      onClick={() => goto(idx)}
    ></span>
  ))}
</div>
    </header>
  );
};

export default HeroSlider;
