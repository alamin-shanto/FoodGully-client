import React, { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/AxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../Providers/AuthContext";
import { FaTrashAlt } from "react-icons/fa";
import FoodRequestModal from "./FoodRequestModal"; // Ensure this path is correct

const AvailableFoods = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [columns, setColumns] = useState(3);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const {
    data: foods = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["availableFoods", search, sort],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/foods?search=${encodeURIComponent(
          search
        )}&sort=${sort}&status=available`
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

  const openRequestModal = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const onRequestSuccess = () => {
    refetch();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
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
            type="button"
          >
            {columns === 3 ? "Show 2 Columns" : "Show 3 Columns"}
          </button>
        </div>
      </div>

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
            className="btn bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
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
              className="bg-white rounded-xl shadow hover:shadow-xl transition-transform transform hover:scale-[1.02] flex flex-col overflow-hidden"
            >
              <img
                src={food.image}
                alt={food.name}
                className="h-52 w-full object-cover"
                loading="lazy"
              />
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-green-700 mb-2">
                  {food.name}
                </h3>
                <p>
                  <strong>Quantity:</strong> {food.quantity}
                </p>
                <p>
                  <strong>Pickup:</strong> {food.pickupLocation}
                </p>
                <p className="mb-2">
                  <strong>Expires:</strong>{" "}
                  {new Date(food.expireDate).toLocaleString()}
                </p>
                {food.additionalNotes && (
                  <p className="italic text-gray-600 mb-3">
                    {food.additionalNotes}
                  </p>
                )}

                <div className="mt-auto flex flex-col gap-2">
                  <button
                    onClick={() => openRequestModal(food)}
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded"
                    type="button"
                  >
                    Request Food
                  </button>

                  <Link
                    to={`/foods/${food._id}`}
                    className="btn bg-blue-500 hover:bg-blue-600 text-white py-2 rounded text-center"
                  >
                    View Details
                  </Link>

                  {food.deletable && food.donorEmail === user?.email && (
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="btn btn-error btn-outline py-2 flex justify-center items-center gap-2"
                      type="button"
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

      {/* Food Request Modal */}
      {selectedFood && (
        <FoodRequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          food={selectedFood}
          user={user}
          onRequestSuccess={() => {
            onRequestSuccess();
            setIsModalOpen(false);
          }}
          axiosSecure={axiosSecure}
        />
      )}
    </div>
  );
};

export default AvailableFoods;
