import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

 function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchCartItems(parsedUser.token);
    } else {
      navigate("/login?redirect=/cart");
    }
  }, []);

  const fetchCartItems = async (token) => {
    try {
      const res = await axios.get("http://localhost:3001/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error("Error loading cart:", err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("user");
        navigate("/login?redirect=/cart");
      }
    }
  };

  const updateItemQuantity = async (productId, newQuantity) => {
    if (!user?.token) return navigate("/login?redirect=/cart");

    const quantityToUpdate = Math.max(1, newQuantity);
    setCartItems((prev) =>
      prev.map((item) =>
        item.product?._id === productId
          ? { ...item, quantity: quantityToUpdate }
          : item
      )
    );

    try {
      await axios.put(
        `http://localhost:3001/api/cart/${productId}`,
        { quantity: quantityToUpdate },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
    } catch (err) {
      console.error("Update error:", err);
      fetchCartItems(user.token);
    }
  };

  const removeItemFromCart = async (productId) => {
    if (!user?.token) return navigate("/login?redirect=/cart");

    setCartItems((prev) =>
      prev.filter((item) => item.product?._id !== productId)
    );

    try {
      await axios.delete(`http://localhost:3001/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
    } catch (err) {
      console.error("Remove error:", err);
      fetchCartItems(user.token);
    }
  };

  const handleCheckout = () => {
    if (!user?.token) {
      return navigate("/login?redirect=/checkout");
    }
    navigate("/checkout");
  };

  const total = cartItems.reduce((sum, item) => {
    if (item.product && item.product.price) {
      return sum + item.quantity * item.product.price;
    }
    return sum;
  }, 0);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          <div className="hidden md:grid grid-cols-5 font-semibold text-gray-500 border-b pb-2">
            <div className="col-span-2">PRODUCT</div>
            <div className="text-center">QUANTITY</div>
            <div className="text-right col-span-2">TOTAL</div>
          </div>

          {cartItems.map((item) =>
            item.product ? (
              <div
                key={item.product._id}
                className="grid grid-cols-1 md:grid-cols-5 items-center gap-4 border-b py-4"
              >
                <div className="flex items-center col-span-2 space-x-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover border rounded"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-800">{item.product.name}</h2>
                    <p className="text-sm text-gray-600">Price: ₹{item.product.price}</p>
                    <button
                      onClick={() => removeItemFromCart(item.product._id)}
                      className="text-red-500 text-sm hover:underline mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2">
                  <button
                    onClick={() =>
                      updateItemQuantity(item.product._id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-300 disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateItemQuantity(item.product._id, item.quantity + 1)
                    }
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <div className="text-right col-span-2 font-semibold text-gray-800">
                  ₹ {item.quantity * item.product.price}
                </div>
              </div>
            ) : null
          )}

          <div className="text-right mt-6">
            <p className="text-lg text-gray-700 mb-1">Estimated total:</p>
            <h3 className="text-2xl font-bold mb-2">₹ {total}</h3>
            <p className="text-sm text-gray-500 mb-4">
              Tax included and shipping calculated at checkout
            </p>

            <div className="flex justify-end space-x-3">
              <Link to="/" className="text-blue-600 hover:underline mt-2 text-sm">
                Continue shopping
              </Link>
              <button
                onClick={handleCheckout}
                className="bg-teal-700 text-white px-6 py-2 rounded hover:bg-teal-800"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;