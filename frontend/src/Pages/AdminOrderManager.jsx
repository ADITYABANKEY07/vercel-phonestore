const BASE_URL = import.meta.env.VITE_API_URL;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminOrderManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const ADMIN_URL = `${BASE_URL}/api`;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true); // Set loading to true when fetching starts
      setError(null); // Clear previous errors
      try {
        const storedUser = localStorage.getItem('user'); // Get the whole user object
        if (!storedUser) {
          console.warn('No user data found in localStorage. Redirecting to login or showing message.');
          setError('Please log in to view orders.');
          setLoading(false);
          return;
        }
        const parsedUser = JSON.parse(storedUser);
        const token = parsedUser.token; // Extract token from user object

        if (!token) {
          console.warn('No authentication token found in user data.');
          setError('Authentication required. Please log in.');
          setLoading(false);
          return;
        }

        console.log('🚀 Frontend: Attempting to fetch orders with token:', token);

        const res = await axios.get(`${ADMIN_URL}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // 🔍 Frontend Debug Log: Raw response data
        console.log('📦 Frontend: Raw response data from /api/orders:', res.data);

        const ordersArray = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.orders)
          ? res.data.orders
          : [];

        setOrders(ordersArray);
        setLoading(false); // Set loading to false after successful fetch
      } catch (err) {
        console.error('❌ Frontend: Error fetching orders:', err.response?.data || err.message);
        setError(`Failed to fetch orders: ${err.response?.data?.message || err.message}`);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto text-center text-lg">
        Loading orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto text-center text-red-600 text-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Order Manager</h1>

      {Array.isArray(orders) && orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-600 border rounded shadow">
            <thead className="text-xs uppercase bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Order ID</th> {/* Added Order ID */}
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment Method</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Shipping Info</th>
                <th className="px-4 py-3">Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{index + 1}</td>
                  {/* Display Razorpay Order ID */}
                  {/* <td className="px-4 py-3">{order.razorpayOrderId || 'N/A'}</td>  */}
                  <td className="px-4 py-3">{order.userId?.name || 'Guest'}</td>
                  <td className="px-4 py-3">{order.userId?.email || order.shippingInfo?.email || 'N/A'}</td>
                  <td className="px-4 py-3">₹{(order.amount).toFixed(2)}</td>
                  <td className="px-4 py-3">{order.status}</td>
                  <td className="px-4 py-3">{order.paymentMethod}</td>
                  <td className="px-4 py-3">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 whitespace-pre-wrap text-xs">
                    {order.shippingInfo
                      ? `${order.shippingInfo.name}\n${order.shippingInfo.phone}\n${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state} - ${order.shippingInfo.pincode}`
                      : 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-xs whitespace-pre-wrap">
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item, idx) => (
                        <div key={item._id || idx}>
                          {item.name || item.product?.name || item.product?.model} (x{item.quantity}) - ₹{item.price || item.product?.price}
                        </div>
                      ))
                    ) : (
                      'No items'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminOrderManager;
