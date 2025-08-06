import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const FoodRequestModal = ({
  isOpen,
  onClose,
  food,
  user,
  axiosSecure,
  onRequestSuccess,
}) => {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) setNotes("");
  }, [isOpen]);

  if (!isOpen || !food || !user) return null;

  const handleConfirmRequest = async () => {
    try {
      setLoading(true);

      const required = [
        food._id,
        food.name,
        food.image,
        food.donorName,
        food.donorEmail,
        food.pickupLocation,
        food.expireDate,
        user.email,
      ];

      if (required.some((val) => !val)) {
        Swal.fire("Missing data", "Some required fields are missing", "error");
        return;
      }

      const requestData = {
        foodId: food._id,
        foodName: food.name,
        foodImage: food.image,
        quantity: food.quantity,
        donorName: food.donorName,
        donorEmail: food.donorEmail,
        pickupLocation: food.pickupLocation,
        expireDate: food.expireDate,
        requesterEmail: user.email,
        requesterName: user.displayName || "Anonymous",
        requesterPhoto: user.photoURL || "",
        additionalNotes: notes,
        requestDate: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/my-requests", requestData);

      if (res.data.insertedId) {
        await axiosSecure.patch(`/foods/${food._id}`, { status: "requested" });

        Swal.fire(
          "🎉 Success!",
          "Your food request has been submitted!",
          "success"
        ).then(() => {
          onClose();
          navigate("/my-requests");
        });

        if (typeof onRequestSuccess === "function") {
          onRequestSuccess();
        }
      } else {
        throw new Error("Request insert failed");
      }
    } catch (err) {
      console.error("❌ POST error:", err?.response?.data || err.message);
      Swal.fire("Error", err?.response?.data?.message || err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"
        onClick={loading ? undefined : onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6">
        <div className="w-full max-w-2xl bg-white bg-opacity-90 backdrop-blur-md border border-blue-200 rounded-xl shadow-2xl overflow-y-auto max-h-[90vh] relative animate-fade-in sm:rounded-2xl">
          {/* Header */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 rounded-t-xl bg-gradient-to-r from-blue-600 to-indigo-700">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center sm:text-left">
              🍽️ Confirm Food Request
            </h2>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-6 space-y-4 text-gray-700 text-sm sm:text-base">
            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Food Name", value: food.name },
                { label: "Donor Name", value: food.donorName },
                { label: "Donor Email", value: food.donorEmail },
                { label: "Your Email", value: user.email },
                { label: "Pickup Location", value: food.pickupLocation },
                {
                  label: "Expire Date",
                  value: new Date(food.expireDate).toLocaleDateString(),
                },
              ].map((field, i) => (
                <div key={i}>
                  <label className="text-xs font-medium text-gray-700 sm:text-sm">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={field.value}
                    readOnly
                    className="w-full mt-1 p-2 rounded-md border bg-gray-100 text-xs sm:text-sm shadow-sm"
                  />
                </div>
              ))}
            </div>

            {/* Notes */}
            <div>
              <label className="text-xs font-medium sm:text-sm">
                Additional Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={loading}
                rows={3}
                placeholder="Add any extra message to donor..."
                className="w-full mt-1 p-2 sm:p-3 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs sm:text-sm"
              />
            </div>

            {/* Image */}
            <div>
              <label className="text-xs font-medium sm:text-sm">
                Food Image
              </label>
              <img
                src={food.image}
                alt={food.name}
                className="w-full mt-2 h-40 sm:h-48 object-cover rounded-lg border shadow"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-end items-center gap-3 px-4 sm:px-6 py-4 bg-gray-100 rounded-b-xl">
            <button
              onClick={onClose}
              disabled={loading}
              className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base rounded-md border border-gray-300 text-gray-700 hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmRequest}
              disabled={loading}
              className="w-full sm:w-auto px-5 py-2 sm:px-6 sm:py-2 rounded-md bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold hover:scale-105 transform transition-all duration-200 shadow-md flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 border-t-2 border-white rounded-full animate-spin"></span>
                  Sending...
                </>
              ) : (
                <>🚀 Request Food</>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodRequestModal;
