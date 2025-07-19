import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/AxiosSecure";

const FeaturedSection = () => {
  const axiosSecure = useAxiosSecure();
  const [featuredFoods, setFeaturedFoods] = useState([]);
  useEffect(() => {
    const fetchFeatured = async () => {
      const res = await axiosSecure.get("/foods");
      const sorted = res.data.sort((a, b) => b.quantity - a.quantity);
      setFeaturedFoods(sorted.slice(0, 6));
    };
    fetchFeatured();
  }, [axiosSecure]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Featured Foods</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {featuredFoods.map((food) => (
          <div key={food._id} className="card bg-base-100 shadow">
            <figure>
              <img
                src={food.image}
                alt={food.name}
                className="h-40 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{food.name}</h2>
              <p>
                <strong>Quantity:</strong> {food.quantity}
              </p>
              <Link
                to={`/foods/${food._id}`}
                className="btn btn-sm btn-outline mt-2"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link to="/foods" className="btn btn-primary">
          Show All
        </Link>
      </div>
    </div>
  );
};

export default FeaturedSection;
