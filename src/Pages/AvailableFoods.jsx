import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/AxiosSecure";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sort]);

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search food by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:max-w-xs"
        />
        <div className="flex gap-4">
          <select
            className="select select-bordered"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="asc">Sort by Expire Date (Asc)</option>
            <option value="desc">Sort by Expire Date (Desc)</option>
          </select>
          <button
            onClick={() => setColumns(columns === 3 ? 2 : 3)}
            className="btn btn-outline"
          >
            {columns === 3 ? "2 Columns" : "3 Columns"}
          </button>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} gap-6`}
      >
        {foods.map((food) => (
          <div key={food._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={food.image}
                alt={food.name}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{food.name}</h2>
              <p>
                <strong>Quantity:</strong> {food.quantity}
              </p>
              <p>
                <strong>Pickup:</strong> {food.pickupLocation}
              </p>
              <p>
                <strong>Expire:</strong>{" "}
                {new Date(food.expireDate).toLocaleString()}
              </p>
              <div className="card-actions justify-end">
                <Link
                  to={`/foods/${food._id}`}
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
        {foods.length === 0 && (
          <p className="col-span-full text-center">No foods found.</p>
        )}
      </div>
    </div>
  );
};

export default AvailableFoods;
