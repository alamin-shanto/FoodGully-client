import React, { useCallback, useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/AxiosSecure";
import AuthContext from "../Providers/AuthContext";
import Swal from "sweetalert2";
import { FaUtensils, FaTrashAlt, FaBoxOpen } from "react-icons/fa";

const ManageFoods = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-500">Loading your foods...</p>
      </div>
    );

  if (foods.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center px-4">
        <FaBoxOpen className="text-gray-400 text-6xl mb-4" />
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
          No Foods Added Yet
        </h3>
        <p className="text-gray-500 max-w-md">
          You haven't added any foods yet. Start sharing food to help others!
        </p>
      </div>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-green-700 flex items-center gap-3">
        <FaUtensils /> Manage My Foods
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="text-left py-3 px-5 font-semibold">Food Name</th>
              <th className="text-left py-3 px-5 font-semibold">Quantity</th>
              <th className="text-left py-3 px-5 font-semibold">
                Pickup Location
              </th>
              <th className="text-left py-3 px-5 font-semibold">Expire Date</th>
              <th className="text-center py-3 px-5 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr
                key={food._id}
                className="border-b border-gray-200 hover:bg-green-50 transition"
              >
                <td className="py-4 px-5">{food.name}</td>
                <td className="py-4 px-5">{food.quantity}</td>
                <td className="py-4 px-5">{food.pickupLocation}</td>
                <td className="py-4 px-5">
                  {new Date(food.expireDate).toLocaleString()}
                </td>
                <td className="py-4 px-5 text-center">
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition"
                    title="Delete Food"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageFoods;
