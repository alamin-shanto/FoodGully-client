import React, { useContext, useState } from "react";
import AuthContext from "../Providers/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Password validation function
  const validatePassword = (password) => {
    return (
      /[A-Z]/.test(password) && // has uppercase
      /[a-z]/.test(password) && // has lowercase
      password.length >= 6 // length >= 6
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      Swal.fire(
        "Error",
        "Password must include uppercase, lowercase letters and be at least 6 characters long.",
        "error"
      );
      return;
    }

    try {
      setLoading(true);
      // Create user with email & password
      const userCredential = await createUser(email, password);
      console.log("Registered User:", userCredential.user);

      // Update user profile (displayName & photoURL)
      await updateUser({ displayName: name, photoURL });

      setLoading(false);
      Swal.fire("Success", "Account created successfully!", "success");
      navigate("/");
    } catch (err) {
      setLoading(false);
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg mt-16">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
        Create an Account
      </h2>
      <form onSubmit={handleRegister} className="space-y-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          required
        />
        <input
          type="url"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          placeholder="Photo URL (optional)"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md shadow-md transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="mt-6 text-center text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-green-500 font-semibold hover:underline"
        >
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
