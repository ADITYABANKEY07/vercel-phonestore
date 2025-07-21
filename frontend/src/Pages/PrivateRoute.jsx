// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const PrivateRoute = ({ children, requiredAdmin = false }) => {
  const userData = localStorage.getItem("user");
  if (!userData) {
    console.warn("PrivateRoute: No user found.");
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userData);
    const token = user.token;
    const decoded = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      console.warn("PrivateRoute: Token expired.");
      localStorage.removeItem("user");
      return <Navigate to="/login" replace />;
    }

    if (requiredAdmin && !user.isAdmin) {
      console.warn("PrivateRoute: Not an admin.");
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch (err) {
    console.error("PrivateRoute: Invalid token.", err);
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
