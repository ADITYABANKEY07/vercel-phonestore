import React, { useState, useEffect } from 'react';

function Footer() {
  // currentPage state is not directly used for rendering in the footer itself,
  // but it's kept here as per the original code's intention for scrolling.
  const [currentPage, setCurrentPage] = useState('home');

  // Effect to smoothly scroll to the top of the page when currentPage changes
  useEffect(() => {
    // Scrolls to the top-left of the window with a smooth animation
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // This property enables smooth scrolling
    });
  }, [currentPage]); // Dependency array: runs whenever currentPage changes

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 md:py-16 border-t border-gray-800 shadow-inner">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Support Information Section */}
        <div className="flex flex-col space-y-4">
          {/* Logo - Using a more generic placeholder for better aesthetics */}
          <img
            src="https://placehold.co/180x50/333333/E0E0E0?text=eCommerce+Logo"
            alt="eCommerce Logo"
            className="h-12 w-auto mb-4 rounded-md shadow-sm"
          />
          <h3 className="text-xl font-bold text-white mb-2">Support Information</h3>
          <p className="text-sm leading-relaxed">
            Whatsapp: <a href="https://wa.me/918392384900" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">+91 8392384900</a>
          </p>
          <p className="text-sm leading-relaxed">
            Email: <a href="mailto:care@sprig.store" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">care@phone.store</a>
          </p>
          <p className="text-sm leading-relaxed">
            Call Us: <a href="tel:+919591407133" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">+91 9591407133</a>
          </p>
          <p className="text-sm leading-relaxed">
            Our Address: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="text-sm leading-relaxed">
            CIN: 123456789
          </p>
          <div className="flex space-x-5 mt-4">
            {/* Social media icons - Assuming Font Awesome or similar is linked */}
            <a href="#" className="text-white hover:text-blue-400 transform hover:scale-110 transition-transform duration-200" aria-label="Facebook">
              <i className="fab fa-facebook-f text-2xl"></i>
            </a>
            <a href="#" className="text-white hover:text-blue-400 transform hover:scale-110 transition-transform duration-200" aria-label="Instagram">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a href="#" className="text-white hover:text-blue-400 transform hover:scale-110 transition-transform duration-200" aria-label="YouTube">
              <i className="fab fa-youtube text-2xl"></i>
            </a>
          </div>
        </div>

        {/* My Account Section */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-bold text-white mb-2">My Account</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Home</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Track your Order</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Return & Exchange</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">My Account</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Contact Us</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">FAQ</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Blog</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Partner With Us</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">About Us</a></li>
          </ul>
        </div>

        {/* Policies Section */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-bold text-white mb-2">Policies</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Warranty</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Shipping Policy</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Terms and Conditions</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Return & Refund Policy</a></li>
          </ul>
        </div>

        {/* Customer Care Section */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-bold text-white mb-2">Customer Care</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">FAQ</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Shipping</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="container mx-auto px-6 md:px-8 lg:px-12 mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-xs">
        <p className="leading-relaxed">
          &copy; {new Date().getFullYear()}, eCommerce. All rights reserved. Powered by Aditya Bankey.
          <br className="sm:hidden" /> {/* Line break for small screens */}
          <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 ml-2">Refund policy</a> |
          <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 mx-2">Privacy policy</a> |
          <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 mr-2">Terms of service</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
