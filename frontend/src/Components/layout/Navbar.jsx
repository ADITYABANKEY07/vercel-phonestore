import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLoggedInUser = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
        return JSON.parse(storedUser);
      }
    } catch (e) {
      console.error("Error parsing user data from localStorage in Navbar:", e);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
    return null;
  };

  const [user, setUser] = useState(getLoggedInUser);

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getLoggedInUser());
    };
    const handleUserChange = () => {
      setUser(getLoggedInUser());
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userChanged", handleUserChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userChanged", handleUserChange);
    };
  }, []);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("userChanged"));
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinkClasses =
    "relative text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-white transition-colors duration-300 before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-blue-500 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100";
  const mobileNavLinkClasses =
    "block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-blue-600 rounded-md transition-colors duration-300";

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAdmin = user && user.isAdmin;
  const shouldShowAdminOnlyNav = isAdmin && isAdminRoute;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 dark:bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        {/* Mobile Hamburger */}
        {isMobile && (
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 dark:text-white focus:outline-none"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        )}

        {/* Responsive Logo */}
        {isAdminRoute ? (
          <span
            className={`text-3xl font-extrabold text-gray-900 dark:text-white cursor-not-allowed ${
              isMobile
                ? "absolute left-1/2 transform -translate-x-1/2"
                : "static transform-none"
            }`}
            title="You're in admin mode"
          >
            eCommerce
          </span>
        ) : (
          <Link
            to="/"
            className={`text-3xl font-extrabold text-gray-900 dark:text-white hover:scale-105 transition-transform duration-300 ${
              isMobile
                ? "absolute left-1/2 transform -translate-x-1/2"
                : "static transform-none"
            }`}
          >
            eCommerce
          </Link>
        )}

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center justify-center flex-grow space-x-8 text-lg font-medium">
          {shouldShowAdminOnlyNav ? (
            <Link to="/admin" className={navLinkClasses}>Admin Dashboard</Link>
          ) : (
            <>
              <Link to="/" className={navLinkClasses}>Home</Link>
              <Link to="/shop" className={navLinkClasses}>Shop</Link>
              <Link to="/contact" className={navLinkClasses}>Contact</Link>
              <Link to="/about" className={navLinkClasses}>About</Link>
              {isAdmin && !isAdminRoute && (
                <Link to="/admin" className={navLinkClasses}>Admin Dashboard</Link>
              )}
            </>
          )}
        </div>

        {/* Right-side Actions */}
        <div>
          {/* Mobile: Cart only */}
          <div className="flex md:hidden items-center gap-4">
            {!shouldShowAdminOnlyNav && (
              <Link to="/cart" className="text-2xl text-gray-700 dark:text-white hover:scale-110 transition-transform duration-300" aria-label="Shopping Cart">
                <FaCartShopping />
              </Link>
            )}
          </div>

          {/* Desktop: Cart + Auth Buttons */}
          <div className="hidden md:flex items-center gap-6">
            {!shouldShowAdminOnlyNav && (
              <Link to="/cart" className="text-3xl text-gray-700 dark:text-white hover:scale-110 transition-transform duration-300" aria-label="Shopping Cart">
                <FaCartShopping />
              </Link>
            )}
            {!user ? (
              !shouldShowAdminOnlyNav && (
                <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 font-semibold">
                  Login / Signup
                </Link>
              )
            ) : (
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-gray-500 text-white rounded-full shadow-md hover:bg-gray-600 transform hover:scale-105 transition-all duration-300 font-semibold"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-blue-700 py-4 px-6 border-t border-gray-200 dark:border-blue-600">
          <div className="flex flex-col space-y-3">
            {shouldShowAdminOnlyNav ? (
              <Link to="/admin" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Admin Dashboard</Link>
            ) : (
              <>
                <Link to="/" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link to="/shop" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
                <Link to="/contact" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                <Link to="/about" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                {isAdmin && !isAdminRoute && (
                  <Link to="/admin" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Admin Dashboard</Link>
                )}
              </>
            )}
            {!user ? (
              !shouldShowAdminOnlyNav && (
                <Link to="/login" className="block px-4 py-2 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700 transition-colors duration-300" onClick={() => setIsMobileMenuOpen(false)}>
                  Login / Signup
                </Link>
              )
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full px-4 py-2 bg-gray-500 text-white rounded-md text-center hover:bg-gray-600 transition-colors duration-300"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
