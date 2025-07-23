// src/Pages/Login.jsx
const BASE_URL = import.meta.env.VITE_API_URL;
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const toggleLogin = () => {
    setIsLogin((prev) => !prev);
    setError("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url = isLogin
        ? `${BASE_URL}/users/login`
        : `${BASE_URL}/users/signup`;

      const dataToSend = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

      const res = await axios.post(url, dataToSend);

      const { token, user } = res.data;

      if (token && user) {
        localStorage.setItem("user", JSON.stringify({ ...user, token })); // ✅ Combine token into user object
        window.dispatchEvent(new Event("userChanged")); // ✅ notify nav or others
      } else {
        throw new Error("Invalid token or user data");
      }

      const redirect =
        new URLSearchParams(location.search).get("redirect") || "/";

      if (user.isAdmin) {
        navigate("/admin", { replace: true });
      } else {
        navigate(redirect, { replace: true });
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || err.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
          <div className="flex justify-center mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white bg-gray-400 p-2 rounded">
              eCommerce
            </h2>
          </div>

          <h3 className="mt-3 text-lg font-medium text-center text-gray-600 dark:text-gray-200">
            Welcome Back
          </h3>

          <p className="mt-1 text-lg text-center text-gray-500 dark:text-gray-400">
            {isLogin ? "Login" : "Signup"}
          </p>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="w-full mt-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full Name"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:border-blue-400"
                />
              </div>
            )}

            <div className="w-full mt-4">
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Email Address"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:border-blue-400"
              />
            </div>

            <div className="w-full mt-4">
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder="Password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:border-blue-400"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              {isLogin && (
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
                >
                  Forget Password?
                </a>
              )}

              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none"
              >
                {isLogin ? "Sign In" : "Register"}
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center py-4 bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>

          <button
            onClick={toggleLogin}
            className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
