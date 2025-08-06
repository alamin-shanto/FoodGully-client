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
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14 text-green-700 drop-shadow-lg">
        🍽️ Featured Foods
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {featuredFoods.map((food) => (
          <div
            key={food._id}
            className="rounded-3xl overflow-hidden bg-gradient-to-br from-white/80 via-white/60 to-green-100 border border-green-200 shadow-xl hover:shadow-2xl transition duration-300 backdrop-blur-md"
          >
            <figure className="h-56 w-full overflow-hidden">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110"
              />
            </figure>
            <div className="p-6 flex flex-col space-y-3">
              <h3 className="text-2xl font-bold text-green-800 tracking-wide">
                {food.name}
              </h3>
              <p className="text-gray-700 text-lg">
                <span className="font-semibold">Quantity:</span> {food.quantity}
              </p>
              <Link
                to={`/foods/${food._id}`}
                className="inline-block text-center mt-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 text-white text-sm font-bold py-2 px-4 rounded-full shadow-md transition-transform hover:scale-105"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-14">
        <Link
          to="/foods"
          className="inline-block bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white text-lg font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
        >
          🌟 Show All Foods
        </Link>
      </div>
    </div>
  );
};

export default FeaturedSection;
