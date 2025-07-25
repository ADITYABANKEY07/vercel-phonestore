import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AppWrapper({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const isAdmin = storedUser?.isAdmin;

    // ✅ If admin and not already on admin route, redirect to /admin
    if (isAdmin && !location.pathname.startsWith("/admin")) {
      navigate("/admin", { replace: true });
    }
  }, [location]);

  return children;
}

export default AppWrapper;
