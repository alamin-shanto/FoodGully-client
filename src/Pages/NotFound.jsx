import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center animate-fadeIn">
        {/* SVG icon for emphasis */}
        <svg
          className="mx-auto mb-6 w-24 h-24 text-red-500 animate-pulse"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
          ></path>
        </svg>

        <h1 className="text-7xl font-extrabold text-red-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, the page you’re looking for might have been removed or doesn’t
          exist.
        </p>

        <Link
          to="/"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
