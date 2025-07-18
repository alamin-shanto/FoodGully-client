import React, { useContext } from "react";
import AuthContext from "../Providers/AuthContext";
import { Navigate, useLocation } from "react-router";
import Loading from "../Pages/Loading";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  // console.log(location.pathname);

  if (loading) {
    return <Loading></Loading>;
  }

  if (user?.email) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login" replace></Navigate>;
};

export default PrivateRoutes;
