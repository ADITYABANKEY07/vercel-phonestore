// src/Pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBoxes, FaPlusCircle, FaUsers, FaChartLine } from 'react-icons/fa'; // Example icons

function AdminDashboard() {
  const [adminName, setAdminName] = useState('Admin'); // Default name

  useEffect(() => {
    // Safely get user data from localStorage to display admin's name
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
        const user = JSON.parse(storedUser);
        if (user && user.name) {
          setAdminName(user.name);
        }
      }
    } catch (e) {
      console.error("Error parsing user data for AdminDashboard:", e);
      // If corrupted, clear and fallback
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-8">
        Welcome, {adminName}!
      </h1>
      <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
        Admin Dashboard - Manage Your eCommerce Platform
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card for Order Manager */}
        <Link
          to="/admin/orders"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 flex flex-col items-center justify-center text-center
                     hover:scale-105 hover:shadow-2xl transition-all duration-300 transform
                     border border-transparent hover:border-blue-500 group"
        >
          <FaBoxes className="text-5xl text-blue-500 dark:text-blue-400 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Order Manager</h2>
          <p className="text-gray-600 dark:text-gray-400">View and manage all customer orders.</p>
        </Link>

        {/* Card for Add Product */}
        <Link
          to="/admin/add-product"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 flex flex-col items-center justify-center text-center
                     hover:scale-105 hover:shadow-2xl transition-all duration-300 transform
                     border border-transparent hover:border-green-500 group"
        >
          <FaPlusCircle className="text-5xl text-green-500 dark:text-green-400 mb-4 group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Add New Product</h2>
          <p className="text-gray-600 dark:text-gray-400">Add new products to your catalog.</p>
        </Link>

        {/* Placeholder for User Management (Future Feature) */}
        <Link
          to="/admin/users" // This route needs to be defined in your router later
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 flex flex-col items-center justify-center text-center
                     hover:scale-105 hover:shadow-2xl transition-all duration-300 transform
                     border border-transparent hover:border-purple-500 group"
        >
          <FaUsers className="text-5xl text-purple-500 dark:text-purple-400 mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">User Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage user accounts and roles.</p>
        </Link>

        {/* Placeholder for Analytics (Future Feature) */}
        <Link
          to="/admin/analytics" // This route needs to be defined in your router later
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 flex flex-col items-center justify-center text-center
                     hover:scale-105 hover:shadow-2xl transition-all duration-300 transform
                     border border-transparent hover:border-orange-500 group"
        >
          <FaChartLine className="text-5xl text-orange-500 dark:text-orange-400 mb-4 group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Analytics</h2>
          <p className="text-gray-600 dark:text-gray-400">View sales data and insights.</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;