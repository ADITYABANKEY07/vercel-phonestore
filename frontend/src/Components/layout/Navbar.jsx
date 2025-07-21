import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { FaCartShopping } from "react-icons/fa6";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
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

  const navLinkClasses = "relative text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-white transition-colors duration-300 before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-blue-500 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100";
  const mobileNavLinkClasses = "block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-blue-600 rounded-md transition-colors duration-300";

  // Determine if the current route is an admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Determine if the user is an admin
  const isAdmin = user && user.isAdmin;

  // Conditional rendering logic
  const shouldShowAdminOnlyNav = isAdmin && isAdminRoute;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 dark:bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold text-gray-900 dark:text-white transform hover:scale-105 transition-transform duration-300">
          eCommerce
        </Link>

        {/* Mobile Menu Button (Hamburger) - always show for mobile */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-gray-600 dark:text-white focus:outline-none focus:text-gray-800 dark:focus:text-white">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center justify-center flex-grow space-x-8 text-lg font-medium">
          {shouldShowAdminOnlyNav ? (
            // Admin-only view: Only Admin Dashboard link
            <Link to="/admin" className={navLinkClasses}>Admin Dashboard</Link>
          ) : (
            // Regular user view or Admin not on admin route: Show all standard links
            <>
              <Link to="/" className={navLinkClasses}>Home</Link>
              <Link to="/shop" className={navLinkClasses}>Shop</Link>
              <Link to="/contact" className={navLinkClasses}>Contact</Link>
              <Link to="/about" className={navLinkClasses}>About</Link>
              {/* Admin Dashboard link - only show if user is admin AND not on admin route (already shown above) */}
              {isAdmin && !isAdminRoute && ( // Show admin dashboard link if admin but not currently on an admin page
                <Link to="/admin" className={navLinkClasses}>Admin Dashboard</Link>
              )}
            </>
          )}
        </div>

        {/* Right-aligned Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {!shouldShowAdminOnlyNav && ( // Hide cart/login/logout if in admin-only view
            <Link to="/cart" className="text-3xl text-gray-700 dark:text-white hover:scale-110 transition-transform duration-300" aria-label="Shopping Cart">
              <FaCartShopping />
            </Link>
          )}
          {!user ? (
            !shouldShowAdminOnlyNav && ( // Hide login/signup if in admin-only view
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

      {/* Mobile Menu (Conditional Rendering) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-blue-700 py-4 px-6 border-t border-gray-200 dark:border-blue-600">
          <div className="flex flex-col space-y-3">
            {shouldShowAdminOnlyNav ? (
              // Admin-only view for mobile
              <Link to="/admin" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Admin Dashboard</Link>
            ) : (
              // Regular user view or Admin not on admin route for mobile
              <>
                <Link to="/" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link to="/shop" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
                <Link to="/contact" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                <Link to="/about" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                {isAdmin && !isAdminRoute && ( // Show admin dashboard link if admin but not currently on an admin page
                  <Link to="/admin" className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Admin Dashboard</Link>
                )}
                <Link to="/cart" className={`${mobileNavLinkClasses} flex items-center`} onClick={() => setIsMobileMenuOpen(false)}>
                  🛒 <span className="ml-2">Cart</span>
                </Link>
              </>
            )}
            {!user ? (
              !shouldShowAdminOnlyNav && ( // Hide login/signup if in admin-only view
                <Link to="/login" className="block px-4 py-2 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700 transition-colors duration-300" onClick={() => setIsMobileMenuOpen(false)}>
                  Login / Signup
                </Link>
              )
            ) : (
              <button
                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
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
