import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/AxiosSecure";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaClock, FaMapMarkerAlt, FaUser, FaInfoCircle } from "react-icons/fa";

const truncateText = (text, length = 40) =>
  text.length > length ? text.slice(0, length) + "…" : text;

const MyRequests = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: requests = [],
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["myRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-requests");
      return res.data;
    },
  });

  const handleCancel = async (requestId) => {
    const confirmResult = await Swal.fire({
      title: "Cancel Request?",
      text: "Are you sure you want to cancel this food request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "No",
      reverseButtons: true,
    });

    if (confirmResult.isConfirmed) {
      try {
        await axiosSecure.delete(`/my-requests/${requestId}`);
        Swal.fire("Canceled", "Your request was canceled.", "success");
        refetch();
      } catch (err) {
        Swal.fire(
          "Error",
          "Failed to cancel the request: " + (err.message || err),
          "error"
        );
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid date";
    return format(date, "PP");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40 text-green-600 font-semibold text-xl">
        Loading your requests...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 font-semibold py-10">
        Error fetching your requests: {error?.message || "Unknown error"}
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400 select-none">
        <svg
          className="w-20 h-20 mb-6 text-green-400 animate-pulse"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h18M3 14h18M3 18h18"
          />
        </svg>
        <h3 className="text-2xl font-semibold mb-2 text-green-600">
          No food requests yet
        </h3>
        <p className="max-w-md text-gray-500 mb-6">
          You haven't made any food requests yet. Browse available foods and
          find something to request.
        </p>
        <Link
          to="/foods"
          className="btn bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition-transform hover:scale-105"
        >
          Browse Foods
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-8 py-8 max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {requests.map((req) => (
        <div
          key={req._id}
          className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between w-full"
        >
          <div>
            <h3
              className="text-xl font-semibold text-green-800 mb-2 truncate"
              title={req.foodName}
            >
              {req.foodName || "Unnamed Food"}
            </h3>
            <p
              className="text-base text-gray-700 mb-2 truncate"
              title={req.donorName}
            >
              <FaUser className="inline mr-2 text-green-600" />
              Donor: {req.donorName || "Unknown"}
            </p>
            <p
              className="text-base text-gray-700 mb-2 truncate"
              title={req.pickupLocation}
            >
              <FaMapMarkerAlt className="inline mr-2 text-green-600" />
              Pickup: {req.pickupLocation || "N/A"}
            </p>
            <p className="text-sm text-gray-600 flex items-center space-x-2 mb-1">
              <FaClock />
              <span>Expires: {formatDate(req.expireDate)}</span>
            </p>
            <p className="text-sm text-gray-600 flex items-center space-x-2 mb-3">
              <FaClock />
              <span>Requested: {formatDate(req.requestDate)}</span>
            </p>
            {req.additionalNotes && (
              <p
                className="text-sm text-gray-800 italic truncate"
                title={req.additionalNotes}
              >
                <FaInfoCircle className="inline mr-2 text-green-700" />
                Notes: {truncateText(req.additionalNotes, 60)}
              </p>
            )}
          </div>
          <button
            onClick={() => handleCancel(req._id)}
            className="mt-5 bg-red-700 hover:bg-red-800 text-white text-base font-semibold px-4 py-2 rounded-md shadow w-full transition"
          >
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyRequests;
