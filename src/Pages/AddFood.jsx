import React, { useContext, useState } from "react";
import useAxiosSecure from "../Hooks/AxiosSecure";
import AuthContext from "../Providers/AuthContext";
import Swal from "sweetalert2";

const AddFood = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    quantity: "",
    pickupLocation: "",
    expireDate: "",
    additionalNotes: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const foodData = {
      ...formData,
      donorName: user?.displayName || "Anonymous",
      donorEmail: user?.email || "No Email",
      donorPhoto: user?.photoURL || "",
      status: "available",
      expireDate: new Date(formData.expireDate),
      deletable: true,
    };

    try {
      const res = await axiosSecure.post("/foods", foodData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Food added successfully", "success");
        setFormData({
          name: "",
          image: "",
          quantity: "",
          pickupLocation: "",
          expireDate: "",
          additionalNotes: "",
        });
      }
    } catch (err) {
      Swal.fire("Error", "Failed to add food", "error", err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-lg mt-16">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
        Add Food Donation
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Food Name"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Food Image URL"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
        <input
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          type="number"
          min="1"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
        <input
          name="pickupLocation"
          value={formData.pickupLocation}
          onChange={handleChange}
          placeholder="Pickup Location"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
        <input
          name="expireDate"
          value={formData.expireDate}
          onChange={handleChange}
          type="datetime-local"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
        <textarea
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
          placeholder="Additional Notes (optional)"
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition resize-none"
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md shadow-md transition"
        >
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFood;
