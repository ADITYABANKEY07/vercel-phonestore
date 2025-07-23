const BASE_URL = import.meta.env.VITE_API_URL;
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { convertToPaise } from "../utils/convertToPaise"; // adjust path if needed

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login?redirect=/checkout");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    fetchCart(parsedUser.token);
  }, [navigate]);

  const fetchCart = async (token) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/cart/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data;

      if (!data || !Array.isArray(data.items)) {
        console.error("❌ Cart response is not an array", data);
        alert("Unexpected response from server. Redirecting to cart.");
        navigate("/cart");
        return;
      }

      const validCartItems = data.items.filter(item => item.product);
      setCartItems(validCartItems);

      const total = validCartItems.reduce(
        (sum, item) => sum + item.quantity * (item.product?.price || 0),
        0
      );
      setTotalAmount(total);
    } catch (err) {
      console.error("❌ Failed to fetch cart:", err);
      alert("Failed to load cart. Redirecting to cart...");
      navigate("/cart");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const verifyPayment = async (paymentData, currentCartItems, currentTotalAmount) => {
    try {
      const token = user?.token;
      if (!token) {
        alert("User not authenticated. Please log in again.");
        navigate("/login");
        return;
      }

      const itemsForBackend = currentCartItems.map(item => {
        if (item.product && item.product._id) {
          return {
            productId: item.product._id,
            quantity: item.quantity,
            priceAtPurchase: item.product.price || 0
          };
        }
        return null;
      }).filter(Boolean);

      if (itemsForBackend.length === 0 && currentCartItems.length > 0) {
        console.error("No valid items to send for verification after filtering.");
        alert("No valid items in cart to process. Please check your cart.");
        return;
      }

      // 🔍 Frontend Debug Log: Data being sent to backend
      console.log("🚀 Frontend: Sending to /api/orders/verify:", {
        razorpay_order_id: paymentData.razorpay_order_id,
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_signature: paymentData.razorpay_signature,
        paymentDetails: {
          amount: currentTotalAmount,
          items: itemsForBackend,
          shippingInfo: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            address: form.address,
            pincode: form.pincode,
            city: form.city,
            state: form.state,
          },
        },
      });

      const response = await axios.post(
        `${BASE_URL}/api/orders/verify`,
        {
          razorpay_order_id: paymentData.razorpay_order_id,
          razorpay_payment_id: paymentData.razorpay_payment_id,
          razorpay_signature: paymentData.razorpay_signature,
          paymentDetails: {
            amount: currentTotalAmount,
            items: itemsForBackend,
            shippingInfo: {
              name: form.name,
              email: form.email,
              phone: form.phone,
              address: form.address,
              pincode: form.pincode,
              city: form.city,
              state: form.state,
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Payment verified and order saved:", response.data);
      alert("🎉 Payment successful and order placed!");
      navigate("/thankyou");
    } catch (err) {
      console.error("❌ Payment verification failed:", err.response?.data || err.message);
      alert("Payment verification failed. Please try again or contact support.");
    }
  };

  const handlePayment = async () => {
    const { name, email, phone, address, pincode, city, state } = form;

    if (!name || !email || !phone || !address || !pincode || !city || !state) {
      alert("Please fill all shipping details before proceeding.");
      return;
    }

    if (!user || !user.token) {
      alert("You need to be logged in to place an order. Redirecting to login.");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before proceeding to checkout.");
      navigate("/cart");
      return;
    }

    try {
      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded. Please refresh the page and try again.");
        return;
      }

      const amountInPaise = convertToPaise(totalAmount);

      const { data: order } = await axios.post(
        `${BASE_URL}/api/payment/create-order`,
        { amount: amountInPaise },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "EcomAi Store",
        description: "Order Payment",
        image: "https://placehold.co/80x80",
        order_id: order.id,
        handler: function (response) {
          // 🔍 Frontend Debug Log: Razorpay handler response
          console.log("🚀 Frontend: Razorpay handler response:", response);
          verifyPayment(response, cartItems, totalAmount);
        },
        prefill: {
          name,
          email,
          contact: phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("❌ Error initiating Razorpay payment:", error.response?.data || error.message);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      {/* Shipping Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["name", "email", "phone", "pincode", "city", "state"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          ))}
          <textarea
            name="address"
            placeholder="Full Address"
            value={form.address}
            onChange={handleChange}
            rows={3}
            className="border border-gray-300 p-3 rounded-md w-full col-span-1 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              item.product && (
                <div
                  key={item.product._id}
                  className="flex items-center justify-between py-3 border-b border-gray-200"
                >
                  <div className="flex items-center space-x-4">
                    {item.product.image && (
                      <img
                        src={item.product.image}
                        alt={item.product.model || "Product Image"}
                        className="w-20 h-20 object-cover rounded-md shadow-sm"
                      />
                    )}
                    <div>
                      <p className="font-medium text-lg">{item.product.model || "N/A"}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-lg text-gray-800">
                    ₹{(item.product?.price || 0) * item.quantity}
                  </span>
                </div>
              )
            ))
          )}
        </div>

        <div className="text-right mt-6 pt-4 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900">Total: ₹{totalAmount}</h3>
        </div>

        <div className="mt-8 text-right">
          <button
            onClick={handlePayment}
            className="bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-green-700 transition disabled:opacity-50"
            disabled={cartItems.length === 0 || !user}
          >
            Pay ₹{totalAmount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
