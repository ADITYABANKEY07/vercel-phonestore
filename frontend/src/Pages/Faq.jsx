import React, { useState } from 'react';

// Main App component
function Faq() {
  const faqs = [
    {
      question: 'Why should we use tempered glass for mobile?',
      answer: 'Tempered glass provides superior protection against scratches, drops, and impacts compared to regular screen protectors. It\'s designed to absorb shock and prevent your phone\'s screen from shattering.'
    },
    {
      question: 'What is the difference between tempered glass and regular glass?',
      answer: 'Tempered glass is a type of safety glass processed by controlled thermal or chemical treatments to increase its strength compared with normal glass. When shattered, it breaks into small granular chunks instead of jagged shards, reducing the risk of injury.'
    },
    {
      question: 'How to process warranty claims?',
      answer: 'To process a warranty claim, please visit our support page and fill out the warranty claim form. You will need your purchase details and a description of the issue. Our team will review your claim and get back to you within 2-3 business days.'
    },
    {
      question: 'Is broken tempered glass dangerous?',
      answer: 'While broken tempered glass is designed to shatter into small, blunt pieces, it can still be sharp. It\'s best to handle it carefully and replace it as soon as possible to avoid any cuts or injuries.'
    },
    {
      question: 'Does tempered glass affect camera?',
      answer: 'High-quality tempered glass is designed to be highly transparent and should not affect your camera\'s performance, picture quality, or flash. Make sure the cutouts for the camera and sensors are perfectly aligned.'
    },
    {
      question: 'Why are your products expensive compared to the market outside?',
      answer: 'Our products are crafted with premium materials and undergo rigorous quality control to ensure durability and superior protection. We invest in advanced technology to provide the best possible experience and long-lasting performance, justifying the price difference.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-6xl w-full rounded-xl overflow-hidden p-6 md:p-10">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">GENERAL FAQs</h2>

        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-10">
          {/* Left Section: Image and Contact Info */}
          <div className="md:w-1/2 flex flex-col items-center md:items-start mb-8 md:mb-0">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center md:text-left">Have a Question? Get in touch!</h3>
            <p className="text-gray-600 mb-6 text-center md:text-left">
              Our customer support is available Monday to Saturday: 9 am to 6 pm
            </p>
            <div className="w-full rounded-lg overflow-hidden shadow-md">
              <img
                src="https://placehold.co/600x400/E0E0E0/333333?text=Customer+Support" // Placeholder image
                alt="Customer Support"
                className="w-full h-auto object-cover rounded-lg"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/E0E0E0/333333?text=Image+Not+Found'; }}
              />
            </div>
          </div>

          {/* Right Section: FAQ Accordion */}
          <div className="md:w-1/2 w-full">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                View all
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// FAQ Item Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <button
        className="flex justify-between items-center w-full p-4 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-800 text-lg">{question}</span>
        <svg
          className={`w-6 h-6 text-gray-600 transform transition-transform duration-300 ${
            isOpen ? 'rotate-45' : 'rotate-0'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 bg-white text-gray-700 border-t border-gray-200">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default Faq;
