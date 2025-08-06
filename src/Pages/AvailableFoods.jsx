import React, { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/AxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../Providers/AuthContext";
import { FaTrashAlt } from "react-icons/fa";

const AvailableFoods = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [columns, setColumns] = useState(3);

  const {
    data: foods = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["availableFoods", search, sort],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/foods?search=${search}&sort=${sort}&status=available`
      );
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/foods/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Food has been deleted.", "success");
      queryClient.invalidateQueries(["availableFoods"]);
    },
    onError: () => {
      Swal.fire("Error!", "Could not delete food.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This food will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <input
          type="text"
          placeholder="Search food by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:max-w-sm text-lg px-4 py-2"
        />
        <div className="flex gap-4 items-center">
          <select
            className="select select-bordered text-lg px-4 py-2"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="asc">Expire Date ↑</option>
            <option value="desc">Expire Date ↓</option>
          </select>
          <button
            onClick={() => setColumns(columns === 3 ? 2 : 3)}
            className="btn btn-outline text-lg font-medium px-6"
          >
            {columns === 3 ? "Show 2 Columns" : "Show 3 Columns"}
          </button>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <p className="text-center text-gray-500">Loading foods...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Error: {error.message}</p>
      ) : foods.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          <h2 className="text-2xl font-semibold mb-2">No Foods Found</h2>
          <p className="mb-6">Try adjusting your search or add a new food.</p>
          <Link
            to="/add-food"
            className="btn bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md"
          >
            ➕ Add Food Now
          </Link>
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
          } gap-10`}
        >
          {foods.map((food) => (
            <div
              key={food._id}
              className="rounded-3xl overflow-hidden bg-gradient-to-br from-white/80 via-white/50 to-green-100 backdrop-blur border border-green-200 shadow-lg hover:shadow-2xl transition duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6 flex flex-col space-y-2">
                <h3 className="text-2xl font-extrabold text-green-800 tracking-wide">
                  {food.name}
                </h3>
                <p className="text-gray-700">
                  <span className="font-semibold">Quantity:</span>{" "}
                  {food.quantity}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Pickup:</span>{" "}
                  {food.pickupLocation}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Expires:</span>{" "}
                  {new Date(food.expireDate).toLocaleString()}
                </p>
                {food.additionalNotes && (
                  <p className="text-sm text-gray-600 italic border-l-4 border-green-400 pl-2 mt-2">
                    {food.additionalNotes}
                  </p>
                )}

                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    to={`/foods/${food._id}`}
                    className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 text-white font-semibold py-2 rounded-lg shadow-md text-center transition-all duration-200"
                  >
                    View Details
                  </Link>
                  {food.deletable && food.donorEmail === user?.email && (
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="w-full flex justify-center items-center gap-2 py-2 text-red-600 border border-red-400 rounded-lg hover:bg-red-100 font-medium transition"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  )}
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
