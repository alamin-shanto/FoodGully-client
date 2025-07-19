import React, { useContext, useState } from "react";
import AuthContext from "../Providers/AuthContext";
import { Link, useNavigate } from "react-router-dom"; // changed to react-router-dom for correct routing
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      Swal.fire("Success", "Logged in successfully", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      Swal.fire("Success", "Logged in with Google", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg mt-16">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
        Login to FoodGully
      </h2>
      <form onSubmit={handleLogin} className="space-y-6">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          required
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
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md shadow-md transition"
        >
          Login
        </button>
      </form>
      <button
        onClick={handleGoogleLogin}
        className="w-full mt-6 flex items-center justify-center gap-2 border-2 border-gray-300 rounded-md py-3 text-gray-700 font-semibold hover:bg-gray-100 transition"
      >
        <FcGoogle size={24} />
        Login with Google
      </button>
      <p className="mt-6 text-center text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-green-500 font-semibold hover:underline"
        >
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
