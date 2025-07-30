import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const CustomerFeedBack = () => {
  const testimonials = [
    {
      id: 1,
      name: 'CA Amish Thakkar',
      feedback:
        'Wonderful experience, trusted brand with quality delivered as promised. Customer service is at its best. I am extremely satisfied with my purchase and will recommend it to everyone.',
      image: 'https://placehold.co/300x300/F0F0F0/333333?text=Product+1',
    },
    {
      id: 2,
      name: 'Sagar Kulkarni',
      feedback:
        'Initially I was hesitant to buy ₹600 worth silicon case but trust me it\'s a way better than my expectations and for surely will surprise you. I had and iPhone. The quality is exceptional for the price.',
      image: 'https://placehold.co/300x300/D0D0D0/333333?text=Product+2',
    },
    {
      id: 3,
      name: 'Sri Teja Koduru',
      feedback:
        'I have ordered tempered glass accessories from here for my OnePlus 7, Moto G60. They are top notch quality glass with precision cutting for front camera. I am very impressed with the product and the quick delivery service.',
      image: 'https://placehold.co/300x300/C0C0C0/333333?text=Product+3',
    },
    {
      id: 4,
      name: 'Priya Sharma',
      feedback:
        'Excellent service and high-quality products. Highly recommend for anyone looking for reliable accessories. The customer support was also very helpful and responsive.',
      image: 'https://placehold.co/300x300/B0B0B0/333333?text=Product+4',
    },
    {
      id: 5,
      name: 'Rahul Singh',
      feedback:
        'The product quality is superb and the delivery was very fast. Will definitely buy again! I was pleasantly surprised by how quickly my order arrived and the condition of the packaging.',
      image: 'https://placehold.co/300x300/A0A0A0/333333?text=Product+5',
    },
    {
      id: 6,
      name: 'Neha Gupta',
      feedback:
        'Great customer support and innovative products. Very happy with my purchase. The team went above and beyond to ensure I had a smooth experience from start to finish.',
      image: 'https://placehold.co/300x300/909090/333333?text=Product+6',
    },
  ];

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center font-sans p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl rounded-xl p-6 sm:p-8 lg:p-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
          CUSTOMER FEEDBACK
        </h2>

        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg shadow-md p-6 h-full">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-sm mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/300x300/F0F0F0/333333?text=Image+Error';
                    }}
                  />
                </div>
                <div className="text-center">
                  <div className="flex justify-center text-yellow-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.817 1.48-8.279L.001 9.306l8.332-1.151L12 .587z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">
                    "{testimonial.feedback.split(' ').slice(0, 30).join(' ')}..."
                  </p>
                  <p className="font-semibold text-gray-900 text-base sm:text-lg">
                    {testimonial.name}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CustomerFeedBack;
