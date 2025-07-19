import React, { useContext } from "react";
import AuthContext from "../Providers/AuthContext";
import { Link } from "react-router-dom"; // Changed to react-router-dom for proper routing

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut().catch(console.error);
  };

  return (
    <nav className="bg-gradient-to-r from-green-400 to-blue-500 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-white tracking-widest hover:text-yellow-300 transition-colors duration-300"
        >
          FoodGully
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-white font-semibold">
          <Link
            to="/"
            className="hover:text-yellow-300 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/foods"
            className="hover:text-yellow-300 transition-colors duration-300"
          >
            Available Foods
          </Link>
          {user && (
            <>
              <Link
                to="/add-food"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                Add Food
              </Link>
              <Link
                to="/manage-foods"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                Manage My Foods
              </Link>
              <Link
                to="/my-requests"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                My Food Requests
              </Link>
            </>
          )}
        </div>

        {/* Auth Buttons and User Info */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-white text-green-600 px-4 py-1 rounded-md font-semibold hover:bg-yellow-300 hover:text-white transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-300 text-white px-4 py-1 rounded-md font-semibold hover:bg-yellow-400 transition-colors duration-300"
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
    </nav>
  );
};

export default Navbar;
