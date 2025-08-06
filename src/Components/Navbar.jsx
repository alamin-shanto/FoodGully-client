import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../Providers/AuthContext";
import { Link, useLocation } from "react-router-dom"; // <-- import useLocation

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // <-- get current path

  const handleLogout = () => {
    logOut().catch(console.error);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Optional: Close menu on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Helper function to check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Active link styles
  const activeLinkClass = "text-yellow-300 font-bold";

  return (
    <nav className="bg-gradient-to-r from-green-400 to-blue-500 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between relative">
        {/* Logo */}
        <Link
          to="/"
          className={`text-3xl font-extrabold text-white tracking-widest hover:text-yellow-300 transition-colors duration-300 ${isActive(
            "/"
          )}`}
          onClick={handleLinkClick}
        >
          FoodGully
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-white font-semibold">
          <Link
            to="/"
            onClick={handleLinkClick}
            className={`hover:text-yellow-300 transition-colors duration-300 ${
              isActive("/") ? activeLinkClass : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/foods"
            onClick={handleLinkClick}
            className={`hover:text-yellow-300 transition-colors duration-300 ${
              isActive("/foods") ? activeLinkClass : ""
            }`}
          >
            Available Foods
          </Link>
          {user && (
            <>
              <Link
                to="/add-food"
                onClick={handleLinkClick}
                className={`hover:text-yellow-300 transition-colors duration-300 ${
                  isActive("/add-food") ? activeLinkClass : ""
                }`}
              >
                Add Food
              </Link>
              <Link
                to="/manage-foods"
                onClick={handleLinkClick}
                className={`hover:text-yellow-300 transition-colors duration-300 ${
                  isActive("/manage-foods") ? activeLinkClass : ""
                }`}
              >
                Manage My Foods
              </Link>
              <Link
                to="/my-requests"
                onClick={handleLinkClick}
                className={`hover:text-yellow-300 transition-colors duration-300 ${
                  isActive("/my-requests") ? activeLinkClass : ""
                }`}
              >
                My Food Requests
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden z-50">
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            className="text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
          >
            {isMobileMenuOpen ? (
              // Close icon (X)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-white text-green-600 px-4 py-1 rounded-md font-semibold hover:bg-yellow-300 hover:text-white transition-colors duration-300"
                onClick={handleLinkClick}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-300 text-white px-4 py-1 rounded-md font-semibold hover:bg-yellow-400 transition-colors duration-300"
                onClick={handleLinkClick}
              >
                Signup
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-3 bg-white rounded-full px-3 py-1 shadow-md">
              <img
                src={user.photoURL || "https://i.pravatar.cc/40"}
                alt="profile"
                className="w-10 h-10 rounded-full border-2 border-green-500"
                title={user.displayName || "User"}
              />
              <button
                onClick={handleLogout}
                className="text-green-600 font-semibold hover:text-red-600 transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          ></div>

          {/* Menu panel */}
          <div className="fixed top-0 right-0 w-3/4 max-w-xs h-full bg-gradient-to-r from-green-400 to-blue-500 text-white z-50 p-6 shadow-lg overflow-auto">
            <nav className="flex flex-col space-y-6 font-semibold">
              <Link
                to="/"
                onClick={handleLinkClick}
                className={`hover:text-yellow-300 ${
                  isActive("/") ? activeLinkClass : ""
                }`}
              >
                Home
              </Link>
              <Link
                to="/foods"
                onClick={handleLinkClick}
                className={`hover:text-yellow-300 ${
                  isActive("/foods") ? activeLinkClass : ""
                }`}
              >
                Available Foods
              </Link>
              {user && (
                <>
                  <Link
                    to="/add-food"
                    onClick={handleLinkClick}
                    className={`hover:text-yellow-300 ${
                      isActive("/add-food") ? activeLinkClass : ""
                    }`}
                  >
                    Add Food
                  </Link>
                  <Link
                    to="/manage-foods"
                    onClick={handleLinkClick}
                    className={`hover:text-yellow-300 ${
                      isActive("/manage-foods") ? activeLinkClass : ""
                    }`}
                  >
                    Manage My Foods
                  </Link>
                  <Link
                    to="/my-requests"
                    onClick={handleLinkClick}
                    className={`hover:text-yellow-300 ${
                      isActive("/my-requests") ? activeLinkClass : ""
                    }`}
                  >
                    My Food Requests
                  </Link>
                </>
              )}

              {!user ? (
                <>
                  <Link
                    to="/login"
                    onClick={handleLinkClick}
                    className="bg-white text-green-600 px-4 py-2 rounded-md font-semibold hover:bg-yellow-300 hover:text-white transition-colors duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={handleLinkClick}
                    className="bg-yellow-300 text-white px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition-colors duration-300"
                  >
                    Signup
                  </Link>
                </>
              ) : (
                <div className="flex items-center space-x-3 bg-white rounded-full px-3 py-1 shadow-md mt-2">
                  <img
                    src={user.photoURL || "https://i.pravatar.cc/40"}
                    alt="profile"
                    className="w-10 h-10 rounded-full border-2 border-green-500"
                    title={user.displayName || "User"}
                  />
                  <button
                    onClick={handleLogout}
                    className="text-green-600 font-semibold hover:text-red-600 transition-colors duration-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </nav>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
