import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/AxiosSecure";
import AuthContext from "../Providers/AuthContext";
import {
  FaMapMarkerAlt,
  FaUser,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import FoodRequestModal from "./FoodRequestModal";

const FoodDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const {
    data: food,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["food", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/foods/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading)
    return (
      <p className="p-6 text-center text-blue-500 font-medium text-lg">
        Loading food...
      </p>
    );
  if (isError)
    return (
      <p className="p-6 text-red-500 font-semibold">Error: {error.message}</p>
    );

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-6 bg-gray-50">
      <div className="w-full max-w-4xl p-6 md:p-8 rounded-2xl bg-white shadow-2xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image Container */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-xl shadow-lg">
            <img
              src={food.image}
              alt={food.name}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Details */}
          <div className="space-y-6 text-gray-800">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-800 leading-tight">
              {food.name}
            </h2>

            <div className="space-y-4 text-sm sm:text-base">
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500" />
                <span className="font-medium">Pickup:</span>{" "}
                {food.pickupLocation}
              </p>
              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-red-500" />
                <span className="font-medium">Expires:</span>{" "}
                {new Date(food.expireDate).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2">
                <FaUser className="text-green-600" />
                <span className="font-medium">Donor:</span> {food.donorName} (
                {food.donorEmail})
              </p>
              <p className="flex items-center gap-2">
                <FaCheckCircle
                  className={`${
                    food.status === "available"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                />
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider
                  ${
                    food.status === "available"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {food.status}
                </span>
              </p>
            </div>

            {/* Request Button */}
            <button
              onClick={() => setShowModal(true)}
              disabled={food.status !== "available"}
              className={`w-full mt-6 px-6 py-3 rounded-lg text-white text-lg font-semibold transition-all duration-300
                ${
                  food.status !== "available"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                }`}
            >
              🚀 Request This Food
            </button>
          </div>
        </div>
      </div>

      <FoodRequestModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        food={food}
        user={user}
        axiosSecure={axiosSecure}
      />
    </div>
  );
};

export default FoodDetails;
