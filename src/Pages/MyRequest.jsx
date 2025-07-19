import React, { useCallback, useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/AxiosSecure";
import AuthContext from "../Providers/AuthContext";
import Swal from "sweetalert2";

const MyRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyRequests = useCallback(async () => {
    try {
      const res = await axiosSecure.get("/my-requests");
      setRequests(res.data);
      setLoading(false);
    } catch (err) {
      Swal.fire("Error", "Failed to fetch your requests", "error", err);
    }
  }, [axiosSecure]);

  useEffect(() => {
    if (user) fetchMyRequests();
  }, [user, fetchMyRequests]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Food Requests</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Donor Name</th>
            <th>Pickup Location</th>
            <th>Expire Date</th>
            <th>Request Date</th>
            <th>Additional Notes</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.foodName}</td>
              <td>{req.donorName}</td>
              <td>{req.pickupLocation}</td>
              <td>{new Date(req.expireDate).toLocaleString()}</td>
              <td>{new Date(req.requestDate).toLocaleString()}</td>
              <td>{req.additionalNotes || "-"}</td>
            </tr>
          ))}
          {requests.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                No food requests yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyRequest;
