import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const UpdateFoodModal = ({ food, isOpen, onClose, onUpdate, axiosSecure }) => {
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    pickupLocation: "",
    expireDate: "",
  });

  useEffect(() => {
    if (isOpen && food) {
      setForm({
        name: food.name,
        quantity: food.quantity,
        pickupLocation: food.pickupLocation,
        expireDate: food.expireDate?.slice(0, 10) || "",
      });
    }
  }, [isOpen, food]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axiosSecure.patch(`/foods/${food._id}`, {
        name: form.name,
        quantity: Number(form.quantity),
        pickupLocation: form.pickupLocation,
        expireDate: form.expireDate,
      });

      if (res.modifiedCount > 0 || res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Food updated successfully", "success");
        onUpdate(); // Refresh list
        onClose();
      } else {
        Swal.fire("No changes", "Nothing was updated", "info");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to update food", "error", err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg space-y-4 relative">
          <h2 className="text-xl font-bold text-green-600">Update Food</h2>

          <label className="block text-sm">Food Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />

          <label className="block text-sm">Quantity</label>
          <input
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />

          <label className="block text-sm">Pickup Location</label>
          <input
            name="pickupLocation"
            value={form.pickupLocation}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />

          <label className="block text-sm">Expire Date</label>
          <input
            name="expireDate"
            type="date"
            value={form.expireDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateFoodModal;
