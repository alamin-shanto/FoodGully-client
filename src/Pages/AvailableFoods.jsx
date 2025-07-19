import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/AxiosSecure";
import { Link } from "react-router-dom";

const AvailableFoods = () => {
  const axiosSecure = useAxiosSecure();
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [columns, setColumns] = useState(3);

  const fetchFoods = async () => {
    try {
      const res = await axiosSecure.get(`/foods?search=${search}&sort=${sort}`);
      setFoods(res.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [search, sort]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-5">
        <input
          type="text"
          placeholder="Search food by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:max-w-xs text-lg"
        />

        <div className="flex gap-4">
          <select
            className="select select-bordered text-lg"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="asc">Sort by Expire Date (Asc)</option>
            <option value="desc">Sort by Expire Date (Desc)</option>
          </select>

          <button
            onClick={() => setColumns(columns === 3 ? 2 : 3)}
            className="btn btn-outline text-lg font-semibold px-6"
            aria-label="Toggle columns"
          >
            {columns === 3 ? "Show 2 Columns" : "Show 3 Columns"}
          </button>
        </div>
      </div>

      {/* Foods grid or empty state */}
      {foods.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center text-gray-400 select-none">
          <svg
            className="w-24 h-24 mb-6 text-green-400 animate-pulse"
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
            No foods found
          </h3>
          <p className="max-w-sm text-gray-500 mb-6">
            We couldn't find any food matching your search or filter. Try
            broadening your criteria or add some food to share!
          </p>
          <Link
            to="/add-food"
            className="btn bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition-transform hover:scale-105"
          >
            Add Food Now
          </Link>
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
          } gap-8`}
        >
          {foods.map((food) => (
            <div
              key={food._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-[1.03] transition-transform duration-300 flex flex-col overflow-hidden"
            >
              <img
                src={food.image}
                alt={food.name}
                className="h-52 w-full object-cover rounded-t-xl"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-extrabold text-green-700 mb-3 tracking-wide">
                  {food.name}
                </h2>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Quantity:</span>{" "}
                  {food.quantity}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Pickup:</span>{" "}
                  {food.pickupLocation}
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-semibold">Expires:</span>{" "}
                  {new Date(food.expireDate).toLocaleString()}
                </p>
                <div className="mt-auto">
                  <Link
                    to={`/foods/${food._id}`}
                    className="btn bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-bold w-full py-3 rounded-lg shadow-lg transition-transform hover:scale-105"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableFoods;
