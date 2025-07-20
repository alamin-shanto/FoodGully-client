import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../Hooks/AxiosSecure";

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axios.get(`/foods/${id}`);
        setFood(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch food details:", error);
        setLoading(false);
      }
    };

    fetchFood();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-10 text-lg font-medium">Loading...</div>
    );
  }

  if (!food) {
    return <div className="text-center py-10 text-red-500">Food not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{food.name}</h2>
          <p className="text-gray-600 mb-2">
            <strong>Quantity:</strong> {food.quantity}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Location:</strong> {food.location}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Donor:</strong> {food.donorName}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Donor Email:</strong> {food.donorEmail}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Expires:</strong> {food.expireDate}
          </p>
          <p className="text-gray-700 leading-relaxed">
            {food.description || "No description provided."}
          </p>

          <div className="mt-6 flex justify-between items-center">
            <Link
              to="/foods"
              className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 transition"
            >
              ⬅️ Back to Foods
            </Link>
            <button
              className="px-6 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white transition"
              disabled={food.status !== "available"}
            >
              {food.status === "available"
                ? "Request This Food"
                : "Already Requested"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
