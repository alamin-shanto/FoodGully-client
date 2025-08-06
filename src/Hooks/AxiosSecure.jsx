import { useEffect, useMemo } from "react";
import axios from "axios";

const useAxiosSecure = () => {
  // ✅ Memoize the axios instance so it's not recreated every render
  const axiosSecure = useMemo(() => {
    return axios.create({
      baseURL: "https://food-gully-server.vercel.app",
    });
  }, []);

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Cleanup interceptor on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, [axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;
