import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../Hooks/AxiosSecure";
import AuthContext from "../Providers/AuthContext";
import Swal from "sweetalert2";

const FoodDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [food, setFood] = useState(null);
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axiosSecure.get(`/foods/${id}`);
        setFood(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFood();
  }, [id, axiosSecure]);

  const handleRequest = async () => {
    const requestData = {
      foodId: food._id,
      foodName: food.name,
      foodImage: food.image,
      donorName: food.donorName,
      donorEmail: food.donorEmail,
      requesterEmail: user.email,
      requestDate: new Date(),
      pickupLocation: food.pickupLocation,
      expireDate: food.expireDate,
      additionalNotes: notes,
    };

    try {
      const res = await axiosSecure.post("/requests", requestData);
      if (res.data.insertedId) {
        Swal.fire("Requested", "Food requested successfully", "success");
        navigate("/my-requests");
      }
    } catch (err) {
      Swal.fire("Error", "Request failed", "error", err);
    }
  };

  if (!food) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <img
        src={food.image}
        alt={food.name}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{food.name}</h2>
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
      <p>
        <strong>Donor:</strong> {food.donorName} ({food.donorEmail})
      </p>
      <p>
        <strong>Status:</strong> {food.status}
      </p>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Request this food</h3>
        <textarea
          className="textarea textarea-bordered w-full mb-4"
          placeholder="Add any additional notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button
          onClick={handleRequest}
          className="btn btn-primary w-full"
          disabled={food.status !== "available"}
        >
          Request Now
        </button>
      </div>
    </div>
  );
};

export default FoodDetails;
