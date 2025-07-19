import React from "react";
import Home from "./../Pages/Home";
import AvailableFoods from "../Pages/AvailableFoods";
import FoodDetails from "../Pages/FoodDetails";
import PrivateRoutes from "./PrivateRoutes";
import AddFood from "../Pages/AddFood";
import MyRequest from "../Pages/MyRequest";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ManageFoods from "../Pages/ManageFoods";
import Navbar from "../Components/Navbar";
import { Route, Routes } from "react-router";

const MainRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/available-foods" element={<AvailableFoods />} />
        <Route
          path="/food/:id"
          element={
            <PrivateRoutes>
              <FoodDetails />
            </PrivateRoutes>
          }
        />
        <Route
          path="/add-food"
          element={
            <PrivateRoutes>
              <AddFood />
            </PrivateRoutes>
          }
        />
        <Route
          path="/manage-foods"
          element={
            <PrivateRoutes>
              <ManageFoods />
            </PrivateRoutes>
          }
        />
        <Route
          path="/my-requests"
          element={
            <PrivateRoutes>
              <MyRequest />
            </PrivateRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default MainRoutes;
