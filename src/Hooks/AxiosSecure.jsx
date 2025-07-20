import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://food-gully-server.vercel.app",
});

// Attach JWT token from localStorage to every request
axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Custom hook that returns the instance
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
