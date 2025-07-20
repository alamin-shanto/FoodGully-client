// FoodDetails.jsx
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/AxiosSecure";
import AuthContext from "../Providers/AuthContext";
import Swal from "sweetalert2";
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
  const navigate = useNavigate();

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

  const handleRequestSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Request Successful",
      text: "Your food request has been submitted.",
    });
    navigate("/my-requests");
  };

  if (isLoading)
    return (
      <div className="p-6 text-center text-gray-400">Loading details...</div>
    );

  if (isError)
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load food details: {error.message}
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 mt-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg border">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-72 object-cover rounded-xl border hover:scale-105 transition duration-300"
        />
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-blue-900">{food.name}</h2>
          <p className="text-gray-700">
            <span className="font-semibold">Quantity:</span>{" "}
            <span className="text-lg text-indigo-600">{food.quantity}</span>
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <FaMapMarkerAlt className="text-blue-500" />
            <span>
              <strong>Location:</strong> {food.pickupLocation}
            </span>
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <FaCalendarAlt className="text-red-400" />
            <span>
              <strong>Expires:</strong>{" "}
              {new Date(food.expireDate).toLocaleDateString()}
            </span>
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <FaUser className="text-green-600" />
            <span>
              <strong>Donor:</strong> {food.donorName} ({food.donorEmail})
            </span>
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <FaCheckCircle
              className={`text-lg ${
                food.status === "available" ? "text-green-600" : "text-red-500"
              }`}
            />
            <span className="font-medium">
              Status:{" "}
              <span
                className={`capitalize ${
                  food.status === "available"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {food.status}
              </span>
            </span>
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">
          Add a note to your request:
        </h3>
        <textarea
          className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add any additional notes or instructions for the donor..."
          readOnly
          value="Click the request button to write note"
        />
        <button
          onClick={() => setShowModal(true)}
          disabled={food.status !== "available"}
          className={`mt-4 w-full px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] 
            ${
              food.status !== "available"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            }`}
        >
          🚀 Request This Food
        </button>
      </div>

      <FoodRequestModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        food={food}
        user={user}
        userEmail={user?.email}
        onRequestSuccess={handleRequestSuccess}
        axiosSecure={axiosSecure}
      />
    </div>
  );
};

export default FoodDetails;
