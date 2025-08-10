import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../Providers/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logOut().catch(console.error);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const handleLinkClick = () => setIsMobileMenuOpen(false);

  // Detect scroll to add shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;
  const activeLinkClass = "text-yellow-300 font-bold";

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/foods", label: "Available Foods" },
    ...(user
      ? [
          { path: "/add-food", label: "Add Food" },
          { path: "/manage-foods", label: "Manage My Foods" },
          { path: "/my-requests", label: "My Food Requests" },
        ]
      : []),
  ];

  const authButtons = !user ? (
    <>
      <Link
        to="/login"
        onClick={handleLinkClick}
        className="bg-white text-green-600 px-4 py-1 rounded-md font-medium hover:bg-yellow-300 hover:text-white transition-all duration-300"
      >
        Login
      </Link>
      <Link
        to="/register"
        onClick={handleLinkClick}
        className="bg-yellow-300 text-white px-4 py-1 rounded-md font-medium hover:bg-yellow-400 transition-all duration-300"
      >
        Signup
      </Link>
    </>
  ) : (
    <div className="flex items-center gap-3 bg-white rounded-full px-3 py-1 shadow-md">
      <img
        src={user.photoURL || "https://i.pravatar.cc/40"}
        alt="profile"
        className="w-10 h-10 rounded-full border-2 border-green-500"
        title={user.displayName || "User"}
      />
      <button
        onClick={handleLogout}
        className="text-green-600 font-medium hover:text-red-600 transition-colors duration-300"
      >
        Logout
      </button>
    </div>
  );

  return (
    <nav
      className={`bg-gradient-to-r from-green-500 to-blue-600 sticky top-0 w-full z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={handleLinkClick}
          className="text-3xl font-extrabold tracking-widest text-white hover:text-yellow-300 transition-colors duration-300"
        >
          FoodGully
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={handleLinkClick}
              className={`text-white hover:text-yellow-300 transition-colors duration-300 ${
                isActive(link.path) ? activeLinkClass : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {authButtons}
        </div>

        {/* Mobile Menu Button - only when closed */}
        {!isMobileMenuOpen && (
          <button
            onClick={toggleMobileMenu}
            aria-label="Open menu"
            className="md:hidden text-white hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 z-50 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-gradient-to-br from-green-500/30 via-black/40 to-blue-600/30 backdrop-blur-md z-40 transition-opacity duration-300 ease-out"
          ></div>

          {/* Slide-in Menu */}
          <div
            className={`fixed top-0 left-0 w-3/4 max-w-xs h-full bg-gradient-to-b from-green-500 to-blue-600 text-white z-50 p-6 shadow-xl transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={toggleMobileMenu}
              aria-label="Close menu"
              className="absolute top-4 right-4 text-white hover:text-yellow-300 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <nav className="flex flex-col space-y-6 mt-10 font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleLinkClick}
                  className={`hover:text-yellow-300 transition-colors duration-300 ${
                    isActive(link.path) ? activeLinkClass : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4">{authButtons}</div>
            </nav>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
