import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Add this line
import axios from 'axios';
import loadingGif from '../images/loading.gif';

const BASE_URL = import.meta.env.VITE_API_URL;

function AdminOrderManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ✅ Initialize navigate
  const ADMIN_URL = `${BASE_URL}/api`;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          setError('Please log in to view orders.');
          setLoading(false);
          return;
        }

        const parsedUser = JSON.parse(storedUser);
        const token = parsedUser.token;

        if (!token) {
          setError('Authentication required. Please log in.');
          setLoading(false);
          return;
        }

        const res = await axios.get(`${ADMIN_URL}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const ordersArray = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.orders)
          ? res.data.orders
          : [];

        setOrders(ordersArray);
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch orders: ${err.response?.data?.message || err.message}`);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto text-center">
        <img
          src={loadingGif}
          alt="Loading..."
          className="mx-auto w-16 h-16 animate-spin"
        />
        <p className="mt-2 text-gray-600">Loading orders...</p>
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
      {/* ✅ Back Button */}
      <button
        onClick={() => navigate('/admin')}
        className="mb-4 px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold mb-6">Admin Order Manager</h1>

      {Array.isArray(orders) && orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-600 border rounded shadow">
            <thead className="text-xs uppercase bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Name</th> {/* Added Order ID */}
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
