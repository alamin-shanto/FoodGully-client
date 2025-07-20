// FoodRequestModal.jsx
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const FoodRequestModal = ({
  isOpen,
  onClose,
  food,
  user,
  userEmail,
  onRequestSuccess,
  axiosSecure,
}) => {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) setNotes("");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirmRequest = async () => {
    if (!food || !(userEmail || user?.email)) {
      Swal.fire("Error", "Missing required user or food info.", "error");
      return;
    }

    setLoading(true);
    try {
      const requestData = {
        foodId: food._id,
        foodName: food.name,
        donorName: food.donorName,
        donorEmail: food.donorEmail,
        pickupLocation: food.pickupLocation,
        expireDate: food.expireDate,
        requesterName: user?.displayName || "Anonymous",
        requesterEmail: userEmail || user.email,
        requesterPhoto: user?.photoURL || "",
        additionalNotes: notes,
        requestDate: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/requests", requestData);
      if (!res.data.insertedId) throw new Error("Insert failed");

      await axiosSecure.patch(`/foods/${food._id}`, { status: "requested" });

      onRequestSuccess(); // triggers Swal + redirect
      onClose();
    } catch (err) {
      Swal.fire("Oops!", err.message || "Request failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"
        onClick={loading ? undefined : onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="w-full max-w-2xl bg-white bg-opacity-90 backdrop-blur-md border border-blue-200 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh] relative animate-fade-in">
          <div className="px-6 py-4 rounded-t-2xl bg-gradient-to-r from-blue-600 to-indigo-700">
            <h2 className="text-2xl font-bold text-white">
              🍽️ Confirm Food Request
            </h2>
          </div>
          <div className="p-6 space-y-4 text-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Food Name", value: food.name },
                { label: "Food ID", value: food._id },
                { label: "Donor Name", value: food.donorName },
                { label: "Donor Email", value: food.donorEmail },
                { label: "Your Email", value: userEmail || user?.email },
                { label: "Request Date", value: new Date().toLocaleString() },
                { label: "Pickup Location", value: food.pickupLocation },
                {
                  label: "Expire Date",
                  value: new Date(food.expireDate).toLocaleString(),
                },
              ].map((field, i) => (
                <div key={i}>
                  <label className="text-sm font-medium">{field.label}</label>
                  <input
                    type="text"
                    value={field.value}
                    readOnly
                    className="w-full mt-1 p-2 rounded-md border bg-gray-100 text-sm shadow-sm"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="text-sm font-medium">Additional Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={loading}
                rows={3}
                placeholder="Add any extra message to donor..."
                className="w-full mt-1 p-3 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Food Image</label>
              <img
                src={food.image}
                alt={food.name}
                className="w-full mt-2 h-48 object-cover rounded-xl border shadow"
              />
            </div>
          </div>

          <div className="flex justify-end px-6 py-4 bg-gray-100 rounded-b-2xl space-x-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmRequest}
              disabled={loading}
              className="px-6 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold hover:scale-105 transform transition-all duration-200 shadow-md flex items-center gap-2"
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
