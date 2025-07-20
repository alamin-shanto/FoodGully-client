import React, { useCallback, useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/AxiosSecure";
import AuthContext from "../Providers/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyRequests = useCallback(async () => {
    try {
      const res = await axiosSecure.get("/my-requests");
      setRequests(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Swal.fire(
        "Error",
        "Failed to fetch your requests: " + (err.message || err),
        "error"
      );
    }
  }, [axiosSecure]);

  useEffect(() => {
    if (user) fetchMyRequests();
  }, [user, fetchMyRequests]);

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
        await axiosSecure.delete(`/requests/${requestId}`);
        Swal.fire("Canceled", "Your request was canceled.", "success");
        fetchMyRequests();
      } catch (error) {
        Swal.fire(
          "Error",
          "Failed to cancel the request: " + (error.message || error),
          "error"
        );
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-40 text-green-600 font-semibold text-xl">
        Loading your requests...
      </div>
    );

  if (requests.length === 0)
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-green-700">
        My Food Requests
      </h2>

      {/* Table for md and above */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg border border-green-200 hide-scrollbar">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-green-100 text-green-700 font-semibold text-lg">
            <tr>
              <th className="w-1/6 px-6 py-3 border-b border-green-300">
                Food Name
              </th>
              <th className="w-1/6 px-6 py-3 border-b border-green-300">
                Donor Name
              </th>
              <th className="w-1/6 px-6 py-3 border-b border-green-300">
                Pickup Location
              </th>
              <th className="w-1/6 px-6 py-3 border-b border-green-300">
                Expire Date
              </th>
              <th className="w-1/6 px-6 py-3 border-b border-green-300">
                Request Date
              </th>
              <th className="w-1/6 px-6 py-3 border-b border-green-300">
                Notes
              </th>
              <th className="w-24 px-6 py-3 border-b border-green-300 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr
                key={req._id}
                className="even:bg-green-50 hover:bg-green-100 transition-colors"
              >
                <td className="px-6 py-4 border-b border-green-200 break-words">
                  {req.foodName}
                </td>
                <td className="px-6 py-4 border-b border-green-200 break-words">
                  {req.donorName}
                </td>
                <td className="px-6 py-4 border-b border-green-200 break-words">
                  {req.pickupLocation}
                </td>
                <td className="px-6 py-4 border-b border-green-200 break-words">
                  {new Date(req.expireDate).toLocaleString()}
                </td>
                <td className="px-6 py-4 border-b border-green-200 break-words">
                  {new Date(req.requestDate).toLocaleString()}
                </td>
                <td className="px-6 py-4 border-b border-green-200 break-words">
                  {req.additionalNotes || "-"}
                </td>
                <td className="px-6 py-4 border-b border-green-200 text-center">
                  <button
                    onClick={() => handleCancel(req._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-md transition duration-200"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for mobile */}
      <div className="md:hidden space-y-4">
        {requests.map((req) => (
          <div
            key={req._id}
            className="p-4 border rounded-lg shadow-sm bg-white relative"
          >
            <p>
              <strong>Food Name:</strong> {req.foodName}
            </p>
            <p>
              <strong>Donor Name:</strong> {req.donorName}
            </p>
            <p>
              <strong>Pickup Location:</strong> {req.pickupLocation}
            </p>
            <p>
              <strong>Expire Date:</strong>{" "}
              {new Date(req.expireDate).toLocaleString()}
            </p>
            <p>
              <strong>Request Date:</strong>{" "}
              {new Date(req.requestDate).toLocaleString()}
            </p>
            <p>
              <strong>Notes:</strong> {req.additionalNotes || "-"}
            </p>
            <button
              onClick={() => handleCancel(req._id)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-md w-full"
            >
              Cancel
            </button>
          </div>
        ))}
      </div>

      <style>{`
        /* Hide scrollbar but allow scroll */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default MyRequest;
