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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire({
          icon: "success",
          title: "Food Added",
          text: "Your food has been listed successfully!",
        });
        setFormData({
          name: "",
          image: "",
          quantity: "",
          pickupLocation: "",
          expireDate: "",
          additionalNotes: "",
        });
      } else {
        throw new Error("Insert failed");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Failed to add food. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 mt-16 bg-white border border-green-200 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-800">
        🍱 Add Food Donation
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Food Name"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          type="number"
          min="1"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          name="pickupLocation"
          value={formData.pickupLocation}
          onChange={handleChange}
          placeholder="Pickup Location"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          name="expireDate"
          value={formData.expireDate}
          onChange={handleChange}
          type="datetime-local"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <textarea
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
          placeholder="Additional Notes (optional)"
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
        />

        <div className="text-gray-600 text-sm space-y-1 mt-4">
          <p>
            <strong>Donor:</strong> {user?.displayName || "Anonymous"}
          </p>
          <p>
            <strong>Email:</strong> {user?.email || "N/A"}
          </p>
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt="Donor"
              className="w-12 h-12 rounded-full mt-2"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md shadow-md transition duration-300"
        >
          ➕ Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFood;
