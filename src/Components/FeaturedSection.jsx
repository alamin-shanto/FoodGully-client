import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../Hooks/AxiosSecure";

const FeaturedSection = () => {
  const axiosSecure = useAxiosSecure();
  const [featuredFoods, setFeaturedFoods] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axiosSecure.get("/foods");
        const sorted = res.data.sort((a, b) => b.quantity - a.quantity);
        setFeaturedFoods(sorted.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch featured foods:", error);
      }
    };

    fetchFeatured();
  }, [axiosSecure]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        🍽️ Featured Foods
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {featuredFoods.map((food) => (
          <div
            key={food._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <figure className="h-48 overflow-hidden">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </figure>
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {food.name}
              </h3>
              <p className="text-gray-600">
                <strong>Quantity:</strong> {food.quantity}
              </p>
              <div className="mt-4">
                <Link
                  to={`/foods/${food._id}`}
                  className="inline-block px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-md transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/foods"
          className="inline-block px-6 py-3 text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition"
        >
          Show All Foods
        </Link>
      </div>
    </div>
  );
};

export default FeaturedSection;
