import React, { useState, useEffect } from 'react';

// Main App component
const CustomerFeedBack = () => {
  // Function to truncate text to a specified word limit
  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  // Array of customer feedback data
  const testimonials = [
    {
      id: 1,
      name: 'CA Amish Thakkar',
      feedback: truncateText('Wonderful experience, trusted brand with quality delivered as promised. Customer service is at its best. I am extremely satisfied with my purchase and will recommend it to everyone.', 30),
      image: 'https://placehold.co/300x300/F0F0F0/333333?text=Product+1', // Placeholder image
    },
    {
      id: 2,
      name: 'Sagar Kulkarni',
      feedback: truncateText('Initially I was hesitant to buy ₹600 worth silicon case but trust me it\'s a way better than my expectations and for surely will surprise you. I had and iPhone. The quality is exceptional for the price.', 30),
      image: 'https://placehold.co/300x300/D0D0D0/333333?text=Product+2', // Placeholder image
    },
    {
      id: 3,
      name: 'Sri Teja Koduru',
      feedback: truncateText('I have ordered tempered glass accessories from here for my OnePlus 7, Moto G60. They are top notch quality glass with precision cutting for front camera. I am very impressed with the product and the quick delivery service.', 30),
      image: 'https://placehold.co/300x300/C0C0C0/333333?text=Product+3', // Placeholder image
    },
    {
      id: 4,
      name: 'Priya Sharma',
      feedback: truncateText('Excellent service and high-quality products. Highly recommend for anyone looking for reliable accessories. The customer support was also very helpful and responsive.', 30),
      image: 'https://placehold.co/300x300/B0B0B0/333333?text=Product+4', // Placeholder image
    },
    {
      id: 5,
      name: 'Rahul Singh',
      feedback: truncateText('The product quality is superb and the delivery was very fast. Will definitely buy again! I was pleasantly surprised by how quickly my order arrived and the condition of the packaging.', 30),
      image: 'https://placehold.co/300x300/A0A0A0/333333?text=Product+5', // Placeholder image
    },
    {
      id: 6,
      name: 'Neha Gupta',
      feedback: truncateText('Great customer support and innovative products. Very happy with my purchase. The team went above and beyond to ensure I had a smooth experience from start to finish.', 30),
      image: 'https://placehold.co/300x300/909090/333333?text=Product+6', // Placeholder image
    },
  ];

  // State to keep track of the current active slide index (index of the first visible slide)
  const [currentSlide, setCurrentSlide] = useState(0);
  // State to determine how many slides are visible based on screen size
  const [numVisibleSlides, setNumVisibleSlides] = useState(1);

  // Function to update numVisibleSlides based on window width
  const updateNumVisibleSlides = () => {
    if (window.innerWidth >= 1024) { // lg breakpoint
      setNumVisibleSlides(3);
    } else if (window.innerWidth >= 768) { // md breakpoint
      setNumVisibleSlides(2);
    } else { // sm and below
      setNumVisibleSlides(1);
    }
  };

  // Effect to set initial numVisibleSlides and listen for resize events
  useEffect(() => {
    updateNumVisibleSlides(); // Set initial value
    window.addEventListener('resize', updateNumVisibleSlides);
    return () => window.removeEventListener('resize', updateNumVisibleSlides);
  }, []);

  // Autoplay functionality using useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        // Calculate the maximum possible starting index for the current view
        const maxSlideIndex = testimonials.length - numVisibleSlides;
        if (maxSlideIndex <= 0) return 0; // If not enough testimonials to scroll, stay at 0

        // Move to the next slide, loop back to the first if at the end
        return prevSlide >= maxSlideIndex ? 0 : prevSlide + 1;
      });
    }, 5000); // Change slide every 5 seconds

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(interval);
  }, [testimonials.length, numVisibleSlides]); // Re-run effect if testimonials length or visible slides change

  // Function to go to the previous slide
  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) => {
      const maxSlideIndex = testimonials.length - numVisibleSlides;
      if (maxSlideIndex <= 0) return 0;
      return prevSlide === 0 ? maxSlideIndex : prevSlide - 1;
    });
  };

  // Function to go to the next slide
  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => {
      const maxSlideIndex = testimonials.length - numVisibleSlides;
      if (maxSlideIndex <= 0) return 0;
      return prevSlide >= maxSlideIndex ? 0 : prevSlide + 1;
    });
  };

  // Calculate the total number of "pages" for dot indicators
  // Each "page" represents a set of numVisibleSlides
  const totalPages = Math.ceil(testimonials.length / numVisibleSlides);
  const currentPage = Math.floor(currentSlide / numVisibleSlides); // Current page based on the first visible slide

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center font-sans p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl rounded-xl p-6 sm:p-8 lg:p-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
          CUSTOMER FEEDBACK
        </h2>

        <div className="relative overflow-hidden rounded-lg">
          {/* Slider content container */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            // The transform moves the entire flex container based on the currentSlide and how many are visible
            style={{ transform: `translateX(-${currentSlide * (100 / numVisibleSlides)}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                // Each testimonial card takes up a fraction of the container width
                // w-full on small, w-1/2 on medium, w-1/3 on large screens
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-2" // Added padding for spacing between cards
              >
                <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg shadow-md p-6 h-full"> {/* Added h-full to ensure consistent height */}
                  {/* Image section */}
                  <div className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-sm mb-4">
                    <img
                      src={testimonial.image}
                      alt={`Product related to ${testimonial.name}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = `https://placehold.co/300x300/F0F0F0/333333?text=Image+Error`; // Fallback image
                      }}
                    />
                  </div>

                  {/* Feedback content */}
                  <div className="flex flex-col items-center text-center">
                    <div className="flex text-yellow-400 mb-3">
                      {/* Star ratings - static for now, can be dynamic */}
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.817 1.48-8.279L.001 9.306l8.332-1.151L12 .587z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">
                      "{testimonial.feedback}"
                    </p>
                    <p className="font-semibold text-gray-900 text-base sm:text-lg">
                      {testimonial.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={goToPreviousSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-all duration-300 z-10" // Added z-10 to ensure buttons are above slides
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
          <button
            onClick={goToNextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-all duration-300 z-10" // Added z-10
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {/* Render dots based on totalPages */}
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                // When clicking a dot, set the currentSlide to the start of that page
                onClick={() => setCurrentSlide(index * numVisibleSlides)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentPage ? 'bg-gray-800' : 'bg-gray-400 hover:bg-gray-500'
                }`}
                aria-label={`Go to page ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedBack;
