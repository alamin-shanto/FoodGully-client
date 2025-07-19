import React, { useCallback, useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/AxiosSecure";
import AuthContext from "../Providers/AuthContext";
import Swal from "sweetalert2";

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
      Swal.fire("Error", "Failed to fetch your foods", "error", err);
    }
  }, [axiosSecure]); // ✅ Add dependencies here (only axiosSecure is used inside)

  useEffect(() => {
    if (user) fetchMyFoods();
  }, [user, fetchMyFoods]); // ✅ This is now correct

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
          Swal.fire("Error", "Failed to delete food", "error", err);
        }
      }
    });
  };

  // For update you can create a modal form similarly and call PATCH API

  if (loading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage My Foods</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Quantity</th>
            <th>Pickup Location</th>
            <th>Expire Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food._id}>
              <td>{food.name}</td>
              <td>{food.quantity}</td>
              <td>{food.pickupLocation}</td>
              <td>{new Date(food.expireDate).toLocaleString()}</td>
              <td>
                {/* Update button here - optional */}
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleDelete(food._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {foods.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                No foods added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageFoods;
