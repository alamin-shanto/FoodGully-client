import React, { useCallback, useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/AxiosSecure";
import AuthContext from "../Providers/AuthContext";
import Swal from "sweetalert2";
import { FaUtensils, FaTrashAlt, FaEdit, FaBoxOpen } from "react-icons/fa";
import UpdateFoodModal from "./UpdateFoodModal";

const ManageFoods = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchMyFoods = useCallback(async () => {
    try {
      const res = await axiosSecure.get("/my-foods");
      setFoods(res.data);
      setLoading(false);
    } catch (err) {
      Swal.fire("Error", "Failed to fetch your foods", "error", err.message);
      setLoading(false);
    }
  }, [axiosSecure]);

  useEffect(() => {
    if (user) fetchMyFoods();
  }, [user, fetchMyFoods]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will delete this food permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/foods/${id}`);
          setFoods((prev) => prev.filter((food) => food._id !== id));
          Swal.fire("Deleted!", "Food has been deleted.", "success");
        } catch (err) {
          Swal.fire("Error", "Failed to delete food", "error", err.message);
        }
      }
    });
  };

  const handleUpdateClick = (food) => {
    setSelectedFood(food);
    setModalOpen(true);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-500">Loading your foods...</p>
      </div>
    );

  if (foods.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center px-4">
        <FaBoxOpen className="text-gray-400 text-7xl mb-6 animate-pulse" />
        <h3 className="text-3xl font-semibold text-gray-700 mb-3">
          No Foods Added Yet
        </h3>
        <p className="text-gray-500 max-w-md mb-6">
          You haven't added any foods yet. Start sharing food to help others!
        </p>
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-8 text-green-700 flex items-center gap-3">
        <FaUtensils className="text-green-600" /> Manage My Foods
      </h2>

      {/* Table view */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg border border-green-200">
        <table className="min-w-full bg-white divide-y divide-green-200">
          <thead className="bg-green-100 text-green-800 uppercase text-sm font-semibold tracking-wide">
            <tr>
              <th className="px-6 py-4">Food Name</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4">Pickup Location</th>
              <th className="px-6 py-4">Expire Date</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-100">
            {foods.map((food) => (
              <tr
                key={food._id}
                className="hover:bg-green-50 transition-colors"
              >
                <td className="px-6 py-5 font-medium text-green-700">
                  {food.name}
                </td>
                <td className="px-6 py-5">{food.quantity}</td>
                <td className="px-6 py-5">{food.pickupLocation}</td>
                <td className="px-6 py-5">
                  {new Date(food.expireDate).toLocaleString()}
                </td>
                <td className="px-6 py-5 text-center flex justify-center gap-3">
                  <button
                    onClick={() => handleUpdateClick(food)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
                  >
                    <FaEdit /> Update
                  </button>
                  <button
                    onClick={() => handleDelete(food._id)}
                    disabled={!food.deletable}
                    className={`px-4 py-2 rounded-md text-white flex items-center gap-2 ${
                      food.deletable
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="mt-10 space-y-6 md:hidden">
        {foods.map((food) => (
          <div
            key={food._id}
            className="bg-white rounded-lg shadow-md p-5 border border-green-100"
          >
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              {food.name}
            </h3>
            <p>
              <strong>Quantity:</strong> {food.quantity}
            </p>
            <p>
              <strong>Pickup Location:</strong> {food.pickupLocation}
            </p>
            <p>
              <strong>Expire Date:</strong>{" "}
              {new Date(food.expireDate).toLocaleString()}
            </p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleUpdateClick(food)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
              >
                <FaEdit /> Update
              </button>
              <button
                onClick={() => handleDelete(food._id)}
                disabled={!food.deletable}
                className={`px-4 py-2 rounded-md text-white flex items-center gap-2 ${
                  food.deletable
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                <FaTrashAlt /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Update */}
      <UpdateFoodModal
        isOpen={modalOpen}
        food={selectedFood}
        onClose={() => setModalOpen(false)}
        onUpdate={fetchMyFoods}
        axiosSecure={axiosSecure}
      />
    </div>
  );
};

export default ManageFoods;
